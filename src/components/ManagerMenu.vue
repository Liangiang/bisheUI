<template>
  <div id="ManagerMenu">
    <div style="display:inline-block;">
          <span v-for="(item,index) in tabsManager" :key="index" @click="toNext(item.href,index)"
                :class="{active: activeIndex == index}">
            {{item.name}}</span>
      <span>
        你好！{{managerName}}
      </span>
      <span @click="outLogin">
        登出
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ManagerMenu",
    data() {
      return {
        managerName: sessionStorage.getItem("userName"),//管理员姓名
        active: "",
        activeName: "first",
        activeIndex: 0,
        tabsManager: [
          {
            href: '/manIndex',
            name: '时令好文中心'
          },
          /*{
            href: '/managerOrder',
            name: '订单中心'
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
        if (to.path == '/manIndex') {
          this.activeIndex = 0;
          return;
        }
        if (to.path == '/managerOrder') {
          this.activeIndex = 1;
          return;
        }
        /*if (to.path == '/examineUser') {
          this.activeIndex = 2;
          return;
        }
        if (to.path == '/examineShop') {
          this.activeIndex = 3;
          return;
        }
        if (to.path == '/SamplingInspection') {
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
        sessionStorage.clear();
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userName");
        sessionStorage.setItem("userType", 0);
        console.log('登出后的userid++++', sessionStorage.getItem("userId"));
        console.log('登出后的userName---', sessionStorage.getItem("userName"));
        console.log('登出后的userType===', sessionStorage.getItem("userType"));
        this.$emit("setUserType", sessionStorage.getItem("userType"));
        console.log('-------------登出----------------')
      }
    },

  }
</script>

<style scoped lang="less">
  #ManagerMenu {
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
