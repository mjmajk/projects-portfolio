'use client';

import { useProjectsQuery } from '../../generated/generated';

export default function Home() {
  const { data } = useProjectsQuery();

  return (
    <div>
      {data?.projects?.map((project) => (
        <div key={project.id}>{project.name}</div>
      ))}
    </div>
  );
}
