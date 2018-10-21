const app=getApp();
Page({
  data: {
    phone:'',
    children_name:'',
    user_id:''
  },
  onLoad(options) {
    var uphone=wx.getStorageSync('uname');
    this.setData({
      children_name:options.children_name,
      user_id:uphone
    });
  },
  phoneInput(e){
    this.setData({phone:e.detail.value});
  },
  phoneBlur(){
    var reg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if(!reg.test(this.data.phone)){
      wx.showModal({
        content:'手机号格式错误,请重新输入!',
        showCancel:false,
        confirmText:'重新输入',
        success:res=>{
          this.setData({phone:''});
        }
      });
    }
  },
  sumitBtn(){
    if(this.data.user_id!='13413491349'&&this.data.children_name&&this.data.phone){
      app.ajaxGet('WeChatPersonal',{
        token1:this.data.user_id,
        token2:this.data.children_name,
        token3:this.data.phone,
        type:'UpdateStandbyId'
      },data=>{
        if(data=='{"results":"绑定成功"}'){
          wx.showToast({
            title:'备用电话提交成功',
            duration:5000,
            success:()=>{
              wx.switchTab({
                url: '../userCenter/userCenter'
              });
            }
          });
        }
      });
    }else if(this.data.user_id=='13413491349'){
      wx.showModal({
        content:'此号码为体验号码,不能进行提交操作!',
        showCancel:false,
        success:()=>{
          wx.switchTab({
            url: '../userCenter/userCenter'
          });
        }
      });
    }
  },
  onPullDownRefresh(){
    this.onLoad();
  },
  onShareAppMessage(){}
});