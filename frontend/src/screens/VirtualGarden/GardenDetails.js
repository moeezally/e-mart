import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom/cjs/react-router-dom";
import {listProductsByCategory} from "../../actions/productActions";
import {Form, Button,Col} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import GardenCard from "./GardenCard";

import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import GardenCell from "./GardenCell";
import {deleteGarden, getSingleGarden, updateGarden} from "../../actions/gardenActions";
import {GARDEN_GET_SINGLE} from "../../constants/gardenConstants";
import axios from "axios";

export default function GardenDetails({match}) {
    const loc = useLocation();

    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productCategoryList);
    const {loading, error, products} = productList

    const {data} = useSelector((state) => state.gardenDetail);

    const {data: deletedData} = useSelector((state) => state.gardenDelete);

    const [gardenImageFile, setGardenImageFile] = useState('');

    const [garden, setGarden] = useState(undefined);

    useEffect(() => {
        dispatch(listProductsByCategory('Plants'))
    }, [dispatch])

    useEffect(() => {
        console.log(products);
        dispatch(getSingleGarden(match.params.id));
    }, [products]);

    useEffect(() => {
        setGarden(data)
    }, [data]);

    useEffect(() => {
        if (deletedData)
            history.push('/vg');
    }, [deletedData])

    const history = useHistory();

    function submitHandler(e) {
        if (gardenImageFile === '') {
            dispatch(updateGarden(garden));
        } else {
            const formData = new FormData()
            formData.append('image', gardenImageFile)
            axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then(({data}) => {
                garden['image'] = data;
                dispatch(updateGarden(garden));
                e.preventDefault();
            })
        }
        e.preventDefault();
    }

    function handleDeleteGarden(id) {
        dispatch(deleteGarden(id));
    }

    function replaceCell(r, c, dragged) {
        console.log(`replacing ${r}, ${c} with ${dragged.r}, ${dragged.c}`)
        if (r !== dragged.r || c !== dragged.c) {
            // removing old_item if exist and dragged item
            let new_grid = garden.grid.filter((item) => dragged['_id'] !== item['_id']);
            new_grid = new_grid.filter((item) => !(item['r'] === r && item['c'] === c));

            let old = getCell(r, c);
            if (old) {
                new_grid.push({'_id': old['_id'], 'r': dragged.r, 'c': dragged.c, 'plant': old.plant})
                new_grid.push({'_id': dragged['_id'], 'r': old.r, 'c': old.c, 'plant': dragged.plant})
            }

            dispatch(updateGarden({...garden, grid: new_grid}));
        }
    }

    function getCell(r, c) {
        let objs = garden.grid.filter((item) => item.r === r && item.c === c);
        if (objs.length > 0) {
            return objs[0];
        }
    }

    function updateCell(cell, plant_id) {
        let objs = garden.grid.filter((item) => !(item.r === cell.r && item.c === cell.c));
        let x = {'r': cell.r, 'c': cell.c, 'plant': plant_id};
        if (cell['_id']) x['_id'] = cell['_id'];
        objs.push(x);
        dispatch(updateGarden({...garden, grid: objs}));
    }

    return (<div>
        {garden && <div>
            <Form onSubmit={submitHandler}>
                <div className='d-flex align-items-center justify-content-between'>
                    <Button className='my-3' onClick={() => history.push('/vg')} style={{backgroundColor: '#1D4B2C'}}>
                        Go Back
                    </Button>
                    <div className={`justify-content-end "d-flex"`}>
                        <Button onClick={() => handleDeleteGarden(garden._id)} className='mx-2'
                                variant="outline-danger">
                            Delete
                        </Button>
                        <Button className='mx-2' type='submit' variant="primary" style={{backgroundColor: '#1D4B2C'}}>
                            Update
                        </Button>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-12 col-lg-4 overflow-hidden'>
                        <Form.Group style={{margin: 10}}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                value={garden.name}
                                onChange={(e) => {
                                    setGarden({...garden, name: e.target.value})
                                }}
                                placeholder='Garden name'
                                required
                            />
                        </Form.Group>
                        <Form.Group style={{margin: 10}}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                type='text'
                                value={garden.description}
                                onChange={(e) => {
                                    setGarden({...garden, description: e.target.value})
                                }}
                                placeholder='description'
                            />
                        </Form.Group>
                        <Form.Group controlId='image' style={{margin: 10}}>
                            <Form.Label>Image</Form.Label>
                            {/* <Form.Control
                
                
              ></Form.Control> */}
                            <Form.File accept=".jpg, .png, .jpeg" label={garden.image || "Upload Image"}
                                       onChange={(e) => {
                                           // setGarden({...garden, image: e.target.value})
                                           setGardenImageFile(e.target.files[0])
                                       }}/>
                        </Form.Group>
                    </div>
                    {/* <Col> */}
                    {/* <text style={{padding:320}}>Front Side</text> */}

                    {garden.image &&
                    
                        <div className='col-12 p-4 col-lg-8 d-flex align-items-center justify-content-center mw-100'>
                            {/* <text style={{textAlign:'center'}}>Left Side</text> */}
                            <div className='w-100'>
                                <img className={'border rounded-sm mw-100 w-100'} src={garden.image}
                                     alt={'Garden Image'}/>
                                     {/* <text style={{marginRight:-50,padding:250}}>Rear Side</text> */}
                            </div>
                            {/* <text style={{textAlign:'center'}}>Right Side</text> */}
                        </div>}
                        
                {/* </Col> */}
                
                </div>
                <hr/>
            </Form>
            
            <DndProvider backend={HTML5Backend} >
                {/* <br/>
                <h5 style={{paddingLeft:450}}>Front Side</h5> */}
                <div className='d-flex align-items-center justify-content-center mt-5'>
                {/* <h5 style={{marginLeft:-80}}>Left Side</h5> */}
                    <div className='overflow-auto'>
                   
                        {Array.from(Array(garden.rows).keys()).map((r) => (<div className='d-flex'>
                            {Array.from(Array(garden.cols).keys()).map((c) => (
                                <GardenCell r={r} c={c} replaceCell={replaceCell}>
                                    <GardenCard products={products} cell={getCell(r, c)}
                                                updateCell={(c, p) => updateCell(c, p)}/>
                                </GardenCell>))}
                        </div>))}
                      
                    </div>
                    {/* <h5 >Right Side</h5> */}
                </div>
            </DndProvider>
            {/* <br/> */}
            {/* <h5 style={{paddingLeft:450}} >Rear Side</h5> */}
            <div className={"d-flex flex-wrap mt-5 align-items-center justify-content-center"}>
                <div className='mt-2'>
                    <Button onClick={() => {
                        let grid = garden.grid;
                        for (let i = 0; i < garden.cols; i++) {
                            grid.push({c: i, r: garden.rows, plant: null});
                        }
                        garden.rows += 1;
                        dispatch(updateGarden({...garden, grid: grid}));
                    }} className={"mx-2"} variant={"primary"}>
                        Add new Row
                    </Button>
                    <Button onClick={() => {
                        let grid = garden.grid;
                        for (let i = 0; i < garden.rows; i++) {
                            grid.push({c: garden.cols, r: i, plant: null});
                        }
                        garden.cols += 1;
                        dispatch(updateGarden({...garden, grid: grid}));
                    }} className={"mx-2"} variant={"primary"}>
                        Add new Column
                    </Button>
                </div>

                <div className='mt-2'>
                    <Button onClick={() => {
                        if (garden.rows >= 1) {
                            let grid = garden.grid.filter(item => item.r !== garden.rows - 1);
                            garden.rows -= 1;
                            dispatch(updateGarden({...garden, grid}));
                        }
                    }} className={"mx-2"} variant={"outline-danger"}>
                        Delete Last Row
                    </Button>
                    <Button onClick={() => {
                        if (garden.cols >= 1) {
                            let grid = garden.grid.filter(item => item.c !== garden.cols - 1);
                            garden.cols -= 1;
                            dispatch(updateGarden({...garden, grid}));
                        }
                    }} className={"mx-2"} variant={"outline-danger"}>
                        Delete Last Column
                    </Button>
                </div>
            </div>
        </div>}
    </div>);
}