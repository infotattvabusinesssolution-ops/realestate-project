import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, Edit2, Trash2, ChevronDown, Image as ImageIcon } from 'lucide-react';
import AddTestimonialModal from '../modal/admin/AddTestimonialModal';

const initialTestimonials = [
  { id: 1, name: 'Jennifer Lee', occupation: 'Freelance Photographer' },
  { id: 2, name: 'Michael Collins', occupation: 'Marketing Manager' },
  { id: 3, name: 'Emily Parker', occupation: 'Teacher' },
  { id: 4, name: 'John Martinez', occupation: 'IT Consultant' },
  { id: 5, name: 'Hames Rodrigo', occupation: 'Marketing Executive' }
];

export default function HomeTestimonialSectionTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState("Client's Testimonial");
  const [subtitle, setSubtitle] = useState("What Our Client's Say About Us");
  const [content, setContent] = useState("Proin adipiscing porta tellus, ut feugiat nibh adipsci amet in eu justo a felis faucibus vel Vestibulum ante ipsum primis in fauc.");

  const handleUpdateBg = (e) => {
    e.preventDefault();
    alert('Testimonial background image updated successfully!');
  };

  const handleUpdateDetails = (e) => {
    e.preventDefault();
    alert('Testimonial section details updated successfully!');
  };

  const handleAddTestimonial = (newTestimonial) => {
    setTestimonials([
      ...testimonials,
      {
        id: Date.now(),
        name: newTestimonial.name,
        occupation: newTestimonial.occupation
      }
    ]);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Testimonial Section</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Home Page</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Testimonial Section</span>
          </div>
        </div>
      </div>

      {/* Two panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Left Column: Background Image Form & Details Form */}
        <div className="space-y-6">
          
          {/* Background image panel */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
            <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-50">Update Testimonial Section Backgroud Image</h3>
            
            <form onSubmit={handleUpdateBg} className="space-y-6 text-xs font-bold text-slate-700">
              <div className="flex flex-col space-y-2">
                <label>Image*</label>
                <div className="border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center w-48 aspect-[16/9] bg-slate-50/30">
                  <ImageIcon size={28} className="text-slate-300 mb-2" />
                  <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">No Image Found</span>
                </div>
                <button type="button" className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition w-36">
                  Choose Image
                </button>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-emerald-500/10"
                >
                  Update
                </button>
              </div>
            </form>
          </div>

          {/* Details form panel */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-50">
              <h3 className="text-sm font-bold text-slate-800">Update Testimonial Section</h3>
              <select className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none">
                <option value="English">English</option>
              </select>
            </div>

            <form onSubmit={handleUpdateDetails} className="space-y-6 text-xs font-bold text-slate-700">
              <div className="flex flex-col space-y-1.5">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label>Subtitle</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label>Content</label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none resize-none leading-relaxed"
                  required
                />
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-emerald-500/10"
                >
                  Update
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Right Column: Testimonials Table List */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-50 mb-6">
            <h3 className="text-sm font-bold text-slate-800">Testimonials</h3>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-650 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10"
            >
              <Plus size={14} />
              <span>+ Add</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 text-xs text-slate-500">
            <div className="flex items-center space-x-2">
              <span>Show</span>
              <select className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none">
                <option value="10">10</option>
              </select>
              <span>entries</span>
            </div>

            <div className="flex items-center space-x-2">
              <span>Search:</span>
              <input
                type="text"
                className="bg-white border border-slate-200 rounded-lg px-3 py-1 text-xs text-slate-800 focus:outline-none w-48"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                  <th className="p-3 w-10">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  </th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Occupation</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {testimonials.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-3">
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td className="p-3 font-semibold text-slate-800">{item.name}</td>
                    <td className="p-3 font-semibold text-slate-650">{item.occupation}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button type="button" className="px-3 py-1.5 bg-indigo-650 hover:bg-indigo-700 text-white rounded text-[10px] font-bold flex items-center space-x-1">
                          <span>Select</span>
                          <ChevronDown size={8} />
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 bg-red-500 hover:bg-red-650 text-white rounded transition"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      <AddTestimonialModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTestimonial}
      />
    </div>
  );
}
