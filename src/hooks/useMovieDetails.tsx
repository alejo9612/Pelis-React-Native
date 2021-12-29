import { useEffect, useState } from "react"
import movieDB from "../api/movieDB";
import { Cast, CreditResp } from "../interface/creditInterface";
import { MovieFull } from "../interface/movieInterface";

interface MovieDetails {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[];
}

export const useMovieDetails = (movieId: number) => {

    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: []
    });

    const getMovieDetails = async () => {

        const movieDetailsPromise = movieDB.get<MovieFull>(`${movieId}`);
        const castPromise = movieDB.get<CreditResp>(`${movieId}/credits`);

        const [movieDetailsResp, castPromiseResp] = await Promise.all([movieDetailsPromise, castPromise]);

        setState({
            isLoading: false,
            movieFull: movieDetailsResp.data,
            cast: castPromiseResp.data.cast
        })
    }

    useEffect(() => {
        getMovieDetails();
    }, [])

    return {
        ...state
    }
}
