<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="handleClick">click</button>
    {{a}}-{{b}}
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {reactive,watch,ref} from "vue";
const functionA=()=>{
  let x=ref(0);
  let y=ref(100);
  return {
    x,y
  }
}
export default {
  setup(){
    const person=reactive({
      name:"zhangsan",
      age:19
    });
    const handleClick=()=>{
      console.log("click");
      person.name="lisi"
    }

    watch(()=>person.name,(newVal,oldVal)=>{
      console.log(newVal,oldVal);
    })
    const {x:a,y:b}=functionA()
    return{
      person,
      handleClick,
      a,b
    }
  }
}
</script>
