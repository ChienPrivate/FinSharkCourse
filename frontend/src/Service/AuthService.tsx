import axios from "axios";
import { handleError } from "../Helper/ErrorHandler";
import { UserProfileProfile } from "../Models/User";

const api = "https://localhost:5167/api";

export const loginAPI = async (username: string, password: string) => {
    try{
        const data =  await axios.post<UserProfileProfile>(api + "account/login", {
            username: username,
            password: password,
        });
        return data;
    }
    catch (error : any){
        handleError(error);
    }
}

export const registerAPI = async (email: string ,username: string, password: string) => {
    try{
        const data =  await axios.post<UserProfileProfile>(api + "account/login", {
            email: email,
            username: username,
            password: password,
        });
        return data;
    }
    catch (error : any){
        handleError(error);
    }
}