<template>
  <div class="full-bg">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="content">
            <form class="sign" v-on:submit="sendReset">
              <a href="/" class="logo">
                <img src="@/assets/images/logo.png" alt="Logo">
              </a>
              <div class="error-msg" v-if="error">{{ error }}</div>
              <div class="main-form">
                <div class="text-group">
                  <input
                    type="email"
                    class="input"
                    name="email"
                    id="email"
                    placeholder="Email"
                    autocomplete="off"
                  >
                </div>
                <span>Please enter the email address you used to register. You will be sent an email with instructions on how to reset your password.</span>
                <button class="btn" name="Submit" value="Submit" type="Submit">Submit</button>
                <span class="text">Don't have an account? <a href="#">Sign up!</a></span>
                <span class="text"><router-link :to="'Login'">Remember Your Password?</router-link></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/Routes";
import axios from "axios";
export default {
  data() {
    return {
      error: ""
    };
  },
  methods: {
    sendReset: function(e) {
      e.preventDefault();
      let email = e.target.elements.email.value;

      if (!email) {
        this.error = 'Please enter a valid email address';
        return;
      }

      let data = { email: email };
      axios.post("http://localhost:5000/api/users/resetPassword", data, {
          withCredentials: true
        }).then(response => {
          if (response.data.success) {
            router.push("/");
          } else {
            this.error = response.data.message;
          }
        }).catch(() => {});
    }
  }
};
</script>

<style src="@/assets/styles/sign.css" scoped>
.wrapper {
  margin-top: 80px;
  margin-bottom: 20px;
}

.form-signin {
  max-width: 420px;
  padding: 30px 38px 66px;
  margin: 0 auto;
  background-color: #eee;
  border: 3px dotted rgba(0, 0, 0, 0.1);
}

.form-signin-heading {
  text-align: center;
  margin-bottom: 30px;
}

.form-control {
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
}

input[type="text"] {
  margin-bottom: 0px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

input[type="password"] {
  margin-bottom: 20px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>