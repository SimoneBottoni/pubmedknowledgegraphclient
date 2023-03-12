import React from "react";
import ForceGraph from './View/ForceGraph'
import {ComposedModal, ModalBody, ModalHeader} from "carbon-components-react";
import GraphTable from "./GraphTable";
import GraphContext from "../../context/GraphContext";

const GraphView = () => {

    const {modalOpen, setModalOpen} = React.useContext(GraphContext)

    const closeModal = () => {
        console.log("CALL CLOSE MODAL.")
        setModalOpen(false)
    }

    return (
        <div className="bx--grid">
            <div className="bx--row" style={{ marginBottom: '2rem' }}>
                <div className="bx--col">
                    <ComposedModal
                        size="lg"
                        open={modalOpen}
                        onClose={closeModal}
                        style={{ textAlign: 'justify'}}>
                        <ModalHeader>
                            <h4>Details:</h4><br />
                        </ModalHeader>
                        <ModalBody>
                            <GraphTable />
                        </ModalBody>
                    </ComposedModal>
                    <ForceGraph />
                </div>
            </div>
        </div>
    );
}

export default GraphView