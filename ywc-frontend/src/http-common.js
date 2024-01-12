import axios from "axios";

export default axios.create({
    baseURL: "http://www.yourworldcookbook.com/api",
    headers: {
        "Content-type": "application/json"
    }
});

// export default axios.create({
//     baseURL: "http://localhost:3000/api",
//     headers: {
//         "Content-type": "application/json"
//     }
//  });