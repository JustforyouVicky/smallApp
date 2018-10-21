const app=getApp();
Page({
  data: {
    CoursesSpecialty:{}
  },
  onLoad(options) {
    var courses_specoalty_id=options.courses_specoalty_id;
    if(courses_specoalty_id){
      app.ajaxGet('WeChatHome',{token:courses_specoalty_id,type:'GetCoursesSpecialty'},data=>{
        var res=JSON.parse(data).CoursesSpecialty[0];
        this.setData({CoursesSpecialty:res});
      });
    } 
  },
 
  onPullDownRefresh(){
    this.onLoad();
  },
  onShareAppMessage(){}
})