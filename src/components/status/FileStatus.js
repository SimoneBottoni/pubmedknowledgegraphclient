import React, {useEffect} from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow} from "carbon-components-react";

import StatusContext from "../../context/StatusContext";

const FileStatus = () => {

    const {getMetaData, data, dataLoaded} = React.useContext(StatusContext)

    useEffect(() => {
        getMetaData()
    }, []);

    return(
        <TableContainer>
            <Table useZebraStyles size='short'>
                <TableHead>
                    <TableRow>
                        <TableHeader>Last BaseLine File</TableHeader>
                        <TableHeader>Last BaseLine Computed File</TableHeader>
                        <TableHeader>Last Update Computed File</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        {dataLoaded ?
                            Object.keys(data).map(field => {
                                return(
                                    <TableCell key={field}>{data[field]}</TableCell>
                                );
                            }) : <TableCell /> }
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default FileStatus