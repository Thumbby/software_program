<template>
  <el-col span="8">
    <el-card class="box-card" shadow="hover" >
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
      <span @click="navToDoc">
        <el-tooltip class="item" effect="dark" content="编辑" placement="top">
          <i class="el-icon-edit-outline" style="font-size: 30px"></i>
        </el-tooltip>
      </span>
      <el-tooltip class="item" effect="dark" content="删除" placement="top">
        <i
          class="el-icon-delete-solid"
          style="font-size: 30px"
          @click="deletProject"
        ></i>
      </el-tooltip>
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
import axios from "axios";
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
      // DialogVisible: false,
      token: token,
    };
  },

  methods: {
    handleStar() {
      if (this.star) {
        axios
          .delete("/v1/bookmark", {
            params: { etherID: this.etherId, name: this.title },
            headers: { Authorization: "Bearer " + this.token },
          })
          .then((res) => {
            if (res.data.code == 0) {
              window.alert("取消收藏成功");
            }
          });
      } else {
        axios
          .post(
            "/v1/bookmark",
            {
              etherID: this.etherId,
              name: this.title,
            },
            {
              headers: { Authorization: "Bearer " + this.token },
            }
          )
          .then((res) => {
            if (res.data.code == 0) {
              window.alert("收藏成功");
            }
          });
      }
      this.star = !this.star;
    },

    // submitForm() {
    //   axios
    //     .put(
    //       "/v1/project",
    //       {
    //         oldName: this.oldName,
    //         name: this.title,
    //         description: this.description,
    //         limit: this.limit,
    //         repository: this.projecturl,
    //       },
    //       {
    //         headers: { Authorization: "Bearer " + this.token },
    //       },
    //       {
    //         headers: { Authorization: "Bearer " + this.token },
    //       }
    //     )
    //     .then((res) => {
    //       if (res.data.code == 0) {
    //         window.alert("修改成功");
    //         location.reload();
    //       }
    //     });
    // },

    deletProject() {
      axios
        .delete("/v1/project/" + this.title, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((res) => {
          if (res.data.code == 0) {
            window.alert("删除成功");
            location.reload();
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },

    navToDoc(){
      location="/doc"
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