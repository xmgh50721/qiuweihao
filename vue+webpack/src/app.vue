<template>
  <div id="app">
    <div id="cover"></div>
    <div id="content">
      <Header></Header>
      <todo></todo>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from './todo/header.vue'
import Footer from './todo/footer.jsx'
import todo from './todo/todo.vue'

export default {
  components: {
    Header,
    Footer,
    todo
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
  #cover{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(255,255,255,0.8);
  }
  #content{
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>
