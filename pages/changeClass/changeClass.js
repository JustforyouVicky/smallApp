const app=getApp();
Page({
  data: {
    Orders:[],
    children_id:null
  },
  onLoad(options) {
    var uphone=wx.getStorageSync('uname');
    var children_name=options.children_name;
    this.setData({children_id:options.children_id});
    wx.showLoading({title:'加载中...'});
    if(uphone&&children_name){
      app.ajaxGet('WeChatPersonal',{
        token1:uphone,
        token2:children_name,
        type:'GetOrderInformRefund'
      },data=>{
        if(data.Message=="出现错误。"){
          wx.showModal({
            content:'网络故障,请检查!',
            showCancel:false,	
          });
        }else{
          var res=JSON.parse(data).Orders;
          this.setData({Orders:res});
        }
      });
    }
  },
  premium(e){
    var order_id=e.currentTarget.dataset.order;
    wx.navigateTo({
      url: `../premium/premium?order_id=${order_id}&children_id=${this.data.children_id}`
    });
  },
  onShareAppMessage() {}
});