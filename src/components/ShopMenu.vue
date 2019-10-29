<template>
  <div id="ShoprMenu">
    <div style="display:inline-block;">
          <span v-for="(item,index) in tabsshop" :key="index" @click="toNext(item.href,index)"
                :class="{active: activeIndex == index}">
            {{item.name}}</span>
      <span>
        欢迎{{shopName}}店主！
      </span>
      <span @click="outLogin">
        登出
      </span>
    </div>
  </div>
</template>

<script>

  export default {
    name: "ShopMenu",
    data() {
      return {
        shopName: sessionStorage.getItem("userName"),//店铺姓名
        active: "",
        activeName: "first",
        activeIndex: 0,
        tabsshop: [
          {
            href: '/shopIndex',
            name: '好物管理'
          },
          {
            href: '/shopOrder',
            name: '订单管理'
          },
          {
            href: '/publishGoods',
            name: '上新好物'
          },
          /*{
            href: '/userRegister',
            name: '审核店铺'
          },*/

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
        if (to.path == '/shopIndex') {
          this.activeIndex = 0;
          return;
        }
        if (to.path == '/shopOrder') {
          this.activeIndex = 1;
          return;
        }
        if (to.path == '/publishGoods') {
          this.activeIndex = 2;
          return;
        }
        /*if (to.path == '/govermentProjectList') {
          this.activeIndex = 3;
          return;
        }
        if (to.path == '/policyList') {
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
      /**
       * 登出
       */
      outLogin() {
        sessionStorage.clear();
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userName");
        sessionStorage.setItem("userType", JSON.stringify(0));
        this.$emit("setUserType", 0);
      }
    },

  }
</script>

<style scoped lang="less">
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
