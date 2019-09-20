<template>
  <div class="login">
    <div class="loginDialog">
      <h1>药师帮后台ERP管理系统</h1>
      <div class="loginBox">

        <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
          <el-form-item prop="account" :class="{active: acActive}">
            <div class="svg-container" :class="{active: acActive}">
              <svg-icon icon-class="user" class-name="tag"></svg-icon>
            </div>
            <el-input
              v-model="loginForm.account"
              placeholder="请输入账号"
              type="text"
              name="account"
              @blur="acTextOnblur"
              @keyup.native="acTextOnFocus"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="password" :class="{active: pwActive}">
            <div class="svg-container" :class="{active: pwActive}">
              <svg-icon icon-class="lock" class-name="tag"></svg-icon>
            </div>
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              :type="passwordType"
              name="password"
              @blur="pwTextOnblur"
              @keyup.native="pwTextOnFocus"
              @keyup.enter.native="submitData"
            >
            </el-input>
            <div class="svg-eye" @click.prevent="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" class-name="tag"></svg-icon>
            </div>
          </el-form-item>

          <div class="choosed">
            <el-checkbox v-model="checked">记住密码</el-checkbox>
          </div>

          <a href="#" class="loginBtn" :class="{active: loginForm.account && loginForm.password}"
             @click.prevent.stop="submitData">
            登录系统
          </a>
        </el-form>
<!--        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">-->
<!--          第三方登录-->
<!--        </el-button>-->
      </div>
    </div>

<!--    <el-dialog title="第三方登录" :visible.sync="showDialog">-->
<!--      暂未开放! ! !-->
<!--      <br>-->
<!--      <br>-->
<!--      <br>-->
<!--      <social-sign />-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
    import {isValidUsername, validPassword} from '@/utils/validate';
    import {getToken} from '@/utils/token'
    import {getInfo, setInfo, removeInfo} from '@/utils/info'
    import SocialSign from './components/SocialSignin'

    export default {
        name: "login",
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!isValidUsername(value)) {
                    callback(new Error('请输入正确格式的用户名'))
                } else {
                    callback()
                }
            };

            const validatePassword = (rule, value, callback) => {
                if (!validPassword(value)) {
                    callback(new Error('请输入正确格式的密码'))
                } else {
                    callback()
                }
            };

            return {
                loginForm: {
                    account: '',
                    password: ''
                },
                passwordType: 'password',
                loginRules: {
                    account: [{required: true, trigger: 'blur', validator: validateUsername}],
                    password: [{required: true, trigger: 'blur', validator: validatePassword}]
                },
                checked: true,         // 是否记住密码
                acActive: false,         // 账号是否被激活
                pwActive: false,         // 密码是否被激活
                icActive: false,         // 验证码是否被激活
                imgCodeSrc: '',         // 验证码图片
                imgVerifyToken: '',     // 验证码token
                showDialog: false,
                errorTips: ''
            }
        },
        components: {SocialSign},
        created() {
            let token = getToken();
            // 有token强制跳转至登陆页则强制跳转回首页
            if (token) this.$router.push({path: './'});
            if(getInfo()){
                const {account, password} = JSON.parse(getInfo());
                this.loginForm.account = account;
                this.loginForm.password = password;
            }
            // this.reGetCodeImg()
        },
        methods: {
            /**
             * 提交数据
             **/
            submitData() {
                const {loginForm} = this;
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        // 请求登陆接口
                        this.$store.dispatch('user/login', Object.assign(loginForm)).then(rsp=>{
                            const {account, password} = this;
                            // 保存本地账号密码/不保存本地账号和密码
                            if (this.checked) {
                                setInfo(JSON.stringify({account, password}))
                            } else {
                                removeInfo()
                            }
                            // 路由跳转
                            this.$router.push({path: '/'});
                        }, rej=>{
                            if (rej.data.errcode === 460) {
                                this.$message.error(rej.data.datas[0].message);
                            } else {
                                this.$message.error(rej.data.errmsg);
                            }

                            if (rej.data) {
                                if (rej.data.errcode === 600403 || rej.data.errcode === 600402) this.reGetCodeImg();
                            }
                        });
                    } else {
                        return false
                    }
                });
            },
            /**
             * 切换显示密码
             */
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = '';
                } else {
                    this.passwordType = 'password';
                }
            },
            /**
             * 账号失焦事件
             */
            acTextOnblur() {
                if (!this.loginForm.account) {
                    this.acActive = false;
                }
            },
            /**
             * 账号聚焦事件
             */
            acTextOnFocus() {
                this.acActive = true;
            },
            /**
             * 密码失焦事件
             */
            pwTextOnblur() {
                if (!this.loginForm.password) {
                    this.pwActive = false;
                }
            },
            /**
             * 密码聚焦事件
             */
            pwTextOnFocus() {
                this.pwActive = true;
            },
            /**
             * 重新获取验证码
             */
            reGetCodeImg() {

            }
        }
    }
</script>

<style lang="scss">
  @import '../../style/login';
</style>
