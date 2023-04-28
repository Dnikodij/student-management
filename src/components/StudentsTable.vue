<template>
  <div class="students-table-container">
    <v-card>
      <v-card-title>
        <div class="float-left">
          Students
        </div>
        <v-spacer></v-spacer>
        <div class="float-right">

          <v-btn icon color="primary" class="mr-5" @click="refreshTable">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>

          <student-form v-if="canAdd" ref="studentFormCreate" actionLabel="New Student" formTitle="New Student"
                        @refresh="showSnackbar"></student-form>
        </div>

      </v-card-title>
      <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="mt-5"
      >
        <template #append-inner>

          <v-tooltip top text="Filter students by current year of study">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" icon @click="showFilterDialog = true">mdi-filter</v-icon>
            </template>
          </v-tooltip>
        </template>
      </v-text-field>
      <v-data-table
          :headers="headers"
          :items="filteredStudents.length ? filteredStudents : students"
          :items-per-page="10"
          :search="search"
          density="compact"
          class="elevation-1"
      >
        <template #item.actions="{ item }">
          <v-icon v-if="canEditStudent(item)" small color="info" dark @click="openEditDialog(item.raw)">mdi-pencil
          </v-icon>
          <v-icon v-if="canDelete" color="error" small @click="deleteStudent(item.raw.id)" @refresh="fetchStudents">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
  <student-edit-form ref="studentEditForm" actionLabel="mdi-pencil" formTitle="Edit Student" :student="selectedStudent"
                     @refresh="showSnackbar"></student-edit-form>
  <v-snackbar v-model="snackbar" timeout="2000" location="top" :color="snackbarColor"> {{ snackbarText }}
    <template v-slot:actions>
      <v-btn variant="text" @click="snackbar = false">Close</v-btn>
    </template>
  </v-snackbar>

  <v-dialog v-model="showFilterDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Filter by Current Year Of Study</span>
      </v-card-title>
      <v-card-text>
        <v-select
            v-model="selectedYear"
            :items="availableYears"
            label="Select year"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="showFilterDialog = false">Cancel</v-btn>
        <v-btn color="primary" @click="filterByYear">Filter</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import {mapState, mapActions, useStore, mapGetters, mapMutations} from "vuex";
import StudentForm from './StudentForm.vue';
import {VDataTable} from "vuetify/labs/components";
import {ref} from "vue";
import StudentEditForm from "./StudentEditForm";

export default {
  components: {
    VDataTable,
    StudentForm,
    StudentEditForm
  },
  props: {
    canAdd: {
      type: Boolean,
      default: false,
    },
    canEdit: {
      type: Boolean,
      default: false,
    },
    canDelete: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['students']),
  },
  data() {
    return {
      snackbar: false,
      snackbarColor: 'success',
      snackbarText: `Hello, I'm a snackbar`,
      showEditDialog: false,
      selectedStudent: {},
      dataTable: null,
      search: '',
      showFilterDialog: false,
      selectedYear: null,
      filteredStudents: [],
      availableYears: [1, 2, 3],
      headers: [
        {title: 'First Name', key: 'FirstName', width: '10%'},
        {title: 'Last Name', key: 'LastName', width: '10%'},
        {title: 'Email', key: 'Email'},
        {title: 'Address', key: 'Adress'},
        {title: 'Postal Code', key: 'PostalCode', width: '13%'},
        {title: 'Current Year Of Study', key: 'CurrentYearOfStudy'},
        {title: 'Index Number', key: 'IndexNumber'},
        {title: 'Index Year', key: 'IndexYear'},
        {title: 'Actions', key: 'actions', sortable: false},
      ],
    };
  },
  setup(props, {emit}) {
    const store = useStore();
    const showCreateDialog = ref(false);
    const deleteStudent = (id) => {
      store.dispatch('removeStudent', id).then(() => {
        emit('refresh');
      });
    };

    const canEditStudent = (student) => {
      const currentUser = store.state.auth.user;
      return (
          currentUser &&
          (currentUser.role === "administrator" ||
              (currentUser.role === "student" && student.raw.username === currentUser.username))
      );
    };
    // This method can be used to fetch the students data from an API or refresh it.
    const fetchStudents = () => {
      store.dispatch('fetchStudents');
    };
    // ...
    return {
      // ...
      deleteStudent,
      fetchStudents,
      canEditStudent,
      showCreateDialog,
    };
  },
  methods: {
    ...mapActions(['removeStudent']),
    openEditDialog(student) {
      this.selectedStudent = student;
      this.$refs.studentEditForm.openDialog();
    },
    deleteStudent(id) {
      if (confirm('Are you sure you want to delete this student?')) {
        this.showSnackbar({text: 'Student deleted successfully', color: 'success'});
        this.removeStudent(id);
      }
    },
    showSnackbar(snackbar) {
      this.snackbar = true;
      this.snackbarText = snackbar.text;
      this.snackbarColor = snackbar.color;
    },
    filterByYear() {
      this.showFilterDialog = false;
      this.search = '';
      if (this.selectedYear) {
        const selectedYearNumber = Number(this.selectedYear);
        this.filteredStudents = this.students.filter(
            (student) => student.CurrentYearOfStudy === selectedYearNumber
        );
      } else {
        this.filteredStudents = [];
      }
    },
    refreshTable() {
      this.filteredStudents = [];
    },
  },
};
</script>
<style scoped>
.students-table-container {
  padding: 30px;
}

.students-table-card {
  padding: 20px;
}
</style>