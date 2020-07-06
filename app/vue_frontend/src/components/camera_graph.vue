<template>
    <div class="container-fluid">
        <div class="card">
            <div class="card-body object-counts">
                <button type="button" class="app-button-style btn btn-primary avenir-font" @click="$router.go(-1)">&laquo; Back</button>
                <div class="card-title font-avenir">
                    <h2>Site: {{site_name}}</h2>
                </div>
                <div class="card-subtitle avenir-font-light">
                   <h3>ID: {{site_id}}</h3>
                </div>
                <div class="row mt-4">
                    <div class="col-3">
                        <h5 class="d-inline-block">Object Count Selection </h5>
                        <b-dropdown id="object_type_dropdown" :text="object_count_display_string" class="object_type_dropdown m-md-2">
                            <b-dropdown-item @click="objectTypeSelected($event, 'person', 'People')">People</b-dropdown-item>
                            <b-dropdown-item @click="objectTypeSelected($event, 'chair', 'Chairs')">Chairs</b-dropdown-item>
                            <b-dropdown-item @click="objectTypeSelected($event, 'umbrella', 'Umbrellas')">Umbrellas</b-dropdown-item>
                            <b-dropdown-item @click="objectTypeSelected($event, 'bird', 'Birds')">Birds</b-dropdown-item>
                            <b-dropdown-item @click="objectTypeSelected($event, 'dog', 'Dogs')">Dogs</b-dropdown-item>
                        </b-dropdown>
                    </div>
                    <div class="col-6">
                        <div class="row">
                            <div class="col-3">
                                <label for="start_date"><h5>Start Date</h5></label>
                            </div>
                            <div class="col-9">
                                <b-form-datepicker id="start_date"
                                                   :initial-date="start_date"
                                                   v-model="start_date"
                                                   class="mb-2"></b-form-datepicker>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-3">
                                <label for="end_date"><h5>End Date</h5></label>
                            </div>
                            <div class="col-9">
                                <b-form-datepicker id="end_date"
                                                   :initial-date="end_date"
                                                   v-model="end_date"
                                                   class="mb-2"></b-form-datepicker>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <button type="button"
                                class="app-button-style btn btn-outline-primary mb-1"
                            @click="graphCounts()">
                            Graph Counts
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div :id="graph_id">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'

    import moment from 'moment';
    import DataAPI from "../utilities/rest_api";

    import Highcharts from 'highcharts';
    //import FeatureUtils from "../utilities/feature_funcs";
    import {DropdownPlugin, FormDatepickerPlugin} from 'bootstrap-vue';
    Vue.use(DropdownPlugin);
    Vue.use(FormDatepickerPlugin);

    export default {
        name: 'CameraGraph',
        props: {
            'site_id': {type: String, default: 'Site Id'},
            'camera_name': {type: String, default: ''}
        },
        components: {
        },
        data()
        {
            return {
                start_date: moment().subtract(7, 'days').format("YYYY-M-D"),
                end_date: moment().format("YYYY-M-D"),
                graph_id: "camera_graph",
                site_description: '',
                object_count_display_string: 'People',
                object_count_type: 'person',
                graph_data: [],
                chart_ref: undefined,
                chart: undefined,
                chart_options: {
                    chart: {
                        type: 'column',
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: "Total Objects Detected Per Hour"
                    },
                    colors: ['#333333'],
                    time: {
                        timezone: 'America/New_York',
                        useUTC: false
                    },
                    xAxis: {
                        endOnTick: true,
                        showLastLabel: false,
                        title: {
                            text: 'Date',
                            offset: 30
                        },
                        type: 'datetime',
                        dateTimeLabelFormats : {
                            day: '%e %b \'%y',
                            hour: "%I:%M %p"
                        },
                        /*
                        dateTimeLabelFormats: {
                            week: '%e %b \'%y',
                            month: '%e %b \'%y',
                            year: '%e %b \'%y',
                        },
                        labels: {
                            rotation: 0,
                            y: 20
                        },
                        */
                        tickInterval: 3600 * 1000
                    },
                    yAxis: {
                        showFirstLabel: false,
                        title: {
                            text: 'People count',
                            margin: 20
                        }
                    },
                    tooltip: {
                        formatter: function () {
                            let date_time = moment(this.x);
                            return '<strong>Date:</strong> ' + date_time.format('YYYY-MM-DD hh:mm:ss') + '<br /><strong>Count:</strong> ' + Math.round(this.y);
                            //return '<strong>Date:</strong> ' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br /><strong>Count:</strong> ' + Math.round(this.y);
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
            let vm = this;
            console.log("CameraGraph mounted.");

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
                if('camera_name' in this.$route.params)
                {
                    this.camera_name = this.$route.params.camera_name;
                }
            }
            let start_date = moment().subtract(7, 'days');
            let end_date = moment();
            this.getCameraData(this.camera_name, 'person', start_date, end_date);

            this.$nextTick(function() {
                vm.chart = new Highcharts.chart(vm.graph_id, vm.chart_options);
            });

        },
        methods: {
            objectTypeSelected(event, object_type, type_display_string) {
                this.object_count_display_string = type_display_string;
                this.object_count_type = object_type;
            },
            graphCounts() {
                this.graph_data = [];
                this.chart.series[0].setData(this.graph_data);
                this.chart.yAxis[0].setTitle({ text: this.object_count_display_string + ' count'});
                this.getCameraData(this.camera_name, this.object_count_type, this.start_date, this.end_date);
            },
            getCameraData(camera, object_type, start_date, end_date) {
                console.log("Querying camera: :" + camera + ". Start: " + start_date +" End: " + end_date);
                let vm=this;
                vm;
                //let start_date_obj = moment(start_date);
                //let end_date_obj = moment(end_date);
                DataAPI.GetCameraData(camera,
                    object_type,
                    this.start_date, //start_date_obj.format("YYYY-M-D"),
                    this.end_date)//end_date_obj.format("YYYY-M-D"))
                    .then(response => {
                        let data = response.data;
                        //This groups the data by time stamp counts.
                        //We collate counts for each record that has the same time stamp.
                        let dSum = [];
                        let objCount = 0;
                        let dTimePrev = undefined;
                        for (var i = 0; i < data.length; i++) {
                            let curTime = moment(data[i].m_date);
                            if (i == 0) {
                                dTimePrev = curTime;
                            }
                            if (curTime.diff(dTimePrev) == 0) {
                                objCount++;
                            }
                            else {
                                dSum.push({ m_date: dTimePrev, object_count: objCount });
                                objCount = 0;
                                dTimePrev = curTime;
                            }

                        }
                        dSum;

                        let hour_counts = {};
                        //BUild an hourly summary
                        dSum.forEach(function(rec)
                        {
                            let cur_key = rec.m_date.format('YYYY-MM-DD');
                            if(!(cur_key in hour_counts)) {
                                hour_counts[cur_key] = [];
                                let i = 0;
                                while(i < 24) {
                                    hour_counts[cur_key].push({count: 0, rec_count: 0});
                                    i++;
                                }
                            }
                            let count_rec = hour_counts[cur_key];
                            let rec_hour = rec.m_date.get('hour');
                            if(rec.object_count > 0) {
                                count_rec[rec_hour]['count'] += rec.object_count;
                                count_rec[rec_hour]['rec_count'] += 1;
                            }
                        });
                        hour_counts;

                        //Now we order the data for the graph. Probably can do this is the step above, but
                        //for now one more step.
                        for(let date_key in hour_counts)
                        {
                            let day_counts = hour_counts[date_key];
                            day_counts.forEach(function(obj_count, hour_index, counts_array)
                           {
                               counts_array;
                               let hour_str =  hour_index;
                               if(hour_index < 10)
                               {
                                   hour_str = '0' + hour_index;
                               }
                               let time_stamp_str = date_key  + ' ' + hour_str + ':00:00';
                               let time_stamp_obj = moment(time_stamp_str);
                               let avg_hour_count = 0;
                               if(obj_count['rec_count'] > 0) {
                                   avg_hour_count = obj_count['count'] / obj_count['rec_count'];
                               }
                               vm.graph_data.push([time_stamp_obj.valueOf(), avg_hour_count]);
                           })
                        }
                        vm.chart.series[0].setData(vm.graph_data);

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
<style>
    .button_color {
        background-color: rgba(0, 61, 126, .85);
        border-color: #FFFFFF;
        opacity: 0.75;
    }
    .object_type_dropdown > button {
        background-color: rgba(0, 61, 126, .85);
        border-color: #FFFFFF;
        opacity: 0.75;
    }

    .object_type_dropdown > .btn-secondary:hover,
    .object_type_dropdown > .btn-secondary:focus,
    .object_type_dropdown > .btn-secondary:active {
        color: rgba(0, 61, 126, .85);
        background-color: #FFFFFF;
        opacity: 0.75;
    }
</style>
<style scoped>
    .blue-background_color {
        background-color: rgba(0, 61, 126, .85);
    }

    .full-graph {
        width: 100%;
        height: 100%;
    }
    .object-counts {
        background-color: rgba(0, 61, 126, .85);
        color: #FFFFFF
    }

</style>
