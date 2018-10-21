const app=getApp();
Page({
  data: {
    ActivityCourse:{},
    uphone:'',
    activity_id:null,
    children_id:null
  },
  onLoad(options){
    var children_id=options.children_id;
    var activity_id=options.activity_id;
    var uphone=wx.getStorageSync('uname');
    this.setData({
      children_id:children_id,
      uphone:uphone,
      activity_id:activity_id,
    });
    wx.showLoading({title:'加载中...'});
    if(activity_id&&uphone){
      app.ajaxGet('WeChatHome',{
        token1:uphone, 
        token2:activity_id,  
        type:'GetActivityCourse'
      },data=>{
        var res=JSON.parse(data).ActivityCourse[0];
        this.setData({ActivityCourse:res})
      });
    }
  },
  apply(){
    if(this.data.uphone!=='13413491349'&&this.data.activity_id!==null&&this.children_id!==null){
      wx.showLoading({title:'提交中...'});
      app.ajaxGet('WeChatHome',{
        token1:this.data.uphone, 
        token2:this.data.activity_id,  
        token3:this.data.children_id,  
        type:'InsertCourseActivitySign'
      },data=>{
        if(data=='{"results":"提交成功"}'){
          wx.showToast({
            title:'活动报名成功!',
            duration:5000
          });
        }else if(data=='{"results":"已报名该活动课"}'){
          wx.showModal({
            content:'您已报名该活动课,等待工作人员联系您',
            showCancel:false
          });
        }else{
          wx.showModal({
            content:'活动报名失败,请重试',
            showCancel:false
          });
        }
      });
    }else if(this.data.uphone=='13413491349'){
      wx.showModal({
        content:'此号码为体验号码,不能进行报名操作!',
        showCancel:false
      });
    }
   
  },
  onPullDownRefresh(){
    this.onLoad();
  },
  onShareAppMessage(){}
});