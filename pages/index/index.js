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

    MyCaiDan:{"obj":[],"str":""},
    MyZhuangTai:{"obj":[],"str":""},

    MyJinRiCaiDan:[],
    MyJinRiZhuangTai:[],
    JinRiCaiDanDisEdit:true,
    JinRiZhuangTaiDisEdit:true,

    JinRiCaiDanShow:[],
    JinRiZhuangTaiShow:[],

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    this.getUserProfile();
  },

  bindTodayDateChange: function(e) {
    this.setData({
      vtodaydate: e.detail.value
    })
    
    

  },

  SetCaiDan: function()
  {

  },

  GetCaiDan: function()
  {

  },

  SetJinRiCaiDan: function()
  {

  },

  GetJinRiCaiDan: function(arg)
  {
    const cloud = require('wx-server-sdk')
    cloud.init({
      env: cloud.DYNAMIC_CURRENT_ENV
    })


    db.collection('test')
      .where({
        date:"0000-00-00"
      })
      .field({
        caidan: true,
        zhuangtai: true,
      })
      .get({
          success: function(res) {
          console.log(res.data)
        }}
      )  
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

    //this.GetJinRiCaiDan(e.detail.value);

    //load
    var caidanobj = ["菜单1","菜单2","菜单3","菜单4","菜单5","菜单6","菜单7","菜单8","菜单9"];
    var caidan = {"obj":caidanobj, "str":caidanobj.toString()};
    var zhuangtaiobj = ["正常","状态A","状态B","状态C","状态D"];
    var zhuangtai = {"obj":zhuangtaiobj, "str":zhuangtaiobj.toString()};

    //load
    var jinricaidan = [];
    var jinrizhuangtai = [];
    
    this.setData({
      canIUseGetUserProfile: true,
      vtodaydate: today,
      MyCaiDan: caidan,
      MyZhuangTai: zhuangtai,
      MyJinRiCaiDan:jinricaidan,
      MyJinRiZhuangTai:jinrizhuangtai,
    });

    this.JinRiCaiDanReLoad();
    this.JinRiZhuangTaiReLoad();
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    console.log("getUserProfile 0");
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log("getUserProfile 1");
        console.log(res)
        console.log("getUserProfile 2");
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log("getUserInfo 0");
    console.log(e)
    console.log("getUserInfo 1");
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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

    if(this.data.JinRiCaiDanDisEdit) this.JinRiCaiDanReLoad();
  },

  editjinrizhuangtai(){
    this.setData({
        JinRiZhuangTaiDisEdit:!this.data.JinRiZhuangTaiDisEdit,
    });

    if(this.data.JinRiZhuangTaiDisEdit) this.JinRiZhuangTaiReLoad();

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
    }
  },

  bindKeyInput: function (e) {
    this.setData({
        editValue: e.detail.value
    })
  },

})
