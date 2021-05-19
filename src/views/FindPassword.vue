<template>
  <div class="page">

    <el-card class="box" shadow="always">
      <el-row class="title">
        <h2>找回密码</h2>
      </el-row>
      <el-form label-width="0" :model="findPasswordForm" ref="findPasswordForm" :rules="findPasswordFormRules">

        <el-form-item prop="password">
          <i class="el-icon-user"></i>
          <el-input class="form-input" v-model="findPasswordForm.password" placeholder="重设密码" show-password>
          </el-input>
        </el-form-item>

        <el-form-item prop="mail">
          <i class="el-icon-message"></i>
          <el-input class="form-input verifyCode" v-model="findPasswordForm.mail" placeholder="邮箱">
          </el-input>
          <el-button type="primary" class="form-button btnCode" v-on:click="sendVertify(findPasswordForm.mail)">发送验证码</el-button>
        </el-form-item>

        <el-form-item prop="vCode">
          <i class="el-icon-s-ticket"></i>
          <el-input class="form-input" v-model="findPasswordForm.vCode" placeholder="验证码">
          </el-input>
        </el-form-item>

        <el-form-item class="findPassword">
          <el-button type="info" v-on:click="toLogin" round>去登陆</el-button>
          <el-button type="primary" v-on:click="findPassword('findPasswordForm')" round>找回密码</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'findPassword',
  data() {
    return {
      findPasswordForm:{
        password:'',
        mail:'',
        vCode:''
      },
      findPasswordFormRules:{
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
    findPassword:function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/reset",{
            "email": this.findPasswordForm.mail,
            "vCode": this.findPasswordForm.vCode,
            "password": this.findPasswordForm.password
          })
          .then(res=>{
            if(res.data.code==0){
              window.alert("Password reset succeed!")
              //location="./login"
            }
            else{
              window.alert("Password reset failed!")
            }
          })
        }
      });
    },
    toLogin:function(){
      location="./login";
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

.findPassword {
  text-align: center;
}
</style>