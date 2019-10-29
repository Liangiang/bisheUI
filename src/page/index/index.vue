<template>
  <div id="index">
    <div>
      <div class="block " style="background: white;">
        <!--<span class="demonstration">默认 Hover 指示器触发</span>-->
        <el-carousel height="400px" type="card">
          <el-carousel-item v-for="item in homeRollImg" :key="item.herf">
            <img :src="item.herf"
                 style="width:100%;height:400px;"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="width1024">
        <div class="blockDiv blockDivTop">
          <div class="title_box">

            <span class="title_span">爆</span>
            <span class="levelTitle2">好物推荐</span>
          </div>
          <div class="line"></div>
          <el-row>
            <el-col :span="24">
              <el-row :gutter="5" v-loading="loading">
                <el-col :span="6" v-for="item in goodsCard" :key="item.gId">
                  <el-card
                    class="goods-card"
                    shadow="hover"
                    :body-style="{ padding: '0px' }">
                    <img :src="item.imgUrl"
                         @click="goodDetaile(item.gId)"
                         class="image">
                    <div @click="goodDetaile(item.gId)" class="good_card_describe">
                      <div class="cardTitleFont">
                        {{item.gName}}
                      </div>
                      <span class="cardMoney">￥{{item.price}}</span>
                      <!--<span v-if="item.spellfig==0" class="cardMoney">￥{{item.price}}</span>
                      <span v-if="item.spellfig==1" class="cardMoney">
                          ￥{{item.spellprice}}
                          <span style="color: #a8abb2;font-size: 15px;">
                            <s>￥{{item.price}}</s>
                          </span>
                        </span>
                      <div class="cardSellNum">销量{{item.sellnum|sellnum}}笔</div>-->
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="24">
              <!--分页插件-->
              <el-pagination
                style="float:right;margin-top: 10px;"
                @current-change="handleCurrentChange"

                layout="total, sizes, prev, pager, next, jumper"
                :current-page="currentPage"
                :total="totalCount"
                :page-size="pageSize"
              >
              </el-pagination>
            </el-col>
          </el-row>
        </div>
        <div class="blockDiv">
          <div class="title_box">

            <span class="title_span">文</span>
            <span class="levelTitle2">时令好文</span>
          </div>
          <div class="line"></div>
          <div style="padding: 20px;">
            <showNews :mId="mId" :flag="0"/>
          </div>
        </div>
        <!--<userSamplingInspection/>-->
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import showNews from '@/page/news/showNews'

  export default {
    name: 'index',
    components: {
      showNews
    },
    data() {
      return {
        mId: '',
        allClassic: true,
        loading: false,
        key: '',//主页key
        currentPage: 1,//分页----当前页数
        totalCount: 100,//分页----总条目数
        pageSize: 10,//分页----一页一共条目数
        //LogindialogVisible: false,//登录
        //GoodsInfoDialogVisible: false,//商品详情对话框
        //dialogLoading: true,//对话框loading
        homeRollImg: [
          {
            herf: require("@/assets/img/homeRollImg1.jpg"),
            aHerf: '01'
          },
          {
            herf: require("@/assets/img/homeRollImg2.jpg"),
            aHerf: '02'
          },
          {
            herf: require("@/assets/img/homeRollImg3.jpg"),
            aHerf: '03'
          },
          {
            herf: require("@/assets/img/homeRollImg4.jpg"),
            aHerf: '04'
          },
          {
            herf: require("@/assets/img/homeRollImg5.jpg"),
            aHerf: '05'
          },
          {
            herf: require("@/assets/img/homeRollImg6.jpg"),
            aHerf: '06'
          },
          {
            herf: require("@/assets/img/homeRollImg7.jpg"),
            aHerf: '07'
          },
        ],//首页轮播图
        goodsCard: [],//
        /* goodsInfo: {
           id: '',//商品id
           shopid: sessionStorage.getItem("userId"),
           goodsname: '',//商品名称
           title: '',//标题
           mainimgurl: require("E:/redLipShopUIandSSM/redLipImg/innisfree/ru.jpg"),//主图
           price: '',//单价
           spellFig: '',//是否拼团
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
           goodsid: '',//商品id
           userid: sessionStorage.getItem("userId"),//用户id
           goodsname: '',//商品名称
           price: '',//单价
           spellprice: '',//拼团价格
           spellfig: '',//拼团标识
           classifyname: '',//选中的商品属性
           buynum: '',//购买数量
         },*/
      }
    },
    computed: {},
    mounted() {
      this.handleSelect();
    },
    methods: {
      //首页查询分类内的商品
      handleSelect() {
        this.loading = true;
        var params = {
          downFlag: 1,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        };
        axios.post("/api/goods/selGoodsBy", params).then(res => {
          this.loading = false;
          // console.log('分类', res.data);
          this.goodsCard = res.data.list;
          this.currentPage = res.data.pageNum;
          this.totalCount = res.data.total;
          console.log('首页商品信息', this.goodsCard)

        });
        // console.log(key, keyPath);
      },
      //查看商品详情
      goodDetaile(id) {
        console.log('query传入id：', id);
        this.$router.push({
          path: '/goodsInfo',
          query: {
            id: id,
          }
        });
      },
      //当前页数改变
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
        this.handleSelect(this.key, this.key);
      },
      /*
      goodDetaile(id) {
        console.log('查看商品详情', id);
        this.GoodsInfoDialogVisible = true;
        this.dialogLoading = true;
        let params = {
          id: id,
        };
        axios.post("/api/Shop/select_goods", params).then(res => {
          console.log(id, '商品所有信息', res.data);
          this.buyInfo.buynum = 1;
          this.dialogLoading = false;
          let postflag = false;//是否包邮
          let postprice = 0;//邮费
          if (res.data.postflag == 1) {
            postflag = true;
          } else {
            postflag = false;
            postprice = res.data.postprice;
          }
          this.goodsInfo = {
            id: res.data.id,//商品id
            shopid: res.data.shopid,
            goodsname: res.data.goodsname,//商品名称
            title: res.data.title,//标题
            mainimgurl: require("E:/redLipShopUIandSSM/redLipImg/innisfree/ru.jpg"),//主图
            price: res.data.price,//单价
            spellFig: res.data.spellFig,//是否拼团
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
            postFlag: postflag,//是否包邮
            postprice: postprice,//邮费
          };
        })
      },
      //加入购物车
      insertShoppingCart() {
        console.log('加入购物车', this.buyInfo);
        if (sessionStorage.getItem("userId") == null | sessionStorage.getItem("userId") == undefined) {
          this.LogindialogVisible = true;
        } else {
          let params = {
            userid: sessionStorage.getItem("userId"),
          }
          axios.post("/api/User/select_all_shoppingCarNum", params).then(res => {
            console.log('该用户购物车一共有多少个', res.data);
            if (res.data >= 120) {
              this.$message.error('抱歉！您的购物车里的宝贝已经达到极限120件！请前往删减！');
            } else {
              this.buyInfo.goodsid = this.goodsInfo.id;
              this.buyInfo.goodsname = this.goodsInfo.goodsname;
              this.buyInfo.price = this.goodsInfo.price;
              axios.post("/api/User/insert_shoppingCar", this.buyInfo).then(res => {
                console.log('加入购物车信息', res.data);
                if (res.data == 1) {
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
          });


        }
      },
      //立即购买
      buyNow() {
        console.log('立即购买', this.goodsInfo.id)
      },
      //拼团购买

      //登录
      toLogin() {
        this.$router.push({
          path: '/Login'
        });
      },*/
    },

    watch: {},
    filters: {
      sellnum: function (data) {
        if (data == null | data == '') {
          return 0;
        } else {
          return data;
        }
      },
    },
  }
</script>

<style scoped>
  /**/
  .el-menu--horizontal {
    border-bottom: 0px;
    /*padding-left: 5%;*/
    width: 1220px;
    margin: 0 auto;
  }

  .good_card_describe {
    padding-left: 10px;
    padding-right: 10px;
    height: 65px;
    cursor: pointer;
  }

  .cardTitleFont :hover {
    color: #FF6666;
  }

  /*.align-center {
   text-align: center;
 }

 .goods-card {
   !*width: 100%;*!
   height: 350px;
   margin-top: 5px;
   !*margin-bottom: 5px;
    background-color: #ebb563;*!
 }

 .width1024 {
   width: 90%;
   margin: 0 auto;
   !*background-color: red;*!
 }

 .tiao1 {
   height: 20px;
   width: 15px;
   background-color: #FF6666;
 }

 .image {
   width: 100%;
   height: 250px;
 }

 .cardMoney {
   font-size: 15px;
   color: red;
   font-weight: bold;
   float: left;
 }

 .cardTitleFont {
   font-size: 14px;
 }

 .cardSellNum {
   float: right;
 }

 .levelTitle2 {
   margin-left: 10px;
   font-size: 16px;
   font-family: "PingFang SC";
   font-weight: bolder;
 }

 .levelTitlebar {
   position: relative;
   background-color: #FF6666;
   padding-left: 10px;
   margin-top: 5px;
   line-height: 48px;
   font-size: 20px;
   margin-left: 5px;
 }

 .blockDiv {
   background-color: #ffffff;
   margin-top: 5px;
   margin-bottom: 5px;
   padding-bottom: 5px;
 }
 .blockDivTop{
   margin-top: 10px;
 }*/
  /* .el-carousel__item h3 {
     color: #475669;
     font-size: 18px;
     opacity: 0.75;
     line-height: 300px;
     margin: 0;
   }

   .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
   }

   .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
   }*/
</style>
