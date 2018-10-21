const app = getApp();
var imgUrl= app.globalData.imgUrl;
Page({
  data: {
    ClassroomChildren:[],
    imgList:[],
    searchRes:''
  },
  onLoad(options){
    if(this.data.searchRes==''){
      app.ajaxGet('WeChatClassroomChildren',{type:'GetClassroomChildren'},data=>{
        var res=JSON.parse(data).ClassroomChildren;
          var imgList=res.slice(-5);
          this.setData({
            ClassroomChildren:res,
            imgList:imgList
          });
      });
    }
  },
  search(e){
    this.setData({searchRes:e.detail.value});
    app.ajaxGet('WeChatClassroomChildren',{token:this.data.searchRes,type:'QueryClassroomChildren'},data=>{
      var res=JSON.parse(data).QueryClassroomChildren;
      this.setData({ClassroomChildren:res});
    });
  },
  expressionDetail(e){
    var project_id=e.currentTarget.dataset.idx;
    wx.navigateTo({
      url: '../expressionDetail/expressionDetail?project_id='+project_id
    });
  },
  onPullDownRefresh() {
    this.onLoad();
  },
  onShareAppMessage(){}
});