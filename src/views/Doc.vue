<template>
  <div class="page">
    <NavBar/>
    <div class="title-container">
        <el-input v-if="title_change" v-model="title" placeholder="title" style="width:20%"/>
        <br v-if="title_change"/>
        <h2 v-if="!title_change">{{title}}</h2>
        <i class="el-icon-document" v-if="!title_change" @click="handleTitleChange"/>
        <i class="el-icon-check" v-if="title_change" @click="handleTitleChange"/>
    </div>
    <el-card shadow="always" class="box">
      <el-button type="success" v-on:click="toSave">保存</el-button>
      <el-button type="info" v-on:click="quit">退出</el-button>
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
      <span>{{content_length}}/60000字</span>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "@/components/Navbar"
export default {
  name: "Doc",
  components:{
    NavBar,
  },
  created() {
    if(JSON.stringify(this.$route.params)=="{}"){
      var paramsData=JSON.parse(localStorage.getItem('toDocParams'))
      this.name = paramsData.name;
      this.oldName = paramsData.name;
      this.etherId = paramsData.etherId;
      this.sequence = paramsData.sequence;
    }
    else{
      this.name = this.$route.params.name;
      this.oldName = this.$route.params.name;
      this.etherId = this.$route.params.etherId;
      this.sequence = this.$route.params.sequence;
    }
    this.getDocContent();
  },
  data: function () {
    var token = localStorage.getItem("token");
    return {
      content: "",
      content_length:0,
      etherId: "",
      name: "",
      token: token,
      sequence: 1,
      title: "",
      title_change:false,
    };
  },
  methods: {
    onEditorChange(event) {
      //编辑器文本发生变化
      //this.content可以实时获取到当前编辑器内的文本内容
      event.quill.deleteText(60000,4)
      if(this.content==''){
        this.content_length=0;
      }
      else{
        this.content_length=event.quill.getLength()-1;
      }
    },
    getDocContent() {
      axios
        .get("/v1/document", {
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
            this.content_length = res.data.data.content.length;
            this.title=res.data.data.title;
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    handleTitleChange(){
      this.title_change=!this.title_change;
    },
    quit(){
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
    },
    toSave() {
      this.$axios({
        method: "put",
        url: "/v1/document",
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
  text-align: center;
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
.title-container {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>