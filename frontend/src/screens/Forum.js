import React, {useEffect, useState} from 'react'
import {useHistory} from "react-router-dom";
import {Button, Form, Modal, Pagination} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {createForum, getAllForums} from "../actions/forumActions";
import {LinkContainer} from "react-router-bootstrap";
import {useLocation} from "react-router-dom/cjs/react-router-dom";

export default function Forum({match}) {
    const history = useHistory();

    const {search} = useLocation();
    const query = new URLSearchParams(search);
    const pageNumber = query.get('pageNumber') || 1;

    const [showCreateModal, setShowCreateModal] = useState(false);
    const handleModalClose = () => setShowCreateModal(false);
    const handleModalShow = () => setShowCreateModal(true);

    const [askTitle, setAskTitle] = useState('');
    const [askQuestion, setAskQuestion] = useState('');

    const forumReducer = useSelector((state) => state.forumList)
    const {forums, page, pages} = forumReducer

    const forumCreateReducer = useSelector((state) => state.forumCreate)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllForums(pageNumber))
    }, [dispatch, pageNumber, forumCreateReducer]);

    function handleSubmit(e) {
        // post new question
        dispatch(createForum({title: askTitle, description: askQuestion}));
        handleModalClose();
        e.preventDefault();
    }

    return <>
        <Modal show={showCreateModal} onHide={handleModalClose} centered>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>

                    <Modal.Title>Ask New Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group style={{margin: 10}}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Short question title'
                            value={askTitle}
                            onChange={(e) => setAskTitle(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group style={{margin: 10}}>
                        <Form.Label>Question</Form.Label>
                        <Form.Control
                            type='text'
                            as='textarea'
                            placeholder='Long description explaining your question in detail'
                            value={askQuestion}
                            onChange={(e) => setAskQuestion(e.target.value)}
                            required
                        />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button type='submit' variant="primary" style={{backgroundColor: '#1D4B2C'}}>
                        Create
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        <div className="jumbotron rounded-lg shadow-lg">
            <h1>Welcome to the Forum Section</h1>
            <p>Please Read the following rules before posting or replying to any question.</p>
            <ol>
                <li>Be respectful towards other forum members.</li>
                <li>Don’t be offensive, abusive or cause harassment.</li>
                <li>Do not post content that is not safe for work. This includes sexual, hateful, racist, homophobic,
                    sexist, provocative or vulgar content.
                </li>
            </ol>
            <button className="btn btn-success mt-4" onClick={handleModalShow}>Ask a Question?</button>
        </div>

        <div>
            <h2>Browse Recent Questions</h2>

            <div className="list-group rounded-lg mt-4 mb-4">

                {forums && forums.map((forum) => (<div className='pb-4'>
                    <div onClick={() => {
                        history.push(`/forum/${forum._id}`)
                    }} className="list-group-item rounded-lg" style={{cursor: "pointer"}}>
                        <div>
                            <h5 className="list-group-item-heading">{forum.title}</h5>
                            <p className="list-group-item-text">{forum.description}</p>
                            <span
                                className="badge rounded-pill shadow-sm bg-success text-light">{forum.replies_count} {forum.replies_count <= 1 ? 'Reply' : 'Replies'}</span>
                        </div>
                    </div>
                </div>))}

            </div>

            {pages > 1 && (
                <Pagination>
                    {[...Array(pages).keys()].map((x) => (
                        <LinkContainer
                            key={x + 1}
                            to={`/forum?pageNumber=${x + 1}`}
                        >
                            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                        </LinkContainer>
                    ))}
                </Pagination>
            )}
        </div>
    </>

}