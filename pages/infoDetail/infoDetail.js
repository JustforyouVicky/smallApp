const app=getApp();
Page({
  data:{
    Message:{}
  },
  onLoad(options){
    var message_id=options.message_id;
    if(message_id){
      app.ajaxGet('WeChatHome',{token:message_id,type:'GetMessageInform'},data=>{
        var res=JSON.parse(data).Message[0];
        this.setData({Message:res});
      });
    }
  },
  onPullDownRefresh(){
    this.onLoad();
  },
  onShareAppMessage(){}
});