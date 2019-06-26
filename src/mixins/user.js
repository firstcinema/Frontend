import axios from "axios";

export default {
    methods: {
        followUser: function(e) {
            e.preventDefault();
            let data = {
                followingId: this.targetUser._id
            };
            axios.post("/api/users/follow", data, {
                withCredentials: true
            }).then(response => {
                if (response.data.success) {
                    this.followingUser = true;
                }
            }).catch(error => {
                if (error) {
                    console.log(error);
                }
            });
        },
        unfollowUser: function(e) {
            e.preventDefault();
            let data = {
                followingId: this.targetUser._id
            };
            axios.post("/api/users/unfollow", data, {
                withCredentials: true
            }).then(response => {
                if (response.data.success) {
                    this.followingUser = false;
                }
            }).catch(error => {
                if (error) {
                    console.log(error);
                }
            });
        }
    }
};