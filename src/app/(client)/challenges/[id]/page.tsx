import Image from 'next/image';
import { notFound } from 'next/navigation';
import Tag from '@/components/ui/tag';
import ChallengeDetailInfoField from '@/components/features/challenges/detail/challenge-detail-info-field';
import ChallengeDetailShareButton from '@/components/features/challenges/detail/challenge-detail-share-button';
import ChallengeDetailBackButton from '@/components/features/challenges/detail/challenge-detail-back-button';
import ChallengeDetailJoinButton from '@/components/features/challenges/detail/challenge-detail-join-button';
import ChallengeDetailCompleteButton from '@/components/features/challenges/detail/challenge-detail-complete-button';
import DEFAULT_CHALLENGE_IMAGE from '@/../public/images/default-challenge.jpg';
import { isValidNumber } from '@/lib/utils/validate.util';
import { fetchGetChallengeWithParticipation } from '@/lib/api/challenge.api';

type ChallengeDetailPageProps = {
  params: { id: string };
};
const ChallengeDetailPage = async ({ params: { id } }: ChallengeDetailPageProps) => {
  if (!isValidNumber(id)) return notFound();
  const challenge = await fetchGetChallengeWithParticipation(Number(id));

  if (!challenge) return notFound();

  return (
    <section className="p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Tag category={challenge.category} />
        <h2 className="text-xl font-semibold md:text-2xl">{challenge.title}</h2>
        <ChallengeDetailShareButton />
      </div>
      <div className="space-y-4 p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <section>
            <figure className="mb-2 aspect-video w-full overflow-hidden rounded">
              <Image
                src={challenge.challengeImage || DEFAULT_CHALLENGE_IMAGE}
                alt="thumbnail"
                className="h-full w-full rounded-t-md object-cover object-center"
                sizes="100vw"
                priority
              />
            </figure>
            <ChallengeDetailJoinButton />
          </section>
          <section className="flex flex-col gap-2">
            <div className="min-h-[200px] flex-1 border border-red-500 md:min-h-0">챌린지 참여 로그 세션</div>
            <ChallengeDetailCompleteButton />
          </section>
        </div>
        <section className="flex flex-col gap-2 md:flex-row md:justify-between">
          <ChallengeDetailInfoField type="진행 기간">
            <span className="whitespace-nowrap">{challenge.startDate}</span> ~{' '}
            <span className="whitespace-nowrap">{challenge.startDate}</span>
          </ChallengeDetailInfoField>
          <ChallengeDetailInfoField type="반복 일정">{challenge.executeDays.join(' ')}</ChallengeDetailInfoField>
          <ChallengeDetailInfoField type="참여 인원">
            <span className="text-lg font-semibold">{challenge.participantCount}</span> 명
          </ChallengeDetailInfoField>
        </section>
        <section className="mt-8">
          <h3 className="text-xl font-semibold">챌린지 소개</h3>
          <p className="mt-2 whitespace-pre-wrap">{challenge.description}</p>
        </section>
      </div>
      <ChallengeDetailBackButton />
    </section>
  );
};
export default ChallengeDetailPage;
