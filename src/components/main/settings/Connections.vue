<template>
  <div class="tab-pane fade" id="nav-connections" role="tabpanel" aria-labelledby="connections-tab">
    <div class="title">Connected Accounts</div>
    <div class="info">Connect your account to 3rd party sites to unlock integrations and new features!</div>
    <div id="connections">
      <div class="row">
        <div class="col">
          <div class="connection">
            <i class="fab fa-twitter-square fa-3x" style="color: #55acee"></i>
            <div class="connection-title">Twitter</div>
            <div class="connection-username" v-if="user.twitter">@{{ user.twitter.username}}</div>
            <div class="connection-username" v-else>Not Connected</div>
            <a class="btn btn-form disconnect" href="#" v-if="user.twitter">Disconnect</a>
            <a class="btn btn-form" href="/api/auth/twitter" v-else>Connect</a>
          </div>
        </div>
        <div class="col">
          <div class="connection">
            <i class="fab fa-google fa-3x" style="color: #4a78fb"></i>
            <div class="connection-title">Google</div>
            <div class="connection-username" v-if="user.google">{{ user.google.username}}</div>
            <div class="connection-username" v-else>Not Connected</div>
            <a class="btn btn-form disconnect" href="#" v-if="user.google">Disconnect</a>
            <a class="btn btn-form" href="/api/auth/google" v-else>Connect</a>
          </div>
        </div>
        <div class="col">
          <div class="connection">
            <i class="fab fa-facebook-square fa-3x" style="color: #3b5998"></i>
            <div class="connection-title">Facebook</div>
            <div class="connection-username">Not Connected</div>
            <div class="btn btn-form">Connect</div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top: 25px;">
        <div class="col-4">
          <div class="connection">
            <i class="fab fa-discord fa-3x" style="color: #7289da"></i>
            <div class="connection-title">Discord</div>
            <div class="connection-username" v-if="user.discord">{{ user.discord.username + '#' + user.discord.discriminator }}</div>
            <div class="connection-username" v-else>Not Connected</div>
            <a class="btn btn-form disconnect" href="#" v-if="user.discord">Disconnect</a>
            <a class="btn btn-form" href="/api/auth/discord" v-else>Connect</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
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
    updateUser: function(e) {
      e.preventDefault();
    }
  }
};
</script>

<style scoped>
</style>