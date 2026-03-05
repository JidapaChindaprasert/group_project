// export default function Faculty() {
//   return (
//     <div>
//       <h1>Faculty Page</h1>
//       <p>นี่คือหน้า Faculty</p>
//     </div>
//   );
// }
import ProfessorCard from "./ProfessorCard";
import "./Faculty.css";
import { useNavigate } from "react-router-dom";
import {professorsPhys, staffPhys } from "./FacultyData";

export default function Faculty() {
  const navigate = useNavigate();
  const headProfessorPhys = professorsPhys[0];
  const otherProfessorsPhys = professorsPhys.slice(1);

  return (
    <>
      {/* HERO SECTION */}
      <section className="heroPhys">
        <div className="hero-left">
          <h1>
            Faculty Member <br />
            in the Department <br />
            of Industrial Physics
          </h1>

          <div className="hero-buttons">
            <button className="btn primary" onClick={() => navigate("/faculty")}>
              Professor of IoT and Information Engineering
            </button>

            <button className="btn secondary">
              Professor of Industrial Physics
            </button>
          </div>

        </div>

        <div className="hero-right">
          <ProfessorCard
            id={headProfessorPhys.id}
            name={headProfessorPhys.name}
            position={headProfessorPhys.position}
            image={headProfessorPhys.image}
            email={headProfessorPhys.email}
          />
        </div>
      </section>

      {/* PROFESSOR SECTION */}
      <section className="professors-section">
        <h2>คณาจารย์ภาควิชาฟิสิกส์อุตสาหกรรม</h2>

        <div className="prof-container">
          <div className="prof-grid">
            {otherProfessorsPhys.map((prof, ) => (
              <ProfessorCard
                id={prof.id}
                name={prof.name}
                position={prof.position}
                image={prof.image}
                email={prof.email}
              />
            ))}
          </div>
        </div>
      </section>

      {/* RESEARCH STAFF SECTION */}
      <section className="staff-section">
        <h2>บุคลากรภาควิชาฟิสิกส์อุตสาหกรรม</h2>

        <div className="prof-container">

              {staffPhys.map((prof, ) => (
                <ProfessorCard
                  id={prof.id}
                  name={prof.name}
                  position={prof.position}
                  image={prof.image}
                  email={prof.email}
                />
              ))}

        </div>
      </section>

      {/* FOOTER is already separate component */}
    </>
  );
}