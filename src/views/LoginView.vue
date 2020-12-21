<template>
  <div class="login-page">
    <div class="login-video">
      <video class="login-video-content" autoplay muted loop>
        <source src="../assets/login-video.mp4" type="video/mp4" />
        Your browser is not supported!
      </video>
    </div>
    <div class="login-form">
      <img
        class="login-form-logo"
        src="../assets/logo-revaluta.png"
        alt="logo"
      />

      <b-form class="mt-5">
        <b-form-group id="input-group-1">
          <b-form-input
            id="input-1"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" class="mt-3">
          <b-form-input
            id="input-2"
            type="password"
            placeholder="Enter password"
            required
          ></b-form-input>
        </b-form-group>

        <button class="submit-button" @click="login()">Login</button>
      </b-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class LoginView extends Vue {
  private login() {
    this.$router.push('survey');
  }
}
</script>

<style lang="scss">
@import "../assets/style/main.scss";

.login-page {
  height: 100vh;
  width: 100%;
  background-image: linear-gradient(rgba($black, 0.4), rgba($black, 0.4));
  background-size: cover;
}

.login-video {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  opacity: 0.5;
  overflow: hidden;

  &-content {
    height: 100%;
    width: 100%;
    -o-object-fit: cover;
    object-fit: cover;
  }
}

.login-form {
  display: inline-block;
  width: 450px;
  height: 500px;
  position: absolute;
  background-color: transparent;
  padding: 2rem;
  opacity: 0.9;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  box-shadow: -1px 4px 28px 0px rgba(0, 0, 0, 0.75);
  text-align: center;

  &-logo {
    height: 100px;
  }
}

.submit-button {
  padding: 2rem;
  background-color: #007cc0;
  border: none;
  border-radius: 0;
  color: white;
  letter-spacing: 0.3em;
  width: 100%;
  margin-top: 2rem;
  font-size: 1.1rem;
}
</style>