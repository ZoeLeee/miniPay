import { Page } from '/utils/ix';

const app = getApp();

Page({
  data: {
    money: "",
    isReady: false,
  },
  moneyInput(e) {
    this.setData({
      money: e.detail.value
    });
  },
  confirm() {
    //无法触发这个事件？？？？
    console.log(123);
  },
  blur(e) {
    this.toPay();
  },
  onKeyPress(r) {
    switch (r.keyCode) {
      case 131:
      //键盘付款按键，第一次显示金额在屏幕，第二次按前往付款
        if (!this.data.isReady) {
          this.setData({
            money: r.amount,
            isReady: true
          });
        }
        else {
          this.toPay();
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
  toPay() {
    app.globalData.payMoney = this.data.money;
    my.navigateTo({
      url: "/pages/fastPay/fastPay",
      success:()=> {
        this.setData({
          money: "",
          isReady: false
        })
      }
    });
  },
  onLoad() {

  },
  onUnload() {
  }
});
