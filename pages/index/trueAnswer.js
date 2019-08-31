// pages/index/trueAnswer.js
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
    this.getTrueAnswer();
  },
  getTrueAnswer:function(){
    var that=this;
    wx.request({
      url: urlPath +'/composition/getExamQuesitonAnswer',
      method: "GET", //get为默认方法/POST
      data: {
        exQuId: this.data.comId,
      },
      success:function(res){
        console.log(res)
        that.setData({
          answerList:res.data.object,
        })
      }
    })
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