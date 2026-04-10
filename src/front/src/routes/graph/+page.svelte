<script>
    import Highcharts from 'highcharts';
    import { onMount } from 'svelte';

    let myData = $state([1,2,3,4,5,6]);

    onMount(async () => {

      const res = await fetch("/api/v1/data");

      myData = await res.json();

      Highcharts.chart('container', {
        series: [{
            name: 'My Data',
            data: myData,
        }]
      });

    });

</script>

<div id="container"></div>