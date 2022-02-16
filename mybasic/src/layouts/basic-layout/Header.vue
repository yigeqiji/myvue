<template>
  <keep-alive>
    <div>
      header
    </div>
  </keep-alive>

</template>

<script>
export default {
name: "Header",
  created () {
  console.log("header");
  }
}
</script>

<style scoped>
.container{
  width:100%;
  height:200px;
  border:1px solid red;

}
</style>
