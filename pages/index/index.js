// pages/fulllists.js
var util = require('../../utils/util.js')
var db = require('../../utils/db.js')

const app = getApp()

Page({

  // 事件处理函数
  bindTodayDateChange: function(e) {
    this.setData({
      vdate: e.detail.value
    })
    this.GetData(e.detail.value);
  },

  SetData: async function(date_, value_)
  {
    var oldvalue = wx.getStorageSync(date_);
    if(oldvalue != value_)
    {
      wx.setStorageSync(date_, value_);
      await db.SetCloudData(date_);
    }
  },
   
  GetData: async function(date_)
  {
    var value = wx.getStorageSync(date_);
    if(value)
    {	
    }
    else
    {
      await db.GetCloudData(date_);
      value = wx.getStorageSync(date_);
    }

    var caidanobj = [];
    var zhuangtaiobj = [];
    if(value)
    {
      if(value.caidan != "") caidanobj =  value.caidan.split(",");
      if(value.zhuangtai != "") zhuangtaiobj = value.zhuangtai.split(",");
    }

    if(date_ == "0000-00-00")
    {
      this.setData({
        MyCaiDan:caidanobj,
        CaiDanShow:caidanobj.toString(),

        MyZhuangTai:zhuangtaiobj,
        ZhuangTaiShow:zhuangtaiobj.toString(),
      });
    }
    else
    {
      this.setData({
        MyJinRiCaiDan:caidanobj,
        MyJinRiZhuangTai:zhuangtaiobj,
      });
    }

    this.JinRiCaiDanReLoad();
    this.JinRiZhuangTaiReLoad();
  },

  JinRiCaiDanReLoad: function()
  {
        var caidanobj = this.data.MyCaiDan;
        var jinricaidanobj = this.data.MyJinRiCaiDan;
        var jinricaidans = [];
        for(var i=0; i<jinricaidanobj.length; i++)
        {
            jinricaidans.push({"value":jinricaidanobj[i],"name":jinricaidanobj[i], "checked":true}); 
        } 
        for(var i=0; i<caidanobj.length; i++)
        {
            if(-1 == jinricaidanobj.indexOf(caidanobj[i]))
            jinricaidans.push({"value":caidanobj[i],"name":caidanobj[i], "checked":false});    
        }

        this.setData({
            JinRiCaiDanShow: jinricaidans,
          })
  },

  JinRiZhuangTaiReLoad: function()
  {        
        //load
        var zhuangtaiobj = this.data.MyZhuangTai;
        var jinrizhuangtaiobj = this.data.MyJinRiZhuangTai;
        var jinrizhuangtais = [];
        for(var i=0; i<jinrizhuangtaiobj.length; i++)
        {
            jinrizhuangtais.push({"value":jinrizhuangtaiobj[i],"name":jinrizhuangtaiobj[i], "checked":true}); 
        } 
        for(var i=0; i<zhuangtaiobj.length; i++)
        {
            if(-1 == jinrizhuangtaiobj.indexOf(zhuangtaiobj[i]))
            jinrizhuangtais.push({"value":zhuangtaiobj[i],"name":zhuangtaiobj[i], "checked":false});    
        }

        this.setData({
            JinRiZhuangTaiShow: jinrizhuangtais,
          })
  },
  

  jinricaidanChange(e)
  {
    const values = e.detail.value;
    this.data.MyJinRiCaiDan = [];
    for (let j = 0, lenJ = values.length; j < lenJ; ++j) 
    {
        this.data.MyJinRiCaiDan.push(values[j]);
    }
  },

  jinrizhuangtaiChange(e)
  {
    const values = e.detail.value;
    this.data.MyJinRiZhuangTai = [];
    for (let j = 0, lenJ = values.length; j < lenJ; ++j) 
    {
        this.data.MyJinRiZhuangTai.push(values[j]);
    }
  },

  editjinricaidan(){

    this.setData({
        JinRiCaiDanDisEdit:!this.data.JinRiCaiDanDisEdit,
    })

    if(this.data.JinRiCaiDanDisEdit)
    {
      var value = {"caidan": this.data.MyJinRiCaiDan.toString(), "zhuangtai:":this.data.MyJinRiZhuangTai.toString()}
      this.SetData(this.data.vdate,value);
    }
  },

  editjinrizhuangtai(){
    this.setData({
        JinRiZhuangTaiDisEdit:!this.data.JinRiZhuangTaiDisEdit,
    });

    if(this.data.JinRiCaiDanDisEdit)
    {
      var value = {"caidan": this.data.MyJinRiCaiDan.toString(), "zhuangtai:":this.data.MyJinRiZhuangTai.toString()}
      this.SetData(this.data.vdate,value);
    }

  },

  /**
   * 页面的初始数据
   */
  data: {
    vdate: "",

    JinRiCaiDanDisEdit:true,
    JinRiZhuangTaiDisEdit:true,

    MyCaiDan:[],
    MyZhuangTai:[],

    MyJinRiCaiDan:[],
    MyJinRiZhuangTai:[],

    JinRiCaiDanShow:[],
    JinRiZhuangTaiShow:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var today = util.formatTime(new Date());
    this.setData({
      vdate: today,
    });

    this.GetData("0000-00-00");
    this.GetData(today);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

    if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})