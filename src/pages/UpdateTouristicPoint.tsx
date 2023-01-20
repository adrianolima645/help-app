import Sidebar from '../components/Sidebar';
import '../styles/pages/create-touristic-point.css';
import UpdateTouristicPointForm from '../components/form/UpdateTouristicPointForm';

export default function UpdateTouristicPoint() {

  return (
    <div id="page-create-touristic-point">
      <Sidebar />

      <main>
        <UpdateTouristicPointForm />
      </main>
    </div>
  );
}
