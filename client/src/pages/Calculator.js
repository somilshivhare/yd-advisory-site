import React, { useState, useEffect } from 'react';
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
  FiPrinter,
  FiLinkedin
} from 'react-icons/fi';
import SEO from '../components/SEO';
import ValuationRequestForm from '../components/ValuationRequestForm';

const CalculatorContainer = styled.div`
  padding-top: 120px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%);
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-top: 100px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding-top: 80px;
  }
`;

const CalculatorSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: ${props => props.theme.spacing[4]};
  padding-right: ${props => props.theme.spacing[4]};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing[8]} 0;
    padding-left: ${props => props.theme.spacing[3]};
    padding-right: ${props => props.theme.spacing[3]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[4]} 0;
    padding-left: ${props => props.theme.spacing[2]};
    padding-right: ${props => props.theme.spacing[2]};
    min-height: calc(100vh - 120px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const CalculatorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[10]};
  align-items: start;
  
  @media (min-width: 992px) {
    grid-template-columns: 1.1fr 1fr;
  }
`;

const LeftPane = styled.div`
  color: ${props => props.theme.colors.primary[900]};
  
  h2 {
    font-family: ${props => props.theme.fonts.display};
    font-size: 2.4rem;
    font-weight: 800;
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
    line-height: 1.15;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: 2rem;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 1.75rem;
      line-height: 1.2;
    }
  }
  
  p {
    font-size: 1.125rem;
    color: ${props => props.theme.colors.gray[700]};
    line-height: 1.7;
    max-width: 640px;
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 1rem;
      line-height: 1.6;
    }
  }
`;

const BenefitsSection = styled.div`
  margin-top: ${props => props.theme.spacing[8]};
  
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[3]};
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing[3]};
  
  .check-icon {
    color: ${props => props.theme.colors.primary[600]};
    font-size: 1.25rem;
    margin-top: 2px;
    flex-shrink: 0;
  }
  
  span {
    font-size: 1rem;
    color: ${props => props.theme.colors.gray[700]};
    line-height: 1.6;
    
    strong {
      color: ${props => props.theme.colors.primary[800]};
      font-weight: 600;
    }
  }
`;

const StatRow = styled.div`
  display: none;
`;

const StatBox = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.primary[200]};
  border-radius: 12px;
  padding: ${props => props.theme.spacing[5]};
  text-align: left;
  box-shadow: 0 6px 18px rgba(20, 184, 166, 0.08);
  
  .value {
    font-size: 1.5rem;
    font-weight: 800;
    color: ${props => props.theme.colors.primary[700]};
    margin-bottom: ${props => props.theme.spacing[1]};
  }
  .label {
    font-size: 0.85rem;
    color: ${props => props.theme.colors.gray[600]};
  }
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
    max-width: 800px;
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 1rem;
      white-space: normal;
      overflow: visible;
      text-overflow: unset;
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
  min-height: auto;
  overflow: visible;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing[6]};
    margin: 0 ${props => props.theme.spacing[4]};
    max-width: calc(100% - ${props => props.theme.spacing[8]});
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[4]};
    margin: 0 ${props => props.theme.spacing[2]};
    border-radius: 16px;
    max-width: calc(100% - ${props => props.theme.spacing[4]});
    min-height: auto;
  }
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing[8]};
  gap: ${props => props.theme.spacing[4]};
  flex-wrap: wrap;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    gap: ${props => props.theme.spacing[3]};
    margin-bottom: ${props => props.theme.spacing[6]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: ${props => props.theme.spacing[2]};
    margin-bottom: ${props => props.theme.spacing[4]};
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
  font-size: 0.875rem;
  transition: all 0.3s ease;
  position: relative;
  flex-shrink: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 36px;
    height: 36px;
    font-size: 0.8rem;
  }
  
  ${props => props.active && `
    background: ${props.theme.colors.primary[600]};
    color: ${props.theme.colors.white};
    box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
  `}
  
  ${props => props.completed && `
    background: ${props.theme.colors.primary[100]};
    color: ${props.theme.colors.primary[700]};
  `}
  
  ${props => !props.active && !props.completed && `
    background: ${props.theme.colors.gray[200]};
    color: ${props.theme.colors.gray[500]};
  `}
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 100%;
    width: ${props => props.theme.spacing[4]};
    height: 2px;
      background: ${props => props.completed ? props.theme.colors.primary[300] : props.theme.colors.gray[300]};
      transform: translateY(-50%);
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
        width: ${props => props.theme.spacing[2]};
      }
  }
  
  &:last-child::after {
    display: none;
  }
`;

const StepContent = styled.div`
  min-height: 400px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-height: auto;
    padding-bottom: ${props => props.theme.spacing[4]};
  }
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[4]};
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.375rem;
    margin-bottom: ${props => props.theme.spacing[3]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.25rem;
    line-height: 1.3;
    margin-bottom: ${props => props.theme.spacing[2]};
    padding: 0 ${props => props.theme.spacing[2]};
  }
`;

const StepDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.gray[600]};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[8]};
  line-height: 1.6;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: ${props => props.theme.spacing[6]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: ${props => props.theme.spacing[4]};
    padding: 0 ${props => props.theme.spacing[2]};
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing[6]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  label {
    display: block;
    font-weight: 600;
    color: ${props => props.theme.colors.gray[700]};
    margin-bottom: ${props => props.theme.spacing[2]};
    font-size: 0.95rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.4;
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 0.9rem;
      margin-bottom: ${props => props.theme.spacing[1]};
    }
  }
  
  input, select, textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid ${props => props.theme.colors.gray[200]};
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: ${props => props.theme.colors.white};
    box-sizing: border-box;
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      padding: 12px 14px;
      font-size: 16px; /* Prevents zoom on iOS */
      min-height: 44px; /* Better touch targets */
    }
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary[500]};
      box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
    }
    
    &.error {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    &::placeholder {
      color: ${props => props.theme.colors.gray[400]};
    }
  }

  .error-text {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 4px;
    display: block;
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 0.8rem;
    }
  }
  
  select {
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 12px center;
    background-repeat: no-repeat;
    background-size: 16px;
    padding-right: 40px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  
  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};
  margin-top: ${props => props.theme.spacing[8]};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-top: ${props => props.theme.spacing[6]};
    gap: ${props => props.theme.spacing[3]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing[3]};
    margin-top: ${props => props.theme.spacing[4]};
  }
`;

const Button = styled.button`
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 140px;
  justify-content: center;
  
  ${props => props.primary ? `
    background: linear-gradient(135deg, ${props.theme.colors.primary[600]}, ${props.theme.colors.primary[700]});
      color: ${props.theme.colors.white};
      box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
  
  &:hover {
    transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(20, 184, 166, 0.4);
      }
  ` : `
    background: ${props.theme.colors.white};
    color: ${props.theme.colors.gray[600]};
    border: 2px solid ${props.theme.colors.gray[300]};
    
    &:hover {
      background: ${props.theme.colors.gray[50]};
      border-color: ${props.theme.colors.gray[400]};
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    min-height: 48px;
    font-size: 0.95rem;
    padding: 12px 20px;
  }
`;

const ResultsSection = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[8]} 0;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[6]} 0;
  }
  
  h2 {
    font-size: 2.5rem;
  font-weight: 800;
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 2rem;
      line-height: 1.2;
    }
  }
  
  .valuation-amount {
    font-size: 4rem;
    font-weight: 900;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  margin-bottom: ${props => props.theme.spacing[6]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 3rem;
      line-height: 1.1;
    }
  }
  
  p {
    font-size: 1.125rem;
    color: ${props => props.theme.colors.gray[600]};
    margin-bottom: ${props => props.theme.spacing[8]};
    line-height: 1.6;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 1rem;
      line-height: 1.5;
      margin-bottom: ${props => props.theme.spacing[6]};
    }
  }
`;

const ContactSection = styled.div`
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


// Valuation Report Component
const ValuationReportContainer = styled.div`
  padding: 0;
  margin: 0;
`;

const ReportHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const ReportTitle = styled.h2`
  color: #0d9488;
  font-size: 2.5rem;
  margin-bottom: 12px;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  letter-spacing: -0.025em;
`;

const ReportSubtitle = styled.p`
  color: #0d9488;
  font-size: 1.125rem;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-weight: 500;
`;

const ValuationDisplay = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const ValuationLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #0d9488;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

const ValuationRange = styled.div`
  display: inline-block;
  padding: 20px 40px;
  border-radius: 50px;
  background: #f0fdfa;
  border: 2px solid #5eead4;
`;

const ValuationAmount = styled.div`
  color: #374151;
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: -0.025em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

const ValuationCurrency = styled.span`
  color: #0d9488;
  font-size: 1.5rem;
  margin-right: 8px;
`;

const SWOTGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 40px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const SWOTCard = styled.div`
  padding: 0;
  margin: 0;
`;

const SWOTTitle = styled.h3`
  color: ${props => props.color || '#0d9488'};
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

const SWOTList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SWOTItem = styled.li`
  color: #0d9488;
  font-size: 1rem;
  margin-bottom: 12px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  line-height: 1.6;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-weight: 500;
`;

const MarketResearch = styled.div`
  margin-bottom: 40px;
`;

const MarketTitle = styled.h3`
  color: #0d9488;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

const MarketText = styled.p`
  color: #0d9488;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-weight: 500;
`;

// Rate Us Section
const RateUsSection = styled.div`
  background: ${props => props.theme.colors.primary[50]};
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  text-align: center;
  border: 1px solid ${props => props.theme.colors.primary[200]};
`;

const RateUsTitle = styled.h3`
  color: #0d9488;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

const RateUsSubtitle = styled.p`
  color: #0d9488;
  font-size: 1rem;
  margin-bottom: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-weight: 500;
`;

const StarRating = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const Star = styled.span`
  font-size: 2rem;
  color: ${props => props.filled ? props.theme.colors.accent.gold : props.theme.colors.gray[300]};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.accent.gold};
  }
`;

const SubmitRatingButton = styled.button`
  background: ${props => props.theme.colors.primary[600]};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: ${props => props.theme.fonts.body};

  &:hover {
    background: ${props => props.theme.colors.primary[700]};
  }
`;

const ContactInfoSection = styled.div`
  background: ${props => props.theme.colors.primary[50]};
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  border: 1px solid ${props => props.theme.colors.primary[200]};
  margin-bottom: 32px;
`;

const ContactText = styled.p`
  color: #0d9488;
  font-size: 1rem;
  margin: 0 0 8px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-weight: 500;
`;

const ContactSubtext = styled.p`
  color: #0d9488;
  font-size: 0.875rem;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-weight: 500;
`;

// Loading Animation Components
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  text-align: center;
  min-height: 400px;
  
  @keyframes pulse {
    0%, 100% { 
      transform: scale(1);
      box-shadow: 0 8px 24px rgba(20, 184, 166, 0.2);
    }
    50% { 
      transform: scale(1.02);
      box-shadow: 0 12px 32px rgba(20, 184, 166, 0.3);
    }
  }
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #0d9488;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 24px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.h3`
  color: #0d9488;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

const LoadingSubtext = styled.p`
  color: #0d9488;
  font-size: 1rem;
  margin-bottom: 32px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-weight: 500;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 24px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(90deg, #0d9488, #5eead4);
    border-radius: 4px;
    width: ${props => props.progress}%;
    transition: width 0.3s ease;
  }
`;

const LoadingStage = styled.div`
  color: #0d9488;
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  animation: fadeIn 0.5s ease-in-out, pulse 2s ease-in-out infinite;

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;

const ProgressText = styled.div`
  color: #0d9488;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
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
    funding: '',
    growth: '',
    market: '',
    competition: '',
    team: '',
    technology: '',
    intellectualProperty: '',
    customerBase: '',
    partnerships: '',
    financials: '',
    risks: '',
    opportunities: '',
    exitStrategy: '',
    marketSize: '',
    competitiveAdvantage: '',
    scalability: '',
    profitability: '',
    management: '',
    operations: '',
    legal: '',
    regulatory: '',
    economic: '',
    technology: '',
    market: '',
    financial: '',
    strategic: '',
    operational: '',
    compliance: '',
    reputation: '',
    liquidity: '',
    valuation: '',
    email: '',
    phone: '',
    fullName: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [valuationRange, setValuationRange] = useState({ min: 0, max: 0 });
  const [rating, setRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('');

  // Load state from localStorage on component mount
  useEffect(() => {
    const savedFormData = localStorage.getItem('calculatorFormData');
    const savedCurrentStep = localStorage.getItem('calculatorCurrentStep');
    const savedShowReport = localStorage.getItem('calculatorShowReport');
    const savedValuationRange = localStorage.getItem('calculatorValuationRange');
    const savedRating = localStorage.getItem('calculatorRating');
    const savedRatingSubmitted = localStorage.getItem('calculatorRatingSubmitted');
    
    // Check if we should show the report (from URL hash or localStorage)
    const shouldShowReport = window.location.hash === '#report' || savedShowReport === 'true';
    
    if (savedFormData) {
      try {
        setFormData(JSON.parse(savedFormData));
      } catch (e) {
        console.error('Error parsing saved form data:', e);
      }
    }
    
    if (savedCurrentStep) {
      setCurrentStep(parseInt(savedCurrentStep));
    }
    
    if (shouldShowReport) {
      setShowReport(true);
      setCurrentStep(9); // Go directly to report step
    }
    
    if (savedValuationRange) {
      try {
        setValuationRange(JSON.parse(savedValuationRange));
      } catch (e) {
        console.error('Error parsing saved valuation range:', e);
      }
    }
    
    if (savedRating) {
      setRating(parseInt(savedRating));
    }
    
    if (savedRatingSubmitted) {
      setRatingSubmitted(savedRatingSubmitted === 'true');
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('calculatorFormData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('calculatorCurrentStep', currentStep.toString());
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem('calculatorShowReport', showReport.toString());
    if (showReport) {
      window.location.hash = '#report';
    }
  }, [showReport]);

  useEffect(() => {
    localStorage.setItem('calculatorValuationRange', JSON.stringify(valuationRange));
  }, [valuationRange]);

  useEffect(() => {
    localStorage.setItem('calculatorRating', rating.toString());
  }, [rating]);

  useEffect(() => {
    localStorage.setItem('calculatorRatingSubmitted', ratingSubmitted.toString());
  }, [ratingSubmitted]);

  const steps = [
    { title: 'Company Information', description: 'Tell us about your company' },
    { title: 'Business Model', description: 'Describe your business model' },
    { title: 'Financial Information', description: 'Share your financial data' },
    { title: 'Market Analysis', description: 'Provide market insights' },
    { title: 'Team & Operations', description: 'Tell us about your team' },
    { title: 'Risk Assessment', description: 'Identify potential risks' },
    { title: 'Growth Strategy', description: 'Share your growth plans' },
    { title: 'Contact Information', description: 'Get your valuation report' }
  ];

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.industry) newErrors.industry = 'Industry is required';
        if (!formData.businessStage) newErrors.businessStage = 'Business stage is required';
        break;
      case 2:
        if (!formData.revenue) newErrors.revenue = 'Revenue information is required';
        if (!formData.employees) newErrors.employees = 'Employee count is required';
        if (!formData.funding) newErrors.funding = 'Funding information is required';
        break;
      case 3:
        if (!formData.growth) newErrors.growth = 'Growth rate is required';
        if (!formData.market) newErrors.market = 'Market size is required';
        if (!formData.competition) newErrors.competition = 'Competition level is required';
        break;
      case 4:
        if (!formData.team) newErrors.team = 'Team experience is required';
        if (!formData.technology) newErrors.technology = 'Technology stack is required';
        if (!formData.intellectualProperty) newErrors.intellectualProperty = 'IP status is required';
        break;
      case 5:
        if (!formData.customerBase) newErrors.customerBase = 'Customer base is required';
        if (!formData.partnerships) newErrors.partnerships = 'Partnership status is required';
        if (!formData.financials) newErrors.financials = 'Financial health is required';
        break;
      case 6:
        if (!formData.risks) newErrors.risks = 'Risk assessment is required';
        if (!formData.opportunities) newErrors.opportunities = 'Growth opportunities is required';
        if (!formData.exitStrategy) newErrors.exitStrategy = 'Exit strategy is required';
        break;
      case 7:
        if (!formData.marketSize) newErrors.marketSize = 'Market size is required';
        if (!formData.competitiveAdvantage) newErrors.competitiveAdvantage = 'Competitive advantage is required';
        if (!formData.scalability) newErrors.scalability = 'Scalability is required';
        break;
      case 8:
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 8) {
        setCurrentStep(currentStep + 1);
      } else if (currentStep === 8) {
        // When on contact form, go directly to loading
        setCurrentStep(8.5);
        setIsCalculating(true);
        setShowReport(false);
        // Start the loading process after a short delay to allow UI to update
        setTimeout(() => {
          startLoadingProcess();
        }, 100);
      }
    }
  };

  const startLoadingProcess = async () => {
    // Set initial loading stage immediately
    setLoadingStage("🚀 Starting analysis...");
    setLoadingProgress(0);
    
    // First calculate the valuation
    performValuationCalculation();
    
    // Animated loading stages for 5 seconds total
    const stages = [
      { text: "🔍 Analyzing your business model...", duration: 1000 },
      { text: "📊 Evaluating market conditions...", duration: 1000 },
      { text: "💰 Assessing financial metrics...", duration: 1000 },
      { text: "⚠️ Calculating risk factors...", duration: 1000 },
      { text: "🎯 Finalizing valuation range...", duration: 1000 }
    ];
    
    let currentStage = 0;
    let totalProgress = 0;
    
    const updateStage = () => {
      if (currentStage < stages.length) {
        setLoadingStage(stages[currentStage].text);
        
        // Calculate progress based on time elapsed
        let totalTime = 0;
        for (let i = 0; i <= currentStage; i++) {
          totalTime += stages[i].duration;
        }
        const progress = Math.min((totalTime / 5000) * 100, 100);
        setLoadingProgress(progress);
        
        const currentDuration = stages[currentStage].duration;
        setTimeout(() => {
          currentStage++;
          updateStage();
        }, currentDuration);
      }
    };
    
    // Start the animated stages immediately with a small delay
    setTimeout(() => {
      updateStage();
    }, 100);
    
    // Start smooth progress animation immediately
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / 5000) * 100, 100);
      setLoadingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(progressInterval);
      }
    }, 100);
    
    // Wait for 5 seconds to show loading animation
    setTimeout(async () => {
      try {
        // Clear the progress interval
        clearInterval(progressInterval);
        
        // Now submit the form
        await submitToFormspree();
        // After successful submission, show the report
        setIsCalculating(false);
        setShowReport(true);
        setCurrentStep(9);
      } catch (error) {
        console.error('Error in loading process:', error);
        // Clear the progress interval
        clearInterval(progressInterval);
        // Even if submission fails, show the report
        setIsCalculating(false);
        setShowReport(true);
        setCurrentStep(9);
      }
    }, 5000);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Clear errors when going back
      setErrors({});
    }
  };

  const resetCalculator = () => {
    // Clear all state
    setCurrentStep(1);
    setFormData({
      companyName: '',
      country: '',
      industry: '',
      businessStage: '',
      revenue: '',
      employees: '',
      funding: '',
      growth: '',
      market: '',
      competition: '',
      team: '',
      technology: '',
      intellectualProperty: '',
      customerBase: '',
      partnerships: '',
      financials: '',
      risks: '',
      opportunities: '',
      exitStrategy: '',
      marketSize: '',
      competitiveAdvantage: '',
      scalability: '',
      profitability: '',
      management: '',
      operations: '',
      legal: '',
      regulatory: '',
      economic: '',
      technology: '',
      market: '',
      financial: '',
      strategic: '',
      operational: '',
      compliance: '',
      reputation: '',
      liquidity: '',
      valuation: '',
      email: '',
      phone: '',
      fullName: ''
    });
    setErrors({});
    setIsSubmitting(false);
    setIsCalculating(false);
    setShowReport(false);
    setValuationRange({ min: 0, max: 0 });
    setRating(0);
    setRatingSubmitted(false);
    
    // Clear localStorage
    localStorage.removeItem('calculatorFormData');
    localStorage.removeItem('calculatorCurrentStep');
    localStorage.removeItem('calculatorShowReport');
    localStorage.removeItem('calculatorValuationRange');
    localStorage.removeItem('calculatorRating');
    localStorage.removeItem('calculatorRatingSubmitted');
    
    // Clear URL hash
    window.location.hash = '';
  };

  const calculateValuation = () => {
    // Go directly to contact form
    setCurrentStep(8);
  };

  const performValuationCalculation = () => {
    let baseValuation = 0;
    let multiplier = 1;
    
    // Base valuation by business stage
    switch (formData.businessStage) {
      case 'pre-seed':
        baseValuation = 25000;
        break;
      case 'seed':
        baseValuation = 100000;
        break;
      case 'series-a':
        baseValuation = 500000;
        break;
      case 'series-b':
        baseValuation = 2000000;
        break;
      case 'growth':
        baseValuation = 5000000;
        break;
      default:
        baseValuation = 50000;
    }
    
    // Revenue multiplier
    if (formData.revenue) {
      const revenue = parseFloat(formData.revenue);
      if (revenue > 0) {
        baseValuation += revenue * 3; // 3x revenue multiplier
      }
    }
    
    // Employee value
    if (formData.employees) {
      const employeeCount = parseInt(formData.employees.split('-')[0]) || 1;
      baseValuation += employeeCount * 75000; // $75k per employee
    }
    
    // Funding raised
    if (formData.funding) {
      const funding = parseFloat(formData.funding);
      if (funding > 0) {
        baseValuation += funding * 0.5; // 50% of funding adds to valuation
      }
    }
    
    // Growth rate multiplier
    switch (formData.growth) {
      case '0-10':
        multiplier *= 1.0;
        break;
      case '10-25':
        multiplier *= 1.2;
        break;
      case '25-50':
        multiplier *= 1.5;
        break;
      case '50-100':
        multiplier *= 2.0;
        break;
      case '100+':
        multiplier *= 3.0;
        break;
    }
    
    // Market size multiplier
    switch (formData.market) {
      case 'small':
        multiplier *= 1.0;
        break;
      case 'medium':
        multiplier *= 1.3;
        break;
      case 'large':
        multiplier *= 1.8;
        break;
      case 'huge':
        multiplier *= 2.5;
        break;
    }
    
    // Competition level (inverse)
    switch (formData.competition) {
      case 'low':
        multiplier *= 1.5;
        break;
      case 'medium':
        multiplier *= 1.2;
        break;
      case 'high':
        multiplier *= 1.0;
        break;
      case 'very-high':
        multiplier *= 0.8;
        break;
    }
    
    // Team experience
    switch (formData.team) {
      case 'beginner':
        multiplier *= 0.8;
        break;
      case 'intermediate':
        multiplier *= 1.0;
        break;
      case 'experienced':
        multiplier *= 1.3;
        break;
      case 'expert':
        multiplier *= 1.6;
        break;
    }
    
    // Technology stack
    switch (formData.technology) {
      case 'traditional':
        multiplier *= 0.9;
        break;
      case 'modern':
        multiplier *= 1.1;
        break;
      case 'cutting-edge':
        multiplier *= 1.4;
        break;
      case 'ai-ml':
        multiplier *= 1.8;
        break;
    }
    
    // Intellectual Property
    switch (formData.intellectualProperty) {
      case 'none':
        multiplier *= 0.9;
        break;
      case 'pending':
        multiplier *= 1.1;
        break;
      case 'patents':
        multiplier *= 1.5;
        break;
      case 'trademarks':
        multiplier *= 1.2;
        break;
      case 'copyrights':
        multiplier *= 1.1;
        break;
    }
    
    // Customer base
    switch (formData.customerBase) {
      case 'none':
        multiplier *= 0.7;
        break;
      case 'small':
        multiplier *= 1.0;
        break;
      case 'medium':
        multiplier *= 1.3;
        break;
      case 'large':
        multiplier *= 1.6;
        break;
    }
    
    // Financial health
    switch (formData.financials) {
      case 'poor':
        multiplier *= 0.6;
        break;
      case 'fair':
        multiplier *= 0.8;
        break;
      case 'good':
        multiplier *= 1.2;
        break;
      case 'excellent':
        multiplier *= 1.5;
        break;
    }
    
    // Risk assessment (inverse)
    switch (formData.risks) {
      case 'low':
        multiplier *= 1.4;
        break;
      case 'medium':
        multiplier *= 1.1;
        break;
      case 'high':
        multiplier *= 0.9;
        break;
      case 'very-high':
        multiplier *= 0.7;
        break;
    }
    
    // Growth opportunities
    switch (formData.opportunities) {
      case 'limited':
        multiplier *= 0.8;
        break;
      case 'moderate':
        multiplier *= 1.0;
        break;
      case 'good':
        multiplier *= 1.3;
        break;
      case 'excellent':
        multiplier *= 1.6;
        break;
    }
    
    // Scalability
    switch (formData.scalability) {
      case 'low':
        multiplier *= 0.8;
        break;
      case 'medium':
        multiplier *= 1.0;
        break;
      case 'high':
        multiplier *= 1.4;
        break;
      case 'very-high':
        multiplier *= 1.8;
        break;
    }
    
    // Apply all multipliers and calculate range
    const baseValuationFinal = Math.round(baseValuation * multiplier);
    
    // Calculate valuation range (±15% variance)
    const variance = 0.15;
    const minValuation = Math.round(baseValuationFinal * (1 - variance));
    const maxValuation = Math.round(baseValuationFinal * (1 + variance));
    
    setValuationRange({ min: minValuation, max: maxValuation });
    
    setFormData(prev => ({
      ...prev,
      valuation: `${minValuation.toLocaleString()} - ${maxValuation.toLocaleString()}`
    }));

    setCurrentStep(8);
  };

  const handleRatingSubmit = () => {
    setRatingSubmitted(true);
    // Here you could send the rating to your backend
    console.log('Rating submitted:', rating);
  };

  const submitToFormspree = async () => {
    if (!validateStep(8)) return;
    
    setIsSubmitting(true);
    
    try {
      // Create a comprehensive message with all form data
      const message = `
BUSINESS VALUATION CALCULATOR SUBMISSION

COMPANY INFORMATION:
• Company Name: ${formData.companyName}
• Country: ${formData.country}
• Industry: ${formData.industry}
• Business Stage: ${formData.businessStage}

FINANCIAL INFORMATION:
• Annual Revenue: $${formData.revenue}
• Number of Employees: ${formData.employees}
• Funding Raised: $${formData.funding}

MARKET ANALYSIS:
• Growth Rate: ${formData.growth}
• Market Size: ${formData.market}
• Competition Level: ${formData.competition}

TEAM & OPERATIONS:
• Team Experience: ${formData.team}
• Technology Stack: ${formData.technology}
• Intellectual Property: ${formData.intellectualProperty}

BUSINESS METRICS:
• Customer Base: ${formData.customerBase}
• Strategic Partnerships: ${formData.partnerships}
• Financial Health: ${formData.financials}

RISK & OPPORTUNITIES:
• Market Risks: ${formData.risks}
• Growth Opportunities: ${formData.opportunities}
• Exit Strategy: ${formData.exitStrategy}

GROWTH STRATEGY:
• Market Size: ${formData.marketSize}
• Competitive Advantage: ${formData.competitiveAdvantage}
• Scalability: ${formData.scalability}

CONTACT INFORMATION:
• Email: ${formData.email}

CALCULATED VALUATION: $${formData.valuation}

Please contact me to discuss this valuation and next steps.

Best regards,
Valuation Calculator User
      `.trim();

      // Create form data
      const formDataToSend = new FormData();
      formDataToSend.append('_subject', `Business Valuation Request - ${formData.companyName}`);
      formDataToSend.append('_replyto', formData.email);
      formDataToSend.append('_cc', 'Yashaswi.das@ydadvisory.ae');
      formDataToSend.append('message', message);
      formDataToSend.append('company_name', formData.companyName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('valuation', formData.valuation);
      formDataToSend.append('industry', formData.industry);
      formDataToSend.append('revenue', formData.revenue);
      formDataToSend.append('employees', formData.employees);
      
      // Try the submission
      const response = await fetch('https://formspree.io/f/xpwgqkqv', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Success - the loading process will handle showing the report
        console.log('Form submitted successfully');
      } else {
        // Log the error for debugging
        console.error('Formspree error:', result);
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Try alternative submission method
      try {
        await submitViaEmail();
      } catch (emailError) {
        console.error('Email submission also failed:', emailError);
        
        // Show a more user-friendly error message
        const errorMessage = error.message.includes('fetch') 
          ? 'Network error. Please check your internet connection and try again.'
          : 'There was an error submitting your form. Please try again or contact us directly.';
        
        alert(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
      // Don't set setIsCalculating(false) here - let the timeout handle it
    }
  };

  const submitViaEmail = async () => {
    // Alternative method: Create a mailto link with form data
    const subject = `Business Valuation Request - ${formData.companyName}`;
    const body = `
Business Valuation Calculator Results

Company Information:
- Company Name: ${formData.companyName}
- Country: ${formData.country}
- Industry: ${formData.industry}
- Business Stage: ${formData.businessStage}

Financial Information:
- Revenue: ${formData.revenue}
- Employees: ${formData.employees}
- Funding Raised: ${formData.funding}

Market Analysis:
- Growth Rate: ${formData.growth}
- Market Size: ${formData.market}
- Competition Level: ${formData.competition}

Team & Operations:
- Team Experience: ${formData.team}
- Technology Stack: ${formData.technology}
- Intellectual Property: ${formData.intellectualProperty}

Business Metrics:
- Customer Base: ${formData.customerBase}
- Partnerships: ${formData.partnerships}
- Financial Health: ${formData.financials}

Risk & Opportunities:
- Market Risks: ${formData.risks}
- Growth Opportunities: ${formData.opportunities}
- Exit Strategy: ${formData.exitStrategy}

Growth Strategy:
- Market Size: ${formData.marketSize}
- Competitive Advantage: ${formData.competitiveAdvantage}
- Scalability: ${formData.scalability}

Contact Information:
- Email: ${formData.email}

CALCULATED VALUATION: $${formData.valuation}

Please contact me to discuss this valuation and next steps.

Best regards,
Valuation Calculator User
    `.trim();

    const mailtoLink = `mailto:Yashaswi.das@ydadvisory.ae?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Move to success step
    setCurrentStep(9);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
  return (
            <div>
              <FormGroup>
              <label>What is the name of your company or idea?*</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Enter your company name"
                className={errors.companyName ? 'error' : ''}
              />
              {errors.companyName && <span className="error-text">{errors.companyName}</span>}
            </FormGroup>
            <FormGroup>
              <label>What country are you based in? *</label>
              <select
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className={errors.country ? 'error' : ''}
              >
                <option value="">Select Country</option>
                <option value="uae">United Arab Emirates</option>
                <option value="usa">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
                <option value="singapore">Singapore</option>
                <option value="other">Other</option>
              </select>
              {errors.country && <span className="error-text">{errors.country}</span>}
            </FormGroup>
            <FormGroup>
              <label>What industry does your company belong to? *</label>
              <select
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className={errors.industry ? 'error' : ''}
              >
                <option value="">Select Industry</option>
                <option value="consumer-goods">Consumer Goods</option>
                <option value="retail">Retail</option>
                <option value="e-commerce">E-commerce</option>
                <option value="saas">SaaS</option>
                <option value="marketplace">Marketplace</option>
                <option value="fintech-non-regulated">Fintech (non-regulated)</option>
                <option value="healthcare-providers">Healthcare Providers (clinics/hospitals)</option>
                <option value="pharma-distribution">Pharma Distribution</option>
                <option value="education-services">Education Services</option>
                <option value="logistics-3pl">Logistics (3PL/last-mile)</option>
                <option value="manufacturing-light">Manufacturing (light)</option>
                <option value="construction-contracting">Construction Contracting</option>
                <option value="professional-services">Professional Services (advisory/accounting)</option>
                <option value="it-services">IT Services (systems/integration)</option>
                <option value="hospitality">Hospitality (hotels/F&B)</option>
                <option value="energy-renewables">Energy Renewables</option>
                <option value="other">Other</option>
              </select>
              {errors.industry && <span className="error-text">{errors.industry}</span>}
            </FormGroup>
            <FormGroup>
              <label>Business Stage *</label>
              <select
                value={formData.businessStage}
                onChange={(e) => handleInputChange('businessStage', e.target.value)}
                className={errors.businessStage ? 'error' : ''}
              >
                <option value="">Select Stage</option>
                <option value="pre-seed">Pre-Seed</option>
                <option value="seed">Seed</option>
                <option value="series-a">Series A</option>
                <option value="series-b">Series B</option>
                <option value="growth">Growth</option>
              </select>
              {errors.businessStage && <span className="error-text">{errors.businessStage}</span>}
            </FormGroup>
            </div>
        );

      case 2:
        return (
            <div>
              <FormGroup>
                <label>What revenue did you have last month? (USD)</label>
                    <input
                      type="number"
                value={formData.revenue}
                onChange={(e) => handleInputChange('revenue', e.target.value)}
                placeholder="Enter annual revenue"
              />
            </FormGroup>
            <FormGroup>
              <label>How many employees do you have?</label>
              <select
                value={formData.employees}
                onChange={(e) => handleInputChange('employees', e.target.value)}
              >
                <option value="">Select Range</option>
                <option value="1-5">1-5</option>
                <option value="6-20">6-20</option>
                <option value="21-50">21-50</option>
                <option value="51-100">51-100</option>
                <option value="100+">100+</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>How much funding have you raised?</label>
              <input
                type="number"
                value={formData.funding}
                onChange={(e) => handleInputChange('funding', e.target.value)}
                placeholder="Enter total funding raised"
              />
            </FormGroup>
            </div>
        );

      case 3:
        return (
            <div>
            <FormGroup>
              <label>Monthly Growth rate (revenue or users):</label>
              <select
                value={formData.growth}
                onChange={(e) => handleInputChange('growth', e.target.value)}
              >
                <option value="">Select Growth Rate</option>
                <option value="0-10">0-10%</option>
                <option value="10-25">10-25%</option>
                <option value="25-50">25-50%</option>
                <option value="50-100">50-100%</option>
                <option value="100+">100%+</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>What is the size of the market you are operating in?</label>
              <select
                value={formData.market}
                onChange={(e) => handleInputChange('market', e.target.value)}
              >
                <option value="">Select Market Size</option>
                <option value="small">Small (&lt; $1B)</option>
                <option value="medium">Medium ($1B - $10B)</option>
                <option value="large">Large ($10B - $100B)</option>
                <option value="huge">Huge (&gt; $100B)</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>How competitive is the market you are operating in?</label>
              <select
                value={formData.competition}
                onChange={(e) => handleInputChange('competition', e.target.value)}
              >
                <option value="">Select Competition Level</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="very-high">Very High</option>
              </select>
            </FormGroup>
            </div>
        );

      case 4:
        return (
            <div>
            <FormGroup>
              <label>What is the experience of the team?</label>
              <select
                value={formData.team}
                onChange={(e) => handleInputChange('team', e.target.value)}
              >
                <option value="">Select Team Experience</option>
                <option value="beginner">Beginner (0-2 years)</option>
                <option value="intermediate">Intermediate (2-5 years)</option>
                <option value="experienced">Experienced (5-10 years)</option>
                <option value="expert">Expert (10+ years)</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>What is the technology stack you are using?</label>
              <select
                value={formData.technology}
                onChange={(e) => handleInputChange('technology', e.target.value)}
              >
                <option value="">Select Technology</option>
                <option value="traditional">Traditional</option>
                <option value="modern">Modern</option>
                <option value="cutting-edge">Cutting-edge</option>
                <option value="ai-ml">AI/ML</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Do you have any intellectual property?</label>
              <select
                value={formData.intellectualProperty}
                onChange={(e) => handleInputChange('intellectualProperty', e.target.value)}
              >
                <option value="">Select IP Status</option>
                <option value="none">None</option>
                <option value="pending">Pending</option>
                <option value="patents">Patents</option>
                <option value="trademarks">Trademarks</option>
                <option value="copyrights">Copyrights</option>
              </select>
            </FormGroup>
            </div>
        );

      case 5:
        return (
            <div>
            <FormGroup>
              <label>How many customers do you have?</label>
              <select
                value={formData.customerBase}
                onChange={(e) => handleInputChange('customerBase', e.target.value)}
              >
                <option value="">Select Customer Base</option>
                <option value="none">None</option>
                <option value="small">Small (1-100)</option>
                <option value="medium">Medium (100-1000)</option>
                <option value="large">Large (1000+)</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>How many partnerships do you have?</label>
              <select
                value={formData.partnerships}
                onChange={(e) => handleInputChange('partnerships', e.target.value)}
              >
                <option value="">Select Partnership Status</option>
                <option value="none">None</option>
                <option value="few">Few (1-3)</option>
                <option value="some">Some (3-10)</option>
                <option value="many">Many (10+)</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>How is the financial health of your company?</label>
              <select
                value={formData.financials}
                onChange={(e) => handleInputChange('financials', e.target.value)}
              >
                <option value="">Select Financial Health</option>
                <option value="poor">Poor</option>
                <option value="fair">Fair</option>
                <option value="good">Good</option>
                <option value="excellent">Excellent</option>
              </select>
            </FormGroup>
            </div>
        );

      case 6:
        return (
            <div>
            <FormGroup>
              <label>What are the market risks you are facing?</label>
              <select
                value={formData.risks}
                onChange={(e) => handleInputChange('risks', e.target.value)}
              >
                <option value="">Select Risk Level</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="very-high">Very High</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>What are the growth opportunities you are facing?</label>
              <select
                value={formData.opportunities}
                onChange={(e) => handleInputChange('opportunities', e.target.value)}
              >
                <option value="">Select Opportunity Level</option>
                <option value="limited">Limited</option>
                <option value="moderate">Moderate</option>
                <option value="good">Good</option>
                <option value="excellent">Excellent</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>What is the exit strategy you are planning?</label>
              <select
                value={formData.exitStrategy}
                onChange={(e) => handleInputChange('exitStrategy', e.target.value)}
              >
                <option value="">Select Exit Strategy</option>
                <option value="ipo">IPO</option>
                <option value="acquisition">Acquisition</option>
                <option value="merger">Merger</option>
                <option value="private-equity">Private Equity</option>
                <option value="none">None</option>
              </select>
            </FormGroup>
            </div>
        );

      case 7:
        return (
            <div>
            <FormGroup>
              <label>What is the size of the market you are operating in?</label>
              <select
                value={formData.marketSize}
                onChange={(e) => handleInputChange('marketSize', e.target.value)}
              >
                <option value="">Select Market Size</option>
                <option value="small">Small (&lt; $1B)</option>
                <option value="medium">Medium ($1B - $10B)</option>
                <option value="large">Large ($10B - $100B)</option>
                <option value="huge">Huge (&gt; $100B)</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>What is the competitive advantage you have?</label>
              <select
                value={formData.competitiveAdvantage}
                onChange={(e) => handleInputChange('competitiveAdvantage', e.target.value)}
              >
                <option value="">Select Competitive Advantage</option>
                <option value="none">None</option>
                <option value="weak">Weak</option>
                <option value="moderate">Moderate</option>
                <option value="strong">Strong</option>
                <option value="very-strong">Very Strong</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>How scalable is your business?</label>
              <select
                value={formData.scalability}
                onChange={(e) => handleInputChange('scalability', e.target.value)}
              >
                <option value="">Select Scalability</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="very-high">Very High</option>
              </select>
            </FormGroup>
            </div>
          );
        
        case 8:
          return (
            <div>
            <FormGroup>
              <label>Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </FormGroup>
            <div style={{ 
              background: '#f0f9ff', 
              border: '1px solid #0ea5e9', 
              borderRadius: '8px', 
              padding: '16px', 
              marginBottom: '24px' 
            }}>
              <p style={{ 
                color: '#0369a1', 
                fontSize: '0.9rem', 
                margin: 0,
                textAlign: 'center'
              }}>
                📧 We'll send your detailed valuation report to your email address
              </p>
            </div>
            </div>
          );

        case 8.5: // Loading state
          return (
            <LoadingContainer>
              <LoadingSpinner />
              <LoadingText>🚀 Calculating Your Valuation</LoadingText>
              <LoadingSubtext>Please wait while we analyze your business data... This may take up to 20 seconds.</LoadingSubtext>
              
              <ProgressBar progress={loadingProgress} />
              
              <LoadingStage>
                {loadingStage || "🚀 Starting analysis..."}
              </LoadingStage>
              
              <ProgressText>
                {Math.round(loadingProgress)}% Complete
              </ProgressText>
              
              <div style={{ 
                marginTop: '24px',
                padding: '24px',
                background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
                borderRadius: '16px',
                border: '3px solid #5eead4',
                boxShadow: '0 8px 24px rgba(20, 184, 166, 0.2)',
                animation: 'pulse 2s ease-in-out infinite'
              }}>
                <div style={{ 
                  color: '#0d9488', 
                  fontSize: '1.2rem', 
                  fontWeight: '800', 
                  marginBottom: '16px',
                  textAlign: 'center',
                  textShadow: '0 2px 4px rgba(20, 184, 166, 0.3)'
                }}>
                  🚀 Analysis in Progress
                </div>
                <div style={{ 
                  color: '#0d9488', 
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  fontWeight: '700',
                  marginBottom: '12px',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '8px',
                  border: '2px solid #5eead4'
                }}>
                  {loadingStage || "🚀 Starting analysis..."}
                </div>
                <div style={{ 
                  color: '#0d9488', 
                  fontSize: '1rem',
                  textAlign: 'center',
                  fontWeight: '600',
                  marginTop: '8px'
                }}>
                  {Math.round(loadingProgress)}% Complete
                </div>
              </div>
              
              <div style={{ 
                marginTop: '20px', 
                padding: '16px', 
                background: '#f0fdfa', 
                borderRadius: '8px', 
                border: '1px solid #5eead4' 
              }}>
                <div style={{ 
                  color: '#0d9488', 
                  fontSize: '0.9rem', 
                  fontWeight: '600', 
                  marginBottom: '8px' 
                }}>
                  Analysis Progress:
                </div>
                <div style={{ 
                  color: '#0d9488', 
                  fontSize: '0.8rem' 
                }}>
                  {loadingStage || "Preparing analysis..."} ({Math.round(loadingProgress)}%)
                </div>
              </div>
              
              <div style={{ 
                marginTop: '16px', 
                padding: '16px', 
                background: '#f8fafc', 
                borderRadius: '8px', 
                border: '1px solid #e2e8f0' 
              }}>
                <div style={{ 
                  color: '#0d9488', 
                  fontSize: '0.9rem', 
                  fontWeight: '600', 
                  marginBottom: '12px' 
                }}>
                  Expected Timeline:
                </div>
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: '#64748b',
                  lineHeight: '1.5'
                }}>
                  <div>0-3s: Analyzing your business model... (0-15%)</div>
                  <div>3-6s: Evaluating market conditions... (15-30%)</div>
                  <div>6-9s: Assessing financial metrics... (30-45%)</div>
                  <div>9-12s: Calculating risk factors... (45-60%)</div>
                  <div>12-15s: Determining growth potential... (60-75%)</div>
                  <div>15-20s: Finalizing valuation range... (75-100%)</div>
                </div>
              </div>
            </LoadingContainer>
          );
        
        case 9:
        return (
          <ValuationReportContainer>
            <ReportHeader>
              <ReportTitle>Business Valuation Report</ReportTitle>
              <ReportSubtitle>Comprehensive analysis for {formData.companyName}</ReportSubtitle>
            </ReportHeader>

            <ValuationDisplay>
              <ValuationLabel>
                🏆 Estimated Value
              </ValuationLabel>
              <ValuationRange>
                <ValuationAmount>
                  <ValuationCurrency>$</ValuationCurrency>
                  {valuationRange.min.toLocaleString()} – {valuationRange.max.toLocaleString()}
                </ValuationAmount>
              </ValuationRange>
            </ValuationDisplay>

            <SWOTGrid>
              <SWOTCard>
                <SWOTTitle color="#10b981">
                  ✅ Strengths
                </SWOTTitle>
                <SWOTList>
                  <SWOTItem>
                    <span>✓</span>
                    <span>Strong business model with {formData.businessStage?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} stage positioning</span>
                  </SWOTItem>
                  <SWOTItem>
                    <span>✓</span>
                    <span>Revenue of ${formData.revenue} indicating market traction</span>
                  </SWOTItem>
                  <SWOTItem>
                    <span>✓</span>
                    <span>{formData.team?.charAt(0).toUpperCase() + formData.team?.slice(1)} team experience in {formData.industry?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} industry</span>
                  </SWOTItem>
                  {formData.intellectualProperty && formData.intellectualProperty !== 'none' && (
                    <SWOTItem>
                      <span>✓</span>
                      <span>Intellectual property: {formData.intellectualProperty?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    </SWOTItem>
                  )}
                </SWOTList>
              </SWOTCard>

              <SWOTCard>
                <SWOTTitle color="#ef4444">
                  ⚠️ Weaknesses
                </SWOTTitle>
                <SWOTList>
                  <SWOTItem>
                    <span>⚠</span>
                    <span>Market size ({formData.market?.charAt(0).toUpperCase() + formData.market?.slice(1)}) may constrain growth</span>
                  </SWOTItem>
                  <SWOTItem>
                    <span>⚠</span>
                    <span>Competition level ({formData.competition?.charAt(0).toUpperCase() + formData.competition?.slice(1)}) in target market</span>
                  </SWOTItem>
                  <SWOTItem>
                    <span>⚠</span>
                    <span>Financial health rated as {formData.financials?.charAt(0).toUpperCase() + formData.financials?.slice(1)}</span>
                  </SWOTItem>
                  {formData.customerBase === 'none' && (
                    <SWOTItem>
                      <span>⚠</span>
                      <span>No established customer base yet</span>
                    </SWOTItem>
                  )}
                </SWOTList>
              </SWOTCard>

              <SWOTCard>
                <SWOTTitle color="#f59e0b">
                  🌟 Opportunities
                </SWOTTitle>
                <SWOTList>
                  <SWOTItem>
                    <span>🌟</span>
                    <span>Growth opportunities rated as {formData.opportunities?.charAt(0).toUpperCase() + formData.opportunities?.slice(1)}</span>
                  </SWOTItem>
                  <SWOTItem>
                    <span>🌟</span>
                    <span>Scalability potential: {formData.scalability?.charAt(0).toUpperCase() + formData.scalability?.slice(1)}</span>
                  </SWOTItem>
                  <SWOTItem>
                    <span>🌟</span>
                    <span>Technology stack: {formData.technology?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                  </SWOTItem>
                  {formData.partnerships && formData.partnerships !== 'none' && (
                    <SWOTItem>
                      <span>🌟</span>
                      <span>Strategic partnerships: {formData.partnerships?.charAt(0).toUpperCase() + formData.partnerships?.slice(1)}</span>
                    </SWOTItem>
                  )}
                </SWOTList>
              </SWOTCard>

              <SWOTCard>
                <SWOTTitle color="#ef4444">
                  ⚡ Threats
                </SWOTTitle>
                <SWOTList>
                  <SWOTItem>
                    <span>⚡</span>
                    <span>Market risks: {formData.risks?.charAt(0).toUpperCase() + formData.risks?.slice(1)} level</span>
                  </SWOTItem>
                  <SWOTItem>
                    <span>⚡</span>
                    <span>Competitive advantage: {formData.competitiveAdvantage?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                  </SWOTItem>
                  <SWOTItem>
                    <span>⚡</span>
                    <span>Exit strategy: {formData.exitStrategy?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                  </SWOTItem>
                  {formData.funding === 'none' && (
                    <SWOTItem>
                      <span>⚡</span>
                      <span>No external funding raised yet</span>
                    </SWOTItem>
                  )}
                </SWOTList>
              </SWOTCard>
            </SWOTGrid>

            <MarketResearch>
              <MarketTitle>
                📊 Market Research
              </MarketTitle>
              <MarketText>
                The {formData.industry?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} industry is experiencing significant growth with a market size of {formData.marketSize?.charAt(0).toUpperCase() + formData.marketSize?.slice(1)}. 
                Your business operates in a {formData.market?.charAt(0).toUpperCase() + formData.market?.slice(1)} market with {formData.competition?.charAt(0).toUpperCase() + formData.competition?.slice(1)} competition levels. 
                The scalability potential is {formData.scalability?.charAt(0).toUpperCase() + formData.scalability?.slice(1)}, and your competitive advantage is rated as {formData.competitiveAdvantage?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}. 
                With {formData.team?.charAt(0).toUpperCase() + formData.team?.slice(1)} team experience and {formData.technology?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} technology stack, this valuation considers current market conditions, growth projections, and industry benchmarks to provide an accurate assessment of your business value.
              </MarketText>
            </MarketResearch>

            <RateUsSection>
              <RateUsTitle>Rate us - Your opinion matters!</RateUsTitle>
              <RateUsSubtitle>How was your startup evaluation experience?</RateUsSubtitle>
              {!ratingSubmitted ? (
                <>
                  <StarRating>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        filled={star <= rating}
                        onClick={() => setRating(star)}
                      >
                        ★
                      </Star>
                    ))}
                  </StarRating>
                  <SubmitRatingButton onClick={handleRatingSubmit}>
                    Submit Rating
                  </SubmitRatingButton>
                </>
              ) : (
                <p style={{ color: '#10b981', fontWeight: '600' }}>
                  Thank you for your rating! 🌟
                </p>
              )}
            </RateUsSection>

            <ContactInfoSection>
              <ContactText>
                📧 Detailed report sent to {formData.email}
              </ContactText>
              <ContactSubtext>
                Our team will contact you within 24 hours to discuss next steps
              </ContactSubtext>
            </ContactInfoSection>

              <ActionButtons>
              <Button onClick={resetCalculator}>
                <FiTarget />
                Start New Valuation
              </Button>
              <Button primary onClick={() => window.location.href = '/contact'}>
                Schedule Consultation
                <FiArrowRight />
                </Button>
              </ActionButtons>
          </ValuationReportContainer>
        );

      default:
        return null;
    }
  };

  return (
    <CalculatorContainer>
      <SEO
        title="Business Valuation Calculator - YD Advisory"
        description="Get an instant business valuation with our comprehensive calculator. Professional business valuation tool powered by YD Advisory's expertise."
        keywords="business valuation calculator, company valuation, startup valuation, business worth, valuation tool, YD Advisory"
        url="https://ydadvisory.ae/calculator"
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

        <CalculatorGrid>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <LeftPane>
              <h2>
                Get Your Business Valued in Minutes
              </h2>
              <p>
                Our comprehensive valuation calculator uses industry-standard methodologies 
                to provide you with an accurate estimate of your business worth. Get insights 
                into your company's value and discover opportunities for growth.
              </p>
              
              <BenefitsSection>
                <h3>Why Choose YD Valuator?</h3>
                <BenefitsList>
                  <BenefitItem>
                    <FiCheck className="check-icon" />
                    <span><strong>Industry Expertise:</strong> Powered by YD Advisory's deep market knowledge</span>
                  </BenefitItem>
                  <BenefitItem>
                    <FiCheck className="check-icon" />
                    <span><strong>Comprehensive Analysis:</strong> Multiple valuation methodologies</span>
                  </BenefitItem>
                  <BenefitItem>
                    <FiCheck className="check-icon" />
                    <span><strong>Market Insights:</strong> Real-time industry benchmarks</span>
                  </BenefitItem>
                  <BenefitItem>
                    <FiCheck className="check-icon" />
                    <span><strong>Professional Guidance:</strong> Connect with our valuation experts</span>
                  </BenefitItem>
                  <BenefitItem>
                    <FiCheck className="check-icon" />
                    <span><strong>Confidential:</strong> Your data is secure and private</span>
                  </BenefitItem>
                  <BenefitItem>
                    <FiCheck className="check-icon" />
                    <span><strong>Free Consultation:</strong> Get personalized advice from our team</span>
                  </BenefitItem>
                  <BenefitItem>
                    <FiCheck className="check-icon" />
                    <span><strong>Detailed Report:</strong> Comprehensive valuation breakdown</span>
                  </BenefitItem>
                  <BenefitItem>
                    <FiCheck className="check-icon" />
                    <span><strong>Growth Strategy:</strong> Actionable insights for improvement</span>
                  </BenefitItem>
                </BenefitsList>
              </BenefitsSection>
            </LeftPane>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <CalculatorCard>
            <StepIndicator>
                {steps.map((step, index) => (
                <Step
                    key={index}
                    active={currentStep === index + 1}
                    completed={currentStep > index + 1}
                  >
                    {index + 1}
                </Step>
              ))}
            </StepIndicator>

            <StepContent>
              <StepTitle>{steps[currentStep - 1]?.title}</StepTitle>
              <StepDescription>{steps[currentStep - 1]?.description}</StepDescription>
              
              {renderStep()}

              <ButtonGroup>
                  {currentStep > 1 && currentStep < 9 && (
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
                    Continue to Contact
                    <FiArrowRight />
                  </Button>
                  ) : currentStep === 8 ? (
                    <Button 
                      primary 
                      onClick={nextStep}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <FiClock />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Get My Report
                          <FiMail />
                        </>
                      )}
                    </Button>
                  ) : null}
              </ButtonGroup>
            </StepContent>
            </CalculatorCard>
          </motion.div>
        </CalculatorGrid>
      </CalculatorSection>
    </CalculatorContainer>
  );
};

export default Calculator;