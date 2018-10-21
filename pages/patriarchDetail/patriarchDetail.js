const app=getApp();
Page({
  data:{
    isVideo:true,
    isImg:false,
    project_id:null,
    ClassroomUser:{}
  },
  onLoad(options){
    var project_id=options.project_id;
    if(project_id){
      app.ajaxGet('WeChatClassroomUser',{token:project_id,type:'GetClassroomUser'},data=>{
        var res=JSON.parse(data).ClassroomUser[0];
        this.setData({ClassroomUser:res});
      });
    }
  },
  onPullDownRefresh(){
    this.onLoad();
  },
  onShareAppMessage(){}
});