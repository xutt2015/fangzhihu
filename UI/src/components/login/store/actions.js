import * as types from './mutation-types'

export default{
  //登录函数
  signIn({ commit, state },obj){
      var me=obj['context'];
      let _emailPhone=state.form.emailPhone;
      let _password=state.form.password;
      var item={
        ep:_emailPhone,
        pw:_password
      }
      //vue-sources实现http请求。 server是配置的服务器，在config/index.js中配置proxyTable
      me.$http.post("/server/users/user",item).then(
          function (res) {
              // 处理成功的结果
              if (res.data.success) {
                location.href='#/home'
                // 将用户名密码存于全局变量中
                me.$emit('upup',res.data.userInfo);
                return;
              }
              else{
                alert(res.data.error);
              }
              console.log(res.data);
          },function (res) {
              // 处理失败的结果
              console.log(res);
          }
      );
      // for (var i = 0,len=state.userList.length; i < len; i++) {
      //     if (state.userList[i].emailPhone===_emailPhone&&state.userList[i].password===_password) {
      //         location.href='#/home'
      //         // 将用户名密码存于全局变量中
      //         me.$emit('upup',state.userList[i]);
      //         return;
      //     }
      // }
      // alert("登陆失败，用户名密码不正确");
  },
  //注册函数
  signUp({ commit, state },obj){
    var me=obj['context'];
    let _name=state.form.name;
    let _emailPhone=state.form.emailPhone;
    let _password=state.form.password;
        var item={
      n:_name,
      ep:_emailPhone,
      pw:_password
    };
    // 使用post方法注册
    me.$http.post("/server/users/insert",item).then(
          function (res) {
              // 处理成功的结果
              if (res.data.success) {
                alert("注册成功，请登录！");
                return;
              }
              else{
                alert(res.data.error);
              }
              console.log(res.data);
          },function (res) {
              // 处理失败的结果
              console.log(res);
          }
      );
    // commit(types.pushUserList,{
    //     name:_name,
    //     emailPhone:_emailPhone,
    //     password:_password
    // });
    // alert("注册成功，请登录！");
  },
  //更改登录信息函数
  changeSignInfo({ commit, state },value){
    commit(types.changeSigninfo,value);
  }
}
