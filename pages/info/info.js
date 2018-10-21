const app=getApp();
Page({
  data: {
    Message:[]
  },
  onLoad(options) {
    var uphone=app.globalData.uphone;
    app.ajaxGet('WeChatHome',{token:uphone,type:'GetMessage'},data=>{
      var res=JSON.parse(data).Message;
      this.setData({Message:res});
    });
  },
  infoDetail(e){
    var message_id=e.currentTarget.dataset.idx;
    wx.navigateTo({
      url:'../infoDetail/infoDetail?message_id='+message_id
    });
  },
  onPullDownRefresh(){
    this.onLoad();
  },
  onShareAppMessage(){}
});