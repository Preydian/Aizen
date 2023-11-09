import {useLocation, useParams} from "react-router-dom";
import Header from "./Header";
import React from "react";

const Watch = () => {

    const {id} = useParams();
    const location = useLocation();
    const mediaType = location.pathname.includes("movie") ? "movie" : "tv"
    // @ts-ignore
    const currentPlaying = JSON.parse(localStorage.getItem("playingMedia"))

    return (
        <div className="WatchMedia">
            <Header></Header>
            <h1>Watch</h1>
            <div className="m-4">
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item"
                            src={`https://vidsrc.to/embed/${mediaType}/${id}`}
                            allow="autoplay; fullscreen; allow-popups" allowFullScreen>
                    </iframe>
                </div>
            </div>
            <div className="filmInfo">
                <strong>Title: </strong>
                {currentPlaying["Title"]}
                <br/>
                <strong>Year: </strong>
                {currentPlaying["Year"]}
                <br/>
                <strong>Rated: </strong>
                {currentPlaying["Rated"]}
                <br/>
                <strong>Released: </strong>
                {currentPlaying["Released"]}
                <br/>
                <strong>Runtime: </strong>
                {currentPlaying["Runtime"]}
                <br/>
                <strong>Genre: </strong>
                {currentPlaying["Genre"]}
                <br/>
                <strong>Director: </strong>
                {currentPlaying["Director"]}
                <br/>
                <strong>Actors: </strong>
                {currentPlaying["Actors"]}
                <br/>
                <strong>Plot: </strong>
                {currentPlaying["Plot"]}
                <br/>
                <strong>Language: </strong>
                {currentPlaying["Language"]}
                <br/>
                <strong>Country: </strong>
                {currentPlaying["Country"]}
                <br/>
                {/*{currentPlaying["Ratings"]}*/}
                <strong>imdbRating: </strong>
                {currentPlaying["imdbRating"]}
                <br/>
                <strong>Seasons: </strong>
                {currentPlaying["totalSeasons"]}
            </div>
        </div>

    )
}

export default Watch