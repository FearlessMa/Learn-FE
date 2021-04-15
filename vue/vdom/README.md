# 实现简易vDom

- [x] `h`方法 (只能接收三个参数)
- [x] `vnode`方法 (不能识别属性)
- [x] `patch`方法 (不是对比属性，支持子元素，文本)
- [x] 实现子元素的diff

```js
// h函数生成vnode
// h函数可以嵌套使用
h(sel,props,c)=>vnode

vnode:{
  // 子元素
  children:undefined,
  // dom 属性
  data:{},
  // 真实元素
  elm:undefined,
  // 选择器
  sel:'div',
  // key
  key:undefined
}
```


## snabbdom
```js
import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { h } from 'snabbdom/h' // helper function for creating vnodes
import { toVNode } from 'snabbdom/tovnode'

const patch = init([ // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
])

const newVNode = h('div', { style: { color: '#000' } }, [
  h('h1', 'Headline'),
  h('p', 'A paragraph'),
])

patch(toVNode(document.querySelector('.container')), newVNode)
```


createElement(vnode){
  let tagName = vnode.sel;
  const ele = document.createElement(tagName);
  vnode.elm = ele;
  if(vnode.text){
    ele.innerHtml = vnode.text;
  }
  let children = vnode.children;
  children.forEach(child=>{
    const ch = createElement(child)
    ele.appendChild(ch)
  })
  return ele
}

vnode(sel,data,children,text,elm){
  return {
    sel,
    data,
    text,
    children,
    elm,
    key:data.key
  }
}


// h('div',{},[])
// h('div',{},'12')
// h('div',{},h())
h(sel,data,c){
  if(argments.length != 3)return ;
  if(typeof c == 'number' || typeof c == 'string'){
    return vnode(sel,data,undefined,c,undefined)
  }else if(Array.isArray(c)){
    const children = c.map(child=>{
      return child
    })
    return vnode(sel,data,children,undefined,undefined)
  }else if(typeof c == 'object'){
    return vnode(sel,data,[c],undefined,undefined)
  }
}


patch(oldVnode,newVnode){
  if(!oldVnode.sel && !oldVnode.elm){

  }
}

patch 比较新旧节点
如果旧节点是HTML元素，转换为vnode
如果 新旧节点是同一个节点 ，调用 patchVnode 比较节点 。通过 sel 与 key 判断
否则 创建新节点元素，暴力删除旧节点，挂在新节点

patchVnode 比较同一个节点
如果 新旧节点相同 直接返回 直接===比较
如果 新旧节点都是文本节点切不相等 ，替换旧节点文本内容
如果 新旧节点不同。旧节点文本，新节点children 直接替换旧节点
如果 新旧节点都是children 节点，调用 updateChildren 更新


updateChildren 使用比较新旧节点
双端比较，变量存储 旧前 旧后 新前 新后 对应的 下标与节点
while循环比价指针 新前<新后  && 旧前<旧后
判断 当前两端节点是否为undefined ，是旧移动指针，改变对应节点
1 新前与旧前比较 相同 patch两个节点，新前新后 指针移动，节点更新
2.新后与旧后比较 相同 patch两个节点，新前新后 指针移动，节点更新
3.新前与旧后比较 相同 patch两个节点，节点更新 新前后移，旧后前移   ---- 在旧前节点之前插入旧后节点
4.新后与旧前比较 相同 patch两个节点，节点更新 新后前移 旧前后移 ---- 在旧后之后 插入旧前 
5.以上全部没有命中 遍历当前旧前 到 旧后指针 存储到keyMap对象上， key为旧节点的key， value为旧节点数组下标。
通过 newStartVnode.key查询keyMap是否有相同节点，
如果没有，在 oldCh[ newStartIdx ]节点前插入 newStartVnode,
如果找到oldCh[ idxInOld ]， 把找到的旧节点移动到oldCh[ newStartIdx ]节点前，并把oldCh[ idxInOld] = undefined;
最后 newStartVnode = newCh[ ++newStartIdx ]
循环完成
如果 newStartIdx <= newEndIdx 新节点有剩余，需要插入，在 oldCh[ newEndIdx ] 之前插入
如果 oldStartIdx <= oldEndIdx 旧节点有剩余，需要删除，parentElm && parentElm.removeChild(oldCh[i].elm);

