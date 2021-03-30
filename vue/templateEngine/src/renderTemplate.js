import lookup from "./lookup";
import parseArray from "./parseArray";

export default function renderTemplate(tokens, data) {
  let resultStr = "";
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    let tag = token[0];
    if (tag == "text") {
      resultStr += token[1];
    } else if (tag == "name") {
      // 如果是. 直接拼接数据
      // if (token[1] == ".") {
      //   resultStr += data;
      // } else {
      //   // 使用lookup 处理连点属性
      // resultStr += lookup(data, token[1]);
      // }
      resultStr += lookup(data, token[1]);
    } else if (tag == "#") {
      // resultStr += renderTemplate(token[2], data[token[1]]);
      //  # 是数组数据 直接遍历数据 递归调用 [2] 的子标签
      resultStr += parseArray(token, data);
      // data[token[1]].forEach(item => {
      //   resultStr += renderTemplate(token[2], item);
      // });
    }
  }

  return resultStr;
}
