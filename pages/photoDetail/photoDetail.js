const app=getApp();
Page({
  data: {
    showModel:false,
    clickImg:'',
    shareTempFilePath:'',
    actionSheetHidden: true,
    photo_album_id:null,
    PhotoPath:[] ,
    imgUrl:[]
  },
  onLoad(options){
    this.setData({photo_album_id:options.photo_album_id});
    var uphone=wx.getStorageSync('uname');
    wx.showLoading({title:'加载中...'});
    if(uphone&&this.data.photo_album_id){
      app.ajaxGet('WeChatHome',{
        token1:uphone,  
        token2:this.data.photo_album_id,   
        type:'GetPhotoPath'
      },data=>{
        var res=JSON.parse(data).PhotoPath;
        this.setData({PhotoPath:res});
        var imgUrl=[];
        for(var i=0;i<res.length;i++){
          imgUrl.push(res[i].photo_path);
        }
        this.setData({imgUrl:imgUrl});
      });
    }
  },
  /*点击照片预览,保存*/
  pDetail(e){
    wx.previewImage({  
      current:e.currentTarget.dataset.img, /*当前显示图片*/     
      urls: this.data.imgUrl, /*预览的图片列表 */
    });   
  }, 
  onPullDownRefresh() {
    this.onLoad();
  },
  onShareAppMessage(){}
});