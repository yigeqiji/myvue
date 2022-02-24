<template>
  <router-view/>
  {{$store.state.user.profile.nickname}}
  <button @click="$store.commit('user/updateProfile',{nickname: 'zhangsan'})">更改</button>
</template>
<script>
export default {
  name:"App",

}
</script>
<style lang="less">

</style>
