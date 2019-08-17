//countbook.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    //表示收支的数组，用于列表渲染
    //为了能在手机端显示图片，我们将小程序中用到的图片上传到了阿里云的OSS中
    choose: [{
        name: '支出',
        value: '0',
        image: "/pages/img/支.png"
      },
      {
        name: '收入',
        value: '1',
        image: "/pages/img/收.png"
      }
    ],
    //消费和支出类型的数组，用于列表渲染
    kind: [{
        name: '饮食',
        value: '1',
        image: "/pages/img/饮食.png"
      },

      {
        name: '交通',
        value: '2',
        image: "/pages/img/交通.png"
      },

      {
        name: '购物',
        value: '3',
        image: "/pages/img/购物.png"
      },

      {
        name: '娱乐',
        value: '4',
        image: "/pages/img/娱乐.png"
      },

      {
        name: '其他',
        value: '5',
        image: "/pages/img/其他.png"
      },

      {
        name: '工资',
        value: '6',
        image: "/pages/img/工资.png"
      },

      {
        name: '理财',
        value: '7',
        image: "/pages/img/理财.png"
      },
    ],
    kindofmoney: '', //用于显示支出还是收入
    userchoose: '', //代表user选择的类型
    numberofmoney: '', //代表金额的数目
    modalHidden: true, //表示提交后的提示框是隐藏的
    tips: '等待并心怀希望吧!(注：这里会产生输入后的提示)', //这里是输入后的提示
    date: '', //记录当前的日期
  },

  radioChange: function(e) {
    console.log(e.detail.value);
    var user = this.data.userChoose
    this.setData({
      userChoose: e.detail.value
    })
  },

  //表单的提交函数
  formSubmit: function(e) {
    console.log(e.detail.value);
    //console.log(kinds, userchoose, numberofmoney);

    this.setData({
      modalHidden: false,
      userchoose: e.detail.value.choice,
      kindofmoney: e.detail.value.event,
      numberofmoney: e.detail.value.inputmoney,
    });

    var obj = {};
    obj.kind = e.detail.value.choice;
    obj.event = e.detail.value.event;
    obj.value = e.detail.value.inputmoney;

    app.globalData.tasks = app.globalData.tasks.concat(obj); //全局数组的改变
    app.globalData.donumber = app.globalData.donumber + 1;
    app.globalData.change = true;

    console.log(obj);
    console.log(app.globalData.tasks);

    if (e.detail.value.choice == '支出') {
      if (e.detail.value.event == '饮食') {
        if (e.detail.value.inputmoney >= 50) {
          this.setData({
            tips: '这一餐吃太多了，记得保持身材哦！'
          })
        }
      } else if (e.detail.value.event == '购物') {
        if (e.detail.value.inputmoney >= 888) {
          this.setData({
            tips: '系统这边建议您省着点购买呢！'
          })
        }
      } else if (e.detail.value.event == '娱乐') {
        if (e.detail.value.inputmoney >= 328) {
          this.setData({
            tips: '娱乐也不能太过头呢！'
          })
        }
      } else if (e.detail.value.event == '其他') {
        if (e.detail.value.inputmoney >= 200) {
          this.setData({
            tips: '由简入奢易，由奢入俭难，总而言之要节约哦'
          })
        }
      }
    } else if (e.detail.value.choice == '收入') {
      if (e.detail.value.event == '工资') {
        if (e.detail.value.inputmoney >= 6000) {
          this.setData({
            tips: '这个月干得不错呢！下个月继续加油，升职加薪冲冲冲！'
          })
        } else {
          this.setData({
            tips: '还要继续努力！'
          })
        }
      } else if (e.detail.value.event == '理财')
        if (e.detail.value.inputmoney >= 3000) {
          this.setData({
            tips: '您很有理财投资的眼光呢！'
          })
        }
    }
  },


  onLoad: function() {
    //页面加载时可以获取当前的日期并显示在表单上
    var time = util.formatDate(new Date());
    this.setData({
      date: time
    });
  },


  //提示框操作函数：取消
  modalCancel() {
    wx.showToast({
      title: '取消提交',
      icon: 'none'
    })
    this.setData({
      modalHidden: true,
    })
  },


  //提示框操作函数：提交
  modalConfirm() {

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