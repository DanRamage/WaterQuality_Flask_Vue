<template>
    <div id="app">
        <component :is="activeComponent"></component>
    </div>
</template>
<script>
    import SplashPage from "@/components/splash_page";
    import OLMapPage from "@/components/ol_map_page";
    import StationGraph from "@/components/station_graph";
    import CameraGraph from "@/components/camera_graph";
    import ErrorPage from "@/components/error_page";

    export default {
        data () {
            return {
                activeComponent: 'SplashPage'
            }
        },
        components: {OLMapPage, SplashPage, StationGraph, CameraGraph, ErrorPage},
        created() {
            //We check the url we receive to see where we are going, splash page or one of the project sites.
            let to = this.$route;

            console.log("Initial url: " + to.path);
            this.$gtag.pageview({
                page_path: to.path,
            });

            if(to.name == 'OLMapPage')
            {
                //Pick apart the path and save the site name into the store so other components can use it for
                //API requests.
                this.$store.commit('updateSiteName', to.params.location);
                this.activeComponent = 'OLMapPage';
            }
            else if(to.name == 'SplashPage')
            {
                this.activeComponent = 'SplashPage';
            }
            else if(to.name == 'StationGraph')
            {
                //Pick apart the path and save the site name into the store so other components can use it for
                //API requests.
                this.$store.commit('updateSiteName', to.params.location);
                this.activeComponent = 'StationGraph';
            }
        },
        watch: {
            '$route' (to, from) {
                console.log('Route changed from ' + from.path + ' to ' + to.path);
                this.$gtag.pageview({
                    page_path: to.path,
                });

                if(to.name == 'OLMapPage')
                {
                    //Pick apart the path and save the site name into the store so other components can use it for
                    //API requests.
                    this.$store.commit('updateSiteName', to.params.location);
                    this.activeComponent = 'OLMapPage';
                }
                else if(to.name == 'SplashPage')
                {
                    this.activeComponent = 'SplashPage';
                }
                else if(to.name == 'StationGraph')
                {
                    //Pick apart the path and save the site name into the store so other components can use it for
                    //API requests.
                    this.$store.commit('updateSiteName', to.params.location);
                    this.activeComponent = 'StationGraph';
                }
                else if(to.name == 'CameraGraph')
                {
                    //Pick apart the path and save the site name into the store so other components can use it for
                    //API requests.
                    this.$store.commit('updateSiteName', to.params.location);
                    this.activeComponent = 'CameraGraph';
                }
                else if(to.name == '404')
                {
                    this.activeComponent = 'ErrorPage';
                }
            }
        },

    }
</script>
<style>
    .montserat-font {
        font-family: 'Montserrat';

    }

    .font-avenir {
        font-family: 'Avenir';
    }
    .avenir-font-light {
        font-family: 'Avenir';
        font-weight: lighter;
    }
    .app-button-style {
        background-color: rgba(0, 61, 126, .85);
        border-color: #FFFFFF;
        opacity: 0.75;
    }
    .app-button-style > .btn-secondary:hover,
    .app-button-style > .btn-secondary:focus,
    .app-button-style > .btn-secondary:active {
        color: rgba(0, 61, 126, .85);
        background-color: #FFFFFF;
        opacity: 0.75;
    }
    .app-button-style > .btn-outline-primary:not(:disabled):not(.disabled).active,
    .app-button-style > .btn-outline-primary:not(:disabled):not(.disabled):active,
    .app-button-style > .show > .btn-outline-primary.dropdown-toggle
    {
        color: rgba(0, 61, 126, .85);
        background-color: #ffffff;
        border-color: #FFFFFF;
        opacity: 0.75;

    }

    .background_color {
        background-color: rgba(0, 61, 126, .85);
        color: #FFFFFF
    }

</style>
