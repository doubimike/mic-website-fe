/**
 * 网络请求配置
 */
import axios from "axios";

//保存环境变量
console.log('process.env.NODE_ENV',process.env.NODE_ENV);
const isPrd = process.env.NODE_ENV == "production";

//区分开发环境还是生产环境基础URL
export const baseUrl = isPrd
  ? "http://139.198.19.145:39005"
  : "http://127.0.0.1:8080";

axios.defaults.timeout = 100000;
axios.defaults.baseURL = baseUrl;

/**
 * http request 拦截器
 */
// loading
axios.interceptors.request.use(config => {
  console.log('loading');
  document.body.classList.add('loading-indicator');
  // config.headers.loading = true
  return config
})

axios.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      "Content-Type": "application/json",
      "Authorization": window.localStorage.getItem('jwt')||"",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * http response 拦截器
 */

// 响应数据拦截器
axios.interceptors.response.use(response => {
  console.log('end loading',response);
  document.body.classList.remove('loading-indicator');

  return response
},
(error) => {
  document.body.classList.remove('loading-indicator');

  console.log('end loading',error);
  throw error;
})

axios.interceptors.response.use(
  (response) => {
    if (response.data.code !== 200) {
     throw response
    }
    return response;
  },
  (error) => {
    console.log("请求出错：", error);
    throw error;
  }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url:string, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
        landing(url, params, response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url:string, data={}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        console.log('post data',response)
        //关闭进度条
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url:string, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        console.log('data',response);
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url:string, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

//统一接口处理，返回数据
export default function http(fecth:string, url:string, param:object) {
  let _data = "";
  return new Promise((resolve, reject) => {
    switch (fecth) {
      case "get":
        console.log("begin a get request,and url:", url);
        get(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request GET failed.", error);
            reject(error);
          });
        break;
      case "post":
        post(url, param)
          .then(function (response) {
            console.log('response111',response);
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request POST failed.", error);
            reject(error);
            msag(error)
          });
        break;
      default:
        break;
    }
  });
}

//失败提示
function msag(err:any) {
  // 业务错误
  if(err && err.data){
    alert(err.data.message)
    return;
  }
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        alert(err.response.data.error.details);
        break;
      case 401:
        alert("未授权，请登录");
        break;

      case 403:
        alert("拒绝访问");
        break;

      case 404:
        alert("请求地址出错");
        break;

      case 408:
        alert("请求超时");
        break;

      case 500:
        alert("服务器内部错误");
        break;

      case 501:
        alert("服务未实现");
        break;

      case 502:
        alert("网关错误");
        break;

      case 503:
        alert("服务不可用");
        break;

      case 504:
        alert("网关超时");
        break;

      case 505:
        alert("HTTP版本不受支持");
        break;
      default:
        err.message && alert(err.message)
    }
  }
}

/**
 * 查看返回的数据
 * @param url
 * @param params
 * @param data
 */
function landing(url, params, data) {
  if (data.code === -1) {
    
  }
}

//设置axios基础路径
const service = axios.create({
  baseURL: baseUrl,
});
// // 请求拦截器
// service.interceptors.request.use(
//   (config) => {
//     // 每次发送请求之前本地存储中是否存在token，也可以通过Redux这里只演示通过本地拿到token
//     // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
//     // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
//     const token =
//       window.localStorage.getItem("userToken") ||
//       window.sessionStorage.getItem("userToken");
//     //在每次的请求中添加token
//     config.data = Object.assign({}, config.data, {
//       token: token,
//     });
//     //设置请求头
//     config.headers = {
//       "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
//     };
//     config.data = QS.stringify(config.data);
//     return config;
//   },
//   (error) => {
//     return error;
//   }
// );
