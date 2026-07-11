import React from 'react';

const mockSpecs = [
  { id: 1, category: 'Flooring', options: 'Marble, Hardwood, Ceramic Tiles' },
  { id: 2, category: 'Furnishing', options: 'Fully Furnished, Semi Furnished, Unfurnished' },
  { id: 3, category: 'Amenities', options: 'Swimming Pool, Gym, Gated Security, Parking, Elevator' }
];

export default function PropertySpecificationsTab() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight">Property Specifications</h1>
        <p className="text-slate-500 text-sm">Configure building materials, flooring details, and amenities parameters.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold">
              <th className="p-4">Category</th>
              <th className="p-4">Options Configuration</th>
            </tr>
          </thead>
          <tbody>
            {mockSpecs.map(spec => (
              <tr key={spec.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition">
                <td className="p-4 font-bold text-slate-800">{spec.category}</td>
                <td className="p-4 text-slate-500 font-medium">{spec.options}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
