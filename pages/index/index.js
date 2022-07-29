// pages/fulllists.js
var util = require('../../utils/util.js')
var db = require('../../utils/db.js')
import pinyin from "wl-pinyin";

Page({

  // 事件处理函数
  bindTodayDateChange: function(e) {
    this.setData({
      vdate: e.detail.value
    })
    this.GetData(e.detail.value);
  },


  LoadData: async function()
  {
    {
      var value = await db.GetDataValue("0000-00-00");
      var caidanobj = [];
      var zhuangtaiobj = [];
      if(value)
      {
        if(value.caidan) caidanobj =  value.caidan.split(",");
        if(value.zhuangtai) zhuangtaiobj = value.zhuangtai.split(",");
      }

      this.setData({
        MyCaiDan:caidanobj,
        MyZhuangTai:zhuangtaiobj,
      })
    }

    {
      var value = await db.GetDataValue(this.data.vdate);
      var caidanobj = [];
      var zhuangtaiobj = [];
      if(value)
      {
        if(value.caidan) caidanobj =  value.caidan.split(",");
        if(value.zhuangtai) zhuangtaiobj = value.zhuangtai.split(",");
      }

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
            jinricaidans.push({"name":jinricaidanobj[i], "checked":true}); 
        }

        var jinricaidans_u = [];
        for(var i=0; i<caidanobj.length; i++)
        {
            if(-1 == jinricaidanobj.indexOf(caidanobj[i]))
            jinricaidans_u.push({"name":caidanobj[i], "checked":false});    
        }

        jinricaidans.sort((a,b) => pinyin.getPinyin(a.name)>pinyin.getPinyin(b.name)?1:-1);
        jinricaidans_u.sort((a,b) => pinyin.getPinyin(a.name)>pinyin.getPinyin(b.name)?1:-1);
        jinricaidans.push(...jinricaidans_u);

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
            jinrizhuangtais.push({"name":jinrizhuangtaiobj[i], "checked":true}); 
        }

        var jinrizhuangtais_u = [];
        for(var i=0; i<zhuangtaiobj.length; i++)
        {
            if(-1 == jinrizhuangtaiobj.indexOf(zhuangtaiobj[i]))
            jinrizhuangtais_u.push({"name":zhuangtaiobj[i], "checked":false});    
        }

        jinrizhuangtais.sort((a,b) => pinyin.getPinyin(a.name)>pinyin.getPinyin(b.name)?1:-1);
        jinrizhuangtais_u.sort((a,b) => pinyin.getPinyin(a.name)>pinyin.getPinyin(b.name)?1:-1);
        jinrizhuangtais.push(...jinrizhuangtais_u);

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
      var value = {"caidan": this.data.MyJinRiCaiDan.toString(), "zhuangtai":this.data.MyJinRiZhuangTai.toString()}
      db.SetDataValue(this.data.vdate,value);
      this.JinRiCaiDanReLoad();
    }
  },

  editjinrizhuangtai(){
    this.setData({
        JinRiZhuangTaiDisEdit:!this.data.JinRiZhuangTaiDisEdit,
    });

    if(this.data.JinRiCaiDanDisEdit)
    {
      var value = {"caidan": this.data.MyJinRiCaiDan.toString(), "zhuangtai":this.data.MyJinRiZhuangTai.toString()}
      db.SetDataValue(this.data.vdate,value);
      this.JinRiZhuangTaiReLoad();
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

    this.LoadData();
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