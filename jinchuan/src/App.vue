<template>
    <div id="app">
        <transition name="fade">
            <router-view/>
        </transition>
    </div>
</template>

<style lang="scss">
.q-field__input, .q-field__native, .q-field__prefix, .q-field__suffix{
  color:white !important;
  text-align:center;
}

</style>
