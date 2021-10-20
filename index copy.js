require('dotenv').config()
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const Filme = require("./models/filme");

app.get("/", async (req, res) => {
  const filmes = await Filme.findAll();

  res.render("index", {
    filmes,
  });
});

app.get("/detalhes/:id", async (req, res) => {  
  const filme = await Filme.findByPk(req.params.id);

  res.render("detalhes", {
    filme,  
  });
});

app.post("/criar", async (req, res) => {
  const { nome, descricao, imagem } = req.body;
  
  const filme = await Filme.create({
    nome,
    descricao,
    imagem,
  });

  res.render("criar", {
    filme,
  });
});

app.get("/criar", (req, res) => {
  res.render("criar");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
