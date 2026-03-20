import dataStore from 'nedb';

let BASE_URL_API = "/api/v1";
let DOCS_URL = "https://documenter.getpostman.com/view/359472/2sBXcLfGtG";

let db = new dataStore();


export function loadBackend(app) {

  let contacts = [{ name: "peter", phone: 123456 }, { name: "john", phone: 23456 }];

  db.insert(contacts);

  app.get(BASE_URL_API + "/contacts", (req, res) => {

    db.find({}, (err, contacts) => {
      let jsonData = JSON.stringify(contacts.map((c) => {
        delete c._id; return c;
      }), null, 2);
      console.log(`JSON Data to be sent: ${jsonData}`);
      res.send(jsonData);
    });

  });


  app.get(BASE_URL_API + "/contacts/:name", (req, res) => {
    let name = req.params.name;
    
    console.log(`Get Contact: ${name}`);

    db.find({name}, (err, contacts) => {
      let jsonData = JSON.stringify(contacts.map((c) => {
        delete c._id; return c;
      }), null, 2);
      if(contacts.length > 0){
        if(contacts.length > 1){
          console.log("WARNING!!! There are multiple contacts with name "+name);
        }
        res.send(contacts[0]);
      }else{
         res.sendStatus(404,"Not Found"); 
      }
    });

  });

  app.put(BASE_URL_API + "/contacts/:name", (req, res) => {
    let name = req.params.name;
    let updatedContact = req.body;
    console.log(`Update Contact ${name} with: \n ${updatedContact}`);

    db.find({name}, (err, contacts) => {

      if(contacts.length > 0){
        if(contacts.length > 1){
          console.log("WARNING!!! There are multiple contacts with name "+name);
        }
        
        db.update({name},updatedContact,{}, (err,numUpdated)=>{ 
          if(err){
                console.error(`Error updating: ${err}`);
                res.sendStatus(500,"Server Error"); 
            } else {
              if(numUpdated>0){
                 res.sendStatus(200,"Ok");
              } else {
                 res.sendStatus(500,"Server Error"); 
              }
            }
        });
      }else{
        console.log(`Contacts found: ${contacts}`)
         res.sendStatus(404,"Not Found"); 
      }
    });

  });



  app.post(BASE_URL_API + "/contacts", (req, res) => {
    let newContact = req.body;
    console.log(`New contact received: ${JSON.stringify(newContact, null, 2)}`);

    db.find({ name: newContact.name }, (err, contacts) => {
      if (contacts.length > 0) {
        res.sendStatus(409, "CONFLICT");
      } else {

        db.insert(newContact);
        res.sendStatus(201, "CREATED");
      }
    });


  });

  app.delete(BASE_URL_API + "/contacts/:name", (req, res) => {
    let name = req.params.name;

    console.log(`Contact to be deleted: ${name}`);

    db.find({ "name": name }, (err, contacts) => {
      if (contacts.length == 0) {
        res.sendStatus(404, "NOT FOUND");
      } else {

        db.remove({ "name": name },{},(err,numRemoved) => {
          if(err){
              console.log(`Error: ${err}`);
              res.sendStatus(500, "ERROR");
          }else{
            res.sendStatus(200, "OK");
          }
        });
      }
    });




  });

  app.get(BASE_URL_API + "/contacts/docs", (req, res) => {
    console.log("Getting DOCS");
    res.redirect(DOCS_URL);
  });

}
