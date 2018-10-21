const app=getApp();
Page({
  data: {
    showModel:false,
    isClick:false,
    classNum:null,
    leaveReason:'',
    children_id:null,
    uphone:'',
    ClassPeriod:[],
    ClassManage:[],
    isClass:false,
    leaveDate:'',
    days:[],
    week:'',
    period_time:'',
    classList:[]
  },
  onLoad(options){
    var now = new Date(); 
    var nowTime = now.getTime(); 
    var day = now.getDay();
    var oneDayTime = 24*60*60*1000; 
    var MonTime =new Date(nowTime - (day-1)*oneDayTime);
    var TuesTime=new Date(nowTime + (2-day)*oneDayTime);
    var WedTime=new Date(nowTime + (3-day)*oneDayTime);
    var ThurTime=new Date(nowTime + (4-day)*oneDayTime);
    var FriTime=new Date(nowTime + (5-day)*oneDayTime);
    var SatTime=new Date(nowTime + (6-day)*oneDayTime);
    var SunTime=new Date(nowTime + (7-day)*oneDayTime); 
    var Mon=`${MonTime.getMonth()+1}.${MonTime.getDate()}`;
    var Tues=`${TuesTime.getMonth()+1}.${TuesTime.getDate()}`;
    var Wed=`${WedTime.getMonth()+1}.${WedTime.getDate()}`;
    var Thur=`${ThurTime.getMonth()+1}.${ThurTime.getDate()}`;
    var Fri=`${FriTime.getMonth()+1}.${FriTime.getDate()}`;
    var Sat=`${SatTime.getMonth()+1}.${SatTime.getDate()}`;
    var Sun=`${SunTime.getMonth()+1}.${SunTime.getDate()}`;
    var days=[];
    days.push(Mon,Tues,Wed,Thur,Fri,Sat,Sun);
    this.setData({
      days:days,
      uphone:wx.getStorageSync('uname'),
      children_id:options.children_id
    });
    if(this.data.uphone&&this.data.children_id!==null){
      app.ajaxGet('WeChatHome',{token:this.data.uphone,type:'GetClassPeriod'},data=>{
        var res=JSON.parse(data).ClassPeriod;  
        this.setData({ClassPeriod:res});
      });
      app.ajaxGet('WeChatHome',{
          token1:this.data.uphone,
          token2:this.data.children_id,   
          type:'GetClassManage'
        },data=>{
          var res=JSON.parse(data).ClassManage;
          if(res!==[]){
          res.forEach((ele)=>{
            var newClassTime=[];
            newClassTime.length=7;
            ele.Classtime.forEach((item)=>{
              var ind=Number(item.week);
              newClassTime[ind]=item;
            })
            ele.Classtime=newClassTime;
          })
          for(var i=0;i<res.length;i++){
            for(var m=0;m<res[i].Classtime.length;m++){
              for(var j=0;j<days.length;j++){
                if(m==j &&res[i].Classtime[m]!==undefined){
                  res[i].Classtime[m]['day']=days[j];
                }
              }
            }
          }
          this.setData({classList:res});
        }  
      });      
    }
  },
  leaveReason(e){
    this.setData({leaveReason:e.detail.value});
  },
  activate(e){
    this.setData({
      isClick:!this.data.isClick
    });
  },
  leave(e){
    var leaveDate=e.currentTarget.dataset.day;
    var weeks=e.currentTarget.dataset.idx;
    var week=(weeks==0?'周一':(weeks==1?'周二':(weeks==2?'周三':(weeks==3?'周四':(weeks==4?'周五':(weeks==5?'周六':'周日'))))));
    var period_time=e.currentTarget.dataset.time
    this.setData({
      leaveDate:leaveDate,
      period_time:period_time,
      week:week,
      showModel:!this.data.showModel
    });
  },
  close(){ /**关闭请假的模态框 */
    this.setData({
      showModel:false,
      isClick:!this.data.isClick
    });
  },
  /*提交请假申请*/
  submitBtn(){
    if(this.data.uphone!=='13413491349'&&this.data.leaveDate&&this.data.leaveReason!==''&&this.data.children_id){
      wx.showLoading({title:'提交中...'});
      wx.request({ 
        url: 'https://small.aisuoedu.com/api/WeChatHome',
        data: {    
          token1:this.data.uphone,
          token2:this.data.leaveDate,
          token3:this.data.children_id,
          token4:this.data.leaveReason,
          type:'InsertCourseLeave'
        },
        method: 'GET',
        header: {'content-type':'application/json'}, 
        success:res=>{
          wx.hideLoading();
          if(res.data=='{"results":"提交成功"}'){
            wx.showToast({
              title:'提交成功!',
              duration:3000,
              success:res=>{
                this.setData({
                  showModel:!this.data.showModel,
                  isClick:!this.data.isClick
                });
              }
            });
          }else if(res.data=='{"results":"已经有请假正在处理中"}'){
            wx.showModal({
              content:'您已经有请假正在处理中。',
              showCancel:false,
              success:res=>{
                if(res.confirm){
                  this.setData({
                    showModel:!this.data.showModel,
                    isClick:!this.data.isClick
                  });
                }
              }
            });
          }else{
            wx.showModal({
              content:'请假失败，请重试！',
              showCancel:false,
              success:res=>{
                if(res.confirm){
                  this.setData({
                    showModel:!this.data.showModel,
                    isClick:!this.data.isClick
                  });
                }
              }
            });
          }
        },
        fail:()=>{
          wx.hideLoading();
          wx.showModal({
            content:'网络故障,请检查!',
            showCancel:false,	
          });
        }
      });
    }else if(this.data.leaveReason==''&&this.data.uphone!=='13413491349'){
      wx.showModal({content:'请假原因不能为空',showCancel:false,});
    }else if(this.data.uphone=='13413491349'){
      wx.showModal({
        content:'此号码为体验号码,不能进行提交操作!',
        showCancel:false
      });
    }
  },
  onPullDownRefresh(){
    this.onLoad();
  },
  onShareAppMessage(){}
});