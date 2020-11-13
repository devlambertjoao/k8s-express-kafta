<template>
  <div id="producer" class="box home-item">
      <span class="box-title">MS-Producer</span>
      <textarea id="message" v-model="this.message" placeholder="Digite sua mensagem"></textarea>
      <button id="send-button" v-on:click="sendMessage()" class="action-button">Enviar</button>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import axios from 'axios';

export default class Producer extends Vue {
  message = '';

sendMessage = async () => {
  //Todo refatorar axios
  let instance = axios.create({
    headers: {
      post: {
        'Content-Type': 'application/json',
      }
    }
  })
  instance.post('http://192.168.49.2:30890', { msg: this.message })
  .then(() => { this.message = '';})
  .catch(err => console.error(err));
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
