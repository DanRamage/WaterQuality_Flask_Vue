<template>
    <div
         :id="id"
         :height="style_chart_height"
         :width="style_chart_width"
    >
    </div>
</template>

<script>

    import Highcharts from 'highcharts';
    import moment from 'moment';

    export default {
        name: 'WQPlot',
        props: {
            'chart_options': Object,
            'id': { type: String, default: 'chart_id'},
            'station_data': Array,
            'height': Number,
            'width': Number
        },
        data () {
            return {
                chart: undefined
            }
        },
        methods: {
        },
        mounted()
        {
            console.log("scatter_plot mounted")
            //v-bind:style="{height: height, width: width }"
            var vm=this;
            vm;
            //vm.chart = new Highcharts.chart(vm.id, vm.chart_options);
            this.$nextTick(function() {
                vm.chart = new Highcharts.chart(vm.id, vm.chart_options);
                if(this.station_data.length)
                {
                    this.chart.series[0].setData(this.station_data);//({data: this.station_data, name: "Bacteria Counts"});
                    this.chart.xAxis[0].setExtremes(moment.utc().subtract(365, "days").valueOf(), moment.utc().valueOf());
                }
            });
        },
        computed: {
            style_chart_height: function() {
                let style = this.height + 'px';
                console.log("chart height: " + style);
                return(style);
            },
            style_chart_width: function() {
                let style = this.width + 'px';
                console.log("chart width: " + style);
                return(style);
            }
        },
        watch: {

            height: function(newVal, oldVal)
            {
                console.log("height updated: " + newVal + " to " + oldVal);
                this.height = newVal;
                if(this.chart !== undefined) {
                    //this.chart.reflow();
                    this.chart.setSize(this.width, this.height);
                }
            },
            width: function(newVal, oldVal)
            {
                console.log("width updated: " + newVal + " to " + oldVal);
                this.width = newVal;
                if(this.chart !== undefined) {
                    //this.chart.reflow();
                    this.chart.setSize(this.width, this.height);
                }
            },

            station_data: function() {
                if(this.chart === undefined) {
                    this.chart = new Highcharts.chart(this.id, this.chart_options);
                }
                this.chart.setSize(this.width, this.height);
                this.chart.series[0].setData(this.station_data);
                this.chart.xAxis[0].setExtremes(moment.utc().subtract(365, "days").valueOf(), moment.utc().valueOf());

            },
            /*
            title(newValue)
            {
                this.chartOptions.title.text = newValue;
            },
            points(newValue)
            {
                this.chartOptions.series[0].data = newValue;
            },
            chartType(newValue)
            {
                this.chartOptions.chart.type = newValue.toLowerCase();
            },
            seriesColor (newValue)
            {
                this.chartOptions.series[0].color = newValue.toLowerCase();
            },
            animationDuration (newValue)
            {
                this.updateArgs[2].duration = Number(newValue);
            }*/
        }
    }
</script>

<style scoped>
    .chartElem {
    }
</style>
