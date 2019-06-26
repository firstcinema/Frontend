import axios from "axios";
import gravatar from 'gravatar';
import router from "@/Routes";

const state = {
    user: ''
}

const mutations = {
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
}

const getters = {
    getUser: function(state) {
        return state.user;
    },
    getProfile: function(state, s = 38) {
        return gravatar.url(state.user.email, { s: s, d: 'retro' }, true);
    }
}

const actions = {
    logout: context => {
        context.commit('logout');
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}