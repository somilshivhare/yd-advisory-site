import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`

  /* Reset and Base Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    overflow-x: hidden;
    width: 100%;
    max-width: 100vw;
  }

  body {
    font-family: ${theme.fonts.primary};
    font-size: ${theme.fontSizes.base};
    font-weight: ${theme.fontWeights.normal};
    line-height: 1.7;
    color: ${theme.colors.gray[800]};
    background-color: ${theme.colors.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    width: 100%;
    max-width: 100vw;
    letter-spacing: 0.01em;
    position: relative;
    
    @media (max-width: ${theme.breakpoints.sm}) {
      font-size: ${theme.fontSizes.sm};
      line-height: 1.6;
    }
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.display};
    font-weight: ${theme.fontWeights.bold};
    line-height: 1.2;
    margin-bottom: ${theme.spacing[4]};
    color: ${theme.colors.primary[800]};
    letter-spacing: -0.025em;
  }

  h1 {
    font-size: ${theme.fontSizes['5xl']};
    word-wrap: break-word;
    overflow-wrap: break-word;
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes['4xl']};
    }
    @media (max-width: ${theme.breakpoints.sm}) {
      font-size: ${theme.fontSizes['2xl']};
      line-height: 1.3;
    }
  }

  h2 {
    font-size: ${theme.fontSizes['4xl']};
    word-wrap: break-word;
    overflow-wrap: break-word;
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes['3xl']};
    }
    @media (max-width: ${theme.breakpoints.sm}) {
      font-size: ${theme.fontSizes.xl};
      line-height: 1.3;
    }
  }

  h3 {
    font-size: ${theme.fontSizes['3xl']};
    word-wrap: break-word;
    overflow-wrap: break-word;
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes['2xl']};
    }
    @media (max-width: ${theme.breakpoints.sm}) {
      font-size: ${theme.fontSizes.lg};
      line-height: 1.4;
    }
  }

  h4 {
    font-size: ${theme.fontSizes['2xl']};
  }

  h5 {
    font-size: ${theme.fontSizes.xl};
  }

  h6 {
    font-size: ${theme.fontSizes.lg};
  }

  p {
    margin-bottom: ${theme.spacing[4]};
    color: ${theme.colors.gray[600]};
  }

  a {
    color: ${theme.colors.primary[600]};
    text-decoration: none;
    transition: color ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.primary[700]};
    }
  }

  /* Lists */
  ul, ol {
    margin-bottom: ${theme.spacing[4]};
    padding-left: ${theme.spacing[6]};
  }

  li {
    margin-bottom: ${theme.spacing[2]};
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Form Elements */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: ${theme.borderRadius.md};
    padding: ${theme.spacing[3]} ${theme.spacing[4]};
    transition: border-color ${theme.transitions.fast}, box-shadow ${theme.transitions.fast};
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary[500]};
      box-shadow: 0 0 0 3px ${theme.colors.primary[100]};
    }
  }

  button {
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    border: none;
    border-radius: ${theme.borderRadius.md};
    transition: all ${theme.transitions.fast};
    min-height: 44px; /* Better touch target for mobile */
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    @media (max-width: ${theme.breakpoints.sm}) {
      min-height: 48px;
      font-size: ${theme.fontSizes.base};
    }
  }

  /* Utility Classes */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${theme.spacing[4]};
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    
    @media (max-width: ${theme.breakpoints.sm}) {
      padding: 0 ${theme.spacing[3]};
    }
  }

  /* Prevent horizontal overflow */
  * {
    max-width: 100%;
    box-sizing: border-box;
  }

  /* Fix for zoom issues */
  .App {
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
    position: relative;
  }

  /* Prevent content from being cut off during zoom */
  @media screen and (max-width: 480px) {
    html {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    
    body {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
  }

  /* Fix for iOS Safari zoom issues */
  @supports (-webkit-touch-callout: none) {
    html {
      -webkit-text-size-adjust: 100%;
    }
    
    body {
      -webkit-text-size-adjust: 100%;
    }
  }

  /* Ensure all sections handle zoom properly */
  section {
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Mobile-specific utility classes */
  .mobile-hidden {
    @media (max-width: ${theme.breakpoints.sm}) {
      display: none !important;
    }
  }

  .mobile-only {
    display: none;
    @media (max-width: ${theme.breakpoints.sm}) {
      display: block !important;
    }
  }

  .mobile-full-width {
    @media (max-width: ${theme.breakpoints.sm}) {
      width: 100% !important;
      max-width: 100% !important;
    }
  }

  .mobile-center {
    @media (max-width: ${theme.breakpoints.sm}) {
      text-align: center !important;
    }
  }

  /* Animation Classes */
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
    
    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .slide-in-left {
    opacity: 0;
    transform: translateX(-50px);
    transition: opacity 0.6s ease, transform 0.6s ease;
    
    &.visible {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .slide-in-right {
    opacity: 0;
    transform: translateX(50px);
    transition: opacity 0.6s ease, transform 0.6s ease;
    
    &.visible {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.gray[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary[400]};
    border-radius: ${theme.borderRadius.full};
    
    &:hover {
      background: ${theme.colors.primary[500]};
    }
  }

  /* Selection */
  ::selection {
    background-color: ${theme.colors.primary[200]};
    color: ${theme.colors.primary[800]};
  }

  /* Focus styles for accessibility */
  *:focus-visible {
    outline: 2px solid ${theme.colors.primary[500]};
    outline-offset: 2px;
  }

  /* Print styles */
  @media print {
    * {
      background: transparent !important;
      color: black !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }
    
    a, a:visited {
      text-decoration: underline;
    }
    
    a[href]:after {
      content: " (" attr(href) ")";
    }
    
    abbr[title]:after {
      content: " (" attr(title) ")";
    }
    
    pre, blockquote {
      border: 1px solid #999;
      page-break-inside: avoid;
    }
    
    thead {
      display: table-header-group;
    }
    
    tr, img {
      page-break-inside: avoid;
    }
    
    img {
      max-width: 100% !important;
    }
    
    p, h2, h3 {
      orphans: 3;
      widows: 3;
    }
    
    h2, h3 {
      page-break-after: avoid;
    }
  }
`;

export default GlobalStyle;
