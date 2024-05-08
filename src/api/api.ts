import axios from "axios"
import { UserType } from "../types/types"

export const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "b7119477-3c3d-4ee3-880d-8f32b0e02381"
    },
    baseURL: `https://social-network.samuraijs.com/api/1.0/`
})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}
export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D;
    messages: Array<string>;
    resultCode: RC;

};
