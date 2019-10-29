<template>
  <div id="userRegister">
    <el-row>
      <el-col :span="12" :offset="6">
        <div class="bot20">
          <el-card shadow="always" style="background: rgba(158, 175, 240,0.5)">
            <div slot="header" class="clearfix">
              <span>欢迎注册</span>
            </div>
            <div>
              <el-form ref="form" :model="registrform" label-width="100px" :rules="rules">
                <el-form-item label="昵称" prop="nickName">
                  <el-input v-model.number="registrform.nickName" placeholder="请输入昵称" clearable></el-input>
                </el-form-item>

                <el-form-item label="手机号码" prop="phone">
                  <el-input v-model.number="registrform.phone" placeholder="请输入手机号" clearable></el-input>
                </el-form-item>
                <!--<el-form-item label="滑块验证" prop="SliderValidation" v-model="registrform.SliderValidation">

                <div class="movebox">
                <div class="movego"></div>
                <div class="txt" id="txt">拖动滑块验证</div>
                <div class="move moveBefore" v-move1="registrform"></div>
                </div>
                </el-form-item>-->
                <el-form-item label="短信验证">
                  <el-input v-model="registrform.verificationcode" placeholder="请输入验证码" clearable style="width:75%;">
                  </el-input>
                  <el-button id="yzm" style="float:right;width: 23%;" type="primary" @click="send()"
                             :disabled="disabled">{{yzmbtn}}
                  </el-button>
                </el-form-item>
                <el-form-item label="登录密码" prop="password">
                  <el-input v-model="registrform.password" placeholder="请输入登录密码" clearable type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmpassword">
                  <el-input v-model="registrform.confirmpassword" placeholder="请确认登录密码" clearable
                            type="password"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="name">
                  <el-input v-model="registrform.name" placeholder="请输入真实姓名" clearable></el-input>
                </el-form-item>

                <el-form-item label="年龄" prop="age">
                  <el-input v-model.number="registrform.age" placeholder="请输入年龄" clearable></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                  <el-radio-group v-model="registrform.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="registrform.email" placeholder="请输入邮箱" clearable></el-input>
                </el-form-item>

                <el-form-item label="收货地址" prop="address">
                  <!--<div style="margin-bottom: 5px;">
                    <div style="width: 30%;float: left;">
                      国：
                      <el-input style="width: 80%;"
                                v-model="registrform.country"
                                placeholder="请输入收货地址（国）"
                                clearable>
                      </el-input>
                    </div>
                    <div style="width: 34%;float: left;">
                      省：
                      <el-input style="width: 80%;"
                                v-model="registrform.province"
                                placeholder="请输入收货地址（省）"
                                clearable>
                      </el-input>
                    </div>
                    <div style="width: 35%;float: right;">
                      市：
                      <el-input style="width: 80%;"
                                v-model="registrform.city"
                                placeholder="请输入收货地址（市）"
                                clearable>
                      </el-input>
                    </div>
                  </div>-->
                  <el-input type="textarea"
                            :rows="2"
                            v-model="registrform.address"
                            placeholder="请输入收货地址"
                            clearable>
                  </el-input>
                  <!--<el-input v-model="registrform.address" placeholder="请输入收货地址" clearable></el-input>-->
                </el-form-item>
                <el-form-item label="余额" prop="money">
                  <el-input v-model="registrform.money" placeholder="请输入邮箱" clearable></el-input>
                </el-form-item>
                <el-form-item prop="agree">
                  <el-checkbox v-model="registrform.agree" label="同意并遵守"></el-checkbox>
                  <a @click="clause()">《平台买家服务条款》</a>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit('registrform')">立即注册</el-button>
                  <el-button type="primary" @click="toIndex()">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <div>
      <!-- <el-input v-model="dir1" v-my-directive1="registrform"></el-input>
      <el-input v-model="dir1" v-move1="registrform"></el-input> -->
    </div>
  </div>

</template>

<script>
  //import API from "../api/api";

  import axios from 'axios'

  export default {
    name: 'userRegister',
    data() {
      //手机号
      let validatePhone = (rule, value, callback) => {
        if (/^1[34578]{1}\d{9}$/.test(value) == false) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      };
      // 密码
      let validatePass = (rule, value, callback) => {
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/.test(value) == false) {
          callback(new Error("请输入6-20位密码，必须包含大小写字母和数字"));
        } else {
          callback();
        }
      };
      // 确认密码
      let validatePass2 = (rule, value, callback) => {
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/.test(value) == false) {
          callback(new Error("请输入6-20位密码，必须包含大小写字母和数字"));
        } else if (value !== this.registrform.password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        yzmbtn: "获取验证码",
        time: "",
        disabled: false,
        //form表单数据
        registrform: {
          nickName: "",//昵称
          phone: "", //电话号码
          password: "", //密码
          confirmpassword: "", //确认密码
          name: '',//真实名字
          verificationcode: '', //验证码
          age: '',//年龄
          sex: 0,//性别
          email: '',//邮箱
          address: '',//地址
          country: '',//国
          province: '',//省
          city: '',//市
          agree: [], //是否勾选确定协议
          fig: 0,//未被审核
          money: 0,
        },

        // 校验规则
        rules: {
          nickName: [
            {
              required: true, //是否必填
              message: "昵称不能为空", //规则
              trigger: "blur" //何事件触发
            },
          ],//昵称
          name: [
            {
              required: true, //是否必填
              message: "真实姓名不能为空", //规则
              trigger: "blur" //何事件触发
            },
          ],//店主名
          age: [
            {
              required: true, //是否必填
              message: "年龄不能为空", //规则
              trigger: "blur" //何事件触发
            },
          ],//年龄
          sex: [
            {
              required: true, //是否必填
              message: "性别不能为空", //规则
              trigger: "blur" //何事件触发
            },
          ],//性别
          address: [
            {
              required: true, //是否必填
              message: "地址不能为空", //规则
              trigger: "blur" //何事件触发
            },
          ],//地址
          phone: [
            //手机号
            {
              required: true, //是否必填
              message: "手机号不能为空", //规则
              trigger: "blur" //何事件触发
            },
            //可以设置双重验证标准
            // { min: 3, max: 5,  message: '长度在 3 到 5 个字符', }
            {
              required: true,
              validator: validatePhone,
              trigger: "blur"
            }
          ],
          password: [
            //密码
            {
              required: true,
              message: "请输入密码",
              trigger: "blur"
            },
            {
              required: true,
              validator: validatePass,
              trigger: "blur"
            }
          ],
          confirmpassword: [
            //确认密码
            {
              required: true,
              validator: validatePass2,
              trigger: "blur"
            }
          ],
          agree: [
            //协议
            {
              type: "array",
              required: true,
              message: "请阅读并勾选注册协议",
              trigger: "change"
            }
          ]
        }
      };
    },
    methods: {
      //提交按钮点击事件
      onSubmit(form) {
        this.$refs.form.validate(valid => {
          if (valid) {
            //如果通过验证 to do...
            console.log("提交啦！", this.registrform);
            let params = {
              name: this.registrform.name,//真实姓名
              nickName: this.registrform.nickName,//昵称
              password: this.registrform.password,//密码
              age: this.registrform.age,//年龄
              sex: this.registrform.sex,//性别
              phone: this.registrform.phone,//电话号码
              email: this.registrform.email,//email
              country: this.registrform.country,//国
              province: this.registrform.province,//省
              city: this.registrform.city,//市
              money: this.registrform.money,//市
              address: this.registrform.address,//地址
              fig: 0,//未被管理员审核
            };
            axios.post("/api/user/add", params).then(res => {
              console.log('用户注册', res);
              if (res.data == 1) {
                this.$message({
                  showClose: true,
                  message: '恭喜你！注册成功！',
                  type: 'success'
                });
                //跳到登录页面
                this.$router.push({
                  path: '/Login'
                });
              } else {
                this.message.error('抱歉！注册失败！')
              }
            });
          } else {

            return false;
          }
        });
      },
      clause() {
        alert("条款!");
      },
      //取消注册
      toIndex() {
        this.$router.push({
          path: '/index'
        });
      }
    },
  }
</script>

<style scoped>
  #userRegister {
    /*background-color: #dd6161;*/
  }
</style>
