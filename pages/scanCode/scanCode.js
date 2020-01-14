import { RequestStatus, RequestApi, PayType } from "/utils/enum";
import { myReq } from '/utils/request';
import { wait } from '/utils/utils';

const app = getApp();
Page({
  timeId: null,
  data: {
    qrcode: "",
    money: "0",
    time: 60,
    type: "",
    title: "",
    trade_no: "",
  },
  async tabScanCodeType() {
    this.setData({
      type: this.data.type === PayType.My ? PayType.Wx : PayType.My,
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
      //记录当前订单号
      this.setData({
        trade_no: data.result ? data.result.out_trade_no : data.data.out_trade_no
      });
      if (my.canIUse('ix.generateImageFromCode')) {
        my.ix.generateImageFromCode({
          code: data.result ? data.result.qr_code : data.data.qrcode,
          format: 'QRCODE',
          width: 200,
          correctLevel: 'H',
          success: (r) => {
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
        this.setData({ time: 0 });
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
  async watchPayResult() {
    while (this.data.time > 0) {
      let query = { out_trade_no: this.data.trade_no };
      let url;
      if (this.data.type === PayType.My) {
        url = RequestApi.MyPayRes;
      }
      else {
        url = RequestApi.WxPayRes;
        query.storeid = app.globalData.storeid;
      }
      await wait(3);
      let data = await myReq(url, query);
      if (data.code === "000000") {
        if (data.data.trade_status === "TRADE_SUCCESS" || data.data.order_state === "SUCCESS")
          break;
      }
    }
    my.navigateTo({
      url: "/pages/paySuccess/paySuccess"
    });
  },
  async onLoad(query) {
    this.setData({
      money: app.globalData.payMoney,
      type: query.type,
    })
    await this.getCode();

    this.timeId = setInterval(() => {
      let time = this.data.time - 1;
      if (time === 0)
        my.redirectTo({
          url: "/pages/checkoutCounter/checkoutCounter",
        });
      this.setData({ time });
    }, 1000);

    this.watchPayResult();
  },
  onUnload() {
    if (this.timeId) {
      clearInterval(this.timeId);
    };
  }
});
