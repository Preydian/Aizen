import {Link} from "react-router-dom";
import {APIKey} from "./constants";
import React from "react";
import axios from "axios";

const mediaCardGeneration = (Media: apiMediaFull[]) => {
    const type = Media[0].Type == "movie" ? "movie" : "tv"
    return Media.map((item: apiMediaFull, index: number) =>
        <div className="col mb-4" style={{minWidth: "347px" }} key={item.imdbID} onClick={(event) => localStorage.setItem("playingMedia", JSON.stringify(item))}>
            <Link to={`/${type}/` + item.imdbID} style={{textDecoration: "none"}}>
                <div className="cardFilm" id={`film_${index}`}>
                    <img className="card-img-top" src={`${item.Poster}`}
                         onError={(e) => {
                             const target = e.target as HTMLImageElement;
                             target.onerror = null;
                             target.src = '../defaultFilm.png';
                         }} alt="Card cap" style={{width: "100%", height: "200px", objectFit: "cover"}}/>
                    <div className="card-body" id="filmCardLink">
                        <h5 className="card-title">{item.Title}</h5>
                        <div className="card-text" style={{textAlign: "left"}}>
                            <div>
                                <strong>Director: </strong>
                                {item.Director}
                                <br/>
                                <strong>Cast: </strong>
                                {item.Actors}
                            </div>
                            <br/>
                            {item.Released}
                            <h6>
                                  <span className="badge badge-secondary" style={{ marginRight: "0.5rem" }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" fill="gold" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                      </svg>
                                        {item.Ratings.length > 0 &&
                                            <span style={{ marginLeft: "0.25rem" }}>{item.Ratings[0]["Value"]}</span>
                                        }
                                        {item.Ratings.length == 0 &&
                                            <span style={{ marginLeft: "0.25rem" }}>N/A</span>
                                        }
                                    </div>
                                  </span>
                                {item.Rated === "G" &&
                                    <span className="badge badge-secondary" style={{ marginRight: "0.5rem", backgroundColor: "lightgreen", color: "black" }}>{item.Rated}</span>
                                }
                                {(item.Rated === "R13" || item.Rated === "R16" || item.Rated === "R18" || item.Rated === "TV-MA" || item.Rated === "R") &&
                                    <span className="badge badge-secondary" style={{ marginRight: "0.5rem", backgroundColor: "darkred" }}>{item.Rated}</span>
                                }
                                {(item.Rated === "M" || item.Rated === "PG") &&
                                    <span className="badge badge-secondary" style={{ marginRight: "0.5rem", backgroundColor: "yellow", color: "black" }}>{item.Rated}</span>
                                }
                                {(item.Rated === "TBC" || item.Rated === "N/A") &&
                                    <span className="badge badge-secondary" style={{ marginRight: "0.5rem" }}>{item.Rated}</span>
                                }
                                <span className="badge badge-secondary" style={{ marginRight: "0.5rem" }}>{item.Genre}</span>
                            </h6>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

const getFullData = async (APIFilms: apiMedia[]) => {
    let fullFilmInfo: Array<apiMediaFull> = []
    for (let i = 0; i < APIFilms.length; i++) {
        await axios.get(`https://www.omdbapi.com/?i=${APIFilms[i].imdb_id}&apikey=${APIKey}`)
            .then((response) => {
                fullFilmInfo.push(response.data)
            })
            .catch((error) => {
                console.log(error)
            });
    }
    return fullFilmInfo
}

const getFullDataOMDB = async (APIFilms: omdbSearch[]) => {
    let fullFilmInfo: Array<apiMediaFull> = []
    for (let i = 0; i < APIFilms.length; i++) {
        await axios.get(`https://www.omdbapi.com/?i=${APIFilms[i].imdbID}&apikey=${APIKey}`)
            .then((response) => {
                fullFilmInfo.push(response.data)
            })
            .catch((error) => {
                console.log(error)
            });
    }
    return fullFilmInfo
}

export {mediaCardGeneration, getFullData, getFullDataOMDB}