import Sidebar from '../components/Sidebar';
import '../styles/pages/register.css';
import RegisterForm from '../components/form/RegisterForm';

export default function Register() {


  return (
    <div id="register-user">
      <Sidebar />
      <main>
        <RegisterForm />
      </main>
    </div>
  );
}
