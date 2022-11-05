import Sidebar from '../components/Sidebar';
import '../styles/pages/assessment.css';
import AssessmentForm from '../components/form/AssessmentForm';

export default function AssessmentCreate() {


  return (
    <div id="create-assessment">
      <Sidebar />
      <main>
        <AssessmentForm />
      </main>
    </div>
  );
}
