<template>
  <div class="col-xl-4 col-md-6 col-12">
    <div class="card profile-card-with-cover">
      <div class="card-content">
        <div
          class="card-img-top img-fluid bg-cover height-200"
          style="background: url('https://i.imgur.com/WDqPU7U.png') 50% 30%;"
        ></div>
        <div class="card-profile-image">
          <img
            v-bind:src="getProfile()"
            class="rounded-circle img-border"
            alt="Card image"
          >
        </div>
        <div class="profile-card-with-cover-content text-center">
          <div class="profile-details mt-2">
            <h5 class="card-title">
              <router-link v-bind:to="/profile/ + member.userName">{{ member.userName }}</router-link>
            </h5>
            <ul class="list-inline clearfix mt-2">
              <template v-if="user && isSameUser(member)">
                <li class="mr-3">
                  <h3 class="block">{{ user.watched.length}}</h3>Watched
                </li>
                <li class="mr-3">
                  <h3 class="block">{{ user.followers.length }}</h3>Followers
                </li>
                <li>
                  <h3 class="block">{{ user.following.length }}</h3>Following
                </li>
              </template>

              <template v-else>
                <li class="mr-3">
                  <h3 class="block">{{ member.watched.length }}</h3>Watched
                </li>
                <li class="mr-3">
                  <h3 class="block">{{ member.followers.length }}</h3>Followers
                </li>
                <li>
                  <h3 class="block">{{ member.following.length }}</h3>Following
                </li>
              </template>
            </ul>
            <div v-if="!isSameUser(member) && user">
              <div class="btn btn-form btn-unfollow" v-on:click="unfollowUser" v-if="isFollowing">Unfollow</div>
              <div class="btn btn-form btn-follow" v-on:click="followUser" v-else>Follow</div>
            </div>
          </div>
          <div class="card-body"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import gravatar from 'gravatar';
export default {
  props: {
    initialMember: Object
  },
  mounted: function() {
    this.updateMember();
  },
  methods: {
    getProfile: function(state) {
      return gravatar.url(this.member.email, { s: '110', d: 'https://i.imgur.com/p93deHy.png' }, true);
    },
    updateMember: function() {
      axios
        .get(`/api/users/${this.initialMember.userName}`, {
          withCredentials: true
        })
        .then(response => {
          if (response.data.success) {
            this.member = response.data.user;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    isSameUser: function(member) {
      return member.objectID
        ? member.objectID === this.user._id
        : member._id === this.user._id;
    },

    followUser: function(e) {
      e.preventDefault();
      let data = {
        followingId: this.member._id
      };
      axios
        .post("/api/users/follow", data, {
          withCredentials: true
        })
        .then(response => {
          if (response.data.success) {
            this.updateMember();
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
        followingId: this.member._id
      };
      axios
        .post("/api/users/unfollow", data, {
          withCredentials: true
        })
        .then(response => {
          if (response.data.success) {
            this.updateMember();
          }
        })
        .catch(error => {
          if (error) {
            console.log(error);
          }
        });
    }
  },
  computed: {
    ...mapState('userModule', {
      user: 'user'
    }),
    isFollowing: function() {
      return this.member.followers.some(user => user._id === this.user._id);
    }
  },
  data: function() {
    return {
      member: this.initialMember
    };
  }
};
</script>


<style src="@/assets/styles/members.css" scoped>
</style>
