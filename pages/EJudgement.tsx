
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenHeader } from '../components/Shared';
import { RefreshCw, Search, Calendar, MapPin, Scale, FileText, User, ChevronDown, Download, Gavel, Users, Tag, ChevronUp } from 'lucide-react';

// Exact data structure based on the provided eJudgement output
const MOCK_RESULTS = [
  {
    id: 'j1',
    bil: 1,
    caseNo: '05(RJ)-11-12/2024(P)',
    court: 'Mahkamah Persekutuan',
    parties: {
      appellant: 'Pendakwa Raya',
      respondent: 'JIVA A/L GOPAL KRISHNAN'
    },
    keywords: [
      "Jenayah — Hukuman mati — Semakan hukuman mati — semakan hukuman mati selepas diberi pengampunan oleh Lembaga Pengampunan",
      "Perlembagaan Persekutuan — Perkara 42 — Pengampunan Diraja — Kuasa Lembaga Pengampunan — Keputusan pengampunan — Sama ada boleh dicabar melalui semakan kehakiman",
      "Mahkamah Persekutuan — Bidang kuasa — Bidang kuasa penyemakan sementara — Semakan hukuman mati — s. 2 Akta Semakan Hukuman Mati dan Penjara Sepanjang Hayat (Bidang Kuasa Sementara Mahkamah Persekutuan) 2023 (Akta 847)",
      "Amalan dan Prosedur — Kaedah 137 Kaedah-Kaedah Mahkamah Persekutuan 1995 — Permohonan semakan hukuman — Sama ada terpakai selepas pengampunan Diraja",
      "Lembaga Pengampunan — Kuasa perlembagaan — Keputusan mengubah hukuman mati — Kesan terhadap bidang kuasa Mahkamah Persekutuan",
      "Isu Undang-Undang — Sama ada seseorang yang telah dihukum mati dan kemudiannya memperoleh pengampunan di bawah Perkara 42 Perlembagaan Persekutuan berhak/boleh mengemukakan permohonan semakan semula hukuman mati — Sama ada Mahkamah Persekutuan mempunyai bidang kuasa penyemakan sementara di bawah s. 2 Akta 847 selepas hukuman diubah oleh Lembaga Pengampunan"
    ],
    decisionDate: '12/11/2025',
    uploadDate: '18/12/2025',
    quorum: [
      "YAA Datuk Seri Utama Wan Ahmad Farid Bin Wan Salleh",
      "YAA Dato' Abu Bakar Bin Jais",
      "YAA Tan Sri Hasnah binti Dato' Mohammed Hashim",
      "YAA Datuk Hajah Azizah binti Haji Nawawi",
      "YA Dato' Che Mohd Ruzima Bin Ghazali"
    ],
    judgments: [
      {
        judge: "YA Dato' Che Mohd Ruzima Bin Ghazali",
        type: "Alasan Penghakiman",
        decision: "Sebulat Suara (Unanimous)",
        file: "Alasan Penghakiman.pdf"
      },
      {
        judge: "YAA Datuk Seri Utama Wan Ahmad Farid Bin Wan Salleh",
        type: "Supporting Judgment",
        decision: "Sebulat Suara (Unanimous)",
        file: "supporting judgment.pdf"
      }
    ]
  }
];

const EJudgement: React.FC = () => {
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expandedKeywords, setExpandedKeywords] = useState<Record<string, boolean>>({});

  const [form, setForm] = useState({
    category: 'Mahkamah Persekutuan',
    location: '',
    decisionDateFrom: '',
    decisionDateTo: '',
    uploadDateFrom: '',
    uploadDateTo: '',
    caseType: '',
    generalSearch: '',
    judgeName: ''
  });

  const handleReset = () => {
    setForm({
      category: 'Mahkamah Persekutuan',
      location: '',
      decisionDateFrom: '',
      decisionDateTo: '',
      uploadDateFrom: '',
      uploadDateTo: '',
      caseType: '',
      generalSearch: '',
      judgeName: ''
    });
    setShowResults(false);
  };

  const handleSearch = () => {
    setLoading(true);
    // Simulate API scraping delay
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 1200);
  };

  const toggleKeywords = (id: string) => {
    setExpandedKeywords(prev => ({...prev, [id]: !prev[id]}));
  };

  return (
    <div className="pb-32 bg-background min-h-screen animate-page-enter">
      <ScreenHeader 
        title="eJudgement" 
        subtitle="Sistem Pencarian Alasan Penghakiman"
        onBack={() => navigate('/more')}
      />

      <div className="px-6 mt-6">
        
        {/* SEARCH FORM CARD */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
           <div className="bg-slate-50 border-b border-slate-100 p-4">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-600" />
                Kriteria Carian
              </h2>
           </div>

           <div className="p-5 space-y-5">
              
              {/* Kategori Mahkamah */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Kategori Mahkamah</label>
                <div className="relative">
                  <select 
                    className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl p-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                    value={form.category}
                    onChange={e => setForm({...form, category: e.target.value})}
                  >
                    <option>Mahkamah Persekutuan</option>
                    <option>Mahkamah Rayuan</option>
                    <option>Mahkamah Tinggi</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Lokasi Mahkamah */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Lokasi Mahkamah</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium placeholder-slate-400"
                    placeholder="Sila Pilih / Taip Lokasi"
                    value={form.location}
                    onChange={e => setForm({...form, location: e.target.value})}
                  />
                </div>
              </div>

              <div className="h-px bg-slate-100 my-2"></div>

              {/* Tarikh Keputusan */}
              <div>
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Tarikh Keputusan</label>
                 <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input type="date" className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-2.5 focus:outline-none focus:border-blue-500" 
                        value={form.decisionDateFrom} onChange={e => setForm({...form, decisionDateFrom: e.target.value})}
                      />
                    </div>
                    <span className="text-xs text-slate-400 font-bold">Hingga</span>
                    <div className="relative flex-1">
                      <input type="date" className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-2.5 focus:outline-none focus:border-blue-500" 
                         value={form.decisionDateTo} onChange={e => setForm({...form, decisionDateTo: e.target.value})}
                      />
                    </div>
                 </div>
              </div>

              {/* Tarikh AP Dimuat Naik */}
              <div>
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Tarikh AP Dimuat Naik</label>
                 <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input type="date" className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-2.5 focus:outline-none focus:border-blue-500" 
                        value={form.uploadDateFrom} onChange={e => setForm({...form, uploadDateFrom: e.target.value})}
                      />
                    </div>
                    <span className="text-xs text-slate-400 font-bold">Hingga</span>
                    <div className="relative flex-1">
                      <input type="date" className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-2.5 focus:outline-none focus:border-blue-500" 
                        value={form.uploadDateTo} onChange={e => setForm({...form, uploadDateTo: e.target.value})}
                      />
                    </div>
                 </div>
              </div>

              <div className="h-px bg-slate-100 my-2"></div>

              {/* Jenis Kes */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Jenis Kes</label>
                <div className="relative">
                  <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select 
                    className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl py-3 pl-10 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                    value={form.caseType}
                    onChange={e => setForm({...form, caseType: e.target.value})}
                  >
                    <option value="">Sila Pilih</option>
                    <option value="Sivil">Sivil (Civil)</option>
                    <option value="Jenayah">Jenayah (Criminal)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Carian Umum */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Carian Umum</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <textarea 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium placeholder-slate-400 min-h-[80px]"
                    placeholder="Carian adalah berdasarkan Nombor Kes, Pihak-Pihak & Kata Kunci"
                    value={form.generalSearch}
                    onChange={e => setForm({...form, generalSearch: e.target.value})}
                  />
                </div>
              </div>

              {/* Nama Hakim */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Nama Hakim</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium placeholder-slate-400"
                    placeholder="Nama Hakim"
                    value={form.judgeName}
                    onChange={e => setForm({...form, judgeName: e.target.value})}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                 <button 
                  onClick={handleReset}
                  className="flex-1 py-3.5 border border-slate-200 text-slate-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
                 >
                   <RefreshCw className="w-4 h-4" />
                   Reset
                 </button>
                 <button 
                  onClick={handleSearch}
                  disabled={loading}
                  className="flex-1 py-3.5 bg-blue-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20 active:scale-[0.98]"
                 >
                   {loading ? (
                     <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                   ) : (
                     <>
                       <Search className="w-4 h-4" />
                       Cari
                     </>
                   )}
                 </button>
              </div>

              <p className="text-[10px] text-center text-slate-400 italic font-medium">
                *Sila tekan butang 'Cari' bagi mendapatkan senarai keseluruhan Alasan Penghakiman.
              </p>
           </div>
        </div>

        {/* RESULTS SECTION */}
        {showResults && (
          <div className="animate-slide-up space-y-6">
             <div className="flex items-center justify-between px-1">
                <h3 className="font-bold text-slate-900">Senarai Alasan Penghakiman</h3>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{MOCK_RESULTS.length} Rekod Ditemui</span>
             </div>

             {MOCK_RESULTS.map((res) => (
                <div key={res.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                   
                   {/* Header: Case No & Court */}
                   <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">Bil. {res.bil}</span>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{res.court}</span>
                        </div>
                        <h4 className="font-bold text-blue-900 text-sm break-all">{res.caseNo}</h4>
                      </div>
                      <div className="text-right shrink-0">
                         <div className="flex flex-col items-end">
                            <span className="text-[10px] text-slate-400 uppercase font-bold">Tarikh Keputusan</span>
                            <span className="text-xs font-bold text-slate-700">{res.decisionDate}</span>
                         </div>
                      </div>
                   </div>

                   <div className="p-5 space-y-6">
                      {/* Parties */}
                      <div>
                        <div className="flex items-start gap-3 mb-2">
                             <Users className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                             <div className="flex-1">
                                <p className="text-xs font-bold text-slate-500 mb-0.5">PERAYU</p>
                                <p className="text-sm font-bold text-slate-900 mb-2">{res.parties.appellant}</p>
                                <div className="w-full h-px bg-slate-100 mb-2"></div>
                                <p className="text-xs font-bold text-slate-500 mb-0.5">RESPONDEN</p>
                                <p className="text-sm font-bold text-slate-900">{res.parties.respondent}</p>
                             </div>
                        </div>
                      </div>

                      {/* Keywords */}
                      <div className="bg-amber-50/50 rounded-xl p-3 border border-amber-100">
                        <div 
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => toggleKeywords(res.id)}
                        >
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4 text-amber-500" />
                                <span className="text-xs font-bold text-amber-700 uppercase">Kata Kunci (Keywords)</span>
                            </div>
                            {expandedKeywords[res.id] ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-amber-400" />}
                        </div>
                        
                        <div className={`mt-2 space-y-2 overflow-hidden transition-all ${expandedKeywords[res.id] ? 'max-h-[1000px]' : 'max-h-24'}`}>
                            {res.keywords.map((kw, idx) => (
                                <p key={idx} className="text-xs text-slate-700 leading-relaxed pl-6 relative">
                                    <span className="absolute left-1 top-1.5 w-1.5 h-1.5 bg-amber-300 rounded-full"></span>
                                    {kw}
                                </p>
                            ))}
                            {!expandedKeywords[res.id] && (
                                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-amber-50 to-transparent pointer-events-none"></div>
                            )}
                        </div>
                      </div>

                      {/* Judges / Quorum */}
                      <div>
                          <h5 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-3">
                              <Gavel className="w-4 h-4" /> Korum & Hakim
                          </h5>
                          <div className="space-y-3 pl-2 border-l-2 border-slate-100 ml-1.5">
                              {res.quorum.map((judge, idx) => (
                                  <div key={idx} className="pl-3 text-xs text-slate-700 font-medium">
                                      {judge}
                                  </div>
                              ))}
                          </div>
                      </div>

                      {/* Documents */}
                      <div>
                          <h5 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-3">
                              <FileText className="w-4 h-4" /> Dokumen Penghakiman
                          </h5>
                          <div className="space-y-3">
                              {res.judgments.map((doc, idx) => (
                                  <div key={idx} className="flex items-start justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                                      <div className="pr-4">
                                          <p className="text-xs font-bold text-blue-800 uppercase mb-1">{doc.type}</p>
                                          <p className="text-xs text-slate-600 mb-1">Oleh: <span className="font-semibold text-slate-800">{doc.judge}</span></p>
                                          <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-100">{doc.decision}</span>
                                      </div>
                                      <button className="p-2 bg-white border border-slate-200 rounded-lg text-blue-600 shadow-sm hover:shadow-md active:scale-95 transition-all">
                                          <Download className="w-5 h-5" />
                                      </button>
                                  </div>
                              ))}
                          </div>
                      </div>

                      <div className="pt-2 text-[10px] text-right text-slate-400">
                          Tarikh AP Dimuat Naik: <span className="font-bold text-slate-600">{res.uploadDate}</span>
                      </div>

                   </div>
                </div>
             ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default EJudgement;
