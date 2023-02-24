"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reactions = void 0;
var typeorm_1 = require("typeorm");
var post_1 = require("../Posts/post");
var reply_1 = require("../Reply/reply");
var user_1 = require("../User/user");
var Reactions = /** @class */ (function () {
    function Reactions() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Reactions.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 0 }),
        __metadata("design:type", Number)
    ], Reactions.prototype, "likes", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 0 }),
        __metadata("design:type", Number)
    ], Reactions.prototype, "hearts", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 0 }),
        __metadata("design:type", Number)
    ], Reactions.prototype, "dislike", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return (user_1.User); }, function (user) { return user.id; }),
        __metadata("design:type", user_1.User)
    ], Reactions.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return (post_1.Post); }, function (post) { return post.post_id; }),
        __metadata("design:type", post_1.Post)
    ], Reactions.prototype, "post", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return (reply_1.Reply); }, function (reply) { return reply.id; }),
        __metadata("design:type", reply_1.Reply)
    ], Reactions.prototype, "reply", void 0);
    Reactions = __decorate([
        (0, typeorm_1.Entity)()
    ], Reactions);
    return Reactions;
}());
exports.Reactions = Reactions;
