import axios from "axios"


const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "b7119477-3c3d-4ee3-880d-8f32b0e02381"
    },
    baseURL: `https://social-network.samuraijs.com/api/1.0/`
})

export const usersAPI = {
    requestUsers(currentPage, pageSize) {

        return instance.get(`users`,
            {
                withCredentials: true,
                params: { page: currentPage, count: pageSize }

            })
            .then(response => response.data);
    },

    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId) {
        console.warn('Obsolete method. Please profileAPI object. ')
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, { status: status });
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

export const homeAPI = {
    getUsersHome() {

        return instance.get(`users`,)
            .then(response => response.data);
    }
}