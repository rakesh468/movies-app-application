import {useEffect,useState} from "react";
import axios from "axios";


function UserAPI(token) {
    const[islogged,setislogged]=useState(false);
    const[isAdmin,setisAdmin]=useState(false);


    useEffect(() => {
        if (token) {
          const getuser = async () => {
            try {
              const result = await axios.get("/user/infor", {
                headers: { Authorization: token },
              });
              setislogged(true);
              result.data.role === 1 ? setisAdmin(true) : setisAdmin(false);
    
              //   console.log(result)//
            } catch (error) {
              alert(error.response.data.msg);
            }
          };
          getuser();
        }
      }, [token]);
    

  return {
    islogged: [islogged, setislogged],
    isAdmin: [isAdmin, setisAdmin],
  }
}

export default UserAPI