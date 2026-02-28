'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, Fish, TestTube, Gem, Waves, Sun, Droplet, Play, Pause, RotateCcw, Droplets, Flame, ZapOff, FilterX, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';

function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blue-950 via-blue-900 to-cyan-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-200"
        >
          🌊 探秘蓝色宝库
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-2xl text-cyan-100/80 max-w-2xl mx-auto font-light"
        >
          海洋资源综合利用、制盐与淡化跨学科实践
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-12 flex flex-col items-center text-cyan-200/60"
      >
        <span className="text-sm mb-2 uppercase tracking-widest">下滑开启探索</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}

const resources = [
  {
    id: 1,
    title: "海洋生物资源",
    icon: Fish,
    detail: "鱼虾贝藻",
    usage: "食物来源、提取医用原料（如海带提碘）、工业原料。",
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400"
  },
  {
    id: 2,
    title: "海洋化学资源",
    icon: TestTube,
    detail: "海盐、镁、溴、淡水",
    usage: "海水淡化、晒盐提纯、工业制取金属镁和溴素。",
    color: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400"
  },
  {
    id: 3,
    title: "海洋矿产资源",
    icon: Gem,
    detail: "可燃冰、锰结核、海底油气",
    usage: "作为未来清洁能源和传统化石能源的补充。",
    color: "from-purple-500/20 to-indigo-500/20",
    iconColor: "text-purple-400"
  },
  {
    id: 4,
    title: "海洋动力资源",
    icon: Waves,
    detail: "潮汐能、波浪能",
    usage: "建设潮汐发电站、波浪发电站，提供绿色可再生电能。",
    color: "from-blue-500/20 to-sky-500/20",
    iconColor: "text-blue-400"
  }
];

function ResourceClassification() {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Activity 1: 资源分类</h2>
        <p className="text-slate-400">了解海洋赋予我们的四大类宝贵财富</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((res, index) => (
          <motion.div
            key={res.id}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            whileHover="hover"
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
              hover: { y: -8, transition: { duration: 0.2 } }
            }}
            className={`p-6 rounded-2xl bg-gradient-to-br ${res.color} border border-white/10 backdrop-blur-md shadow-xl transition-all`}
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div 
                variants={{
                  hover: { 
                    scale: [1, 1.15, 1],
                    rotate: [0, 10, -10, 0],
                    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                  }
                }}
                className={`p-3 rounded-xl bg-white/5 ${res.iconColor}`}
              >
                <res.icon className="w-6 h-6" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white">{res.title}</h3>
            </div>
            <div className="space-y-2 text-sm md:text-base">
              <p><span className="text-slate-400">包含：</span><span className="text-slate-200">{res.detail}</span></p>
              <p><span className="text-slate-400">用途：</span><span className="text-slate-200">{res.usage}</span></p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function SeaSaltProduction() {
  const [evaporation, setEvaporation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [crystals, setCrystals] = useState<Array<{id: number, left: string, bottom: string, size: number, rotation: number, appearThreshold: number}>>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setEvaporation((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.5;
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    setTimeout(() => {
      setCrystals(
        Array.from({ length: 120 }).map((_, i) => ({
          id: i,
          left: `${Math.random() * 90 + 5}%`,
          bottom: `${Math.random() * 25}%`,
          size: Math.random() * 5 + 2,
          rotation: Math.random() * 360,
          appearThreshold: Math.random() * 60 + 20
        }))
      );
    }, 0);
  }, []);

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Activity 2: 海水晒盐模拟</h2>
        <p className="text-slate-400">通过控制日照与风力，观察水分蒸发与盐分析出的过程</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 backdrop-blur-sm space-y-6">
          <div className="relative h-64 w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
            <div 
              className="absolute top-4 right-4 text-yellow-400 transition-opacity duration-300 z-10"
              style={{ opacity: 0.2 + (evaporation / 100) * 0.8 }}
            >
              <Sun className="w-8 h-8 animate-spin" />
            </div>

            <div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-300 ease-out opacity-80"
              style={{ height: `${100 - evaporation * 0.8}%` }}
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-white/20"></div>
            </div>

            {crystals.map((crystal) => {
              // Fade in over a 20% range of the slider once the threshold is hit
              const opacity = evaporation > crystal.appearThreshold 
                ? Math.min(1, (evaporation - crystal.appearThreshold) / 20)
                : 0;
              
              return (
                <div
                  key={crystal.id}
                  className="absolute bg-white rounded-sm shadow-[0_0_6px_rgba(255,255,255,0.9)] transition-all duration-200"
                  style={{
                    left: crystal.left,
                    bottom: crystal.bottom,
                    width: `${crystal.size}px`,
                    height: `${crystal.size}px`,
                    opacity: opacity,
                    transform: `rotate(${crystal.rotation + (opacity * 45)}deg) scale(${opacity > 0 ? 0.3 + opacity * 0.7 : 0})`
                  }}
                />
              );
            })}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-sm text-slate-400">
              <span>初始海水</span>
              <span className="text-yellow-400 flex items-center gap-1"><Sun className="w-4 h-4"/> 增加日照与风力 (加速蒸发)</span>
              <span>粗盐析出</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  if (evaporation >= 100) setEvaporation(0);
                  setIsPlaying(!isPlaying);
                }}
                className="p-2 rounded-full bg-cyan-900/50 text-cyan-400 hover:bg-cyan-800/50 hover:text-cyan-300 transition-colors"
                title={isPlaying ? "暂停" : "播放"}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button 
                onClick={() => { setEvaporation(0); setIsPlaying(false); }}
                className="p-2 rounded-full bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300 transition-colors"
                title="重置"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={evaporation}
                onChange={(e) => {
                  setEvaporation(Number(e.target.value));
                  setIsPlaying(false);
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-cyan-950/30 border border-cyan-500/20 p-6 rounded-2xl"
          >
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">原理剖析</h3>
            <p className="text-slate-300 leading-relaxed">
              海水晒盐利用的是<strong className="text-cyan-300">蒸发结晶</strong>原理。因为氯化钠（NaCl）的溶解度受温度变化影响不大，不适合降温结晶，必须通过风吹日晒蒸发溶剂使盐析出（粗盐）。
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-4"
          >
            <h3 className="text-xl font-semibold text-white mb-3">市售食盐科普</h3>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <span className="text-2xl">🧂</span>
                <div>
                  <h4 className="font-medium text-slate-200">普通加碘盐</h4>
                  <p className="text-sm text-slate-400">含碘酸钾（KIO3），预防甲状腺肿大。</p>
                </div>
              </div>
              <div className="h-px bg-slate-800 w-full"></div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl">🧂</span>
                <div>
                  <h4 className="font-medium text-slate-200">低钠盐</h4>
                  <p className="text-sm text-slate-400">用氯化钾（KCl）替换部分NaCl，减钠增钾，适合高血压人群。</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const tabs = [
  {
    id: 'thermal',
    label: '热法 (多级闪蒸)',
    pros: '技术成熟，水质极高。',
    proIcon: Droplets,
    cons: '消耗大量热能，成本高。',
    conIcon: Flame
  },
  {
    id: 'membrane',
    label: '膜法 (反渗透)',
    pros: '能耗相对较低，应用最广。',
    proIcon: ZapOff,
    cons: '需要高压，反渗透膜易污染，需定期更换。',
    conIcon: FilterX
  },
  {
    id: 'electro',
    label: '电渗析法',
    pros: '对原水要求低。',
    proIcon: ShieldCheck,
    cons: '耗电量大，多用于苦咸水脱盐。',
    conIcon: Zap
  }
];

function SeawaterDesalination() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Activity 3: 海水淡化技术</h2>
        <p className="text-slate-400">对比现代工业淡化技术与简易自制装置</p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-2 md:p-6 backdrop-blur-sm">
        <div className="flex flex-wrap md:flex-nowrap gap-2 mb-6 bg-slate-950/50 p-2 rounded-2xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm md:text-base font-medium transition-all relative ${
                activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-cyan-600/20 border border-cyan-500/30 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="min-h-[120px] px-4">
          <AnimatePresence mode="wait">
            {tabs.map((tab) => activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-xl">
                    <h4 className="text-emerald-400 font-medium mb-3 flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20">
                        <tab.proIcon className="w-3.5 h-3.5" />
                      </span>
                      优点
                    </h4>
                    <p className="text-slate-300 text-sm md:text-base">{tab.pros}</p>
                  </div>
                  <div className="bg-rose-950/20 border border-rose-500/20 p-4 rounded-xl">
                    <h4 className="text-rose-400 font-medium mb-3 flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20">
                        <tab.conIcon className="w-3.5 h-3.5" />
                      </span>
                      缺点
                    </h4>
                    <p className="text-slate-300 text-sm md:text-base">{tab.cons}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-cyan-500/30 rounded-3xl p-8"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 w-24 h-24 rounded-full bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center relative">
            <Sun className="w-10 h-10 text-yellow-400 absolute top-4 left-4" />
            <Droplet className="w-8 h-8 text-cyan-400 absolute bottom-4 right-4" />
          </div>
          
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-xl font-bold text-white">自制简易淡化装置</h3>
            <p className="text-slate-300 leading-relaxed">
              <strong className="text-cyan-300">我的设计思路：</strong>利用自然太阳能，海水受热<strong className="text-white">蒸发</strong>成水蒸气，遇冷凝结在保鲜膜上，利用重力<strong className="text-white">冷凝</strong>汇聚滴入收集碗中。
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function FutureVision() {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white">未来愿景</h2>
        <p className="text-slate-400">海洋资源的综合利用与可持续发展</p>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
      >
        <Image 
          src="https://picsum.photos/seed/ocean-future/1920/1080?blur=2" 
          alt="Future Ocean City" 
          fill 
          className="object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">深海科技与生态共存</h3>
          <p className="text-slate-300 max-w-2xl">
            未来的海洋开发将更加注重生态平衡，通过清洁能源驱动的海水淡化与矿物提取综合平台，实现真正的零排放。
          </p>
        </div>
      </motion.div>
    </section>
  );
}

function Conclusion() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
            <span className="text-4xl">💡</span> 交流与反思
          </h2>
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl text-left">
            <p className="text-slate-300 leading-relaxed md:text-lg">
              本次活动让我了解到海洋是巨大的宝库。在探索中我发现，海水淡化技术虽然解决了缺水问题，但会产生大量高浓度盐水（浓海水）。如果直接排海会破坏生态。未来的发展方向应是“海水淡化与化学资源提取联合”，利用浓海水提溴、提镁或制盐，实现真正的<strong className="text-cyan-400 font-semibold">零排放</strong>和可持续利用！
            </p>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-slate-900">
          <p className="text-sm text-slate-500 font-mono">
            Built with Next.js for High School Chemistry Project
          </p>
          <p className="text-sm text-slate-400 mt-2 font-medium">
            署名：陆博仁
          </p>
        </div>
      </div>
    </footer>
  );
}

function MarineApp() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30">
      <HeroSection />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-32">
        <ResourceClassification />
        <SeaSaltProduction />
        <SeawaterDesalination />
        <FutureVision />
      </div>
      <Conclusion />
    </main>
  );
}

export default function Page() {
  return <MarineApp />;
}
