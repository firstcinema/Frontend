<template>
  <div class="section" style="margin-top: 0 !important">
    <div class="container">
      <div class="row">
        <div v-if="!followers.length" class="col-12 noFollowers">
          <h3><i class="fa fa-users"></i> No followers found</h3>
        </div>
        <MemberCard v-else v-for="(member, index) in followers" :key="`member-${index}`" class="col-xl-4 col-md-6 col-12" v-bind:initialMember="member" />
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
  computed: {
    ...mapState('userModule', {
      user: 'user'
    }),
    followers: function () {
      return this.targetUser.followers;
    }
  }
}
</script>
    
<style src="@/assets/styles/members.css" scoped>
</style>
    
