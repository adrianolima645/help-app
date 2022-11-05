import Sidebar from '../components/Sidebar';
import '../styles/pages/create-touristic-point.css';
import CreateTouristicPointForm from '../components/form/CreateTouristicPointForm';

export default function CreateTouristicPoint() {

  return (
    <div id="page-create-touristic-point">
      <Sidebar />

      <main>
        <CreateTouristicPointForm />
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
