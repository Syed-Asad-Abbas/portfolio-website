import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Shield,
  Search,
  Lock,
  Cpu,
  Globe,
  FileText,
  Award,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronRight,
  Code
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [typedText, setTypedText] = useState('');
  const [terminalPhase, setTerminalPhase] = useState(0);
  const [whoamiPropText, setWhoamiPropText] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'output', content: 'Type "help" to see available commands.' }
  ]);
  const [commandInput, setCommandInput] = useState('');
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
  const terminalContainerRef = React.useRef(null);

  const fullText = "Analyzing threats. Securing environments. Building resilience.";
  const fullWhoamiText = "whoami";

  // Typing animation effect for hero main text
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setTimeout(() => setTerminalPhase(1), 500); // Start terminal after text finishes
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Typing animation for terminal whoami
  useEffect(() => {
    if (terminalPhase === 1) {
      let i = 0;
      const interval = setInterval(() => {
        setWhoamiPropText(fullWhoamiText.slice(0, i));
        i++;
        if (i > fullWhoamiText.length) {
          clearInterval(interval);
          setTimeout(() => {
            setTerminalHistory(prev => [
              ...prev,
              { type: 'input', content: 'whoami' },
              { type: 'output', content: 'A cybersecurity professional certified in Phishing Prevention and Digital Forensics, focused on offensive security and threat hunting. Currently building defensive tools and exploring AI-driven security operations.' }
            ]);
            setTerminalPhase(2);
          }, 400); // Output the result after typing finishes
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [terminalPhase]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const cmd = commandInput.trim().toLowerCase();
    const newHistory = [...terminalHistory, { type: 'input', content: commandInput }];

    if (cmd === 'clear') {
      setTerminalHistory([]);
      setCommandInput('');
      return;
    } else if (cmd === 'whoami') {
      newHistory.push({ type: 'output', content: 'A cybersecurity professional certified in Phishing Prevention and Digital Forensics, focused on offensive security and threat hunting. Currently building defensive tools and exploring AI-driven security operations.' });
    } else if (cmd === 'ls skills' || cmd === 'ls skills/') {
      newHistory.push({ type: 'output', content: '> Threat Intelligence\n> Digital Forensics\n> Cloud Security\n> Automated Defense\n> Pen Testing' });
    } else if (cmd === 'projects') {
      newHistory.push({ type: 'output', content: 'Navigating to Tactical Operations...' });
      setTimeout(() => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else if (cmd === 'certs' || cmd === 'certifications') {
      newHistory.push({ type: 'output', content: 'Navigating to Certifications...' });
      setTimeout(() => {
        document.getElementById('certs')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else if (cmd === 'help') {
      newHistory.push({ type: 'output', content: 'Available commands:\n  whoami         - Display profile information\n  ls skills      - List technical skills\n  projects       - View tactical operations and projects\n  certs          - View active certifications\n  clear          - Clear terminal history\n  contact        - Display contact details\n  help           - Show this help message' });
    } else if (cmd === 'contact') {
      newHistory.push({ type: 'output', content: 'Displaying contact details...\nEmail: syedasadabbas.1815@gmail.com\nLinkedIn: www.linkedin.com/in/syedasadabbas1815' });
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      newHistory.push({ type: 'error', content: `bash: ${cmd}: command not found` });
    }

    setTerminalHistory(newHistory);
    setCommandInput('');
  };

  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [terminalHistory, whoamiPropText, terminalPhase]);

  const projects = [
    {
      id: 1,
      title: "Honeypot Dashboard",
      category: "Blue Team",
      description: "Developed a comprehensive Honeypot Dashboard to monitor threats, visualize metrics, and track protocol exposure in real-time.",
      tools: ["React", "Data Pipeline", "Threat Intelligence"],
      link: "https://honeypotdashboard.netlify.app",
      thumbnail: "https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Multimodal Phishing Detection System",
      category: "Forensics",
      description: "Built an advanced AI-driven phishing detection engine analyzing URL, DOM, and Visual features to identify malicious domains.",
      tools: ["Python", "Machine Learning", "DOM Analysis"],
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Wazuh Home Lab",
      category: "Red Team",
      description: "Simulated an enterprise environment to map attack paths using BloodHound, documenting privilege escalation vectors from Domain User to DA.",
      tools: ["Windows Server", "BloodHound", "PowerShell"],
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Cloud Security Auditor",
      category: "Cloud",
      description: "Developed a Python script to audit AWS S3 bucket permissions and IAM roles for misconfigurations based on CIS Benchmarks.",
      tools: ["Boto3", "Python", "Cloud Security"],
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1614064641913-6b67fd9d39c3?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const filteredProjects = activeTab === 'all'
    ? projects
    : projects.filter(p => p.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-mono selection:bg-emerald-500/30 selection:text-emerald-400">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20"></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-emerald-500">
            <Shield size={24} />
            <span className="tracking-tighter text-xl uppercase">Root@Portfolio: ~</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest">
            <a href="#about" className="hover:text-emerald-400 transition-colors">./About</a>
            <a href="#projects" className="hover:text-emerald-400 transition-colors">./Projects</a>
            <a href="#certs" className="hover:text-emerald-400 transition-colors">./Certifications</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors px-4 py-2 border border-emerald-500/30 rounded bg-emerald-500/10 hover:bg-emerald-500/20 transition-all">Connect</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-24 pb-16 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-xs mb-6 animate-pulse">
            [ SYSTEM STATUS: SECURE ]
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tighter leading-tight flex flex-col md:block">
            SYED MUHAMMAD <span className="text-emerald-500 underline decoration-emerald-500/30 decoration-wavy underline-offset-8">ASAD ABBAS</span>
          </h1>
          <div className="flex items-center gap-2 mb-8 text-xl text-slate-400 font-light">
            <ChevronRight size={24} className="text-emerald-500" />
            <span className="min-h-[1.5em]">{typedText}<span className="animate-ping">|</span></span>
          </div>

          {/* Terminal Box */}
          <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden shadow-2xl transition-all duration-300">
            <div className="bg-slate-800 px-4 py-2 flex justify-between border-b border-slate-700 items-center">
              <div className="flex items-center">
                <div
                  className="flex gap-1.5 cursor-pointer group p-1"
                  onClick={() => setIsTerminalMinimized(!isTerminalMinimized)}
                  title={isTerminalMinimized ? "Expand Terminal" : "Minimize Terminal"}
                >
                  <div className="w-3 h-3 rounded-full bg-red-500/50 group-hover:bg-red-500 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/50 group-hover:bg-amber-500 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50 group-hover:bg-emerald-500 transition-colors"></div>
                </div>
                <div className="text-[10px] text-slate-500 ml-2 uppercase tracking-widest">bash — profile.sh</div>
              </div>
            </div>
            {!isTerminalMinimized ? (
              <div
                ref={terminalContainerRef}
                className="p-6 text-sm md:text-base leading-relaxed text-emerald-500/90 space-y-4 max-h-80 overflow-y-auto font-mono scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
              >
                {terminalHistory.map((line, index) => (
                  <div key={index} className={line.type === 'error' ? 'text-red-400' : ''}>
                    {line.type === 'input' ? (
                      <p><span className="text-slate-500">$</span> {line.content}</p>
                    ) : (
                      <div className="text-slate-300 whitespace-pre-wrap">{line.content}</div>
                    )}
                  </div>
                ))}

                {terminalPhase === 0 && (
                  <p><span className="text-slate-500">$</span> <span className="animate-pulse">_</span></p>
                )}

                {terminalPhase === 1 && (
                  <p><span className="text-slate-500">$</span> {whoamiPropText}<span className="animate-pulse">_</span></p>
                )}

                {terminalPhase === 2 && (
                  <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 animate-fade-in">
                    <span className="text-slate-500">$</span>
                    <input
                      type="text"
                      value={commandInput}
                      onChange={(e) => setCommandInput(e.target.value)}
                      className="bg-transparent border-none outline-none flex-grow text-emerald-500/90 placeholder-emerald-500/30"
                      placeholder="type 'help' for available commands"
                      spellCheck="false"
                      autoComplete="off"
                    />
                  </form>
                )}
              </div>
            ) : (
              <div className="p-4 flex items-center justify-center text-slate-500">
                <button
                  onClick={() => setIsTerminalMinimized(false)}
                  className="text-xs hover:text-emerald-500 transition-colors tracking-widest uppercase flex items-center gap-2"
                >
                  Terminal is minimized <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-20 px-6 border-t border-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Terminal className="text-emerald-500" /> ./Tactical_Operations
              </h2>
              <p className="text-slate-400">Documentation of defensive and offensive research projects.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {['all', 'Blue Team', 'Red Team', 'Forensics', 'Cloud'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded text-xs uppercase tracking-widest transition-all ${activeTab === tab
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'border border-slate-800 hover:border-slate-600 text-slate-400'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="group relative bg-slate-900 border border-slate-800 rounded-lg hover:border-emerald-500/50 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Thumbnail Container */}
                <div className="h-48 w-full overflow-hidden relative border-b border-slate-800">
                  <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-4 right-4 text-[10px] uppercase font-bold text-emerald-500 bg-slate-950/80 px-2 py-1 rounded backdrop-blur z-20 tracking-widest border border-emerald-500/20">
                    [{project.category}]
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold mb-3 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tools.map(tool => (
                      <span key={tool} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700 uppercase">
                        {tool}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target={project.link !== '#' ? "_blank" : undefined}
                    rel={project.link !== '#' ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors group/link mt-auto"
                  >
                    VIEW PROJECT <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certs & Stats */}
      <section id="certs" className="py-20 px-6 bg-slate-900/50 border-t border-slate-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Award className="text-emerald-500" /> ./Certifications
            </h2>
            <div className="space-y-4">
              {[
                { name: "Certified Phishing Prevention Specialist (CPPS)", issuer: "Security", date: "Active" },
                { name: "Digital Forensics & Incident Investigation", issuer: "Forensics", date: "Active" },
                { name: "Intro to Offensive Security with AI", issuer: "Security & AI", date: "Active" },
                { name: "Intro to Critical Infrastructure Protection (ICIP)", issuer: "Infrastructure", date: "Active" },
                { name: "Google Cloud Computing Foundations: Networking and Security", issuer: "Google Cloud", date: "Active" }
              ].map(cert => (
                <div key={cert.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-800 rounded bg-slate-950/50 gap-2">
                  <div>
                    <div className="text-sm font-bold line-clamp-2">{cert.name}</div>
                    <div className="text-xs text-slate-500">{cert.issuer}</div>
                  </div>
                  <div className="text-xs text-emerald-500 font-mono whitespace-nowrap">[{cert.date}]</div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity/Stats */}
          <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Search className="text-emerald-500" /> ./Intelligence
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 border border-slate-800 bg-slate-950/50 rounded flex flex-col items-center">
                <div className="text-3xl font-bold text-emerald-500 mb-1">Focus</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest text-center">Threat Hunting</div>
              </div>
              <div className="p-6 border border-slate-800 bg-slate-950/50 rounded flex flex-col items-center">
                <div className="text-3xl font-bold text-emerald-500 mb-1">Ready</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest text-center">Incident Response</div>
              </div>
              <div className="p-6 border border-slate-800 bg-slate-950/50 rounded flex flex-col items-center">
                <div className="text-3xl font-bold text-emerald-500 mb-1">Active</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest text-center">Security Research</div>
              </div>
              <div className="p-6 border border-slate-800 bg-slate-950/50 rounded flex flex-col items-center">
                <div className="text-3xl font-bold text-emerald-500 mb-1">100%</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest text-center">Secure By Default</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-20 px-6 border-t border-slate-900 bg-slate-950 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold mb-4 tracking-tighter uppercase">Ready to deploy?</h2>
          <p className="text-slate-400 mb-10 max-w-lg mx-auto leading-relaxed">
            I'm currently looking for cybersecurity, SOC Analyst, or Incident Response roles. Let's build something secure together.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="mailto:syedasadabbas.1815@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-slate-950 rounded font-bold hover:bg-emerald-400 transition-all">
              <Mail size={18} /> syedasadabbas.1815@gmail.com
            </a>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/syedasadabbas1815" target="_blank" rel="noopener noreferrer" className="p-3 border border-slate-800 rounded hover:border-emerald-500 transition-all">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-3 border border-slate-800 rounded hover:border-emerald-500 transition-all">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div className="text-[10px] text-slate-600 uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} syed-asad-abbas // secure-by-default
          </div>
        </div>

        {/* Subtle Matrix-style fade out */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none"></div>
      </footer>
    </div>
  );
};

export default App;
