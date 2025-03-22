import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

type RoundedImageProps = {
  className: string,
  src: string,
  alt: string,
  fallback?: string,
  fallbackClassName?: string,
}
const RoundedImage = ( {className, src, alt, fallback='No Image', fallbackClassName}: RoundedImageProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={alt} className="object-cover" />
      <AvatarFallback className={fallbackClassName}>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default RoundedImage;
