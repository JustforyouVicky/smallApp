const app=getApp();
Page({
  data: {
    currentTab: 0,
    showView:true,
    CourseDetails:[],
    aisuoLessons:[],
    noAisuoLessons:[]
  },
  onLoad(options) {
    var children_id=options.children_id;
    var uphone=wx.getStorageSync('uname');
    if(uphone&&children_id){
      app.ajaxGet('WeChatHome',{
        token1:uphone,
        token2:children_id,
        type:'GetCourseDetails'
      },data=>{
        var res=JSON.parse(data).CourseDetails;
        this.setData({CourseDetails:res});
        var aisuoLessons=[],noAisuoLessons=[];
        for(var i=0;i<res.length;i++){
          if(res[i].is_aisuo==1){
            aisuoLessons.push(res[i]);
          }else{
            noAisuoLessons.push(res[i]);
          }
        }
        this.setData({
          aisuoLessons:aisuoLessons,
          noAisuoLessons:noAisuoLessons
        });
      });
    }
  },
  clickTab(e){
    this.setData({
      currentTab:e.target.dataset.current
    });
    if(e.target.dataset.current=='0'){
      this.setData({showView:true});
    }else{
      this.setData({showView:false});
    }
  },
  classDetail(e){
    var details_id=e.currentTarget.dataset.idx;
    wx.navigateTo({
      url: '../classDetail/classDetail?details_id='+details_id
    });
  },

  onPullDownRefresh() {
    this.onLoad();
  },
  onShareAppMessage(){}
});