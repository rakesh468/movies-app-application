import axios from "axios";
import React,{createContext,useState,useEffect} from "react";
import MoviesAPI from "./API/MoviesAPI";
import UserAPI from "./API/UserAPI";
import CategoriesAPI from "./API/CategoriesAPI";


export const GlobalState=createContext();

export const DataProvider=({children})=>{
    const[token,settoken]=useState(false);

    useEffect(() => {
        const firstlogin = localStorage.getItem("firstlogin");
        if (firstlogin) {
          const refreshtoken = async () => {
            const result = await axios.get("/user/refresh_token");
            settoken(result.data.accesstoken);
            setTimeout(() => {
              refreshtoken();
            }, 10 * 60 * 1000);
          };
          refreshtoken();
        }
      }, []);
    

    const state={
        token:[token,settoken],
        moviesAPI:MoviesAPI(),
        userAPI:UserAPI(token),
       categoriesAPI: CategoriesAPI(),

    }
    return  <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
}