import {Button, InlineNotification, Loading, Search, Select, SelectItem} from "carbon-components-react";
import React from "react";
import GraphContext from "../../context/GraphContext";


const GraphSearch = () => {

    const {getData, error, errorMessage, setError} = React.useContext(GraphContext)

    const [nodeProp, setNodeProp] = React.useState('');
    const [searchInput, setSearchInput] = React.useState('');

    const [isLoading, setIsLoading] = React.useState(false)


    const handleChangeProp = (event) => {
        setNodeProp(event.target.value);
    };

    const handleInput = (evt) => {
        setSearchInput(evt.target.value);
    };

    const handleButton = async () => {
        setIsLoading(true);
        await getData(nodeProp, searchInput);
        setIsLoading(false);
    }

    const handleClose = () => {
        setError(false)
    }

    return (
        <div className="bx--grid">
            <div className="bx--row" style={{ marginBottom: '2rem' }}>
                <div className="bx--col">
                    <div className="bx--row" style={{ marginBottom: '2rem' }}>
                        <div className="bx--col">
                            <Select
                                id="Property"
                                labelText="Property"
                                onChange={handleChangeProp}
                                light
                            >
                                <SelectItem text="Choose an option..." value="" />
                                <SelectItem text="Pmid" value="pmid" />
                                <SelectItem text="Tag CUI" value="tag" />
                                <SelectItem text="Tag Preferred Name" value="name" />
                            </Select>
                        </div>
                    </div>
                    <div className="bx--row" style={{ marginBottom: '2rem' }}>
                        <div className="bx--col">
                            <Search labelText="Search" id="search" placeholder="Search" onChange={handleInput} size="lg" light />
                        </div>
                    </div>
                    <div className="bx--row" style={{ marginBottom: '2rem' }}>
                        <div className="bx--col">
                            <Button kind="primary" onClick={handleButton}>Search</Button>
                        </div>
                        <div className="bx--col">
                            {isLoading ? <Loading description="Loading" small withOverlay /> : <div />}
                        </div>
                    </div>
                    <div className="bx--row" style={{ marginBottom: '2rem' }}>
                        {error ? <InlineNotification
                            kind="error"
                            title={errorMessage}
                            onCloseButtonClick={handleClose}
                        /> : <div />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GraphSearch