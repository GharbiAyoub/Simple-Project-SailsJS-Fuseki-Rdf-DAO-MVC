module.exports = class Classe {
    constructor(id, libelle) {
        this.id = id;
        this.libelle = libelle;
    }
    Create(client, call) {
        var rand = Math.random();
        var query =
            "PREFIX  agent: <http://www.semanticweb.org/ontologies/2016/e-Saad/Agent#>" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX  personneuri: <http://yourUri/projectUri/Classe/>" +
            "Insert data " +
            "{" +
            "personneuri:" + rand + "  rdf:type <http://yourUri/projectUri.rdf#Classe>." +
            "personneuri:" + rand + "  agent:id     " + rand + "." +
            "personneuri:" + rand + "  agent:libelle    '" + this.libelle + "'." +
            "};";
        client.query(query)
            .execute()
            .then(function (results) {
                call('Class Added.')
            })
            .catch(function (error) {
                // Oh noes! 🙀
                call('Failed to Add Class.');
            });
    }

    Delete(client, id, call) {
        //var query = ' Personne[nom: ' + this.nom + ',prenom: ' + this.prenom + ',cin: ' + this.cin + '] Action= DELETE.';
        var result;
        var query =
            "DELETE { ?s ?p ?o }WHERE {?s ?p ?o ; <http://www.semanticweb.org/ontologies/2016/e-Saad/Agent#id> " + id + "}";
        //console.log(query);
        client.query(query)
            .execute()
            .then(function (results) {
                call('Class Deleted.');
            })
            .catch(function (error) {
                // Oh noes! 🙀
                call('Failed To Delete Class .');
            });
    }

    Update(client, call) {
        var query =
            "PREFIX  agent: <http://www.semanticweb.org/ontologies/2016/e-Saad/Agent#>" +
            "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
            "DELETE{\n" +
            "?y agent:id ?id.\n" +
            "?y agent:libelle ?libelle.\n" +
            "}\n" +
            "INSERT{\n" +
            "?y agent:libelle '" + this.libelle + "'.\n" +
            "}\n" +
            "WHERE{\n" +
            "?y agent:id " + this.id + ".\n" +
            "?y agent:libelle ?libelle.\n" +
            "}";
        //console.log(query);
        client.query(query)
            .execute()
            .then(function (results) {
                call('Class Updated.');
            })
            .catch(function (error) {
                // Oh noes! 🙀
                call('Failed To Update Class .');
            });
    }

    FindAll(client, call) {
        //console.log(client);
        var query =
            "PREFIX  agent: <http://www.semanticweb.org/ontologies/2016/e-Saad/Agent#>" +
            "PREFIX  rdf:  <http://www.w3.org/2000/01/rdf-schema#>\n " +
            "SELECT  ?id ?libelle \n" +
            "WHERE  {" +
            "?y  agent:id ?id ;\n" + "agent:libelle ?libelle  ;\n" +
            "}"
        //console.log(query);
        client.query(query)
            .execute()
            .then(function (results) {
                call(results.results.bindings);
            })
            .catch(function (error) {
                // Oh noes! 🙀
                call(error);
            });
    }

    FindOne(client, id, call) {
        var query =
            "PREFIX  agent: <http://www.semanticweb.org/ontologies/2016/e-Saad/Agent#>" +
            "PREFIX  rdf:  <http://www.w3.org/2000/01/rdf-schema#>\n " +
            "SELECT ?id ?libelle \n" +
            "WHERE  {" +
            "?y  agent:id " + id + " ;\n" + "agent:id ?id    ;\n" + "agent:libelle ?libelle      ;\n" +
            "}"
        console.log(query);
        client.query(query)
            .execute()
            .then(function (results) {
                call(results.results.bindings[0]);
            })
            .catch(function (error) {
                // Oh noes! 🙀
                call(error);
            });
    }


    FindAllSalle(client, call) {
        console.log('*********************************')
        var query =
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX  agent: <http://www.semanticweb.org/ontologies/2016/e-Saad/Agent#>\n " +
            "select ?id ?start_date ?end_date ?text ?salle \n" +
            "WHERE  {" +
            "?X rdf:type <http://yourUri/projectUri.rdf#Seance>.\n" +
            "?X agent:id  ?id."+
            "?X agent:start_date   ?start_date."+
            "?X agent:end_date    ?end_date."+
            "?X agent:text ?text."+
            "?X agent:salle ?salle."+
            "}"
        //console.log(query);
        client.query(query)
            .execute()
            .then(function (results) {
                //this.serializeJson(results.results.bindings);
                console.log(results.results.bindings.length);
                for(var i =0; i<results.results.bindings.length; i++){
                    results.results.bindings[i]['id']=results.results.bindings[i]['id'].value
                    results.results.bindings[i]['start_date']=results.results.bindings[i]['start_date'].value
                    results.results.bindings[i]['end_date']=results.results.bindings[i]['end_date'].value
                    results.results.bindings[i]['text']=results.results.bindings[i]['text'].value
                    results.results.bindings[i]['salle']=results.results.bindings[i]['salle'].value
                    console.log(results.results.bindings[i])
                }
                call(results.results.bindings);
                
            })
            .catch(function (error) {
                // Oh noes! 🙀
                call(error);
            });
    }

    serializeJson(result){
        console.log(result.length)
        for(var i =0; i<result.length; i++){
            console.log('///// '+result[i])
        }
    }
}