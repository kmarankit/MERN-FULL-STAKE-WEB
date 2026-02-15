import React, { useState, useEffect } from "react";
import { CgCalendarDates } from "react-icons/cg";
import { FaAddressCard, FaChevronLeft, FaChevronRight, FaLocationCrosshairs, FaBusinessTime } from "react-icons/fa6";
import { MdMoreTime, MdAutoGraph } from "react-icons/md";
import { BsDisplay } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import VisitorsLocation from "./VisitorsLocation";

const FetchVisitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchVisitorsData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:4000/api/visitors");
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        // Defensive check to ensure data is an array
        setVisitors(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisitorsData();
  }, []);

  // Helper functions
  const getShortId = (id) => id?.slice(-12).toUpperCase() || "UNKNOWN";

  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const parsed = new Date(dateStr);
    if (!isNaN(parsed)) return parsed;

    const parts = dateStr.split(",");
    if (parts.length >= 2) {
      const [d, m, y] = parts[0].trim().split("/");
      const time = parts[1].trim();
      return new Date(`${y}-${m}-${d} ${time}`);
    }
    return null;
  };

  const isToday = (dateStr) => {
    const date = parseDate(dateStr);
    if (!date) return false;
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };
  
  const getSessionDuration = (s) => {
    if (!s?.sessionStartTime) return 0;
    const start = new Date(s.sessionStartTime);
    const end = s.sessionEndTime ? new Date(s.sessionEndTime) : new Date();
    if (isNaN(start) || isNaN(end)) return 0;
    return Math.max(0, (end - start) / 60000); // minutes
  };
  
  const safeDate = (dateStr) => {
    const d = parseDate(dateStr);
    return d ? d.toLocaleString() : "N/A";
  };
  
  // ✅ FIXED: Pre-calculated stats with a fallback to an empty array to prevent crashes.
  const totalSpentTime = (visitors || []).reduce((sum, v) => {
    if (!Array.isArray(v.sessions)) return sum;
    return sum + v.sessions.reduce((sSum, s) => sSum + getSessionDuration(s), 0);
  }, 0);

  const todaySpentTime = (visitors || []).reduce((sum, v) => {
    if (!Array.isArray(v.sessions)) return sum;
    return (
      sum +
      v.sessions.reduce((sSum, s) => {
        if (!isToday(s.sessionStartTime)) return sSum;
        return sSum + getSessionDuration(s);
      }, 0)
    );
  }, 0);

  const totalSessions = (visitors || []).reduce(
    (sum, v) => sum + (Array.isArray(v.sessions) ? v.sessions.length : 0),
    0
  );

  return (
    <div className="relative min-h-screen md:flex bg-gray-50">
      {/* OVERLAY for mobile view when sidebar is open */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-white border-r shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } 
        md:relative md:translate-x-0 transition-all duration-300 ease-in-out z-30 
        ${isSidebarOpen ? "w-64" : "md:w-20"}`
      }>
        <div className="p-5 h-full overflow-y-auto">
          <div className={`transition-opacity duration-200 ${isSidebarOpen ? "opacity-100" : "md:opacity-0 md:pointer-events-none"}`}>
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <button className="bg-green-700 px-4 py-1.5 rounded-md text-white hover:bg-green-600 transition text-sm">
                Today
              </button>
              <FaLocationCrosshairs className="h-6 w-6 text-green-700 cursor-pointer hover:text-gray-600 transition" />
            </div>

            {isLoading && <p className="text-center text-gray-500">Loading...</p>}
            {error && <p className="text-center text-red-500 text-sm">Server Down at this time.</p>}
            
            {!isLoading && !error && (
              visitors.length > 0 ? (
                <ul className="space-y-2">
                  {visitors.map((visitor) => {
                    const shortId = getShortId(visitor.visitorId);
                    const sessionNumber = Array.isArray(visitor.sessions) ? visitor.sessions.length : 0;
                    const isNew = visitor.sessions?.some(s => isToday(s.sessionStartTime));

                    return (
                      <li
                        key={visitor.visitorId}
                        onClick={() => {
                          setSelectedVisitor(visitor);
                          if (window.innerWidth < 768) {
                            setIsSidebarOpen(false);
                          }
                        }}
                        className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer border transition ${
                          selectedVisitor?.visitorId === visitor.visitorId
                            ? "bg-green-600 text-white shadow"
                            : "bg-gray-50 hover:bg-green-100"
                        }`}
                      >
                        <span className="font-mono text-sm uppercase">{shortId}</span>
                        <span className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
                            selectedVisitor?.visitorId === visitor.visitorId
                              ? "bg-white text-green-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {sessionNumber}
                          {isNew && <span className="ml-1 text-[10px] font-bold bg-green-200 px-1 rounded">NEW</span>}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-center text-gray-500">No visitors found</p>
              )
            )}
          </div>
        </div>
      </aside>
      
      {/* Sidebar Toggle Button (for desktop) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="hidden md:flex items-center justify-center
                   absolute top-10 bg-white border rounded-full
                   h-8 w-8 shadow-md hover:bg-gray-100 transition z-40"
        style={{ left: isSidebarOpen ? '15rem' : '4rem' }}
      >
        {isSidebarOpen ? <FaChevronLeft size={14} /> : <FaChevronRight size={14} />}
      </button>

      {/* Main Content */}
      <main className={`flex-1 p-4 md:p-6 overflow-y-auto transition-all duration-300 ease-in-out`}>
        {/* Mobile Hamburger Button */}
        <div className="md:hidden mb-4">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-200">
                <FiMenu size={24} />
            </button>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <p className="text-sm text-gray-500">Total Visitors</p>
              <p className="text-3xl font-extrabold text-green-700">{visitors.length}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <p className="text-sm text-gray-500">Active Today</p>
              <p className="text-3xl font-extrabold text-green-700">
                {(visitors || []).filter((v) =>
                  v.sessions?.some((s) => isToday(s.sessionStartTime))
                ).length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <p className="text-sm text-gray-500">Total Spent Time</p>
              <p className="text-2xl font-bold text-green-700">
                {totalSpentTime.toFixed(0)} Mins
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <p className="text-sm text-gray-500">Today Spent Time</p>
              <p className="text-2xl font-bold text-green-700">
                {todaySpentTime.toFixed(0)} Mins
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <p className="text-sm text-gray-500">Total Sessions</p>
              <p className="text-3xl font-extrabold text-green-700">{totalSessions}</p>
            </div>
        </div>

        {/* Visitor Details */}
        <div className="sticky top-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-6 border-2 border-dashed rounded-xl border-gray-300 mt-4 bg-gray-50/80 backdrop-blur-sm">
          {selectedVisitor ? (
            <>
              <div className="flex flex-col items-center justify-center bg-white p-3 rounded-xl shadow-md hover:shadow-xl transition group cursor-pointer">
                <FaAddressCard className="text-green-600 text-3xl mb-2 group-hover:scale-110 transition" />
                <p className="text-xs uppercase font-bold text-gray-400 break-all text-center">
                  {selectedVisitor.visitorId}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center bg-white p-3 rounded-xl shadow-md hover:shadow-xl transition group cursor-pointer">
                <MdMoreTime className="text-blue-600 text-3xl mb-2 group-hover:scale-110 transition" />
                <p className="text-xs uppercase font-bold text-gray-400 break-all text-center">
                  {safeDate(selectedVisitor.createdAt)}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center bg-white p-3 rounded-xl shadow-md hover:shadow-xl transition group cursor-pointer">
                <MdAutoGraph className="text-purple-600 text-3xl mb-2 group-hover:scale-110 transition" />
                <p className="text-xs uppercase font-semibold text-gray-500">Sessions</p>
                <p className="text-xs uppercase font-bold text-gray-400 break-all text-center">
                  {Array.isArray(selectedVisitor.sessions)
                    ? selectedVisitor.sessions.length
                    : 0}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center bg-white p-3 rounded-xl shadow-md hover:shadow-xl transition group cursor-pointer">
                <FaBusinessTime className="text-orange-600 text-3xl mb-2 group-hover:scale-110 transition" />
                <p className="text-xs uppercase font-bold text-gray-400 break-all text-center">
                  {safeDate(selectedVisitor.updatedAt)}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center bg-white p-3 rounded-xl shadow-md hover:shadow-xl transition group cursor-pointer">
                <BsDisplay className="text-cyan-600 text-3xl mb-2 group-hover:scale-110 transition" />
                <p className="text-xs uppercase font-bold text-gray-400 break-all text-center">
                  {safeDate(selectedVisitor.updatedAt)}
                </p>
              </div>
            </>
          ) : (
            <p className="col-span-full text-center text-gray-400 text-sm">
              👉 Select a visitor from the list to see details
            </p>
          )}
        </div>

        {/* Session History Table */}
        {selectedVisitor?.sessions && selectedVisitor.sessions.length > 0 && (
          <div className="mt-8 font-['Nunito']">
            <h2 className="text-xl font-bold text-gray-500 mb-6 flex items-center gap-2">
              <MdAutoGraph className="text-green-600 text-2xl" />
              Session History
            </h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-slate-200">
              <table className="min-w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider ">#</th>
                    <th scope="col" className="sticky top-0 bg-slate-100 px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">time</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Duration</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Location & Device</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {[...selectedVisitor.sessions].reverse().map((session, idx) => (
                    <tr key={idx} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50/70 transition-colors duration-150 align-middle">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        {selectedVisitor.sessions.length - idx}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        <div>
                          <div className="flex items-center gap-2 font-medium">
                            <MdMoreTime className="text-blue-500" />
                            <span>{safeDate(session.sessionStartTime)}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                            <FaBusinessTime className="text-orange-500" />
                            <span>{safeDate(session.sessionEndTime)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500 font-bold ">
                          {(session.sessionDurationSeconds / 60).toFixed(0)} mins
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        <div>
                          <div className="flex items-center gap-2 font-medium">
                            <FaAddressCard className="text-purple-500 " />
                            <span>{session.locationName || "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                              <BsDisplay className="text-cyan-500" />
                              <span>{session.ipAddress || "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                            <FaLocationCrosshairs className="text-green-500" />
                            <span>
                              {session.location
                                ? `Lat: ${session.location.latitude}, Lng: ${session.location.longitude}`
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        <VisitorsLocation />
      </main>
    </div>
  );
};

export default FetchVisitors;