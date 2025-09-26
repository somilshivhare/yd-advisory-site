import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiDownload, FiMail, FiCheckCircle, FiX } from 'react-icons/fi';

const BrochureContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${props => props.theme.spacing[4]};
`;

const BrochureModal = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[8]};
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing[4]};
  right: ${props => props.theme.spacing[4]};
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.gray[500]};
  cursor: pointer;
  padding: ${props => props.theme.spacing[2]};
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.gray[100]};
    color: ${props => props.theme.colors.gray[700]};
  }
`;

const BrochureHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[6]};
  
  h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[2]};
  }
  
  p {
    color: ${props => props.theme.colors.gray[600]};
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing[4]};
  
  label {
    display: block;
    font-weight: 600;
    color: ${props => props.theme.colors.gray[700]};
    margin-bottom: ${props => props.theme.spacing[2]};
    font-size: 0.95rem;
  }
  
  input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid ${props => props.theme.colors.gray[200]};
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: ${props => props.theme.colors.white};
    
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
  }
`;

const DownloadButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 12px;
  padding: 16px 24px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  margin-top: ${props => props.theme.spacing[4]};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[6]} 0;
  
  .success-icon {
    font-size: 3rem;
    color: ${props => props.theme.colors.primary[600]};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[2]};
  }
  
  p {
    color: ${props => props.theme.colors.gray[600]};
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const DownloadBrochure = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleDownload = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Download the actual PDF file
      const link = document.createElement('a');
      link.href = '/documents/YD-Advisory-Brochure.pdf';
      link.download = 'YD-Advisory-Brochure.pdf';
      link.target = '_blank'; // Open in new tab as fallback
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsSuccess(true);
      
      // Send data to Formspree
      const formDataToSend = new FormData();
      formDataToSend.append('_subject', 'Brochure Download Request');
      formDataToSend.append('_replyto', formData.email);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('message', `Brochure download requested by ${formData.name} from ${formData.company}`);
      
      fetch('https://formspree.io/f/xpwgqkqv', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      }).catch(error => {
        console.error('Formspree submission failed:', error);
      });
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', company: '' });
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <BrochureContainer onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <BrochureModal
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <CloseButton onClick={handleClose}>
          <FiX />
        </CloseButton>
        
        {!isSuccess ? (
          <>
            <BrochureHeader>
              <h2>Download Our Brochure</h2>
              <p>
                Get our comprehensive business valuation services brochure with detailed information about our offerings, expertise, and success stories.
              </p>
            </BrochureHeader>
            
            <FormGroup>
              <label>Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </FormGroup>
            
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
            
            <FormGroup>
              <label>Company Name *</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Enter your company name"
                className={errors.company ? 'error' : ''}
              />
              {errors.company && <span className="error-text">{errors.company}</span>}
            </FormGroup>
            
            <DownloadButton onClick={handleDownload} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <FiDownload />
                  Downloading...
                </>
              ) : (
                <>
                  <FiDownload />
                  Download Brochure
                </>
              )}
            </DownloadButton>
          </>
        ) : (
          <SuccessMessage>
            <FiCheckCircle className="success-icon" />
            <h3>Download Complete!</h3>
            <p>
              Thank you for your interest in YD Advisory. Our brochure has been downloaded to your device. 
              We'll also send you a copy via email shortly.
            </p>
          </SuccessMessage>
        )}
      </BrochureModal>
    </BrochureContainer>
  );
};

export default DownloadBrochure;
