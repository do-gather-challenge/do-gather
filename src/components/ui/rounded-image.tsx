import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

type RoundedImageProps = {
  className: string,
  src: string,
  alt?: string,
  fallback?: string,
}
const RoundedImage = ( {className, src, alt='default', fallback='No Image'}: RoundedImageProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={alt} className="object-cover" />
      <AvatarFallback className={className}>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default RoundedImage;
