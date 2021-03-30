import parseTemplateToTokens from "./parseTemplateToTokens";
import renderTemplate  from './renderTemplate'
const render = (template, data) => {
  console.log("template: ", template);
  console.log("template: ", template.length);
  // 模板转为 tokens
  const tokens = parseTemplateToTokens(template);
  // console.log("tokens: ", tokens);
  //  tokens 转为 domStr
  const res = renderTemplate(tokens, data);
  // console.log("res: ", res);
  return res;
};

export default render;
