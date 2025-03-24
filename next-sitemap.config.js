/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.hotel-job-connect.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 1,
  autoLastmod: true,
  exclude: ['/404', '/oauth/**', '/certification', '/certification/**', '/user/**', '/employer', '/employer/**'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/404', '/oauth/', '/certification/', '/user/', '/employer/'],
      },
    ],
  },
  transform: (config, path) => {
    const priorityConditions = ['/policy'];
    const priority = priorityConditions.some((condition) => path.includes(condition)) ? 0.9 : 1;

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priority,
      lastmod: new Date().toISOString(),
    };
  },
};
