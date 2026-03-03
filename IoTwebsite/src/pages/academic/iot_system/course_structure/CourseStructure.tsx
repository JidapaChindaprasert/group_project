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
                        <div className="pdf-mockup-header">
                            คณะวิศวกรรมศาสตร์<br />
                            สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
                        </div>
                        <div className="pdf-mockup-body">
                            <strong>
                                หลักสูตรวิศวกรรมศาสตรบัณฑิต<br />
                                สาขาวิชาวิศวกรรมระบบไอโอทีและสารสนเทศ<br />
                                หลักสูตรปรับปรุง พ.ศ. 2569
                            </strong>
                            <br /><br />
                            <p>รายละเอียดเล่มหลักสูตรและข้อมูลพื้นฐานเกี่ยวกับหลักสูตร</p>
                        </div>
                    </div>
                    <button className="course-button">
                        เล่มหลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ 2565
                    </button>
                </div>
            </div>
        </div>
    );
}

