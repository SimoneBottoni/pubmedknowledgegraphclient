// https://github.com/vasturiano/react-force-graph

import React, {useState} from 'react';
import {ForceGraph3D} from "react-force-graph";
import {Modal} from "carbon-components-react";

const TestGraph = () => {

    const [open, setOpen] = useState(false)
    const [modalText, setModalText] = useState("")

    const data = {
        "nodes":[
            {"id":"4062045", "test": "article", "asd": "This is a very looooooooooooooooooooooooooooooooooooooooooooooooong article title", "pmid":"12345", "title":"This is an article title", "abstract":"This is an article abstract"},
            {"id":"34567", "type": "article", "description": "This is a title", "pmid":"9876", "title":"This is a title", "abstract":"This is an abstract"},
            {"id":"1341021", "type": "author", "description":"John", "name": "John", "lastname": "lastname"},
            {"id":"1", "type": "reference", "description":"pmid", "pmid":"98765"},
            {"id":"2", "type": "reference", "description":"pmid", "pmid":"98765"},
            {"id":"3", "type": "reference", "description":"pmid", "pmid":"98765"},
            {"id":"4", "type": "reference", "description":"pmid", "pmid":"98765"},
            {"id":"5", "type": "reference", "description":"pmid", "pmid":"98765"},
            {"id":"6", "type": "reference", "description":"pmid", "pmid":"98765"},
            {"id":"7", "type": "reference", "description":"pmid", "pmid":"98765"},
            {"id":"8", "type": "reference", "description":"pmid", "pmid":"98765"},
            {"id":"9", "type": "reference", "description":"pmid", "pmid":"98765"},
            {"id":"10", "type": "reference", "description":"pmid", "pmid":"98765"},
            {"id":"11", "type": "reference", "description":"pmid", "pmid":"98765"},
            {"id":"12", "type": "reference", "description":"pmid", "pmid":"98765"},
            {"id":"13", "type": "reference", "description":"pmid", "pmid":"98765"},
            {"id":"14", "type": "reference", "description":"pmid", "pmid":"98765"},
            {"id":"15", "type": "reference", "description":"pmid", "pmid":"98765"},
            {"id":"16", "type": "reference", "description":"pmid", "pmid":"98765"},
            {"id":"17", "type": "reference", "description":"pmid", "pmid":"98765"},
            {"id":"18", "type": "reference", "description":"pmid", "pmid":"98765"},
            {"id":"19", "type": "reference", "description":"pmid", "pmid":"98765"},
            {"id":"20", "type": "reference", "description":"pmid", "pmid":"98765"},
        ],
        "links":[
            {"source":"1341021","target":"4062045", "type":"writes", "color": "blue"},
            {"source":"1341021","target":"34567", "type":"writes", "color": "blue"},
            {"source":"4062045","target":"1", "type":"has_reference", "color": "red"},
            {"source":"4062045","target":"2", "type":"has_reference", "color": "red"},
            {"source":"4062045","target":"3", "type":"has_reference", "color": "red"},
            {"source":"4062045","target":"4", "type":"has_reference", "color": "red"},
            {"source":"4062045","target":"5", "type":"has_reference", "color": "red"},
            {"source":"4062045","target":"6", "type":"has_reference", "color": "red"},
            {"source":"4062045","target":"7", "type":"has_reference", "color": "red"},
            {"source":"4062045","target":"8", "type":"has_reference", "color": "red"},
            {"source":"4062045","target":"9", "type":"has_reference", "color": "red"},
            {"source":"4062045","target":"10", "type":"has_reference", "color": "red"},
            {"source":"4062045","target":"11", "type":"has_reference", "color": "red"},
            {"source":"4062045","target":"12", "type":"has_reference", "color": "red"},
            {"source":"4062045","target":"13", "type":"has_reference", "color": "red"},
            {"source":"4062045","target":"14", "type":"has_reference", "color": "red"},
            {"source":"4062045","target":"15", "type":"has_reference", "color": "red"},
            {"source":"4062045","target":"16", "type":"has_reference", "color": "red"},
            {"source":"4062045","target":"17", "type":"has_reference", "color": "red"},
            {"source":"4062045","target":"18", "type":"has_reference", "color": "red"},
            {"source":"4062045","target":"19", "type":"has_reference", "color": "red"},
            {"source":"4062045","target":"20", "type":"has_reference", "color": "red"},
            {"source":"34567","target":"3", "type":"writes", "color": "green"},
            {"source":"34567","target":"9", "type":"writes", "color": "green"},
            {"source":"34567","target":"15", "type":"writes", "color": "white"}
        ]

    }

    const nodeClickHandler = (node, event) => {
        console.log(node)
        console.log(event)
        let text = [];
        Object.keys(node).map((label, index) => {
            switch (label) {
                case 'type':
                case 'description':
                case 'pmid':
                case 'title':
                case 'abstract':
                case 'name':
                case 'lastname':
                    text.push(<p>{label}: {node[label]}</p>);
                    console.log(text)
            }
        })
        setModalText(text)
        setOpen(true)
    }

    const linkClickHandler = (link, event) => {
        console.log(link)
        console.log(event)
    }

    const closeModal = () => {
        setOpen(false)
    }

    return (
        <div className="bx--grid">
            <Modal
                open={open}
                onRequestClose={closeModal}
                passiveModal
            >
                {modalText}
            </Modal>
            <div className="bx--row" style={{ marginBottom: '2rem' }}>
                <ForceGraph3D
                    graphData={data}
                    nodeLabel={node => `${node.type}: ${node.description}`}
                    linkLabel={link => `${link.type}`}
                    backgroundColor="#f4f4f4"
                    nodeAutoColorBy="type"
                    linkColor={link => `${link.color}`}
                    linkWidth={2}
                    linkDirectionalParticles={3}
                    onNodeClick={nodeClickHandler}
                    onLinkClick={linkClickHandler}
                    showNavInfo="true"
                    height={500}
                    width={650}
                    nodeResolution={128}
                    linkResolution={128}
                />
            </div>
        </div>
    );
}

export default TestGraph