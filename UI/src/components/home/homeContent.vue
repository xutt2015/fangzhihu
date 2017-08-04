<template>
    <div class="homeContent" @onload="loadQuestionsList">
        <div class='Topstory-mainColumn'>
            <div class="TopstoryHeader">
              <el-card class='TopstoryHeader'>
                 <div class="askQuestion" @click='AskDialogOpen'>
                     <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="Icon Icon--question" aria-hidden="true" style="height: 18px; width: 18px;"><title></title><g><g transform="translate(-3 -3)" fill="#8590A6" fill-rule="evenodd">     <path d="M3.833 6.356c0-1.66 1.334-3.007 2.993-3.007h9.348c1.653 0 2.993 1.338 2.993 3.006v8.498c0 1.66-1.266 3.467-2.812 4.03l-1.09.396c-2.08.757-5.447.76-7.53 0l-1.09-.396c-1.553-.565-2.812-2.363-2.812-4.03V6.356zm1.643.67v7.492c0 1.1.84 2.314 1.873 2.697l2.277.844c1.035.383 2.712.383 3.746 0l2.278-.845c1.036-.384 1.874-1.59 1.874-2.697V7.026c0-1.1-.897-2.003-2.003-2.003H7.48c-1.118 0-2.004.897-2.004 2.003z"></path>     <path d="M13.012 11.46l-.422.29c-.232.177-.433.53-.433.53s-.08.134-.11.398v.16h-1.63v-.24c.02-.555.11-.86.343-1.13.364-.422 1.168-.935 1.202-.956.114-.086.212-.184.284-.288.17-.23.244-.412.244-.59 0-.25-.074-.478-.22-.682-.143-.197-.41-.296-.798-.296-.385 0-.648.12-.806.368-.162.254-.243.523-.243.796l-.005.23-1.656-.003.003-.23c.043-1.007.406-1.732 1.078-2.155.424-.27 1.113-.396 1.657-.406.873.01 1.39.193 1.923.575.54.387.815.965.815 1.72 0 .422-.135.82-.4 1.18-.14.193-.442.434-.826.73z"></path>     <ellipse cx="11.226" cy="14.791" rx="1.095" ry="1.116"></ellipse>   </g></g></svg>
                     提问
                 </div>
                 <div class="replay">
                     <i class="el-icon-document"></i>
                     回答
                 </div>
                 <div class="newArtical">
                     <i class="el-icon-edit"></i>
                     写文章
                 </div>
             </el-card>
         </div>
         <div class="TopstoryMain">
            <el-card class="box-card" v-for="(item,index) in ContentItems">
                <div class="Feed-title">
                    来自话题:{{item.topic}}
                </div>
                <div class="AuthorInfo">
                    <img :src="item.image" style="width24px;height:24px;">
                    <span class="name">{{item.name}}</span>
                    <span class="sign">{{item.sign}}</span>
                </div>
                <div class="ContentItem">
                    <h3 class="ContentItem-title"><a target="_blank" href="">{{item.title}}</a></h3>
                    <div class="content" @click="expandContent(index)" :class="{isCollapsed:item.isCollapsed}"> 
                        <span v-show="!item.isCollapsed">{{item.like}}人赞同了该回答</span>
                        <div class="artical">
                            <div>
                            <p v-html="item.isCollapsed?item.CollapseContent:item.content"></p>
                            </div>
                            <el-button v-show="item.isCollapsed" type="info2" style="position: absolute; margin-top: -40px;margin-left: 230px;"> 
                                <i class="el-icon-arrow-down" style="float:right;margin-left:5px;"></i>
                                阅读全文
                            </el-button>
                        </div>
                        <span>编辑于 {{item.editDate}}</span>
                    </div>
                    <div class="ContentItem-actions">
                        <el-button type="info1" icon="caret-top" @click='likeArtical(index,item._id)' :class='{selected:item.likeSelected}'>{{item.like}}</el-button>
                        <el-button type="info1" icon="caret-bottom" @click='unlikeArtical(index,item._id)' :class='{selected:item.unlikeSelected}'></el-button>
                        <el-button type="info2" icon="edit">{{item.comment}}条评论</el-button>
                        <el-button type="info2" icon="share">分享</el-button>
                        <el-button type="info2" icon="star-on">收藏</el-button>
                        <el-button type="info2" icon="star-off">感谢</el-button>
                        <!-- (event,index,item._id) -->
                        <el-dropdown trigger="click"  @command="selectTopic">
                            <el-button type="info2" icon="more"></el-button>
                              <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command="['deleteArt',index,item._id]">删除文章</el-dropdown-item>
                                <el-dropdown-item :command="['noHelp',index,item._id]">没有帮助</el-dropdown-item>
                                <el-dropdown-item :command="['report',index,item._id]">举报</el-dropdown-item>
                              </el-dropdown-menu>
                        </el-dropdown>
                        <el-button @click="CollapseContent(index)" v-show="!item.isCollapsed" type="info2" style="float:right">
                                <i class="el-icon-arrow-up" style="float:right;margin-left: 5px;"></i>
                                收起
                            </el-button>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
    <div class="TopstorySideBar">
        <el-card class="box-card">
            <ul class="TopstorySideBar-categoryList">
                <li v-for="(item,index) in categoryList" :style="{color:item.color}">
                    <i :class="item.icon"></i>
                    <span>{{item.name}}</span>
                </li>
            </ul>
        </el-card>
        <el-card>
            <ul class="TopstorySideBar-navList">
                <li v-for="(item,index) in navList">
                    <i :class="item.icon"></i>
                    {{item.name}}
                    <span v-show="item.num" class="TopstorySideBar-navNumber">{{item.num}}</span>
                </li>
            </ul>
        </el-card>
    </div>
    <router-view :AskDialogVisible=AskDialogVisible @closeAskModel='closeAskModel' @addTopic='addTopic' ref='askQuestionDialog'></router-view>
</div>
</template>
<script>
    export default{          
        name:'homeContent',
        data(){
            return {
                AskDialogVisible:false,
                navList:[{
                    name:"我的收藏",
                    icon:"el-icon-star-on",
                    num:1
                },{
                    name:"我关注的问题",
                    icon:"el-icon-time",
                    num:1
                },{
                    name:"我的邀请",
                    icon:"el-icon-message",
                    num:0
                },{
                    name:"社区服务中心",
                    icon:"el-icon-document",
                    num:0
                },{
                    name:"版权服务中心",
                    icon:"el-icon-information",
                    num:0
                },{
                    name:"公共编辑动态",
                    icon:"el-icon-edit",
                    num:0
                }],
                categoryList:[{
                    name:"live",
                    icon:"el-icon-star-on",
                    color:"#ffcf00"
                },{
                    name:"书店",
                    icon:"el-icon-message",
                    color:"#43d480"
                },{
                    name:"圆桌",
                    icon:"el-icon-circle-check",
                    color:"#0084ff"
                },{
                    name:"专栏",
                    icon:"el-icon-edit",
                    color:"#0f88eb"
                },{
                    name:"付费咨询",
                    icon:"el-icon-information",
                    color:"#5478f0"
                }],
                ContentItems:[]
                // ContentItems:[{
                //     topic:'Vue.js',
                //     image:'../../../static/images/admin.jpg',
                //     name:'admin',
                //     sign:'没有最好，只有更好！',
                //     title:'vue，react之类的框架？',
                //     like:15,
                //     content:``,
                //     editDate:'昨天 10:17',
                //     comment:3,
                //     isCollapsed:true,
                //     CollapseContent:``
                // }]
            }
        },
        mounted(){//渲染时加载
            this.loadQuestionsList()
        },
        methods:{
            //加载所有的问题            
            loadQuestionsList:function(){
                this.$http.get('/server/questions/questions').then(
                    function (res) {
                          // 处理成功的结果
                          if (res.data.success) {
                            this.ContentItems=res.data.questions;
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
            },
            //内容的展开和折叠
            expandContent:function(index){                
                this.ContentItems[index].isCollapsed=false;
            },
            CollapseContent:function(index){
                this.ContentItems[index].isCollapsed=true;
            },
            //打开和关闭提问对话框
            AskDialogOpen:function(){
                this.AskDialogVisible = true;
                this.$refs.askQuestionDialog.clearAskDialog();   

            },
            closeAskModel:function(){
                this.AskDialogVisible=false;
            },
            //添加话题
            addTopic:function(item){
                this.ContentItems.unshift(item);
            },
            //喜欢该文章
            likeArtical:function(index,id,route){
                let selected=this.ContentItems[index].likeSelected;
                var _like;
                if (selected) {
                    _like=this.ContentItems[index].like-1;
                }else{
                    _like=this.ContentItems[index].like+1;
                }  
                var item={
                    _id:id,
                    like:_like
                }
                this.$http.post('server/questions/updateAtLike',item).then(
                    function (res) {
                          // 处理成功的结果
                          if (res.data.success) {
                            this.ContentItems[index].like=_like;
                            this.ContentItems[index].likeSelected=!selected;
                            if (route===undefined) {
                                this.ContentItems[index].unlikeSelected=false;
                            }
                            return;
                          }
                          else{
                            alert(res.data.error);
                          }
                    },function (res) {
                      // 处理失败的结果
                      alert(res.data);
                    }
                )              
            },
            unlikeArtical(index,id){
                if(this.ContentItems[index].unlikeSelected){
                    this.ContentItems[index].unlikeSelected=false;
                }else{
                    if (this.ContentItems[index].likeSelected) {
                        this.likeArtical(index,id,'route');
                    }
                    this.ContentItems[index].unlikeSelected=true;
                }
                
                
            },
            selectTopic(command){
                debugger;
                 switch(command[0]){
                   case 'deleteArt':
                       this.deleteArt(command[1],command[2]);
                   break;
                   case 'noHelp':
                   break;
                   case 'report':
                   break;
                 }
            },
            //删除文章
            deleteArt(index,id){
                var item={
                    _id:id
                }
                this.$http.post('server/questions/delete',item).then(
                    function (res) {
                          // 处理成功的结果
                          if (res.data.success) {
                            this.ContentItems.splice(index,1);
                            return;
                          }
                          else{
                            alert(res.data.error);
                          }
                    },function (res) {
                      // 处理失败的结果
                      alert(res.data);
                    }
                ) 

            }
        }
    }
</script>
<style lang="scss">
    .homeContent{
        margin-top: 70px;
        display:flex;
        justify-content: center;
        text-align: left;
        .Topstory-mainColumn{
            width:690px;
            .TopstoryHeader{
                .el-card__body{
                    overflow: hidden;
                    .askQuestion{
                        float: left;
                        width: 100px;
                        cursor: pointer;
                    }
                    .replay{
                        float: left;
                        width: 100px;
                        cursor: pointer;
                    }
                    .newArtical{
                        float: left;
                        width: 100px;
                        cursor: pointer;
                    }
                }
            }
            .TopstoryMain{
                font-size: 15px;
                .el-button--info1{
                    color: #2d84cc;
                    background-color: #ebf3fb;
                    border-color: #ebf3fb;
                    padding: 8px 10px;
                }
                .el-button--info1.selected{
                    background-color: #2d84cc;
                    color: white;
                }
                .el-button--info2{
                    color: #8590a6;
                    background-color: transparent;
                    border: none;
                    border-radius: 0;
                    padding: 8px 10px;
                }
                .Feed-title{
                    color: #8590a6;
                    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Noto Sans CJK SC,WenQuanYi Micro Hei,Arial,sans-serif;
                        line-height: 1;
                }
                .AuthorInfo{
                    margin: 10px 0px;
                    img{
                        cursor: pointer; 
                    }
                    .name{
                        font-weight: 600;
                        line-height: 2;
                        vertical-align: text-bottom;
                        cursor: pointer; 
                    }
                    .sign{
                        line-height: 2;
                        vertical-align: text-bottom;
                        font-size: 14px;
                    }
                }
                .ContentItem{
                    .ContentItem-title a{
                        text-decoration: none;
                        color: black;
                    }
                    .ContentItem-title a:hover{
                        color: #2b2b97;
                    }
                    .content{
                        .artical{
                            color:#262626;
                        }
                        span{
                            cursor: pointer; 
                            color: #8590a6;
                        }
                    }
                    .content.isCollapsed{ 
                        cursor: pointer;                   
                        .artical:hover{
                            color: #8590a6;
                        }
                    }
                }
                .ContentItem-actions{
                    margin-top: 15px;
                }
            }
        }
        .TopstorySideBar{
            width:294px;
            .el-card__body{
                padding: 0px;
                .TopstorySideBar-categoryList{
                    margin-left: -38px;
                    li{
                        cursor: pointer;
                        list-style: none;
                        font-size: 16px;
                        display: inline-block;
                        width: 90px;
                        height: 55px;
                        text-align: center;
                        margin:10px 0;
                        span{
                            display: block;
                            margin-top: 10px;
                            color: rgb(133, 144, 166);
                        }
                    } 
                    li:hover{
                        span{
                            color: currentColor;
                        }
                    }
                }
                .TopstorySideBar-navList{
                    margin-left: -30px;
                    li{
                        cursor: pointer;
                        list-style: none;
                        font-size: 14px;
                        padding: 10px;
                        color: rgb(133, 144, 166);
                        .TopstorySideBar-navNumber{
                            padding: 6px 10px;
                            border-radius: 2px;
                            background: #f7f8fa;
                            color: #8590a6;
                            font-size: 10px;
                            float: right;
                        }
                    } 
                    li:hover{
                        background-color: #eee;
                    }
                }
            }               
        }
        .el-card{
            margin:10px 5px;
            box-shadow: 0 1px 3px rgba(0,37,55,.05);
        }
    }
</style>
