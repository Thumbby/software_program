<template>
  <div>
    <Navbar />
    <div style="margin-top: 5px">
      <el-col :offset="22" :span="1" style="position: fixed">
        <span @click="dialogVisible = true">
          <el-tooltip
            class="item"
            effect="dark"
            content="新建"
            placement="left"
          >
            <i class="el-icon-circle-plus" style="font-size: 30px"></i>
          </el-tooltip>
        </span>
        <span @click="handleStar">
          <el-tooltip
            class="item"
            effect="dark"
            content="取消收藏(出现了bug)"
            placement="left"
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
        <span @click="navToDoc" v-if="index != -1">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="left"
          >
            <i class="el-icon-edit-outline" style="font-size: 30px"></i>
          </el-tooltip>
        </span>
        <el-tooltip class="item" effect="dark" content="删除" placement="left">
          <i
            class="el-icon-delete-solid"
            style="font-size: 30px"
            @click="deletProject"
          ></i>
        </el-tooltip>
      </el-col>

      <el-col :span="3">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          style="min-height: 800px"
          @select="handleSelect"
        >
          <el-menu-item
            v-for="item in documentList"
            :key="item.sequence"
            :index="item.sequence"
          >
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
          <el-menu-item v-if="listLength <= 0" :disabled="true"
            >暂无数据</el-menu-item
          >
        </el-menu>
      </el-col>
      <el-col :span="18" style="margin-left: 5px">
        <el-card shadow="always" class="box">
          <el-header class="title">{{ content.title }}</el-header>

          <div class="ql-container ql-snow">
            <div class="text">
              作者:{{ content.author }}
              <br />
              创建时间:{{ content.createTime }}
              <br />
              最近更新:{{ content.updateTime }}
            </div>
            <div class="ql-editor" style="min-height: 300px">
              <div v-html="content.content"></div>
            </div>
          </div>
        </el-card>
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
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
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
      listLength: 0,
      star: true,
      content: "文档空空如也",
      selectindex: -1,
      dialogVisible: false,
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
          if (res.data.code == 0) {
            this.documentList = res.data.data;
            console.log(this.documentList);
            this.listLength = this.documentList.length;
            if (this.listLength > 0) {
              this.selectindex = 1;
              this.getDocContent();
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
    handleSelect(index) {
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

    submitForm() {
      axios
        .post("api/v1/document", this.formData, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((res) => {
          if (res.data.code == 0) {
            window.alert("创建成功");
            this.getDocumentList;
          }
        });
    },

    deletProject() {
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
}
</style>