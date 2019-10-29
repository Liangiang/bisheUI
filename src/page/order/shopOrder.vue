<template>
  <div id="shopOrder">
    <div class="width1024">
      <div class="blockDiv blockDivTop" style="padding-bottom: 50px;">
        <div>
          <div class="title_box">
            <span class="title_span">管</span>
            <span class="levelTitle2">订单管理中心</span>
          </div>
        </div>
        <div class="line"></div>

        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="userOrderData"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            label="商品信息"
            fixed
          >
            <template slot-scope="scope">
              <div style="display: inline-flex">
                <img :src="scope.row.imgUrl" style="width: 100px;height: 100px;"/>
                <div style="padding-left: 10px;">
                  <span>{{scope.row.gName}}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="oPrice"
            label="单价"
            width="120">
            <template slot-scope="scope">
              <h3 style="color:red;">￥{{scope.row.oPrice}}</h3>
            </template>
          </el-table-column>
          <el-table-column
            prop="oNum"
            label="购买数量"
            width="100"
            show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.oNum}}
            </template>
          </el-table-column>

          <el-table-column
            prop="countPrice"
            label="共计"
            width="120"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <h3 style="color:red;">
                ￥{{scope.row.countPrice}}
              </h3>
            </template>
          </el-table-column>

          <el-table-column
            prop="address"
            label="操作"
            fixed="right"
            width="220"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="SeeOne(scope.row.oId)"
                type="text"
                size="small">
                查看
              </el-button>
              <!--<el-popover
                v-if="scope.row.oStatus==5"
                placement="top-start"
                title="退货理由"
                width="200"
                trigger="hover"
                :content="scope.row.uRecause">
                <el-button
                  slot="reference"
                  type="text"
                  size="small"
                  @click.native.prevent="SeeOne(scope.row.oId)">
                  查看退货原因
                </el-button>
              </el-popover>-->
              <el-button
                v-if="scope.row.oStatus==0"
                @click.native.prevent="removeOrder(scope.row.oId)"
                type="text"
                size="small">
                取消交易
              </el-button>
              <el-button
                v-if="scope.row.oStatus==1"
                @click.native.prevent="sendGood(scope.row.oId)"
                type="text"
                size="small">
                发货
              </el-button>

              <!--<el-button
                v-if="scope.row.oStatus==5"
                @click.native.prevent="agreeReturnGoods(scope.row.oId)"
                type="text"
                size="small">
                同意
              </el-button>
              <el-button
                v-if="scope.row.oStatus==5"
                @click.native.prevent="openShopReturnGoodsCause(scope.row.oId)"
                type="text"
                size="small">
                拒绝
              </el-button>-->

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

      <el-dialog
        title="订单详情"
        :visible.sync="dialogVisible"
        width="50%">
        <div class="width100 order_table_c">
          <table class="width100"
                 v-loading="detialLoading"
                 style="border:0;cellspacing:0; cellpadding:0;">
            <tr class="width100">
              <td colspan="3">
                <el-row>
                  <el-col :span="14">
                    订单编号：
                    {{orderInfo.oId}}
                  </el-col>
                  <el-col :span="10">
                    下单时间：
                    {{orderInfo.oTime}}
                  </el-col>
                </el-row>
              </td>
            </tr>
            <tr class="width100">
              <td colspan="3">
                商品信息：
              </td>
            </tr>
            <tr class="width100">
              <td colspan="3">
                <el-row :gutter="20">
                  <el-col :span="5">
                    <img :src="orderInfo.imgUrl" style="width: 50px;height: 50px;margin: 0 auto;"/>
                  </el-col>
                  <el-col :span="18">
                    {{orderInfo.gName}}
                  </el-col>
                  <!--<el-col :span="8">
                    规格：{{orderInfo.classifyname}}
                  </el-col>-->
                </el-row>
              </td>
            </tr>
            <tr class="width100">
              <td style="width:30%;">
                单价：￥{{orderInfo.oPrice}}
              </td>
              <td style="width:30%;">
                购买数量：{{orderInfo.oNum}}
              </td>
              <td style="width:30%;">
                实付金额：
                <span style="">￥{{orderInfo.countPrice}}</span>
              </td>
            </tr>
            <!--<tr class="width100">
              <td colspan="3">
                是否购买的：
                {{orderInfo.spellflag}}
              </td>
            </tr>-->
            <tr class="width100">
              <td colspan="3">
                收货人信息：
              </td>
            </tr>
            <tr class="width100">
              <td colspan="3">
                <el-row :gutter="20">
                  <el-col :span="8">
                    姓名：
                    {{orderInfo.getUName}}
                  </el-col>
                  <el-col :span="8">
                    电话：
                    {{orderInfo.getUPhone}}
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    地址：{{orderInfo.getUDdress}}
                  </el-col>
                </el-row>
              </td>
            </tr>
            <tr class="width100">
              <td style="width: 40%;">
                发货时间：
                {{orderInfo.sSendIme}}
              </td>
              <td colspan="2">
                收货时间：
                {{orderInfo.uGetTime}}
              </td>
            </tr>
          </table>
          <!--<el-row :gutter="20" class="border_top_bot">
            <el-col :span="5">
              <img :src="orderInfo.img" style="width: 50px;height: 50px;margin: 0 auto;"/>
            </el-col>
            <el-col :span="11">
              {{orderInfo.title}}
            </el-col>
            <el-col :span="8">
              {{orderInfo.classic}}
            </el-col>
          </el-row>
          <el-row :gutter="20" class="border_top_bot width100">
            <el-col :span="8">
              单价：￥{{orderInfo.price}}
            </el-col>
            <el-col :span="8">
              购买数量：{{orderInfo.buyNumber}}
            </el-col>
            <el-col :span="8">
              实付金额：
              <span style="">￥{{orderInfo.realPrice}}</span>
            </el-col>

          </el-row>
          <div class="border_top_bot width100">
            是否打折商品：
            {{orderInfo.spellFlag}}
          </div>
          <div class="border_top_bot width100">收货人信息：</div>
          <div class="border_top_bot width100">
            <el-row :gutter="20">
              <el-col :span="8">
                姓名：
                {{orderInfo.getName}}
              </el-col>
              <el-col :span="8">
                电话：
                {{orderInfo.getPhone}}
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                地址：
                {{orderInfo.getProvince}}{{orderInfo.getCity}}{{orderInfo.getAddress}}
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="20">
            <el-col :span="8">
              发货时间：
              {{orderInfo.sendTime}}
            </el-col>
            <el-col :span="8">
              收货时间：
              {{orderInfo.getTime}}
            </el-col>
          </el-row>-->
        </div>

      </el-dialog>
      <!--店铺拒绝退货dialog-->
      <el-dialog
        title="拒绝退货原因"
        :visible.sync="shopReturnCausedialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-input v-model="shopReturnGoodsInfo.shopreturnseason" placeholder="请输入拒绝退货理由"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelShopReturnCause">取 消</el-button>
          <el-button type="primary" @click="refuseReturnGoods">确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "shopOrder",
    data() {
      return {
        loading: false,
        detialLoading: false,//订单详情loading
        activeIndex: 'tabstyle2',//选中那个标签
        orderByTip: 0,
        countNum: 0,//一共选中了几件商品
        allPrice: 2000,//选中的商品总价
        currentPage: 1,//分页----当前页数
        dialogVisible: false,//控制详情页是否显示的
        pageSize: 10,//分页----每页显示多少条
        totalCount: 100,//分页----总条目数
        shopReturnCausedialogVisible: false,//退货理由开启显示
        shopReturnGoodsInfo: {
          id: '',
          shopreturnseason: '',//退货理由
        },
        orderInfo: {//订单信息
          id: '订单编号',//订单编号
          img: require("E:/redLipShopUIandSSM/redLipImg/innisfree/ru.jpg"),
          title: '1111111111111111111111111111111111',//商品标题
          classic: '分类',
          price: 120,
          buyNumber: 1,//购买数量
          realPrice: 240,//实付金额
          spellFlag: '1',//是否打折扣
          getName: '收货人姓名',//收货人姓名
          getPhone: '13842056038',//收货人电话
          getProvince: '省',//收货地址（省）
          getCity: '市',//收货地址（市）
          getAddress: '省',//收货地址（详细）
          sendTime: '2019-02-14',//发货时间
          getTime: '2019-02-15',//收货时间
          orderTime: '2018-02-14',//下单时间

        },
        userOrderData: [],
      }
    },
    mounted() {
      this.getUerOrder();
    },
    methods: {
      //获取用户订单列表
      getUerOrder() {
        this.loading = true;
        this.currentPage = 1;//分页----当前页数
        let params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          totalCount: this.totalCount,
          sId: sessionStorage.getItem("userId"),
        };
        axios.post("/api/order/selAll", params).then(res => {
          this.loading = false;
          this.userOrderData = res.data.list;
          this.pageSize = res.data.pageSize;
          this.currentPage = res.data.pageNum;
          this.totalCount = res.data.total;
          console.log('该店铺的所有订单---shop', res.data.list);
        });
      },
      //发货
      sendGood(id) {
        console.log('发货第几个：', id);
        let params = {
          oId: id,
          oStatus: 3
        };
        axios.post("/api/order/up", params).then(res => {
          console.log('发货成功---', res.data);
          this.$message({
            showClose: true,
            message: '发货成功',
            type: 'success'
          });
          this.getUerOrder();
        });
      },
      //取消交易
      removeOrder(id) {
        console.log('取消交易第几个：', id);
        let params = {
          oId: id,
          oStatus: 2
        };
        axios.post("/api/order/up", params).then(res => {
          console.log('取消交易成功', res.data);
          this.$message({
            showClose: true,
            message: '取消交易成功',
            type: 'success'
          });
          this.getUerOrder();
        });
      },
      //查看订单详情
      SeeOne(id) {
        console.log('查看项目编号', id);
        this.dialogVisible = true;
        this.detialLoading = true;
        let params = {
          oId: id,
        };
        axios.post("/api/order/selA", params).then(res => {
          console.log('订单详细信息：', res.data);
          this.orderInfo = res.data;
          this.detialLoading = false;
        });
      },
      //同意退货
      agreeReturnGoods(id) {
        console.log('同意编号', id);
        let params = {
          oId: id,
          oStatus: 6
        };
        axios.post("/api/order/up", params).then(res => {
          console.log('同意退货：', res.data);
          this.$message({
            showClose: true,
            message: '退货成功',
            type: 'success'
          });
          this.getUerOrder();
        });
      },
      //拒绝退货
      refuseReturnGoods() {
        console.log('拒绝退货id', this.shopReturnGoodsInfo);

        let params = {
          oId: this.shopReturnGoodsInfo.id,
          oStatus: 7,
          sReseason: this.shopReturnGoodsInfo.shopreturnseason
        };
        axios.post("/api/order/up", params).then(res => {
          console.log('同意退货：', res.data);
          this.$message({
            showClose: true,
            message: '退货成功',
            type: 'success'
          });
          this.cancelShopReturnCause();//清空拒绝退货原因
          this.getUerOrder();
        });
      },
      //打开退货原因的dialoag框
      openShopReturnGoodsCause(id) {
        this.shopReturnCausedialogVisible = true;
        this.shopReturnGoodsInfo.id = id;
      },
      //取消拒绝退货
      cancelShopReturnCause() {
        this.shopReturnCausedialogVisible = false;
        this.shopReturnGoodsInfo.id = '';
        this.shopReturnGoodsInfo.shopreturnseason = '';
      },
      //每页多少条改变
      handleSizeChange(val) {
        this.pageSize = val;
        console.log(`每页 ${val} 条`);
        this.getUerOrder();
      },
      //当前页数改变
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
        this.getUerOrder();
      },
      //关闭申请退货dialog时的
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.shopReturnGoodsInfo.id = '';//清空id
            this.shopReturnGoodsInfo.shopreturnseason = '';//清空店铺拒绝退货原因
          }).catch(_ => {

        });
      },

    },
  }
</script>

<style scoped>
  #shopOrder {
    /*background-color: #fff;*/
  }

  .width100 {
    width: 100%;
  }

  .order_table_c table {
    border: #f4f4f4 1.5px solid;
    border-collapse: collapse;
    /*border-spacing:10px 10px;*/
  }

  .order_table_c table td {
    border: #f4f4f4 1.5px solid;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 20px;
    /*border-left: 1px solid #ff6666;
    border-top: 1px solid #ff6666;
    border: 1px solid #f4f4f4;*/

  }

  .tabstyle1, .tabstyle2, .tabstyle3, .tabstyle4, .tabstyle5, .tabstyle6, .tabstyle7 {
    border: 0;
    border-radius: 4px 4px 0px 0px;
    width: 100%;
    text-align: center;
    background-color: #fff;
    border-bottom: 1px solid #FF6666;
    cursor: pointer;
  }

  .tabstyle1:hover,
  .tabstyle2:hover,
  .tabstyle3:hover,
  .tabstyle4:hover,
  .tabstyle5:hover,
  .tabstyle6:hover,
  .tabstyle7:hover {
    border-bottom: 0px;
    background-color: #fff;
    border-left: 1px solid #FF6666;
    border-top: 1px solid #FF6666;
    border-right: 1px solid #FF6666;
    color: #FF6666;

  }

  .active {
    border-bottom: 0px;
    background-color: #fff;
    border-left: 1px solid #FF6666;
    border-top: 1px solid #FF6666;
    border-right: 1px solid #FF6666;
    color: #FF6666;
  }
</style>
