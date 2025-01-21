import Image from 'next/image';

export default function Home() {
  //   const { data } = useProjectsQuery();

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-[3rem] mb-4">Loading</h1>

      {/* <div className="grid grid-cols-3 gap-4">
        {data?.projects?.map((project) => (
          <div
            key={project.id}
            className="border rounded-[0.5rem] overflow-hidden"
          >
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
        ))}
      </div> */}
    </div>
  );
}
