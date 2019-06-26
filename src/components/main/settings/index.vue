<template>
  <div id="settings">
    <Header/>

    <div class="container">
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-home" aria-selected="true">Profile</a>
                <a class="nav-item nav-link" id="password-tab" data-toggle="tab" href="#nav-password" role="tab" aria-controls="nav-password" aria-selected="false">Password</a>
                <a class="nav-item nav-link" id="connections-tab" data-toggle="tab" href="#nav-connections" role="tab" aria-controls="nav-connections" aria-selected="false">Connections</a>
            </div>
        </nav>
        <div class="tab-content" id="tab-content">
            <div class="notVerified" v-if="!user.isVerified"><span>Your account has not been verified.</span> 
            <br />Click <a href v-on:click="resendConfirmation">here</a> to resend verification email</div>
            <AccountSettings />
            <ChangePassword />
            <Connections />
        </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import mailMixin from '@/mixins/mail';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AccountSettings from './AccountSettings';
import ChangePassword from './ChangePassword';
import Connections from './Connections';
export default {
  mixins: [mailMixin],
  components: {
    Header,
    AccountSettings,
    ChangePassword,
    Connections,
    Footer
  },
  computed: {
    ...mapState('userModule', {
      user: 'user'
    }),
  },
  methods: {
    resendConfirmation: function(event) {
      event.preventDefault();
      this.sendConfirmation(this.user);
    }
  },
  created() {}
};
</script>
<style src="@/assets/styles/settings.css">
</style>