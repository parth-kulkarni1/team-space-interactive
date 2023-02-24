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
exports.Post = void 0;
var typeorm_1 = require("typeorm");
var photos_1 = require("../Image/photos");
var reaction_1 = require("../Reactions/reaction");
var reply_1 = require("../Reply/reply");
var user_1 = require("../User/user");
var Post = /** @class */ (function () {
    function Post() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Post.prototype, "post_id", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar", { length: 50 }),
        __metadata("design:type", String)
    ], Post.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar", { length: 250 }),
        __metadata("design:type", String)
    ], Post.prototype, "body", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
        __metadata("design:type", Date)
    ], Post.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Post.prototype, "likeCount", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Post.prototype, "heartsCount", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, {
            onDelete: "CASCADE"
        }),
        __metadata("design:type", user_1.User)
    ], Post.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return photos_1.photos; }, function (photo) { return photo.post; }),
        __metadata("design:type", photos_1.photos)
    ], Post.prototype, "photo", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return reply_1.Reply; }, function (reply) { return reply.postId; }),
        __metadata("design:type", reply_1.Reply)
    ], Post.prototype, "reply", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return reaction_1.Reactions; }, function (reaction) { return reaction.post; }),
        __metadata("design:type", reaction_1.Reactions)
    ], Post.prototype, "reaction", void 0);
    Post = __decorate([
        (0, typeorm_1.Entity)({
            orderBy: {
                post_id: "DESC"
            }
        })
    ], Post);
    return Post;
}());
exports.Post = Post;
