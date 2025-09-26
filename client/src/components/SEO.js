import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = "YD Advisory - Financial Consulting Excellence",
  description = "YD Advisory is your trusted partner in financial excellence. We provide comprehensive financial solutions including investment management, financial planning, risk assessment, and business consulting across UAE, India, Singapore, and more.",
  keywords = "financial advisory, investment management, financial planning, risk assessment, business consulting, wealth management, UAE financial services, Dubai financial advisor, YD Advisory",
  image = "/images/logo/logo.png",
  url = "https://ydadvisory.ae",
  type = "website",
  structuredData = null,
  canonical = null
}) => {
  const fullTitle = title.includes("YD Advisory") ? title : `${title} | YD Advisory`;
  const fullUrl = canonical || url;
  const fullImage = image.startsWith('http') ? image : `${url}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="YD Advisory" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="YD Advisory" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@ydadvisory" />
      <meta name="twitter:creator" content="@ydadvisory" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#14b8a6" />
      <meta name="msapplication-TileColor" content="#14b8a6" />
      <meta name="msapplication-TileImage" content="/images/logo/logo.png" />
      
      {/* Geo Tags for UAE */}
      <meta name="geo.region" content="AE-DU" />
      <meta name="geo.placename" content="Dubai" />
      <meta name="geo.position" content="25.2048;55.2708" />
      <meta name="ICBM" content="25.2048, 55.2708" />
      
      {/* Business Information */}
      <meta name="business:contact_data:street_address" content="Level 41, Emirates Tower - DIFC, Near Trade Center" />
      <meta name="business:contact_data:locality" content="Dubai" />
      <meta name="business:contact_data:region" content="Dubai" />
      <meta name="business:contact_data:postal_code" content="00000" />
      <meta name="business:contact_data:country_name" content="United Arab Emirates" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
