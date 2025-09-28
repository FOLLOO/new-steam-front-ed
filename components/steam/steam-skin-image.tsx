// components/SteamSkinImage.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { useSteamSkinImage } from '@/hooks/use-steam-skin-image';

export interface SteamSkinImageProps {
  marketHashName: string;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  enableFallback?: boolean;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  priority?: boolean;
  quality?: number;
}

export const SteamSkinImage: React.FC<SteamSkinImageProps> = ({
  marketHashName,
  width = 300,
  height = 200,
  className = '',
  alt,
  enableFallback = true,
  loadingComponent,
  errorComponent,
  priority = false,
  quality = 85,
}) => {
  const { imageUrl, loading, error } = useSteamSkinImage({
    marketHashName,
    enableFallback,
  });

  // Кастомный alt текст
  const imageAlt = alt || `CS2 Skin - ${marketHashName}`;

  // Компонент загрузки
  if (loading) {
    return loadingComponent || (
      <div 
        className={`flex items-center justify-center bg-gray-200 animate-pulse ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Loading...</span>
      </div>
    );
  }

  // Компонент ошибки
  if (error || !imageUrl) {
    return errorComponent || (
      <div 
        className={`flex items-center justify-center bg-red-100 border border-red-300 ${className}`}
        style={{ width, height }}
      >
        <span className="text-red-600 text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        className="object-cover "
        onError={(e) => {
          // Fallback для ошибок Next.js Image
          e.currentTarget.src = '/images/default-skin.png';
        }}
      />
    </div>
  );
};

export default SteamSkinImage;