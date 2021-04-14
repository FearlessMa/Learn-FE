<template>
  <RefAndReactive />
  <hr />
  <div v-if="show">
    <Lifecycle />
  </div>
  <button @click="show = !show">show {{ show }}</button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import RefAndReactive from './components/refAndReactive.vue';
import Lifecycle from './components/lifecycle.vue';
export default defineComponent({
  name: 'app',
  components: {
    RefAndReactive,
    Lifecycle
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
