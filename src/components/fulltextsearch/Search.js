import React from "react";
import SearchPage from "./SearchPage";

const Search = () => {
    return(
        <div className="bx--grid">
            <div className="bx--row" style={{ marginBottom: '2rem' }}>
                <div className="bx--col">
                    <SearchPage />
                </div>
            </div>
        </div>
    );
}

export default Search