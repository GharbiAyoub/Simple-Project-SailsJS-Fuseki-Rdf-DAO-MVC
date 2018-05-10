/**
 * PersonneController
 *
 * @description :: Server-side logic for managing Personnes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const FillPdf = require('../implementations/FillPdf');
const Personne = require('../implementations/PersonneImpl');
const Classe = require('../implementations/ClasseImpl');
const SparqlClient = require('sparql-client-2');
var user='gharbi';
var password='ayoub';
const endpoint = 'http://'+user+':'+password+'@localhost:3030/db';
var client = new SparqlClient(endpoint);

// var user = 'gharbi';
// var password = 'ayoub';
// var base64encodedData = new Buffer(user + ':' + password).toString('base64');
// var client1 = new SparqlClient(endpoint, {
//   requestsDefaults: {
//     headers: {
//       'Authorization': 'Basic ' + base64encodedData
//     }
//   }
// });
module.exports = {

  add: function (req, res) {
    var classe = new Classe();
    classe.FindAll(client, function (result) {
      res.view('add_person',{classes:result});
    });
  },
  create: function (req, res) {
    var personne = new Personne(req.body.nom, req.body.prenom, req.body.cin,'',req.body.classe);
    personne.Create(client, function (result) {
      //res.send(result);
      res.redirect('/Personne/list');
    });
  },
  edit: function (req, res) {
    console.log('******************************************************************');
    var personne = new Personne();
    personne.FindOne(client, req.params.id, function (result) {
      //res.send(result);
      res.view('edit_person', { personne: result });
    });
  },
  update: function (req, res) {
    var personne = new Personne(req.body.nom, req.body.prenom, req.body.cin, req.body.id);
    personne.Update(client, function (result) {
      //res.send(result);
      res.redirect('/Personne/list');
    });
  },
  delete: function (req, res) {
    var personne = new Personne();
    personne.Delete(client, req.params.id, function (result) {
      //res.send(result);
      res.redirect('/Personne/list');
    });
  },
  list: function (req, res) {
    var personne = new Personne();
    personne.FindAll(client, function (result) {
      //res.send(result);
      res.view('list_person', { personnes: result });
    });
  },
  fillform: function (req, res){
    var fields= {
      txtcode_autorisation: '1',
      txtmois: '10',
      txtannees: '2018',
      txtraison_sociale: "السعد e-SAAD Med ben Aicha",
      txtadress: 'Route Touristique Chott mariem 4042 Sousse Tunisie',
      txtcode_postal: '4042',
      txtactivit: "Accompagnement à domicile, auxiliaire de vie , aide_soignant",
      txtjours_arret_act: '01',
      txtmois_arret_act: '10',
      txtannees_arret_act: '2020',
      txtbase_réduction_1: 'xxxxxx',
      txtmontant_réduction_1: '1000 dt',
      txtbase_réduction_2: 'yyyyyy',
      txtmontant_réduction_2: '1000 dt'
    };
    var modelpdf= 'C:/Users/USER4/Desktop/PDF_Modél/Déclaration_mensuelle_Page1_Model.pdf';
    var resultpdf='C:/Users/USER4/Desktop/PDF_Modél/Déclaration_mensuelle_Page1_Model_output.pdf';
    console.log(fields);
    var pdf= new FillPdf(fields,modelpdf,resultpdf);
    pdf.generateFormsPdf();
    res.send('fill pdf -->');
  }
};

