<template>
  <RefAndReactive />
  <hr />
  <div v-if="show">
    <Lifecycle />
  </div>
  <button @click="show = !show">show {{ show }}</button>
  <hr />
  <span>ref element</span>
  <RefElement />
  <hr />
  <span>toRefs</span>
  <ToRefs />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import RefAndReactive from './components/refAndReactive.vue';
import Lifecycle from './components/lifecycle.vue';
import RefElement from './components/refElement.vue';
import ToRefs from './components/toRefs.vue';

export default defineComponent({
  name: 'app',
  components: {
    RefAndReactive,
    Lifecycle,
    RefElement,
    ToRefs
  },
  setup() {
    const show = ref(true);
    return {
      show
    };
  }
});
</script>
<style scoped></style>
