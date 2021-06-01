<template>
  <el-container class="home-container">
    <el-main>
      <!-- 导航栏 -->
      <Navbar />
      <div class="project-container">
        <Search-bar />
        <span @click="DialogVisible = true">
          <el-tooltip
            class="item"
            effect="dark"
            content="新建项目"
            placement="top"
          >
            <el-button
              icon="el-icon-circle-plus-outline"
              type="primary"
              class="add-button"
            />
          </el-tooltip>
        </span>
        <el-tabs v-model="activeName" @tab-click="handleClick" :tab-position="'left'" style="width: 1500px;">
          <el-tab-pane label="我的项目" name="first"
            ><el-row gutter="6">
              <Project-item
                v-for="project in projects"
                :key="project.name"
                v-bind:info="project"
              /> </el-row
          ></el-tab-pane>
          <el-tab-pane label="我的收藏" name="second"
            ><el-row gutter="6">
              <Project-item
                v-for="project in projects"
                :key="project.name"
                v-bind:info="project"
              /> </el-row
          ></el-tab-pane>
          <el-tab-pane label="搜索结果" name="third"
            ><el-row gutter="6">
              <Project-item
                v-for="project in projects"
                :key="project.name"
                v-bind:info="project"
              /> </el-row
          ></el-tab-pane>
        </el-tabs>

        <el-dialog
          title="新建项目"
          :visible.sync="DialogVisible"
          width="30%"
          center
        >
          <el-form
            :model="ruleForm"
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
            <el-form-item label="项目仓库">
              <el-input v-model="projecturl"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >立即创建</el-button
              >
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Navbar from "@/components/Navbar";
import ProjectItem from "@/components/WorkBench/ProjectItem";
import SearchBar from "../components/WorkBench/SearchBar.vue";
import axios from "axios";
import eventBus from "@/eventBus.js";
export default {
  name: "Console",
  props: ["data"],
  computed: {
    routeName() {
      const route = this.$route;
      const { meta } = route;
      return meta.name;
    },
  },
  components: {
    Navbar,
    ProjectItem,
    SearchBar,
  },
  data() {
    return {
      activeName:'first',
      DialogVisible: false,
      limit: "public",
      title: "",
      description: "",
      projects: null,
      token: null,
      projecturl: "",
      ruleForm: {
        title: "",
        description: "",
        limit: "public",
        projecturl: "",
      },
    };
  },

  methods: {
    logout: function () {
      sessionStorage.setItem("isLogin", false);
      sessionStorage.removeItem("userid");
      location = "/login";
    },
    submitForm() {
      axios
        .post(
          "/api/v1/project",
          {
            name: this.title,
            description: this.description,
            limit: this.limit,
            repository: this.projecturl,
          },
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        )
        .then((res) => {
          if (res.data.code == 0) {
            window.alert("创建成功");
            //刷新token
            this.DialogVisible = false;
            this.getProjects();
          } else if (res.data.code == 20304) {
            window.alert("已存在同名项目");
          }
        });
    },

    getProjects() {
      axios
        .get("/api/v1/user/project", {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.projects = res.data.data;
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    getBookmarks()
    {
      axios
        .get("/api/v1/bookmark/all", {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.projects = res.data.data;
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    handleClick() {
      if(this.activeName=='first')
      {
        this.getProjects();
      }
      else if(this.activeName=='second')
      {
        this.getBookmarks();
      }
    },
  },

  mounted() {
    this.token = localStorage.getItem("token");
    this.getProjects();
    eventBus.$on("info", (data) => {
      this.projects = data;
      this.activeName='third';
    });
  },
};
</script>

<style scoped>
.home-container {
  height: 100%;
}
.project-container {
  margin-top: 35px;
  margin-left: 5%;
}
.el-main {
  padding: 0;
}

.el-header {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
}

.create-box-card {
  width: 400px;
  height: 120px;
}
.add-button {
  font-size: 30px;
  margin-left: 15px;
  margin-top: 10px;
}
.tabs-box{
  width: 100%;
  margin-top: 10px;
}
</style>
