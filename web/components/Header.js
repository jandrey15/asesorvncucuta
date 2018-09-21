export default props => {
  return (
    <header>
      <h4>Hola soy header</h4>

      <style jsx>{`
        header {
          color: #fff;
          background: #8756ca;
          padding: 15px;
          text-align: center;
        }
        header a {
          color: #fff;
          text-decoration: none;
        }
      `}</style>
    </header>
  )
}
