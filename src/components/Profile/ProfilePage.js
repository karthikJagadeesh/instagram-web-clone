import React from 'react';

function ProfilePage({ user }) {
  return user ? <div>Hello {user.userName}</div> : <div>Loading...</div>;
}

export default ProfilePage;
