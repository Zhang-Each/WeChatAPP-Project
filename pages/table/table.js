const util = require('../../utils/util.js')
var app = getApp();

Page({
  data: {
    user_task: [],
    newcount: {
      kind: 0,
      type: 0,
      number: 0,
      date: '',
      hourminute: ''
    }
  },
  onShow: function() {
    this.setData({
      user_task: app.globalData.tasks
    })
  },
  onLoad: function() {
    //页面加载时可以获取当前的日期并显示在表单上
    var time = util.formatDate(new Date());
    var now = util.formatTime2();
    this.setData({
      date: time,
      hourminute: now
    });
    var that = this;
    //获取之前保留在缓存里的数据
    wx.getStorage({
      key: 'table',
      success: function(res) {
        if (res.data) {
          that.setData({
            user_task: res.data
          })
        }
      }
    })
    //获取用户信息
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
        })
      },
    })
  },
  saveData() {
    let listsArr = this.data.user_task;
    wx.setStorage({
      key: 'table',
      data: listsArr
    })
  }
})