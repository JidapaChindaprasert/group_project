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
                    <div className="phy-pdf-mockup">
                        <div className="phy-pdf-content">
                            <h4 className="phy-pdf-title">หลักสูตรวิศวกรรมศาสตรบัณฑิต</h4>
                            <h4 className="phy-pdf-subtitle">สาขาวิชาวิศวกรรมไอโอทีและสารสนเทศ</h4>
                            <p className="phy-pdf-version">หลักสูตรปรับปรุง พ.ศ. 2569</p>

                            <div className="phy-pdf-details">
                                <div className="phy-pdf-section">
                                    <p><strong>หมวดที่ 1 ข้อมูลพื้นฐานเกี่ยวกับหลักสูตร</strong></p>
                                    <div className="phy-pdf-row">
                                        <span>ชื่อภาษาไทย</span>
                                        <span>หลักสูตรวิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมไอโอทีและสารสนเทศ</span>
                                    </div>
                                    <div className="phy-pdf-row">
                                        <span>ชื่อภาษาอังกฤษ</span>
                                        <span>Bachelor of Engineering Program in IoT and Information Engineering</span>
                                    </div>
                                </div>

                                <div className="phy-pdf-section">
                                    <p><strong>ชื่อและสาขาวิชา</strong></p>
                                    <div className="phy-pdf-row">
                                        <span>(ภาษาไทย)</span>
                                        <span>วิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมไอโอทีและสารสนเทศ</span>
                                    </div>
                                    <div className="phy-pdf-row">
                                        <span>(ภาษาอังกฤษ)</span>
                                        <span>Bachelor of Engineering (IoT and Information Engineering)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="phy-course-action-btn">
                        เล่มหลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ 2565
                    </button>
                </div>
            </div>
        </div>
    );
}
