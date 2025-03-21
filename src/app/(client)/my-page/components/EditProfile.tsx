import Image from 'next/image';
import React from 'react';
import DEFAULT_IMAGE from '/public/images/default_profile.png';

const EditProfile = () => {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-5">
        <Image src={DEFAULT_IMAGE} alt="profile" width={200} height={200} className="m-5 mt-10 rounded-full" />
        <div>input 위치</div>
        <div>button 위치</div>
      </div>
      <div>챌린지 현황 COUNT 노출 위치</div>
    </div>
  );
};

export default EditProfile;
