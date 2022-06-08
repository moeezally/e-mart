import React, {useState, useEffect, useRef} from "react";
import {Card, Button, Modal, Form, Col} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import axios, {Axios} from "axios";
import {useDispatch, useSelector} from "react-redux";
import {createGarden, getGardens} from "../../actions/gardenActions";


function Garden() {

    const history = useHistory();

    const [gardens, setGardens] = useState([]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const handleClose = () => setShowCreateModal(false);
    const handleShow = () => setShowCreateModal(true);

    const [CreateImage, setCreateImage] = useState("");
    const [CreateImageFile, setCreateImageFile] = useState("");
    const [CreateName, setCreateName] = useState("");
    const [CreateDescription, setCreateDescription] = useState("");
    const [CreateRow, setCreateRow] = useState(2);
    const [CreateCol, setCreateCol] = useState(2);

    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch()

    const {data} = useSelector((state) => state.gardenList)
    const {data: gardenItemAdded} = useSelector((state) => state.gardenCreateList)

    useEffect(() => {
        dispatch(getGardens());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getGardens());
        handleClose();
    }, [gardenItemAdded]);

    useEffect(() => {
        setGardens(data);
    }, [data]);

    function submitCreateFormData(image_id) {
        const grid = [];
        for (let i = 0; i < CreateRow; i++) {
            for (let j = 0; j < CreateCol; j++) {
                grid.push({
                    'r': i, 'c': j, 'plant': null
                });
            }
        }
        const data = {
            'name': CreateName, 'description': CreateDescription, 'grid': grid, 'rows': CreateRow, 'cols': CreateCol,
        }
        if (image_id) data['image'] = image_id;

        dispatch(createGarden(data));
    }

    function handleCreateGarden(e) {
        if (CreateImageFile === "") {
            submitCreateFormData(null);
            e.preventDefault();
            return;
        }
        const formData = new FormData()
        formData.append('image', CreateImageFile)
        axios.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(({data}) => {
            submitCreateFormData(data);
        })
        e.preventDefault();
    }

    return <>
    
        <div>
            <Modal show={showCreateModal} onHide={handleClose} centered>
                <Form onSubmit={handleCreateGarden}>
                    <Modal.Header closeButton>
                        
                        <Modal.Title>Create New Garden</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId='name' style={{margin: 10}}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Garden name'
                                value={CreateName}
                                onChange={(e) => setCreateName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId='desciption' style={{margin: 10}}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                type='text'
                                value={CreateDescription}
                                onChange={(e) => setCreateDescription(e.target.value)}
                                placeholder='description'
                            />
                        </Form.Group>
                        <div className="d-flex">
                            <Form.Group controlId='column' style={{margin: 10}}>
                                <Form.Label>Column</Form.Label>
                                <Form.Control
                                    type='number'
                                    value={CreateCol}
                                    onChange={(e) => setCreateCol(Number(e.target.value))}
                                    required
                                    min='0'
                                />
                            </Form.Group>
                            <Form.Group controlId='row' style={{margin: 10}}>
                                <Form.Label>Row</Form.Label>
                                <Form.Control
                                    type='number'
                                    value={CreateRow}
                                    onChange={(e) => setCreateRow(Number(e.target.value))}
                                    required
                                    min='0'
                                />
                            </Form.Group>
                        </div>
                        <Form.Group controlId='image' style={{margin: 10   }}>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                
              ></Form.Control>
                            <Form.File accept=".jpg, .png" custom label={CreateImage || "Upload Image"}
                                       onChange={(e) => {
                                           setCreateImage(e.target.value);
                                           setCreateImageFile(e.target.files[0]);
                                       }}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type='submit' variant="primary" style={{backgroundColor: '#1D4B2C'}}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <div className='d-flex align-items-center justify-content-between'>
                <div/>
                <div>
                    <h1 style={{textAlign: 'right', marginLeft: 50}}>Virtual Garden</h1>
                </div>
                <Button className='my-3' onClick={handleShow} style={{backgroundColor: '#1D4B2C'}}>
                    <i className='fas fa-plus'/> Create Garden
                </Button>
            </div>
            
            <Col  style={{textAlign:'center',paddingLeft:200,paddingRight:300}}>
            <div style={{color:'green'}}>
                Virtual Garden allows you to make a virtual replica of your garden.
                You can set the positioning of your plants and set a reference image.
                Details for the care of plants can also be seen upon hover.
            </div>
            </Col>
            <hr/>
            {/* <marquee behavior="scroll" direction="left" style={{color:'#00B761',marginBottom:-7}}>abc</marquee> */}
            <div className="row">
                {gardens && gardens.map(garden => <div
                    className="col-12 col-md-6 col-lg-4 w-full p-4 d-flex align-items-center justify-content-center">
                    <Card onClick={() => history.push(`/vg/${garden._id}`)} className="rounded-sm w-100"
                          role="button"
                          style={{width: '18rem'}}>
                        <Card.Img variant="top" style={{width:330,height:250 }}src={garden.image}/>
                        <Card.Body>
                            <Card.Title>{garden.name}</Card.Title>
                            <Card.Text>
                                {garden.description}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>)}
            </div>
        </div>
    </>
}

export default Garden;