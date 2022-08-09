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

export function getParameter(name, url = window.location.search) {
  const regexp = new RegExp(`[?&]${name}=([^&#]*)`, 'i');
  const result = regexp.exec(url);
  return result === null ? null : decodeURIComponent(result[1]);
}



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
