const app = getApp();
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    uphone: '',
    children_name: '',
    children_id: ''
  },
  onLoad(options) {
    app.getUserInfo();
    if (app.globalData.userInfo !== null) {
      this.setData({
        userInfo: app.globalData.userInfo,
        uphone: app.globalData.uphone,
        hasUserInfo: true
      });
    }
    this.showOnlyChild();
  },
  onShow() {
    this.showUserInfo();
    this.showOnlyChild();
  },
  showUserInfo() {
    app.getUserInfo();
    if (app.globalData.userInfo !== null) {
      this.setData({
        userInfo: app.globalData.userInfo,
        uphone: app.globalData.uphone,
        hasUserInfo: true
      });
    }
  },
  showOnlyChild() {
    wx.getStorage({
      key: 'children_info',
      success: res => {
        this.setData({
          children_id: res.data.children_id,
          children_name: res.data.children_name
        });
        wx.getStorage({
          key: 'uname',
          success: res => {
            this.setData({
              uphone: res.data
            });
          },
          fail: () => {
            wx.showModal({
              content: '亲，您还没有绑定账号哟！',
              confirmText: '去绑定！',
              cancelText: '没有账号',
              cancelColor: '#adadad',
              confirmColor: '#f00',
              success: res => {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../switchAccount/switchAccount'
                  });
                }
              }
            });
          }
        });
      },
      fail: () => {
        wx.getStorage({
          key: "uname",
          success: res => {
            this.setData({
              uphone: res.data
            });
            wx.request({
              url: 'https://small.aisuoedu.com/api/WeChatPersonal',
              data: {
                token: this.data.uphone,
                type: 'SwitchChildrenOnlyOne'
              },
              method: 'GET',
              header: {
                'content-type': 'application/json'
              },
              success: res => {
                if (res.data !== undefined) {
                  var res = JSON.parse(res.data).Students[0];
                  this.setData({
                    children_id: res.children_id,
                    children_name: res.children_name
                  });
                }
              }

            });
          },
          fail: () => {
            wx.showModal({
              content: '亲，您还没有绑定账号哟！',
              confirmText: '去绑定！',
              cancelText: '没有账号',
              cancelColor: '#adadad',
              confirmColor: '#f00',
              success: res => {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../switchAccount/switchAccount'
                  });
                } else if (res.cancel) {
                  wx.setStorageSync('uname', '13413491349');
                }
              }
            });
          }
        });
      },
    });
  },
  datum() {
    wx.navigateTo({
      url: '../datum/datum?children_id=' + this.data.children_id
    });
  },
  change() {
    wx.navigateTo({
      url: '../changeStu/changeStu?user_id=' + this.data.uphone
    });
  },
  bind() {
    wx.login({
      success: res => {
        if (res.code) {
          app.ajaxGet('WeChat',{token: res.code,type:'IsUser'},data=>{
            var res = JSON.parse(data).results;
            if (res == '该用户已绑定') {
              wx.navigateTo({
                url: '../bind/bind'
              });
            } else {
              wx.navigateTo({
                url: '../switchAccount/switchAccount'
              });
            }
          });
        }
      }
    });
  },
  recommend() {
    wx.navigateTo({
      url: '../recommend/recommend'
    });
  },
  setting() {
    wx.navigateTo({
      url: '../setting/setting'
    });
  },
  changeClass() {
    wx.navigateTo({
      url: `../changeClass/changeClass?children_name=${this.data.children_name}&children_id=${this.data.children_id}`
    });
  },
  payRecord() {
    wx.navigateTo({
      url: '../payRecord/payRecord?children_name=' + this.data.children_name
    });
  },
  accredit() {
    wx.navigateTo({
      url: '../accredit/accredit'
    });
  },
  onPullDownRefresh() {
    this.onLoad();

  },
  onShareAppMessage() {}
});