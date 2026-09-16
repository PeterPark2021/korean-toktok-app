import { useState, useCallback, useEffect } from 'react';
import { RoleplayScenario, RoleplayMessage, RoleplayMission, RoleplaySessionResult } from '../types';
import { sendRoleplayMessage } from '../services/roleplayService';
import { useTTS } from './useTTS';

export const MAX_TURNS_PER_SPEAKER = 7;

export interface UseRoleplayReturn {
  scenario: RoleplayScenario | null;
  messages: RoleplayMessage[];
  missions: RoleplayMission[];
  userTurnCount: number;
  maxTurns: number;
  isAiThinking: boolean;
  isSessionFinished: boolean;
  latestCoachingTip: string | null;
  allCoachingTips: string[];
  autoPlayTTS: boolean;
  isTTSPlaying: boolean;
  sessionResult: RoleplaySessionResult | null;
  startScenario: (scenario: RoleplayScenario) => void;
  sendMessage: (text: string) => Promise<void>;
  toggleAutoPlayTTS: () => void;
  playMessageAudio: (text: string) => void;
  restartSession: () => void;
  exitSession: () => void;
}

export const useRoleplay = (): UseRoleplayReturn => {
  const [scenario, setScenario] = useState<RoleplayScenario | null>(null);
  const [messages, setMessages] = useState<RoleplayMessage[]>([]);
  const [missions, setMissions] = useState<RoleplayMission[]>([]);
  const [userTurnCount, setUserTurnCount] = useState<number>(0);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [isSessionFinished, setIsSessionFinished] = useState<boolean>(false);
  const [latestCoachingTip, setLatestCoachingTip] = useState<string | null>(null);
  const [allCoachingTips, setAllCoachingTips] = useState<string[]>([]);
  const [autoPlayTTS, setAutoPlayTTS] = useState<boolean>(true);
  const [sessionResult, setSessionResult] = useState<RoleplaySessionResult | null>(null);

  const { speak, speaking: isTTSPlaying, stop: stopTTS } = useTTS();

  const startScenario = useCallback(
    (targetScenario: RoleplayScenario) => {
      stopTTS();
      setScenario(targetScenario);
      setUserTurnCount(0);
      setIsAiThinking(false);
      setIsSessionFinished(false);
      setLatestCoachingTip(null);
      setAllCoachingTips([]);
      setSessionResult(null);

      // Deep copy missions
      const initialMissions = targetScenario.missions.map((m) => ({ ...m, completed: false }));
      setMissions(initialMissions);

      // Initial AI greeting message
      const initialAiMsg: RoleplayMessage = {
        id: `msg-ai-0`,
        sender: 'ai',
        text: targetScenario.initialMessage,
        translation: targetScenario.initialTranslation,
        timestamp: Date.now()
      };
      setMessages([initialAiMsg]);

      // Auto play initial greeting TTS
      if (autoPlayTTS) {
        speak(targetScenario.initialMessage);
      }
    },
    [autoPlayTTS, speak, stopTTS]
  );

  const restartSession = useCallback(() => {
    if (scenario) {
      startScenario(scenario);
    }
  }, [scenario, startScenario]);

  const exitSession = useCallback(() => {
    stopTTS();
    setScenario(null);
    setMessages([]);
    setMissions([]);
    setUserTurnCount(0);
    setIsSessionFinished(false);
    setSessionResult(null);
  }, [stopTTS]);

  const toggleAutoPlayTTS = useCallback(() => {
    setAutoPlayTTS((prev) => !prev);
  }, []);

  const playMessageAudio = useCallback(
    (text: string) => {
      speak(text);
    },
    [speak]
  );

  const sendMessage = useCallback(
    async (text: string) => {
      if (!scenario || isAiThinking || isSessionFinished || !text.trim()) return;

      const trimmedText = text.trim();
      const currentTurn = userTurnCount + 1;

      // Add user message to state
      const userMsg: RoleplayMessage = {
        id: `msg-user-${currentTurn}-${Date.now()}`,
        sender: 'user',
        text: trimmedText,
        timestamp: Date.now()
      };

      const updatedHistory = [...messages, userMsg];
      setMessages(updatedHistory);
      setUserTurnCount(currentTurn);
      setIsAiThinking(true);
      setLatestCoachingTip(null);

      try {
        const response = await sendRoleplayMessage({
          scenario: { ...scenario, missions },
          history: updatedHistory,
          userMessage: trimmedText,
          userTurnCount: currentTurn
        });

        // 1. Update completed missions
        let updatedMissions = [...missions];
        if (response.completedMissionIds.length > 0) {
          updatedMissions = missions.map((m) =>
            response.completedMissionIds.includes(m.id) ? { ...m, completed: true } : m
          );
          setMissions(updatedMissions);
        }

        // 2. Handle Coaching Tip
        if (response.coachingTip) {
          setLatestCoachingTip(response.coachingTip);
          setAllCoachingTips((prev) => [...prev, response.coachingTip!]);
        }

        // 3. Add AI message
        const aiMsg: RoleplayMessage = {
          id: `msg-ai-${currentTurn}-${Date.now()}`,
          sender: 'ai',
          text: response.reply,
          coachingTip: response.coachingTip || undefined,
          timestamp: Date.now()
        };

        setMessages((prev) => [...prev, aiMsg]);

        // 4. Play TTS
        if (autoPlayTTS) {
          speak(response.reply);
        }

        // 5. Check if session reached 7 turns or finished
        const finished = response.isSessionFinished || currentTurn >= MAX_TURNS_PER_SPEAKER;
        if (finished) {
          setIsSessionFinished(true);
          const completedCount = updatedMissions.filter((m) => m.completed).length;
          const xp = completedCount * 50 + currentTurn * 10;
          setSessionResult({
            scenarioId: scenario.id,
            totalTurns: currentTurn,
            completedMissionsCount: completedCount,
            totalMissionsCount: updatedMissions.length,
            coachingTips: response.coachingTip ? [...allCoachingTips, response.coachingTip] : allCoachingTips,
            xpEarned: xp
          });
        }
      } catch (err) {
        console.error('Failed to process roleplay turn:', err);
      } finally {
        setIsAiThinking(false);
      }
    },
    [
      scenario,
      isAiThinking,
      isSessionFinished,
      userTurnCount,
      messages,
      missions,
      autoPlayTTS,
      speak,
      allCoachingTips
    ]
  );

  return {
    scenario,
    messages,
    missions,
    userTurnCount,
    maxTurns: MAX_TURNS_PER_SPEAKER,
    isAiThinking,
    isSessionFinished,
    latestCoachingTip,
    allCoachingTips,
    autoPlayTTS,
    isTTSPlaying,
    sessionResult,
    startScenario,
    sendMessage,
    toggleAutoPlayTTS,
    playMessageAudio,
    restartSession,
    exitSession
  };
};
