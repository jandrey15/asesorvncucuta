import Slides from './Slides'

export default props => {
  const { entradas, type } = props
  console.log(entradas)
  return (
    <section className='SlideShow'>
      <Slides entradas={entradas} type={type} />
    </section>
  )
}
