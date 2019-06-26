<template>
  <div class="section" style="margin-bottom: 0 !important">
    <div class="container">
      <div class="row">
        <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="profile-block">
            <div class="profile-header">
              <div class="header-image">
                <img src="https://i.imgur.com/WDqPU7U.png" alt="Background Image">
                <div v-if="targetUser._id !== user._id">
                  <a
                    href
                    class="unfollow-btn"
                    v-on:click="unfollowUser"
                    v-if="followingUser"
                  >Unfollow</a>
                  <a href class="follow-btn" v-on:click="followUser" v-else>Follow</a>
                </div>
              </div>
              <div class="profile-navigation">
                <div class="row">
                  <div class="col col-lg-5 col-md-5 col-sm-12 col-12">
                    <ul class="nav-menu">
                      <li
                        v-on:click="$emit('update-body-view', 'ProfileBody')"
                        class="active"
                      >Profile</li>
                      <li v-on:click="$emit('update-body-view', 'Films')">Films</li>
                      <li v-on:click="$emit('update-body-view', 'Collections')">Collections</li>
                    </ul>
                  </div>
                  <div class="col col-lg-5 ml-auto col-md-5 col-sm-12 col-12">
                    <ul class="nav-menu">
                      <li v-on:click="$emit('update-body-view', 'Followers')">Followers</li>
                      <li v-on:click="$emit('update-body-view', 'Following')">Following</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="user">
                <a href="#" class="thumbnail">
                  <img v-bind:src="getProfile()" alt="User">
                </a>
                <div class="user-content">
                  <a
                    v-bind:href="/profile/ + targetUser.userName"
                    class="h4 user-name"
                  >{{ targetUser.userName }}</a>
                  <div v-if="targetUser.status" class="status">{{ targetUser.status }}</div>
                  <div v-else class="status">Status</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import gravatar from "gravatar";
import axios from "axios";
export default {
  props: {
    targetUser: Object
  },
  data() {
    return {
      followingUser: false
    };
  },
  watch: {
    targetUser: function(val) {
      this.followingUser = val.followers.some(
        user => user._id === this.user._id
      );
    }
  },
  computed: {
    ...mapState("userModule", {
      user: "user"
    })
  },
  methods: {
    getProfile: function(state) {
      return gravatar.url(
        this.targetUser.email,
        { s: "125", d: "retro" },
        true
      );
    },
    followUser: function(e) {
      e.preventDefault();
      let data = {
        followingId: this.targetUser._id
      };
      axios
        .post("/api/users/follow", data, {
          withCredentials: true
        })
        .then(response => {
          if (response.data.success) {
            this.followingUser = true;
          }
        })
        .catch(error => {
          if (error) {
            console.log(error);
          }
        });
    },
    unfollowUser: function(e) {
      e.preventDefault();
      let data = {
        followingId: this.targetUser._id
      };
      axios
        .post("/api/users/unfollow", data, {
          withCredentials: true
        })
        .then(response => {
          if (response.data.success) {
            this.followingUser = false;
          }
        })
        .catch(error => {
          if (error) {
            console.log(error);
          }
        });
    }
  }
};
</script>

<style scoped>
</style>