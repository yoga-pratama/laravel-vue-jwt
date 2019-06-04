<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card card-default">
        <div class="card-header">Dashboarddd</div>

        <div class="card-body">
          Welcome.
          <form @submit.prevent="logout">
            <div class="form-group">
              <button class="btn btn-danger">logout</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    logout() {
      let uri = "http://api-authentification.test/api/logout";

      const JWTtoken = "Bearer " + this.$cookie.get('JWTtoken');
      window.axios.defaults.headers.common["Authorization"] = JWTtoken;
      this.axios.get(uri).then(response => {
        if (response) {
          this.$cookie.delete('JWTtoken');
          this.$cookie.delete('user');
          this.$router.push("/login");
        }
      });
    }
  }
};
</script>