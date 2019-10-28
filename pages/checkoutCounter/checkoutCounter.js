import { Page } from '/utils/ix';
import getTradeNo from '/utils/getTradeNo';
import { RequestStatus, RequestApi } from "../../utils/enum";
import { myReq } from '/utils/request';

const app = getApp();

Page({
  data: {
    money: "",
    isReady: false,
    tradeNo: undefined,
  },
  moneyInput(e) {
    this.setData({
      money: e.detail.value
    });
  },
  confirm() {
    console.log(123);
  },
  blur(e) {
    this.start();
  },
  onKeyPress(r) {
    switch (r.keyCode) {
      case 131:
        if (!this.data.isReady) {
          this.setData({
            money: r.amount,
            isReady: true
          });
        }
        else {
          this.start();
        }
        break;
      case 133:
        r.keyName = '取消';
        this.setData({
          money: "",
          isReady: false
        });
        break;
    }

  },
  start() {
    //设置随机流水
    this.setData({
      tradeNo: getTradeNo()
    });
    my.ix.startApp({
      appName: 'cashier',
      totalAmount: this.data.money,
      bizNo: this.data.tradeNo,
      phoneNumber: true,
      // orderDetail: [{ name: '名称1', content: '详情134', fontColor: 'gray' }],
      faceLoadingTimeout: "5",
      showScanPayResult: true,
      success: async (r) => {
        this.setData({
          isReady: false
        });
        await this.pay(r.barCode);
      }
    });
    my.ix.onCashierEventReceive((r) => {
      if (r.bizType = 'RESULT_CLOSED') {
        console.log('收银台关闭');
        this.setData({
          money: "",
          isReady: false
        });
      }
      else
        console.log('RESULT: ' + r.keyCode);
    });
    //扫码成功后的逻辑
    my.ix.startApp({
      appName: 'scanPayResult',
      bizNo: this.data.tradeNo,
      totalAmount: this.data.money,
      bizAmount: this.data.money,
      discount: 0,
      success: (r) => {
        console.log(r);
      }
    });
  },
  async pay(code) {
    let res = await myReq(RequestApi.Pay, {
      money: this.data.money,
      code,
      merchantid: app.globalData.merchantid,
      storied: app.globalData.storeid
    });
  },
  onLoad() {

  },
  onUnload() {
    my.ix.offCashierEventReceive();
  }
});
