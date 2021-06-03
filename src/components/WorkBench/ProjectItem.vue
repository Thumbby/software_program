<template>
  <el-col :span="8">
    <el-card class="box-card" shadow="hover" @click.native="navToDoc">
      <template #header>
        <div class="card-header">
          <span>{{ name }}</span>
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
        创建时间:{{ createTime}}
        <br />
        {{ updateTime }}
        <br />
        状态:{{ state }}
      </div>
    </el-card>

  </el-col>
</template>

<script>

export default {
  props: ["info"],
  data() {
    var token = localStorage.getItem("token");
    return {
      token: token,
      name: this.info.name,
      description: this.info.description,
      limit: this.info.limit,
      etherId: this.info.etherId,
      updateTime: this.info.updateTime,
      createTime: this.info.createTime,
      state: this.info.state,
      toDocViewParams:null
    };
  },
  methods: {
    navToDoc() {
      this.toDocViewParams={
        name:this.name,
        etherId:this.etherId,
      }
      localStorage.setItem("toDocViewParams",JSON.stringify(this.toDocViewParams))
      this.$router.push({
        path: "/docView",
        name: "docView",
        params: this.toDocViewParams,
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