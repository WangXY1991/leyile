// app.js
App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        console.log(res);  
      }
    })

    wx.cloud.init();
    wx.cloud.callFunction({
      name: 'getData',
      data: {
        date: "2022-07-15",
        caidan: "",
        zhuangtai: ""
      },
      success: function(res) {
        console.log(res)
      }
    })

    console.log("end");

  },
})
