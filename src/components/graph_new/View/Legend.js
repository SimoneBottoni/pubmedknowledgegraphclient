import React from "react";
import {Tag} from "carbon-components-react";
import GraphContext from "../../../context/GraphContext";

const Legend = () => {

    const {data, dataLoaded, setSelectedType} = React.useContext(GraphContext)

    return (
        <div className="bx--grid">
            <div className="bx--row" style={{marginBottom: '2rem'}}>
                {dataLoaded && <div className="bx--col-lg-2"> Nodes </div>}
                <div className="bx--col-lg-10" style={{marginTop: '-0.5rem'}}>
                    {dataLoaded ? Object.keys(data.legend.nodeLegend).map((label, index) => {
                        return <Tag key={index}
                                    onClick={() => setSelectedType(label)}
                                    type={data.legend.nodeLegend[label]['tagColor']}
                                    title={label}>{label}
                                </Tag>
                    }) : <div />}
                </div>
            </div>
            <div className="bx--row" style={{marginBottom: '2rem'}}>
                {dataLoaded && <div className="bx--col-lg-2"> Edges </div>}
                {/*<div className="bx--col-lg-2">*/}
                {/*    Edges*/}
                {/*</div>*/}
                <div className="bx--col-lg-10" style={{marginTop: '-0.5rem'}}>
                    {dataLoaded ? Object.keys(data.legend.edgeLegend).map((label, index) => {
                        return <Tag key={index} type={data.legend.edgeLegend[label]['tagColor']} title={label}>{label}</Tag>
                    }) : <div />}
                </div>
            </div>
        </div>
    );
}

export default Legend