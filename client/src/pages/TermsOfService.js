import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiFileText, FiShield, FiAlertTriangle, FiCheckCircle, FiBook, FiMail } from 'react-icons/fi';
import SEO from '../components/SEO';

const TermsContainer = styled.div`
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

const TermsSection = styled.div`
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

const ImportantNotice = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[50]}, ${props => props.theme.colors.primary[100]});
  border: 2px solid ${props => props.theme.colors.primary[200]};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[8]};
  margin: ${props => props.theme.spacing[8]} 0;
  
  h3 {
    color: ${props => props.theme.colors.primary[800]};
    font-size: ${props => props.theme.fontSizes.xl};
    margin-bottom: ${props => props.theme.spacing[4]};
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
    margin: 0;
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

const TermsOfService = () => {
  return (
    <TermsContainer>
      <SEO
        title="Terms of Service - YD Advisory Financial Services"
        description="Read YD Advisory's terms of service and conditions for using our financial advisory services. Understand your rights and obligations when working with us."
        keywords="terms of service, terms and conditions, YD Advisory, financial services terms, service agreement, legal terms"
        url="https://ydadvisory.ae/terms"
      />
      
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            These terms govern your use of our financial advisory services and website. 
            Please read them carefully.
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
              Service Terms
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              By using our services, you agree to be bound by these terms and conditions.
            </motion.p>
          </SectionHeader>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <TermsSection>
              <h3>
                <FiFileText />
                Acceptance of Terms
              </h3>
              <p>
                By accessing and using YD Advisory's services, you accept and agree 
                to be bound by the terms and provision of this agreement. If you do 
                not agree to abide by the above, please do not use this service.
              </p>
            </TermsSection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <TermsSection>
              <h3>
                <FiShield />
                Financial Advisory Services
              </h3>
              <p>
                Our financial advisory services include but are not limited to:
              </p>
              <ul>
                <li>Business valuations and financial modeling</li>
                <li>M&A advisory and transaction support</li>
                <li>Fractional CFO and board support services</li>
                <li>Corporate finance and cross-border structuring</li>
                <li>Feasibility studies and option papers</li>
                <li>Specialized valuations and due diligence</li>
              </ul>
              <p>
                All services are provided subject to professional standards and 
                regulatory compliance requirements.
              </p>
            </TermsSection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <TermsSection>
              <h3>
                <FiAlertTriangle />
                Client Responsibilities
              </h3>
              <p>
                As a client, you agree to:
              </p>
              <ul>
                <li>Provide accurate and complete information</li>
                <li>Disclose all relevant financial information</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Pay fees and charges as agreed</li>
                <li>Maintain confidentiality of proprietary methodologies</li>
                <li>Use our services for lawful purposes only</li>
              </ul>
            </TermsSection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <TermsSection>
              <h3>
                <FiCheckCircle />
                Service Standards
              </h3>
              <p>
                We are committed to providing high-quality financial advisory services 
                that meet professional standards. Our services are delivered with:
              </p>
              <ul>
                <li>Professional competence and due care</li>
                <li>Confidentiality and data protection</li>
                <li>Regulatory compliance and ethical standards</li>
                <li>Clear communication and transparency</li>
                <li>Timely delivery and responsiveness</li>
              </ul>
            </TermsSection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <TermsSection>
              <h3>
                <FiBook />
                Limitation of Liability
              </h3>
              <p>
                YD Advisory's liability is limited to the extent permitted by law. 
                We shall not be liable for any indirect, incidental, special, or 
                consequential damages arising from the use of our services.
              </p>
              <p>
                Our total liability shall not exceed the fees paid for the specific 
                service giving rise to the claim.
              </p>
            </TermsSection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <ImportantNotice>
              <h3>
                <FiAlertTriangle />
                Important Notice
              </h3>
              <p>
                Financial advisory services involve risks. Past performance does not 
                guarantee future results. All investments carry risk of loss. Please 
                consult with qualified professionals before making financial decisions.
              </p>
            </ImportantNotice>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <TermsSection>
              <h3>Modifications to Terms</h3>
              <p>
                We reserve the right to modify these terms at any time. Changes will 
                be posted on this page with an updated revision date. Continued use 
                of our services after changes constitutes acceptance of the new terms.
              </p>
            </TermsSection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <TermsSection>
              <h3>Governing Law</h3>
              <p>
                These terms are governed by the laws of the United Arab Emirates. 
                Any disputes shall be resolved in the courts of Dubai, UAE.
              </p>
            </TermsSection>
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
            Questions About Our Terms?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            If you have any questions about these terms of service, please contact us.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#E5E7EB' }}>
                <FiMail />
                <span>Yashaswi.das@ydadvisory.ae</span>
              </div>
            </div>
          </motion.div>
        </ContactContent>
      </ContactSection>
    </TermsContainer>
  );
};

export default TermsOfService;
