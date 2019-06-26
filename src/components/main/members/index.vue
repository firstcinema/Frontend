<template>
  <div id='members'>
    <Header />

    <Search v-on:search-results='searchResults' />

    <div class="section" v-if="results.length">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-title">
              <h2>Search Results</h2>
            </div>
          </div>
          <MemberCard v-for="result in results" :key="result.objectID" v-bind:initialMember="result" />
        </div>
      </div>
    </div>

    <MembersList v-if="!results.length"/>

    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Search from '@/components/layout/Search';
import MembersList from './MembersList.vue';
import MemberCard from './MemberCard.vue';
import algoliasearch from 'algoliasearch/lite';

export default {
  components: {
    Header,
    Search,
    MemberCard,
    MembersList,
    Footer
  },
  computed: {
    ...mapState('userModule', {
      user: 'user'
    }),
  },

  methods: {
    searchResults: function(response) { 
      if (response.query.length > 0) {
        this.results = response.items;
        return;
      }
      this.results = [];
    }
  },

  data() {
    return {
      searchClient: algoliasearch(
        'B1G2GM9NG0',
        'aadef574be1f9252bb48d4ea09b5cfe5'
      ),
      results: []
    };
  }
};
</script>

<style>
</style>