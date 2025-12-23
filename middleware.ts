import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Desteklenen diller
  locales: ['tr', 'en'],
 
  // Varsayılan dil
  defaultLocale: 'tr',

  // URL'de varsayılan dilin görünmesini istemiyorsanız 'as-needed' yapabilirsiniz
  localePrefix: 'always' 
});

export const config = {
  // Matcher: API, static dosyalar ve resimler dışındaki her şeyi yakalar
  matcher: ['/', '/(tr|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};