import * as types from './mutation-types'

export default {
  [types.changeSigninfo] (state, value) {
    state.signinfo=value;
  },
  [types.pushUserList] (state, value) {
    state.userList.push(value);
  }
}
