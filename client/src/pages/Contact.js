import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import SEO from '../components/SEO';
import { localBusinessSchema } from '../utils/structuredData';
// Removed ValuationRequestForm; using a lightweight Get In Touch form instead

const ContactContainer = styled.div`
  padding-top: 120px;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.6) 0%, rgba(15, 118, 110, 0.7) 100%), 
              url('/images/contact-section-bg.jpg') center/cover;
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[20]} 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  
  h1 {
    font-size: ${props => props.theme.fontSizes['5xl']};
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.white};
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes['4xl']};
    }
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.gray[200]};
    line-height: 1.6;
  }
`;

const ContactSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.white};
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing[4]};
  padding: ${props => props.theme.spacing[6]};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  transition: all ${props => props.theme.transitions.base};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
  
  svg {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.primary[600]};
    margin-top: ${props => props.theme.spacing[1]};
    flex-shrink: 0;
  }
  
  div {
    h3 {
      font-size: ${props => props.theme.fontSizes.lg};
      font-weight: ${props => props.theme.fontWeights.semibold};
      color: ${props => props.theme.colors.primary[800]};
      margin-bottom: ${props => props.theme.spacing[2]};
    }
    
    p {
      color: ${props => props.theme.colors.gray[600]};
      margin: 0;
      line-height: 1.5;
    }
  }
`;

const ValuationSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.gray[50]};
`;

const ValuationSectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[12]};
  
  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
    font-weight: 700;
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[600]};
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const ContactForm = styled.form`
  max-width: 800px;
  margin: 0 auto;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[8]};
  box-shadow: ${props => props.theme.shadows.sm};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing[4]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    padding: ${props => props.theme.spacing[6]};
  }
  
  label {
    font-weight: 600;
    color: ${props => props.theme.colors.gray[700]};
    margin-bottom: ${props => props.theme.spacing[2]};
    display: block;
  }
  input, textarea {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid ${props => props.theme.colors.gray[300]};
    border-radius: 10px;
    font-size: 1rem;
    &.error { border-color: ${props => props.theme.colors.error || '#ef4444'}; }
  }
  textarea {
    grid-column: 1 / -1;
    min-height: 140px;
    resize: vertical;
  }
  button {
    grid-column: 1 / -1;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
    color: ${props => props.theme.colors.white};
    padding: 14px 20px;
    border: none;
    border-radius: ${props => props.theme.borderRadius.lg};
    font-weight: 700;
    cursor: pointer;
  }
  .error-text {
    grid-column: 1 / -1;
    color: ${props => props.theme.colors.error || '#ef4444'};
    font-size: 0.85rem;
    margin-top: -6px;
    margin-bottom: 10px;
  }
`;

const MapSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.white};
`;

const MapContainer = styled.div`
  height: 400px;
  background: ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.gray[600]};
  font-size: ${props => props.theme.fontSizes.lg};
`;

const Contact = () => {
  const [errors, setErrors] = useState({});

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());
    const nextErrors = {};
    const emailRe = /^\S+@\S+\.\S+$/;
    const phoneRe = /^[+]?[-0-9 ()]{7,20}$/;

    if (!values.firstName || values.firstName.trim().length < 2) nextErrors.firstName = 'Please enter at least 2 characters';
    if (!values.lastName || values.lastName.trim().length < 2) nextErrors.lastName = 'Please enter at least 2 characters';
    if (!values.email || !emailRe.test(values.email)) nextErrors.email = 'Enter a valid email address';
    if (!values.phone || !phoneRe.test(values.phone)) nextErrors.phone = 'Enter a valid phone number';
    if (!values.subject || values.subject.trim().length < 3) nextErrors.subject = 'Provide a subject (min 3 chars)';
    if (!values.message || values.message.trim().length < 10) nextErrors.message = 'Provide a short message (min 10 chars)';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      alert('Thanks! We will reach out shortly.');
      form.reset();
    }
  };
  return (
    <ContactContainer>
      <SEO
        title="Contact YD Advisory - Financial Consulting Dubai, UAE"
        description="Get in touch with YD Advisory for expert financial consulting services in Dubai, UAE. Contact our team for investment management, financial planning, and business advisory services. Free consultation available."
        keywords="contact YD Advisory, financial consultant Dubai, investment advisor UAE, financial planning Dubai, business advisory UAE, free consultation Dubai"
        url="https://ydadvisory.ae/contact"
        structuredData={localBusinessSchema}
      />
      
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to take control of your financial future? Contact our expert advisors 
            for a free consultation and personalized financial guidance.
          </motion.p>
        </HeroContent>
      </HeroSection>

      {/* Contact Info Section */}
      <ContactSection>
        <SectionContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h2 style={{ fontSize: '2.5rem', color: '#0f766e', marginBottom: '1rem' }}>
              Get In Touch With Us
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              Ready to take control of your financial future? Contact our expert advisors 
              for a free consultation and personalized financial guidance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}
          >
            <ContactItem>
              <FiMapPin />
              <div>
                <h3>Office Address</h3>
                <p>Level 41, Emirates Tower – DIFC,<br />Near Trade Center – Dubai, UAE</p>
              </div>
            </ContactItem>
            <ContactItem>
              <FiPhone />
              <div>
                <h3>Phone Number</h3>
                <p>+971-528477349</p>
              </div>
            </ContactItem>
            <ContactItem>
              <FiMail />
              <div>
                <h3>Email Address</h3>
                <p>Yashaswi.das@ydadvisory.ae</p>
              </div>
            </ContactItem>
          </motion.div>
        </SectionContent>
      </ContactSection>

      {/* Valuation Request Section */}
      <ValuationSection>
        <SectionContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ValuationSectionHeader>
              <h2>Request a Custom Proposal</h2>
              <p>
                Get a professional business valuation from our expert team. 
                We'll provide you with a comprehensive analysis tailored to your specific business needs.
              </p>
            </ValuationSectionHeader>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ContactForm onSubmit={handleContactSubmit}>
              <div>
                <label htmlFor="firstName">First name</label>
                <input id="firstName" name="firstName" className={errors.firstName ? 'error' : ''} placeholder="Enter your first name" />
                {errors.firstName && (<div className="error-text">{errors.firstName}</div>)}
              </div>
              <div>
                <label htmlFor="lastName">Last name</label>
                <input id="lastName" name="lastName" className={errors.lastName ? 'error' : ''} placeholder="Enter your last name" />
                {errors.lastName && (<div className="error-text">{errors.lastName}</div>)}
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className={errors.email ? 'error' : ''} placeholder="your@email.com" />
                {errors.email && (<div className="error-text">{errors.email}</div>)}
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" className={errors.phone ? 'error' : ''} placeholder="+971-XXXXXXX" />
                {errors.phone && (<div className="error-text">{errors.phone}</div>)}
              </div>
              <div>
                <label htmlFor="company">Company</label>
                <input id="company" name="company" placeholder="Enter your company" />
              </div>
              <div>
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" className={errors.subject ? 'error' : ''} placeholder="How can we help?" />
                {errors.subject && (<div className="error-text">{errors.subject}</div>)}
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" className={errors.message ? 'error' : ''} placeholder="Tell us about your requirements" />
                {errors.message && (<div className="error-text">{errors.message}</div>)}
              </div>
              <button type="submit">Send Message</button>
            </ContactForm>
          </motion.div>
        </SectionContent>
      </ValuationSection>

      {/* Map Section */}
      <MapSection>
        <SectionContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <MapContainer>
              Interactive Map - Emirates Tower, Trade Centre - DIFC, Dubai, UAE
            </MapContainer>
          </motion.div>
        </SectionContent>
      </MapSection>
    </ContactContainer>
  );
};

export default Contact;