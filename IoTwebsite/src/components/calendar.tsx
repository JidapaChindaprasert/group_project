import React, { useState, useRef, useEffect } from 'react';
import './calendar.css'; // นำเข้าไฟล์ CSS

// --- ข้อมูลวันสำคัญ ---
const IMPORTANT_DATES: Record<string, string> = {
  '2024-01-01': 'วันขึ้นปีใหม่',
  '2024-02-14': 'วันวาเลนไทน์ ❤️',
  '2024-04-13': 'วันสงกรานต์',
  '2024-05-01': 'วันแรงงาน',
  '2024-12-05': 'วันพ่อแห่งชาติ',
  '2024-08-12': 'วันแม่แห่งชาติ',
  // เพิ่มวันที่ทดสอบ (วันนี้ + 3 วัน)
  [new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0]]: 'วันทดสอบ (อีก 3 วัน)'
};

const MONTHS_TH = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const DAYS_TH = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

const FloatingCalendar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // State สำหรับควบคุม Tooltip
  const [tooltipDate, setTooltipDate] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState<string>('');

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setTooltipDate(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
    setTooltipDate(null);
  };

  const getDateKey = (year: number, month: number, day: number) => {
    const m = (month + 1).toString().padStart(2, '0');
    const d = day.toString().padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const handleDateEnter = (day: number, eventText: string) => {
    const key = getDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
    setTooltipDate(key);
    setTooltipContent(eventText);
  };

  const handleDateLeave = () => {
    setTooltipDate(null);
    setTooltipContent('');
  };

  const renderEmptyDays = () => {
    const firstDay = getFirstDayOfMonth(currentDate);
    return Array(firstDay).fill(null).map((_, index) => (
      <div key={`empty-${index}`} className="calendar-day-placeholder" />
    ));
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const daysArray = [];
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    for (let i = 1; i <= daysInMonth; i++) {
      const dateKey = getDateKey(currentYear, currentMonth, i);
      const eventText = IMPORTANT_DATES[dateKey];
      const hasEvent = !!eventText;

      const isToday = 
        i === new Date().getDate() && 
        currentMonth === new Date().getMonth() && 
        currentYear === new Date().getFullYear();
      
      const isSelected = 
        i === selectedDate.getDate() && 
        currentMonth === selectedDate.getMonth() && 
        currentYear === selectedDate.getFullYear();

      const isTooltipActive = tooltipDate === dateKey;

      daysArray.push(
        <div 
          key={i} 
          className="calendar-day-wrapper"
          onMouseEnter={() => hasEvent && handleDateEnter(i, eventText)}
          onMouseLeave={handleDateLeave}
          onTouchStart={() => hasEvent && handleDateEnter(i, eventText)}
        >
          {/* --- Tooltip --- */}
          {hasEvent && isTooltipActive && (
            <div className="calendar-tooltip">
              <div className="tooltip-content">
                {eventText}
                <div className="tooltip-arrow"></div>
              </div>
            </div>
          )}

          {/* --- ปุ่มวันที่ --- */}
          <button
            onClick={() => handleDateClick(i)}
            className={`
              calendar-day-btn 
              ${isSelected ? 'selected' : ''} 
              ${isToday && !isSelected ? 'today' : ''}
              ${hasEvent ? 'has-event' : ''}
            `}
          >
            {i}
            {/* --- จุดสีแดง --- */}
            {hasEvent && <span className="event-dot"></span>}
          </button>
        </div>
      );
    }
    return daysArray;
  };

  const todayKey = getDateKey(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  const hasEventToday = !!IMPORTANT_DATES[todayKey];

  return (
    <div className="app-container">
      
      {/* --- ส่วนที่เป็นไอคอนลอย (Trigger) --- */}
      <div ref={calendarRef} className="calendar-wrapper">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`trigger-btn ${isOpen ? 'active' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {hasEventToday && <span className="main-icon-dot"></span>}
        </button>

        {/* --- ส่วนปฏิทินที่เด้งออกมา (Popup) --- */}
        <div className={`calendar-popup ${isOpen ? 'open' : ''}`}>
          
          {/* Header */}
          <div className="popup-header">
            <button onClick={() => changeMonth(-1)} className="nav-btn">
              <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span className="month-year-text">
              {MONTHS_TH[currentDate.getMonth()]} {currentDate.getFullYear() + 543}
            </span>
            <button onClick={() => changeMonth(1)} className="nav-btn">
              <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          {/* Days Header */}
          <div className="days-header-grid">
            {DAYS_TH.map((day) => (
              <div key={day} className="day-name">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="days-grid">
            {renderEmptyDays()}
            {renderDays()}
          </div>

          {/* Footer */}
          <div className="popup-footer">
            เลือกวันที่: {selectedDate.toLocaleDateString('th-TH')}
          </div>
        </div>
      </div>

    </div>
  );
};

export default FloatingCalendar;