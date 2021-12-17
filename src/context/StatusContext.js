import React, {useState} from 'react';

const metaDataState = {
    "lastBaselineFile": '',
    "lastBaselineFileComputed": '',
    "lastUpdateFileComputed": ''
}

const StatusContext = React.createContext(null);
export default StatusContext

export const StatusProvider = ({ children }) => {

    const [data, setData] = useState(metaDataState)
    const [dataLoaded, setDataLoaded] = useState(false)

    const [failedFile, setFailedFile] = useState(null)
    const [failedFileLoaded, setFailedFileLoaded] = useState(false)

    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [ok, setOk] = React.useState(false);
    const [okMessage, setOkMessage] = React.useState('');
    const [failedFileCheck, setFailedFileCheck] = React.useState(false);
    const [failedFileMessage, setFailedFileMessage] = React.useState('');

    const fetchData = async () => {
        console.log('Sending request.')
        return await fetch(`http://localhost:8180/api/v1/metadata`,{ method: 'GET', headers: {Accept: 'application/json'}})
    }

    const updateFetchData = async (file) => {
        console.log('Sending request.')
        return await fetch(`http://localhost:8180/api/v1/metadata/updatelastfile/${file}`,{ method: 'GET', headers: {Accept: 'application/json'}})
    }

    const failedFileFetchData = async () => {
        console.log('Sending request.')
        return await fetch(`http://localhost:8180/api/v1/metadata/failedfile`,{ method: 'GET', headers: {Accept: 'application/json'}})
    }

    async function getMetaData() {
        const res = await fetchData()
        if (res.ok) {
            setData(await res.json())
            setDataLoaded(true)
        }
    }

    async function updateLastFile(file) {
        if (file === '') {
            setError(true)
            setErrorMessage('Values not allowed.');
        } else {
            const res = await updateFetchData(file)
            if (res.ok) {
                await getMetaData()
                setOk(true)
                setOkMessage('Saved.')
            } else {
                res.text().then(text => setErrorMessage(text))
                setError(true)
            }
        }
    }

    async function getFailedFileData() {
        const res = await failedFileFetchData()
        if (res.ok) {
            setFailedFile(await res.json())
            setFailedFileLoaded(true)
        } else {
            res.text().then(text => setFailedFileMessage(text))
            setFailedFileCheck(true)
        }
    }

    const value = {
        data, dataLoaded, failedFile, failedFileLoaded,
        getMetaData, updateLastFile, getFailedFileData,
        error, setError, ok, setOk, failedFileCheck, setFailedFileCheck,
        errorMessage, okMessage, failedFileMessage
    }

    return(
        <StatusContext.Provider value={value}>
            {children}
        </StatusContext.Provider>
    );

}