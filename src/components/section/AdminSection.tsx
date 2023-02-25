import { FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface AdminProps {
  id: string;
}

export default function AdminSection(props: AdminProps) {
  const { id } = props;

    return (
      <div className='admin-section'>
      <p className='admin-info'>Você é administrador desse local!</p>
      <Link className='link-edit' to={`/touristic-point/edit/${id}`} >
        <FaPen size={25} color="#fff" />
      </Link>
    </div>
    );
}