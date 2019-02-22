<template>
  <div class="event__detail">
    <div class="row no-gutters">
      <div class="col-7 p-5">
        <h1 class="event__title">Invasion of poland</h1>
        <div class="event__countries">
          <figure class="flag flag--be"></figure>
          <figure class="flag flag--pl"></figure>
        </div>
        <p class="event__date">29th september 2019</p>
        <!-- <router-link :to="{ path: 'home' }">Home</router-link> -->
        <p
          class="event__synopsis"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut eius reprehenderit ullam. Aut quia expedita a corrupti, harum, vitae odio, ducimus aliquam dignissimos sunt velit laudantium voluptate temporibus ullam obcaecati.Ex minima accusamus aliquid accusantium, pariatur, illo dicta, sunt architecto veritatis natus temporibus ipsum magnam vel sit! Molestias voluptatem, repudiandae dignissimos laudantium vel quae eveniet dolore assumenda iste corporis explicabo.</p>
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
      </div>
      <div class="col-5">
        <div class="event__img"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.event__detail {
  .event__countries {
    margin-top: 4rem;
  }
  .event__title {
    font-weight: 700;
    margin-top: 7rem;
    font-size: 4.5em;
  }
  .event__description {
    font-weight: 300;
    margin-top: 1rem;
  }
  .event__synopsis {
    font-weight: 400;
  }
  .event__synopsis, .event__description {
    font-size: 1.3em;
  }
  .event__img {
    max-width: 100%;
    // height: calc(100vh - 24px);
    height: 100vh;
    background: url('http://img.myconfinedspace.com/wp-content/uploads/2013/08/1375266494382.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .event__date {
    opacity: .6;
    font-weight: 400;
  }
}
</style>

