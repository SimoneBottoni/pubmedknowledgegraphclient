import {Tile} from "carbon-components-react";

import GraphSearch from './GraphSearch'
import GraphView from './GraphView'
import Legend from './View/Legend'
import GraphTable from './GraphTable'
import {GraphProvider} from "../../context/GraphContext";

const Graph = () => {

    return(
        <GraphProvider>
            <div className="bx--grid">
                <div className="bx--row" style={{ marginBottom: '2rem' }}>
                    <div className="bx--col-lg-3" style={{ marginBottom: '2rem', marginLeft: '-7rem' }}>
                        <div className="bx--row" style={{ marginBottom: '2rem' }}>
                            <GraphSearch />
                        </div>
                        <div className="bx--row" style={{ marginBottom: '2rem' }}>
                            <Legend />
                        </div>
                        {/*<Tile>*/}
                        {/*    /!*<div className="bx--row" style={{ marginBottom: '2rem' }}>*!/*/}
                        {/*    /!*    <div className="bx--col">*!/*/}
                        {/*    /!*        Filter*!/*/}
                        {/*    /!*    </div>*!/*/}
                        {/*    /!*</div>*!/*/}
                        {/*    <div className="bx--row" style={{ marginBottom: '2rem' }}>*/}
                        {/*        <div className="bx--col">*/}

                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</Tile>*/}
                    </div>
                    <div className="bx--col-lg-9" style={{ marginBottom: '2rem' , marginLeft: '-7rem' }}>
                        <GraphView />
                        {/*<div className="bx--row" style={{ marginBottom: '2rem' }}>*/}
                        {/*    <div className="bx--col">*/}
                        {/*        Knowledge Graph*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className="bx--row" style={{ marginBottom: '2rem' }}>*/}
                        {/*    <div className="bx--col">*/}
                        {/*        */}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                    {/*<div className="bx--col-lg-3" style={{ marginBottom: '2rem' }}>*/}
                    {/*    <div className="bx--row" style={{ marginBottom: '2rem' }}>*/}
                    {/*        Data*/}
                    {/*    </div>*/}
                    {/*    <div className="bx--row" style={{ marginBottom: '2rem' }}>*/}
                    {/*        <GraphTable />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </GraphProvider>
    );
}

export default Graph