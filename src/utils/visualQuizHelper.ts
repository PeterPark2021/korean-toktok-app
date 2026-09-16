// src/utils/visualQuizHelper.ts
// Intelligent visual question stimulus resolver and visual options helper for Korean TokTok Quiz Module

import { QuizItem } from '../types';
import { getUnitSituationBanner } from './unitSituation';
import { getSpeakerAvatar } from './characterAvatar';
import { getCultureForUnit } from '../data/culture/cultureData';

export interface VisualQuizStimulus {
  hasVisual: boolean;
  imageUrl: string;
  imageAlt: string;
  caption?: string;
  badge: string;
  badgeColor: string;
  emoji?: string;
}

// Unit-specific picture quiz mappings
const CUSTOM_UNIT_VISUALS: Record<number, { imageUrl: string; caption: string; badge: string; badgeColor: string }> = {
  1: {
    imageUrl: '/images/situations/unit01.webp',
    caption: '캠퍼스에서 첫 만남을 가진 학생들의 대화 상황',
    badge: '상황 삽화 퀴즈',
    badgeColor: 'bg-blue-500 text-white'
  },
  4: {
    imageUrl: '/images/culture/dining.jpg',
    caption: '식당에서 반찬을 추가 주문하거나 밥상 예절을 나타내는 상황',
    badge: '음식 문화 퀴즈',
    badgeColor: 'bg-orange-500 text-white'
  },
  5: {
    imageUrl: '/images/culture/market.jpg',
    caption: '광장시장 길거리 음식과 활기찬 시장 풍경',
    badge: '전통시장 퀴즈',
    badgeColor: 'bg-emerald-500 text-white'
  },
  8: {
    imageUrl: '/images/situations/unit08.webp',
    caption: '한식당에서 음식을 주문하고 계산하는 상황',
    badge: '식당 주문 퀴즈',
    badgeColor: 'bg-rose-500 text-white'
  },
  11: {
    imageUrl: '/images/culture/seollal.jpg',
    caption: '설날 아침 온 가족이 한복을 입고 세배하는 전통 명절 풍경',
    badge: '한국 명절 퀴즈',
    badgeColor: 'bg-amber-500 text-white'
  },
  15: {
    imageUrl: '/images/culture/campus.jpg',
    caption: '한국의 카페에서 공부하거나 음료를 주문하는 일상',
    badge: '카페 문화 퀴즈',
    badgeColor: 'bg-purple-500 text-white'
  }
};

export function getQuizVisualStimulus(quiz: QuizItem, unitNumber: number): VisualQuizStimulus {
  // 1. If quiz explicitly provides image_url
  if (quiz.image_url) {
    return {
      hasVisual: true,
      imageUrl: quiz.image_url,
      imageAlt: quiz.image_alt || '퀴즈 참고 그림',
      caption: quiz.image_caption || '그림/사진 속 상황을 보고 질문에 알맞은 답을 고르세요.',
      badge: '그림 퀴즈',
      badgeColor: 'bg-rose-500 text-white'
    };
  }

  // 2. Check custom unit visual
  if (CUSTOM_UNIT_VISUALS[unitNumber]) {
    const custom = CUSTOM_UNIT_VISUALS[unitNumber];
    return {
      hasVisual: true,
      imageUrl: custom.imageUrl,
      imageAlt: custom.caption,
      caption: custom.caption,
      badge: custom.badge,
      badgeColor: custom.badgeColor
    };
  }

  // 3. Fallback to situation banner or culture photo
  const situation = getUnitSituationBanner(unitNumber);
  if (situation.hasCustomImage && situation.imageUrl) {
    return {
      hasVisual: true,
      imageUrl: situation.imageUrl,
      imageAlt: situation.sceneTitle,
      caption: `Unit ${unitNumber} 상황: ${situation.sceneTitle}`,
      badge: '단원 상황 퀴즈',
      badgeColor: 'bg-indigo-500 text-white'
    };
  }

  const culture = getCultureForUnit(unitNumber);
  return {
    hasVisual: true,
    imageUrl: culture.imageUrl,
    imageAlt: culture.imageAlt,
    caption: `한국 문화 탐구: ${culture.title}`,
    badge: '문화 연계 퀴즈',
    badgeColor: 'bg-teal-500 text-white'
  };
}
