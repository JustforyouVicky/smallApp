const app=getApp();
Page({
  data: {
    uname:'',
    upwd:''
  },
  unameInput(e){
    this.setData({uname:e.detail.value});
  },
  passwordInput(e){
    this.setData({upwd:e.detail.value});
  },
  uidBlur(){
    var reg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if(!reg.test(this.data.uname)){
      wx.showModal({
        content:'手机号格式错误,请重新输入!',
        showCancel:false,
        confirmText:'重新输入',
        success:res=>{
          this.setData({uname:''});
        }
      });
    }
  },
  pwdBulr(){
    var pwdReg=/^[0-9A-Za-z]{4,12}$/;
    if(!pwdReg.test(this.data.upwd)){
      wx.showModal({content:'密码必须4-12位,包含数字或字母！'});
    }
  },
  login(){
    wx.showModal({
      content:'确定要切换账号吗?',
      confirmText:'永久切换',
      cancelText:'暂时登录',
      confirmColor:'#adadad',
      success:res=>{
        if(res.confirm){
          wx.removeStorage({key: 'children_info'});
          if(this.data.uname!=='13413491349'&&this.data.upwd){
            app.ajaxGet('WeChatPersonal',{
              token1:this.data.uname,
              token2:this.data.upwd,
              type:'GetLogin'
            },data=>{
              var res=JSON.parse(data).results;
                if(res=="账号密码匹配正确"){
                  wx.navigateTo({
                    url: `../perpetualChage/perpetualChage?uphone=${this.data.uname}&upwd=${this.data.upwd}`
                  }); 
                }else if(res=='密码错误'){
                  wx.showModal({
                    content:'云账号或密码错误，请重试！',
                    showCancel:false,
                    success:res=>{
                      if(res.confirm){
                        this.setData({
                          uname:'',
                          upwd:''
                        });
                      }
                    }
                  });
                }else if(res=="用户不存在"){
                  wx.showModal({
                    content: '用户不存在！',
                    showCancel: false
                  });
                }else{
                  wx.showModal({
                    content:'网络故障，请检查！',
                    showCancel:false
                  });
                }
            });
          }else{
            wx.showModal({
              content:'此号码为体验号码,不能永久绑定,只能临时登录',
              showCancel:false,
            });
          }
        }else if(res.cancel){
          wx.removeStorage({key: 'children_info'});
          if(this.data.uname&&this.data.upwd){
            app.ajaxGet('WeChatPersonal',{
              token1:this.data.uname,
              token2:this.data.upwd,
              type:'GetLogin'
            },data=>{
              var res=JSON.parse(data).results;
                if(res=="账号密码匹配正确"){
                  wx.setStorageSync('uname', this.data.uname);
                  wx.switchTab({
                    url: '../index/index'
                  });
                }else if(res=='密码错误'){
                  wx.showModal({
                    content:'云账号或密码错误，请重试！',
                    showCancel:false,
                    success:res=>{
                      if(res.confirm){
                        this.setData({
                          uname:'',
                          upwd:''
                        });
                      }
                    }
                  });
                }else if(res=="用户不存在"){
                  wx.showModal({
                    content: '用户不存在！',
                    showCancel: false
                  });
                }else{
                  wx.showModal({
                    content:'网络故障，请检查！',
                    showCancel:false
                  });
                }
            });
          }
        }
      }
    });
  },
  onPullDownRefresh(){},
  onShareAppMessage(){}
});