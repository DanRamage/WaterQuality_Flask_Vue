<template>
    <div class="container-fluid">
        <div class="card">
            <div class="card-body">
                <button type="button" class="btn btn-primary avenir-font background_color" @click="$router.go(-1)">&laquo; Back</button>
                <div class="card-title font-avenir">
                    <h2>Site: {{site_name}}</h2>
                </div>
                <div class="card-subtitle avenir-font-light">
                   <h3>ID: {{site_id}}</h3>
                </div>
                <div ref="days_buttons" class="btn-group">
                    <button type="button" class="btn btn-outline-info" :class="{active: activeBtn === 30}" @click="daysButtonClick($event, 30)">30 days</button>
                    <button type="button" class="btn btn-outline-info" :class="{active: activeBtn === 60}" @click="daysButtonClick($event,60)">60 days</button>
                    <button type="button" class="btn btn-outline-info" :class="{active: activeBtn === 90}" @click="daysButtonClick($event,90)">90 days</button>
                    <button type="button" class="btn btn-outline-info" :class="{active: activeBtn === 180}" @click="daysButtonClick($event,180)">180 days</button>
                    <button type="button" class="btn btn-outline-info" :class="{active: activeBtn === 365}" @click="daysButtonClick($event,365)">365 days</button>
                </div>
                <div class="row">
                    <div class="col-12 full-graph">
                        <WQPlot ref="station_graph"
                                :chart_options="chart_options"
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
    //import moment from 'moment/src/moment';
    import moment from 'moment';
    import DataAPI from "../utilities/rest_api";

    import WQPlot from "@/components/scatter_plot";
    import Highcharts from 'highcharts';
    //import FeatureUtils from "../utilities/feature_funcs";

    export default {
        name: 'StationGraph',
        props: {
            'site_id': {type: String, default: 'Site Id'},
        },
        components: {
            WQPlot
        },
        data()
        {
            return {
                activeBtn: 365,
                site_description: '',
                graph_data: [],
                chart_ref: undefined,
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
                /*
                if('graph_data' in this.$route.params)
                {
                    this.graph_data = this.$route.params.graph_data;
                }
                */
            }

            //We pull the last 365 days worth of data to show.
            this.chart_ref = this.$refs.station_graph;
            this.pastData(365);
        },
        methods: {
            daysButtonClick(button_clicked, days) {
                this.activeBtn = days;  //We use this to toggle the active class on the button.≠≠
                this.pastData(days);
            },
            pastData(days_back) {
                console.log("Retrieving: " + days_back + " days of data.")
                let vm=this;
                let location_site_name = this.$store.state.site_name;
                let start_date = moment().subtract(days_back, 'days').format("YYYY-MM-DD 00:00:00");
                let end_date = moment.utc().format("YYYY-MM-DD HH:mm:ss");
                this.graph_data = [];
                DataAPI.GetSiteData(location_site_name, this.site_id, start_date, end_date)
                    .then(response => {
                        vm.feature_data = response.data;
                        let site_type = vm.feature_data.properties.site_type;
                        if (site_type in vm.feature_data.properties) {
                            vm.feature_data.properties[site_type].advisory.results.forEach(function (rec) {
                                let date_val = moment(rec.date);
                                vm.graph_data.push([date_val.valueOf(), rec.value]);
                            });
                            vm.chart_ref.chart.xAxis[0].setExtremes(moment.utc().subtract(days_back, "days").valueOf(), moment.utc().valueOf());

                        }
                    })
                    .catch(error => console.error(error));

            },
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
    .background_color {
        background-color: rgba(0, 61, 126, .85);
    }

</style>
