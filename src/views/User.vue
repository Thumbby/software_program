<template>
      <el-col :span="18" :offset="3">
        <el-card class="profile_card">
          <el-tabs v-model="activeTab">
            <el-tab-pane v-if="true" label="基本信息" name="first">
              <el-form :model="userForm" ref="userForm">
                <el-form-item prop="avatar">
                  <el-col :span="2" :offset="10">
                    <el-avatar :size="100" :src="userForm.avatar">
                    </el-avatar>
                  </el-col> 
                </el-form-item>
                <el-form-item prop="etherID">
                  <p class="title">用户ID：{{userForm.etherId}}</p>
                </el-form-item>
                <el-form-item prop="username">
                  <h2 class="title" v-if="!whetherChange">{{userForm.username}}</h2>
                  <el-input class="change_title" size="large" v-model="userForm.username" placeholder="user.nickName" v-if="whetherChange"/>
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
        'Authorization': 'Bearer '+sessionStorage.getItem('token')
      }
    })
    .then(res=>{
      if(res.data.code=='10005'){
        location="./login";
      }
      else{
        if(res.data.token!=""){
          sessionStorage.setItem('token',res.data.token)
        }
        console.log(res.data.data.avatar)
        this.userForm.username=res.data.data.username
        this.userForm.etherId=res.data.data.etherId
        this.userForm.mail=res.data.data.email
        this.userForm.github=res.data.data.github
        this.userForm.avatar=res.data.data.avatar
      }
    })
    console.log(this.userForm)
  },
  methods:{
    getUserInformation:function (){
    },
    changeInfo(){
      this.whetherChange=true;
      console.log(sessionStorage.getItem('token'))
    },
    confirmChange(){
      this.whetherChange=false;
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
</style>