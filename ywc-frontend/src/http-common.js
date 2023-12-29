import axios from "axios";

export default axios.create({
    baseURL: "http://www.yourworldcookbook.com/api",
    headers: {
        "Content-type": "application/json"
    }
});