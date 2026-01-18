import React, { useState } from 'react';
import { Menu, X, Plus, Edit2, Trash2, Save, LogOut, Users, Target, MapPin } from 'lucide-react';

const YSPWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [programs, setPrograms] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [newProgram, setNewProgram] = useState({ title: '', description: '' });
  const [editingProgram, setEditingProgram] = useState(null);

  const addProgram = () => {
    if (newProgram.title.trim()) {
      setPrograms([...programs, { id: Date.now(), ...newProgram }]);
      setNewProgram({ title: '', description: '' });
    }
  };

  const updateProgram = (id, updated) => {
    setPrograms(programs.map(p => p.id === id ? { ...p, ...updated } : p));
    setEditingProgram(null);
  };

  const deleteProgram = (id) => {
    setPrograms(programs.filter(p => p.id !== id));
  };

  const handleLogin = () => {
    if (loginEmail === 'admin@ysp.ph' && loginPassword === 'admin123') {
      setIsLoggedIn(true);
      setUserRole('admin');
      setShowLogin(false);
      setLoginEmail('');
      setLoginPassword('');
    } else if (loginEmail === 'chapter@ysp.ph' && loginPassword === 'chapter123') {
      setIsLoggedIn(true);
      setUserRole('chapter');
      setShowLogin(false);
      setLoginEmail('');
      setLoginPassword('');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/YSP LOGO.png" alt="YSP Logo" className="h-20 w-20" />
            <h1 className="text-3xl font-bold text-orange-600">Youth Service Philippines</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => setCurrentPage('home')} className={currentPage === 'home' ? 'text-orange-600' : 'text-gray-700'}>Home</button>
            <button onClick={() => setCurrentPage('programs')} className={currentPage === 'programs' ? 'text-orange-600' : 'text-gray-700'}>Programs</button>
            <button onClick={() => setCurrentPage('membership')} className={currentPage === 'membership' ? 'text-orange-600' : 'text-gray-700'}>Membership</button>
            <button onClick={() => setCurrentPage('opportunities')} className={currentPage === 'opportunities' ? 'text-orange-600' : 'text-gray-700'}>Opportunities</button>
            <button onClick={() => setCurrentPage('contact')} className={currentPage === 'contact' ? 'text-orange-600' : 'text-gray-700'}>Contact</button>
          </nav>
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              {userRole === 'admin' && (
                <button onClick={() => setCurrentPage('admin')} className="bg-orange-600 text-white px-4 py-2 rounded-lg">Admin</button>
              )}
              <button onClick={handleLogout} className="text-orange-600"><LogOut size={20} /></button>
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)} className="bg-orange-600 text-white px-4 py-2 rounded-lg">Sign In</button>
          )}
        </div>
      </header>

      {showLogin && (
        <div className="fixed inset-0 bg-gradient-to-br from-orange-400 to-white flex items-center justify-center z-50 gradient-animate">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6">Sign In</h3>
            <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full p-3 border rounded-lg mb-4" placeholder="Email" />
            <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full p-3 border rounded-lg mb-4" placeholder="Password" />
            <button onClick={handleLogin} className="w-full bg-orange-600 text-white py-3 rounded-lg mb-4">Sign In</button>
            <p className="text-sm text-gray-500">Demo: admin@ysp.ph / admin123</p>
          </div>
        </div>
      )}

      {currentPage === 'home' && (
        <div>
          <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-5xl font-bold mb-4">Empowering Youth to Serve Communities</h2>
              <p className="text-xl mb-8">Join us in making a difference across the Philippines</p>
              <button onClick={() => setCurrentPage('membership')} className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold">Get Involved</button>
            </div>
          </section>
          
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <h3 className="text-3xl font-bold mb-8">Our Programs</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {programs.length > 0 ? (
                  programs.map((prog) => (
                    <div key={prog.id} className="bg-white rounded-lg shadow-md p-6 border-2 border-transparent hover:border-orange-600 transition-all cursor-pointer">
                      <h4 className="text-xl font-semibold text-orange-600 mb-2">{prog.title}</h4>
                      <p className="text-gray-600">{prog.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center text-gray-500">No programs yet. Check back soon!</div>
                )}
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-lg p-8 text-center">
                <h3 className="text-3xl font-bold mb-4">Want to Start a Chapter?</h3>
                <p className="text-lg mb-6">Join us in creating a local chapter of Youth Service Philippines in your area.</p>
                <button onClick={() => window.open('https://forms.gle/cWPsgBJKLaQoLuUr8?fbclid=IwY2xjawOKRLJleHRuA2FlbQIxMABicmlkETFJWDhJY0U1azBWMDFLOXh2c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHm01_q8ZFNsR30YIkD2ODzju7eleolSNiJgUoZKW11PV7HAc0NeXszwCRjFU_aem_2mVtlAdu6_smAMkowigvAA')} className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold mb-4 hover:bg-gray-100 transition">Create a Chapter</button>
                <p className="text-sm text-orange-100">Our admin team will review your application and notify you shortly.</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {currentPage === 'programs' && (
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">Our Programs</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {programs.length > 0 ? programs.map(p => <div key={p.id} className="bg-white rounded-lg shadow-md p-6"><h3 className="text-xl font-semibold">{p.title}</h3><p>{p.description}</p></div>) : <p className="text-gray-600">No programs yet.</p>}
            </div>
          </div>
        </div>
      )}

      {currentPage === 'membership' && (
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">Join Us</h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-orange-600 mb-4">Become a Member</h3>
              <p className="text-gray-700 mb-6">Join our community of passionate youth volunteers.</p>
              <button onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSdwMKgIjQNrlLH-j-Qdx0MrKxefxaLRC6gMI_oOgMTosDi_sQ/viewform')} className="bg-orange-600 text-white px-8 py-3 rounded-lg">Get Started</button>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'opportunities' && (
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">Volunteer Opportunities</h2>
            <div className="space-y-6">
              {opportunities.length > 0 ? opportunities.map(o => <div key={o.id} className="bg-white rounded-lg shadow-lg p-6"><h3 className="text-2xl font-bold text-orange-600">{o.eventName}</h3><p className="text-gray-700">Date: {o.date}</p></div>) : <p className="text-gray-600">No opportunities yet.</p>}
            </div>
          </div>
        </div>
      )}

      {currentPage === 'contact' && (
        <div className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="mb-4"><strong>Email:</strong> phyouthservice@gmail.com</p>
              <p className="mb-4"><strong>Phone:</strong> 09177798413</p>
              <p><strong>Facebook:</strong> Youth Service Philippines</p>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'admin' && isLoggedIn && userRole === 'admin' && (
        <div className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">Admin Dashboard</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-orange-600 mb-6">Add New Program</h3>
                <input
                  type="text"
                  placeholder="Program Title"
                  value={newProgram.title}
                  onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
                  className="w-full p-3 border rounded-lg mb-4"
                />
                <textarea
                  placeholder="Program Description"
                  value={newProgram.description}
                  onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                  className="w-full p-3 border rounded-lg mb-4 h-24"
                />
                <button onClick={addProgram} className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                  <Plus size={20} /> Add Program
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-orange-600 mb-6">Manage Programs</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {programs.length > 0 ? (
                    programs.map(prog => (
                      <div key={prog.id} className="border rounded-lg p-4">
                        {editingProgram === prog.id ? (
                          <>
                            <input
                              type="text"
                              defaultValue={prog.title}
                              onChange={(e) => updateProgram(prog.id, { title: e.target.value })}
                              className="w-full p-2 border rounded-lg mb-2"
                            />
                            <textarea
                              defaultValue={prog.description}
                              onChange={(e) => updateProgram(prog.id, { description: e.target.value })}
                              className="w-full p-2 border rounded-lg mb-2 h-16"
                            />
                            <button onClick={() => setEditingProgram(null)} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                              <Save size={16} /> Save
                            </button>
                          </>
                        ) : (
                          <>
                            <h4 className="font-bold text-lg">{prog.title}</h4>
                            <p className="text-gray-600 text-sm mb-3">{prog.description}</p>
                            <div className="flex gap-2">
                              <button onClick={() => setEditingProgram(prog.id)} className="bg-blue-600 text-white px-4 py-1 rounded-lg flex items-center gap-1 text-sm">
                                <Edit2 size={16} /> Edit
                              </button>
                              <button onClick={() => deleteProgram(prog.id)} className="bg-red-600 text-white px-4 py-1 rounded-lg flex items-center gap-1 text-sm">
                                <Trash2 size={16} /> Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No programs yet. Add one to get started.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold">Youth Service Philippines</p>
          <p className="text-gray-400">&copy; 2026 Youth Service Philippines. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default YSPWebsite;
