<template>
  <div id="managerIndex">
    <div class="width1024">
      <!--已检测的商品-->
      <div class="blockDiv blockDivTop" style="padding-bottom: 50px;">
        <div>
          <b class="levelTitlebar">
          </b>
          <b class="tiao2"></b>
          <span class="levelTitle2">随机抽样宝贝检测报告</span>
        </div>
        <div class="line"></div>
        <div style="padding-top: 10px;">
          <showNews :mId="mId"/>
          <el-pagination
            style="float:right;margin-top: 10px;"
            @size-change="resultHandleSizeChange"
            @current-change="resultHandleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="resultCurrentPage"
            :page-size="resultPageSize"
            :total="resultTotalCount"
          >
          </el-pagination>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import showNews from '@/page/news/showNews'

  export default {
    name: "managerIndex",
    components: {
      showNews
    },
    data() {
      return {
        mId: sessionStorage.getItem("userId"),
        userloading: false,//用户的loading
        shoploading: false,//店铺的loading
        resultloading: false,//检测报告的loading
        userDialogVisible: false,//用户详情显示
        shopDialogVisible: false,//店铺详情显示
        UserInfoLoading: false,//用户详情信息loading
        shopInfoLoading: false,//店铺详情
        currentPage: 1,//分页----当前页数
        dialogVisible: false,//控制详情页是否显示的
        pageSize: 10,//分页----每页显示多少条
        totalCount: 100,//分页----总条目数

        shopCurrentPage: 1,//当前页数----店铺分页
        shopPageSize: 10,//每页显示多少条----店铺分页
        shopTotalCount: 100,//总条目数----店铺分页

        resultCurrentPage: 1,//当前页数----检测报告分页
        resultPageSize: 10,//每页显示多少条----检测报告分页
        resultTotalCount: 100,//总条目数----检测报告分页
        testResultData: [],//检测结果
        checkedUserData: [],//被该用户审核过的用户
        checkedShopData: [],//被该用户审核过的店铺
        userInfo: {},//用户详情
        shopInfo: {},//店铺详细信息
      }
    },
    mounted() {
      this.getCheckedUserList();
      this.getCheckedShopList();
      this.getTestResultList();
    },
    methods: {
      //获取检测结果list
      getTestResultList() {
        this.resultloading = true;
        let params = {
          currentPage: this.resultCurrentPage,
          pageSize: this.resultPageSize,
          totalCount: this.resultTotalCount,
        }
        axios.post("/api/Manager/getTestResultList", params).then(res => {
          this.resultloading = false;
          console.log('检测结果', res.data);
          this.testResultData = res.data.list;
          this.resultPageSize = res.data.pageSize;
          this.resultCurrentPage = res.data.pageNum;
          this.resultTotalCount = res.data.total;
        });
      },
      //获取已经审核的用户list
      getCheckedUserList() {
        this.userloading = true;
        let params = {
          managerid: sessionStorage.getItem("userId"),
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          totalCount: this.totalCount,
        };
        axios.post("/api/Manager/select_checked_userList_by_managerId", params).then(res => {
          this.userloading = false;
          console.log('用户', res.data);
          this.checkedUserData = res.data.list;
          this.pageSize = res.data.pageSize;
          this.currentPage = res.data.pageNum;
          this.totalCount = res.data.total;
        });
      },
      //获取已经审核的店铺list
      getCheckedShopList() {
        this.shoploading = true;
        let params = {
          managerid: sessionStorage.getItem("userId"),
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          totalCount: this.totalCount,
        };
        axios.post("/api/Manager/select_checked_shopList_by_managerId", params).then(res => {
          console.log('店铺', res.data);
          this.shoploading = false;
          this.checkedShopData = res.data.list;
          this.shopPageSize = res.data.pageSize;
          this.shopCurrentPage = res.data.pageNum;
          this.shopTotalCount = res.data.total;

        });
      },
      //单个用户所有信息
      getOneUserInfo(id) {
        this.userDialogVisible = true;
        this.UserInfoLoading = true;

        let params = {
          id: id
        };
        axios.post("/api/Manager/select_a_userInfo_byId", params).then(res => {
          this.UserInfoLoading = false;
          console.log('该用户所有信息----', res.data);
          this.userInfo = res.data;
        });
      },
      //单个店铺所有信息
      getAShopInfo(id) {
        this.shopDialogVisible = true;
        this.shopInfoLoading = true;
        let params = {
          id: id
        };
        axios.post("/api/Manager/select_a_shopInfo_byId", params).then(res => {
          this.shopInfoLoading = false;
          console.log('此店铺所有信息----', res.data);
          this.shopInfo = res.data;
        });
      },

      //每页多少条改变==用户
      handleSizeChange(val) {
        this.pageSize = val;
        console.log(`每页 ${val} 条`);
        this.getCheckedUserList();
      },
      //当前页数改变==用户
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
        this.getCheckedUserList();
      },

      //每页多少条改变==店铺
      shopHandleSizeChange(val) {
        this.shopPageSize = val;
        console.log(`每页 ${val} 条`);
        this.getCheckedShopList();
      },
      //当前页数改变==店铺
      shopHandleCurrentChange(val) {
        this.shopCurrentPage = val;
        console.log(`当前页: ${val}`);
        this.getCheckedShopList();
      },
      //每页多少条改变==检测结果
      resultHandleSizeChange(val) {
        this.resultPageSize = val;
        console.log(`每页 ${val} 条`);
        this.getTestResultList();
      },
      //当前页数改变==检测结果
      resultHandleCurrentChange(val) {
        this.resultCurrentPage = val;
        console.log(`当前页: ${val}`);
        this.getTestResultList();
      },
    },
    filters: {
      sex: function (data) {
        if (data == 1 | data == '1') {
          return '男';
        } else if (data == 2 | data == '2') {
          return '女';
        }
      },
      money: function (data) {
        if (data == null || data == undefined) {
          return 0;
        } else {
          return data;
        }
      },
      result: function (data) {
        if (data == null || data == undefined) {
          return '-';
        } else if (data == 0 || data == '0') {
          return '假';
        } else if (data == 1 || data == '1') {
          return '真';
        }
      },
    },
  }
</script>

<style scoped>
  #managerIndex {
    background-color: #fff;
  }

  .margin_left_5 {
    margin-left: 5px;
  }
</style>
