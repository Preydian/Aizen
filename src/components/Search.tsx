import axios from "axios";
import React from "react";
import Header from "./Header";
import {getFullData, getFullDataOMDB, mediaCardGeneration} from "../Helper/MediaCardGeneration";
import {APIKey} from "../Helper/constants";
const Search = () => {

    const [APIFilms, setAPIFilms] = React.useState<omdbSearch[]>([]);
    const [fullMediaData, setFullMediaData] = React.useState<apiMediaFull[]>([]);
    const [query, setQuery] = React.useState(localStorage.getItem("query"));
    const [page, setPage] = React.useState(1);
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    React.useEffect(() => {
        setFullMediaData([])
        axios.get(`https://www.omdbapi.com/?s=${query}&page=${page}&apikey=${APIKey}`)
            .then((response) => {
                console.log(response.data)
                if (response.data["Response"] === 'True') {
                    setAPIFilms(response.data["Search"])
                } else {
                    setErrorFlag(true)
                    setErrorMessage(response.data["Error"])
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }, [query, page])

    React.useEffect(() => {
        const fetchFullData = async () => {
            setFullMediaData(await (getFullDataOMDB(APIFilms)))
        }

        fetchFullData()
        console.log(APIFilms)
    }, [APIFilms])

    const list_of_films = () => {
        if (APIFilms.length === 0) {
            return (
                <p style={{flex: "auto", maxWidth: "none"}}>No Films</p>
            )
        }
        return (mediaCardGeneration(fullMediaData));
    };

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

    if (errorFlag) {
        return (
            <div className="SearchMediaBody">
                <Header></Header>
                <h1>Search for: {localStorage.getItem("query")}</h1>
                <div style={{color: "red"}}>
                    {errorMessage}
                </div>
            </div>
        );
    } else if (fullMediaData.length === 0) {
        return (
            <div className="SearchMediaBody">
                <Header></Header>
                <h1>Searching for: {localStorage.getItem("query")}</h1>
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
            <div className="SearchMediaBody">
                <Header></Header>
                <h1>Search</h1>
                <div>
                    <strong>Showing results for: </strong>
                    {localStorage.getItem("query")}
                    <div>
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
            </div>
        )
    }
}

export default Search;