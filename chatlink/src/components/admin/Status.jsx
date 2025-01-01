import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { getAllUser } from '../api/UserRequest';
import { getTimelinePosts } from '../api/PostRequest';

const Status = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [newUsersToday, setNewUsersToday] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  // Fetch users and calculate stats
  useEffect(() => {
    const fetchUsersAndPosts = async () => {
      try {
        const userResponse = await getAllUser();
        const usersData = userResponse.data;

        // Set total users count
        setTotalUsers(usersData.length);

        // Calculate new users today
        const today = new Date().setHours(0, 0, 0, 0);
        const newUsers = usersData.filter((user) => {
          const userCreatedAt = new Date(user.createdAt).setHours(0, 0, 0, 0);
          return userCreatedAt === today;
        });
        setNewUsersToday(newUsers.length);

        // Fetch posts for all users
        const postPromises = usersData.map((user) => getTimelinePosts(user._id));
        const postResponses = await Promise.all(postPromises);

        // Combine posts and remove duplicates
        const posts = postResponses.flatMap((response) => response.data);
        const uniquePosts = Array.from(new Set(posts.map((post) => post._id))) // Remove duplicates
          .map((id) => posts.find((post) => post._id === id));
        setTotalPosts(uniquePosts.length); // Set unique post count
      } catch (error) {
        console.error('Error fetching users or posts:', error);
      }
    };

    fetchUsersAndPosts();
  }, []);

  return (
    <>
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center bg-primary text-light">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>{totalUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-success text-light">
            <Card.Body>
              <Card.Title>Total Posts</Card.Title>
              <Card.Text>{totalPosts}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-warning text-light">
            <Card.Body>
              <Card.Title>Total Admins</Card.Title>
              <Card.Text>1</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-danger text-light">
            <Card.Body>
              <Card.Title>New Users Today</Card.Title>
              <Card.Text>{newUsersToday}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Status;
