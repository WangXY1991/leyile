async function SetCloudData(date_)
{
  var value = wx.getStorageSync(date_);
  var caidan_ = value.caidan;
  var zhuangtai_ = value.zhuangtai;

  wx.cloud.init();
  wx.cloud.callFunction({
    name: 'putData',
    data: {
    date: date_,
    caidan: caidan_,
    zhuangtai: zhuangtai_
    }
  })
}

async function GetCloudData(date_)
{
  wx.cloud.init();
  var res = await wx.cloud.callFunction({
    name: 'getData',
    data: {
    date: date_,
    caidan: "",
    zhuangtai: ""
    }
  });

  if(res.result.errMsg=="collection.get:ok")
  {
    if(res.result.data.length == 1)
    {
      var value = {"caidan":res.result.data[0].caidan, "zhuangtai":res.result.data[0].zhuangtai};
      wx.setStorageSync(date_, value);
    }
  }
}

async function SetDataValue(date_, value_)
{
  var oldvalue = wx.getStorageSync(date_);
  if(oldvalue != value_)
  {
    wx.setStorageSync(date_, value_);
    await SetCloudData(date_);
  }
}
 
async function GetDataValue(date_)
{
  var value = wx.getStorageSync(date_);
  if(value)
  {	
  }
  else
  {
    await GetCloudData(date_);
    value = wx.getStorageSync(date_);
  }
  
  return value;
}

module.exports.SetCloudData = SetCloudData
module.exports.GetCloudData = GetCloudData
module.exports.SetDataValue = SetDataValue
module.exports.GetDataValue = GetDataValue