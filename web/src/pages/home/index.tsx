import React from 'react'
import CalendarCard from './calendar'

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
        ></div>
        <div
          style={{
            position: 'relative',
            right: '10px',
          }}
        >
          <CalendarCard />
        </div>
      </div>
    </div>
  )
}

export default Home
