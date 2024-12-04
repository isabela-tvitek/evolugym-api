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

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
