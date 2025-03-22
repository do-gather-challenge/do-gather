import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

type RoundedImageProps = {
  classname: string,
  src: string,
  alt?: string,
  fallback?: string,
}
const RoundedImage = ( {classname, src, alt='default', fallback='No Image'}: RoundedImageProps) => {
  return (
    <Avatar className={classname}>
      <AvatarImage src={src} alt={alt} className="object-cover" />
      <AvatarFallback className={classname}>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default RoundedImage;
