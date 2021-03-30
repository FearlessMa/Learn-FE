import Scanner from "./scanner";
import nestTokens from "./nestTokens";
/**
 *  解析模板
 *   */
export default function parseTemplateToTokens(templateStr) {
  // 存储解析数据
  const tokens = [];
  const scanner = new Scanner(templateStr);
  // 识别的数据
  let words;
  while (!scanner.eos()) {
    // 找到{{之前的数据
    words = scanner.scanUtil("{{");
    if (words) {
      // 去空格 <a class></a>
      // 是否有 <>
      let flag = false;
      let str = "";
      Array.prototype.forEach.call(words, char => {
        if (char == "<" || char == ">") {
          flag = !flag;
        }
        str += flag ? char:char.trim()
      });
      // words.replace(/\s+/g, "") 会消除标签内空格
      console.log('str: ', str);
      tokens.push(["text", str]);
    }
    //  跳过标签
    scanner.scan("{{");
    // 获取标签内容
    words = scanner.scanUtil("}}");
    if (words) {
      //  {{}} 模板内的各种规则  #arr /arr
      if (words[0] === "#") {
        tokens.push(["#", words.substring(1)]);
      } else if (words[0] === "/") {
        tokens.push(["/", words.substring(1)]);
      } else {
        tokens.push(["name", words]);
      }
    }
    scanner.scan("}}");
  }
  
  return nestTokens(tokens);
}
