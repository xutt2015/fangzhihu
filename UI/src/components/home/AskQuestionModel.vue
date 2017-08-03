<template>
    <el-dialog id='askQuestion' :before-close="AskDialogClose" :visible.sync="AskDialogVisible">
        <h2>写下你的问题</h2>
        <div class="title1">
            <span>
                描述精确的问题更易得到解答
            </span>
        </div>
        <el-form ref='questionForm' :rules="questionRules" :model="ruleForm">
            <el-form-item prop="question">
                <el-input type="textarea" :rows="2" placeholder="请输入问题" v-model="ruleForm.question">
                </el-input>
            </el-form-item>
            <el-dropdown trigger='click' @command="selectTopic">
                <el-input placeholder="添加话题" @input="topicsFilter" icon="search" v-model="topic">
                </el-input>
                <el-dropdown-menu class='askquestion' slot="dropdown">
                    <el-dropdown-item  v-for="topic in filterTopics" :command="topic.name">{{topic.name}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div>
                <div class="remark_toolbar">问题描述（可选）：</div>
                <div class="DraftEditor-root">
                    <el-input type="textarea" placeholder='问题背景、条件等详细信息' :rows="4" v-model="remark">
                    </el-input>
                </div>
            </div>
            <div class="anonymous">
                <el-checkbox v-model="anonymous">匿名提问</el-checkbox>
            </div>
            <el-button @click='createQuestion' type="primary">提交问题</el-button>
        </el-form>
    </el-dialog>
</template>
<script>
    export default{
        name:"",
        data(){
            var questionRule=(rule, value, callback) => {
                var reg=/[\?？]+/;
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
        // AskDialogVisible:function(){
        //     debugger
        //     this.clearAskDialog();
        //     return this._props.AskDialogVisible;
        // }
    },
    methods:{
        //提问窗口的关闭
        AskDialogClose:function(){
            this.$emit('closeAskModel')
        },
        //添加一条话题记录
        addTopic:function(question){
            var item={
                    topic:'Vue.js',
                    image:'../../../static/images/admin.jpg',
                    name:'admin',
                    sign:'没有最好，只有更好！',
                    title:'vue，react之类的框架是不是弱化了对前端人员js水平的要求？',
                    like:15,
                    content:`<p>现在是面向组件化、面向函数开发，vue和react给前端带来的是一种思考问题解决方案的新思维，经过大量的实践之后，这种思维已经获得了很大一部分人的认同。</p>
                        <p>计算机世界也像人类世界一样，会有越来越强大的工具，而不再是原始社会的刀耕火种，一些落后的浏览器也会慢慢的淘汰，也会有层出不穷的新框架出来让人眼前一亮，很多中年人现在回想起刚刚改革开放的时候，后悔自己错过了去拼去闯的机会，现在前端界也类似刚刚出现变革的时候，框架化开发席卷了前端行业，错过这次变革的人肯定很多，他们守旧、固化思维模式和开发方式，不出几年，就很难在适应前端市场的需求。</p>
                        <p>面对如此多的框架和库，我们无法做到精通所有，但是要做到接受新的知识、新的理念，不要做一个几年后被行业淘汰的人。</p>
                        <p>总得来看，现在对前端人员的要求提高了，这种提高是指学习新知识的能力、还要要大局观意识，不再做一个普通的切图仔。
                        </p>`,
                    editDate:'昨天 10:17',
                    comment:3,
                    isCollapsed:true,
                    CollapseContent:`<p>现在是面向组件化、面向函数开发，vue和react给前端带来的是一种思考问题解决方案的新思维，经过大量的实践之后，这种思维已经获得了很大一部分人的认同。</p>
                        <p>计算机世界也像人类世界一样，会有越来越强大的工具，而不再是原始社会的刀耕火种，一些落后的浏览器也会慢慢的淘汰，也会有层出不穷的新框架出来让人眼前一亮，很多中年人现在回想起刚刚改革开放的时候...`
                };
            this.$emit('addTopic',question)
        },
        //清空提问窗口
        clearAskDialog:function(){
            this.ruleForm.question='';
            this.topic='';
            this.remark='';
            this.anonymous=false;
        },
        //选中话题
        selectTopic:function(command){
            this.topic=command;
        },
        //话题过滤
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
        },
        //创建问题
        createQuestion:function(){
            var item={ title: this.ruleForm.question,
                       topics: this.topic,
                       content: this.remark,
                       isAnonymous:this.anonymous,
                       userId:this.$root.$children[0].userInfo.emailPhone
                };
            this.$http.post('/server/questions/insert',item).then(
                function (res) {
                      // 处理成功的结果
                      if (res.data.success) {
                        alert("问题提交成功！");
                        debugger
                        this.AskDialogClose();

                        this.addTopic(res.data.question);
                        return;
                      }
                      else{
                        alert(res.data.error);
                      }
                },function (res) {
                  // 处理失败的结果
                  alert(res.data);
                }
            );
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
    .el-dropdown-menu.askquestion{
         width: calc(50% - 50px);
    }
</style>