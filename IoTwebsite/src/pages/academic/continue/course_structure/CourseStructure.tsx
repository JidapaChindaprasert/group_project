import './CourseStructure.css';
import CourseTable from './CourseTable';

export default function CourseStructureContinue() {
    return (
        <div className="course-structure-section">
            <h2 className="course-structure-title">
                โครงสร้างหลักสูตรวิศวกรรมคอมพิวเตอร์และไอโอที (ต่อเนื่อง)
            </h2>

            <div className="course-structure-layout">
                {/* Left: Table */}
                <div className="course-structure-left">
                    <CourseTable />
                    <button className="course-button secondary">
                        แผนการศึกษาหลักสูตรต่อเนื่อง
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
                            <strong>หลักสูตรวิศวกรรมศาสตรบัณฑิต<br />
                                สาขาวิชาวิศวกรรมคอมพิวเตอร์และไอโอที (ต่อเนื่อง)<br />
                                หลักสูตรปรับปรุง พ.ศ. 2565</strong>
                            <br /><br />
                            <p>หลักสูตรที่มุ่งเน้นการต่อยอดทักษะจากระดับอนุปริญญา
                                สู่การเป็นวิศวกรมืออาชีพในยุค Digital Transformation</p>
                        </div>
                    </div>
                    <button className="course-button">
                        เล่มหลักสูตรวิศวกรรมคอมพิวเตอร์และไอโอที (ต่อเนื่อง)
                    </button>
                </div>
            </div>
        </div>
    );
}
