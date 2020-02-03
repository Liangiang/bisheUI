<template>
  <div id="userInfo">
    <div class="width1024">
      <div class="blockDiv blockDivTop" style="padding-bottom: 50px;">
        <div>
          <div class="title_box">
            <span class="title_span">人</span>
            <span class="levelTitle2">个人中心</span>
          </div>
        </div>
        <div class="line"></div>
        <div v-loading="userloading" style="padding-left: 10%;padding-right: 10%;">
          <el-form ref="userinfo" :model="userinfo" label-width="100px" :rules="rules">
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model.number="userinfo.nickName" placeholder="请输入昵称" clearable
                        :disabled="userdisabled"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model.number="userinfo.phone" placeholder="请输入手机号" clearable
                        :disabled="userdisabled"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="name">
              <el-input v-model="userinfo.name" placeholder="请输入真实姓名" clearable :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model.number="userinfo.age" placeholder="请输入年龄" clearable :disabled="userdisabled"></el-input>
            </el-form-item>
            <el-form-item label="余额" prop="money">
              <el-input v-model.number="userinfo.money" placeholder="请输入余额" clearable
                        :disabled="userdisabled"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="userinfo.sex" :disabled="userdisabled">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userinfo.email" placeholder="请输入邮箱" clearable :disabled="userdisabled"></el-input>
            </el-form-item>
            <el-form-item label="收货地址" prop="address">
              <!--<div style="margin-bottom: 5px;">
                <div style="width: 30%;float: left;">
                  国：
                  <el-input style="width: 80%;"
                            v-model="userinfo.country"
                            placeholder="请输入收货地址（国）"
                            clearable
                            :disabled="userdisabled">
                  </el-input>
                </div>
                <div style="width: 34%;float: left;">
                  省：
                  <el-input style="width: 80%;"
                            v-model="userinfo.province"
                            placeholder="请输入收货地址（省）"
                            clearable
                            :disabled="userdisabled">
                  </el-input>
                </div>
                <div style="width: 35%;float: right;">
                  市：
                  <el-input style="width: 80%;"
                            v-model="userinfo.city"
                            placeholder="请输入收货地址（市）"
                            clearable
                            :disabled="userdisabled">
                  </el-input>
                </div>
              </div>-->
              <el-input type="textarea"
                        :rows="2"
                        v-model="userinfo.address"
                        placeholder="请输入收货地址"
                        clearable
                        :disabled="userdisabled">
              </el-input>
            </el-form-item>
            <el-form-item v-if="userdisabled">
              <el-button @click="userdisabled=false">修改个人信息</el-button>
            </el-form-item>
            <el-form-item v-if="!userdisabled">
              <el-button type="primary" @click="updataUser">提交</el-button>
              <el-button type="primary" @click="getAUserInfo">取消</el-button>
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
    name: "userInfo",
    data() {
      //手机号
      let validatePhone = (rule, value, callback) => {
        if (/^1[34578]{1}\d{9}$/.test(value) == false) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      };
      return {
        userdisabled: false,
        userloading: true,
        userinfo: {
          signname: "",//昵称
          phone: "", //电话号码
          name: '',//真实名字
          age: '',//年龄
          sex: 1,//性别
          email: '',//邮箱
          address: '',//地址
          country: '',//国
          province: '',//省
          city: '',//市
          money: '',//余额
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
          money: [
            {
              type: 'number',
              required: true, //是否必填
              message: "余额不能为空，请输入数字", //规则
              trigger: "blur" //何事件触发
            },
          ],//余额
        }
      }
    },
    mounted() {
      this.getAUserInfo();
    },
    methods: {
      //单个用户所有信息
      getAUserInfo() {
        this.userloading = true;
        this.userdisabled = true;
        let params = {
          id: sessionStorage.getItem("userId")
        };
        axios.post("/api/user/sel", params).then(res => {
          console.log('该用户所有信息----', res);
          this.userloading = false;
          this.userinfo = res.data;
        });
      },
      //更新用户信息
      updataUser() {
        this.$refs.userinfo.validate(valid => {
          if (valid) {
            //如果通过验证 to do...
            console.log('更新用户信息', this.userinfo);
            axios.post("/api/user/up", this.userinfo).then(res => {
              console.log('修改该用户所有信息----', res.data);
              if (res.data != 0) {
                this.$message({
                  showClose: true,
                  message: '修改成功！',
                  type: 'success'
                });
                this.getAUserInfo();
              } else {
                this.$message.error("修改失败，请重新修改！");
              }
            });
          } else {
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>
