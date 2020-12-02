// pages/login/login.js ES5->ES6
Page({
  wechatLogin: function(){
    console.log('wechatLogin')
  },
  doubanLogin: function(){
    console.log('doubanLogin')
  },

  openAgreement: function(){
    console.log('openAgreement')
    wx.navigateTo({
      url: '../agreement/agreement'
      
    });
      
  }
})