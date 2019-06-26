<template>
  <div id="home">
    <Header />
    <LatestNews />
    <RecentlyAdded />
    <PopularReviews />
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LatestNews from './LatestNews';
import RecentlyAdded from './RecentlyAdded';
import PopularReviews from './PopularReviews';
export default {
  components: {
    Header,
    LatestNews,
    RecentlyAdded,
    PopularReviews,
    Footer
  },
  computed: {
    ...mapState('userModule', {
      user: 'user'
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
