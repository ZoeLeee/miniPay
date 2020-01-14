import { Page } from '/utils/ix';
import { myReq } from '/utils/request';
import { RequestApi, USE_MODE_KEY, UseMode,PayType  } from '/utils/enum';
import getTradeNo from '/utils/getTradeNo';

const app = getApp();

Page({
  data: {
    tradeNo: "",
    money: "",
    isReady: false,
    images: [],
  },
  moneyInput(e) {
    const CANCEL_ICON = "←";
    let value = e.target.dataset.value;
    let oldMoney = this.data.money;

    if (value === CANCEL_ICON) {
      oldMoney = oldMoney.substring(0, oldMoney.length - 1);
    }
    else
      oldMoney += value;
    this.setData({
      money: oldMoney
    });
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
    if (isNaN(parseFloat(this.data.money))) {
      my.showToast({
        type: "fail",
        content: "请输入正确的金额"
      });
      return;
    }
    app.globalData.payMoney = this.data.money;
    my.navigateTo({
      url: "/pages/fastPay/fastPay",
      success: () => {
        this.setData({
          money: "",
          isReady: false
        })
      }
    });
  },
  async toFacePay() {
    if (isNaN(parseFloat(this.data.money))) {
      my.showToast({
        type: "fail",
        content: "请输入正确的金额"
      });
      return;
    }
    app.globalData.payMoney = this.data.money;
    if (Number(this.data.money) > 5000) {
      my.showToast({
        type: 'exception',
        content: '刷脸支付金额不能大于5000元，请选择扫码支付方式',
      });
    }
    else
      await this.startPay();
  },
  toScan() {
    if (isNaN(parseFloat(this.data.money))) {
      my.showToast({
        type: "fail",
        content: "请输入正确的金额"
      });
      return;
    };
    app.globalData.payMoney = this.data.money;
    my.navigateTo({
      url: "/pages/scanCode/scanCode?type=" + PayType.My
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
  async onLoad() {
    //初始化键盘
    this.setData({
      list: [
        {
          text: '1',
        },
        {
          text: '2',
        },
        {
          text: '3',
        },
        {
          text: '←',
        },
        {
          text: '4',
        },
        {
          text: '5',
        },
        {
          text: '6',
        },
        {
          text: '.',
        },
        {
          text: '7',
        },
        {
          text: '8',
        },
        {
          text: '9',
        },
        {
          text: '0',
        },
      ]
    })

    //加载广告
    let data = await myReq(RequestApi.Banner, {
      storeid: app.globalData.storeid || "460"
    });
    if (data.code === "000000") {
      this.setData({
        images: data.data[0].imgurl
      })
    };

    //缓存独立模式
    my.setStorageSync({
      key: USE_MODE_KEY,
      data: UseMode.NoLink
    });

  },
  onReady(){
    if (my.canIUse('hideBackHome')) {
      my.hideBackHome();
    }
  },
});
