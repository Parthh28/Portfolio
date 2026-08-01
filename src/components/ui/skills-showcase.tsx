"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export interface SkillItem {
  name: string
  level: number
  description?: string
}

const defaultSkills: SkillItem[] = [
  { 
    name: "Front End", 
    level: 98,
    description: "Building responsive, high-performance user interfaces with modern React ecosystems.",
  },
  { 
    name: "Web Design", 
    level: 95,
    description: "Designing visually captivating, modern web aesthetics with dynamic motion and rich hierarchies.",
  },
  { 
    name: "UI/UX", 
    level: 96,
    description: "Crafting intuitive, user-centered digital experiences with seamless micro-interactions.",
  }
]

export function Skills({
  skills = defaultSkills,
  onSkillClick
}: {
  skills?: SkillItem[]
  onSkillClick?: (skill: SkillItem) => void
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col w-full max-w-2xl bg-spider-black/80 border border-stark-cyan/30 rounded-xl p-6 md:p-8 backdrop-blur-md shadow-[0_0_35px_rgba(0,168,255,0.15)]">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-4 w-1 bg-stark-cyan rounded-full shadow-[0_0_10px_#00A8FF]" />
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-stark-cyan font-bold">TECH STACK EXPERTISE</span>
        </div>
        <span className="text-[10px] font-mono text-stark-blue/60">{"// STARK DIAGNOSTIC HUD"}</span>
      </div>

      {/* Skills list */}
      <div className="flex flex-col gap-2">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="group relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onSkillClick && onSkillClick(skill)}
          >
            <div
              className={cn(
                "relative flex flex-col justify-center py-5 px-5 cursor-pointer",
                "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "rounded-lg border",
                hoveredIndex === index 
                  ? "bg-stark-cyan/10 border-stark-cyan/50 shadow-[0_0_25px_rgba(0,245,255,0.2)]" 
                  : "bg-white/[0.02] border-white/5 hover:border-white/10"
              )}
            >
              <div className="flex items-center justify-between w-full">
                {/* Left side - skill name with animated elements */}
                <div className="relative flex items-center gap-3">
                  <div
                    className={cn(
                      "h-6 w-1 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      hoveredIndex === index 
                        ? "bg-stark-cyan scale-y-100 opacity-100 shadow-[0_0_10px_#00F5FF]" 
                        : "bg-white/20 scale-y-50 opacity-40"
                    )}
                  />

                  {/* Skill name */}
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        "text-lg font-mono font-bold tracking-wider transition-all duration-500 uppercase ease-[cubic-bezier(0.16,1,0.3,1)]",
                        hoveredIndex === index ? "text-stark-cyan translate-x-1" : "text-white"
                      )}
                    >
                      {skill.name}
                    </span>
                  </div>
                </div>

                {/* Right side - progress visualization */}
                <div className="flex items-center gap-4">
                  <div className="relative w-32 sm:w-44 h-2 rounded-full overflow-hidden bg-white/10">
                    {/* Background track */}
                    <div className="absolute inset-0 bg-spider-black/50" />

                    {/* Animated fill */}
                    <div
                      className={cn(
                        "absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        "bg-gradient-to-r from-stark-blue via-stark-cyan to-neon-cyan shadow-[0_0_12px_#00F5FF]"
                      )}
                      style={{
                        width: hoveredIndex === index ? `${skill.level}%` : "15%",
                        transitionDelay: hoveredIndex === index ? "50ms" : "0ms",
                      }}
                    />

                    {/* Shine effect on hover */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent",
                        "transition-transform duration-700 ease-out",
                        hoveredIndex === index ? "translate-x-full" : "-translate-x-full"
                      )}
                      style={{
                        transitionDelay: hoveredIndex === index ? "200ms" : "0ms",
                      }}
                    />
                  </div>

                  <div className="relative w-12 overflow-hidden">
                    <span
                      className={cn(
                        "block text-sm font-mono font-bold tabular-nums text-right",
                        "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        hoveredIndex === index
                          ? "text-stark-cyan opacity-100 translate-y-0 blur-0 drop-shadow-neon"
                          : "text-white/60 opacity-70"
                      )}
                    >
                      {skill.level}%
                    </span>
                  </div>
                </div>
              </div>


            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-stark-cyan animate-pulse shadow-[0_0_8px_#00F5FF]" />
          <p className="text-xs font-mono text-stark-blue/70 tracking-wider uppercase">Hover over modules to inspect specs // Click to open diagnostic modal</p>
        </div>
      </div>
    </div>
  )
}
