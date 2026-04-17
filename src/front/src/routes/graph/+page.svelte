<svelte:head>
    <script src="https://code.highcharts.com/maps/highmaps.js"></script>
  <script src="https://code.highcharts.com/maps/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/maps/modules/offline-exporting.js"></script>
  <script src="https://code.highcharts.com/maps/modules/data.js"></script>
  <script src="https://code.highcharts.com/maps/modules/accessibility.js"></script>
  <script src="https://code.highcharts.com/themes/adaptive.js"></script>

</svelte:head>

<script>
    import Highcharts from 'highcharts';
    import { onMount } from 'svelte';

//    let myData = $state([1,2,3,4,5,6]);

    onMount(async () => {
/*
      const res = await fetch("/api/v1/data");

      myData = await res.json();

      Highcharts.chart('container', {
        series: [{
            name: 'My Data',
            data: myData,
        }]
      });

*/



    const topology = await fetch(
        'https://code.highcharts.com/mapdata/custom/europe.topo.json'
    ).then(response => response.json());

    // Instantiate the map
      Highcharts.mapChart('container', {
        chart: {
            map: topology,
            spacingBottom: 20
        },

        title: {
            text: 'Europe time zones'
        },

        accessibility: {
            series: {
                descriptionFormat: 'Timezone {series.name} with ' +
                    '{series.points.length} countries.'
            },
            point: {
                valueDescriptionFormat: '{point.name}.'
            }
        },

        legend: {
            enabled: true
        },

        plotOptions: {
            map: {
                allAreas: false,
                joinBy: ['iso-a2', 'code'],
                dataLabels: {
                    enabled: true,
                    color: '#FFFFFF',
                    style: {
                        fontWeight: 'bold'
                    },
                    // Only show dataLabels for areas with high label rank
                    format: '{#if (lt point.properties.labelrank 5)}' +
                        '{point.properties.iso-a2}' +
                        '{/if}'
                },
                tooltip: {
                    headerFormat: '',
                    pointFormat: '{point.name}: <b>{series.name}</b>'
                }
            }
        },

        series: [{
            name: 'UTC',
            data: ['IE', 'IS', 'GB', 'PT'].map(code => ({ code }))
        }, {
            name: 'UTC + 1',
            data: [
                'NO', 'SE', 'DK', 'DE', 'NL', 'BE', 'LU', 'ES', 'FR', 'PL',
                'CZ', 'AT', 'CH', 'LI', 'SK', 'HU', 'SI', 'IT', 'SM', 'HR',
                'BA', 'YF', 'ME', 'AL', 'MK'
            ].map(code => ({ code }))
        }, {
            name: 'UTC + 2',
            data: [
                'FI', 'EE', 'LV', 'LT', 'BY', 'UA', 'MD', 'RO', 'BG', 'GR',
                'TR', 'CY'
            ].map(code => ({ code }))
        }, {
            name: 'UTC + 3',
            data: [{
                code: 'RU'
            }]
        }]
    });


    });
</script>

<div id="container"></div>