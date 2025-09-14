import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiCheckCircle } from 'react-icons/fi';
import { contactService, apiUtils } from '../services/api';
import SEO from '../components/SEO';
import { localBusinessSchema } from '../utils/structuredData';

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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing[12]};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing[8]};
  }
`;

const ContactInfo = styled.div`
  h2 {
    font-size: ${props => props.theme.fontSizes['3xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[6]};
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing[8]};
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[6]};
  
  svg {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.primary[600]};
    margin-top: ${props => props.theme.spacing[1]};
  }
  
  div {
    h3 {
      font-size: ${props => props.theme.fontSizes.lg};
      font-weight: ${props => props.theme.fontWeights.semibold};
      color: ${props => props.theme.colors.primary[800]};
      margin-bottom: ${props => props.theme.spacing[1]};
    }
    
    p {
      color: ${props => props.theme.colors.gray[600]};
      margin: 0;
    }
  }
`;

const ContactForm = styled.form`
  background: ${props => props.theme.colors.gray[50]};
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.lg};
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing[6]};
  
  label {
    display: block;
    font-weight: ${props => props.theme.fontWeights.semibold};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[2]};
  }
  
  input, select, textarea {
    width: 100%;
    padding: ${props => props.theme.spacing[3]};
    border: 1px solid ${props => props.theme.colors.gray[300]};
    border-radius: ${props => props.theme.borderRadius.md};
    font-size: ${props => props.theme.fontSizes.base};
    transition: border-color ${props => props.theme.transitions.fast};
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary[500]};
      box-shadow: 0 0 0 3px ${props => props.theme.colors.primary[100]};
    }
    
    &.error {
      border-color: ${props => props.theme.colors.error};
    }
  }
  
  textarea {
    min-height: 120px;
    resize: vertical;
  }
  
  .error-message {
    color: ${props => props.theme.colors.error};
    font-size: ${props => props.theme.fontSizes.sm};
    margin-top: ${props => props.theme.spacing[1]};
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing[4]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[8]};
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.base};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  box-shadow: ${props => props.theme.shadows.lg};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.xl};
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  background: ${props => props.theme.colors.success};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing[6]};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

const MapSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.gray[50]};
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const response = await contactService.submitContact(data);
      
      if (response.success) {
        setIsSubmitted(true);
        reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // You could add error state handling here
      alert(apiUtils.handleError(error));
    } finally {
      setIsSubmitting(false);
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

      {/* Contact Section */}
      <ContactSection>
        <SectionContent>
          <ContactGrid>
            <ContactInfo>
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Let's Start the Conversation
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Our team of financial experts is here to help you achieve your goals. 
                Whether you're looking for investment advice, retirement planning, or 
                comprehensive financial strategy, we're ready to assist.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <ContactItem>
                  <FiMapPin />
                  <div>
                    <h3>Office Address</h3>
                    <p>Emirates Tower, Trade Centre -<br />DIFC, Dubai, UAE</p>
                  </div>
                </ContactItem>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <ContactItem>
                  <FiPhone />
                  <div>
                    <h3>Phone Number</h3>
                    <p>+91 70576 73562</p>
                  </div>
                </ContactItem>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <ContactItem>
                  <FiMail />
                  <div>
                    <h3>Email Address</h3>
                    <p>yashaswi.das@ydadvisory.ae<br />info@ydadvisory.ae</p>
                  </div>
                </ContactItem>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <ContactItem>
                  <FiClock />
                  <div>
                    <h3>Business Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
                  </div>
                </ContactItem>
              </motion.div>
            </ContactInfo>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ContactForm onSubmit={handleSubmit(onSubmit)}>
                {isSubmitted && (
                  <SuccessMessage>
                    <FiCheckCircle />
                    Thank you! Your message has been sent successfully.
                  </SuccessMessage>
                )}

                <FormRow>
                  <FormGroup>
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      {...register('firstName', { required: 'First name is required' })}
                      className={errors.firstName ? 'error' : ''}
                    />
                    {errors.firstName && (
                      <div className="error-message">{errors.firstName.message}</div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      {...register('lastName', { required: 'Last name is required' })}
                      className={errors.lastName ? 'error' : ''}
                    />
                    {errors.lastName && (
                      <div className="error-message">{errors.lastName.message}</div>
                    )}
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && (
                      <div className="error-message">{errors.email.message}</div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                    />
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    {...register('company')}
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="serviceInterest">Service Interest</label>
                  <select id="serviceInterest" {...register('serviceInterest')}>
                    <option value="">Select a service</option>
                    <option value="investment-management">Investment Management</option>
                    <option value="financial-planning">Financial Planning</option>
                    <option value="risk-assessment">Risk Assessment</option>
                    <option value="tax-planning">Tax Planning</option>
                    <option value="estate-planning">Estate Planning</option>
                    <option value="business-consulting">Business Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    {...register('subject', { required: 'Subject is required' })}
                    className={errors.subject ? 'error' : ''}
                  />
                  {errors.subject && (
                    <div className="error-message">{errors.subject.message}</div>
                  )}
                </FormGroup>

                <FormGroup>
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    {...register('message', { 
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters'
                      }
                    })}
                    className={errors.message ? 'error' : ''}
                    placeholder="Tell us about your financial goals and how we can help..."
                  />
                  {errors.message && (
                    <div className="error-message">{errors.message.message}</div>
                  )}
                </FormGroup>

                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <FiSend />
                    </>
                  )}
                </SubmitButton>
              </ContactForm>
            </motion.div>
          </ContactGrid>
        </SectionContent>
      </ContactSection>

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