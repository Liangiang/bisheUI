<template>
  <div class="shopRegister">
    <el-row>
      <el-col :span="12" :offset="6">
        <div class="bot20">
          <el-card shadow="always">
            <div slot="header" class="clearfix">
              <span>欢迎注册商铺</span>
            </div>
            <div>
              <el-form ref="form" :model="registrform" label-width="100px" :rules="rules">
                <el-form-item label="商铺名称" prop="sName">
                  <el-input v-model="registrform.sName" placeholder="请输入店铺名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="负责人姓名" prop="sHeadName">
                  <el-input v-model="registrform.sHeadName" placeholder="请输入店主真实姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="sPhone">
                  <el-input v-model.number="registrform.sPhone" placeholder="请输入手机号" clearable></el-input>
                </el-form-item>
                <!--<el-form-item label="滑块验证" prop="SliderValidation" v-model="registrform.SliderValidation">

                <div class="movebox">
                <div class="movego"></div>
                <div class="txt" id="txt">拖动滑块验证</div>
                <div class="move moveBefore" v-move1="registrform"></div>
                </div>
                </el-form-item>-->
                <!--<el-form-item label="短信验证">
                  <el-input v-model="registrform.verificationcode" placeholder="请输入验证码" clearable style="width:75%;">
                  </el-input>
                  <el-button id="yzm" style="float:right;width: 23%;" type="primary" @click="send()"
                             :disabled="disabled">{{yzmbtn}}
                  </el-button>
                </el-form-item>-->
                <el-form-item label="登录密码" prop="sPassword">
                  <el-input v-model="registrform.sPassword"
                            placeholder="请输入登录密码"
                            clearable
                            type="password">
                  </el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmpassword">
                  <el-input v-model="registrform.confirmpassword"
                            placeholder="请确认登录密码" clearable
                            type="password"></el-input>
                </el-form-item>

                <el-form-item label="商铺地址" prop="sAddress">

                  <el-input type="textarea"
                            :rows="2"
                            v-model="registrform.sAddress"
                            placeholder="请输入商铺地址"
                            clearable>
                  </el-input>
                </el-form-item>
                <!--<el-form-item label="经营许可证号" prop="sBusinessLicense">
                  <el-input v-model="registrform.sBusinessLicense" placeholder="请输入店铺经营许可证号" clearable></el-input>
                </el-form-item>-->
                <el-form-item label="商铺邮箱" prop="sEmail">
                  <el-input v-model="registrform.sEmail" placeholder="请输入店铺邮箱" clearable></el-input>
                </el-form-item>
                <el-form-item prop="agree">
                  <el-checkbox v-model="registrform.agree" label="同意并遵守"></el-checkbox>
                  <a @click="clause()">《平台商铺服务条款》</a>
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
  import axios from 'axios';

  export default {
    name: "shopRegister",
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
        } else if (value !== this.registrform.sPassword) {
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
          sName: "",//店铺名
          shopleadername: '',//店主真实名字
          country: '',//国
          province: '',//省
          city: '',//市
          address: "",//店铺地址
          shopemail: '',//注册邮箱
          businesslicense: '',//经营许可证号
          sPhone: "", //电话号码
          password: "", //密码
          confirmpassword: "", //确认密码
          verificationcode: 0, //验证码
          SliderValidation: false, //滑块验证
          agree: [], //是否勾选确定协议
        },

        // 校验规则
        rules: {
          sName: [
            {
              required: true, //是否必填
              message: "店铺名不能为空", //规则
              trigger: "blur" //何事件触发
            },
          ],//店铺名
          sHeadName: [
            {
              required: true, //是否必填
              message: "店主名不能为空", //规则
              trigger: "blur" //何事件触发
            },
          ],//店主名
          sPhone: [
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
          /* yzm_code: [
             //手机验证码
             {
               required: true,
               message: "请输入手机验证码",
               trigger: "blur"
             }
           ],*/
          sPassword: [
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
          sBusinessLicense: [
            {
              required: true, //是否必填
              message: "经营许可证号不能为空", //规则
              trigger: "blur" //何事件触发
            },
          ],//经营许可证号
          sAddress: [
            {
              required: true, //是否必填
              message: "店铺地址不能为空", //规则
              trigger: "blur" //何事件触发
            },
          ],//店铺地址
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
            /*var params = {
              shopname: this.registrform.shopname,//店铺名称
              shoppassword: this.registrform.password,//登录密码
              shopleadername: this.registrform.shopleadername,//店铺负责人名称
              shopemail: this.registrform.shopemail,//店铺邮箱
              shopphone: this.registrform.shopphone,//电话号
              businesslicense: this.registrform.businesslicense,//经营许可证
              country: this.registrform.country,//国
              province: this.registrform.province,//省
              city: this.registrform.city,//市
              address: this.registrform.address,//店铺地址
            };*/
            console.log('店铺注册参数：', this.registrform);
            axios.post("/api/shop/add", this.registrform).then(res => {
              console.log('店铺注册：', res);
              if (res.data == 1) {
                this.$message({
                  showClose: true,
                  message: '店铺注册成功！',
                  type: 'success'
                });
                //跳到登录页面
                this.$router.push({
                  path: '/Login'
                });
              } else {
                this.$message.error("店铺注册失败！请重新录入信息");
              }
            });
          } else {
            this.$message.error("店铺注册失败！请重新录入信息");
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
  .shopRegister {
    /*background-color: #dd6161;*/
    width: 100%;
    background: url("./../../assets/img/loginbg.jpg");
  }

  .el-card {
    background: rgba(158, 175, 240, 0.5);
    /*background-color: rgba(255, 255, 255, 0.8);*/
  }

  .bot20 {

    margin-bottom: 20px;
    margin-top: 40px;

  }

</style>
