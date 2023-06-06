import React from 'react'
import CalendarCard from './calendar'

const Home = () => {
  return (
    <div>
      <p
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
      </p>
    </div>
  )
}

export default Home
