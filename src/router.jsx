import React from 'react';

const routes = [
  {
    path: '/',
    element: !user ? <Login /> : <ChatBox />,
  },
];





export default routes
