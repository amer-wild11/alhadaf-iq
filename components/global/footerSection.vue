<template>
  <footer>
    <div class="container">
      <div class="logo-slogan">
        <div class="logo">
          <img src="/logo-black.png" alt="" />
        </div>
        <p class="slogan en-text" v-if="!globalStore.translate">
          Building Your Dreams in Real Estate
        </p>
        <p class="slogan ar-text" v-else>بناء أحلامك في مجال العقارات</p>
      </div>
      <ul class="navigation">
        <span class="title en-text" v-if="!globalStore.translate"
          >Quick Navigation</span
        >
        <span class="title ar-text" v-else>تنقل سريع</span>
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
      </ul>
      <div class="contact-info">
        <div class="title">
          <span class="en-text" v-if="!globalStore.translate">
            We are here to change <br />
            your future.
          </span>
          <span class="ar-text" v-else>
            نحن هنا . <br />
            لتغيير مستقبلك
          </span>
        </div>
        <div class="button" @click="openContactMenu">
          <div class="icon">
            <img src="/main/icons/phone.png" alt="" />
          </div>
          <span class="en-text" v-if="!globalStore.translate"
            >Contact Us Now</span
          >
          <span class="ar-text" v-else>تواصل معنا الأن</span>
        </div>
        <div class="email-web">
          <span class="email">info@alhadaf.com.iq</span>
          <span class="web">alhadaf.com.iq</span>
        </div>
      </div>
      <div class="subscribtion">
        <h1 class="en-text" v-if="!globalStore.translate">
          Subscribe to our news
        </h1>
        <h1 class="ar-text" v-else>أشترك لأخبارنا الجديدة</h1>
        <p class="en-text" v-if="!globalStore.translate">
          Stay informed and Never Miss a beat: Subscribe to Our Exclusive News
          Updates!
        </p>
        <p v-else>
          ابق على اطلاع ولا تفوت أي شيء: اشترك في تحديثاتنا الإخبارية الحصرية!
        </p>
        <div class="input" v-if="!globalStore.translate">
          <input type="text" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
        <div class="input" v-else>
          <input type="text" placeholder="أدخل بريدك الألكتروني" />
          <button>اشترك</button>
        </div>
      </div>
      <div class="location">
        <div class="image">
          <iframe
            width="100%"
            height="100%"
            src="https://api.maptiler.com/maps/basic-v2/?key=WRNIEfjw6BryVMWHT3m8#10.0/33.3152/44.3661"
          >
          </iframe>
        </div>
        <pre class="location en-text" v-if="!globalStore.translate">
Iraq, Baghdad
Turkey, Istanbul
</pre
        >
        <pre class="location ar-text" v-else>
العراق، بغداد
تركيا، اسطنبول
</pre
        >
      </div>
    </div>
  </footer>
</template>

<script setup>
const globalStore = useMyGlobalStore();
const openContactMenu = () => {
  globalStore.contactMenu = true;
};
</script>

<style scoped lang="scss">
footer {
  padding: 61px 46px 60px 20px;
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 10%;
  }
  .logo-slogan {
    display: flex;
    flex-direction: column;
    gap: 35px;
    .slogan {
      font-size: 15px;
      font-weight: 300;
      color: rgba(0, 0, 0, 0.795);
    }
  }
  .navigation {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .title {
      font-size: 21px;
    }
    li {
      font-weight: 700;
    }
  }
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 23px;
    .title {
      font-size: 20px;
      font-weight: 300;
    }
    .button {
      display: flex;
      align-items: center;
      gap: 10px;
      background-color: $main-color;
      border-radius: 30px;
      color: white;
      padding: 5px;
      width: fit-content;
      cursor: pointer;
      .icon {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      span {
        font-size: 15px;
        padding: 5px;
      }
    }
    .email-web {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
  .subscribtion {
    h1 {
      font-size: 30px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    p {
      font-size: 17px;
      color: #00000080;
      margin-bottom: 30px;
    }
    .input {
      input {
        width: 100%;
        padding: 5px 10px;
        border: none;
        border-bottom: 2px solid #00000080;
        background: none;
        margin-bottom: 20px;
      }
      button {
        background-color: $main-color;
        padding: 10px 20px;
        border-radius: 50px;
        color: white;
      }
    }
  }
}
</style>
