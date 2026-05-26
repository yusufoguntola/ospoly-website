import NewsUpdateSection from '@/app/components/sections/NewsUpdateSection'
import PageHero from '@/app/components/ui/PageHero'
import React from 'react'

const page = () => {
  return (
    <div className="bg-white min-h-screen">
          <PageHero
            title="News & Events"
            size="default"
            description='Your source for the latest updates, achievements, and events from the OSPOLY community.'
          />

          <NewsUpdateSection />
          </div>
  )
}

export default page