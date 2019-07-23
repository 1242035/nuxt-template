<template>
    <section class="container">
        <div class="login_logout">
            <h1>Login</h1>
            <div class="list">
                <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="60px" class="demo-ruleForm">
                    <el-form-item label="userName" prop="userName">
                        <el-input type="text" v-model="ruleForm2.userName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="passWord" prop="passWord">
                        <el-input type="password" v-model="ruleForm2.passWord" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="captcha">
                        <div id="captcha">
                            <p id="wait" v-if="!showJiyan" class="show"><i class="el-icon-loading"></i>Waiting......</p>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" id="btn">Login</el-button>
                        <el-button @click="resetForm('ruleForm2')">Reset</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </section>
</template>

<script>
    import Api from '~/utils/api'
    import Cookie from 'js-cookie'
    export default {
        head() {
            return {
                title: 'login',
                meta: [
                    { hid: 'description', name: 'description', content: 'login....' }
                ],
                script: [
                    { src: 'http://static.geetest.com/static/tools/gt.js', type: 'text/javascript' }
                ]
            }
        },
        data(){
            return {
                ruleForm2: {
                    userName: '',
                    passWord: ''
                },
                jiyanData: {
                    geetest_challenge: '',
                    geetest_validate: '',
                    geetest_seccode: ''
                },
                showJiyan: false
            }
        },
        created() {
            Api.JiyanSlide()
            .then(res => {
                let _this = this;
                initGeetest({
                    gt: res.data.gt,
                    challenge: res.data.challenge,
                    offline: !res.data.success,
                    new_captcha: res.data.new_captcha,
                    product: "float",
                    width: "100%"
                }, function(captchaObj) {
                        var captchaBox = document.getElementById('captcha');
                        var wait = document.getElementById('wait');
                        var btn = document.getElementById('btn');
                        captchaObj.appendTo(captchaBox);
                        captchaObj.onReady(function () {
                        _this.showJiyan = true;
                    });
                    btn.onclick = function () {
                        _this.ruleForm2.userName = _this.ruleForm2.userName.trim()
                        Api.login(_this.ruleForm2)
                        .then(info => {
                            let result = captchaObj.getValidate();
                            if (!result) {
                                return Util.UI.toast('error!', 'error')
                            }

                            _this.jiyanData.geetest_challenge = result.geetest_challenge;
                            _this.jiyanData.geetest_validate = result.geetest_validate;
                            _this.jiyanData.geetest_seccode = result.geetest_seccode;
                            Api.JiyanValidate(_this.jiyanData)
                            .then(res => {
                                if (res.data.status === 'success') {
                                    Cookie.set('authUser', info.data)
                                    Util.UI.toast('success!', 'success')
                                    _this.$router.push(`/`)
                                } 
                                else if (res.data.status === 'fail') {
                                    Util.UI.toast('error!', 'error')
                                    captchaObj.reset();
                                }
                            })

                        }, err => {
                            Util.UI.toast('error!', 'error')
                        })
                    }
                });
            })
        },
        methods: {
    //      async login() {
    //        try {
    //          await this.$store.dispatch('login', this.ruleForm2)
    //          Util.UI.toast('登录成功!', 'success')
    //          this.$router.push(`/`)
    //        } catch (e) {
    //          Util.UI.toast('账号或密码错误!', 'error')
    //        }
    //      },

            resetForm(formName) {
                this.$refs[formName].resetFields();
                    console.log("jquery", this)
            }
        }
    }
</script>

<style scoped lang="scss">
  .container{
    -webkit-box-shadow: none;
    box-shadow: none;
    .login_logout{
      padding: 20px;
      border-radius: 5px;
      -webkit-box-shadow: 0 0 6px rgba(99, 99, 99, .4);
      box-shadow: 0 0 6px rgba(99, 99, 99, .4);
      width: 360px !important;
      /*height: 300px !important;*/
      margin-left: -180px;
      margin-top: -150px;
      position: absolute;
      left: 50%;
      top:50%;
      min-height: 300px;
    }
    .username_pass{
      font-size: 12px;
      color: #999;
      text-align: center;
    }
    #wait{
      line-height: 40px;
      color: #666;
    }
  }
  footer{
    display: none;
  }
</style>
