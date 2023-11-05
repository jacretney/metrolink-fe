import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.tfgm.com/odata',
    headers: {
        "Ocp-Apim-Subscription-Key": "90260e207c03479c913e54d1934d1542",
    }
})