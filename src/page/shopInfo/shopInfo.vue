<template>
    <div id="shopInfo">
      <div class="width1024">
        <div class="blockDiv blockDivTop" style="padding-bottom: 50px;">
          <div>
            <div class="title_box">
              <span class="title_span">铺</span>
              <span class="levelTitle2">商铺中心</span>
            </div>
          </div>
          <div class="line"></div>
          <div v-loading="shoploading" style="padding-left: 10%;padding-right: 10%;">
            <el-form ref="shopInfo" :model="shopInfo" label-width="100px" :rules="rules">
              <el-form-item label="商铺名称" prop="sName">
                <el-input v-model="shopInfo.sName" placeholder="请输入店铺名称"  clearable :disabled="shopdisabled"></el-input>
              </el-form-item>
              <el-form-item label="负责人姓名" prop="sHeadName">
                <el-input v-model="shopInfo.sHeadName" placeholder="请输入店主真实姓名" clearable :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="sPhone">
                <el-input v-model.number="shopInfo.sPhone" placeholder="请输入手机号" clearable :disabled="shopdisabled"></el-input>
              </el-form-item>
              <!--<el-form-item label="滑块验证" prop="SliderValidation" v-model="shopInfo.SliderValidation">

              <div class="movebox">
              <div class="movego"></div>
              <div class="txt" id="txt">拖动滑块验证</div>
              <div class="move moveBefore" v-move1="shopInfo"></div>
              </div>
              </el-form-item>-->
              <!--<el-form-item label="短信验证">
                <el-input v-model="shopInfo.verificationcode" placeholder="请输入验证码" clearable style="width:75%;">
                </el-input>
                <el-button id="yzm" style="float:right;width: 23%;" type="primary" @click="send()"
                           :disabled="disabled">{{yzmbtn}}
                </el-button>
              </el-form-item>-->
              <!--<el-form-item label="登录密码" prop="sPassword">
                <el-input v-model="shopInfo.sPassword"
                          placeholder="请输入登录密码"
                          clearable
                          type="password">
                </el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmpassword">
                <el-input v-model="shopInfo.confirmpassword"
                          placeholder="请确认登录密码" clearable
                          type="password"></el-input>
              </el-form-item>-->

              <el-form-item label="商铺地址" prop="sAddress">

                <el-input type="textarea"
                          :rows="2"
                          v-model="shopInfo.sAddress"
                          placeholder="请输入商铺地址"
                          clearable
                          :disabled="shopdisabled"
                >
                </el-input>
              </el-form-item>
              <!--<el-form-item label="经营许可证号" prop="sBusinessLicense">
                <el-input v-model="shopInfo.sBusinessLicense" placeholder="请输入店铺经营许可证号" clearable></el-input>
              </el-form-item>-->
              <el-form-item label="商铺邮箱" prop="sEmail">
                <el-input v-model="shopInfo.sEmail" placeholder="请输入店铺邮箱" clearable :disabled="shopdisabled"></el-input>
              </el-form-item>
              <el-form-item v-if="shopdisabled">
                <el-button @click="shopdisabled=false">修改商铺信息</el-button>
              </el-form-item>
              <el-form-item v-if="!shopdisabled">
                <el-button type="primary" @click="updataUser">提交</el-button>
                <el-button type="primary" @click="getAShopInfo">取消</el-button>
              </el-form-item>
              
            </el-form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "shopInfo",
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
              shopdisabled: false,
              shoploading: true,
              shopInfo:{

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
            }
        },
        mounted() {
          this.getAShopInfo();
        },
        methods: {
          //商铺信息
          getAShopInfo() {
            this.shoploading = true;
            this.shopdisabled = true;
            let params = {
              sId: sessionStorage.getItem("userId")
            };
            axios.post("/api/shop/sel", params).then(res => {
              console.log('该用户所有信息----', res.data);
              this.shoploading = false;
              this.shopInfo = res.data;
            });
          },

          //更新用户信息
          updataUser() {
            this.$refs.shopInfo.validate(valid => {
              if (valid) {
                //如果通过验证 to do...
                console.log('更新店铺信息', this.shopInfo);
                axios.post("/api/shop/up", this.shopInfo).then(res => {
                  console.log('修改该店铺所有信息----', res.data);
                  if (res.data != 0) {
                    this.$message({
                      showClose: true,
                      message: '修改成功！',
                      type: 'success'
                    });
                    this.getAShopInfo();
                  } else {
                    this.$message.error("修改失败，请重新修改！");
                  }
                });
              } else {
                return false;
              }
            });
          },
        },
        computed: {},
        filters: {},
    }
</script>

<style scoped>

</style>
