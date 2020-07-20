<template>
    <div>
        <b-button v-b-toggle.legend_collapse class="legendButton app-button-style btn btn-primary avenir-font">
            <span class="when-open"></span>
            <span class="when-closed">Legend</span>
        </b-button>
        <b-collapse id="legend_collapse" class="legend-card">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col">
                            Legend
                        </div>
                        <div class="col">
                            <button v-b-toggle.legend_collapse type="button" class="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body font-avenir">
                    <b>Site Types</b>
                    <ul class="list-group list-group-flush">
                        <div v-if="hasIcons('Water Quality')">
                                <li class="list-group-item">
                                    <img src="@/assets/images/low_marker_25x25.png" class="advisory_icon mr-1">
                                    Water Quality Sites
                                </li>
                        </div>
                        <div v-if="hasIcons('Shellfish')">
                            <li class="list-group-item">
                                <img src="@/assets/images/shellfish_low_marker_25x25.png" class="advisory_icon mr-1">
                                Shellfish Sites
                            </li>
                        </div>
                        <div v-if="hasIcons('Rip Current')">
                            <li class="list-group-item">
                                <img src="@/assets/images/ripcurrent_low_marker_25x25.png" class="advisory_icon mr-1">
                                Rip Current  Sites
                            </li>
                        </div>
                        <div v-if="hasIcons('Camera Site')">
                            <li class="list-group-item">
                                <img src="@/assets/images/webcam_icon.png" class="advisory_icon mr-1">
                                Camera Sites
                            </li>
                        </div>
                    </ul>
                    <b>Color Codes</b>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                                <div class="color-box lo-color"></div>
                                Results are low
                            <!--
                            <img src="@/assets/images/low_marker_25x25.png" class="advisory_icon">
                            -->
                        </li>
                        <li class="list-group-item">
                            <div class="color-box hi-color"></div>
                            <!--
                            <img src="@/assets/images/high_marker_25x25.png" class="advisory_icon">
                            -->
                            Results are high.
                        </li>
                        <li class="list-group-item">
                            <div class="color-box none-color"></div>
                            <!--
                            <img src="@/assets/images/none_marker_25x25.png" class="advisory_icon">
                            -->
                            Results are out of date/missing.
                        </li>
                    </ul>
                    <!--
                    <div v-if="hasIcons('Water Quality')">
                        <b>Water Quality Sites</b>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item py-1">
                                <img src="@/assets/images/low_marker_25x25.png" class="advisory_icon">
                                Results are low.
                            </li>
                            <li class="list-group-item py-1">
                                <img src="@/assets/images/high_marker_25x25.png" class="advisory_icon">
                                Results are high.
                            </li>
                            <li class="list-group-item py-1">
                                <img src="@/assets/images/none_marker_25x25.png" class="advisory_icon">
                                Results are out of date/missing.
                            </li>
                        </ul>
                    </div>
                    <div v-if="hasIcons('Shellfish')">
                        <b>Shellfish</b>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item py-1">
                                <img src="@/assets/images/shellfish_low_marker_25x25.png" class="advisory_icon">
                                Results are low.
                            </li>
                            <li class="list-group-item py-1">
                                <img src="@/assets/images/shellfish_high_marker_25x25.png" class="advisory_icon">
                                Results are high.
                            </li>
                            <li class="list-group-item py-1">
                                <img src="@/assets/images/shellfish_none_marker_25x25.png" class="advisory_icon">
                                Results are out of date/missing.
                            </li>
                        </ul>
                    </div>
                    <div v-if="hasIcons('Rip Current')">
                        <b>Rip Current</b>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item py-1">
                                <img src="@/assets/images/ripcurrent_low_marker_25x25.png" class="advisory_icon">
                                Results are low.
                            </li>
                            <li class="list-group-item py-1">
                                <img src="@/assets/images/ripcurrent_high_marker_25x25.png" class="advisory_icon">
                                Results are high.
                            </li>
                            <li class="list-group-item py-1">
                                <img src="@/assets/images/ripcurrent_none_marker_25x25.png" class="advisory_icon">
                                Results are out of date/missing.
                            </li>
                        </ul>
                    </div>
                    <div v-if="hasIcons('Camera Site')">
                        <b>Camera Site</b>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item py-1">
                                <img src="@/assets/images/webcam_icon.png" class="advisory_icon">
                                Video site.
                            </li>
                        </ul>
                    </div>
                    -->

                </div>
            </div>
        </b-collapse>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {CollapsePlugin,VBTogglePlugin} from 'bootstrap-vue';
    Vue.use(CollapsePlugin);
    Vue.use(VBTogglePlugin);

    /*
    import LowMarkerIcon from '@/assets/images/low_marker_25x25.png'
    import HiMarkerIcon from '@/assets/images/high_marker_25x25.png'
    import NoneMarkerIcon from '@/assets/images/none_marker_25x25.png'
    import CameraIcon from '@/assets/images/webcam_icon.png'
    import ShellfishLowMarkerIcon from '@/assets/images/shellfish_low_marker_25x25.png'
    import ShellfishHiMarkerIcon from '@/assets/images/shellfish_high_marker_25x25.png'
    import ShellfishNoneMarkerIcon from '@/assets/images/shellfish_none_marker_25x25.png'
    import RipCurrentLowMarkerIcon from '@/assets/images/ripcurrent_low_marker_25x25.png'
    import RipCurrentHiMarkerIcon from '@/assets/images/ripcurrent_high_marker_25x25.png'
    */
    export default {
        name: 'IconsLegend',
        props: ['icon_info'],
        components: {},
        data() {
            return {
                openLegend: true,
                mounted: false
            };
        },
        mounted () {
            console.log("IconsLegend mounted");
            this.mounted = true;

        },
        methods: {
            hasIcons(icon_type) {
                if(this.mounted) {
                    console.log("hasIcons checking: " + icon_type);
                    if (this.icon_info !== undefined) {
                        if (this.icon_info.includes(icon_type)) {
                            console.log("hasIcons has: " + icon_type);
                            return (true);
                        }
                    }
                }
                return(false);
            },
        }
    }

</script>
<style>
    .collapsed > .when-open,
    .not-collapsed > .when-closed {
        display: none;
    }
</style>
<style scoped>
    .legendButton {
        position: relative;
        top: 0;
        right: 0;

    }
    .legend-card {
        position: relative;
        top: 0;
        right: 0;
        width: 300px;
        height: 200px;
    }
    .color-box {
        width: 40px;
        height: 25px;
        display: inline-block;
        background-color: #ccc;
        position: relative;
        vertical-align: middle;
        /*left: 5px;*/
    }
    .hi-color {
        background-color: #da2636;
    }
    .lo-color {
        background-color: #75c045;
    }
    .none-color {
        background-color: #939598;
    }
    .card-background-color {
        background-color: rgba(0, 61, 126, .85);
    }
</style>
