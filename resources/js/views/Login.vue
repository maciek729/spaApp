
<template>
  
  <div class="m-3">
    Login component
    <br />
    <form>
      <div>
        <label for="email">Email:</label>
        <input v-model="form.email" type="email" id="email" />
      </div>
      <div>
        <label for="password">Hasło:</label>
        <input v-model="form.password" type="password" id="password" />
      </div>
      <button @click.prevent="login">Zaloguj się</button>
    </form>
  </div>
</template>

<script>
export default {
  inject: ["auth"],
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {

      try{
        await this.auth.login(this.form);
      }catch(err){
        this.form.email = "";
        this.form.password = "";
      }
    }
  }
};
</script>