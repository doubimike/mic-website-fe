import http from '../utils/http';
import {resCommonType} from '../utils/type'


type registerParams = {
    userName:string,
    password:string,
    email:string,
}

type loginParams = Omit<registerParams,"userName">;

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
      resolve(res as loginRes);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}
function register(params:registerParams){
  return new Promise<resCommonType>((resolve, reject) => {
    http("post",'/user/create',params).then(res => {
      resolve(res as resCommonType);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}

export {
    login,register
}
