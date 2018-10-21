const app=getApp();
Page({
  data:{
    time:0,
    Share:[],
    imgUrl:[],
    shareDate:'',
    shareTime:''
  },
  onLoad(options){
    var uphone=wx.getStorageSync('uname');
    wx.showLoading({title:'加载中...'});
    if(uphone!==''){ 
      app.ajaxGet('WeChatHome',{token:uphone,type:'GetQRcode'},data=>{
        if(data.Message=="出现错误。"){
          wx.showModal({
            content:'网络故障,请检查!',
            showCancel:false,	
          });
        }else{
          var res=JSON.parse(data).QRCodeUrl;
          var imgUrl=[];
          imgUrl.push(res);
          this.setData({imgUrl:imgUrl});
        }
      });
      app.ajaxGet('WeChatHome',{token:uphone,type:'GetShareTime'},data=>{
        if(data.Message=="出现错误。"){
          wx.showModal({
            content:'网络故障,请检查!',
            showCancel:false,	
          });
        }else{
          var res=JSON.parse(data).time;
          this.setData({time:res});
        } 
      });
      app.ajaxGet('WeChatHome',{token:uphone,type:'GetShare'},data=>{
        if(data.Message=="出现错误。"){
          wx.showModal({
            content:'网络故障,请检查!',
            showCancel:false,	
          });
        }else{
          var res=JSON.parse(data).Share;
          this.setData({Share:res});
        }
      }); 
    }
  },
  
  onPullDownRefresh(){},
  onShareAppMessage(){}
})