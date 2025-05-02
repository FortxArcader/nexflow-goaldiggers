// BentoLayout.tsx
import React from "react";
import "../styles/Bento.css";

const BentoLayout: React.FC = () => {
  return (
    <div className="container">
      <div className="bento-container">
        <div className="bento-item feature-item" id="camera-system">
          <h2>Intelligent AI Agents</h2>
          <p>Autonomous, decision-making agents powered by machine learning</p>
          <div className="feature-details">
            <span>
              <img className="img_ai_new"
                src="https://i.postimg.cc/Nf8FM0cF/AI-Agents-1-removebg-preview.png"
                alt=""
              />
            </span>
          </div>
        </div>

        <div className="bento-item" id="front-camera">
          <h2>Real-Time Analytics</h2>
          <p>Instant insights powered by advanced data analysis</p>
          <span className="bento-img"><img src="https://i.postimg.cc/ZqjpQj5T/pngwing-com.png" alt=""  className="img-new"/></span>
        </div>

        <div className="bento-item" id="true-lens">
        <h2>Multi-Tasking AI</h2>
          <p>Handle multiple operations simultaneously with high efficiency</p>
          <div className="feature-details">
            <span>Optimized for Complex Workflows</span>
          </div>
          <span className="bento-img">
            <img src="https://i.postimg.cc/YCK6LhPw/3392267-scaled-min-removebg-preview.png" alt="" className="img-new"/>
          </span>
        </div>

        <div className="bento-item feature-item" id="zoom">
          <h2>Adaptive Learning System</h2>
          <p>
            Continuous improvement through feedback and data-driven learning
          </p>
        </div>
      </div>
    </div>
  );
};

export default BentoLayout;
