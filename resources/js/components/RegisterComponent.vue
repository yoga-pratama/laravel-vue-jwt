<template>
  <form @submit.prevent="registerForm">
    <div class="form-group">
      <label for="formGroupExampleInput">Name</label>
      <input type="text" class="form-control" v-model="name" placeholder="Input Name">
    </div>
    <div class="form-group">
      <label for="formGroupExampleInput2">Email</label>
      <input type="email" class="form-control" v-model="email" placeholder="Email" required>
    </div>
    <div class="form-group">
      <label for="formGroupExampleInput2">Password</label>
      <input
        type="password"
        class="form-control"
        v-model="password"
        placeholder="Password"
        required
      >
    </div>
    <div class="form-group">
      <label for="formGroupExampleInput2">Confirm Password</label>
      <input
        type="password"
        class="form-control"
        v-model="password_confirm"
        placeholder="Password Confirmation"
        required
      >
    </div>
    <button class="btn btn-primary">Register</button>
  </form>
</template>


<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirm: ""
    };
  },
  methods: {
    registerForm() {
      let uri = "http://api-authentification.test/api/register";

      this.axios
        .post(uri, {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirm
        })
        .then(response => {
          const JWTtoken = "Bearer " + response.data.token;

          window.axios.defaults.headers.common["Authorization"] = JWTtoken;
          let userDetail = "http://api-authentification.test/api/user";
          this.axios.get(userDetail).then(resp => {
            this.$cookie.set("JWTtoken", response.data.token, { expires: 7 });
            this.$cookie.set("user", resp.data.name, { expires: 7 });
            this.$router.push("/");
          });
        });
    }
  }
};
</script>

