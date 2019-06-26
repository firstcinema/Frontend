<template>
  <div class="full-bg">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="content">
            <form class="sign" v-on:submit="register">
              <router-link :to="'/'" class="logo">
                <img src="@/assets/images/logo.png" alt="Logo">
              </router-link>
              <div class="error-msg" v-if="error">{{ error }}</div>
              <div class="main-form">
                <div class="text-group">
                  <input
                    type="email"
                    class="input"
                    name="email"
                    placeholder="Email"
                    autocomplete="off"
                    required
                  >
                </div>
                <div class="text-group">
                  <input
                    type="text"
                    class="input"
                    name="username"
                    placeholder="Username"
                    autocomplete="off"
                  >
                </div>
                <div class="text-group">
                  <input
                    type="password"
                    class="input"
                    name="password"
                    placeholder="Password"
                    autocomplete="off"
                  >
                </div>
                <div class="text-group">
                  <input
                    type="password"
                    class="input"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    autocomplete="off"
                  >
                </div>
                <button class="btn" name="Submit" value="Login" type="Submit">Register</button>
                <div class="connect-with">
                  <div class="sep"></div>
                  <p>Or Register With</p>
                </div>
                <a href="/api/auth/twitter" class="social-btn btn-tw">
                  <i class="fab fa-twitter"></i>Twitter
                </a>
                <a href="/api/auth/discord" class="social-btn btn-dis">
                  <i class="fab fa-discord"></i>Discord
                </a>
                <a href="/api/auth/google" class="social-btn btn-gl">
                  <i class="fab fa-google"></i>Google
                </a>
                <a href="/api/auth/facebook" class="social-btn btn-fb">
                  <i class="fab fa-facebook-f"></i>Facebook
                </a>
                <span class="text">
                  Already have an account?
                  <router-link :to="'Login'">Login!</router-link>
                </span>
                <span class="text">
                  <router-link :to="'ResetPassword'">Forgot password?</router-link>
                </span>
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
import mailMixin from '@/mixins/mail';
import axios from "axios";
export default {
  mixins: [mailMixin],
  data() {
    return {
      error: ""
    };
  },
  methods: {
    register: function(e) {
      e.preventDefault();
      let userName = e.target.elements.username.value;
      let email = e.target.elements.email.value;
      let password = e.target.elements.password.value;
      let confirmedPassword = e.target.elements.confirmPassword.value;
      if (!userName || !email || !password || !confirmedPassword) {
        this.error = "All fields are required!";
        return;
      }

      if (confirmedPassword != password) {
        this.error = "Passwords do not match";
        return;
      }

      let data = { userName: userName, email: email, password: password };

       axios.post('/api/users', data, {
        withCredentials: true
      }).then(response => {
        if (response.data.success) {
          this.error = '';
          this.sendConfirmation(response.data.user);
        } else {
          this.error = response.data.message;
        }
      }).catch(error => {
        console.log(error);
      });
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