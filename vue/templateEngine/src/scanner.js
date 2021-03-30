/**
 * 扫描器
 */

export default class Scanner {
  constructor(templateStr) {
    console.log("Scanner:实例化 ", templateStr);
    // console.log('new.target ', new.target);
    this.templateStr = templateStr;
    // 指针
    this.pos = 0;
    // 扫描剩余量
    this.tail = templateStr;
  }
  // 跳过标记
  scan(tag) {
    if (this.tail.indexOf(tag) == 0) {
      // 跳过 tag的长度 ：{{
      this.pos += tag.length;
      this.tail = this.templateStr.substring(this.pos);
    }
  }
  // 扫描模板，直到标记 交给scan，返回扫描的结果
  scanUtil(stopTag) {
    // 记录开始的指针位置
    const pos_backup = this.pos;
    // 没有遇到标记的时候 ，移动指针
    while (
      this.tail.indexOf(stopTag) != 0 &&
      this.pos < this.templateStr.length
    ) {
      this.pos++;
      // 跟新扫描后的字符串
      this.tail = this.templateStr.substring(this.pos);
    }
    return this.templateStr.substring(pos_backup, this.pos);
  }
  // 指针是否到头
  eos() {
    return this.pos === this.templateStr.length;
  }
}
