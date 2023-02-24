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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postrouter = void 0;
var express_1 = require("express");
var app_data_source_1 = require("../app-data-source");
var post_1 = require("../entity/Posts/post");
var express_validator_1 = require("express-validator");
var photos_1 = require("../entity/Image/photos");
var reply_1 = require("../entity/Reply/reply");
var user_1 = require("../entity/User/user");
var reaction_1 = require("../entity/Reactions/reaction");
require("dotenv").config();
var cloudinary = require("cloudinary").v2;
var post_router = (0, express_1.Router)();
exports.Postrouter = post_router;
post_router.post('/post/create', (0, express_validator_1.body)('title').exists({ checkFalsy: true }), (0, express_validator_1.body)('body').exists({ checkFalsy: true }), (0, express_validator_1.body)('userId').exists({ checkFalsy: true, checkNull: true }), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, post, saved_post, i, uploadedResponse, images, results, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    errors = (0, express_validator_1.validationResult)(req);
                    console.log(errors);
                    if (!errors.isEmpty()) {
                        return [2 /*return*/, res.send({ errors: errors.array() })];
                    }
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(post_1.Post).create({
                            title: req.body.title,
                            body: req.body.body,
                            user: req.body.userId,
                        })];
                case 1:
                    post = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(post_1.Post).save(post)];
                case 2:
                    saved_post = _a.sent();
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < req.body.images.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, cloudinary.uploader.upload(req.body.images[i], {
                            width: 300,
                            height: 300,
                            crop: "fit",
                            quality: "auto",
                            fetch_format: "auto"
                        })];
                case 4:
                    uploadedResponse = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(photos_1.photos).create({
                            photo_id: uploadedResponse.public_id,
                            post: saved_post
                        })];
                case 5:
                    images = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(photos_1.photos).save(images)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 3];
                case 8: return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(post_1.Post).find({
                        relations: ['user', 'reply', 'reply.user', 'reply.photo', 'photo'],
                        select: {
                            reply: {
                                body: true,
                                createdAt: true,
                                updatedAt: true,
                                id: true,
                                user: {
                                    firstName: true,
                                    lastName: true,
                                    cover_background: true,
                                    profile_background: true,
                                    email: true,
                                    id: true
                                }
                            }
                        }, where: { post_id: saved_post.post_id }
                    })];
                case 9:
                    results = _a.sent();
                    res.json(results[0]);
                    return [3 /*break*/, 11];
                case 10:
                    err_1 = _a.sent();
                    console.log(err_1);
                    next(err_1);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
});
post_router.get('/posts', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var results, found, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(post_1.Post).find({
                            relations: ['user', 'reply', 'reply.user', 'reply.photo', 'reply.childComments', 'reply.childComments.user', 'reply.childComments.parentComment',
                                'reply.childComments.photo', 'reply.childComments.childComments', 'reply.childComments.childComments.user', 'reply.childComments.childComments.photo', 'photo',
                                'reaction', 'reaction.user', 'reaction.post'],
                            select: {
                                reply: {
                                    body: true,
                                    createdAt: true,
                                    updatedAt: true,
                                    id: true,
                                    user: {
                                        firstName: true,
                                        lastName: true,
                                        cover_background: true,
                                        profile_background: true,
                                        email: true,
                                        id: true,
                                    },
                                    parentComment: {
                                        body: true,
                                        createdAt: true,
                                        updatedAt: true
                                    },
                                    reaction: {
                                        likes: true,
                                        hearts: true,
                                    }
                                }
                            }, order: {
                                post_id: "DESC",
                                reply: {
                                    id: "DESC"
                                }
                            }
                        })];
                case 1:
                    results = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(post_1.Post).createQueryBuilder("post").leftJoinAndSelect("post.reaction", "reactions").addSelect("SUM(reactions.likes)", "likes").addSelect("SUM(reactions.hearts)", "hearts").groupBy("post.post_id").orderBy("likes", "DESC").getRawMany()];
                case 2:
                    found = _a.sent();
                    res.json(results);
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    next(err_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
post_router.put('/post/update', (0, express_validator_1.body)('post.title').exists({ checkFalsy: true }), (0, express_validator_1.body)('post.body').exists({ checkFalsy: true }), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, post, obj, result, i, image, i, uploadedResponse, images, results, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 16, , 17]);
                    errors = (0, express_validator_1.validationResult)(req);
                    console.log(errors);
                    if (!errors.isEmpty()) {
                        return [2 /*return*/, res.send({ errors: errors.array() })];
                    }
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(post_1.Post).findOneBy({
                            post_id: req.body.post.post_id
                        })];
                case 1:
                    post = _a.sent();
                    obj = { title: req.body.post.title, body: req.body.post.body };
                    app_data_source_1.myDataSource.getRepository(post_1.Post).merge(post, obj);
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(post_1.Post).save(post)];
                case 2:
                    result = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(post_1.Post).update(post.post_id, { createdAt: new Date() })];
                case 3:
                    _a.sent();
                    if (!(req.body.imageHandling.deletedImages.length >= 1)) return [3 /*break*/, 8];
                    i = 0;
                    _a.label = 4;
                case 4:
                    if (!(i < req.body.imageHandling.deletedImages.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(photos_1.photos).findOneBy({
                            photo_id: req.body.imageHandling.deletedImages[i]
                        })];
                case 5:
                    image = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(photos_1.photos).remove(image)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 4];
                case 8:
                    if (!(req.body.imageHandling.localImages.length >= 1)) return [3 /*break*/, 14];
                    i = 0;
                    _a.label = 9;
                case 9:
                    if (!(i < req.body.imageHandling.localImages.length)) return [3 /*break*/, 14];
                    return [4 /*yield*/, cloudinary.uploader.upload(req.body.imageHandling.localImages[i], {
                            width: 300,
                            height: 300,
                            crop: "fit",
                            quality: "auto",
                            fetch_format: "auto"
                        })];
                case 10:
                    uploadedResponse = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(photos_1.photos).create({
                            photo_id: uploadedResponse.public_id,
                            post: result
                        })];
                case 11:
                    images = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(photos_1.photos).save(images)];
                case 12:
                    _a.sent();
                    _a.label = 13;
                case 13:
                    i++;
                    return [3 /*break*/, 9];
                case 14: return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(post_1.Post).find({
                        relations: ['user', 'reply', 'reply.user', 'reply.photo', 'reply.childComments', 'reply.childComments.user', 'reply.childComments.parentComment',
                            'reply.childComments.photo', 'reply.childComments.childComments', 'reply.childComments.childComments.user', 'reply.childComments.childComments.photo', 'photo'
                        ],
                        select: {
                            reply: {
                                body: true,
                                createdAt: true,
                                updatedAt: true,
                                id: true,
                                user: {
                                    firstName: true,
                                    lastName: true,
                                    cover_background: true,
                                    profile_background: true,
                                    email: true,
                                    id: true
                                },
                                parentComment: {
                                    body: true,
                                    createdAt: true,
                                    updatedAt: true
                                }
                            }
                        }, order: {
                            post_id: "DESC",
                            reply: {
                                id: "DESC"
                            }
                        },
                        where: {
                            post_id: req.body.post.post_id
                        }
                    })];
                case 15:
                    results = _a.sent();
                    res.json(results[0]);
                    return [3 /*break*/, 17];
                case 16:
                    err_3 = _a.sent();
                    next(err_3);
                    return [3 /*break*/, 17];
                case 17: return [2 /*return*/];
            }
        });
    });
});
post_router.delete('/post/delete/:id', (0, express_validator_1.param)('id').exists(), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, post, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req);
                    console.log(errors);
                    if (!errors.isEmpty()) {
                        return [2 /*return*/, res.send({ errors: errors.array() })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(post_1.Post).delete(req.params.id)]; // This will cascade into deleting all images as well..
                case 2:
                    post = _a.sent() // This will cascade into deleting all images as well..
                    ;
                    res.sendStatus(200); // Post Successfully has been deleted
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    next(err_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
post_router.post('/post/reply/create', (0, express_validator_1.body)("body").exists({ checkFalsy: true, checkNull: true }).notEmpty(), (0, express_validator_1.body)("postId").exists().notEmpty(), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, reply, savedReply, uploadedResponse, reply_image, updatedReply, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(user_1.User).findOneBy({
                            id: req.body.user
                        })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(reply_1.Reply).create({
                            body: req.body.reply,
                            postId: req.body.post,
                            user: user
                        })];
                case 2:
                    reply = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(reply_1.Reply).save(reply)]; // Save the reply instance
                case 3:
                    savedReply = _a.sent() // Save the reply instance
                    ;
                    if (!(req.body.image.length > 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, cloudinary.uploader.upload(req.body.image, {
                            width: 150,
                            height: 150,
                            crop: "fit",
                            quality: "auto",
                            fetch_format: "auto"
                        })];
                case 4:
                    uploadedResponse = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(photos_1.photos).create({
                            photo_id: uploadedResponse.public_id,
                            reply: savedReply,
                        })];
                case 5:
                    reply_image = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(photos_1.photos).save(reply_image)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(reply_1.Reply).find({
                        relations: {
                            photo: true,
                            user: true,
                            childComments: true
                        },
                        select: {
                            user: {
                                firstName: true,
                                lastName: true,
                                profile_background: true,
                                cover_background: true,
                                email: true,
                                id: true
                            },
                            photo: {
                                photo_id: true
                            }
                        }, where: {
                            id: savedReply.id
                        }
                    })];
                case 8:
                    updatedReply = _a.sent();
                    res.json(updatedReply[0]);
                    return [3 /*break*/, 10];
                case 9:
                    err_5 = _a.sent();
                    next(err_5);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
});
post_router.post('/post/reply/reply', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, reply, saved_reply, uploadedResponse, reply_image, updatedReply;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(user_1.User).findOneBy({
                        id: req.body.user
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(reply_1.Reply).create({
                            body: req.body.reply,
                            parentComment: req.body.reply_id,
                            user: user
                        })];
                case 2:
                    reply = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(reply_1.Reply).save(reply)];
                case 3:
                    saved_reply = _a.sent();
                    if (!(req.body.image.length > 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, cloudinary.uploader.upload(req.body.image, {
                            width: 150,
                            height: 150,
                            crop: "fit",
                            quality: "auto",
                            fetch_format: "auto"
                        })];
                case 4:
                    uploadedResponse = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(photos_1.photos).create({
                            photo_id: uploadedResponse.public_id,
                            reply: saved_reply,
                        })];
                case 5:
                    reply_image = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(photos_1.photos).save(reply_image)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(reply_1.Reply).find({
                        relations: ['user', 'photo', 'childComments', 'parentComment', 'parentComment.parentComment'],
                        select: {
                            user: {
                                firstName: true,
                                lastName: true,
                                profile_background: true,
                                cover_background: true,
                                email: true,
                                id: true
                            },
                            photo: {
                                photo_id: true
                            }
                        }, where: {
                            id: saved_reply.id,
                        }
                    })];
                case 8:
                    updatedReply = _a.sent();
                    if (updatedReply[0].parentComment.parentComment) { // This ensures that if the comment contains two parents so (original reply -> reply -> reply, its disbaled and cant be replied furhter)
                        updatedReply.forEach(function (e) { delete e.childComments; });
                    }
                    res.json(updatedReply[0]);
                    return [2 /*return*/];
            }
        });
    });
});
post_router.delete('/post/reply/delete/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var reply, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(reply_1.Reply).findOneBy({
                            id: parseInt(req.params.id)
                        })];
                case 1:
                    reply = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(reply_1.Reply).remove(reply)]; // Removes the reply entity cascadely... 
                case 2:
                    _a.sent(); // Removes the reply entity cascadely... 
                    res.sendStatus(200);
                    return [3 /*break*/, 4];
                case 3:
                    err_6 = _a.sent();
                    next(err_6);
                    res.sendStatus(500);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
post_router.post('/post/reaction/like', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var reaction, saved, post, updated_reaction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(reaction_1.Reactions).create({
                        post: req.body.post,
                        user: req.body.user,
                        likes: 1
                    })];
                case 1:
                    reaction = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(reaction_1.Reactions).save(reaction)];
                case 2:
                    saved = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(post_1.Post).findOneBy({
                            post_id: req.body.post
                        })];
                case 3:
                    post = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(post_1.Post).update(post.post_id, { likeCount: post.likeCount + 1 })
                        // Replace this with the query that finds using raw many and update the value accordignly
                    ];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(reaction_1.Reactions).find({
                            relations: {
                                post: true,
                                user: true,
                            }, select: {
                                user: {
                                    firstName: true,
                                    lastName: true,
                                    cover_background: true,
                                    profile_background: true,
                                    email: true,
                                    id: true
                                },
                                post: {
                                    post_id: true
                                }
                            }, where: {
                                id: saved.id
                            }
                        })];
                case 5:
                    updated_reaction = _a.sent();
                    res.json(updated_reaction[0]);
                    return [2 /*return*/];
            }
        });
    });
});
post_router.post('/post/reaction/heart', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var reaction, saved, post, updated_reaction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(reaction_1.Reactions).create({
                        post: req.body.post,
                        user: req.body.user,
                        hearts: 1
                    })];
                case 1:
                    reaction = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(reaction_1.Reactions).save(reaction)];
                case 2:
                    saved = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(post_1.Post).findOneBy({
                            post_id: req.body.post
                        })];
                case 3:
                    post = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(post_1.Post).update(post.post_id, { heartsCount: post.heartsCount + 1 })
                        // Replace this with the query that finds using raw many and update the value accordignly
                    ];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(reaction_1.Reactions).find({
                            relations: {
                                post: true,
                                user: true,
                            }, select: {
                                user: {
                                    firstName: true,
                                    lastName: true,
                                    cover_background: true,
                                    profile_background: true,
                                    email: true,
                                    id: true
                                },
                                post: {
                                    post_id: true
                                }
                            }, where: {
                                id: saved.id
                            }
                        })];
                case 5:
                    updated_reaction = _a.sent();
                    res.json(updated_reaction[0]);
                    return [2 /*return*/];
            }
        });
    });
});
post_router.delete('/post/reaction/like/remove', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var reaction, post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(reaction_1.Reactions).findOneBy({
                        id: req.body.reaction
                    })];
                case 1:
                    reaction = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(reaction_1.Reactions).remove(reaction)]; // The reaction is completly remove
                case 2:
                    _a.sent(); // The reaction is completly remove
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(post_1.Post).findOneBy({
                            post_id: req.body.post
                        })];
                case 3:
                    post = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(post_1.Post).update(post.post_id, { likeCount: post.likeCount - 1 })]; // The overall like count is decremented
                case 4:
                    _a.sent(); // The overall like count is decremented
                    res.json("success");
                    return [2 /*return*/];
            }
        });
    });
});
post_router.delete('/post/reaction/hearts/remove', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var reaction, post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(reaction_1.Reactions).findOneBy({
                        user: req.body.user
                    })];
                case 1:
                    reaction = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(reaction_1.Reactions).remove(reaction)]; // The reaction is completly remove
                case 2:
                    _a.sent(); // The reaction is completly remove
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(post_1.Post).findOneBy({
                            post_id: req.body.post
                        })];
                case 3:
                    post = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(post_1.Post).update(post.post_id, { heartsCount: post.heartsCount - 1 })]; // The overall like count is decremented
                case 4:
                    _a.sent(); // The overall like count is decremented
                    return [2 /*return*/];
            }
        });
    });
});
var rootRouter = (0, express_1.Router)();
