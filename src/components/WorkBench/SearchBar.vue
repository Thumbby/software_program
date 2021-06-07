<template>
  <div class="searchBarContainer">
    <div class="searchBox">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="input"
        style="width: 80%"
      >
      </el-input>
      <el-button type="primary" @click="search()">搜索</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import eventBus from "@/eventBus.js";
export default {
  data() {
    var token = localStorage.getItem("token");
    return {
      input: "",
      token: token,
    };
  },
  methods: {
    search() {
      axios
        .get("/v1/project", {
          params: { search: this.input },
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((res) => {
          if (res.data.code == 0) {
            eventBus.$emit("info", res.data.data);
          }
        })
        .catch((erro) => {
          console.log(erro);
        });
    },
  },
};
</script>

<style>
.searchBarContainer {
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0px 3px 5px rgba(0, 25, 25, 0.4);
  height: 80%;
  width: 80%;
  margin-left: 140px;
  margin-bottom: 20px;
  float: left;
}
.searchBox {
  margin-top: 20px;
  margin-left: 100px;
  height: 60px;
  width: 90%;
}
</style>