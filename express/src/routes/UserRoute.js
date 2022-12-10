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
exports.router = void 0;
var express_1 = require("express");
var app_data_source_1 = require("../app-data-source");
var user_1 = require("../entity/user");
var express_validator_1 = require("express-validator");
var rootRouter = (0, express_1.Router)();
exports.router = rootRouter;
var argon2 = require('argon2');
var isValidUser = function (value) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(user_1.User).findOneBy({
                    email: value
                }).then(function (user) {
                    if (user) {
                        return Promise.reject('Provided Email Already Exists');
                    }
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
// register routes
rootRouter.get("/users/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(user_1.User).findOneBy({
                        email: req.params.id
                    })];
                case 1:
                    results = _a.sent();
                    if (results === null) {
                        return [2 /*return*/, res.json(null)];
                    }
                    else {
                        return [2 /*return*/, res.json(results)];
                    }
                    return [2 /*return*/];
            }
        });
    });
});
rootRouter.get("/login", (0, express_validator_1.check)('username').exists({ checkFalsy: true }), (0, express_validator_1.check)('password').exists({ checkFalsy: true }), function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, results, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req);
                    console.log(errors);
                    if (!errors.isEmpty()) {
                        return [2 /*return*/, res.send({ errors: errors.array() })];
                    }
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(user_1.User).findOneBy({
                            email: req.query.username,
                        })];
                case 1:
                    results = _b.sent();
                    _a = results === null;
                    if (_a) return [3 /*break*/, 3];
                    return [4 /*yield*/, argon2.verify(results.password, req.query.password)];
                case 2:
                    _a = (_b.sent()) === false;
                    _b.label = 3;
                case 3:
                    if (_a)
                        // Login failed.
                        res.json(null);
                    else if (results === null || req.query.password === '') {
                        res.json(null);
                    }
                    else if (req.session) {
                        req.session.user = {
                            firstName: results.firstName,
                            lastName: results.lastName,
                            email: results.email
                        };
                    }
                    console.log(req.session.user);
                    res.json(results);
                    return [2 /*return*/];
            }
        });
    });
});
rootRouter.post("/users", (0, express_validator_1.body)('email', 'Invalid Email Provided').isEmail().custom(isValidUser), ((0, express_validator_1.body)('firstName').exists({ checkFalsy: true })), (0, express_validator_1.body)('lastName').exists({ checkFalsy: true }).matches(/^[a-zA-Z]+$/), (0, express_validator_1.body)('password').isLength({ min: 8, max: 15 })
    .exists({ checkFalsy: true, checkNull: true })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/), function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, hash, user, results, cookieUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req);
                    console.log(errors);
                    if (!errors.isEmpty()) {
                        return [2 /*return*/, res.send({ errors: errors.array() })];
                    }
                    return [4 /*yield*/, argon2.hash(req.body.password)];
                case 1:
                    hash = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(user_1.User).create({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            password: hash,
                            email: req.body.email
                        })];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(user_1.User).save(user)];
                case 3:
                    results = _a.sent();
                    cookieUser = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email
                    };
                    if (req.session) {
                        req.session.user = cookieUser;
                    }
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
rootRouter.get("/users", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (req.session.user) {
                res.send({ loggedIn: true, user: req.session.user });
            }
            else {
                res.send({ loggedIn: false });
            }
            return [2 /*return*/];
        });
    });
});
rootRouter.get("/logout", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(req.session);
            req.session.user = null;
            req.session.destroy(function (err) {
                if (err) {
                    console.log(err, "fired");
                }
            });
            return [2 /*return*/, res.redirect('/')];
        });
    });
});
rootRouter.put("/users/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(user_1.User).findOneBy({})];
                case 1:
                    user = _a.sent();
                    app_data_source_1.myDataSource.getRepository(user_1.User).merge(user, req.body);
                    return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(user_1.User).save(user)];
                case 2:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
rootRouter.delete("/users/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(user_1.User).delete(req.params.id)];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
