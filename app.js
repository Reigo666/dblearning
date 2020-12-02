//app.js
App({
  onLaunch: function () {
    wx.db = {};
    wx.db.url=(url)=>{
      return `https://douban-api.uieee.com/${url}`;
    }
    this.initToast();
    //得到这台设备状态栏的高度 和导航栏的高度
    const info = wx.getSystemInfoSync();
    wx.db.statusBarHeight=info.statusBarHeight;
    console.log(wx.db.statusBarHeight);
    if(info.platform=='android'){
      wx.db.navBarHeight=48;
    }else{
      wx.db.navBarHeight=44;
    }
    console.log(wx.db.navBarHeight);
    console.log("输出高度成功");



    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
    //Toast
    initToast:function(){
      const time=1500;
      //type==0 :正常
      //type==1 :成功信息
      //type==2 :错误信息
      const ToastTypeNormal = 0;
      const ToastTypeSuccess = 1;
      const ToastTypeError = 2;
      let commonToast=(title,type,duration=time)=>{
        let options={
          title:title,
          icon:'none',
          duration:duration
        };
        if(type==ToastTypeSuccess){
          options.icon='success';
        }else if(type == ToastTypeError){
          options.image='/assets/imgs/movie_icon.png';
        }
        wx.showToast(options);
          
      }

      wx.db.toast=(title,duration)=>{
        commonToast(title,0,duration);     
      }
      wx.db.toastSuccess=(title,duration = time)=>{
        commonToast(title,1,duration) ;      
      }
      wx.db.toastError=(title,duration = time)=>{
        commonToast(title,2,duration) ;     
      }
    },
  globalData: {
    userInfo: null
  }
})