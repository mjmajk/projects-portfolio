import Image from 'next/image';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';

export default async function Home() {
  noStore();
  const { data } = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query Projects {
          projects {
            id
            name
            description

            image {
              height
              width
              url
            }
          }
        }
      `,
    }),
  }).then((res) => res.json());

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-[3rem] mb-4">Projects</h1>
      <div className="grid grid-cols-3 gap-4">
        {data?.projects?.map((project) => (
          <Link href={`/project-detail/${project.id}`} key={project.id}>
            <div className="border rounded-[0.5rem] overflow-hidden">
              <Image
                style={{ width: '100%' }}
                width={project.image.width}
                height={project.image.width}
                src={project.image.url}
                alt="project image"
              />
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
}
