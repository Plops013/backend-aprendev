const express = require('express');
const routes = require('express').Router();
const request = require('request');
const cors = require('cors');

// Iniciando App
const app = express();

app.use(cors());
app.use(express.json());

var usuario;

  request('https://api.myjson.com/bins/kj4aq', async function (err, res, body) {
    //console.log('erro: ', err);
    //console.log('statusCod: ', res && res.statusCode);
    //console.log('body: ', body);
    var parseUser = await JSON.parse(body);
    //console.log(parseUser);
    usuario = parseUser;
  });

// Verificar e retornar true ou false caso confirme os dados
app.get('/login', function (req, res){
  //console.log(req.query);

  for (var i = 0; i < usuario.length; i++){
    var resposta = confirmaUser(usuario[i], req.query);
    if (resposta == true){
      res.send('Logado com sucesso');
      console.log('Logado Com Sucesso');
      break;
    }else if (resposta == false && i == usuario.length-1)
    {
      res.send('Usuario ou senha invalidos');
      console.log('Usuario ou senha invalidos');
    };
  }
})


function confirmaUser(usuario, tentativa){
  if (usuario.password == tentativa.password && usuario.user == tentativa.user){
    //console.log('logado com sucesso')
    return true;
  }
  else{
    //console.log('Usuario ou senha invalido');
    return false;
  }
}

//console.log('rodou');

app.listen(3000);
