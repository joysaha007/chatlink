import React, { useEffect, useState } from 'react';
import { Line, Bar, Pie, Radar, Doughnut, Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { getAllUser } from '../api/UserRequest';
import { getTimelinePosts } from '../api/PostRequest';
import './Graph.css'; // Custom CSS for styling

ChartJS.register(...registerables);

const Graph = () => {
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userResponse = await getAllUser();
      const users = userResponse.data;

      const postPromises = users.map((user) => getTimelinePosts(user._id));
      const postResponses = await Promise.all(postPromises);
      const posts = postResponses.flatMap((response) => response.data);

      setUserData(users);
      setPostData(posts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // User Growth Over Time
  const userGrowthData = {
    labels: userData.map((user) =>
      new Date(user.createdAt).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Users Over Time',
        data: userData.map((_, index) => index + 1),
        borderColor: '#2980b9',
        backgroundColor: 'rgba(41, 128, 185, 0.5)',
      },
    ],
  };

  // Posts Over Time
  const postActivityData = {
    labels: postData.map((post) =>
      new Date(post.createdAt).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Posts Over Time',
        data: postData.map((_, index) => index + 1),
        backgroundColor: '#239b56',
      },
    ],
  };

  // Likes Distribution
  const likesDistributionData = {
    labels: postData.map((post) => post.desc || 'No Description'),
    datasets: [
      {
        label: 'Likes Distribution',
        data: postData.map((post) => post.likes.length),
        backgroundColor: ['#f5c32c', '#fca61f', '#2980b9', '#239b56', '#c0392b'],
      },
    ],
  };

  // User Location Distribution
  const userLocationData = {
    labels: [...new Set(userData.map((user) => user.country || 'Unknown'))],
    datasets: [
      {
        label: 'User Location',
        data: [...new Set(userData.map((user) => user.country || 'Unknown'))].map(
          (country) => userData.filter((user) => user.country === country).length
        ),
        backgroundColor: ['#f5c32c', '#fca61f', '#2980b9', '#239b56', '#c0392b'],
      },
    ],
  };
   // Top 5 Active Users
   const userPostCounts = userData.map((user) => ({
    username: user.username,
    postCount: postData.filter((post) => post.userId === user._id).length,
  }));
  const topUsers = userPostCounts
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 5);

  const topUsersData = {
    labels: topUsers.map((user) => user.username),
    datasets: [
      {
        label: 'Posts',
        data: topUsers.map((user) => user.postCount),
        backgroundColor: ['#f5c32c', '#fca61f', '#2980b9', '#239b56', '#c0392b'],
      },
    ],
  };

  // User Registration Trend
  const monthlyUserCounts = Array(12).fill(0);
  userData.forEach((user) => {
    const month = new Date(user.createdAt).getMonth();
    monthlyUserCounts[month]++;
  });

  const userRegistrationData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'New Users',
        data: monthlyUserCounts,
        borderColor: '#2980b9',
        backgroundColor: 'rgba(41, 128, 185, 0.5)',
      },
    ],
  };
  // 1. Country-wise User Distribution
  const countryCounts = userData.reduce((acc, user) => {
    acc[user.country] = (acc[user.country] || 0) + 1;
    return acc;
  }, {});

  const countryData = {
    labels: Object.keys(countryCounts),
    datasets: [
      {
        label: 'Users by Country',
        data: Object.values(countryCounts),
        backgroundColor: ['#f5c32c', '#fca61f', '#2980b9', '#239b56', '#c0392b'],
      },
    ],
  };

  // 2. Monthly Posts Trend
  const monthlyPostCounts = Array(12).fill(0);
  postData.forEach((post) => {
    const month = new Date(post.createdAt).getMonth();
    monthlyPostCounts[month]++;
  });

  const monthlyPostsData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Posts Created',
        data: monthlyPostCounts,
        borderColor: '#c0392b',
        backgroundColor: 'rgba(192, 57, 43, 0.5)',
      },
    ],
  };

  // 3. Likes Distribution by User
  const likesByUser = userData.map((user) => ({
    username: user.username,
    totalLikes: postData
      .filter((post) => post.userId === user._id)
      .reduce((sum, post) => sum + post.likes.length, 0),
  }));

  const likesByUserData = {
    labels: likesByUser.map((user) => user.username),
    datasets: [
      {
        label: 'Total Likes',
        data: likesByUser.map((user) => user.totalLikes),
        backgroundColor: ['#2980b9', '#239b56', '#f5c32c', '#fca61f', '#c0392b'],
      },
    ],
  };

  // 4. Followers vs. Following
  const avgFollowers = userData.reduce((sum, user) => sum + user.followers.length, 0) / userData.length || 0;
  const avgFollowing = userData.reduce((sum, user) => sum + user.following.length, 0) / userData.length || 0;

  const followersFollowingData = {
    labels: ['Followers', 'Following'],
    datasets: [
      {
        label: 'Average Count',
        data: [avgFollowers, avgFollowing],
        backgroundColor: ['#f5c32c', '#2980b9'],
      },
    ],
  };


  return (
    <div className="graph-container">
      <h2 style={{ color: '#2980b9' }}>Analysis data for ChatLink</h2><br/>
      <div className="chart-row">
        <div className="chart">
          <h3 className='text-success'>User Growth</h3>
          <Line data={userGrowthData} />
        </div>
        <div className="chart">
          <h3 className='text-success'>Posts Over Time</h3>
          <Bar data={postActivityData} />
        </div>
      </div>
      <div className="chart-row">
        <div className="chart">
          <h3 className='text-success'>Likes Distribution</h3>
          <Pie data={likesDistributionData} />
        </div>
        <div className="chart">
          <h3 className='text-success'>User Location</h3>
          <Pie data={userLocationData} />
        </div>
      </div>
      <div className="chart-row">
        <div className="chart">
          <h3 className='text-success'>Top 5 Active Users</h3>
          <Bar data={topUsersData} />
        </div>
        <div className="chart">
          <h3 className='text-success'>User Registration Trend</h3>
          <Line data={userRegistrationData} />
        </div>
      </div>
      <div className="chart-row">
        <div className="chart">
          <h3 className='text-success'>Country-wise User Distribution</h3>
          <Doughnut data={countryData} />
        </div>
        <div className="chart">
          <h3 className='text-success'>Monthly Posts Trend</h3>
          <Line data={monthlyPostsData} />
        </div>
      </div>
      <div className="chart-row">
        <div className="chart">
          <h3 className='text-success'>Likes Distribution by User</h3>
          <Bar data={likesByUserData} />
        </div>
        <div className="chart">
          <h3 className='text-success'>Followers vs. Following</h3>
          <Radar data={followersFollowingData} />
        </div>
      </div>
    </div>
  );
};

export default Graph;
