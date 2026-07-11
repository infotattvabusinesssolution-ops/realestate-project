import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, ChevronDown } from 'lucide-react';

const initialBlogPosts = [
  { id: 7, title: 'Understanding Lease Agreements: What Every Tenant Should Know', category: 'Renting and Leasing', date: 'Jun 13, 2024', status: 'Inactive', serial: 7 },
  { id: 6, title: 'How Economic Changes Are Impacting the Housing Market', category: 'Market Trends and Analysis', date: 'Aug 19, 2023', status: 'Active', serial: 6 },
  { id: 5, title: 'How to Handle Tenant Issues: A Guide for Landlords', category: 'Renting and Leasing', date: 'Aug 19, 2023', status: 'Active', serial: 5 },
  { id: 4, title: 'How to Choose the Right Homeowners Insurance Policy', category: 'Legal and Financial Advice', date: 'Aug 19, 2023', status: 'Active', serial: 4 },
  { id: 3, title: 'Legal Pitfalls to Avoid in Real Estate Transactions', category: 'Legal and Financial Advice', date: 'Aug 19, 2023', status: 'Active', serial: 3 },
  { id: 2, title: "First-Time Homebuyers' Guide: 10 Essential Tips for Success", category: 'Buying Guides', date: 'Aug 19, 2023', status: 'Active', serial: 2 },
  { id: 1, title: 'Navigating Mortgage Options: Fixed vs. Adjustable Rates Explained', category: 'Buying Guides', date: 'Aug 19, 2023', status: 'Active', serial: 1 }
];

export default function BlogPostsTab({ setBlogExpanded, setActiveTab }) {
  const navigate = useNavigate();
  const [searchPost, setSearchPost] = useState('');
  const [blogPosts] = useState(initialBlogPosts);

  const filteredPosts = useMemo(() => {
    if (!searchPost) return blogPosts;
    const q = searchPost.toLowerCase();
    return blogPosts.filter(
      p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [searchPost, blogPosts]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Posts</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setBlogExpanded(true)}>Blog Management</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Posts</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements: Title, Lang Select, +Add Post */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <h3 className="text-sm font-bold text-slate-800">Posts</h3>
            
            <select className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200 transition font-medium">
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>

          <button 
            onClick={() => setActiveTab('blog-posts-add')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10"
          >
            <Plus size={14} />
            <span>Add Post</span>
          </button>
        </div>

        {/* Filters Row: Show Entries & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span>Show</span>
            <select className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center space-x-2">
            <span>Search:</span>
            <input
              type="text"
              value={searchPost}
              onChange={(e) => setSearchPost(e.target.value)}
              placeholder=""
              className="bg-white border border-slate-200 rounded-lg px-3 py-1 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all w-48"
            />
          </div>
        </div>

        {/* Table list */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                <th className="p-3 w-10">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Publish Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Serial Number</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="p-3 font-bold text-slate-800 max-w-sm truncate">{post.title}</td>
                  <td className="p-3 text-slate-500 font-semibold">{post.category}</td>
                  <td className="p-3 text-slate-400 font-medium">{post.date}</td>
                  <td className="p-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full font-bold text-[9px] uppercase ${
                      post.status === 'Active' 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-red-100 text-red-500'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-slate-700">{post.serial}</td>
                  <td className="p-3 text-right">
                    <button className="inline-flex items-center space-x-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[10px] font-bold transition">
                      <span>Select</span>
                      <ChevronDown size={8} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer: Entries info & Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {filteredPosts.length} of {blogPosts.length} entries</span>
          
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition">Next</button>
          </div>
        </div>

      </div>

    </div>
  );
}
