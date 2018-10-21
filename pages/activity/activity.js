const app=getApp();
Page({
  data:{
    ActivityCourse:[],
    children_id:null
  },
  onLoad(options) {
    this.setData({children_id:options.children_id});
    var uphone=wx.getStorageSync('uname');
    wx.showLoading({title:'加载中...'});
    if(uphone){
      app.ajaxGet('WeChatHome',{token:uphone,type:'GetActivityCourse'},data=>{
        var res=JSON.parse(data).ActivityCourse;
          this.setData({ActivityCourse:res})
      });
    }
  },
  activityDetail(e){
    var activity_id=e.currentTarget.dataset.act;
    wx.navigateTo({
      url: `../activityDetail/activityDetail?activity_id=${activity_id}&children_id=${this.data.children_id}`
    });
  },
  onPullDownRefresh() {
    this.onLoad();
  },
  onShareAppMessage() {}
});