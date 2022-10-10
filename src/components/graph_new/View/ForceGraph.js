import React from "react";
import GraphContext from "../../../context/GraphContext";
import {ForceGraph3D} from "react-force-graph";
import {Mesh, MeshLambertMaterial, SphereGeometry} from "three";
import GraphTable from "../GraphTable";
import {ComposedModal, Link, ModalBody, ModalHeader} from "carbon-components-react";
import {DashboardReference16} from "@carbon/icons-react";


const ForceGraph = () => {

    const {data, dataLoaded, selectedObj, setSelectedObj, selectedType, setSelectedType, setModalOpen} = React.useContext(GraphContext)

    const nodeClickHandler = (node, event) => {
        setSelectedObj(node)
        setModalOpen(true)
    }

    const linkClickHandler = (link, event) => {
        setSelectedObj(link);
        setModalOpen(true)
    }

    return React.useMemo(() => {
        return(
            <div className="bx--grid">
                {dataLoaded ?
                    <div className="bx--row" style={{ marginBottom: '2rem' }}>
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
                            backgroundColor="#f4f4f4"
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
                            height={970}
                            width={1370}
                            nodeOpacity={1}
                            linkWidth={1.3}
                            enableNavigationControls={true}
                            onBackgroundClick={() => setSelectedType(null)}
                            nodeThreeObjectExtend={true}
                        />
                    </div>
                : <div />}
            </div>
        );
    }, [data, dataLoaded, selectedType, selectedObj]);
}

export default ForceGraph