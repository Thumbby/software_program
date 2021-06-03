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
        <div class="sort_radio" style="text-align:center; margin-top:5%; margin-bottom:5%">
          <el-radio-group v-model="sort_method" @change="change_sort_method">
            <el-radio label="create_date">按创建时间排序</el-radio>
            <el-radio label="update_date">按更改时间排序</el-radio>
          </el-radio-group>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick" :tab-position="'left'" style="width: 1500px;">
          <el-tab-pane label="我的项目" name="first"
            ><el-row :gutter="6">
              <Project-item
                v-for="project in projects"
                :key="project.name"
                v-bind:info="project"
              /> </el-row
          ></el-tab-pane>
          <el-tab-pane label="我的收藏" name="second"
            ><el-row :gutter="6">
              <Project-item
                v-for="project in projects"
                :key="project.name"
                v-bind:info="project"
              /> </el-row
          ></el-tab-pane>
          <el-tab-pane label="搜索结果" name="third"
            ><el-row :gutter="6">
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
              <el-input v-model="submitInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="项目描述">
              <el-input v-model="submitInfo.description"></el-input>
            </el-form-item>
            <el-form-item label="项目类别">
              <span>
                <el-radio v-model="submitInfo.limit" label="public">公开</el-radio>
                <el-radio v-model="submitInfo.limit" label="private">私密</el-radio>
              </span>
            </el-form-item>
            <el-form-item label="项目仓库">
              <el-input v-model="submitInfo.repository"></el-input>
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
/*排序算法*/
var compare_by_create = function(obj1,obj2){
  var val1=obj1.createUnix;
  var val2=obj2.createUnix;
  if(val1<val2){
    return -1;
  }
  else if(val1>val2){
    return 1;
  }
  else{
    return 0;
  }
}
var compare_by_update = function(obj1,obj2){
  var val1=obj1.updateUnix;
  var val2=obj2.updateUnix;
  if(val1>val2){
    return -1;
  }
  else if(val1<val2){
    return 1;
  }
  else{
    return 0;
  }
}
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
      token: null,
      projects: null,
      sort_method:'',
      activeName:'first',
      DialogVisible: false,
      submitInfo:{
        name: "",
        description: "",
        limit: "public",
        repository: "",
      },
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
    sort(method){
      if(method=='update_date'){
          this.projects.sort(compare_by_update)
        }
      else{
          this.projects.sort(compare_by_create)
      }
    },
    change_sort_method(method){
      this.sort(method)
      console.log(this.projects)
    },
    submitForm() {
      axios
        .post(
          "/api/v1/project",
          {
            name: this.submitInfo.name,
            description: this.submitInfo.description,
            limit: this.submitInfo.limit,
            repository: this.submitInfo.repository,
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
            this.sort(this.sort_method);
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
            this.sort(this.sort_method);
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
