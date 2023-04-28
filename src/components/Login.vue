<template>
  <div class="login-container">
    <v-card class="login-card">
      <v-card-title class="text-center">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field v-model="username" label="Username" />
          <v-text-field v-model="password" label="Password" type="password" />
          <v-card-actions class="justify-center">
            <v-btn type="submit" color="primary">Login</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const username = ref("");
    const password = ref("");

    const submit = async () => {
      const loggedIn = await store.dispatch("login", {
        username: username.value,
        password: password.value,
      });

      if (loggedIn) {
        router.push("/astudents");
      } else {
        alert("Invalid credentials");
      }
    };

    return {
      username,
      password,
      submit,
    };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  width: 350px;
  padding: 20px;
}
</style>
