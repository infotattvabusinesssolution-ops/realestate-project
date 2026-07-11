import React from 'react';
import LoginForm from '../components/login/LoginForm';

export default function AgentLogin() {
  return (
    <LoginForm
      role="agent"
      themeClass="green"
      title="Certified Advisor Portal"
      subtitle="Log in to manage appointments, coordinate walkthroughs, and reply to client inquiries."
      bannerImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80"
      bannerTitle="Close Deals Faster"
      bannerDesc="Organize client appointments, track property showings, and maintain custom portfolios to assist your prospective buyers."
    />
  );
}
