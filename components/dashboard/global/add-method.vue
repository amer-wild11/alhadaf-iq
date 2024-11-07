<template>
  <div class="add-method" v-if="globalStore.addMethod" ref="addMethod">
    <div class="close" @click="close">
      <Icon name="material-symbols:close-small" />
    </div>
    <label class="image" for="image-input">
      <div class="icon" v-if="images.length < 1">
        <Icon name="material-symbols:imagesmode-outline-sharp" />
      </div>
      <div class="count" v-if="images.length > 1">
        <span>+{{ images.length - 1 }}</span>
      </div>
      <div class="mainImage">
        <img ref="mainImage" src="" alt="" />
      </div>
      <input type="file" id="image-input" @input="handleFileChange" multiple />
    </label>
    <form @submit.prevent="handleSubmit">
      <h1>Add a new project</h1>

      <div class="group">
        <CustomInput
          placeholder="Project Name"
          type="text"
          translated-placeholder="أسم المشروع"
          :error="isError.name"
          @data-sent="handleName"
        />
        <CustomInput
          placeholder="Translated project Name"
          type="text"
          translated-placeholder="أسم المشروع"
          :error="isError.name"
          @data-sent="translatedName"
        />
      </div>
      <div class="group">
        <CustomInput
          placeholder="Project Location"
          type="text"
          translated-placeholder="أسم المشروع"
          :error="isError.location"
          @data-sent="handleLocation"
        />
        <CustomInput
          placeholder="Translated project Location"
          type="text"
          translated-placeholder="أسم المشروع"
          :error="isError.location"
          @data-sent="translatedLocation"
        />
      </div>
      <div class="group">
        <textarea
          placeholder="description"
          v-model="formData.description"
        ></textarea>
        <textarea
          placeholder="Translated description"
          v-model="formData.translated_description"
        ></textarea>
      </div>
      <button>
        <div class="submit">{{ buttonContent }}</div>
      </button>
    </form>
  </div>
</template>

<script setup>
import { useMyGlobalStore } from "~/stores/dashboard/global";

const globalStore = useMyGlobalStore();
const projectsStore = useMyProjectsStore();
const addMethod = ref("");
const buttonContent = ref("Done");

const mainImage = ref("");
const images = ref([]);
const imagesFiles = ref([]);

const isError = ref({
  name: false,
  location: false,
  description: false,
});

const formData = ref({
  name: "",
  translated_name: "",
  location: "",
  translated_location: "",
  description: "",
  translated_description: "",
});

const close = () => {
  globalStore.addMethod = false;
  images.value = [];
  imagesFiles.value = [];
  formData.value.name = "";
  formData.value.location = "";
  formData.value.description = "";
};

const handleName = (data) => {
  formData.value.name = data;
};
const translatedName = (data) => {
  formData.value.translated_name = data;
};

const handleLocation = (data) => {
  formData.value.location = data;
};
const translatedLocation = (data) => {
  formData.value.translated_location = data;
};

const handleFileChange = (event) => {
  const files = event.target.files;
  const file = files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      mainImage.value.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
  if (files) {
    imagesFiles.value = files;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        images.value.push(e.target.result);
      };

      reader.readAsDataURL(file);
    });
  }
};

const handleSubmit = async () => {
  // إعادة تعيين الأخطاء
  isError.value = {
    name: false,
    location: false,
    description: false,
  };

  // التحقق من القيم المدخلة
  if (formData.value.name == "") {
    isError.value.name = true;
  }
  if (formData.value.location == "") {
    isError.value.location = true;
  }
  if (formData.value.description == "") {
    isError.value.description = true;
  }

  if (
    formData.value.name !== "" &&
    formData.value.location !== "" &&
    formData.value.description !== "" &&
    imagesFiles.value.length > 0
  ) {
    buttonContent.value = "Sending...";
    const data = new FormData();

    data.append("name", formData.value.name);
    data.append("location", formData.value.location);
    data.append("desc", formData.value.description);
    data.append("translated_name", formData.value.translated_name);
    data.append("translated_location", formData.value.translated_location);
    data.append("translated_desc", formData.value.translated_description);

    Array.from(imagesFiles.value).forEach((file, index) => {
      data.append(`image[${index}]`, file);
    });

    // أضف جميع الملفات إلى FormData

    try {
      const response = await $fetch(
        "https://alhadaf-api.vercel.app/api/projects",
        {
          method: "POST",
          body: data,
        }
      );
      globalStore.addMethod = false;
      projectsStore.filteredProjects.push(response.project);
      buttonContent.value = "Done";
      formData.value.description = "";
      images.value = [];
      imagesFiles.value = [];
    } catch (error) {
      buttonContent.value = "Done";
      console.error("Error:", error);
    }
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
  width: 96%;
  max-width: 900px;
  @media (max-width: 767px) {
    flex-direction: column;
  }
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
    border: 1px solid lightgray;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    @media (max-width: 767px) {
      width: 100%;
    }
    .mainImage {
      display: inline-block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      color: black;
    }
    .count {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      color: white;
      width: 40px;
      height: 40px;
      background-color: rgba(0, 0, 0, 0.377);
      font-size: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      font-weight: 600;
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
    .group {
      display: flex;
      gap: 10px;
      .input {
        flex-grow: 1;
      }
      textarea {
        flex-grow: 1;
      }
    }
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
      user-select: none;
    }
  }
}
</style>
