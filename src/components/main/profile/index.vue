<template>
  <div id="profile">
    <Header/>
    <ProfileHeader 
    v-on:update-body-view="updateBody"
    v-bind:targetUser="targetUser"/>
    <component v-bind:is="componentName" v-bind:targetUser="targetUser"/>
    <!--<Followers v-bind:followers="targetUser.followers"/> -->
    <Footer/>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from "vuex";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import Followers from './Followers';
import Following from './Following';
export default {
  components: {
    Header,
    ProfileHeader,
    ProfileBody,
    Followers,
    Following,
    Footer
  },
  computed: {
    ...mapState('userModule', {
      user: 'user'
    }),
  },
  data() {
    return {
      targetName: this.$route.params.user,
      targetUser: {},
      componentName: 'ProfileBody'
    };
  },
  methods: {
    updateBody: function(component) {
      this.componentName = component;
    }
  },
  created() {
    axios.get("/api/users/" + this.targetName, {
        withCredentials: true
      }).then(response => {
        if (response.data.success) {
          this.targetUser = response.data.user;
        }
      }).catch((error) => {
        console.log(error);
        router.push("/");
      });
  }
}
</script>

<style src="@/assets/styles/profile.css">
</style>