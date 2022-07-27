var util = require('../../utils/util.js');
var db = require('../../utils/db.js');

// index.js
// 获取应用实例
const app = getApp()

const types = ['default', 'primary', 'warn']
const pageObject = {
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false
  },
}
for (let i = 0; i < types.length; ++i) {
    (function (type) {
      pageObject[type] = function () {
        const key = type + 'Size'
        const changedData = {}
        changedData[key] =
          this.data[key] === 'default' ? 'mini' : 'default'
        this.setData(changedData)
      }
    }(types[i]))
  }
  
Page({
  data: {
    useMask: false,
    showEditDlg: false,
    
    whichEditor:"",

    editDlgTitle:"",
    editValue:"",

    vdate: "",

    JinRiCaiDanDisEdit:true,
    JinRiZhuangTaiDisEdit:true,

    MyCaiDan:[],
    MyZhuangTai:[],

    MyJinRiCaiDan:[],
    MyJinRiZhuangTai:[],

    CaiDanShow:"",
    ZhuangTaiShow:"",
    JinRiCaiDanShow:[],
    JinRiZhuangTaiShow:[],

  },

  // 事件处理函数
  bindTodayDateChange: function(e) {
    this.setData({
      vdate: e.detail.value
    })
    this.GetData(e.detail.value);
  },

  SetData: async function(date_, value_)
  {
    wx.setStorageSync(date_, value_);
    db.SetCloudData(date_);
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
  
  onLoad() { 
    var today = util.formatTime(new Date());
    this.setData({
      vdate: today,
    });

    console.log("onload");
    this.GetData("0000-00-00");
    this.GetData(today);
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

})
