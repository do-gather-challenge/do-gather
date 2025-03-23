import { ReactNode } from 'react';

type ChallengeDetailInfoFieldProps = {
  type: string;
  children: ReactNode;
};
const ChallengeDetailInfoField = ({ type, children }: ChallengeDetailInfoFieldProps) => {
  return (
    <div className="flex flex-wrap items-center">
      <span className="bg-gray mr-2 rounded px-2 py-1">{type}</span>
      {children}
    </div>
  );
};
export default ChallengeDetailInfoField;
