const app=getApp();
Page({
  data: {
    Orders:[],
    children_name:'',
    uphone:'',
    payWayImg:[
      'https://small.aisuoedu.com/mini/img/user/1(10).png',
      'https://small.aisuoedu.com/mini/img/user/1(11).png',
      'https://small.aisuoedu.com/mini/img/user/1(12).png',
      'https://small.aisuoedu.com/mini/img/user/1(13).png'
    ]
  },
  onLoad(options) {
      var children_name=options.children_name;
      var uphone=wx.getStorageSync('uname');
      this.setData({
        children_name:children_name,
        uphone:uphone
      });
      this.showPayRecord();
  },
  showPayRecord(){
    if(this.data.children_name&&this.data.uphone){
      app.ajaxGet('WeChatPersonal',{
        token1:this.data.uphone,
        token2:this.data.children_name,
        type:'GetOrderInform'
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
  record(e){
    var order_id=e.currentTarget.dataset.order;    
    wx.navigateTo({
      url: '../record/record?order_id='+order_id
    });
  },
  onPullDownRefresh() {
    this.showPayRecord();
  },
  onShareAppMessage(){}
});