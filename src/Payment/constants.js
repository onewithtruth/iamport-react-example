export const PGS = [
  {
    value: 'kcp',
    label: 'NHN KCP',
  },
  {
    value: 'kcp_billing',
    label: 'NHN KCP 정기결제',
  },
  {
    value: 'kakaopay',
    label: '신 - 카카오페이',
  },
];

export const METHODS = [
  {
    value: 'card',
    label: '신용카드',
  },
];


export const METHODS_FOR_KCP =
  METHODS.concat([
    {
      value: 'samsung',
      label: '삼성페이',
    },
  ]);

export const METHOD_FOR_CARD = [
  {
    value: 'card',
    label: '신용카드',
  },
];


export const QUOTAS = [
  {
    value: 0,
    label: 'PG사 기본 제공',
  },
  {
    value: 1,
    label: '일시불',
  },
];

export const QUOTAS_FOR_INICIS_AND_KCP = [
  {
    value: 0,
    label: 'PG사 기본 제공',
  },
  {
    value: 1,
    label: '일시불',
  },
  {
    value: 2,
    label: '2개월',
  },
  {
    value: 3,
    label: '3개월',
  },
  {
    value: 4,
    label: '4개월',
  },
  {
    value: 5,
    label: '5개월',
  },
  {
    value: 6,
    label: '6개월',
  },
];
