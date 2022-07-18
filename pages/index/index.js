var util = require('../../utils/util.js');

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

    MyCaiDan:{"obj":[],"str":""},
    MyZhuangTai:{"obj":[],"str":""},


    JinRiCaiDanDisEdit:true,
    JinRiZhuangTaiDisEdit:true,

    MyJinRiCaiDan:[],
    MyJinRiZhuangTai:[],
    JinRiCaiDanShow:[],
    JinRiZhuangTaiShow:[],

  },

  // 事件处理函数
  bindTodayDateChange: function(e) {
    this.setData({
      vdate: e.detail.value
    })
    this.GetJinRiCaiDan();
    this.GetJinRiZhuangTai();
  },

  SetCaiDan: function()
  {
    wx.cloud.init();
    wx.cloud.callFunction({
      name: 'putData',
      data: {
      date: "0000-00-00",
      caidan: this.data.MyCaiDan.str,
      zhuangtai: ""
      }
    })
  },

  GetCaiDan: function()
  {
    wx.cloud.init();
    wx.cloud.callFunction({
      name: 'getData',
      data: {
      date: "0000-00-00",
      caidan: "",
      zhuangtai: ""
      }
    })
    .then(res=>{
      if(res.result.errMsg=="collection.get:ok")
      {
        var obj = [];
        if(res.result.data.length == 1) obj = res.result.data[0].caidan.split(",");
        var caidan = {"obj":obj, "str":obj.toString()};
        this.setData({
          MyCaiDan:caidan,
        });
        this.JinRiCaiDanReLoad();
      }
    })
  },

  SetJinRiCaiDan: function()
  {
    wx.cloud.init();
    wx.cloud.callFunction({
      name: 'putData',
      data: {
      date: this.data.vdate,
      caidan: this.data.MyJinRiCaiDan.toString(),
      zhuangtai: ""
      }
    })
  },

  GetJinRiCaiDan: function()
  {
    wx.cloud.init();
    wx.cloud.callFunction({
      name: 'getData',
      data: {
      date: this.data.vdate,
      caidan: "",
      zhuangtai: ""
      }
    })
    .then(res=>{
      console.log(res);
      if(res.result.errMsg=="collection.get:ok")
      {
        var obj = [];
        if(res.result.data.length == 1) obj = res.result.data[0].caidan.split(",");
          this.setData({
            MyJinRiCaiDan:obj,
          });
          this.JinRiCaiDanReLoad();
      }
    })

  },
  
  GetZhuangTai: function()
  {
    wx.cloud.init();
    wx.cloud.callFunction({
      name: 'getData',
      data: {
      date: "0000-00-00",
      caidan: "",
      zhuangtai: ""
      }
    })
    .then(res=>{
        if(res.result.errMsg=="collection.get:ok")
        {
          var obj = [];
          if(res.result.data.length == 1) obj = res.result.data[0].zhuangtai.split(",");
          var zhuangtai = {"obj":obj, "str":obj.toString()};
          this.setData({
            MyZhuangTai:zhuangtai,
          });

          this.JinRiZhuangTaiReLoad();
        }
    })
  },

  SetZhuangTai: function()
  {
    wx.cloud.init();
    wx.cloud.callFunction({
      name: 'putData',
      data: {
      date: "0000-00-00",
      caidan: "",
      zhuangtai: this.MyZhuangTai.toString()
      }
    })
  },

  SetJinRiZhuangTai: function()
  {
    wx.cloud.init();
    wx.cloud.callFunction({
      name: 'putData',
      data: {
      date: this.data.vdate,
      caidan: "",
      zhuangtai: this.data.MyJinRiZhuangTai.toString()
      }
    })
  },

  GetJinRiZhuangTai: function()
  {
    wx.cloud.init();
    wx.cloud.callFunction({
      name: 'getData',
      data: {
      date: this.data.vdate,
      caidan: "",
      zhuangtai: ""
      }
    })
    .then(res=>{
      if(res.result.errMsg=="collection.get:ok")
        {
          var obj = [];
          if(res.result.data.length == 1) obj = res.result.data[0].zhuangtai.split(",");
            this.setData({
              MyJinRiZhuangTai:obj,
            });
            this.JinRiZhuangTaiReLoad();
        }
  })
  },

  JinRiCaiDanReLoad: function()
  {
        var caidanobj = this.data.MyCaiDan.obj;
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
        var zhuangtaiobj = this.data.MyZhuangTai.obj;
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
    this.GetZhuangTai();
    this.GetJinRiZhuangTai();
    this.GetCaiDan();
    this.GetJinRiCaiDan();
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

    if(this.data.JinRiCaiDanDisEdit) this.SetJinRiCaiDan();
  },

  editjinrizhuangtai(){
    this.setData({
        JinRiZhuangTaiDisEdit:!this.data.JinRiZhuangTaiDisEdit,
    });

    if(this.data.JinRiZhuangTaiDisEdit) this.SetJinRiZhuangTai();

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
        var obj = this.data.MyCaiDan.obj;
        var index = obj.indexOf(this.data.editValue);
        if(index != -1) obj.splice(index,1);
        var caidan = {"obj":obj, "str":obj.toString()};

        this.setData({
            whichEditor:"",
            useMask:false,
            showEditDlg:false,
            editValue:"",
            MyCaiDan: caidan,
        })

        this.SetCaiDan();
    }

    if(this.data.whichEditor == "zhuangtai")
    {
        var obj = this.data.MyZhuangTai.obj;
        var index = obj.indexOf(this.data.editValue);
        if(index != -1) obj.splice(index,1);
        var caidan = {"obj":obj, "str":obj.toString()};

        this.setData({
            whichEditor:"",
            useMask:false,
            showEditDlg:false,
            editValue:"",
            MyZhuangTai: zhuangtai,
        })

        this.SetZhuangTai();
    }

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
        var obj = this.data.MyCaiDan.obj;
        var index = obj.indexOf(this.data.editValue);
        if(index == -1) obj.push(this.data.editValue);
        var caidan = {"obj":obj, "str":obj.toString()};

        this.setData({
            whichEditor:"",
            useMask:false,
            showEditDlg:false,
            editValue:"",
            MyCaiDan: caidan,
        })

        this.SetCaiDan();
    }

    if(this.data.whichEditor == "zhuangtai")
    {
        var obj = this.data.MyZhuangTai.obj;  
        var index = obj.indexOf(this.data.editValue);
        if(index == -1) obj.push(this.data.editValue);
        var zhuangtai = {"obj":obj, "str":obj.toString()};

        this.setData({
            whichEditor:"",
            useMask:false,
            showEditDlg:false,
            editValue:"",
            MyZhuangTai: zhuangtai,
        })

        this.SetZhuangTai();
    }
  },

  bindKeyInput: function (e) {
    this.setData({
        editValue: e.detail.value
    })
  },

})
