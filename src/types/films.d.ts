type film = {
    filmId: number,
    title: string,
    genreId: number,
    releaseDate: string,
    directorId: number,
    directorFirstName: string,
    directorLastName: string,
    rating: number,
    ageRating: string
}

type filmFull = {
    description: string,
    numReviews: number,
    runtime: number
} & film

type apiMedia = {
    title: string,
    imdb_id: string,
    embed_url_imdb: string,
    type: string
}

type apiMediaFull = {
    Title: string,
    Year: string,
    Rated: string,
    Released: string,
    Runtime: string,
    Genre: string,
    Director: string,
    Actors: string,
    Plot: string,
    Language: string,
    Country: string,
    Poster: string,
    Ratings: Array,
    imdbRating: string,
    imdbVotes: string,
    imdbID: string,
    Type: string,
    totalSeasons: string
}

type omdbSearch = {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string,
}

type filmReturn = {
    films: film[],
    count: number
}

type genre = {
    genreId: number,
    name: string
}

type review = {
    reviewerId: number,
    rating: number,
    review: string,
    reviewerFirstName: string,
    reviewerLastName: string,
    timestamp: string
}

type filmSearchQuery = {
    q?: string,
    directorId?: number,
    reviewerId?: number,
    genreIds?: Array<number>,
    ageRatings?: Array<string>,
    sortBy?: string
    count?: number,
    startIndex?: number
}