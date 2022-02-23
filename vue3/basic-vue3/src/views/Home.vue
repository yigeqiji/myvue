<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{x}}-{{y}}
  </div>
</template>

<script>
// @ is an alias to /src

import {useMove} from "../use";

export default {
  setup() {
    let {x,y} = useMove();
    return {
      x,y
    }
  }
}
</script>
