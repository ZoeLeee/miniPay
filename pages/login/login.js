import { RequestStatus } from "../../utils/enum";
import { myReq } from '/utils/request';

const app = getApp();
Page({
  data: {
    username: "18822221111",
    password: "221111",
  },
  usernameInput: function(c) {
    this.setData({
      username: c.detail.value.trim()
    });
  },
  passwordInput: function(c) {
    this.setData({
      password: c.detail.value.trim()
    });
  },
  resetPassword: function() {
    wx2my.navigateTo({
      url: "../reset/reset"
    });
  },
  async loginBtnClick(c) {
    if (!this.data.username || !this.data.password) {
      my.showToast({
        content: "请输入用户名和密码",
        type: 'fail',
        duration: 2E3
      });
    }
    else {
      let data = await myReq("Xcxapi/MerchantLogin/login", {
        username: this.data.username,
        password: this.data.password
      });

      console.log(data);

      app.globalData.phonenumber = this.data.username;
      app.globalData.id = data.uid;
      app.globalData.storeid = data.storeid;
      app.globalData.merchantid = data.merchantid;
      app.globalData.headimgurl = data.headimgurl;
      app.globalData.username = data.username;
      app.globalData.right_of_withdrawal = data.right_of_withdrawal;
      if (data.status === RequestStatus.OK) {
        my.switchTab({
          url: "../index/index"
        })
      }
      else {
        my.showToast({
          content: data.msg,
          type: 'fail',
          duration: 2E3
        });
      }
    }
  },
  onLoad() { },
});
