const app=getApp();
Page({
  data: {
    userInfo: {},
    Students:null,
    isStandbyPhone:false,
    children_name:'',
    children_id:null,
    uphone:''
  },
  onLoad(options) {
    this.setData({
      children_id:options.children_id,
      uphone:app.globalData.uphone
    });
    this.showChildInfo();
  },
  onShow(){
    this.showChildInfo();
  },
  showChildInfo(){
    if(this.data.children_id&&this.data.uphone){
      app.ajaxGet('WeChatPersonal',{
        token1:this.data.uphone,
        token2:this.data.children_id,
        type:'GetStudentInform'
      },data=>{
        if(data!=='{"Students":[]}'){
          var res=JSON.parse(data).Students[0];
          this.setData({
            Students:res,
            children_name:res.children_name
          });
          if(res.patriarch_standby_id==''){
            this.setData({isStandbyPhone:true});
          }
        }
      });
    }
  },
  phone(){
    wx.navigateTo({
      url: `../phone/phone?children_name=${this.data.children_name}`
    });
  },
  onPullDownRefresh(){
    this.showChildInfo();
  },
  onShareAppMessage(){}
});