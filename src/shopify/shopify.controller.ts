import { BadRequestException, Controller, Get, Inject, Query, Req, Res } from '@nestjs/common';
import { CookieNotFound, InvalidOAuthError, ShopifyRestResources } from '@shopify/shopify-api';
import passport from 'passport-shopify';
import { Public } from 'src/auth/auth.guard';

@Controller('shopify')
export class ShopifyController {
    constructor(@Inject("SHOPIFY_API") private shopify: ShopifyRestResources) { }
    @Get("aaaa")
    @Public()
    async auth(@Query() query, @Req() req, @Res() res) {
        await this.shopify.auth.begin({
            shop: this.shopify.utils.sanitizeShop(req.query.shop, true),
            callbackPath: '/shopify/callback',
            isOnline: false,
            rawRequest: req,
            rawResponse: res,
        })
    }
    @Public()
    @Get("callbackaaa")
    async authCallback(@Req() req, @Res() res) {

        // The library will automatically set the appropriate HTTP headers
        const session = await this.shopify.auth.callback({
            rawRequest: req,
            rawResponse: res,
        });

        // You can now use callback.session to make API requests
        return session;
    }

    @Get()
    @Public()
    async authP(@Query() query) {
        passport.authenticate('shopify', {
            scope: ['write_products'],
            shop: query.shop
        })
    }
    @Public()
    @Get("callback")
    async authCallbackP(@Req() req, @Res() res) {
        passport.authenticate('shopify', { failureRedirect: '/login' }),
            function (req, res) {
                // Successful authentication, redirect home.
                res.redirect('/')
            }
    }


}
