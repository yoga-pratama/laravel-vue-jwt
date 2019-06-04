<template>
  <div class="col-md-8">
    <form @submit.prevent="loginForm">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          v-model="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        >
        <small
          id="emailHelp"
          class="form-text text-muted"
        >We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" v-model="password" placeholder="Password">
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Submit</button>
        <router-link :to="{ name : 'register' }" class="nav-link">Register</router-link>
      </div>
    </form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    loginForm() {
      console.log("enter login");
      let uri = "http://api-authentification.test/api/login";

      this.axios
        .post(uri, {
          email: this.email,
          password: this.password
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