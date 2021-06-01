<template>
  <el-col span="8">
    <el-card class="box-card" shadow="hover" @click.native="navToDoc">
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
          <span>
            <i
              class="el-icon-unlock"
              style="font-size: 30px"
              v-if="limit === 'public'"
            ></i>
            <i
              class="el-icon-lock"
              style="font-size: 30px"
              v-if="limit === 'private'"
            ></i>
          </span>
        </div>
      </template>
      <div class="text">
        项目拥有者:{{ etherId }}
        <br />
        项目描述:{{ description }}
        <br />
        {{ updateTime }}
      </div>
    </el-card>
    <!-- <el-dialog
      title="编辑项目"
      :visible.sync="DialogVisible"
      width="30%"
      center
    >
      <el-form
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
        <el-form-item label="项目类别">
          <span>
            <el-radio v-model="limit" label="public">公开</el-radio>
            <el-radio v-model="limit" label="private">私密</el-radio>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
  </el-col>
</template>

<script>

export default {
  props: ["info"],
  data() {
    var token = localStorage.getItem("token");
    return {
      oldName: this.info.name,
      title: this.info.name,
      description: this.info.description,
      limit: this.info.limit,
      projecturl: this.info.projecturl,
      etherId: this.info.etherId,
      star: true,
      updateTime: this.info.updateTime,
      // DialogVisible: false,
      token: token,
    };
  },

  methods: {
    navToDoc() {
      this.$router.push({
        path: "/docView",
        name: "docView",
        params: {
          oldName: this.oldName,
          name: this.title,
          etherId: this.etherId,
          description: this.info.description,
          limit: this.info.limit,
          projecturl: this.info.projecturl,
        },
      });
    },
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