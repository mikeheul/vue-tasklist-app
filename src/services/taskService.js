import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos'; 

export const getTasks = async () => {
    const response = await axios.get(API_URL);
    return response.data.slice(0, 5);
};
