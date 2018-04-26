//configurando o firebase
var admin = require("firebase-admin");
// esse arquivo é o serviceaccountkey do firebase para poder acessar o banco
var serviceAccount = require("C:\\Users\\D\\Desktop\\NodeJS+Express+Firebase API\\serviceaccountkey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://desafio2404.firebaseio.com/"
});
var db = admin.database();

//confirugração do express
var express = require('express');
var app = express();

// para poder listar todos os elementos de uma entidade
app.get('/api/:entidade/list',function (req, res) {
  var ref = db.ref("/api/"+req.params.entidade);
  ref.once("value", function(snapshot) {
    res.send(snapshot.val());
  });
});

// para exibir uma entidade por id
app.get('/api/:entidade/:id',function (req, res) {
    var ref = db.ref("/api/"+req.params.entidade+"/"+req.params.id);
    ref.once("value", function(snapshot) {
      res.send(snapshot.val());
    });
});

// para listar qualquer entidade por qualquer atributo
app.get('/api/:entidade/:atributo/:x',function (req, res) {
  var ref = db.ref("api");
    // ref.child é a entidade do banco de dados na qual vc deseja buscar (filmes, hq, livros, series)
    // orderByChild é o atributo da entidade que você vai buscar na entidade selecionada pelo ref.child
    // equalTo verifica se o atributo escolhido no orderByChild é igual ao parametro passado
    ref.child(req.params.entidade).orderByChild(req.params.atributo).equalTo(req.params.x).on("value", function(snapshot) {
      res.send(snapshot.val());
      snapshot.forEach(function(data) {
          console.log(data.key);
      });
    });

});
// process.env.PORT verifica se o sistema definiu alguma porta especifica, senão ele vai usar a porta 3000
var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("[+] Executando na porta "+port+"...");
});
