import Slides from './Slides'

export default props => {
  const { entradas } = props
  return (
    <section className='SlideShow'>
      <Slides entradas={entradas} />
    </section>
  )
}
