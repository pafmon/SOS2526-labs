
let BASE_URL_API = "/api/v1";

export function loadBackend(app){

  let contacts = [{ name: "peter", phone: 123456},{ name: "john",   phone: 23456}];

  app.get(BASE_URL_API+"/contacts", (req,res)=>{
    let jsonData = JSON.stringify(contacts,null,2);
    console.log(`JSON Data to be sent: ${jsonData}`);
    res.send(jsonData);
  });

  app.post(BASE_URL_API+"/contacts", (req,res)=>{
    let newContact = req.body;
    console.log(`New contact received: ${JSON.stringify(newContact,null,2)}`);
    contacts.push(newContact);
    res.sendStatus(201,"CREATED");
  });

}
