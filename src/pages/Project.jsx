import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Project: {id}</h2>
      {/* Implement the Project page similar to the Inbox page */}
    </div>
  );
};

export default ProjectPage;