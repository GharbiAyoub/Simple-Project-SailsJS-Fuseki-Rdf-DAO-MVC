module.exports = class Personne {
    constructor(nom, prenom, cin, id, classe) {
        this.nom = nom;
        this.prenom = prenom;
        this.cin = cin;
        this.id = id;
        this.classe = classe;
    }
    Create(client, call) {
        var rand = Math.random();
        var query =
            "PREFIX  agent: <http://www.semanticweb.org/ontologies/2016/e-Saad/Agent#>" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX  personneuri: <http://yourUri/projectUri/Personne/>" +
            "Insert data " +
            "{" +
            "personneuri:" + rand + "  rdf:type <http://yourUri/projectUri.rdf#Personne>." +
            "personneuri:" + rand + "  agent:id     " + rand + "." +
            "personneuri:" + rand + "  agent:cin    '" + this.cin + "'." +
            "personneuri:" + rand + "  agent:nom    '" + this.nom + "'. " +
            "personneuri:" + rand + "  agent:prenom '" + this.prenom + "'. " +
            "personneuri:" + rand + "  agent:classe '" + this.classe + "'. " +
            "};";
            console.log(query)
        client.query(query)
            .execute()
            .then(function (results) {
                call('Person Added.')
            })
            .catch(function (error) {
                // Oh noes! 🙀
                call('Failed to Add Person.');
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
                call('Person Deleted.');
            })
            .catch(function (error) {
                // Oh noes! 🙀
                call('Failed To Delete Person .');
            });
    }

    Update(client, call) {
        var query =
            "PREFIX  agent: <http://www.semanticweb.org/ontologies/2016/e-Saad/Agent#>" +
            "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
            "DELETE{\n" +
            "?y agent:cin ?cin.\n" +
            "?y agent:nom ?nom.\n" +
            "?y agent:prenom ?prenom.\n" +
            "}\n" +
            "INSERT{\n" +
            "?y agent:cin '" + this.cin + "'.\n" +
            "?y agent:nom '" + this.nom + "'.\n" +
            "?y agent:prenom '" + this.prenom + "'.\n" +
            "}\n" +
            "WHERE{\n" +
            "?y agent:id " + this.id + ".\n" +
            "?y agent:cin ?cin.\n" +
            "?y agent:nom ?nom.\n" +
            "?y agent:prenom ?prenom.\n" +
            "}";
        //console.log(query);
        client.query(query)
            .execute()
            .then(function (results) {
                call('Person Updated.');
            })
            .catch(function (error) {
                // Oh noes! 🙀
                call('Failed To Update Person .');
            });
    }

    FindAll(client, call) {
        console.log(client);
        var query =
            "PREFIX  agent: <http://www.semanticweb.org/ontologies/2016/e-Saad/Agent#>" +
            "PREFIX  rdf:  <http://www.w3.org/2000/01/rdf-schema#>\n " +
            "SELECT  ?id ?cin ?nom ?prenom ?classe \n" +
            "WHERE  {" +
            "?y  agent:id ?id ;\n" + "agent:cin ?cin  ;\n" + "agent:nom ?nom ;\n" + "agent:prenom ?prenom ;\n" + "agent:classe ?classe ;\n" +
            "}"
        console.log(query);
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
            "SELECT ?id ?cin ?nom ?prenom ?classe\n" +
            "WHERE  {" +
            "?y  agent:id " + id + " ;\n" + "agent:id ?id    ;\n" + "agent:cin ?cin      ;\n" + "agent:nom ?nom ;\n" + "agent:prenom ?prenom ;\n" + "agent:classe ?classe ;\n" +
            "}"
        //console.log(query);
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
}