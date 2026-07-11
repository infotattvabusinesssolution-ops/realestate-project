import React from 'react';
import LoginForm from '../components/login/LoginForm';

export default function AdminLogin() {
  return (
    <LoginForm
      role="admin"
      themeClass="blue"
      title="Super Admin Portal"
      subtitle="Sign in to control platform parameters, review vendor approvals, and view global logs."
      bannerImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
      bannerTitle="Consolidated Control"
      bannerDesc="Manage users, approve listings, track monthly growth, and orchestrate server settings from one workspace."
    />
  );
}
