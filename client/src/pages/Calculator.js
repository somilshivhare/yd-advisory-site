import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiDollarSign, 
  FiTrendingUp, 
  FiTarget, 
  FiShield, 
  FiBarChart, 
  FiArrowRight, 
  FiArrowLeft,
  FiCheck,
  FiGlobe,
  FiBuilding,
  FiUsers,
  FiAward,
  FiMail,
  FiPhone,
  FiClock,
  FiPrinter
} from 'react-icons/fi';
import SEO from '../components/SEO';
import ValuationRequestForm from '../components/ValuationRequestForm';

const CalculatorContainer = styled.div`
  padding-top: 120px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%);
`;

const CalculatorSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: ${props => props.theme.spacing[4]};
  padding-right: ${props => props.theme.spacing[4]};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[12]};
  
  h1 {
    font-size: 3rem;
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
    font-weight: 800;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: 2.5rem;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.25rem;
    color: ${props => props.theme.colors.gray[600]};
    max-width: 600px;
    margin: 0 auto;
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 1rem;
    }
  }
`;


const CalculatorCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: 20px;
  padding: ${props => props.theme.spacing[8]};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.theme.colors.gray[200]};
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[6]};
    border-radius: 16px;
  }
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing[8]};
  gap: ${props => props.theme.spacing[4]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: ${props => props.theme.spacing[2]};
  }
`;

const Step = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  background: ${props => 
    props.active ? props.theme.colors.primary[600] : 
    props.completed ? props.theme.colors.primary[500] : 
    props.theme.colors.gray[200]
  };
  color: ${props => 
    props.active || props.completed ? props.theme.colors.white : 
    props.theme.colors.gray[500]
  };
  transition: all 0.3s ease;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 35px;
    height: 35px;
    font-size: 0.8rem;
  }
`;

const StepContent = styled.div`
  min-height: 400px;
`;

const StepTitle = styled.h2`
  font-size: 1.8rem;
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[2]};
  text-align: center;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.5rem;
  }
`;

const StepDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[8]};
  font-size: 1.1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[4]};
  justify-content: center;
  margin-top: ${props => props.theme.spacing[8]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const ResultDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing[4]};
  margin-top: ${props => props.theme.spacing[6]};
`;

const DetailItem = styled.div`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[4]};
    border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.primary[200]};
  
  .label {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.gray[600]};
    margin-bottom: ${props => props.theme.spacing[1]};
  }
  
  .value {
    font-size: 1.2rem;
    font-weight: 700;
    color: ${props => props.theme.colors.primary[700]};
  }
`;

const CalculatorTitle = styled.h2`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[6]};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  
  svg {
    color: ${props => props.theme.colors.primary[600]};
  }
`;

const InputGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing[6]};
  
  label {
    display: block;
    font-weight: 600;
    color: ${props => props.theme.colors.gray[700]};
    margin-bottom: ${props => props.theme.spacing[2]};
  }
  
  input, select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid ${props => props.theme.colors.gray[300]};
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary[500]};
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
    }
  }
`;

const Button = styled.button`
  padding: 14px 32px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  min-width: 140px;
  justify-content: center;
  
  background: ${props => 
    props.primary ? 
    `linear-gradient(135deg, ${props.theme.colors.primary[600]}, ${props.theme.colors.primary[700]})` :
    props.theme.colors.gray[100]
  };
  color: ${props => 
    props.primary ? 
    props.theme.colors.white : 
    props.theme.colors.gray[700]
  };
  border: ${props => 
    props.primary ? 
    'none' : 
    `2px solid ${props.theme.colors.gray[300]}`
  };
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => 
      props.primary ? 
      '0 10px 25px rgba(20, 184, 166, 0.3)' :
      '0 5px 15px rgba(0, 0, 0, 0.1)'
    };
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultCard = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[50]}, ${props => props.theme.colors.primary[100]});
  border: 2px solid ${props => props.theme.colors.primary[200]};
  border-radius: 12px;
  padding: ${props => props.theme.spacing[6]};
  margin-top: ${props => props.theme.spacing[6]};
`;

const ResultTitle = styled.h3`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[4]};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  
  svg {
    color: ${props => props.theme.colors.primary[600]};
  }
`;

const ResultValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: ${props => props.theme.colors.primary[700]};
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const ResultDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const CalculatorTabs = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing[6]};
  background: ${props => props.theme.colors.gray[100]};
  border-radius: 8px;
  padding: 4px;
  overflow-x: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 4px;
  }
`;

const Tab = styled.button`
  flex: 1;
  padding: 12px 16px;
  border: none;
  background: ${props => props.active ? props.theme.colors.white : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primary[700] : props.theme.colors.gray[600]};
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  min-width: 120px;
  
  &:hover {
    color: ${props => props.theme.colors.primary[700]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-width: auto;
    white-space: normal;
    text-align: center;
  }
`;

const ContactSection = styled.div`
  margin-top: ${props => props.theme.spacing[8]};
  padding: ${props => props.theme.spacing[6]};
  background: ${props => props.theme.colors.primary[50]};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.primary[200]};
`;

const ContactTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[4]};
  text-align: center;
  font-weight: 700;
`;

const ContactDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[6]};
  line-height: 1.6;
`;

const ContactForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[6]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
  
  textarea {
    grid-column: 1 / -1;
  }
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[6]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  padding: ${props => props.theme.spacing[4]};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  
  svg {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.primary[600]};
    flex-shrink: 0;
  }
  
  div {
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing[1]};
    
    strong {
      font-size: ${props => props.theme.fontSizes.sm};
      color: ${props => props.theme.colors.primary[700]};
      font-weight: 600;
    }
    
    span {
      font-size: ${props => props.theme.fontSizes.sm};
      color: ${props => props.theme.colors.gray[600]};
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[4]};
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const Calculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    country: '',
    industry: '',
    businessStage: '',
    revenue: '',
    employees: '',
    fundingStage: '',
    growthRate: '',
    marketSize: '',
    competitiveAdvantage: '',
    intellectualProperty: '',
    customerBase: '',
    revenueModel: '',
    profitMargin: '',
    burnRate: '',
    runway: ''
  });
  const [valuation, setValuation] = useState(null);

  const steps = [
    { id: 1, title: 'Company Info', description: 'Basic company information' },
    { id: 2, title: 'Business Model', description: 'Revenue and operational details' },
    { id: 3, title: 'Market Position', description: 'Market size and competitive advantage' },
    { id: 4, title: 'Financials', description: 'Revenue, growth, and financial metrics' },
    { id: 5, title: 'Funding & Growth', description: 'Funding stage and growth trajectory' },
    { id: 6, title: 'Intellectual Property', description: 'IP assets and customer base' },
    { id: 7, title: 'Financial Health', description: 'Profitability and runway analysis' },
    { id: 8, title: 'Valuation', description: 'Final valuation results' }
  ];

  const countries = [
    'UAE', 'Singapore', 'Saudi Arabia', 'UK', 'USA', 'Canada', 'Australia', 'Germany', 'France', 'Other'
  ];

  const industries = [
    'Fintech', 'Healthcare', 'Logistics', 'Real Estate', 'Manufacturing', 'Consumer', 'Technology', 'E-commerce', 'Education', 'Energy', 'Other'
  ];

  const businessStages = [
    'Idea/Concept', 'MVP Development', 'Early Stage', 'Growth Stage', 'Expansion Stage', 'Mature Stage'
  ];

  const fundingStages = [
    'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'IPO Ready'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateValuation = () => {
    // Simplified valuation calculation based on multiple factors
    const revenue = parseFloat(formData.revenue) || 0;
    const employees = parseInt(formData.employees) || 0;
    const growthRate = parseFloat(formData.growthRate) || 0;
    const marketSize = parseFloat(formData.marketSize) || 0;
    const profitMargin = parseFloat(formData.profitMargin) || 0;
    const burnRate = parseFloat(formData.burnRate) || 0;
    const runway = parseFloat(formData.runway) || 0;

    // Base valuation factors
    let baseValuation = 0;
    
    // Revenue multiple (3-15x depending on growth and stage)
    const revenueMultiple = Math.min(15, Math.max(3, 3 + (growthRate / 10) + (profitMargin / 5)));
    baseValuation += revenue * revenueMultiple;

    // Market size factor
    const marketFactor = Math.min(2, marketSize / 1000000000); // Cap at 2x for $1B+ market
    baseValuation *= (1 + marketFactor);

    // Employee factor (per employee value)
    const employeeValue = employees * 50000; // $50k per employee
    baseValuation += employeeValue;

    // IP and competitive advantage bonus
    const ipBonus = formData.intellectualProperty === 'Yes' ? baseValuation * 0.2 : 0;
    const competitiveBonus = formData.competitiveAdvantage === 'Strong' ? baseValuation * 0.15 : 0;
    
    baseValuation += ipBonus + competitiveBonus;

    // Funding stage adjustment
    const stageMultiplier = {
      'Pre-Seed': 0.3,
      'Seed': 0.5,
      'Series A': 0.8,
      'Series B': 1.2,
      'Series C+': 1.5,
      'IPO Ready': 2.0
    };
    
    baseValuation *= (stageMultiplier[formData.fundingStage] || 1);

    // Risk adjustment based on runway and burn rate
    const riskFactor = runway > 18 ? 1.1 : runway > 12 ? 1.0 : runway > 6 ? 0.9 : 0.7;
    baseValuation *= riskFactor;

    // Industry adjustment
    const industryMultiplier = {
      'Fintech': 1.3,
      'Technology': 1.2,
      'Healthcare': 1.1,
      'E-commerce': 1.0,
      'Manufacturing': 0.9,
      'Real Estate': 0.8,
      'Other': 1.0
    };
    
    baseValuation *= (industryMultiplier[formData.industry] || 1);

    const finalValuation = Math.max(100000, baseValuation); // Minimum $100k valuation

    setValuation({
      companyValue: finalValuation,
      revenueMultiple: revenueMultiple.toFixed(1),
      marketFactor: (marketFactor * 100).toFixed(1),
      employeeValue: employeeValue,
      ipBonus: ipBonus,
      competitiveBonus: competitiveBonus,
      riskFactor: (riskFactor * 100).toFixed(1),
      industryMultiplier: ((industryMultiplier[formData.industry] || 1) * 100).toFixed(1)
    });

    setCurrentStep(8);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmitContact = () => {
    // Create email content with valuation details
    const emailSubject = `Valuation Request - ${formData.companyName}`;
    const emailBody = `
Valuation Request Details:

Company: ${formData.companyName}
Country: ${formData.country}
Industry: ${formData.industry}
Business Stage: ${formData.businessStage}

Contact Information:
Name: ${formData.contactName || 'Not provided'}
Email: ${formData.contactEmail || 'Not provided'}
Phone: ${formData.contactPhone || 'Not provided'}

Valuation Results:
Estimated Value: ${formatCurrency(valuation?.companyValue || 0)}
Revenue Multiple: ${valuation?.revenueMultiple}x
Market Factor: +${valuation?.marketFactor}%
Employee Value: ${formatCurrency(valuation?.employeeValue || 0)}
IP Bonus: ${formatCurrency(valuation?.ipBonus || 0)}
Competitive Bonus: ${formatCurrency(valuation?.competitiveBonus || 0)}
Risk Factor: ${valuation?.riskFactor}%

Additional Notes:
${formData.contactNotes || 'No additional notes provided'}

---
This valuation was generated using the YD Valuator tool.
Our team will contact you within 24 hours to discuss your valuation in detail.
    `;

    // Create mailto link
    const mailtoLink = `mailto:Yashaswi.das@ydadvisory.ae?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.open(mailtoLink);
    
    // Show success message (you could add a toast notification here)
    alert('Email client opened! Please send the email to complete your valuation request. Our team will contact you within 24 hours.');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
  return (
          <>
            <InputGroup>
              <label>What is the name of your company or idea? *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter your company name"
                required
              />
            </InputGroup>
            <InputGroup>
              <label>In which country is your company based? *</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </InputGroup>
            <InputGroup>
              <label>What industry does your company belong to? *</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Industry</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </InputGroup>
            <InputGroup>
              <label>Business Stage *</label>
              <select
                name="businessStage"
                value={formData.businessStage}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Stage</option>
                {businessStages.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </InputGroup>
          </>
        );

      case 2:
        return (
                <>
                  <InputGroup>
              <label>Annual Revenue (USD) *</label>
                    <input
                      type="number"
                name="revenue"
                value={formData.revenue}
                      onChange={handleInputChange}
                placeholder="1000000"
                required
                    />
                  </InputGroup>
                  <InputGroup>
              <label>Number of Employees *</label>
                    <input
                      type="number"
                name="employees"
                value={formData.employees}
                      onChange={handleInputChange}
                placeholder="10"
                required
                    />
                  </InputGroup>
                  <InputGroup>
              <label>Revenue Model *</label>
              <select
                name="revenueModel"
                value={formData.revenueModel}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Revenue Model</option>
                <option value="Subscription">Subscription</option>
                <option value="Transaction">Transaction-based</option>
                <option value="Advertising">Advertising</option>
                <option value="Freemium">Freemium</option>
                <option value="Marketplace">Marketplace</option>
                <option value="Other">Other</option>
              </select>
            </InputGroup>
          </>
        );

      case 3:
        return (
          <>
            <InputGroup>
              <label>Total Addressable Market Size (USD) *</label>
                    <input
                      type="number"
                name="marketSize"
                value={formData.marketSize}
                      onChange={handleInputChange}
                placeholder="1000000000"
                required
                    />
                  </InputGroup>
                  <InputGroup>
              <label>Competitive Advantage *</label>
              <select
                name="competitiveAdvantage"
                value={formData.competitiveAdvantage}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Level</option>
                <option value="Weak">Weak</option>
                <option value="Moderate">Moderate</option>
                <option value="Strong">Strong</option>
                <option value="Dominant">Dominant</option>
              </select>
            </InputGroup>
            <InputGroup>
              <label>Customer Base Size *</label>
                    <input
                      type="number"
                name="customerBase"
                value={formData.customerBase}
                      onChange={handleInputChange}
                placeholder="1000"
                required
                    />
                  </InputGroup>
                </>
        );

      case 4:
        return (
                <>
                  <InputGroup>
              <label>Annual Growth Rate (%) *</label>
                    <input
                      type="number"
                name="growthRate"
                value={formData.growthRate}
                      onChange={handleInputChange}
                placeholder="50"
                step="0.1"
                required
                    />
                  </InputGroup>
                  <InputGroup>
              <label>Profit Margin (%) *</label>
                    <input
                      type="number"
                name="profitMargin"
                value={formData.profitMargin}
                      onChange={handleInputChange}
                placeholder="20"
                step="0.1"
                required
                    />
                  </InputGroup>
                  <InputGroup>
              <label>Monthly Burn Rate (USD) *</label>
                    <input
                      type="number"
                name="burnRate"
                value={formData.burnRate}
                      onChange={handleInputChange}
                placeholder="50000"
                required
                    />
                  </InputGroup>
          </>
        );

      case 5:
        return (
          <>
                  <InputGroup>
              <label>Current Funding Stage *</label>
              <select
                name="fundingStage"
                value={formData.fundingStage}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Funding Stage</option>
                {fundingStages.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </InputGroup>
            <InputGroup>
              <label>Runway (Months) *</label>
                    <input
                      type="number"
                name="runway"
                value={formData.runway}
                      onChange={handleInputChange}
                placeholder="18"
                required
                    />
                  </InputGroup>
          </>
        );

      case 6:
        return (
          <>
                  <InputGroup>
              <label>Do you have significant Intellectual Property? *</label>
              <select
                name="intellectualProperty"
                value={formData.intellectualProperty}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </InputGroup>
            <InputGroup>
              <label>Customer Acquisition Cost (USD)</label>
                    <input
                      type="number"
                name="customerAcquisitionCost"
                value={formData.customerAcquisitionCost}
                      onChange={handleInputChange}
                placeholder="100"
              />
            </InputGroup>
            <InputGroup>
              <label>Customer Lifetime Value (USD)</label>
              <input
                type="number"
                name="customerLifetimeValue"
                value={formData.customerLifetimeValue}
                onChange={handleInputChange}
                placeholder="1000"
                    />
                  </InputGroup>
                </>
        );

      case 7:
        return (
                <>
                  <InputGroup>
              <label>Monthly Recurring Revenue (USD)</label>
                    <input
                      type="number"
                name="mrr"
                value={formData.mrr}
                      onChange={handleInputChange}
                placeholder="100000"
                    />
                  </InputGroup>
                  <InputGroup>
              <label>Churn Rate (%)</label>
              <input
                type="number"
                name="churnRate"
                value={formData.churnRate}
                      onChange={handleInputChange}
                placeholder="5"
                step="0.1"
              />
            </InputGroup>
            <InputGroup>
              <label>Gross Revenue Retention (%)</label>
              <input
                type="number"
                name="grossRetention"
                value={formData.grossRetention}
                onChange={handleInputChange}
                placeholder="90"
                step="0.1"
              />
                  </InputGroup>
                </>
        );

      case 8:
        return (
                <ResultCard>
                  <ResultTitle>
                    <FiDollarSign />
              YD Valuator Results
                  </ResultTitle>
            <ResultValue>{formatCurrency(valuation?.companyValue || 0)}</ResultValue>
                      <ResultDescription>
              Estimated company valuation for {formData.companyName}
                      </ResultDescription>
            
            <ResultDetails>
              <DetailItem>
                <div className="label">Revenue Multiple</div>
                <div className="value">{valuation?.revenueMultiple}x</div>
              </DetailItem>
              <DetailItem>
                <div className="label">Market Factor</div>
                <div className="value">+{valuation?.marketFactor}%</div>
              </DetailItem>
              <DetailItem>
                <div className="label">Employee Value</div>
                <div className="value">{formatCurrency(valuation?.employeeValue || 0)}</div>
              </DetailItem>
              <DetailItem>
                <div className="label">IP Bonus</div>
                <div className="value">{formatCurrency(valuation?.ipBonus || 0)}</div>
              </DetailItem>
              <DetailItem>
                <div className="label">Competitive Bonus</div>
                <div className="value">{formatCurrency(valuation?.competitiveBonus || 0)}</div>
              </DetailItem>
              <DetailItem>
                <div className="label">Risk Factor</div>
                <div className="value">{valuation?.riskFactor}%</div>
              </DetailItem>
            </ResultDetails>

            <ContactSection>
              <ContactTitle>Get Your Professional Valuation</ContactTitle>
              <ContactDescription>
                Our expert team will contact you within 24 hours to discuss your valuation in detail and provide personalized recommendations.
              </ContactDescription>
              
              <ValuationRequestForm 
                showTitle={false}
                onSubmit={async (data) => {
                  // Handle valuation form submission with calculator data
                  const emailSubject = `Valuation Request - ${formData.companyName}`;
                  const emailBody = `
Valuation Request Details:

Company: ${formData.companyName}
Country: ${formData.country}
Industry: ${formData.industry}
Business Stage: ${formData.businessStage}

Contact Information:
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.companyName || 'Not provided'}

Valuation Results:
Estimated Value: ${formatCurrency(valuation?.companyValue || 0)}
Revenue Multiple: ${valuation?.revenueMultiple}x
Market Factor: +${valuation?.marketFactor}%
Employee Value: ${formatCurrency(valuation?.employeeValue || 0)}
IP Bonus: ${formatCurrency(valuation?.ipBonus || 0)}
Competitive Bonus: ${formatCurrency(valuation?.competitiveBonus || 0)}
Risk Factor: ${valuation?.riskFactor}%

Additional Notes:
${data.message || 'No additional notes provided'}

---
This valuation was generated using the YD Valuator tool.
Our team will contact you within 24 hours to discuss your valuation in detail.
                  `;

                  const mailtoLink = `mailto:Yashaswi.das@ydadvisory.ae?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                  window.open(mailtoLink);
                  
                  alert('Email client opened! Please send the email to complete your valuation request. Our team will contact you within 24 hours.');
                }}
              />

              <ContactInfo>
                <ContactItem>
                  <FiMail />
                  <div>
                    <strong>Email Us</strong>
                    <span>Yashaswi.das@ydadvisory.ae</span>
                      </div>
                </ContactItem>
                <ContactItem>
                  <FiPhone />
                  <div>
                    <strong>Call Us</strong>
                    <span>+971-528477349</span>
                  </div>
                </ContactItem>
              </ContactInfo>

              <ActionButtons>
                <Button onClick={() => window.print()}>
                  <FiPrinter />
                  Print Results
                </Button>
              </ActionButtons>
            </ContactSection>
                </ResultCard>
        );

      default:
        return null;
    }
  };

  return (
    <CalculatorContainer>
      <SEO
        title="YD Valuator - Business Valuation Tool | YD Advisory Dubai"
        description="Professional business valuation tool by YD Advisory. Get instant business valuations with our expert-powered YD Valuator. Trusted by 50+ clients across 9+ geographies."
        keywords="business valuation tool Dubai, company valuation UAE, YD Valuator, business worth calculator, startup valuation Dubai, SME valuation UAE, investment valuation tool"
        url="https://ydadvisory.ae/calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "YD Valuator",
          "description": "Professional business valuation tool",
          "url": "https://ydadvisory.ae/calculator",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "provider": {
            "@type": "Organization",
            "name": "YD Advisory",
            "url": "https://ydadvisory.ae"
          }
        }}
      />
      
      <CalculatorSection>
        <SectionHeader>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            YD Valuator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Professional business valuation tool powered by YD Advisory's expertise
          </motion.p>
        </SectionHeader>


        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          >
            <CalculatorCard>
            <StepIndicator>
              {steps.map((step) => (
                <Step
                  key={step.id}
                  active={currentStep === step.id}
                  completed={currentStep > step.id}
                >
                  {currentStep > step.id ? <FiCheck /> : step.id}
                </Step>
              ))}
            </StepIndicator>

            <StepContent>
              <StepTitle>{steps[currentStep - 1]?.title}</StepTitle>
              <StepDescription>{steps[currentStep - 1]?.description}</StepDescription>
              
              {renderStep()}

              <ButtonGroup>
                {currentStep > 1 && (
                  <Button onClick={prevStep}>
                    <FiArrowLeft />
                    Previous
                  </Button>
                )}
                
                {currentStep < 7 ? (
                  <Button primary onClick={nextStep}>
                    Next
                    <FiArrowRight />
                  </Button>
                ) : currentStep === 7 ? (
                  <Button primary onClick={calculateValuation}>
                    Calculate Valuation
                    <FiDollarSign />
                  </Button>
                ) : (
                  <Button primary onClick={() => setCurrentStep(1)}>
                    Start Over
                    <FiTarget />
                  </Button>
                )}
              </ButtonGroup>
            </StepContent>
            </CalculatorCard>
          </motion.div>
      </CalculatorSection>
    </CalculatorContainer>
  );
};

export default Calculator;
