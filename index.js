const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Lê o arquivo content.json
const contentPath = path.join(__dirname, 'content.json');
let content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));

// Middleware para fazer o parse de JSON
app.use(express.json());

// Rotas da API

// 1. Obter todos os exercícios
app.get('/exercises', (req, res) => {
  res.json(content.exercises);
});

// 2. Obter um exercício específico por ID
app.get('/exercises/:id', (req, res) => {
  const exercise = content.exercises.find(e => e.id === parseInt(req.params.id));
  if (exercise) {
    res.json(exercise);
  } else {
    res.status(404).json({ message: 'Exercício não encontrado' });
  }
});

// 3. Adicionar um novo exercício
app.post('/exercises', (req, res) => {
  const newExercise = req.body;
  if (newExercise.name && newExercise.type) {
    const newId = content.exercises.length ? content.exercises[content.exercises.length - 1].id + 1 : 1;
    newExercise.id = newId;
    newExercise.records = [];
    content.exercises.push(newExercise);
    fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));
    res.status(201).json(newExercise);
  } else {
    res.status(400).json({ message: 'Nome e tipo são obrigatórios' });
  }
});

// 4. Atualizar um exercício existente
app.put('/exercises/:id', (req, res) => {
  const exerciseIndex = content.exercises.findIndex(e => e.id === parseInt(req.params.id));
  if (exerciseIndex !== -1) {
    const updatedExercise = req.body;
    updatedExercise.id = parseInt(req.params.id);
    content.exercises[exerciseIndex] = updatedExercise;
    fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));
    res.json(updatedExercise);
  } else {
    res.status(404).json({ message: 'Exercício não encontrado' });
  }
});

// 5. Deletar um exercício
app.delete('/exercises/:id', (req, res) => {
  const exerciseIndex = content.exercises.findIndex(e => e.id === parseInt(req.params.id));
  if (exerciseIndex !== -1) {
    content.exercises.splice(exerciseIndex, 1);
    fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Exercício não encontrado' });
  }
});

// 6. Adicionar um registro ao exercício
app.post('/exercises/:exerciseId/records', (req, res) => {
  const exercise = content.exercises.find(e => e.id === parseInt(req.params.exerciseId));
  if (exercise) {
    const newRecord = req.body;

    if (newRecord.date && newRecord.series !== undefined && newRecord.weight !== undefined) {
      const expectedWeightKeys = Array.from({ length: newRecord.series }, (_, i) => `S${i + 1}`);
      const weightKeys = Object.keys(newRecord.weight);

      if (weightKeys.length !== newRecord.series || !weightKeys.every(key => expectedWeightKeys.includes(key))) {
        return res.status(400).json({ message: 'Peso deve ter chaves correspondentes ao número de séries (S1, S2, S3, etc.)' });
      }

      const newRecordId = exercise.records.length ? exercise.records[exercise.records.length - 1].id + 1 : 1;
      newRecord.id = newRecordId;
      newRecord.exerciseId = exercise.id;

      exercise.records.push(newRecord);

      fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));
      res.status(201).json(newRecord);
    } else {
      res.status(400).json({ message: 'Data, número de séries e peso são obrigatórios' });
    }
  } else {
    res.status(404).json({ message: 'Exercício não encontrado' });
  }
});

// 7. Obter registros de um exercício específico
app.get('/exercises/:exerciseId/records', (req, res) => {
  const exercise = content.exercises.find(e => e.id === parseInt(req.params.exerciseId));
  if (exercise) {
    res.json(exercise.records);
  } else {
    res.status(404).json({ message: 'Exercício não encontrado' });
  }
});

// 8. Obter um registro específico de um exercício
app.get('/exercises/:exerciseId/records/:recordId', (req, res) => {
  const exercise = content.exercises.find(e => e.id === parseInt(req.params.exerciseId));
  if (exercise) {
    const record = exercise.records.find(r => r.id === parseInt(req.params.recordId));
    if (record) {
      res.json(record);
    } else {
      res.status(404).json({ message: 'Registro não encontrado' });
    }
  } else {
    res.status(404).json({ message: 'Exercício não encontrado' });
  }
});

// 9. Atualizar um registro de exercício
app.put('/exercises/:exerciseId/records/:recordId', (req, res) => {
  const exercise = content.exercises.find(e => e.id === parseInt(req.params.exerciseId));
  if (exercise) {
    const recordIndex = exercise.records.findIndex(r => r.id === parseInt(req.params.recordId));
    if (recordIndex !== -1) {
      const updatedRecord = req.body;

      const expectedWeightKeys = Array.from({ length: updatedRecord.series }, (_, i) => `S${i + 1}`);
      const weightKeys = Object.keys(updatedRecord.weight);

      if (weightKeys.length !== updatedRecord.series || !weightKeys.every(key => expectedWeightKeys.includes(key))) {
        return res.status(400).json({ message: 'Peso deve ter chaves correspondentes ao número de séries (S1, S2, S3, etc.)' });
      }

      updatedRecord.id = parseInt(req.params.recordId);
      updatedRecord.exerciseId = exercise.id; 
      
      exercise.records[recordIndex] = updatedRecord;
      fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));
      res.json(updatedRecord);
    } else {
      res.status(404).json({ message: 'Registro não encontrado' });
    }
  } else {
    res.status(404).json({ message: 'Exercício não encontrado' });
  }
});

// 10. Deletar um registro de exercício
app.delete('/exercises/:exerciseId/records/:recordId', (req, res) => {
  const exercise = content.exercises.find(e => e.id === parseInt(req.params.exerciseId));
  if (exercise) {
    const recordIndex = exercise.records.findIndex(r => r.id === parseInt(req.params.recordId));
    if (recordIndex !== -1) {
      exercise.records.splice(recordIndex, 1);
      fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Registro não encontrado' });
    }
  } else {
    res.status(404).json({ message: 'Exercício não encontrado' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
