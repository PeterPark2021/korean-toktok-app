export interface SituationBannerInfo {
  unitNumber: number;
  imageUrl?: string;
  hasCustomImage: boolean;
  themeGradient: string;
  iconName: string;
  sceneTitle: string;
}

export const getUnitSituationBanner = (unitNumber: number): SituationBannerInfo => {
  // Check if dedicated WebP image exists
  if (unitNumber === 1) {
    return {
      unitNumber: 1,
      imageUrl: '/images/situations/unit01.webp',
      hasCustomImage: true,
      themeGradient: 'from-amber-600/30 via-orange-500/20 to-rose-600/30',
      iconName: 'Users',
      sceneTitle: '서울 어학원 라운지 첫 만남 및 자기소개'
    };
  }

  if (unitNumber === 8) {
    return {
      unitNumber: 8,
      imageUrl: '/images/situations/unit08.webp',
      hasCustomImage: true,
      themeGradient: 'from-rose-600/30 via-orange-500/20 to-amber-600/30',
      iconName: 'Utensils',
      sceneTitle: '한식당에서 맛있는 식사 및 메뉴 주문'
    };
  }

  // Themed stylized background for other units
  const gradients = [
    'from-blue-900/60 via-indigo-900/50 to-slate-900/80',
    'from-emerald-900/60 via-teal-900/50 to-slate-900/80',
    'from-purple-900/60 via-pink-900/50 to-slate-900/80',
    'from-rose-900/60 via-orange-900/50 to-slate-900/80',
    'from-cyan-900/60 via-blue-900/50 to-slate-900/80'
  ];

  const gradient = gradients[(unitNumber - 1) % gradients.length];

  return {
    unitNumber,
    hasCustomImage: false,
    themeGradient: gradient,
    iconName: 'Sparkles',
    sceneTitle: `Unit ${unitNumber} 생생 회화 상황`
  };
};
