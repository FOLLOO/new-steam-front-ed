'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text = 'Загрузка...',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        className={`relative ${sizeClasses[size]}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Основной вращающийся круг */}
        <motion.div
          className="absolute inset-0 border-4 border-primary-blue/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Акцентный круг */}
        <motion.div
          className="absolute inset-0 border-4 border-transparent rounded-full border-t-accent-green"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Внутренние точки */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent-green rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
        />
        
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-primary-blue rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        />
      </motion.div>
      
      {text && (
        <motion.p
          className={`mt-4 text-foreground/60 ${textSizes[size]} font-medium`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

// Компонент для загрузки страницы
export const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <LoadingSpinner size="lg" text="Загружаем данные..." />
        
        {/* Анимированные точки */}
        <motion.div className="flex justify-center mt-4 space-x-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-primary-blue rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

// Компонент для загрузки контента с скелетоном
export const SkeletonLoader: React.FC<{ type?: 'card' | 'text' | 'image' }> = ({ 
  type = 'card' 
}) => {
  if (type === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-card rounded-2xl p-6 border border-border"
      >
        <div className="flex items-start space-x-4">
          <motion.div
            className="bg-muted rounded-xl w-20 h-20"
            animate={{
              background: [
                'oklch(0.96 0.02 240)',
                'oklch(0.92 0.03 240)',
                'oklch(0.96 0.02 240)',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <div className="flex-1 space-y-3">
            <motion.div
              className="h-4 bg-muted rounded"
              animate={{
                background: [
                  'oklch(0.96 0.02 240)',
                  'oklch(0.92 0.03 240)',
                  'oklch(0.96 0.02 240)',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
            />
            <motion.div
              className="h-3 bg-muted rounded w-3/4"
              animate={{
                background: [
                  'oklch(0.96 0.02 240)',
                  'oklch(0.92 0.03 240)',
                  'oklch(0.96 0.02 240)',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="h-3 bg-muted rounded w-1/2"
              animate={{
                background: [
                  'oklch(0.96 0.02 240)',
                  'oklch(0.92 0.03 240)',
                  'oklch(0.96 0.02 240)',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
          </div>
        </div>
      </motion.div>
    );
  }

  if (type === 'text') {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="h-4 bg-muted rounded"
            animate={{
              background: [
                'oklch(0.96 0.02 240)',
                'oklch(0.92 0.03 240)',
                'oklch(0.96 0.02 240)',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="bg-muted rounded-lg w-full h-48"
      animate={{
        background: [
          'oklch(0.96 0.02 240)',
          'oklch(0.92 0.03 240)',
          'oklch(0.96 0.02 240)',
        ],
      }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  );
};

// Компонент для кнопки с загрузкой
interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  className = '',
  onClick,
}) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={isLoading}
      className={`relative px-6 py-3 bg-accent-green text-background rounded-full font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
      whileHover={!isLoading ? { scale: 1.05 } : {}}
      whileTap={!isLoading ? { scale: 0.95 } : {}}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <motion.div
            className="w-5 h-5 border-2 border-background border-t-transparent rounded-full mr-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          Загрузка...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

// Компонент для прогресс-бара
interface ProgressBarProps {
  progress: number; // от 0 до 100
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className = '',
}) => {
  return (
    <div className={`w-full bg-muted rounded-full h-2 ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-primary-blue to-accent-green rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
};

export default LoadingSpinner;

// useExample
// if(loading){
//   return (
//     <div className="p-8 space-y-8">
//       {/* Простой спиннер */}
//       <div className="text-center">
//         <h3 className="text-xl font-bold mb-4">Простой спиннер</h3>
//         <LoadingSpinner text="Загружаем предметы..." />
//       </div>
//       {/* Кнопка с загрузкой */}
//       <div className="text-center">
//         <h3 className="text-xl font-bold mb-4">Кнопка с загрузкой</h3>
//         <LoadingButton 
//           isLoading={loading}
//           onClick={simulateLoad}
//         >
//           Начать загрузку
//         </LoadingButton>
//       </div>
//       {/* Прогресс-бар */}
//       <div className="max-w-md mx-auto">
//         <h3 className="text-xl font-bold mb-4">Прогресс загрузки</h3>
//         <ProgressBar progress={progress} />
//         <p className="text-center mt-2 text-foreground/60">
//           {progress}% завершено
//         </p>
//       </div>
//       {/* Скелетоны */}
//       <div className="max-w-2xl mx-auto">
//         <h3 className="text-xl font-bold mb-4">Загрузка контента</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <SkeletonLoader type="card" />
//           <SkeletonLoader type="card" />
//           <SkeletonLoader type="text" />
//           <SkeletonLoader type="image" />
//         </div>
//       </div>
//     </div>
//   );
// }