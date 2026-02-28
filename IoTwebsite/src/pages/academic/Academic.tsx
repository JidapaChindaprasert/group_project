import './Academic.css';
import iotSystemImg from '../../assets/iot_system.png';
import industrialPhysicsImg from '../../assets/industrial_physics.png';
import computerIotImg from '../../assets/computer_iot.png';
import IOTSystem from './iot_system/IOTSystem';

interface ProgramCard {
    titleEn: string;
    titleEnSub?: string;
    titleTh: string;
    image: string;
    alt: string;
}

const programs: ProgramCard[] = [
    {
        titleEn: 'IOT SYSTEM AND INFORMATION',
        titleTh: 'วิศวกรรมระบบไอโอทีและสารสนเทศ',
        image: iotSystemImg,
        alt: 'IoT System and Information',
    },
    {
        titleEn: 'INDUSTRIAL PHYSICS AND IOT SYSTEM INFORMATION',
        titleTh: 'ฟิสิกส์อุตสาหกรรม วิศวกรรมระบบไอโอที (หลักสูตรสองปริญญา)',
        image: industrialPhysicsImg,
        alt: 'Industrial Physics and IoT',
    },
    {
        titleEn: 'COMPUTER AND IOT',
        titleEnSub: '(Continuing program)',
        titleTh: 'วิศวกรรมคอมพิวเตอร์และไอโอที (ต่อเนื่อง)',
        image: computerIotImg,
        alt: 'Computer and IoT',
    },
];

export default function Academic() {
    return (
        <div className="academic-page">
            <div className="academic-hero">
                <h1 className="academic-main-title">Our academics</h1>
                <div className="academic-cards-container">
                    {programs.map((program, index) => (
                        <div className="academic-card" key={index}>
                            <div className="academic-card-header">
                                <p className="academic-title-en">{program.titleEn}</p>
                                {program.titleEnSub && (
                                    <p className="academic-title-en-sub">{program.titleEnSub}</p>
                                )}
                            </div>
                            <div className="academic-card-image-wrapper">
                                <img
                                    src={program.image}
                                    alt={program.alt}
                                    className="academic-card-image"
                                />
                                <div className="academic-card-overlay">
                                    <p className="academic-title-th">{program.titleTh}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detailed Section below Hero Cards */}
            <IOTSystem />

        </div>
    );
}
