<template>
      <el-col :span="18" :offset="3">
        <el-card class="profile_card">
          <el-tabs v-model="activeTab">
            <el-tab-pane v-if="true" label="基本信息" name="first">
              <el-form :model="userForm" ref="userForm" label-width="80px">
                <el-form-item prop="avatar">
                  <el-avatar class="user_avatar"></el-avatar>
                </el-form-item>
                <el-form-item prop="etherId">
                  <p class="title">用户ID：{{userForm.etherId}}</p>
                </el-form-item>
                <el-form-item prop="username">
                  <h2 class="title" v-if="!whetherChange">{{userForm.userName}}</h2>
                  <el-input class="change_title" size="large" v-model="userForm.userName" placeholder="user.nickName" v-if="whetherChange"/>
                </el-form-item>
                <el-form-item label="邮箱" prop="mail">
                  <el-input class="input_form" v-model="userForm.mail" :disabled="true"/>
                </el-form-item>
                <el-form-item label="github" prop="github">
                  <el-input class="input_form" v-model="userForm.github" :disabled="!whetherChange">
                    <template slot="prepend">https://github.com/</template>
                  </el-input>
                </el-form-item>
                <el-form-item class="changeBtn">
                  <el-button type="primary" v-on:click="changeInfo" round v-if="!whetherChange">修改</el-button>
                  <el-button type="info" v-on:click="clearInfo" round v-if="whetherChange">清空</el-button>
                  <el-button type="primary" v-on:click="confirmChange" round v-if="whetherChange">确认</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
</template>

<script>
export default {
  name: "User",
  data(){
    return{
      whetherChange:false,
      userForm: {
        etherId:'1',
        userName: '小石头',
        avatar:'',
        mail:'',
        github: '',
      },
      activeTab: 'first'
    }
  },
  created() {
    this.userId=sessionStorage.getItem("userid");
    this.getUserInformation();
  },
  methods:{
    getUserInformation:function (){
    },
    changeInfo(){
      this.whetherChange=true;
    },
    confirmChange(){
      this.whetherChange=false;
      console.log(this.user)
    },
    clearInfo(){
      this.$refs["userForm"].resetFields();
    }
  }
}
</script>

<style scoped>

.profile_card {
  margin-top: 20px;
}

.user_avatar{
  left:50%;
}

.title{
  text-align:center;
}

.input_form{
  left:15%;
  width:70%;
}
.change_title{
  left:45%;
  width:10%;
}

.changeBtn{
  text-align:center;
}
</style>