<template>
  <div id="app">
    <v-app>
    <div v-if="!isLoggedIn">
      <router-view></router-view>
    </div>
    <div v-else>
      <v-app-bar app :floating="true">
        <v-toolbar-title class="app-title">Student Management</v-toolbar-title>
        <v-spacer></v-spacer>
        <span>{{ loggedUser }}</span>
        <v-btn v-if="isLoggedIn" color="secondary" @click="logout">Logout</v-btn>
      </v-app-bar>
      <div class="mt-15">
        <students-table :canEdit="isAdmin" :canDelete="isAdmin" :canAdd="isAdmin"></students-table>
      </div>
    </div>
    </v-app>
  </div>
</template>

<script>
import {mapGetters, useStore} from "vuex";
import StudentsTable from './components/StudentsTable.vue';
import router from "@/router";
import {VAppBar} from "vuetify/components";

export default {
  components: {
    StudentsTable,
    VAppBar,
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'hasRole', 'loggedInUser']),
    isAdmin() {
      return this.hasRole("administrator");
    },
    loggedUser(){
      return this.loggedInUser.username;
    }
  },
  setup() {
    const store = useStore();

    const logout = () => {
      store.dispatch("logout");
      router.push("/");
    };

    return {
      logout,
    };
  },
};
</script>
