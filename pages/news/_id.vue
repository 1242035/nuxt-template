<template>
    <section class="container">
        <h1>{{datas.title}}</h1>
        <div class="about">
            Author: {{datas.author}}   Date:{{datas.date}}
        </div>
        <div class="art-body" v-html="datas.content"></div>
    </section>
</template>

<script>
    import Api from '~/utils/api'
    export default {
        middleware: 'auth',
        head() {
            return {
                title: this.datas.title,
                meta: [
                    { hid: 'description', name: 'description', content: 'description,' + this.datas.title},
                    { hid: 'keywords', name: 'keywords', content: 'keywords'}
                ]
            }
        },
        data(){
            return {
                datas: ''
            }
        },
        asyncData ({ params, error }) {
            return Api.newsOne(params.id)
                .then((res) => {
                    return { datas: res.data }
                })
                .catch (err => {})
        }
    }
</script>

<style>
h1,.about {
    text-align: center;
    margin-bottom: 15px;
}
</style>
