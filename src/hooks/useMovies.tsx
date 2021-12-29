import { useEffect, useState } from "react";
import movieDB from "../api/movieDB";
import { Movie, MovieDBResponse } from "../interface/movieInterface";

interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    toRated: Movie[];
    upComing: Movie[];
}

export const useMovies = () => {

    //manejo del loading que carga las movies
    const [isLoading, setIsLoading] = useState(true);

    //Le asigno de que tipo es llamando el typado que hicimos en el interface
    const [moviesState, setMoviesState] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        toRated: [],
        upComing: []
    })

    const getMovies = async () => {

        //Declaración de cada una de las solicitudes que se ejecturan pra las diferentes solicirudes que se requieren
        const now_playingPromise = movieDB.get<MovieDBResponse>('/now_playing');
        const popularPromise = movieDB.get<MovieDBResponse>('/popular');
        const top_ratedPromise = movieDB.get<MovieDBResponse>('/top_rated');
        const upcomingPromise = movieDB.get<MovieDBResponse>('/upcoming');
        //const peliculas = resp.data.results;

        //Manejo de las promesas antes mencionadas para la petición correspondiente
        const respuesta = await Promise.all([
            now_playingPromise,
            popularPromise,
            top_ratedPromise,
            upcomingPromise
        ]);

        setMoviesState({
            nowPlaying: respuesta[0].data.results,
            popular: respuesta[1].data.results,
            toRated: respuesta[2].data.results,
            upComing: respuesta[3].data.results,
        });

        setIsLoading(false);
    }

    //Se lanza el efecto que me respon dera las peliculas jque deseo mostrar
    useEffect(() => {
        //now_playing
        getMovies();
    }, []);


    //Respuestas que deseamos retornar
    return {
        ...moviesState,
        isLoading,
    }
}
