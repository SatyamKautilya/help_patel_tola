import SkillHubClient from './SkillHubClient';
import { normalizeSkillId } from './skillParams';

export default function KaushalSkillPage({ params }) {
	const skillId = normalizeSkillId(params?.skillId);
	return <SkillHubClient skillId={skillId} />;
}
