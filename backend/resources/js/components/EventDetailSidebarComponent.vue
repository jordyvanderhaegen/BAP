<template>
<div class="container">
  <div class="row">
    <div class="col-12">
      <h1 class="event__title">Lorem Ipsum</h1>
    </div>
  </div>
</div>
  <!-- <div class="event">
    <h1 class="event__title">Lorem Ipsum</h1>
    <div class="event__countries">
      <figure class="flag flag--be"></figure>
      <figure class="flag flag--pl"></figure>
    </div>
    <p class="event__description">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque ut neque odio exercitationem voluptate sit praesentium possimus dignissimos et nemo quas, magnam reprehenderit ex quaerat amet minus aut ipsum obcaecati!
      Nemo explicabo amet eaque dignissimos! Autem aliquid possimus consequuntur nam reiciendis excepturi aperiam rerum ipsam, laudantium accusamus quisquam exercitationem vero corrupti ab eligendi assumenda rem at amet eos recusandae aliquam?
      Magni fugit iste, maxime quibusdam ab possimus ex aperiam provident ullam aliquam placeat exercitationem repudiandae eum eius assumenda, atque explicabo hic est laudantium corrupti voluptates? Quam modi blanditiis similique accusamus?
      Enim ad corrupti quae in deleniti distinctio at. Neque minima amet repellendus quam assumenda harum aut corrupti, fugiat blanditiis doloribus sint sit iusto quod natus esse, rem consectetur numquam vero!
      Ipsum illum enim quas natus asperiores, dolorum rem quos tenetur officia accusantium quidem blanditiis quis voluptate culpa neque dolorem veritatis sit maxime reprehenderit iusto autem commodi minima ut. Eaque, doloremque.
      Minima, possimus libero, doloribus beatae quo numquam, praesentium enim voluptatum nisi quos est et laborum hic voluptatibus animi quam amet necessitatibus id perferendis alias! Veritatis nihil numquam rem deleniti itaque?
      Recusandae, nihil exercitationem. Nisi, illum nulla. Placeat consectetur tempore molestiae est voluptatem laborum iste consequuntur deleniti adipisci perferendis natus fuga rem voluptate eveniet expedita asperiores cumque quisquam, totam ea quas.
      Laborum totam sequi consequuntur. Corporis commodi optio distinctio odio quaerat, delectus quod reprehenderit magnam ipsum dicta. Odit qui accusamus eius tempora neque modi molestiae quod enim officiis ullam, amet beatae.
      Dolores, eaque. Reiciendis voluptatibus vero hic, ipsam enim velit quaerat, impedit eaque, optio architecto ratione voluptate nisi aperiam! Nobis consequatur laborum beatae eaque rerum quas doloribus unde ullam a asperiores!
      Molestiae repellat, non quaerat, aliquid facilis unde at natus dicta voluptate voluptatum, odio quisquam rerum neque. Earum eveniet quis dolorum esse fugit unde voluptatem blanditiis, asperiores at hic porro ducimus!
    </p>
    <flickity class="carousel" :options="flickityOptions">
      <img
        src="https://www.history.com/.image/t_share/MTU4NzQ1NzIwMDk3MDg5MjQw/wwii-bombing-591978340.jpg"
        alt="orange tree"
      >
      <img
        src="https://timedotcom.files.wordpress.com/2014/10/141015-tank-warfare-wwii-30.jpg?quality=85"
        alt="submerged"
      >
      <img
        src="https://timedotcom.files.wordpress.com/2014/10/wwii-buna-beach-george-strock-01.jpg?quality=85"
        alt="look-out"
      >
    </flickity>
    <div class="close-btn"></div>
  </div> -->
</template>
<script>
export default {
  data() {
    return {
      flickityOptions: {
        fullsreen: true,
        pageDots: true,
      }
    };
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.event {
  margin: 5rem;
  .event__title {
    font-weight: 500;
    font-size: 4.5rem;
  }
  .event__description {
    font-weight: 300;
    margin-top: 1rem;
  }
  .event__countries {
    margin-top: 3rem;
  }
}
.carousel {
  padding-top: 3rem;
  position: absolute;
  left: 0;
  right: 0;
  img {
    display: block;
    height: 50vh;
    margin-right: 30px;
    opacity: 0.4;
    transition: opacity 0.3s;
  }
}
.is-selected {
  opacity: 1 !important;
}
.close-btn {
  position: absolute;
  right: 30px;
  top: 30px;
  height: 40px;
  width: 40px;
  background-color: #484A45;
}
</style>


