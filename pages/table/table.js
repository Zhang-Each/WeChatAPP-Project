const util = require('../../utils/util.js')
let Charts = require('../../utils/wxcharts.js')

var app = getApp();
var lineChart = null;

Page({
  data: {
    user_task: [],
  },
  onShow: function() {
    var that = this;
    //获取之前保留在缓存里的数据
    wx.getStorage({
      key: 'table',
      success: function (res) {
        if (res.data) {
          that.setData({
            user_task: res.data.concat(app.globalData.tasks)
          })
        }
        else that.setData({
          user_task: app.globalData.tasks
        })
      },
      fail: function (res) {
        that.setData({
          user_task: app.globalData.tasks
        })
      }
    })
    
    var windowWidth = '', windowHeight = '';    //定义宽高
    try {
      var res = wx.getSystemInfoSync();    //试图获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 700 //以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 500 //以设计图750为主进行比例算换
    } catch (e) {
      console.error('getSystemInfoSync failed!');   //如果获取失败
    }
    var cat = ['饮食', '交通', '购物', '娱乐', '其他消费', '工资', '理财'];
    var yincome = [0, 0, 0, 0, 0, 0, 0];
    var yexpend = [0, 0, 0, 0, 0, 0, 0];
    var k = 0;
    while (this.data.user_task[k] != null) {
      if (this.data.user_task[k].event == '饮食') {
        if (this.data.user_task[k].kind == '收入') yincome[0] = Number(yincome[0]) + Number(this.data.user_task[k].value);
        else yexpend[0] = Number(yexpend[0]) + Number(this.data.user_task[k].value);
      }
      else if (this.data.user_task[k].event == '交通') {
        if (this.data.user_task[k].kind == '收入') yincome[1] = Number(yincome[1]) + Number(this.data.user_task[k].value);
        else yexpend[1] = Number(yexpend[1]) + Number(this.data.user_task[k].value);
      }
      else if (this.data.user_task[k].event == '购物') {
        if (this.data.user_task[k].kind == '收入') yincome[2] = Number(yincome[2]) + Number(this.data.user_task[k].value);
        else yexpend[2] = Number(yexpend[2]) + Number(this.data.user_task[k].value);
      }
      else if (this.data.user_task[k].event == '娱乐') {
        if (this.data.user_task[k].kind == '收入') yincome[3] = Number(yincome[3]) + Number(this.data.user_task[k].value);
        else yexpend[3] = Number(yexpend[3]) + Number(this.data.user_task[k].value);
      }
      else if (this.data.user_task[k].event == '其他') {
        if (this.data.user_task[k].kind == '收入') yincome[4] = Number(yincome[4]) + Number(this.data.user_task[k].value);
        else yexpend[4] = Number(yexpend[4]) + Number(this.data.user_task[k].value);
      }
      else if (this.data.user_task[k].event == '工资') {
        if (this.data.user_task[k].kind == '收入') yincome[5] = Number(yincome[5]) + Number(this.data.user_task[k].value);
        else yexpend[5] = Number(yexpend[5]) + Number(this.data.user_task[k].value);
      }
      else if (this.data.user_task[k].event == '理财') {
        if (this.data.user_task[k].kind == '收入') yincome[6] = Number(yincome[6]) + Number(this.data.user_task[k].value);
        else yexpend[6] = Number(yexpend[6]) + Number(this.data.user_task[k].value);
      }
      k++;
    }

    lineChart = new Charts({
      canvasId: 'lineCanvas',
      type: 'line',
      animation: true,  //是否开启动画
      categories: cat,
      series: [{
        name: '收入',
        data: yincome,
        format: function (val) {
          return val.toFixed(2) + '元';
        },
      },{
          name: '支出',
          data: yexpend,
          format: function (val) {
            return val.toFixed(2) + '元';
          },
      }
      ],
      xAxis: {   //是否隐藏x轴分割线
        disableGrid: true,
      },
      yAxis: {
        title: '收支情况汇总',
        format: function (val) {
          return val.toFixed(2);
        },
      },
      width: windowWidth, //图表展示内容宽度
      height: windowHeight, //图表展示内容高度
      dataLabel: true,    //是否在图表上直接显示数据
      dataPointShape: true, //是否在图标上显示数据点标志
      extra: {
        lineStyle: 'straight'  //曲线
      },
    });
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
      success: function (res) {
        if (res.data) {
          that.setData({
            user_task: res.data.concat(app.globalData.tasks)
          })
        }
        else that.setData({
          user_task: app.globalData.tasks
        })
      },
      fail: function (res) {
        that.setData({
          user_task: app.globalData.tasks
        })
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

    // 折线图
    var windowWidth = '', windowHeight = '';    //定义宽高
    try {
      var res = wx.getSystemInfoSync();    //试图获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 700 //以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 500 //以设计图750为主进行比例算换
    } catch (e) {
      console.error('getSystemInfoSync failed!');   //如果获取失败
    }
    var cat = ['饮食', '交通', '购物', '娱乐', '其他消费', '工资', '理财'];
    var yincome = [0, 0, 0, 0, 0, 0, 0];
    var yexpend = [0, 0, 0, 0, 0, 0, 0];
    var k = 0;
    while (this.data.user_task[k] != null) {
      if (this.data.user_task[k].event == '饮食') {
        if (this.data.user_task[k].kind == '收入') yincome[0] = Number(yincome[0]) + Number(this.data.user_task[k].value);
        else yexpend[0] = Number(yexpend[0]) + Number(this.data.user_task[k].value);
      }
      else if (this.data.user_task[k].event == '交通') {
        if (this.data.user_task[k].kind == '收入') yincome[1] = Number(yincome[1]) + Number(this.data.user_task[k].value);
        else yexpend[1] = Number(yexpend[1]) + Number(this.data.user_task[k].value);
      }
      else if (this.data.user_task[k].event == '购物') {
        if (this.data.user_task[k].kind == '收入') yincome[2] = Number(yincome[2]) + Number(this.data.user_task[k].value);
        else yexpend[2] = Number(yexpend[2]) + Number(this.data.user_task[k].value);
      }
      else if (this.data.user_task[k].event == '娱乐') {
        if (this.data.user_task[k].kind == '收入') yincome[3] = Number(yincome[3]) + Number(this.data.user_task[k].value);
        else yexpend[3] = Number(yexpend[3]) + Number(this.data.user_task[k].value);
      }
      else if (this.data.user_task[k].event == '其他') {
        if (this.data.user_task[k].kind == '收入') yincome[4] = Number(yincome[4]) + Number(this.data.user_task[k].value);
        else yexpend[4] = Number(yexpend[4]) + Number(this.data.user_task[k].value);
      }
      else if (this.data.user_task[k].event == '工资') {
        if (this.data.user_task[k].kind == '收入') yincome[5] = Number(yincome[5]) + Number(this.data.user_task[k].value);
        else yexpend[5] = Number(yexpend[5]) + Number(this.data.user_task[k].value);
      }
      else if (this.data.user_task[k].event == '理财') {
        if (this.data.user_task[k].kind == '收入') yincome[6] = Number(yincome[6]) + Number(this.data.user_task[k].value);
        else yexpend[6] = Number(yexpend[6]) + Number(this.data.user_task[k].value);
      }
      k++;
    }

    lineChart = new Charts({
      canvasId: 'lineCanvas',
      type: 'line',
      animation: true,  //是否开启动画
      categories: cat,
      series: [{
        name: '收入',
        data: yincome,
        format: function (val) {
          return val.toFixed(2) + '元';
        },
      }, {
        name: '支出',
        data: yexpend,
        format: function (val) {
          return val.toFixed(2) + '元';
        },
      }
      ],
      xAxis: {   //是否隐藏x轴分割线
        disableGrid: true,
      },
      yAxis: {
        title: '收支情况汇总',
        format: function (val) {
          return val.toFixed(2);
        },
      },
      width: windowWidth, //图表展示内容宽度
      height: windowHeight, //图表展示内容高度
      dataLabel: true,    //是否在图表上直接显示数据
      dataPointShape: true, //是否在图标上显示数据点标志
      extra: {
        lineStyle: 'curve'  //曲线
      },
    });
  },
  /**
   * 点击数据点显示对应的数据
   */
  touchHandler: function (e) {
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  
  saveData() {
    let listsArr = this.data.user_task;
    wx.setStorage({
      key: 'table',
      data: listsArr
    })
  }
})