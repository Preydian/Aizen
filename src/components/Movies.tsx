import axios from "axios";
import React from "react";
import Header from "./Header";
import {getFullData, mediaCardGeneration} from "../Helper/MediaCardGeneration";


const Movies = () => {

    const [APIFilms, setAPIFilms] = React.useState<apiMedia[]>([]);
    const [fullFilmData, setFullFilmData] = React.useState<apiMediaFull[]>([]);
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [page, setPage] = React.useState(1);


    React.useEffect(() => {
        setFullFilmData([])
        axios.get(`https://vidsrc.to/vapi/movie/new/${page}`)
            .then((response) => {
                setAPIFilms(response.data.result.items)
            })
            .catch((error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            });
    }, [page])

    React.useEffect(() => {
        const fetchFullFilmData = async () => {
            setFullFilmData(await getFullData(APIFilms))
        }

        fetchFullFilmData()
    }, [APIFilms])

    const addPagination = () => {
        return Array.from({length: Math.ceil(40 / 10)}, (_, i) => {

            const pageNumber = 1 + i;
            const active = page === pageNumber;
            return (
                <div className={`page-item ${active ? 'active' : ''}`} onClick={() => setPage(pageNumber)} key={pageNumber}>
                    <li className="page-link">{pageNumber}</li>
                </div>
            );
        });
    }

    const list_of_films = () => {
        if (APIFilms.length === 0) {
            return (
                <p style={{flex: "auto", maxWidth: "none"}}>No Films</p>
            )
        }
        return (mediaCardGeneration(fullFilmData));
    };

    if (fullFilmData.length == 0) {
        return (
            <div className="WatchMoviesBody">
                <Header></Header>
                <h1>Movies</h1>
                <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
                    <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000"
                            strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330"
                            strokeLinecap="round"></circle>
                    <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000"
                            strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110"
                            strokeLinecap="round"></circle>
                    <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000"
                            strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                    <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000"
                            strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                </svg>
            </div>
        )
    } else {
        return (
            <div className="WatchMoviesBody">
                <Header></Header>
                <h1>Movies</h1>
                <div>
                    {/*<div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>*/}
                    {/*    <div className="dropdown">*/}
                    {/*        <button className="btn btn-secondary dropdown-toggle" type="button" id="genreBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ marginRight: '20px' }}>*/}
                    {/*            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-folder2-open" viewBox="0 0 16 16">*/}
                    {/*                <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z"/>*/}
                    {/*            </svg>*/}
                    {/*            <span id="genreBtnSpan">Genre</span>*/}
                    {/*        </button>*/}
                    {/*        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{width: "300px"}}>*/}
                    {/*            <ul id="genreUl" style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none' }}>*/}
                    {/*                {addGenreFilter()}*/}
                    {/*            </ul>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*    <div className="dropdown">*/}
                    {/*        <button className="btn btn-secondary dropdown-toggle" type="button" id="ageRatingBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ marginRight: '20px' }}>*/}
                    {/*            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-slash-circle" viewBox="0 0 16 16">*/}
                    {/*                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>*/}
                    {/*                <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z"/>*/}
                    {/*            </svg>*/}
                    {/*            <span id="ageRatingSpanBtn">Age Rating</span>*/}
                    {/*        </button>*/}
                    {/*        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{width: "300px"}}>*/}
                    {/*            <ul id="ageRatingUl" style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none' }}>*/}
                    {/*                {addAgeRatingFilter()}*/}
                    {/*            </ul>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*    <div className="dropdown">*/}
                    {/*        <button className="btn btn-secondary dropdown-toggle" type="button" id="ageRatingBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ marginRight: '20px' }}>*/}
                    {/*            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-down" viewBox="0 0 16 16">*/}
                    {/*                <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>*/}
                    {/*            </svg>*/}
                    {/*            <span id="sortSpanBtn">Sort</span>*/}
                    {/*        </button>*/}
                    {/*        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" onClick={(event) => event.stopPropagation()}>*/}
                    {/*            <ul id="sortUl">*/}
                    {/*                {addSortOptions()}*/}
                    {/*            </ul>*/}
                    {/*            <div className="dropdown-divider"></div>*/}
                    {/*            <ul id="sortUl">*/}
                    {/*                <li className={"form-check"} id="sortLi" key={-1}>*/}
                    {/*                    <input className="form-check-input" type="radio" id={`inlineSortDirectionRadio${0}`} name="flexRadioDirection" onClick={(event) => checkBox(0, event, "sortDirection")} defaultChecked />*/}
                    {/*                    <label className="form-check-label" id={`sortDirection${0}`} htmlFor={`inlineSortDirectionRadio${0}`}>Ascending</label>*/}
                    {/*                </li>*/}
                    {/*                <li className={"form-check"} id="sortLi" key={-2}>*/}
                    {/*                    <input className="form-check-input" type="radio" id={`inlineSortDirectionRadio${1}`} name="flexRadioDirection" onClick={(event) => checkBox(1, event, "sortDirection")}/>*/}
                    {/*                    <label className="form-check-label" id={`sortDirection${1}`} htmlFor={`inlineSortDirectionRadio${1}`}>Descending</label>*/}
                    {/*                </li>*/}
                    {/*            </ul>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}


                    {/*    <button className="btn btn-danger ml-auto" type="button" id="resetBtn" onClick={resetFilters}>*/}
                    {/*        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">*/}
                    {/*            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>*/}
                    {/*        </svg>*/}
                    {/*        <span id="resetBtnSpan">Reset</span>*/}
                    {/*    </button>*/}

                    {/*</div>*/}

                    <div className="container mt-4 ml-5 mr-5">
                        {APIFilms.length < 5 &&
                            <div className={`row row-cols-1 row-cols-md-${APIFilms.length}`}>
                                {list_of_films()}
                            </div>
                        }
                        {APIFilms.length >= 5 &&
                            <div className="row row-cols-1 row-cols-md-5 slide-up">
                                {list_of_films()}
                            </div>
                        }
                    </div>
                    {APIFilms.length > 0 &&
                        <nav aria-label="..." style={{display: "flex", justifyContent: "center"}}>
                            <ul className="pagination">
                                {page > 1 &&
                                    <div className="page-item" onClick={() => setPage(1)}>
                                        <li className="page-link">First</li>
                                    </div>
                                }
                                {addPagination()}
                            </ul>
                        </nav>
                    }
                </div>
            </div>
        )
    }
}

export default Movies;