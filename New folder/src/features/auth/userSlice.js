import { createSlice } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";

const token = localStorage.getItem("token");
const initialState = {
    isAuthenticated: false,
    user: null,
    userMenus: [],
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
           console.log("data after redux ", action.payload.userData.first_name);
           
            
           if(localStorage.getItem("token")==null||undefined){localStorage.setItem("token", action.payload.token)};
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            // state.userMenus = [];
            //  Cookies.remove("authToken");
            localStorage.removeItem("token");
        },
                    
       
    },
});
export const { loginSuccess, logoutUser } = authSlice.actions;
export default authSlice.reducer;
