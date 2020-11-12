<template>
  <div id="home">
    <Producer />
    <Consumer />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Consumer from '@/components/Consumer.vue';
import Producer from '@/components/Producer.vue';

@Options({
  components: {
    Consumer,
    Producer,
  },
})
export default class Home extends Vue {}
</script>

<style scoped>
#home {
  display: flex;
  height: calc(100vh - 34px); /* Toda tela menos header */
  min-height: 435px;
  justify-content: space-around;
}
</style>

<style>
.home-item {
  width: 100%;
  padding: 8px;
  min-height: 100px;
  margin: 16px;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.action-button {
  width: 60%;
  padding: 8px 0px;
  align-self: center;
  margin-top: 8px;
}

.box-title {
  margin-bottom: 8px;
}

.box {
  border-radius: 8px;
  -webkit-box-shadow: 8px 8px 8px 0px rgba(189,187,189,0.6);
  -moz-box-shadow: 8px 8px 8px 0px rgba(189,187,189,0.6);
  box-shadow: 8px 8px 8px 0px rgba(189,187,189,0.6);
}

@media screen and (max-width: 768px) {
  #home {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px 16px;
  }
  .home-item {
    height: 100%;
  }
}
</style>
