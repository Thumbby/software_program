<template>
  <div>
    <Navbar />
    <el-col :span="3">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        style="min-height: 800px"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item v-for="item in documentList" :key="item.sequence" :index="item.sequence">          
            <span>{{item.title}}</span>
        </el-menu-item>
        <el-menu-item v-if="listLenght<=0" :disabled="true">暂无数据</el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from "../components/Navbar.vue";

export default {
  components: { Navbar },
  data() {
    var token = localStorage.getItem("token");
    return {
      oldName: "",
      title: "",
      description: "",
      limit: "",
      projecturl: "",
      etherId: "",
      updateTime: "",
      token: token,
      documentList: [],
      listLenght:0,
    };
  },
  mounted: function () {
    this.title = this.$route.params.name;
    this.oldName = this.$route.params.oldName;
    this.etherId=this.$route.params.etherId;
    this.getDocumentList();
  },
  methods: {
    getDocumentList() {
        axios
        .get("/api/v1/document/all", {
          headers: { Authorization: "Bearer " + this.token },
          params:{etherId:this.etherId,name:this.title}
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.documentList = res.data;
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.el-divider--vertical {
  display: inline-block;
  width: 1px;
  height: 100%;
  margin: 0 8px;
  vertical-align: middle;
  position: relative;
}
</style>