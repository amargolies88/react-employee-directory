import axios from "axios";

export default function getRandomUsers(results = 20) {
    const URL = `https://randomuser.me/api/?results=${results}&?nat=us`;
    return axios.get(URL);
};