var request = require('request');

  module.exports = request('https://api.myjson.com/bins/kj4aq', async function (err, res, body){
    console.log('erro: ', err);
    console.log('statusCod: ', res && res.statusCode);
    console.log('body: ', body);
    var parseUser = await JSON.parse(body);
    console.log('O usuário que se encontra é o: ' + parseUser[1].user + ' | ' + parseUser[1].password)
    return parseUser;
  });