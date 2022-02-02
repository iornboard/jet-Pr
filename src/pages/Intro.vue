<template>
  <div class="root">
    <h1>{{ msg }}</h1>
    <br/><br/><br/>
    <b-container class="bv-example-row">
    <b-row class="text-center">
        <b-col>
        </b-col>
        <b-col cols="8">
            <div id="dropBar">
                <b-form-file id="file-default"></b-form-file>
            </div>
        </b-col>
        <b-col>
        </b-col>
    </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'intro',
  data () {
    return {
      msg: 'Input your xml file'
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
#dropBar {
  width: 100%;
  height: 50vh;
  border-style: solid;
  padding: 10PX;
}
</style>
