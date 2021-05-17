<template>
  <el-container class="home-container">
    <el-main>
      <!-- 导航栏 -->
      <Navbar />
      <div class="project-container">
        <Search-bar/>
        <el-row gutter="6"> 
          <Project-item />
          <Project-item />
          <Project-item />
          <Project-item />
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Navbar from "@/components/Navbar";
import ProjectItem from "@/components/WorkBench/ProjectItem";
import SearchBar from '../components/WorkBench/SearchBar.vue';
export default {
  name: "Console",
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
      // 左侧菜单
      menuList: [],
    };
  },

  methods: {
    logout: function () {
      sessionStorage.setItem("isLogin", false);
      sessionStorage.removeItem("userid");
      location = "/login";
    },
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

.el-aside {
}

.el-main {
  /* background-color: azure; */
}
.create-box-card {
  width: 400px;
  height: 120px;
}
</style>
