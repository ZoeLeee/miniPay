import { Page } from '/utils/ix';
import { myReq } from '/utils/request';
import { RequestApi ,USE_MODE_KEY,UseMode} from '/utils/enum';

const app = getApp();

Page({
  data: {
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
    if(isNaN(parseFloat(this.data.money))){
      my.showToast({
        type:"fail",
        content:"请输入正确的金额"
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
  onUnload() {
  }
});
