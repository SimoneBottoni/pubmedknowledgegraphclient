import React, {useState} from 'react';

const state = {
    elements: {
        edges: [],
        nodes: []
    },
    legends: {
        edgeLegend: {},
        nodeLegend: {}
    }
}
const GraphContext = React.createContext(state);
export default GraphContext

export const GraphProvider = ({ children }) => {

    const [data, setData] = useState('')
    const [dataLoaded, setDataLoaded] = useState(false)

    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('Errore');

    const [selectedObj, setSelectedObj] = useState(null)
    const [selectedType, setSelectedType] = useState(null)

    const fetchData = async (dir, id) => {
        console.log('Sending request.')
        return await fetch(`http://localhost:8180/api/v1/article/${dir}/${id}`,{ method: 'GET', headers: {Accept: 'application/json'}})
    }

    async function getData(dir, id) {
        if (dir === '' || id === '') {
            setError(true)
            setErrorMessage('Values not allowed.');
        } else {
            const res = await fetchData(dir, id.trim())
            if (res.ok) {
                setError(false)
                setSelectedObj(null)
                setSelectedType(null)
                setData(await res.json())
                setDataLoaded(true)
            } else {
                res.text().then(text => setErrorMessage(text))
                setError(true)
            }
        }
    }

    const value = {
        data, dataLoaded, getData, selectedObj, setSelectedObj, error, setError, errorMessage, selectedType, setSelectedType
    }

    return(
        <GraphContext.Provider value={value}>
            {children}
        </GraphContext.Provider>
    );

}