import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiEye, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import SEO from '../components/SEO';

const PrivacyContainer = styled.div`
  padding-top: 120px;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[800]} 0%, ${props => props.theme.colors.primary[900]} 100%);
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

const ContentSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.white};
`;

const SectionContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[12]};
  
  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[600]};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const PolicySection = styled.div`
  margin-bottom: ${props => props.theme.spacing[12]};
  
  h3 {
    font-size: ${props => props.theme.fontSizes['2xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[6]};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[3]};
    
    svg {
      color: ${props => props.theme.colors.primary[600]};
    }
  }
  
  p {
    color: ${props => props.theme.colors.gray[700]};
    line-height: 1.7;
    margin-bottom: ${props => props.theme.spacing[4]};
    font-size: ${props => props.theme.fontSizes.base};
  }
  
  ul {
    color: ${props => props.theme.colors.gray[700]};
    line-height: 1.7;
    margin: ${props => props.theme.spacing[4]} 0;
    padding-left: ${props => props.theme.spacing[6]};
    
    li {
      margin-bottom: ${props => props.theme.spacing[2]};
    }
  }
`;

const ContactSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[16]} 0;
  text-align: center;
`;

const ContactContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  
  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.white};
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.xl};
    margin-bottom: ${props => props.theme.spacing[8]};
    color: ${props => props.theme.colors.gray[200]};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing[8]};
  margin-top: ${props => props.theme.spacing[8]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing[4]};
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[3]};
    color: ${props => props.theme.colors.gray[200]};
    
    svg {
      color: ${props => props.theme.colors.primary[300]};
    }
  }
`;

const PrivacyPolicy = () => {
  return (
    <PrivacyContainer>
      <SEO
        title="Privacy Policy - YD Advisory Financial Services"
        description="Learn about YD Advisory's privacy policy and how we protect your personal information. Our commitment to data protection and privacy in financial services."
        keywords="privacy policy, data protection, personal information, YD Advisory, financial services privacy, GDPR compliance"
        url="https://ydadvisory.ae/privacy"
      />
      
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your privacy is important to us. This policy explains how we collect, 
            use, and protect your personal information.
          </motion.p>
        </HeroContent>
      </HeroSection>

      {/* Content Section */}
      <ContentSection>
        <SectionContent>
          <SectionHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Privacy Commitment
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              At YD Advisory, we are committed to protecting your privacy and ensuring 
              the security of your personal information.
            </motion.p>
          </SectionHeader>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <PolicySection>
              <h3>
                <FiShield />
                Information We Collect
              </h3>
              <p>
                We collect information you provide directly to us, such as when you:
              </p>
              <ul>
                <li>Fill out our contact forms or request consultations</li>
                <li>Subscribe to our newsletter or updates</li>
                <li>Engage with our financial advisory services</li>
                <li>Communicate with us via email, phone, or in person</li>
                <li>Use our website and online tools</li>
              </ul>
              <p>
                This information may include your name, email address, phone number, 
                company information, financial details, and other information you 
                choose to provide.
              </p>
            </PolicySection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <PolicySection>
              <h3>
                <FiEye />
                How We Use Your Information
              </h3>
              <p>
                We use the information we collect to:
              </p>
              <ul>
                <li>Provide, maintain, and improve our financial advisory services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Comply with legal obligations and regulatory requirements</li>
                <li>Protect against fraud and unauthorized transactions</li>
              </ul>
            </PolicySection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <PolicySection>
              <h3>
                <FiLock />
                Information Security
              </h3>
              <p>
                We implement appropriate technical and organizational measures to 
                protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. These measures include:
              </p>
              <ul>
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication procedures</li>
                <li>Staff training on data protection best practices</li>
                <li>Secure data storage and backup procedures</li>
              </ul>
            </PolicySection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <PolicySection>
              <h3>
                <FiUser />
                Your Rights
              </h3>
              <p>
                You have the right to:
              </p>
              <ul>
                <li>Access your personal information we hold about you</li>
                <li>Request correction of inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </PolicySection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <PolicySection>
              <h3>
                <FiMail />
                Cookies and Tracking
              </h3>
              <p>
                We use cookies and similar tracking technologies to enhance your 
                experience on our website. You can control cookie settings through 
                your browser preferences. For more information, please see our 
                Cookie Policy.
              </p>
            </PolicySection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <PolicySection>
              <h3>Changes to This Policy</h3>
              <p>
                We may update this Privacy Policy from time to time. We will notify 
                you of any changes by posting the new Privacy Policy on this page 
                and updating the "Last Updated" date. We encourage you to review 
                this Privacy Policy periodically for any changes.
              </p>
            </PolicySection>
          </motion.div>
        </SectionContent>
      </ContentSection>

      {/* Contact Section */}
      <ContactSection>
        <ContactContent>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Questions About Your Privacy?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            If you have any questions about this Privacy Policy or our data 
            practices, please contact us.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <ContactInfo>
              <div className="contact-item">
                <FiMail />
                <a href="mailto:Yashaswi.das@ydadvisory.ae" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <span>Yashaswi.das@ydadvisory.ae</span>
                </a>
              </div>
              <div className="contact-item">
                <FiPhone />
                <a href="tel:+971528477349" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <span>+971-528477349</span>
                </a>
              </div>
            </ContactInfo>
          </motion.div>
        </ContactContent>
      </ContactSection>
    </PrivacyContainer>
  );
};

export default PrivacyPolicy;
