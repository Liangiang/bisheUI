<template>
  <div id="Home">
    <el-container>
      <el-header height="60px">
        <Header></Header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
  import Header from '@/components/Header'
  import Footer from '@/components/Footer'

  export default {
    name: 'Home',
    components: {
      Header,
      Footer
    },
    data() {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #Home .el-header {
    top: 0;
    left: 0;
    width: 100%;
    z-index: 50;
    position: fixed;
    /*background: linear-gradient(rgb(0, 100, 0) 5%, #ffffff 100%);*/
    /*background: linear-gradient(to top, rgb(160, 207, 255) 5%,#ffffff 100%);*/
    background: white;
    border-bottom: 3px solid;

    border-bottom-color: rgb(160, 207, 255);
    padding: 20px;
  }
  #Home .el-footer{
    background: white;
    border-top: 3px solid;

    border-top-color: rgb(160, 207, 255);
  }
</style>
