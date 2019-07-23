<template>
    <header>
        <h1>NUXT.JS</h1>
        <div class="login_out">
            <el-button type="primary" v-if="!isLogin" @click="goCreateFile">Login</el-button>
            <span class="userName" v-if="!isLogin"> {{userName}} My page!</span>
            <nuxt-link to="/login" v-if="isLogin" class="logIn btn">Login</nuxt-link>
            <span v-if="!isLogin" class="logOut btn" @click="logout">Logout</span>
        </div>
    </header>
</template>

<style scoped lang="scss">
  header {
    background: #f0f0f0;
    border-bottom: 1px solid #ccc;
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    padding: 0 25px;
    h1{
      margin-bottom: 0;
      display: inline-block;
      color: #409EFF;
    }
    .login_out{
      display: inline-block;
      float: right;
      span, a{
        padding-left: 10px;
        font-size: 14px;
        color: #666;
        &.btn{
           color: #999;
         }
      }
    }
  }
</style>
<script>
    import Cookie from 'js-cookie'
    export default {

        data() {
            let authUser = Cookie.get('authUser') ? JSON.parse(Cookie.get('authUser')) : '';
            return {
                userName: authUser.userName,
                isLogin: this.$route.name == 'login' ? true : false
            }
        },
        watch: {
            '$route' (to, from) {
                to.path == '/login' ? this.isLogin = true : this.isLogin = false;
                let authUser = Cookie.get('authUser') ? JSON.parse(Cookie.get('authUser')) : '';
                this.userName = authUser.userName;
            }
        },
        methods: {
            goCreateFile() {
                this.$router.push(`/edit`)
            },
            async logout() {
                try {
                    await this.$store.dispatch('logout')
                    this.$router.push(`/login`)
                    this.isLogin = true;
                } catch (e) {
                    console.log('logout', e)
                }
            }
        }
    }
</script>
