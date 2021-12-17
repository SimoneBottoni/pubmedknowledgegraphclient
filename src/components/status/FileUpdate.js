import React from "react";
import {
    Button, InlineNotification, Loading, TextInput
} from "carbon-components-react";

import StatusContext from "../../context/StatusContext";

const FileUpdate = () => {

    const {error, setError, errorMessage, ok, okMessage, setOk, updateLastFile} = React.useContext(StatusContext)

    const [file, setFile] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)

    const handleButton = async () => {
        setIsLoading(true);
        await updateLastFile(file);
        setIsLoading(false);
    }

    const handleClose = () => {
        setError(false)
        setOk(false)
    }

    const handleInput = (evt) => {
        setFile(evt.target.value)
    }

    return(
        <div className="bx--grid">
            <div className="bx--row" style={{ marginBottom: '2rem' }}>
                <div className="bx--col">
                    <div className="bx--row" style={{ marginBottom: '2rem' }}>
                        <div className="bx--col">
                            <TextInput
                                id="file"
                                invalidText="Invalid error message."
                                labelText="File name"
                                placeholder="File name"
                                required
                                defaultValue={file}
                                onChange={handleInput}
                                light
                            />
                        </div>
                    </div>
                    <div className="bx--row" style={{ marginBottom: '2rem' }}>
                        <div className="bx--col">
                            <Button kind="primary" onClick={handleButton}>Send</Button>
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
                        {ok ? <InlineNotification
                            kind="success"
                            title={okMessage}
                            onCloseButtonClick={handleClose}
                        /> : <div />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileUpdate