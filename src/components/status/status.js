import {StatusProvider} from "../../context/StatusContext";
import {Tile} from "carbon-components-react";

import FileStatus from "./FileStatus";
import FileUpdate from "./FileUpdate";
import FileFailedFile from "./FileFailedFile";

const Status = () => {
    return(
        <StatusProvider>
            <div className="bx--grid">
                <div className="bx--row" style={{ marginBottom: '2rem' }}>
                    <div className="bx--col">
                        Database Status
                    </div>
                </div>
                <div className="bx--row" style={{ marginBottom: '2rem' }}>
                    <div className="bx--col">
                        <FileStatus />
                    </div>
                </div>
                <div className="bx--row" style={{ marginBottom: '2rem' }}>
                    {/*<div className="bx--col-lg-3" style={{ marginBottom: '2rem' }}>
                        <Tile>
                            <div className="bx--row" style={{ marginBottom: '2rem' }}>
                                <div className="bx--col">
                                    Update Last File
                                </div>
                            </div>
                            <div className="bx--row" style={{ marginBottom: '2rem' }}>
                                <div className="bx--col">
                                    <FileUpdate />
                                </div>
                            </div>
                        </Tile>
                    </div>*/}
                    <div className="bx--col-lg-8" style={{ marginBottom: '2rem', marginLeft: '8rem' }}>
                        <div className="bx--row" style={{ marginBottom: '2rem' }}>
                            <div className="bx--col">
                                Failed Files
                            </div>
                        </div>
                        <div className="bx--row" style={{ marginBottom: '2rem' }}>
                            <div className="bx--col">
                                <FileFailedFile />
                            </div>
                        </div>
                    </div>
                    <div className="bx--col">

                    </div>
                </div>
            </div>
        </StatusProvider>
    );
}

export default Status