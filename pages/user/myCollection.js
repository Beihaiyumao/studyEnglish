// pages/user/myCollection.js
const urlPath = require('../common/config').url_microService;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: ['1'],
    type: 0,
    resultList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.type == 2 || this.data.type == 3) {
      this.getInfo();
    } else {
      this.getExamQues();
    }
  },
  /**
   * 判断是翻译和作文 还是听力和阅读
   */
  onChange(event) {
    this.setData({
      type: event.detail
    });
    if (this.data.type == 2 || this.data.type == 3) {
      this.getInfo();
    } else {
      this.getExamQues();
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (this.data.type == 2 || this.data.type == 3) {
      this.getInfo();
    } else {
      this.getExamQues();
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.type == 2 || this.data.type == 3) {
      this.getInfo();
    } else {
      this.getExamQues();
    }
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
   * 获取翻译和作文列表
   */
  getInfo: function () {
    var that = this;
    console.log(that.data.type)
    wx.request({
      url: urlPath + '/user/zfCollectionList',
      method: 'GET',
      data: {
        userId: wx.getStorageSync('userId'),
        type: that.data.type,
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.code == 100) {
          that.setData({
            resultList: res.data.object,
          })
        }else{
          that.setData({
            resultList: [],
          })
          wx.showToast({
            title: '未收藏相关内容',
          })
        }
      }
    })
  },
  /**
   * 查看翻译和作文详情
   */
  gotoDetail: function (e) {
    if (this.data.type == 2 || this.data.type == 3) {
      wx.navigateTo({
        url: '/pages/index/zfDetails?comId=' + e.currentTarget.id,
      })
    } else {
      wx.navigateTo({
        url: '/pages/index/listenAndRead?comId=' + e.currentTarget.id,
      })
    }
  },
  /**
   * 获取听力和阅读理解
   */
  getExamQues: function () {
    var that = this;
    console.log(that.data.type)
    wx.request({
      url: urlPath + '/user/lrCollectionList',
      method: 'GET',
      data: {
        type: this.data.type,
        userId: wx.getStorageSync('userId'),
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.code == 100) {
          that.setData({
            resultList: res.data.object,
          })
        }else{
          that.setData({
            resultList:[],
          })
          wx.showToast({
            title: '未收藏相关内容',
          })
        }
      }
    })
  }
})