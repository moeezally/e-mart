import React, {useState, useEffect} from "react";
import {Button, Card, Form, Modal, Tooltip} from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import {useDrag} from 'react-dnd'

export default function GardenCard({cell, updateCell, products}) {
    const [plantData, setPlantData] = useState(undefined);

    const [showProductModal, setShowProductModal] = useState(false);
    const handleClose = () => setShowProductModal(false);
    const handleShow = () => setShowProductModal(true);

    const [selectedPlant, setSelectedPlant] = useState("");

    const [{isDragging}, drag] = useDrag(() => {
        return ({
            type: 'card',
            canDrag: cell !== undefined,
            item: cell,
            collect: monitor => ({
                isDragging: !!monitor.isDragging(),
            }),
        })
    }, [cell])

    useEffect(() => {
        if (cell && products) {
            let prods = products.filter((prod) => prod._id === cell.plant);
            if (prods.length > 0) {
                setPlantData(prods[0]);
            }
        } else {
            setPlantData({})
        }
    }, [cell])

    function handleUpdatePlant(e) {
        let prods = products.filter((prod) => prod._id === selectedPlant);
        if (prods.length > 0) {
            updateCell(cell, prods[0]._id);
        }
        handleClose();
        e.preventDefault();
    }

    return <>
        <div>
            {cell && <div className='h-100 w-100'>
                <Modal show={showProductModal} onHide={handleClose} centered>
                    <Form onSubmit={(e) => handleUpdatePlant(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Select Plant</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>Plant</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedPlant}
                                    onChange={(e) =>
                                        setSelectedPlant(e.target.value)
                                    }
                                >
                                    {products && products.map((prod) => (
                                        <option value={prod._id}>{prod.name}</option>))}
                                </Form.Control>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button onClick={() => {
                                updateCell(cell, null);
                                handleClose();
                            }} variant="outline-danger">
                                Remove Plant
                            </Button>
                            <Button type='submit' variant="primary" style={{backgroundColor: '#1D4B2C'}}>
                                Update
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                {cell.plant && plantData &&
                    <OverlayTrigger trigger={["hover", "focus"]}
                                    placement="auto"
                                    delay={{show: 700, hide: 0}}
                                    overlay={(props) => (<Tooltip {...props}>
                                        {plantData && plantData.care}
                                    </Tooltip>)}>
                        <div ref={drag} onClick={() => {
                            setSelectedPlant(cell !== undefined ? cell.plant : '');
                            handleShow();
                        }} className="rounded-sm overflow-hidden border" style={{
                            opacity: isDragging ? 0.5 : 1,
                            fontSize: 25,
                            fontWeight: 'bold',
                            cursor: cell ? 'move' : 'pointer',
                            width: '150px',
                            height: '150px'
                        }}>
                            <div>
                                <img style={{objectFit: "contain", width: '150px', height: '150px'}}
                                     src={plantData.image}
                                     alt={'image'}/>
                            </div>
                        </div>
                    </OverlayTrigger>
                }
                {!cell.plant &&
                    <div onClick={() => {
                        setSelectedPlant(products && products.length > 0 ? products[0]._id : '');
                        handleShow();
                    }} className='d-flex align-items-center justify-content-center rounded-sm border' style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        cursor: cell ? 'move' : 'pointer',
                        width: '150px',
                        height: '150px',
                    }}>
                        <svg style={{opacity: 0.3,}} xmlns="http://www.w3.org/2000/svg" width="64" height="64"
                             fill="currentColor"
                             className="bi bi-plus-square-dotted" viewBox="0 0 16 16">
                            <path
                                d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                        </svg>
                    </div>}
            </div>}
        </div>
    </>;
}