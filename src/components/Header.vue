<template>
  <div class="header">
    <div class="index-menu">
      <a href="#/index">
        <!--<img src="../assets/img/logo.jpg" class="logo l">-->
      </a>

      <div class="menu r" v-if="userType==0">
        <div style="display:inline-block;">
          <span v-for="(item,index) in tabsUser" :key="index" @click="toNext(item.href,index)"
                :class="{active: activeIndex == index}">
            {{item.name}}</span>
        </div>
      </div>
      <div class="menu r" v-if="userType==1">
        <UserMenu :userName="userName" :userId="userId" @setUserType="getUserType"/>
      </div>
      <div class="menu r" v-if="userType==2">
        <ShopMenu :userName="userName" :userId="userId" @setUserType="getUserType"/>
      </div>
      <div class="menu r" v-if="userType==3">
        <ManagerMenu :userName="userName" :userId="userId" @setUserType="getUserType"/>
      </div>
      <!--<span @click="Loginout()" v-if="token">退出登录</span>

      <span class="to-login-box" v-if="!token">
          <span @click="toUserRegist()" style="border:0">注册</span>/
          <span @click="toLogin()">登录</span>
        <span @click="toShopRegist()">开店</span>
    </span>-->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>请先登录再进行查看</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click.native="toLogin">登 录</el-button>
        </span>
      </el-dialog>
    </div>
  </div>

</template>

<script>
  import axios from 'axios';

  import ManagerMenu from '@/components/ManagerMenu';
  import ShopMenu from '@/components/ShopMenu'
  import UserMenu from '@/components/UserMenu'

  export default {
    name: "Header",
    components: {
      ManagerMenu,
      ShopMenu,
      UserMenu
    },
    data() {
      return {
        userType: 0,
        userName: "",
        userId: '',
        active: "",
        activeName: "first",
        activeIndex: 0,
        dialogVisible: false,//提示登录
        tabsUser: [
          {
            href: '/index',
            name: '首页',
            // disable: false
          },
          {
            href: '/ShoppingCart',
            name: '购物车',
            // disable: true
          },
          {
            href: '/userOrder',
            name: '订单中心',
            // disable: true
          },
          {
            href: '/Login',
            name: '登录',
            disable: false
          },
          {
            href: '/userRegister',
            name: '注册',
            // disable: false
          },
          {
            href: '/shopRegister',
            name: '开店',
            // disable: false
          },
        ],
      }
    },
    watch: {//监听
      $route(to, from) {
        console.log("--------header监听-------------------");
        console.log(to);
        console.log(from);
        console.log("------------------------------");
        // to表示的是你要去的那个组件，from 表示的是你从哪个组件过来的，它们是两个对象，
        //你可以把它打印出来，它们也有一个param 属性
        if (to.path == '/index') {
          this.activeIndex = 0;
          return;
        }
        if (to.path == '/ShoppingCart') {
          if (sessionStorage.getItem("userId") == null | sessionStorage.getItem("userId") == undefined) {
            this.dialogVisible = true;
          } else {
            this.activeIndex = 1;
            return;
          }
        }
        if (to.path == '/userOrder') {
          if (sessionStorage.getItem("userId") == null | sessionStorage.getItem("userId") == undefined) {
            this.dialogVisible = true;
          } else {
            this.activeIndex = 2;
            return;
          }
        }
        /*if (to.path == '/Login') {
          this.activeIndex = 3;
          return;
        }
        if (to.path == '/userRegister') {
          this.activeIndex = 4;
        }*/
      },
      userType: function (val, oldval) {
        console.log('header里watch的userType---', this.userType);
        console.log('header里的userType新---', val);
        console.log('header里的userType旧--', oldval);
      }
    },
    created() {
      var userId = sessionStorage.getItem("userId");
      var userName = sessionStorage.getItem("userName");
      userName = JSON.parse(userName);
      this.userName = userName;
      var userType = sessionStorage.getItem("userType");
      userType = JSON.parse(userType);
      console.log('header里~~~~~~~');
      console.log('usertype', userType);
      console.log('userName', userName);
      console.log('userId', userId);
      console.log('------header里end');
      if (userType == '1' | userType == 1) {
        this.userType = 1;
      } else if (userType == '2' | userType == 2) {
        this.userType = 2;
      } else if (userType == '3' | userType == 3) {
        this.userType = 3;
      }
    },
    methods: {
      //跳转页面
      toNext(href, index) {
        if (index == 0 | index == 3 | index == 4 | index == 5) {
          this.$router.push({
            path: href
          });
        } else {
          this.ifLogin();
        }
        // this.activeIndex = index;

      },
      //子组件传的参数
      getUserType(val) {
        console.log("子组件传给header的", val);
        this.userType = val;
        if (val == 0) {
          this.$router.push({
            path: '/index'
          });
        }
      },

      //----------是否登录----------
      ifToken() {
        if (!sessionStorage.getItem("token")) {
          this.dialogVisible = true;
          /*this.$confirm('只有登陆之后才能查看哦')
            .then(_ => {
              done();
            })
            .catch(_ => {});*/
        }
      },
      //跳转页面+顾客注册-------------
      toUserRegist() {
        this.$router.push({
          path: '/userRegister'
        });
      },
      //跳转页面+商家注册=开店-------------
      toShopRegist() {
        this.$router.push({
          path: '/shopRegister'
        });
      },
      //跳转页面++++登录+++++
      toLogin() {
        this.$router.push({
          path: '/Login'
        });
      },
      ifLogin() {
        this.dialogVisible = true;
      }
      ,
      //导出excel
      exportExcel() {
        let params = {}
        axios.post("/api/excel/export", params, {responseType: 'blob'}).then(res => {
          const blob = new Blob([res.data])
          let aTag = document.createElement('a')
          aTag.download = 'aaa.xls'
          aTag.href = URL.createObjectURL(blob)
          aTag.click()
          URL.revokeObjectURL(aTag.href)
        })
      }
    },

  }
</script>

<style scoped lang="less">

  .header {
    //background-color: #722ed1;
  }

  .index-menu {
    padding: 20px;
    height: 110px;
    .l {
      height: 50px;
    }
  }

  .header-right {
    margin-right: 16px;
    //color: @secondaryColor;
  }

  .header-right:last-child {
    margin-right: 0;
  }

  .icon {
    font-size: 20px;
  }

  .logo-img {
    height: 40px;
    margin-top: 10px;
    float: left;
  }

  .user-img {
    border-radius: 50%;
  }

  .user-img,
  .nation-img,
  .icon {
    height: 20px;
    display: inline-block;
  }

  .header-item {
    float: right;
    //color: #ffffff;
    line-height: 60px;
  }

  .el-menu {
    display: inline-block;
  }

  .menu {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    float: right;
    padding-top: 16px;

    span {
      padding: 0 10px;
      border-right: 1px solid;
      border-color: #dcdfe6;
      color: #495060;
      cursor: pointer;
      font-size: 15px;
    }

    span.active {
      color: #3369c8;

    }

    span:last-child {
      border-right: 0;
    }

    .to-login-box {
      span {
        padding: 0;
      }

      span:hover {
        color: #3369c8;
      }
    }
  }

  .menu .nav span {
    padding: 0 15px;
    background: #3369c8;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    margin: 0;

    a {
      //color: #fff;

    }
  }

  .menu .nav span:hover {
    background: #ffffff;

    a {
      color: #3369c8;

    }
  }
</style>
