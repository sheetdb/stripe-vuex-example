<template>
  <section class="container">
    <div>

      <form action="/charge" method="POST">
        <script
          src="https://checkout.stripe.com/checkout.js"
          class="stripe-button"
          data-key="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
          data-image="/square-image.png"
          data-name="Demo Site"
          data-description="2 widgets ($20.00)"
          data-amount="2000">
        </script>
      </form>

    </div>
  </section>
</template>

<script>

export default {
  mounted() {

  },
  components: {
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
