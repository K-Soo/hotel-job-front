const CLOUD_FRONT_DOMAIN = 'https://cdn.hotel-job-connect.com';

export const getImageUrl = (imageKey?: string) => {
  if (!imageKey) return '';
  return `${CLOUD_FRONT_DOMAIN}/${encodeURI(imageKey)}`;
};
