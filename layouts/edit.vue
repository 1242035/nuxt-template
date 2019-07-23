<template>
    <div>
        <my-header></my-header>
        <div class="edit container">
            <nuxt/>
            <el-form :model="editData" :rules="rules" ref="editForm" label-width="100px" class="form-edit">
                <el-form-item label="文章标题" prop="title">
                    <el-input v-model="editData.title"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="author">
                    <el-input v-model="editData.author"></el-input>
                </el-form-item>
                <el-form-item label="文章内容" prop="content">
                    <div class="quill-editor"
                        :content="editData.content"
                        @change="onEditorChange($event)"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)"
                        v-quill:myQuillEditor="editorOption">
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitNews('editForm')">Edit</el-button>
                    <el-button @click="resetForm('editForm')">Reset</el-button>
                </el-form-item>
            </el-form>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import Api from '~/utils/api'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import 'quill/dist/quill.core.css'
    import MyHeader from '~/components/Header'
    import MyFooter from '~/components/Footer'
    import Cookie from 'js-cookie'

    let authUser =  eval('(' + Cookie.get('authUser') + ')');
    export default {
        data(){
        return {
            editData: {
            title: '',
            author: authUser ? authUser.userName : '',
            date: '',
            content: ''
            },
            rules: {
            title: [
                { required: true, message: '请输入文章标题', trigger: 'blur' },
                { min: 5, message: '长度在不得少于5个字符', trigger: 'blur' }
            ],
            author: [
                { required: false, message: '请输入文章作者', trigger: 'blur' }
            ],
            content: [
                { required: true, message: '请输入文章内容', trigger: 'blur' }
            ]
            },
            editorOption: {
            // some quill options
            modules: {
                toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['clean']
                ]
            }
            }

        }
        },
        beforeMount () {
        if (!this.$route.params.id) return;
        Api.newsOne(this.$route.params.id)
            .then(res => {
            this.editData.title = res.data.title;
            this.editData.author = res.data.author;
            this.editData.date = res.data.date;
            this.editData.content = res.data.content;
            }, err => {
            console.log('报错啦', err)
            })
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            submitNews(formName) {

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.editData.author = this.editData.author ? this.editData.author : '';
                        if (this.$route.params.id) {
                            Api.reEdit(this.$route.params.id, this.editData)
                            .then((res) => {
                                Util.UI.toast('Success!', 'success')
                            }).then((res) => {
                                this.$router.push('/news/list/1')
                            }, err => {
                                Util.UI.toast('Unknown!', 'error')
                            })
                        } 
                        else
                        {
                            Api.newsEdit(this.editData)
                            .then((res) => {
                                Util.UI.toast('Success!', 'success')
                            }).then((res) => {
                                this.$router.push('/news/list/1')
                            }, err => {
                                Util.UI.toast('Unknown!', 'error')
                            })
                        }
                    } 
                    else {
                        return false;
                    }
                });

            },
            onEditorBlur(editor) {
                console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            },
            onEditorChange({ editor, html, text }) {
                this.editData.content = html
            }
        },
        components: {
            MyFooter,
            MyHeader
        },
    }
</script>

<style scoped lang="scss">
  .form-edit{
    max-width: 72%;
  }
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
</style>
