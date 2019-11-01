Page({
  data: {},
  back() {
    my.reLaunch({
      url: "/pages/checkoutCounter/checkoutCounter"
    });
  },
  timeId:undefined,
  onLoad() {
    this.timeId= setTimeout(() => {
      this.back();
    }, 10000)
  },
  onUnload(){
    if(this.timeId)
      clearTimeout(this.timeId)
  }
});
