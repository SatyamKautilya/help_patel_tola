import SkillVideosClient from '../SkillVideosClient';
import { normalizeSkillId } from '../skillParams';

export default function KaushalSkillVideosPage({ params }) {
	const skillId = normalizeSkillId(params?.skillId);
	return <SkillVideosClient skillId={skillId} />;
}
