Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/index/index",
      text: "今日食谱"
    }, {
      pagePath: "/pages/fulllists/fulllists",
      text: "食谱列表"
    }]
  },
  attached() {
  },
  methods: {
    switchPage(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.reLaunch({url})
      this.setData({
        selected: data.index
      })
    }
  }
})