<template>
    <div class="addMemberBlock">
        <el-popover>
            <el-button type="primary" slot="reference">成员管理</el-button>
            <el-form>
                <el-form-item
                    v-for="item in memberList"
                    :key="item.username">
                    <i v-if="item.role=='owner'" class="el-icon-s-custom"/>
                    <i v-if="item.role=='collaborator'" class="el-icon-user-solid"/>
                    <i v-if="item.role=='viewer'" class="el-icon-user"/>
                    {{item.username}}
                    <el-button v-if="item.role!='owner'" @click="deleteMember(item)" type="warning" size="mini" icon="el-icon-remove"/>
                </el-form-item>
                <el-form-item>
                    <el-popover>
                    <el-button type="primary" slot="reference">
                        添加成员
                    </el-button>
                    <el-form 
                        :model="addMemberForm" 
                        ref="addMemberForm" 
                        :rules="addMemberFormRules">
                        <el-form-item prop="email" label="用户邮箱">
                            <el-input v-model="addMemberForm.email" placeholder="请输入用户邮箱"/>
                        </el-form-item>
                        <el-form-item prop="role" label="用户权限">
                            <el-select v-model="addMemberForm.role">
                                <el-option
                                    v-for="item in possible_role"
                                    :key="item"
                                    :value="item"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="mini" round @click="addMember" icon="el-icon-check"/>
                        </el-form-item>
                    </el-form>
                    </el-popover>
                </el-form-item>
            </el-form>
        </el-popover>
    </div>
</template>

<script>
export default{
  props: ["info"],
    data(){
        return{
            possible_role:['collaborator','viewer'],
            addMemberForm:{
                name:this.info,
                email:"",
                role:""
            },
            memberList:null,
            addMemberFormRules:{
                email:[
                    { required:true, message: '请输入邮箱', trigger: 'blur'},
                    { type:'email' , message: '请输入正确的邮箱', trigger: 'blur' }
                ],
                role:[
                    { required:true, message: '请选择用户权限', trigger: 'blur'}
                ]
            }
        }
    },
    created(){
        this.getMember();
    },
    methods:{
        getMember(){
            this.$axios({
                method:'get',
                url:'/api/v1/collaborator/'+this.info,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res)=>{
                this.memberList=res.data.data
                }
            )
        },
        addMember(){
            this.$axios({
                method:'post',
                url:'/api/v1/collaborator',
                data:this.addMemberForm,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res)=>{
                if(res.data.code=='0'){
                    this.getMember()
                }
                else{
                    window.alert('添加失败')
                }
            })
        },
        deleteMember(item){
            this.$axios({
                method:"delete",
                url:'/api/v1/collaborator/'+this.info,
                params: { email: item.email},
                headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res)=>{
                console.log(res)
                this.getMember();
            })
        }
    }
}
</script>

<style scoped>

</style>