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
                <input type='file' accept="text/xml" @change="sampleFileSubmit"/>
            </div>
        </b-col>
        <b-col>
        </b-col>
    </b-row>
    </b-container>
    <b-button @click="sampleDownload">Button</b-button>
  </div>
</template>

<script>
import prepro from '@/module/prepro/prepro'

export default {
  name: 'intro',
  data () {
    return {
      msg: 'Input your xml file',
      sampleFile: null
    }
  },
  methods: {
    sampleFileSubmit (e) {
      const render = new FileReader()
      render.readAsText(e.target.files[0])
      render.onload = () => {
        prepro.readToXmlFile(render.result)
        console.log(prepro.prepro)
        console.log(prepro.exportToString())
        console.log('this is some of test& set test module')
      }
    },
    sampleDownload () {
      prepro.exportToXmlFile('black Test Sample')
    }
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
