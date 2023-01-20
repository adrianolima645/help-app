import { FaChrome, FaFacebook, FaInstagram, FaStar, FaWhatsapp, FaYoutube } from 'react-icons/fa';

interface SponsoredProps {
  website: string;
  facebook: string;
  instagram: string;
  youtube: string;
  whatsappNumber: string;
}

export default function SponsoredSection(props: SponsoredProps) {
  const { website, facebook, instagram, youtube, whatsappNumber } = props;

  const whatsAppUrl = `https://api.whatsapp.com/send?phone=55${whatsappNumber}&text=Ol%C3%A1,%20quero%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20da%20sua%20empresa!`
    return (
      <div>    
        <hr />
        <h2>Informações adicionais</h2>

        <div className="info-details">
          <div className="hour">
            <a className='link' rel="noreferrer" href={`http://facebook.com/${facebook}`} target="_blank">
              <FaFacebook size={64} color="#15B6D6" />
            </a>
          </div>
          <div className="hour">
            <a className='link' rel="noreferrer" href={`http://instagram.com/${instagram}`} target="_blank">
              <FaInstagram size={64} color="#15B6D6" />
            </a>
          </div>
          <div className="hour">
            <a className='link' rel="noreferrer" href={`http://youtube.com/${youtube}`} target="_blank">
              <FaYoutube size={64} color="#15B6D6" />
            </a>
          </div>
          <div className="hour">
            <a className='link' rel="noreferrer" href={`http://${website}`} target="_blank">
              <FaChrome size={64} color="#15B6D6" />
            </a>
          </div>
          
        </div>

        <a className="contact-button" rel="noreferrer" href={whatsAppUrl} target="_blank">
          <FaWhatsapp size={20} color="#FFF" />
          Entrar em contato
        </a>
      </div>
    );
}