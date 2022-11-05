import Sidebar from '../components/Sidebar';
import '../styles/pages/questionary.css';
import QuestionaryForm from '../components/form/QuestionaryForm';

export default function Questionary() {
  return (
    <div id="questionary-user">
      <Sidebar />
      <main>
        <QuestionaryForm />
      </main>
    </div>
  );
}