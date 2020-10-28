<template>
  <div id="app">
    <div class="demo">{{message}}</div>
    <img style="width:200px;height:200px" src="./assets/simple.png" alt />
  </div>
</template>
<script>
import { add } from "@/utils/tool";
// import(/* webpackPrefetch: true */ 'LoginModal');
export default {
  async mounted() {
    const res = await add();
    console.log(res);
  },
  data() {
    return {
      message: "helloworld"
    };
  }
};
</script>
<style lang="less">
.size {
  width: 100%;
  height: 100%;
  display: flex;
}

html,
body {
  .size;

  overflow: hidden;
  margin: 0;
  padding: 0;
  display: flex;
}

#app {
  .size;
}

.h100 {
  height: 100%;
}
</style>
<style lang="less">
.demo {
  display: flex;
}

.qweqweqw {
  margin: 0;
  padding: 0;
  display: flex;
}
</style>