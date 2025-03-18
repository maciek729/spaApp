<template>
  <div class="container">
    Spa component
    <br />
    <navigation />
    <router-view></router-view>
    <error></error>
  </div>
</template>
<script>
import Navigation from "./components/Navigation.vue";
import Error from "./components/Error.vue";
export default {
  inject: ["auth"],
  components: {Navigation, Error},
  created() {
    axios.interceptors.response.use(
      response => {
        return response
      },
      error => {
        if (error.response.status === 401) {
          this.auth.reset();
        }
        this.$root.$emit("error",error);
        return Promise.reject(error);
      }
    );
    this.checkUserStatus();
  },
  methods: {
    async checkUserStatus() {
      if (Auth.isLogged()) {
        try {
          const user = await this.auth.getAuthUser();
          localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
          console.error("Error getting user:", error);
        }
      }
    }
  }
};
</script>