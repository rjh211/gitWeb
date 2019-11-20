<template>
<div>
  <h3>Combo Box</h3>
  <v-container fluid>
      <v-row>
      <v-col cols="12">
          <v-combobox
          :items="this.modellist"
          label="Combobox"
          multiple
          outlined
          dense
          ></v-combobox>
      </v-col>
      </v-row>
  </v-container>
</div>
</template>

<script>

export default {
     data(){
        return{
            select: ['Vuetify', 'Programming'],
            items: [
            'Programming',
            'Design',
            'Vue',
            'Vuetify',
            ],
        }
    },
    props:{
      modellist:[]
    }
};
</script>
