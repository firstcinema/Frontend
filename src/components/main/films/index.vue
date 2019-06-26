<template>
  <div id="films">
    <Header/>
    <Search/>
    <HandPicked/>
    <PopularThisWeek/>
    <RecentlyReviewed/>
    <Footer/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Search from "@/components/layout/Search";
import HandPicked from "./HandPicked";
import PopularThisWeek from "./PopularThisWeek";
import RecentlyReviewed from "./RecentlyReviewed";
export default {
  components: {
    Header,
    Search,
    HandPicked,
    PopularThisWeek,
    RecentlyReviewed,
    Footer
  },
  computed: {
    ...mapState('userModule', {
      user: 'user'
    }),
  }
};
</script>

<style>
.section-title {
  margin-top: 50px;
}
.browse-by h3 {
  float: left;
  margin: 9px 10px 0 0;
  font-size: 1rem;
  color: #97989b;
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
}

.filter {
  display: inline-block;
}

.filter li {
  float: left;
}

.first-select {
  border-radius: 0;
}

.first-select option {
  clear: both;
  color: #000;
  cursor: pointer;
  line-height: 1.3rem;
  width: 100%;
  text-align: left;
  text-transform: none;
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
}
</style>