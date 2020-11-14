<template>
  <div id="consumer" class="box home-item">
      <span class="box-title">MS-Consumer</span>
      <div id="messages-container">
        <span class="box message" v-for="item of items" :key="item">{{ item }}</span>
      </div>
      <button id="clean-messages-button" class="action-button"
       v-on:click="cleanList()">Limpar lista</button>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { consumerWebSocketService } from '../services/consumerWebSocketService';

export default class Consumer extends Vue {
  items: string[] = [];

  beforeMount() {
    consumerWebSocketService.getWSInstance().onmessage = event => {
      this.items.push(event.data)
    }
  }

  cleanList = () => {
    this.items = [];
  }
}
</script>

<style scoped>
#messages-container {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  height: 100%;
  overflow: auto;
  padding-bottom: 16px;
  margin-top: 16px;
}

.message {
  margin: 8px 16px 0px 16px;
  padding: 8px;
  background-color: rgb(233,233,233);
}

.message:nth-child(1) {
  margin-top: 0px;
}
</style>
