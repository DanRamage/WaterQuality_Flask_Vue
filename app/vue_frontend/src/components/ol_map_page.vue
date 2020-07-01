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
                <b-button class="btn-outline-primary p-2 mr-2" v-bind:class="[nowcastActive ? 'active' : '']"
                          variant="outline-primary"
                          v-on:click="dataTypeClick('nowcast')"><b>Nowcast</b></b-button>
                <b-button class="btn-outline-primary p-2 ml-2" v-bind:class="[advisoryActive ? 'active' : '']"
                          variant="outline-primary"
                          v-on:click="dataTypeClick('advisory')"><b>Advisory</b></b-button>

                <b-dropdown id="layer_dropdown" class="layer_dropdown mt-4" :text="current_layer_name">
                    <b-dropdown-item class="dropdown-item" @click="layerSelected($event, 'openstreetmap', '')">Open Street Map</b-dropdown-item>
                    <b-dropdown-item class="dropdown-item" @click="layerSelected($event, 'google', 'm')">Road</b-dropdown-item>
                    <b-dropdown-item class="dropdown-item" @click="layerSelected($event, 'google', 's')">Satellite</b-dropdown-item>
                    <b-dropdown-item class="dropdown-item" @click="layerSelected($event, 'google', 'y')">Hybrid Satellite</b-dropdown-item>
                    <b-dropdown-item class="dropdown-item" @click="layerSelected($event, 'google', 'p')">Hybrid Terrain</b-dropdown-item>
                    <!--
                    <b-dropdown-item class="dropdown-item" @click="layerSelected($event, 'google', 'r')">Altered Road</b-dropdown-item>
                    <b-dropdown-item class="dropdown-item" @click="layerSelected($event, 'google', 't')">Terrain</b-dropdown-item>
                    -->
                </b-dropdown>

                <p class="text-center mt-4">
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
                    <vl-source-xyz :url="current_layer_url" attributions="string or array" />
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
                        <div v-else-if='feature.properties.site_type == "Camera Site"'>
                            <CameraPopup :feature="feature"></CameraPopup>
                        </div>
                        <div v-else>
                            <p>{{feature.id}}</p>
                        </div>
                    </vl-overlay>

                </vl-interaction-select>
            </vl-map>
            <button
                    v-b-toggle.info-sidebar
                    id="sidebarCollapse"
                    class="btn btn-outline-info btn-sm"
                    v-on:click="sidebarButtonClick()"
                    v-bind:class="[sidebarBtnActive ? 'active' : '']">
                <span></span>
                <span></span>
                <span></span>
            </button>

        </div>
        <!-- This gives us the ability to know when the media queries/breaks occur -->
        <span ref="mq_detector" id="mq-detector">
            <span ref="visible_xs" class="d-block d-sm-none">
            </span>
            <span ref="visible_sm" class="d-none d-sm-block d-md-none">
            </span>
            <span ref="visible_md" class="d-none d-md-block d-lg-none">
            </span>
            <span ref="visible_lg" class="d-none d-lg-block d-xl-none">
            </span>
            <span ref="visible_xlg" class="d-none d-xl-block">
            </span>
        </span>
    </div>
</template>

<script>
    import Vue from 'vue'
    import 'bootstrap/dist/css/bootstrap.min.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import 'typeface-montserrat/index.css'

    import { Map, TileLayer, OsmSource, Geoloc, VectorLayer, VectorSource, XyzSource, StyleBox, CircleStyle, FillStyle,
        StrokeStyle, Overlay, SelectInteraction, StyleFunc } from 'vuelayers'
    Vue.use(Map);
    Vue.use(TileLayer);
    Vue.use(OsmSource);
    Vue.use(Geoloc);
    Vue.use(VectorLayer);
    Vue.use(VectorSource);
    Vue.use(XyzSource);
    Vue.use(StyleBox);
    Vue.use(FillStyle);
    Vue.use(StrokeStyle);
    Vue.use(CircleStyle);
    Vue.use(Overlay);
    Vue.use(SelectInteraction);
    Vue.use(StyleFunc);


    import 'vuelayers/lib/style.css' // needs css-loader

    import { SidebarPlugin, ButtonPlugin, ButtonGroupPlugin, LayoutPlugin } from 'bootstrap-vue';
    Vue.use(ButtonPlugin);
    Vue.use(ButtonGroupPlugin);
    Vue.use(LayoutPlugin);
    Vue.use(SidebarPlugin);

    import DataAPI from "../utilities/rest_api";
    import FeatureUtils from "../utilities/feature_funcs";
    import WQPopup from "./wq_popup.vue";
    import ShellfishPopup from "@/components/shellfish_popup";
    import RipcurrentPopup from "@/components/riptide_popup";
    import CameraPopup from "@/components/camera_popup";
    import {findPointOnSurface} from 'vuelayers/lib/ol-ext'
    //import moment from 'moment';

    import Style from 'ol/style/Style';
    import Icon from 'ol/style/Icon';

    //SInce these are not in the template, we import them here. We use them in the javascript below when
    //determining which icon to use.
    import LowMarkerIcon from '@/assets/images/low_marker_25x25.png'
    import HiMarkerIcon from '@/assets/images/high_marker_25x25.png'
    import NoneMarkerIcon from '@/assets/images/none_marker_25x25.png'
    import CameraIcon from '@/assets/images/webcam_icon.png'

    export default {
        name: 'OLMapPage',

        components: {
            CameraPopup,
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
                //Roadmap, Terrain, Altered Roadmap, Satellite, Terrain Only, Hybrid
                google_layers: ['m', 'p', 'r', 's', 't', 'y'],
                current_google_layer: 'm',
                current_layer_url: '',
                current_layer_name: "Road",
                selectedFeatures: [],
                advisory_limits: undefined,
                nowcastActive: true,
                advisoryActive: false,
                sidebarActive: false,
                sidebarBtnActive: false,
                currMqNdx: undefined,
                mqSelectors: undefined
            }
        },
        created() {

            window.addEventListener("resize", this.resizeHandler);
        },
        mounted () {
            let vm = this;
            this.loading = true;

            this.mqSelectors = [
                this.$refs.visible_xs,
                this.$refs.visible_sm,
                this.$refs.visible_md,
                this.$refs.visible_lg,
                this.$refs.visible_xlg
            ];


            this.current_layer_url = `https://mt0.google.com/vt/lyrs=${this.current_google_layer}&hl=en&x={x}&y={y}&z={z}`;
            let path = window.location.pathname;
            if (path.length) {
                let location_site_name = this.$store.state.site_name;
                console.debug("Retrieving initial site: " +  location_site_name + " data.")
                DataAPI.GetSitesPromise(location_site_name, '').then(features => {
                    console.debug("Retrieved: " + features.data.sites.features.length + " features");
                    vm.features = features.data.sites.features;
                    if('limits' in features.data.advisory_info) {
                        this.$store.commit('updateAdvisoryLimits', features.data.advisory_info.limits);
                    }
                    this.site_name = features.data.project_area.name;

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
        destroyed() {
            window.removeEventListener("resize", this.resizeHandler);
        },
        methods: {
            resizeHandler() {

                for (var i = 0; i <= this.mqSelectors.length; i++) {
                    if(this.mqSelectors[i].offsetLeft > 0)
                    {
                        if (this.currMqIdx != i) {
                            this.currMqIdx = i;
                            break;
                        }
                    }
                }
                if(this.currMqIdx < 3)
                {
                    this.sidebarActive = false;
                }

            },
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
                    else if(site_type == 'Camera Site') {
                        icon = new Icon({
                            src: CameraIcon,
                            scale: icon_scale
                        });
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
                this.sidebarBtnActive = !this.sidebarBtnActive;
                console.debug("sidebarButtonClick clicked: " + this.sidebarActive);
            },
            layerSelected(event, layer_type, layer_selected) {
                //Set the name of the current layer selected in dropdown.
                this.current_layer_name = event.target.text;
                if(layer_type === 'google') {
                    //Build the URL for the XYZ google layer.
                    this.current_google_layer = layer_selected;
                    this.current_layer_url = `https://mt0.google.com/vt/lyrs=${this.current_google_layer}&hl=en&x={x}&y={y}&z={z}`;
                }
                else if(layer_type == 'openstreetmap') {
                    this.current_layer_url = 'https://c.tile.openstreetmap.org/${z}/${x}/${y}';
                }
            },
        },
        computed: {
            map_layer_url: function()
            {
                let layer_url = `https://mt0.google.com/vt/lyrs=${this.current_google_layer}&hl=en&x={x}&y={y}&z={z}`;
                console.log("map_layer_url: " + layer_url);
                return(layer_url);
            }
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
    .layer_dropdown > button {
        background-color: rgba(0, 61, 126, .85);
        border-color: #FFFFFF;
        opacity: 0.75;
    }

    .layer_dropdown > .btn-secondary:hover,
    .layer_dropdown > .btn-secondary:focus,
    .layer_dropdown > .btn-secondary:active {
        color: rgba(0, 61, 126, .85);
        background-color: #FFFFFF;
        opacity: 0.75;
    }

</style>
<style scoped>
    .blue-background_color {
        background-color: rgba(0, 61, 126, .85);
    }

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

    .sidebar-opacity {
        opacity: 0.9;
    }
    @media (max-width: 768px) {
        #sidebar {
            margin-left: -300px;
        }
        #sidebar.active {
            margin-left: 0;
        }
        #sidebar.active {
            margin-left: 0;
            transform: none;
        }
        #sidebarCollapse span:first-of-type,
        #sidebarCollapse span:nth-of-type(2),
        #sidebarCollapse span:last-of-type {
            transform: none;
            opacity: 1;
            margin: 5px auto;
        }
        #sidebarCollapse.active span {
            margin: 0 auto;
        }
        #sidebarCollapse.active span:first-of-type {
            transform: rotate(45deg) translate(2px, 2px);
        }
        #sidebarCollapse.active span:nth-of-type(2) {
            opacity: 0;
        }
        #sidebarCollapse.active span:last-of-type {
            transform: rotate(-45deg) translate(1px, -1px);
        }
        /*#sidebarCollapse span {
            display: none;
        }*/
    }
    #mq-detector {
        visibility: hidden;
    }
</style>
