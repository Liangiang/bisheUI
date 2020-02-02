<template>
  <div id="userOrder">
    <div class="width1024">
      <div class="blockDiv blockDivTop" style="padding-bottom: 50px;">

        <div class="title_box">
          <span class="title_span">单</span>
          <span class="levelTitle2">我的订单</span>
        </div>
        <div class="line"></div>
        <el-row>
          <el-col :span="24" style="padding: 0 10px;">
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
                width="250"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="SeeOne(scope.row.oId)"
                    type="text"
                    size="small">
                    查看详情
                  </el-button>
                  <el-button
                    v-if="scope.row.oStatus==0"
                    @click.native.prevent="payOne(scope.row)"
                    type="text"
                    size="small">
                    付款
                  </el-button>
                  <el-button
                    v-if="scope.row.oStatus==0"
                    @click.native.prevent="removeOrder(scope.row.oId)"
                    type="text"
                    size="small">
                    关闭交易
                  </el-button>
                  <el-button
                    v-if="scope.row.oStatus==3"
                    @click.native.prevent="getGood(scope.row.oId)"
                    type="text"
                    size="small">
                    收货
                  </el-button>
                  <!--<el-button
                    v-if="scope.row.oStatus==4"
                    type="text"
                    size="small"
                    :disabled="true"
                  >
                    收货成功
                  </el-button>-->
                  <el-button
                    v-if="scope.row.oStatus==1"
                    type="text"
                    size="small"
                    :disabled="true"
                  >
                    待发货
                  </el-button>
                  <el-button
                    v-if="scope.row.oStatus==4"
                    @click.native.prevent="openReturnGoodsCause(scope.row.oId)"
                    type="text"
                    size="small">
                    申请退货
                  </el-button>
                  <el-button
                    v-if="scope.row.oStatus==5"
                    type="text"
                    size="small"
                    :disabled="true"
                  >
                    退货申请中...
                  </el-button>
                  <!-- <el-popover
                     v-if="scope.row.oStatus==7"
                     placement="top-start"
                     title="店家拒绝理由"
                     width="200"
                     trigger="hover"
                     :content="scope.row.sReseason">
                     <el-button
                       slot="reference"
                       type="text"
                       size="small"
                       icon="el-icon-close">
                       店家已拒绝退货
                     </el-button>
                   </el-popover>-->
                  <!--<el-button
                    v-if="activeIndex=='tabstyle3'&scope.row.orderstatus=='07'"
                    :disabled="true"
                    type="text"
                    size="small">
                    店家已拒绝退货申请
                  </el-button>-->
                  <el-button
                    v-if="scope.row.oStatus==6"
                    :disabled="true"
                    type="text"
                    size="small"
                    icon="el-icon-check"
                  >
                    退货已完成
                  </el-button>

                  <el-button
                    v-if="scope.row.oStatus==2"
                    type="text"
                    size="small"
                    @click="delOne(scope.row.oId)">
                    删除订单
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
          </el-col>
        </el-row>
      </div>
      <!--订单详情dialog-->
      <el-dialog
        title="订单详情"
        :visible.sync="dialogVisible"
        width="50%"
        :close-on-click-modal="false"
      >
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
            <tr class="width100" v-if="orderInfo.uRecause!=null">
              <td colspan="3">
                退货理由：
                {{orderInfo.uRecause}}
              </td>
            </tr>
            <tr class="width100" v-if="orderInfo.sReseason!=null">
              <td colspan="3">
                拒绝退货理由：
                {{orderInfo.sReseason}}
              </td>
            </tr>
          </table>
        </div>
      </el-dialog>
      <!--退货dialog-->
      <el-dialog
        title="申请退货原因"
        :visible.sync="returnCausedialogVisible"
        width="30%"
        :before-close="handleClose"
        :close-on-click-modal="false"
      >
        <el-input type="textarea" :rows="4" maxlength="100" v-model="returnGoodsInfo.returncause" placeholder="请输入申请退货理由"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelReturnCause">取 消</el-button>
          <el-button type="primary" @click="AfterSaleService">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "userOrder",
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
        returnCausedialogVisible: false,//退货理由开启显示
        returnGoodsInfo: {
          id: '',
          returncause: '',//退货理由
        },
        orderInfo: {//订单信息
          id: '订单编号',//订单编号
          img: require("E:/redLipShopUIandSSM/redLipImg/innisfree/ru.jpg"),
          title: '1111111111111111111111111111111111',//商品标题
          classic: '分类',
          price: 120,
          buyNumber: 1,//购买数量
          realPrice: 240,//实付金额
          spellFlag: '1',//是否打折
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
        let params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          uId: sessionStorage.getItem("userId"),
        };
        axios.post("/api/order/selAll", params).then(res => {
          this.loading = false;
          this.userOrderData = res.data.list;
          console.log('所有订单', res.data.list);
          this.currentPage = res.data.pageNum;
          this.totalCount = res.data.total;

        });
      },
      //支付商品
      payOne(row) {
        console.log('支付第商品！', row);
        this.$router.push({
          path: '/pay',
          query: {
            oId: row.oId,
            countPrice: row.countPrice
          }
        });
      },
      //申请售后服务
      AfterSaleService() {
        console.log('第几个申请售后服务：', this.returnGoodsInfo);
        if (this.returnGoodsInfo.returncause.trim() == '') {
          this.$message.error("请填写退货原因！")
        } else {

          let params = {
            oId: this.returnGoodsInfo.id,
            oStatus: 5,
            uRecause: this.returnGoodsInfo.returncause,
          };
          axios.post("/api/order/up", params).then(res => {
            console.log('申请售后服务成功', res.data);
            this.cancelReturnCause();//清空退货理由和id
            this.$message({
              showClose: true,
              message: '申请售后服务成功',
              type: 'success'
            });
            this.getUerOrder();
          });
        }
      },
      //收货
      getGood(id) {
        console.log('收货第几个：', id);
        let params = {
          oId: id,
          oStatus: 4
        };
        axios.post("/api/order/up", params).then(res => {
          console.log('收货成功', res.data);
          this.$message({
            showClose: true,
            message: '收货成功',
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
      //删除订单
      delOne(id) {
        let params = {
          oId: id,
        };
        axios.post("/api/order/del", params).then(res => {
          console.log('删除订单---', res.data);
          this.$message({
            showClose: true,
            message: '删除订单成功！',
            type: 'success'
          });
          this.getUerOrder();
        });
      },
      //打开退货原因的dialoag框
      openReturnGoodsCause(id) {
        this.returnCausedialogVisible = true;
        this.returnGoodsInfo.id = id;
      },
      //取消退货
      cancelReturnCause() {
        this.returnCausedialogVisible = false;
        this.returnGoodsInfo.id = '';
        this.returnGoodsInfo.returncause = '';
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
            this.returnGoodsInfo.returncause = '';//清空退货原因
          }).catch(_ => {

        });
      },
      //是否是7天内
      if7Days(row) {
        var date2 = new Date(); //获取当前时间
        var date1 = new Date(Date.parse(row.sendtime.replace(/-/g, "/")));
        var iDays = parseInt(Math.abs(date2.getTime() - date1.getTime()) / 1000 / 60 / 60 / 24);

        console.log('天数', iDays);
        console.log('收货日子', date1);
        if (iDays > 7) {
          return false;
        } else {
          return true
        }

      },
    }
    ,
  }
</script>

<style scoped>
  #userOrder {
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

  /*.tabstyle1:focus,
  .tabstyle2:focus,
  .tabstyle3:focus,
  .tabstyle4:focus,
  .tabstyle5:focus,
  .tabstyle6:focus,
  .tabstyle7:focus{
    border-bottom: 0px;
    background-color:#fff;
    border-left: 1px solid #5182e4;
    border-top: 1px solid #5182e4;
    border-right: 1px solid #5182e4;
  }*/
</style>
