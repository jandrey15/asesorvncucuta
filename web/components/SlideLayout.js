import React from 'react'

const Slide = props => {
  return (
    <section id='SlideContainer'>
      {props.children}

      <style jsx>{`
        #SlideContainer {
          position: relative;
        }
      `}</style>
    </section>
  )
}

export default Slide
