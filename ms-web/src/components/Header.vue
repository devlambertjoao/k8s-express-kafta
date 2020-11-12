<template>
  <div id="header">
      <span>MS-Web</span>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class Header extends Vue { }
</script>

<style scoped>
#header {
  background-color: rgb(71, 141, 199);
  padding: 8px;
}
</style>
