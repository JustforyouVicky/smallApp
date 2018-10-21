const app=getApp();
Page({
  data: {
    refundReason :'',/*退款原因*/
    refundDesc:'',/*退款说明*/
    checkCard:'', /*银行卡号*/
    cardName:'', /*开户名*/
    bankName:'', /*银行名称*/
    uphone:'',
    order_id:null,
    children_id:null,
    children_name:''
  },
  onLoad(options) {
    var uphone=wx.getStorageSync('uname');
    this.setData({
      order_id:options.order_id,
      children_id:options.children_id,
      uphone:uphone
    });
    this.showPersonInfo();
   
  },
showPersonInfo(){
  if(this.data.uphone&&this.data.children_id){
    app.ajaxGet('WeChatPersonal',{
      token1:this.data.uphone,
      token2:this.data.children_id,
      type:'GetStudentInform'
    },data=>{
      if(data.Message=="出现错误。"){
        wx.showModal({
          content:'网络故障,请检查!',
          showCancel:false,	
        });
      }else{
        var res=JSON.parse(data).Students[0];
        this.setData({
          Students:res,
          children_name:res.children_name
        });
      }
    });
  }
},
cardName(e){
  this.setData({cardName:e.detail.value});
},
bankName(e){
  this.setData({bankName:e.detail.value});
},
checkCard(e){
  this.setData({checkCard:e.detail.value});
},
checkBlur(){
  var reg=/^([1-9]{1})(\d{15}|\d{18})$/;
  if(!reg.test(this.data.checkCard)){
    wx.showModal({
      content:'银行卡号格式错误，请重新输入！',
      showCancel:false,
    });
  }
},
reasonInput(e){
  this.setData({
    refundReason:e.detail.value 
  });
},
refund(e){
  this.setData({refundDesc:e.detail.value});
},
submitBtn(){
  if(this.data.order_id&&this.data.cardName!=''&&this.data.bankName!=''&&this.data.checkCard!=''&&this.data.refundReason!=''&&this.data.uphone!=='13413491349'&&this.data.children_name&&this.data.refundDesc!=''){
    wx.request({
      url: 'https://small.aisuoedu.com/api/WeChatPersonal',
      data: {
        order_id:this.data.order_id,
        user_account_name:this.data.cardName,
        user_bank_name:this.data.bankName,
        user_refund_account:this.data.checkCard,
        user_refund_reason:this.data.refundReason,
        user_id:this.data.uphone,
        children_name:this.data.children_name,
        user_refund_instruction:this.data.refundDesc,
        type:'RefundApply'
      },
      method:'POST', 
      header:{'content-type': 'application/json'}, 
      success:res=>{
        wx.hideLoading();
        if(res.data=='{"results":"已提交完成"}'){
          wx.showToast({
            title:'订单提交完成，请等待工作人员处理。',
            duration:5000,
            success:()=>{
              this.setData({
                refundReason :'',
                refundDesc:'',
                checkCard:'', 
                cardName:'', 
                bankName:''
              });
              wx.switchTab({
                url: '../userCenter/userCenter'
              });
            }
          });
        }else if(res.data=='{"results":"已有退费订单正在进行退费中"}'){
          wx.showModal({
            content:'您已有退费订单正在进行退费中，请等待工作人员处理。',
            showCancel:false,
            success:()=>{
              this.setData({
                refundReason:'',
                refundDesc:'',
                checkCard:'', 
                cardName:'', 
                bankName:''
              });
              wx.switchTab({
                url: '../userCenter/userCenter'
              });
            }
          });
        }else{
          wx.showModal({
            content:'退费订单提交失败，请重试！',
            showCancel:false
          });
        }
      },
      fail:()=>{
        wx.hideLoading();
        wx.showModal({
          content:'网络故障，请检查！',
          showCancel:false
        });
      }
    });
  }else if(this.data.uphone=='13413491349'){
    wx.showModal({
      content:'此号码为体验号码,不能进行提交操作!',
      showCancel:false,
      success:()=>{
        this.setData({
          refundReason :'',
          refundDesc:'',
          checkCard:'', 
          cardName:'', 
          bankName:''
        });
      }
    });
  }else if((this.data.cardName==''||this.data.bankName==''||this.data.checkCard==''||this.data.refundReason==''||this.data.refundDesc=='')&&this.data.uphone!=='13413491349'){
    wx.showModal({
      content:'信息请填写完整',
      showCancel:false
    });
  }
},
onPullDownRefresh(){
  this.showPersonInfo();
},
onShareAppMessage(){}
});