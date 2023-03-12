import GraphSearch from './GraphSearch'
import GraphView from './GraphView'
import Legend from './View/Legend'
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
                    </div>
                    <div className="bx--col-lg-9" style={{ marginBottom: '2rem' , marginLeft: '-7rem' }}>
                        <GraphView />
                    </div>
                </div>
            </div>
        </GraphProvider>
    );
}

export default Graph