// app.js
App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        console.log(res);  
      }
    })
  },
})
