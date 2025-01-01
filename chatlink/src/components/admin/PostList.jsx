import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Container, Modal, Form } from 'react-bootstrap';
import { getAllUser } from '../api/UserRequest';
import { getTimelinePosts, editPost, retractPost, deletePost } from '../api/PostRequest';

const PostList = () => {
  const [users, setUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [editData, setEditData] = useState({ title: '', desc: '' });

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUsersAndPosts = async () => {
      try {
        const userResponse = await getAllUser();
        const userList = userResponse.data;
  
        setUsers(userList);
  
        const postPromises = userList.map((user) => getTimelinePosts(user._id));
        const postResponses = await Promise.all(postPromises);
  
        // Combine all posts into a single array
        const posts = postResponses.flatMap((response) => response.data);
  
        // Remove duplicates based on post ID
        const uniquePosts = Array.from(
          new Map(posts.map((post) => [post._id, post])).values()
        );
  
        setAllPosts(uniquePosts);
      } catch (error) {
        console.error('Error fetching users or posts:', error);
      }
    };
  
    fetchUsersAndPosts();
  }, []);
  

  const handleEdit = (post) => {
    setCurrentPost(post);
    setEditData({ title: post.title, desc: post.desc });
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    if (currentPost) {
      try {
        const response = await editPost(currentPost._id, editData);
        console.log('Post updated:', response.data);

        setAllPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === currentPost._id ? { ...post, ...editData } : post
          )
        );
        setShowModal(false);
      } catch (error) {
        console.error('Error updating post:', error);
      }
    }
  };

  const handleRetract = async (postId, userId) => {
    try {
      const response = await retractPost(postId, userId);
      console.log('Post retracted:', response.data);
    } catch (error) {
      console.error('Error retracting post:', error);
    }
  };

  const handleDelete = async (postId, userId) => {
    try {
      const response = await deletePost(postId, userId);
      console.log('Post deleted:', response.data);

      setAllPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 mt-3 text-light">All User Posts</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {allPosts.map((post) => (
          <Col key={post._id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={post.image ? `${PF}${post.image}` : `${PF}default-image.jpg`}
                alt="Post"
                className="rounded"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                  <strong>User Id:</strong> {post.userId} <br />
                  <strong>Description:</strong> {post.desc} <br />
                  <strong>Likes:</strong> {post.likes.length} <br />
                  <strong>Date:</strong> {new Date(post.createdAt).toLocaleString()}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="primary" size="sm" onClick={() => handleEdit(post)}>
                    Edit
                  </Button>
                  <Button variant="warning" size="sm" onClick={() => handleRetract(post._id, post.userId)}>
                    Retract
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(post._id, post.userId)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Edit Post Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new title"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editDesc" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter new description"
                value={editData.desc}
                onChange={(e) => setEditData({ ...editData, desc: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PostList;
