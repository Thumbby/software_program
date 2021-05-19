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
                        :options="editorOption" 
                        @change="onEditorChange($event)">
                  </quill-editor>
            </el-main>
      </el-container>
      <el-container>
            <el-row class="api-test">
                    <el-col :span="24">
                          <div>
                                API信息及测试
                          </div>
                          <el-row class="api-info">
                                <el-col :span="4">
                                    <el-select v-model="choice" placeholder="请选择">
                                          <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                          </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="12">
                                    <el-input v-model="url" placeholder="请输入内容"></el-input>
                                </el-col>
                        </el-row>
                        <div>
                                API描述
                          </div>
                          <el-input class="api-descrip" v-model="description" placeholder="请输入内容" type="textarea"></el-input>
                    </el-col>

                          <div>
                                参数设置
                          </div>
                          <el-form :model="formData" ref="formData" class="api-params">
        <el-table :data="formData.tableData" border stripe style="width: 100%;">
          <el-table-column prop="name" label="参数名">
            <template slot-scope="scope">
              <el-form-item v-if="scope.row.edit" :prop="'tableData.' + scope.$index + '.name'" >
                <el-input v-model="scope.row.name" placeholder="参数名"></el-input>
              </el-form-item>
              <span v-else>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="value" label="参数值">
            <template slot-scope="scope">
              <el-form-item v-if="scope.row.edit" :prop="'tableData.' + scope.$index + '.value'" >
                <el-input v-model="scope.row.value" placeholder="参数值"></el-input>
              </el-form-item>
              <span v-else>{{scope.row.value}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.edit" type="text" size="medium" @click="confirmAdd(scope.row,'formData')">
                <i class="el-icon-check" aria-hidden="true"></i>
              </el-button>
              <div v-else>
                <el-button type="text" size="medium" @click="editData(scope.row)">
                  <i class="el-icon-edit" aria-hidden="true"></i>
                </el-button>
                <el-button type="text" size="medium" @click="deleteData(scope.row,scope.$index)">
                  <i class="el-icon-delete" aria-hidden="true"></i>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <el-button type="text" @click="addData">添加数据</el-button>
      <div>
            测试结果
      </div>
      <el-row class="operations">
            <el-col :span="6"><el-button type="danger">清空</el-button></el-col>
            <el-col :span="6"><el-button type="primary">保存</el-button></el-col>
            <el-col :span="6"><el-button type="warning">测试</el-button></el-col>
            <el-col :span="6"><el-button type="success">导出</el-button></el-col>
      </el-row>
            </el-row>
      </el-container>
    </el-card>
  </div>
</template>

<script>

export default{
      name:"Doc",

      created(){
      },
      data:function(){
            return{
                content:'',
                editorOption:{},
                options: [{
                  value: '选项1',
                  label: 'GET'
                  }, {
                  value: '选项2',
                  label: 'POST'
                   }, {
                  value: '选项3',
                  label: 'PUT'
                  }, {
                  value: '选项4',
                  label: 'PATCH'
                  }, {
                  value: '选项5',
                   label: 'DELETE'
                  }],
                  choice:'GET',
                  url:'',
                  description:'',
                  formData: {
                        tableData: [],
                  },
                  
            }
        },
        methods:{
            onEditorChange(){//编辑器文本发生变化
                //this.content可以实时获取到当前编辑器内的文本内容
                console.log(this.content);
            },
            //添加
      addData() {
        this.formData.tableData.push({
          edit: true,
        });
      },
      //确认添加
      confirmAdd(row, formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            row.edit = false;
          }
        })
      },
      //修改
      editData(row) {
        row.edit = true;
      },
      //删除
      deleteData(row, index) {
        this.formData.tableData.splice(index, 1);
      },
      submitData(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = this.formData.tableData
            alert(JSON.stringify(data))
          }
        })
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
      height:400px;
}
.editor
{
      height:80%;
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