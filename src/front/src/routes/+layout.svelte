<script>
	import favicon from '$lib/assets/favicon.svg';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { Styles } from '@sveltestrap/sveltestrap';

	let { children } = $props();
</script>
<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Styles />

<Header></Header>
<hr>
{@render children()}
<hr>
<Footer></Footer>