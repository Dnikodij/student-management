<!-- src/components/StudentForm.vue -->
<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template #activator="{ on }">
      <v-btn color="primary" dark v-on="on" @click="openDialog">
        {{ actionLabel }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-alert type="info" class="mb-5" density="compact">Fields marked with * are required</v-alert>
        <v-form v-model="valid">
          <v-text-field v-model="internalEditedStudent.FirstName" label="First Name*" type="text"
                        required :rules="firstNameRules"></v-text-field>
          <v-text-field v-model="internalEditedStudent.LastName" label="Last Name*" type="text" required :rules="lastNameRules"></v-text-field>
          <v-text-field v-model="internalEditedStudent.Email" label="Email" type="text"></v-text-field>
          <v-text-field v-model="internalEditedStudent.Adress" label="Adress" type="text"></v-text-field>
          <v-text-field v-model="internalEditedStudent.CurrentYearOfStudy" label="Current Year of Study*" type="number"
                        required :rules="currentYearOfStudyRules"></v-text-field>
          <v-text-field v-model="internalEditedStudent.IndexNumber" label="Index Number*" type="number"
                        required :rules="indexNumberRules"></v-text-field>
          <v-text-field v-model="internalEditedStudent.IndexYear" label="Index Year*" type="number"
                        required :rules="indexYearRules"></v-text-field>
          <v-text-field v-model="internalEditedStudent.PostalCode" label="Postal Code" type="number"></v-text-field>
        </v-form>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn type="submit" :disabled="!valid" color="blue darken-1" text @click="save">Save</v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {ref, watchEffect} from 'vue';
import {useStore} from 'vuex';
import { firstNameRules } from "@/validationConstants";
import { lastNameRules } from "@/validationConstants";
import { indexNumberRules } from "@/validationConstants";
import { indexYearRules } from "@/validationConstants";
import { currentYearOfStudyRules } from "@/validationConstants";

export default {
  props: {
    actionLabel: {
      type: String,
      default: 'New Student',
    },
    formTitle: {
      type: String,
      default: 'New Student',
    },
  },
  setup(props, {emit}) {
    const store = useStore();
    const dialog = ref(false);
    const valid = ref(false);
    const internalEditedStudent = ref({
      FirstName: '',
      LastName: '',
      Email: '',
      Adress: '',
      PostalCode: '',
      CurrentYearOfStudy: '',
      IndexNumber: '',
      IndexYear: '',
      username: '',
    });

    const form = ref(null);
    const openDialog = () => {
      internalEditedStudent.value = {
        FirstName: '',
        LastName: '',
        Email: '',
        Adress: '',
        PostalCode: '',
        CurrentYearOfStudy: '',
        IndexNumber: '',
        IndexYear: '',
        username: '',
      };
      dialog.value = true;
    };

    watchEffect(() => {
      valid.value = form.value && form.value.validate();
    });


    const close = () => {
      dialog.value = false;
    };

    const save = () => {
      if (valid) {
        store.dispatch('createStudent', internalEditedStudent.value);
        emit('refresh', {text:'Student created successfully', color: 'success'});
        close();
      }
    };

    return {
      dialog,
      internalEditedStudent,
      close,
      valid,
      form,
      save,
      firstNameRules,
      lastNameRules,
      indexNumberRules,
      indexYearRules,
      currentYearOfStudyRules,
      openDialog,
    };
  },
};
</script>
