/* 
处理 token ['#','xxx',[]] ["#", "students", Array(5)]
data 
v [{…}, {…}, {…}]
*/

import lookup from "./lookup";
import renderTemplate from "./renderTemplate";

export default function parseArray(token, data) {
  let resultStr = "";
  //  获取数组数据
  let v = lookup(data, token[1]);
  // 遍历数据 生成渲染字符串
  v.forEach(item => {
    // 处理. 属性  或者 renderTemplate中处理点
    resultStr += renderTemplate(token[2], { ".": item, ...item });
    // resultStr += renderTemplate(token[2], item);
    console.log("item: ", item);
  });

  return resultStr;
}
