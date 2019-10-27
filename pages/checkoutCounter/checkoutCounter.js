import { Page } from '/utils/ix';
import getTradeNo from '/utils/getTradeNo';
import { RequestStatus } from "../../utils/enum";
import { myReq } from '/utils/request';

const app = getApp();
const SIGN = "fomd/uhrR3OvFjwRV8NcOft+p4bdXNzYJUMyRw/1cchiSW54VjRXIiR44BswTJU/RTWeyTZF4nuQxmXQDWpSvJE5S77fk/W+FdpBcSbUhmHLGFy1QDFVOhUP4iJoJPEN3OQbYTSpFiRe5chQzhs1pde3/WwCl3zqfBaRObhuj+e5F0lMeI2nzEzzqp0/QUFAjUBdodqV3PFSHTQ9mj3NohS1d8aJI6nRRMKIuLuiyoQZzw3a+dI7xTpJFPJrRG6HMoW0Zw6oauxjTIP3MORNRwMSCD7BlzZcZ+0q5Q1/ZNPhS2eMOHqmVObQko9Z1xmRWqmqjCTPwW83CFnA8+eJPQ==";

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
      orderDetail: [{ name: '名称1', content: '详情134', fontColor: 'gray' }],
      faceLoadingTimeout: "5",
      showScanPayResult: true,
      success: async (r) => {
        console.log(r);
        this.setData({
          isReady: false
        });
        let params = {
          auth_code: r.barCode,
          buyer_id: r.buyerId,
          seller_id: r.buyerId,
          total_amount: this.data.money,
        };
        this.pay(params);
      }
    });
    my.ix.onCashierEventReceive((r) => {
      if (r.bizType = 'RESULT_CLOSED')
        console.log('收银台关闭');
      else if (r.bizType = 'RESULT_BTN_FUNCTION')
        console.log('收银台自定义按钮按下');
      else if (r.bizType = 'RESULT_MEMBER')
        console.log('支付结果页会员开卡');
      else
        console.log('RESULT: ' + r.keyCode);
    });
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
  pay(data) {
    let TEST_ID="2088402219240877";
    let TEST_PARAMS=`app_id=2019101568407032&biz_content={"out_trade_no":"20191027230236104","scene":"bar_code","auth_code":"280804359255757108","product_code":"FACE_TO_FACE_PAYMENT","subject":"Iphone6 16G","buyer_id":"2088202548262148","seller_id":"2088402219240877", "total_amount":0.01,"trans_currency":"CNY","settle_currency":"CNY", }&charset=GBK&method=alipay.trade.pay&sign_type=RSA2&timestamp=2019-10-27 22:51:08&version=1.0`;
    //&biz_content=https://fw.lepay.vip/alipayapi下&sign=ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE
    const PAY_URL = `https://fw.lepay.vip/alipayapi?timestamp=2019-10-27 22:51:08&method=alipay.trade.pay&app_id=${app.appid}&sign_type=RSA2&version=1.0&charset=GBK&biz_content={
      "out_trade_no":"${this.data.tradeNo}",
      "scene":"bar_code",
      "auth_code":"${data.auth_code}",
      "product_code":"FACE_TO_FACE_PAYMENT",
      "subject":"Iphone6 16G",
      "buyer_id":"${data.buyer_id}",
      "seller_id":"${TEST_ID}",
      "total_amount":${this.data.money},
      "trans_currency":"CNY",
      "settle_currency":"CNY",
  }`;
    // let params = Object.assign({
    //   out_trade_no: this.data.tradeNo,
    //   scene: "bar_code",
    //   subject: "test",
    // }, data);
    console.log(PAY_URL);
    my.request({
      url: `https://fw.lepay.vip/alipayapi?${TEST_PARAMS}&sign=${SIGN}`,
      success: (res) => {
        console.log(res);
      },
    });
  },
  onLoad() {
    console.log(getTradeNo());
  },
  onUnload() {
    console.log("unload");
    my.ix.offCashierEventReceive();
  }
});
