import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, ChevronDown } from 'lucide-react';
import { getAdminBlogPostsAPI, deleteAdminBlogPostAPI } from '../../api/api';

export default function BlogPostsTab({ setBlogExpanded, setActiveTab }) {
  const navigate = useNavigate();
  const [searchPost, setSearchPost] = useState('');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('English');
  const [actionDropdownId, setActionDropdownId] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await getAdminBlogPostsAPI({ lang });
      setBlogPosts(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [lang]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await deleteAdminBlogPostAPI(id);
      setBlogPosts(prev => prev.filter(p => p._id !== id));
      setActionDropdownId(null);
      alert('Blog post deleted successfully');
    } catch (err) {
      alert('Failed to delete blog post');
    }
  };

  const filteredPosts = useMemo(() => {
    if (!searchPost) return blogPosts;
    const q = searchPost.toLowerCase();
    return blogPosts.filter(
      p => (p.title || '').toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q)
    );
  }, [searchPost, blogPosts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20 bg-white rounded-2xl border border-slate-100 shadow-premium">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-650"></div>
      </div>
    );
  }

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
            
            <select 
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200 transition font-medium"
            >
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
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
                <tr key={post._id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="p-3 font-bold text-slate-800 max-w-sm truncate">{post.title}</td>
                  <td className="p-3 text-slate-500 font-semibold">{post.category}</td>
                  <td className="p-3 text-slate-400 font-medium">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span className={`inline-flex px-2 py-0.5 rounded font-bold text-[9px] uppercase ${
                      post.status === 'Active' 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-red-100 text-red-500'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-slate-700">{post.serialNumber}</td>
                  <td className="p-3 text-right relative">
                    <button
                      onClick={() => setActionDropdownId(actionDropdownId === post._id ? null : post._id)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1 bg-indigo-650 hover:bg-indigo-700 text-white rounded text-[10px] font-bold transition active:scale-95"
                    >
                      <span>Select</span>
                      <ChevronDown size={8} />
                    </button>
                    {actionDropdownId === post._id && (
                      <div className="absolute right-3 mt-1 z-35 bg-white border border-slate-100 rounded-lg shadow-lg py-1 w-24 text-[10px] font-bold text-slate-700 text-left animate-in fade-in duration-200">
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="w-full text-left px-3 py-1.5 text-red-650 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredPosts.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-slate-400">No posts found.</td>
                </tr>
              )}
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
