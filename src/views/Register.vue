<template>
  <div class="page">

    <el-card class="box" shadow="always">
      <el-row class="title">
        <h2>注册</h2>
      </el-row>
      <el-form label-width="0" :model="registerForm" ref="registerForm" :rules="registerFormRules">
        <el-form-item prop="username">
          <i class="el-icon-user"></i>
          <el-input class="form-input" v-model="registerForm.username" placeholder="用户名">
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <i class="el-icon-user"></i>
          <el-input class="form-input" v-model="registerForm.password" placeholder="密码" show-password>
          </el-input>
        </el-form-item>
        
        <el-form-item prop="mail">
          <i class="el-icon-message"></i>
          <el-input class="form-input verifyCode" v-model="registerForm.mail" placeholder="邮箱">
          </el-input>
          <el-button type="primary" class="form-button btnCode" v-on:click="sendVertify(registerForm.mail)">发送验证码</el-button>
        </el-form-item>

        <el-form-item prop="vCode">
          <i class="el-icon-s-ticket"></i>
          <el-input class="form-input" v-model="registerForm.vCode" placeholder="验证码">
          </el-input>
        </el-form-item>

        <el-form-item class="register">
          <el-button type="info" v-on:click="toLogin" round>去登陆</el-button>
          <el-button type="primary" v-on:click="register('registerForm')" round>注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      registerForm:{
        username:'',
        password:'',
        mail:'',
        vCode:''
      },
      registerFormRules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required:true, message: '请输入密码', trigger: 'blur'},
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        mail:[
          { required:true, message: '请输入邮箱', trigger: 'blur'},
          { type:'email' , message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        vCode:[
          { required:true, message: '请输入验证码', trigger: 'blur'},
          { min: 6, max: 6, message: '验证码错误', trigger: 'blur' }
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
    register:function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/register",{
            "email": this.registerForm.mail,
            "vCode": this.registerForm.vCode,
            "username": this.registerForm.username,
            "password": this.registerForm.password
          })
          .then(res=>{
            if(res.data.code==0){
              window.alert("Register succeed, go to login and start stone.io")
                location = "/#/login";    
            }
            else{
              window.alert("Something wrong happened")
            }
          })
        }
      });
    },
    toLogin:function(){
      location = "/#/login";
    },
    sendVertify:function(mail){
      var verify_vCode = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
      if(verify_vCode.test(mail)){
        this.$axios.get("/verify?mail="+mail)
          .then(res=>{
              console.log(res.data)
          })  
      }
      else{
        window.alert("error mail")
      }
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
  margin-top: 100px;
  margin-left: 35%;
}

.title {
  text-align: center;
}

.form-input {
  width: 80%;
}

.verifyCode {
  width: 55%;
}

.el-icon-user {
  font-size: 25px;
  margin: 0 20px;
}

.el-icon-s-ticket {
  font-size: 25px;
  margin: 0 20px;
}

.el-icon-message {
  font-size: 25px;
  margin: 0 20px;
}

.btnCode {
  margin-left: 15px;
  padding: 11px;
}

.register {
  text-align: center;
}
</style>