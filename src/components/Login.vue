<template>
  <div id="login">

    <el-card shadow="always"
             style="width: 450px;height: 400px;float: right;margin-right: 10%;margin-top: 10%; background: rgba(255,255,255,0.7)">
      <div slot="header" class="clearfix">
        <span>欢迎</span>
      </div>
      <div>
        <el-form ref="form" :model="loginForm" label-width="70px" :rules="loginRules">
          <el-form-item label="用户名" prop="phone">
            <el-input v-model.number="loginForm.phone" placeholder="请输入手机号码" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-radio-group v-model="loginForm.loginType">
              <el-radio :label="1">我是买家</el-radio>
              <el-radio :label="2">我是卖家</el-radio>
              <el-radio :label="3">我是管理员</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-button type="primary" style="width:100%;margin-bottom: 10px;" class="submit"
                         @click="submitForm(loginForm)">登录
              </el-button>
            </el-col>
            <el-col :span="24">
              <div style="float: right;text-align: right;">
                <el-button class="grid-content" @click="userRegister" type="text">注册</el-button>

                <el-button class="grid-content" @click="shopRegister" type="text">注册店铺</el-button>
              </div>

            </el-col>
          </el-row>

        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  import axios from 'axios'

  axios.defaults.withCredentials = true;
  export default {
    name: "Login",
    data() {
      return {
        //表单内容
        loginForm: {
          phone: '',
          password: "",
          loginType: 1,
        },
        userName: "",
        //表单验证
        loginRules: {
          phone: [
            {
              required: true,
              message: "请输入手机号",
              trigger: "blur"
            },

          ],
          password: [
            {
              required: true,
              message: "密码不能为空"
            },

          ],
        },

      }
    },

    methods: {
      //登录
      submitForm(form) {
        if (this.loginForm.phone == '' || this.loginForm.password == '') {

        } else {
          if (form.loginType == 1) {//用户
            console.log(params);
            let params = {
              phone: this.loginForm.phone,
              password: this.loginForm.password,
            };
            axios.post("/api/user/login", params).then(res => {
              console.log('用户信息：', res);
              if (res.data.flag == 500) {
                this.$message.error("用户名或密码错误！");
              } else if (res.data.flag == 404) {
                this.$message.error("未找到该用户！");
                // alert("该用户暂未通过管理员审核，请稍后再登录！");
              } else if (res.data.flag == 1) {
                //   alert("该用户暂未通过管理员审核，请重新注册！");
                // }
                // else if (res.data.ifnull == 2) {
                this.$message({
                  showClose: true,
                  message: '登录成功',
                  type: 'success'
                });
                console.log("用户登陆成功的信息：", res);
                sessionStorage.setItem("userId", JSON.stringify(res.data.userId));
                sessionStorage.setItem("userName", JSON.stringify(res.data.nickName));
                sessionStorage.setItem("userType", JSON.stringify(this.loginForm.loginType));
                this.$router.push({
                  name: 'index',
                  params: {
                    name: res.data.userName,
                    type: this.loginForm.loginType
                  }
                });
              }

            });
            /* sessionStorage.setItem("userId", JSON.stringify(this.loginForm.password));
           sessionStorage.setItem("userName", JSON.stringify(this.loginForm.phone));
           sessionStorage.setItem("userType", JSON.stringify(this.loginForm.loginType));
           this.$router.push({
             name: 'index',

           });*/
          } else if (form.loginType == 2) {//店家
            let params = {
              sPhone: this.loginForm.phone,
              sPassword: this.loginForm.password,
            };
            console.log('店家参数', params);
            axios.post("/api/shop/login", params).then(res => {
              console.log('店家登录信息', res);
              if (res.data.flag == 500) {
                alert("用户名或密码错误！");
              } else if (res.data.flag == 404) {
                alert("未找到该用户！");
              } else if (res.data.flag == 1) {
                this.$message({
                  showClose: true,
                  message: '登录成功',
                  type: 'success'
                });
                sessionStorage.setItem("userId", JSON.stringify(res.data.userId));
                sessionStorage.setItem("userName", JSON.stringify(res.data.nickName));
                sessionStorage.setItem("userType", JSON.stringify(this.loginForm.loginType));
                this.$router.push({
                  path: '/shopIndex',
                  query: {
                    name: res.data.userName,
                    type: this.loginForm.loginType
                  }
                });
              }

            });
          } else if (form.loginType == 3) {//管理员
            let params = {
              mPhone: this.loginForm.phone,
              mPassword: this.loginForm.password,
            };
            axios.post("/api/manager/login", params).then(res => {
              console.log('管理员登录信息', res);
              if (res.data.flag == 500) {
                this.$message.error("用户名或密码错误！");
              } else if (res.data.flag == 404) {
                this.$message.error("未找到该管理员用户！");
                // alert("该用户暂未通过管理员审核，请稍后再登录！");
              } else if (res.data.flag == 1) {
                sessionStorage.setItem("userId", JSON.stringify(res.data.userId));
                sessionStorage.setItem("userName", JSON.stringify(res.data.realName));
                sessionStorage.setItem("userType", JSON.stringify(this.loginForm.loginType));
                this.$message({
                  showClose: true,
                  message: '登录成功',
                  type: 'success'
                });
                this.$router.push({
                  path: '/manIndex'
                });
              }
            });
          }
        }
      },
      //用户注册
      userRegister() {
        this.$router.push({
          path: '/userRegister'
        });
      }
      ,
      //开店
      shopRegister() {
        this.$router.push({
          path: '/shopRegister'
        });
      }
    }

  }
</script>

<style scoped>
  #login {
    width: 100%;
    background: url("./../assets/img/loginbg.jpg");
    height: 937px;
  }

</style>
