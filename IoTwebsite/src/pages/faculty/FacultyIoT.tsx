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
import {professorsIoT, staffIoT } from "./FacultyData";


export default function Faculty() {
  const navigate = useNavigate();
  const headProfessorIoT = professorsIoT[0];
  const otherProfessorsIoT = professorsIoT.slice(1);

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-left">
          <h1>
            Faculty Member <br />
            in the Department <br />
            of IoT and Information Engineering
          </h1>

          <div className="hero-buttons">
            <button className="btn secondary">
              Professor of IoT and Information Engineering
            </button>
            <button className="btn primary" onClick={() => navigate("/faculty/industrial-physics")}>
              Professor of Industrial Physics
            </button>
          </div>
          
        </div>
        
        <div className="hero-right">
          <ProfessorCard
            id={headProfessorIoT.id}
            name={headProfessorIoT.name}
            position={headProfessorIoT.position}
            image={headProfessorIoT.image}
            email={headProfessorIoT.email}
          />
        </div>
      </section>

      {/* PROFESSOR SECTION */}
      <section className="professors-section">
        <h2>คณาจารย์ภาควิชาวิศวกรรมไอโอทีและสารสนเทศ</h2>

        <div className="prof-container">
          <div className="prof-grid">
            {otherProfessorsIoT.map((prof) => (
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
        <h2>บุคลากรภาควิชาวิศวกรรมไอโอทีและสารสนเทศ</h2>

        <div className="prof-container">

              {staffIoT.map((prof) => (
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