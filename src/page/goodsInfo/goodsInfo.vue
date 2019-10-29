<template>
  <div id="goodsInfo">
    <div class="width1024">
      <div class="blockDiv blockDivTop" style="padding-bottom: 50px;">
        <div>
          <b class="levelTitlebar">
          </b>
          <b class="tiao2"></b>
          <span class="levelTitle2">商品详情</span>
        </div>
        <div class="line"></div>
        <div v-loading="InfoLoading">
          <el-row>
            <div class="marg_top10 marg_bot10" style="height: 300px;">
              <el-row>
                <el-col :span="10" style="padding-left: 40px;">
                  <div style="width: 300px;height: 300px;">
                    <img :src="goodsInfo.imgUrl"
                         style="width: 300px;height: 300px;">
                  </div>
                </el-col>
                <el-col :span="14">
                  <div class="marg_top10 marg_bot10">
                    <h1>
                      {{goodsInfo.gName}}
                    </h1>
                  </div>
                  <div class="marg_top10 marg_bot10">
                    <h3>
                      {{goodsInfo.gTitle}}
                    </h3>
                  </div>
                  <div class="marg_top10 marg_bot10">
                    <span>
                    价格：
                    <span style="color:red;font-size: 18px;font-weight: bolder;">￥{{goodsInfo.price}}</span>
                    </span>
                    <!-- <span v-if="goodsInfo.spellfig==0">
                     价格：
                     <span style="color:red;font-size: 18px;font-weight: bolder;">￥{{goodsInfo.price}}</span>
                     </span>
                     <span v-if="goodsInfo.spellfig==1">
                       <span style="color:red;font-size: 15px;font-weight: bolder;">折扣价：</span>
                       <span style="color:red;font-size: 19px;font-weight: bolder;">￥{{goodsInfo.spellprice}}</span>
                       <span style="color: #a8abb2;margin-left: 10px;"><s>原价：￥{{goodsInfo.price}}</s></span>
                     </span>-->
                  </div>
                  <div class="marg_top10 marg_bot10">
                    分类：{{goodsInfo.typeName}}
                    <!--<el-radio-group v-model="buyInfo.classifyname">
                      <el-radio v-for="goodsClassify in goodsInfo.goodsClassifyList" :label="goodsClassify.classifyname"
                                :key="goodsClassify.id" border size="medium">
                        {{goodsClassify.classifyname}}
                      </el-radio>
                    </el-radio-group>-->
                  </div>
                  <div class="marg_top10 marg_bot10">
                    购买数量:
                    <el-input-number v-model="buyInfo.purchaseNum" :min="1" :max="goodsInfo.gStock"
                                     size="medium"></el-input-number>
                    <span style="color: #797979;">
                    库存数量：{{goodsInfo.gStock}}
                  </span>
                  </div>
                  <!--<div v-if="goodsInfo.postFlag==0" class="marg_top10 marg_bot10">
                    邮费：￥{{goodsInfo.postprice}}
                  </div>-->
                  <!--<div class="marg_top10 marg_bot10">
                    销量:
                    <span v-if="goodsInfo.sellnum==null|goodsInfo.sellnum==''">
                    0
                    </span>
                    <span v-else="goodsInfo.sellnum">
                    {{goodsInfo.sellnum}}
                </span>笔
                  </div>-->

                  <div class="marg_top10 marg_bot10" style=" margin-right: 20px;">
                    <el-button @click="insertShoppingCart">加入购物车</el-button>
                    <el-button @click="buyNow">立即购买</el-button>
                    <!--<el-button v-if="goodsInfo.spellfig==1" type="danger">立即拼团({{goodsInfo.spellnum}}人成团)</el-button>-->
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="marg_top10 marg_bot10">
              <div>
                <b class="levelTitlebar">
                </b>
                <b class="tiao2"></b>
                <span class="levelTitle2">详细信息</span>
              </div>
              <div class="line"></div>
            </div>
            <div style="width: 75%;margin-left: 20px;">
              <el-row>
                <el-col :span="8">
                  品牌：{{goodsInfo.brand}}
                </el-col>
                <el-col :span="8">
                  产地：{{goodsInfo.producearea}}
                </el-col>
                <el-col :span="8">
                  适用肤质：{{goodsInfo.fitskin}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  保质期：{{goodsInfo.shelflife}}
                </el-col>
                <el-col :span="8">
                  规格：{{goodsInfo.goodsnorms}}
                </el-col>
                <el-col :span="8">
                  适用人群：{{goodsInfo.fitcrowd}}
                </el-col>
              </el-row>
            </div>

          </el-row>
        </div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="LogindialogVisible" width="30%">
      <span>请先登录再进行查看</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="LogindialogVisible = false">取 消</el-button>
          <el-button type="primary" @click.native="toLogin">登 录</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>

  import axios from 'axios';

  export default {
    name: "goodsInfo",
    data() {
      return {
        LogindialogVisible: false,//登录
        InfoLoading: false,//
        goodsInfo: {
          id: '',//商品id
          shopid: sessionStorage.getItem("userId"),
          goodsname: '',//商品名称
          title: '',//标题
          mainimgurl: require("E:/redLipShopUIandSSM/redLipImg/innisfree/ru.jpg"),//主图
          price: '',//单价
          spellfig: '',//是否拼团
          spellprice: '',//拼团价格
          spellnum: '',//拼团人数
          goodsClassifyList: [
            {
              id: '1',
              classifyname: '选项1',
              goodsid: '111',
            },
            {
              id: '2',
              classifyname: '选项2',
              goodsid: '222',
            },
            {
              id: '3',
              classifyname: '选项3',
              goodsid: '333',
            },
          ],//商品分类
          brand: '',//品牌名称
          effect: '',//商品功效
          stock: 10,//商品库存
          sellnum: '',//销量
          typename: '',//所属分类
          producearea: '',//产地
          goodsnorms: '',//商品规格
          shelflife: '',//保质期
          fitskin: '',//适用肤质
          fitcrowd: '',//适用人群
          postFlag: '',//是否包邮
          postprice: '',//邮费
        },
        buyInfo: {
          gId: '',//商品id
          uId: sessionStorage.getItem("userId"),//用户id
          /*goodsname: '',//商品名称
          price: '',//单价
          spellprice: '',//拼团价格
          spellfig: '',//拼团标识
          classifyname: '',//选中的商品属性*/
          purchaseNum: '',//购买数量
        },
      }
    }, mounted() {
      this.goodDetaile();
    },
    methods: {
      //查看商品详情
      goodDetaile() {
        let id = this.$route.query.id;
        console.log('查看商品详情', id);
        this.InfoLoading = true;
        let params = {
          gId: id,
        };
        axios.post("/api/goods/sel_goods", params).then(res => {
          console.log(id, '商品所有详细信息-', res.data);
          this.buyInfo.buynum = 1;
          this.InfoLoading = false;

          this.goodsInfo = res.data;
          /*{
            id: res.data.id,//商品id
            shopid: res.data.shopid,
            goodsname: res.data.goodsname,//商品名称
            title: res.data.title,//标题
            mainimgurl: res.data.mainimgurl,//主图
            price: res.data.price,//单价
            spellfig: res.data.spellfig,//是否拼团
            spellprice: res.data.spellprice,//拼团价格
            spellnum: res.data.spellnum,//拼团人数
            goodsClassifyList: res.data.goodsClassifyList,//商品分类
            sellnum: res.data.sellnum,//销量
            brand: res.data.brand,//品牌名称
            effect: res.data.effect,//商品功效
            stock: res.data.stock,//商品库存
            typename: res.data.typename,//所属分类
            producearea: res.data.producearea,//产地
            goodsnorms: res.data.goodsnorms,//商品规格
            shelflife: res.data.shelflife,//保质期
            fitskin: res.data.fitskin,//适用肤质
            fitcrowd: res.data.fitcrowd,//适用人群
            postflag: res.data.postflag,//是否包邮
            postprice: res.data.postprice,//邮费
          }*/
          ;
        })
      },
      //加入购物车
      insertShoppingCart() {

        if (sessionStorage.getItem("userId") == null | sessionStorage.getItem("userId") == undefined) {
          this.LogindialogVisible = true;
        } else {
          /*if (this.buyInfo.classifyname == '') {
            this.$message.error('请选择商品分类！');
          } else {*/
          this.buyInfo.gId = this.goodsInfo.gId;
          this.buyInfo.id = this.goodsInfo.id;
          console.log('加入购物车', this.buyInfo);
          axios.post("/api/shoppingCar/add", this.buyInfo).then(res => {
            console.log('加入购物车信息', res.data);
            if (res.data == 1) {
              this.buyInfo.classifyname = '';
              this.$message({
                showClose: true,
                message: '加入购物车成功！',
                type: 'success'
              });
            } else {
              this.$message.error('抱歉！加入购物车失败！');
            }
          });
        }

      },
      //立即购买
      buyNow() {
        console.log('立即购买', this.goodsInfo.id);
        if (sessionStorage.getItem("userId") == null | sessionStorage.getItem("userId") == undefined) {
          this.LogindialogVisible = true;
        } else {
          /*if (this.buyInfo.classifyname == '') {
            this.$message.error('请选择商品分类！');
          } else {
            let buyprice = 0;
            if (this.goodsInfo.spellfig == 1) {
              buyprice = this.goodsInfo.spellprice;
            } else {
              buyprice = this.goodsInfo.price
            }*/
          let params = [{
            shId: '',
            gId: this.goodsInfo.gId,
            sId: this.goodsInfo.sId,
            gName: this.goodsInfo.gName,//商品名称
            imgUrl: this.goodsInfo.imgUrl,//主图
            uId: sessionStorage.getItem("userId"),//用户id
            oPrice: this.goodsInfo.price,//单价
            oTypeName: this.goodsInfo.typeName,//选中的商品属性
            oNum: this.buyInfo.purchaseNum,//购买数量
            countPrice: this.buyInfo.purchaseNum * this.goodsInfo.price,//总价
          }];
          this.$router.push({
            path: '/beforeUserOrder',
            query: {
              checkGoodsInfo: params,
            }
          });
        }

      },
      //登录
      toLogin() {
        this.$router.push({
          path: '/Login'
        });
      },
    }
    ,

  }
</script>

<style scoped>
  #goodsInfo {
    background: #fff;
  }
</style>
