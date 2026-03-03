import React from 'react';
import { 
  Mail, 
  Instagram, 
  Phone, 
  Facebook, 
  MessageCircle 
} from 'lucide-react';
import './footer.css';

const contactInfo = {
  emails: [
    "iote@kmitl.ac.th",
    "pikulkaew.ta@kmitl.ac.th"
  ],
  socials: [
    { platform: "Instagram", handle: "kmitl.iot.official", icon: <Instagram size={20} /> },
    { platform: "LINE", handle: "@iotekmitl", icon: <MessageCircle size={20} /> },
    { platform: "Facebook", handle: "Department of IoT and Information Engineering, KMITL", icon: <Facebook size={20} /> },
  ],
  phones: [
    "02-329-8000 ext.5129",
    "02-329-8301 ext.235"
  ],
  department: "Department of IoT and Information Engineering, KMITL"
};

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Desktop Layout */}
        <div className="footer-desktop">
          
          {/* Logo Column */}
          <div className="footer-logo">
            <img 
              src="/path/to/logo.png" 
              alt="iCTE KMITL Logo" 
            />
          </div>

          {/* Contact Column */}
          <div className="footer-contact">
            <h3 className="footer-title">Contact us</h3>
            
            {/* Emails */}
            <div className="footer-email">
              <Mail size={20} />
              <div className="footer-email-list">
                {contactInfo.emails.map((email, idx) => (
                  <a key={idx} href={`mailto:${email}`}>
                    {email}
                  </a>
                ))}
              </div>
            </div>

            {/* Social & Info */}
            <div className="footer-info">
              {contactInfo.socials.map((item, idx) => (
                <div key={idx} className="footer-info-item">
                  {item.icon}
                  <span>{item.handle}</span>
                </div>
              ))}
              
              {/* Phone Numbers */}
              <div className="footer-phone">
                <Phone size={20} />
                <div className="footer-phone-list">
                  {contactInfo.phones.map((phone, idx) => (
                    <span key={idx}>{phone}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map Column */}
          <div className="footer-map">
            <h3 className="footer-title">Map</h3>
            <div className="footer-map-container">
              <img 
                src="/path/to/map.png" 
                alt="KMITL Map" 
              />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="footer-mobile">
          
          {/* Mobile Logo */}
          <div className="footer-mobile-logo">
            <img 
              src="/path/to/logo.png" 
              alt="iCTE KMITL Logo" 
            />
          </div>

          <div className="footer-mobile-content">
            {/* Header */}
            <div className="footer-mobile-header">
              <h3 className="footer-title">Contact us</h3>
            </div>

            {/* Email Section */}
            <div className="footer-mobile-section">
              <div className="footer-email">
                <Mail size={20} />
                <div className="footer-email-list footer-text-sm">
                  {contactInfo.emails.map((email, idx) => (
                    <a key={idx} href={`mailto:${email}`}>
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Social & Info Section */}
            <div className="footer-mobile-section space-y-4">
              {/* Instagram */}
              <div className="footer-info-item">
                <Instagram size={20} />
                <span className="footer-text-sm">kmitl.iot.official</span>
              </div>
              
              {/* LINE */}
              <div className="footer-info-item">
                <MessageCircle size={20} />
                <span className="footer-text-sm">@iotekmitl</span>
              </div>

              {/* Facebook */}
              <div className="footer-info-item">
                <Facebook size={20} />
                <span className="footer-text-sm">{contactInfo.department}</span>
              </div>

              {/* Phone */}
              <div className="footer-phone">
                <Phone size={20} />
                <div className="footer-phone-list footer-text-sm">
                  {contactInfo.phones.map((phone, idx) => (
                    <span key={idx}>{phone}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>
            Developed © 2025 IoT and Information Engineering 
            <span className="mobile-break"> </span>
            of King Mongkut's Institute of Technology Ladkrabang
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;