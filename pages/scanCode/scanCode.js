import { RequestStatus, RequestApi, PayType } from "/utils/enum";
import { myReq } from '/utils/request';

const app = getApp();
Page({
  timeId: null,
  data: {
    qrcode: "/images/testCode.png",
    money: "0",
    time: 60,
    type: "",
    title: "",
  },
  async tabScanCodeType() {
    this.setData({
      type: this.data.type === PayType.My ? PayType.Wx: PayType.My,
      title: this.data.type === PayType.My ? "支付宝" : "微信",
      time: 60,
    });
    await this.getCode();
  },
  async getCode() {
    let data = await myReq(RequestApi.Code, {
      type: this.data.type === PayType.My ? "2" : "1",
      money: app.globalData.payMoney,
      stats: 0,
      storeid: app.globalData.storeid
    })
    if (data.status === RequestStatus.OK || data.code === "000000") {
      if (my.canIUse('ix.generateImageFromCode')) {
        my.ix.generateImageFromCode({
          code: data.result? data.result.qr_code: data.data.qrcode,
          format: 'QRCODE',
          width: 200,
          correctLevel: 'H',
          success: (r) => {
            console.log(r);
            this.setData({ qrcode: r.image });
          }
        });
      }
      else {
        my.showToast({
          type: "fail",
          content: "小程序版本太低",
          success() {
            my.navigateBack();
          }
        });
      }
    }
    else {
      my.showToast({
        type: "fail",
        content: data.msg,
        duration: 3000,
        success() {
          my.navigateBack();
        }
      });
    }
  },
  async onLoad(query) {
    this.setData({
      money: app.globalData.payMoney,
      type: query.type,
      title: query.type === PayType.My ? "微信" : "支付宝"
    })
    await this.getCode();

    this.timeId = setInterval(() => {
      let time = this.data.time - 1;
      if (time === 0)
        my.redirectTo({
          url: "/pages/checkoutCounter/checkoutCounter",
        });
      this.setData({ time });
    }, 1000)
  },
  onUnload() {
    if (this.timeId) {
      clearInterval(this.timeId);
    }
  }
});
