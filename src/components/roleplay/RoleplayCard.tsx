import React from 'react';
import { RoleplayScenario } from '../../types';
import { MessageSquare, Target, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { getSpeakerAvatar } from '../../utils/characterAvatar';

interface RoleplayCardProps {
  scenario: RoleplayScenario;
  onSelect: (scenario: RoleplayScenario) => void;
}

export const RoleplayCard: React.FC<RoleplayCardProps> = ({ scenario, onSelect }) => {
  const avatarInfo = getSpeakerAvatar(scenario.aiPersona.avatarId);

  const levelBadgeColor = {
    초급: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    중급: 'bg-blue-100 text-blue-700 border-blue-200',
    고급: 'bg-purple-100 text-purple-700 border-purple-200'
  }[scenario.level] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <div className="group bg-white rounded-3xl p-5 md:p-6 border border-slate-200/80 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className={`absolute -right-12 -top-12 w-36 h-36 rounded-full bg-gradient-to-br ${scenario.bgGradient} blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500`} />

      <div className="space-y-4 relative z-10">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl" role="img" aria-label="avatar-emoji">
              {scenario.aiPersona.avatarEmoji}
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              {scenario.categoryName}
            </span>
          </div>
          <span className={`text-[11px] font-black px-2 py-0.5 rounded-full border ${levelBadgeColor}`}>
            {scenario.level}
          </span>
        </div>

        {/* Title & Situation */}
        <div>
          <h3 className="text-base md:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {scenario.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed font-medium">
            {scenario.situation}
          </p>
        </div>

        {/* Role Assignment Card */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <img
              src={avatarInfo.avatarUrl}
              alt={scenario.aiPersona.name}
              className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
            />
            <div className="min-w-0">
              <div className="font-bold text-slate-800 text-[11px] truncate">
                AI: {scenario.aiPersona.name} ({scenario.aiPersona.role})
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                나: {scenario.userRole}
              </div>
            </div>
          </div>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 shrink-0">
            최대 7턴 대화
          </span>
        </div>

        {/* Mission Checklist Preview */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
            <Target size={13} className="text-rose-500" />
            <span>대화 미션 ({scenario.missions.length}개):</span>
          </div>
          <div className="space-y-1">
            {scenario.missions.slice(0, 2).map((m) => (
              <div key={m.id} className="text-[11px] text-slate-500 flex items-start gap-1.5 line-clamp-1">
                <span className="text-blue-500 font-bold shrink-0">•</span>
                <span className="truncate">{m.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
          <MessageSquare size={14} />
          <span>음성/채팅 지원</span>
        </div>

        <button
          type="button"
          onClick={() => onSelect(scenario)}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 active:scale-95 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm group-hover:shadow-blue-500/25"
        >
          <span>대화 시작</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};
