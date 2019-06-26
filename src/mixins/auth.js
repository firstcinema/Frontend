import router from "../Routes";
import axios from "axios";

export default {
    methods: {
        getUserData: function() {
            axios.get("/api/auth/user", {
                withCredentials: true
            }).then(response => {
                if (response.data.success) {
                    this.$store.commit('userModule/updateUser', response.data.user);
                }
            }).catch(() => {
                router.push("/");
            });
        }
    },
    updated() {
        this.getUserData();
    },
    mounted() {
        this.getUserData();
    }
};