import { DescriptionUpdateForm } from './components/DescriptionUpdateForm';
import { unstable_noStore as noStore } from 'next/cache';
import Image from 'next/image';

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  noStore();
  const res = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: { id: parseInt(params.id) },
      query: `
        query Project($id: Int!) {
          project(id: $id) {
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
      <h1 className="text-[3rem] mb-4">{res.data.project.name}</h1>
      <Image
        style={{ width: '100%' }}
        width={res.data.project.image.width}
        height={res.data.project.image.height}
        src={res.data.project.image.url}
        alt="project image"
      />
      <DescriptionUpdateForm
        defaultValue={res.data.project.description}
        id={res.data.project.id}
      />
    </div>
  );
}
