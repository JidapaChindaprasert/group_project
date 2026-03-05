import './CourseStructure.css';
import CourseTable from './CourseTable';

export default function CourseStructureIoT() {
    return (
        <div className="course-structure-section">
            <h2 className="course-structure-title">
                โครงสร้างหลักสูตรสาขาวิชาวิศวกรรมระบบไอโอทีและสารสนเทศ 2565
            </h2>

            <div className="course-structure-layout">
                {/* Left: Table */}
                <div className="course-structure-left">
                    <CourseTable />
                    <button className="course-button secondary">
                        แผนการศึกษาหลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ
                    </button>
                </div>

                {/* Right: PDF */}
                <div className="course-structure-right">
                    <div className="pdf-mockup">
                        <iframe
                            src="https://drive.google.com/file/d/1U8mm7DxtNpFDbuWFgt22wRNEKulB_OU3/preview"
                            width="100%"
                            height="100%"
                            title="Curriculum PDF Preview"
                            style={{ border: 'none' }}
                        />
                    </div>
                    <a
                        href="https://drive.google.com/file/d/1U8mm7DxtNpFDbuWFgt22wRNEKulB_OU3/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', display: 'block', width: '100%' }}
                    >
                        <button className="course-button">
                            เล่มหลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ 2565
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}

