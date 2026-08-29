import type { Service } from '@/lib/sanity/types';

export const formatPrice = (service: Pick<Service, 'price' | 'priceUnit'>) => {
  if (service.price == null) {
    return undefined;
  }
  return service.priceUnit === 'per_day'
    ? `£${service.price}/day`
    : `£${service.price}`;
};
