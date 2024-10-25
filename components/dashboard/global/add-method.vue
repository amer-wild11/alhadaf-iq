<template>
  <div class="add-method" v-if="globalStore.addMethod" ref="addMethod">
    <div class="close" @click="globalStore.addMethod = false">
      <Icon name="material-symbols:close-small" />
    </div>
    <label class="image" for="image-input">
      <div class="images">
        <img :src="imageSrc" alt="" />
        <img :src="imageSrc" alt="" />
        <img :src="imageSrc" alt="" />
        <img :src="imageSrc" alt="" />
        <img :src="imageSrc" alt="" />
        <img :src="imageSrc" alt="" />
      </div>
      <div class="icon">
        <Icon name="material-symbols:imagesmode-outline" />
      </div>
      <input type="file" id="image-input" @input="handleFileChange" />
    </label>
    <form>
      <h1>Add a new project</h1>
      <CustomInput
        placeholder="Project Name"
        type="text"
        translated-placeholder="أسم المشروع"
      />
      <CustomInput
        placeholder="Project Location"
        type="text"
        translated-placeholder="أسم المشروع"
      />
      <textarea placeholder="description"></textarea>
      <div class="submit">
        <span>Done</span>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useMyGlobalStore } from "~/stores/dashboard/global";

const globalStore = useMyGlobalStore();
const addMethod = ref("");

const imageSrc = ref(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      imageSrc.value = e.target.result;
    };

    reader.readAsDataURL(file);
  }
};
</script>

<style scoped lang="scss">
.add-method {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 25px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid lightgray;
  display: flex;
  gap: 10px;
  z-index: 99;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 767px;
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
  .image {
    width: 400px;
    height: 300px;
    background-color: lightgray;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    .images {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      img {
        object-fit: cover;
        width: 60px;
        height: 60px
      }
    }
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      color: white;
    }
    input {
      display: none;
      appearance: none;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    textarea {
      border: 1px solid lightgray;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 13px;
      font-weight: 300;
      max-height: 200px;
      min-height: 100px;
      resize: vertical;
      &::placeholder {
        font-size: 13px;
        font-weight: 300;
        text-transform: capitalize;
      }
    }
    h1 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .submit {
      padding: 5px 10px;
      background-color: $main-color;
      border-radius: 5px;
      text-align: center;
      font-size: 14px;
      color: white;
      cursor: pointer;
    }
  }
}
</style>
