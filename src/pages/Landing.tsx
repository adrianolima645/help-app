import '../styles/pages/landing.css';
import logoImg from '../images/logo.svg';
import LoginForm from '../components/form/LoginForm';

function Landing() {
  return (
    <div id="page-landing">
      <div className="left-content-wraper">
          <div className='wraper'>
            <div className='text-landing'>
              <img src={''} alt="Help!" />
              <h1 className='title'>Os principais pontos turísticos da cidade em um único lugar.</h1>
              <p>Conheça os principais pontos turísticos da cidade.</p>
            </div>
          </div>
      </div>
      <div className="right-content-wraper">
          <div className='form-landing'>
            <LoginForm />
          </div>
      </div>
    </div>
  );
}

export default Landing;
