<template>
    <ais-instant-search
      index-name="firstcinema_users"
      :search-client="searchClient"
      :class-names="{
      'ais-InstantSearch': 'section'
      }"
    >
      <div class="container">
        <ais-search-box>
           <div class="search-box" slot-scope="{ currentRefinement, isSearchStalled, refine }">
              <input
                class="form-control"
                placeholder="Search for a member"
                aria-label="Search"
                name="search"
                type="search"
                v-model="query"
                @input="refine($event.currentTarget.value)"
              >
            </div>
        </ais-search-box>
    </div>
    <ais-hits
      :escapeHTML="true"
      :transform-items="searchResults"
    ></ais-hits>
  </ais-instant-search>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';

export default {
  methods: {
    searchResults: function(items) {
      this.$emit('search-results', 
      {
        query: this.query,
        items: items
      });
    }
  },
  data() {
    return {
      searchClient: algoliasearch('KDO7BBS2D0', '853663f3d5de971467a86c308bc4a7ce'),
      query: ''
    };
  }
};
</script>

<style scoped>
.section {
  margin: 0;
}

.search-box {
  margin: 25px 0;
}

.search-box input[type="search"] {
  background: transparent;
  border: none;
  border-radius: 0;
  box-sizing: content-box;
  border-bottom: 2px solid #97989b;
  color: #97989b;
  font-weight: 100;
}

.form-control:focus {
  box-shadow: 0 0 0 0.2rem rgba(231, 76, 60, 0.25) !important;
}
</style>