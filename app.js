App({
  globalData: {
    userInfo: null,
    hasUserInfo: false,
    uphone: '',
    children_id: null,
    children_name: '',
    childrenId: null
  },
  onLaunch() {
    /*获取用户信息*/
    this.getUserInfo();
    this.getChildrenId();
  },
  getUserInfo() {
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        this.globalData.userInfo = res.data;
        this.globalData.hasUserInfo = true
      }
    });
  },
  getChildrenId() {
    wx.getStorage({
      key: 'uname',
      success: res => {
        this.globalData.uphone = res.data;
        this.ajaxGet('WeChatPersonal',{token:this.globalData.uphone,type:'SwitchChildrenOnlyOne'},data=>{
          var res = JSON.parse(data).Students[0];
          this.globalData.children_id = res.children_id;
          this.globalData.children_name = res.children_name;
          if (this.childrenIdCallback) {
            this.childrenIdCallback(res);
          }
        });
      }
    });
  },
  ajaxGet(url,data,callback){
    wx.showLoading({title:'加载中...'});
    wx.request({
      url: 'https://small.aisuoedu.com/api/'+url,
      data: data,
      method: 'GET',
      header: {'content-type': 'application/json'},
      success:res=>{
        wx.hideLoading();
        callback(res.data);
      },
      fail:(error)=>{
        wx.hideLoading();
        console.log(error);
      }
    });
  },

});