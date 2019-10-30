<template>
  <div id="add">
    <div class="width1024">
      <div class="blockDiv blockDivTop">
        <el-form :model="reportForm" :rules="rules" ref="reportForm" label-width="10px">
          <el-form-item label="">
            <el-col :span="24">
              <span class="form_item_title">
                1.你喜欢安静懒得说话嘛？
              </span>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="a">
                <el-radio-group v-model="reportForm.a" v-for="item in aa" :key="item.value">
                  <el-radio :label="item.value" style="margin-right: 20px;">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="">
            <el-col :span="24">
             <span class="form_item_title">
                2.你面色晦暗或容易出现褐斑嘛？
             </span>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="b">
                <el-radio-group v-model="reportForm.b" v-for="item in bb" :key="item.value">
                  <el-radio :label="item.value" style="margin-right: 20px;">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "add",
    data() {
      return {
        reportForm: {
          a: '',
          b: '',
          c: '',
          d: '',
          e: '',

        },
        aa: [
          {
            label: '没有',
            value: 0,
          },
          {
            label: '很少',
            value: 1,
          },
          {
            label: '有时',
            value: 2,
          },
          {
            label: '经常',
            value: 3,
          },
          {
            label: '总是',
            value: 4,
          },
        ],
        bb: [
          {
            label: '根本不',
            value: 0,
          },
          {
            label: '很少',
            value: 1,
          },
          {
            label: '有时',
            value: 2,
          },
          {
            label: '经常',
            value: 3,
          },
          {
            label: '总是',
            value: 4,
          },
        ],
        cc: [],
        dd: [],
        ee: [],
        ff: [],
        rules: [],
      }
    },
    mounted() {
    },
    methods: {},
    computed: {},
    filters: {},
  }
</script>

<style scoped>
  .form_item_title {
    font-size: 16px;
    font-weight: bolder;
  }
</style>
