import Legend from './View/Legend'
import Cytoscape from './View/Cytoscape'

const GraphView = () => {
    return (
        <div className="bx--grid">
            <div className="bx--row" style={{ marginBottom: '2rem' }}>
                <div className="bx--col">
                    <Legend />
                </div>
            </div>
            <div className="bx--row" style={{ marginBottom: '2rem' }}>
                <div className="bx--col">
                    <Cytoscape />
                </div>
            </div>
        </div>
    );
}

export default GraphView