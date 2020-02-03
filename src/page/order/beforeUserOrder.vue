<template>
  <div id="beforeUserOrder">
    <div class="width1024">
      <div class="blockDiv blockDivTop" style="padding-bottom: 50px;margin-bottom: 35px;">
        <div class="title_box">
          <span class="title_span">认</span>
          <span class="levelTitle2">确认信息</span>
        </div>
        <div class="line"></div>
        <div v-loading="beforeOrderLoading">
          <div style="margin: 10px;" v-for="(item,index) in beforeOrderData"
               :key="index">
            <el-row style="margin-top: 20px;margin-left: 10px;margin-right: 10px;border-bottom: solid #ebebeb 1px;">
              <el-col :span="10">
                商品信息
              </el-col>
              <el-col :span="4">
                规格
              </el-col>
              <el-col :span="3">
                单价
              </el-col>
              <el-col :span="3">
                购买数量
              </el-col>
              <el-col :span="4">
                小计
              </el-col>
            </el-row>
            <el-row style="margin-top: 20px;margin-left: 10px;margin-right: 10px; border-bottom: solid #ebebeb 1px;">
              <el-col :span="10">
                <el-row>
                  <el-col :span="6">
                    <img :src="item.imgUrl" style="width: 100px;height: 100px;"/>
                  </el-col>
                  <el-col :span="18">
                    {{item.gName}}
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="4">
                {{item.oTypeName}}
              </el-col>
              <el-col :span="3">
                ￥
                <!--<span v-if="item.spellflag==1">
                  {{item.oPrice}}
                  <span style="color: #a8abb2"><s>￥{{item.price}}</s></span>
                </span>
                <span v-if="item.spellflag==0">
                  {{item.price}}
                </span>-->
                <span>
                  {{item.oPrice}}
                </span>
              </el-col>
              <el-col :span="3">
                {{item.oNum}}
              </el-col>
              <el-col :span="4">
                ￥
                <!--<span v-if="item.spellflag==1">
                {{item.spellprice*item.buynum}}
              </span>
                <span v-if="item.spellflag==0">
                {{item.price*item.buynum}}
              </span>-->
                <span>{{item.countPrice }}</span>
              </el-col>
            </el-row>

            <!--<el-row>
              <div style="margin-left: 30px;">
               &lt;!&ndash; <div style="margin-top: 10px;">
                  <span style="margin-right: 10px;">
                    运送方式：普通配送
                  </span>
                  <span style="margin-left: 10px;" v-if="item.postflag==1">
                    免邮￥0
                  </span>
                  <span v-if="item.postflag==0">
                    ￥{{item.postprice}}
                  </span>
                </div>&ndash;&gt;
                <div>
                  交易小计：￥
                  <span v-if="item.spellflag==1&&item.postflag == 0" class="little_money">
                    {{item.spellprice*item.buynum+item.postprice| DoubleNumber}}
                  </span>
                  <span v-if="item.spellflag==1&&item.postflag == 1" class="little_money">
                    {{item.spellprice*item.buynum | DoubleNumber}}
                  </span>
                  <span v-if="item.spellflag==0&&item.postflag == 0" class="little_money">
                    {{item.price*item.buynum+item.postprice | DoubleNumber}}
                  </span>
                  <span v-if="item.spellflag==0&&item.postflag == 1" class="little_money">
                    {{item.price*item.buynum | DoubleNumber}}
                  </span>

                </div>
              </div>
            </el-row>-->
          </div>
          <el-row>
            <el-col :span="24">
              <div style="border: solid #eeeeee 1px;margin: 10px 20px;padding: 5px;">
                  <span style="font-size: 14px;font-weight: bolder;">
                    收货地址：
                  </span>
                <span>
                    {{userInfo.address}}
                  </span>
                <div>
                  <span style="font-size: 14px;font-weight: bolder;">收货人：</span>
                  <span>{{userInfo.name}}</span>
                  <span style="margin-left: 10px;">{{userInfo.phone}}</span>
                </div>
                <div>
                  <span style="font-size: 14px;font-weight: bolder;"> 共计：</span>
                  <span
                    style="color: red;font-weight: bolder;font-size: 16px;"> ￥{{beforeOrderData[0].countPrice }}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="24" style="text-align: center;padding-right: 20px; padding-bottom: 10px;">

              <el-button @click="cancelRouter">取消</el-button>
              <el-button type="primary" @click="buyNow">下订单</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!--<div class="shoppingBottom">
      <div class="width1024">
        <div style="float: right;width: 28%;">
          <div style="border: solid #eeeeee 1px;margin-top: 5px;padding-left: 5px;">
            <div style="font-size: 14px;font-weight: bolder;">
              收货地址：
            </div>
            <div>
              {{userInfo.province}}&nbsp;{{userInfo.city}}&nbsp;{{userInfo.address}}
            </div>
            <div>
            <span style="font-size: 14px;font-weight: bolder;">
              收货人：
            </span>
              <span>
              {{userInfo.name}}
            </span>
              <span style="margin-left: 10px;">
              {{userInfo.phone}}
            </span>
            </div>
          </div>
          <div style="text-align: right;margin-right: 20px;">
            合计（含运费）：
            <span style="color:red;font-size: 19px;font-weight: bolder;">￥{{allPrice| DoubleNumber}}</span>
            &lt;!&ndash;</span>&ndash;&gt;
          </div>
          <div style="text-align: right; ">
            <el-button @click="cancelRouter">取消</el-button>
            <el-button type="danger" @click="buyNow">提交订单</el-button>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "beforeUserOrder",
    data() {
      return {
        beforeOrderLoading: false,//交易详情loading
        beforeOrderData: this.$route.query.checkGoodsInfo,
        userInfo: {
          id: '',
          name: '',//真实姓名
          phone: '',//电话
          province: '',//省
          city: '',//市
          address: '',//具体地址
        },
      }
    },
    computed: {
      //所有订单总价
      allPrice: function () {
        let AllPrice = 0;
        let post = 0;
        let price = 0;
        for (let i = 0; i < this.beforeOrderData.length; i++) {
          if (this.beforeOrderData[i].postflag == 0) {//不包邮
            post = this.beforeOrderData[i].postprice;
          } else {
            post = 0
          }
          if (this.beforeOrderData[i].spellflag == 1) {//拼团
            price = this.beforeOrderData[i].spellprice;
          } else {
            price = this.beforeOrderData[i].price;
          }
          this.beforeOrderData[i].buyprice = price;
          this.beforeOrderData[i].allprice = price * this.beforeOrderData[i].buynum + post;
          AllPrice += price * this.beforeOrderData[i].buynum + post;
        }
        return AllPrice;
      },
    },
    mounted() {
      this.getGoodsInfo();
    },
    methods: {
      //提交订单
      buyNow() {
        console.log('提交订单信息----', this.beforeOrderData);
        let params = {
          gId: this.beforeOrderData[0].gId,
          gName: this.beforeOrderData[0].gName,//商品名称
          imgUrl: this.beforeOrderData[0].imgUrl,//主图
          uId: sessionStorage.getItem("userId"),//用户id
          oPrice: this.beforeOrderData[0].oPrice,//单价
          oTypeName: this.beforeOrderData[0].oTypeName,
          countPrice: this.beforeOrderData[0].countPrice,//总价
          oNum: this.beforeOrderData[0].oNum,//购买数量
          getUName: this.userInfo.name,
          getUPhone: this.userInfo.phone,
          getUDdress: this.userInfo.address,

        };
        axios.post("/api/order/add", params).then(res => {
          console.log('是否添加成功：', res.data);
          if (this.beforeOrderData[0].shId != '') {
            let param = {
              id: this.beforeOrderData[0].shId
            };
            axios.post("/api/shoppingCar/del", param).then(res => {
              // console.log('删除购物车信息：', res.data);
            });
          }
          if (res.data != 0) {
            this.$message({
              showClose: true,
              message: '提交成功,请去订单中心支付！',
              type: 'success'
            });
            this.$router.push({
              path: '/userOrder',
            });
          }
        });
      },
      //获取收货人信息
      getGoodsInfo() {
        let params = {
          id: sessionStorage.getItem("userId"),
        };
        console.log('该用户收货人信息：', params);
        axios.post("/api/user/sel", params).then(res => {
          console.log('该用户收货人信息：', res.data);
          this.userInfo = res.data;
          // this.getInsertList();
        });
      },
      //取消，返回商品详情
      cancelRouter() {
        this.$router.go(-1);//返回上一层
      },
      //计算单个商品的单价*数量
      /* getInsertList() {
         for (let i = 0; i < this.beforeOrderData.length; i++) {
           // this.beforeOrderData[i].allprice = price * this.beforeOrderData[i].buynum + post;
           this.beforeOrderData[i].orderstatus = '01';
           this.beforeOrderData[i].userid = sessionStorage.getItem("userId");
           this.beforeOrderData[i].getname = this.userInfo.name;
           this.beforeOrderData[i].getphone = this.userInfo.phone;
           this.beforeOrderData[i].getprovince = this.userInfo.province;
           this.beforeOrderData[i].getcity = this.userInfo.city;
           this.beforeOrderData[i].getaddress = this.userInfo.address;
         }
       },*/
      /*littlePrice() {
        let post = 0;
        let price = 0;
        for (let i = 0; i < this.beforeOrderData.length; i++) {
          if (this.beforeOrderData[i].postflag == 0) {//不包邮
            post = this.beforeOrderData[i].postprice;
          } else {
            post = 0
          }
          if (this.beforeOrderData[i].spellflag == 1) {//拼团
            price = this.beforeOrderData[i].spellprice;
          } else {
            price = this.beforeOrderData[i].price;
          }
          this.beforeOrderData[i].allprice = price * this.beforeOrderData[i].buynum + post;
        }
      },*/
      //计算单个商品的单价*数量
      /* Aprice(item) {
         let price = 0;
         let minAllPrice = 0;
         if (item.spellflag == 1) {//拼团
           price = item.spellprice;
         } else {
           price = item.price;
         }
         minAllPrice = price * item.buynum;
         return minAllPrice;
       },*/
      //计算单个商品的小结（单价*数量+邮费）
      /*oneAllPrice(item) {
        let allprice = 0;
        let post = 0;
        if (item.postflag == 0) {//不包邮
          post = item.postprice;
        } else {
          post = 0
        }
        allprice = this.Aprice(item) + post;
        return allprice;
      },*/

    },
    filters: {
      DoubleNumber: function (data) {
        console.log('filters=----', data);
        if (data != undefined) {
          return data.toFixed(2);
        } else {
          return data;
        }
      }
    },
  }
</script>

<style scoped>
  #beforeUserOrder {
    /*background: #fff;*/
  }

  .shoppingBottom {
    background-color: #e5e5e5;
    width: 100%;
    /*padding-right: 8%;*/
    /*height: 130px;*/
    /*margin: 0 auto;*/
    position: fixed;
    bottom: 0;
    z-index: 2;
  }

  .little_money {
    color: red;
    font-size: 18px;
    font-weight: bolder;
  }
</style>
