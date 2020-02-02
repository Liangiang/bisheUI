<template>
  <div id="showNews">
    ========={{this.mId}}==========
    <div v-loading="loading">
      <div v-for="item in news" :key="item.hId">
        <el-row class="news_row">
          <el-col :span="16">
            <div @click="getAnew(item.hId)" style="font-size: 16px;font-weight: bolder;cursor: pointer;">
              {{item.title}}
            </div>
          </el-col>
          <el-col :span="flag==1 ? 5 : 8">
            <!--style="text-align: right"-->
            <div @click="getAnew(item.hId)" style="cursor: pointer; text-align: center;">
              {{item.insertTime}}
            </div>
          </el-col>
          <el-col :span="3" v-if="flag==1">
            <el-button
              @click.native.prevent="removeArtical(item.hId)"
              type="text"
              size="small">
              删除
            </el-button>
            <el-button
              @click.native.prevent="editArtical(item.hId)"
              type="text"
              size="small">
              重新编辑
            </el-button>
          </el-col>
        </el-row>
      </div>
      <!--分页插件-->
      <el-pagination
        v-if="news.length!=0"
        style="float:right;margin-top: 10px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalCount"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="好文详情"
      :visible.sync="AnewsDialogVisible"
      width="60%"
      top="2%"
      :close-on-click-modal="false"
    >
      <div class="a_news_box">
        <a-news v-if="AnewsDialogVisible" :hId="hId"/>
      </div>
    </el-dialog>
    <el-dialog
      title="好文编辑"
      top="2%"
      :visible.sync="editAnewsVisible"
      width="60%"
      :close-on-click-modal="false"
    >
      <div>
        <editAdd v-if="editAnewsVisible" :hId="hId" :flag="1"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios';
  import aNews from '@/page/news/aNews'
  import editAdd from '@/page/news/editAdd'

  export default {
    name: "showNews",
    components: {
      aNews,
      editAdd
    },
    props: ['mId', 'flag'],
    data() {
      return {
        news: [],
        aNews: {},
        hId: '',
        AnewsDialogVisible: false,
        editAnewsVisible: false,
        loading: false,
        currentPage: 1,//分页----当前页数
        totalCount: 100,//分页----总条目数
        pageSize: 10,//分页----一页一共条目数
      }
    },
    mounted() {
      this.getNews();
    },
    methods: {
      getNews() {
        this.loading = true;
        let params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        };
        if (this.mId != '') {
          params = {
            mId: this.mId,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
          }
        }
        console.log('所有文章入参------', params);
        axios.post("/api/health/selAll", params).then(res => {
          console.log('所有文章', res.data);
          this.loading = false;
          this.news = res.data.list;
          this.currentPage = res.data.pageNum;
          this.totalCount = res.data.total;
        });
      },
      //查看
      getAnew(hId) {
        console.log('查看文章', hId);
        this.hId = hId;
        this.AnewsDialogVisible = true;

        /*let params = {
          hId: hId,
        };
        axios.post("/api/health/selA", params).then(res => {
          console.log('一个文章', res.data);
          this.aNews = res.data;
        });*/
      },
      //编辑
      editArtical(hId) {
        this.hId = hId;
        this.editAnewsVisible = true;
      },
      //删除
      removeArtical(hId) {
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            hId: hId,
          };
          axios.post("/api/health/del", params).then(res => {
            console.log('删除某个文章返回数据', res.data);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //每页多少条改变
      handleSizeChange(val) {
        this.pageSize = val;
        console.log(`每页 ${val} 条`);
        this.getNews();
      },
      //当前页数改变
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
        this.getNews();
      },
    },
    computed: {},
    filters: {},
  }
</script>

<style scoped lang="less">

  img {
    border-style: none;
    width: 100% !important;
  }

  /*.el-dialog .el-dialog__body {
    max-height: 455px !important;
    overflow: auto;
  }*/

  .a_news_box {
    max-height: 430px !important;
    min-height: 300px !important;
    width: 100% !important;
    overflow: auto;
    img {
      width: 100% !important;
    }
  }

  #aNews {
    width: 100% !important;
    img {
      width: 100% !important;
    }
  }

  .news_row:hover {
    background: rgba(160, 207, 255, 0.7);
  }
</style>
