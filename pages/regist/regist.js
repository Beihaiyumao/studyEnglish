const urlPath = require('../common/config').url_microService;
Page({
  /**
   * 页面的初始数据
   * 初始化两个输入值
   */
  data: {
    username: '',
    password: '',
    tpassword: '',
    email: '',
  },
  //获取邮箱
  email: function(e) {
    this.setData({
      email: e.detail.value
    })
  },
  //获取用户名
  username: function(e) {
    this.setData({
      username: e.detail.value
    })
  },
  //获取密码
  password: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  tpassword: function(e) {
    this.setData({
      tpassword: e.detail.value
    })
  },

  // 注册
  register: function() {
    var that = this;
    var registstate = that.checkUserInput();

    if (registstate) {
      console.log(this.data)
      wx.request({
        url: urlPath + '/user/regist',
        header: {
          "Content-Type": "application/json"
        },
        method: "POST",
        data: {
          email: this.data.email,
          password: this.data.password,
          username: this.data.username,
          phone: this.data.phone,
        },
        success: function(res) {
          console.log(res)
          if (res.data.code == 200) {
            wx.showModal({ //这里提示失败原因
              title: '提示！',
              confirmText: '朕知道了',
              showCancel: false,
              content: res.data.msg,
            })
          } else {
            wx.showToast({
              title: '注册成功', //这里成功
              icon: 'success',
              duration: 1000,
              success: function() {
                wx.navigateTo({
                  url: '../login/login',
                })
              }
            });
            that.setData({
              isLogin: true,
            })
          };

        },
        fail: function(res) {
          console.log(res)
          wx.showToast({
            title: '请求失败',
            icon: 'none',
            duration: 1500
          })
        }
      });
    }
  },
  // 登陆
  login: function() {
    wx.redirectTo({

      url: '../login/login'

    });
  },
  // 错误提示
  showErrorToastUtils: function(e) {
    wx.showModal({
      title: '提示！',
      confirmText: '朕知道了',
      showCancel: false,
      content: e,
      success: function(res) {
        if (res.confirm) {
        }
      }
    })
  },

  //检查用户输入
  checkUserInput: function() {
    var emailTrue = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
    if (this.data.email == "" || this.data.email == null || this.data.email == undefined || !emailTrue.test(this.data.email)) {
      this.showErrorToastUtils("请输入正确的邮箱");
      return false;
    } else if (this.data.username == "" || this.data.username == null ||
      this.data.username == undefined) {
      this.showErrorToastUtils('请输入用户名');
      return false;
    } else if (this.data.password == "" || this.data.password == null || this.data.password == undefined) {
      this.showErrorToastUtils('请输入密码');
      return false;
    } else if (this.data.password.length < 6) {
      this.showErrorToastUtils('密码至少要6位');
      return false;
    } else if (this.data.tpassword == "" || this.data.tpassword == null) {
      this.showErrorToastUtils("请再次输入密码");
      return false;
    } else if (this.data.password != this.data.tpassword) {
      this.showErrorToastUtils("两次密码输入不一致");
      return false;
    } 
    return true;
  },
})