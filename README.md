# VTX Desafio

Projeto desenvolvido como solução para o desafio técnico da VTX.  
Este repositório contém o backend e o frontend necessários para rodar a aplicação localmente usando Docker e Node.js.

## 🚀 Pré-requisitos

Certifique-se de ter instalado na sua máquina:

- [Git](https://git-scm.com/)
- [Docker](https://docs.docker.com/get-docker/)
- [Node.js (>= 18)](https://nodejs.org/) + [npm](https://www.npmjs.com/)

## ⚙️ Como rodar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/SrKlono/VTX-Desafio.git
	 ````

2. Acesse a pasta do projeto:

   ```bash
   cd VTX-Desafio
   ```

3. Construa a imagem Docker:

   ```bash
   docker build -t vtx-onus-db ./docker
   ```

4. Rode o container:

   ```bash
   docker run -d --name vtx-onus-db-container -p 3307:3306 vtx-onus-db
   ```

5. Instale as dependências e construa o frontend:

   ```bash
   npm run build
   ```

6. Inicie a aplicação:

   ```bash
   npm run start
   ```

7. Acesse pelo navegador em:

   ```
   http://localhost:5173
   ```

## 📦 Dependências principais

* **Backend:** Node.js, Express, MySQL2
* **Frontend:** Vite, React
* **Banco de dados:** MySQL2, Docker

## 📝 Observações

* O banco de dados roda no container `vtx-onus-db-container` mapeado para a porta `3307`.
* Caso já exista um container rodando nessa porta, pare-o antes de iniciar.
* Para encerrar o banco, execute:

  ```bash
  docker stop vtx-onus-db-container
  ```
