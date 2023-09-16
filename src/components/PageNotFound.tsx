import {Link} from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className='pt-4'>
      <div className="container jumbotron mt-4">
      <h1 className="display-4">404 Page Not Found!</h1>
      <p className="lead">The page you are trying to access is not available right now. </p>
      <hr className="my-4"/>
      <p className="lead">
        <Link style={{ backgroundColor: "#114b5f","color":"white" }} className="btn btn-lg" to ="/" role="button">Back To Home</Link>
      </p>
      </div>
    </div>
  )
}

export default PageNotFound