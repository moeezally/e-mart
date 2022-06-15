import React, {useEffect, useState} from 'react'
import {Button, Card, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addReply, getForum, toggleLike} from '../actions/forumActions';
import Avatar from 'react-avatar';

function EmptyHeart() {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-heart" viewBox="0 0 16 16">
        <path
            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
    </svg>);
}

function FilledHeart() {
    return (<div style={{color: '#b90000'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
             className="bi bi-heart-fill"
             viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg>
    </div>);
}

export default function ForumDetailPage({match}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const [replyText, setReplyText] = useState('');

    const forum = useSelector((state) => state.forumDetails);
    const replyReducer = useSelector((state) => state.forumAddReply);
    const likeReducer = useSelector((state) => state.forumLike);

    useEffect(() => {
        dispatch(getForum(match.params.id));
    }, [dispatch, replyReducer, likeReducer]);

    function handleSubmit(e) {
        dispatch(addReply(match.params.id, replyText));
        setReplyText("")
        e.preventDefault();
    }

    function handleToggleLike(rid) {
        dispatch(toggleLike(match.params.id, rid));
    }

    return <>
        <Button className='my-3' onClick={() => history.goBack()} style={{backgroundColor: '#1D4B2C'}}>
            Go Back
        </Button>
        <h2>Question</h2>
        {forum._id && <div>
            <div className="card mb-2 rounded">
                <div className="card-header">
                <Avatar facebookId="100008343750912" size="50" round={true} style={{marginRight:15,marginTop:-5}}/>
                    {forum.user.name}
                    
                </div>
                <div className="card-body">
                    <h2>{forum.title}</h2>
                    <p>{forum.description}</p>
                </div>
            </div>

            <Form className='pb-8' onSubmit={handleSubmit}>
                <Card className="rounded">
                    <Card.Body>
                        <Form.Group style={{margin: 10}}>
                            <Form.Label>Post your Reply</Form.Label>
                            <Form.Control
                                type='text'
                                as='textarea'
                                placeholder=''
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer>
                        <Button type='submit' style={{backgroundColor: '#1D4B2C'}}>Post</Button>
                    </Card.Footer>
                </Card>
            </Form>

            <h2 className='mt-5'>Replies</h2>

            {forum.replies.map((reply) => 
            {console.log(reply);
             return (<Card className="rounded mb-4">
                <Card.Header>
                <Avatar facebookId="100008343750912" size="50" round={true} style={{marginRight:15,marginTop:-5}}/>
                    {reply.user.name}
                    
                </Card.Header>
                <Card.Body>
                    <p>{reply.text}</p>
                </Card.Body>
                <Card.Footer>
                    <div className='d-flex align-items-center'>
                        <div onClick={() => handleToggleLike(reply._id)}>
                            {reply.liked_by_me ? <FilledHeart/> : <EmptyHeart/>}
                        </div>
                        <p className='ml-2 pb-0 mb-0'>{reply.total_likes} likes</p>
                    </div>
                </Card.Footer>
            </Card>)
})
            }
            
        </div>}
    </>;
}