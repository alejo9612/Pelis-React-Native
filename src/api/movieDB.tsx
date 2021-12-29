import axios from 'axios';

//Manejo de mi API consumida
const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: 'c07b4a59b47fd6b59338c91caae8a343',
        language: 'es-ES'
    }
});

export default movieDB;