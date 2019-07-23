<template>
    <div class="main">
        <h2 v-if="error.statusCode==404">404 not found</h2>
        <h2 v-else>500 Error</h2>
        <ul>
            <li><nuxt-link to="/">Home</nuxt-link></li>
        </ul>
    </div>
</template>
<style scoped lang="scss">
  .main{
    text-align: center;
    padding-top: 200px;
    min-height: 500px;;
  }
</style>
<script>
  export default {
    props:['error'],
  }
</script>
