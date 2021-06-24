<template>
    <el-popover
    width="600"
    trigger="click">
        <h2>API测试</h2>
        <el-form>
            <el-form-item prop="url" label="URL">
                <el-col :span='4'>
                    <el-select v-model="method">
                        <el-option
                            v-for="item in method_options"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="12">
                    <el-input v-model="api_chosen" placeholder="请输入url">
                        <template slot="prepend">http://</template>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item prop="buttons">
                <el-button type="primary" size="mini" round @click="addHeaders">添加头部</el-button>
                <el-button type="info" size="mini" round @click="clearHeaders">清空头部</el-button>
                <el-button type="primary" size="mini" round @click="addParams">添加参数</el-button>
                <el-button type="info" size="mini" round @click="clearParams">清空参数</el-button>
                <el-button type="warning" size="mini" round @click="test">测试</el-button>
            </el-form-item>
            <el-form-item prop="headers">
                <el-table
                    :data="headers"
                    border>
                    <el-table-column
                        prop="headers_name"
                        label="头部参数名">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.headers_name" v-show="!scope.row.show"/>
                            <span v-show="scope.row.show">{{scope.row.headers_name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="headers_value"
                        label="头部参数值">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.headers_value" v-show="!scope.row.show"/>
                            <span v-show="scope.row.show">{{scope.row.headers_value}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button v-show="scope.row.show" @click="editRow(scope.row)" type="text" size="small">
                                <i class="el-icon-edit"/>
                            </el-button>
                            <el-button v-show="!scope.row.show" @click="completeEditRow(scope.row)" type="text" size="small">
                                <i class="el-icon-check"/>
                            </el-button>
                            <el-button @click="deleteHeadersRow(scope.$index)" type="text" size="small">
                                <i class="el-icon-delete"/>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item prop="params">
                <el-table
                    :data="params"
                    border>
                    <el-table-column
                        prop="params_name"
                        label="参数名">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.params_name" v-show="!scope.row.show"/>
                            <span v-show="scope.row.show">{{scope.row.params_name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="params_value"
                        label="参数值">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.params_value" v-show="!scope.row.show"/>
                            <span v-show="scope.row.show">{{scope.row.params_value}}</span>
                        </template>
                    </el-table-column>      
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button v-show="scope.row.show" @click="editRow(scope.row)" type="text" size="small">
                                <i class="el-icon-edit"/>
                            </el-button>
                            <el-button v-show="!scope.row.show" @click="completeEditRow(scope.row)" type="text" size="small">
                                <i class="el-icon-check"/>
                            </el-button>
                            <el-button @click="deleteParamsRow(scope.$index)" type="text" size="small">
                                <i class="el-icon-delete"/>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item prop="result">
                <el-input
                    type="textarea"
                    :rows='10'
                    v-model="test_result"
                    disabled/>
            </el-form-item>
        </el-form>
        <el-button slot='reference'>API测试</el-button>
    </el-popover>
</template>

<script>

export default{
    data(){
        return{
            api_chosen:'',
            method_options:[
                {
                    label:'GET',
                    value:'get',
                },
                {
                    label:'POST',
                    value:'post',
                },
                {
                    label:'PUT',
                    value:'put',
                },
                {
                    label:'PATCH',
                    value:'patch'
                },
                {
                    label:'DELETE',
                    value:'delete'
                }
            ],
            method:'GET',
            headers:[],
            params:[],
            test_result:'',
            errInfo:{
                '302':'对象已移动',
                '304':'未修改',
                '307':'临时重定向',
                '400':'请求错误',
                '401':'访问被拒绝',
                '403':'禁止访问',
                '404':'API路径出错',
                '405':'方法不被允许',
                '500':'内部服务器错误',
                '504':'网关超时',
                '505':'HTTP版本不受支持'
            }
        }
    },
    methods:{
        addHeaders(){
            this.headers.push({
                show:false
            })
        },
        clearHeaders(){
            this.headers=[]
        },
        deleteHeadersRow(index) {
            this.headers.splice(index, 1);
        },
        addParams(){
            this.params.push({
                show:false
            })
        },
        clearParams(){
            this.params=[]
        },
        deleteParamsRow(index) {
            this.params.splice(index, 1);
        },
        editRow(row){
            row.show=false;
        },
        completeEditRow(row){
            row.show=true;
        },
        test(){
            var header={}
            var data={}
            this.headers.forEach(function(e){
                header[e.headers_name]=e.headers_name
            })
            this.params.forEach(function(e){
                data[e.params_name]=e.params_value
            })
            this.$axios({
                method:this.method,
                url:'http://'+this.api_chosen,
                data:JSON.stringify(data),
                headers:header
            })
            .then((res)=>{
                console.log(res)
                this.test_result=res.data
            })
            .catch((err)=>{
                console.log(err)
                this.test_result='您输入的API不存在'
            })
        }
    }
}
</script>

<style scoped>
</style>