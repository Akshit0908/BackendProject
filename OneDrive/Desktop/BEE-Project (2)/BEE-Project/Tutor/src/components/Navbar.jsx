import React from "react";
import { FiMessageSquare } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

function Navbar({
  onLogoClick = () => { },
  onLoginClick = () => { },
  onCoursesClick = () => { },
  onChallengesClick = () => { },
  onDashboardClick = () => { },
  onContributeClick = () => { },
  onBuyPremiumClick = () => { },
  onCollaborateCourseClick = () => { },
  enrolledCourses = [],

  isPremium = false,
}) {
  const { user, logout } = useAuth();
  const [openCollaborate, setOpenCollaborate] = React.useState(false);
  const collaborateRef = React.useRef(null);

  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!collaborateRef.current) return;
      if (!collaborateRef.current.contains(event.target)) {
        setOpenCollaborate(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleCourseChatClick = (event, course) => {
    event.stopPropagation();
    onCollaborateCourseClick(course);
    setOpenCollaborate(false);
  };

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 glass-card px-6 py-3 flex items-center justify-between">
        <div className="flex flex-col cursor-pointer" onClick={onLogoClick}>
          {/* Faking a logo like the 'C' with a dot in Karat */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-wide text-slate-800">
              BrainByte
            </span>
          </div>
        </div>

        <ul className="hidden md:flex items-center gap-8 justify-center flex-1 text-sm font-medium text-slate-600">
          <li className="cursor-pointer hover:text-[var(--color-karat-primary)] transition-colors" onClick={onCoursesClick}>Courses</li>
          <li className="cursor-pointer hover:text-[var(--color-karat-primary)] transition-colors" onClick={onChallengesClick}>Challenges</li>
          <li className="cursor-pointer hover:text-[var(--color-karat-primary)] transition-colors" onClick={onDashboardClick}>Dashboard</li>
          <li
            ref={collaborateRef}
            className="relative cursor-pointer hover:text-[var(--color-karat-primary)] transition-colors"
          >
            <button
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setOpenCollaborate((prev) => !prev)}
            >
              Collaborate
              <span className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full">
                {enrolledCourses.length}
              </span>
            </button>
            {openCollaborate && (
              <div className="absolute left-1/2 top-10 -translate-x-1/2 min-w-72 max-h-80 overflow-y-auto glass-panel p-2 z-50">
                {enrolledCourses.length === 0 ? (
                  <p className="px-4 py-4 text-sm text-slate-500 text-center">Enroll in a course to unlock community chat.</p>
                ) : (
                  enrolledCourses.map((course) => (
                    <div
                      key={course.title}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left hover:bg-white/50 transition-colors"
                    >
                      <span className="truncate pr-4 text-slate-700 font-medium">{course.title}</span>
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[var(--color-karat-primary)] shadow-sm hover:shadow-md transition-shadow"
                        title={`Open ${course.title} chat`}
                        onClick={(event) => handleCourseChatClick(event, course)}
                      >
                        <FiMessageSquare strokeWidth={2.5} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </li>
          <li className="cursor-pointer hover:text-[var(--color-karat-primary)] transition-colors flex items-center gap-1" onClick={onContributeClick}>
            Contribute
            {!isPremium && <span className="text-[10px] uppercase font-bold text-teal-600 bg-teal-50 px-1.5 rounded-md">PRO</span>}
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <button
            className={`px-4 py-2 text-sm ${isPremium ? 'secondary-button' : 'glass-button'}`}
            onClick={onBuyPremiumClick}
          >
            {isPremium ? "Premium Active" : "Buy Premium"}
          </button>

          {user ? (
            <button
              className="secondary-button px-4 py-2 text-sm"
              onClick={() => {
                logout();
                onLogoClick();
              }}
            >
              Logout ({user.name.split(' ')[0]})
            </button>
          ) : (
            <button
              className="text-slate-600 font-medium text-sm hover:text-slate-900 transition-colors ml-2"
              onClick={onLoginClick}
            >
              Sign in
            </button>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar;
