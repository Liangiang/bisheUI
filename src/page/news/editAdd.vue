<template>
  <div id="editAdd">
    <el-row>
      <el-col :span="24">
        <el-form ref="ArticleForm" :model="ArticleForm" :rules="rules" label-width="100px">
          <el-form-item label="好文标题" prop="title">
            <el-input v-model="ArticleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="好文内容" prop="context">

          </el-form-item>
          <el-form-item v-if="flag==0">
            <el-button type="primary" icon="el-icon-check" @click="addAnews(ArticleForm)">上传</el-button>
            <!--<el-button icon="el-icon-close" @click="reset('ArticleForm')">取消</el-button>-->
          </el-form-item>
          <el-form-item v-if="flag==1">
            <el-button type="primary" icon="el-icon-check" @click="editAnews()">确认更改</el-button>
            <!--<el-button icon="el-icon-close" @click="reset('ArticleForm')">取消</el-button>-->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "editAdd",
    props: ['hId', 'flag'],
    data() {
      return {
        ArticleForm: {
          title: '',
          context: '',
          mId: sessionStorage.getItem("userId"),
        },
        rules: {
          gName: [
            {
              required: true, //是否必填
              message: "标题不能为空", //规则
              trigger: "blur" //何事件触发
            },
          ],//商品名称
        },
      }
    },
    mounted() {
      //编辑
      if (this.flag == 1) {
        this.getAnews();
      }
    },
    methods: {
      getAnews() {
        let params = {
          hId: this.hId,
        };
        axios.post("/api/health/selA", params).then(res => {
          console.log('健康文章详情---', res.data);
          this.ArticleForm = res.data;

        });

      },
      //新增
      addAnews(form) {
        this.$refs.ArticleForm.validate(valid => {
          if (valid) {
            this.ArticleForm.mId = sessionStorage.getItem("userId");
            axios.post("/api/health/add", this.ArticleForm).then(res => {
              console.log('新增---', res.data);
              this.$message.success('新增成功！');
              this.$emit('func', 1);
            });
          } else {
            return false;
          }
        });
      },
      //修改
      editAnews() {
        this.$refs.ArticleForm.validate(valid => {
            if (valid) {
              this.ArticleForm.mId = sessionStorage.getItem("userId");
              this.ArticleForm.hId = this.hId;
              axios.post("/api/health/up", this.ArticleForm).then(res => {
                console.log('修改文章信息', res.data);
                this.$message.success('修改成功！');
                this.$emit('func', 0);
              });

            }
          }
        )
      },
      //取消提交
      reset(formName) {
        this.$refs[formName].resetFields();
      }
      ,
    },
    computed: {}
    ,
    filters: {}
    ,
  }
</script>

<style scoped>

</style>
