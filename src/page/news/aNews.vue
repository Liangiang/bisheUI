<template>
  <div id="aNews" v-loading="loading">
    <el-row>
      <el-col :span="24">
        <div style="text-align: center;">
          {{anews.title}}
        </div>
        <div style="text-align: right;color: #8c939d;">
          {{anews.insertTime}}
        </div>
        <div style="padding: 10px 10px;">
          <div class="news_context" v-html="anews.context"></div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "aNews",
    props: ['hId'],
    data() {
      return {
        loading:true,
        anews: {
          title: '',
          context: '',
          insertTime: '',
        },
      }
    },
    mounted() {
      this.getANews();
    },
    methods: {
      getANews() {
        this.loading=true;
        let params = {
          hId: this.hId,
        };
        axios.post("/api/health/selA", params).then(res => {
          console.log('健康文章详情', res.data);
          this.loading=false;
          this.anews = res.data;
        });
      },
    }
    ,
    computed: {}
    ,
    filters: {}
    ,
  }
</script>

<style scoped lang="less">
  .news_context img {
    width: 100% !important;
  }

  .news_context {
    p {
      img {
        width: 100% !important;
        max-width: 100%;
        height: auto;
        max-height: 100%;
      }
    }
  }
  img {
    border-style: none;
    width: 100% !important;
  }
  .el-dialog__body{
    max-height: 455px !important;
    min-height: 300px !important;
    overflow: auto;
  }
</style>
