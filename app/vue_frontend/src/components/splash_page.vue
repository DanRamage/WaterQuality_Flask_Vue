<template>
  <div id="app" class="background_color">
    <b-container>
      <b-row>
        <b-col>
          <div>
            <img class="swimmer-icon float-left mt-2" src="http://howsthebeach.org/static/images/swimmer_icon_white.png">
          </div>
          <div class="ml-2  text-center">
            <h1 class="display-4 text-white montserat-font">HOW'S THE BEACH?</h1>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p class="text-white text-center font-italic avenir-font-oblique">Headed to the beach? Use this site
            to see if the water quality is healthy before heading in. Choose a location below to
            explore!</p>
        </b-col>
      </b-row>
      <b-button-toolbar>
        <b-button variant='outline-primary' class="mr-2 text-white" href="http://howsthebeach.org/killdevilhills"
                  @mouseover="site_btn_hover($event, 0)">
          <h3 class="montserat-font">OUTER BANKS</h3>
          <p class="avenir-font-light">North Carolina</p>
        </b-button>
        <b-button variant='outline-primary' class="mr-2 text-white"  href="http://howsthebeach.org/myrtlebeach"
                  @mouseover="site_btn_hover($event, 1)">
          <h3 class="montserat-font">MYRTLE BEACH</h3>
          <p class="avenir-font-light">South Carolina</p>
        </b-button>
        <b-button variant='outline-primary' class="mr-2 text-white"  href="http://howsthebeach.org/charleston"
                  @mouseover="site_btn_hover($event, 2)">
        <h3 class="montserat-font">CHARLESTON HARBOR</h3>
          <p class="avenir-font-light">South Carolina</p>
        </b-button>
        <b-button variant='outline-primary' class="mr-2 text-white"  href="http://howsthebeach.org/sarasota"
                  @mouseover="site_btn_hover($event, 3)">
        <h3 class="montserat-font">SARASOTA</h3>
          <p class="avenir-font-light">Florida</p>
        </b-button>
      </b-button-toolbar>
    </b-container>
    <div class="mt-4">
      <b-carousel
        id="HTBCarousel"
        ref="HTBCarousel"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <b-carousel-slide>
          <template v-slot:img>
            <img
              class="d-block w-100"
              height="400"
              src="@/assets/images/outterbanks.jpg"
            >
          </template>
        </b-carousel-slide>
        <b-carousel-slide>
          <template v-slot:img>
            <img
              class="d-block w-100"
              height="400"
              src="@/assets/images/myrtlebeach.jpg"
            >
          </template>
        </b-carousel-slide>
        <b-carousel-slide>
          <template v-slot:img>
            <img
              class="d-block w-100"
              height="400"
              src="@/assets/images/charleston.jpg"
            >
          </template>
        </b-carousel-slide>
        <b-carousel-slide>
          <template v-slot:img>
            <img
              class="d-block w-100"
              height="400"
              src="@/assets/images/sarasota.jpg"
            >
          </template>
        </b-carousel-slide>
      </b-carousel>
    </div>
    <footer class="pt-1 my-md-1 pt-md-1">
      <b-row>
        <b-col cols="1">
          <img class="" src="http://howsthebeach.org/static/images/swimmer_icon_white.png" alt="" width="24" height="24">
        </b-col>
        <b-col cols="2">
          <h5 class="montserat-font text-white">LEARN MORE</h5>
        </b-col>
        <b-col cols="3">
        </b-col>
        <b-col cols="2">
          <img class="" src="http://howsthebeach.org/static/images/usc_log_white.svg" alt="" width="200" height="100">
        </b-col>
        <b-col cols="2">
          <img class="" src="http://howsthebeach.org/static/images/umces-logo-blk_white.png" alt="" width="200" height="100">
        </b-col>
        <b-col cols="2">
          <img class="" src="http://howsthebeach.org/static/images/secoora_logo_white.svg" alt="" width="200" height="100">
        </b-col>
      </b-row>
    </footer>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
    }
  },
  name: 'SplashPage',
  methods: {
    site_click (event, site) {
      console.log('Site: ' + site + ' clicked')
    },
    /*
    This is the hover handler when the user hovers over a site button. We update the site slide.
     */
    site_btn_hover (event, SlideIndex) {
      console.log('Site: ' + SlideIndex + ' hover')
      this.$refs.HTBCarousel.setSlide(SlideIndex)
    }
  }
}

</script>

<style scoped>
  .background_color {
    background-color: rgba(0, 61, 126, .85);
  }
  .montserat-font {
    font-family: 'Montserrat';

  }

  .avenir-font-oblique {
    font-family: 'Avenir';
    font-style: oblique;
  }

  .avenir-font-light {
    font-family: 'Avenir';
    font-weight: lighter;
  }

  .swimmer-icon {
    width: 50px;
    height: 50px;
  }

  .carousel-img {
    max-height: 400px !important;
  }

</style>
