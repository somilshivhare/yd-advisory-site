import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiMessageCircle } from 'react-icons/fi';

const FloatingButtonsContainer = styled.div`
  position: fixed;
  right: ${props => props.theme.spacing[6]};
  bottom: ${props => props.theme.spacing[6]};
  z-index: ${props => props.theme.zIndex.modal};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    right: ${props => props.theme.spacing[4]};
    bottom: ${props => props.theme.spacing[4]};
    gap: ${props => props.theme.spacing[3]};
  }
`;

const FloatingButton = styled(motion.button)`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 60px;
    height: 60px;
  }
  
  /* Enhanced shadow with multiple layers */
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.15),
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 
      0 8px 25px rgba(0, 0, 0, 0.2),
      0 4px 8px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.2);
  }
  
  &:active {
    transform: translateY(-1px) scale(1.02);
    transition: all 0.1s ease;
  }
  
  /* Ripple effect */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  &:active::before {
    width: 100px;
    height: 100px;
  }
`;

const CallButton = styled(FloatingButton)`
  background: linear-gradient(145deg, #25D366 0%, #1DA851 50%, #128C7E 100%);
  color: white;
  
  &:hover {
    background: linear-gradient(145deg, #1DA851 0%, #128C7E 50%, #0F7A6B 100%);
  }
  
  /* Subtle inner glow */
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    border-radius: 50%;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
    pointer-events: none;
  }
`;

const WhatsAppButton = styled(FloatingButton)`
  background: linear-gradient(145deg, #25D366 0%, #1DA851 50%, #128C7E 100%);
  color: white;
  
  &:hover {
    background: linear-gradient(145deg, #1DA851 0%, #128C7E 50%, #0F7A6B 100%);
  }
  
  /* Subtle inner glow */
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    border-radius: 50%;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
    pointer-events: none;
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  right: 80px;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, ${props => props.theme.colors.gray[800]}, ${props => props.theme.colors.gray[900]});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
  white-space: nowrap;
  max-width: 180px;
  word-break: break-word;
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.3),
    0 4px 12px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  z-index: 100;
  
  &::after {
    content: '';
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    border: 8px solid transparent;
    border-left-color: ${props => props.theme.colors.gray[800]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    right: 50%;
    left: 50%;
    top: auto;
    bottom: 76px;
    transform: translateX(-50%) translateY(0);
    font-size: ${props => props.theme.fontSizes.xs};
    padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
    max-width: 90vw;
    white-space: normal;
    word-break: break-word;
    
    &::after {
      left: 50%;
      top: 100%;
      transform: translateX(-50%);
      border: 8px solid transparent;
      border-top-color: ${props => props.theme.colors.gray[800]};
      border-left-color: transparent;
    }
  }
`;

const FloatingActionButtons = () => {
  const [showTooltips, setShowTooltips] = useState({});

  const handleCall = () => {
    window.open('tel:+971528477349', '_self');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hello! I would like to know more about YD Advisory services.');
    window.open(`https://wa.me/971528477349?text=${message}`, '_blank');
  };

  const handleMouseEnter = (buttonType) => {
    setShowTooltips(prev => ({ ...prev, [buttonType]: true }));
  };

  const handleMouseLeave = (buttonType) => {
    setShowTooltips(prev => ({ ...prev, [buttonType]: false }));
  };


  return (
    <FloatingButtonsContainer>
      {/* Call Button */}
      <div style={{ position: 'relative' }}>
        <CallButton
          onClick={handleCall}
          onMouseEnter={() => handleMouseEnter('call')}
          onMouseLeave={() => handleMouseLeave('call')}
          whileHover={{ 
            scale: 1.05,
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: [1, 1.05, 1], 
            y: 0,
            transition: { 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              delay: 0.2,
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
          aria-label="Call YD Advisory"
        >
          <FiPhone size={26} />
        </CallButton>
        
        <AnimatePresence>
          {showTooltips.call && (
            <Tooltip
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              Call Now
            </Tooltip>
          )}
        </AnimatePresence>
      </div>

      {/* WhatsApp Button */}
      <div style={{ position: 'relative' }}>
        <WhatsAppButton
          onClick={handleWhatsApp}
          onMouseEnter={() => handleMouseEnter('whatsapp')}
          onMouseLeave={() => handleMouseLeave('whatsapp')}
          whileHover={{ 
            scale: 1.05,
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: [1, 1.05, 1], 
            y: 0,
            transition: { 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              delay: 0.4,
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
          aria-label="WhatsApp YD Advisory"
        >
          <FiMessageCircle size={26} />
        </WhatsAppButton>
        
        <AnimatePresence>
          {showTooltips.whatsapp && (
            <Tooltip
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              WhatsApp Us
            </Tooltip>
          )}
        </AnimatePresence>
      </div>
    </FloatingButtonsContainer>
  );
};

export default FloatingActionButtons;
