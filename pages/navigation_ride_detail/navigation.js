var amapFile = require('../ditu/libs/amap-wx.js');
var config = require('../ditu/libs/config.js');

Page({
  data: {
    steps: {}
  },
  onLoad: function() {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({key: key});
    myAmapFun.getRidingRoute({
      origin: '116.481028,39.989643',
      destination: '116.434446,39.90816',
      success: function(data){
        if(data.paths && data.paths[0] && data.paths[0].rides){
          that.setData({
            steps: data.paths[0].rides
          });
        }
          
      },
      fail: function(info){

      }
    })
  }
})