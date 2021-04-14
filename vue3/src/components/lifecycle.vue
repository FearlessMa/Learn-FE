<template>
  <div>lifecycle</div>
  <div>{{ num }}</div>
  <button @click="num++">change</button>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from 'vue';
export default defineComponent({
  name: 'lifecycle',
  setup() {
    console.log('vue3 setup ...');
    const num = ref(0);
    onBeforeMount(() => {
      console.log('vue3 onBeforeMount ...');
    });
    onMounted(() => {
      console.log('vue3 onMounted ...');
    });

    onBeforeUpdate(() => {
      console.log('vue3 onBeforeUpdate ...');
    });
    onUpdated(() => {
      console.log('vue3 onUpdated ...');
    });



    onBeforeUnmount(() => {
      console.log('vue3 onBeforeUnmount ...');
    });
    onUnmounted(() => {
      console.log('vue3 onUnmounted ...');
    });
    return {
      num
    };
  },
  beforeCreate() {
    console.log('vue2 beforeCreate ...');
  },
  created() {
    console.log('vue2 created ...');
  },
  beforeMount() {
    console.log('vue2 beforeMount ...');
  },
  mounted() {
    console.log('vue2 mounted ...');
  },
  beforeUpdate() {
    console.log('vue2 beforeUpdate ...');
  },
  updated() {
    console.log('vue2 updated ...');
  },

  beforeUnmount() {
    console.log('vue2 beforeDestroy ...');
  },
  unmounted() {
    console.log('vue2 destroy ...');
  }
});
</script>
<style scoped></style>
