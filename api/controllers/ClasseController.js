/**
 * ClasseController
 *
 * @description :: Server-side logic for managing Classes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const FillPdf = require('../implementations/FillPdf');
const Classe = require('../implementations/ClasseImpl');
const SparqlClient = require('sparql-client-2');
var user = 'gharbi';
var password = 'ayoub';
const endpoint = 'http://' + user + ':' + password + '@localhost:3030/db';
var client = new SparqlClient(endpoint);

module.exports = {

  add: function (req, res) {
    res.view('add_classe');
  },
  create: function (req, res) {
    var classe = new Classe('', req.body.libelle);
    console.log(req.body.libelle);
    classe.Create(client, function (result) {
      //res.send(result);
      res.redirect('classe/list');
    })
  },
  findall(req, res) {
    var classe = new Classe();
    classe.FindAll(client, function (result) {
      res.send(result);
      res.redirect('classe/list');
      //res.view('list_person', { personnes: result });
    });
    //res.send('---*>Find All');
  },
  delete: function (req, res) {
    var classe = new Classe();
    classe.Delete(client, req.params.id, function (result) {
      //res.send(result);
      res.redirect('/classe/list');
    });
  },
  list: function (req, res) {
    var classe = new Classe();
    classe.FindAll(client, function (result) {
      //res.send(result);
      res.view('list_classe', { classes: result });
    });
  },
  showclass: function(req,res){
    var classe = new Classe();
    classe.FindOne(client,req.params.id,function(result){
      res.view('view_classe', { classe: result });
    })
  },
  /************************************* */
  listJson: function (req, res) {
    var classe = new Classe();
    classe.FindAll(client, function (result) {
      res.send(result);
    });
  },

  getsalleJson: function(req, res) {
    //console.log('------------------------------------')
    var classe = new Classe();
    classe.FindAllSalle(client, function (result) {
      res.send(result);
    });
  }
};

