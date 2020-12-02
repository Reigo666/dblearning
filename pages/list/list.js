// pages/list/list.js
Page({
  data: {
    movies:[],
    src:''
  },

  /**
   * 生命周期函数--监听页面加载
   * options 别的页面传过来的
   */
  onLoad: function (options) {
    /* 通过传进来的标题更改标题 */
    console.log(options);
    wx.setNavigationBarTitle({
      title: options.title,   
    });

    

    wx.getStorage({
      // 通过title 得到缓存的每个movie的信息
      key: options.title,
      success: (result) => {
        // 异步获取需要注意，result.data才是缓存数据。 同步result就是缓存数据
        this.setData({
          src:options.src,
          movies:result.data
        });
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
})