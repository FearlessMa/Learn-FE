/**
 * 使用栈数据结构 折叠 # /
 *  */

export default function nestTokens(tokens) {
  console.log("tokens: ", tokens);
  const nestTokens = [];
  // 模拟栈
  const sections = [];
  // 收集器
  let collector = nestTokens;
  for (let i = 0; i < tokens.length; i++) {
    // const element = array[i];
    const token = tokens[i];
    // 算法3 使用收集器

    switch (token[0]) {
      case "#":
        // 收集器中放入
        collector.push(token);
        sections.push(token);
        // 收集器指向 token的 []
        token[2] = collector = [];
        break;
      case "/":
        let section = sections.pop();
        // 判断 栈是否为空 不为空 collector 指向栈尾 ，为空指向nestTokens，让后面的数据通过default中的collector进入nestTokens中
        collector =
          sections.length  ? sections[sections.length - 1][2] : nestTokens;
        break;
      default:
        collector.push(token);
    }
    // 算法1
    // if (token[0] === "#") {
    //   // 数组 增加第三个元素
    //   token.push([]);
    //   // 入栈
    //   sections.push(token);
    //   console.log("tokens[i:# ", token);
    // } else if (token[0] === "/") {
    //   // 获取出栈元素
    //   const section = sections.pop();
    //   // 栈内没数据
    //   if (sections.length === 0) {
    //     nestTokens.push(section);
    //   } else {
    //     sections[sections.length - 1][2].push(section);
    //   }
    //   console.log("tokens[i: /", token);
    // } else {
    //   // 栈为0 普通token不存入栈
    //   if (sections.length === 0) {
    //     nestTokens.push(token);
    //   } else {
    //     // 栈不为0 ，有特殊标签 ，开始使用栈存储
    //     sections[sections.length - 1][2].push(token);
    //   }
    // }

    //  算法2
    // switch (token[0]) {
    //   case "#":
    //     // 数组 增加第三个元素
    //     token.push([]);
    //     // 入栈
    //     sections.push(token);
    //     break;
    //   case "/":
    //     // 获取出栈元素
    //     const section = sections.pop();
    //     // 栈内没数据
    //     if (sections.length === 0) {
    //       nestTokens.push(section);
    //     } else {
    //       // 栈内有数据 挂载到当前栈出口的数据上
    //       sections[sections.length - 1][2].push(section);
    //     }
    //     break;
    //   default:
    //     // 栈为0 普通token不存入栈
    //     if (sections.length === 0) {
    //       nestTokens.push(token);
    //     } else {
    //       // 栈不为0 ，有特殊标签 ，开始使用栈存储
    //       sections[sections.length - 1][2].push(token);
    //     }
    // }
  }
  return nestTokens;
}
