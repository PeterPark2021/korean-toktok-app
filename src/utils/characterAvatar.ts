export interface CharacterInfo {
  name: string;
  role: string;
  avatarUrl: string;
  color: string;
  badgeBg: string;
}

export const getSpeakerAvatar = (speakerName: string): CharacterInfo => {
  const name = speakerName.trim();

  if (name.includes('민호') || name === '김민호') {
    return {
      name: '김민호',
      role: '한국인 회사원',
      avatarUrl: '/images/characters/minho.webp',
      color: 'blue',
      badgeBg: 'bg-blue-100 text-blue-700 border-blue-200'
    };
  }

  if (name.includes('리홍')) {
    return {
      name: '리홍',
      role: '헤어 디자이너',
      avatarUrl: '/images/characters/lihong.webp',
      color: 'pink',
      badgeBg: 'bg-pink-100 text-pink-700 border-pink-200'
    };
  }

  if (name.includes('도안닝')) {
    return {
      name: '도안닝',
      role: '베트남 셰프 / 요리사',
      avatarUrl: '/images/characters/doanning.webp',
      color: 'amber',
      badgeBg: 'bg-amber-100 text-amber-700 border-amber-200'
    };
  }

  if (name.includes('수연') || name.includes('유진') || name.includes('수진') || name.includes('민지') || name.includes('서연') || name.includes('은지') || name.includes('나래') || name.includes('소라') || name.includes('지수')) {
    return {
      name,
      role: '한국인 대학생 / 동료',
      avatarUrl: '/images/characters/suyeon.webp',
      color: 'sky',
      badgeBg: 'bg-sky-100 text-sky-700 border-sky-200'
    };
  }

  if (name.includes('교수') || name.includes('교사') || name.includes('차지원') || name.includes('선생') || name.includes('박사')) {
    return {
      name,
      role: '한국어 지도 교수 / 교사',
      avatarUrl: '/images/characters/teacher.webp',
      color: 'emerald',
      badgeBg: 'bg-emerald-100 text-emerald-700 border-emerald-200'
    };
  }

  if (name.includes('점원') || name.includes('상인') || name.includes('직원') || name.includes('조교') || name.includes('기자') || name.includes('앵커')) {
    return {
      name,
      role: '서비스 스태프 / 안내원',
      avatarUrl: '/images/characters/clerk.webp',
      color: 'teal',
      badgeBg: 'bg-teal-100 text-teal-700 border-teal-200'
    };
  }

  if (name.includes('과장') || name.includes('대리') || name.includes('팀장') || name.includes('부장') || name.includes('연구원')) {
    return {
      name,
      role: '직장 선배 / 오피스 매니저',
      avatarUrl: '/images/characters/manager.webp',
      color: 'indigo',
      badgeBg: 'bg-indigo-100 text-indigo-700 border-indigo-200'
    };
  }

  if (name.includes('스티븐') || name.includes('에밀리') || name.includes('카리나') || name.includes('루카스') || name.includes('타쿠야') || name.includes('안나') || name.includes('메이') || name.includes('지훈') || name.includes('민수') || name.includes('진우') || name.includes('태민') || name.includes('현우') || name.includes('준호')) {
    return {
      name,
      role: '외국인 유학생 / 친구',
      avatarUrl: '/images/characters/friend.webp',
      color: 'purple',
      badgeBg: 'bg-purple-100 text-purple-700 border-purple-200'
    };
  }

  // Generic A or B
  if (name === 'A') {
    return {
      name: '화자 A (김민호)',
      role: '대화 시작자',
      avatarUrl: '/images/characters/minho.webp',
      color: 'blue',
      badgeBg: 'bg-blue-100 text-blue-700 border-blue-200'
    };
  }

  if (name === 'B') {
    return {
      name: '화자 B (리홍/이수연)',
      role: '대화 응답자',
      avatarUrl: '/images/characters/lihong.webp',
      color: 'pink',
      badgeBg: 'bg-pink-100 text-pink-700 border-pink-200'
    };
  }

  return {
    name,
    role: '학습 대화 참여자',
    avatarUrl: '/images/characters/minho.webp',
    color: 'slate',
    badgeBg: 'bg-slate-100 text-slate-700 border-slate-200'
  };
};
