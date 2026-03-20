<script>
  import {page} from '$app/state';
  import { dev } from '$app/environment';
  import { onMount } from 'svelte';
  import { Button, Table } from '@sveltestrap/sveltestrap';
 
  let name = page.params.name;

  let API = '/api/v1/contacts';

  if(dev)
    API = "http://localhost:3000"+API;

  // @ts-ignore
  let resultStatusCode = $state(0);
  let updatedName = $state("sampleName");
  let updatedPhone = $state("samplePhone");

  async function getContact(){
    const res = await fetch(API+"/"+name,{
      method : "GET"
    });
    const contact = await res.json();
    updatedName  = contact.name;
    updatedPhone  = contact.phone;
    
  }

   async function updateContact(){
    let updatedContact = {
      name: updatedName,
      phone: updatedPhone
    };

    const res = await fetch(API+"/"+name,{
      method : "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedContact)
    });

    resultStatusCode = await res.status;
    
    if(resultStatusCode == 200)
      getContact();
  }

  onMount(async () => {
    getContact();
  });

</script>

<p>Contact Detail: {name}</p>

<Table>
  <thead>
      <tr>
        <th>Name</th>
        <th>Phone</th>
        <th>Action</th>
      </tr>

  </thead>
  <tbody>
    <tr>
      <td>{updatedName}</td>      
      <td><input bind:value={updatedPhone}/></td>      
      <td> <Button color="primary" onclick={updateContact}>Update</Button> </td>
    </tr>
  </tbody>
</Table>


{#if resultStatusCode != 0}
<h5>StatusCode of Operation: {resultStatusCode}</h5>
{/if}