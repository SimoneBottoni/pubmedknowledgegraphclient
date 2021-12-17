import React, {useEffect} from "react";
import {
    InlineNotification,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow
} from "carbon-components-react";

import StatusContext from "../../context/StatusContext";

const FileFailedFile = () => {

    const {getFailedFileData, failedFile, failedFileLoaded, failedFileCheck, setFailedFileCheck, failedFileMessage} = React.useContext(StatusContext)

    useEffect(() => {
        getFailedFileData()
    }, []);

    const handleClose = () => {
        setFailedFileCheck(false)
    }

    return(
        <div className="bx--grid">
            <div className="bx--col">
                <div className="bx--row" style={{ marginBottom: '2rem' }}>
                    {failedFileCheck ? <InlineNotification
                        kind="info"
                        title={failedFileMessage}
                        onCloseButtonClick={handleClose}
                    /> : <div />}
                </div>
                <div className="bx--row" style={{ marginBottom: '2rem' }}>
                    {!failedFileCheck ?
                        <TableContainer>
                            <Table useZebraStyles size='short'>
                                <TableHead>
                                    <TableRow>
                                        <TableHeader>Type</TableHeader>
                                        <TableHeader>File</TableHeader>
                                        <TableHeader>Exception</TableHeader>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {failedFileLoaded ?
                                        failedFile['FailedFile'].map( item => {
                                            return(
                                                <TableRow key={item.id}>
                                                    <TableCell>{item.type}</TableCell>
                                                    <TableCell>{item.fileName}</TableCell>
                                                    <TableCell>{item.exception}</TableCell>
                                                </TableRow>
                                            );
                                        }) : <TableRow />}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    : <div />}
                </div>
            </div>
        </div>
    );
}

export default FileFailedFile