<template>
  <div class="section" style="margin-top: 0 !important">
    <div class="container">
      <div class="row">
        <div v-if="!following.length" class="col-12 noFollowers">
          <h3><i class="fa fa-users"></i> This user isn't following anyone</h3>
        </div>

        <MemberCard v-else v-for="(member, index) in following" :key="`member-${index}`" class="col-xl-4 col-md-6 col-12" v-bind:initialMember="member"/>
    </div>
  </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import MemberCard from '../members/MemberCard';
export default {
  components: {
    MemberCard
  },
  props: {
    targetUser: Object
  },
  methods: {
    isFollowing: function(searched) {
      return searched.followers.some(user => user._id === this.user._id)
    }
  },
  computed: {
    ...mapState('userModule', {
      user: 'user'
    }),
    following: function () {
      return this.targetUser.following;
    }
  }
}
</script>
    
<style src="@/assets/styles/members.css" scoped>
</style>
    
