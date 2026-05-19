import './ProgressOverview.css';

function ProgressOverview() {
  const stats = [
    { label: 'Total Courses', value: '8', icon: '📚', color: '#00d9ff' },
    { label: 'Completed', value: '3', icon: '✅', color: '#39ff14' },
    { label: 'Ongoing', value: '5', icon: '⏳', color: '#ff006e' },
    { label: 'Overall Progress', value: '62%', icon: '🎯', color: '#b537f2' }
  ];

  return (
    <div className="progress-overview">
      <h2 className="section-title">Course Progress Overview</h2>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderTopColor: stat.color }}>
            <div className="stat-icon" style={{ background: `${stat.color}20` }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressOverview;
