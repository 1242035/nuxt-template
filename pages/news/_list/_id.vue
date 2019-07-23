<template>
    <section class="container">
        <h1>ID</h1>
        <div class="list">
            <ul class="list-ul">
                <li v-for="(item, index) in datas.rows" :key="index">
                <nuxt-link :to="`/news/${item._id}`">{{item.title}}</nuxt-link>
                <span class="caozuo">
                    <el-button size="mini" type="primary" @click="goFn(item._id)">Go</el-button>
                    <el-button size="mini" type="success" @click="editFn(item._id)">Edit</el-button>
                    <el-button size="mini" type="danger" @click="deletFn(item._id)">Remove</el-button>
                </span>
                </li>
            </ul>
            <my-page v-on:page-change="onPageChange" :pageSize="pageSize" :total="records" :currentPage="currentPage"></my-page>
        </div>

    </section>
</template>

<script>
    import Api from '~/utils/api'
    import MyPage from '~/components/PageAction'

    export default {
        middleware: 'auth',
        head() {
            return {
                title: 'title',
                meta: [
                    { hid: 'description', name: 'description', content: 'description' }
                ]
            }
        },
        data(){
            return {
                datas: '',
                records: 0,
                pageSize: 0,
                currentPage: 1
            }
        },
        asyncData ({ params, error }) {
            return Api.newslist(params.id, 10)
            .then((res) => {
                return { datas: res.data, records: res.data.records, pageSize: res.data.pagesize, currentPage: res.data.pageIndex}
            }).catch (err => {})
        },

        methods: {
            deletFn(id) {
                Util.UI.confirm('Are you sure?').then(() => {
                Api.newsDelet(id)
                .then(res => {
                    Util.UI.toast('success!', 'success')
                    setTimeout(() => {
                        this.$router.go(0)
                    }, 600)
                })
                }, () => {
                    console.log('Error')
                })

            },
            editFn(id) {
                this.$router.push(`/edit/${id}`)
            },
            goFn(id) {
                this.$router.push(`/news/${id}`)
            },
            onPageChange(e) {
                this.$router.push(`/news/list/${e}`)
            }
        },
        components: {
            MyPage
        }
    }
</script>

<style scoped lang="scss">
  li {
    overflow: hidden;
    padding: 6px 0;
    border-bottom: 1px solid #f7f7f7;
    line-height: 29px;
  &:hover {
     background: #f7f7f7;
   }
  }
  .caozuo{
    float: right;
  a{
    margin-left: 20px;
    font-size: 12px;
    color: #666;
  }
  button{
    margin-left: 20px;
    font-size: 12px;
    color: #fff;
  }
  }
</style>
