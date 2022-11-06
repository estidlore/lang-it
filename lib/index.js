"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangIt = void 0;
var LangIt = /** @class */ (function () {
    function LangIt(langs, defaultLang) {
        var _this = this;
        this.setLang = function (lang) {
            _this.lang = lang;
        };
        this.t = function () { return _this.langs[_this.lang].entries; };
        this.lang = defaultLang;
        this.langs = langs;
    }
    return LangIt;
}());
exports.LangIt = LangIt;
