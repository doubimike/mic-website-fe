import http from '../utils/http';


type registerParams = {
    username:string,
    password:string,
    email:string,
}

type loginParams = Omit<registerParams,"username">;

type loginRes ={
  code:string,
  data:{
    user:registerParams,
    token:string
  }
}

function login(params:loginParams){
  return new Promise<loginRes>((resolve, reject) => {
    http("post",'/user/login',params).then(res => {
      resolve (res as loginRes);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}
function register(params:registerParams){
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
