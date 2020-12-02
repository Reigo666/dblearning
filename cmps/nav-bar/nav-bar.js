// cmps/nav-bar/nav-bar.js
Component({
  /**
   * 组件的属性列表
   * 对外公开，写在这里表示可以有外界传输进来
   */
  properties: {
    title:{
      type:String,
      value:''
    },
    titleColor:{
      type:String,
      value:'#000'
    },
    statusBarColor:{
      type:String,
      value:'#fff'
    },
    navBarColor:{
      type:String,
      value:'#fff'
    },
    back:{
      type:String,
      value:'true'
    },
    home:{
      type:String,
      value:'true'
    }
  },

  /**
   * 组件的初始数据
   * 数据是内部用的，不由外面传进来
   */
  data: {
    statusBarStyle:'',//状态栏样式
    navBarStyle:''//导航栏样式
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  lifetimes:{
    attached: function(){
      console.log('11213123123');
      console.log(this.properties.statusBarColor);
      const statusBarStyle1=`
      height: ${wx.db.statusBarHeight}px;
      background-color: ${this.properties.statusBarColor};
      `;
      const navBarStyle1=`
      color: ${this.properties.titleColor};
      height: ${wx.db.navBarHeight}px;
      background-color: ${this.properties.navBarColor};
      `;
      this.setData({
        statusBarStyle:statusBarStyle1,
        navBarStyle:navBarStyle1
      })
    },
  },

  ready: function(){
    console.log(this.data.statusBarStyle);
  }

  
})
