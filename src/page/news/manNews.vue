<template>
  <div class="width1024">
    <div class="blockDiv blockDivTop">
      <div class="title_box">
        <span class="title_span">文</span>
        <span class="levelTitle2">时令好文管理</span>
      </div>
      <div class="line"></div>
      <el-row>
        <el-col :span="24">
          <div style="text-align: right;padding: 10px 10px 0 0;">

            <el-button @click.native.prevent="AddOne()" type="primary">
              新增好文
            </el-button>
            <el-button @click.native.prevent="freshAll()" icon="el-icon-refresh" circle>
            </el-button>
          </div>
        </el-col>
        <el-col :span="24" style="padding: 10px;">
          <showNews v-if="show" :mId="mId" :flag="1"/>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="新增好文"
      :visible.sync="AddAnewsVisible"
      width="60%"
      :close-on-click-modal="false"
      top="2%"
    >
      <div>
        <editAdd v-if="AddAnewsVisible" @func="getMsgFormSon" :hId="hId" :flag="0"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import showNews from '@/page/news/showNews'
  import editAdd from '@/page/news/editAdd'

  export default {
    name: "manNews",
    components: {
      showNews,
      editAdd
    },
    data() {
      return {
        mId: sessionStorage.getItem("userId"),
        show: false,
        AddAnewsVisible: false,
        hId: '',
        sonflag: 10000,
      }
    },
    mounted() {
      this.show = true;
    },
    methods: {
      freshAll() {
        console.log('-------------++++++++++++44444444')
        this.show = false;
        this.$nextTick(() => {
          this.show = true;
        })
      },
      AddOne() {
        this.AddAnewsVisible = true;
      },
      getMsgFormSon(data) {
        console.log('+++++++++', data);
        this.sonflag = data;
        this.show = false;
        this.$nextTick(() => {
          this.show = true;
        })
        this.AddAnewsVisible = false;
      }
    },
    watch: {
      sonflag(val) {

        this.sonflag = val;
        this.show = false;
        this.show = true;
        this.AddAnewsVisible = false;
      }
    },
    computed: {},
    filters: {},
  }
</script>

<style scoped>

</style>
