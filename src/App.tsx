import "./App.css";
import {
  ArrowForwardIcon, ChevronLeftIcon,
  ChevronRightIcon
} from "@chakra-ui/icons";
import DemoImage from "./assets/project-demo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  url?: string;
}

const projects: Project[] = [
  {
    title: "Movie Rating",
    description: "A place to rate and review movies",
    image: DemoImage,
    technologies: ["React", "Typescript", "Chakra UI"],
    url: "/movie-review",
  },
  {
    title: "Todo App",
    description: "Todo app that helps you manage your tasks",
    image: DemoImage,
    technologies: ["React", "Typescript", "Chakra UI"],
    url: "/todo",
  },
  {
    title: "Document Management",
    description:
      "Document management is a system or process used to capture, track and store electronic documents such as PDFs, word processing files and digital images",
    image: DemoImage,
    technologies: ["Angular", "Typescript", "Material UI"],
  },
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toNextProject = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toPreviousProject = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="projectPageWrap">
      <div className="pageHeading">
        <h1 className="pageTitle">Projects</h1>
        <div className="switchIcon">
          <span
            className="icon left"
            role="button"
            onClick={() => toPreviousProject()}
          >
            <ChevronLeftIcon />
          </span>
          <span className="icon right" role="button" onClick={() => toNextProject()}>
            <ChevronRightIcon />
          </span>
        </div>
      </div>

      {/* Card */}
      <div className="projectWrap">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>

      {/* Slider */}
      <div className="sliderWrap">
        {projects.map((project, index) => (
          <SliderCard
            key={index}
            index={index + 1}
            projectCount={projects.length}
            show={index === activeIndex}
            {...project}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

interface SliderCardProps extends Project {
  index: number;
  projectCount: number;
  show: boolean;
}

const SliderCard = ({
  index,
  projectCount,
  image,
  title,
  description,
  technologies,
  url,
  show,
}: SliderCardProps) => {
  return (
    <div
      className="card"
      style={{
        display: show ? "flex" : "none",
      }}
    >
      <div className="info">
        <div className="index">
          {index.toString().padStart(2, "0")}/
          {projectCount.toString().padStart(2, "0")}
        </div>
        <div className="project-info">
          <div className="section-title">Project</div>
          <h4 className="title">{title}</h4>
          <p className="description">{description}</p>
        </div>
        <div className="tech-info">
          <h4 className="tech-title">Technologies</h4>
          <ul className="techs">
            {technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="demo-image-block">
        <img src={image} alt="demo" className="demo-image" />
        {url ? (
          <Link to={url} className="tryBtn">
            <ArrowForwardIcon />
          </Link>
        ) : (
          <p className="comingSoonTag">Coming soon</p>
        )}
      </div>
    </div>
  );
};

const ProjectCard = ({ title, description, url }: Project) => {
  return (
    <div className="projectCard">
      <h4 className="title">{title}</h4>
      <p className="description">{description}</p>
      {url ? (
        <Link to={url} className="tryBtn">
          <span>Try It</span>
          <ArrowForwardIcon />
        </Link>
      ) : (
        <p className="comingSoonTag">Coming soon</p>
      )}
    </div>
  );
};
