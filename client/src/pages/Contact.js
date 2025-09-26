import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiLinkedin } from 'react-icons/fi';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import { localBusinessSchema } from '../utils/structuredData';

const ContactContainer = styled.div`
  padding-top: 120px;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.4) 0%, rgba(15, 118, 110, 0.5) 100%), 
              url('/images/cta-bg.jpg') center/cover;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[20]} 0;
  text-align: center;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
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

const ContactFormStyled = styled.form`
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
          >
            <ContactGrid>
            <ContactItem>
              <FiMapPin />
              <div>
                <h3>Office Address</h3>
                <p>Level 41, Emirates Tower - DIFC,<br />Near Trade Center - Dubai, UAE</p>
              </div>
            </ContactItem>
            <ContactItem>
              <FiPhone />
              <div>
                <h3>Phone Number</h3>
                <p><a href="tel:+971528477349" style={{ color: 'inherit', textDecoration: 'none' }}>+971-528477349</a></p>
              </div>
            </ContactItem>
            <ContactItem>
              <FiMail />
              <div>
                <h3>Email Address</h3>
                <p><a href="mailto:Yashaswi.das@ydadvisory.ae" style={{ color: 'inherit', textDecoration: 'none' }}>Yashaswi.das@ydadvisory.ae</a></p>
              </div>
            </ContactItem>
            <ContactItem>
              <FiLinkedin />
              <div>
                <h3>LinkedIn</h3>
                <p><a href="https://www.linkedin.com/in/yashaswi-das/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Connect on LinkedIn</a></p>
              </div>
            </ContactItem>
            </ContactGrid>
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
            <ContactForm />
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
              <iframe
                title="YD Advisory Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3998.7639873492535!2d55.280686499115426!3d25.217728119661174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4292f6d3f4ab%3A0x67b81a59cfac0a46!2sServcorp%20Emirates%20Towers%20-%20Coworking%2C%20Offices%2C%20Virtual%20Offices%20%26%20Meeting%20Rooms!5e0!3m2!1sen!2sin!4v1758279391613!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 'inherit' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </MapContainer>
          </motion.div>
        </SectionContent>
      </MapSection>
    </ContactContainer>
  );
};

export default Contact;