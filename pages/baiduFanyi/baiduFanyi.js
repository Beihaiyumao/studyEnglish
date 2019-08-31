// pages/baiduFanyi/baiduFanyi.js
const urlPath = require('../common/config').url_microService;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1, //默认汉译英
    resultList: [],
    show: false,//翻译结果弹出的显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 选择翻译类型
   */
  onClickDisabled(event) {
    wx.showToast({
      title: `暂时未开发`,
      icon: 'none'
    });
  },
  /**
   * 翻译
   */
  onSearch: function(e) {
    console.log(e.detail)
    console.log(this.data.active);
    var that = this;
    if (e.detail == null || e.detail == '') {
      wx.showToast({
        title: `请输入关键词`,
        icon: 'none'
      });
    } else {
      if (this.data.active == 1) {
        //汉译英
        wx.request({
          url: urlPath + '/fanyi/zhToEn',
          method: 'GET',
          data: {
            keyWord: e.detail,
          },
          success: function(res) {
            console.log(res.data);
            that.setData({
              resultList: res.data.object.trans_result,
              show: true
            })
          }
        })
      } else if (this.data.active == 2) {
        //英译汉
        wx.request({
          url: urlPath + '/fanyi/enToZh',
          method: 'GET',
          data: {
            keyWord: e.detail,
          },
          success: function(res) {
            console.log(res.data);
            that.setData({
              resultList: res.data.object.trans_result,
              show: true
            })
          }
        })
      }

    }
  },
  /**
   * 切换翻译类型
   */
  typeOnChange: function(event) {
    this.setData({
      active: event.detail.index + 1
    })
  },
  /**
   * 关闭弹窗
   */
  onClose() {
    this.setData({
      show: false
    });
  }

})