import React, { useState, useEffect } from 'react';
import './TrendCard.css';

import { getAllUser } from '../api/UserRequest';
import { getTimelinePosts } from '../api/PostRequest';

const TrendCard = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        // Fetch all users
        const userResponse = await getAllUser();
        // console.log('Users:', userResponse.data);
        const userList = userResponse.data;

        // Fetch posts for all users
        const postPromises = userList.map((user) => getTimelinePosts(user._id));
        const postResponses = await Promise.all(postPromises);

        // Combine posts and remove duplicates
        const allPosts = postResponses.flatMap((response) => response.data);
        const uniquePosts = Array.from(
          new Map(allPosts.map((post) => [post._id, post])).values()
        );
        // console.log('Unique Posts:', uniquePosts);

        // Extract hashtags from unique post descriptions
        const hashtagCounts = {};
        uniquePosts.forEach((post) => {
          const hashtags = post.desc?.match(/#[\w]+/g) || [];
          hashtags.forEach((hashtag) => {
            hashtagCounts[hashtag] = (hashtagCounts[hashtag] || 0) + 1;
          });
        });

        // Convert to array and sort by frequency
        const sortedTrends = Object.entries(hashtagCounts)
          .map(([name, count]) => ({ name, shares: count }))
          .sort((a, b) => b.shares - a.shares);

        // console.log('Trends:', sortedTrends);
        setTrends(sortedTrends);
      } catch (error) {
        console.error('Error fetching trends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  return (
    <div className="TrendCard">
      <h3>Trends for you</h3>
      {loading ? (
        <div>Loading trends...</div>
      ) : trends.length > 0 ? (
        trends.map((trend, index) => (
          <div className="trend" key={index}>
            <span className='text-primary'>{trend.name}</span>
            <span>{trend.shares} shares</span>
          </div>
        ))
      ) : (
        <div>No trends available</div>
      )}
    </div>
  );
};

export default TrendCard;
