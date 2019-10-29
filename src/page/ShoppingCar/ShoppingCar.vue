<template xmlns:el-col="http://www.w3.org/1999/html">
  <div id="ShoppingCar">
    <div class="width1024">

      <div class="blockDiv blockDivTop" style="padding-bottom: 50px;">
        <div class="title_box">
          <span class="title_span">购</span>
          <span class="levelTitle2">我的购物车</span>
        </div>
        <div class="line"></div>
        <el-table
          v-loading="shoppingCarLoading"
          ref="multipleTable"
          :data="shoppingCartData"
          tooltip-effect="dark"
          style="width: 100%">
          <!--<el-table-column
            type="selection"
            width="55">
          </el-table-column>-->
          <el-table-column
            label="商品信息">
            <template slot-scope="scope">
              <div style="display: inline-flex;">
                <div style="margin-right:10px;">
                  <img :src="scope.row.imgUrl" style="width: 100px;height: 100px;"
                       @click="DetaileGoodId(scope.row.gId)"/>
                </div>
                <div>
                  <el-row style="width: 70%;">
                    <el-col :span="24">
                      <span>{{scope.row.gName}}</span>
                    </el-col>
                    <el-col :span="24">
                      <span
                        style="padding: 2px 5px;background:orangered; color:white;border-radius: 5px;">{{scope.row.typeName}}</span>
                      <!--<el-select v-model="scope.row.classifyname" placeholder="请选择" @change="classifyChange(scope.row)">
                        <el-option
                          v-for="item in scope.row.goodsClassifyList"
                          :key="item.id"
                          :label="item.classifyname"
                          :value="item.classifyname">
                        </el-option>
                      </el-select>-->
                      <!--<span>{{scope.row.classifyname}}</span>-->
                    </el-col>
                  </el-row>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价"
            width="140">
            <template slot-scope="scope">
              <span> <h3 style="color:red;">￥{{scope.row.price}}</h3></span>
              <!--<span v-if="scope.row.spellfig==0"> <h3 style="color:red;">￥{{scope.row.price}}</h3></span>-->
              <!--<span v-if="scope.row.spellfig==1">
                <h3 style="color:red;">￥{{scope.row.spellprice}}</h3>
                 <span style="color: #a8abb2;margin-left: 10px;"><s>原价：￥{{scope.row.price}}</s></span>
              </span>-->
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="数量"
            width="160"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.purchaseNum"
                @change="byNumChange(scope.row)"
                :min="1"
                :max="scope.row.gStock"
                size="mini"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            prop="allOnePrice"
            label="金额"
            width="120"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <h3 style="color:red;">
                ￥{{allOnePrice(scope.row) | DoubleNumber}}
              </h3>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            width="120"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button
                @click="deleteGoods(scope.row)"
                type="text"
                size="small">
                删除
              </el-button>
              <el-button
                @click="buyAGoods(scope.row)"
                type="text"
                size="small">
                付款
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页插件-->
        <el-pagination
          style="float:right;margin-top: 10px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="totalCount"
        >
        </el-pagination>
      </div>

    </div>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "ShoppingCar",
    data() {
      return {
        shoppingCarLoading: false,
        multipleSelection: [],//表格选中的！
        countNum: 0,//一共选中了几件商品
        allPrice: 2000,//选中的商品总价
        currentPage: 1,//分页----当前页数
        pageSize: 10,//分页----每页显示多少条
        totalCount: 100,//分页----总条目数
        shoppingCartData: [],
      }
    },
    computed: {
      //计算选中商品的价格
      /* checkAllPrice: function () {
         let checkAllPrice = 0;
         if (this.multipleSelection.length > 0) {
           for (var i = 0; i < this.multipleSelection.length; i++) {
             console.log('单价', this.multipleSelection.price);
             let buyprice = 0;
             if (this.multipleSelection[i].spellfig == 0) {
               buyprice = this.multipleSelection[i].price;
             } else if (this.multipleSelection[i].spellfig == 1) {
               buyprice = this.multipleSelection[i].spellprice;
             }
             checkAllPrice += buyprice * this.multipleSelection[i].buynum;
           }
         }
         return checkAllPrice
       },*/
    },
    mounted() {
      this.getShoppingCartList();
      /*this.$nextTick(function () {
        this.checkAllPrice;
      })*/
    },
    methods: {
      //获取表格内容
      getShoppingCartList() {
        // console.log("获取表格内容");
        this.shoppingCarLoading = true;
        let params = {
          uId: sessionStorage.getItem("userId"),
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        };
        axios.post("/api/shoppingCar/selAll", params).then(res => {
          console.log('所有购物车信息', res.data);
          this.shoppingCarLoading = false;
          this.currentPage = res.data.pageNum;
          this.totalCount = res.data.total;
          this.shoppingCartData = res.data.list;
        });
      },
      //表格选中内容
      handleSelectionChange(val) {
        console.log('选中内容！', val);
        this.multipleSelection = val;
      },
      //删除单条
      deleteGoods(row) {
        console.log('删除！', row);
        let params = {
          id: row.id,
        };
        axios.post("/api/shoppingCar/del", params).then(res => {
          if (res.data == 1) {
            this.$message({
              showClose: true,
              message: '恭喜你！删除成功！',
              type: 'success'
            });
            this.getShoppingCartList();
          } else {
            this.$message.error("抱歉！删除失败！请重新操作！")
          }
        });
      },
      //结算当前选中的商品
      buyAGoods(row) {
        let params = [];
        params.push({
          gId: row.gId,
          shId: row.id,
          sId: row.sId,
          gName: row.gName,//商品名称
          imgUrl: row.imgUrl,//主图
          uId: sessionStorage.getItem("userId"),//用户id
          oPrice: row.price,//单价
          oTypeName: row.typeName,
          countPrice: row.price * row.purchaseNum,//总价
          oNum: row.purchaseNum,//购买数量
        });
        console.log("结算当前选中的商品!", params);
        this.$router.push({
          path: '/beforeUserOrder',
          query: {
            checkGoodsInfo: params,
          }
        });
      },
      //计算每个商品小计价格
      allOnePrice(row) {
        return row.price * row.purchaseNum;
      },
      //购买数量改变
      byNumChange(row) {
        console.log('购买数量改变那一条信息:', row);
        let params = {
          id: row.id,
          purchaseNum: row.purchaseNum,
        }
        axios.post("/api/shoppingCar/up", params).then(res => {
          console.log('更新购买数量成功！', row);
        });
      },
      //分类更改
      /* classifyChange(row) {
         console.log('分类改变那一条信息:', row);
         let params = {
           id: row.id,
           goodsid: row.goodsid,
           classifyname: row.classifyname,
           buynum: row.buynum,
           userid: sessionStorage.getItem("userId"),
         }
         axios.post("/api/User/updata_shoppingCar", params).then(res => {
           console.log('更新购买分类成功！', row);
           if (res.data == 1) {
             this.getShoppingCartList();
           }
         });
       },*/
      //查看单个商品详情
      DetaileGoodId(id) {
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
            mainimgurl: res.data.mainimgurl,//主图
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
      //每页多少条改变
      handleSizeChange(val) {
        this.pageSize = val;
        console.log(`每页 ${val} 条`);
      },
      //当前页数改变
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      },
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
  .shoppingPay {
    background-color: #e5e5e5;
    width: 1220px;
    height: 60px;
    margin: 0 auto;
    position: fixed;
    bottom: 0;
    z-index: 2;
  }

  .jiesuan_btn {
    height: 60px;
    width: 100%;
    /*right: 0;*/
    float: right;
    background-color: #FF6666;
    color: #ffffff;
    font-size: 18px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-weight: bold;
  }

  .all_goods_div_font {
    font-size: 2em;;
    color: red;
    font-weight: bolder;
    font-family: "Helvetica Neue";
  }

  .margin_right_20 {
    margin-right: 20px;
  }

  #ShoppingCart {
    background-color: #ffffff;
  }
</style>
