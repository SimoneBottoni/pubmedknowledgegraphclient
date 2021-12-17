import {Table, TableCell, TableContainer, TableHead, TableHeader, TableRow, Tag} from 'carbon-components-react';
import React from "react";
import GraphContext from "../../context/GraphContext";

const GraphTable = () => {

    const {selectedObj} = React.useContext(GraphContext)

    return (
        <div className="bx--grid">
            <div className="bx--row">
                <div className="bx--col" style={{ marginTop: '-0.5rem' }}>
                    {selectedObj!==null ?
                        <Tag type={selectedObj['tagColor']} title={selectedObj.label}> {selectedObj.label} </Tag>
                        : <div />}
                </div>
            </div>
            <div className="bx--row" style={{ marginBottom: '2rem' }}>
                <TableContainer>
                    <Table useZebraStyles size="short">
                        <TableHead>
                            {selectedObj!==null ? Object.keys(selectedObj['properties']).map((result, currentKey) => {
                                return (
                                    <TableRow key={currentKey}>
                                        <TableHeader>{result}</TableHeader>
                                        <TableCell>{selectedObj['properties'][result]}</TableCell>
                                    </TableRow>
                                );
                            }) : <TableRow />}
                        </TableHead>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default GraphTable