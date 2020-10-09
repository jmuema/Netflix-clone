import axios from "axios";

/* base url to make request */
 const instance = axios.create({
     baseURL: "http://api.themoviedb.org/3",
 });


export default instance;