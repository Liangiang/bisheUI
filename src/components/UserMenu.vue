<template>
  <div id="UserMenu">
    <span v-for="(item,index) in tabsManager" :key="index" @click="toNext(item.href,index)"
          :class="{active: activeIndex == index}">
            {{item.name}}
    </span>
    <span @click="toUserInfo">
       你好！&nbsp;&nbsp;{{userName}}
      </span>
    <span @click="outLogin">
        退出账号
      </span>
  </div>
</template>

<script>
  export default {
    name: "UserMenu",
    props: {
      userName: String,
      userId: String,

    },
    data() {
      return {
        active: "",
        activeName: "first",
        activeIndex: 0,
        tabsManager: [
          {
            href: '/index',
            name: '首页'
          },
          {
            href: '/ShoppingCar',
            name: '我的购物车'
          },
          {
            href: '/userOrder',
            name: '我的订单'
          },
          {
            href: '/addReport',
            name: '生成报告'
          },

        ],
      }
    },
    watch: {//监听
      $route(to, from) {
        console.log("--------userMenuHeader监听-------------------");
        console.log(to);
        console.log(from);
        console.log("------------------------------");
        // to表示的是你要去的那个组件，from 表示的是你从哪个组件过来的，它们是两个对象，
        //你可以把它打印出来，它们也有一个param 属性
        if (to.path == '/index') {
          this.activeIndex = 0;
          return;
        }
        if (to.path == '/ShoppingCar') {
          this.activeIndex = 1;
          return;
        }
        if (to.path == '/userOrder') {
          this.activeIndex = 2;
          return;
        }
        if (to.path == '/addReport') {
          this.activeIndex = 3;
          return;
        }
        /*if (to.path == '/policyList') {
          this.activeIndex = 4;
        }*/
      }
    },
    methods: {
      //跳转页面
      toNext(href, index) {
        this.$router.push({
          path: href
        });
        // this.activeIndex = index;
      },
      outLogin() {
        //alert('登出啦!');
        sessionStorage.clear();
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userName");
        sessionStorage.setItem("userType", 0);
        this.$emit("setUserType", sessionStorage.getItem("userType"));
      },
      //用户信息
      toUserInfo() {
        this.$router.push({
          path: '/userInfo'
        });
      },
    },
//通过watch来监听message是否改变
    /* watch:{
          'message':function(){
            this.$emit('getMessage',this.message);//主要是通过$emit方法来实现传参的方式，第一个参数是自定义事件名称，第二个则是要传的数据
          }
        }*/
  }
</script>

<style scoped lang="less">
  #UserMenu {
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
