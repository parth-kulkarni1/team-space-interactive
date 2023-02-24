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
exports.Reply = void 0;
var typeorm_1 = require("typeorm");
var photos_1 = require("../Image/photos");
var post_1 = require("../Posts/post");
var reaction_1 = require("../Reactions/reaction");
var user_1 = require("../User/user");
var Reply = /** @class */ (function () {
    function Reply() {
    }
    Reply_1 = Reply;
    var Reply_1;
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Reply.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar", { length: 250 }),
        __metadata("design:type", String)
    ], Reply.prototype, "body", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Reply.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Reply.prototype, "updatedAt", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return post_1.Post; }, function (post) { return post.post_id; }, {
            onDelete: "CASCADE"
        }),
        __metadata("design:type", post_1.Post)
    ], Reply.prototype, "postId", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return photos_1.photos; }, function (photo) { return photo.reply; }),
        __metadata("design:type", photos_1.photos)
    ], Reply.prototype, "photo", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.id; }, {
            onDelete: "CASCADE"
        }),
        __metadata("design:type", user_1.User)
    ], Reply.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return Reply_1; }, function (replya) { return replya.id; }, {
            onDelete: "CASCADE"
        }),
        __metadata("design:type", Reply)
    ], Reply.prototype, "parentComment", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Reply_1; }, function (replya) { return replya.parentComment; }, {}),
        __metadata("design:type", Array)
    ], Reply.prototype, "childComments", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return reaction_1.Reactions; }, function (reaction) { return reaction.id; }),
        __metadata("design:type", reaction_1.Reactions)
    ], Reply.prototype, "reaction", void 0);
    Reply = Reply_1 = __decorate([
        (0, typeorm_1.Entity)({
            orderBy: {
                updatedAt: "DESC"
            }
        })
    ], Reply);
    return Reply;
}());
exports.Reply = Reply;
