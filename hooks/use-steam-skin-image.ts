// hooks/useSteamSkinImage.ts
import { useState, useEffect } from 'react';

interface UseSteamSkinImageProps {
  marketHashName: string;
  enableFallback?: boolean;
}

interface UseSteamSkinImageReturn {
  imageUrl: string;
  loading: boolean;
  error: string | null;
}

export const useSteamSkinImage = ({
  marketHashName,
  enableFallback = true
}: UseSteamSkinImageProps): UseSteamSkinImageReturn => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkinImage = async () => {
      if (!marketHashName?.trim()) {
        setError('Market hash name is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Кодируем название для URL
        const encodedName = encodeURIComponent(marketHashName.trim());
        
        // Основной URL Steam
        const steamImageUrl = `https://steamcommunity-a.akamaihd.net/economy/image/class/730/${encodedName}`;
        
        // Альтернативный URL
        const fallbackUrl = `https://api.steamapis.com/image/item/730/${encodedName}`;

        // Сначала пробуем основной URL
        const img = new Image();
        
        img.onload = () => {
          setImageUrl(steamImageUrl);
          setLoading(false);
        };
        
        img.onerror = () => {
          if (enableFallback) {
            // Если основной не работает, пробуем fallback
            const fallbackImg = new Image();
            fallbackImg.onload = () => {
              setImageUrl(fallbackUrl);
              setLoading(false);
            };
            fallbackImg.onerror = () => {
              setError('Failed to load skin image from all sources');
              setLoading(false);
            };
            fallbackImg.src = fallbackUrl;
          } else {
            setError('Failed to load skin image');
            setLoading(false);
          }
        };
        
        img.src = steamImageUrl;

      } catch (err) {
        setError('Unexpected error occurred');
        setLoading(false);
      }
    };

    fetchSkinImage();
  }, [marketHashName, enableFallback]);

  return { imageUrl, loading, error };
};