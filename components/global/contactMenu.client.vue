<template>
  <div class="contactMenu" ref="contactMenu">
    <div class="close" @click="close">
      <span class="span1"></span>
      <span class="span2"></span>
    </div>
    <div class="map">
      <CustomMap />
    </div>
    <form @submit.prevent="postCustomer">
      <div class="title">
        <h1 class="en-text" v-if="!globalStore.translate">Have a question?</h1>
        <h1 class="ar-text" v-else>ألديك سؤال؟</h1>
        <p class="en-text" v-if="!globalStore.translate">
          No problem! Our team will contact you on your email or phone number
        </p>
        <p class="ar-text" v-else>
          لا مشكلة! سيتواصل فريقنا معك على بريدك الإلكتروني أو رقم هاتفك
        </p>
      </div>
      <CustomInput
        placeholder="Your Name"
        translated-placeholder="الأسم"
        type="text"
        :required="true"
        @data-sent="handleName"
      />
      <CustomInput
        placeholder="Your Email"
        translated-placeholder="البريد الألكتروني"
        type="email"
        :required="true"
        @data-sent="handleEmail"
      />
      <CustomInput
        placeholder="Your phone number"
        translated-placeholder="رقم الهاتف"
        type="number"
        :required="true"
        @data-sent="handlePhone"
      />
      <textarea
        name="message"
        placeholder="Your Message"
        v-model="message"
        required
      ></textarea>
      <button>
        <div class="submit">
          <span class="en-text" v-if="!globalStore.translate">{{
            buttonContent
          }}</span>
          <span class="ar-text" v-else>{{ buttonContentAr }}</span>
        </div>
      </button>
    </form>
  </div>
</template>

<script setup>
const globalStore = useMyGlobalStore();
const contactMenu = ref("");
const name = ref("");
const email = ref("");
const phone = ref("");
const message = ref("");
const buttonContent = ref("Send");
const buttonContentAr = ref("أرسال");

const close = () => {
  globalStore.contactMenu = false;
};

watch(
  () => globalStore.contactMenu,
  (newVal) => {
    if (newVal == true) {
      if (contactMenu.value) {
        useGsap.to(contactMenu.value, {
          bottom: 0,
          scale: 1,
          duration: 0.5,
        });
      }
    } else if (newVal == false) {
      if (contactMenu.value) {
        useGsap.to(contactMenu.value, {
          bottom: "-100px",
          scale: 0,
          duration: 0.5,
        });
      }
    }
  }
);

const handleName = (data) => {
  name.value = data;
};
const handleEmail = (data) => {
  email.value = data;
};
const handlePhone = (data) => {
  phone.value = data;
};

const postCustomer = async () => {
  const body = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    message: message.value,
  };
  try {
    buttonContent.value = "Sending...";
    buttonContentAr.value = "يتم الأرسال...";

    const response = await $fetch("/api/customers", {
      method: "post",
      body,
    });

    buttonContent.value = "Done";
    buttonContentAr.value = "تم الأرسال";

    globalStore.contactMenu = false;
    name.value = "";
    email.value = "";
    phone.value = "";
    message.value = "";
  } catch (err) {
    buttonContentAr.value = "أرسال";
    buttonContent.value = "Send";
    console.error("Error: ", err);
  }
};

onMounted(() => {
  document.addEventListener("click", (e) => {
    let contactMenuButtons = document.querySelectorAll(".contactMenuButton");
    let canOpen = ref(true);
    if (contactMenuButtons) {
      contactMenuButtons.forEach((button) => {
        if (button.contains(e.target)) {
          return (canOpen.value = false);
        }
      });
    }
    if (
      contactMenu.value &&
      !contactMenu.value.contains(e.target) &&
      canOpen.value
    ) {
      globalStore.contactMenu = false;
    }
  });
});
</script>

<style scoped lang="scss">
.contactMenu {
  width: 100%;
  height: 70dvh;
  position: fixed;
  bottom: -100dvh;
  left: 0;
  background-color: white;
  z-index: 8;
  padding: 35px;
  display: flex;
  gap: 3%;
  scale: 0;
  @media (max-width: 767px) {
    flex-direction: column-reverse;
    bottom: unset;
    top: 0;
    height: 100dvh;
  }
  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    span {
      position: absolute;
      width: 90%;
      height: 2px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: $main-color;
    }
    .span1 {
      transition: 1s;
      transform: translate(-50%, -50%) rotate(45deg);
      transform-origin: center;
    }
    .span2 {
      transition: 1s;
      transform: translate(-50%, -50%) rotate(-45deg);
      transform-origin: center;
    }
  }
  .map {
    height: 100%;
    background-color: rgb(214, 212, 212);
    border-radius: 10px;
    flex-grow: 0.8;
    overflow: hidden;
    width: 80%;
    position: relative;
    @media (max-width: 767px) {
      width: 100%;
    }
  }
  .submit {
    padding: 5px 10px;
    background-color: $main-color;
    color: white;
    text-transform: capitalize;
    border-radius: 5px;
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
    user-select: none;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .title {
      text-align: center;
      margin-bottom: 10px;
      h1 {
        font-size: 30px;
        color: $main-color;
        font-weight: 500;
        @media (max-width: 767px) {
          font-size: 25px;
        }
      }
      p {
        font-size: 15px;
        font-weight: 400;
      }
    }
    textarea {
      width: 100%;
      height: 100px;
      border: 1px solid lightgray;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 13px;
      font-weight: 300;
      resize: none;
      &::placeholder {
        font-size: 13px;
        font-weight: 300;
      }
    }
  }
}
</style>
