<template>
  <div class="footer">
    <!--<div class="line"></div>-->
    <!--<div v-for="item in items" :key="item.id">
      <div style="width: 400px;height: 200px;background: #f00;margin: 10px;" @mouseenter="onMouseOver(item.id)"
           @mouseleave="omMouseOut(item.id)">
        <div :id="item.id"
             style="background: #4201f0;width: 200px;height: 200px;color: white;font-weight: bolder;">
          {{item.name}}
        </div>

      </div>
    </div>-->
    <div class="width1024">
      <!--<el-row style="padding-top: 20px;padding-bottom: 10px;padding-left: 20px;">
        <el-col :span="8" style="padding-left: 20px;">
          <span class="footerCircle">优</span>
          <span>
            <div class="footerTitle">
              品质保障
            </div>
            <div>
              品质护航 购物无忧
            </div>
          </span>
        </el-col>
        <el-col :span="8" style="border-left: 1px solid #ddd;border-right: 1px solid #ddd;padding: 0 10px;">
          <span class="footerCircle">七</span>
          <span>
            <div class="footerTitle">
              七天无理由退换货
            </div>
            <div>
              为您提供售后无忧保障
            </div>
          </span>
        </el-col>
        <el-col :span="8" style="padding: 0 10px;">
          <span class="footerCircle">特</span>
          <span>
            <div class="footerTitle">
            特色服务体验
            </div>
            <div>
            为您呈现不一样的服务
            </div>
          </span>
        </el-col>
        <el-col :span="24" style="padding-top: 10px;text-align: center;">
          消费者维权电话：13842102654
        </el-col>
        <el-col :span="24" style="padding-top: 10px;text-align: center;">
          &copy; 2019-现在&nbsp;&nbsp;小红唇海淘平台归梁休所有
        </el-col>
      </el-row>-->
      <!--<h1>footer.vue</h1>
      <h1>footer.vue</h1>
      <h1>footer.vue</h1>
      <h1>footer.vue</h1>-->
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: "Footer",
    data() {
      return {
        mouseShow: false,
        items: [
          {
            id: 1,
            name: '11111'
          },
          {
            id: 2,
            name: '2222'
          },
          {
            id: 3,
            name: '333'
          },
        ],
      }
    },
    created(){
      this.items.forEach(item => {
        console.log('--------',$("#"+item.id+"").html())

        $("#"+item.id+"").addClass("display-none");
    })
    },
    methods: {
      /**鼠标移入触发的事件
       * @author lx
       * @date 2019/9/9 15:46
       */
      onMouseOver(id) {
        console.log('鼠标移入触发的事件');
        $("#" + id+"").removeClass("display-none")
        // this.mouseShow = true;
      },
      /** 鼠标移出触发的事件
       * @author lx
       * @date 2019/9/9 15:46
       */
      omMouseOut(id) {
        console.log('鼠标移出触发的事件')
        $("#"+id+"").addClass("display-none")
        // this.mouseShow = false;
      },
    }
  }
</script>

<style scoped>
  .display-none {
    display: none;
  }

  .footer {
    /*background-color: #2c3e50;*/
  }

  .footerCircle {
    height: 40px;
    width: 40px;
    background-color: transparent; /* Can be set to transparent */
    border: 2px #409EFF solid;
    -webkit-border-radius: 100px;
    font-size: 1.6rem;
    /*font-weight: bold;*/
    color: #409EFF;
    line-height: 40px;
    text-align: center;
    float: left;
    margin-right: 10px;
  }

  .margin_left_10 {
    margin-left: 10px;
  }

  .footerTitle {
    font-size: 1.1rem;
    font-weight: bolder;
  }
</style>
