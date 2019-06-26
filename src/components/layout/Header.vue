<template>
  <div id="nav">
    <header class="top-bar text-white" id="topbar">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-sm-4">
            <p class="top-bar intro">Stay connected with us!</p>
          </div>
          <div class="col-lg-4 col-sm-8">
            <div class="top-bar right-btns">
              <a class="btn" href="https://discord.me/FirstCinema">Discord</a>
              <a class="btn" href="https://discord.me/FirstCinema">Twitter</a>
              <a class="btn" href="https://discord.me/FirstCinema">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="container" id="navigation">
      <div class="row">
        <div class="logo">
          <router-link :to="'/'">
          <img src="@/assets/images/logo-w.png" alt>
          <img src="@/assets/images/text-logo.png" alt="Text Logo" style="width: 140px; margin-right: 0;">
          </router-link>
        </div>
        <nav aria-label="breadcrumb">
          <ul class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">Home</li>
            <li class="breadcrumb-item">
              <router-link :to="'/films'">Films</router-link>
            </li>
            <li class="breadcrumb-item">
              <a href="/collections">Collections</a>
            </li>
            <li class="breadcrumb-item">
              <router-link :to="'/members'">Members</router-link>
            </li>
          </ul>
        </nav>
        <nav aria-label="breadcrumb" class="ml-auto">
          <ul class="breadcrumb" v-if="user">
            <li class="breadcrumb-item profile-nav">
              <a href>
                <img v-bind:src="getProfile()" alt="User" class="profile-nav-image">
                <span>{{ user.userName }} </span>
                <i class="fa fa-caret-down"></i>
                <ul class="dropdown">
                  <li>
                    <router-link :to="`/profile/${user.userName}`">
                      <i class="fa fa-user"></i> Profile
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="'/account'">
                      <i class="fa fa-users"></i> Account Details
                    </router-link>
                  </li>
                  <li>
                    <a href="#" v-on:click="logoutUser">
                      <i class="fa fa-sign-out"></i> Logout
                    </a>
                  </li>
                </ul>
              </a>
            </li>
          </ul>
          <ul class="breadcrumb" v-else>
            <router-link :to="'/login'" class="breadcrumb-item">Login</router-link>
            <router-link :to="'/register'" class="breadcrumb-item">Register</router-link>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import router from "@/Routes";
import axios from "axios";
export default {
  computed: {
    ...mapState('userModule', {
      user: 'user'
    }),
  },
  methods: {
    ...mapGetters('userModule', {
      getProfile: 'getProfile'
    }),
    logoutUser: function() {
      this.$store.dispatch('userModule/logout');
    }
  },

}
</script>
<style scoped>
</style>