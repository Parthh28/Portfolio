"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);
    const [yanking, setYanking] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const fogParticles = Array.from({ length: 15 }).map((_, i) => {
        const left = (Math.abs(Math.sin(i * 13.5)) * 100).toFixed(2);
        const width = (Math.abs(Math.cos(i * 7.2)) * 100 + 50).toFixed(2);
        const height = (Math.abs(Math.sin(i * 4.1)) * 100 + 50).toFixed(2);
        const delay = (Math.abs(Math.cos(i * 9.3)) * 5).toFixed(2);
        const duration = (Math.abs(Math.sin(i * 2.7)) * 4 + 4).toFixed(2);
        return {
            left: `${left}%`,
            width: `${width}px`,
            height: `${height}px`,
            delay: `${delay}s`,
            duration: `${duration}s`
        };
    });

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        projectType: "",
        contactNumber: ""
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const formRef = useRef<HTMLFormElement>(null);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = "Identity Required";
        if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid Frequency";
        if (!formData.projectType) newErrors.projectType = "Mission Type Required";
        if (formData.contactNumber && !/^\d+$/.test(formData.contactNumber)) newErrors.contactNumber = "Numeric Digits Only";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        if (!validate()) return;

        setSending(true);

        // EmailJS Integration
        // Ensure you have NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env.local
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_id_placeholder";
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_id_placeholder";
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "public_key_placeholder";

        console.log("EmailJS Config:", {
            serviceId: serviceId === "service_id_placeholder" ? "MISSING" : "LOADED",
            templateId: templateId === "template_id_placeholder" ? "MISSING" : "LOADED",
            publicKey: publicKey === "public_key_placeholder" ? "MISSING" : "LOADED"
        });

        if (serviceId === "service_id_placeholder") {
            console.warn("EmailJS keys missing. Simulating send.");
            // Simulate for dev if keys missing
            startAnimation();
            return;
        }

        emailjs.send(
            serviceId,
            templateId,
            {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.contactNumber,
                message: formData.projectType
            },
            publicKey
        ).then((response) => {
            console.log("EmailJS Success:", response.status, response.text);
            startAnimation();
        }, (error) => {
            console.error("EmailJS Error:", error);
            setSending(false);
            setErrorMsg("INTERFERENCE DETECTED. TRANSMISSION FAILED.");
        });
    };

    const startAnimation = () => {
        setSending(false);
        setYanking(true);
        setTimeout(() => {
            setSent(true);
            setYanking(false);
        }, 1200);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    return (
        <section className="relative w-full min-h-screen bg-brick flex flex-col items-center justify-center overflow-hidden py-20 bg-[#121212]">
            {/* Neon Glow (Rim Light) */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-spider-red/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-0 right-20 w-[300px] h-[300px] bg-spider-blue/20 blur-[100px] rounded-full point-events-none" />

            {/* Pulsing Spider-Logo Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <svg viewBox="0 0 100 100" className="w-[800px] h-[800px] animate-pulse">
                    {/* Simplified Spider Emblem */}
                    <path d="M50 20 C 60 20 65 30 65 40 C 65 55 55 60 50 70 C 45 60 35 55 35 40 C 35 30 40 20 50 20 Z" fill="currentColor" className="text-spider-red" />
                    {/* Legs */}
                    <path d="M35 40 L 10 20 M 35 45 L 5 45 M 35 50 L 10 70 M 35 55 L 15 90" stroke="currentColor" strokeWidth="2" fill="none" className="text-spider-red" />
                    <path d="M65 40 L 90 20 M 65 45 L 95 45 M 65 50 L 90 70 M 65 55 L 85 90" stroke="currentColor" strokeWidth="2" fill="none" className="text-spider-red" />
                </svg>
            </div>

            {/* Fog / Steam Vents */}
            <div className="absolute bottom-0 inset-x-0 h-64 pointer-events-none z-0">
                {fogParticles.map((particle, i) => (
                    <div
                        key={i}
                        suppressHydrationWarning
                        className="animate-fog absolute bottom-[-50px] bg-white/5 blur-xl rounded-full"
                        style={{
                            left: particle.left,
                            width: particle.width,
                            height: particle.height,
                            animationDelay: particle.delay,
                            animationDuration: particle.duration
                        }}
                    />
                ))}
                {/* Puddle Reflection */}
                <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/90 to-transparent backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 w-full max-w-lg px-6">
                <AnimatePresence mode="wait">
                    {!sent ? (
                        <motion.div
                            key="form"
                            initial={{ y: 0, opacity: 1, scale: 1 }}
                            animate={yanking ? {
                                y: -1200,
                                opacity: 0,
                                scale: 0.1,
                                rotate: 720,
                                borderRadius: "100%"
                            } : {
                                y: 0,
                                opacity: 1,
                                scale: 1,
                                rotate: 0
                            }}
                            transition={{ duration: 0.8, ease: "backIn" }}
                            className="bg-white/5 backdrop-blur-md p-8 rounded-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden group"
                        >
                            {/* Texture Overlay */}
                            <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none" />

                            <h2 className="text-3xl font-black text-spider-white mb-8 tracking-tighter uppercase distressed-text text-center">
                                SECURE <span className="text-spider-red">LINE</span>
                            </h2>

                            {errorMsg && (
                                <div className="mb-4 text-center text-red-500 font-mono text-xs tracking-widest bg-red-500/10 py-2 border border-red-500/30 flex items-center justify-center gap-2">
                                    <AlertCircle className="w-4 h-4" /> {errorMsg}
                                </div>
                            )}

                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative z-10 mt-10">
                                <InputField
                                    name="name"
                                    label="SUBJECT ID // NAME"
                                    placeholder="ENTER IDENTITY"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <InputField
                                    name="email"
                                    label="COMM LINK // EMAIL"
                                    placeholder="ENTER FREQUENCY"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <InputField
                                    name="contactNumber"
                                    label="EMERGENCY LINE // PHONE"
                                    placeholder="ENTER DIGITS"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    error={errors.contactNumber}
                                />

                                <div className="group relative">
                                    <label className="block text-neon-cyan/70 font-mono text-xs tracking-widest mb-1 pl-1">
                                        MISSION BRIEFING // DETAILS
                                    </label>
                                    <textarea
                                        name="projectType"
                                        placeholder="DESCRIBE OBJECTIVE..."
                                        rows={4}
                                        suppressHydrationWarning
                                        value={formData.projectType}
                                        onChange={handleChange}
                                        className={cn(
                                            "w-full bg-white/5 border border-white/10 rounded-sm py-4 px-4 text-spider-white font-bold tracking-widest placeholder:text-white/20 focus:outline-none transition-all duration-300 backdrop-blur-sm resize-none",
                                            "focus:border-spider-red focus:shadow-[0_0_15px_rgba(177,19,19,0.4)]",
                                            errors.projectType ? "border-red-500/50" : ""
                                        )}
                                    />
                                    {errors.projectType && <span className="absolute right-2 top-8 text-xs text-red-400 font-mono">{errors.projectType}</span>}
                                    <div className="absolute inset-0 pointer-events-none rounded-sm focus-ripple opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                </div>

                                <button
                                    type="submit"
                                    disabled={sending}
                                    suppressHydrationWarning
                                    className="w-full py-4 mt-4 bg-spider-red hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-black tracking-[0.2em] uppercase transition-all duration-300 clip-path-polygon hover:shadow-[0_0_20px_rgba(220,38,38,0.6)] flex items-center justify-center gap-3 group/btn"
                                >
                                    <span>{sending ? "ENCRYPTING..." : "Signal Spidey"}</span>
                                    {!sending && <Send className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />}
                                </button>
                            </form>

                            {/* Web covering the ball on exit (Visual only) */}
                            {yanking && (
                                <div className="absolute inset-0 bg-white/80 z-50 flex items-center justify-center">
                                    <div className="w-full h-full border-4 border-white rounded-full animate-spin" />
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center justify-center text-center p-8 bg-spider-blue/20 backdrop-blur-md rounded-lg border border-neon-cyan/30 shadow-[0_0_30px_rgba(69,162,158,0.2)]"
                        >
                            <div className="w-20 h-20 bg-neon-cyan/10 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle className="w-10 h-10 text-neon-cyan animate-pulse" />
                            </div>
                            <h3 className="text-2xl font-bold text-spider-white tracking-widest uppercase mb-2">
                                Message Delivered to HQ
                            </h3>
                            <p className="text-neon-cyan/80 font-mono text-xs">
                                {"// ENCRYPTION: MAX LEVEL"} <br /> {"// STATUS: PENDING REVIEW"}
                            </p>
                            <button
                                onClick={() => { setSent(false); setYanking(false); setFormData({ name: "", email: "", projectType: "", contactNumber: "" }); }}
                                className="mt-8 text-xs text-white/40 hover:text-white underline tracking-widest"
                            >
                                ESTABLISH NEW LINK
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer */}
            <footer className="absolute bottom-4 text-center w-full z-10">
                <p className="text-[10px] md:text-xs font-serif text-white/30 tracking-widest uppercase">
                    STORY BY Parth <span className="mx-2">|</span> PHOTOGRAPHY BY PETER PARKER
                </p>
            </footer>
        </section>
    );
}

function InputField({ name, label, placeholder, value, onChange, error }: { name: string, label: string, placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, error?: string }) {
    return (
        <div className="group relative">
            <label className="block text-neon-cyan/70 font-mono text-xs tracking-widest mb-1 pl-1">
                {label}
            </label>
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                suppressHydrationWarning
                className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-sm py-4 px-4 text-spider-white font-bold tracking-widest placeholder:text-white/20 focus:outline-none transition-all duration-300 backdrop-blur-sm",
                    "focus:border-spider-red focus:shadow-[0_0_15px_rgba(177,19,19,0.4)]",
                    error ? "border-red-500/50" : ""
                )}
            />
            {error && <span className="absolute right-2 top-8 text-xs text-red-400 font-mono">{error}</span>}
            {/* Spider-Sense Ripple handled by global CSS on group focus-within if applying to specific element, or we can add it here explicitly */}
            <div className="absolute inset-0 pointer-events-none rounded-sm focus-ripple opacity-0 group-focus-within:opacity-100 transition-opacity" />
        </div>
    );
}
