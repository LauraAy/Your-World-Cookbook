import axios from "axios";

export default axios.create({
    baseURL: "http://ec2-13-56-232-141.us-west-1.compute.amazonaws.com/api",
    headers: {
        "Content-type": "application/json"
    }
});