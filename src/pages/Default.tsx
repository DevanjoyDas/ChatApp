import "../styles/pageStyles/Default.css"

const Default = () => {
  return (
    <div className="container-default">
      <div className="imagediv-default">
        <img className="img-default" src="./defaultPage.png"/>
      </div>
      <h1 className="h1-default">Chat App</h1>
      <p className="p-default">
      Send and receive messages without keeping your phone online. <br />
      Use Chat App on up to 4 linked devices and 1 phone at the same time.
      </p>
      <p className="p-default">
        <span>Built by</span>{" "}
        <a className="a-default" href="https://github.com/DevanjoyDas">
          Devanjoy Das
        </a>
      </p>
    </div>
  )
}

export default Default