import {
  METHODS,
  METHOD_FOR_CARD,
  METHODS_FOR_KCP,
  QUOTAS,
  QUOTAS_FOR_INICIS_AND_KCP,
} from './constants';

export function getMethods(pg) {
  switch (pg) {
    case 'kcp': return METHODS_FOR_KCP;
    case 'kcp_billing':
    case 'kakaopay':
    case 'kakao':
    case 'paypal':
    case 'smilepay':
      return METHOD_FOR_CARD;
    default: return METHODS;
  }  
} 

export function getQuotas(pg, method) {
  if (method === 'card') {
    switch (pg) {
      case 'kcp':
        return { isQuotaRequired: true, quotas: QUOTAS_FOR_INICIS_AND_KCP };
      default:
        return { isQuotaRequired: true, quotas: QUOTAS };
    }
  }
  return { isQuotaRequired: false, quotas: QUOTAS };
}