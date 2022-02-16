<template>
  <div class="container">
      <Header/>
    <router-view class="body">111111111</router-view>
      <Footer/>
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
export default {
name: "BasicLayout",
  components:{
  Header,Footer
  },
  created () {
  }
}
</script>

<style scoped>
.body{
  width:100%;
  height:1000px;
  border:1px solid red;
}
</style>
