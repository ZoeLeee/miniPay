App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    let r = my.ix.getSysPropSync({key: 'ro.serialno'});
    if(r){
      this.globalData.sn=r.value;
    }
  },
  onShow(options) {
   
  },
  onError(err) {
    console.error(err);
  },
  apiUrl: "https://fw.lepay.vip/index.php/",
  appid: "2019110568883557",
  XcxDatas: {
    formData: null,
    userInfo: "",
    imgUrl: "https://fw.lepay.vip/",
    defaultPhoto: "https://fw.lepay.vip/",
    siteBaseUrl: "https://fw.lepay.vip//index.php",
    shop_id: "",
    xcx_id: "",
    tmp_id: "",
    openid: ""
  },
  globalData: {
    account_type: "",
    isopenvip: "",
    isopenfood: "",
    id: "",
    storeid: "",
    sid: "",
    merchantid: "",
    headimgurl: "",
    username: "",
    phonenumber: "",
    payMoney: ""
  },
});
