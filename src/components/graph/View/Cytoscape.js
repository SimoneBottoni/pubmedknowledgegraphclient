import CytoscapeJS from 'cytoscape'
import CytoscapeComponent from "react-cytoscapejs/src";
import React from "react";
import GraphContext from "../../../context/GraphContext";

import COSEBilkent from 'cytoscape-cose-bilkent'
import {cytoscapeStyle} from "./CytoscapeStyle";

CytoscapeJS.use(COSEBilkent);

const Cytoscape = () => {

    const {data, dataLoaded, selectedObj, setSelectedObj, selectedType, setSelectedType} = React.useContext(GraphContext)

    const initLocation = {};
    const layout = {
        name: 'cose-bilkent',
        quality: 'default',
        fit: true,
        padding: 0,
        nodeRepulsion: 10000,
        animate: 'end',
        animationDuration: 500,
        idealEdgeLength: 100,
        refresh: 30,
        tile: true,
        position(node) {
            return { row: node.data('row'), col: node.data('col') }
        },
        stop(event) {
            event.cy.nodes().forEach((ele) => {
                initLocation[ele.id()] = { x: ele.position().x, y: ele.position().y };
            });
        },
    }

    const cyFunction = (cy, target) => {
        if (selectedType!==null) {
            cy.nodes().style('border-color', '#FFF');
            cy.nodes('node[label = "' + selectedType + '"]').style('border-color', '#000');
            if (target!==null) {
                target.style('border-color', '#0f62fe');
            } else {
                if (selectedObj!==null) {
                    cy.$('node:selected').style('border-color', '#0f62fe');
                }
            }
        }
    }

    return React.useMemo(() => {
        return(
            <CytoscapeComponent
                minZoom={0.3}
                maxZoom={1.5}
                elements={dataLoaded ? CytoscapeComponent.normalizeElements(data.elements) : []}
                style={ { width: '100%', height: '500px' } }
                stylesheet={cytoscapeStyle}
                cy={cy => {
                    cyFunction(cy, null);
                    cy.on('tap', function(evt){
                        if( evt.target === cy ){
                            cy.nodes().style('border-color', '#FFF');
                            setSelectedType(null);
                            setSelectedObj(null);
                        }
                    });
                    cy.on('tap', 'node', (evt) => {
                        setSelectedObj(evt.target._private.data);
                        if (selectedType!==null) {
                            cyFunction(cy, evt.target);
                        } else {
                            cy.nodes().style('border-color', '#FFF');
                            evt.target.style('border-color', '#0f62fe');
                        }
                    });
                    cy.on('tap', 'edge', (evt) => {
                        setSelectedObj(evt.target._private.data);
                    });
                }}
                layout={layout}
            />
        );
    }, [data, dataLoaded, selectedType, selectedObj]);
}

export default Cytoscape