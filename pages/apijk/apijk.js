// pages/apijk/apijk.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc:""
  },
  uploadImg:function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;        
        wx.uploadFile({
          url: 'https://guahunyo001.applinzi.com/upload_handle.php', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file001',
          // formData:{
          //   'user': 'test'
          // },
          success: function(res){
            var data = res.data;
            console.log("上传成功");
            //do something
          }
        })
      }
    })
  },
  downImg:function(){
    var that = this;
    wx.downloadFile({
      url: 'http://guahunyo001-test.stor.sinaapp.com/DSC03575.jpg', 
      success: function(res) {
        that.setData({
          imgSrc:res.tempFilePath
        })
        // wx.playVoice({
        //   filePath: res.tempFilePath
        // })
      }
    })
  },
  login:function(){
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://guahunyo001.applinzi.com/code.php', 
            data: {
               code:res.code
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
              console.log(res.data)
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})