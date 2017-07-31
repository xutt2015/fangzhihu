import * as types from './mutation-types'

export default{
  //登录函数
  signIn({ commit, state },obj){
      var me=obj['context'];
      let _emailPhone=state.form.emailPhone;
      let _password=state.form.password;
      for (var i = 0,len=state.userList.length; i < len; i++) {
          if (state.userList[i].emailPhone===_emailPhone&&state.userList[i].password===_password) {
              location.href='#/index'
              // 将用户名密码存于全局变量中
              me.$emit('upup',state.userList[i]);
              return;
          }
      }
      alert("登陆失败，用户名密码不正确");
  },
  //注册函数
  signUp({ commit, state }){
    let _name=state.form.name;
    let _emailPhone=state.form.emailPhone;
    let _password=state.form.password;
    commit(types.pushUserList,{
        name:_name,
        emailPhone:_emailPhone,
        password:_password
    });
    alert("注册成功，请登录！");
  },
  //更改登录信息函数
  changeSignInfo({ commit, state },value){
    commit(types.changeSigninfo,value);
  }
}
