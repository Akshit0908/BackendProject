import './RecentActivity.css';

function RecentActivity() {
  const activities = [
    { type: 'lesson', title: 'Completed "State Management" lesson', course: 'React Fundamentals', time: '2 hours ago' },
    { type: 'quiz', title: 'Scored 95% on JavaScript Quiz', course: 'JS Mastery', time: '5 hours ago' },
    { type: 'assignment', title: 'Submitted CSS Grid Project', course: 'CSS Advanced', time: '1 day ago' },
    { type: 'lesson', title: 'Watched "Async/Await Tutorial"', course: 'JS Mastery', time: '2 days ago' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'lesson': return '📖';
      case 'quiz': return '✅';
      case 'assignment': return '📝';
      default: return '📌';
    }
  };

  return (
    <div className="recent-activity-section">
      <h2 className="section-title">Recent Activity</h2>
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className="activity-icon">{getActivityIcon(activity.type)}</div>
            <div className="activity-content">
              <h3 className="activity-title">{activity.title}</h3>
              <p className="activity-course">{activity.course}</p>
            </div>
            <div className="activity-time">{activity.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
