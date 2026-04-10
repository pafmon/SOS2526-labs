<script>
    import Highcharts from 'highcharts';
    import { onMount } from 'svelte';

    onMount(async () => {
      Highcharts.chart('container', {
        series: [{
            name: 'Installation & Developers',
            data: [
                43934, 48656, 65165, 81827, 112143, 142383,
                171533, 165174, 155157, 161454, 154610, 168960, 171558
            ]
        }, {
            name: 'Manufacturing',
            data: [
                24916, 37941, 29742, 29851, 32490, 30282,
                38121, 36885, 33726, 34243, 31050, 33099, 33473
            ]
        }]
      });

    });

</script>

<div id="container"></div>