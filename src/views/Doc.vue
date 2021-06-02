<template>
  <div class="page">
    <div class="title-container">
      <h1 class="header">{{ this.title }}</h1>
    </div>
    <el-card shadow="always" class="box">
      <el-header class="title">{{ this.description }}</el-header>
      <el-button type="success" v-on:click="toSave">保存</el-button>
      <el-container class="doc-container">
        <el-main>
          <quill-editor
            class="editor"
            v-model="content"
            @change="onEditorChange($event)"
          >
          </quill-editor>
        </el-main>
        
      </el-container>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Doc",
  created() {
    this.name = this.$route.params.name;
    this.oldName = this.$route.params.oldName;
    this.etherId = this.$route.params.etherId;
    this.description = this.$route.params.description;
    this.limit = this.$route.params.limit;
    this.projecturl = this.$route.params.projecturl;
    this.sequence = this.$route.params.sequence;
    this.getDocContent();
  },
  data: function () {
    var token = localStorage.getItem("token");
    return {
      content: "",
      etherId: "",
      name: "",
      token: token,
      sequence: 1,
      title: "",
    };
  },
  methods: {
    onEditorChange() {
      //编辑器文本发生变化
      //this.content可以实时获取到当前编辑器内的文本内容
      console.log(this.content);
    },
    getDocContent() {
      axios
        .get("api/v1/document", {
          headers: { Authorization: "Bearer " + this.token },
          params: {
            etherID: this.etherId,
            name: this.name,
            sequence: this.sequence,
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.content = res.data.data.content;
            this.title=res.data.data.title;
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    toSave() {
      this.$axios({
        method: "put",
        url: "/api/v1/document",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          etherID: this.etherId,
          name: this.name,
          sequence: Number(this.sequence),
          title: this.title,
          content: this.content,
        },
      }).then((res) => {
        this.$router.push({
          path: "/docView",
          name: "docView",
          params: {
            oldName: this.oldName,
            name: this.name,
            etherId: this.etherId,
            description: this.description,
            limit: this.limit,
            projecturl: this.projecturl,
          },
        });
        console.log(res);
      });
    },
  },
};
</script>
<style scoped>
.page {
  width: 100%;
}
.box {
  width: 70%;
  margin-left: 15%;
  height: auto;
  text-align: center;
}
.doc-container {
  height: 650px;
}
.editor {
  height: 90%;
}
.header {
  text-align: center;
  margin-top: 80px;
}
.title {
  font-size: 20px;
}
.api-test {
  width: 97%;
  margin-left: 1.5%;
}
.api-info {
  margin-top: 20px;
  margin-bottom: 20px;
}
.api-descrip {
  margin-top: 20px;
  margin-bottom: 20px;
}
.api-params {
  margin-top: 20px;
  margin-bottom: 10px;
}
.operations {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>