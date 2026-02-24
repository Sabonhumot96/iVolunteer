import React from 'react';
import { Users } from 'lucide-react';

const AdminMembershipSection = ({ memberApplications, setMemberApplications }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 rounded-lg p-2">
          <Users className="text-purple-600" size={24} />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-800">Membership Applications</h3>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {memberApplications.length > 0 ? (
          memberApplications.map(app => (
            <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-lg text-gray-800">{app.name}</h4>
                  <p className="text-sm text-gray-600">{app.email}</p>
                  <p className="text-xs text-gray-500 mt-1">Submitted: {new Date(app.submittedAt).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  app.status === 'approved' 
                    ? 'bg-green-100 text-green-700' 
                    : app.status === 'rejected'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </div>
              {app.status === 'pending' && (
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setMemberApplications(memberApplications.map(a => 
                        a.id === app.id ? { ...a, status: 'approved' } : a
                      ));
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-green-700 transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Approve
                  </button>
                  <button 
                    onClick={() => {
                      setMemberApplications(memberApplications.map(a => 
                        a.id === app.id ? { ...a, status: 'rejected' } : a
                      ));
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-red-700 transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject
                  </button>
                </div>
              )}
              {app.status === 'approved' && (
                <button 
                  onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSdwMKgIjQNrlLH-j-Qdx0MrKxefxaLRC6gMI_oOgMTosDi_sQ/viewform')}
                  className="w-full mt-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition font-semibold"
                >
                  Send Google Forms Link
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Users className="text-gray-300 mx-auto mb-3" size={48} />
            <p className="text-gray-500">No membership applications yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMembershipSection;
