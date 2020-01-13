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
  apiUrl: "https://xmfw.lepay.vip/index.php/",
  appid: "2019120469573920",
  XcxDatas: {
    formData: null,
    userInfo: "",
    imgUrl: "https://xmfw.lepay.vip/",
    defaultPhoto: "https://xmfw.lepay.vip/",
    siteBaseUrl: "https://xmfw.lepay.vip//index.php",
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
