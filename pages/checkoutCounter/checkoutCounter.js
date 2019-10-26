Page({
  data: {
    money: ""
  },
  moneyInput(e) {
    this.setData({
      money: e.detail.value
    });
  },
  confirm() {
    my.ix.startApp({
      appName: 'cashier',
      totalAmount:this.data.money,
      bizNo: '12345678',
      phoneNumber:true,
      orderDetail: [{ name: '名称1', content: '详情134', fontColor: 'gray' }, { name: '名称2', content: '详情456', fontColor: 'red' }],
      success: (r) => {
        my.showToast({ content: r.barCode });
      }
    });
  },
  onLoad() {

  },
});
