import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiBriefcase, FiFileText, FiDollarSign, FiTrendingUp, FiShield, FiCheckCircle } from 'react-icons/fi';
import SEO from '../components/SEO';

const CalculatorContainer = styled.div`
  padding-top: 120px;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const CalculatorContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[4]};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing[12]};
  align-items: center;
  min-height: 80vh;
  position: relative;
  z-index: 1;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing[8]};
    text-align: center;
  }
`;

const LeftContent = styled.div`
  color: ${props => props.theme.colors.white};
  
  h1 {
    font-size: ${props => props.theme.fontSizes['6xl']};
    font-weight: ${props => props.theme.fontWeights.bold};
    line-height: 1.1;
    margin-bottom: ${props => props.theme.spacing[8]};
    
    @media (max-width: ${props => props.theme.breakpoints.xl}) {
      font-size: ${props => props.theme.fontSizes['5xl']};
    }
    
    @media (max-width: ${props => props.theme.breakpoints.lg}) {
      font-size: ${props => props.theme.fontSizes['4xl']};
    }
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes['3xl']};
    }
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.xl};
    line-height: 1.6;
    color: ${props => props.theme.colors.gray[200]};
    margin-bottom: ${props => props.theme.spacing[8]};
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes.lg};
    }
  }
`;

const BenefitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    align-items: center;
  }
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.gray[200]};
  
  svg {
    color: ${props => props.theme.colors.primary[400]};
    font-size: ${props => props.theme.fontSizes.xl};
    flex-shrink: 0;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.base};
  }
`;

const FormContainer = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  border: 2px solid #f59e0b;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    max-width: 500px;
    margin: 0 auto;
  }
`;

const FormHeader = styled.div`
  background: linear-gradient(135deg, #1e3a8a, #1e40af);
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[6]};
  text-align: center;
  color: ${props => props.theme.colors.white};
  
  .icon {
    font-size: ${props => props.theme.fontSizes['4xl']};
    color: ${props => props.theme.colors.primary[300]};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  h2 {
    font-size: ${props => props.theme.fontSizes['3xl']};
    font-weight: ${props => props.theme.fontWeights.bold};
    margin-bottom: ${props => props.theme.spacing[2]};
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes['2xl']};
    }
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[200]};
    margin: 0;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes.base};
    }
  }
`;

const FormContent = styled.div`
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[6]};
`;

const FormSection = styled.div`
  margin-bottom: ${props => props.theme.spacing[6]};
  
  h3 {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[2]};
    font-weight: ${props => props.theme.fontWeights.semibold};
    
    svg {
      color: #f59e0b;
    }
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing[4]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  label {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.gray[700]};
    margin-bottom: ${props => props.theme.spacing[2]};
    font-weight: ${props => props.theme.fontWeights.medium};
  }
  
  input, select, textarea {
    padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
    border: 1px solid ${props => props.theme.colors.gray[300]};
    border-radius: ${props => props.theme.borderRadius.md};
    font-size: ${props => props.theme.fontSizes.base};
    transition: all ${props => props.theme.transitions.fast};
    &.error { border-color: ${props => props.theme.colors.error || '#ef4444'}; }
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary[500]};
      box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
    }
    
    &::placeholder {
      color: ${props => props.theme.colors.gray[400]};
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 100px;
  }
  .error-text {
    color: ${props => props.theme.colors.error || '#ef4444'};
    font-size: 0.85rem;
    margin-top: 6px;
  }
`;

const FullWidthGroup = styled(FormGroup)`
  grid-column: 1 / -1;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #1e3a8a, #1e40af);
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[6]};
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.base};
  box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(30, 58, 138, 0.4);
    background: linear-gradient(135deg, #1e40af, #1d4ed8);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ValuationCalculator = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phone: '',
    industry: '',
    revenue: '',
    employees: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    const nextErrors = {};
    const emailRe = /^\S+@\S+\.\S+$/;
    if (!formData.firstName.trim()) nextErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) nextErrors.lastName = 'Last name is required';
    if (!formData.companyName.trim()) nextErrors.companyName = 'Company name is required';
    if (!emailRe.test(formData.email)) nextErrors.email = 'Enter a valid email';
    if (!formData.industry) nextErrors.industry = 'Select your industry';
    if (!formData.revenue) nextErrors.revenue = 'Select revenue range';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you! We will contact you within 24 hours with your business valuation.');
    }, 1200);
  };

  return (
    <CalculatorContainer>
      <SEO
        title="Business Valuation Calculator - Free Professional Valuation | YD Advisory"
        description="Get your free business valuation with our professional calculator. Instant access to expert valuation tools for companies across all industries. Professional, accurate, and confidential."
        keywords="business valuation calculator, free business valuation, company valuation, business worth calculator, valuation tool, business appraisal, YD Advisory"
        url="https://ydadvisory.ae/valuation-calculator"
      />
      
      <CalculatorContent>
        <LeftContent>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Business Valuation Calculator: What's Your Business Really Worth?
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get an instant, professional valuation of your business using our industry-leading calculator. 
            Trusted by 500+ companies across 15+ sectors.
          </motion.p>
          
          <BenefitsList>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <BenefitItem>
                <FiCheckCircle />
                <span>Professional-grade valuation methodology</span>
              </BenefitItem>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <BenefitItem>
                <FiShield />
                <span>100% confidential and secure</span>
              </BenefitItem>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <BenefitItem>
                <FiTrendingUp />
                <span>Detailed report with actionable insights</span>
              </BenefitItem>
            </motion.div>
          </BenefitsList>
        </LeftContent>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <FormContainer>
            <FormHeader>
              <FiBriefcase className="icon" />
              <h2>Get Your Free Valuation</h2>
              <p>Access our professional calculator instantly</p>
            </FormHeader>
            
            <FormContent>
              <form onSubmit={handleSubmit}>
                <FormSection>
                  <h3>
                    <FiFileText />
                    Your Information
                  </h3>
                  
                  <FormGrid>
                    <FormGroup>
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First name"
                        className={errors.firstName ? 'error' : ''}
                      />
                      {errors.firstName && (<div className="error-text">{errors.firstName}</div>)}
                    </FormGroup>
                    
                    <FormGroup>
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last name"
                        className={errors.lastName ? 'error' : ''}
                      />
                      {errors.lastName && (<div className="error-text">{errors.lastName}</div>)}
                    </FormGroup>
                  </FormGrid>
                  
                  <FormGroup>
                    <label htmlFor="companyName">What is the name of your company or idea?*</label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                      className={errors.companyName ? 'error' : ''}
                    />
                    {errors.companyName && (<div className="error-text">{errors.companyName}</div>)}
                  </FormGroup>
                  
                  <FormGrid>
                    <FormGroup>
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className={errors.email ? 'error' : ''}
                      />
                      {errors.email && (<div className="error-text">{errors.email}</div>)}
                    </FormGroup>
                    
                    <FormGroup>
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+971 50 123 4567"
                      />
                    </FormGroup>
                  </FormGrid>
                </FormSection>
                
                <FormSection>
                  <h3>
                    <FiDollarSign />
                    Business Details
                  </h3>
                  
                  <FormGroup>
                    <label htmlFor="industry">Industry *</label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className={errors.industry ? 'error' : ''}
                    >
                      <option value="">Select your industry</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="retail">Retail</option>
                      <option value="services">Professional Services</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="logistics">Logistics</option>
                      <option value="other">Other</option>
                    </select>
                  </FormGroup>
                  
                  <FormGrid>
                    <FormGroup>
                      <label htmlFor="revenue">Annual Revenue (USD) *</label>
                      <select
                        id="revenue"
                        name="revenue"
                        value={formData.revenue}
                        onChange={handleInputChange}
                        className={errors.revenue ? 'error' : ''}
                      >
                        <option value="">Select revenue range</option>
                        <option value="0-100k">$0 - $100,000</option>
                        <option value="100k-500k">$100,000 - $500,000</option>
                        <option value="500k-1m">$500,000 - $1,000,000</option>
                        <option value="1m-5m">$1,000,000 - $5,000,000</option>
                        <option value="5m-10m">$5,000,000 - $10,000,000</option>
                        <option value="10m+">$10,000,000+</option>
                      </select>
                    </FormGroup>
                    
                    <FormGroup>
                      <label htmlFor="employees">Number of Employees</label>
                      <select
                        id="employees"
                        name="employees"
                        value={formData.employees}
                        onChange={handleInputChange}
                      >
                        <option value="">Select employee count</option>
                        <option value="1-5">1-5 employees</option>
                        <option value="6-20">6-20 employees</option>
                        <option value="21-50">21-50 employees</option>
                        <option value="51-100">51-100 employees</option>
                        <option value="100+">100+ employees</option>
                      </select>
                    </FormGroup>
                  </FormGrid>
                  
                  <FullWidthGroup>
                    <label htmlFor="description">Business Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Tell us about your business, key products/services, and what makes you unique..."
                    />
                  </FullWidthGroup>
                </FormSection>
                
                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Processing...' : 'Get My Free Valuation'}
                </SubmitButton>
              </form>
            </FormContent>
          </FormContainer>
        </motion.div>
      </CalculatorContent>
    </CalculatorContainer>
  );
};

export default ValuationCalculator;
