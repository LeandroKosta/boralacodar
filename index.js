require('dotenv').config()
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

let message = "";

const Conteudos = require("./models/conteudos");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/frontend", async (req, res) => {
  const conteudos = await Conteudos.findAll();

  res.render("frontend", {
    conteudos
  });
});

// C (Create) do meu CRUD - Aqui eu vou criar uma entrada nova no meu banco
app.post("/cadastrar", async (req, res) => {

  const { tema, linkconteudo } = req.body;

  message = `O Conteúdo ${tema} foi adicionado com sucesso!`;

  if (!tema) {
    res.render("admin", {
      message: "Tema é obrigatório",
    });
  }

else if (!linkconteudo) {
    res.render("admin", {
      message: "Link é obrigatório",
    });
  }

  else {
    try {
      const conteudo = await Conteudos.create({
        tema,
        linkconteudo,
    });

     
      res.redirect("admin");
    } catch (err) {
      console.log(err);

      res.render("admin", {
        message: "Ocorreu um erro ao cadastrar o Conteúdo!",
      });
    }
  }
});

//Nesse momento, no GET, eu estou apenas pegando os dados do DB e mostrando em uma tabela na pag Admin.
app.get("/admin", async (req, res) => {
  const conteudos = await Conteudos.findAll(); 

  setTimeout(() => {
    message = "";
  }, 1000);

  res.render("admin", {
    conteudos, message
  });
});


// R (Read) do CRUD - É aqui que vou LER os dados passados pelo banco
app.get("/detalhes/:id", async (req, res) => {
  const conteudos = await Conteudos.findByPk(req.params.id);
  
  res.render("detalhes", {
    conteudos, 
  });
});


// Embora a rota seja "editar", nesse momento, no GET, eu estou apenas pegando os dados
// de uma entrada para serem editados, por isso ainda não é um UPDATE, é um READ.
app.get("/editar/:id", async (req, res) => {
  const conteudo = await Conteudos.findByPk(req.params.id);

  if (!conteudo) {
    res.render("editar", {
      conteudo,
      message: "Conteúdo não encontrado!",
    });
  }

  res.render("editar", {
    conteudo, message
  });
});


//U (Update) do meu CRUD - Aqui é onde eu faço a atualização (edição) dos dados de uma entrada
app.post("/editar/:id", async (req, res) => {
  const conteudo = await Conteudos.findByPk(req.params.id);

  const { tema, linkconteudo } = req.body;

  conteudo.tema = tema;  
  conteudo.linkconteudo = linkconteudo;

  const conteudoEditado = await conteudo.save();

  res.render("editar", {
    conteudo: conteudoEditado,
    message: `O conteúdo ${conteudo.tema} foi editado com sucesso!`
  });
});

// Nesse momento, no GET, eu estou pegando os dados de uma entrada para serem DELETADOS;
app.get("/deletar/:id", async (req, res) => {
  const conteudo = await Conteudos.findByPk(req.params.id);

  if (!conteudo) {
    res.render("deletar", {
      conteudo,
      message: "Conteúdo não encontrado!",
    });
  }

  res.render("deletar", {
    conteudo, message
  });
});

//D (Delete) do meu CRUD - Aqui é onde eu (deleto) meu conteudo;
app.post("/deletar/:id", async (req, res) => {
  const conteudo = await Conteudos.findByPk(req.params.id);

  await conteudo.destroy();
  message = `O conteúdo ${conteudo.tema} foi deletado com sucesso!`
  res.redirect("../admin");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
