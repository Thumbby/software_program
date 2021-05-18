<template>
      <el-col :span="18" :offset="3">
        <el-card class="profile_card">
          <el-tabs v-model="activeTab">
            <el-tab-pane v-if="true" label="基本信息" name="first">
              <el-form :model="userForm" ref="userForm">
                <el-form-item prop="avatar">
                  <el-col :span="2" :offset="10">
                    <el-upload
                      class="avatar-uploader"
                      action="localhost">
                    <img :src="userForm.avatar" class="avatar">
                    </el-upload>
                  </el-col> 
                </el-form-item>
                <el-form-item prop="etherID">
                  <p class="title">用户ID：{{userForm.etherId}}</p>
                </el-form-item>
                <el-form-item prop="username">
                  <h2 class="title" v-if="!whetherChange">{{userForm.username}}</h2>
                  <el-input class="change_title" size="large" v-model="userForm.username" placeholder="userForm.nickName" v-if="whetherChange"/>
                </el-form-item>
                <el-form-item label="邮箱" prop="mail">
                  <el-input class="input_form" v-model="userForm.mail" :disabled="!whetherChange"/>
                </el-form-item>
                <el-form-item label="github" prop="github">
                  <el-input class="input_form" v-model="userForm.github" :disabled="!whetherChange">
                    <template slot="prepend">https://github.com/</template>
                  </el-input>
                </el-form-item>
                <el-form-item class="changeBtn">
                  <el-button type="primary" v-on:click="changeInfo" round v-if="!whetherChange">修改</el-button>
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
        etherId:'wrong user',
        username: 'wrong user',
        avatar:'',
        mail:'',
        github: '',
      },
      activeTab: 'first'
    }
  },
  created() {
    this.$axios({
      method:'get',
      url:'/v1/user/info',
      headers:{
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }
    })
    .then(res=>{
      if(res.data.code=='10005'){
        window.alert("Token Expired")
        location="./login";
      }
      else{
        if(res.data.token!=""){
          localStorage.setItem('token',res.data.token)
        }
        this.userForm.username=res.data.data.username
        this.userForm.etherId=res.data.data.etherId
        this.userForm.mail=res.data.data.email
        this.userForm.github=res.data.data.github
        this.userForm.avatar=res.data.data.avatar
      }
    })
  },
  methods:{
    changeInfo(){
      this.whetherChange=true;
    },
    confirmChange(){
      this.whetherChange=false;
      this.$axios({
        method:'post',
        url:'/v1/user/info',
        headers:{
        'Authorization': 'Bearer '+localStorage.getItem('token')
        },
        data:{
          "avatar": this.userForm.avatar,
          "email": this.userForm.mail,
          "etherId": this.userForm.etherId,
          "github": this.userForm.github,
          "username": this.userForm.github
        }
      })
    }
  }
}
</script>

<style scoped>

.profile_card {
  margin-top: 20px;
}

.title{
  text-align:center;
}

/deep/.el-avatar{
  margin-left:30px;
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

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>