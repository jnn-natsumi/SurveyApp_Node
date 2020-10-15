"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const querystring_1 = __importDefault(require("querystring"));
const axios_1 = __importDefault(require("axios"));
var router = express_1.default.Router();
const client_id = process.env.GOOGLE_OAUTH_CLIENT_ID || '{756312417951-r27qos60f61clc31f0bsvl4ko0smhi7u.apps.googleusercontent.com}';
const client_secret = process.env.GOOGLE_OAUTH_CLIENT_SECRET || '{a9w9AYoHzphwFaGKnpYi-st5}';
const redirect_uri_postfix = '/oauthRedirect/google';
const response_type = 'code';
const scope = 'email';
const GOOGLE_URL_AUTH = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_URL_TOKEN = 'https://www.googleapis.com/oauth2/v4/token';
const GOOGLE_URL_USERINFO = 'https://www.googleapis.com/oauth2/v3/userinfo';
router.get('/google/loginPath', function (req, res) {
    var redirect_uri = req.protocol + "://" + req.get("Host") + redirect_uri_postfix;
    const params = querystring_1.default.stringify({
        client_id,
        redirect_uri,
        response_type,
        scope,
    });
    res.send({ url: `${GOOGLE_URL_AUTH}?${params}` });
});
router.post('/google/loginPath', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var params = new URLSearchParams();
            params.append('client_id', client_id);
            params.append('client_secret', client_secret);
            params.append('code', req.body.code);
            params.append('grant_type', 'authorization_code');
            params.append('redirect_uri', req.body.redirect_uri);
            const response = yield axios_1.default.post(GOOGLE_URL_TOKEN, params);
            const access_token = response.data.access_token;
            const userInfoResponse = yield axios_1.default.get(GOOGLE_URL_USERINFO, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                }
            });
            const userInfo = userInfoResponse.data;
            res.send({
                access_token,
                userInfo
            });
        }
        catch (e) {
            res.status(400).send();
        }
    });
});
exports.default = router;
