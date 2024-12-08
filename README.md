# API de Gerenciamento de Exercícios

---

## Descrição
Esta API permite o gerenciamento de exercícios e seus registros, incluindo CRUD completo para exercícios e funcionalidades avançadas para registro de séries de musculação e cardio.

---

## Instalação e Configuração

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd <nome-do-repositorio>
   
2. **Instale as dependências:**
   ```bash
   git clone <url-do-repositorio>
   cd <nome-do-repositorio>
   
3. **Execute o servidor:**
   ```bash
   node index.js
   
4. **Acesse a API:**
  http://localhost:3000
   
5. **Exemplo:**
   Tem um exemplo pronto da API já no arquivo content.json mas é possivél deixá-lo vazio
   
        {
            "exercises": []
        }

   
---

## Rotas da API
  
## **1. Obter todos os exercícios**
- **Método:** `GET`
- **Endpoint:** `/exercises`
- **Descrição:** Retorna todos os exercícios cadastrados.
- **Resposta:**
  ```json
  [
   {
      "id": 1,
      "name": "Supino",
      "type": "Superiores",
      "records": []
   }
  ]

  
## **2. Obter um exercício específico**
- **Método:** `GET`
- **Endpoint:** `/exercises/:id`
- **Descrição:** Retorna os dados de um exercício específico.
- **Parâmetros:** 
   - id (obrigatório): ID do exercício
- **Resposta:**
  ```json
  [
   {
      "id": 1,
      "name": "Supino",
      "type": "Superiores",
      "records": []
   }
  ]


## **3. Adicionar um novo exercício**
- **Método:** `POST`
- **Endpoint:** `/exercises`
- **Descrição:** Adiciona um novo exercício.
- **Body:**
  ```json
  [
   {
      "name": "Corrida",
      "type": "Cardio"
   }
  ]
- **Resposta:**
  ```json
  [
   {
      "id": 2,
      "name": "Corrida",
      "type": "Cardio",
      "records": []
   }
  ]

  
## **4. Atualizar um exercício**
- **Método:** `PUT`
- **Endpoint:** `/exercises/:id`
- **Descrição:** Atualiza os dados de um exercício existente.
- **Parâmetros:** 
   - id (obrigatório): ID do exercício
- **Body:**
  ```json
  [
   {
      "name": "Supino Inclinado",
      "type": "Superiores"
   }
  ]
- **Resposta:**
  ```json
  [
   {
      "id": 1,
      "name": "Supino Inclinado",
      "type": "Superiores",
      "records": []
   }
  ]


## **5. Deletar um exercício**
- **Método:** `DELETE`
- **Endpoint:** `/exercises/:id`
- **Descrição:** Remove um exercício do sistema.
- **Parâmetros:** 
   - id (obrigatório): ID do exercício
- **Resposta:** 204 No Content

  
## **6. Adicionar um registro a um exercício**
- **Método:** `POST`
- **Endpoint:** `/exercises/:exerciseId/records`
- **Descrição:** Adiciona um registro de séries ao exercício.
- **Parâmetros:** 
   - exerciseId (obrigatório): ID do exercício.
- **Body para Cardio:**
  ```json
  [
   {
      "date": "2024-01-01",
      "series": 3,
      "time": {
         "S1": 5,
         "S2": 6,
         "S3": 5
      }
   }
  ]
- **Body para Musculação:**
  ```json
  [
   {
      "date": "2024-01-01",
      "series": 3,
      "weight": {
         "S1": 50,
         "S2": 55,
         "S3": 60
      }
   }
  ]
- **Resposta:**
  ```json
  [
   {
      "id": 1,
      "exerciseId": 2,
      "date": "2024-01-01",
      "series": 3,
      "weight": { 
         "S1": 50, 
         "S2": 55, 
         "S3": 60 
      }
   }
  ]


## **7. Obter registros de um exercício**
- **Método:** `GET`
- **Endpoint:** `/exercises/:exerciseId/records`
- **Descrição:** Retorna todos os registros de séries de um exercício.
- **Parâmetros:** 
   - exerciseId (obrigatório): ID do exercício.
- **Resposta:**
  ```json
  [
   {
      "id": 1,
      "exerciseId": 2,
      "date": "2024-01-01",
      "series": 3,
      "weight": { "S1": 50, "S2": 55, "S3": 60 }
   }
  ]

  
## **8. Obter um registro específico de um exercício**
- **Método:** `GET`
- **Endpoint:** `/exercises/:exerciseId/records/:recordId`
- **Descrição:** Retorna os dados de um registro específico.
- **Parâmetros:** 
   - exerciseId (obrigatório): ID do exercício.
   - recordId (obrigatório): ID do registro.
- **Resposta:**
  ```json
  [
   {
      "id": 1,
      "exerciseId": 2,
      "date": "2024-01-01",
      "series": 3,
      "weight": { "S1": 50, "S2": 55, "S3": 60 }
   }
  ]

## **9. Atualizar um registro de exercício**
- **Método:** `PUT`
- **Endpoint:** `/exercises/:exerciseId/records/:recordId`
- **Descrição:** Atualiza os dados de um registro de exercício.
- **Parâmetros:** 
   - exerciseId (obrigatório): ID do exercício.
   - recordId (obrigatório): ID do registro.
- **Body:**
  ```json
  [
   {
      "date": "2024-01-01",
      "series": 3,
      "weight": {
         "S1": 55,
         "S2": 60,
         "S3": 65
      }
   }
  ]
- **Resposta:**
  ```json
  [
   {
      "id": 1,
      "exerciseId": 2,
      "date": "2024-01-01",
      "series": 3,
      "weight": { 
         "S1": 55, 
         "S2": 60, 
         "S3": 65 
      }
   }
  ]
  
## **10. Deletar um registro de exercício**
- **Método:** `DELETE`
- **Endpoint:** `/exercises/:exerciseId/records/:recordId`
- **Descrição:** Remove um registro de exercício do sistema.
- **Parâmetros:** 
   - exerciseId (obrigatório): ID do exercício.
   - recordId (obrigatório): ID do registro.
- **Resposta:** 204 No Content
---
