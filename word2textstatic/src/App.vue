<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import HomePage from "./views/Home.vue";
@Component({
  components:{
    HomePage
  }
})
export default class APP extends Vue {

}
</script>
<style lang="scss">
#app {
  font-family: "Microsoft YaHei",sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
