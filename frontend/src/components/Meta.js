import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Garden Mart',
  description: 'We provide all essential services required for kitchen gardening and overall gardening on one platform.',
  // keywords: 'Medicanes, buy Medical, cheap Medical product',
  keywords: 'Products  , plants, seeds,fertilizers,tools,pesticides,blogs,forums,renting,videos,virtual,garden,vg,virtual garden',
}

export default Meta
