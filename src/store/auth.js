// src/store/auth.js
import store from "@/store/index";

export default {
    state: {
        loggedIn: false,
        user: null
    },
    mutations: {
        SET_LOGGED_IN(state, loggedIn) {
            state.loggedIn = loggedIn;
        },
        setUser(state, user) {
            state.user = user;
        },
    },
    actions: {
        login({commit, getters}, {username, password}) {
            const user = getters.students.find(student => student.username === username);
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                // Assuming the password is hardcoded as 'password' for now
                if (password === "password") {
                    commit("setUser", {
                        id: user.id,
                        username: user.username,
                        role: "student",
                    });
                    commit("SET_LOGGED_IN", true);
                    return true;
                } else {
                    alert("Invalid Credentials");
                    throw new Error("Invalid Credentials");
                }
            } else if (username === "admin" && password === "admin") {
                commit("setUser", {
                    id: 0,
                    username: username,
                    role: "administrator",
                });
                localStorage.setItem("user", JSON.stringify({id: 0, username: username, role: "administrator"}));
                commit("SET_LOGGED_IN", true);
                return true;
            } else {
                alert("Invalid Credentials");
                throw new Error("Invalid Credentials");
            }
        },
        logout({commit}) {
            localStorage.removeItem("user");
            commit("SET_LOGGED_IN", false);
        },
    },
    getters: {
        isLoggedIn: (state) => {
            return state.loggedIn;
        },
        // add a vuex getter to get the logged in user  
        loggedInUser: state => {
            return state.user; // return the user object from the state
          }
    },
};
