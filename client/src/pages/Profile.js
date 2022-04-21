import React from 'react';
import Auth from '../utils/auth';

// useParams Hook retrieves the username from the URL, which is then passed into the useQuery Hook
import { Redirect, useParams } from 'react-router-dom';

// import the components
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

const Profile = () => {

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  // the user object is created to populate the JSX
  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is the logged-in user's (so instead of display /profile/:username)
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />; 
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>You need to be logged in to see this page. Use the navigation links above to sign up or log in!</h4>
    )
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList thoughts={user.thoughts} title={`${user.username}'s thoughts...`}></ThoughtList>
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}>
          </FriendList>
        </div>
      </div>
    </div>
  );
};

export default Profile;
