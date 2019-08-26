//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  /**
  * 跳转四级页面
  */
  turnSiJi: function () {
    wx.navigateTo({
      url: '../index/siji'
    });
  },
  /**
   * 跳转六级页面
   */
  turnLiuJi: function () {
    wx.navigateTo({
      url: '../index/liuji',
    })
  },
})
