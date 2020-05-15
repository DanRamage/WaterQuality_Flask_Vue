<template>
    <div class="wrapper">
    <!--
    <b-container fluid class="h-100">
    -->
            <!--
            <b-button v-b-toggle.info-sidebar class="sidebar-button">?</b-button>
             -->
        <nav id="sidebar" v-bind:class="[sidebarActive ? 'active' : '']">
            <div class="h-100 px-5 py-4 montserat-font text-center text-white blue-background_color sidebar-opacity">
                <h6><i><span v-text="title"></span></i></h6>
                <h4><span v-text="site_name"></span></h4>
                <p class="text-left">
                    Bacteria levels can change rapidly between sampling dates. To fill in the gaps,
                    we make daily <b>Nowcast</b> of bacteria conditions. These predictions do not represent
                    swimming advisories, but provide estimates of the likelihood that bacteria conditions
                    would warrant issuing an advisory if sampling were conducted that day.
                </p>
                <b-button class="btn-outline-primary p-2 mr-2" v-bind:class="[advisoryActive ? 'active' : '']"
                          variant="outline-primary"
                          v-on:click="dataTypeClick('advisory')"><b>Advisory</b></b-button>
                <b-button class="btn-outline-primary p-2 ml-2" v-bind:class="[nowcastActive ? 'active' : '']"
                          variant="outline-primary"
                          v-on:click="dataTypeClick('nowcast')"><b>Nowcast</b></b-button>
                <p class="text-center">
                    <a href="#" class="text-white card-link">Bacteria Sources</a>
                </p>
                <p class="text-center">
                    <a href="#" class="text-white card-link">Locations</a>
                </p>
                <p class="text-center">
                    <a href="#" class="text-white card-link">About</a>
                </p>
            </div>
        </nav>
        <div id="content">
            <vl-map id="site_map"
                    style="width: 100%; height: 100%; position:absolute"
                    ref="site_map"
                    :load-tiles-while-animating="true"
                    :load-tiles-while-interacting="true"
                    data-projection="EPSG:4326">
                <vl-view :center.sync="center" :rotation.sync="rotation"></vl-view>
                <vl-layer-tile>
                    <vl-source-xyz :url="layer_url" attributions="string or array" />
                </vl-layer-tile>
                <vl-layer-vector id="sites">
                    <vl-source-vector ref="site_vector_layer" :features.sync="features"></vl-source-vector>
                    <vl-style-func :factory="siteStyleFactory"></vl-style-func>
                </vl-layer-vector>
                <vl-interaction-select :features.sync="selectedFeatures" :layers="['sites']">
                    <vl-overlay v-for="feature in selectedFeatures"
                                :key="feature.id"
                                :id="feature.id"
                                :position="feature.geometry.coordinates"
                                :auto-pan="true"
                                :auto-pan-animation="{ duration: 300 }">
                        <div v-if='feature.properties.site_type == "Default"'>
                            <WQPopup :feature="feature"></WQPopup>
                        </div>
                        <div v-else-if='feature.properties.site_type == "Shellfish"'>
                            <ShellfishPopup :feature="feature"></ShellfishPopup>
                        </div>
                        <div v-else-if='feature.properties.site_type == "Rip Current"'>
                            <RipcurrentPopup :feature="feature"></RipcurrentPopup>
                        </div>
                        <div v-else>
                            <p>{{feature.id}}</p>
                        </div>
                    </vl-overlay>

                </vl-interaction-select>
            </vl-map>
            <b-button
                    v-b-toggle.info-sidebar
                    id="sidebarCollapse"
                    class="sidebar-button blue-background_color"
                    v-on:click="sidebarButtonClick()"
                    v-bind:class="[sidebarActive ? 'active' : '']">
                <span></span>
                <span></span>
                <span></span>
            </b-button>

        </div>
    </div>
</template>

<script>
    import DataAPI from "../utilities/rest_api";
    import FeatureUtils from "../utilities/feature_funcs";
    import WQPopup from "./wq_popup.vue";
    import {findPointOnSurface} from 'vuelayers/lib/ol-ext'
    //import moment from 'moment';

    import Style from 'ol/style/Style';
    import Icon from 'ol/style/Icon';

    //SInce these are not in the template, we import them here. We use them in the javascript below when
    //determining which icon to use.
    import LowMarkerIcon from '@/assets/images/low_marker_25x25.png'
    import HiMarkerIcon from '@/assets/images/high_marker_25x25.png'
    import NoneMarkerIcon from '@/assets/images/none_marker_25x25.png'
    import ShellfishPopup from "@/components/shellfish_popup";
    import RipcurrentPopup from "@/components/riptide_popup";

    export default {
        name: 'OLMapPage',

        components: {
            RipcurrentPopup,
            ShellfishPopup,
            'WQPopup': WQPopup
        },
        data () {
            return {
                title: "HOW'S THE BEACH",
                site_name: "",
                zoom: 5,
                center: [0,0],
                rotation: 0,
                features: [],
                loading: false,
                layer_url: 'http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}',
                selectedFeatures: [],
                advisory_limits: undefined,
                nowcastActive: false,
                advisoryActive: true,
                sidebarActive: true
                //sitesLayerExtents: createEmpty()
            }
        },
        mounted () {
            let vm = this;
            this.loading = true;
            let path = window.location.pathname;
            if (path.length) {
                let sitename = path.split('/');
                this.site_name = sitename[1];

                console.debug("Retrieving initial site: " +  this.site_name + " data.")
                DataAPI.GetSitesPromise(this.site_name, '').then(features => {
                    console.debug("Retrieved: " + features.data.sites.features.length + " features");
                    vm.features = features.data.sites.features;
                    if('limits' in features.data.advisory_info) {
                        this.$store.commit('updateAdvisoryLimits', features.data.advisory_info.limits);
                    }
                    vm.loading =  false;

                    setTimeout(function() {
                        if(vm.$refs.site_vector_layer.$source != undefined) {
                            vm.$refs.site_map.$map.updateSize();
                            vm.sitesLayerExtents = vm.$refs.site_vector_layer.$source.getExtent(vm.sitesLayerExtents);
                            let m_size = vm.$refs.site_map.$map.getSize();
                            vm.$refs.site_map.getView().fit(vm.sitesLayerExtents, m_size);
                            //vm.$refs.site_map.$map.redraw();
                        }
                    }, 100);
                    /*
                    vm.$nextTick(function() {
                        console.debug("nextTick mounted setting map extent.");
                    });*/
                })
                    .catch(error => console.error(error));

            }
        },
        methods: {
            pointOnSurface: findPointOnSurface,
            siteStyleFactory() {
                console.debug("siteStyleFactory started");
                let vm = this;
                /*
                For each feature, this function is used to determine what icon to use based on the level.
                */
                var siteStyleFunction = function(feature, resolution) {
                    resolution;
                    let icon_scale = 0.75;
                    let properties = feature.getProperties();
                    let site_type = properties.site_type;
                    let icon = new Icon({
                        src: NoneMarkerIcon,
                        scale: icon_scale
                    });
                    if(site_type == 'Default')
                    {
                        if(vm.advisoryActive) {
                            if ('advisory' in properties[site_type]) {
                                let dataFresh = FeatureUtils.isDataFresh(properties[site_type].advisory);
                                if(dataFresh)
                                {
                                    let value = properties[site_type].advisory.value;
                                    let hi_limit = vm.$store.state.advisory_limits.hi;
                                    let lo_limit = vm.$store.state.advisory_limits.low;
                                    if (value >= hi_limit.minimum) {
                                        //console.debug("Feature: " + feature.getId() + " Hi style value: " + value);
                                        icon = new Icon({
                                            src: HiMarkerIcon,
                                            scale: icon_scale
                                        });
                                    } else if (value < lo_limit.maximum) {
                                        //console.debug("Feature: " + feature.getId() + " Low style value: " + value);
                                        icon = new Icon({
                                            src: LowMarkerIcon,
                                            scale: icon_scale
                                        });
                                    }
                                }
                            } else {
                                console.debug("Feature: " + feature.getId() + " No advisory data found.");
                            }
                        }
                        else
                        {
                            icon = new Icon({
                                src: NoneMarkerIcon,
                                scale: icon_scale
                            });
                            if('nowcasts' in properties[site_type]) {
                                let level = properties[site_type].nowcasts.level;
                                if(level == 'LOW')
                                {
                                    icon = new Icon({
                                        src: LowMarkerIcon,
                                        scale: icon_scale
                                    });
                                }
                                else if(level == 'HIGH')
                                {
                                    icon = new Icon({
                                        src: HiMarkerIcon,
                                        scale: icon_scale
                                    });
                                }
                            }
                        }
                    }
                    else if(site_type == 'Shellfish')
                    {
                        //First check to see if our data is still fresh.
                        let dataFresh = FeatureUtils.isDataFresh(properties[site_type].advisory);
                        if(dataFresh) {
                            //Shellfish values are either true for closed or false for open.
                            let value = properties[site_type].advisory.value;
                            if (!value) {
                                icon = new Icon({
                                    src: LowMarkerIcon,
                                    scale: icon_scale
                                });
                            } else {
                                icon = new Icon({
                                    src: HiMarkerIcon,
                                    scale: icon_scale
                                });
                            }
                        }
                    }
                    else if(site_type == 'Rip Current')
                    {

                        let dataFresh = FeatureUtils.isDataFresh(properties[site_type].advisory);
                        if(dataFresh) {
                            let value = properties[site_type].advisory.value;
                            if (!value) {
                                icon = new Icon({
                                    src: LowMarkerIcon,
                                    scale: icon_scale
                                });
                            } else {
                                icon = new Icon({
                                    src: HiMarkerIcon,
                                    scale: icon_scale
                                });
                            }
                        }
                    }

                    let icon_style = [
                        new Style({
                            image: icon,
                        })
                    ];
                    return(icon_style);
                };
                return siteStyleFunction;
            },
            dataTypeClick(data_type) {
                console.debug("Data Type Button clicked: " + data_type);
                if(data_type == 'nowcast')
                {
                    this.nowcastActive = true;
                    this.advisoryActive = false;
                    this.$refs.site_vector_layer.$source.changed();
                }
                else{
                    this.nowcastActive = false;
                    this.advisoryActive = true;
                    this.$refs.site_vector_layer.$source.changed();
                }
            },
            sidebarButtonClick() {
                this.sidebarActive = !this.sidebarActive;
                console.debug("sidebarButtonClick clicked: " + this.sidebarActive);
            }
            /*
            onSourceChanged () {
                // sourceVm - vl-source-vector instance
                // sourceVm.$source - ol/source/Vector instance
                if(this.$refs.site_vector_layer.$source.getState() === 'ready') {
                    this.$refs.site_map.$map.updateSize();
                    let extents = this.$refs.site_vector_layer.$source.getExtent();
                    console.debug("Extents: " + extents);
                    let m_size = this.$refs.site_map.$map.getSize();
                    this.$refs.site_map.getView().fit(extents, m_size);
                }
            },
            */
        },
        watch: {
            /*
            features: _.debounce(function() {
                this.$refs.site_map.$map.updateSize();
                this.sitesLayerExtents = this.$refs.site_vector_layer.$source.getExtent();
                let m_size = vm.$refs.site_map.$map.getSize();
                this.$refs.site_map.getView().fit(this.sitesLayerExtents, m_size);

                this.message = `Loaded ${this.features.length}`;

                this.$refs.mapView.$view.fit(
                    this.$refs.geojsonSource.$source.getExtent(),
                    {
                        duration: 1000,
                    },
                )
            }, 10),*/
            /*
            sitesLayerExtents: function() {
                console.debug("sitesLayerExtents new extents");
            }*/
        }
    }
</script>
<style>
    body, html {
        height: 100%;
    }
    .btn-outline-primary {

        color: #FFFFFF;
        border-color: #FFFFFF;
        opacity: 0.75;
    }
    .btn-outline-primary:hover,
    .btn-outline-primary:focus,
    .btn-outline-primary:active {
        color: rgba(0, 61, 126, .85);
        background-color: #ffffff;
        border-color: #FFFFFF;
        opacity: 0.75;
    }
    .btn-outline-primary:not(:disabled):not(.disabled).active,
    .btn-outline-primary:not(:disabled):not(.disabled):active,
    .show > .btn-outline-primary.dropdown-toggle
    {
        color: rgba(0, 61, 126, .85);
        background-color: #ffffff;
        border-color: #FFFFFF;
        opacity: 0.75;

    }
    #vl-map-site_map .ol-zoom {
        background-color: rgba(0, 61, 126, .85) !important;
    }
    #vl-map-site_map .ol-zoom-out {
        background-color: rgba(0, 61, 126, .85) !important;
    }
    /*
    #vl-map-site_map .ol-zoom-in {
        margin-top: 200px !important;
    }
    #vl-map-site_map .ol-zoom-out {
        margin-top: 240px !important;
    }
    */
</style>
<style scoped>
    .wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: stretch;
        perspective: 1500px;
    }

    #sidebar {
        min-width: 300px;
        max-width: 300px;
        background: #7386D5;
        color: #fff;
        transition: all 0.6s cubic-bezier(0.945, 0.020, 0.270, 0.665);
        transform-origin: bottom left;
    }

    #sidebar.active {
        margin-left: -300px;
        transform: rotateY(100deg);
    }

    #sidebar .sidebar-header {
        padding: 20px;
        background: #6d7fcc;
    }

    #sidebar ul.components {
        padding: 20px 0;
        border-bottom: 1px solid #47748b;
    }

    #sidebar ul p {
        color: #fff;
        padding: 10px;
    }

    #sidebar ul li a {
        padding: 10px;
        font-size: 1.1em;
        display: block;
    }
    #sidebar ul li a:hover {
        color: #7386D5;
        background: #fff;
    }

    #sidebar ul li.active > a, a[aria-expanded="true"] {
        color: #fff;
        background: #6d7fcc;
    }

    #sidebarCollapse {
        width: 40px;
        height: 40px;
        background: #f5f5f5;
    }

    #sidebarCollapse span {
        width: 80%;
        height: 2px;
        margin: 0 auto;
        display: block;
        background: #555;
        transition: all 0.8s cubic-bezier(0.810, -0.330, 0.345, 1.375);
    }
    #sidebarCollapse span:first-of-type {
        /* rotate first one */
        transform: rotate(45deg) translate(2px, 2px);
    }
    #sidebarCollapse span:nth-of-type(2) {
        /* second one is not visible */
        opacity: 0;
    }
    #sidebarCollapse span:last-of-type {
        /* rotate third one */
        transform: rotate(-45deg) translate(1px, -1px);
    }
    #sidebarCollapse.active span {
        /* no rotation */
        transform: none;
        /* all bars are visible */
        opacity: 1;
        margin: 5px auto;
    }
    #sidebarCollapse {
        position: relative;
        z-index: 1000;
        top: 7em;
        left: .75em;
    }
    #content {
        width: 100%;
        min-height: 100vh;
        transition: all 0.3s;
    }

    .montserat-font {
        font-family: 'Montserrat';

    }
    .sidebar-opacity {
        opacity: 0.9;
    }
    .blue-background_color {
        background-color: rgba(0, 61, 126, .85);
    }
    .swimmer-icon {
        width: 25px;
        height: 25px;
    }
</style>
