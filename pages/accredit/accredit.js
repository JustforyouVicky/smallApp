Page({
  onLoad(){
    wx.getStorage({
      key: 'isUser',
      success:res=>{
        wx.switchTab({url: '../index/index'});        
      },
    })
  },
  UserLogin(){
    wx.login({
      success: res => {
        if(res.code){
          wx.switchTab({url: '../index/index'});
          wx.setStorageSync("isUser",'授权成功!');
        }
      }
    });
  },
  getUserInfo(e){
    var userInfo=e.detail.userInfo;
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo
    });
    wx.showLoading({title:'授权中...'});
    wx.getSetting({
      success:res=> {
        if (!res.authSetting['scope.userInfo']){
          wx.authorize({
            scope: 'scope.userInfo',
            success:(res)=> {
              this.UserLogin();
            },
            fail:()=>{
              wx.switchTab({
                url: '../index/index'
              });
            }
          });
        }else{
          this.UserLogin();
        }
      }
    });
  },
  onShareAppMessage() {}
});