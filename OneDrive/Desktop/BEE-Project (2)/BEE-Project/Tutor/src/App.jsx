import { useEffect, useState } from 'react'

// import Frontpage from "./components/frontpage";

// function App() {
//   return <Frontpage />;
// }

// export default App;
import './App.css'
import Navbar from './components/Navbar'
import { useAuth } from './context/AuthContext'
import { useToast } from './context/ToastContext'
import Footer from './components/Footer'
import CyberpunkCourses from './components/CyberpunkCourses'
import CyberpunkHome from './components/CyberpunkHome'
import CyberpunkCourseDetails from './components/CyberpunkCourseDetails'
import LessonContentView from './components/LessonContentView'
import CourseCommunity from './components/CourseCommunity'
import Dashboard from './pages/Dashboard'
import UserProgressDashboard from './pages/UserProgressDashboard'
import CourseEditor from './pages/CourseEditor'
import Challenges from './pages/Challenges'
import ChallengeUploader from './pages/ChallengeUploader'
import AuthPage from './pages/AuthPage'
import CourseContent from './pages/CourseContent'
import PremiumPlans from './pages/PremiumPlans'
import ActionModal from './components/ActionModal'

const PREMIUM_STORAGE_KEY = 'openlearn_premium_active'
const PREMIUM_PLAN_STORAGE_KEY = 'openlearn_premium_plan'

function App() {
  const { user, upgradeToPremium, cancelSubscription } = useAuth()
  const { showToast } = useToast()
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [view, setView] = useState('home') // 'home' | 'dashboard' | 'challenge-upload' | 'user-dashboard' | 'editor' | 'challenges' | 'collaborate' | 'course-content' | 'auth' | 'premium-plans'
  const [courses, setCourses] = useState([])
  const [editorCourse, setEditorCourse] = useState(null)
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [bookmarkedCourses, setBookmarkedCourses] = useState([])
  const [communityCourse, setCommunityCourse] = useState(null)
  const [customChallenges, setCustomChallenges] = useState([])
  const [activeCourseContent, setActiveCourseContent] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null)
  const isPremium = user?.isPremium || false;

  // Frontend-only progress tracking
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('openlearn_completed_lessons');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('openlearn_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    if (user?.enrolledCourses) {
      setEnrolledCourses(user.enrolledCourses);
    }
    if (user?.bookmarkedCourses) {
      setBookmarkedCourses(user.bookmarkedCourses);
    }
  }, [user]);

  // New Modal State
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: '',
    cancelText: '',
    onConfirm: () => { },
    variant: 'blue'
  });

  const closeModal = () => setModalConfig((prev) => ({ ...prev, isOpen: false }));

  const handleCancelSubscription = async () => {
    setModalConfig({
      isOpen: true,
      title: 'Cancel Subscription?',
      message: 'Are you sure you want to cancel your premium subscription? You will lose access to the Contribute tab and advanced tools immediately.',
      confirmText: 'Confirm Cancellation',
      cancelText: 'Keep Premium',
      variant: 'red',
      onConfirm: async () => {
        try {
          await cancelSubscription();
          showToast('Subscription canceled successfully.', 'success');
          closeModal();
        } catch (err) {
          console.error('Failed to cancel subscription:', err);
          showToast('Failed to cancel subscription. Please try again.', 'error');
        }
      }
    });
  };

  const activatePremium = async (plan) => {
    if (!user) {
      setView('auth');
      showToast('Please log in to purchase a premium plan.', 'info');
      return;
    }

    setModalConfig({
      isOpen: true,
      title: 'Premium Upgrade',
      message: `Confirm purchase of the ${plan} premium plan to unlock all creator tools and contribute access?`,
      confirmText: 'Activate Premium',
      cancelText: 'Maybe Later',
      variant: 'emerald',
      onConfirm: async () => {
        try {
          await upgradeToPremium();
          localStorage.setItem(PREMIUM_PLAN_STORAGE_KEY, plan)
          setView('home')
          showToast(`Premium activated with ${plan} plan.`, 'success')
          closeModal();
        } catch (err) {
          console.error('Failed to activate premium:', err);
          showToast('Failed to activate premium. Please try again.', 'error')
        }
      }
    });
  }

  const openPremiumPlans = () => {
    setDetailsOpen(false)
    setView('premium-plans')
  }

  const handleContributeClick = () => {
    setDetailsOpen(false)

    if (!isPremium) {
      setView('premium-plans')
      return
    }

    setView('dashboard')
  }

  const enrollCourse = (course) => {
    if (!course?.title) return;

    setEnrolledCourses((prev) => {
      const alreadyEnrolled = prev.some((c) => c.title === course.title);
      return alreadyEnrolled ? prev : [...prev, course];
    });
  };

  const openCommunity = (course) => {
    if (!course) return;
    enrollCourse(course);
    setCommunityCourse(course);
    setDetailsOpen(false);
    setView('collaborate');
  };

  const handleToggleLesson = (courseTitle, lessonTitle) => {
    setCompletedLessons(prev => {
      const courseLessons = prev[courseTitle] || [];
      const updatedLessons = courseLessons.includes(lessonTitle)
        ? courseLessons.filter(l => l !== lessonTitle)
        : [...courseLessons, lessonTitle];

      return {
        ...prev,
        [courseTitle]: updatedLessons
      };
    });
  };

  const openCourseContent = async (course) => {
    if (!course?.title) return;

    // Enroll via API if logged in
    if (user) {
      try {
        const token = localStorage.getItem('openlearn_token');
        const res = await fetch('http://localhost:5000/api/auth/enroll', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ title: course.title })
        });
        if (res.ok) {
          const updatedUser = await res.json();
          setEnrolledCourses(updatedUser.enrolledCourses);
        }
      } catch (err) {
        console.error('Enrollment API error:', err);
      }
    }

    enrollCourse(course);
    setActiveCourseContent(course);
    setDetailsOpen(false);
    setView('course-content');
  };

  const toggleBookmark = async (course) => {
    if (!course?.title) return;

    // Toggle via API if logged in
    if (user) {
      try {
        const token = localStorage.getItem('openlearn_token');
        const res = await fetch('http://localhost:5000/api/auth/bookmark', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ title: course.title })
        });
        if (res.ok) {
          const updatedUser = await res.json();
          setBookmarkedCourses(updatedUser.bookmarkedCourses);

          const isBookmarked = updatedUser.bookmarkedCourses.some(bc => bc.title === course.title);
          showToast(isBookmarked ? 'Course saved for later.' : 'Course removed from saved.', 'success');
        }
      } catch (err) {
        console.error('Bookmark API error:', err);
        showToast('Failed to update bookmark.', 'error');
      }
    } else {
      // Local state toggle for guests
      setBookmarkedCourses((prev) => {
        const alreadyBookmarked = prev.some((c) => c.title === course.title);
        if (alreadyBookmarked) {
          showToast('Course removed from saved.', 'success');
          return prev.filter((c) => c.title !== course.title);
        } else {
          showToast('Course saved for later.', 'success');
          return [...prev, { title: course.title }];
        }
      });
    }
  };

  const openLessonContent = (lesson) => {
    setActiveLesson(lesson);
    setView('lesson-content');
  };

  return (
    <>
      <Navbar
        onLogoClick={() => { setDetailsOpen(false); setView('home'); }}
        onLoginClick={() => { setDetailsOpen(false); setView('auth'); }}
        onCoursesClick={() => { setDetailsOpen(false); setView('courses'); }}
        onChallengesClick={() => { setDetailsOpen(false); setView('challenges'); }}
        onDashboardClick={() => { setDetailsOpen(false); setView('user-dashboard'); }}
        onContributeClick={handleContributeClick}
        onBuyPremiumClick={openPremiumPlans}
        isPremium={isPremium}
        enrolledCourses={enrolledCourses}
        onCollaborateCourseClick={openCommunity}
      />
      <main className="pt-16">
        {(!user && ['dashboard', 'user-dashboard', 'editor', 'challenge-upload', 'course-content', 'collaborate'].includes(view)) ? (
          <AuthPage onAuthSuccess={() => setView(view)} />
        ) : view === 'editor' ? (
          <CourseEditor
            course={editorCourse}
            setCourse={(updated) => {
              setEditorCourse(updated);
              setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
            }}
            goBack={() => setView('dashboard')}
          />
        ) : view === 'dashboard' ? (
          <Dashboard
            courses={courses}
            customChallenges={customChallenges}
            openCourse={(c) => { setSelectedCourse(c); setDetailsOpen(true); }}
            createNew={() => {
              const newCourse = {
                id: Date.now(),
                title: 'Untitled Course',
                category: '',
                level: 'Beginner',
                price: '',
                isPublic: true,
                thumbnail: null,
                instructor: 'You',
                editable: true,
                sections: [{ id: Date.now() + 1, title: 'New Section', lessons: [] }]
              };

              setCourses((prev) => [...prev, newCourse]);
              setEditorCourse(newCourse);
              setView('editor');
            }}
            editCourse={(c) => { setEditorCourse(c); setView('editor'); }}
            createNewChallenge={() => setView('challenge-upload')}
            onEnroll={openCourseContent}
            enrolledCourses={enrolledCourses}
            bookmarkedCourses={bookmarkedCourses}
            completedLessons={completedLessons}
          />
        ) : view === 'challenge-upload' ? (
          <ChallengeUploader
            onSave={(challenge) => {
              setCustomChallenges((prev) => [challenge, ...prev]);
              setView('dashboard');
            }}
            onCancel={() => setView('dashboard')}
          />
        ) : view === 'user-dashboard' ? (
          <UserProgressDashboard
            enrolledCourses={enrolledCourses}
            bookmarkedCourses={bookmarkedCourses}
            completedLessons={completedLessons}
            onOpenCourses={() => setView('courses')}
            onResumeCourse={openCourseContent}
          />
        ) : view === 'auth' ? (
          <AuthPage onAuthSuccess={() => setView('dashboard')} />
        ) : view === 'premium-plans' ? (
          <PremiumPlans
            isPremium={isPremium}
            onSelectPlan={activatePremium}
            onCancelSubscription={handleCancelSubscription}
            onBack={() => setView('home')}
          />
        ) : view === 'course-content' ? (
          <CourseContent
            course={activeCourseContent}
            completedLessons={completedLessons[activeCourseContent?.title] || []}
            onToggleLesson={(lessonTitle) => handleToggleLesson(activeCourseContent.title, lessonTitle)}
            onSelectLesson={openLessonContent}
            onBack={() => setView('courses')}
          />
        ) : view === 'lesson-content' ? (
          <LessonContentView
            lesson={activeLesson}
            isCompleted={(completedLessons[activeCourseContent?.title] || []).includes(activeLesson?.title)}
            onToggleComplete={() => handleToggleLesson(activeCourseContent.title, activeLesson.title)}
            onBack={() => setView('course-content')}
          />
        ) : view === 'challenges' ? (
          <Challenges customChallenges={customChallenges} />
        ) : view === 'collaborate' ? (
          <CourseCommunity
            enrolledCourses={enrolledCourses}
            activeCourse={communityCourse}
            onSelectCourse={setCommunityCourse}
          />
        ) : view === 'courses' ? (
          <CyberpunkCourses
            onSelectCourse={(c) => { setSelectedCourse(c); setDetailsOpen(true); }}
            onEnroll={openCourseContent}
            onBookmark={toggleBookmark}
            enrolledCourses={enrolledCourses}
            bookmarkedCourses={bookmarkedCourses}
            completedLessons={completedLessons}
          />
        ) : (
          <CyberpunkHome onGetStartedClick={() => setView('courses')} />
        )}

        {/* Global Course Details Sidebar */}
        {detailsOpen && (
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity" onClick={() => setDetailsOpen(false)} />
        )}

        <CyberpunkCourseDetails
          open={detailsOpen}
          course={selectedCourse}
          onClose={() => setDetailsOpen(false)}
          onEnroll={openCourseContent}
          onBookmark={toggleBookmark}
          bookmarkedCourses={bookmarkedCourses}
          enrolledCourses={enrolledCourses}
          onOpenCommunity={openCommunity}
          editCourse={(c) => { setEditorCourse(c); setView('editor'); }}
        />
      </main>
      <Footer />
      <ActionModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        cancelText={modalConfig.cancelText}
        onConfirm={modalConfig.onConfirm}
        onCancel={closeModal}
        variant={modalConfig.variant}
      />
    </>
  );
}

export default App
