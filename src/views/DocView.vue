<template>
  <div>
    <Navbar />
    <div class="navbar">
      <MemberMangementBlock
        v-bind:info="projectInfo.name"
        style="margin-left:2%"/>
      <ApiTest/>
      <div class="navbar-item-blank-center" style="text-align:center; margin-left:12%">
        <h2 id="main_title">{{ projectInfo.name }}</h2>
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
        <span @click="handleState">
          <el-tooltip
            class="item"
            effect="dark"
            content="设置项目为已完成"
            placement="top"
            v-if="judegState(projectInfo.state)">
            <i class="el-icon-check" style="font-size: 30px"></i>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="设置项目为进行中"
            placement="top"
            v-if="!judegState(projectInfo.state)">
            <i class="el-icon-close" style="font-size: 30px"></i>
          </el-tooltip>
        </span>

        <span @click="handleStar">
          <el-tooltip
            class="item"
            effect="dark"
            content="取消收藏(出现了bug)"
            placement="top"
            v-if="projectInfo.star"
          >
            <i class="el-icon-star-on" style="font-size: 30px"></i>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="收藏(出现了bug)"
            placement="top"
            v-if="!projectInfo.star"
          >
            <i class="el-icon-star-off" style="font-size: 30px"></i>
          </el-tooltip>
        </span>
      </div>
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
            v-for="item in projectInfo.documentList"
            :key="item.sequence"
            :index="item.sequence.toString()"
          >
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
          <el-menu-item v-if="projectInfo.listLength <= 0" :disabled="true"
            >暂无数据</el-menu-item
          >
        </el-menu>
      </el-col>
      <el-col :span="18" style="margin-left: 5px">
        <el-card v-if="docVisible" shadow="always" class="box" style="min-height:800px;">
            <h1 style="text-align: center">{{currentContent.title}}</h1>
            <div class="text">
              <p>
                作者:{{ currentContent.author }}
                <br />
                创建时间:{{ currentContent.createTime }}
                <br />
                最近更新:{{ currentContent.updateTime }}
              </p>
            </div>
              <div v-html="currentContent.content"></div>
        </el-card>
        <h2 v-else style="margin-left:570px">暂无数据</h2>
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
          <el-input v-model="projectInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input v-model="projectInfo.description"></el-input>
        </el-form-item>
        <el-form-item label="项目地址">
          <el-input v-model="projectInfo.repository"></el-input>
        </el-form-item>
        <el-form-item label="项目类别">
          <span>
            <el-radio v-model="projectInfo.limit" label="public">公开</el-radio>
            <el-radio v-model="projectInfo.limit" label="private">私密</el-radio>
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
        <span>项目名称:{{ projectInfo.name }}</span>
        <br />
        <span>项目拥有者:{{ etherId }}</span>
        <br />
        <span>项目描述:{{ projectInfo.description }}</span>
        <br />
        <span>项目地址:{{ projectInfo.repository }}</span>
        <br/>
        <span>项目类别:{{projectInfo.limit}}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import ApiTest from "../components/WorkBench/ApiTest"
import MemberMangementBlock from "../components/WorkBench/MemberManage"

export default {
  components: { Navbar ,ApiTest, MemberMangementBlock},
  data() {
    var token = localStorage.getItem("token");
    return {
      etherId: "",
      token: token,
      projectInfo:{
        oldName: "",
        name: "",
        description: "",
        limit: "",
        repository: "",
        updateTime: "",
        documentList: [],
        listLength: 0,
        star: true,
        state:""
      },
      currentContent: null,
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
      toDocParams:null,
    };
  },
  created() {
    if(JSON.stringify(this.$route.params) == "{}"){
      var localParams=JSON.parse(localStorage.getItem("toDocViewParams"))
      this.projectInfo.name = localParams.name;
      this.projectInfo.oldName = localParams.name;
      this.etherId = localParams.etherId;
      this.formData.etherId = localParams.etherId;
      this.formData.name = localParams.name;
    }
    else{
      this.projectInfo.name = this.$route.params.name;
      this.projectInfo.oldName = this.$route.params.name;
      this.etherId = this.$route.params.etherId;
      this.formData.etherId = this.$route.params.etherId;
      this.formData.name = this.$route.params.name;
    }
    this.$axios({
      method:'get',
      url:'/api/v1/project/'+this.etherId+'/'+this.projectInfo.name,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res)=>{
      this.projectInfo.description=res.data.data.description
      this.projectInfo.limit=res.data.data.limit
      this.projectInfo.repository=res.data.data.repository
      this.projectInfo.state=res.data.data.state
    })
    this.getDocumentList();
  },
  methods: {
    getDocumentList() {
      axios
        .get("api/v1/document/all", {
          headers: { Authorization: "Bearer " + this.token },
          params: { etherID: this.etherId, name: this.projectInfo.name },
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.projectInfo.documentList = res.data.data;
            if(this.projectInfo.documentList==null){
              this.projectInfo.listLength=0;
            }
            else{
              this.projectInfo.listLength = this.projectInfo.documentList.length;
              this.selectindex = this.projectInfo.documentList[0].sequence;
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
      axios.get("api/v1/document", {
          headers: { Authorization: "Bearer " + this.token },
          params: {
            etherID: this.etherId,
            name: this.projectInfo.name,
            sequence: this.selectindex,
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.docVisible=true;
            this.currentContent = res.data.data;
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

    handleState(){
      axios({
        method:'patch',
        url:'/api/v1/project/state',
        params:{name:this.projectInfo.name},
        headers: { Authorization: "Bearer " + this.token },
      })
      .then((res)=>{
        if(res.data.code=='0'){
          this.projectInfo.state=!this.projectInfo.state
        }
      })
    },
    judegState(state){
      if(state=="进行中")return true;
      else return false;
    },

    handleStar() {
      if (this.projectInfo.star) {
        axios
          .delete("api/v1/bookmark", {
            params: { etherID: this.etherId, name: this.projectInfo.name },
            headers: { Authorization: "Bearer " + this.token },
          })
          .then((res) => {
            if (res.data.code == 0) {
              this.projectInfo.star = !this.projectInfo.star;
            }
          });
      } else {
        axios
          .post(
            "api/v1/bookmark",
            {
              etherID: this.etherId,
              name: this.projectInfo.name,
            },
            {
              headers: { Authorization: "Bearer " + this.token },
            }
          )
          .then((res) => {
            if (res.data.code == 0) {
              this.projectInfo.star = !this.projectInfo.star;
            }
          });
      }
    },

    editProject() {
      axios
        .put(
          "api/v1/project",
          {
            oldName: this.projectInfo.oldName,
            name: this.projectInfo.name,
            description: this.projectInfo.description,
            limit: this.projectInfo.limit,
            repository: this.projectInfo.repository,
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
            name: this.projectInfo.name,
            sequence: this.selectindex,
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            window.alert("删除成功");
            this.getDocumentList();
            this.getDocContent();
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },

    deleteProject() {
      axios
        .delete("api/v1/project/" + this.projectInfo.name, {
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
      this.toDocParams={
        name: this.projectInfo.name,
        etherId: this.etherId,
        sequence: this.selectindex,
      },
      localStorage.setItem('toDocParams',JSON.stringify(this.toDocParams))
      this.$router.push({
        path: "/doc",
        name: "doc",
        params: this.toDocParams,
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