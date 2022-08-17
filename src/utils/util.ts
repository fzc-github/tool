import { parse } from 'querystring';
import moment from 'moment';

export const getPageQuery = () => parse(window.location.href.split('?')[1]);


// 查询urlParams
export function getQueryVariable(variable: string) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return null;
}

// 获取url参数
export function getParameter(name, url = window.location.search) {
  const regexp = new RegExp(`[?&]${name}=([^&#]*)`, 'i');
  const result = regexp.exec(url);
  return result === null ? null : decodeURIComponent(result[1]);
}


// json对象里面吧null转为空字符串
export const null2str = (data) => {
  for (let x in data) {
    if (data[x] === null) { // 如果是null 把直接内容转为 ''
      data[x] = '';
    } else {
      if (Array.isArray(data[x])) { // 是数组遍历数组 递归继续处理
        data[x] = data[x].map(z => {
          return null2str(z);
        });
      }
      if (typeof (data[x]) === 'object') { // 是json 递归继续处理
        data[x] = null2str(data[x])
      }
    }
  }
  return data;
}

// 校验数据类型
export const typeOf = function (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

// 防抖
export const debounce = (() => {
  let timer = null
  return (callback, wait = 800) => {
    timer && clearTimeout(timer)
    timer = setTimeout(callback, wait)
  }
})()

// 节流
export const throttle = (() => {
  let last = 0
  return (callback, wait = 800) => {
    let now = +new Date()
    if (now - last > wait) {
      callback()
      last = now
    }
  }
})()

// uuid
export const uuid = () => {
  const temp_url = URL.createObjectURL(new Blob())
  const uuid = temp_url.toString()
  URL.revokeObjectURL(temp_url) //释放这个url
  return uuid.substr(uuid.lastIndexOf('/') + 1)
}