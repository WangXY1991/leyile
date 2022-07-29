// pages/fulllists.js
var db = require('../../utils/db.js')
import pinyin from "wl-pinyin";

Page({

CaiDanReload: function() {
  var caidanobj = this.data.MyCaiDan;
  caidanobj.sort((a,b) => pinyin.getPinyin(a)>pinyin.getPinyin(b)?1:-1);
  this.setData({
    MyCaiDan:caidanobj,
  }); 
},

ZhuangTaiReload: function() {
  var zhuangtaiobj = this.data.MyZhuangTai;
  zhuangtaiobj.sort((a,b) => pinyin.getPinyin(a)>pinyin.getPinyin(b)?1:-1);
  this.setData({
    MyZhuangTai:zhuangtaiobj,
  }); 
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
    });
  }

  this.CaiDanReload();
  this.ZhuangTaiReload();
},



deletefromlists: function(e) {

  var value = e.mark.value;

  if(e.mark.type == "caidan")
  {
    var obj = this.data.MyCaiDan;
    var index = obj.indexOf(value);
    if(index != -1) obj.splice(index,1);
    this.setData({
        MyCaiDan: obj,
    })
    this.CaiDanReload();
  }
  else if(e.mark.type == "zhuangtai")
  {
    var obj = this.data.MyZhuangTai;
    var index = obj.indexOf(value);
    if(index != -1) obj.splice(index,1);
    
    this.setData({
        MyZhuangTai: obj,
    })
    this.ZhuangTaiReload();
  }

  var value = {"caidan": this.data.MyCaiDan.toString(), "zhuangtai":this.data.MyZhuangTai.toString()}
  db.SetDataValue("0000-00-00",value);
},


addlists: function(e) {
    if(e.mark.type == "caidan")
    {
      this.setData({
        whichEditor:"caidan",
        editDlgTitle:"请输入菜单",
        useMask:true,
        showEditDlg:true,
        editValue:""
     })
    }
    else if(e.mark.type == "zhuangtai")
    {
      this.setData({
        whichEditor:"zhuangtai",
        editDlgTitle:"请输入状态",
        useMask:true,
        showEditDlg:true,
        editValue:""
      })
    }
  },

  cancel(){
    this.setData({
      whichEditor:"",
      useMask:false,
      showEditDlg:false,
      editValue:"",
    })
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
    else
    {
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
          })
          this.CaiDanReload();
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
          })
          this.ZhuangTaiReload();
      }

      var value = {"caidan": this.data.MyCaiDan.toString(), "zhuangtai":this.data.MyZhuangTai.toString()}
      db.SetDataValue("0000-00-00",value);
    }
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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
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