<template>

    <VueDragResize :isActive="true" :w="200" :h="200" @resizing="resize" @dragging="resize">
    <v-card
        class="mx-auto"
        max-width="100%"
        height="100%"
    >
        <v-system-bar
        color="indigo darken-2"
        dark
        >
        <v-spacer></v-spacer>

        <v-icon>mdi-window-minimize</v-icon>

        <v-icon>mdi-window-maximize</v-icon>

        <v-icon>mdi-close</v-icon>
        </v-system-bar>

        <v-toolbar
        color="indigo"
        dark
        >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Discover</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
        </v-toolbar>

        <v-container fluid>
        <v-row dense>
            <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="card.flex"
            >
            <VueDragResize :isActive="true" :w="200" :h="200" @resizing="resize" @dragging="resize">
                <v-card
                max-width="100%"
                height="100%">
                    <v-img
                    :src="card.src"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="100%"
                    >
                    <v-card-title v-text="card.title"></v-card-title>
                        <div v-if="card.Tags">
                            <div v-if="card.chart === 'BarChart'">
                                <BarChart></BarChart>
                            </div>
                            <div v-else-if="card.chart === 'GoogleChart'">
                                <GoogleChart></GoogleChart>
                            </div>
                        </div>
                    </v-img>

                    <!-- <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>

                    <v-btn icon>
                        <v-icon>mdi-bookmark</v-icon>
                    </v-btn>

                    <v-btn icon>
                        <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                    </v-card-actions> -->
                </v-card>
            </VueDragResize>
            </v-col>
        </v-row>
        </v-container>
    </v-card>
  </VueDragResize>
</template>

<script>
import VueDragResize from 'vue-drag-resize'
import BarChart from '../components/Chartjs_BarChart.vue'
import GoogleChart from '../components/GChart_StackedBarChart'

  export default {
    components:{
        VueDragResize,
        BarChart,
        GoogleChart
      },
    data: () => ({
      cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12, Tags:true },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6, Tags:true },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6},
        { title: 'Bar', chart: 'BarChart', flex: 6, Tags:true },
        { title: 'Google', chart: 'GoogleChart', flex: 6, Tags:true },
      ],
    }),
  }
</script>
