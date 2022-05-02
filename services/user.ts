import http from '../utils/http';


interface loginParams {
    username:string,
    password:string,
    email:string,
}

function login(params:loginParams){
  return new Promise((resolve, reject) => {
    http("post",'/login',params).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}
function register(params:loginParams){
  return new Promise((resolve, reject) => {
    http("post",'/user/create',params).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}

export {
    login,register
}
