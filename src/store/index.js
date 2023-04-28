// src/store/index.js
import {createStore} from 'vuex';
import auth from "@/store/auth";

const store = createStore({
    state: {
        students: [
            {
                id: 1,
                IndexNumber: 2118,
                IndexYear: 2022,
                FirstName: "John",
                LastName: "Doe",
                Email: "john.doe@example.com",
                Adress: "123 Main St",
                PostalCode: "12345",
                CurrentYearOfStudy: 2,
                username: "jdoe"
            },
            {
                id: 2,
                IndexNumber: 2117,
                IndexYear: 2021,
                FirstName: "Jane",
                LastName: "Doe",
                Email: "jane.doe@example.com",
                Adress: "456 Elm St",
                PostalCode: "23456",
                CurrentYearOfStudy: 3,
                username: "jane_doe"
            },
            {
                id: 3,
                IndexNumber: 2116,
                IndexYear: 2023,
                FirstName: "Bob",
                LastName: "Smith",
                Email: "bob.smith@example.com",
                Adress: "789 Oak St",
                PostalCode: "34567",
                CurrentYearOfStudy: 1,
                username: "bsmith"
            },
            {
                id: 4,
                IndexNumber: 2115,
                IndexYear: 2023,
                FirstName: "Alice",
                LastName: "Johnson",
                Email: "alice.johnson@example.com",
                Adress: "1011 Pine St",
                PostalCode: "45678",
                CurrentYearOfStudy: 1,
                username: "ajohnson"
            },
            {
                id: 5,
                IndexNumber: 2114,
                IndexYear: 2022,
                FirstName: "David",
                LastName: "Lee",
                Email: "david.lee@example.com",
                Adress: "1213 Maple St",
                PostalCode: "56789",
                CurrentYearOfStudy: 2,
                username: "dlee"
            },
            {
                id: 6,
                IndexNumber: 2113,
                IndexYear: 2022,
                FirstName: "Emily",
                LastName: "Wang",
                Email: "emily.wang@example.com",
                Adress: "1415 Oak St",
                PostalCode: "67890",
                CurrentYearOfStudy: 3,
                username: "ewang"
            },
            {
                id: 7,
                IndexNumber: 2112,
                IndexYear: 2022,
                FirstName: "Michael",
                LastName: "Garcia",
                Email: "michael.garcia@example.com",
                Adress: "1617 Main St",
                PostalCode: "78901",
                CurrentYearOfStudy: 2,
                username: "mgarcia"
            },
            {
                id: 8,
                IndexNumber: 2111,
                IndexYear: 2021,
                FirstName: "Mia",
                LastName: "Hernandez",
                Email: "mia.hernandez@example.com",
                Adress: "1819 Elm St",
                PostalCode: "89012",
                CurrentYearOfStudy: 3,
                username: "mhernandez"
            },
            {
                id: 9,
                IndexNumber: 2100,
                IndexYear: 2023,
                FirstName: "Ethan",
                LastName: "Nguyen",
                Email: "ethan.nguyen@example.com",
                Adress: "2021 Pine St",
                PostalCode: "90123",
                CurrentYearOfStudy: 1,
                username: "enguyen"
            },
        ],
        nextId: 10,
    },
    mutations: {
        addStudent(state, student) {
            student.id = state.nextId++;
            state.students.push(student);
        },
        UPDATE_STUDENT(state, editedStudent) {
            const index = state.students.findIndex((student) => student.id === editedStudent.id);
            if (index !== -1) {
                state.students.splice(index, 1, editedStudent);
            }
        },
        deleteStudent(state, studentId) {
            state.students = state.students.filter(student => student.id !== studentId);
        },
    },
    actions: {
        createStudent({commit}, student) {
            commit('addStudent', student);
        },
        editStudent({commit}, student) {
            commit('UPDATE_STUDENT', student);
        },
        removeStudent({commit}, studentId) {
            commit('deleteStudent', studentId);
        },
    },
    modules: {auth},
    getters: {
        hasRole: (state) => (role) => {
            return state.auth.user && state.auth.user.role === role;
        },
        students: (state) => state.students,
    }
});

export default store;
