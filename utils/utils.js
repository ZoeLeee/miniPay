export function wait(time){
  return new Promise((res,rej)=>{
    setTimeout(res,time*1000);
  })
}