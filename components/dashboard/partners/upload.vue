<template>
  <div class="add-partner" v-if="partnersStore.upload">
    <div class="close" @click="close">
      <Icon name="material-symbols:close-small" />
    </div>
    <form @submit.prevent="postPartner">
      <div class="image-name">
        <label for="imageInput">
          <div class="icon" v-if="!logo">
            <Icon name="material-symbols:imagesmode-outline-sharp" />
          </div>
          <div class="current" v-if="logo">
            <img :src="image" alt="Partner Logo" />
          </div>
          <input type="file" @change="logoChanged" required id="imageInput" />
        </label>
        <div class="name">
          <h1>Make a new partner</h1>
          <input
            type="text"
            placeholder="Partner name"
            v-model="name"
            required
          />
        </div>
      </div>
      <button class="submit">
        <div>{{ buttonContent }}</div>
      </button>
    </form>
  </div>
</template>

<script setup>
const image = ref("");
const logo = ref(null);
const name = ref("");
const partnersStore = useMyPartnersStore();
const buttonContent = ref("Send");

const logoChanged = (e) => {
  const file = e.target.files[0];
  if (file) {
    logo.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      image.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const close = () => {
  partnersStore.upload = false;
  name.value = "";
  image.value.src = "";
};

const postPartner = async () => {
  if (name.value != "" && logo.value) {
    const body = new FormData();
    body.append("name", name.value);
    body.append("logo", logo.value);

    try {
      buttonContent.value = "Sending...";
      const response = await $fetch(
        "https://alhadaf-api.vercel.app/api/partners",
        {
          method: "post",
          body,
        }
      );
      if (response) {
        buttonContent.value = "Send";
        partnersStore.upload = false;
        partnersStore.filteredPartners.push(response.partner);
        name.value = "";
        image.value.src = "";
      }
    } catch (err) {
      buttonContent.value = "Send";
      console.error("Error: ", error);
    }
  }
};
</script>

<style scoped lang="scss">
.add-partner {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90%;
  max-height: 400px;
  max-width: 500px;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  border: 1px solid black;
  padding: 20px;
  .close {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 24px;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid lightgray;
    cursor: pointer;
  }
  .image-name {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    label {
      background-color: rgb(231, 231, 231);
      border-radius: 10px;
      cursor: pointer;
      position: relative;
      padding: 10px;
      min-width: 200px;
      .icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 20px;
      }
      input {
        display: none;
        appearance: none;
      }
    }
    .name {
      h1 {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 10px;
      }
    }
  }
  .submit {
    background-color: $main-color;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 5px;
    color: white;
    font-weight: 500;
    user-select: none;
    cursor: pointer;
  }
}
</style>
