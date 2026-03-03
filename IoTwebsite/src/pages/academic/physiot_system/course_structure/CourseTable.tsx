import { useLayoutEffect, useState, useRef } from 'react';
import './CourseTable_PHYIOT.css';
import '../../iot_system/course_structure/CourseTable.css';

interface Course {
    id: string;
    name: React.ReactNode;
    col: number; // 1 to 8 (semesters)
    row: number; // 1 to 9 (vertical position)
    rowSpan?: number;
    connectsTo?: string[];
    mobileConnectFromSide?: 'top' | 'bottom' | 'left' | 'right';
    mobileConnectToSide?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
    mobileCol?: number; // 1 to 6
    mobileRow?: number; // 1 to n
    mobileColSpan?: number;
    mobileRowSpan?: number;
}

const COURSES: Course[] = [
    // Year 1 - Sem 1
    { id: 'appsoft', name: 'App Software for Business', col: 1, row: 7, mobileCol: 1, mobileRow: 1 },
    { id: 'circuit', name: 'Circuit and Electronics', col: 1, row: 4, connectsTo: ['digi'], mobileCol: 2, mobileRow: 1 },
    { id: 'eng1', name: 'Foundation English 1', col: 1, row: 8, connectsTo: ['eng2'], mobileConnectFromSide: 'left', mobileCol: 5, mobileRow: 1 },
    { id: 'intro_iot', name: 'Introduction to IoT', col: 1, row: 5, connectsTo: ['oop'], mobileCol: 6, mobileRow: 1 },
    { id: 'cal1', name: 'Calculus 1', col: 1, row: 1, connectsTo: ['cal2'], mobileCol: 1, mobileRow: 2 },
    { id: 'comprog', name: 'Computer Program', col: 1, row: 6, connectsTo: ['oop'], mobileCol: 2, mobileRow: 2 },
    { id: 'gen1', name: 'Gen Physics 1', col: 1, row: 2, connectsTo: ['gen2'], mobileCol: 5, mobileRow: 2 },
    { id: 'gplab1', name: 'Gen Physics Lab 1', col: 1, row: 3, connectsTo: ['gplab2'], mobileCol: 6, mobileRow: 2 },

    // Year 1 - Sem 2
    { id: 'cal2', name: 'Calculus 2', col: 2, row: 1, connectsTo: ['ode', 'stat'], mobileCol: 1, mobileRow: 1 },
    { id: 'oop', name: 'Object-Oriented Data Structure', col: 2, row: 5, mobileCol: 2, mobileRow: 1 },
    { id: 'digi', name: 'Fundamental Digital System', col: 2, row: 4, connectsTo: ['micro'], mobileCol: 3, mobileRow: 1 },
    { id: 'eng2', name: 'Foundation English 2', col: 2, row: 8, mobileCol: 4, mobileRow: 1 },
    { id: 'gen2', name: 'Gen Physics 2', col: 2, row: 2, mobileCol: 5, mobileRow: 1 },
    { id: 'gplab2', name: 'General Physics Lab 2', col: 2, row: 3, mobileCol: 6, mobileRow: 1 },
    { id: 'preact', name: 'Pre-Activities For Engineers', col: 2, row: 6, mobileCol: 2, mobileRow: 2 },
    { id: 'charm', name: 'Charm School', col: 2, row: 7, mobileCol: 4, mobileRow: 2 },
    { id: 'team1', name: 'Team Project 1', col: 2, row: 9, connectsTo: ['team2'], mobileCol: 6, mobileRow: 2 },

    // Year 2 - Sem 1
    { id: 'ode', name: 'ODE and Linear Algebra', col: 3, row: 1, mobileCol: 1, mobileRow: 1, mobileRowSpan: 2 },
    { id: 'stat', name: 'Engineering Statistics', col: 3, row: 2, mobileCol: 2, mobileRow: 1, mobileRowSpan: 2 },
    { id: 'micro', name: 'MCU and Embedded', col: 3, row: 6, connectsTo: ['cyber'], mobileCol: 3, mobileColSpan: 2, mobileRow: 1 },
    { id: 'cyber', name: 'CPS & Sensors', col: 3, row: 5, mobileCol: 3, mobileRow: 2 },
    { id: 'digicit', name: 'Digital Citizen', col: 3, row: 7, mobileCol: 4, mobileRow: 2 },
    { id: 'em', name: 'Electromagnetic Fields', col: 3, row: 3, mobileCol: 5, mobileRow: 1, mobileRowSpan: 2 },
    { id: 'comm', name: 'Principles of Communicate', col: 3, row: 4, mobileCol: 6, mobileRow: 1, mobileRowSpan: 2 },

    // Year 2 - Sem 2
    { id: 'disc', name: 'Discrete Mathematics', col: 4, row: 1, mobileCol: 1, mobileRow: 1, mobileRowSpan: 2 },
    { id: 'inter', name: 'Interaction Design', col: 4, row: 2, mobileCol: 2, mobileRow: 1 },
    { id: 'web', name: 'Web and Mobile App Development', col: 4, row: 3, mobileCol: 3, mobileRow: 1 },
    { id: 'team2', name: 'Team Project 2', col: 4, row: 9, connectsTo: ['team3'], mobileCol: 4, mobileRow: 1 },
    { id: 'sec', name: 'Cyber Security', col: 4, row: 4, mobileCol: 5, mobileRow: 1 },
    { id: 'iotcomm', name: 'IoT and Data Communicate', col: 4, row: 5, mobileCol: 6, mobileRow: 1 },
    { id: 'gened1', name: 'Gen-Ed', col: 4, row: 6, mobileCol: 2, mobileRow: 2 },
    { id: 'genedlang1', name: 'Gen-Ed (LANG)', col: 4, row: 7, mobileCol: 3, mobileRow: 2 },

    // Year 3 - Sem 1
    { id: 'mathds', name: 'Math Data Science', col: 5, row: 1, mobileCol: 1, mobileRow: 1 },
    { id: 'ai', name: 'Artificial Intelligence', col: 5, row: 2, mobileCol: 2, mobileRow: 1 },
    { id: 'major1', name: 'MAJOR ELECTIVE 1', col: 5, row: 3, mobileCol: 3, mobileRow: 1 },
    { id: 'major2', name: 'MAJOR ELECTIVE 2', col: 5, row: 4, mobileCol: 4, mobileRow: 1 },
    { id: 'sem', name: 'SEMINAR', col: 5, row: 5, mobileCol: 5, mobileRow: 1 },
    { id: 'iotlab1', name: 'IoT & Info Lab 1', col: 5, row: 6, mobileCol: 6, mobileRow: 1 },
    { id: 'gened2', name: 'Gen-Ed', col: 5, row: 7, mobileCol: 1, mobileRow: 2 },

    // Year 3 - Sem 2
    { id: 'iiot', name: 'Industrial Internet of Things', col: 6, row: 1, mobileCol: 1, mobileRow: 1 },
    { id: 'major3', name: 'MAJOR ELECTIVE 3', col: 6, row: 2, mobileCol: 2, mobileRow: 1 },
    { id: 'iotlab2', name: 'IoT & Info Lab 2', col: 6, row: 3, mobileCol: 3, mobileRow: 1 },
    { id: 'team3', name: 'Team Project 3', col: 6, row: 9, mobileCol: 4, mobileRow: 1 },
    { id: 'gened3', name: 'Gen-Ed', col: 6, row: 4, mobileCol: 5, mobileRow: 1 },

    // Year 4 - Sem 1
    { id: 'proj1', name: 'Project 1', col: 7, row: 1, connectsTo: ['proj2_1'], mobileCol: 1, mobileColSpan: 2, mobileRow: 1, className: 'course-pill-outline' },
    { id: 'iotele1', name: 'IoT Elective 1', col: 7, row: 2, mobileCol: 3, mobileColSpan: 2, mobileRow: 1, className: 'course-pill-outline' },
    { id: 'free1', name: 'Free Elective 1', col: 7, row: 4, mobileCol: 1, mobileColSpan: 2, mobileRow: 2, className: 'course-pill-outline' },
    { id: 'iotele2', name: 'IoT Elective 2', col: 7, row: 3, mobileCol: 3, mobileColSpan: 2, mobileRow: 2, className: 'course-pill-outline' },
    { id: 'coop', name: <>Co-Operative<br />/ Study Abroad</>, col: 7, row: 6, rowSpan: 3, mobileCol: 5, mobileColSpan: 2, mobileRow: 1, mobileRowSpan: 2, className: 'course-pill-coop' },

    // Year 4 - Sem 2 (Plan 1)
    { id: 'proj2_1', name: 'Project 2', col: 8, row: 1, mobileCol: 1, mobileRow: 1 },
    { id: 'iotele3', name: 'IoT Elective 3', col: 8, row: 2, mobileCol: 2, mobileRow: 1 },
    { id: 'free2', name: 'Free Elective 2', col: 8, row: 3, mobileCol: 3, mobileRow: 1 },

    // Year 4 - Sem 2 (Plan 2)
    { id: 'proj2_2', name: 'Project 2', col: 8, row: 6, mobileCol: 1, mobileRow: 1 },
    { id: 'proj2_3', name: 'Project 2', col: 8, row: 7, mobileCol: 2, mobileRow: 1 },
    { id: 'proj2_4', name: 'Project 2', col: 8, row: 8, mobileCol: 3, mobileRow: 1 },
    { id: 'proj2_5', name: 'Project 2', col: 8, row: 9, mobileCol: 4, mobileRow: 1 },
    { id: 'proj2_6', name: 'Project 2', col: 8, row: 10, mobileCol: 5, mobileRow: 1 },
];

interface Connection {
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    fromSide: 'top' | 'bottom' | 'left' | 'right';
    toSide: 'top' | 'bottom' | 'left' | 'right';
    midValue?: number; // midX or midY depending on priority
}

export default function CourseTable() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useLayoutEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const drawLines = () => {
        if (!containerRef.current) return;

        let containerRect = containerRef.current.getBoundingClientRect();

        const newConnections: Connection[] = [];

        const obstacles = COURSES.map(c => {
            const prefix = isMobile ? 'm-phy-course-' : 'phy-course-';
            const el = document.getElementById(`${prefix}${c.id}`);
            if (!el) return null;
            const rect = el.getBoundingClientRect();
            return {
                id: c.id,
                left: rect.left - containerRect.left,
                top: rect.top - containerRect.top,
                right: rect.right - containerRect.left,
                bottom: rect.bottom - containerRect.top,
            };
        }).filter(o => o !== null) as { id: string, left: number, top: number, right: number, bottom: number }[];

        COURSES.forEach(course => {
            if (course.connectsTo && course.connectsTo.length > 0) {
                const prefix = isMobile ? 'm-phy-course-' : 'phy-course-';
                const fromEl = document.getElementById(`${prefix}${course.id}`);
                if (!fromEl) return;
                const fromRect = fromEl.getBoundingClientRect();

                course.connectsTo.forEach(targetId => {
                    const toEl = document.getElementById(`${prefix}${targetId}`);
                    if (!toEl) return;
                    const toRect = toEl.getBoundingClientRect();

                    let x1: number, y1: number, x2: number, y2: number, midValue: number | undefined;
                    let fSide: 'top' | 'bottom' | 'left' | 'right';
                    let tSide: 'top' | 'bottom' | 'left' | 'right';

                    if (isMobile) {
                        fSide = (course.mobileConnectFromSide || 'bottom') as any;
                        tSide = (course.mobileConnectToSide || 'top') as any;

                        // Calculate Start (From)
                        if (fSide === 'top') {
                            x1 = fromRect.left + fromRect.width / 2 - containerRect.left;
                            y1 = fromRect.top - containerRect.top;
                        } else if (fSide === 'bottom') {
                            x1 = fromRect.left + fromRect.width / 2 - containerRect.left;
                            y1 = fromRect.bottom - containerRect.top;
                        } else if (fSide === 'left') {
                            x1 = fromRect.left - containerRect.left;
                            y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
                        } else { // right
                            x1 = fromRect.right - containerRect.left;
                            y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
                        }

                        // Calculate End (To)
                        if (tSide === 'top') {
                            x2 = toRect.left + toRect.width / 2 - containerRect.left;
                            y2 = toRect.top - containerRect.top;
                        } else if (tSide === 'bottom') {
                            x2 = toRect.left + toRect.width / 2 - containerRect.left;
                            y2 = toRect.bottom - containerRect.top;
                        } else if (tSide === 'left') {
                            x2 = toRect.left - containerRect.left;
                            y2 = toRect.top + toRect.height / 2 - containerRect.top;
                        } else { // right
                            x2 = toRect.right - containerRect.left;
                            y2 = toRect.top + toRect.height / 2 - containerRect.top;
                        }

                        // AVOIDANCE LOGIC for mobile
                        const checkCollision = (mv: number, isVertical: boolean) => {
                            const xMin = Math.min(x1, x2);
                            const xMax = Math.max(x1, x2);
                            const yMin = Math.min(y1, y2);
                            const yMax = Math.max(y1, y2);

                            return obstacles.some(o => {
                                if (o.id === course.id || o.id === targetId) return false;
                                if (isVertical) {
                                    // Segment is horizontal at y=mv
                                    return mv > o.top - 2 && mv < o.bottom + 2 &&
                                        !(xMax < o.left || xMin > o.right);
                                } else {
                                    // Segment is vertical at x=mv
                                    return mv > o.left - 2 && mv < o.right + 2 &&
                                        !(yMax < o.top || yMin > o.bottom);
                                }
                            });
                        };

                        if (fSide === 'bottom' || fSide === 'top') {
                            // Vertical priority -> Horizontal midY
                            midValue = (y1 + y2) / 2;
                            if (checkCollision(midValue, true)) {
                                // Try offsets near start and end
                                const step = fSide === 'bottom' ? 12 : -12;
                                if (!checkCollision(y1 + step, true)) {
                                    midValue = y1 + step;
                                } else if (!checkCollision(y2 - step, true)) {
                                    midValue = y2 - step;
                                }
                            }
                        } else {
                            // Horizontal priority -> Vertical midX
                            midValue = (x1 + x2) / 2;
                            if (checkCollision(midValue, false)) {
                                const step = fSide === 'right' ? 12 : -12;
                                if (!checkCollision(x1 + step, false)) {
                                    midValue = x1 + step;
                                } else if (!checkCollision(x2 - step, false)) {
                                    midValue = x2 - step;
                                }
                            }
                        }

                    } else {
                        fSide = 'right';
                        tSide = 'left';
                        x1 = fromRect.right - containerRect.left;
                        y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
                        x2 = toRect.left - containerRect.left;
                        y2 = toRect.top + toRect.height / 2 - containerRect.top;
                    }

                    newConnections.push({
                        id: `${course.id}-${targetId}`,
                        x1, y1, x2, y2,
                        fromSide: fSide,
                        toSide: tSide,
                        midValue
                    });
                });
            }
        });

        setConnections(newConnections);
    };

    useLayoutEffect(() => {
        const timeoutId = setTimeout(drawLines, 100);
        window.addEventListener('resize', drawLines);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', drawLines);
        }
    }, [isMobile]);

    const getYearText = (year: number) => {
        if (year === 1) return "1st year";
        if (year === 2) return "2nd year";
        if (year === 3) return "3rd year";
        return "4th year";
    };

    const renderMobile = () => {
        return (
            <div className="course-mobile-container phy-iot-theme" ref={containerRef}>
                <svg className="course-lines-svg">
                    {connections.map(line => {
                        const { x1, y1, x2, y2, fromSide, toSide } = line;
                        const r = 8; // border radius for corners

                        let pathData = "";
                        const signX = x2 > x1 ? 1 : -1;
                        const signY = y2 > y1 ? 1 : -1;

                        if (fromSide === 'left' || fromSide === 'right') {
                            // Horizontal priority
                            const midX = line.midValue ?? (x1 + x2) / 2;
                            if (Math.abs(y1 - y2) < 2) {
                                pathData = `M ${x1} ${y1} L ${x2} ${y2}`;
                            } else {
                                const actualR = Math.min(r, Math.abs(x1 - midX), Math.abs(y1 - y2) / 2);
                                pathData = `M ${x1} ${y1} 
                                           L ${midX - signX * actualR} ${y1}
                                           Q ${midX} ${y1} ${midX} ${y1 + signY * actualR}
                                           L ${midX} ${y2 - signY * actualR}
                                           Q ${midX} ${y2} ${midX + signX * actualR} ${y2}
                                           L ${x2} ${y2}`;
                            }
                        } else {
                            // Vertical priority
                            const midY = line.midValue ?? (y1 + y2) / 2;
                            if (Math.abs(x1 - x2) < 2) {
                                pathData = `M ${x1} ${y1} L ${x2} ${y2}`;
                            } else {
                                const actualR = Math.min(r, Math.abs(y1 - midY), Math.abs(x1 - x2) / 2);
                                pathData = `M ${x1} ${y1} 
                                           L ${x1} ${midY - signY * actualR}
                                           Q ${x1} ${midY} ${x1 + signX * actualR} ${midY}
                                           L ${x2 - signX * actualR} ${midY}
                                           Q ${x2} ${midY} ${x2} ${midY + signY * actualR}
                                           L ${x2} ${y2}`;
                            }
                        }

                        return (
                            <path
                                key={line.id}
                                d={pathData}
                                fill="none"
                                stroke="rgba(255,255,255,0.4)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        );
                    })}
                </svg>

                {[1, 2, 3, 4].map(year => (
                    <div className="mobile-year-group" key={year}>
                        <div className="mobile-year-label">
                            <span className="vertical-text">{getYearText(year)}</span>
                        </div>
                        <div className="mobile-semesters">
                            {year === 4 ? (
                                <div className="mobile-plan-container" style={{ flexDirection: 'row', width: '100%', gap: '10px' }}>

                                    {/* PLAN 1 Column */}
                                    <div className="mobile-plan-box mobile-plan-box-outline" style={{ flex: 1 }}>
                                        <div className="mobile-courses-grid" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {/* S1 & S2 Plan 1 courses */}
                                            {COURSES.filter(c => c.col >= 7 && c.row < 6).map(course => (
                                                <div
                                                    key={course.id}
                                                    id={`m-phy-course-${course.id}`}
                                                    className={`mobile-course-pill mobile-plan-pill ${course.className || ''}`}
                                                >
                                                    {course.name}
                                                </div>
                                            ))}
                                            <div style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingTop: '15px' }}>
                                                <div className="mobile-plan-header"><span>PLAN 1</span><br />project</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* PLAN 2 Column */}
                                    <div className="mobile-plan-box mobile-plan-box-outline" style={{ flex: 1 }}>
                                        <div className="mobile-courses-grid" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {/* S1 & S2 Plan 2 courses */}
                                            {COURSES.filter(c => c.col >= 7 && c.row >= 6).map(course => (
                                                <div
                                                    key={course.id}
                                                    id={`m-phy-course-${course.id}`}
                                                    className={`mobile-course-pill mobile-plan-pill ${course.className || ''}`}
                                                >
                                                    {course.name}
                                                </div>
                                            ))}
                                            <div style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingTop: '15px' }}>
                                                <div className="mobile-plan-header"><span>PLAN 2</span><br />Co-op</div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                    <div className="mobile-semester">
                                        <div className="mobile-sem-label">
                                            <span className="vertical-text">S1</span>
                                        </div>
                                        <div className="mobile-courses-grid">
                                            {COURSES.filter(c => c.col === year * 2 - 1).map(course => (
                                                <div
                                                    key={course.id}
                                                    id={`m-phy-course-${course.id}`}
                                                    className={`mobile-course-pill ${course.className || ''}`}
                                                    style={{
                                                        gridColumn: course.mobileColSpan ? `${course.mobileCol} / span ${course.mobileColSpan}` : course.mobileCol,
                                                        gridRow: course.mobileRowSpan ? `${course.mobileRow} / span ${course.mobileRowSpan}` : course.mobileRow,
                                                    }}
                                                >
                                                    {course.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mobile-semester">
                                        <div className="mobile-sem-label">
                                            <span className="vertical-text">S2</span>
                                        </div>
                                        <div className="mobile-courses-grid">
                                            {COURSES.filter(c => c.col === year * 2).map(course => (
                                                <div
                                                    key={course.id}
                                                    id={`m-phy-course-${course.id}`}
                                                    className={`mobile-course-pill ${course.className || ''}`}
                                                    style={{
                                                        gridColumn: course.mobileColSpan ? `${course.mobileCol} / span ${course.mobileColSpan}` : course.mobileCol,
                                                        gridRow: course.mobileRowSpan ? `${course.mobileRow} / span ${course.mobileRowSpan}` : course.mobileRow,
                                                    }}
                                                >
                                                    {course.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderDesktop = () => {
        const coreCourses = COURSES.filter(c => c.col < 7);
        const plan1Courses = COURSES.filter(c => c.col >= 7 && c.row < 6);
        const plan2Courses = COURSES.filter(c => c.col >= 7 && c.row >= 6);

        return (
            <div className="course-table-container phy-iot-theme">
                {/* Header Rows */}
                <div className="course-header-years">
                    <div className="year-header">1st year</div>
                    <div className="year-header">2nd year</div>
                    <div className="year-header">3rd year</div>
                    <div className="year-header">4th year</div>
                </div>
                <div className="course-header-semesters">
                    <div className="semester-header">Semester 1</div>
                    <div className="semester-header">Semester 2</div>
                    <div className="semester-header">Semester 1</div>
                    <div className="semester-header">Semester 2</div>
                    <div className="semester-header">Semester 1</div>
                    <div className="semester-header">Semester 2</div>
                    <div className="semester-header">Semester 1</div>
                    <div className="semester-header">Semester 2</div>
                </div>

                {/* Grid Content */}
                <div className="course-grid-area" ref={containerRef}>
                    {/* SVG overlay for lines */}
                    <svg className="course-lines-svg">
                        {connections.map(line => {
                            const { x1, y1, x2, y2, fromSide } = line;
                            const r = 12; // border radius for corners

                            let pathData = "";
                            const signX = x2 > x1 ? 1 : -1;
                            const signY = y2 > y1 ? 1 : -1;

                            if (fromSide === 'left' || fromSide === 'right') {
                                // Horizontal priority
                                const midX = line.midValue ?? (x1 + x2) / 2;
                                if (Math.abs(y1 - y2) < 2) {
                                    pathData = `M ${x1} ${y1} L ${x2} ${y2}`;
                                } else {
                                    const actualR = Math.min(r, Math.abs(x1 - midX), Math.abs(y1 - y2) / 2);
                                    pathData = `M ${x1} ${y1}
                                               L ${midX - signX * actualR} ${y1}
                                               Q ${midX} ${y1} ${midX} ${y1 + signY * actualR}
                                               L ${midX} ${y2 - signY * actualR}
                                               Q ${midX} ${y2} ${midX + signX * actualR} ${y2}
                                               L ${x2} ${y2}`;
                                }
                            } else {
                                // Vertical priority
                                const midY = line.midValue ?? (y1 + y2) / 2;
                                if (Math.abs(x1 - x2) < 2) {
                                    pathData = `M ${x1} ${y1} L ${x2} ${y2}`;
                                } else {
                                    const actualR = Math.min(r, Math.abs(y1 - midY), Math.abs(x1 - x2) / 2);
                                    pathData = `M ${x1} ${y1} 
                                               L ${x1} ${midY - signY * actualR}
                                               Q ${x1} ${midY} ${x1 + signX * actualR} ${midY}
                                               L ${x2 - signX * actualR} ${midY}
                                               Q ${x2} ${midY} ${x2} ${midY + signY * actualR}
                                               L ${x2} ${y2}`;
                                }
                            }

                            return (
                                <path
                                    key={line.id}
                                    d={pathData}
                                    fill="none"
                                    stroke="rgba(255,255,255,0.4)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            );
                        })}
                    </svg>

                    {/* Pump core courses into the grid */}
                    {coreCourses.map(course => (
                        <div
                            key={course.id}
                            id={`phy-course-${course.id}`}
                            className={`course-pill ${course.className || ''}`}
                            style={{
                                gridColumn: course.col,
                                gridRow: course.rowSpan ? `${course.row} / span ${course.rowSpan}` : course.row,
                            }}
                        >
                            {course.name}
                        </div>
                    ))}

                    {/* Plan 1 Wrapper */}
                    <div className="plan-box" style={{ gridColumn: '7 / 9', gridRow: '1 / 6' }}>
                        <div className="plan-box-grid">
                            {plan1Courses.map(course => (
                                <div
                                    key={course.id}
                                    id={`phy-course-${course.id}`}
                                    className={`course-pill ${course.className || ''}`}
                                    style={{
                                        gridColumn: course.col - 6,
                                        gridRow: course.rowSpan ? `${course.row} / span ${course.rowSpan}` : course.row,
                                    }}
                                >
                                    {course.name}
                                </div>
                            ))}
                            <div className="plan-text" style={{ gridColumn: 2, gridRow: '4 / 6', alignSelf: 'end', justifySelf: 'center', paddingBottom: '10px' }}>
                                <span>PLAN 1</span><br />project
                            </div>
                        </div>
                    </div>

                    {/* Plan 2 Wrapper */}
                    <div className="plan-box" style={{ gridColumn: '7 / 9', gridRow: '6 / 11' }}>
                        <div className="plan-box-grid">
                            {plan2Courses.map(course => (
                                <div
                                    key={course.id}
                                    id={`phy-course-${course.id}`}
                                    className={`course-pill ${course.className || ''}`}
                                    style={{
                                        gridColumn: course.col - 6,
                                        gridRow: course.rowSpan ? `${course.row - 5} / span ${course.rowSpan}` : course.row - 5,
                                    }}
                                >
                                    {course.name}
                                </div>
                            ))}
                            <div className="plan-text" style={{ gridColumn: 1, gridRow: '4 / 6', alignSelf: 'end', justifySelf: 'center', paddingBottom: '10px' }}>
                                <span>PLAN 2</span><br />Co-op
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return isMobile ? renderMobile() : renderDesktop();
}
