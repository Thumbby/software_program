<template>

<div class="page">

    <div class="title-container">
      <h1 class="header">文档1</h1>
    </div>
    <el-card shadow="always" class="box">
      <el-container class="doc-container">
            <el-header class="title">文档描述</el-header>
            <el-main>
                  <quill-editor  class="editor"  v-model="content"
                         
                        @change="onEditorChange($event)">
                  </quill-editor>
                  
            </el-main>
            <el-button type="success" v-on:click="toSave">保存</el-button>
      </el-container>
      
    </el-card>
  </div>
</template>

<script>
export default{
      name:"Doc",
      created(){
        this.$axios({
                      method: "get",
                      url: `/api/v1/document?etherID=${this.etherID}&name=${this.name}&sequence=${this.sequence}`,
                      headers: {
                          Authorization: "Bearer " + localStorage.getItem("token"),
                      }
                      
                  }).then((res) => {
                  this.content=res.data.data.content
                  });
      },
      data:function(){
            return{
                content:"",
                etherID:"laiyikou",
                name:"Test",
                sequence:1,
                title:"文档增删改查",
            }
        },
        methods:{
            onEditorChange(){//编辑器文本发生变化
                //this.content可以实时获取到当前编辑器内的文本内容
                console.log(this.content);
            },
            toSave()
            {
                   this.$axios({
                      method: "put",
                      url: "/api/v1/document",
                      headers: {
                          Authorization: "Bearer " + localStorage.getItem("token"),
                      },
                      data:{
                        etherID:this.etherID,
                        name:this.name,
                        sequence:this.sequence,
                        title:this.title,
                        content:this.content,
                      }
                  }).then((res) => {
                  console.log(res)
                  });
            }

      }

}

</script>
<style scoped>

.page {
  width: 100%;
  
}
.box{
      width: 70%;
      margin-left: 15%;
      height: auto;
}
.doc-container
{
      height:650px;
}
.editor
{
      height:90%;
}
.header {
  text-align: center;
  margin-top: 80px;
}
.title{
      font-size: 20px;
}
.api-test
{
      width: 97%;
      margin-left: 1.5%;
}
.api-info
{
      margin-top: 20px;
      margin-bottom:20px;
}
.api-descrip
{
      margin-top: 20px;
      margin-bottom:20px;
}
.api-params
{
      margin-top: 20px;
      margin-bottom: 10px;
}
.operations
{
      margin-top: 20px;
      margin-bottom: 20px;
}
</style>