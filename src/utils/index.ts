export * from './ajax';
export * from './number';
export * from './date';
export * from './type2type';

// 解析URL中的search参数
// queryStr需与location.search的格式一致，都以问号开头
export const getUrlParams = (queryStr) => {
    let search = queryStr ? queryStr : location.search;
    if (search) {
      let args = {},
        query = search.substring(1),
        pairs = query.split("&");
  
      for(let i = 0;i < pairs.length; i++){
          let pos = pairs[i].indexOf("=");
          if(pos == -1) continue;
  
          let name = pairs[i].substring(0, pos),
            value = pairs[i].substring(pos + 1);
          value = decodeURIComponent(value);
          args[name] = value;
      }
      return args;
    } else {
      return {};
    }
  };