import { NavLink } from "react-router-dom";
import "../css/HomePage.css";

function HomePage() {
  const imageSrc = "../images/paperclip.png";

  const positions = [
    { top: "-12em", left: "-12em" },
    { top: "-2em", left: "80em" },
    { top: "18em", left: "20em" },
  ];

  return (
    <div className="homepage-background">
      <div className="title-wrapper">
        <h1 className="planner-title">Teacher Planner</h1>
        {positions.map((pos, index) => (
          <img
            key={index}
            src={imageSrc}
            alt={`img-${index}`}
            className={`floating-paperclip-image ${
              index === 0 ? "flipped" : ""
            }`}
            style={{ top: pos.top, left: pos.left }}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
