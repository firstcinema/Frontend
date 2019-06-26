<template>
  <div class="section">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-title">
            <h2>Community Members</h2>
          </div>
        </div>
        <div class="col-md-12 uhOh" v-if="(typeof users === 'undefined') || users.length == 0">
          <img src="@/assets/images/oh-noes.jpg" alt>
          <h1>We couldn't find anymore users ;(</h1>
          <h5>If you believe this could be an error, please report it in the community section!</h5>
        </div>

        <MemberCard v-else v-for="(member, index) in users" :key="`member-${index}`" v-bind:initialMember="member" />
      </div>
      <div v-if="users !== undefined && users.length != 0">
        <nav aria-label="Page navigation example">
          <ul class="pagination pagination-md justify-content-center">
            <li class="page-item" v-bind:class="{ 'disabled': pageNumber == 1}">
              <a class="page-link" href="#" aria-label="Previous" v-on:click="previousPage">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            <li class="page-item active">
              <a class="page-link">{{ pageNumber }}</a>
            </li>
            <li class="page-item" v-bind:class="{ 'disabled': pageNumber == pages }">
              <a class="page-link" href="#" aria-label="Next" v-on:click="nextPage">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/Routes";
import axios from "axios";
import { mapState } from "vuex";
import MemberCard from './MemberCard.vue';
export default {
  components: {
    MemberCard
  },
  computed: {
    ...mapState(["user"])
  },
  data() {
    return {
      pageNumber: this.$route.params.pageNumber || 1,
      pages: 0,
      users: []
    };
  },
  methods: {
    getUsers() {
      axios.get("/api/users/paged/" + this.pageNumber, {
        withCredentials: true
      })
      .then(response => {
        if (response.data.success) {
          this.users = response.data.users;
          this.pages = response.data.pages;
          this.pageNumber = response.data.currentPage;
        }
      }).catch(() => {
        router.push("/");
      });
    },

    previousPage() {
      this.pageNumber--;
    },
    nextPage() {
      this.pageNumber++;
    }
  },
  created() {
    this.getUsers();
  },
  watch: {
    pageNumber () {
      this.getUsers();
    }
  }
};
</script>

<style src="@/assets/styles/members.css" scoped>
</style>