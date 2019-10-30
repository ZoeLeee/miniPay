import { RequestStatus, RequestApi, PayType } from "/utils/enum";
import { myReq } from '/utils/request';

const app = getApp();
Page({
  data: {
    qrcode: "",
  },
  async onLoad(query) {
    let data = await myReq(RequestApi.Code, {
      type: query.type === PayType.My ? "2" : "1",
      money: app.globalData.payMoney,
      stats: 0,
      storeid: app.globalData.storeid
    })
    console.log(data);
    if (data.status === RequestStatus.OK) {
      my.ix.generateImageFromCode({
        code: data.result.qr_code,
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
        content: data.msg
      });
      my.navigateBack();
    }
  },
});
