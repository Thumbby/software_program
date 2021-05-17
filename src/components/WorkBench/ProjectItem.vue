<template>
  <el-col span="8">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
          <span @click="handleProtectClick">
            <i
              class="el-icon-unlock"
              style="font-size: 30px"
              v-if="!protect"
            ></i>
            <i class="el-icon-lock" style="font-size: 30px" v-if="protect"></i>
          </span>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text">
        {{ description }}
      </div>
      <el-tooltip class="item" effect="dark" content="分享" placement="top">
        <i class="el-icon-share" style="font-size: 30px"></i>
      </el-tooltip>
      <span @click="handleStar">
        <el-tooltip
          class="item"
          effect="dark"
          content="取消收藏"
          placement="top"
          v-if="star"
        >
          <i class="el-icon-star-on" style="font-size: 30px"></i>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="收藏"
          placement="top"
          v-if="!star"
        >
          <i class="el-icon-star-off" style="font-size: 30px"></i>
        </el-tooltip>
      </span>
      <span @click="DialogVisible = true">
        <el-tooltip class="item" effect="dark" content="编辑" placement="top">
          <i class="el-icon-edit-outline" style="font-size: 30px"></i>
        </el-tooltip>
      </span>
      <el-tooltip class="item" effect="dark" content="删除" placement="top">
        <i class="el-icon-delete-solid" style="font-size: 30px"></i>
      </el-tooltip>
    </el-card>
    <el-dialog
      title="编辑项目"
      :visible.sync="DialogVisible"
      width="30%"
      center
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="项目名称">
          <el-input v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input v-model="description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-col>
</template>

<script>
export default {
  data() {
    return {
      title: "测试项目",
      description: "test",
      protect: false,
      star: true,
      DialogVisible: false,
    };
  },

  methods: {
    handleProtectClick() {
      this.protect = !this.protect;
    },
    handleStar() {
      this.star = !this.star;
    },

    submitForm(formName) {
        this.$refs[formName].resetFields();
        this.DialogVisible = false;

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.DialogVisible = false;
      }
  },
};
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
  margin-bottom: 18px;
}

.el-card__header {
  padding: 18px 20px;
  border-bottom: 3px solid #ebeef5;
  box-sizing: border-box;
}
.box-card {
  width: 440px;
  border: 3px solid #ebeef5;
}

.item {
  margin-top: 5px;
  margin-left: 40px;
  margin-bottom: 10px;
}
</style>