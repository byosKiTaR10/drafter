import './Home.css'
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className='bg-home'>
      <div className='Home'>
        <div className='container-logo'>
          <h1 className='title-logo'>
            DRAFT GAP
          </h1>
        </div>
        <div className='home-buttons-container'>
          <div className='buttons-home'>
          <Link className='link-bttn' to="/drafter">
              <button className="button-74">SOLO DRAFT</button>
            </Link>
            <Link className='link-bttn' to="/">
              <button className="button-74 disabled">ONLINE DRAFT</button>
            </Link>
            <Link className='link-bttn' to="/">
              <button className="button-74 disabled">DRAFTS HISTORY</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}