// Structured Data for SEO
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "YD Advisory",
  "alternateName": "YD Financial Advisory",
  "url": "https://ydadvisory.ae",
  "logo": "https://ydadvisory.ae/images/logo/logo.png",
  "description": "YD Advisory is your trusted partner in financial excellence. We provide comprehensive financial solutions including investment management, financial planning, risk assessment, and business consulting.",
  "foundingDate": "2010",
  "founder": {
    "@type": "Person",
    "name": "Yashaswi Das",
    "jobTitle": "CEO & Founder"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Level 41, Emirates Tower - DIFC, Near Trade Center",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "postalCode": "00000",
    "addressCountry": "AE"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+971-528477349",
    "contactType": "customer service",
    "email": "Yashaswi.das@ydadvisory.ae",
    "availableLanguage": ["English", "Hindi", "Arabic"]
  },
  "sameAs": [
    "https://www.linkedin.com/in/yashaswi-das/",
    "https://twitter.com/ydadvisory",
    "https://facebook.com/ydadvisory"
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 25.2048,
      "longitude": 55.2708
    },
    "geoRadius": "1000000"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Financial Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Investment Management",
          "description": "Professional portfolio management and investment strategies"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Financial Planning",
          "description": "Comprehensive financial planning services"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Risk Assessment",
          "description": "Comprehensive risk analysis and mitigation strategies"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Business Consulting",
          "description": "Strategic business consulting and advisory services"
        }
      }
    ]
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "YD Advisory",
  "url": "https://ydadvisory.ae",
  "description": "Your trusted partner in financial excellence. Comprehensive financial solutions and advisory services.",
  "publisher": {
    "@type": "Organization",
    "name": "YD Advisory",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ydadvisory.ae/images/logo/logo.png"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://ydadvisory.ae/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const articleSchema = (article) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "image": article.image,
  "author": {
    "@type": "Person",
    "name": "Yashaswi Das",
    "jobTitle": "CEO & Founder",
    "worksFor": {
      "@type": "Organization",
      "name": "YD Advisory"
    }
  },
  "publisher": {
    "@type": "Organization",
    "name": "YD Advisory",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ydadvisory.ae/images/logo/logo.png"
    }
  },
  "datePublished": article.datePublished,
  "dateModified": article.dateModified || article.datePublished,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  }
});

export const serviceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "provider": {
    "@type": "FinancialService",
    "name": "YD Advisory",
    "url": "https://ydadvisory.ae"
  },
  "areaServed": {
    "@type": "Country",
    "name": ["United Arab Emirates", "India", "Singapore", "Saudi Arabia", "United Kingdom"]
  },
  "serviceType": "Financial Advisory",
  "category": service.category
});

export const personSchema = (person) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": person.name,
  "jobTitle": person.jobTitle,
  "description": person.description,
  "image": person.image,
  "worksFor": {
    "@type": "Organization",
    "name": "YD Advisory",
    "url": "https://ydadvisory.ae"
  },
  "knowsAbout": [
    "Financial Planning",
    "Investment Management",
    "Risk Assessment",
    "Business Consulting",
    "Wealth Management"
  ],
  "alumniOf": person.education || "Financial Services Industry",
  "award": person.awards || "9+ Years Experience in Financial Services"
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://ydadvisory.ae/#organization",
  "name": "YD Advisory",
  "image": "https://ydadvisory.ae/images/logo/logo.png",
  "description": "Financial advisory and consulting services in Dubai, UAE",
  "url": "https://ydadvisory.ae",
  "telephone": "+971-528477349",
  "email": "Yashaswi.das@ydadvisory.ae",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Level 41, Emirates Tower - DIFC, Near Trade Center",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "postalCode": "00000",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.2048,
    "longitude": 55.2708
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "priceRange": "$$",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer",
  "currenciesAccepted": "AED, USD, EUR, GBP, INR"
};
