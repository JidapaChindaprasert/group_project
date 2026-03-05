import './CourseStructure.css';
import CourseTable from './CourseTable';

export default function CourseStructurePhyIoT() {
    return (
        <div className="phy-course-structure-section">
            {/* Top Header with Year Buttons */}
            <div className="phy-course-header-top">
                <h2 className="phy-course-main-title">
                    โครงสร้างหลักสูตรสาขาวิชาวิศวกรรมระบบไอโอทีและสารสนเทศ 2565
                </h2>
                <div className="phy-year-selectors">
                    <button className="phy-year-btn active">2565</button>
                    <button className="phy-year-btn">2569</button>
                </div>
            </div>

            <h3 className="phy-course-mid-title">
                โครงสร้างหลักสูตรสาขาวิชาวิศวกรรมระบบไอโอทีและสารสนเทศ 2565
            </h3>

            <div className="phy-course-structure-layout">
                {/* Left Side: Course Table (Standardized Position) */}
                <div className="phy-course-structure-left">
                    <CourseTable />
                    <button className="phy-course-action-btn secondary">
                        แผนการศึกษาหลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ
                    </button>
                </div>

                {/* Right Side: PDF Mockup (Standardized Position) */}
                <div className="phy-course-structure-right">
                    <div className="phy-pdf-mockup" style={{ height: '600px' }}>
                        <iframe
                            src="https://drive.google.com/file/d/1cHSWjO3A03lcGqgbT9PR51d335LfaVVo/preview"
                            width="100%"
                            height="100%"
                            title="Curriculum PDF Preview"
                            style={{ border: 'none' }}
                        />
                    </div>
                    <a
                        href="https://drive.google.com/file/d/1cHSWjO3A03lcGqgbT9PR51d335LfaVVo/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', display: 'block', width: '100%' }}
                    >
                        <button className="phy-course-action-btn">
                            เล่มหลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ 2565
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}
