<template>
  <div>ref and reactive</div>
  <div>ref : {{ num }}</div>
  <button @click="changeNum">change</button>
  <div>reactive : {{ obj }}</div>
  <button @click="changeObj">change</button>
</template>
<script lang="ts">
import { defineComponent, reactive, Ref, ref } from 'vue';
export default defineComponent({
  name: 'refAndReactive',
  setup() {
    // 使基本类型 转为响应式
    const num: Ref<number> = ref(0);
    // 通过value属性改变 ref数据的值
    function changeNum(): void {
      num.value++;
      console.log('num: ', num);
    }
    // 使用reactive 转化引用类为响应式数据
    const obj = reactive({ name: 'jack', age: 20 });
    function changeObj(): void {
      obj.age++;
      console.log('obj: ', obj);
    }
    return {
      num,
      changeNum,
      obj,
      changeObj
    };
  }
});
</script>
<style scoped></style>
