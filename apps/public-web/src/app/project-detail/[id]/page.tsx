import { ProjectDetailView } from '../../../views/ProjectDetail/index';

export default async function ProjectDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const projectId = parseInt(params.id);

  return <ProjectDetailView projectId={projectId} />;
}
