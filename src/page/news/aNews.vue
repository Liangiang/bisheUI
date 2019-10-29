<template>
  <div id="aNews">
    <el-row>
      <el-col :span="24">
        -----------------------------
        <div style="text-align: center;">
          {{anews.title}}
        </div>
        <div style="text-align: right;color: #8c939d;">
          {{anews.insertTime}}
        </div>
        <div style="padding: 10px;">
          <div v-html="anews.context"></div>
        </div>
        -----------------------------
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
        anews: {
          title: '标题',
          context: '<h3>啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h3>',
          insertTime: new Date(),
        },
      }
    },
    mounted() {
      this.getANews();
    },
    methods: {
      getANews() {
        let params = {
          hId: this.hId,
        };
        axios.post("/api/health/selA", params).then(res => {
          console.log('健康文章详情', res.data);
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

<style scoped>

</style>
