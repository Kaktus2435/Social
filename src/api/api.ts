import axios from "axios"

export const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "b7119477-3c3d-4ee3-880d-8f32b0e02381"
    },
    baseURL: `https://social-network.samuraijs.com/api/1.0/`
})