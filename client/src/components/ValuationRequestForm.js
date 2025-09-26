import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiSend, FiCheckCircle } from 'react-icons/fi';

const ValuationFormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[4]};
`;

const ValuationFormCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: 16px;
  padding: ${props => props.theme.spacing[8]};
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid ${props => props.theme.colors.gray[100]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[6]};
    border-radius: 12px;
  }
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[4]};
  font-weight: 700;
  text-align: center;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.5rem;
  }
`;

const FormDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing[8]};
  text-align: center;
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[6]};
`;

const FormRow = styled.div`
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
    font-weight: 600;
    color: ${props => props.theme.colors.gray[700]};
    margin-bottom: ${props => props.theme.spacing[2]};
    font-size: 0.9rem;
    
    .required {
      color: ${props => props.theme.colors.error || '#ef4444'};
      margin-left: 2px;
    }
  }
  
  input, select, textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid ${props => props.theme.colors.gray[300]};
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: ${props => props.theme.colors.white};
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary[500]};
      box-shadow: 0 0 0 3px ${props => props.theme.colors.primary[100]};
    }
    
    &.error {
      border-color: ${props => props.theme.colors.error || '#ef4444'};
    }
    
    &::placeholder {
      color: ${props => props.theme.colors.gray[400]};
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
    font-family: inherit;
  }
  
  .error-message {
    color: ${props => props.theme.colors.error || '#ef4444'};
    font-size: 0.8rem;
    margin-top: ${props => props.theme.spacing[1]};
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[2]};
  
  .radio-option {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[2]};
    
    input[type="radio"] {
      width: auto;
      margin: 0;
    }
    
    label {
      margin: 0;
      font-weight: 500;
      color: ${props => props.theme.colors.gray[700]};
      cursor: pointer;
    }
  }
`;

const NoteText = styled.p`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.gray[500]};
  margin-bottom: ${props => props.theme.spacing[4]};
  line-height: 1.4;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  box-shadow: 0 4px 15px rgba(20, 184, 166, 0.3);
  margin-top: ${props => props.theme.spacing[4]};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4);
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  background: ${props => props.theme.colors.success || '#10b981'};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[4]};
  border-radius: 8px;
  margin-bottom: ${props => props.theme.spacing[6]};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  font-weight: 600;
`;

const ValuationRequestForm = ({ onSubmit, isSubmitting = false, showTitle = true }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/xkgvdpgg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          formType: 'Valuation Request',
          subject: `Valuation Request from ${data.firstName} ${data.lastName}`
        })
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const revenueOptions = [
    'Please Select',
    'Under $100K',
    '$100K - $500K',
    '$500K - $1M',
    '$1M - $5M',
    '$5M - $10M',
    '$10M - $50M',
    '$50M+'
  ];

  const industryOptions = [
    'Please Select',
    'Technology',
    'Healthcare',
    'Finance',
    'Manufacturing',
    'Retail',
    'Real Estate',
    'Education',
    'Energy',
    'Transportation',
    'Other'
  ];

  const stateOptions = [
    'Please Select',
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  return (
    <ValuationFormContainer>
      <ValuationFormCard>
        {showTitle && (
          <>
            <FormTitle>Request A Valuation</FormTitle>
            <FormDescription>
              If you are entertaining an exit, feel free to start by requesting a complimentary valuation. 
              We'll try to get back to you within 48 hours with our thoughts on your business or by setting up a complimentary valuation.
            </FormDescription>
          </>
        )}

        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          {isSubmitted && (
            <SuccessMessage>
              <FiCheckCircle />
              <div>
                <strong>Thank You! 🎉</strong><br />
                Your valuation request has been submitted successfully. We'll contact you within 48 hours.
              </div>
            </SuccessMessage>
          )}

          <FormRow>
            <FormGroup>
              <label htmlFor="firstName">
                First name<span className="required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                {...register('firstName', { required: 'First name is required' })}
                className={errors.firstName ? 'error' : ''}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <div className="error-message">{errors.firstName.message}</div>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="lastName">
                Last name<span className="required">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                {...register('lastName', { required: 'Last name is required' })}
                className={errors.lastName ? 'error' : ''}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <div className="error-message">{errors.lastName.message}</div>
              )}
            </FormGroup>
          </FormRow>

          <FormGroup>
            <label htmlFor="companyName">Company name</label>
            <input
              type="text"
              id="companyName"
              {...register('companyName')}
              placeholder="Enter your company name"
            />
          </FormGroup>

          <FormRow>
            <FormGroup>
              <label htmlFor="email">
                Email<span className="required">*</span>
              </label>
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
                placeholder="your.email@company.com"
              />
              {errors.email && (
                <div className="error-message">{errors.email.message}</div>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="phone">
                Phone number<span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                {...register('phone', { required: 'Phone number is required' })}
                className={errors.phone ? 'error' : ''}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <div className="error-message">{errors.phone.message}</div>
              )}
            </FormGroup>
          </FormRow>

          <FormGroup>
            <label>
              Preferred Contact Method<span className="required">*</span>
            </label>
            <RadioGroup>
              <div className="radio-option">
                <input
                  type="radio"
                  id="contactEmail"
                  value="email"
                  {...register('preferredContact', { required: 'Please select a contact method' })}
                />
                <label htmlFor="contactEmail">Email</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="contactPhone"
                  value="phone"
                  {...register('preferredContact', { required: 'Please select a contact method' })}
                />
                <label htmlFor="contactPhone">Phone</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="contactText"
                  value="text"
                  {...register('preferredContact', { required: 'Please select a contact method' })}
                />
                <label htmlFor="contactText">Text</label>
              </div>
            </RadioGroup>
            {errors.preferredContact && (
              <div className="error-message">{errors.preferredContact.message}</div>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="revenue">
              Revenue<span className="required">*</span>
            </label>
            <select
              id="revenue"
              {...register('revenue', { required: 'Please select revenue range' })}
              className={errors.revenue ? 'error' : ''}
            >
              {revenueOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.revenue && (
              <div className="error-message">{errors.revenue.message}</div>
            )}
          </FormGroup>

          <FormGroup>
            <label>I am looking to<span className="required">*</span></label>
            <NoteText>
              Are you looking to buy a business? Please register as a buyer instead of completing this form.
            </NoteText>
            <RadioGroup>
              <div className="radio-option">
                <input
                  type="radio"
                  id="sellBusiness"
                  value="sell"
                  {...register('lookingTo', { required: 'Please select what you are looking to do' })}
                />
                <label htmlFor="sellBusiness">Sell a business</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="other"
                  value="other"
                  {...register('lookingTo', { required: 'Please select what you are looking to do' })}
                />
                <label htmlFor="other">Other</label>
              </div>
            </RadioGroup>
            {errors.lookingTo && (
              <div className="error-message">{errors.lookingTo.message}</div>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="industry">
              Industry (Seller)<span className="required">*</span>
            </label>
            <select
              id="industry"
              {...register('industry', { required: 'Please select industry' })}
              className={errors.industry ? 'error' : ''}
            >
              {industryOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.industry && (
              <div className="error-message">{errors.industry.message}</div>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="state">
              Primary Business State<span className="required">*</span>
            </label>
            <select
              id="state"
              {...register('state', { required: 'Please select state' })}
              className={errors.state ? 'error' : ''}
            >
              {stateOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.state && (
              <div className="error-message">{errors.state.message}</div>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              {...register('message')}
              placeholder="Tell us more about your business or specific questions..."
              rows="4"
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                Submit <FiSend />
              </>
            )}
          </SubmitButton>
        </Form>
      </ValuationFormCard>
    </ValuationFormContainer>
  );
};

export default ValuationRequestForm;
