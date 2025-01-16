// pages/jobs/add.tsx
import DashboardLayout from '../../components/DashboardLayout';
import AddJobForm from '../../components/AddJobForm';

const AddJob = () => {
  const handleAddJob = (job: { title: string; description: string }) => {
    // API call to add job
    console.log('Adding job:', job);
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Add Job</h1>
      <AddJobForm onAdd={handleAddJob} />
    </DashboardLayout>
  );
};

export default AddJob;
