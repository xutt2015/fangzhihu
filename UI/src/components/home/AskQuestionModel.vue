<template>
    <el-dialog :before-close="AskDialogClose" :visible.sync="AskDialogVisible">
        <h2>写下你的问题</h2>
        <div class="title1">
            <span>
                描述精确的问题更易得到解答
            </span>
        </div>
        <el-form :rules="questionRules" :model="ruleForm">
            <el-form-item prop="question">
                <el-input type="textarea" :rows="2" placeholder="请输入问题" v-model="ruleForm.question">
                </el-input>
            </el-form-item>
            <el-dropdown trigger='click' @command="selectTopic">
                <el-input placeholder="添加话题" @input="topicsFilter" icon="search" v-model="topic">
                </el-input>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item  v-for="topic in filterTopics" :command="topic.name">{{topic.name}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div>
                <div class="remark_toolbar">问题描述（可选）：</div>
                <div class="DraftEditor-root">
                    <el-input type="textarea" :rows="4" v-model="remark">
                    </el-input>
                </div>
            </div>
            <div class="anonymous">
                <el-checkbox v-model="anonymous">匿名提问</el-checkbox>
            </div>
            <el-button type="primary">提交问题</el-button>
        </el-form>
    </el-dialog>
</template>
<script>
    export default{
        name:"",
        data(){
            var questionRule=(rule, value, callback) => {
                var reg=/[\?？]+/;
                debugger
                if (!reg.test(value)) {
                  callback(new Error('你还没有给问题添加问号'));
                } else {
                  callback();
                }
            };
            return{
                ruleForm:{
                    question:""
                },
                topic:"",
                topics:[{
                    name:"前端开发"
                },{
                    name:"vue.js"
                },{
                    name:"node.js"
                }],
                filterTopics:[{
                    name:"前端开发"
                },{
                    name:"vue.js"
                },{
                    name:"node.js"
                }],
                remark:"",
                anonymous:false,
                questionRules:{
                    question:{ validator: questionRule, trigger: 'blur' }
                }
            }
        },
        props:{
          AskDialogVisible: {
            type: Boolean
        }
    },
    comoputed:{
        AskDialogVisible:function(){
            debugger
            return this._props.AskDialogVisible;
        }
    },
    methods:{
        askQuestion:function(){
            this.AskDialogVisible=true;
        },
        AskDialogClose:function(){
            this.$emit('closeAskModel')
        },
        selectTopic:function(command){
            this.topic=command;
        },
        topicsFilter:function(){
            var value=this.topic.trim();
            if (value==='') {
                this.filterTopics=this.topics;
            }
            else{
                var topics=this.topics;
                var newTopics=[];
                for(let topic of topics){
                    if (topic.name.indexOf(value)!=-1) {
                        newTopics.push(topic);
                    }
                }
                this.filterTopics=newTopics;
            }
        }
    }
}
</script>
<style lang='scss'>
    .el-dialog{
        text-align: center;
        .title1{
            span{
                color: #8590a6;
            }
        }
        .remark_toolbar{
            text-align: left;
        }
        .anonymous{
            text-align: left;
        }
        .el-dropdown{
            width: 100%;            
        }
        .el-form > div{
            margin-top: 20px;
            .el-form-item__error{
                right: 0;
                left: auto;
            }
        }
    }
    .el-dropdown-menu{
         width: 544px;
    }
</style>