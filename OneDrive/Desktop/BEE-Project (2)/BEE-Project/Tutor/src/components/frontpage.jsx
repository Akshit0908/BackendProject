import React, { useEffect, useState } from "react";
import "./frontpage.css";

const Frontpage = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const lastVisit = localStorage.getItem("lastVisit");
    const today = new Date().toDateString();
    const savedStreak = parseInt(localStorage.getItem("streak")) || 0;

    if (lastVisit === today) {
      setStreak(savedStreak);
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastVisit === yesterday.toDateString()) {
        localStorage.setItem("streak", savedStreak + 1);
        setStreak(savedStreak + 1);
      } else {
        localStorage.setItem("streak", 1);
        setStreak(1);
      }

      localStorage.setItem("lastVisit", today);
    }
  }, []);

  const achievements = [
    { name: "Early Bird", requirement: 3 },
    { name: "7-Day Streak", requirement: 7 },
    { name: "Top Learner", requirement: 15 },
  ];

  return (
    <div className="dashboard">

      {/* Top Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <h2 className="logo">OpenLearn</h2>
          <ul className="nav-links">
            <li className="active">Dashboard</li>
            <li>Courses</li>
            <li>Achievements</li>
            <li>Certificates</li>
          </ul>
        </div>

        <div className="nav-right">
          <span className="streak">🔥 {streak}-day streak</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="profile"
          />
        </div>
      </nav>

      <div className="main">
        <h1>Welcome back, Alex!</h1>
        <p className="quote">
          "Education is the most powerful weapon which you can use to change
          the world."
        </p>

        {/* Progress Overview */}
        <div className="progress-card">
          <div className="circle">
            <span>65%</span>
          </div>

          <div className="stats">
            <div>
              <h3>12</h3>
              <p>Total Enrolled</p>
            </div>
            <div>
              <h3>4</h3>
              <p>Completed</p>
            </div>
            <div>
              <h3>8</h3>
              <p>Ongoing</p>
            </div>
          </div>
        </div>

        {/* Courses */}
        <h2 className="section-title">Enrolled Courses</h2>
        <div className="courses">
          <div className="course-card">
            <h3>Advanced UI/UX Design</h3>
            <p>By Sarah Jenkins</p>
            <div className="progress-bar">
              <div style={{ width: "72%" }}></div>
            </div>
            <button>Continue</button>
          </div>

          <div className="course-card">
            <h3>React Masterclass</h3>
            <p>By David Miller</p>
            <div className="progress-bar">
              <div style={{ width: "45%" }}></div>
            </div>
            <button>Continue</button>
          </div>

          <div className="course-card">
            <h3>JavaScript Basics</h3>
            <p>By Emily Clark</p>
            <div className="progress-bar">
              <div style={{ width: "90%" }}></div>
            </div>
            <button>Continue</button>
          </div>
        </div>

        {/* Achievements */}
        <h2 className="section-title">Achievements</h2>
        <div className="achievements">
          {achievements.map((item, index) => (
            <div
              key={index}
              className={`achievement ${streak >= item.requirement ? "unlocked" : ""
                }`}
            >
              🏆 {item.name}
            </div>
          ))}
        </div>

        {/* Deadlines */}
        <h2 className="section-title">Upcoming Deadlines</h2>
        <div className="deadline">
          <div>
            <strong>Assignment 1: Portfolio Design</strong>
            <p>Advanced UI/UX Design</p>
          </div>
          <span className="due">Due: Tomorrow</span>
        </div>

        {/* Certificates */}
        <h2 className="section-title">My Certificates</h2>
        <div className="certificate">
          <div>
            <strong>Web Development Bootcamp</strong>
            <p>Completed: Jan 15, 2024</p>
          </div>
          <button>Download</button>
        </div>
      </div>
    </div>
  );
};

export default Frontpage;