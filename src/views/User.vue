<template>
  <div>
    <Navbar />
    <el-col :span="18" :offset="3">
      <el-card class="profile_card">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="基本信息" name="info">
            <el-form :model="userForm" ref="userForm">
              <el-form-item>
                <el-col :span="2" :offset="10">
                  <el-upload class="avatar-uploader" action="localhost">
                    <img :src="userForm.avatar" class="avatar" />
                  </el-upload>
                </el-col>
              </el-form-item>
              <el-form-item prop="etherID">
                <p class="title">用户ID：{{ userForm.etherId }}</p>
              </el-form-item>
              <el-form-item prop="username">
                <h2 class="title" v-if="!user_info_change">
                  {{ userForm.username }}
                </h2>
                <el-input
                  class="change_title"
                  size="large"
                  v-model="userForm.username"
                  placeholder="userForm.username"
                  v-if="user_info_change"
                />
              </el-form-item>
              <el-form-item label="github" prop="github">
                <el-input
                  class="input_github"
                  v-model="userForm.github"
                  :disabled="!user_info_change"
                >
                  <template slot="prepend">https://github.com/</template>
                </el-input>
              </el-form-item>
              <el-form-item class="changeBtn">
                <el-button
                  type="primary"
                  class="infoBtn"
                  v-on:click="change_userInfo"
                  round
                  v-if="!user_info_change"
                  >修改个人信息</el-button
                >
                <el-button
                  type="info"
                  class="infoBtn"
                  v-on:click="cancel_userInfo_change"
                  round
                  v-if="user_info_change"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  class="infoBtn"
                  v-on:click="confirm_userInfo_change"
                  round
                  v-if="user_info_change"
                  >确认</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人邮箱" name="email">
            <el-form :model="userMail" ref="userMail" :rules="userMailRules">
              <el-form-item label="邮箱" prop="mail">
                <el-input
                  class="input_mail"
                  v-model="userMail.mail"
                  :disabled="!user_mail_change"
                />
                <el-button
                  type="info"
                  class="vCodeBtn"
                  v-on:click="sendVertify(userMail.mail)"
                  :disabled="!is_vCode_click"
                  >发送验证码</el-button
                >
              </el-form-item>
              <el-form-item label="输入验证码" prop="vCode">
                <el-input
                  class="input_vCode"
                  v-model="userMail.vCode"
                  placeholder="请输入验证码"
                >
                </el-input>
              </el-form-item>
              <el-form-item class="changeBtn">
                <el-button
                  type="primary"
                  class="changMailBtn"
                  v-on:click="change_mail"
                  round
                  v-if="!user_mail_change"
                  >更改邮箱</el-button
                >
                <el-button
                  type="info"
                  class="changMailBtn"
                  v-on:click="cancel_change_mail"
                  round
                  v-if="user_mail_change"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  class="changMailBtn"
                  v-on:click="confirm_change_mail"
                  round
                  v-if="user_mail_change"
                  >确认新邮箱</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="passwd">
            <el-form
              :model="userPassword"
              ref="userPassword"
              :rules="userPasswordRules"
            >
              <el-form-item label="新密码" prop="password">
                <el-input
                  class="input_password"
                  v-model="userPassword.password"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="mail">
                <el-input
                  class="input_mail"
                  v-model="userPassword.mail"
                  :disabled="!user_mail_change"
                />
                <el-button
                  type="info"
                  class="vCodeBtn"
                  v-on:click="sendVertify(userPassword.mail)"
                  :disabled="!is_vCode_click"
                  >发送验证码</el-button
                >
              </el-form-item>
              <el-form-item label="输入验证码" prop="vCode">
                <el-input
                  class="input_vCode"
                  v-model="userPassword.vCode"
                  placeholder="请输入验证码"
                >
                </el-input>
              </el-form-item>
              <el-form-item class="changeBtn">
                <el-button
                  type="primary"
                  class="passwdBtn"
                  v-on:click="change_password"
                  round
                  v-if="!user_password_change"
                  >修改密码</el-button
                >
                <el-button
                  type="info"
                  class="passwdBtn"
                  v-on:click="cancel_password_change"
                  round
                  v-if="user_password_change"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  class="passwdBtn"
                  v-on:click="confirm_password_change"
                  round
                  v-if="user_password_change"
                  >确认新密码</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "User",
  components: {
    Navbar,
  },
  data() {
    return {
      user_info_change: false,
      is_vCode_click: true,
      user_password_change: false,
      user_mail_change: false,
      userForm: {
        avatar: "",
        etherId: "wrong user",
        username: "wrong user",
        github: "",
        old_username: "",
        old_github: "",
      },
      userMail: {
        vCode: "",
        mail: "",
        oldmail: "",
      },
      userMailRules: {
        vCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "验证码错误", trigger: "blur" },
        ],
        mail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱", trigger: "blur" },
        ],
      },
      userPassword: {
        password: "",
        vCode: "",
        mail: "",
      },
      userPasswordRules: {
        vCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "验证码错误", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      activeTab: "info",
    };
  },
  created() {
    this.$axios({
      method: "get",
      url: "/api/v1/user/info",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.data.code == "10005") {
        window.alert("Token Expired");
        location = "./login";
      } else {
        if (res.data.token != "") {
          localStorage.setItem("token", res.data.token);
        }
        this.userForm.username = res.data.data.username;
        this.userForm.etherId = res.data.data.etherId;
        this.userMail.mail = res.data.data.email;
        this.userPassword.mail = res.data.data.email;
        this.userForm.github = res.data.data.github.replace(
          "https://github.com/",
          ""
        );
        this.userForm.avatar = res.data.data.avatar;
      }
    });
  },
  methods: {
    //更改密码
    change_password() {
      this.user_password_change = true;
    },
    //确认更改密码
    confirm_password_change() {
      this.$refs["userPassword"].validate((valid) => {
        if (valid) {
          this.$axios({
            method: "post",
            url: "/api/v1/user/password",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            data: {
              password: this.userPassword.password,
              vCode: this.userPassword.vCode,
            },
          }).then((res) => {
            if (res.data.code == "0" && res.data.token != "") {
              localStorage.setItem("token", res.data.token);
            }
          });
          this.user_password_change = false;
          location = "./login";
        }
      });
    },
    //取消修改密码
    cancel_password_change() {
      this.userPassword.password = "";
      this.user_password_change = false;
      console.log(this.user_password_change);
    },
    //更改个人信息
    change_userInfo() {
      this.user_info_change = true;
      this.userForm.old_username = this.userForm.username;
      this.userForm.old_github = this.userForm.github;
    },
    cancel_userInfo_change() {
      this.userForm.username = this.userForm.old_username;
      this.userForm.github = this.userForm.old_github;
      this.user_info_change = false;
    },
    //确认更改个人信息
    confirm_userInfo_change() {
      if (
        JSON.stringify(this.userForm) != sessionStorage.getItem("init_userForm")
      ) {
        this.$axios({
          method: "post",
          url: "/api/v1/user/info",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          data: {
            etherId: this.userForm.etherId,
            github: "https://github.com/" + this.userForm.github,
            username: this.userForm.username,
          },
        }).then((res) => {
          if (res.data.code == "0" && res.data.token != "") {
            localStorage.setItem("token", res.data.token);
          }
        });
        this.user_info_change = false;
      }
    },
    //更改邮箱
    change_mail() {
      this.user_mail_change = true;
      this.userMail.oldmail = this.userMail.mail;
    },
    //确认更改邮箱
    confirm_change_mail() {
      this.$refs["userMail"].validate((valid) => {
        if (valid) {
          this.$axios({
            method: "patch",
            url:
              "/api/v1/user/email?email=" +
              this.userMail.mail +
              "&code=" +
              this.userMail.vCode,
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }).then((res) => {
            if (res.data.code == "0" && res.data.token != "") {
              localStorage.setItem("token", res.data.token);
            }
          });
          this.user_mail_change = false;
        }
      });
    },
    //取消更改邮箱
    cancel_change_mail() {
      this.userMail.mail = this.userMail.oldmail;
      this.user_mail_change = false;
    },
    //获取验证码
    sendVertify: function (mail) {
      var verify_vCode = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
      if (verify_vCode.test(mail)) {
        if (this.is_vCode_click) {
          this.is_vCode_click = false;
          setTimeout(() => {
            this.is_vCode_click = true;
          }, 60000);
          this.$axios.get("/api/verify?mail=" + mail).then((res) => {
            console.log(res.data);
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.profile_card {
  margin-top: 20px;
}

.title {
  text-align: center;
}

.input_mail {
  left: 14%;
  width: 50%;
}

.input_github {
  left: 13.5%;
  width: 70%;
}

.input_password {
  left: 12%;
  width: 70%;
}

.input_vCode {
  left: 10%;
  width: 35%;
}

.vCodeBtn {
  margin-left: 180px;
  padding: 11px;
}

.changeBtn {
  text-align: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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