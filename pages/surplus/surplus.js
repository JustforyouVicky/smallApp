const app=getApp();
Page({
  data: {
    total_class:null,
    rest_class:null,
    num_class:null,
    CourseDetailsAiSuo:[]
  },
  onLoad(options){
    var uphone=wx.getStorageSync('uname');
    var children_id=options.children_id;
    this.setData({
      total_class:options.total_class,
      num_class:options.num_class,
      rest_class:options.rest_class
    });
    app.ajaxGet('WeChatHome',{
      token1:uphone,
      token2:children_id,
      type:'GetCourseDetailsAiSuo'
    },data=>{
      var res=JSON.parse(data).CourseDetailsAiSuo;
      this.setData({CourseDetailsAiSuo:res})
    }); 
  },
  onPullDownRefresh() {
    this.onLoad();
  },
  onShareAppMessage(){}
});