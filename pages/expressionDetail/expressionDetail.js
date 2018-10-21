const app=getApp();
Page({
  data: {
    isVideo:true,
    isImg:false,
    ClassroomChildren:{},
    project_id:null
  },
  onLoad(options){
    var project_id=options.project_id;
    wx.showLoading({title:'加载中...'});
    if(project_id){
      app.ajaxGet('WeChatClassroomChildren',{token:project_id,type:'GetClassroomChildren'},data=>{
        var res=JSON.parse(data).ClassroomChildren[0];
        this.setData({ClassroomChildren:res});
      });
    }
  },
  onPullDownRefresh() {
    this.onLoad();
  },
  onShareAppMessage(){}
});