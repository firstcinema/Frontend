<template>
  <div class="tab-pane fade" id="nav-password" role="tabpanel" aria-labelledby="password-tab">
    <div class="title">Change Password</div>
    <div class="info">Please ensure the password you create is 7 characters long, hard to guess, and is as unique as possible.</div>
    <div class="success">{{ success }}</div>
    <div class="error">{{ error }}</div>
    <div class="row">
      <div class="col-md-8">
        <div class="main-form">
          <form class="profile-form" v-on:submit="changePassword">
            <div class="text-group">
              <input
                type="password"
                class="input"
                placeholder="Current Password"
                name="currentPassword"
                value=""
                autocomplete="off"
              >
            </div>
            <div class="text-group">
              <input
                type="password"
                class="input"
                placeholder="New Password"
                name="password"
                value=""
                autocomplete="off"
              >
              <input
                type="password"
                class="input"
                placeholder="Confirm New Password"
                name="confirmPassword"
                value=""
                autocomplete="off"
              >
            </div>
            <button class="btn btn-form" id="confirm-password" type="submit">Change Password</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import mailMixin from '@/mixins/mail';
import { mapState } from "vuex";
export default {
  mixins: [mailMixin],
  computed: {
    ...mapState('userModule', {
      user: 'user'
    }),
  },
  data() {
    return {
      success: "",
      error: ""
    };
  },
  methods: {
    changePassword: function(e) {
      e.preventDefault();

      let currentPassword = e.target.elements.currentPassword.value;
      let password = e.target.elements.password.value;
      let confirmedPassword = e.target.elements.confirmPassword.value;

      if ((!currentPassword && this.user.password) || !password || !confirmedPassword) {
        this.error = 'All fields are required';
        return;
      }

      if (confirmedPassword != password) {
        this.error = 'Passwords do not match';
        return;
      }

      let data = {
        currentPassword: currentPassword,
        password: password
      };

      axios.post('http://localhost:5000/api/users/password', data, {
        withCredentials: true
      }).then(response => {
        if (response.data.success) {
          this.error = '';
          this.success = 'Password successfully updated';
          this.sendPaswordUpdate(this.user);
        } else {
          this.success= '';
          this.error = response.data.message;
        }
      }).catch(error => {
        console.log(error);
      });

    }
  }
};
</script>

<style scoped>
</style>