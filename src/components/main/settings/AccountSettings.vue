<template>
  <div
    class="tab-pane fade show active"
    id="nav-profile"
    role="tabpanel"
    aria-labelledby="profile-tab"
  >
    <div class="title">Account Settings</div>
    <div class="success">{{ success }}</div>
    <div class="error">{{ error }}</div>
    <div class="row">
      <div class="col-md-8">
        <div class="main-form">
          <form class="profile-form" v-on:submit="updateUser" method="put">
            <div class="text-group">
              <input
                type="text"
                class="input"
                placeholder="Username"
                name="username"
                autocomplete="off"
                v-bind:value="user.userName"
              >
              <input
                type="text"
                class="input"
                placeholder="Status"
                name="status"
                autocomplete="off"
                v-bind:value="user.status"
              >
            </div>
            <div class="text-group">
              <input
                type="text"
                class="input"
                placeholder="First Name"
                name="first_name"
                autocomplete="off"
                v-bind:value="user.firstName"
              >
              <input
                type="text"
                class="input"
                placeholder="Last Name"
                name="last_name"
                autocomplete="off"
                v-bind:value="user.lastName"
              >
            </div>
            <div class="text-group">
              <input
                type="text"
                class="input"
                placeholder="Email"
                autocomplete="off"
                name="email"
                v-bind:value="user.email"
              >
            </div>
            <div class="text-group">
              <input
                type="text"
                class="input"
                placeholder="Location"
                name="location"
                autocomplete="off"
                v-bind:value="user.location"
              >
              <input
                type="text"
                class="input"
                placeholder="Website"
                name="website"
                autocomplete="off"
                v-bind:value="user.website"
              >
            </div>
            <div class="text-group">
              <textarea
                class="input"
                placeholder="Bio"
                autocomplete="off"
                name="bio"
                v-bind:value="user.bio"
              ></textarea>
            </div>
            <button class="btn btn-form" id="save" type="submit">Save</button>
          </form>
        </div>
      </div>
      <div class="col-md-4">
        <div class="avatar-display">
          <img v-bind:src="getProfile()" alt="User">
          <h3>Avatar</h3>
          <p>
            We use the
            <a href="https://en.gravatar.com/">Gravatar</a> that matches your email address on your account.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters } from "vuex";
export default {
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
    ...mapGetters('userModule', {
      getProfile: 'getProfile'
    }),
    updateUser: function (e) {
      e.preventDefault();
      let data = {
        userName: e.target.elements.username.value,
        firstName:e.target.elements.first_name.value,
        lastName: e.target.elements.last_name.value,
        email: e.target.elements.email.value,
        status: e.target.elements.status.value,
        location: e.target.elements.location.value,
        website: e.target.elements.website.value,
        bio: e.target.elements.bio.value,
      };
      axios
        .put("http://localhost:5000/api/users/" + this.user._id, data, {
          withCredentials: true
        })
        .then(response => {
          if (response.data.success) {
            this.success = response.data.message
          } else {
            this.error = response.data.message;
          }
        })
        .catch(() => {});
    }
  }
}
</script>

<style scoped>
</style>