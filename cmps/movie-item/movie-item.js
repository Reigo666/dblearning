// cmps/movie-item/movie-tiem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // name:{
    //   type: String,
    //   value:''
    // },
    // size:{
    //   type:Number,
    //   value:0
    // }
    src1:{
      type:String,
      value:null
    },
    movie:{
      type:Object,
      value:null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    detail:function(){
      // wx.setStorageSync({
      //   key: 'movie',
      //   data: data,   
      // });

      // wx.db.movie=this.data.movie;
      wx.navigateTo({
        url: `/pages/detail/detail?movie=${JSON.stringify(this.data.movie)}`,
        
      });
        
    }
  }
})
