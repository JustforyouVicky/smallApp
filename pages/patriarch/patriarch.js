const app=getApp();
var imgUrl=app.globalData.imgUrl;
Page({
  data: {
    imgList:[],
    ClassroomUser:[],
    searchRes:''
  },
  onLoad(options){
    if(this.data.searchRes==''){
      app.ajaxGet('WeChatClassroomUser',{type:'GetClassroomUser'},data=>{
        var res=JSON.parse(data).ClassroomUser;
        var imgList=res.slice(-5);
        this.setData({
          ClassroomUser:res,
          imgList:imgList
        });
      });
    
    }
  },
  search(e){
    this.setData({searchRes:e.detail.value});
    app.ajaxGet('WeChatClassroomUser',{token:this.data.searchRes,type:'QueryClassroomUser'},data=>{
      var res=JSON.parse(data).QueryClassroomUser;
      this.setData({ClassroomUser:res});
    });
  },
  patriarchDetail(e){
    var project_id=e.currentTarget.dataset.idx;
    wx.navigateTo({
      url: '../patriarchDetail/patriarchDetail?project_id='+project_id
    });
  },
  onPullDownRefresh(){},
  onShareAppMessage(){}
});