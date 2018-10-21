const app=getApp();
Page({
  data:{
    FilePath:{}
  },
  onLoad(options) {
    var details_id=options.details_id;
    var uphone=wx.getStorageSync('uname');
    if(uphone&&details_id){
      app.ajaxGet('WeChatHome',{
        token1:uphone,
        token2:details_id,
        type:'GetFilePath'
      },data=>{
        var res=JSON.parse(data).FilePath[0];
        this.setData({FilePath:res});
      });
     
    }
  },

  onShareAppMessage(){}
});