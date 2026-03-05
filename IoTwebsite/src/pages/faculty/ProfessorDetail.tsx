import "./ProfessorDetail.css";
import { useParams } from "react-router-dom";
import {
  professorsIoT,
  staffIoT,
  professorsPhys,
  staffPhys,
} from "./FacultyData";
import EducationSection from "./EducationSection";
import ResearchSection from "./ResearchSection";
import DetailHeader from "./DetailHeader";

export default function ProfessorDetail() {
  const { id } = useParams();

  if (!id) return <div>Not Found</div>;

  const allPeople = [
    ...professorsIoT,
    ...staffIoT,
    ...professorsPhys,
    ...staffPhys,
  ];

  const person = allPeople.find((p) => p.id === id);

  if (!person) return <div>Professor Not Found</div>;

  return (
    <div className="detail-container">
      <div className="detail-content">
        {/* LEFT SIDE: Research */}
        <div className="left-section">
          <ResearchSection research={person.research} />
        </div>

        {/* RIGHT SIDE: Info */}
        <div className="right-section">
          <DetailHeader person={person} />
          <EducationSection education={person.education} />
        </div>
      </div>
    </div>
  );
}