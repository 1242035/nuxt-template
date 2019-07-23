<template>
    <section class="container">
        <div>
            <!--<app-logo/>-->
            <h1 class="title">
                Nuxt.js
            </h1>
            <div class="links">
                <a href="/edit" class="button--green">Edit</a>
                <a href="/news/list/1" class="button--grey">List</a>
            </div>
        </div>
    </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
    middleware: 'auth',
    head() {
        return {
            title: 'Title',
            meta: [
                { hid: 'description', name: 'description', content: 'description' }
            ]
        }
    },
    components: {
        AppLogo
    }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 40px;
  color: #35495e;
  letter-spacing: 1px;
}

.links {
  padding-top: 15px;
}
</style>
