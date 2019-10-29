<template>
  <div id="pay">
    <div class="width1024">
      <div class="blockDiv blockDivTop" style="padding-bottom: 50px;">
        <div>
          <b class="levelTitlebar">
          </b>
          <b class="tiao2"></b>
          <span class="levelTitle2">支付信息</span>
        </div>
        <div class="line"></div>
        <div style="padding-left: 20%;padding-right: 20%;">
          <el-row>
            <el-col :span="16" style="padding: 2% 0;">
              <span style="font-size: 1.6rem;font-weight: bolder;">该订单合计：</span>
              <span style="color: red; font-size: 1.6rem;font-weight: bolder;">￥{{countPrice}}</span>
            </el-col>
            <el-col :span="8" style="padding: 2% 0;">
              <el-button @click="returnBeforePage">取消</el-button>
              <el-button @click="pay" plain>付款</el-button>
            </el-col>
            <!--<el-col :span="24">
              请选择支付方式
            </el-col>
            <el-col :span="24" style="padding: 2% 0;">
              <el-radio-group v-model="payType">
                <el-radio label="1"
                          border size="medium">
                  “小红唇”零钱包（余额：￥{{userinfo.money|money}}）
                </el-radio>
                <el-radio label="2"
                          border size="medium" :disabled="true">
                  支付宝
                </el-radio>
                <el-radio label="3"
                          border size="medium" :disabled="true">
                  微信支付
                </el-radio>
              </el-radio-group>
            </el-col>-->

          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "pay",
    data() {
      return {
        oId: this.$route.query.oId,//订单id的List
        countPrice: this.$route.query.countPrice,//几个订单总价格
        payType: '',//支付类型
        userinfo: {},//用户信息
      }
    },
    mounted() {
      this.getAUserInfo();
    },
    methods: {
      //单个用户所有信息
      getAUserInfo() {
        let params = {
          id: sessionStorage.getItem("userId")
        };
        axios.post("/api/user/sel", params).then(res => {
          console.log('该用户所有信息----', res.data);
          this.userinfo = res.data;
        });
      },
      //支付
      pay() {
        console.log(this.payType);

        console.log('余额', this.userinfo.money);
        if (this.userinfo.money < this.countPrice || this.userinfo.money == null) {
          this.$message.error("零钱包余额不够，请充值！")
        }
        else {
          let params = {
            oId: this.oId,
            oStatus: 1
          };
          // console.log('支付参数：',params);
          axios.post("/api/order/up", params).then(res => {
            console.log('支付返回数据', res.data);
            if (res.data != 0) {
              this.$message({
                showClose: true,
                message: '支付成功',
                type: 'success'
              });
              //跳转到订单中心
              this.$router.push({
                path: '/userOrder',
              });
            } else {
              this.$message.error("支付失败，请重新支付！");
            }
          });

        }

      },
      //返回上一页
      returnBeforePage() {
        this.$router.go(-1);//返回上一层
      },
    },
    filters: {
      money: function (data) {
        if (data == null || data == undefined) {
          return 0;
        } else {
          return data;
        }
      },
    },
  }
</script>

<style scoped>

</style>
