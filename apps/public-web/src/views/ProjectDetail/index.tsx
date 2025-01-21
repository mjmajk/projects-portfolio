import Image from 'next/image';
import { handleProjectUpdateOnServer } from '../../actions/update-project-description';
import { gqlOperations } from '../../gql-client';

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
        src={data.project.image.url}
        alt="project image"
      />
      <form action={handleProjectUpdateOnServer} className="flex flex-col mt-2">
        <textarea
          name="description"
          className="w-full text-2xl h-40 p-4 border border-gray-300 rounded-lg border-2 border-black"
          defaultValue={data.project.description}
        />
        <input
          type="text"
          name="projectId"
          defaultValue={projectId}
          className="hidden"
        />
        <button
          className="mt-4 w-full p-4 bg-blue-500 text-white rounded-lg"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
};
