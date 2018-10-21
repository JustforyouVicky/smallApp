const app=getApp();
Page({
  data: {
    Orders:[],
    payWayImg:[
      'https://small.aisuoedu.com/mini/img/user/1(10).png',
      'https://small.aisuoedu.com/mini/img/user/1(11).png',
      'https://small.aisuoedu.com/mini/img/user/1(12).png',
      'https://small.aisuoedu.com/mini/img/user/1(13).png'
    ]
  },
  onLoad(options) {
    var order_id=options.order_id;
    var uphone=wx.getStorageSync('uname');
    wx.showLoading({title:'加载中...'});
    if(order_id&&uphone){
      app.ajaxGet('WeChatPersonal',{
        token1:uphone,
        token2:order_id,
        type:'GetOrderInformReceipt'
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
  photoDetail(e){
    var imgUrl=[];
    imgUrl.push(e.currentTarget.dataset.img);
    wx.previewImage({  
      current:e.currentTarget.dataset.img, /*当前显示图片*/     
      urls:imgUrl , /*预览的图片列表 */
    });  
  },
  print(){
    wx.showModal({
      content:'暂不支持票据打印！',
      showCancel:false,	
    });
  },
  onPullDownRefresh() {
    this.onLoad();
  },
  onShareAppMessage(){}
});