import React, { useEffect, useState } from 'react';

export const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(onFinish, 500); // Wait for transition
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`absolute inset-0 z-[60] bg-[#1E3A8A] flex flex-col items-center justify-center text-white transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative">
        <h1 className="font-serif font-bold text-6xl italic tracking-tight">MyLegS</h1>
        <div className="absolute -bottom-2 w-full h-1 bg-[#F59E0B]"></div>
      </div>
      <p className="mt-4 text-blue-200 text-xs font-bold tracking-normal uppercase">Malaysian Legal System</p>
    </div>
  );
};