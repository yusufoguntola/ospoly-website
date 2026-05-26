import NewsUpdateSection from '@/app/components/sections/NewsUpdateSection'
import PageHero from '@/app/components/ui/PageHero'
import React from 'react'

const page = () => {
  return (
    <div className="bg-white min-h-screen">
          <PageHero
            title="News & Events"
            size="default"
          />

          <NewsUpdateSection />
          </div>
  )
}

export default page