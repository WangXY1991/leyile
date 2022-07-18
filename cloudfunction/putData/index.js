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
  var ecaidan = event.caidan;
  var ezhuangtai = event.zhuangtai;

  try {
    await db.collection('leyile_db').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _openid: wxContext.OPENID, 
        date: edate,
        caidan: "",
        zhuangtai: "",
        },
      })
  } catch(e) 
  {
  }

  if(ecaidan != "")
  {
    try{
      await db.collection('leyile_db').where({
        _openid: wxContext.OPENID, 
        date: edate,
      })
      .update({
        data: {
          caidan: ecaidan
        },
      })
    }
    catch(e){
      return{
        errMsg:"update caidan err"
      }
    }
  }

  if(ezhuangtai != "")
  {
    try{
      await db.collection('leyile_db').where({
        _openid: wxContext.OPENID, 
        date: edate,
      })
      .update({
        data: {
          zhuangtai: ezhuangtai
        },
      })
    }
    catch(e){
      return{
        errMsg:"update zhuangtai err"
      }
    }
  }

  return {
    errMsg:""
  };

}