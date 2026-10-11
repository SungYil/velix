export interface CreatorItem {
  id: number;
  name: string;
  stageName: string;
  category: string;
  platform: string;
  tag: string;
  image: string;
  description: string;
}

export const CREATORS_DATA: CreatorItem[] = [
  {
    id: 1,
    name: '민우',
    stageName: 'MINWOO',
    category: '토크 & 라이프스타일',
    platform: 'SOOP / 틱톡',
    tag: '#보이는라디오 #소통',
    image: '/creators/creator1.jpg',
    description: '스마트한 매력과 진솔한 입담으로 시청자들과 실시간으로 소통하는 VELIX 대표 남성 라이브 호스트',
  },
  {
    id: 2,
    name: '루아',
    stageName: 'LUA',
    category: '보이는 라디오 & 버라이어티',
    platform: '틱톡 / 라이브',
    tag: '#엔터테인먼트 #토크',
    image: '/creators/creator2.jpg',
    description: '톡톡 튀는 사랑스러운 에너지와 다채로운 콘텐츠로 팬들의 뜨거운 사랑을 받는 비주얼 크리에이터',
  },
  {
    id: 3,
    name: '서아',
    stageName: 'SEOA',
    category: '토크 & 뷰티 라이프',
    platform: 'SOOP / 인스타그램',
    tag: '#소통 #글로벌팬덤',
    image: '/creators/creator3.jpg',
    description: '우아한 무드와 흡입력 있는 진행으로 폭넓은 국내외 팬덤을 구축한 정상급 라이브 스트리머',
  },
  {
    id: 4,
    name: '다은',
    stageName: 'DAEUN',
    category: '음악 & 힐링 소통',
    platform: '틱톡 / 유튜브',
    tag: '#감성라이브 #음악방송',
    image: '/creators/creator4.jpg',
    description: '청순한 비주얼과 따뜻한 감성 보이스로 시청자들의 일상에 힐링을 선사하는 라이브 아티스트',
  },
  {
    id: 5,
    name: '지우',
    stageName: 'JIWOO',
    category: '일상 소통 & 야외 라이브',
    platform: 'SOOP / 틱톡',
    tag: '#일상Vlog #실시간소통',
    image: '/creators/creator5.jpg',
    description: '꾸밈없는 친근한 매력과 자연스러운 소통으로 강력한 팬층을 이끌어가는 라이징 스트리머',
  },
];
