const HOST_URL="https://fw.lepay.vip/index.php/";

export  function myReq(url,data={},option={}){
  let defaultData={
    url:HOST_URL+url,
    data,
    method:"POST",
    headers:{
      "content-type": "application/x-www-form-urlencoded;"
    },
  }
  console.log("请求数据",defaultData);
  return new Promise((res,rej)=>{
    my.request({
      ...defaultData,
      success(data){
        res(data.data);
      },
      fail(data){
        rej(data);
      }
    })
  })
} 
