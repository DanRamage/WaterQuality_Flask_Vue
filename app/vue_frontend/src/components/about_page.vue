<template>
    <div class="wrapper bg-white">
        <nav id="sidebar" v-bind:class="[sidebarActive ? 'active' : '']">
            <div class="h-100 px-5 py-4 montserat-font text-center text-white blue-background_color sidebar-opacity">
                <a href="/">
                    <h6><i><span v-text="title"></span></i></h6>
                </a>
                <h4><span>ABOUT</span></h4>
                <p class="text-left">
                    Our mission is to... Alia quosa
                    si conetur as sequibus, quae
                    sam inimet verferat a sam aditat venimolloria volentiumqui restius sim as sin re, si dolest
                    odis min nonsequunt laborit aectota tiatur moluptatent eostia doloruptaest volut alignat ut
                    dolenda ecaecupti
                </p>

                <br>
                <p class="text-center mt-4">
                    <a href="/" class="text-white card-link">Forecast/Advisory</a>
                </p>
                <p class="text-center">
                    <a href="/" class="text-white card-link">Bacteria Sources</a>
                </p>
                <p class="text-center">
                    <a href="/" class="text-white card-link">Locations</a>
                </p>
            </div>
        </nav>
        <div id="content" class="ml-5 mt-5">
            <!--
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="" role="">
                    <b-button block v-b-toggle.accordion-1 variant="info" class="text-left bg-white text-blue">
                        <span>
                            <h2>What is How's the Beach?      <font-awesome-icon :icon="['fas', 'chevron-right']"></font-awesome-icon></h2>
                        </span>
                    </b-button>
                </b-card-header>
                <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <b-card-text>
                            How’s the Beach is tool that predicts bacterial conditions in public waters at four
                            locations on the east coast of America. It is designed to inform the public of unsafe swimming
                            conditions. How’s the Beach is a joint initiative of University of South Carolina,
                            Southeast Coastal Ocean Observing Regional Association, and the Integration and Application
                            Network at the University of Maryland Center for Environmental Science.
                        </b-card-text>
                    </b-card-body>
                </b-collapse>
            </b-card>
            -->
            <div v-b-toggle.collapse-1 variant="outline-primary" class="text-blue avenir-font-light">
                <span class="FAQ-text mr-4 font-weight-normal">What is How's the Beach?</span>
                <span class="whatis-opened FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-up']" /></span>
                <span class="whatis-closed FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
            </div>
            <b-collapse id="collapse-1" class="mt-1">
                <b-card>
                    <p class="card-text text-blue avenir-font">
                        How’s the Beach is tool that predicts bacterial conditions in public waters at four
                        locations on the east coast of America. It is designed to inform the public of unsafe swimming
                        conditions. How’s the Beach is a joint initiative of University of South Carolina,
                        Southeast Coastal Ocean Observing Regional Association, and the Integration and Application
                        Network at the University of Maryland Center for Environmental Science.
                    </p>
                </b-card>
            </b-collapse>

            <div v-b-toggle.collapse-2 variant="outline-primary" class="text-blue avenir-font-light mt-4">
                <span class="FAQ-text mr-4 font-weight-normal">What are we forecasting?</span>
                <span class="whatis-opened FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-up']" /></span>
                <span class="whatis-closed FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
            </div>
            <b-collapse id="collapse-2" class="mt-1">
                <b-card>
                    <p class="card-text text-blue avenir-font">
                        Enterococci.
                    </p>
                    <p class="card-text text-blue avenir-font">
                        Enterococci are bacteria that normally inhabit the intestinal tract of humans and animals.
                        The presence of these bacteria can be an indication of fecal pollution, which may come from
                        stormwater runoff, pets and wildlife, and human sewage. If they are present in high
                        concentrations in recreational waters, it is more likely that pathogens that cause disease,
                        infections or rashes may also be present. These pathogens can cause harm if they are ingested
                        while swimming or enter the skin through a cut or sore.
                    </p>
                </b-card>
            </b-collapse>

            <div v-b-toggle.collapse-3 variant="outline-primary" class="text-blue avenir-font-light mt-4">
                <span class="FAQ-text mr-4 font-weight-normal">What is the forecast? How is it generated?</span>
                <span class="whatis-opened FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-up']" /></span>
                <span class="whatis-closed FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
            </div>
            <b-collapse id="collapse-3" class="mt-1">
                <b-card>
                    <p class="card-text text-blue avenir-font">
                        Bacteria levels can change very rapidly between sampling dates. To fill in the gaps,
                        we make daily predictions of bacteria conditions. These predictions do not represent
                        swimming advisories, but provide estimates of the likelihood that bacteria conditions
                        would warrant issuing an advisory if sampling were conducted that day.

                        These forecasts are for informational purposes only

                        The probability that today's bacteria level will exceed the safe swimming standard based
                        on an automated prediction system.
                    </p>
                    <p class="card-text text-blue avenir-font">
                        Predictions are made based on relationships between bacteria level and rainfall, salinity,
                        wind conditions, and water temperature found in previous sampling. These relationships are
                        used to create daily estimates of bacteria level.
                    </p>
                </b-card>
            </b-collapse>

            <div v-b-toggle.collapse-4 variant="outline-primary" class="text-blue avenir-font-light mt-4">
                    <span class="FAQ-text mr-4 font-weight-normal">Questions? Contact us!</span>
                    <span class="whatis-opened FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-up']" /></span>
                    <span class="whatis-closed FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
            </div>
            <b-collapse id="collapse-4" class="mt-1">
                <b-card>
                    <p class="card-text text-blue avenir-font-light">
                        <a href="mailto: howsmybeach@gmail.com"><h2>Email us!</h2></a>
                    </p>
                </b-card>
            </b-collapse>

        </div>
    </div>
</template>
<script>
    import Vue from 'vue'

    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    library.add(faChevronRight, faChevronUp)

    Vue.component('font-awesome-icon', FontAwesomeIcon);

    export default {
        name: 'AboutPage',
        props: [],
        data() {
            return {}
        },
        mounted() {
            console.log("AboutPage mounted.");
        }
    }

</script>
<style scoped>
    .wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: stretch;
        perspective: 1500px;
    }

    .collapsed > .whatis-opened,
    :not(.collapsed) > .whatis-closed {
        display: none;
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
    }
    #mq-detector {
        visibility: hidden;
    }
    .FAQ-text {
        font-size: 1.75rem;
    }

</style>
