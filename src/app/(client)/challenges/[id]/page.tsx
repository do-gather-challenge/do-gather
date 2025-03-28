import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Tag from '@/components/ui/tag';
import ChallengeDetailInfoField from '@/components/features/challenges/detail/challenge-detail-info-field';
import ChallengeDetailShareButton from '@/components/features/challenges/detail/challenge-detail-share-button';
import ChallengeDetailBackButton from '@/components/features/challenges/detail/challenge-detail-back-button';
import ChallengeDetailJoinButton from '@/components/features/challenges/detail/challenge-detail-join-button';
import ChallengeDetailCompleteButton from '@/components/features/challenges/detail/challenge-detail-complete-button';
import { isValidNumber } from '@/lib/utils/validate.util';
import { fetchGetChallengeWithParticipation } from '@/lib/api/challenge.api';
import ImageVideoSize from '@/constants/image.constant';
import DEFAULT_CHALLENGE_IMAGE from '@/../public/images/default-challenge.jpg';
import ChallengeDetailLogSection from '@/components/features/challenges/detail/challenge-detail-log-section';
import { getUserInfo } from '@/lib/api/user-Info.api';
import URL from '@/constants/app-url.constant';

type ChallengeDetailPageProps = {
  params: { id: string };
};

export const generateMetadata = async ({ params: { id } }: ChallengeDetailPageProps) => {
  const challenge = await fetchGetChallengeWithParticipation(Number(id));
  if (!challenge) return;

  return {
    title: challenge.title,
    description: challenge.description
  };
};

const ChallengeDetailPage = async ({ params: { id } }: ChallengeDetailPageProps) => {
  if (!isValidNumber(id)) return notFound();
  const challenge = await fetchGetChallengeWithParticipation(Number(id));
  const user = await getUserInfo();

  if (!challenge) return notFound();

  return (
    <section className="p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Tag category={challenge.category} />
        <h2 className="text-xl font-semibold md:text-2xl">{challenge.title}</h2>
        <ChallengeDetailShareButton
          title={challenge.title}
          challengeImage={challenge.challengeImage}
          description={challenge.description}
        />
      </div>
      <div className="space-y-4 p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <section>
            <figure className="mb-2 aspect-video w-full overflow-hidden rounded">
              <Image
                src={challenge.challengeImage || DEFAULT_CHALLENGE_IMAGE}
                alt="thumbnail"
                className="h-full w-full rounded-t-md object-cover object-center"
                width={ImageVideoSize.WIDTH}
                height={ImageVideoSize.HEIGHT}
                priority
              />
            </figure>
            <ChallengeDetailJoinButton challengeId={challenge.id} isParticipating={challenge.isParticipating} />
          </section>
          <section className="flex h-full flex-col gap-2 overflow-hidden">
            <ChallengeDetailLogSection challengeId={challenge.id} />
            <ChallengeDetailCompleteButton
              challengeId={challenge.id}
              isParticipating={challenge.isParticipating}
              isCompleted={challenge.isCompleted}
            />
          </section>
        </div>
        <section className="flex flex-col gap-2 md:justify-between">
          <ChallengeDetailInfoField type="진행 기간">
            <span className="whitespace-nowrap">{challenge.startDate}</span> ~{' '}
            <span className="whitespace-nowrap">{challenge.finishDate}</span>
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
      <div className="flex justify-center gap-4">
        <ChallengeDetailBackButton />
        {user.userId === challenge.creatorId && (
          <Link
            href={URL.CHALLENGES_POST_ID(challenge.id)}
            className="flex items-center justify-center rounded border border-black px-3 hover:bg-black/20"
          >
            챌린지 수정
          </Link>
        )}
      </div>
    </section>
  );
};
export default ChallengeDetailPage;
