import Image from 'next/image';
import Link from 'next/link';
import { gqlOperations } from '../../gql-client';
import { redirect } from 'next/navigation';
import { auth } from '../../utils/auth';

export const ProjectsView = async () => {
  const session = await auth();

  if (!session) {
    redirect('/sign-in');
  }

  const { data } = await gqlOperations(session.accessToken).Projects();

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-[3rem] mb-4">Projects</h1>
      <div>
        <Link href="/create-project">Create project</Link>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data?.projects?.map((project) => (
          <Link href={`/project-detail/${project.id}`} key={project.id}>
            <div className="border rounded-[0.5rem] overflow-hidden">
              {project.image && (
                <Image
                  style={{ width: '100%' }}
                  width={project.image.width}
                  height={project.image.width}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${project.image.url}`}
                  alt="project image"
                />
              )}
              <div className="p-1">
                <div className="font-bold">{project.name}</div>
                <div className="text-sm">{project.description}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
