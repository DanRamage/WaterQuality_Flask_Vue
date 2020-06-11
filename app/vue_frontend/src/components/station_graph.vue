<template>
    <div class="container-fluid full-graph">
        <div class="card">
            <div class="card-body">
                <button type="button" class="btn btn-primary" @click="$router.go(-1)">&laquo; Back</button>
                <div class="card-title font-avenir">
                    Site: {{site_name}}
                </div>
                <div class="card-subtitle avenir-font-light">
                    ID: {{site_id}}
                </div>
                <div class="row">
                    <div class="col-12 full-graph">
                        <WQPlot :chart_options="chart_options"
                                id='station_graph'
                                :station_data="graph_data">
                        </WQPlot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import WQPlot from "@/components/scatter_plot";
    import Highcharts from 'highcharts';

    export default {
        name: 'StationGraph',
        props: {
            'site_name': {type: String, default: 'Site Name'},
            'site_id': {type: String, default: 'Site Id'},
            'graph_data': {type: Array, default: function() {return []}}
        },
        components: {
            WQPlot
        },
        data()
        {
            return {
                chart_options: {
                    chart: {
                        backgroundColor: 'rgba(0,0,0,0)',
                        defaultSeriesType: 'scatter',
                        marginRight: 0,
                        marginLeft: 65,
                        marginTop: 20
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: null
                    },
                    colors: ['#333333'],
                    xAxis: {
                        endOnTick: true,
                        showLastLabel: false,
                        title: {
                            text: 'Date',
                            offset: 30
                        },
                        type: 'datetime',
                        dateTimeLabelFormats: {
                            day: '%e %b \'%y',
                            week: '%e %b \'%y',
                            month: '%e %b \'%y',
                            year: '%e %b \'%y',
                        },
                        labels: {
                            rotation: 0,
                            y: 20
                        },
                        tickWidth: 0
                    },
                    yAxis: {
                        type: 'logarithmic',
                        showFirstLabel: false,
                        tickPositioner: function (min, max) {
                            min;
                            max;
                            var ticks = [1, 10, 100, 1000, 10000],
                                i = ticks.length;

                            while (i--)
                                ticks[i] = this.val2lin(ticks[i]);

                            return ticks;
                        },
                        labels: {
                            formatter: function () {
                                return this.value < 10 ? 1 : this.value;
                            }
                        },
                        gridLineWidth: 0,
                        lineWidth: 1,
                        title: {
                            text: 'Bacteria per 100 mL',
                            margin: 25
                        },
                        plotBands: [
                            {
                                color: '#96ca2d',
                                from: this.$store.state.advisory_limits.low.minimum,
                                to: this.$store.state.advisory_limits.hi.minimum
                            },
                            {
                                color: '#DB1A0F',
                                from: this.$store.state.advisory_limits.hi.minimum,
                                to: 10000
                            }
                        ]
                    },
                    tooltip: {
                        formatter: function () {
                            return '<strong>Date:</strong> ' + Highcharts.dateFormat('%e %B %Y', this.x) + '<br /><strong>Bacteria level:</strong> ' + Math.round(this.y);
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    series: [{
                        name: 'Station',
                        data: []
                    }]

                }
            }
        },
        mounted() {
            console.log("StationGraph mounted.");
            //We aren't passing the props in the vue route path, so we check the params to then set the properties.
            if('params' in this.$route) {
                if('site_id' in this.$route.params)
                {
                    this.site_id = this.$route.params.site_id;
                }
                if('site_name' in this.$route.params)
                {
                    this.site_name = this.$route.params.site_name;
                }
                if('graph_data' in this.$route.params)
                {
                    this.graph_data = this.$route.params.graph_data;
                }
            }
        },
        methods: {
            onClose() {
                console.log("onClose modal_graph_closed event emitted.");
                this.$emit("modal_graph_closed");
            }
        }
    }
</script>
<style scoped>
    .full-graph {
        width: 100%;
        height: 100%;
    }
</style>
