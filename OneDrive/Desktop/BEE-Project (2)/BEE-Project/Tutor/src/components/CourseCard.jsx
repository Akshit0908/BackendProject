import './CourseCard.css';

function CourseCard({ course }) {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} className="course-image" />
      <div className="course-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-instructor">👨‍🏫 {course.instructor}</p>
        <div className="progress-section">
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{course.progress}% Complete</span>
        </div>
        <button className="continue-button">Continue Learning →</button>
      </div>
    </div>
  );
}

export default CourseCard;