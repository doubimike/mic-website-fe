// import httpClient from '../utils/http';
// import httpServer from '../utils/http-server';

import http from '../utils/http';
import {resCommonType} from '../utils/type'

// let http:Function; 
// if(process.browser){
//   http = httpClient
// }else {
//   http = httpServer
// }

type postParams = {
    title:string,
    content:string,
    authorId:string
}

type idType ={
  id:string
}


function getAllPosts(){
  return new Promise((resolve, reject) => {
    http("post",'/post/login',{}).then(res => {
      resolve(res);
    },error => {
      reject(error)
    })
  }) 
}

function getPost(params:idType){
  return new Promise<postParams>((resolve, reject) => {
    http("get",'/post/detail',params).then(res => {
      resolve(res as postParams);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}

function createPost(params:postParams){
  return new Promise<resCommonType>((resolve, reject) => {
    http("post",'/post/create',params).then(res => {
      resolve(res as resCommonType);
    },error => {
      reject(error)
    })
  }) 
}
function updatePost(params:postParams){
  return new Promise<resCommonType>((resolve, reject) => {
    http("post",'/post/update',params).then(res => {
      resolve(res as resCommonType);
    },error => {
      reject(error)
    })
  }) 
}

function deletePost(params:postParams){
  return new Promise<resCommonType>((resolve, reject) => {
    http("post",'/post/delete',params).then(res => {
      resolve(res as resCommonType);
    },error => {
      reject(error)
    })
  }) 
}

export {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getAllPosts
}
