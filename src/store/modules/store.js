import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import gravatar from 'gravatar';
import router from "@/Routes";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: ''
    },
    mutations: {
        updateUser(state, user) {
            state.user = user;
        },
        logout(state) {
            axios.get("/api/auth/logout", {
                withCredentials: true
            }).then(() => {
                state.user = '';
            }).then(() => {
                router.push("/");
            });
        }
    },
    getters: {
        getProfile: function(state, s = 38) {
            return gravatar.url(state.user.email, { s: s, d: 'retro' }, true);
        }
    },
    actions: {
        logout: context => {
            context.commit('logout');
        }
    }
});