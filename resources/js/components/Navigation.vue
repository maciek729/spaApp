<template>
  <div>
    Navigation component
    <br />
    <router-link :to="{ name: 'home' }">Home |</router-link>
    <router-link v-if="!isLogged" :to="{ name: 'login' }">Login |</router-link>
    <a v-if="isLogged" @click.prevent="logout" href="#">Logout |</a>
    <router-link v-if="isLogged" :to="{ name: 'dashboard' }">Dashboard</router-link>
  </div>
</template>

<script>
import Error from "./Error.vue";
export default {
  components: {Error},
  inject: ["auth", "eventBus"],
  data() {
    return { isLogged: false };
  },
  created(){
    this.isLogged = localStorage.getItem("isLogged");
    this.eventBus.$on("isLogged", value => {
      this.isLogged = value;
    });
  },
  beforeDestroy() {
    this.eventBus.$off("isLogged");
  },
  methods: {
    async logout() {
      try{
        await this.auth.logout();
      }catch(err){
        console.error(err);
      }
    }
  }
};
</script>