<script>
  // @ts-ignore
  let contacts = $state([]);
  import { dev } from '$app/environment';
  import { onMount } from 'svelte';
 
  let API = '/api/v1/contacts';

  if(dev)
    API = "http://localhost:3000"+API;

  async function getContacts(){
    const res = await fetch(API,{
      method : "GET"
    });
    const data = await res.json();
    contacts  = data;
  }

  onMount(async () => {
    getContacts();
  });

</script>

<p>Contacts</p>

<ul>
{#each contacts as contact (contact.name)}
  <li>{contact.name} - {contact.phone}</li>
{/each}
</ul>

<button onclick={getContacts}>Refresh</button>