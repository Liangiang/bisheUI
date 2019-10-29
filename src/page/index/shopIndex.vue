<template>
  <div id="shopIndex">
    <div class="width1024">
      <div class="blockDiv blockDivTop" style="padding-bottom: 50px;">
        <div class="title_box">
          <span class="title_span">物</span>
          <span class="levelTitle2">好物列表</span>
        </div>
        <div class="line"></div>
        <el-table
          v-loading="loading"
          ref="allGoodsrData"
          :data="allGoodsrData"
          tooltip-effect="dark"
          style="width: 95%;margin: 0 auto;">
          <el-table-column
            label="好物信息"
            fixed>
            <template slot-scope="scope">
              <div style="display: inline-flex">
                <img :src="scope.row.imgUrl" style="width: 100px;height: 100px;"/>
                <div style="padding-left: 10px;">{{scope.row.gName}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价"
            width="120">
            <template slot-scope="scope">
              <h3 style="color:red;">￥{{scope.row.price}}</h3>
            </template>
          </el-table-column>
          <!--<el-table-column
            prop="sellnum"
            label="销量"
            width="120">
            <template slot-scope="scope">
              {{scope.row.sellnum| sellnum}}
            </template>
          </el-table-column>-->
          <el-table-column
            prop="typeName"
            label="规格"
            width="120">
            <template slot-scope="scope">
              {{scope.row.typeName}}
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            fixed="right"
            width="200"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="SeeOne(scope.row.gId)"
                type="text"
                size="small">
                查看
              </el-button>
              <el-button
                v-if="scope.row.downFlag==0"
                @click.native.prevent="upOne(scope.row.gId)"
                type="text"
                size="small">
                上架
              </el-button>
              <el-button
                v-if="scope.row.downFlag==1"
                @click.native.prevent="downOne(scope.row.gId)"
                type="text"
                size="small">
                下架
              </el-button>

              <el-button
                @click.native.prevent="removeOne(scope.row.gId)"
                type="text"
                size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页插件-->
        <el-pagination
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
    </div>
    <el-dialog
      title="宝贝详情"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form :model="goodsForm" ref="goodsForm" label-width="120px">
        <el-form-item label="好物名称" prop="gName">
          <el-input :disabled="SeeDisabled" v-model="goodsForm.gName"></el-input>
        </el-form-item>
        <el-form-item label="好物标题" prop="gTitle">
          <el-input :disabled="SeeDisabled" v-model="goodsForm.gTitle"></el-input>
        </el-form-item>
        <el-form-item label="好物主图" prop="imgUrl">
          <el-upload
            :disabled="SeeDisabled"
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
          <el-input :disabled="SeeDisabled" v-model.number="goodsForm.price"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="typeName">
          <el-input :disabled="SeeDisabled" v-model="goodsForm.typeName"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称" prop="gBrand">
          <el-input :disabled="SeeDisabled" v-model="goodsForm.gBrand"></el-input>
        </el-form-item>
        <el-form-item label="产地" prop="produceArea">
          <el-input :disabled="SeeDisabled" v-model="goodsForm.produceArea"></el-input>
        </el-form-item>
        <el-form-item label="主要功效" prop="mainEffect">
          <el-input :disabled="SeeDisabled" v-model="goodsForm.mainEffect"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="gStock">
          <el-input :disabled="SeeDisabled" v-model.number="goodsForm.gStock"></el-input>
        </el-form-item>

        <el-form-item label="保质期" prop="gShelfLife">
          <el-input :disabled="SeeDisabled" v-model="goodsForm.gShelfLife"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="!SeeDisabled" icon="el-icon-check" @click="updataGoodsForm(goodsForm)">提交修改
          </el-button>
          <el-button icon="el-icon-close" v-if="!SeeDisabled" @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="SeeDisabled" icon="el-icon-edit" @click="SeeDisabled = false">编辑宝贝</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "shopIndex",
    data() {
      return {
        loading: false,
        dialogVisible: false,//弹框
        SeeDisabled: true,//是否可编辑
        currentPage: 1,
        pageSize: 10,
        totalCount: 1000,
        allGoodsrData: [],
        imageUrl: '',
        goodsForm: {
          id: '',
          shopid: sessionStorage.getItem("userId"),
          goodsname: '',//商品名称
          title: '',//标题
          mainimgurl: require("E:/redLipShopUIandSSM/redLipImg/innisfree/ru.jpg"),//主图
          price: '',//单价
          spellFig: true,//是否拼团
          spellprice: '',//拼团价格

          goodsClassifyList: [
            {
              classifyname: '',
              id: Date.now()
            },
          ],//商品分类
          brand: '',//品牌名称
          effect: '',//商品功效
          stock: '',//商品库存
          typename: '',//所属分类
          producearea: '',//产地
          goodsnorms: '',//商品规格
          shelflife: '',//保质期
          fitskin: '',//适用肤质
          fitcrowd: '',//适用人群
          postFlag: true,//是否包邮
          postprice: '',//邮费
        },

      }
    },
    mounted() {
      this.SeeAllGoods();
    },
    methods: {
      //查看所有商品
      SeeAllGoods() {
        this.loading = true;
        let params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          totalCount: this.totalCount,
          sId: sessionStorage.getItem("userId")
        };
        axios.post("/api/goods/selGoodsBy", params).then(res => {
          console.log('该店铺所有商品-', res);
          this.loading = false;
          let allGoodsrData = [];
          for (let i = 0; i < res.data.list.length; i++) {

            let img = res.data.list[i].imgUrl;
            allGoodsrData.push({
              gId: res.data.list[i].gId,
              imgUrl: img,//主图
              gName: res.data.list[i].gName,//商品名称
              price: res.data.list[i].price,//单价
              typeName: res.data.list[i].typeName,//是否拼团
              gBrand: res.data.list[i].gBrand,//品牌
              downFlag: res.data.list[i].downFlag,//上下架标识（0未上架，1已上架）
            })
          }
          this.allGoodsrData = allGoodsrData;
          this.currentPage = res.data.pageNum;
          this.totalCount = res.data.total;
        });
      },
      //查看商品详情
      SeeOne(id) {
        this.dialogVisible = true;
        this.SeeDisabled = true;
        //console.log('查看商品id', id);
        let params = {
          gId: id,
        };
        axios.post("/api/goods/sel_goods", params).then(res => {
          console.log('商品所有信息', res.data);

          this.imageUrl = res.data.imgUrl;
          this.goodsForm = res.data;
        })
      },
      //提交编辑修改信息
      updataGoodsForm(form) {
        this.$refs.goodsForm.validate(valid => {
          if (valid) {
            axios.post("/api/goods/up_goods", this.goodsForm).then(res => {
              console.log('提交修改商品', res);
              if (res.data == 1) {
                this.dialogVisible = false;
                this.$message({
                  showClose: true,
                  message: '恭喜你！修改成功！',
                  type: 'success'
                });
                this.SeeAllGoods();
              } else {
                this.$message.error('抱歉！修改失败！请重新提交！');
              }
            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //上架
      upOne(id) {
        //console.log('上架++++++++++', id);
        let params = {
          gId: id,
          downFlag: 1,
        };
        axios.post("/api/goods/up_goods", params).then(res => {
          //console.log('上架是否成功！', res.data);
          if (res.data == 1) {
            this.$message({
              showClose: true,
              message: '恭喜你！上架成功！',
              type: 'success'
            });
          } else {
            this.$message.error('抱歉！上架失败！');
          }
          this.SeeAllGoods();
        })
      },
      //下架
      downOne(id) {
        //console.log('下架-------', id);
        let params = {
          gId: id,
          downFlag: 0,
        };
        axios.post("/api/goods/up_goods", params).then(res => {
          // console.log('下架是否成功！', res.data);
          if (res.data == 1) {
            this.$message({
              showClose: true,
              message: '恭喜你！下架成功！',
              type: 'success'
            });
          } else {
            this.$message.error('抱歉！下架失败！');
          }
          this.SeeAllGoods();
        })
      },
      //删除
      removeOne(id) {
        //console.log('删除', id);
        let params = {
          gId: id,
        };
        axios.post("/api/goods/del_goods", params).then(res => {
          console.log('删除商品返回信息', res);
          if (res.data == 1) {
            this.$message({
              showClose: true,
              message: '恭喜你！删除成功！',
              type: 'success'
            });
          } else {
            this.$message.error('抱歉！删除失败！请重新删除！');
          }
          this.SeeAllGoods();
        });
      },
      //主图上传成功后的方法
      handleAvatarSuccess(res, file) {
        console.log("file" + file);
        console.log("res", res);
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log('imageUrl', URL.createObjectURL(file.raw));
        if (res.code == 200 | res.code == '200') {
          this.goodsForm.mainimgurl = res.filePath;
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
      //每页多少条改变
      handleSizeChange(val) {
        this.pageSize = val;
        this.SeeAllGoods();
        //console.log(`每页 ${val} 条`);
      },
      //当前页数改变
      handleCurrentChange(val) {
        this.currentPage = val;
        this.SeeAllGoods();
        //console.log(`当前页: ${val}`);
      },
    },
    filters: {
      sellnum: function (data) {
        if (data == null | data == '') {
          return 0;
        } else {
          return data;
        }
      },
    },
  }
</script>

<style scoped>
  #shopIndex {
    /*background-color: #fff;*/
  }
</style>
