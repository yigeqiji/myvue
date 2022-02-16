<template>

    <div class="container">

        <div class="table-container">
            <div class="title">111111</div>
            <div class="table-header">
              22222222
            </div>
            <div class="table-body">
              333333
            </div>
        </div>
        <div class="foo">
          5555
        </div>

    </div>

</template>

<script>
export default {
name: "User"
}
</script>

<style scoped>
.table-container{
  border:1px solid red;
  height:1000px;
  position: sticky;
  top:0;
  overflow: scroll;
}
.title{
  height:300px;
  border:1px solid green;
}
.table-header{
  background: #42b983;
  height:200px;
  position: sticky;
  top:0;
}
.table-body{
  height:1000px;
  border:1px solid yellow;
}
.foo{
  background: green;
  height:800px;
}
</style>
