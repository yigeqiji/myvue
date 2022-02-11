<template>
<div class="container">
  <button @click="sendToUE()" class="cursor-pointer">发送给ue事件</button>
  <button @click="receiveForUE()" class="cursor-pointer">接收ue事件</button>
  <router-link :to="{name:'home'}">home</router-link>
</div>
</template>

<script>
export default {
  name: "index",
  methods:{
    sendToUE(){
      this.$ue4("To",{name:"name"})
    },
    receiveForUE(){

    }
  },
  mounted() {
   // this.$for=function(data){
   //   console.log("-=-=-=-",data)
   // }
  }
}
</script>

<style scoped>

</style>