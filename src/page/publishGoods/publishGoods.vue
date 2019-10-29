<template>
  <div id="publishGoods">
    <el-card
      class="width1024"
      shadow="always">
      <div slot="header">
        <span class="title_span">新</span>
        <span class="levelTitle2">上新好物</span>
      </div>
      <el-form :model="goodsForm" :rules="rules" ref="goodsForm" label-width="120px">
        <el-form-item label="好物名称" prop="gName">
          <el-input v-model="goodsForm.gName"></el-input>
        </el-form-item>
        <el-form-item label="好物标题" prop="gTitle">
          <el-input v-model="goodsForm.gTitle"></el-input>
        </el-form-item>
        <el-form-item label="好物主图" prop="imgUrl">
          <!--<input type="file" :id="imgid" name="image" class="getImgUrl_file">-->
          <el-upload
            class="avatar-uploader"
            action="/api/goods/saveImage"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            list-type="picture"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!--<img :src='imageUrl' alt="">-->
        </el-form-item>
        <el-form-item label="好物单价" prop="price">
          <el-input v-model.number="goodsForm.price"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="typeName">
          <el-input v-model="goodsForm.typeName"></el-input>
        </el-form-item>

        <el-form-item label="品牌" prop="gBrand">
          <el-input v-model="goodsForm.gBrand"></el-input>
        </el-form-item>
        <el-form-item label="产地" prop="produceArea">
          <el-input v-model="goodsForm.produceArea"></el-input>
        </el-form-item>
        <el-form-item label="主要功效" prop="mainEffect">
          <el-input v-model="goodsForm.mainEffect"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="gStock">
          <el-input v-model.number="goodsForm.gStock"></el-input>
        </el-form-item>

        <el-form-item label="保质期" prop="gShelfLife">
          <el-input v-model="goodsForm.gShelfLife"></el-input>
        </el-form-item>
        <!--<el-form-item label="立即上架" prop="downFlag">
          <el-switch v-model="goodsForm.downFlag"></el-switch>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" icon="el-icon-check" @click="submitForm(goodsForm)">上新</el-button>
          <el-button icon="el-icon-close" @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "publishGoods",
    data() {
      return {
        src: '',
        limitNum: 1,
        fileName: '',

        imageUrl: "",
        fileList: [],

        imgid: 'imgId',
        imgDataUrl: '',
        imgDialogVisible: true,//图
        goodsForm: {
          sId: sessionStorage.getItem("userId"),
          gName: '',//商品名称
          gTitle: '',//标题
          imgUrl: '',//主图
          price: '',//单价
          gBrand: '',//品牌名称
          mainEffect: '',//商品功效
          gStock: '',//商品库存
          produceArea: '',//产地
          typeName: '',//商品规格
          gShelfLife: '',//保质期
        },
        rules: {
          gName: [
            {
              required: true, //是否必填
              message: "商品名称不能为空", //规则
              trigger: "blur" //何事件触发
            },
          ],//商品名称
          gTitle: [
            {
              required: true, //是否必填
              message: "商品标题不能为空", //规则
              trigger: "blur" //何事件触发
            },
          ],//商品标题
          imgUrl: [
            {
              required: true, //是否必填
              message: "主图不能为空", //规则
              trigger: "blur" //何事件触发
            },
          ],//商品主图
          price: [
            {
              type: 'number',
              required: true, //是否必填
              message: "单价不能为空，请输入数字", //规则
              trigger: "blur" //何事件触发
            },
          ],//商品单价
          gBrand: [
            {
              required: true, //是否必填
              message: "品牌不能为空", //规则
              trigger: "blur" //何事件触发
            },
          ],//品牌
          produceArea: [
            {
              required: true, //是否必填
              message: "产地不能为空", //规则
              trigger: "blur" //何事件触发
            },
          ],//产地
          mainEffect: [
            {
              required: true, //是否必填
              message: "功效不能为空", //规则
              trigger: "blur" //何事件触发
            },
          ],//功效
          gStock: [
            {
              required: true, //是否必填
              message: "库存不能为空", //规则
              trigger: "blur" //何事件触发
            },
            {
              type: 'number',
              required: true, //是否必填
              message: "请输入数字", //规则
              trigger: "blur" //何事件触发
            },
          ],//库存
          typeName: [
            {
              required: true, //是否必填
              message: "规格不能为空", //规则
              trigger: "blur" //何事件触发
            },
          ],//规格
          gShelfLife: [
            {
              required: true, //是否必填
              message: "保质期不能为空", //规则
              trigger: "blur" //何事件触发
            },
          ],//保质期

        },
      }
    },
    methods: {
      //主图上传成功后的方法
      handleAvatarSuccess(res, file) {
        console.log("file" + file);
        console.log("res", res);
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log('imageUrl', URL.createObjectURL(file.raw));
        if (res.code == 200 | res.code == '200') {
          this.goodsForm.imgUrl = res.filePath;

          //this.imageUrl = res.filePath;
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          });
        } else {
          this.$message.error("上传失败，请重新上传！");
        }
      },
      //主图的上传之前的验证方法
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return true;
      },
      //提交（发布宝贝）
      submitForm(form) {
        this.$refs.goodsForm.validate(valid => {
          if (valid) {
            if (this.goodsForm.imgUrl != '' && this.goodsForm.imgUrl != null) {
              console.log('发布宝贝参数---', this.goodsForm);
              this.goodsForm.sId = sessionStorage.getItem("userId");
              axios.post("/api/goods/add_goods", this.goodsForm).then(res => {
                console.log('提交修改商品', res);
                if (res.data == 1) {
                  this.$message({
                    showClose: true,
                    message: '恭喜你！发布宝贝成功！',
                    type: 'success'
                  });
                  this.goodsForm = {
                    sId: sessionStorage.getItem("userId"),
                    gName: '',//商品名称
                    gTitle: '',//标题
                    imgUrl: '',//主图
                    price: '',//单价
                    gBrand: '',//品牌名称
                    mainEffect: '',//商品功效
                    gStock: '',//商品库存
                    produceArea: '',//产地
                    typeName: '',//商品规格
                    gShelfLife: '',//保质期
                  };
                  this.imageUrl = '';
                } else {
                  this.$message.error('抱歉！发布失败！请重新发布！');
                }
              });
            } else {
              this.$message.error("请上传主图！");
            }
          } else {
            return false;
          }
        });
      },
      //取消提交
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //添加商品分类
      addGoodsClassify() {
        this.goodsForm.goodsClassifyList.push({
          value: '',
          key: Date.now()
        });
      },
      //移除商品分类
      removeGoodsClassify(item) {
        var index = this.goodsForm.goodsClassifyList.indexOf(item)
        if (index !== -1) {
          this.goodsForm.goodsClassifyList.splice(index, 1)
        }
      },
    },

  }
</script>

<style scoped>
  #publishGoods {
    /*background: #fff;*/
  }

  /*样式1*/
  .a-upload {
    padding: 4px 10px;
    height: 20px;
    line-height: 20px;
    position: relative;
    cursor: pointer;
    color: #888;
    background: #fafafa;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1
  }

  .a-upload input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
  }

  .a-upload:hover {
    color: #444;
    background: #eee;
    border-color: #ccc;
    text-decoration: none
  }

</style>
