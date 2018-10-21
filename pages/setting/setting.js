Page({
  data: {
    uphone:''
  },
  onLoad(options){},
  remind(e){},
  expression(e){},
  activity(e){
  },
  update(){
    wx.getStorage({
      key: 'uname',
      success:res=>{
        wx.navigateTo({
          url: '../update/update?uphone='+res.data
        });
      },
      fail:()=>{
        wx.showModal({
          content:'亲，您还没有绑定账号哟！',
          confirmText:'去绑定！',
          cancelText:'没有账号',
          cancelColor:'#adadad',
          confirmColor:'#f00',
          success:res=>{
            if(res.confirm){
              wx.navigateTo({
                url: '../switchAccount/switchAccount'
              });
            }
          }
        });
      }
    });
  },
  onPullDownRefresh(){},
  onShareAppMessage(){}
});