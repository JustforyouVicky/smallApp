const app=getApp();
Page({
  onLoad(options) {
    var uphone=wx.getStorageSync('uname');
      var children_id=options.children_id;
    wx.showLoading({title:'加载中...'});
    if(uphone&&children_id){
      app.ajaxGet('WeChatHome',{
        token1:children_id,  
        token2:uphone,   
        type:'GetClassPhotoalbum'
      },data=>{
        var res=JSON.parse(data).ClassPhotoalbum;
        this.setData({ClassPhotoalbum:res});
      });
    }
  },
  classPhoto(e) {
    var photo_album_id=e.currentTarget.dataset.album;
    wx.navigateTo({
      url: `../photoDetail/photoDetail?photo_album_id=${photo_album_id}`
    });
  },
  onPullDownRefresh(){
    this.onLoad();
  },
  onShareAppMessage() {}
})