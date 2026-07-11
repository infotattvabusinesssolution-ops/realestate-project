import React from 'react';
import LoginForm from '../components/login/LoginForm';

export default function VendorLogin() {
  return (
    <LoginForm
      role="vendor"
      themeClass="orange"
      title="Builder & Vendor Portal"
      subtitle="Access properties, manage construction timelines, and view developer insights."
      bannerImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=80"
      bannerTitle="Design and Showcase"
      bannerDesc="Display your mega housing complexes and single-family properties directly to thousands of licensed agents and qualified buyers."
    />
  );
}
