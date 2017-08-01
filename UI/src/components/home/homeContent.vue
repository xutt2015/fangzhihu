<template>
    <div class="homeContent">
        <div class='Topstory-mainColumn'>
            <div class="TopstoryHeader">
              <el-card class='TopstoryHeader'>
                 <div class="askQuestion" @click='AskDialogVisible = true'>
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
                            <div v-html="item.isCollapsed?item.CollapseContent:item.content">
                            </div>
                            <el-button v-show="item.isCollapsed" type="info2" style="position: absolute; margin-top: -40px;margin-left: 170px;">
                                <i class="el-icon-arrow-down" style="float:right;margin-left: 5px;"></i>
                                阅读全文
                            </el-button>
                        </div>
                        <span>编辑于 {{item.editDate}}</span>
                    </div>
                    <div class="ContentItem-actions">
                        <el-button type="info1" icon="caret-top">{{item.like}}</el-button>
                        <el-button type="info1" icon="caret-bottom"></el-button>
                        <el-button type="info2" icon="edit">{{item.comment}}条评论</el-button>
                        <el-button type="info2" icon="share">分享</el-button>
                        <el-button type="info2" icon="star-on">收藏</el-button>
                        <el-button type="info2" icon="star-off">感谢</el-button>
                        <el-dropdown trigger="click">
                            <el-button type="info2" icon="more"></el-button>
                              <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>没有帮助</el-dropdown-item>
                                <el-dropdown-item>举报</el-dropdown-item>
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
    <router-view :AskDialogVisible=AskDialogVisible @closeAskModel='closeAskModel'></router-view>
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
                ContentItems:[{
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
                },{
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
                }]
            }
        },
        methods:{
            expandContent:function(index){
                this.ContentItems[index].isCollapsed=false;
            },
            CollapseContent:function(index){
                this.ContentItems[index].isCollapsed=true;
            },
            closeAskModel:function(){
                this.AskDialogVisible=false;
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
