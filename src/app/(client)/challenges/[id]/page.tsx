import { fetchGetChallengeWithParticipation } from '@/lib/api/challenge.api';
import { isValidNumber } from '@/lib/utils/validate.util';
import { notFound } from 'next/navigation';

type ChallengeDetailPageProps = {
  params: { id: string };
};
const ChallengeDetailPage = async ({ params: { id } }: ChallengeDetailPageProps) => {
  if (!isValidNumber(id)) return notFound();
  const challenge = await fetchGetChallengeWithParticipation(Number(id));

  if (!challenge) return notFound();

  return <div>ChallengeDetailPage</div>;
};
export default ChallengeDetailPage;
