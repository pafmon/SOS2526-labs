<script>


  import { dev } from '$app/environment';
  import { onMount } from 'svelte';
 
  let API = '/api/v1/contacts';

  if(dev)
    API = "http://localhost:3000"+API;

  // @ts-ignore
  let contacts = $state([]);
  let resultStatusCode = $state(0);
  let newName = $state("sampleName");
  let newPhone = $state("samplePhone");

  async function getContacts(){
    const res = await fetch(API,{
      method : "GET"
    });
    const data = await res.json();
    contacts  = data;
  }

  // @ts-ignore
  async function deleteContact(name){

    //console.log("DELETE "+name);

    const res = await fetch(API+"/"+name,{
      method : "DELETE"
    });
    resultStatusCode = await res.status;
    
    if(resultStatusCode == 200)
      getContacts();

  }

   async function insertContact(){
    let newContact = {
      name: newName,
      phone: newPhone
    };

    const res = await fetch(API,{
      method : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newContact)
    });

    resultStatusCode = await res.status;
    
    if(resultStatusCode == 201)
      getContacts();
  }

  onMount(async () => {
    getContacts();
  });

</script>

<p>Contacts</p>

<table>
  <thead>
      <tr>
        <th>Name</th>
        <th>Phone</th>
        <th>Action</th>
      </tr>

  </thead>
  <tbody>
    <tr>
      <td><input bind:value={newName}/></td>      
      <td><input bind:value={newPhone}/></td>      
      <td> <button onclick={insertContact}>Insert</button> </td>
      
    </tr>
  {#each contacts as contact (contact.name)}
    <tr>
      <td><a href="contacts/{contact.name}">{contact.name}</a></td>
      <td>{contact.phone}</td>
      <td> <button onclick={() => deleteContact(contact.name)}>Delete</button> </td>
    </tr>
  {/each}
  </tbody>
</table>

{#if resultStatusCode != 0}
<h5>StatusCode of Operation: {resultStatusCode}</h5>
{/if}