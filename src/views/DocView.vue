<template>
  <div>
    <Navbar />
    <div class="navbar">
      <div class="navbar-item-blank-center">
        <h2 id="main_title">{{ this.title }}</h2>
      </div>
      <div style="margin-right: 10px">
        <span @click="editDialogVisible = true">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑项目"
            placement="top"
          >
            <i class="el-icon-s-tools" style="font-size: 30px"></i>
          </el-tooltip>
        </span>
        <span @click="infoDialogVisible = true">
          <el-tooltip
            class="item"
            effect="dark"
            content="项目信息"
            placement="top"
          >
            <i class="el-icon-info" style="font-size: 30px"></i>
          </el-tooltip>
        </span>
        <span @click="handleStar">
          <el-tooltip
            class="item"
            effect="dark"
            content="取消收藏(出现了bug)"
            placement="top"
            v-if="star"
          >
            <i class="el-icon-star-on" style="font-size: 30px"></i>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="收藏(出现了bug)"
            placement="left"
            v-if="!star"
          >
            <i class="el-icon-star-off" style="font-size: 30px"></i>
          </el-tooltip>
        </span>
      </div>
      <ApiTest/>
    </div>
    <div style="margin-top: 5px">
      <el-col :offset="22" :span="1" style="position: fixed">
        <span @click="dialogVisible = true">
          <el-tooltip
            class="item"
            effect="dark"
            content="新建文档"
            placement="left"
          >
            <i class="el-icon-circle-plus" style="font-size: 30px"></i>
          </el-tooltip>
        </span>

        <span @click="navToDoc" v-if="selectindex != -1">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑文档"
            placement="left"
          >
            <i class="el-icon-edit-outline" style="font-size: 30px"></i>
          </el-tooltip>
        </span>

        <span @click="deleteDoc" v-if="selectindex != -1">
          <el-tooltip
            class="item"
            effect="dark"
            content="删除文档"
            placement="left"
          >
            <i class="el-icon-delete-solid" style="font-size: 30px"></i>
          </el-tooltip>
        </span>
      </el-col>

      <el-col :span="3">
        <el-menu
          :default-active="selectindex.toString()"
          class="el-menu-vertical-demo"
          style="min-height: 800px"
          @select="handleSelect"
        >
          <el-menu-item
            v-for="item in documentList"
            :key="item.sequence"
            :index="item.sequence.toString()"
          >
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
          <el-menu-item v-if="listLength <= 0" :disabled="true"
            >暂无数据</el-menu-item
          >
        </el-menu>
      </el-col>
      <el-col :span="18" style="margin-left: 5px">
        <el-card v-if="docVisible" shadow="always" class="box">
          <div class="ql-container ql-snow">
            <h1 style="text-align: center">{{content.title}}</h1>
            <div class="text">
              <p>
                作者:{{ content.author }}
                <br />
                创建时间:{{ content.createTime }}
                <br />
                最近更新:{{ content.updateTime }}
              </p>
            </div>
            <div class="ql-editor" style="min-height: 300px">
              <div v-html="content.content"></div>
            </div>
          </div>
        </el-card>
        <h2 v-else style="margin-left:570px">无数据</h2>
      </el-col>
    </div>

    <el-dialog title="新建文档" :visible.sync="dialogVisible">
      <el-form :model="formData">
        <el-form-item label="文档名称" :label-width="formLabelWidth">
          <el-input
            v-model="formData.title"
            :placeholder="formData.content"
          ></el-input>
        </el-form-item>
        <el-form-item label="初始内容" :label-width="formLabelWidth">
          <el-input
            v-model="formData.content"
            :placeholder="formData.content"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="creatDoc">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑项目" :visible.sync="editDialogVisible">
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="项目名称">
          <el-input v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input v-model="description"></el-input>
        </el-form-item>
        <el-form-item label="项目地址">
          <el-input v-model="projecturl"></el-input>
        </el-form-item>
        <el-form-item label="项目类别">
          <span>
            <el-radio v-model="limit" label="public">公开</el-radio>
            <el-radio v-model="limit" label="private">私密</el-radio>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="deleteProject">删除项目</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editProject">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="项目信息" :visible.sync="infoDialogVisible" center width="30%">
      <div class="info-text">
        <span>项目名称:{{ title }}</span>
        <br />
        <span>项目拥有者:{{ etherId }}</span>
        <br />
        <span>项目描述:{{ description }}</span>
        <br />
        <span>项目地址:{{ projecturl }}</span>
        <br/>
        <span>项目类别:{{limit}}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import ApiTest from "../components/WorkBench/ApiTest"

export default {
  components: { Navbar ,ApiTest},
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
      listLength: 0,
      star: true,
      content: "文档空空如也",
      selectindex: -1,
      docVisible:false,
      dialogVisible: false,
      editDialogVisible: false,
      infoDialogVisible: false,
      formLabelWidth: "120px",
      formData: {
        etherId: "",
        name: "",
        title: "newDoc",
        content: "文档空空如也",
      },
    };
  },
  mounted: function () {
    this.title = this.$route.params.name;
    this.oldName = this.$route.params.oldName;
    this.etherId = this.$route.params.etherId;
    this.description = this.$route.params.description;
    this.limit = this.$route.params.limit;
    this.projecturl = this.$route.params.projecturl;
    this.formData.etherId = this.etherId;
    this.formData.name = this.title;
    this.getDocumentList();
  },
  methods: {
    getDocumentList() {
      axios
        .get("api/v1/document/all", {
          headers: { Authorization: "Bearer " + this.token },
          params: { etherID: this.etherId, name: this.title },
        })
        .then((res) => {
          console.log(res.data)
          if (res.data.code == 0) {
            this.documentList = res.data.data;
            if(this.documentList==null){
              this.listLength=0;
              this.docVisible=false;
            }
            else{
              this.docVisible=true;
              this.listLength = this.documentList.length;
              console.log(this.listLength)
              if (this.listLength > 0) {
                this.selectindex = this.documentList[0].sequence;
                this.getDocContent();
              }
            }
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },

    getDocContent() {
      axios
        .get("api/v1/document", {
          headers: { Authorization: "Bearer " + this.token },
          params: {
            etherID: this.etherId,
            name: this.title,
            sequence: this.selectindex,
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.content = res.data.data;
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },

    handleSelect(index,key) {
      console.log(index,key)
      this.selectindex = index;
      this.getDocContent();
    },

    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    handleStar() {
      if (this.star) {
        axios
          .delete("api/v1/bookmark", {
            params: { etherID: this.etherId, name: this.title },
            headers: { Authorization: "Bearer " + this.token },
          })
          .then((res) => {
            if (res.data.code == 0) {
              this.star = !this.star;
              console.log(this.star);
            }
          });
      } else {
        axios
          .post(
            "api/v1/bookmark",
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
              this.star = !this.star;
              console.log(this.star);
            }
          });
      }
    },

    editProject() {
      axios
        .put(
          "api/v1/project",
          {
            oldName: this.oldName,
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
            this.editDialogVisible = false;
            window.alert("修改成功");
            this.getDocumentList();
          }
        });
    },

    creatDoc() {
      axios
        .post("api/v1/document", this.formData, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.dialogVisible = false;
            window.alert("创建成功");
            this.getDocumentList();
          }
        });
    },

    deleteDoc() {
      axios
        .delete("api/v1/document", {
          headers: { Authorization: "Bearer " + this.token },
          params: {
            etherID: this.etherId,
            name: this.title,
            sequence: this.selectindex,
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            window.alert("删除成功");
            this.getDocumentList();
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },

    deleteProject() {
      axios
        .delete("api/v1/project/" + this.title, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((res) => {
          if (res.data.code == 0) {
            window.alert("删除成功");
            location = "/workBench";
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },

    navToDoc() {
      this.$router.push({
        path: "/doc",
        name: "doc",
        params: {
          oldName: this.oldName,
          description: this.description,
          limit: this.limit,
          projecturl: this.projecturl,
          name: this.title,
          etherId: this.etherId,
          sequence: this.selectindex,
        },
      });
    },
  },
};
</script>

<style>
.text {
  font-size: 14px;
  margin-bottom: 18px;
  text-align: right;
  color: darkgrey;
  margin-right: 10px;
}
.info-text {
  font-size: 14px;
  margin-bottom: 18px;
  text-align: left;
  margin-left: 10px;
}
</style>
<style scoped src="../assets/css/navbar.css">