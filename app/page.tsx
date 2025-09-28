// app/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Users, Star, Rocket, CheckCircle, ArrowDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter()
  
  const handleGetStarted = () => {
    router.push('/login')
  };

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Мгновенная скорость",
      description: "Оптимизированная производительность для максимальной эффективности работы",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Безопасность",
      description: "Передовые технологии защиты ваших данных и конфиденциальности",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Совместная работа",
      description: "Работайте в команде эффективно с нашими инструментами коллаборации",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Инновации",
      description: "Постоянное обновление и внедрение новых технологий",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { number: "99.9%", label: "Время безотказной работы" },
    { number: "50K+", label: "Активных пользователей" },
    { number: "150+", label: "Стран охвата" },
    { number: "24/7", label: "Поддержка" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center">
        {/* Основной фон с градиентами */}
        <div className="absolute inset-0 gradient-primary opacity-90"></div>
        
        {/* Анимированные элементы фона */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-green rounded-full opacity-20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary-blue rounded-full opacity-15 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/2 w-48 h-48 bg-accent-green rounded-full opacity-25 blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.25, 0.15, 0.25],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Сетка */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            {/* Заголовок */}
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-primary-blue to-accent-green bg-clip-text text-transparent">
                INNOVATE
              </span>
            </motion.h1>

            {/* Подзаголовок */}
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl mb-8 text-foreground/80 font-light max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Создаём будущее вместе с вами. 
              <br />
              <span className="text-accent-green font-medium">Инновации</span> начинаются здесь.
            </motion.p>

            {/* Описание */}
            <motion.p
              className="text-base md:text-lg mb-12 text-foreground/60 max-w-xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Откройте для себя новый уровень возможностей. 
              Просто, эффективно, инновационно.
            </motion.p>

            {/* Кнопка начать */}
            <motion.button
              onClick={handleGetStarted}
              className="group relative px-12 py-4 bg-accent-green text-background rounded-full text-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-green to-primary-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <span className="relative z-10 flex items-center justify-center">
                Начать сейчас
                <motion.svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ x: 0 }}
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>

              <motion.div
                className="absolute inset-0 rounded-full border-2 border-accent-green"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.button>
          </motion.div>
        </div>

        {/* Эффект частиц */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="min-h-screen relative bg-background py-20">
        <div className="container mx-auto px-4">
          {/* Заголовок секции */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-blue/10 text-primary-blue rounded-full text-sm font-medium mb-4"
            >
              <Star className="w-4 h-4" />
              Почему выбирают нас
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-blue to-accent-green bg-clip-text text-transparent">
                Преимущества
              </span>
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Откройте для себя все возможности нашей платформы, созданной для вашего успеха
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary-blue/30 transition-all duration-300 hover:shadow-2xl"
              >
                {/* Иконка */}
                <motion.div
                  className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>

                {/* Заголовок */}
                <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary-blue transition-colors">
                  {feature.title}
                </h3>

                {/* Описание */}
                <p className="text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>

                {/* Декоративный элемент */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary-blue/5 to-transparent rounded-tr-2xl rounded-bl-2xl" />
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-blue/10 to-accent-green/10 rounded-3xl p-8 md:p-12 border border-border"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary-blue mb-2">
                    {stat.number}
                  </div>
                  <div className="text-foreground/60 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA в конце секции */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Готовы начать?
            </h3>
            <motion.button
              onClick={handleGetStarted}
              className="group relative px-8 py-3 bg-accent-green text-background rounded-full text-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-green to-primary-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center">
                Присоединиться сейчас
                <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}