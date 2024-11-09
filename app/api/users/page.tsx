import React from 'react';
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0';

const Page = () => {
  const { user, isLoading, error } = useUser();

  // If the user is loading, you can display a loading message
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If there is an error, display an error message
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Welcome to the page</h1>
      {user ? (
        <div>
          <p>Hello, {user.name}!</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
  );
};

export default withPageAuthRequired(Page);
