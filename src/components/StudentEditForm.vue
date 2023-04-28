<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>{{ formTitle }}</v-card-title>
      <v-card-text>
        <v-alert type="info" class="mb-5" density="compact">Fields marked with * are required</v-alert>
        <v-form ref="form" v-model="valid" lazy-validation>
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
          <v-text-field v-model="internalEditedStudent.PostalCode" label="Postal Code" type="string"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close">Cancel</v-btn>
        <v-btn type="submit" :disabled="!valid" color="blue darken-1" text @click="submit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {ref, watchEffect} from 'vue';
import {useStore} from 'vuex';
import {
  currentYearOfStudyRules,
  firstNameRules,
  indexNumberRules,
  indexYearRules,
  lastNameRules
} from "@/validationConstants";

export default {
  props: {
    student: {
      type: Object,
      default: null,
    },
    actionLabel: {
      type: String,
      default: 'Edit',
    },
    formTitle: {
      type: String,
      default: 'Edit Student',
    },
  },
  setup(props, {emit}) {
    const store = useStore();
    const dialog = ref(false);
    const valid = ref(false);
    const form = ref(null);
    const internalEditedStudent = ref({
      FirstName: '',
      LastName: '',
      Email: '',
      Adress: '',
      PostalCode: '',
      CurrentYearOfStudy: 0,
      IndexNumber: 0,
      IndexYear: 0,
      username: '',
    });

    const openDialog = () => {
      dialog.value = true;
    };

    watchEffect(() => {
      if (form.value) {
        valid.value = form.value.validate();
      }
    });

    watchEffect(() => {
      if (props.student) {
        internalEditedStudent.value.id = props.student.id;
        internalEditedStudent.value.FirstName = props.student.FirstName;
        internalEditedStudent.value.LastName = props.student.LastName;
        internalEditedStudent.value.Email = props.student.Email;
        internalEditedStudent.value.Adress = props.student.Adress;
        internalEditedStudent.value.PostalCode = props.student.PostalCode;
        internalEditedStudent.value.CurrentYearOfStudy = props.student.CurrentYearOfStudy;
        internalEditedStudent.value.IndexNumber = +props.student.IndexNumber;
        internalEditedStudent.value.IndexYear = props.student.IndexYear;
        internalEditedStudent.value.username = props.student.username;
      }
    });

    const submit = () => {
      if (valid) {
        store.dispatch('editStudent', {...internalEditedStudent.value, id: props.student.id});
        emit('refresh', {text: 'Student updated successfully', color: 'success'});
        close();
      }
    };

    const close = () => {
      dialog.value = false;
      emit('close', null);
    };

    return {
      dialog,
      internalEditedStudent,
      submit,
      valid,
      form,
      firstNameRules,
      lastNameRules,
      indexNumberRules,
      indexYearRules,
      currentYearOfStudyRules,
      openDialog,
      close,
    };
  },
};
</script>

