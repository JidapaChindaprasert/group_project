import './CourseStructure.css';
import CourseTable from './CourseTable';

export default function CourseStructure() {
    return (
        <div className="course-structure-section">
            <h2 className="course-structure-title">
                โครงสร้างหลักสูตรสาขาวิชาวิศวกรรมระบบไอโอทีและสารสนเทศ 2565
            </h2>

            <div className="course-structure-layout">
                {/* Left Side: PDF Document Mockup and Button */}
                <div className="course-structure-left">
                    <div className="pdf-mockup">
                        <div className="pdf-mockup-header">
                            คณะวิศวกรรมศาสตร์<br />
                            สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
                        </div>
                        <div className="pdf-mockup-body">
                            <strong>หลักสูตรวิศวกรรมศาสตรบัณฑิต<br />
                                สาขาวิชาวิศวกรรมระบบไอโอทีและสารสนเทศ<br />
                                หลักสูตรปรับปรุง พ.ศ. 2565</strong>
                            <br /><br />
                            <p>เนื้อหาครอบคลุม...</p>
                            {/* Note: Can replace with real image/PDF view later */}
                        </div>
                    </div>
                    <button className="course-button">
                        เล่มหลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ<br />2565
                    </button>
                </div>

                {/* Right Side: Course Table component */}
                <div className="course-structure-right">
                    <CourseTable />
                    <button className="course-button right-button">
                        หลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ 2565
                    </button>
                </div>
            </div>
        </div>
    );
}
