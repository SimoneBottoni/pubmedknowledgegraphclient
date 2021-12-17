import Legend from './View/Legend'
import ForceGraph from './View/ForceGraph'

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
                    <ForceGraph />
                </div>
            </div>
        </div>
    );
}

export default GraphView