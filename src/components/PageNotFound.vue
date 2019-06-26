<template>
  <div class="full-bg">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="content">
            <div class="sign">
              <h1 class="sign-title">404</h1>
              <p class="sign-content">Sorry, the page you are looking for doesn't exist!</p>
              <router-link :to="{ name: 'Home' }" class="btn">Home</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style src="@/assets/styles/sign.css" scoped>
</style>