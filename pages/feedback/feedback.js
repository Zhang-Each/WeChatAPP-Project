Page({
  data: {
    // 字数限制
    current: 0,
    max: 300,
  },
  // 文本框字数限制
  limit: function(e) {
    var value = e.detail.value;
    var length = parseInt(value.length);

    if (length > this.data.noteMaxLen) {
      return;
    }

    this.setData({
      current: length
    });
  },
  sub: function(event) {
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })
    this.setData({
      modalHidden: true
    })
  },
})