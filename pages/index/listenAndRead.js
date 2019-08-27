// pages/index/listenAndRead.js
const urlPath = require('../common/config').url_microService;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      comId: options.comId,

    });
    console.log(this.data.comId);
    this.getDetailInfo();
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

  },
  /**
   * 获取详情
   */
  getDetailInfo: function () {
    var that = this;
    wx.request({
      url: urlPath + '/composition/examQuestion', //请求地址
      header: { //请求头
        "Content-Type": "applciation/json"
      },

      method: "GET", //get为默认方法/POST
      data: {
       // userId: wx.getStorageSync('userId'),
        exQuId: this.data.comId,
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 100) {
          that.setData({
            // title: res.data.object.title,
            // introducer: res.data.object.introducer,
            // content: res.data.object.content,
            // collectionState: res.data.object.collectionState,
          })
        }
        else {
          wx.showToast({ //这里提示失败原因
            title: '未知错误',
            icon: 'loading',
            duration: 1500
          })
        }
      }
    })
  },
})