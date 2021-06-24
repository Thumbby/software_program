<template>

  <div class="page">

    <div class="title-container">
      <h1 class="header">欢迎使用石头文档</h1>
    </div>

    <el-card class="box" shadow="always">
      <el-row class="title">
        <h2>登录</h2>
      </el-row>
      <el-form label-width="0" :model="loginForm" ref="loginForm" :rules="loginFormRules">
        <el-form-item prop="username">
          <i class="el-icon-user"></i>
          <el-input class="form-input" v-model="loginForm.mail" placeholder="账号邮箱">
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <i class="el-icon-user"></i>
          <el-input class="form-input" v-model="loginForm.password" placeholder="账号密码" show-password>
          </el-input>
        </el-form-item>
        
        <el-form-item class="login">
          <el-button type="primary" class="form-button" v-on:click="login('loginForm')" round id="login">登录</el-button>
        </el-form-item>

        <el-form-item class="register">
          <el-button type="info" size="mini" class="form-button" v-on:click="findPassword" round id="forget">忘记密码?</el-button>
          <el-button type="info" size="mini" class="form-button" v-on:click="toRegister" round id="register">注册账号</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  name: "Login",
  data(){
    return {
      loginForm:{
        mail:'',
        password:'',
      },
      loginFormRules:{
        mail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type:'email' , message: '请输入正确的邮箱', trigger: 'blur' }
          ],
        password: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    document.querySelector('body').setAttribute('style', 'background-color: aliceblue')
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
  methods:{
    login:function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/login",{
            "emailOrEtherId": this.loginForm.mail,
            "password": this.loginForm.password
          })
          .then(res=>{
            if(res.data.code==0){
              window.alert("login succeed")
              localStorage.setItem('token',res.data.data.token)
              location = "/#/workBench";
            }
            else{
              window.alert("Login failed")
            }
          })
          .catch((err)=>{
              console.log(err.response)
            })
        }
      });
    },
    toRegister:function() {
      location = "/#/register";
    },
    findPassword:function(){
      location = "/#/findPassword";
    }
  }
}
</script>

<style scoped>

.page {
  width: 100%;
}

.box {
  width: 30%;
  margin-top: 50px;
  margin-left: 35%;
}

.header {
  text-align: center;
  margin-top: 80px;
}

.title {
  text-align: center;
}

.form-input {
  width: 80%;
}

.el-icon-user {
  font-size: 25px;
  margin: 0 20px;
}

.el-icon-s-goods {
  font-size: 25px;
  margin: 0 20px;
}

.login {
  text-align: center;
}

.register {
  text-align: center;
}

</style>