<template>
  <div class="section" style="margin-top: 0 !important">
    <div class="container">
      <div class="row">
        <div class="col-8">
          <div class="profile-block">
            <div class="block-title">
              <h6>Activity</h6>
            </div>
            <ul class="activity-body">
              <li><a href="#">{{ targetUser.userName }}</a> stopped following <a href="#">Anonymous User</a>.<span class="timestamp">2h ago</span></li>
              <li><a href="#">{{ targetUser.userName }}</a> watched <a href="#">Stand By Me</a>.<span class="timestamp">5h ago</span></li>
              <li><a href="#">{{ targetUser.userName }}</a> watched <a href="#">It</a>.<span class="timestamp">8h ago</span></li>
            </ul>
          </div>
        </div>
        <div class="col-4">
          <div class="profile-block">
            <div class="block-title">
              <h6>About Me</h6>
            </div>
            <ul class="block-body">
              <li v-if="targetUser.bio">{{ targetUser.bio }}</li>
              <li v-else>No Biography Found</li>
              <li id="location" v-if="targetUser.location"><i class="fa fa-globe"></i> {{ targetUser.location }}</li>
            </ul>
            <div class="social-network">
              <a v-if='targetUser.twitter' v-bind:href="targetTwitter" target="_blank" class="social-item btn-tw"><i class="fab fa-twitter"></i>Twitter</a>
              <a href="#" class="social-item btn-fb"><i class="fab fa-facebook-f"></i>Facebook</a>
              <a href="#" class="social-item btn-ins"><i class="fab fa-instagram"></i>Instagram</a>
              <a v-if="targetUser.website" target="_blank" class="social-item btn-web" v-bind:href="targetUser.website"><i class="fa fa-link"></i>Website</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    props: {
      targetUser: Object
    },
    computed: {
        ...mapState(["user"]),
        targetTwitter: function() {
          return this.targetUser.twitter ? 'https://twitter.com/' + this.targetUser.twitter.username : '';
        }
    }
}
</script>