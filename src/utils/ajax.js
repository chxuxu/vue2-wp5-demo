// ajax 辅助方法
import axios from "axios";
//import debug from "debug";
//import { message } from "ppfish";
//import { iframeWrapper } from "./iframeWrapper";
import { object2query } from "./type2type";
import staticConfig from "../../../../../_config/static.json";
const urlpre=staticConfig.ajaxPrePath||"https://127.0.0.1:81";
const message=function(msg){
    console.log(msg);
};
//const ajaxLog = debug("ajax:log");
const ajaxLog=function(msg){
    console.log(msg);
};
const iframer =window.top;// iframeWrapper(window.top);

const instance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

export const ajaxPrePath=urlpre;
export const cachePromises = {}; //缓存请求的实例。key为url+params，所以当请求的参数一样时，不需要再次发送请求。

/**
 * 基于Promise的ajax请求接口
 * @param {Object} config 参考axios的config，用于直接传递给axios
 * @param {String} config.url  请求的接口url
 * @param {String} config.method  请求的方法 GET|POST
 * @param {String} config.params  请求的url参数。会被格式化到url中，主要用于GET请求
 * @param {String} config.data  放到body中的参数。主要用于POST请求
 * @param {String} configEx  请求的扩展参数 主要用于该文件。可选
 * @param {Object} configEx.cache 是否缓存结果，如果缓存了，当下次请求时，如果参数一样，直接返回结果
 * @param {String} configEx.json  是否使用json方式提交数据 仅用于POST请求，此参数为true会指定Content-Type 为application/json
 * @param {Boolean|Number} configEx.useMessageError 是否使用message.error显示错误信息，
 * (接上文)默认显示，明确指定为false才不显示，使用Number类型表示code匹配时抑制错误信息

 * @return {Promise}
 */
export function request(
  { url = "", method = "GET", params = {}, data = {}, headers = {} },
  { cache = false,clearCache = false, json = false, useMessageError = true,returnOthorCode=false,form = false } = {}
) {
  return new Promise((resolve, reject) => {
    const success = response => {
      const data = response.data;
      const code = data.code;
      if (code == 200) {
        resolve(data);
      } else {
        console.error("url: %O,  params %O, dataMsg: %O,  response %O", url, JSON.stringify(params), data.message, JSON.stringify(data));
        console.error("params", params);
        console.error("response", response);

        // 未登录或已超时、不存在或已停用企业
        if (code == 4001 || code == 8001) {
          console.error('url logout: %O', url);
          redirectToLogout();
        }else{
          //允许正常返回其他错误码，用于前端做相应业务处理
          if(returnOthorCode){
            resolve(data);
            return;
          }
        }
        // 调用成功后的异常，code!= 200，显示错误原因，reject({code, message})
        let isShowMessage = data.message||data.desc;
        if (useMessageError === code) {
          isShowMessage = false;
        } else {
          isShowMessage = isShowMessage && useMessageError;
        }
        if (isShowMessage) {
          if(code == 501){
            message.error('加载失败，请重试');//501特殊处理，因为后端返回的内容包含报错数据库信息
          }else{
            message.error(data.message||data.desc);
          }
        }
        reject(data);
      }
    };
    const fail = error => {
      if (axios.isCancel(error)) {
        ajaxLog(`ajax请求${url}被取消`, error);
        return;
      }
      const errorStatus = error.response && error.response.status + "";
      let errorMesg =
        (error.response && error.response.data) || "请求失败，请稍后再试";
      if (errorStatus === void 0);
      else if (errorStatus.indexOf("4") != -1) errorMesg = `请求${url}参数错误`;
      else if (errorStatus.indexOf("5") != -1) errorMesg = `服务器错误`;
      
      if(!localStorage.logoutFaile)
      message.error(errorMesg);

      reject({
        code: -1,
        message: errorMesg,
        httpError: true
      });      
    };
    //使用url和参数生成key，用于缓存当前Promise对象，如果参数没变，可以不用重新发请求，直接使用之前数据
    let key = [url, object2query(params), JSON.stringify(data)].join(":");
    if(clearCache){
      cachePromises[key]=null;
    }
    if (cache && cachePromises[key]) {
      cachePromises[key].then(success, fail);
      return;
    }
    // 开发环境下增加code参数（企业域名），解决本地代理时后端无法识别企业域名的问题
    if (process.env.NODE_ENV === "development") {
      const corpCode = location.hostname.split(".")[0];
      params = { code: corpCode, ...params };
    }
    let config = {
      url:urlpre+url,
      method,
      params,
      data,
      headers,
      paramsSerializer: function(params) {
        // 添加鉴权的token
        let settingToken = window.setting && window.setting.token;
        // 取不到就从base里取
        if ( !settingToken ) {
          settingToken = window.setting && window.setting.base && window.setting.base.token;
        }
        if ( !settingToken ) {
          console.log('WARNING: 页面没有暴露token');
          settingToken = '';
        }
        params.token = settingToken;
        return object2query(params);
      },
      transformRequest: [
        function(data, headers) {
          //依自己的需求对请求数据进行处理
          if(form){
            headers["Content-Type"] = 'multipart/form-data';
            return data
          }
          if (json) {
            headers["Content-Type"] = "application/json";
            return JSON.stringify(data);
          } else {
            return object2query(data);
          }
        }
      ]
    };

    let request = instance(config);
    request.then(success, fail);
    if (cache) {
      cachePromises[key] = request;
    }
  });
}

export function redirectToLogout() {
  if ( window.top === window.self ) {
    window.location.href = "/api/kefu/logout";
  } else if (iframer && typeof iframer.postMessage == "function") {
    iframer.postMessage({ method: "logout" });
  }
}

export function redirectToForbidden() {
  if ( window.top === window.self ) {
    window.location.href = "/403/";
  } else if (iframer && typeof iframer.postMessage == "function") {
    // TODO，预留给无权限跳转403使用
  }
}
