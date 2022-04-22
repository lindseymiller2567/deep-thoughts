import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';
import Auth from '../utils/auth'
import ReactionList from '../components/ReactionList'
import ReactionForm from '../components/ReactionForm';

const SingleThought = props => {

  const { id: thoughtId } = useParams();
  // console.log(thoughtId);

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    // the id property on the variables object will become the $id parameter in the GraphQL query
    variables: { id: thoughtId }
  });

  // data is used to populate a thought object 
  const thought = data?.thought || {};

  // loading (which is destructured from useQuery hook) is used to briefly show a loading div element
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>

      {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}

      {Auth.loggedIn() && <ReactionForm thoughtId={thought._id} />}
    </div>
  );
};

export default SingleThought;
