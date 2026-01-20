'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { websitesDemo, websitevideos, designDemo } from '@/constant';
import { ExternalLink, Play, Monitor, Palette, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(useGSAP);

export const ShowcaseNav = () => {
    const [active, setActive] = useState(false);
    const [view, setView] = useState<'none' | 'websites' | 'videos' | 'design'>('none');
    const container = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentVideo, setCurrentVideo] = useState(0);

    const { contextSafe } = useGSAP({ scope: container });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                toggleActive();
            }
            if (active) {
                if (e.key === '1') setView('websites');
                if (e.key === '2') setView('videos');
                if (e.key === '3') setView('design');
                if (e.key === 'Escape') {
                    if (view !== 'none') setView('none');
                    else setActive(false);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [active, view]);

    const toggleActive = contextSafe(() => {
        const newState = !active;
        setActive(newState);

        if (newState) {
            gsap.to(circleRef.current, {
                scale: 1.2,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                boxShadow: "0 0 40px rgba(255, 255, 255, 0.2)",
            });
            gsap.fromTo(".nav-option",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, delay: 0.2, ease: "power2.out" }
            );
        } else {
            gsap.to(circleRef.current, {
                scale: 1,
                duration: 0.4,
                ease: "power2.inOut",
                backgroundColor: "transparent",
                boxShadow: "0 0 0px rgba(255, 255, 255, 0)",
            });
            setView('none');
        }
    });

    useGSAP(() => {
        if (view !== 'none') {
            gsap.fromTo(".view-content",
                { opacity: 0, scale: 0.95, filter: "blur(10px)" },
                { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "expo.out" }
            );
        }
    }, [view]);

    const nextVideo = () => {
        setCurrentVideo((prev) => (prev + 1) % websitevideos.length);
    };

    const prevVideo = () => {
        setCurrentVideo((prev) => (prev - 1 + websitevideos.length) % websitevideos.length);
    };

    return (
        <div ref={container} className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/90 backdrop-blur-xl">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-500/5 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px]" />
            </div>

            {!active && (
                <div className="text-center space-y-4 animate-pulse">
                    <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-[0.4em]">Press Space to initiate</p>
                    <div className="w-12 h-12 rounded-full border border-zinc-500/20 mx-auto flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-zinc-500" />
                    </div>
                </div>
            )}

            {active && view === 'none' && (
                <div className="flex flex-col items-center gap-12">
                    <div
                        ref={circleRef}
                        className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center relative cursor-pointer"
                        onClick={toggleActive}
                    >
                        <div className="absolute inset-0 rounded-full bg-white/5 animate-ping opacity-20" />
                        <div className="text-white text-[12px] font-bold tracking-widest uppercase">System</div>
                    </div>

                    <div ref={optionsRef} className="flex gap-16">
                        <div className="nav-option flex flex-col items-center gap-3 group cursor-pointer" onClick={() => setView('websites')}>
                            <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-white/40 transition-all group-hover:bg-white/10">
                                <Monitor className="w-6 h-6 text-white/60 group-hover:text-white" />
                            </div>
                            <span className="text-[10px] font-bold text-white/40 group-hover:text-white uppercase tracking-[0.2em] transition-all">1. Websites</span>
                        </div>
                        <div className="nav-option flex flex-col items-center gap-3 group cursor-pointer" onClick={() => setView('videos')}>
                            <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-white/40 transition-all group-hover:bg-white/10">
                                <Play className="w-6 h-6 text-white/60 group-hover:text-white" />
                            </div>
                            <span className="text-[10px] font-bold text-white/40 group-hover:text-white uppercase tracking-[0.2em] transition-all">2. Videos</span>
                        </div>
                        <div className="nav-option flex flex-col items-center gap-3 group cursor-pointer" onClick={() => setView('design')}>
                            <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-white/40 transition-all group-hover:bg-white/10">
                                <Palette className="w-6 h-6 text-white/60 group-hover:text-white" />
                            </div>
                            <span className="text-[10px] font-bold text-white/40 group-hover:text-white uppercase tracking-[0.2em] transition-all">3. Design</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Viewport content */}
            {view !== 'none' && (
                <div className="view-content absolute inset-0 flex flex-col items-center justify-center p-20 z-10">
                    {/* Close Button */}
                    <button
                        onClick={() => setView('none')}
                        className="absolute top-10 right-10 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group"
                    >
                        <X className="w-5 h-5 text-white/40 group-hover:text-white" />
                    </button>

                    {view === 'websites' && (
                        <div className="w-full max-w-6xl space-y-12">
                            <div className="text-center space-y-2">
                                <h2 className="text-4xl font-bold tracking-tight text-white uppercase italic">Digital Entities</h2>
                                <p className="text-zinc-500 text-[12px] font-medium tracking-[0.3em] uppercase">Web Archive 2024</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {websitesDemo.map((site, i) => (
                                    <a
                                        key={i}
                                        href={site.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:border-white/30 transition-all duration-700"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity" />
                                        <img
                                            src={site.image}
                                            alt={site.name}
                                            className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                                        />
                                        <div className="absolute bottom-10 left-10 z-20 space-y-4">
                                            <h3 className="text-3xl font-bold text-white group-hover:translate-x-2 transition-transform duration-500">{site.name}</h3>
                                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 w-fit group-hover:bg-white text-white group-hover:text-black transition-all duration-500">
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Connect Matrix</span>
                                                <ExternalLink className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {view === 'videos' && (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-12 relative">
                            <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl shadow-white/5 group">
                                <video
                                    ref={videoRef}
                                    key={websitevideos[currentVideo]}
                                    autoPlay
                                    muted
                                    loop
                                    className="w-full h-full object-cover"
                                >
                                    <source src={websitevideos[currentVideo]} type="video/mp4" />
                                </video>

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">Signal 0{currentVideo + 1}</span>
                                            <div className="h-0.5 w-12 bg-white/20" />
                                        </div>
                                        <h3 className="text-4xl font-bold text-white tracking-widest italic uppercase">Transmission</h3>
                                    </div>
                                </div>

                                <div className="absolute inset-y-0 left-0 w-24 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={prevVideo} className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="absolute inset-y-0 right-0 w-24 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={nextVideo} className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {websitevideos.map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "h-1 transition-all duration-500 rounded-full",
                                            currentVideo === i ? "w-12 bg-white" : "w-4 bg-white/20"
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {view === 'design' && (
                        <div className="max-w-2xl text-center space-y-12">
                            <div className="space-y-6">
                                <div className="w-24 h-24 rounded-3xl border border-white/10 bg-white/5 flex items-center justify-center mx-auto mb-8 animate-pulse">
                                    <Palette className="w-10 h-10 text-white/80" />
                                </div>
                                <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-none">Design Protocol</h2>
                                <p className="text-zinc-500 text-lg font-medium leading-relaxed">
                                    Accessing the blueprint of future aesthetics. This prototype contains the core visual language systems and motion protocols.
                                </p>
                            </div>

                            <a
                                href={designDemo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-4 bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-[12px] tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10"
                            >
                                Initiate Bridge <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    )}
                </div>
            )}

            {/* Matrix HUD decorations */}
            <div className="absolute bottom-10 left-10 pointer-events-none opacity-20 hidden md:block">
                <div className="text-[10px] font-mono text-white/40 space-y-1 uppercase">
                    <p>Core Status: Nominal</p>
                    <p>Lat: 34.0522° N, Lon: 118.2437° W</p>
                    <p>Buffer: 1024.42kbps</p>
                    <p>Access Level: Admin</p>
                </div>
            </div>

            <div className="absolute bottom-10 right-10 pointer-events-none opacity-20 hidden md:block">
                <div className="text-right text-[10px] font-mono text-white/40 space-y-1 uppercase">
                    <p>Scan freq: 60hz</p>
                    <p>Rendering: WebGL/GSAP</p>
                    <p>Protocol: futuristic-v4</p>
                    <p>Session ID: 489-002-XC</p>
                </div>
            </div>
        </div>
    );
};
