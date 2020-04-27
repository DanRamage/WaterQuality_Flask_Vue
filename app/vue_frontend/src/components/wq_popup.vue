<template>
    <div>
        <b-card class="wq-card">
            <!--<b-card-body>-->
            <div v-if="hasAdvisoryData">
                <b-card-title class="font-avenir">
                    <img :src="getAdvisoryImage()" style="height: 25px;width: 25px">
                     Site: {{feature.properties.description}}
                </b-card-title>
            </div>
            <div v-else>
                <b-card-title class="font-avenir">Site: {{feature.properties.description}}</b-card-title>
            </div>
            <b-card-sub-title class="avenir-font-light">ID: {{feature.id}}</b-card-sub-title>
            <div v-if="hasAdvisoryData">
                <b-card-text class="mt-3">
                    <p>
                        <span class="font-avenir">
                            <b>Bacteria Data: {{advisoryValue}}</b>
                        </span>
                        <br>
                        <span class="ml-4 avenir-font-light">Date: {{advisoryDate}}</span>
                    </p>
                </b-card-text>
            </div>
            <div v-if="hasNowcastData">
                <b-card-text class="mt-3">
                    <p>
                        <span class="font-avenir"><b>Nowcast: {{nowcastsValue}}</b></span>
                        <br>
                        <span class="ml-4 avenir-font-light">Date: {{nowcastsDate}}</span>
                    </p>
                </b-card-text>
            </div>

            <!--</b-card-body>-->
        </b-card>
    </div>
</template>

<script>
    import Vue from 'vue';
    import moment from 'moment';
    import { LayoutPlugin, CardPlugin } from 'bootstrap-vue';
    Vue.use(LayoutPlugin);
    Vue.use(CardPlugin);

    let none_marker = require('@/assets/images/none_marker_25x25.png');
    let low_marker = require('@/assets/images/low_marker_25x25.png');
    let high_marker = require('@/assets/images/high_marker_25x25.png');
    export default {
        name: 'WQPopup',
        props: ['feature'],
        data() {
            return {
            }
        },
        methods: {
            getAdvisoryImage() {
                let img_src = none_marker;
                if(this.hasAdvisoryData) {
                    let hi_limit = this.$store.state.advisory_limits.hi;
                    let lo_limit = this.$store.state.advisory_limits.low;
                    let value = this.advisoryValue;
                    if (value >= hi_limit.minimum) {
                        img_src = high_marker;
                    }
                    else if (value < lo_limit.maximum) {
                        img_src = low_marker;
                    }
                }
                return img_src;
            },
        },
        computed: {

            hasAdvisoryData: function() {
                console.debug("hasAdvisoryData started.");
                let site_type = this.feature.properties.site_type;
                if(site_type in this.feature.properties) {
                    if('advisory' in this.feature.properties[site_type]) {
                        console.log("hasAdvisoryData is true.");
                        return(true);
                    }
                }
                console.debug("hasAdvisoryData is false.");
                return(false);
            },
            advisoryDate: function() {
                console.debug("advisoryDate started.");
                if(this.hasAdvisoryData) {
                    let site_type = this.feature.properties.site_type;
                    var date = moment(this.feature.properties[site_type].advisory.date).format("MMMM Do YYYY");
                    console.debug("advisoryDate returning: " + date);
                    return(date);
                }
                console.debug("advisoryDate returning: ");
                return("");
            },
            advisoryValue: function() {
                console.debug("advisoryValue started.");
                if(this.hasAdvisoryData) {
                    let site_type = this.feature.properties.site_type;
                    let value = this.feature.properties[site_type].advisory.value;
                    console.debug("advisoryValue returning: " + value);
                    return(value);
                }
                console.debug("advisoryValue returning: ");
                return("");
            },
            hasNowcastData: function() {
                console.debug("hasNowcastData started.");
                let site_type = this.feature.properties.site_type;
                if(site_type in this.feature.properties) {
                    if('nowcasts' in this.feature.properties[site_type]) {
                        console.log("hasNowcastData is true.");
                        return(true);
                    }
                }
                console.debug("hasNowcastData is false.");
                return(false);
            },
            nowcastsDate: function() {
                console.debug("nowcastsDate started.");
                if(this.hasAdvisoryData) {
                    let site_type = this.feature.properties.site_type;
                    var date = moment(this.feature.properties[site_type].nowcasts.date).format("MMMM Do YYYY");
                    console.debug("nowcastsDate returning: " + date);
                    return(date);
                }
                console.debug("nowcastsDate returning: ");
                return("");
            },
            nowcastsValue: function() {
                console.debug("nowcastsValue started.");
                if(this.hasAdvisoryData) {
                    let site_type = this.feature.properties.site_type;
                    let level = this.feature.properties[site_type].nowcasts.level;
                    console.debug("nowcastsValue returning: " + level);
                    return(level);
                }
                console.debug("nowcastsValue returning: ");
                return("");
            }

        },
    }
</script>
<style scoped>
    .wq-card {
        /*font-family: 'Montserrat';*/
        color: rgba(0, 61, 126, .85);
        background-color: rgba(255, 255, 255, .85);
    }
    .font-avenir {
        font-family: 'Avenir';
    }
    .avenir-font-light {
        font-family: 'Avenir';
        font-weight: lighter;
    }


</style>
