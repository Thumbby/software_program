<template>
    <el-popover
    width="600"
    trigger="click">
        <el-form>
            <el-form-item prop="url">
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
                    <el-input v-model="api_chosen" placeholder="请输入url"/>
                </el-col>
            </el-form-item>
            <el-form-item prop="buttons">
                <el-button type="primary" size="mini" round @click="addParams">添加参数</el-button>
                <el-button type="info" size="mini" round @click="clearParams">清空参数</el-button>
                <el-button type="warning" size="mini" round @click="test">测试</el-button>
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
                            <el-button @click="deleteRow(scope.$index)" type="text" size="small">
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
            params:[],
            test_result:''
        }
    },
    methods:{
        addParams(){
            this.params.push({
                show:false
            })
        },
        clearParams(){
            this.params=[]
        },
        editRow(row){
            row.show=false;
        },
        deleteRow(index) {
            this.params.splice(index, 1);
        },
        completeEditRow(row){
            row.show=true;
        },
        test(){
            var data={}
            this.params.forEach(function(e){
                data[e.params_name]=e.params_value
            })
            this.$axios({
                method:this.method,
                url:this.api_chosen,
                data
            })
            .then((res)=>{
                this.test_result=res.data
            })
        }
    }
}
</script>

<style scoped>
</style>