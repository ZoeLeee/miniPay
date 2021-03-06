import getTradeNo from '/utils/getTradeNo';
import { RequestStatus, RequestApi, PayType } from "../../utils/enum";
import { myReq } from '/utils/request';

const app = getApp();

Page({
  data: {
    tradeNo: "",
    showModal: false
  },
  //刷脸支付
  async toFacePay() {
    if (Number(app.globalData.payMoney) > 5000) {
      my.showToast({
        type: 'exception',
        content: '刷脸支付金额不能大于5000元，请选择扫码支付方式',
      });
    }
    else
      await this.startPay();
  },
  //前往扫码页面
  toScanPay() {
    // this.setData({
    //   showModal: true
    // });
    my.navigateTo({
      url: "/pages/scanCode/scanCode?type=" + PayType.My
    });
  },
  hideModal() {
    this.setData({
      showModal: false
    })
  },
  toScanCode(e) {
    my.navigateTo({
      url: "/pages/scanCode/scanCode?type=" + e.target.dataset.type
    });
  },
  startPay() {
    //设置随机流水
    this.setData({
      tradeNo: getTradeNo()
    });
    my.ix.startApp({
      appName: 'cashier',
      totalAmount: app.globalData.payMoney,
      bizNo: this.data.tradeNo,
      phoneNumber: true,
      // orderDetail: [{ name: '名称1', content: '详情134', fontColor: 'gray' }],
      faceLoadingTimeout: "5",
      showScanPayResult: true,
      success: async (r) => {
        if (!isNaN(Number(r.barCode)))
          await this.pay(r.barCode);
        else {
          my.showToast({
            type: 'fail',
            content: '请出示正确的付款码',
          });
        }
      }
    });
    my.ix.onCashierEventReceive((r) => {
      if (r.bitType === 'RESULT_CLOSED') {
        console.log('收银台关闭');
        my.navigateBack();
      }
      else
        console.log(r);
    });

  },
  async pay(code) {
    let res = await myReq(RequestApi.Pay, {
      money: app.globalData.payMoney,
      code,
      merchantid: app.globalData.merchantid,
      storeid: app.globalData.storeid
    });
    if (res.status === RequestStatus.OK) {
      //扫码成功后的逻辑
      my.ix.startApp({
        appName: 'scanPayResult',
        bizNo: this.data.tradeNo,
        totalAmount: app.globalData.payMoney,
        bizAmount: app.globalData.payMoney,
        discount: 0,
        success: (r) => {
          console.log(r);
        }
      });
    }
    else {
      my.showToast({
        type: 'exception',
        content: res.msg,
        duration: 3000,
      });
    }
  },
  onLoad() { },
  onUnload() {
    my.ix.offCashierEventReceive();
  },
  onShow() {
    this.setData({
      showModal: false
    })
  }
});
