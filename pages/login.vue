<template>
  <div class="login-form">
    <form @submit.prevent="handleLogin">
      <div class="title">
        <h1>Login</h1>
      </div>
      <div class="inputs">
        <div class="input-container">
          <div class="label">
            <label for="emailInput">Email</label>
          </div>
          <div class="input">
            <input type="email" v-model="email" required id="emailInput" />
          </div>
        </div>
        <div class="input-container">
          <div class="label">
            <label for="passwordInput">Password</label>
          </div>
          <div class="input">
            <input
              :type="showPass ? 'text' : 'password'"
              required
              id="passwordInput"
              v-model="password"
            />
            <div class="icon" @click="showPass = !showPass">
              <label for="passwordInput">
                <Icon
                  name="material-symbols:visibility-outline"
                  v-if="!showPass"
                />
                <Icon name="material-symbols:visibility-off-outline" v-else />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="submit">
        <button>{{ buttonContent }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
const showPass = ref(false);
const email = ref("");
const password = ref("");
const buttonContent = ref("login");
const globalStore = useMyGlobalStore();

const handleLogin = async () => {
  try {
    buttonContent.value = "login...";
    const body = {
      email: email.value,
      password: password.value,
    };

    const response = await $fetch(
      "https://alhadaf-api.vercel.app/api/auth/login",
      {
        method: "POST",
        body,
      }
    );

    if (response.user) {
      buttonContent.value = "loged in";
      // تعيين الكوكي باسم "login" وقيمة "true"
      const loginCookie = useCookie("login");
      loginCookie.value = "true";
      navigateTo("/dashboard");
    }
  } catch (error) {
    buttonContent.value = "login";
    const errorInfo = {
      title: "Error",
      desc: "Email or password is incorrect!",
    };
    globalStore.callError(errorInfo);
    console.log("Login error:", error);
  }
};
</script>

<style scoped lang="scss">
.login-form {
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    width: 90%;
    max-width: 400px;
    background-color: #ffffff;
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #dfdfdf;
    .title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
      text-align: center;
    }
    .inputs {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 30px;
      .input-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 5px;
        font-weight: 500;
        .input {
          position: relative;
          .icon {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            label {
              width: 30px;
              height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              transition: 0.2s;
              cursor: pointer;
              &:hover {
                background-color: rgb(228, 227, 227);
              }
              .iconify {
                font-size: 20px;
              }
            }
          }
          input {
            padding: 5px 10px;
            border-radius: 5px;
            background: none;
            width: 100%;
          }
        }
      }
    }
    .submit {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0;
      button {
        padding: 5px 20px;
        background-color: $main-color;
        border-radius: 4px;
        color: white;
        width: 200px;
      }
    }
  }
}
</style>
