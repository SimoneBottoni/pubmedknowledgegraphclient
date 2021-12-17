import React, {useState} from "react";
import {
    Button,
    Tile,
    Loading,
    Pagination,
    Search,
    Tag,
    Link,
    TooltipDefinition,
    DatePicker,
    DatePickerInput,
    ComposedModal,
    ModalBody,
    ModalHeader,
    AccordionItem,
    StructuredListHead,
    StructuredListRow,
    StructuredListCell,
    StructuredListBody,
    Accordion,
    StructuredListWrapper, Tabs, Tab, Table, TableHead, TableRow, TableHeader, TableCell, TableContainer
} from "carbon-components-react";
import { ArrowRight16, DashboardReference16 } from '@carbon/icons-react';
import Highlighter from "react-highlight-words";
import {ForceGraph3D} from "react-force-graph";
import {Mesh, MeshLambertMaterial, SphereGeometry} from "three";

const SearchPage = () => {

    const [searchingText, setSearchingText] = React.useState(" ");
    const [searchedText, setSearchedText] = React.useState(" ");
    const [isLoading, setIsLoading] = React.useState(false)

    const [searchedType, setSearchedType] = React.useState("")

    const [useDateFilter, setUseDateFilter] = React.useState(false);
    const [dateFilterTextLow, setDateFilterTextLow] = React.useState(" ");
    const [dateFilterTextHigh, setDateFilterTextHigh] = React.useState(" ");

    const [searchedData, setSearchedData] = React.useState();
    const [searchedDataLoaded, setSearchedDataLoaded] = React.useState(false)

    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalResults, setTotalResults] = React.useState();

    const [modalOpen, setModalOpen] = React.useState(false)
    const [modalText, setModalText] = React.useState("")

    const [selectedTab, setSelectedTab] = React.useState(0);
    const [selectedCUI, setSelectedCUI] = React.useState(null);

    const [data, setData] = React.useState('')
    const [dataLoaded, setDataLoaded] = React.useState(false)

    const [selectedObj, setSelectedObj] = React.useState(null)
    const [selectedType, setSelectedType] = React.useState(null)

    async function runRequest(body) {
        return await fetch("http://localhost:8180/api/v1/article/search", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(body)
        });
    }

    async function runRequestGetPmid(id) {
        return await fetch(`http://localhost:8180/api/v1/article/search/pmid/${id}`,{
            method: 'GET',
            headers: {Accept: 'application/json'}
        })
    }

    async function runRequestGetCUI(cui) {
        return await fetch(`http://localhost:8180/api/v1/article/tag/${cui}`,{
            method: 'GET',
            headers: {Accept: 'application/json'}
        })
    }

    function removeUselessWords(txt) {
        const uselessWordsArray =
            [
                "a", "an", "and", "are", "as", "at", "be", "but", "by", "for", "if", "in", "into", "is", "it", "no",
                "not", "of", "on", "or", "such", "that", "the", "their", "then", "there", "these", "they", "this",
                "to", "was", "will", "with"
            ];

        const expStr = uselessWordsArray.join("\\b|\\b");
        return txt.replace(new RegExp(expStr, 'gi'), '').trim().replace(/ +/g, ' ');
    }

    function getBody(pageNumber, resultsPerPage, text, type, dateFiler) {
        return {
            "pageNumber": pageNumber,
            "resultsPerPage": resultsPerPage,
            "text": text.trim(),
            "searchType": type,
            "dateFiler": dateFiler,
            "dateFilterTextLow": dateFilterTextLow,
            "dateFilterTextHigh": dateFilterTextHigh
        }
    }

    const handleInput = (evt) => {
        setSearchingText(evt.target.value);
    };

    const handleDateInput = (evt) => {
        setDateFilterTextLow(evt[0].getFullYear());
        if (evt.length > 1) {
            setDateFilterTextHigh(evt[1].getFullYear());
        }
    };

    const handleButton = async () => {
        setIsLoading(true);
        const res = (await runRequest(getBody(0,20, searchingText, "", false)));
        setSearchedText(searchingText)
        setUseDateFilter(false)
        if (res.ok) {
            const response = await res.json()
            setSearchedData(response.articleView)
            setTotalResults(response.total)
            setSearchedDataLoaded(true)
            setCurrentPage(currentPage+1)
        }
        setIsLoading(false);
    }

    const handleFilterButton = async () => {
        setIsLoading(true);
        const res = (await runRequest(getBody(0,20, searchedText, searchedType, true)));
        setUseDateFilter(true)
        if (res.ok) {
            const response = await res.json()
            setSearchedData(response.articleView)
            setTotalResults(response.total)
            setSearchedDataLoaded(true)
            setCurrentPage(currentPage+1)
        }
        setIsLoading(false);
    }

    const onPageChange = async (evt) => {
        setIsLoading(true);
        const res = (await runRequest(getBody(evt.page-1, evt.pageSize, searchedText, searchedType, useDateFilter)));
        if (res.ok) {
            const response = await res.json()
            setSearchedData(response.articleView)
            setTotalResults(response.total)
            setSearchedDataLoaded(true)
        }
        window.scrollTo(0, 0);
        setIsLoading(false);
    };

    const closeModal = () => {
        setModalOpen(false)
        resetGraph()
    }

    const onDetailsClick = async (pmid) => {
        setIsLoading(true);
        const res = (await runRequestGetPmid(pmid));
        if (res.ok) {
            const response = await res.json()
            setModalText(response)
            console.log(modalText);
            setModalOpen(true)
        }
        setIsLoading(false);
    };

    const makeSearchTypeRequest = async (data, type) => {
        setSearchingText(data)
        setSearchedType(type)
        setIsLoading(true);
        const res = (await runRequest(getBody(0,20, data, type, false)));
        setSearchedText(searchingText)
        setUseDateFilter(false)
        if (res.ok) {
            const response = await res.json()
            setSearchedData(response.articleView)
            setTotalResults(response.total)
            setSearchedDataLoaded(true)
            setCurrentPage(currentPage+1)
        }
        setIsLoading(false);
    }

    const createGraph = async (cui, cuiData) => {
        setIsLoading(true);
        const res = (await runRequestGetCUI(cui));
        if (res.ok) {
            const response = await res.json()
            setData(response)
            setSelectedCUI(cuiData)
            setDataLoaded(true)
            setSelectedTab(1)
        }
        setIsLoading(false);
    }

    const nodeClickHandler = (node, event) => {
        setSelectedObj(node)
    }

    const linkClickHandler = (link, event) => {
        setSelectedObj(link)
    }

    const resetGraph = () => {
        setSelectedTab(0)
        setSelectedCUI(null)
        setData(null)
        setDataLoaded(false)
        setSelectedObj(null)
        setSelectedType(null)
    }

    return(
        <>
            {isLoading ? <Loading description="Loading" small withOverlay /> : <div />}
            <ComposedModal
                size="lg"
                open={modalOpen}
                onClose={closeModal}
                style={{ textAlign: 'justify'}}>
                <ModalHeader>
                    <h4>{modalText.articleTitle}</h4><br />
                    <strong>Pmid</strong>:&#160;
                    <Link href={"https://pubmed.ncbi.nlm.nih.gov/" + modalText.pmid + "/"} target="_blank" renderIcon={DashboardReference16}>{modalText.pmid}</Link>
                    &#160;&#160;&#160;
                    <strong>Version</strong>: {modalText.version}&#160;&#160;&#160;
                    <strong>Update</strong>: {modalText.update}<br />
                </ModalHeader>
                <ModalBody>
                    <Tabs type="container" light={true}>
                        <Tab id="tab-1" label="Details">
                            <Accordion>
                                <AccordionItem title="Abstract">{modalText.abstractText}</AccordionItem>
                                {modalText.articleAuthorList !== undefined ?
                                    <AccordionItem title="Authors">
                                        {Object.keys(modalText.articleAuthorList).map(authorIndex => {
                                            return(
                                                <div key={authorIndex}>{modalText.articleAuthorList[authorIndex].author.foreName + ". " +
                                                modalText.articleAuthorList[authorIndex].author.lastName + ", "}</div>
                                            );
                                        })}
                                    </AccordionItem>
                                    : <div />}
                                {modalText.articleJournalList !== undefined ?
                                    <AccordionItem title="Journal">
                                        <p><strong>ISO</strong>: {modalText.articleJournalList[0].journal.isoabbreviation}</p>
                                        <p><strong>Title</strong>: {modalText.articleJournalList[0].journal.title}</p>
                                        <p><strong>Year</strong>: {modalText.articleJournalList[0].pubDate}</p>
                                        <p><strong>ISSN</strong>: {modalText.articleJournalList[0].journal.issn}</p>
                                        <p><strong>ISSNLinking</strong>: {modalText.articleJournalList[0].journal.issnlinking}</p>
                                        <p><strong>ISSNType</strong>: {modalText.articleJournalList[0].journal.issntype}</p>
                                        <p><strong>Country</strong>: {modalText.articleJournalList[0].journal.country}</p>
                                        <p><strong>NlmUniqueID</strong>: {modalText.articleJournalList[0].journal.nlmUniqueID}</p>
                                        <p><strong>Volume</strong>: {modalText.articleJournalList[0].volume}</p>
                                        <p><strong>Issue</strong>: {modalText.articleJournalList[0].issue}</p>
                                        <p><strong>CitedMedium</strong>: {modalText.articleJournalList[0].citedMedium}</p>
                                    </AccordionItem>
                                    : <div />}
                                {modalText.languageList !== undefined ?
                                    <AccordionItem title="Language">
                                        <p><strong>Language</strong>: {modalText.languageList[0].language}</p>
                                    </AccordionItem>
                                    : <div />}
                                {modalText.articleGrantList !== undefined ?
                                    <AccordionItem title="Grant">
                                        <StructuredListWrapper isCondensed={true}>
                                            <StructuredListHead>
                                                <StructuredListRow head tabIndex={0}>
                                                    <StructuredListCell head>Grant ID</StructuredListCell>
                                                    <StructuredListCell head>Agency</StructuredListCell>
                                                    <StructuredListCell head>Country</StructuredListCell>
                                                    <StructuredListCell head>Acronym</StructuredListCell>
                                                </StructuredListRow>
                                            </StructuredListHead>
                                            <StructuredListBody>
                                                {Object.keys(modalText.articleGrantList).map(tagIndex => {
                                                    return(
                                                        <StructuredListRow key={tagIndex} tabIndex={0}>
                                                            <StructuredListCell key={"ui" + tagIndex}>{modalText.articleGrantList[tagIndex].grantID}</StructuredListCell>
                                                            <StructuredListCell key={"name" + tagIndex}>{modalText.articleGrantList[tagIndex].grantAgency.agency}</StructuredListCell>
                                                            <StructuredListCell key={"name" + tagIndex}>{modalText.articleGrantList[tagIndex].grantAgency.country}</StructuredListCell>
                                                            <StructuredListCell key={"name" + tagIndex}>{modalText.articleGrantList[tagIndex].grantAgency.acronym}</StructuredListCell>
                                                        </StructuredListRow>
                                                    );
                                                })}
                                            </StructuredListBody>
                                        </StructuredListWrapper>
                                    </AccordionItem>
                                    : <div />}
                                {modalText.meshHeadingList !== undefined ?
                                    <AccordionItem title="Mesh Heading">
                                        <StructuredListWrapper isCondensed={true}>
                                            <StructuredListHead>
                                                <StructuredListRow head tabIndex={0}>
                                                    <StructuredListCell head>UI</StructuredListCell>
                                                    <StructuredListCell head>Name</StructuredListCell>
                                                </StructuredListRow>
                                            </StructuredListHead>
                                            <StructuredListBody>
                                                {Object.keys(modalText.meshHeadingList).map(tagIndex => {
                                                    return(
                                                        <StructuredListRow key={tagIndex} tabIndex={0}>
                                                            <StructuredListCell key={"ui" + tagIndex}>{modalText.meshHeadingList[tagIndex].ui}</StructuredListCell>
                                                            <StructuredListCell key={"name" + tagIndex}>{modalText.meshHeadingList[tagIndex].name}</StructuredListCell>
                                                        </StructuredListRow>
                                                    );
                                                })}
                                            </StructuredListBody>
                                        </StructuredListWrapper>
                                    </AccordionItem>
                                    : <div />}
                            </Accordion>
                        </Tab>
                        <Tab id="tab-2" label="Tags">
                            <Tabs selected={selectedTab} light={true}>
                                <Tab index={0} id="sub-tab-1" label="Tags" onClick={() => setSelectedTab(0)}>
                                    {modalText.articleTagList !== undefined ?
                                        <StructuredListWrapper isCondensed={true}>
                                            <StructuredListHead>
                                                <StructuredListRow head tabIndex={0}>
                                                    <StructuredListCell head>CUI</StructuredListCell>
                                                    <StructuredListCell head>Preferred Name</StructuredListCell>
                                                    <StructuredListCell head>Score</StructuredListCell>
                                                    <StructuredListCell head>Semantic Type</StructuredListCell>
                                                    <StructuredListCell head>Position</StructuredListCell>
                                                    <StructuredListCell head>PositionalInfo</StructuredListCell>
                                                    <StructuredListCell head>TreeCodes</StructuredListCell>
                                                    <StructuredListCell head>TriggerInfo</StructuredListCell>
                                                </StructuredListRow>
                                            </StructuredListHead>
                                            <StructuredListBody>
                                                {Object.keys(modalText.articleTagList).map(tagIndex => {
                                                    return(
                                                        <StructuredListRow key={tagIndex} tabIndex={0}>
                                                            <StructuredListCell key={"cui" + tagIndex}><Link onClick={() => createGraph(modalText.articleTagList[tagIndex].tag.cui, modalText.articleTagList[tagIndex])}>{modalText.articleTagList[tagIndex].tag.cui}</Link></StructuredListCell>
                                                            <StructuredListCell key={"pfname" + tagIndex}>{modalText.articleTagList[tagIndex].tag.preferredName}</StructuredListCell>
                                                            <StructuredListCell key={"score" + tagIndex}>{modalText.articleTagList[tagIndex].score}</StructuredListCell>
                                                            <StructuredListCell key={"tag" + tagIndex}>{modalText.articleTagList[tagIndex].tag.semanticType}</StructuredListCell>
                                                            <StructuredListCell key={"position" + tagIndex}>{modalText.articleTagList[tagIndex].position}</StructuredListCell>
                                                            <StructuredListCell key={"postioninfor" + tagIndex}>{modalText.articleTagList[tagIndex].positionalInfo}</StructuredListCell>
                                                            <StructuredListCell style={{wordWrap: "break-word"}} key={"treecodes" + tagIndex}>{modalText.articleTagList[tagIndex].treeCodes}</StructuredListCell>
                                                            <StructuredListCell key={"trigger" + tagIndex}>{modalText.articleTagList[tagIndex].triggerInfo}</StructuredListCell>
                                                        </StructuredListRow>
                                                    );
                                                })}
                                            </StructuredListBody>
                                        </StructuredListWrapper>
                                        : <div />}
                                </Tab>
                                <Tab index={1} id="sub-tab-2" label="Graph">
                                    <div className="bx--grid">
                                        {dataLoaded ?
                                            <>
                                            <div className="bx--row" style={{ marginBottom: '2rem' }}>
                                                <div className="bx--col">
                                                    <strong>Tag</strong>:&#160;{selectedCUI.tag.cui}&#160;({selectedCUI.tag.preferredName})&#160;-&#160;<strong>Score</strong>:&#160;{selectedCUI.score}
                                                </div>
                                            </div>
                                            <div className="bx--row" style={{ marginBottom: '0.5rem' }}>
                                                <div className="bx--col-lg-2">
                                                    Nodes
                                                </div>
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
                                            <div className="bx--row" style={{ marginBottom: '2rem' }}>
                                                <div className="bx--col">
                                                    <ForceGraph3D
                                                        graphData={data.elements}
                                                        nodeLabel={node => {
                                                            if (node.label === 'Tag') {
                                                                return `<p style="color: black">${node.properties.preferredName}</p>`;
                                                            }
                                                            if (node.label === 'Article') {
                                                                return `<p style="color: black">${node.properties.articleTitle}</p>`;
                                                            }
                                                            if (node.label === 'Journal') {
                                                                return `<p style="color: black">${node.properties.title}</p>`;
                                                            }
                                                            return `<p style="color: black">${node.pk}</p>`;
                                                        }}
                                                        linkLabel={link => `<p style="color: black">${link.label}</p>`}
                                                        backgroundColor="#FFF"
                                                        nodeThreeObject={node => {
                                                            if (selectedType === null) {
                                                                return new Mesh(new SphereGeometry(5),
                                                                    new MeshLambertMaterial({
                                                                        color: node.backgroundColor,
                                                                        transparent: true,
                                                                        opacity: 1
                                                                    })
                                                                )
                                                            } else {
                                                                if (node.label === selectedType) {
                                                                    return new Mesh(new SphereGeometry(5),
                                                                        new MeshLambertMaterial({
                                                                            color: node.backgroundColor,
                                                                            transparent: true,
                                                                            opacity: 1
                                                                        }))
                                                                } else {
                                                                    return new Mesh(new SphereGeometry(5),
                                                                        new MeshLambertMaterial({
                                                                            color: node.backgroundColor,
                                                                            transparent: true,
                                                                            opacity: 0.3
                                                                        })
                                                                    )
                                                                }
                                                            }
                                                        }}
                                                        nodeColor={node => `${node.backgroundColor}`}
                                                        linkColor={link => `${link.backgroundColor}`}
                                                        linkDirectionalParticles={3}
                                                        onNodeClick={nodeClickHandler}
                                                        onLinkClick={linkClickHandler}
                                                        showNavInfo={true}
                                                        height={500}
                                                        width={1000}
                                                        nodeOpacity={1}
                                                        linkWidth={1.3}
                                                        enableNavigationControls={true}
                                                        onBackgroundClick={() => setSelectedType(null)}
                                                        nodeThreeObjectExtend={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="bx--row" style={{ marginBottom: '2rem' }}>
                                                <div className="bx--col">
                                                    <div className="bx--row">
                                                        <div className="bx--col" style={{ marginTop: '-0.5rem' }}>
                                                            {selectedObj!==null ?
                                                                <Tag type={selectedObj['tagColor']} title={selectedObj.label}> {selectedObj.label} </Tag>
                                                                : <div />}
                                                        </div>
                                                    </div>
                                                    <div className="bx--row" style={{ marginBottom: '2rem' }}>
                                                        <div className="bx--col">
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
                                                </div>
                                            </div>
                                            </>
                                            : <div />}
                                    </div>
                                </Tab>
                            </Tabs>
                        </Tab>
                        <Tab id="tab-3" label="Reference">
                            {modalText.articleReferenceList !== undefined ?
                                <StructuredListWrapper isCondensed={true}>
                                    <StructuredListHead>
                                        <StructuredListRow head tabIndex={0}>
                                            <StructuredListCell head>citation</StructuredListCell>
                                            <StructuredListCell head>IDs</StructuredListCell>
                                        </StructuredListRow>
                                    </StructuredListHead>
                                    <StructuredListBody>
                                        {Object.keys(modalText.articleReferenceList).map(tagIndex => {
                                            return(
                                                <StructuredListRow tabIndex={0}>
                                                    <StructuredListCell>{modalText.articleReferenceList[tagIndex].citation}</StructuredListCell>
                                                    <StructuredListCell>
                                                        {Object.keys(modalText.articleReferenceList[tagIndex].articleIDList).map(idIndex => {
                                                            if (modalText.articleReferenceList[tagIndex].articleIDList[idIndex].type === "pubmed") {
                                                                return(
                                                                    <Link href={"https://pubmed.ncbi.nlm.nih.gov/" + modalText.articleReferenceList[tagIndex].articleIDList[idIndex].articleId + "/"} target="_blank" renderIcon={DashboardReference16}>
                                                                        {modalText.articleReferenceList[tagIndex].articleIDList[idIndex].articleId}&#160;
                                                                        ({modalText.articleReferenceList[tagIndex].articleIDList[idIndex].type})
                                                                    </Link>
                                                                );
                                                            } else {
                                                                return(
                                                                    <p>{modalText.articleReferenceList[tagIndex].articleIDList[idIndex].type}:
                                                                        {modalText.articleReferenceList[tagIndex].articleIDList[idIndex].articleId}</p>
                                                                );
                                                            }})}
                                                    </StructuredListCell>
                                                </StructuredListRow>
                                            );
                                        })}
                                    </StructuredListBody>
                                </StructuredListWrapper>
                                : <p />}
                        </Tab>
                        <Tab id="tab-4" label="Link ID">
                            {modalText.articleIDList !== undefined ?
                                <StructuredListWrapper isCondensed={true}>
                                    <StructuredListHead>
                                        <StructuredListRow head tabIndex={0}>
                                            <StructuredListCell head>Type</StructuredListCell>
                                            <StructuredListCell head>ID</StructuredListCell>
                                        </StructuredListRow>
                                    </StructuredListHead>
                                    <StructuredListBody>
                                        {Object.keys(modalText.articleIDList).map(tagIndex => {
                                            if (modalText.articleIDList[tagIndex].type === "pubmed") {
                                                return(
                                                    <StructuredListRow tabIndex={0}>
                                                        <StructuredListCell>{modalText.articleIDList[tagIndex].type}</StructuredListCell>
                                                        <StructuredListCell>
                                                            <Link href={"https://pubmed.ncbi.nlm.nih.gov/" + modalText.articleIDList[tagIndex].articleId + "/"} target="_blank" renderIcon={DashboardReference16}>
                                                                {modalText.articleIDList[tagIndex].articleId}
                                                            </Link>
                                                        </StructuredListCell>
                                                    </StructuredListRow>
                                                );
                                            } if (modalText.articleIDList[tagIndex].type === "doi") {
                                                return(
                                                    <StructuredListRow tabIndex={0}>
                                                        <StructuredListCell>{modalText.articleIDList[tagIndex].type}</StructuredListCell>
                                                        <StructuredListCell>
                                                            <Link href={"https://doi.org/" + modalText.articleIDList[tagIndex].articleId} target="_blank" renderIcon={DashboardReference16}>
                                                                {modalText.articleIDList[tagIndex].articleId}
                                                            </Link>
                                                        </StructuredListCell>
                                                    </StructuredListRow>
                                                );
                                            } if (modalText.articleIDList[tagIndex].type === "pmc") {
                                                return(
                                                    <StructuredListRow tabIndex={0}>
                                                        <StructuredListCell>{modalText.articleIDList[tagIndex].type}</StructuredListCell>
                                                        <StructuredListCell>
                                                            <Link href={"https://www.ncbi.nlm.nih.gov/pmc/articles/" + modalText.articleIDList[tagIndex].articleId + "/"} target="_blank" renderIcon={DashboardReference16}>
                                                                {modalText.articleIDList[tagIndex].articleId}
                                                            </Link>
                                                        </StructuredListCell>
                                                    </StructuredListRow>
                                                );
                                            } else {
                                                return(
                                                    <StructuredListRow tabIndex={0}>
                                                        <StructuredListCell>{modalText.articleIDList[tagIndex].type}</StructuredListCell>
                                                        <StructuredListCell>{modalText.articleIDList[tagIndex].articleId}</StructuredListCell>
                                                    </StructuredListRow>
                                                );
                                            }
                                        })}
                                    </StructuredListBody>
                                </StructuredListWrapper>
                                : <p />}
                        </Tab>
                        <Tab id="tab-5" label="PubMed Status">
                            <StructuredListWrapper isCondensed={true}>
                                <StructuredListHead>
                                    <StructuredListRow head tabIndex={0}>
                                    </StructuredListRow>
                                </StructuredListHead>
                                <StructuredListBody>
                                    <StructuredListRow tabIndex={0}>
                                        <StructuredListCell head>owner</StructuredListCell>
                                        <StructuredListCell>{modalText.owner}</StructuredListCell>
                                    </StructuredListRow>
                                    <StructuredListRow tabIndex={0}>
                                        <StructuredListCell head>status</StructuredListCell>
                                        <StructuredListCell>{modalText.status}</StructuredListCell>
                                    </StructuredListRow>
                                    <StructuredListRow tabIndex={0}>
                                        <StructuredListCell head>cancellationDate</StructuredListCell>
                                        <StructuredListCell>{modalText.cancellationDate}</StructuredListCell>
                                    </StructuredListRow>
                                    <StructuredListRow tabIndex={0}>
                                        <StructuredListCell head>dateCompleted</StructuredListCell>
                                        <StructuredListCell>{modalText.dateCompleted}</StructuredListCell>
                                    </StructuredListRow>
                                    <StructuredListRow tabIndex={0}>
                                        <StructuredListCell head>dateRevised</StructuredListCell>
                                        <StructuredListCell>{modalText.dateRevised}</StructuredListCell>
                                    </StructuredListRow>
                                    <StructuredListRow tabIndex={0}>
                                        <StructuredListCell head>pubModel</StructuredListCell>
                                        <StructuredListCell>{modalText.pubModel}</StructuredListCell>
                                    </StructuredListRow>
                                    <StructuredListRow tabIndex={0}>
                                        <StructuredListCell head>medlinePgn</StructuredListCell>
                                        <StructuredListCell>{modalText.medlinePgn}</StructuredListCell>
                                    </StructuredListRow>
                                    <StructuredListRow tabIndex={0}>
                                        <StructuredListCell head>copyrightInformation</StructuredListCell>
                                        <StructuredListCell>{modalText.copyrightInformation}</StructuredListCell>
                                    </StructuredListRow>
                                    <StructuredListRow tabIndex={0}>
                                        <StructuredListCell head>publicationStatus</StructuredListCell>
                                        <StructuredListCell>{modalText.publicationStatus}</StructuredListCell>
                                    </StructuredListRow>
                                </StructuredListBody>
                            </StructuredListWrapper>
                            <Accordion>
                                <AccordionItem title="History">
                                    {modalText.articleHistoryList !== undefined ?
                                        <StructuredListWrapper isCondensed={true}>
                                            <StructuredListHead>
                                                <StructuredListRow head tabIndex={0}>
                                                    <StructuredListCell head>Date</StructuredListCell>
                                                    <StructuredListCell head>Status</StructuredListCell>
                                                </StructuredListRow>
                                            </StructuredListHead>
                                            <StructuredListBody>
                                                {Object.keys(modalText.articleHistoryList).map(tagIndex => {
                                                    return(
                                                        <StructuredListRow tabIndex={0}>
                                                            <StructuredListCell>{modalText.articleHistoryList[tagIndex].date}</StructuredListCell>
                                                            <StructuredListCell>{modalText.articleHistoryList[tagIndex].status}</StructuredListCell>
                                                        </StructuredListRow>
                                                    );
                                                })}
                                            </StructuredListBody>
                                        </StructuredListWrapper>
                                        : <p />}
                                </AccordionItem>
                            </Accordion>
                        </Tab>
                    </Tabs>
                </ModalBody>
            </ComposedModal>
            <div className="bx--grid">
                <div className="bx--row" style={{ marginBottom: '2rem' }}>
                    <div className="bx--col">
                        <div className="bx--row" style={{ marginBottom: '2rem' }}>
                            <div className="bx--col-lg-10">
                                <Search labelText="Search" id="search" value={searchingText} onChange={handleInput} />
                            </div>
                            <div className="bx--col">
                                <Button kind="primary" onClick={handleButton}>Search</Button>
                            </div>
                        </div>
                        <div className="bx--row" style={{ marginBottom: '2rem' }}>
                            <div className="bx--col-lg-3">
                                <Tile>
                                    <div className="bx--row" style={{ marginBottom: '2rem' }}>
                                        <div className="bx--col">
                                            Filter
                                        </div>
                                    </div>
                                    <div className="bx--row" style={{ marginBottom: '2rem' }}>
                                        <div className="bx--col">
                                            <div className="bx--row" style={{ marginBottom: '2rem' }}>
                                                <div className="bx--col">
                                                    <DatePicker light dateFormat="Y" datePickerType="range"
                                                                onChange={handleDateInput}
                                                                maxDate={new Date().getDate() + "/" + new Date().getMonth() + "/" + (new Date().getFullYear())}>
                                                        <DatePickerInput
                                                            id="date-picker-input-id-start"
                                                            placeholder="yyyy"
                                                            labelText="Start date"
                                                        />
                                                        <DatePickerInput
                                                            id="date-picker-input-id-finish"
                                                            placeholder="yyyy"
                                                            labelText="End date"
                                                        />
                                                    </DatePicker>
                                                </div>
                                            </div>
                                            <div className="bx--row" style={{ marginBottom: '2rem' }}>
                                                <div className="bx--col">
                                                    <Button kind="primary" onClick={handleFilterButton}>Apply</Button>
                                                </div>
                                            </div>
                                            <div className="bx--row" style={{ marginBottom: '2rem' }}>
                                            </div>
                                        </div>
                                    </div>
                                </Tile>
                            </div>
                            <div className="bx--col">
                                {searchedDataLoaded ?
                                    Object.keys(searchedData).map(field => {
                                        return(
                                            <Tile style={{ marginBottom: '1rem' }} key={field}>
                                                <div className="bx--grid">
                                                    <div className="bx--row" style={{ marginBottom: '1rem' }}>
                                                        <div className="bx--col">
                                                            <h4>
                                                                <Highlighter
                                                                    searchWords={removeUselessWords(searchedText).split(' ')}
                                                                    autoEscape={true}
                                                                    textToHighlight={searchedData[field].title}
                                                                    highlightStyle={{ fontWeight: "bold", backgroundColor: "#f7f3f2"}}
                                                                />
                                                            </h4>
                                                        </div>
                                                    </div>
                                                    <div className="bx--row" style={{ marginBottom: '1rem' }}>
                                                        <div className="bx--col">
                                                            <strong>Authors</strong>:&#160;
                                                            {Object.keys(searchedData[field].articleAuthorList).map(authorIndex => {
                                                                return(
                                                                    <>
                                                                        <Link
                                                                            key={authorIndex}
                                                                            onClick={() => makeSearchTypeRequest(searchedData[field].articleAuthorList[authorIndex].author.lastName, "author")}>
                                                                            {searchedData[field].articleAuthorList[authorIndex].author.foreName + ". " +
                                                                            searchedData[field].articleAuthorList[authorIndex].author.lastName + ", "}
                                                                        </Link><>&#160;</>
                                                                    </>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="bx--row" style={{ marginBottom: '1rem' }}>
                                                        <div className="bx--col">
                                                            <strong>Pmid</strong>:&#160;
                                                            <Link style={{ color: 'black' }} href={"https://pubmed.ncbi.nlm.nih.gov/" + searchedData[field].id + "/"} target="_blank" renderIcon={DashboardReference16}>{searchedData[field].id}</Link>
                                                        </div>
                                                    </div>
                                                    <div className="bx--row" style={{ marginBottom: '1rem' }}>
                                                        <div className="bx--col">
                                                            <strong>Published</strong>:&#160;
                                                            <Link
                                                                onClick={() => makeSearchTypeRequest(searchedData[field].articleJournalList[0].journal.title, "journal")}>
                                                                {searchedData[field].articleJournalList[0].journal.title}</Link> (
                                                            {searchedData[field].articleJournalList[0].pubDate})
                                                        </div>
                                                    </div>
                                                    <div className="bx--row" style={{ marginBottom: '1rem', textAlign: 'justify'}}>
                                                        <div className="bx--col">
                                                            <strong>Abstract</strong>:
                                                            <Highlighter
                                                                searchWords={removeUselessWords(searchedText).split(' ')}
                                                                autoEscape={true}
                                                                textToHighlight={searchedData[field].anAbstract !== null ? (searchedData[field].anAbstract.length > 1000 ? searchedData[field].anAbstract.substring(0, 1000) + "..." : searchedData[field].anAbstract) : ""}
                                                                highlightStyle={{ fontWeight: "bold", backgroundColor: "#f7f3f2"}}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="bx--row" style={{ marginBottom: '1rem' }}>
                                                        <div className="bx--col">
                                                            <strong>Tags</strong>:&#160;
                                                            {Object.keys(searchedData[field].articleTagList).sort((a, b) => a.score < b.score ? 1 : -1).slice(0, 10).map(tagIndex => {
                                                                return(
                                                                    <Tag type="blue" title="Tag" key={tagIndex} style={{ padding: '0.3rem', fontSize: '0.6rem', height: '0.3rem' }}
                                                                         onClick={() => makeSearchTypeRequest(searchedData[field].articleTagList[tagIndex].tag.cui, "")}>
                                                                        <TooltipDefinition key={"tool" + tagIndex}
                                                                                           tooltipText={searchedData[field].articleTagList[tagIndex].tag.preferredName}
                                                                                           direction="top"
                                                                                           align="center">
                                                                            {searchedData[field].articleTagList[tagIndex].tag.cui}
                                                                        </TooltipDefinition>
                                                                    </Tag>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="bx--row">
                                                        <div className="bx--col-lg-15 bx--col-md-7 bx--col-sm-3" />
                                                        <div className="bx--col-sm-1 bx--col-md-1 bx--col-lg-1">
                                                            <Link onClick={() => onDetailsClick(searchedData[field].id)} renderIcon={ArrowRight16}>Details</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tile>
                                        );
                                    }) : <div /> }
                            </div>
                        </div>
                        <div className="bx--row" style={{ marginBottom: '2rem' }}>
                            <div className="bx--col-lg-4">
                            </div>
                            <div className="bx--col">
                                {searchedDataLoaded ?
                                    <Pagination key={currentPage}
                                                backwardText="Previous page"
                                                forwardText="Next page"
                                                itemsPerPageText="Items per page:"
                                                page={1}
                                                pageNumberText="Page Number"
                                                pageSize={20}
                                                pageSizes={[20, 40, 60]}
                                                totalItems={totalResults}
                                                onChange={onPageChange}
                                    />
                                    : <div /> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchPage