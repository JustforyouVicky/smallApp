const app=getApp();
Page({
  data: {
    Students:[],
    sexImg:[
      'https://small.aisuoedu.com/mini/img/user/1(7).png',
      'https://small.aisuoedu.com/mini/img/user/1(8).png'
    ]
  },
  onLoad(options) {
    var uphone=wx.getStorageSync('uname');
    if(uphone){
      app.ajaxGet('WeChatPersonal',{token:uphone,type:'SwitchChildren'},data=>{
        if(data!=='undefined'){
          var res=JSON.parse(data).Students;
          this.setData({Students:res});
        }
      });
    }
  },
  chooseChild(e){
    var children_id=e.currentTarget.dataset.child;
    var children_name=e.currentTarget.dataset.uname;
    wx.setStorage({
      key: 'children_info',
      data: {children_id:children_id,children_name:children_name},
      success: res=>{
        wx.switchTab({
          url: '../userCenter/userCenter'
        });
      }
    });
  },
  onShareAppMessage() {}
});