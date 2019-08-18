const util = require('../../utils/util.js')
let Charts = require('../../utils/wxcharts.js')

var app = getApp();
var lineChart = null;

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
    
    var windowWidth = '', windowHeight = '';    //定义宽高
    try {
      var res = wx.getSystemInfoSync();    //试图获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 700 //以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 500 //以设计图750为主进行比例算换
    } catch (e) {
      console.error('getSystemInfoSync failed!');   //如果获取失败
    }
    var cat = ['饮食', '交通', '购物', '娱乐', '其他消费', '工资', '理财'];
    var dat = [0, 0, 0, 0, 0, 0, 0];
    var k = 0;
    while (this.data.user_task[k] != null) {
      if (this.data.user_task[k].event == '饮食') {
        dat[0] = Number(dat[0]) + Number(this.data.user_task[k].value);
      }
      else if (this.data.user_task[k].event == '交通') {
        dat[1] = Number(dat[1]) + Number(this.data.user_task[k].value);
      }
      else if (this.data.user_task[k].event == '购物') {
        dat[2] = Number(dat[2]) + Number(this.data.user_task[k].value);
      }
      else if (this.data.user_task[k].event == '娱乐') {
        dat[3] = Number(dat[3]) + Number(this.data.user_task[k].value);
      }
      else if (this.data.user_task[k].event == '其他') {
        dat[4] = Number(dat[4]) + Number(this.data.user_task[k].value);
      }
      else if (this.data.user_task[k].event == '工资') {
        dat[5] = Number(dat[5]) + Number(this.data.user_task[k].value);
      }
      else if (this.data.user_task[k].event == '理财') {
        dat[6] = Number(dat[6]) + Number(this.data.user_task[k].value);
      }
      k++;
    }

    lineChart = new Charts({
      canvasId: 'lineCanvas',
      type: 'line',
      animation: true,  //是否开启动画
      categories: cat,
      series: [{
        name: '金额',
        data: dat,
        format: function (val) {
          return val.toFixed(2) + '元';
        },
      },
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

    // 折线图
    var windowWidth = '', windowHeight = '';    //定义宽高
    try {
      var res = wx.getSystemInfoSync();    //试图获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 700   //以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 500    //以设计图750为主进行比例算换
    } catch (e) {
      console.error('getSystemInfoSync failed!');   //如果获取失败
    }
    var cat = ['饮食', '交通', '购物', '娱乐', '其他消费', '工资', '理财'];
    var dat = [0, 0, 0, 0, 0, 0, 0];
    var k=0;
    while (this.data.user_task[k] != null){
      if (this.data.user_task[k].event=='饮食'){
        dat[0] = dat[0] + this.data.user_task[k].value;
      }
      else if (this.data.user_task[k].event == '交通'){
        dat[1] = dat[1] + this.data.user_task[k].value;
      }
      else if (this.data.user_task[k].event == '购物') {
        dat[2] = dat[2] + this.data.user_task[k].value;
      }
      else if (this.data.user_task[k].event == '娱乐') {
        dat[3] = dat[3] + this.data.user_task[k].value;
      }
      else if (this.data.user_task[k].event == '其他') {
        dat[4] = dat[4] + this.data.user_task[k].value;
      }
      else if (this.data.user_task[k].event == '工资') {
        dat[5] = dat[5] + this.data.user_task[k].value;
      }
      else if (this.data.user_task[k].event == '理财') {
        dat[6] = dat[6] + this.data.user_task[k].value;
      }
      k++;
    }

    lineChart = new Charts({
      canvasId: 'lineCanvas',
      type: 'line',
      animation: true,  //是否开启动画
      categories: cat,
      series: [{
        name: '金额',
        data: dat,
        format: function (val) {
          return val.toFixed(2) + '元';
        },
      }, 
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