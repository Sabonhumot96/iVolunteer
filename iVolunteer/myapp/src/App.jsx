import React, { useState } from 'react';
import { Menu, X, Plus, Edit2, Trash2, Save, LogOut, Users, Target, MapPin, Bot } from 'lucide-react';

const YSPWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
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
  const [newOpportunity, setNewOpportunity] = useState({ eventName: '', date: '', location: '', description: '' });
  const [editingOpportunity, setEditingOpportunity] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'bot' }
  ]);
  const [userInput, setUserInput] = useState('');

  const handlePageChange = (page) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
    }, 500);
  };

  const addProgram = () => {
    if (newProgram.title.trim()) {
      setPrograms([...programs, { id: Date.now(), ...newProgram }]);
      setNewProgram({ title: '', description: '' });
    }
  };

  const updateProgram = (id, updated) => {
    setPrograms(programs.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const saveProgram = (id) => {
    setEditingProgram(null);
  };

  const deleteProgram = (id) => {
    setPrograms(programs.filter(p => p.id !== id));
  };

  const addOpportunity = () => {
    if (newOpportunity.eventName.trim() && newOpportunity.date.trim()) {
      setOpportunities([...opportunities, { id: Date.now(), ...newOpportunity }]);
      setNewOpportunity({ eventName: '', date: '', location: '', description: '' });
    }
  };

  const updateOpportunity = (id, updated) => {
    setOpportunities(opportunities.map(o => o.id === id ? { ...o, ...updated } : o));
  };

  const saveOpportunity = (id) => {
    setEditingOpportunity(null);
  };

  const deleteOpportunity = (id) => {
    setOpportunities(opportunities.filter(o => o.id !== id));
  };

  const handleLogin = () => {
    console.log('Attempting login with:', loginEmail, loginPassword);
    setAuthLoading(true);
    setTimeout(() => {
      const email = loginEmail.trim().toLowerCase();
      const password = loginPassword.trim();
      console.log('Processed credentials:', email, password);
      
      if (email === 'admin@ysp.ph' && password === 'admin123') {
        setIsLoggedIn(true);
        setUserRole('admin');
        setCurrentPage('admin');
        setShowLogin(false);
        setLoginEmail('');
        setLoginPassword('');
      } else {
        alert('Invalid credentials. Please use:\nEmail: admin@ysp.ph\nPassword: admin123');
      }
      setAuthLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setAuthLoading(true);
    setTimeout(() => {
      setIsLoggedIn(false);
      setUserRole(null);
      setCurrentPage('home');
      setAuthLoading(false);
    }, 1000);
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Custom prompt responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! Welcome to Youth Service Philippines. How can I assist you today?';
    }
    if (message.includes('program') || message.includes('programs')) {
      return 'We offer various programs including community service, leadership training, and youth development. Check out our Programs page for more details!';
    }
    if (message.includes('volunteer') || message.includes('opportunity')) {
      return 'We have many volunteer opportunities available! Visit our Opportunities page to see upcoming events and how you can help.';
    }
    if (message.includes('member') || message.includes('join')) {
      return 'We\'d love to have you join us! Go to the Membership page to start your application process.';
    }
    if (message.includes('chapter') || message.includes('local')) {
      return 'You can start a local chapter in your area! Click on "Create a Chapter" on our home page to apply.';
    }
    if (message.includes('contact') || message.includes('email') || message.includes('phone')) {
      return 'You can reach us at phyouthservice@gmail.com or call us at 09177798413. You can also find us on Facebook as iVolunteer Philippines.';
    }
    if (message.includes('thank')) {
      return 'You\'re welcome! Is there anything else I can help you with?';
    }
    if (message.includes('bye') || message.includes('goodbye')) {
      return 'Goodbye! Thank you for your interest in Youth Service Philippines. Have a great day!';
    }
    if (message.includes('About') || message.includes('Details') || message.includes('Information')) {
      return 'iVolunteer is the Philippines\' largest volunteer portal built BY VOLUNTEERS  FOR VOLUNTEERS';
    }   
    
    // Default response
    return 'I\'m here to help! You can ask me about our programs, volunteer opportunities, membership, chapters, or contact information. What would you like to know?';
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      const newUserMessage = {
        id: Date.now(),
        text: userInput,
        sender: 'user'
      };
      
      setChatMessages([...chatMessages, newUserMessage]);
      setUserInput('');
      
      // Add bot response after a short delay
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: getBotResponse(userInput),
          sender: 'bot'
        };
        setChatMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {currentPage !== 'admin' && (
      <>
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src="/YSP LOGO.png" alt="YSP Logo" className="h-20 w-20" />
              <h1 className="text-3xl font-bold text-amber-700">Youth Service Philippines</h1>
            </div>
            <button onClick={() => setShowSidebar(!showSidebar)} className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-pulse">
              {showSidebar ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </header>
        
        {/* Sidebar */}
        <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${showSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowSidebar(false)}></div>
          <div className={`absolute left-0 top-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-8">
                  <img src="/YSP LOGO.png" alt="YSP Logo" className="h-16 w-16" />
                  <h2 className="text-xl font-bold text-amber-700">YSP</h2>
                </div>
                <nav className="space-y-4">
                  <button onClick={() => {handlePageChange('home'); setShowSidebar(false);}} className={`w-full text-left px-4 py-3 rounded-lg transition ${currentPage === 'home' ? 'bg-amber-100 text-amber-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}>Home</button>
                  <button onClick={() => {handlePageChange('programs'); setShowSidebar(false);}} className={`w-full text-left px-4 py-3 rounded-lg transition ${currentPage === 'programs' ? 'bg-amber-100 text-amber-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}>Programs</button>
                  <button onClick={() => {handlePageChange('membership'); setShowSidebar(false);}} className={`w-full text-left px-4 py-3 rounded-lg transition ${currentPage === 'membership' ? 'bg-amber-100 text-amber-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}>Membership</button>
                  <button onClick={() => {handlePageChange('opportunities'); setShowSidebar(false);}} className={`w-full text-left px-4 py-3 rounded-lg transition ${currentPage === 'opportunities' ? 'bg-amber-100 text-amber-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}>Opportunities</button>
                  {isLoggedIn && (
                    <>
                      {userRole === 'admin' && (
                        <button onClick={() => {setCurrentPage('admin'); setShowSidebar(false);}} className="w-full text-left px-4 py-3 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition">Admin</button>
                      )}
                      <button onClick={() => {handleLogout(); setShowSidebar(false);}} className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition">Logout</button>
                    </>
                  )}
                  {!isLoggedIn && (
                    <button onClick={() => {setShowLogin(true); setShowSidebar(false);}} className="w-full text-left px-4 py-3 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition">Admin Login</button>
                  )}
                </nav>
              </div>
            </div>
          </div>
      </>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-700 font-semibold">Loading...</p>
          </div>
        </div>
      )}

      {showLogin && (
        <div className="fixed inset-0 bg-gradient-to-br from-amber-100 to-white flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h3>
            <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Email" />
            <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Password" />
            <button onClick={handleLogin} disabled={authLoading} className="w-full bg-amber-600 text-white py-3 rounded-lg mb-4 hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {authLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
            <p className="text-sm text-gray-500">Demo: admin@ysp.ph / admin123</p>
          </div>
        </div>
      )}

      {currentPage === 'home' && (
        <div>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Empowering Youth to Serve Communities</h2>
              <p className="text-base md:text-xl mb-6 md:mb-8">Join us in making a difference across the Philippines</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={() => handlePageChange('membership')} className="bg-white text-amber-700 px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg">Get Involved</button>
                <button onClick={() => handlePageChange('programs')} className="bg-transparent border-2 border-white text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-700 transition shadow-lg">Learn More</button>
              </div>
            </div>
          </section>
          
          {/* About Section */}
          <section className="py-8 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-8 md:mb-12">
                <h3 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">Who We Are</h3>
                <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">Youth Service Philippines is a non-profit organization dedicated to empowering young people to serve their communities through volunteerism, leadership development, and community engagement.</p>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                <div className="text-center p-4 md:p-6">
                  <div className="bg-amber-100 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="text-amber-700" size={28} />
                  </div>
                  <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Community Service</h4>
                  <p className="text-sm md:text-base text-gray-600">Engaging youth in meaningful service projects that benefit local communities.</p>
                </div>
                <div className="text-center p-4 md:p-6">
                  <div className="bg-amber-100 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4">
                    <Target className="text-amber-700" size={28} />
                  </div>
                  <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Leadership Development</h4>
                  <p className="text-sm md:text-base text-gray-600">Building tomorrow's leaders through training and mentorship programs.</p>
                </div>
                <div className="text-center p-4 md:p-6 sm:col-span-2 md:col-span-1">
                  <div className="bg-amber-100 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="text-amber-700" size={28} />
                  </div>
                  <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Nationwide Impact</h4>
                  <p className="text-sm md:text-base text-gray-600">Creating positive change across the Philippines through local chapters.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Programs Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-gray-800 mb-4">Our Programs</h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">Discover our diverse range of programs designed to empower youth and serve communities.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {programs.length > 0 ? (
                  programs.map((prog) => (
                    <div key={prog.id} className="bg-white rounded-lg shadow-md p-6 border-2 border-transparent hover:border-amber-500 transition-all cursor-pointer">
                      <h4 className="text-xl font-semibold text-amber-700 mb-2">{prog.title}</h4>
                      <p className="text-gray-600">{prog.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center text-gray-500">No programs yet. Check back soon!</div>
                )}
              </div>
            </div>
          </section>

          {/* Chapter Section */}
          <section className="py-8 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg shadow-lg p-6 md:p-12 text-center">
                <h3 className="text-2xl md:text-4xl font-bold mb-4">Want to Start a Chapter?</h3>
                <p className="text-base md:text-xl mb-6 max-w-2xl mx-auto">Join us in creating a local chapter of Youth Service Philippines in your area and make a difference in your community.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button onClick={() => window.open('https://forms.gle/cWPsgBJKLaQoLuUr8?fbclid=IwY2xjawOKRLJleHRuA2FlbQIxMABicmlkETFJWDhJY0U1azBWMDFLOXh2c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHm01_q8ZFNsR30YIkD2ODzju7eleolSNiJgUoZKW11PV7HAc0NeXszwCRjFU_aem_2mVtlAdu6_smAMkowigvAA')} className="bg-white text-amber-700 px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg">Create a Chapter</button>
                  <button onClick={() => setCurrentPage('membership')} className="bg-transparent border-2 border-white text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-700 transition shadow-lg">Join as Member</button>
                </div>
                <p className="text-xs md:text-sm text-amber-100 mt-4 md:mt-6">Our admin team will review your application and notify you shortly.</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {currentPage === 'programs' && (
        <div className="py-8 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8">Our Programs</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {programs.length > 0 ? programs.map(p => <div key={p.id} className="bg-white rounded-lg shadow-md p-4 md:p-6"><h3 className="text-lg md:text-xl font-semibold">{p.title}</h3><p className="text-sm md:text-base">{p.description}</p></div>) : <p className="text-gray-600">No programs yet.</p>}
            </div>
          </div>
        </div>
      )}

      {currentPage === 'membership' && (
        <div className="py-8 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8">Join Us</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-amber-700 mb-4">Become a Member</h3>
              <p className="text-sm md:text-base text-gray-700 mb-6">Join our community of passionate youth volunteers.</p>
              <button onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSdwMKgIjQNrlLH-j-Qdx0MrKxefxaLRC6gMI_oOgMTosDi_sQ/viewform')} className="w-full sm:w-auto bg-amber-600 text-white px-6 md:px-8 py-3 rounded-lg hover:bg-amber-700 transition shadow-lg">Get Started</button>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'opportunities' && (
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Volunteer Opportunities</h2>
            <div className="space-y-6">
              {opportunities.length > 0 ? opportunities.map(o => (
                <div key={o.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                  <h3 className="text-2xl font-bold text-amber-700 mb-3">{o.eventName}</h3>
                  <div className="flex items-center gap-4 text-gray-700 mb-2">
                    <span className="flex items-center gap-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {o.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {o.location}
                    </span>
                  </div>
                  <p className="text-gray-600">{o.description}</p>
                </div>
              )) : <p className="text-gray-600">No opportunities yet.</p>}
            </div>
          </div>
        </div>
      )}



      {currentPage === 'admin' && isLoggedIn && userRole === 'admin' && (
        <div className="py-8 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            {/* Dashboard Header */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">Admin Dashboard</h2>
                  <p className="text-amber-100 text-sm md:text-base">Manage programs, opportunities, and content</p>
                </div>
                <button onClick={handleLogout} disabled={authLoading} className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
                  {authLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-red-600 border-t-transparent"></div>
                      <span>Logging out...</span>
                    </>
                  ) : (
                    <>
                      <LogOut size={20} /> Logout
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Total Programs</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-800">{programs.length}</p>
                  </div>
                  <div className="bg-amber-100 rounded-full p-3">
                    <Target className="text-amber-600" size={24} />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Opportunities</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-800">{opportunities.length}</p>
                  </div>
                  <div className="bg-blue-100 rounded-full p-3">
                    <Users className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Active Events</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-800">{opportunities.filter(o => new Date(o.date) >= new Date()).length}</p>
                  </div>
                  <div className="bg-green-100 rounded-full p-3">
                    <MapPin className="text-green-600" size={24} />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Admin Status</p>
                    <p className="text-lg md:text-xl font-bold text-green-600">Active</p>
                  </div>
                  <div className="bg-purple-100 rounded-full p-3">
                    <Bot className="text-purple-600" size={24} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-amber-100 rounded-lg p-2">
                    <Plus className="text-amber-600" size={24} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">Add New Program</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Program Title</label>
                    <input
                      type="text"
                      placeholder="Enter program title"
                      value={newProgram.title}
                      onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      placeholder="Enter program description"
                      value={newProgram.description}
                      onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition h-24 resize-none"
                    />
                  </div>
                  <button onClick={addProgram} className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-amber-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg">
                    <Plus size={20} /> Add Program
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-100 rounded-lg p-2">
                    <Target className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">Manage Programs</h3>
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {programs.length > 0 ? (
                    programs.map(prog => (
                      <div key={prog.id} className="border border-gray-200 rounded-lg p-4 hover:border-amber-300 transition-colors">
                        {editingProgram === prog.id ? (
                          <div className="space-y-3">
                            <input
                              type="text"
                              defaultValue={prog.title}
                              onChange={(e) => updateProgram(prog.id, { title: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            <textarea
                              defaultValue={prog.description}
                              onChange={(e) => updateProgram(prog.id, { description: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 h-16 resize-none"
                            />
                            <button onClick={() => saveProgram(prog.id)} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition">
                              <Save size={16} /> Save Changes
                            </button>
                          </div>
                        ) : (
                          <>
                            <h4 className="font-bold text-lg text-gray-800 mb-2">{prog.title}</h4>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{prog.description}</p>
                            <div className="flex gap-2">
                              <button onClick={() => setEditingProgram(prog.id)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-blue-700 transition">
                                <Edit2 size={16} /> Edit
                              </button>
                              <button onClick={() => deleteProgram(prog.id)} className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-red-700 transition">
                                <Trash2 size={16} /> Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Target className="text-gray-300 mx-auto mb-3" size={48} />
                      <p className="text-gray-500">No programs yet. Add one to get started.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 rounded-lg p-2">
                <MapPin className="text-green-600" size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Volunteer Opportunities</h2>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Event Name"
                  value={newOpportunity.eventName}
                  onChange={(e) => setNewOpportunity({ ...newOpportunity, eventName: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                />
                <input
                  type="date"
                  value={newOpportunity.date}
                  onChange={(e) => setNewOpportunity({ ...newOpportunity, date: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newOpportunity.location}
                  onChange={(e) => setNewOpportunity({ ...newOpportunity, location: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                />
                <button onClick={addOpportunity} className="bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-amber-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg">
                  <Plus size={20} /> Add Opportunity
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Enter event description"
                  value={newOpportunity.description}
                  onChange={(e) => setNewOpportunity({ ...newOpportunity, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition h-24 resize-none"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-3 text-left">Event Name</th>
                      <th className="border p-3 text-left">Date</th>
                      <th className="border p-3 text-left">Location</th>
                      <th className="border p-3 text-left">Description</th>
                      <th className="border p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {opportunities.length > 0 ? (
                      opportunities.map(opp => (
                        <tr key={opp.id}>
                          <td className="border p-3">
                            {editingOpportunity === opp.id ? (
                              <input
                                type="text"
                                defaultValue={opp.eventName}
                                onChange={(e) => updateOpportunity(opp.id, { eventName: e.target.value })}
                                className="w-full p-2 border rounded"
                              />
                            ) : (
                              opp.eventName
                            )}
                          </td>
                          <td className="border p-3">
                            {editingOpportunity === opp.id ? (
                              <input
                                type="date"
                                defaultValue={opp.date}
                                onChange={(e) => updateOpportunity(opp.id, { date: e.target.value })}
                                className="w-full p-2 border rounded"
                              />
                            ) : (
                              opp.date
                            )}
                          </td>
                          <td className="border p-3">
                            {editingOpportunity === opp.id ? (
                              <input
                                type="text"
                                defaultValue={opp.location}
                                onChange={(e) => updateOpportunity(opp.id, { location: e.target.value })}
                                className="w-full p-2 border rounded"
                              />
                            ) : (
                              opp.location
                            )}
                          </td>
                          <td className="border p-3">
                            {editingOpportunity === opp.id ? (
                              <textarea
                                defaultValue={opp.description}
                                onChange={(e) => updateOpportunity(opp.id, { description: e.target.value })}
                                className="w-full p-2 border rounded h-16"
                              />
                            ) : (
                              opp.description
                            )}
                          </td>
                          <td className="border p-3">
                            {editingOpportunity === opp.id ? (
                              <button onClick={() => saveOpportunity(opp.id)} className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm">
                                <Save size={16} /> Save
                              </button>
                            ) : (
                              <div className="flex gap-2">
                                <button onClick={() => setEditingOpportunity(opp.id)} className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm">
                                  <Edit2 size={16} /> Edit
                                </button>
                                <button onClick={() => deleteOpportunity(opp.id)} className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm">
                                  <Trash2 size={16} /> Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="border p-3 text-center text-gray-500">No opportunities yet. Add one to get started.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Floating Button */}
      {currentPage !== 'admin' && (
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-8 right-8 bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition z-50"
      >
        {showChat ? <X size={24} /> : <Bot size={24} />}
      </button>
      )}

      {/* Chatbot Window */}
      {showChat && currentPage !== 'admin' && (
        <div className="fixed bottom-24 right-8 w-96 bg-white rounded-lg shadow-2xl z-50 flex flex-col" style={{maxHeight: '500px'}}>
          <div className="bg-orange-600 text-white p-4 rounded-t-lg">
            <h3 className="font-bold text-lg">YSP Assistant</h3>
            <p className="text-sm text-orange-100">How can I help you today?</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{maxHeight: '350px'}}>
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-orange-600"
              />
              <button
                onClick={handleSendMessage}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Youth Service Philippines</h3>
              <p className="text-gray-400 text-sm">Empowering youth to serve communities across the Philippines through volunteerism and leadership.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <p className="text-gray-400 text-sm mb-2"><strong>Email:</strong> phyouthservice@gmail.com</p>
              <p className="text-gray-400 text-sm mb-2"><strong>Phone:</strong> 09177798413</p>
              <p className="text-gray-400 text-sm"><strong>Facebook:</strong> iVolunteer Philippines</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><button onClick={() => handlePageChange('home')} className="text-gray-400 text-sm hover:text-white transition">Home</button></li>
                <li><button onClick={() => handlePageChange('programs')} className="text-gray-400 text-sm hover:text-white transition">Programs</button></li>
                <li><button onClick={() => handlePageChange('membership')} className="text-gray-400 text-sm hover:text-white transition">Membership</button></li>
                <li><button onClick={() => handlePageChange('opportunities')} className="text-gray-400 text-sm hover:text-white transition">Opportunities</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <a
                href="https://www.facebook.com/ivolunteerphils"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook Page
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-400 text-sm">&copy; 2026 Youth Service Philippines. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default YSPWebsite;
