<template>
  <div id="producer" class="box home-item">
      <span class="box-title">MS-Producer</span>
      <textarea id="message" v-model="this.message" placeholder="Digite sua mensagem"></textarea>
      <button id="send-button" v-on:click="sendMessage()" class="action-button">Enviar</button>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { producerService } from '../services/producerService';

export default class Producer extends Vue {
  message = '';

sendMessage = () => {
  producerService.sendMessage({ msg: this.message})
    .then(() => {
      this.message = '';
  });
}
}
</script>

<style scoped>
#message {
  resize: none;
  height: 100%;
  outline: none;
  padding: 4px;
  margin: 16px;
}
</style>
