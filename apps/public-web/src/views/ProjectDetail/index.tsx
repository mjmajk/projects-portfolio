import Image from 'next/image';
import { gqlOperations } from '../../gql-client';
import { UpdateDescriptionForm } from './components/UpdateDescriptionForm';
export const ProjectDetailView = async ({
  projectId,
}: {
  projectId: number;
}) => {
  const { data } = await gqlOperations.Project({ id: projectId });

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-[3rem] mb-4">{data.project.name}</h1>
      <Image
        style={{ width: '100%' }}
        width={data.project.image.width}
        height={data.project.image.height}
        src={`${process.env.NEXT_PUBLIC_API_URL}${data.project.image.url}`}
        alt="project image"
      />
      <UpdateDescriptionForm
        description={data.project.description}
        projectId={projectId}
      />
    </div>
  );
};
