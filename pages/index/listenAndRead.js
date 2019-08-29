// pages/index/listenAndRead.js
const urlPath = require('../common/config').url_microService;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionList: [],
    content: '',
    title: '',
    examType: 1,
    author: '小编',
    redio: '',
    currentPage: 1,
    isFirstPage:true,
    isLastPage:false,
    total:0,
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
      userChose:event.detail,
    });
    console.log(event.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      comId: options.comId,

    });
    console.log(this.data.comId);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(e) {
    this.audioCtx = wx.createAudioContext('myAudio');
    this.getExamQuestionTG();
    this.getExamQuestionWT();
  },
  audioPlay: function() {
    this.audioCtx.play()
  },
  audioPause: function() {
    this.audioCtx.pause()
  },
  audioStart: function() {
    this.audioCtx.seek(0)
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
   * 获取详情
   */
  getExamQuestionTG: function() {
    var that = this;
    wx.request({
      url: urlPath + '/composition/examQuestionTG', //请求地址
      header: { //请求头
        "Content-Type": "applciation/json"
      },

      method: "GET", //get为默认方法/POST
      data: {
        userId: wx.getStorageSync('userId'),
        exQuId: this.data.comId,
      },
      success: function(res) {
        console.log(res);
        if (res.data.code == 100) {
          that.setData({
            title: res.data.object.title,
            // introducer: res.data.object.introducer,
            content: res.data.object.content,
            collectionState: res.data.object.collectionState,
            // questionList: res.data.object.questionList,
            examType: res.data.object.examType,
           
          })
        } else {
          wx.showToast({ //这里提示失败原因
            title: '未知错误',
            icon: 'loading',
            duration: 1500
          })
        }
      }
    })
  },
  getExamQuestionWT: function() {
    var that = this;
    wx.request({
      url: urlPath + '/composition/examQuestion', //请求地址
      header: { //请求头
        "Content-Type": "applciation/json"
      },

      method: "GET", //get为默认方法/POST
      data: {
        exQuId: this.data.comId,
        currentPage: this.data.currentPage,
      },
      success: function(res) {
        console.log(res);
        that.setData({
          questionList: res.data.list,
          isFirstPage:res.data.isFirstPage,
          isLastPage:res.data.isLastPage,
          total:res.data.total,
          trueOptionId: res.data.list.trueOptionId,
        })
      }
    })
  },
  /**
   * 收藏
   */
  collectionZF: function() {
    var that = this;
    console.log(this.data.comId)
    if (this.data.collectionState == true) {
      wx.request({
        url: urlPath + '/user/deleteMyCollection',
        method: 'GET',
        data: {
          userId: wx.getStorageSync('userId'),
          compositionId: this.data.comId,
        },
        success: function(res) {
          console.log(res.data);
          if (res.data.code == 100) {
            that.setData({
              collectionState: false,
            })
            wx.showToast({
              title: '取消收藏成功',
            })
          }
        }
      })
    } else {
      wx.request({
        url: urlPath + '/composition/collection',
        method: 'GET',
        data: {
          userId: wx.getStorageSync('userId'),
          compositionId: this.data.comId,
          type: 1,
        },
        success: function(res) {
          console.log(res.data);
          if (res.data.code == 100) {
            that.setData({
              collectionState: true,
            })
            wx.showToast({
              title: '收藏成功',
            })
          }
        }
      })
    }
  },
  /**
   * 上一页
   */
  turnUpPage:function(){
    if(this.data.currentPage>=1){
      this.setData({
        currentPage: this.data.currentPage - 1,
      })
    }else{
      this.setData({
        currentPage:1,
      })
    }
    this.getExamQuestionWT();
  },
  /**
   * 下一题
   */
  turnDownPage:function(e){
    console.log(e.currentTarget.id);
    if(this.data.currentPage<this.data.total){
      if(this.data.userChose!=e.currentTarget.id){
        wx.showToast({
          title: '答案错误',
        })
      }else{
        wx.showToast({
          title: '恭喜回答正确',
        })
      }
      this.setData({
        currentPage: this.data.currentPage + 1,
      })
    } else {
      wx.showToast({
        title: '已经是最后一个啦',
      })
      this.setData({
        currentPage: this.data.total,
      })
    }
    this.getExamQuestionWT();
  },
})