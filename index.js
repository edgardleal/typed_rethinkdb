"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.configure = exports.migrate = undefined;

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var migrate = exports.migrate = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(migrations, doFirst) {
        var _this = this;

        var migrationIds, current, result, currentMigration, lastMigrationId, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, migrationId, migration, migrationFn, _result;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return r.not(r.dbList().contains(dbName));

                    case 2:
                        if (!_context2.sent) {
                            _context2.next = 5;
                            break;
                        }

                        _context2.next = 5;
                        return r.dbCreate(dbName);

                    case 5:
                        _context2.next = 7;
                        return r.tableList().contains("config").not();

                    case 7:
                        if (!_context2.sent) {
                            _context2.next = 10;
                            break;
                        }

                        _context2.next = 10;
                        return r.tableCreate("config");

                    case 10:
                        migrationIds = (0, _keys2.default)(migrations).map(function (n) {
                            return parseInt(n);
                        }).sort(function (a, b) {
                            return a - b;
                        });
                        _context2.next = 13;
                        return r.table("config").get("migration_current")("value").default(0);

                    case 13:
                        current = _context2.sent;

                        if (!(migrationIds.find(function (x) {
                            return x > current;
                        }) === undefined)) {
                            _context2.next = 16;
                            break;
                        }

                        return _context2.abrupt("return");

                    case 16:
                        log("OBTAINING MIGRATION LOCK");
                        _context2.next = 19;
                        return r.table("config").get("migration_status").replace(function (x) {
                            return r.branch(r.not(x), { value: "running" }, x("value").eq("ok"), { value: "running" }, x("value").eq("running"), r.error("already running migrations"), x("value").eq("fatal"), r.error("migrations failed!!!"), r.error("unknown migration status!!!")).merge({ id: "migration_status" });
                        });

                    case 19:
                        result = _context2.sent;

                        if (!(result.first_error === "already running migrations")) {
                            _context2.next = 29;
                            break;
                        }

                        log("MIGRATION LOCK HELD BY SOMEBODY ELSE... WAITING AND TRYING AGAIN");
                        _context2.next = 24;
                        return sleep(3000);

                    case 24:
                        _context2.next = 26;
                        return migrate(migrations, doFirst);

                    case 26:
                        return _context2.abrupt("return", _context2.sent);

                    case 29:
                        if (result.first_error) {
                            console.log("MIGRATION LOCK FATAL ERROR", result.first_error);
                            process.exit(93);
                        }

                    case 30:
                        log("GOT MIGRATION LOCK");
                        _context2.prev = 31;
                        _context2.next = 34;
                        return r.table("config").get("migration_current")("value").default(0);

                    case 34:
                        currentMigration = _context2.sent;
                        lastMigrationId = migrationIds[migrationIds.length - 1];

                        if (!(currentMigration === 0 && doFirst)) {
                            _context2.next = 42;
                            break;
                        }

                        log("RUNNING FIRST MIGRATIONS  ", doFirst.join("-"));
                        _context2.next = 40;
                        return _promise2.default.all(doFirst.map(function () {
                            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(id) {
                                var migration, migrationFn, result;
                                return _regenerator2.default.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                migration = migrations[id];
                                                migrationFn = isQuery(migration) ? migration : migration();
                                                _context.next = 4;
                                                return migrationFn;

                                            case 4:
                                                result = _context.sent;

                                                if (!(result && result.first_error)) {
                                                    _context.next = 7;
                                                    break;
                                                }

                                                throw result.first_error;

                                            case 7:
                                            case "end":
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, _this);
                            }));

                            return function (_x4) {
                                return _ref2.apply(this, arguments);
                            };
                        }()));

                    case 40:
                        log("DONE RUNNING FIRST MIGRATIONS  ", doFirst.join("-"));
                        migrationIds = migrationIds.filter(function (id) {
                            return doFirst.indexOf(id) < 0;
                        });

                    case 42:
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context2.prev = 45;
                        _iterator = (0, _getIterator3.default)(migrationIds);

                    case 47:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context2.next = 66;
                            break;
                        }

                        migrationId = _step.value;

                        if (!(migrationId <= currentMigration)) {
                            _context2.next = 51;
                            break;
                        }

                        return _context2.abrupt("continue", 63);

                    case 51:
                        log("RUNNING MIGRATION  ", migrationId, "  ->  ", migrations[migrationId]);
                        migration = migrations[migrationId];
                        migrationFn = isQuery(migration) ? migration : migration();
                        _context2.next = 56;
                        return migrationFn;

                    case 56:
                        _result = _context2.sent;

                        if (!(_result && _result.first_error)) {
                            _context2.next = 59;
                            break;
                        }

                        throw _result.first_error;

                    case 59:
                        currentMigration = migrationId;
                        _context2.next = 62;
                        return r.table("config").get("migration_current").replace({ id: "migration_current", value: currentMigration });

                    case 62:
                        log("DONE RUNNING MIGRATION  ", migrationId);

                    case 63:
                        _iteratorNormalCompletion = true;
                        _context2.next = 47;
                        break;

                    case 66:
                        _context2.next = 72;
                        break;

                    case 68:
                        _context2.prev = 68;
                        _context2.t0 = _context2["catch"](45);
                        _didIteratorError = true;
                        _iteratorError = _context2.t0;

                    case 72:
                        _context2.prev = 72;
                        _context2.prev = 73;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 75:
                        _context2.prev = 75;

                        if (!_didIteratorError) {
                            _context2.next = 78;
                            break;
                        }

                        throw _iteratorError;

                    case 78:
                        return _context2.finish(75);

                    case 79:
                        return _context2.finish(72);

                    case 80:
                        if (!(doFirst && currentMigration < lastMigrationId)) {
                            _context2.next = 84;
                            break;
                        }

                        currentMigration = lastMigrationId;
                        _context2.next = 84;
                        return r.table("config").get("migration_current").replace({ id: "migration_current", value: currentMigration });

                    case 84:
                        log("RELEASING MIGRATION LOCK");
                        _context2.next = 87;
                        return r.table("config").get("migration_status").update({ value: "ok" });

                    case 87:
                        _context2.next = 97;
                        break;

                    case 89:
                        _context2.prev = 89;
                        _context2.t1 = _context2["catch"](31);

                        console.log("MIGRATION FATAL FAILURE ", _context2.t1);
                        _context2.next = 94;
                        return r.table("config").get("migration_status").update({ value: "fatal" });

                    case 94:
                        _context2.next = 96;
                        return r.table("config").get("migration_last_error").replace({ id: "migration_last_error", value: (0, _stringify2.default)(_context2.t1, null, 2) });

                    case 96:
                        process.exit(94);

                    case 97:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[31, 89], [45, 68, 72, 80], [73,, 75, 79]]);
    }));

    return function migrate(_x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var configure = exports.configure = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(options) {
        var _this2 = this;

        var tables, realTables, i, _loop, _i;

        return _regenerator2.default.wrap(function _callee3$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return r.not(r.dbList().contains(dbName));

                    case 2:
                        if (!_context4.sent) {
                            _context4.next = 5;
                            break;
                        }

                        _context4.next = 5;
                        return r.dbCreate(dbName);

                    case 5:
                        tables = (0, _keys2.default)(options.tables);
                        _context4.next = 8;
                        return r.tableList();

                    case 8:
                        realTables = _context4.sent;
                        i = 0;

                    case 10:
                        if (!(i < realTables.length)) {
                            _context4.next = 17;
                            break;
                        }

                        if (!(tables.indexOf(realTables[i]) >= 0)) {
                            _context4.next = 13;
                            break;
                        }

                        return _context4.abrupt("continue", 14);

                    case 13:
                        log("WARNING: Should dropping table " + realTables[i] + "...");
                    // await r.tableDrop(realTables[i]);

                    case 14:
                        ++i;
                        _context4.next = 10;
                        break;

                    case 17:
                        _loop = /*#__PURE__*/_regenerator2.default.mark(function _loop(_i) {
                            var table, indicesCreationFunc, indices, realIndices, _i2, _i3, status, realDescr, descr, match, _match, varMapping, varMatches, _i4;

                            return _regenerator2.default.wrap(function _loop$(_context3) {
                                while (1) {
                                    switch (_context3.prev = _context3.next) {
                                        case 0:
                                            table = tables[_i];

                                            if (!(realTables.indexOf(table) < 0)) {
                                                _context3.next = 5;
                                                break;
                                            }

                                            log("Creating table " + table + "...");
                                            _context3.next = 5;
                                            return r.tableCreate(table);

                                        case 5:
                                            indicesCreationFunc = options.tables[table].indices || [];
                                            indices = indicesCreationFunc.map(function (creationFunc) {
                                                var match = /^r\.table\("([^"]+)"\)\.indexCreate\("([^"]+)"/.exec(creationFunc.toString());
                                                if (match === null) throw "Invalid index expression: creationFunc.toString()";
                                                if (match[1] !== table) throw "Invalid index expression: Should use table " + table + ", but uses " + match[1] + ": creationFunc.toString()";
                                                return match[2];
                                            });
                                            _context3.next = 9;
                                            return r.table(table).indexList();

                                        case 9:
                                            realIndices = _context3.sent;
                                            _i2 = 0;

                                        case 11:
                                            if (!(_i2 < realIndices.length)) {
                                                _context3.next = 18;
                                                break;
                                            }

                                            if (!(indices.indexOf(realIndices[_i2]) >= 0)) {
                                                _context3.next = 14;
                                                break;
                                            }

                                            return _context3.abrupt("continue", 15);

                                        case 14:
                                            log("Dropping index " + table + "." + realIndices[_i2] + "...");
                                        // await (r as any).table(table).indexDrop(realIndices[i]);

                                        case 15:
                                            ++_i2;
                                            _context3.next = 11;
                                            break;

                                        case 18:
                                            _i3 = 0;

                                        case 19:
                                            if (!(_i3 < indices.length)) {
                                                _context3.next = 54;
                                                break;
                                            }

                                            if (!(realIndices.indexOf(indices[_i3]) < 0)) {
                                                _context3.next = 26;
                                                break;
                                            }

                                            log("Creating index " + table + "." + indices[_i3] + "...");
                                            _context3.next = 24;
                                            return indicesCreationFunc[_i3];

                                        case 24:
                                            _context3.next = 51;
                                            break;

                                        case 26:
                                            _context3.next = 28;
                                            return r.table(table).indexStatus(indices[_i3])(0);

                                        case 28:
                                            status = _context3.sent;
                                            realDescr = status.query;
                                            descr = indicesCreationFunc[_i3].toString();
                                            match = /(function[\s\S]*\})/.exec(realDescr);

                                            if (match) {
                                                _context3.next = 34;
                                                break;
                                            }

                                            throw "Index function doesn't contain a function??? " + (0, _stringify2.default)(realDescr);

                                        case 34:
                                            realDescr = match[1];
                                            _match = /(function[\s\S]*\})/.exec(descr);

                                            if (!_match) descr = "function (var_1) { return var_1(\"" + indices[_i3] + "\") }";else descr = _match[1];

                                            realDescr = global["eval"]("(" + realDescr + ")").toString();
                                            descr = global["eval"]("(" + descr + ")").toString();
                                            descr = descr.replace(/\n\s*/g, " ");
                                            realDescr = realDescr.replace(/\.getField/g, "");
                                            realDescr = realDescr.replace(/;/g, "");
                                            varMapping = {};
                                            varMatches = /(_?var\d+)/.exec(realDescr) || [];

                                            for (_i4 = 0; _i4 < varMatches.length; ++_i4) {
                                                if (varMapping[varMatches[_i4]] === undefined) {
                                                    varMapping[varMatches[_i4]] = "var_" + ((0, _keys2.default)(varMapping).length + 1);
                                                }
                                                realDescr = realDescr.replace(varMatches[_i4], varMapping[varMatches[_i4]]);
                                            }

                                            if (!(realDescr !== descr)) {
                                                _context3.next = 51;
                                                break;
                                            }

                                            log("Recreating index " + table + "." + indices[_i3] + "...");
                                            _context3.next = 49;
                                            return r.table(table).indexDrop(indices[_i3]);

                                        case 49:
                                            _context3.next = 51;
                                            return indicesCreationFunc[_i3];

                                        case 51:
                                            ++_i3;
                                            _context3.next = 19;
                                            break;

                                        case 54:
                                        case "end":
                                            return _context3.stop();
                                    }
                                }
                            }, _loop, _this2);
                        });
                        _i = 0;

                    case 19:
                        if (!(_i < tables.length)) {
                            _context4.next = 24;
                            break;
                        }

                        return _context4.delegateYield(_loop(_i), "t0", 21);

                    case 21:
                        ++_i;
                        _context4.next = 19;
                        break;

                    case 24:
                        log("Database structure is ready");

                    case 25:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee3, this);
    }));

    return function configure(_x5) {
        return _ref3.apply(this, arguments);
    };
}();
//# sourceMappingURL=index.js.map


exports.connect = connect;

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var r = void 0;
var dbName = void 0;
function isQuery(v) {
    return "_query" in v;
}
function connect(db) {
    var host = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "rethinkdb";

    dbName = db;
    r = require("rethinkdbdash")({
        db: db,
        pingInterval: 20,
        servers: [{
            host: host,
            port: 28015
        }],
        silent: !!process.env.TEST
    });
    return r;
}
function sleep(ms) {
    return new _promise2.default(function (resolve) {
        return setTimeout(resolve, ms);
    });
}
var log = process.env.TEST ? function () {} : console.log;
