// pages/home/home.js
Page({
  data:{
    allMovies: [
      {
        title:'影院热映',
        url:'v2/movie/in_theaters',
        movies:[],
        src:"https://img.rednet.cn/2019/10-25/ced6d11b-aaeb-4483-bcba-9b30c60ce7e7.jpg"
      },
      {
        title:'新片榜',
        url:'v2/movie/new_movies',
        movies:[],
        src:'http://img1.gtimg.com/hn/pics/hv1/207/151/1264/82230312.jpg'
        //https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606802564351&di=e2e991fb136ce28c7f4b2e5224ba9523&imgtype=0&src=http%3A%2F%2Fimage11.m1905.cn%2Fuploadfile%2F2014%2F0304%2F20140304053404145506.jpg
      },
      {
        title:'口碑榜',
        url:'v2/movie/weekly',
        movies:[],
        src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606802613845&di=6d24cce53fa988c97a79b3c0ecaf064c&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fpic%2F6%2Fc0%2F75de1479813.jpg'
      },
      {
        title:'北美票房榜',
        url:'v2/movie/us_box',
        movies:[],
        src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606802659934&di=d676ecaf22e12b5b2563450e77ced91b&imgtype=0&src=http%3A%2F%2Fimg21.mtime.cn%2Fmg%2F2012%2F02%2F17%2F234142.67569311.jpg'
      },
      {
        title:'Top250',
        url:'v2/movie/top250',
        movies:[],
        src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606802681783&di=76c9c1ecd17e7aea487b08eaa1bf5501&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fhn%2Fpics%2Fhv1%2F207%2F151%2F1264%2F82230312.jpg'
      },

    ]
  },
  onLoad: function () {
    // wx.setNavigationBarColor({
    //   frontColor: '#ffffff',
    //   backgroundColor: '#42BD55'
    // });
      
    //获取经纬度 
    //  this.loadCity(this.loadData);/* 传进去city实参 在函数内部赋值 得到后再用于外部 */
    // wx.db.toast('我爱你',2000);
    // wx.db.toastSuccess('成功',2000);
    // wx.db.toastError('失败',2000);
    this.loadLocalData();
    // this.loadCity((city)=>{
    //   this.loadNewData(0,{city:city});
    // })
    // this.loadNewData(1);
    // this.loadNewData(2);
    // this.loadNewData(3);
    // this.loadNewData(4);
  },

  loadNewData:function(idx,params){
    const obj=this.data.allMovies[idx];
    obj.movies=[];
    wx.request({
      url: wx.db.url(obj.url),
      data:params,
      header: {'content-type':'json'},
      success: (res) => {
        var movies1=new Array(20);
        for (let index = 0; index < 20; index++) {
          movies1[index]={
            name:123
          }; 
        }
        for (let index = 0; index < 20; index++) {
          let movie=movies1[index].subject || movies1[index];
          this.updateMovie(movie);    
          obj.movies.push(movie);
        }
        this.setData(this.data);
        // this.setData({/* 在页面渲染完后重新加载数据 setdata可以重新渲染 */
        //   movies:movies1
        // });
        console.log(obj.movies);
        // 缓存数据到本机

        wx.setStorage({
          key: obj.title,
          data: obj.movies
        });

      },
      fail: () => {
        console.log("获取[正在热映]失败");
        wx.db.toast("获取[正在热映]失败");
      },
      complete: () => {}
    });
  },
  loadLocalData: function(){
    for (let index = 0; index < this.data.allMovies.length; index++) {
      const obj=this.data.allMovies[index];
      obj.movies=wx.getStorageSync(obj.title) || [];/* 同步获取数据 卡住 这里第一次没有缓存 需要处理*/   
    }/* 左面不存在赋值一个空的数组   wx.getStorageSync(obj.title)即为缓存数据 异步wx.getStorage(obj.title).data才是缓存数据*/
    this.setData(this.data);/* 得到所有缓存数据后刷新 */
  },

  loadData: function(city){
    wx.request({
      url: wx.db.url('v2/movie/in_theaters'),
      data: {city: city},
      header: {'content-type':'json'},
      success: (res) => {
        console.log("测试");
        var movies1=new Array(20);
        for (let index = 0; index < 20; index++) {
          movies1[index]={
            name:123
          }; 
        }
        for (let index = 0; index < 20; index++) {
          this.updateMovie(movies1[index]);      
        }
        this.data.allMovies[0].movies=movies1;
        this.setData(/* 在页面渲染完后重新加载数据 setdata可以重新渲染 */
          this.data
        );
          

      },
      fail: () => {
        console.log("获取[正在热映]失败");
      },
      complete: () => {}
    });
   
  },
  /**
   * 获取用户所在城市
   */
  loadCity: function(success){/* 回调 return */
    wx.getLocation({
      success: (res) => {/* => 为将回调值用于 */
        //逆地理编码
        console.log(res.latitude,res.longitude);
        // console. log(res.longitude);
          wx.request({
            url: 'https://api.map.baidu.com/reverse_geocoding/v3',
            // ak=您的ak
            // output=json
            // coordtype=wgs84ll
            // location=31.225696563611,121.49884033194
            data: {
              ak:'MMIxBAHhvScKMl1kiKTXDKdZbZcs0S0Z',
              output:'json',
              coordtype:'wgs84ll',
              // location:res.latitude+','+res.longitude
              location:`${res.latitude},${res.longitude}`

            },   
            success: (res) => {
              console.log(res.data.result.addressComponent.city);
              let city=res.data.result.addressComponent.city;
              city=city.substring(0,city.length-1);
              console.log(city);
              success && success(city);/*如果有success参数传入 回调city */
              // success=city;
              // return city;
            },
            fail: () => {
              console.log('获取城市信息失败');
            },
            complete: () => {}
          });
      },
      fail: () => {
        console.log('获取位置失败');
      }
    });
  },

  updateMovie: function(movie){
    // let stars=parseInt(movie.rating.stars);
    // console.log("加载星星尝试");
    movie.stars = [1, 1, 1, 0.5, 0];
    // console.log("加载星星成功");
  },

  viewMore: function(evt){
    const index=evt.currentTarget.dataset.index;
    const obj=this.data.allMovies[index];
    // console.log(evt);
    console.log(obj.src);
    wx.navigateTo({
      url: `/pages/list/list?title=${obj.title}&url=${obj.url}&src=${obj.src}`, 
    });
      
  }

})