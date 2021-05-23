import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type CookieOption = Partial<{ key: string; isSigned: boolean }>;

export const CookieData = createParamDecorator(
  (data: CookieOption, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    let cookieData = '';
    if (data?.isSigned) {
      cookieData = data?.key ? req.signedCookies[data.key] : req.signedCookies;
    } else {
      cookieData = data?.key ? req.cookies[data.key] : req.cookies;
    }
    return cookieData;
  },
);
