// pages/fulllists.js
var util = require('../../utils/util.js')
var db = require('../../utils/db.js')

const app = getApp()

Page({
  
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
  },

  editcaidanlist(){
    this.setData({
        whichEditor:"caidan",
        editDlgTitle:"请输入菜单",
        useMask:true,
        showEditDlg:true,
        editValue:""
    })
  },

  editzhuangtailist(){
    this.setData({
        whichEditor:"zhuangtai",
        editDlgTitle:"请输入状态",
        useMask:true,
        showEditDlg:true,
        editValue:""
    })
  },

  delete(){

    if(this.data.editValue == "")
    {
        this.setData({
            whichEditor:"",
            useMask:false,
            showEditDlg:false,
            editValue:"",
        })   
    }

    if(this.data.whichEditor == "caidan")
    {
        var obj = this.data.MyCaiDan;
        var index = obj.indexOf(this.data.editValue);
        if(index != -1) obj.splice(index,1);

        this.setData({
            whichEditor:"",
            useMask:false,
            showEditDlg:false,
            editValue:"",
            MyCaiDan: obj,
            CaiDanShow:obj.toString(),
        })
    }

    if(this.data.whichEditor == "zhuangtai")
    {
        var obj = this.data.MyZhuangTai;
        var index = obj.indexOf(this.data.editValue);
        if(index != -1) obj.splice(index,1);

        this.setData({
            whichEditor:"",
            useMask:false,
            showEditDlg:false,
            editValue:"",
            MyZhuangTai: obj,
            ZhuangTaiShow:obj.toString(),
        })
    }

    var value = {"caidan": this.data.MyCaiDan.toString(), "zhuangtai:":this.data.MyZhuangTai.toString()}
    this.SetData("0000-00-00",value);
  },

  add(){

    if(this.data.editValue == "")
    {
        this.setData({
            whichEditor:"",
            useMask:false,
            showEditDlg:false,
            editValue:"",
        })   
    }

    if(this.data.whichEditor == "caidan")
    {
        var obj = this.data.MyCaiDan;
        var index = obj.indexOf(this.data.editValue);
        if(index == -1) obj.push(this.data.editValue);

        this.setData({
            whichEditor:"",
            useMask:false,
            showEditDlg:false,
            editValue:"",
            MyCaiDan: obj,
            CaiDanShow:obj.toString(),
        })
    }

    if(this.data.whichEditor == "zhuangtai")
    {
        var obj = this.data.MyZhuangTai;  
        var index = obj.indexOf(this.data.editValue);
        if(index == -1) obj.push(this.data.editValue);

        this.setData({
            whichEditor:"",
            useMask:false,
            showEditDlg:false,
            editValue:"",
            MyZhuangTai: obj,
            ZhuangTaiShow:obj.toString(),
        })
    }

    var value = {"caidan": this.data.MyCaiDan.toString(), "zhuangtai:":this.data.MyZhuangTai.toString()}
    this.SetData("0000-00-00",value);
  },

  bindKeyInput: function (e) {
    this.setData({
        editValue: e.detail.value
    })
  },


  /**
   * 页面的初始数据
   */
  data: {
    useMask: false,
    showEditDlg: false,
    
    whichEditor:"",

    editDlgTitle:"",
    editValue:"",

    MyCaiDan:[],
    MyZhuangTai:[],

    CaiDanShow:"",
    ZhuangTaiShow:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.GetData("0000-00-00");
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
      selected: 1
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