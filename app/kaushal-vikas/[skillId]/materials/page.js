import SkillMaterialsClient from '../SkillMaterialsClient';
import { normalizeSkillId } from '../skillParams';

export default function KaushalSkillMaterialsPage({ params }) {
	const skillId = normalizeSkillId(params?.skillId);
	return <SkillMaterialsClient skillId={skillId} />;
}
