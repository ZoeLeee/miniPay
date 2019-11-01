Page({
  data: {time:3},
  back() {
    my.reLaunch({
      url: "/pages/checkoutCounter/checkoutCounter"
    });
  },
  timeId:undefined,
  onLoad() {
    this.timeId= setInterval(() => {
      if(this.data.time-1===0)
        this.back();
      this.setData({time:this.data.time-1});
    }, 1000)
  },
  onUnload(){
    if(this.timeId)
      clearInterval(this.timeId)
  }
});
