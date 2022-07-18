// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
exports.main = async (event, context) => {

}

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  });


  if(wxContext.OPENID == "")
  {
    return {
      errMsg:"openid is null"
    };
  }

  var edate =  event.date;
  //var ecaidan = event.caidan;
  //var ezhuangtai = event.zhuangtai;

  return await db.collection('leyile_db').where({
    _openid: wxContext.OPENID, 
    date: edate,
  })
  .field({
    date: true,
    caidan: true,
    zhuangtai: true,
  })
  .get()

}