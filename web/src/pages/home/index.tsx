import React from 'react'
import CalendarCard from './calendar'
import LinkCard from './link-card'
import MainContent from './main-content'

const Home = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '80vw',
            height: '70vw',
          }}
        >
          <MainContent />
        </div>
        <div
          style={{
            position: 'relative',
            right: '10px',
          }}
        >
          <CalendarCard />
          <LinkCard />
        </div>
      </div>
    </div>
  )
}

export default Home
