import TestGraph from './Test_Graph'
import TestMap from './Test_Map'

const Test = () => {

    return(
        <div className="bx--grid">
            <div className="bx--row" style={{ marginBottom: '2rem' }}>
                <div className="bx--col-lg-6" style={{ marginBottom: '2rem' }}>
                    <div className="bx--row" style={{ marginBottom: '2rem' }}>
                        <div className="bx--col">
                            Knowledge Graph Test
                        </div>
                    </div>
                    <div className="bx--row" style={{ marginBottom: '2rem' }}>
                        <div className="bx--col">
                            <TestGraph />
                        </div>
                    </div>
                </div>
                <div className="bx--col-lg-6" style={{ marginBottom: '2rem' }}>
                    <div className="bx--row" style={{ marginBottom: '2rem' }}>
                        <div className="bx--col">
                            Map Test
                        </div>
                    </div>
                    <div className="bx--row" style={{ marginBottom: '2rem' }}>
                        <div className="bx--col">
                            <TestMap />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Test