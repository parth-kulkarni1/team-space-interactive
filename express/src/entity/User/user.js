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
exports.User = void 0;
var typeorm_1 = require("typeorm");
var post_1 = require("../Posts/post");
var reaction_1 = require("../Reactions/reaction");
var reply_1 = require("../Reply/reply");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "firstName", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "lastName", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: "cover-background_hsrl28" }) // Storing the default cover-background that all users will be applied with
        ,
        __metadata("design:type", String)
    ], User.prototype, "cover_background", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: "user_hv9uk1" }) // Storing the default profile pic
        ,
        __metadata("design:type", String)
    ], User.prototype, "profile_background", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return post_1.Post; }, function (post) { return post.post_id; }),
        __metadata("design:type", Array)
    ], User.prototype, "posts", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return reply_1.Reply; }, function (reply) { return reply.id; }),
        __metadata("design:type", reply_1.Reply)
    ], User.prototype, "reply", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return reaction_1.Reactions; }, function (reaction) { return reaction.id; }),
        __metadata("design:type", reaction_1.Reactions)
    ], User.prototype, "reaction", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)()
    ], User);
    return User;
}());
exports.User = User;
