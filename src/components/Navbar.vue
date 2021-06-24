<template>

    <div class="navbar">

      <i class="el-icon-menu" id="switch"></i>
      
      <p>{{routeName}}</p>

      <el-popover style="margin-left:1%">
        <pre class="instruction">
          使用说明
1.本产品主要作用为项目文档管理，用户可自行创建项目
  、邀请合作者并编辑文档
2.本产品可用于进行API测试并返回结果，但是测试的API
  需保证使用http协议
3.在进行项目编辑和文档编辑时，请确保自己拥有修改权
  限(owner、collaborator)
        </pre>
      <i class="el-icon-warning-outline" slot="reference"></i>
      </el-popover>

      <div class="navbar-item-blank-center">
          <h2 id="main_title">石头文档</h2>
      </div>

      <el-dropdown>
        <span class="dropdown-link">
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="showProfile"><a >个人资料</a></el-dropdown-item>
          <el-dropdown-item @click.native="workBench"><a >工作台</a></el-dropdown-item>
          <el-dropdown-item @click.native="logout"><a >登出</a></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

</template>

<script>
export default {
  name: 'Navbar',
  computed:{
    routeName(){
        const route = this.$route
        const { meta} = route
        return meta.name
    }
  },
  data () {
    return {
      instructions:"使用说明\\n这是使用说明"
    }
  },
  methods:{
    //切换至个人主页逻辑
    showProfile:function(){
      location = "/#/user";
    },
    // 退出登录逻辑
    logout:function(){
      sessionStorage.setItem("isLogin", false);
      sessionStorage.removeItem("userid" );
        location = "/#/login";
    },
    //切换至个人工作台逻辑
    workBench:function(){
      location = "/#/workBench";
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../assets/css/navbar.css"></style>