import { useNavigate } from "react-router-dom";
import "./ProfessorCard.css";

type Props = {
  id: string;
  name: string;
  position: string;
  image: string;
  email: string;
};

export default function ProfessorCard({id, name, position, image, email}: Props) {
  const navigate = useNavigate();
  return (
    <div className="prof-card">
      <img src={image} alt={name} />

      <h3>{name}</h3>
      <p>{position}</p>

      <div className="prof-info">
        <div className="prof-actions">
          <a href={`mailto:${email}`} className="email-icon" title="Send Email">
            📧
          </a>

          <button
            className="detail-btn"
            onClick={() => navigate(`/faculty/${id}`)}
          >
            Detail & Research →
          </button>
        </div>

      </div>

    </div>
  );
}