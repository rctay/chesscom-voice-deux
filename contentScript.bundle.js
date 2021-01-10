/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "70b20fca5182ef3b4abc";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "contentScript";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/js/content-script.js")(__webpack_require__.s = "./src/js/content-script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! exports provided: app */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"app\", function() { return app; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings */ \"./src/js/settings/index.js\");\n/* harmony import */ var _observers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./observers */ \"./src/js/observers/index.js\");\n/* harmony import */ var _games__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./games */ \"./src/js/games/index.js\");\n/* harmony import */ var _audio__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./audio */ \"./src/js/audio/index.js\");\n/* harmony import */ var _audio_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./audio/utils */ \"./src/js/audio/utils.js\");\n\n\n\n\n\n\n\n\n\n\n\nlet voiceObj = null;\n\nconst pingFrequency = 1; // in seconds\n\nconst init = () => {\n  let chatElem = document.querySelector('.sidebar-tabsetBottom');\n  if (chatElem !== null) {\n    const manager = new _games__WEBPACK_IMPORTED_MODULE_3__[\"GamesManager\"]();\n    manager.addListener('start', ({ gameId, whiteUsername, blackUsername }) => {\n      Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"LOG\"])(`new game started, gameId=${gameId} whiteUsername=${whiteUsername} blackUsername=${blackUsername}`);\n      voiceObj && voiceObj.start();\n    });\n    manager.addListener('end', ({ gameId, ...params }) => {\n      if (params.draw) {\n        Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"LOG\"])(`game ended in a draw, reason=${params.drawnBy}`);\n        voiceObj.draw({ reason: params.drawnBy });\n      } else {\n        Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"LOG\"])(`game ended, winnerColor=${params.winnerColor}, winnerUsername=${params.winnerUsername} wonBy=${params.wonBy}`);\n        voiceObj && voiceObj.win(({ winnerColor: params.winnerColor, reason: params.wonBy }));\n      }\n    });\n\n    manager.addListener('move', ({ gameId, playerUsername, playerColor, san, ...params }) => {\n      Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"LOG\"])(`${playerColor} (${playerUsername}) played ${san}`);\n      voiceObj && voiceObj.move({ san });\n    });\n\n    manager.addListener('opening', ({ gameId, name }) => {\n      Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"LOG\"])(`We have opening ${name}`);\n      voiceObj && voiceObj.opening({ name });\n    });\n\n    manager.addListener('time', ({ playerColor, seconds }) => {\n      Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"LOG\"])(`${playerColor} clock is ${seconds}s`);\n      if (seconds === 30 || seconds === 15) {\n        voiceObj && voiceObj.time({ playerColor, seconds });\n      }\n    });\n\n    const idleListener = function({ playerColor, seconds }) {\n      if (idleListener.lastSeconds === undefined) {\n        idleListener.lastSeconds = { 'white': null, 'black': null };\n      }\n      // process only when passed seconds differs from last seen one\n      if (idleListener.lastSeconds[playerColor] === seconds) {\n        return;\n      }\n      idleListener.lastSeconds[playerColor] = seconds;\n\n      Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"LOG\"])(`${playerColor} is idle for ${seconds}s`);\n      if (seconds === 10 || (seconds > 10 && (seconds % 30 === 0))) {\n        voiceObj && voiceObj.idle({ playerColor, seconds });\n      }\n    };\n\n    manager.addListener('idle', idleListener);\n\n    manager.addListener('drawOffered', ({ playerColor, playerUsername }) => {\n      Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"LOG\"])(`draw offered by ${playerColor} (${playerUsername})`);\n      voiceObj && voiceObj.drawOffered({ playerColor, playerUsername });\n    });\n\n    manager.addListener('drawDeclined', ({ playerColor, playerUsername }) => {\n      Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"LOG\"])(`draw declined by ${playerColor} (${playerUsername})`);\n      voiceObj && voiceObj.drawDeclined({ playerColor, playerUsername });\n    });\n\n    const liveGameObserver = new _observers__WEBPACK_IMPORTED_MODULE_2__[\"LiveGameObserver\"](document, pingFrequency);\n    liveGameObserver.addHandler((event) => { manager.handleEvent(event)});\n    liveGameObserver.start();\n  }\n};\n\nconst loadVoiceObj = (callback) => {\n  _settings__WEBPACK_IMPORTED_MODULE_1__[\"Settings\"].get(['volume', 'voice'], ({ volume, voice }) => {\n    voiceObj = voice === 'off' ? null : Object(_audio__WEBPACK_IMPORTED_MODULE_4__[\"VoiceFactory\"])({ voice, volume: volume / 100 });\n    if (callback && typeof callback === 'function') {\n      callback();\n    }\n  });\n};\n\nchrome.runtime.onMessage.addListener(\n  function(request, sender, sendResponse) {\n    if (request.type === 'settingsChanged') {\n      loadVoiceObj();\n    }\n  }\n);\n\nconst app = () => {\n  loadVoiceObj(init);\n};\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvYXBwLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcz85MGU5Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgTE9HIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gJy4vc2V0dGluZ3MnO1xuaW1wb3J0IHsgTGl2ZUdhbWVPYnNlcnZlciB9IGZyb20gJy4vb2JzZXJ2ZXJzJztcbmltcG9ydCB7IEdhbWVzTWFuYWdlciB9IGZyb20gJy4vZ2FtZXMnO1xuXG5pbXBvcnQgeyBWb2ljZUZhY3RvcnkgfSBmcm9tICcuL2F1ZGlvJztcblxuaW1wb3J0IHsgbWFrZUF1ZGlvUGF0aCwgQXVkaW9TZXF1ZW5jZSwgUGxheVF1ZXVlIH0gZnJvbSAnLi9hdWRpby91dGlscyc7XG5cbmxldCB2b2ljZU9iaiA9IG51bGw7XG5cbmNvbnN0IHBpbmdGcmVxdWVuY3kgPSAxOyAvLyBpbiBzZWNvbmRzXG5cbmNvbnN0IGluaXQgPSAoKSA9PiB7XG4gIGxldCBjaGF0RWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyLXRhYnNldEJvdHRvbScpO1xuICBpZiAoY2hhdEVsZW0gIT09IG51bGwpIHtcbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IEdhbWVzTWFuYWdlcigpO1xuICAgIG1hbmFnZXIuYWRkTGlzdGVuZXIoJ3N0YXJ0JywgKHsgZ2FtZUlkLCB3aGl0ZVVzZXJuYW1lLCBibGFja1VzZXJuYW1lIH0pID0+IHtcbiAgICAgIExPRyhgbmV3IGdhbWUgc3RhcnRlZCwgZ2FtZUlkPSR7Z2FtZUlkfSB3aGl0ZVVzZXJuYW1lPSR7d2hpdGVVc2VybmFtZX0gYmxhY2tVc2VybmFtZT0ke2JsYWNrVXNlcm5hbWV9YCk7XG4gICAgICB2b2ljZU9iaiAmJiB2b2ljZU9iai5zdGFydCgpO1xuICAgIH0pO1xuICAgIG1hbmFnZXIuYWRkTGlzdGVuZXIoJ2VuZCcsICh7IGdhbWVJZCwgLi4ucGFyYW1zIH0pID0+IHtcbiAgICAgIGlmIChwYXJhbXMuZHJhdykge1xuICAgICAgICBMT0coYGdhbWUgZW5kZWQgaW4gYSBkcmF3LCByZWFzb249JHtwYXJhbXMuZHJhd25CeX1gKTtcbiAgICAgICAgdm9pY2VPYmouZHJhdyh7IHJlYXNvbjogcGFyYW1zLmRyYXduQnkgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBMT0coYGdhbWUgZW5kZWQsIHdpbm5lckNvbG9yPSR7cGFyYW1zLndpbm5lckNvbG9yfSwgd2lubmVyVXNlcm5hbWU9JHtwYXJhbXMud2lubmVyVXNlcm5hbWV9IHdvbkJ5PSR7cGFyYW1zLndvbkJ5fWApO1xuICAgICAgICB2b2ljZU9iaiAmJiB2b2ljZU9iai53aW4oKHsgd2lubmVyQ29sb3I6IHBhcmFtcy53aW5uZXJDb2xvciwgcmVhc29uOiBwYXJhbXMud29uQnkgfSkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbWFuYWdlci5hZGRMaXN0ZW5lcignbW92ZScsICh7IGdhbWVJZCwgcGxheWVyVXNlcm5hbWUsIHBsYXllckNvbG9yLCBzYW4sIC4uLnBhcmFtcyB9KSA9PiB7XG4gICAgICBMT0coYCR7cGxheWVyQ29sb3J9ICgke3BsYXllclVzZXJuYW1lfSkgcGxheWVkICR7c2FufWApO1xuICAgICAgdm9pY2VPYmogJiYgdm9pY2VPYmoubW92ZSh7IHNhbiB9KTtcbiAgICB9KTtcblxuICAgIG1hbmFnZXIuYWRkTGlzdGVuZXIoJ29wZW5pbmcnLCAoeyBnYW1lSWQsIG5hbWUgfSkgPT4ge1xuICAgICAgTE9HKGBXZSBoYXZlIG9wZW5pbmcgJHtuYW1lfWApO1xuICAgICAgdm9pY2VPYmogJiYgdm9pY2VPYmoub3BlbmluZyh7IG5hbWUgfSk7XG4gICAgfSk7XG5cbiAgICBtYW5hZ2VyLmFkZExpc3RlbmVyKCd0aW1lJywgKHsgcGxheWVyQ29sb3IsIHNlY29uZHMgfSkgPT4ge1xuICAgICAgTE9HKGAke3BsYXllckNvbG9yfSBjbG9jayBpcyAke3NlY29uZHN9c2ApO1xuICAgICAgaWYgKHNlY29uZHMgPT09IDMwIHx8IHNlY29uZHMgPT09IDE1KSB7XG4gICAgICAgIHZvaWNlT2JqICYmIHZvaWNlT2JqLnRpbWUoeyBwbGF5ZXJDb2xvciwgc2Vjb25kcyB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGlkbGVMaXN0ZW5lciA9IGZ1bmN0aW9uKHsgcGxheWVyQ29sb3IsIHNlY29uZHMgfSkge1xuICAgICAgaWYgKGlkbGVMaXN0ZW5lci5sYXN0U2Vjb25kcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlkbGVMaXN0ZW5lci5sYXN0U2Vjb25kcyA9IHsgJ3doaXRlJzogbnVsbCwgJ2JsYWNrJzogbnVsbCB9O1xuICAgICAgfVxuICAgICAgLy8gcHJvY2VzcyBvbmx5IHdoZW4gcGFzc2VkIHNlY29uZHMgZGlmZmVycyBmcm9tIGxhc3Qgc2VlbiBvbmVcbiAgICAgIGlmIChpZGxlTGlzdGVuZXIubGFzdFNlY29uZHNbcGxheWVyQ29sb3JdID09PSBzZWNvbmRzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlkbGVMaXN0ZW5lci5sYXN0U2Vjb25kc1twbGF5ZXJDb2xvcl0gPSBzZWNvbmRzO1xuXG4gICAgICBMT0coYCR7cGxheWVyQ29sb3J9IGlzIGlkbGUgZm9yICR7c2Vjb25kc31zYCk7XG4gICAgICBpZiAoc2Vjb25kcyA9PT0gMTAgfHwgKHNlY29uZHMgPiAxMCAmJiAoc2Vjb25kcyAlIDMwID09PSAwKSkpIHtcbiAgICAgICAgdm9pY2VPYmogJiYgdm9pY2VPYmouaWRsZSh7IHBsYXllckNvbG9yLCBzZWNvbmRzIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBtYW5hZ2VyLmFkZExpc3RlbmVyKCdpZGxlJywgaWRsZUxpc3RlbmVyKTtcblxuICAgIG1hbmFnZXIuYWRkTGlzdGVuZXIoJ2RyYXdPZmZlcmVkJywgKHsgcGxheWVyQ29sb3IsIHBsYXllclVzZXJuYW1lIH0pID0+IHtcbiAgICAgIExPRyhgZHJhdyBvZmZlcmVkIGJ5ICR7cGxheWVyQ29sb3J9ICgke3BsYXllclVzZXJuYW1lfSlgKTtcbiAgICAgIHZvaWNlT2JqICYmIHZvaWNlT2JqLmRyYXdPZmZlcmVkKHsgcGxheWVyQ29sb3IsIHBsYXllclVzZXJuYW1lIH0pO1xuICAgIH0pO1xuXG4gICAgbWFuYWdlci5hZGRMaXN0ZW5lcignZHJhd0RlY2xpbmVkJywgKHsgcGxheWVyQ29sb3IsIHBsYXllclVzZXJuYW1lIH0pID0+IHtcbiAgICAgIExPRyhgZHJhdyBkZWNsaW5lZCBieSAke3BsYXllckNvbG9yfSAoJHtwbGF5ZXJVc2VybmFtZX0pYCk7XG4gICAgICB2b2ljZU9iaiAmJiB2b2ljZU9iai5kcmF3RGVjbGluZWQoeyBwbGF5ZXJDb2xvciwgcGxheWVyVXNlcm5hbWUgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBsaXZlR2FtZU9ic2VydmVyID0gbmV3IExpdmVHYW1lT2JzZXJ2ZXIoZG9jdW1lbnQsIHBpbmdGcmVxdWVuY3kpO1xuICAgIGxpdmVHYW1lT2JzZXJ2ZXIuYWRkSGFuZGxlcigoZXZlbnQpID0+IHsgbWFuYWdlci5oYW5kbGVFdmVudChldmVudCl9KTtcbiAgICBsaXZlR2FtZU9ic2VydmVyLnN0YXJ0KCk7XG4gIH1cbn07XG5cbmNvbnN0IGxvYWRWb2ljZU9iaiA9IChjYWxsYmFjaykgPT4ge1xuICBTZXR0aW5ncy5nZXQoWyd2b2x1bWUnLCAndm9pY2UnXSwgKHsgdm9sdW1lLCB2b2ljZSB9KSA9PiB7XG4gICAgdm9pY2VPYmogPSB2b2ljZSA9PT0gJ29mZicgPyBudWxsIDogVm9pY2VGYWN0b3J5KHsgdm9pY2UsIHZvbHVtZTogdm9sdW1lIC8gMTAwIH0pO1xuICAgIGlmIChjYWxsYmFjayAmJiB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihcbiAgZnVuY3Rpb24ocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICBpZiAocmVxdWVzdC50eXBlID09PSAnc2V0dGluZ3NDaGFuZ2VkJykge1xuICAgICAgbG9hZFZvaWNlT2JqKCk7XG4gICAgfVxuICB9XG4pO1xuXG5jb25zdCBhcHAgPSAoKSA9PiB7XG4gIGxvYWRWb2ljZU9iaihpbml0KTtcbn07XG5cbmV4cG9ydCB7IGFwcCB9O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/app.js\n");

/***/ }),

/***/ "./src/js/audio/index.js":
/*!*******************************!*\
  !*** ./src/js/audio/index.js ***!
  \*******************************/
/*! exports provided: VoiceFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"VoiceFactory\", function() { return VoiceFactory; });\n/* harmony import */ var _voices_default__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./voices/default */ \"./src/js/audio/voices/default.js\");\n/* harmony import */ var _voices_danny__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./voices/danny */ \"./src/js/audio/voices/danny.js\");\n\n\n\nconst voices = {};\n\nconst VoiceFactory = ({ voice, volume }) => {\n  if (!voices[voice]) {\n    if (voice === 'default') {\n      voices[voice] = new _voices_default__WEBPACK_IMPORTED_MODULE_0__[\"DefaultVoice\"]({ volume });\n    } else if (voice === 'danny') {\n      voices[voice] = new _voices_danny__WEBPACK_IMPORTED_MODULE_1__[\"DannyVoice\"]({ volume });\n    }\n  }\n  const obj = voices[voice];\n  obj.volume = volume;\n  return obj;\n};\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvYXVkaW8vaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXVkaW8vaW5kZXguanM/ZTU2MiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWZhdWx0Vm9pY2UgfSBmcm9tICcuL3ZvaWNlcy9kZWZhdWx0JztcbmltcG9ydCB7IERhbm55Vm9pY2UgfSBmcm9tICcuL3ZvaWNlcy9kYW5ueSc7XG5cbmNvbnN0IHZvaWNlcyA9IHt9O1xuXG5jb25zdCBWb2ljZUZhY3RvcnkgPSAoeyB2b2ljZSwgdm9sdW1lIH0pID0+IHtcbiAgaWYgKCF2b2ljZXNbdm9pY2VdKSB7XG4gICAgaWYgKHZvaWNlID09PSAnZGVmYXVsdCcpIHtcbiAgICAgIHZvaWNlc1t2b2ljZV0gPSBuZXcgRGVmYXVsdFZvaWNlKHsgdm9sdW1lIH0pO1xuICAgIH0gZWxzZSBpZiAodm9pY2UgPT09ICdkYW5ueScpIHtcbiAgICAgIHZvaWNlc1t2b2ljZV0gPSBuZXcgRGFubnlWb2ljZSh7IHZvbHVtZSB9KTtcbiAgICB9XG4gIH1cbiAgY29uc3Qgb2JqID0gdm9pY2VzW3ZvaWNlXTtcbiAgb2JqLnZvbHVtZSA9IHZvbHVtZTtcbiAgcmV0dXJuIG9iajtcbn07XG5cbmV4cG9ydCB7XG4gIFZvaWNlRmFjdG9yeSxcbn07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/audio/index.js\n");

/***/ }),

/***/ "./src/js/audio/utils.js":
/*!*******************************!*\
  !*** ./src/js/audio/utils.js ***!
  \*******************************/
/*! exports provided: makeAudioPath, AudioSequence, PlayQueue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"makeAudioPath\", function() { return makeAudioPath; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AudioSequence\", function() { return AudioSequence; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PlayQueue\", function() { return PlayQueue; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/js/utils.js\");\n\n\n\n\nconst makeAudioPath = ({ basePath, identifierPath, extension }) => {\n  return `${basePath}${identifierPath}.${extension}`;\n}\n\nclass AudioSequence {\n  constructor(paths, volume) {\n    this.paths = paths;\n    this.volume = volume;\n    this.listeners = {};\n    this.audio = null;\n  }\n\n  _playNext() {\n    if (!this.paths.length) {\n      if (this.listeners['ended'] && typeof this.listeners['ended'] === 'function') {\n        this.listeners['ended']();\n      }\n    } else {\n      this.audio = new Audio();\n      this.audio.addEventListener('canplaythrough', () => {\n        this.audio.addEventListener('ended', () => { this._playNext(); });\n        this.audio.volume = this.volume;\n        this.audio.play();\n      });\n      this.audio.addEventListener('error', () => { this._playNext(); });\n      const path = this.paths.shift();\n      this.audio.src = chrome.extension.getURL(path);\n    }\n  }\n  play() {\n    this._playNext();\n  }\n\n  pause() {\n    if (this.audio !== null) {\n      this.audio.pause();\n    }\n  }\n\n  addEventListener(type, listener) {\n    this.listeners[type] = listener;\n  }\n};\n\nclass PlayQueue {\n  constructor() {\n    this.audios = [];\n  }\n\n  enqueue(audio, priority = 5) {\n    while (this.audios.length) {\n      const last = this.audios[this.audios.length-1];\n      if (last.priority < priority) {\n        last.audio.pause();\n        this.audios.pop();\n      } else {\n        break;\n      }\n    }\n    this.audios.push({\n      audio,\n      priority,\n    });\n    if (this.audios.length === 1) {\n      this.deque();\n    }\n  }\n\n  deque() {\n    if (!this.audios.length) {\n      return;\n    }\n    const head = this.audios[0].audio;\n    head.addEventListener('ended', () => {\n      this.audios.shift();\n      while (this.audios.length >= 2) {\n        this.audios.shift();\n      }\n      this.deque();\n    });\n\n    head.play();\n  }\n\n  clear() {\n    this.audios = [];\n  }\n};\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvYXVkaW8vdXRpbHMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXVkaW8vdXRpbHMuanM/Y2EyYSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IExPRyB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgbWFrZUF1ZGlvUGF0aCA9ICh7IGJhc2VQYXRoLCBpZGVudGlmaWVyUGF0aCwgZXh0ZW5zaW9uIH0pID0+IHtcbiAgcmV0dXJuIGAke2Jhc2VQYXRofSR7aWRlbnRpZmllclBhdGh9LiR7ZXh0ZW5zaW9ufWA7XG59XG5cbmNsYXNzIEF1ZGlvU2VxdWVuY2Uge1xuICBjb25zdHJ1Y3RvcihwYXRocywgdm9sdW1lKSB7XG4gICAgdGhpcy5wYXRocyA9IHBhdGhzO1xuICAgIHRoaXMudm9sdW1lID0gdm9sdW1lO1xuICAgIHRoaXMubGlzdGVuZXJzID0ge307XG4gICAgdGhpcy5hdWRpbyA9IG51bGw7XG4gIH1cblxuICBfcGxheU5leHQoKSB7XG4gICAgaWYgKCF0aGlzLnBhdGhzLmxlbmd0aCkge1xuICAgICAgaWYgKHRoaXMubGlzdGVuZXJzWydlbmRlZCddICYmIHR5cGVvZiB0aGlzLmxpc3RlbmVyc1snZW5kZWQnXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLmxpc3RlbmVyc1snZW5kZWQnXSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmF1ZGlvID0gbmV3IEF1ZGlvKCk7XG4gICAgICB0aGlzLmF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgKCkgPT4ge1xuICAgICAgICB0aGlzLmF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgKCkgPT4geyB0aGlzLl9wbGF5TmV4dCgpOyB9KTtcbiAgICAgICAgdGhpcy5hdWRpby52b2x1bWUgPSB0aGlzLnZvbHVtZTtcbiAgICAgICAgdGhpcy5hdWRpby5wbGF5KCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiB7IHRoaXMuX3BsYXlOZXh0KCk7IH0pO1xuICAgICAgY29uc3QgcGF0aCA9IHRoaXMucGF0aHMuc2hpZnQoKTtcbiAgICAgIHRoaXMuYXVkaW8uc3JjID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwocGF0aCk7XG4gICAgfVxuICB9XG4gIHBsYXkoKSB7XG4gICAgdGhpcy5fcGxheU5leHQoKTtcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIGlmICh0aGlzLmF1ZGlvICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmF1ZGlvLnBhdXNlKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gbGlzdGVuZXI7XG4gIH1cbn07XG5cbmNsYXNzIFBsYXlRdWV1ZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYXVkaW9zID0gW107XG4gIH1cblxuICBlbnF1ZXVlKGF1ZGlvLCBwcmlvcml0eSA9IDUpIHtcbiAgICB3aGlsZSAodGhpcy5hdWRpb3MubGVuZ3RoKSB7XG4gICAgICBjb25zdCBsYXN0ID0gdGhpcy5hdWRpb3NbdGhpcy5hdWRpb3MubGVuZ3RoLTFdO1xuICAgICAgaWYgKGxhc3QucHJpb3JpdHkgPCBwcmlvcml0eSkge1xuICAgICAgICBsYXN0LmF1ZGlvLnBhdXNlKCk7XG4gICAgICAgIHRoaXMuYXVkaW9zLnBvcCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuYXVkaW9zLnB1c2goe1xuICAgICAgYXVkaW8sXG4gICAgICBwcmlvcml0eSxcbiAgICB9KTtcbiAgICBpZiAodGhpcy5hdWRpb3MubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aGlzLmRlcXVlKCk7XG4gICAgfVxuICB9XG5cbiAgZGVxdWUoKSB7XG4gICAgaWYgKCF0aGlzLmF1ZGlvcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaGVhZCA9IHRoaXMuYXVkaW9zWzBdLmF1ZGlvO1xuICAgIGhlYWQuYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLmF1ZGlvcy5zaGlmdCgpO1xuICAgICAgd2hpbGUgKHRoaXMuYXVkaW9zLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIHRoaXMuYXVkaW9zLnNoaWZ0KCk7XG4gICAgICB9XG4gICAgICB0aGlzLmRlcXVlKCk7XG4gICAgfSk7XG5cbiAgICBoZWFkLnBsYXkoKTtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuYXVkaW9zID0gW107XG4gIH1cbn07XG5cbmV4cG9ydCB7XG4gIG1ha2VBdWRpb1BhdGgsXG4gIEF1ZGlvU2VxdWVuY2UsXG4gIFBsYXlRdWV1ZSxcbn07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/audio/utils.js\n");

/***/ }),

/***/ "./src/js/audio/voices/abstract.js":
/*!*****************************************!*\
  !*** ./src/js/audio/voices/abstract.js ***!
  \*****************************************/
/*! exports provided: AbstractVoice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AbstractVoice\", function() { return AbstractVoice; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/js/audio/utils.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ \"./src/js/utils.js\");\n\n\n\n\n\nclass AbstractVoice {\n  constructor({ volume }) {\n    if (new.target === AbstractVoice) {\n      throw new TypeError(\"Cannot construct AbstractVoice instances directly\");\n    }\n    this._volume = volume;\n    this._q = new _utils__WEBPACK_IMPORTED_MODULE_0__[\"PlayQueue\"]();\n  }\n\n  set volume(value) {\n    this._volume = value;\n  }\n\n  _playIds(ids, basePath, extension, priority = 5) {\n    const audios = ids.map(id => Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"makeAudioPath\"])({ basePath, identifierPath: id, extension }));\n    const seq = new _utils__WEBPACK_IMPORTED_MODULE_0__[\"AudioSequence\"](audios, this._volume);\n    this._q.enqueue(seq, priority);\n  }\n\n  start() {\n    Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"LOG\"])('start sound not implemented');\n  }\n\n  move({ san }) {\n    Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"LOG\"])('move sound not implemented');\n  }\n\n  idle({ playerColor, seconds }) {\n    Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"LOG\"])('idle sound not implemented');\n  }\n\n  time({ playeColor, seconds }) {\n    Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"LOG\"])('time sound not implemented');\n  }\n\n  win({ winnerColor, reason }) {\n    Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"LOG\"])('win sound not implemented');\n  }\n\n  draw({ reason }) {\n    Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"LOG\"])('draw sound not implemented');\n  }\n\n  opening({ name }) {\n    Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"LOG\"])('opening sound not implemented');\n  }\n\n  drawOffered({ playerColor, playerUsername }) {\n    Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"LOG\"])('draw offered sound not implemented');\n  }\n\n  drawDeclined({ playerColor, playerUsername }) {\n    Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"LOG\"])('draw declined sound not implemented');\n  }\n};\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvYXVkaW8vdm9pY2VzL2Fic3RyYWN0LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2F1ZGlvL3ZvaWNlcy9hYnN0cmFjdC5qcz8zODU5Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgQXVkaW9TZXF1ZW5jZSwgUGxheVF1ZXVlLCBtYWtlQXVkaW9QYXRoIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgTE9HIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuXG5jbGFzcyBBYnN0cmFjdFZvaWNlIHtcbiAgY29uc3RydWN0b3IoeyB2b2x1bWUgfSkge1xuICAgIGlmIChuZXcudGFyZ2V0ID09PSBBYnN0cmFjdFZvaWNlKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNvbnN0cnVjdCBBYnN0cmFjdFZvaWNlIGluc3RhbmNlcyBkaXJlY3RseVwiKTtcbiAgICB9XG4gICAgdGhpcy5fdm9sdW1lID0gdm9sdW1lO1xuICAgIHRoaXMuX3EgPSBuZXcgUGxheVF1ZXVlKCk7XG4gIH1cblxuICBzZXQgdm9sdW1lKHZhbHVlKSB7XG4gICAgdGhpcy5fdm9sdW1lID0gdmFsdWU7XG4gIH1cblxuICBfcGxheUlkcyhpZHMsIGJhc2VQYXRoLCBleHRlbnNpb24sIHByaW9yaXR5ID0gNSkge1xuICAgIGNvbnN0IGF1ZGlvcyA9IGlkcy5tYXAoaWQgPT4gbWFrZUF1ZGlvUGF0aCh7IGJhc2VQYXRoLCBpZGVudGlmaWVyUGF0aDogaWQsIGV4dGVuc2lvbiB9KSk7XG4gICAgY29uc3Qgc2VxID0gbmV3IEF1ZGlvU2VxdWVuY2UoYXVkaW9zLCB0aGlzLl92b2x1bWUpO1xuICAgIHRoaXMuX3EuZW5xdWV1ZShzZXEsIHByaW9yaXR5KTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIExPRygnc3RhcnQgc291bmQgbm90IGltcGxlbWVudGVkJyk7XG4gIH1cblxuICBtb3ZlKHsgc2FuIH0pIHtcbiAgICBMT0coJ21vdmUgc291bmQgbm90IGltcGxlbWVudGVkJyk7XG4gIH1cblxuICBpZGxlKHsgcGxheWVyQ29sb3IsIHNlY29uZHMgfSkge1xuICAgIExPRygnaWRsZSBzb3VuZCBub3QgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIHRpbWUoeyBwbGF5ZUNvbG9yLCBzZWNvbmRzIH0pIHtcbiAgICBMT0coJ3RpbWUgc291bmQgbm90IGltcGxlbWVudGVkJyk7XG4gIH1cblxuICB3aW4oeyB3aW5uZXJDb2xvciwgcmVhc29uIH0pIHtcbiAgICBMT0coJ3dpbiBzb3VuZCBub3QgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIGRyYXcoeyByZWFzb24gfSkge1xuICAgIExPRygnZHJhdyBzb3VuZCBub3QgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIG9wZW5pbmcoeyBuYW1lIH0pIHtcbiAgICBMT0coJ29wZW5pbmcgc291bmQgbm90IGltcGxlbWVudGVkJyk7XG4gIH1cblxuICBkcmF3T2ZmZXJlZCh7IHBsYXllckNvbG9yLCBwbGF5ZXJVc2VybmFtZSB9KSB7XG4gICAgTE9HKCdkcmF3IG9mZmVyZWQgc291bmQgbm90IGltcGxlbWVudGVkJyk7XG4gIH1cblxuICBkcmF3RGVjbGluZWQoeyBwbGF5ZXJDb2xvciwgcGxheWVyVXNlcm5hbWUgfSkge1xuICAgIExPRygnZHJhdyBkZWNsaW5lZCBzb3VuZCBub3QgaW1wbGVtZW50ZWQnKTtcbiAgfVxufTtcblxuZXhwb3J0IHtcbiAgQWJzdHJhY3RWb2ljZSxcbn07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/audio/voices/abstract.js\n");

/***/ }),

/***/ "./src/js/audio/voices/danny.js":
/*!**************************************!*\
  !*** ./src/js/audio/voices/danny.js ***!
  \**************************************/
/*! exports provided: DannyVoice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DannyVoice\", function() { return DannyVoice; });\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ \"./src/js/audio/voices/abstract.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ \"./src/js/utils.js\");\n\n\n\n\n\nconst shortestStringCover = ({ target, choices }) => {\n  // finds the shortest sequence of strings from choices that cover target string\n  // uses simple BFS to do that\n\n  let q = [{target, parts: []}];\n  let bestParts = [];\n  while (q.length) {\n    const { target, parts } = q.shift();\n    if (target === '') {\n      return parts;\n      break;\n    }\n    for (const part of choices) {\n      if (target.startsWith(part)) {\n        q.push({ target: target.substr(part.length), parts: [...parts, part] });\n      }\n    }\n  }\n  return null;\n};\n\n// list generated from available files\n\nconst soundVariants = {\"5\": [\"rank/5_1\"], \"Nxe4\": [\"full_move/Nxe4_1\"], \"Nxe7\": [\"full_move/Nxe7_1\"], \"R7e4\": [\"full_move/R7e4_1\", \"full_move/R7e4_2\", \"full_move/R7e4_3\"], \"Raa8\": [\"full_move/Raa8_2\", \"full_move/Raa8_3\", \"full_move/Raa8_1\"], \"Rxa4\": [\"full_move/Rxa4_1\"], \"Rxa1\": [\"full_move/Rxa1_1\"], \"d8\": [\"square/d8_4\", \"square/d8_1\", \"square/d8_2\"], \"c2\": [\"square/c2_4\", \"square/c2_2\", \"square/c2_1\"], \"d6\": [\"square/d6_1\", \"square/d6_2\", \"square/d6_4\"], \"d7\": [\"square/d7_2\", \"square/d7_1\", \"square/d7_4\"], \"d4\": [\"square/d4_2\", \"square/d4_1\", \"square/d4_4\"], \"d5\": [\"square/d5_1\", \"square/d5_2\", \"square/d5_4\"], \"d2\": [\"square/d2_4\", \"square/d2_2\", \"square/d2_1\"], \"d3\": [\"square/d3_4\", \"square/d3_1\", \"square/d3_2\", \"full_move/d3_1\"], \"d1\": [\"square/d1_4\", \"square/d1_2\", \"square/d1_1\"], \"Bxf1\": [\"full_move/Bxf1_1\"], \"black_wins\": [\"game_result/black_wins_1\"], \"black\": [\"color/black_2\", \"color/black_3\", \"color/black_1\"], \"4\": [\"rank/4_1\"], \"Rxg2\": [\"full_move/Rxg2_1\"], \"Qxd2\": [\"full_move/Qxd2_1\"], \"Qxd1\": [\"full_move/Qxd1_1\"], \"Qxd7\": [\"full_move/Qxd7_1\"], \"agreed\": [\"draw_offer/agreed_1\", \"draw_offer/agreed_2\"], \"g7\": [\"square/g7_4\", \"square/g7_2\", \"square/g7_1\"], \"g6\": [\"square/g6_4\", \"square/g6_1\", \"square/g6_2\"], \"g5\": [\"square/g5_4\", \"square/g5_1\", \"square/g5_2\"], \"g4\": [\"square/g4_4\", \"square/g4_2\", \"square/g4_1\"], \"g3\": [\"square/g3_1\", \"square/g3_2\", \"square/g3_4\"], \"g2\": [\"square/g2_2\", \"square/g2_1\", \"square/g2_4\", \"full_move/g2_1\"], \"g1\": [\"square/g1_2\", \"square/g1_1\", \"square/g1_4\"], \"Kxc5\": [\"full_move/Kxc5_1\"], \"Nxb2\": [\"full_move/Nxb2_1\"], \"O-O\": [\"full_move/O-O_8\", \"full_move/O-O_4\", \"full_move/O-O_5\", \"full_move/O-O_7\", \"full_move/O-O_6\", \"full_move/O-O_2\", \"full_move/O-O_3\", \"full_move/O-O_1\"], \"g8\": [\"square/g8_1\", \"square/g8_2\", \"square/g8_4\"], \"Rxf3\": [\"full_move/Rxf3_1\"], \"Rxf6\": [\"full_move/Rxf6_1\"], \"E60\": [\"opening/E60_2\", \"opening/E60_3\", \"opening/E60_1\", \"opening/E60_4\", \"opening/E60_5\", \"opening/E60_6\"], \"50 move-rule\": [\"game_drawn_reason/50moverule_1\"], \"drawoffered\": [\"draw_offer/drawoffered_1\", \"draw_offer/drawoffered_3\", \"draw_offer/drawoffered_2\", \"draw_offer/drawoffered_4\"], \"Bxg2\": [\"full_move/Bxg2_1\"], \"d\": [\"file/d_1\"], \"h\": [\"file/h_1\"], \"Bxg8\": [\"full_move/Bxg8_1\"], \"B23\": [\"opening/B23_4\", \"opening/B23_1\", \"opening/B23_3\", \"opening/B23_2\"], \"B22\": [\"opening/B22_5\", \"opening/B22_4\", \"opening/B22_6\", \"opening/B22_3\", \"opening/B22_2\", \"opening/B22_1\"], \"B21\": [\"opening/B21_4\", \"opening/B21_2\", \"opening/B21_3\", \"opening/B21_1\"], \"B20\": [\"opening/B20_4\", \"opening/B20_5\", \"opening/B20_1\", \"opening/B20_2\", \"opening/B20_3\"], \"x\": [\"move_modifier/takes_2\", \"move_modifier/takes_3\", \"move_modifier/takes_1\"], \"Kxd3\": [\"full_move/Kxd3_1\"], \"Kxd4\": [\"full_move/Kxd4_1\"], \"C50\": [\"opening/C50_2\", \"opening/C50_3\", \"opening/C50_1\", \"opening/C50_4\", \"opening/C50_5\", \"opening/C50_6\"], \"Kxb7\": [\"full_move/Kxb7_1\"], \"Kxb6\": [\"full_move/Kxb6_1\"], \"Kxb5\": [\"full_move/Kxb5_1\"], \"A80\": [\"opening/A80_1\", \"opening/A80_2\"], \"Nxc4\": [\"full_move/Nxc4_1\"], \"b4\": [\"square/b4_1\", \"square/b4_2\", \"square/b4_4\"], \"b5\": [\"square/b5_2\", \"square/b5_1\", \"square/b5_4\"], \"b6\": [\"square/b6_2\", \"square/b6_1\", \"square/b6_4\"], \"b7\": [\"square/b7_1\", \"square/b7_2\", \"square/b7_4\"], \"b1\": [\"square/b1_4\", \"square/b1_1\", \"square/b1_2\"], \"b2\": [\"square/b2_4\", \"square/b2_1\", \"square/b2_2\"], \"b3\": [\"square/b3_4\", \"square/b3_2\", \"square/b3_1\"], \"Rxg8\": [\"full_move/Rxg8_1\"], \"b8\": [\"square/b8_4\", \"square/b8_2\", \"square/b8_1\"], \"declined\": [\"draw_offer/declined_3\", \"draw_offer/declined_2\", \"draw_offer/declined_1\", \"draw_offer/declined_4\"], \"idle_black\": [\"idle/idle_black_5\", \"idle/idle_black_4\", \"idle/idle_black_1\", \"idle/idle_black_3\", \"idle/idle_black_2\"], \"#\": [\"move_modifier/mate_10\", \"move_modifier/mate_8\", \"move_modifier/mate_9\", \"move_modifier/mate_1\", \"move_modifier/mate_2\", \"move_modifier/mate_3\", \"move_modifier/mate_7\", \"move_modifier/mate_6\", \"move_modifier/mate_4\", \"move_modifier/mate_5\"], \"Qxf4\": [\"full_move/Qxf4_1\"], \"Qxf7\": [\"full_move/Qxf7_1\"], \"+\": [\"move_modifier/check_10\", \"move_modifier/check_9\", \"move_modifier/check_8\", \"move_modifier/check_6\", \"move_modifier/check_7\", \"move_modifier/check_5\", \"move_modifier/check_4\", \"move_modifier/check_1\", \"move_modifier/check_3\", \"move_modifier/check_2\"], \"Bxd5\": [\"full_move/Bxd5_2\", \"full_move/Bxd5_1\"], \"C84\": [\"opening/C84_1\"], \"C30\": [\"opening/C30_1\", \"opening/C30_3\", \"opening/C30_2\", \"opening/C30_4\"], \"3\": [\"rank/3_1\"], \"7\": [\"rank/7_1\"], \"C45\": [\"opening/C45_6\", \"opening/C45_4\", \"opening/C45_5\", \"opening/C45_1\", \"opening/C45_2\", \"opening/C45_3\"], \"K\": [\"piece/king_6\", \"piece/king_4\", \"piece/king_5\", \"piece/king_1\", \"piece/king_2\", \"piece/king_3\"], \"Kxa6\": [\"full_move/Kxa6_1\"], \"agreement\": [\"game_drawn_reason/agreement_1\"], \"Kxa5\": [\"full_move/Kxa5_1\"], \"B01\": [\"opening/B01_8\", \"opening/B01_9\", \"opening/B01_1\", \"opening/B01_2\", \"opening/B01_3\", \"opening/B01_7\", \"opening/B01_6\", \"opening/B01_4\", \"opening/B01_5\"], \"B00\": [\"opening/B00_2\", \"opening/B00_3\", \"opening/B00_1\", \"opening/B00_4\"], \"B02\": [\"opening/B02_1\", \"opening/B02_3\", \"opening/B02_2\", \"opening/B02_6\", \"opening/B02_7\", \"opening/B02_5\", \"opening/B02_4\"], \"e8\": [\"square/e8_4\", \"square/e8_2\", \"square/e8_1\"], \"B07\": [\"opening/B07_8\", \"opening/B07_7\", \"opening/B07_6\", \"opening/B07_4\", \"opening/B07_5\", \"opening/B07_1\", \"opening/B07_2\", \"opening/B07_3\"], \"e5\": [\"square/e5_2\", \"square/e5_1\", \"square/e5_4\"], \"e4\": [\"square/e4_1\", \"square/e4_2\", \"square/e4_4\"], \"e7\": [\"square/e7_1\", \"square/e7_2\", \"square/e7_4\"], \"e6\": [\"square/e6_2\", \"square/e6_1\", \"square/e6_4\"], \"e1\": [\"square/e1_4\", \"square/e1_1\", \"square/e1_2\"], \"by\": [\"misc/by_2\", \"misc/by_1\"], \"e3\": [\"square/e3_4\", \"square/e3_2\", \"square/e3_1\"], \"e2\": [\"square/e2_4\", \"square/e2_1\", \"square/e2_2\"], \"on\": [\"misc/on_2\", \"misc/on_1\"], \"c\": [\"file/c_1\"], \"g\": [\"file/g_1\"], \"Rxg4\": [\"full_move/Rxg4_1\"], \"Bxe4\": [\"full_move/Bxe4_1\"], \"D80\": [\"opening/D80_2\", \"opening/D80_3\", \"opening/D80_1\", \"opening/D80_4\", \"opening/D80_5\", \"opening/D80_6\"], \"Qxa5\": [\"full_move/Qxa5_1\"], \"Qxa7\": [\"full_move/Qxa7_1\"], \"idle_white\": [\"idle/idle_white_2\", \"idle/idle_white_3\", \"idle/idle_white_1\", \"idle/idle_white_4\", \"idle/idle_white_5\"], \"checkmate\": [\"game_won_reason/checkmate_1\"], \"h8\": [\"square/h8_4\", \"square/h8_1\", \"square/h8_2\"], \"D10\": [\"opening/D10_4\", \"opening/D10_5\", \"opening/D10_1\", \"opening/D10_2\", \"opening/D10_3\"], \"A40\": [\"opening/A40_4\", \"opening/A40_1\", \"opening/A40_3\", \"opening/A40_2\"], \"h2\": [\"square/h2_4\", \"square/h2_2\", \"square/h2_1\"], \"h3\": [\"square/h3_4\", \"square/h3_1\", \"square/h3_2\"], \"h1\": [\"square/h1_4\", \"square/h1_2\", \"square/h1_1\"], \"h6\": [\"square/h6_1\", \"square/h6_2\", \"square/h6_4\"], \"h7\": [\"square/h7_2\", \"square/h7_1\", \"square/h7_4\"], \"h4\": [\"square/h4_2\", \"square/h4_1\", \"square/h4_4\", \"full_move/h4_1\"], \"h5\": [\"square/h5_1\", \"square/h5_2\", \"square/h5_4\"], \"resignation\": [\"game_won_reason/resignation_3\", \"game_won_reason/resignation_2\", \"game_won_reason/resignation_1\"], \"Rxd6\": [\"full_move/Rxd6_1\"], \"Kxh8\": [\"full_move/Kxh8_1\"], \"B10\": [\"opening/B10_1\", \"opening/B10_3\", \"opening/B10_2\", \"opening/B10_6\", \"opening/B10_5\", \"opening/B10_4\"], \"low_on_time\": [\"low_on_time/low_on_time_2\", \"low_on_time/low_on_time_3\", \"low_on_time/low_on_time_1\", \"low_on_time/low_on_time_4\", \"low_on_time/low_on_time_5\", \"low_on_time/low_on_time_7\", \"low_on_time/low_on_time_6\", \"low_on_time/low_on_time_8\", \"low_on_time/low_on_time_9\", \"low_on_time/low_on_time_15\", \"low_on_time/low_on_time_14\", \"low_on_time/low_on_time_10\", \"low_on_time/low_on_time_11\", \"low_on_time/low_on_time_13\", \"low_on_time/low_on_time_12\"], \"Rxe2\": [\"full_move/Rxe2_1\"], \"Ne4\": [\"full_move/Ne4_1\"], \"Rxe7\": [\"full_move/Rxe7_1\"], \"Nxg2\": [\"full_move/Nxg2_1\"], \"pawn\": [\"piece/pawn_4\", \"piece/pawn_1\", \"piece/pawn_3\", \"piece/pawn_2\"], \"low_on_time_black\": [\"low_on_time/low_on_time_black_7\", \"low_on_time/low_on_time_black_6\", \"low_on_time/low_on_time_black_4\", \"low_on_time/low_on_time_black_5\", \"low_on_time/low_on_time_black_1\", \"low_on_time/low_on_time_black_2\", \"low_on_time/low_on_time_black_3\", \"low_on_time/low_on_time_black_12\", \"low_on_time/low_on_time_black_13\", \"low_on_time/low_on_time_black_11\", \"low_on_time/low_on_time_black_10\", \"low_on_time/low_on_time_black_8\", \"low_on_time/low_on_time_black_9\"], \"Nxh4\": [\"full_move/Nxh4_1\"], \"Qxh2\": [\"full_move/Qxh2_1\"], \"insufficient material\": [\"game_drawn_reason/insufficient_1\"], \"E11\": [\"opening/E11_1\", \"opening/E11_2\", \"opening/E11_3\", \"opening/E11_4\", \"opening/E11_5\"], \"2\": [\"rank/2_1\"], \"Q\": [\"piece/queen_4\", \"piece/queen_5\", \"piece/queen_2\", \"piece/queen_3\", \"piece/queen_1\"], \"6\": [\"rank/6_1\"], \"white\": [\"color/white_1\", \"color/white_3\", \"color/white_2\"], \"Bxb7\": [\"full_move/Bxb7_1\"], \"Bxb1\": [\"full_move/Bxb1_2\", \"full_move/Bxb1_1\"], \"Nxf4\": [\"full_move/Nxf4_1\"], \"C80\": [\"opening/C80_1\"], \"Nbd2\": [\"full_move/Nbd2_1\", \"full_move/Nbd2_2\", \"full_move/Nbd2_3\"], \"E12\": [\"opening/E12_1\", \"opening/E12_3\", \"opening/E12_2\", \"opening/E12_5\", \"opening/E12_4\"], \"E20\": [\"opening/E20_5\", \"opening/E20_4\", \"opening/E20_6\", \"opening/E20_7\", \"opening/E20_3\", \"opening/E20_2\", \"opening/E20_1\"], \"Bxh7\": [\"full_move/Bxh7_1\"], \"Nxf3\": [\"full_move/Nxf3_1\"], \"offered\": [\"draw_offer/offered_1\", \"draw_offer/offered_2\", \"draw_offer/offered_3\"], \"C60\": [\"opening/C60_5\", \"opening/C60_4\", \"opening/C60_3\", \"opening/C60_2\", \"opening/C60_1\"], \"Nxc6\": [\"full_move/Nxc6_1\"], \"c8\": [\"square/c8_4\", \"square/c8_1\", \"square/c8_2\"], \"8\": [\"rank/8_1\"], \"stalemate\": [\"game_drawn_reason/stalemate_1\"], \"c3\": [\"square/c3_4\", \"square/c3_1\", \"square/c3_2\"], \"e\": [\"file/e_1\"], \"c1\": [\"square/c1_4\", \"square/c1_2\", \"square/c1_1\"], \"repetition\": [\"game_drawn_reason/repetition_1\"], \"c7\": [\"square/c7_2\", \"square/c7_1\", \"square/c7_4\"], \"c6\": [\"square/c6_1\", \"square/c6_2\", \"square/c6_4\"], \"c5\": [\"square/c5_1\", \"square/c5_2\", \"square/c5_4\"], \"c4\": [\"square/c4_2\", \"square/c4_1\", \"square/c4_4\", \"full_move/c4_1\"], \"Rxg3\": [\"full_move/Rxg3_1\"], \"b\": [\"file/b_1\"], \"game_start\": [\"game_start/game_start_11\", \"game_start/game_start_10\", \"game_start/game_start_12\", \"game_start/game_start_13\", \"game_start/game_start_16\", \"game_start/game_start_14\", \"game_start/game_start_8\", \"game_start/game_start_9\", \"game_start/game_start_15\", \"game_start/game_start_4\", \"game_start/game_start_5\", \"game_start/game_start_7\", \"game_start/game_start_6\", \"game_start/game_start_2\", \"game_start/game_start_3\", \"game_start/game_start_1\"], \"f\": [\"file/f_1\"], \"Kxe2\": [\"full_move/Kxe2_1\"], \"Rxb7\": [\"full_move/Rxb7_1\"], \"Rxb2\": [\"full_move/Rxb2_1\"], \"idle\": [\"idle/idle_18\", \"idle/idle_8\", \"idle/idle_9\", \"idle/idle_19\", \"idle/idle_17\", \"idle/idle_7\", \"idle/idle_6\", \"idle/idle_16\", \"idle/idle_14\", \"idle/idle_4\", \"idle/idle_5\", \"idle/idle_15\", \"idle/idle_11\", \"idle/idle_1\", \"idle/idle_10\", \"idle/idle_12\", \"idle/idle_2\", \"idle/idle_3\", \"idle/idle_13\"], \"Qxc1\": [\"full_move/Qxc1_1\"], \"Nxa5\": [\"full_move/Nxa5_1\"], \"Qxc7\": [\"full_move/Qxc7_1\", \"full_move/Qxc7_2\"], \"Qxc4\": [\"full_move/Qxc4_1\"], \"B\": [\"piece/bishop_4\", \"piece/bishop_5\", \"piece/bishop_1\", \"piece/bishop_2\", \"piece/bishop_3\"], \"Rxg6\": [\"full_move/Rxg6_1\"], \"f1\": [\"square/f1_1\", \"square/f1_2\", \"square/f1_4\"], \"f2\": [\"square/f2_1\", \"square/f2_2\", \"square/f2_4\"], \"f3\": [\"square/f3_2\", \"square/f3_1\", \"square/f3_4\"], \"f4\": [\"square/f4_4\", \"square/f4_1\", \"square/f4_2\"], \"f5\": [\"square/f5_4\", \"square/f5_2\", \"square/f5_1\"], \"f6\": [\"square/f6_4\", \"square/f6_2\", \"square/f6_1\"], \"f7\": [\"square/f7_4\", \"square/f7_1\", \"square/f7_2\"], \"f8\": [\"square/f8_2\", \"square/f8_1\", \"square/f8_4\"], \"A56\": [\"opening/A56_2\", \"opening/A56_3\", \"opening/A56_1\", \"opening/A56_4\", \"opening/A56_5\"], \"low_on_time_white\": [\"low_on_time/low_on_time_white_11\", \"low_on_time/low_on_time_white_10\", \"low_on_time/low_on_time_white_12\", \"low_on_time/low_on_time_white_13\", \"low_on_time/low_on_time_white_9\", \"low_on_time/low_on_time_white_8\", \"low_on_time/low_on_time_white_3\", \"low_on_time/low_on_time_white_2\", \"low_on_time/low_on_time_white_1\", \"low_on_time/low_on_time_white_5\", \"low_on_time/low_on_time_white_4\", \"low_on_time/low_on_time_white_6\", \"low_on_time/low_on_time_white_7\"], \"D30\": [\"opening/D30_2\", \"opening/D30_3\", \"opening/D30_1\", \"opening/D30_4\", \"opening/D30_5\"], \"Bxh1\": [\"full_move/Bxh1_1\"], \"Kxc8\": [\"full_move/Kxc8_1\"], \"R\": [\"piece/rook_4\", \"piece/rook_5\", \"piece/rook_6\", \"piece/rook_2\", \"piece/rook_3\", \"piece/rook_1\"], \"A57\": [\"opening/A57_1\", \"opening/A57_2\", \"opening/A57_3\", \"opening/A57_4\"], \"A10\": [\"opening/A10_3\", \"opening/A10_2\", \"opening/A10_1\", \"opening/A10_5\", \"opening/A10_4\"], \"Rxc8\": [\"full_move/Rxc8_1\"], \"Rxc6\": [\"full_move/Rxc6_1\"], \"Rxc3\": [\"full_move/Rxc3_1\"], \"Rxc1\": [\"full_move/Rxc1_1\"], \"drawdeclined\": [\"draw_offer/drawdeclined_4\", \"draw_offer/drawdeclined_2\", \"draw_offer/drawdeclined_3\", \"draw_offer/drawdeclined_1\"], \"Kxg4\": [\"full_move/Kxg4_1\"], \"Kxg7\": [\"full_move/Kxg7_1\"], \"=\": [\"move_modifier/equals_2\", \"move_modifier/equals_1\"], \"Qg5\": [\"full_move/Qg5_1\"], \"Nxd2\": [\"full_move/Nxd2_1\"], \"Nxd3\": [\"full_move/Nxd3_1\"], \"draw\": [\"game_result/draw_1\", \"game_result/draw_2\"], \"A81\": [\"opening/A81_3\", \"opening/A81_2\", \"opening/A81_1\"], \"O-O-O\": [\"full_move/O-O-O_1\", \"full_move/O-O-O_3\", \"full_move/O-O-O_2\", \"full_move/O-O-O_6\", \"full_move/O-O-O_7\", \"full_move/O-O-O_5\", \"full_move/O-O-O_4\"], \"a1\": [\"square/a1_1\", \"square/a1_2\", \"square/a1_4\"], \"a3\": [\"square/a3_2\", \"square/a3_1\", \"square/a3_4\"], \"a2\": [\"square/a2_1\", \"square/a2_2\", \"square/a2_4\"], \"a5\": [\"square/a5_4\", \"square/a5_2\", \"square/a5_1\"], \"a4\": [\"square/a4_4\", \"square/a4_1\", \"square/a4_2\"], \"a7\": [\"square/a7_4\", \"square/a7_1\", \"square/a7_2\"], \"a6\": [\"square/a6_4\", \"square/a6_2\", \"square/a6_1\"], \"C00\": [\"opening/C00_4\", \"opening/C00_5\", \"opening/C00_1\", \"opening/C00_2\", \"opening/C00_3\"], \"a8\": [\"square/a8_2\", \"square/a8_1\", \"square/a8_4\"], \"N\": [\"piece/knight_6\", \"piece/knight_4\", \"piece/knight_5\", \"piece/knight_1\", \"piece/knight_2\", \"piece/knight_3\"], \"Ke5\": [\"full_move/Ke5_1\"], \"a\": [\"file/a_1\"], \"Bxa6\": [\"full_move/Bxa6_1\"], \"white_wins\": [\"game_result/white_wins_1\"], \"Bxa2\": [\"full_move/Bxa2_1\"], \"A02\": [\"opening/A02_3\", \"opening/A02_2\", \"opening/A02_1\", \"opening/A02_5\", \"opening/A02_4\", \"opening/A02_6\"], \"wins\": [\"game_result/wins_1\"], \"A00\": [\"opening/A00_1\", \"opening/A00_2\", \"opening/A00_3\", \"opening/A00_7\", \"opening/A00_6\", \"opening/A00_4\", \"opening/A00_5\"], \"A01\": [\"opening/A01_8\", \"opening/A01_9\", \"opening/A01_2\", \"opening/A01_3\", \"opening/A01_1\", \"opening/A01_10\", \"opening/A01_4\", \"opening/A01_5\", \"opening/A01_7\", \"opening/A01_6\"], \"A07\": [\"opening/A07_4\", \"opening/A07_5\", \"opening/A07_2\", \"opening/A07_3\", \"opening/A07_1\"], \"A04\": [\"opening/A04_5\", \"opening/A04_4\", \"opening/A04_3\", \"opening/A04_2\", \"opening/A04_1\"], \"Kxf3\": [\"full_move/Kxf3_1\"], \"1\": [\"rank/1_1\"], \"time\": [\"game_won_reason/time_1\", \"game_won_reason/time_2\"]};\n\nconst soundExists = id => id in soundVariants;\nconst choice = lst => lst[Math.floor(Math.random()*lst.length)];\nconst getRandomForIds = (...ids) => choice(soundVariants[choice(ids)]);\nconst defaultBasePath = 'sounds/danny/mp3/';\nconst defaultExtension = 'mp3';\n\nclass DannyVoice extends _abstract__WEBPACK_IMPORTED_MODULE_0__[\"AbstractVoice\"] {\n\n  start() {\n    const ids = [\n      getRandomForIds('game_start'),\n    ];\n    this._playIds(ids, defaultBasePath, defaultExtension);\n  }\n\n  move({ san }) {\n    const parts = shortestStringCover({\n      target: san,\n      choices: Object.keys(soundVariants),\n    });\n    if (parts) {\n      const ids = parts.map(id => getRandomForIds(id));\n      this._playIds(ids, defaultBasePath, defaultExtension);\n    }\n  }\n\n  win({ winnerColor, reason }) {\n    const ids = [\n      getRandomForIds(winnerColor),\n      getRandomForIds('wins'),\n      getRandomForIds(reason === 'time' ? 'on' : 'by'),\n      getRandomForIds(reason),\n    ];\n    this._playIds(ids, defaultBasePath, defaultExtension);\n  }\n\n  draw({ reason }) {\n    const ids = [\n      getRandomForIds('draw'),\n      getRandomForIds('by'),\n      getRandomForIds(reason),\n    ];\n    this._playIds(ids, defaultBasePath, defaultExtension);\n  }\n\n  time({ playerColor, seconds }) {\n    const ids = [\n      getRandomForIds('low_on_time', `low_on_time_${playerColor}`),\n    ];\n    this._playIds(ids, defaultBasePath, defaultExtension, 1);\n  }\n\n  idle({ playerColor, seconds }) {\n    const ids = [\n      getRandomForIds('idle', `idle_${playerColor}`),\n    ];\n    this._playIds(ids, defaultBasePath, defaultExtension, 0);\n  }\n\n  drawOffered({ playerColor, playerUsername }) {\n    const ids = [\n      getRandomForIds(playerColor),\n      getRandomForIds('offered'),\n      getRandomForIds('draw'),\n    ];\n    this._playIds(ids, defaultBasePath, defaultExtension);\n  }\n\n  drawDeclined({ playerColor, playerUsername }) {\n    const ids = [\n      getRandomForIds(playerColor),\n      getRandomForIds('declined'),\n      getRandomForIds('draw'),\n    ];\n    this._playIds(ids, defaultBasePath, defaultExtension);\n  }\n\n  opening({ name }) {\n    const openingId = name.split(':')[0];\n    if (soundExists(openingId)) {\n      const ids = [\n        getRandomForIds(openingId),\n      ];\n      this._playIds(ids, defaultBasePath, defaultExtension);\n    }\n  }\n};\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvYXVkaW8vdm9pY2VzL2Rhbm55LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2F1ZGlvL3ZvaWNlcy9kYW5ueS5qcz9iOTk2Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgQWJzdHJhY3RWb2ljZSB9IGZyb20gJy4vYWJzdHJhY3QnO1xuaW1wb3J0IHsgTE9HIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuXG5jb25zdCBzaG9ydGVzdFN0cmluZ0NvdmVyID0gKHsgdGFyZ2V0LCBjaG9pY2VzIH0pID0+IHtcbiAgLy8gZmluZHMgdGhlIHNob3J0ZXN0IHNlcXVlbmNlIG9mIHN0cmluZ3MgZnJvbSBjaG9pY2VzIHRoYXQgY292ZXIgdGFyZ2V0IHN0cmluZ1xuICAvLyB1c2VzIHNpbXBsZSBCRlMgdG8gZG8gdGhhdFxuXG4gIGxldCBxID0gW3t0YXJnZXQsIHBhcnRzOiBbXX1dO1xuICBsZXQgYmVzdFBhcnRzID0gW107XG4gIHdoaWxlIChxLmxlbmd0aCkge1xuICAgIGNvbnN0IHsgdGFyZ2V0LCBwYXJ0cyB9ID0gcS5zaGlmdCgpO1xuICAgIGlmICh0YXJnZXQgPT09ICcnKSB7XG4gICAgICByZXR1cm4gcGFydHM7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZm9yIChjb25zdCBwYXJ0IG9mIGNob2ljZXMpIHtcbiAgICAgIGlmICh0YXJnZXQuc3RhcnRzV2l0aChwYXJ0KSkge1xuICAgICAgICBxLnB1c2goeyB0YXJnZXQ6IHRhcmdldC5zdWJzdHIocGFydC5sZW5ndGgpLCBwYXJ0czogWy4uLnBhcnRzLCBwYXJ0XSB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG4vLyBsaXN0IGdlbmVyYXRlZCBmcm9tIGF2YWlsYWJsZSBmaWxlc1xuXG5jb25zdCBzb3VuZFZhcmlhbnRzID0ge1wiNVwiOiBbXCJyYW5rLzVfMVwiXSwgXCJOeGU0XCI6IFtcImZ1bGxfbW92ZS9OeGU0XzFcIl0sIFwiTnhlN1wiOiBbXCJmdWxsX21vdmUvTnhlN18xXCJdLCBcIlI3ZTRcIjogW1wiZnVsbF9tb3ZlL1I3ZTRfMVwiLCBcImZ1bGxfbW92ZS9SN2U0XzJcIiwgXCJmdWxsX21vdmUvUjdlNF8zXCJdLCBcIlJhYThcIjogW1wiZnVsbF9tb3ZlL1JhYThfMlwiLCBcImZ1bGxfbW92ZS9SYWE4XzNcIiwgXCJmdWxsX21vdmUvUmFhOF8xXCJdLCBcIlJ4YTRcIjogW1wiZnVsbF9tb3ZlL1J4YTRfMVwiXSwgXCJSeGExXCI6IFtcImZ1bGxfbW92ZS9SeGExXzFcIl0sIFwiZDhcIjogW1wic3F1YXJlL2Q4XzRcIiwgXCJzcXVhcmUvZDhfMVwiLCBcInNxdWFyZS9kOF8yXCJdLCBcImMyXCI6IFtcInNxdWFyZS9jMl80XCIsIFwic3F1YXJlL2MyXzJcIiwgXCJzcXVhcmUvYzJfMVwiXSwgXCJkNlwiOiBbXCJzcXVhcmUvZDZfMVwiLCBcInNxdWFyZS9kNl8yXCIsIFwic3F1YXJlL2Q2XzRcIl0sIFwiZDdcIjogW1wic3F1YXJlL2Q3XzJcIiwgXCJzcXVhcmUvZDdfMVwiLCBcInNxdWFyZS9kN180XCJdLCBcImQ0XCI6IFtcInNxdWFyZS9kNF8yXCIsIFwic3F1YXJlL2Q0XzFcIiwgXCJzcXVhcmUvZDRfNFwiXSwgXCJkNVwiOiBbXCJzcXVhcmUvZDVfMVwiLCBcInNxdWFyZS9kNV8yXCIsIFwic3F1YXJlL2Q1XzRcIl0sIFwiZDJcIjogW1wic3F1YXJlL2QyXzRcIiwgXCJzcXVhcmUvZDJfMlwiLCBcInNxdWFyZS9kMl8xXCJdLCBcImQzXCI6IFtcInNxdWFyZS9kM180XCIsIFwic3F1YXJlL2QzXzFcIiwgXCJzcXVhcmUvZDNfMlwiLCBcImZ1bGxfbW92ZS9kM18xXCJdLCBcImQxXCI6IFtcInNxdWFyZS9kMV80XCIsIFwic3F1YXJlL2QxXzJcIiwgXCJzcXVhcmUvZDFfMVwiXSwgXCJCeGYxXCI6IFtcImZ1bGxfbW92ZS9CeGYxXzFcIl0sIFwiYmxhY2tfd2luc1wiOiBbXCJnYW1lX3Jlc3VsdC9ibGFja193aW5zXzFcIl0sIFwiYmxhY2tcIjogW1wiY29sb3IvYmxhY2tfMlwiLCBcImNvbG9yL2JsYWNrXzNcIiwgXCJjb2xvci9ibGFja18xXCJdLCBcIjRcIjogW1wicmFuay80XzFcIl0sIFwiUnhnMlwiOiBbXCJmdWxsX21vdmUvUnhnMl8xXCJdLCBcIlF4ZDJcIjogW1wiZnVsbF9tb3ZlL1F4ZDJfMVwiXSwgXCJReGQxXCI6IFtcImZ1bGxfbW92ZS9ReGQxXzFcIl0sIFwiUXhkN1wiOiBbXCJmdWxsX21vdmUvUXhkN18xXCJdLCBcImFncmVlZFwiOiBbXCJkcmF3X29mZmVyL2FncmVlZF8xXCIsIFwiZHJhd19vZmZlci9hZ3JlZWRfMlwiXSwgXCJnN1wiOiBbXCJzcXVhcmUvZzdfNFwiLCBcInNxdWFyZS9nN18yXCIsIFwic3F1YXJlL2c3XzFcIl0sIFwiZzZcIjogW1wic3F1YXJlL2c2XzRcIiwgXCJzcXVhcmUvZzZfMVwiLCBcInNxdWFyZS9nNl8yXCJdLCBcImc1XCI6IFtcInNxdWFyZS9nNV80XCIsIFwic3F1YXJlL2c1XzFcIiwgXCJzcXVhcmUvZzVfMlwiXSwgXCJnNFwiOiBbXCJzcXVhcmUvZzRfNFwiLCBcInNxdWFyZS9nNF8yXCIsIFwic3F1YXJlL2c0XzFcIl0sIFwiZzNcIjogW1wic3F1YXJlL2czXzFcIiwgXCJzcXVhcmUvZzNfMlwiLCBcInNxdWFyZS9nM180XCJdLCBcImcyXCI6IFtcInNxdWFyZS9nMl8yXCIsIFwic3F1YXJlL2cyXzFcIiwgXCJzcXVhcmUvZzJfNFwiLCBcImZ1bGxfbW92ZS9nMl8xXCJdLCBcImcxXCI6IFtcInNxdWFyZS9nMV8yXCIsIFwic3F1YXJlL2cxXzFcIiwgXCJzcXVhcmUvZzFfNFwiXSwgXCJLeGM1XCI6IFtcImZ1bGxfbW92ZS9LeGM1XzFcIl0sIFwiTnhiMlwiOiBbXCJmdWxsX21vdmUvTnhiMl8xXCJdLCBcIk8tT1wiOiBbXCJmdWxsX21vdmUvTy1PXzhcIiwgXCJmdWxsX21vdmUvTy1PXzRcIiwgXCJmdWxsX21vdmUvTy1PXzVcIiwgXCJmdWxsX21vdmUvTy1PXzdcIiwgXCJmdWxsX21vdmUvTy1PXzZcIiwgXCJmdWxsX21vdmUvTy1PXzJcIiwgXCJmdWxsX21vdmUvTy1PXzNcIiwgXCJmdWxsX21vdmUvTy1PXzFcIl0sIFwiZzhcIjogW1wic3F1YXJlL2c4XzFcIiwgXCJzcXVhcmUvZzhfMlwiLCBcInNxdWFyZS9nOF80XCJdLCBcIlJ4ZjNcIjogW1wiZnVsbF9tb3ZlL1J4ZjNfMVwiXSwgXCJSeGY2XCI6IFtcImZ1bGxfbW92ZS9SeGY2XzFcIl0sIFwiRTYwXCI6IFtcIm9wZW5pbmcvRTYwXzJcIiwgXCJvcGVuaW5nL0U2MF8zXCIsIFwib3BlbmluZy9FNjBfMVwiLCBcIm9wZW5pbmcvRTYwXzRcIiwgXCJvcGVuaW5nL0U2MF81XCIsIFwib3BlbmluZy9FNjBfNlwiXSwgXCI1MCBtb3ZlLXJ1bGVcIjogW1wiZ2FtZV9kcmF3bl9yZWFzb24vNTBtb3ZlcnVsZV8xXCJdLCBcImRyYXdvZmZlcmVkXCI6IFtcImRyYXdfb2ZmZXIvZHJhd29mZmVyZWRfMVwiLCBcImRyYXdfb2ZmZXIvZHJhd29mZmVyZWRfM1wiLCBcImRyYXdfb2ZmZXIvZHJhd29mZmVyZWRfMlwiLCBcImRyYXdfb2ZmZXIvZHJhd29mZmVyZWRfNFwiXSwgXCJCeGcyXCI6IFtcImZ1bGxfbW92ZS9CeGcyXzFcIl0sIFwiZFwiOiBbXCJmaWxlL2RfMVwiXSwgXCJoXCI6IFtcImZpbGUvaF8xXCJdLCBcIkJ4ZzhcIjogW1wiZnVsbF9tb3ZlL0J4ZzhfMVwiXSwgXCJCMjNcIjogW1wib3BlbmluZy9CMjNfNFwiLCBcIm9wZW5pbmcvQjIzXzFcIiwgXCJvcGVuaW5nL0IyM18zXCIsIFwib3BlbmluZy9CMjNfMlwiXSwgXCJCMjJcIjogW1wib3BlbmluZy9CMjJfNVwiLCBcIm9wZW5pbmcvQjIyXzRcIiwgXCJvcGVuaW5nL0IyMl82XCIsIFwib3BlbmluZy9CMjJfM1wiLCBcIm9wZW5pbmcvQjIyXzJcIiwgXCJvcGVuaW5nL0IyMl8xXCJdLCBcIkIyMVwiOiBbXCJvcGVuaW5nL0IyMV80XCIsIFwib3BlbmluZy9CMjFfMlwiLCBcIm9wZW5pbmcvQjIxXzNcIiwgXCJvcGVuaW5nL0IyMV8xXCJdLCBcIkIyMFwiOiBbXCJvcGVuaW5nL0IyMF80XCIsIFwib3BlbmluZy9CMjBfNVwiLCBcIm9wZW5pbmcvQjIwXzFcIiwgXCJvcGVuaW5nL0IyMF8yXCIsIFwib3BlbmluZy9CMjBfM1wiXSwgXCJ4XCI6IFtcIm1vdmVfbW9kaWZpZXIvdGFrZXNfMlwiLCBcIm1vdmVfbW9kaWZpZXIvdGFrZXNfM1wiLCBcIm1vdmVfbW9kaWZpZXIvdGFrZXNfMVwiXSwgXCJLeGQzXCI6IFtcImZ1bGxfbW92ZS9LeGQzXzFcIl0sIFwiS3hkNFwiOiBbXCJmdWxsX21vdmUvS3hkNF8xXCJdLCBcIkM1MFwiOiBbXCJvcGVuaW5nL0M1MF8yXCIsIFwib3BlbmluZy9DNTBfM1wiLCBcIm9wZW5pbmcvQzUwXzFcIiwgXCJvcGVuaW5nL0M1MF80XCIsIFwib3BlbmluZy9DNTBfNVwiLCBcIm9wZW5pbmcvQzUwXzZcIl0sIFwiS3hiN1wiOiBbXCJmdWxsX21vdmUvS3hiN18xXCJdLCBcIkt4YjZcIjogW1wiZnVsbF9tb3ZlL0t4YjZfMVwiXSwgXCJLeGI1XCI6IFtcImZ1bGxfbW92ZS9LeGI1XzFcIl0sIFwiQTgwXCI6IFtcIm9wZW5pbmcvQTgwXzFcIiwgXCJvcGVuaW5nL0E4MF8yXCJdLCBcIk54YzRcIjogW1wiZnVsbF9tb3ZlL054YzRfMVwiXSwgXCJiNFwiOiBbXCJzcXVhcmUvYjRfMVwiLCBcInNxdWFyZS9iNF8yXCIsIFwic3F1YXJlL2I0XzRcIl0sIFwiYjVcIjogW1wic3F1YXJlL2I1XzJcIiwgXCJzcXVhcmUvYjVfMVwiLCBcInNxdWFyZS9iNV80XCJdLCBcImI2XCI6IFtcInNxdWFyZS9iNl8yXCIsIFwic3F1YXJlL2I2XzFcIiwgXCJzcXVhcmUvYjZfNFwiXSwgXCJiN1wiOiBbXCJzcXVhcmUvYjdfMVwiLCBcInNxdWFyZS9iN18yXCIsIFwic3F1YXJlL2I3XzRcIl0sIFwiYjFcIjogW1wic3F1YXJlL2IxXzRcIiwgXCJzcXVhcmUvYjFfMVwiLCBcInNxdWFyZS9iMV8yXCJdLCBcImIyXCI6IFtcInNxdWFyZS9iMl80XCIsIFwic3F1YXJlL2IyXzFcIiwgXCJzcXVhcmUvYjJfMlwiXSwgXCJiM1wiOiBbXCJzcXVhcmUvYjNfNFwiLCBcInNxdWFyZS9iM18yXCIsIFwic3F1YXJlL2IzXzFcIl0sIFwiUnhnOFwiOiBbXCJmdWxsX21vdmUvUnhnOF8xXCJdLCBcImI4XCI6IFtcInNxdWFyZS9iOF80XCIsIFwic3F1YXJlL2I4XzJcIiwgXCJzcXVhcmUvYjhfMVwiXSwgXCJkZWNsaW5lZFwiOiBbXCJkcmF3X29mZmVyL2RlY2xpbmVkXzNcIiwgXCJkcmF3X29mZmVyL2RlY2xpbmVkXzJcIiwgXCJkcmF3X29mZmVyL2RlY2xpbmVkXzFcIiwgXCJkcmF3X29mZmVyL2RlY2xpbmVkXzRcIl0sIFwiaWRsZV9ibGFja1wiOiBbXCJpZGxlL2lkbGVfYmxhY2tfNVwiLCBcImlkbGUvaWRsZV9ibGFja180XCIsIFwiaWRsZS9pZGxlX2JsYWNrXzFcIiwgXCJpZGxlL2lkbGVfYmxhY2tfM1wiLCBcImlkbGUvaWRsZV9ibGFja18yXCJdLCBcIiNcIjogW1wibW92ZV9tb2RpZmllci9tYXRlXzEwXCIsIFwibW92ZV9tb2RpZmllci9tYXRlXzhcIiwgXCJtb3ZlX21vZGlmaWVyL21hdGVfOVwiLCBcIm1vdmVfbW9kaWZpZXIvbWF0ZV8xXCIsIFwibW92ZV9tb2RpZmllci9tYXRlXzJcIiwgXCJtb3ZlX21vZGlmaWVyL21hdGVfM1wiLCBcIm1vdmVfbW9kaWZpZXIvbWF0ZV83XCIsIFwibW92ZV9tb2RpZmllci9tYXRlXzZcIiwgXCJtb3ZlX21vZGlmaWVyL21hdGVfNFwiLCBcIm1vdmVfbW9kaWZpZXIvbWF0ZV81XCJdLCBcIlF4ZjRcIjogW1wiZnVsbF9tb3ZlL1F4ZjRfMVwiXSwgXCJReGY3XCI6IFtcImZ1bGxfbW92ZS9ReGY3XzFcIl0sIFwiK1wiOiBbXCJtb3ZlX21vZGlmaWVyL2NoZWNrXzEwXCIsIFwibW92ZV9tb2RpZmllci9jaGVja185XCIsIFwibW92ZV9tb2RpZmllci9jaGVja184XCIsIFwibW92ZV9tb2RpZmllci9jaGVja182XCIsIFwibW92ZV9tb2RpZmllci9jaGVja183XCIsIFwibW92ZV9tb2RpZmllci9jaGVja181XCIsIFwibW92ZV9tb2RpZmllci9jaGVja180XCIsIFwibW92ZV9tb2RpZmllci9jaGVja18xXCIsIFwibW92ZV9tb2RpZmllci9jaGVja18zXCIsIFwibW92ZV9tb2RpZmllci9jaGVja18yXCJdLCBcIkJ4ZDVcIjogW1wiZnVsbF9tb3ZlL0J4ZDVfMlwiLCBcImZ1bGxfbW92ZS9CeGQ1XzFcIl0sIFwiQzg0XCI6IFtcIm9wZW5pbmcvQzg0XzFcIl0sIFwiQzMwXCI6IFtcIm9wZW5pbmcvQzMwXzFcIiwgXCJvcGVuaW5nL0MzMF8zXCIsIFwib3BlbmluZy9DMzBfMlwiLCBcIm9wZW5pbmcvQzMwXzRcIl0sIFwiM1wiOiBbXCJyYW5rLzNfMVwiXSwgXCI3XCI6IFtcInJhbmsvN18xXCJdLCBcIkM0NVwiOiBbXCJvcGVuaW5nL0M0NV82XCIsIFwib3BlbmluZy9DNDVfNFwiLCBcIm9wZW5pbmcvQzQ1XzVcIiwgXCJvcGVuaW5nL0M0NV8xXCIsIFwib3BlbmluZy9DNDVfMlwiLCBcIm9wZW5pbmcvQzQ1XzNcIl0sIFwiS1wiOiBbXCJwaWVjZS9raW5nXzZcIiwgXCJwaWVjZS9raW5nXzRcIiwgXCJwaWVjZS9raW5nXzVcIiwgXCJwaWVjZS9raW5nXzFcIiwgXCJwaWVjZS9raW5nXzJcIiwgXCJwaWVjZS9raW5nXzNcIl0sIFwiS3hhNlwiOiBbXCJmdWxsX21vdmUvS3hhNl8xXCJdLCBcImFncmVlbWVudFwiOiBbXCJnYW1lX2RyYXduX3JlYXNvbi9hZ3JlZW1lbnRfMVwiXSwgXCJLeGE1XCI6IFtcImZ1bGxfbW92ZS9LeGE1XzFcIl0sIFwiQjAxXCI6IFtcIm9wZW5pbmcvQjAxXzhcIiwgXCJvcGVuaW5nL0IwMV85XCIsIFwib3BlbmluZy9CMDFfMVwiLCBcIm9wZW5pbmcvQjAxXzJcIiwgXCJvcGVuaW5nL0IwMV8zXCIsIFwib3BlbmluZy9CMDFfN1wiLCBcIm9wZW5pbmcvQjAxXzZcIiwgXCJvcGVuaW5nL0IwMV80XCIsIFwib3BlbmluZy9CMDFfNVwiXSwgXCJCMDBcIjogW1wib3BlbmluZy9CMDBfMlwiLCBcIm9wZW5pbmcvQjAwXzNcIiwgXCJvcGVuaW5nL0IwMF8xXCIsIFwib3BlbmluZy9CMDBfNFwiXSwgXCJCMDJcIjogW1wib3BlbmluZy9CMDJfMVwiLCBcIm9wZW5pbmcvQjAyXzNcIiwgXCJvcGVuaW5nL0IwMl8yXCIsIFwib3BlbmluZy9CMDJfNlwiLCBcIm9wZW5pbmcvQjAyXzdcIiwgXCJvcGVuaW5nL0IwMl81XCIsIFwib3BlbmluZy9CMDJfNFwiXSwgXCJlOFwiOiBbXCJzcXVhcmUvZThfNFwiLCBcInNxdWFyZS9lOF8yXCIsIFwic3F1YXJlL2U4XzFcIl0sIFwiQjA3XCI6IFtcIm9wZW5pbmcvQjA3XzhcIiwgXCJvcGVuaW5nL0IwN183XCIsIFwib3BlbmluZy9CMDdfNlwiLCBcIm9wZW5pbmcvQjA3XzRcIiwgXCJvcGVuaW5nL0IwN181XCIsIFwib3BlbmluZy9CMDdfMVwiLCBcIm9wZW5pbmcvQjA3XzJcIiwgXCJvcGVuaW5nL0IwN18zXCJdLCBcImU1XCI6IFtcInNxdWFyZS9lNV8yXCIsIFwic3F1YXJlL2U1XzFcIiwgXCJzcXVhcmUvZTVfNFwiXSwgXCJlNFwiOiBbXCJzcXVhcmUvZTRfMVwiLCBcInNxdWFyZS9lNF8yXCIsIFwic3F1YXJlL2U0XzRcIl0sIFwiZTdcIjogW1wic3F1YXJlL2U3XzFcIiwgXCJzcXVhcmUvZTdfMlwiLCBcInNxdWFyZS9lN180XCJdLCBcImU2XCI6IFtcInNxdWFyZS9lNl8yXCIsIFwic3F1YXJlL2U2XzFcIiwgXCJzcXVhcmUvZTZfNFwiXSwgXCJlMVwiOiBbXCJzcXVhcmUvZTFfNFwiLCBcInNxdWFyZS9lMV8xXCIsIFwic3F1YXJlL2UxXzJcIl0sIFwiYnlcIjogW1wibWlzYy9ieV8yXCIsIFwibWlzYy9ieV8xXCJdLCBcImUzXCI6IFtcInNxdWFyZS9lM180XCIsIFwic3F1YXJlL2UzXzJcIiwgXCJzcXVhcmUvZTNfMVwiXSwgXCJlMlwiOiBbXCJzcXVhcmUvZTJfNFwiLCBcInNxdWFyZS9lMl8xXCIsIFwic3F1YXJlL2UyXzJcIl0sIFwib25cIjogW1wibWlzYy9vbl8yXCIsIFwibWlzYy9vbl8xXCJdLCBcImNcIjogW1wiZmlsZS9jXzFcIl0sIFwiZ1wiOiBbXCJmaWxlL2dfMVwiXSwgXCJSeGc0XCI6IFtcImZ1bGxfbW92ZS9SeGc0XzFcIl0sIFwiQnhlNFwiOiBbXCJmdWxsX21vdmUvQnhlNF8xXCJdLCBcIkQ4MFwiOiBbXCJvcGVuaW5nL0Q4MF8yXCIsIFwib3BlbmluZy9EODBfM1wiLCBcIm9wZW5pbmcvRDgwXzFcIiwgXCJvcGVuaW5nL0Q4MF80XCIsIFwib3BlbmluZy9EODBfNVwiLCBcIm9wZW5pbmcvRDgwXzZcIl0sIFwiUXhhNVwiOiBbXCJmdWxsX21vdmUvUXhhNV8xXCJdLCBcIlF4YTdcIjogW1wiZnVsbF9tb3ZlL1F4YTdfMVwiXSwgXCJpZGxlX3doaXRlXCI6IFtcImlkbGUvaWRsZV93aGl0ZV8yXCIsIFwiaWRsZS9pZGxlX3doaXRlXzNcIiwgXCJpZGxlL2lkbGVfd2hpdGVfMVwiLCBcImlkbGUvaWRsZV93aGl0ZV80XCIsIFwiaWRsZS9pZGxlX3doaXRlXzVcIl0sIFwiY2hlY2ttYXRlXCI6IFtcImdhbWVfd29uX3JlYXNvbi9jaGVja21hdGVfMVwiXSwgXCJoOFwiOiBbXCJzcXVhcmUvaDhfNFwiLCBcInNxdWFyZS9oOF8xXCIsIFwic3F1YXJlL2g4XzJcIl0sIFwiRDEwXCI6IFtcIm9wZW5pbmcvRDEwXzRcIiwgXCJvcGVuaW5nL0QxMF81XCIsIFwib3BlbmluZy9EMTBfMVwiLCBcIm9wZW5pbmcvRDEwXzJcIiwgXCJvcGVuaW5nL0QxMF8zXCJdLCBcIkE0MFwiOiBbXCJvcGVuaW5nL0E0MF80XCIsIFwib3BlbmluZy9BNDBfMVwiLCBcIm9wZW5pbmcvQTQwXzNcIiwgXCJvcGVuaW5nL0E0MF8yXCJdLCBcImgyXCI6IFtcInNxdWFyZS9oMl80XCIsIFwic3F1YXJlL2gyXzJcIiwgXCJzcXVhcmUvaDJfMVwiXSwgXCJoM1wiOiBbXCJzcXVhcmUvaDNfNFwiLCBcInNxdWFyZS9oM18xXCIsIFwic3F1YXJlL2gzXzJcIl0sIFwiaDFcIjogW1wic3F1YXJlL2gxXzRcIiwgXCJzcXVhcmUvaDFfMlwiLCBcInNxdWFyZS9oMV8xXCJdLCBcImg2XCI6IFtcInNxdWFyZS9oNl8xXCIsIFwic3F1YXJlL2g2XzJcIiwgXCJzcXVhcmUvaDZfNFwiXSwgXCJoN1wiOiBbXCJzcXVhcmUvaDdfMlwiLCBcInNxdWFyZS9oN18xXCIsIFwic3F1YXJlL2g3XzRcIl0sIFwiaDRcIjogW1wic3F1YXJlL2g0XzJcIiwgXCJzcXVhcmUvaDRfMVwiLCBcInNxdWFyZS9oNF80XCIsIFwiZnVsbF9tb3ZlL2g0XzFcIl0sIFwiaDVcIjogW1wic3F1YXJlL2g1XzFcIiwgXCJzcXVhcmUvaDVfMlwiLCBcInNxdWFyZS9oNV80XCJdLCBcInJlc2lnbmF0aW9uXCI6IFtcImdhbWVfd29uX3JlYXNvbi9yZXNpZ25hdGlvbl8zXCIsIFwiZ2FtZV93b25fcmVhc29uL3Jlc2lnbmF0aW9uXzJcIiwgXCJnYW1lX3dvbl9yZWFzb24vcmVzaWduYXRpb25fMVwiXSwgXCJSeGQ2XCI6IFtcImZ1bGxfbW92ZS9SeGQ2XzFcIl0sIFwiS3hoOFwiOiBbXCJmdWxsX21vdmUvS3hoOF8xXCJdLCBcIkIxMFwiOiBbXCJvcGVuaW5nL0IxMF8xXCIsIFwib3BlbmluZy9CMTBfM1wiLCBcIm9wZW5pbmcvQjEwXzJcIiwgXCJvcGVuaW5nL0IxMF82XCIsIFwib3BlbmluZy9CMTBfNVwiLCBcIm9wZW5pbmcvQjEwXzRcIl0sIFwibG93X29uX3RpbWVcIjogW1wibG93X29uX3RpbWUvbG93X29uX3RpbWVfMlwiLCBcImxvd19vbl90aW1lL2xvd19vbl90aW1lXzNcIiwgXCJsb3dfb25fdGltZS9sb3dfb25fdGltZV8xXCIsIFwibG93X29uX3RpbWUvbG93X29uX3RpbWVfNFwiLCBcImxvd19vbl90aW1lL2xvd19vbl90aW1lXzVcIiwgXCJsb3dfb25fdGltZS9sb3dfb25fdGltZV83XCIsIFwibG93X29uX3RpbWUvbG93X29uX3RpbWVfNlwiLCBcImxvd19vbl90aW1lL2xvd19vbl90aW1lXzhcIiwgXCJsb3dfb25fdGltZS9sb3dfb25fdGltZV85XCIsIFwibG93X29uX3RpbWUvbG93X29uX3RpbWVfMTVcIiwgXCJsb3dfb25fdGltZS9sb3dfb25fdGltZV8xNFwiLCBcImxvd19vbl90aW1lL2xvd19vbl90aW1lXzEwXCIsIFwibG93X29uX3RpbWUvbG93X29uX3RpbWVfMTFcIiwgXCJsb3dfb25fdGltZS9sb3dfb25fdGltZV8xM1wiLCBcImxvd19vbl90aW1lL2xvd19vbl90aW1lXzEyXCJdLCBcIlJ4ZTJcIjogW1wiZnVsbF9tb3ZlL1J4ZTJfMVwiXSwgXCJOZTRcIjogW1wiZnVsbF9tb3ZlL05lNF8xXCJdLCBcIlJ4ZTdcIjogW1wiZnVsbF9tb3ZlL1J4ZTdfMVwiXSwgXCJOeGcyXCI6IFtcImZ1bGxfbW92ZS9OeGcyXzFcIl0sIFwicGF3blwiOiBbXCJwaWVjZS9wYXduXzRcIiwgXCJwaWVjZS9wYXduXzFcIiwgXCJwaWVjZS9wYXduXzNcIiwgXCJwaWVjZS9wYXduXzJcIl0sIFwibG93X29uX3RpbWVfYmxhY2tcIjogW1wibG93X29uX3RpbWUvbG93X29uX3RpbWVfYmxhY2tfN1wiLCBcImxvd19vbl90aW1lL2xvd19vbl90aW1lX2JsYWNrXzZcIiwgXCJsb3dfb25fdGltZS9sb3dfb25fdGltZV9ibGFja180XCIsIFwibG93X29uX3RpbWUvbG93X29uX3RpbWVfYmxhY2tfNVwiLCBcImxvd19vbl90aW1lL2xvd19vbl90aW1lX2JsYWNrXzFcIiwgXCJsb3dfb25fdGltZS9sb3dfb25fdGltZV9ibGFja18yXCIsIFwibG93X29uX3RpbWUvbG93X29uX3RpbWVfYmxhY2tfM1wiLCBcImxvd19vbl90aW1lL2xvd19vbl90aW1lX2JsYWNrXzEyXCIsIFwibG93X29uX3RpbWUvbG93X29uX3RpbWVfYmxhY2tfMTNcIiwgXCJsb3dfb25fdGltZS9sb3dfb25fdGltZV9ibGFja18xMVwiLCBcImxvd19vbl90aW1lL2xvd19vbl90aW1lX2JsYWNrXzEwXCIsIFwibG93X29uX3RpbWUvbG93X29uX3RpbWVfYmxhY2tfOFwiLCBcImxvd19vbl90aW1lL2xvd19vbl90aW1lX2JsYWNrXzlcIl0sIFwiTnhoNFwiOiBbXCJmdWxsX21vdmUvTnhoNF8xXCJdLCBcIlF4aDJcIjogW1wiZnVsbF9tb3ZlL1F4aDJfMVwiXSwgXCJpbnN1ZmZpY2llbnQgbWF0ZXJpYWxcIjogW1wiZ2FtZV9kcmF3bl9yZWFzb24vaW5zdWZmaWNpZW50XzFcIl0sIFwiRTExXCI6IFtcIm9wZW5pbmcvRTExXzFcIiwgXCJvcGVuaW5nL0UxMV8yXCIsIFwib3BlbmluZy9FMTFfM1wiLCBcIm9wZW5pbmcvRTExXzRcIiwgXCJvcGVuaW5nL0UxMV81XCJdLCBcIjJcIjogW1wicmFuay8yXzFcIl0sIFwiUVwiOiBbXCJwaWVjZS9xdWVlbl80XCIsIFwicGllY2UvcXVlZW5fNVwiLCBcInBpZWNlL3F1ZWVuXzJcIiwgXCJwaWVjZS9xdWVlbl8zXCIsIFwicGllY2UvcXVlZW5fMVwiXSwgXCI2XCI6IFtcInJhbmsvNl8xXCJdLCBcIndoaXRlXCI6IFtcImNvbG9yL3doaXRlXzFcIiwgXCJjb2xvci93aGl0ZV8zXCIsIFwiY29sb3Ivd2hpdGVfMlwiXSwgXCJCeGI3XCI6IFtcImZ1bGxfbW92ZS9CeGI3XzFcIl0sIFwiQnhiMVwiOiBbXCJmdWxsX21vdmUvQnhiMV8yXCIsIFwiZnVsbF9tb3ZlL0J4YjFfMVwiXSwgXCJOeGY0XCI6IFtcImZ1bGxfbW92ZS9OeGY0XzFcIl0sIFwiQzgwXCI6IFtcIm9wZW5pbmcvQzgwXzFcIl0sIFwiTmJkMlwiOiBbXCJmdWxsX21vdmUvTmJkMl8xXCIsIFwiZnVsbF9tb3ZlL05iZDJfMlwiLCBcImZ1bGxfbW92ZS9OYmQyXzNcIl0sIFwiRTEyXCI6IFtcIm9wZW5pbmcvRTEyXzFcIiwgXCJvcGVuaW5nL0UxMl8zXCIsIFwib3BlbmluZy9FMTJfMlwiLCBcIm9wZW5pbmcvRTEyXzVcIiwgXCJvcGVuaW5nL0UxMl80XCJdLCBcIkUyMFwiOiBbXCJvcGVuaW5nL0UyMF81XCIsIFwib3BlbmluZy9FMjBfNFwiLCBcIm9wZW5pbmcvRTIwXzZcIiwgXCJvcGVuaW5nL0UyMF83XCIsIFwib3BlbmluZy9FMjBfM1wiLCBcIm9wZW5pbmcvRTIwXzJcIiwgXCJvcGVuaW5nL0UyMF8xXCJdLCBcIkJ4aDdcIjogW1wiZnVsbF9tb3ZlL0J4aDdfMVwiXSwgXCJOeGYzXCI6IFtcImZ1bGxfbW92ZS9OeGYzXzFcIl0sIFwib2ZmZXJlZFwiOiBbXCJkcmF3X29mZmVyL29mZmVyZWRfMVwiLCBcImRyYXdfb2ZmZXIvb2ZmZXJlZF8yXCIsIFwiZHJhd19vZmZlci9vZmZlcmVkXzNcIl0sIFwiQzYwXCI6IFtcIm9wZW5pbmcvQzYwXzVcIiwgXCJvcGVuaW5nL0M2MF80XCIsIFwib3BlbmluZy9DNjBfM1wiLCBcIm9wZW5pbmcvQzYwXzJcIiwgXCJvcGVuaW5nL0M2MF8xXCJdLCBcIk54YzZcIjogW1wiZnVsbF9tb3ZlL054YzZfMVwiXSwgXCJjOFwiOiBbXCJzcXVhcmUvYzhfNFwiLCBcInNxdWFyZS9jOF8xXCIsIFwic3F1YXJlL2M4XzJcIl0sIFwiOFwiOiBbXCJyYW5rLzhfMVwiXSwgXCJzdGFsZW1hdGVcIjogW1wiZ2FtZV9kcmF3bl9yZWFzb24vc3RhbGVtYXRlXzFcIl0sIFwiYzNcIjogW1wic3F1YXJlL2MzXzRcIiwgXCJzcXVhcmUvYzNfMVwiLCBcInNxdWFyZS9jM18yXCJdLCBcImVcIjogW1wiZmlsZS9lXzFcIl0sIFwiYzFcIjogW1wic3F1YXJlL2MxXzRcIiwgXCJzcXVhcmUvYzFfMlwiLCBcInNxdWFyZS9jMV8xXCJdLCBcInJlcGV0aXRpb25cIjogW1wiZ2FtZV9kcmF3bl9yZWFzb24vcmVwZXRpdGlvbl8xXCJdLCBcImM3XCI6IFtcInNxdWFyZS9jN18yXCIsIFwic3F1YXJlL2M3XzFcIiwgXCJzcXVhcmUvYzdfNFwiXSwgXCJjNlwiOiBbXCJzcXVhcmUvYzZfMVwiLCBcInNxdWFyZS9jNl8yXCIsIFwic3F1YXJlL2M2XzRcIl0sIFwiYzVcIjogW1wic3F1YXJlL2M1XzFcIiwgXCJzcXVhcmUvYzVfMlwiLCBcInNxdWFyZS9jNV80XCJdLCBcImM0XCI6IFtcInNxdWFyZS9jNF8yXCIsIFwic3F1YXJlL2M0XzFcIiwgXCJzcXVhcmUvYzRfNFwiLCBcImZ1bGxfbW92ZS9jNF8xXCJdLCBcIlJ4ZzNcIjogW1wiZnVsbF9tb3ZlL1J4ZzNfMVwiXSwgXCJiXCI6IFtcImZpbGUvYl8xXCJdLCBcImdhbWVfc3RhcnRcIjogW1wiZ2FtZV9zdGFydC9nYW1lX3N0YXJ0XzExXCIsIFwiZ2FtZV9zdGFydC9nYW1lX3N0YXJ0XzEwXCIsIFwiZ2FtZV9zdGFydC9nYW1lX3N0YXJ0XzEyXCIsIFwiZ2FtZV9zdGFydC9nYW1lX3N0YXJ0XzEzXCIsIFwiZ2FtZV9zdGFydC9nYW1lX3N0YXJ0XzE2XCIsIFwiZ2FtZV9zdGFydC9nYW1lX3N0YXJ0XzE0XCIsIFwiZ2FtZV9zdGFydC9nYW1lX3N0YXJ0XzhcIiwgXCJnYW1lX3N0YXJ0L2dhbWVfc3RhcnRfOVwiLCBcImdhbWVfc3RhcnQvZ2FtZV9zdGFydF8xNVwiLCBcImdhbWVfc3RhcnQvZ2FtZV9zdGFydF80XCIsIFwiZ2FtZV9zdGFydC9nYW1lX3N0YXJ0XzVcIiwgXCJnYW1lX3N0YXJ0L2dhbWVfc3RhcnRfN1wiLCBcImdhbWVfc3RhcnQvZ2FtZV9zdGFydF82XCIsIFwiZ2FtZV9zdGFydC9nYW1lX3N0YXJ0XzJcIiwgXCJnYW1lX3N0YXJ0L2dhbWVfc3RhcnRfM1wiLCBcImdhbWVfc3RhcnQvZ2FtZV9zdGFydF8xXCJdLCBcImZcIjogW1wiZmlsZS9mXzFcIl0sIFwiS3hlMlwiOiBbXCJmdWxsX21vdmUvS3hlMl8xXCJdLCBcIlJ4YjdcIjogW1wiZnVsbF9tb3ZlL1J4YjdfMVwiXSwgXCJSeGIyXCI6IFtcImZ1bGxfbW92ZS9SeGIyXzFcIl0sIFwiaWRsZVwiOiBbXCJpZGxlL2lkbGVfMThcIiwgXCJpZGxlL2lkbGVfOFwiLCBcImlkbGUvaWRsZV85XCIsIFwiaWRsZS9pZGxlXzE5XCIsIFwiaWRsZS9pZGxlXzE3XCIsIFwiaWRsZS9pZGxlXzdcIiwgXCJpZGxlL2lkbGVfNlwiLCBcImlkbGUvaWRsZV8xNlwiLCBcImlkbGUvaWRsZV8xNFwiLCBcImlkbGUvaWRsZV80XCIsIFwiaWRsZS9pZGxlXzVcIiwgXCJpZGxlL2lkbGVfMTVcIiwgXCJpZGxlL2lkbGVfMTFcIiwgXCJpZGxlL2lkbGVfMVwiLCBcImlkbGUvaWRsZV8xMFwiLCBcImlkbGUvaWRsZV8xMlwiLCBcImlkbGUvaWRsZV8yXCIsIFwiaWRsZS9pZGxlXzNcIiwgXCJpZGxlL2lkbGVfMTNcIl0sIFwiUXhjMVwiOiBbXCJmdWxsX21vdmUvUXhjMV8xXCJdLCBcIk54YTVcIjogW1wiZnVsbF9tb3ZlL054YTVfMVwiXSwgXCJReGM3XCI6IFtcImZ1bGxfbW92ZS9ReGM3XzFcIiwgXCJmdWxsX21vdmUvUXhjN18yXCJdLCBcIlF4YzRcIjogW1wiZnVsbF9tb3ZlL1F4YzRfMVwiXSwgXCJCXCI6IFtcInBpZWNlL2Jpc2hvcF80XCIsIFwicGllY2UvYmlzaG9wXzVcIiwgXCJwaWVjZS9iaXNob3BfMVwiLCBcInBpZWNlL2Jpc2hvcF8yXCIsIFwicGllY2UvYmlzaG9wXzNcIl0sIFwiUnhnNlwiOiBbXCJmdWxsX21vdmUvUnhnNl8xXCJdLCBcImYxXCI6IFtcInNxdWFyZS9mMV8xXCIsIFwic3F1YXJlL2YxXzJcIiwgXCJzcXVhcmUvZjFfNFwiXSwgXCJmMlwiOiBbXCJzcXVhcmUvZjJfMVwiLCBcInNxdWFyZS9mMl8yXCIsIFwic3F1YXJlL2YyXzRcIl0sIFwiZjNcIjogW1wic3F1YXJlL2YzXzJcIiwgXCJzcXVhcmUvZjNfMVwiLCBcInNxdWFyZS9mM180XCJdLCBcImY0XCI6IFtcInNxdWFyZS9mNF80XCIsIFwic3F1YXJlL2Y0XzFcIiwgXCJzcXVhcmUvZjRfMlwiXSwgXCJmNVwiOiBbXCJzcXVhcmUvZjVfNFwiLCBcInNxdWFyZS9mNV8yXCIsIFwic3F1YXJlL2Y1XzFcIl0sIFwiZjZcIjogW1wic3F1YXJlL2Y2XzRcIiwgXCJzcXVhcmUvZjZfMlwiLCBcInNxdWFyZS9mNl8xXCJdLCBcImY3XCI6IFtcInNxdWFyZS9mN180XCIsIFwic3F1YXJlL2Y3XzFcIiwgXCJzcXVhcmUvZjdfMlwiXSwgXCJmOFwiOiBbXCJzcXVhcmUvZjhfMlwiLCBcInNxdWFyZS9mOF8xXCIsIFwic3F1YXJlL2Y4XzRcIl0sIFwiQTU2XCI6IFtcIm9wZW5pbmcvQTU2XzJcIiwgXCJvcGVuaW5nL0E1Nl8zXCIsIFwib3BlbmluZy9BNTZfMVwiLCBcIm9wZW5pbmcvQTU2XzRcIiwgXCJvcGVuaW5nL0E1Nl81XCJdLCBcImxvd19vbl90aW1lX3doaXRlXCI6IFtcImxvd19vbl90aW1lL2xvd19vbl90aW1lX3doaXRlXzExXCIsIFwibG93X29uX3RpbWUvbG93X29uX3RpbWVfd2hpdGVfMTBcIiwgXCJsb3dfb25fdGltZS9sb3dfb25fdGltZV93aGl0ZV8xMlwiLCBcImxvd19vbl90aW1lL2xvd19vbl90aW1lX3doaXRlXzEzXCIsIFwibG93X29uX3RpbWUvbG93X29uX3RpbWVfd2hpdGVfOVwiLCBcImxvd19vbl90aW1lL2xvd19vbl90aW1lX3doaXRlXzhcIiwgXCJsb3dfb25fdGltZS9sb3dfb25fdGltZV93aGl0ZV8zXCIsIFwibG93X29uX3RpbWUvbG93X29uX3RpbWVfd2hpdGVfMlwiLCBcImxvd19vbl90aW1lL2xvd19vbl90aW1lX3doaXRlXzFcIiwgXCJsb3dfb25fdGltZS9sb3dfb25fdGltZV93aGl0ZV81XCIsIFwibG93X29uX3RpbWUvbG93X29uX3RpbWVfd2hpdGVfNFwiLCBcImxvd19vbl90aW1lL2xvd19vbl90aW1lX3doaXRlXzZcIiwgXCJsb3dfb25fdGltZS9sb3dfb25fdGltZV93aGl0ZV83XCJdLCBcIkQzMFwiOiBbXCJvcGVuaW5nL0QzMF8yXCIsIFwib3BlbmluZy9EMzBfM1wiLCBcIm9wZW5pbmcvRDMwXzFcIiwgXCJvcGVuaW5nL0QzMF80XCIsIFwib3BlbmluZy9EMzBfNVwiXSwgXCJCeGgxXCI6IFtcImZ1bGxfbW92ZS9CeGgxXzFcIl0sIFwiS3hjOFwiOiBbXCJmdWxsX21vdmUvS3hjOF8xXCJdLCBcIlJcIjogW1wicGllY2Uvcm9va180XCIsIFwicGllY2Uvcm9va181XCIsIFwicGllY2Uvcm9va182XCIsIFwicGllY2Uvcm9va18yXCIsIFwicGllY2Uvcm9va18zXCIsIFwicGllY2Uvcm9va18xXCJdLCBcIkE1N1wiOiBbXCJvcGVuaW5nL0E1N18xXCIsIFwib3BlbmluZy9BNTdfMlwiLCBcIm9wZW5pbmcvQTU3XzNcIiwgXCJvcGVuaW5nL0E1N180XCJdLCBcIkExMFwiOiBbXCJvcGVuaW5nL0ExMF8zXCIsIFwib3BlbmluZy9BMTBfMlwiLCBcIm9wZW5pbmcvQTEwXzFcIiwgXCJvcGVuaW5nL0ExMF81XCIsIFwib3BlbmluZy9BMTBfNFwiXSwgXCJSeGM4XCI6IFtcImZ1bGxfbW92ZS9SeGM4XzFcIl0sIFwiUnhjNlwiOiBbXCJmdWxsX21vdmUvUnhjNl8xXCJdLCBcIlJ4YzNcIjogW1wiZnVsbF9tb3ZlL1J4YzNfMVwiXSwgXCJSeGMxXCI6IFtcImZ1bGxfbW92ZS9SeGMxXzFcIl0sIFwiZHJhd2RlY2xpbmVkXCI6IFtcImRyYXdfb2ZmZXIvZHJhd2RlY2xpbmVkXzRcIiwgXCJkcmF3X29mZmVyL2RyYXdkZWNsaW5lZF8yXCIsIFwiZHJhd19vZmZlci9kcmF3ZGVjbGluZWRfM1wiLCBcImRyYXdfb2ZmZXIvZHJhd2RlY2xpbmVkXzFcIl0sIFwiS3hnNFwiOiBbXCJmdWxsX21vdmUvS3hnNF8xXCJdLCBcIkt4ZzdcIjogW1wiZnVsbF9tb3ZlL0t4ZzdfMVwiXSwgXCI9XCI6IFtcIm1vdmVfbW9kaWZpZXIvZXF1YWxzXzJcIiwgXCJtb3ZlX21vZGlmaWVyL2VxdWFsc18xXCJdLCBcIlFnNVwiOiBbXCJmdWxsX21vdmUvUWc1XzFcIl0sIFwiTnhkMlwiOiBbXCJmdWxsX21vdmUvTnhkMl8xXCJdLCBcIk54ZDNcIjogW1wiZnVsbF9tb3ZlL054ZDNfMVwiXSwgXCJkcmF3XCI6IFtcImdhbWVfcmVzdWx0L2RyYXdfMVwiLCBcImdhbWVfcmVzdWx0L2RyYXdfMlwiXSwgXCJBODFcIjogW1wib3BlbmluZy9BODFfM1wiLCBcIm9wZW5pbmcvQTgxXzJcIiwgXCJvcGVuaW5nL0E4MV8xXCJdLCBcIk8tTy1PXCI6IFtcImZ1bGxfbW92ZS9PLU8tT18xXCIsIFwiZnVsbF9tb3ZlL08tTy1PXzNcIiwgXCJmdWxsX21vdmUvTy1PLU9fMlwiLCBcImZ1bGxfbW92ZS9PLU8tT182XCIsIFwiZnVsbF9tb3ZlL08tTy1PXzdcIiwgXCJmdWxsX21vdmUvTy1PLU9fNVwiLCBcImZ1bGxfbW92ZS9PLU8tT180XCJdLCBcImExXCI6IFtcInNxdWFyZS9hMV8xXCIsIFwic3F1YXJlL2ExXzJcIiwgXCJzcXVhcmUvYTFfNFwiXSwgXCJhM1wiOiBbXCJzcXVhcmUvYTNfMlwiLCBcInNxdWFyZS9hM18xXCIsIFwic3F1YXJlL2EzXzRcIl0sIFwiYTJcIjogW1wic3F1YXJlL2EyXzFcIiwgXCJzcXVhcmUvYTJfMlwiLCBcInNxdWFyZS9hMl80XCJdLCBcImE1XCI6IFtcInNxdWFyZS9hNV80XCIsIFwic3F1YXJlL2E1XzJcIiwgXCJzcXVhcmUvYTVfMVwiXSwgXCJhNFwiOiBbXCJzcXVhcmUvYTRfNFwiLCBcInNxdWFyZS9hNF8xXCIsIFwic3F1YXJlL2E0XzJcIl0sIFwiYTdcIjogW1wic3F1YXJlL2E3XzRcIiwgXCJzcXVhcmUvYTdfMVwiLCBcInNxdWFyZS9hN18yXCJdLCBcImE2XCI6IFtcInNxdWFyZS9hNl80XCIsIFwic3F1YXJlL2E2XzJcIiwgXCJzcXVhcmUvYTZfMVwiXSwgXCJDMDBcIjogW1wib3BlbmluZy9DMDBfNFwiLCBcIm9wZW5pbmcvQzAwXzVcIiwgXCJvcGVuaW5nL0MwMF8xXCIsIFwib3BlbmluZy9DMDBfMlwiLCBcIm9wZW5pbmcvQzAwXzNcIl0sIFwiYThcIjogW1wic3F1YXJlL2E4XzJcIiwgXCJzcXVhcmUvYThfMVwiLCBcInNxdWFyZS9hOF80XCJdLCBcIk5cIjogW1wicGllY2Uva25pZ2h0XzZcIiwgXCJwaWVjZS9rbmlnaHRfNFwiLCBcInBpZWNlL2tuaWdodF81XCIsIFwicGllY2Uva25pZ2h0XzFcIiwgXCJwaWVjZS9rbmlnaHRfMlwiLCBcInBpZWNlL2tuaWdodF8zXCJdLCBcIktlNVwiOiBbXCJmdWxsX21vdmUvS2U1XzFcIl0sIFwiYVwiOiBbXCJmaWxlL2FfMVwiXSwgXCJCeGE2XCI6IFtcImZ1bGxfbW92ZS9CeGE2XzFcIl0sIFwid2hpdGVfd2luc1wiOiBbXCJnYW1lX3Jlc3VsdC93aGl0ZV93aW5zXzFcIl0sIFwiQnhhMlwiOiBbXCJmdWxsX21vdmUvQnhhMl8xXCJdLCBcIkEwMlwiOiBbXCJvcGVuaW5nL0EwMl8zXCIsIFwib3BlbmluZy9BMDJfMlwiLCBcIm9wZW5pbmcvQTAyXzFcIiwgXCJvcGVuaW5nL0EwMl81XCIsIFwib3BlbmluZy9BMDJfNFwiLCBcIm9wZW5pbmcvQTAyXzZcIl0sIFwid2luc1wiOiBbXCJnYW1lX3Jlc3VsdC93aW5zXzFcIl0sIFwiQTAwXCI6IFtcIm9wZW5pbmcvQTAwXzFcIiwgXCJvcGVuaW5nL0EwMF8yXCIsIFwib3BlbmluZy9BMDBfM1wiLCBcIm9wZW5pbmcvQTAwXzdcIiwgXCJvcGVuaW5nL0EwMF82XCIsIFwib3BlbmluZy9BMDBfNFwiLCBcIm9wZW5pbmcvQTAwXzVcIl0sIFwiQTAxXCI6IFtcIm9wZW5pbmcvQTAxXzhcIiwgXCJvcGVuaW5nL0EwMV85XCIsIFwib3BlbmluZy9BMDFfMlwiLCBcIm9wZW5pbmcvQTAxXzNcIiwgXCJvcGVuaW5nL0EwMV8xXCIsIFwib3BlbmluZy9BMDFfMTBcIiwgXCJvcGVuaW5nL0EwMV80XCIsIFwib3BlbmluZy9BMDFfNVwiLCBcIm9wZW5pbmcvQTAxXzdcIiwgXCJvcGVuaW5nL0EwMV82XCJdLCBcIkEwN1wiOiBbXCJvcGVuaW5nL0EwN180XCIsIFwib3BlbmluZy9BMDdfNVwiLCBcIm9wZW5pbmcvQTA3XzJcIiwgXCJvcGVuaW5nL0EwN18zXCIsIFwib3BlbmluZy9BMDdfMVwiXSwgXCJBMDRcIjogW1wib3BlbmluZy9BMDRfNVwiLCBcIm9wZW5pbmcvQTA0XzRcIiwgXCJvcGVuaW5nL0EwNF8zXCIsIFwib3BlbmluZy9BMDRfMlwiLCBcIm9wZW5pbmcvQTA0XzFcIl0sIFwiS3hmM1wiOiBbXCJmdWxsX21vdmUvS3hmM18xXCJdLCBcIjFcIjogW1wicmFuay8xXzFcIl0sIFwidGltZVwiOiBbXCJnYW1lX3dvbl9yZWFzb24vdGltZV8xXCIsIFwiZ2FtZV93b25fcmVhc29uL3RpbWVfMlwiXX07XG5cbmNvbnN0IHNvdW5kRXhpc3RzID0gaWQgPT4gaWQgaW4gc291bmRWYXJpYW50cztcbmNvbnN0IGNob2ljZSA9IGxzdCA9PiBsc3RbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKmxzdC5sZW5ndGgpXTtcbmNvbnN0IGdldFJhbmRvbUZvcklkcyA9ICguLi5pZHMpID0+IGNob2ljZShzb3VuZFZhcmlhbnRzW2Nob2ljZShpZHMpXSk7XG5jb25zdCBkZWZhdWx0QmFzZVBhdGggPSAnc291bmRzL2Rhbm55L21wMy8nO1xuY29uc3QgZGVmYXVsdEV4dGVuc2lvbiA9ICdtcDMnO1xuXG5jbGFzcyBEYW5ueVZvaWNlIGV4dGVuZHMgQWJzdHJhY3RWb2ljZSB7XG5cbiAgc3RhcnQoKSB7XG4gICAgY29uc3QgaWRzID0gW1xuICAgICAgZ2V0UmFuZG9tRm9ySWRzKCdnYW1lX3N0YXJ0JyksXG4gICAgXTtcbiAgICB0aGlzLl9wbGF5SWRzKGlkcywgZGVmYXVsdEJhc2VQYXRoLCBkZWZhdWx0RXh0ZW5zaW9uKTtcbiAgfVxuXG4gIG1vdmUoeyBzYW4gfSkge1xuICAgIGNvbnN0IHBhcnRzID0gc2hvcnRlc3RTdHJpbmdDb3Zlcih7XG4gICAgICB0YXJnZXQ6IHNhbixcbiAgICAgIGNob2ljZXM6IE9iamVjdC5rZXlzKHNvdW5kVmFyaWFudHMpLFxuICAgIH0pO1xuICAgIGlmIChwYXJ0cykge1xuICAgICAgY29uc3QgaWRzID0gcGFydHMubWFwKGlkID0+IGdldFJhbmRvbUZvcklkcyhpZCkpO1xuICAgICAgdGhpcy5fcGxheUlkcyhpZHMsIGRlZmF1bHRCYXNlUGF0aCwgZGVmYXVsdEV4dGVuc2lvbik7XG4gICAgfVxuICB9XG5cbiAgd2luKHsgd2lubmVyQ29sb3IsIHJlYXNvbiB9KSB7XG4gICAgY29uc3QgaWRzID0gW1xuICAgICAgZ2V0UmFuZG9tRm9ySWRzKHdpbm5lckNvbG9yKSxcbiAgICAgIGdldFJhbmRvbUZvcklkcygnd2lucycpLFxuICAgICAgZ2V0UmFuZG9tRm9ySWRzKHJlYXNvbiA9PT0gJ3RpbWUnID8gJ29uJyA6ICdieScpLFxuICAgICAgZ2V0UmFuZG9tRm9ySWRzKHJlYXNvbiksXG4gICAgXTtcbiAgICB0aGlzLl9wbGF5SWRzKGlkcywgZGVmYXVsdEJhc2VQYXRoLCBkZWZhdWx0RXh0ZW5zaW9uKTtcbiAgfVxuXG4gIGRyYXcoeyByZWFzb24gfSkge1xuICAgIGNvbnN0IGlkcyA9IFtcbiAgICAgIGdldFJhbmRvbUZvcklkcygnZHJhdycpLFxuICAgICAgZ2V0UmFuZG9tRm9ySWRzKCdieScpLFxuICAgICAgZ2V0UmFuZG9tRm9ySWRzKHJlYXNvbiksXG4gICAgXTtcbiAgICB0aGlzLl9wbGF5SWRzKGlkcywgZGVmYXVsdEJhc2VQYXRoLCBkZWZhdWx0RXh0ZW5zaW9uKTtcbiAgfVxuXG4gIHRpbWUoeyBwbGF5ZXJDb2xvciwgc2Vjb25kcyB9KSB7XG4gICAgY29uc3QgaWRzID0gW1xuICAgICAgZ2V0UmFuZG9tRm9ySWRzKCdsb3dfb25fdGltZScsIGBsb3dfb25fdGltZV8ke3BsYXllckNvbG9yfWApLFxuICAgIF07XG4gICAgdGhpcy5fcGxheUlkcyhpZHMsIGRlZmF1bHRCYXNlUGF0aCwgZGVmYXVsdEV4dGVuc2lvbiwgMSk7XG4gIH1cblxuICBpZGxlKHsgcGxheWVyQ29sb3IsIHNlY29uZHMgfSkge1xuICAgIGNvbnN0IGlkcyA9IFtcbiAgICAgIGdldFJhbmRvbUZvcklkcygnaWRsZScsIGBpZGxlXyR7cGxheWVyQ29sb3J9YCksXG4gICAgXTtcbiAgICB0aGlzLl9wbGF5SWRzKGlkcywgZGVmYXVsdEJhc2VQYXRoLCBkZWZhdWx0RXh0ZW5zaW9uLCAwKTtcbiAgfVxuXG4gIGRyYXdPZmZlcmVkKHsgcGxheWVyQ29sb3IsIHBsYXllclVzZXJuYW1lIH0pIHtcbiAgICBjb25zdCBpZHMgPSBbXG4gICAgICBnZXRSYW5kb21Gb3JJZHMocGxheWVyQ29sb3IpLFxuICAgICAgZ2V0UmFuZG9tRm9ySWRzKCdvZmZlcmVkJyksXG4gICAgICBnZXRSYW5kb21Gb3JJZHMoJ2RyYXcnKSxcbiAgICBdO1xuICAgIHRoaXMuX3BsYXlJZHMoaWRzLCBkZWZhdWx0QmFzZVBhdGgsIGRlZmF1bHRFeHRlbnNpb24pO1xuICB9XG5cbiAgZHJhd0RlY2xpbmVkKHsgcGxheWVyQ29sb3IsIHBsYXllclVzZXJuYW1lIH0pIHtcbiAgICBjb25zdCBpZHMgPSBbXG4gICAgICBnZXRSYW5kb21Gb3JJZHMocGxheWVyQ29sb3IpLFxuICAgICAgZ2V0UmFuZG9tRm9ySWRzKCdkZWNsaW5lZCcpLFxuICAgICAgZ2V0UmFuZG9tRm9ySWRzKCdkcmF3JyksXG4gICAgXTtcbiAgICB0aGlzLl9wbGF5SWRzKGlkcywgZGVmYXVsdEJhc2VQYXRoLCBkZWZhdWx0RXh0ZW5zaW9uKTtcbiAgfVxuXG4gIG9wZW5pbmcoeyBuYW1lIH0pIHtcbiAgICBjb25zdCBvcGVuaW5nSWQgPSBuYW1lLnNwbGl0KCc6JylbMF07XG4gICAgaWYgKHNvdW5kRXhpc3RzKG9wZW5pbmdJZCkpIHtcbiAgICAgIGNvbnN0IGlkcyA9IFtcbiAgICAgICAgZ2V0UmFuZG9tRm9ySWRzKG9wZW5pbmdJZCksXG4gICAgICBdO1xuICAgICAgdGhpcy5fcGxheUlkcyhpZHMsIGRlZmF1bHRCYXNlUGF0aCwgZGVmYXVsdEV4dGVuc2lvbik7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQge1xuICBEYW5ueVZvaWNlLFxufTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/audio/voices/danny.js\n");

/***/ }),

/***/ "./src/js/audio/voices/default.js":
/*!****************************************!*\
  !*** ./src/js/audio/voices/default.js ***!
  \****************************************/
/*! exports provided: DefaultVoice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DefaultVoice\", function() { return DefaultVoice; });\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ \"./src/js/audio/voices/abstract.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ \"./src/js/utils.js\");\n\n\n\n\n\nconst getMoveAudioIds = (san) => {\n  const match = Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"matchSan\"])(san);\n\n  let seq = [];\n\n  // castle, either short or long\n  if (match[1]) {\n    seq.push(`full_move/${match[1]}`);\n  }\n\n  // piece\n  if (match[2]) {\n    seq.push(`piece/${_utils__WEBPACK_IMPORTED_MODULE_1__[\"pieceCodeToName\"][match[2]]}`);\n  }\n  // file and rank or pawn that is moving\n  if (match[3] && match[4]) {\n    seq.push(`square/${match[3]}${match[4]}`);\n  } else if (match[3]) {\n    seq.push(`file/${match[3]}`);\n  } else if (match[4]) {\n    seq.push(`rank/${match[4]}`);\n  }\n\n  // takes\n  if (match[5]) {\n    seq.push('move_modifier/takes');\n  }\n\n  // full destination square, mandatory except castling moves\n  if (match[6] && match[7]) {\n    seq.push(`square/${match[6]}${match[7]}`);\n  }\n\n  // promotion to piece\n  if (match[8]) {\n    const pieceCode = match[8].substring(1);\n    const pieceName = _utils__WEBPACK_IMPORTED_MODULE_1__[\"pieceCodeToName\"][pieceCode];\n    seq.push('move_modifier/equals');\n    seq.push(`piece/${pieceName}`);\n  }\n\n  // check\n  if (match[9]) {\n    seq.push('move_modifier/check');\n  }\n\n  // mate\n  if (match[10]) {\n    seq.push('move_modifier/mate');\n  }\n  return seq;\n}\n\nconst defaultBasePath = 'sounds/default/mp3/';\nconst defaultExtension = 'mp3';\n\nclass DefaultVoice extends _abstract__WEBPACK_IMPORTED_MODULE_0__[\"AbstractVoice\"] {\n\n  move({ san }) {\n    const ids = getMoveAudioIds(san);\n    this._playIds(ids, defaultBasePath, defaultExtension);\n  }\n\n  win({ winnerColor, reason }) {\n    const ids = [\n      `color/${winnerColor}`,\n      'game_result/wins',\n      reason === 'time' ? 'misc/on' : 'misc/by',\n      `game_won_reason/${reason}`,\n    ];\n    this._playIds(ids, defaultBasePath, defaultExtension);\n  }\n\n  draw({ reason }) {\n    const ids = [\n      'game_result/draw',\n      'misc/by',\n      `game_drawn_reason/${reason}`,\n    ];\n    this._playIds(ids, defaultBasePath, defaultExtension);\n  }\n};\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvYXVkaW8vdm9pY2VzL2RlZmF1bHQuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXVkaW8vdm9pY2VzL2RlZmF1bHQuanM/ZjI0NiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IEFic3RyYWN0Vm9pY2UgfSBmcm9tICcuL2Fic3RyYWN0JztcbmltcG9ydCB7IG1hdGNoU2FuLCBwaWVjZUNvZGVUb05hbWUsIExPRyB9IGZyb20gJy4uLy4uL3V0aWxzJztcblxuY29uc3QgZ2V0TW92ZUF1ZGlvSWRzID0gKHNhbikgPT4ge1xuICBjb25zdCBtYXRjaCA9IG1hdGNoU2FuKHNhbik7XG5cbiAgbGV0IHNlcSA9IFtdO1xuXG4gIC8vIGNhc3RsZSwgZWl0aGVyIHNob3J0IG9yIGxvbmdcbiAgaWYgKG1hdGNoWzFdKSB7XG4gICAgc2VxLnB1c2goYGZ1bGxfbW92ZS8ke21hdGNoWzFdfWApO1xuICB9XG5cbiAgLy8gcGllY2VcbiAgaWYgKG1hdGNoWzJdKSB7XG4gICAgc2VxLnB1c2goYHBpZWNlLyR7cGllY2VDb2RlVG9OYW1lW21hdGNoWzJdXX1gKTtcbiAgfVxuICAvLyBmaWxlIGFuZCByYW5rIG9yIHBhd24gdGhhdCBpcyBtb3ZpbmdcbiAgaWYgKG1hdGNoWzNdICYmIG1hdGNoWzRdKSB7XG4gICAgc2VxLnB1c2goYHNxdWFyZS8ke21hdGNoWzNdfSR7bWF0Y2hbNF19YCk7XG4gIH0gZWxzZSBpZiAobWF0Y2hbM10pIHtcbiAgICBzZXEucHVzaChgZmlsZS8ke21hdGNoWzNdfWApO1xuICB9IGVsc2UgaWYgKG1hdGNoWzRdKSB7XG4gICAgc2VxLnB1c2goYHJhbmsvJHttYXRjaFs0XX1gKTtcbiAgfVxuXG4gIC8vIHRha2VzXG4gIGlmIChtYXRjaFs1XSkge1xuICAgIHNlcS5wdXNoKCdtb3ZlX21vZGlmaWVyL3Rha2VzJyk7XG4gIH1cblxuICAvLyBmdWxsIGRlc3RpbmF0aW9uIHNxdWFyZSwgbWFuZGF0b3J5IGV4Y2VwdCBjYXN0bGluZyBtb3Zlc1xuICBpZiAobWF0Y2hbNl0gJiYgbWF0Y2hbN10pIHtcbiAgICBzZXEucHVzaChgc3F1YXJlLyR7bWF0Y2hbNl19JHttYXRjaFs3XX1gKTtcbiAgfVxuXG4gIC8vIHByb21vdGlvbiB0byBwaWVjZVxuICBpZiAobWF0Y2hbOF0pIHtcbiAgICBjb25zdCBwaWVjZUNvZGUgPSBtYXRjaFs4XS5zdWJzdHJpbmcoMSk7XG4gICAgY29uc3QgcGllY2VOYW1lID0gcGllY2VDb2RlVG9OYW1lW3BpZWNlQ29kZV07XG4gICAgc2VxLnB1c2goJ21vdmVfbW9kaWZpZXIvZXF1YWxzJyk7XG4gICAgc2VxLnB1c2goYHBpZWNlLyR7cGllY2VOYW1lfWApO1xuICB9XG5cbiAgLy8gY2hlY2tcbiAgaWYgKG1hdGNoWzldKSB7XG4gICAgc2VxLnB1c2goJ21vdmVfbW9kaWZpZXIvY2hlY2snKTtcbiAgfVxuXG4gIC8vIG1hdGVcbiAgaWYgKG1hdGNoWzEwXSkge1xuICAgIHNlcS5wdXNoKCdtb3ZlX21vZGlmaWVyL21hdGUnKTtcbiAgfVxuICByZXR1cm4gc2VxO1xufVxuXG5jb25zdCBkZWZhdWx0QmFzZVBhdGggPSAnc291bmRzL2RlZmF1bHQvbXAzLyc7XG5jb25zdCBkZWZhdWx0RXh0ZW5zaW9uID0gJ21wMyc7XG5cbmNsYXNzIERlZmF1bHRWb2ljZSBleHRlbmRzIEFic3RyYWN0Vm9pY2Uge1xuXG4gIG1vdmUoeyBzYW4gfSkge1xuICAgIGNvbnN0IGlkcyA9IGdldE1vdmVBdWRpb0lkcyhzYW4pO1xuICAgIHRoaXMuX3BsYXlJZHMoaWRzLCBkZWZhdWx0QmFzZVBhdGgsIGRlZmF1bHRFeHRlbnNpb24pO1xuICB9XG5cbiAgd2luKHsgd2lubmVyQ29sb3IsIHJlYXNvbiB9KSB7XG4gICAgY29uc3QgaWRzID0gW1xuICAgICAgYGNvbG9yLyR7d2lubmVyQ29sb3J9YCxcbiAgICAgICdnYW1lX3Jlc3VsdC93aW5zJyxcbiAgICAgIHJlYXNvbiA9PT0gJ3RpbWUnID8gJ21pc2Mvb24nIDogJ21pc2MvYnknLFxuICAgICAgYGdhbWVfd29uX3JlYXNvbi8ke3JlYXNvbn1gLFxuICAgIF07XG4gICAgdGhpcy5fcGxheUlkcyhpZHMsIGRlZmF1bHRCYXNlUGF0aCwgZGVmYXVsdEV4dGVuc2lvbik7XG4gIH1cblxuICBkcmF3KHsgcmVhc29uIH0pIHtcbiAgICBjb25zdCBpZHMgPSBbXG4gICAgICAnZ2FtZV9yZXN1bHQvZHJhdycsXG4gICAgICAnbWlzYy9ieScsXG4gICAgICBgZ2FtZV9kcmF3bl9yZWFzb24vJHtyZWFzb259YCxcbiAgICBdO1xuICAgIHRoaXMuX3BsYXlJZHMoaWRzLCBkZWZhdWx0QmFzZVBhdGgsIGRlZmF1bHRFeHRlbnNpb24pO1xuICB9XG59O1xuXG5leHBvcnQge1xuICBEZWZhdWx0Vm9pY2UsXG59O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/audio/voices/default.js\n");

/***/ }),

/***/ "./src/js/content-script.js":
/*!**********************************!*\
  !*** ./src/js/content-script.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./src/js/app.js\");\n\n\n\n\nObject(_app__WEBPACK_IMPORTED_MODULE_0__[\"app\"])();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvY29udGVudC1zY3JpcHQuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY29udGVudC1zY3JpcHQuanM/OTJiNCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IGFwcCB9IGZyb20gJy4vYXBwJztcblxuYXBwKCk7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/content-script.js\n");

/***/ }),

/***/ "./src/js/games/game.js":
/*!******************************!*\
  !*** ./src/js/games/game.js ***!
  \******************************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Game\", function() { return Game; });\n\n\nclass Game {\n  constructor(id, whiteUsername, blackUsername) {\n    this._id = id;\n    this._whiteUsername = whiteUsername;\n    this._blackUsername = blackUsername;\n    this._ended = false;\n    this._moves = [];\n    this._openings = new Set();\n    this._markUpdated();\n  }\n\n  get whiteUsername() {\n    return this._whiteUsername;\n  }\n\n  get whiteUsername() {\n    return this._blackUsername;\n  }\n\n  get currentPlayerUsername() {\n    return [this._whiteUsername, this._blackUsername][this._moves.length % 2];\n  }\n\n  get currentPlayerColor() {\n    return ['white', 'black'][this._moves.length % 2];\n  }\n\n  get id() {\n    return this._id;\n  }\n\n  get ended() {\n    return this._ended;\n  }\n\n  get moves() {\n    return this._moves;\n  }\n\n  get idle() {\n    if (this.ended) {\n      return 0;\n    }\n    const now = Date.now();\n    return Math.floor((now - this._updateTimestamp) / 1000); // in seconds\n  }\n\n  colorOfUsername(username) {\n    if (username === this._whiteUsername) {\n      return 'white';\n    } else if (username === this._blackUsername) {\n      return 'black';\n    }\n  }\n\n  _openingNameToId(name) {\n    return name.split(':')[0];\n  }\n\n  hasOpening(openingName) {\n    return this._openings.has(this._openingNameToId(openingName));\n  }\n\n  _markUpdated() {\n    this._updateTimestamp = Date.now();\n  }\n\n  addOpening(openingName) {\n    this._openings.add(this._openingNameToId(openingName));\n    this._markUpdated();\n  }\n\n  end() {\n    if (!this._ended) {\n      this._ended = true;\n      this._markUpdated();\n    }\n  }\n\n  pushMove(san) {\n    this._moves.push(san);\n    this._markUpdated();\n  }\n};\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvZ2FtZXMvZ2FtZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9nYW1lcy9nYW1lLmpzP2ZkNGIiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IoaWQsIHdoaXRlVXNlcm5hbWUsIGJsYWNrVXNlcm5hbWUpIHtcbiAgICB0aGlzLl9pZCA9IGlkO1xuICAgIHRoaXMuX3doaXRlVXNlcm5hbWUgPSB3aGl0ZVVzZXJuYW1lO1xuICAgIHRoaXMuX2JsYWNrVXNlcm5hbWUgPSBibGFja1VzZXJuYW1lO1xuICAgIHRoaXMuX2VuZGVkID0gZmFsc2U7XG4gICAgdGhpcy5fbW92ZXMgPSBbXTtcbiAgICB0aGlzLl9vcGVuaW5ncyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLl9tYXJrVXBkYXRlZCgpO1xuICB9XG5cbiAgZ2V0IHdoaXRlVXNlcm5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3doaXRlVXNlcm5hbWU7XG4gIH1cblxuICBnZXQgd2hpdGVVc2VybmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmxhY2tVc2VybmFtZTtcbiAgfVxuXG4gIGdldCBjdXJyZW50UGxheWVyVXNlcm5hbWUoKSB7XG4gICAgcmV0dXJuIFt0aGlzLl93aGl0ZVVzZXJuYW1lLCB0aGlzLl9ibGFja1VzZXJuYW1lXVt0aGlzLl9tb3Zlcy5sZW5ndGggJSAyXTtcbiAgfVxuXG4gIGdldCBjdXJyZW50UGxheWVyQ29sb3IoKSB7XG4gICAgcmV0dXJuIFsnd2hpdGUnLCAnYmxhY2snXVt0aGlzLl9tb3Zlcy5sZW5ndGggJSAyXTtcbiAgfVxuXG4gIGdldCBpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuICBnZXQgZW5kZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VuZGVkO1xuICB9XG5cbiAgZ2V0IG1vdmVzKCkge1xuICAgIHJldHVybiB0aGlzLl9tb3ZlcztcbiAgfVxuXG4gIGdldCBpZGxlKCkge1xuICAgIGlmICh0aGlzLmVuZGVkKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigobm93IC0gdGhpcy5fdXBkYXRlVGltZXN0YW1wKSAvIDEwMDApOyAvLyBpbiBzZWNvbmRzXG4gIH1cblxuICBjb2xvck9mVXNlcm5hbWUodXNlcm5hbWUpIHtcbiAgICBpZiAodXNlcm5hbWUgPT09IHRoaXMuX3doaXRlVXNlcm5hbWUpIHtcbiAgICAgIHJldHVybiAnd2hpdGUnO1xuICAgIH0gZWxzZSBpZiAodXNlcm5hbWUgPT09IHRoaXMuX2JsYWNrVXNlcm5hbWUpIHtcbiAgICAgIHJldHVybiAnYmxhY2snO1xuICAgIH1cbiAgfVxuXG4gIF9vcGVuaW5nTmFtZVRvSWQobmFtZSkge1xuICAgIHJldHVybiBuYW1lLnNwbGl0KCc6JylbMF07XG4gIH1cblxuICBoYXNPcGVuaW5nKG9wZW5pbmdOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wZW5pbmdzLmhhcyh0aGlzLl9vcGVuaW5nTmFtZVRvSWQob3BlbmluZ05hbWUpKTtcbiAgfVxuXG4gIF9tYXJrVXBkYXRlZCgpIHtcbiAgICB0aGlzLl91cGRhdGVUaW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICB9XG5cbiAgYWRkT3BlbmluZyhvcGVuaW5nTmFtZSkge1xuICAgIHRoaXMuX29wZW5pbmdzLmFkZCh0aGlzLl9vcGVuaW5nTmFtZVRvSWQob3BlbmluZ05hbWUpKTtcbiAgICB0aGlzLl9tYXJrVXBkYXRlZCgpO1xuICB9XG5cbiAgZW5kKCkge1xuICAgIGlmICghdGhpcy5fZW5kZWQpIHtcbiAgICAgIHRoaXMuX2VuZGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX21hcmtVcGRhdGVkKCk7XG4gICAgfVxuICB9XG5cbiAgcHVzaE1vdmUoc2FuKSB7XG4gICAgdGhpcy5fbW92ZXMucHVzaChzYW4pO1xuICAgIHRoaXMuX21hcmtVcGRhdGVkKCk7XG4gIH1cbn07XG5cbmV4cG9ydCB7IEdhbWUgfTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/games/game.js\n");

/***/ }),

/***/ "./src/js/games/index.js":
/*!*******************************!*\
  !*** ./src/js/games/index.js ***!
  \*******************************/
/*! exports provided: GamesManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./manager */ \"./src/js/games/manager.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"GamesManager\", function() { return _manager__WEBPACK_IMPORTED_MODULE_0__[\"GamesManager\"]; });\n\n\n\n\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvZ2FtZXMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2FtZXMvaW5kZXguanM/M2JlMyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IEdhbWVzTWFuYWdlciB9IGZyb20gJy4vbWFuYWdlcic7XG5cbmV4cG9ydCB7IEdhbWVzTWFuYWdlciB9O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/games/index.js\n");

/***/ }),

/***/ "./src/js/games/manager.js":
/*!*********************************!*\
  !*** ./src/js/games/manager.js ***!
  \*********************************/
/*! exports provided: GamesManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GamesManager\", function() { return GamesManager; });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/js/games/game.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./src/js/utils.js\");\n\n\n\n\n\nclass GamesManager {\n  constructor() {\n    this._games = {};\n    this._listeners = {\n      'start': [],\n      'move': [],\n      'opening': [],\n      'end': [],\n      'idle': [],\n      'time': [],\n      'drawOffered': [],\n      'drawDeclined': [],\n    };\n  }\n\n  addListener(type, listener) {\n    if (Array.isArray(this._listeners[type])) {\n      this._listeners[type].push(listener);\n    }\n  }\n\n  _notifiListeners(type, message) {\n    this._listeners[type].forEach(l => l(message));\n  }\n\n  _initializeGame({ gameId, gameStateEvents, moveEvents, openingName }) {\n    let game = null;\n    for (const gameStateEvent of gameStateEvents) {\n      const { type, ...params } = gameStateEvent;\n      if (type === 'started') {\n        game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"Game\"](gameId, params.whiteUsername, params.blackUsername);\n        if (openingName) {\n          game.addOpening(openingName);\n        }\n        moveEvents.forEach(e => game.pushMove(e.san));\n        this._games[gameId] = game;\n      } else if (type === 'ended') {\n        game.end();\n      }\n    }\n    // we consider the game as just started iff. it hasn't ended and no moves were made yet\n    if (game && !game.ended && game.moves.length === 0) {\n      this._notifiListeners('start', {\n        gameId: game.id,\n        whiteUsername: game.whiteUsername,\n        blackUsername: game.blackUsername,\n      });\n    }\n  }\n\n  handleEvent({ type, gameId, ...params }) {\n    Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"LOG\"])('got event=' + JSON.stringify({ type, gameId, ...params }));\n    if (type === 'init') {\n      this._initializeGame({ gameId, ...params });\n    } else {\n      const game = this._games[gameId];\n      if (!game || game.ended) {\n        return;\n      }\n      const now = Date.now();\n      if (type === 'ping') {\n        this._notifiListeners('idle', {\n          seconds: game.idle,\n          playerColor: game.currentPlayerColor,\n        });\n      } else if (type === 'time') {\n        this._notifiListeners('time', { gameId, ...params });\n      } else {\n        if (type === 'ended') {\n          game.end();\n          const winnerColor = game.colorOfUsername(params.winnerUsername);\n          Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"LOG\"])(`winnerColor=${winnerColor}`);\n          this._notifiListeners('end', { gameId, winnerColor, ...params });\n        } else if (type === 'move') {\n          this._notifiListeners('move', {\n            gameId,\n            playerColor: game.currentPlayerColor,\n            playerUsername: game.currentPlayerUsername,\n            ...params\n          });\n          game.pushMove(params.san);\n        } else if (type === 'openingName') {\n          const { name } = params;\n          if (!game.hasOpening(name)) {\n            game.addOpening(name);\n            this._notifiListeners('opening', { gameId, ...params });\n          }\n        } else if (type === 'drawOffered') {\n          const { playerUsername } = params;\n          const playerColor = game.colorOfUsername(playerUsername);\n          this._notifiListeners('drawOffered', { gameId, playerColor, ...params });\n        } else if (type === 'drawDeclined') {\n          const { playerUsername } = params;\n          const playerColor = game.colorOfUsername(playerUsername);\n          this._notifiListeners('drawDeclined', { gameId, playerColor, ...params });\n        }\n      }\n    }\n  }\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvZ2FtZXMvbWFuYWdlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9nYW1lcy9tYW5hZ2VyLmpzP2Y5MDMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi9nYW1lJztcbmltcG9ydCB7IExPRyB9IGZyb20gJy4uL3V0aWxzJztcblxuY2xhc3MgR2FtZXNNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fZ2FtZXMgPSB7fTtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSB7XG4gICAgICAnc3RhcnQnOiBbXSxcbiAgICAgICdtb3ZlJzogW10sXG4gICAgICAnb3BlbmluZyc6IFtdLFxuICAgICAgJ2VuZCc6IFtdLFxuICAgICAgJ2lkbGUnOiBbXSxcbiAgICAgICd0aW1lJzogW10sXG4gICAgICAnZHJhd09mZmVyZWQnOiBbXSxcbiAgICAgICdkcmF3RGVjbGluZWQnOiBbXSxcbiAgICB9O1xuICB9XG5cbiAgYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9saXN0ZW5lcnNbdHlwZV0pKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuICB9XG5cbiAgX25vdGlmaUxpc3RlbmVycyh0eXBlLCBtZXNzYWdlKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzW3R5cGVdLmZvckVhY2gobCA9PiBsKG1lc3NhZ2UpKTtcbiAgfVxuXG4gIF9pbml0aWFsaXplR2FtZSh7IGdhbWVJZCwgZ2FtZVN0YXRlRXZlbnRzLCBtb3ZlRXZlbnRzLCBvcGVuaW5nTmFtZSB9KSB7XG4gICAgbGV0IGdhbWUgPSBudWxsO1xuICAgIGZvciAoY29uc3QgZ2FtZVN0YXRlRXZlbnQgb2YgZ2FtZVN0YXRlRXZlbnRzKSB7XG4gICAgICBjb25zdCB7IHR5cGUsIC4uLnBhcmFtcyB9ID0gZ2FtZVN0YXRlRXZlbnQ7XG4gICAgICBpZiAodHlwZSA9PT0gJ3N0YXJ0ZWQnKSB7XG4gICAgICAgIGdhbWUgPSBuZXcgR2FtZShnYW1lSWQsIHBhcmFtcy53aGl0ZVVzZXJuYW1lLCBwYXJhbXMuYmxhY2tVc2VybmFtZSk7XG4gICAgICAgIGlmIChvcGVuaW5nTmFtZSkge1xuICAgICAgICAgIGdhbWUuYWRkT3BlbmluZyhvcGVuaW5nTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgbW92ZUV2ZW50cy5mb3JFYWNoKGUgPT4gZ2FtZS5wdXNoTW92ZShlLnNhbikpO1xuICAgICAgICB0aGlzLl9nYW1lc1tnYW1lSWRdID0gZ2FtZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2VuZGVkJykge1xuICAgICAgICBnYW1lLmVuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyB3ZSBjb25zaWRlciB0aGUgZ2FtZSBhcyBqdXN0IHN0YXJ0ZWQgaWZmLiBpdCBoYXNuJ3QgZW5kZWQgYW5kIG5vIG1vdmVzIHdlcmUgbWFkZSB5ZXRcbiAgICBpZiAoZ2FtZSAmJiAhZ2FtZS5lbmRlZCAmJiBnYW1lLm1vdmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5fbm90aWZpTGlzdGVuZXJzKCdzdGFydCcsIHtcbiAgICAgICAgZ2FtZUlkOiBnYW1lLmlkLFxuICAgICAgICB3aGl0ZVVzZXJuYW1lOiBnYW1lLndoaXRlVXNlcm5hbWUsXG4gICAgICAgIGJsYWNrVXNlcm5hbWU6IGdhbWUuYmxhY2tVc2VybmFtZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUV2ZW50KHsgdHlwZSwgZ2FtZUlkLCAuLi5wYXJhbXMgfSkge1xuICAgIExPRygnZ290IGV2ZW50PScgKyBKU09OLnN0cmluZ2lmeSh7IHR5cGUsIGdhbWVJZCwgLi4ucGFyYW1zIH0pKTtcbiAgICBpZiAodHlwZSA9PT0gJ2luaXQnKSB7XG4gICAgICB0aGlzLl9pbml0aWFsaXplR2FtZSh7IGdhbWVJZCwgLi4ucGFyYW1zIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBnYW1lID0gdGhpcy5fZ2FtZXNbZ2FtZUlkXTtcbiAgICAgIGlmICghZ2FtZSB8fCBnYW1lLmVuZGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICBpZiAodHlwZSA9PT0gJ3BpbmcnKSB7XG4gICAgICAgIHRoaXMuX25vdGlmaUxpc3RlbmVycygnaWRsZScsIHtcbiAgICAgICAgICBzZWNvbmRzOiBnYW1lLmlkbGUsXG4gICAgICAgICAgcGxheWVyQ29sb3I6IGdhbWUuY3VycmVudFBsYXllckNvbG9yLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3RpbWUnKSB7XG4gICAgICAgIHRoaXMuX25vdGlmaUxpc3RlbmVycygndGltZScsIHsgZ2FtZUlkLCAuLi5wYXJhbXMgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2VuZGVkJykge1xuICAgICAgICAgIGdhbWUuZW5kKCk7XG4gICAgICAgICAgY29uc3Qgd2lubmVyQ29sb3IgPSBnYW1lLmNvbG9yT2ZVc2VybmFtZShwYXJhbXMud2lubmVyVXNlcm5hbWUpO1xuICAgICAgICAgIExPRyhgd2lubmVyQ29sb3I9JHt3aW5uZXJDb2xvcn1gKTtcbiAgICAgICAgICB0aGlzLl9ub3RpZmlMaXN0ZW5lcnMoJ2VuZCcsIHsgZ2FtZUlkLCB3aW5uZXJDb2xvciwgLi4ucGFyYW1zIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdtb3ZlJykge1xuICAgICAgICAgIHRoaXMuX25vdGlmaUxpc3RlbmVycygnbW92ZScsIHtcbiAgICAgICAgICAgIGdhbWVJZCxcbiAgICAgICAgICAgIHBsYXllckNvbG9yOiBnYW1lLmN1cnJlbnRQbGF5ZXJDb2xvcixcbiAgICAgICAgICAgIHBsYXllclVzZXJuYW1lOiBnYW1lLmN1cnJlbnRQbGF5ZXJVc2VybmFtZSxcbiAgICAgICAgICAgIC4uLnBhcmFtc1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGdhbWUucHVzaE1vdmUocGFyYW1zLnNhbik7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29wZW5pbmdOYW1lJykge1xuICAgICAgICAgIGNvbnN0IHsgbmFtZSB9ID0gcGFyYW1zO1xuICAgICAgICAgIGlmICghZ2FtZS5oYXNPcGVuaW5nKG5hbWUpKSB7XG4gICAgICAgICAgICBnYW1lLmFkZE9wZW5pbmcobmFtZSk7XG4gICAgICAgICAgICB0aGlzLl9ub3RpZmlMaXN0ZW5lcnMoJ29wZW5pbmcnLCB7IGdhbWVJZCwgLi4ucGFyYW1zIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnZHJhd09mZmVyZWQnKSB7XG4gICAgICAgICAgY29uc3QgeyBwbGF5ZXJVc2VybmFtZSB9ID0gcGFyYW1zO1xuICAgICAgICAgIGNvbnN0IHBsYXllckNvbG9yID0gZ2FtZS5jb2xvck9mVXNlcm5hbWUocGxheWVyVXNlcm5hbWUpO1xuICAgICAgICAgIHRoaXMuX25vdGlmaUxpc3RlbmVycygnZHJhd09mZmVyZWQnLCB7IGdhbWVJZCwgcGxheWVyQ29sb3IsIC4uLnBhcmFtcyB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnZHJhd0RlY2xpbmVkJykge1xuICAgICAgICAgIGNvbnN0IHsgcGxheWVyVXNlcm5hbWUgfSA9IHBhcmFtcztcbiAgICAgICAgICBjb25zdCBwbGF5ZXJDb2xvciA9IGdhbWUuY29sb3JPZlVzZXJuYW1lKHBsYXllclVzZXJuYW1lKTtcbiAgICAgICAgICB0aGlzLl9ub3RpZmlMaXN0ZW5lcnMoJ2RyYXdEZWNsaW5lZCcsIHsgZ2FtZUlkLCBwbGF5ZXJDb2xvciwgLi4ucGFyYW1zIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVzTWFuYWdlciB9O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/games/manager.js\n");

/***/ }),

/***/ "./src/js/observers/abstract.js":
/*!**************************************!*\
  !*** ./src/js/observers/abstract.js ***!
  \**************************************/
/*! exports provided: AbstractObserver, AbstractDOMObserver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AbstractObserver\", function() { return AbstractObserver; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AbstractDOMObserver\", function() { return AbstractDOMObserver; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/js/utils.js\");\n\n\n\n\nclass AbstractObserver {\n  constructor() {\n    this._parent = null;\n    this._children = [];\n    this._handlers = [];\n    return this;\n  }\n\n  set parent(value) {\n    this._parent = value;\n  }\n\n  stopChildren() {\n    this._children.forEach(c => c.stop());\n  }\n\n  stop() {\n    this.stopChildren();\n  }\n\n  startChildren() {\n    this._children.forEach(c => c.start());\n  }\n\n  start() {\n    Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"LOG\"])('observer start method not implemented');\n  }\n\n  addHandler(handler) {\n    this._handlers.push(handler);\n  }\n\n  addChild(child) {\n    child.parent = this;\n    this._children.push(child);\n  }\n\n  clearChildren() {\n    this._children = [];\n  }\n\n  _prepareEvent(event) {\n    return event;\n  }\n\n  _notifyHandlers(event) {\n    const finalEvent = this._prepareEvent(event);\n    this._parent && this._parent._notifyHandlers(finalEvent);\n    this._handlers.forEach(h => h(finalEvent));\n  }\n\n};\n\nclass AbstractDOMObserver extends AbstractObserver {\n\n  constructor(target) {\n    super();\n    this._target = target;\n    this._observer = null;\n    return this;\n  }\n\n  stop() {\n    super.stop();\n    this._observer && this._observer.disconnect();\n  }\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvb2JzZXJ2ZXJzL2Fic3RyYWN0LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2pzL29ic2VydmVycy9hYnN0cmFjdC5qcz84MzJmIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgTE9HIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5jbGFzcyBBYnN0cmFjdE9ic2VydmVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuICAgIHRoaXMuX2hhbmRsZXJzID0gW107XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXQgcGFyZW50KHZhbHVlKSB7XG4gICAgdGhpcy5fcGFyZW50ID0gdmFsdWU7XG4gIH1cblxuICBzdG9wQ2hpbGRyZW4oKSB7XG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChjID0+IGMuc3RvcCgpKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5zdG9wQ2hpbGRyZW4oKTtcbiAgfVxuXG4gIHN0YXJ0Q2hpbGRyZW4oKSB7XG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChjID0+IGMuc3RhcnQoKSk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBMT0coJ29ic2VydmVyIHN0YXJ0IG1ldGhvZCBub3QgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIGFkZEhhbmRsZXIoaGFuZGxlcikge1xuICAgIHRoaXMuX2hhbmRsZXJzLnB1c2goaGFuZGxlcik7XG4gIH1cblxuICBhZGRDaGlsZChjaGlsZCkge1xuICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgdGhpcy5fY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gIH1cblxuICBjbGVhckNoaWxkcmVuKCkge1xuICAgIHRoaXMuX2NoaWxkcmVuID0gW107XG4gIH1cblxuICBfcHJlcGFyZUV2ZW50KGV2ZW50KSB7XG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG5cbiAgX25vdGlmeUhhbmRsZXJzKGV2ZW50KSB7XG4gICAgY29uc3QgZmluYWxFdmVudCA9IHRoaXMuX3ByZXBhcmVFdmVudChldmVudCk7XG4gICAgdGhpcy5fcGFyZW50ICYmIHRoaXMuX3BhcmVudC5fbm90aWZ5SGFuZGxlcnMoZmluYWxFdmVudCk7XG4gICAgdGhpcy5faGFuZGxlcnMuZm9yRWFjaChoID0+IGgoZmluYWxFdmVudCkpO1xuICB9XG5cbn07XG5cbmNsYXNzIEFic3RyYWN0RE9NT2JzZXJ2ZXIgZXh0ZW5kcyBBYnN0cmFjdE9ic2VydmVyIHtcblxuICBjb25zdHJ1Y3Rvcih0YXJnZXQpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcbiAgICB0aGlzLl9vYnNlcnZlciA9IG51bGw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHN1cGVyLnN0b3AoKTtcbiAgICB0aGlzLl9vYnNlcnZlciAmJiB0aGlzLl9vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQWJzdHJhY3RPYnNlcnZlcixcbiAgQWJzdHJhY3RET01PYnNlcnZlcixcbn07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/observers/abstract.js\n");

/***/ }),

/***/ "./src/js/observers/chat.js":
/*!**********************************!*\
  !*** ./src/js/observers/chat.js ***!
  \**********************************/
/*! exports provided: isChatGameMessage, chatGameMessageToEvent, ChatObserver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isChatGameMessage\", function() { return isChatGameMessage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"chatGameMessageToEvent\", function() { return chatGameMessageToEvent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ChatObserver\", function() { return ChatObserver; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/js/utils.js\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract */ \"./src/js/observers/abstract.js\");\n\n\n\n\n\nconst isChatGameMessage = (e, gameId) => {\n  return e.classList && e.classList.contains('chat-message-component')\n  && e.hasAttribute('data-notification')\n  && e.getAttribute('data-message-id') === `game-${gameId}`;\n}\n\nconst chatGameMessageToEvent = (elem) => {\n  const eventType = elem.getAttribute('data-notification');\n  const gameId = elem.getAttribute('data-message-id').split('-', 2)[1];\n\n  // TODO: handle gameDrawDeclined, gameDrawAccepted, gameDrawOffered events, what exact HTML nodes represent those events?\n  if (eventType === 'gameNewGamePlaying' || eventType === 'gameNewGameObserving') {\n    const players = elem.querySelectorAll('.username');\n    const whiteUsername = players[0].getAttribute('data-username');\n    const blackUsername = players[1].getAttribute('data-username');\n    return {\n      type: 'started',\n      mode: eventType === 'gameNewGamePlaying' ? 'playing' : 'observing',\n      whiteUsername,\n      blackUsername,\n    };\n  } else if (eventType === 'gameOver') {\n    const possibleDrawText = elem.querySelector('a').textContent.toLowerCase();\n    if (possibleDrawText.startsWith('game drawn') || possibleDrawText.startsWith('draw')) {\n      // usually starts with 'game drawn' by there is at least one case when it starts with 'draw':\n      // 'Draw: Black ran out of time, but White has insufficient material'\n      const reasons = ['stalemate', 'insufficient material', '50 move-rule', 'repetition', 'agreement'];\n      let drawnBy = undefined;\n      for (const reason of reasons) {\n        if (possibleDrawText.includes(reason)) {\n          drawnBy = reason;\n          break;\n        }\n      }\n      return {\n        type: 'ended',\n        draw: true,\n        drawnBy,\n      };\n    }\n    const usernameElem = elem.querySelector('.username');\n    const winnerUsername = usernameElem.getAttribute('data-username');\n    const reasons = ['game abandoned', 'time', 'checkmate', 'resignation'];\n    const text = usernameElem.nextSibling.textContent.trim().toLowerCase();\n    let wonBy = undefined;\n    for (const reason of reasons) {\n      if (text.includes(reason)) {\n        wonBy = reason;\n        break;\n      }\n    }\n    return {\n      type: 'ended',\n      draw: false,\n      winnerUsername,\n      wonBy,\n    };\n  } else if (eventType === 'gameDrawOffer') {\n    // TODO: check what happens textContent begins with player's title if the player has title\n    const playerUsername = elem.textContent.split(' ')[0];\n    return {\n      type: 'drawOffered',\n      playerUsername,\n    };\n  } else if (eventType === 'gameDrawDeclined') {\n    // TODO: check what happens textContent begins with player's title if the player has title\n    const playerUsername = elem.textContent.split(' ')[0];\n    return {\n      type: 'drawDeclined',\n      playerUsername,\n    };\n  }\n  return null;\n};\n\nclass ChatObserver extends _abstract__WEBPACK_IMPORTED_MODULE_1__[\"AbstractDOMObserver\"] {\n\n  constructor(target, gameId) {\n    super(target);\n    this._gameId = gameId;\n  }\n\n  start() {\n    Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"LOG\"])('message observing started...');\n    this._observer = new MutationObserver((mutations, obj) => {\n      for (let mutation of mutations) {\n        if (mutation.type === 'childList') {\n          for (let i = 0; i < mutation.addedNodes.length; ++i) {\n            const node = mutation.addedNodes.item(i);\n            if (isChatGameMessage(node, this._gameId)) {\n              const event = chatGameMessageToEvent(node);\n              if (event) {\n                this._notifyHandlers(event);\n              }\n            }\n          }\n        }\n      }\n    })\n    .observe(this._target, {\n      attributes: false,\n      childList: true,\n      subtree: true,\n      characterData: false,\n    });\n  }\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvb2JzZXJ2ZXJzL2NoYXQuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvb2JzZXJ2ZXJzL2NoYXQuanM/YzNlZCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IExPRyB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IEFic3RyYWN0RE9NT2JzZXJ2ZXIgfSBmcm9tICcuL2Fic3RyYWN0JztcblxuY29uc3QgaXNDaGF0R2FtZU1lc3NhZ2UgPSAoZSwgZ2FtZUlkKSA9PiB7XG4gIHJldHVybiBlLmNsYXNzTGlzdCAmJiBlLmNsYXNzTGlzdC5jb250YWlucygnY2hhdC1tZXNzYWdlLWNvbXBvbmVudCcpXG4gICYmIGUuaGFzQXR0cmlidXRlKCdkYXRhLW5vdGlmaWNhdGlvbicpXG4gICYmIGUuZ2V0QXR0cmlidXRlKCdkYXRhLW1lc3NhZ2UtaWQnKSA9PT0gYGdhbWUtJHtnYW1lSWR9YDtcbn1cblxuY29uc3QgY2hhdEdhbWVNZXNzYWdlVG9FdmVudCA9IChlbGVtKSA9PiB7XG4gIGNvbnN0IGV2ZW50VHlwZSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLW5vdGlmaWNhdGlvbicpO1xuICBjb25zdCBnYW1lSWQgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1tZXNzYWdlLWlkJykuc3BsaXQoJy0nLCAyKVsxXTtcblxuICAvLyBUT0RPOiBoYW5kbGUgZ2FtZURyYXdEZWNsaW5lZCwgZ2FtZURyYXdBY2NlcHRlZCwgZ2FtZURyYXdPZmZlcmVkIGV2ZW50cywgd2hhdCBleGFjdCBIVE1MIG5vZGVzIHJlcHJlc2VudCB0aG9zZSBldmVudHM/XG4gIGlmIChldmVudFR5cGUgPT09ICdnYW1lTmV3R2FtZVBsYXlpbmcnIHx8IGV2ZW50VHlwZSA9PT0gJ2dhbWVOZXdHYW1lT2JzZXJ2aW5nJykge1xuICAgIGNvbnN0IHBsYXllcnMgPSBlbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJy51c2VybmFtZScpO1xuICAgIGNvbnN0IHdoaXRlVXNlcm5hbWUgPSBwbGF5ZXJzWzBdLmdldEF0dHJpYnV0ZSgnZGF0YS11c2VybmFtZScpO1xuICAgIGNvbnN0IGJsYWNrVXNlcm5hbWUgPSBwbGF5ZXJzWzFdLmdldEF0dHJpYnV0ZSgnZGF0YS11c2VybmFtZScpO1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnc3RhcnRlZCcsXG4gICAgICBtb2RlOiBldmVudFR5cGUgPT09ICdnYW1lTmV3R2FtZVBsYXlpbmcnID8gJ3BsYXlpbmcnIDogJ29ic2VydmluZycsXG4gICAgICB3aGl0ZVVzZXJuYW1lLFxuICAgICAgYmxhY2tVc2VybmFtZSxcbiAgICB9O1xuICB9IGVsc2UgaWYgKGV2ZW50VHlwZSA9PT0gJ2dhbWVPdmVyJykge1xuICAgIGNvbnN0IHBvc3NpYmxlRHJhd1RleHQgPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ2EnKS50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChwb3NzaWJsZURyYXdUZXh0LnN0YXJ0c1dpdGgoJ2dhbWUgZHJhd24nKSB8fCBwb3NzaWJsZURyYXdUZXh0LnN0YXJ0c1dpdGgoJ2RyYXcnKSkge1xuICAgICAgLy8gdXN1YWxseSBzdGFydHMgd2l0aCAnZ2FtZSBkcmF3bicgYnkgdGhlcmUgaXMgYXQgbGVhc3Qgb25lIGNhc2Ugd2hlbiBpdCBzdGFydHMgd2l0aCAnZHJhdyc6XG4gICAgICAvLyAnRHJhdzogQmxhY2sgcmFuIG91dCBvZiB0aW1lLCBidXQgV2hpdGUgaGFzIGluc3VmZmljaWVudCBtYXRlcmlhbCdcbiAgICAgIGNvbnN0IHJlYXNvbnMgPSBbJ3N0YWxlbWF0ZScsICdpbnN1ZmZpY2llbnQgbWF0ZXJpYWwnLCAnNTAgbW92ZS1ydWxlJywgJ3JlcGV0aXRpb24nLCAnYWdyZWVtZW50J107XG4gICAgICBsZXQgZHJhd25CeSA9IHVuZGVmaW5lZDtcbiAgICAgIGZvciAoY29uc3QgcmVhc29uIG9mIHJlYXNvbnMpIHtcbiAgICAgICAgaWYgKHBvc3NpYmxlRHJhd1RleHQuaW5jbHVkZXMocmVhc29uKSkge1xuICAgICAgICAgIGRyYXduQnkgPSByZWFzb247XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdlbmRlZCcsXG4gICAgICAgIGRyYXc6IHRydWUsXG4gICAgICAgIGRyYXduQnksXG4gICAgICB9O1xuICAgIH1cbiAgICBjb25zdCB1c2VybmFtZUVsZW0gPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJy51c2VybmFtZScpO1xuICAgIGNvbnN0IHdpbm5lclVzZXJuYW1lID0gdXNlcm5hbWVFbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS11c2VybmFtZScpO1xuICAgIGNvbnN0IHJlYXNvbnMgPSBbJ2dhbWUgYWJhbmRvbmVkJywgJ3RpbWUnLCAnY2hlY2ttYXRlJywgJ3Jlc2lnbmF0aW9uJ107XG4gICAgY29uc3QgdGV4dCA9IHVzZXJuYW1lRWxlbS5uZXh0U2libGluZy50ZXh0Q29udGVudC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgd29uQnkgPSB1bmRlZmluZWQ7XG4gICAgZm9yIChjb25zdCByZWFzb24gb2YgcmVhc29ucykge1xuICAgICAgaWYgKHRleHQuaW5jbHVkZXMocmVhc29uKSkge1xuICAgICAgICB3b25CeSA9IHJlYXNvbjtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnZW5kZWQnLFxuICAgICAgZHJhdzogZmFsc2UsXG4gICAgICB3aW5uZXJVc2VybmFtZSxcbiAgICAgIHdvbkJ5LFxuICAgIH07XG4gIH0gZWxzZSBpZiAoZXZlbnRUeXBlID09PSAnZ2FtZURyYXdPZmZlcicpIHtcbiAgICAvLyBUT0RPOiBjaGVjayB3aGF0IGhhcHBlbnMgdGV4dENvbnRlbnQgYmVnaW5zIHdpdGggcGxheWVyJ3MgdGl0bGUgaWYgdGhlIHBsYXllciBoYXMgdGl0bGVcbiAgICBjb25zdCBwbGF5ZXJVc2VybmFtZSA9IGVsZW0udGV4dENvbnRlbnQuc3BsaXQoJyAnKVswXTtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2RyYXdPZmZlcmVkJyxcbiAgICAgIHBsYXllclVzZXJuYW1lLFxuICAgIH07XG4gIH0gZWxzZSBpZiAoZXZlbnRUeXBlID09PSAnZ2FtZURyYXdEZWNsaW5lZCcpIHtcbiAgICAvLyBUT0RPOiBjaGVjayB3aGF0IGhhcHBlbnMgdGV4dENvbnRlbnQgYmVnaW5zIHdpdGggcGxheWVyJ3MgdGl0bGUgaWYgdGhlIHBsYXllciBoYXMgdGl0bGVcbiAgICBjb25zdCBwbGF5ZXJVc2VybmFtZSA9IGVsZW0udGV4dENvbnRlbnQuc3BsaXQoJyAnKVswXTtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2RyYXdEZWNsaW5lZCcsXG4gICAgICBwbGF5ZXJVc2VybmFtZSxcbiAgICB9O1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuY2xhc3MgQ2hhdE9ic2VydmVyIGV4dGVuZHMgQWJzdHJhY3RET01PYnNlcnZlciB7XG5cbiAgY29uc3RydWN0b3IodGFyZ2V0LCBnYW1lSWQpIHtcbiAgICBzdXBlcih0YXJnZXQpO1xuICAgIHRoaXMuX2dhbWVJZCA9IGdhbWVJZDtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIExPRygnbWVzc2FnZSBvYnNlcnZpbmcgc3RhcnRlZC4uLicpO1xuICAgIHRoaXMuX29ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucywgb2JqKSA9PiB7XG4gICAgICBmb3IgKGxldCBtdXRhdGlvbiBvZiBtdXRhdGlvbnMpIHtcbiAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT09ICdjaGlsZExpc3QnKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtdXRhdGlvbi5hZGRlZE5vZGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gbXV0YXRpb24uYWRkZWROb2Rlcy5pdGVtKGkpO1xuICAgICAgICAgICAgaWYgKGlzQ2hhdEdhbWVNZXNzYWdlKG5vZGUsIHRoaXMuX2dhbWVJZCkpIHtcbiAgICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBjaGF0R2FtZU1lc3NhZ2VUb0V2ZW50KG5vZGUpO1xuICAgICAgICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ub3RpZnlIYW5kbGVycyhldmVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIC5vYnNlcnZlKHRoaXMuX3RhcmdldCwge1xuICAgICAgYXR0cmlidXRlczogZmFsc2UsXG4gICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2UsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgaXNDaGF0R2FtZU1lc3NhZ2UsXG4gIGNoYXRHYW1lTWVzc2FnZVRvRXZlbnQsXG4gIENoYXRPYnNlcnZlcixcbn07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/observers/chat.js\n");

/***/ }),

/***/ "./src/js/observers/games.js":
/*!***********************************!*\
  !*** ./src/js/observers/games.js ***!
  \***********************************/
/*! exports provided: LiveGameObserver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LiveGameObserver\", function() { return LiveGameObserver; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/js/utils.js\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract */ \"./src/js/observers/abstract.js\");\n/* harmony import */ var _chat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chat */ \"./src/js/observers/chat.js\");\n/* harmony import */ var _moves__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./moves */ \"./src/js/observers/moves.js\");\n/* harmony import */ var _opening__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./opening */ \"./src/js/observers/opening.js\");\n/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./time */ \"./src/js/observers/time.js\");\n/* harmony import */ var _ping__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ping */ \"./src/js/observers/ping.js\");\n\n\n\n\n\n\n\n\n\n\nclass LiveGameObserver extends _abstract__WEBPACK_IMPORTED_MODULE_1__[\"AbstractDOMObserver\"] {\n  constructor(target, pingFrequency) {\n    super(target);\n    this._pingFrequency = pingFrequency;\n    this._gameId = null;\n  }\n\n  _prepareEvent(event) {\n    return { gameId: this._gameId, ...event };\n  }\n\n  initChildren() {\n    const chatStreamElem = this._target.querySelector('.chat-stream-component');\n    const movesListElem = this._target.querySelector('.vertical-move-list-component').querySelector('div');\n    const openingNameElem = this._target.querySelector('.board-opening-name');\n    const whiteTimeElem = this._target.querySelector('.clock-white');\n    const blackTimeElem = this._target.querySelector('.clock-black');\n\n    const gameStateEvents = Array.from(chatStreamElem.querySelectorAll('.chat-message-component'))\n    .filter(msg => Object(_chat__WEBPACK_IMPORTED_MODULE_2__[\"isChatGameMessage\"])(msg, this._gameId))\n    .map(msg => Object(_chat__WEBPACK_IMPORTED_MODULE_2__[\"chatGameMessageToEvent\"])(msg))\n    .filter(e => e);\n\n    const moveEvents = Array.from(movesListElem.querySelectorAll('.move-text-component'))\n    .map(e => Object(_moves__WEBPACK_IMPORTED_MODULE_3__[\"moveElementToEvent\"])(e));\n\n    this._notifyHandlers({\n      type: 'init',\n      gameStateEvents,\n      moveEvents,\n      openingName: Object(_opening__WEBPACK_IMPORTED_MODULE_4__[\"openingElementToName\"])(openingNameElem),\n    });\n\n    const children = [\n      new _chat__WEBPACK_IMPORTED_MODULE_2__[\"ChatObserver\"](chatStreamElem, this._gameId),\n      new _moves__WEBPACK_IMPORTED_MODULE_3__[\"MovesObserver\"](movesListElem),\n      new _opening__WEBPACK_IMPORTED_MODULE_4__[\"OpeningObserver\"](openingNameElem),\n      new _time__WEBPACK_IMPORTED_MODULE_5__[\"TimeObserver\"](whiteTimeElem, 'white'),\n      new _time__WEBPACK_IMPORTED_MODULE_5__[\"TimeObserver\"](blackTimeElem, 'black'),\n      new _ping__WEBPACK_IMPORTED_MODULE_6__[\"PingObserver\"](this._pingFrequency),\n    ];\n    children.forEach(c => this.addChild(c));\n  }\n\n  start() {\n    Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"LOG\"])('observing started...');\n    this._observer = new MutationObserver((mutations, obj) => {\n      for (let mutation of mutations) {\n        if (mutation.type === 'childList') {\n          for (let i = 0; i < mutation.addedNodes.length; ++i) {\n            const node = mutation.addedNodes.item(i);\n            if (node.id && node.id.startsWith('chat-boards-')) {\n\n              // looks like id of node is chat-board- followed by 0 followed by gameID, is this true?\n              this._gameId = node.id.substr(13);\n\n              // we set timeout so that initial moves list and opening name have time to load\n              // maybe this should be done in a better way?\n              setTimeout(() => {\n                this.stopChildren();\n                this.clearChildren();\n                this.initChildren();\n                this.startChildren();\n              }, 100);\n            }\n          }\n        }\n      }\n    })\n    .observe(this._target, {\n      attributes: false,\n      childList: true,\n      subtree: true,\n      characterData: false,\n    });\n  }\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvb2JzZXJ2ZXJzL2dhbWVzLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2pzL29ic2VydmVycy9nYW1lcy5qcz8yNWI1Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgTE9HIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgQWJzdHJhY3RET01PYnNlcnZlciB9IGZyb20gJy4vYWJzdHJhY3QnO1xuaW1wb3J0IHsgQ2hhdE9ic2VydmVyLCBpc0NoYXRHYW1lTWVzc2FnZSwgY2hhdEdhbWVNZXNzYWdlVG9FdmVudCB9IGZyb20gJy4vY2hhdCc7XG5pbXBvcnQgeyBNb3Zlc09ic2VydmVyLCBtb3ZlRWxlbWVudFRvRXZlbnQgfSBmcm9tICcuL21vdmVzJztcbmltcG9ydCB7IE9wZW5pbmdPYnNlcnZlciwgb3BlbmluZ0VsZW1lbnRUb05hbWUgfSBmcm9tICcuL29wZW5pbmcnO1xuaW1wb3J0IHsgVGltZU9ic2VydmVyIH0gZnJvbSAnLi90aW1lJztcbmltcG9ydCB7IFBpbmdPYnNlcnZlciB9IGZyb20gJy4vcGluZyc7XG5cbmNsYXNzIExpdmVHYW1lT2JzZXJ2ZXIgZXh0ZW5kcyBBYnN0cmFjdERPTU9ic2VydmVyIHtcbiAgY29uc3RydWN0b3IodGFyZ2V0LCBwaW5nRnJlcXVlbmN5KSB7XG4gICAgc3VwZXIodGFyZ2V0KTtcbiAgICB0aGlzLl9waW5nRnJlcXVlbmN5ID0gcGluZ0ZyZXF1ZW5jeTtcbiAgICB0aGlzLl9nYW1lSWQgPSBudWxsO1xuICB9XG5cbiAgX3ByZXBhcmVFdmVudChldmVudCkge1xuICAgIHJldHVybiB7IGdhbWVJZDogdGhpcy5fZ2FtZUlkLCAuLi5ldmVudCB9O1xuICB9XG5cbiAgaW5pdENoaWxkcmVuKCkge1xuICAgIGNvbnN0IGNoYXRTdHJlYW1FbGVtID0gdGhpcy5fdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5jaGF0LXN0cmVhbS1jb21wb25lbnQnKTtcbiAgICBjb25zdCBtb3Zlc0xpc3RFbGVtID0gdGhpcy5fdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy52ZXJ0aWNhbC1tb3ZlLWxpc3QtY29tcG9uZW50JykucXVlcnlTZWxlY3RvcignZGl2Jyk7XG4gICAgY29uc3Qgb3BlbmluZ05hbWVFbGVtID0gdGhpcy5fdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC1vcGVuaW5nLW5hbWUnKTtcbiAgICBjb25zdCB3aGl0ZVRpbWVFbGVtID0gdGhpcy5fdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5jbG9jay13aGl0ZScpO1xuICAgIGNvbnN0IGJsYWNrVGltZUVsZW0gPSB0aGlzLl90YXJnZXQucXVlcnlTZWxlY3RvcignLmNsb2NrLWJsYWNrJyk7XG5cbiAgICBjb25zdCBnYW1lU3RhdGVFdmVudHMgPSBBcnJheS5mcm9tKGNoYXRTdHJlYW1FbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGF0LW1lc3NhZ2UtY29tcG9uZW50JykpXG4gICAgLmZpbHRlcihtc2cgPT4gaXNDaGF0R2FtZU1lc3NhZ2UobXNnLCB0aGlzLl9nYW1lSWQpKVxuICAgIC5tYXAobXNnID0+IGNoYXRHYW1lTWVzc2FnZVRvRXZlbnQobXNnKSlcbiAgICAuZmlsdGVyKGUgPT4gZSk7XG5cbiAgICBjb25zdCBtb3ZlRXZlbnRzID0gQXJyYXkuZnJvbShtb3Zlc0xpc3RFbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb3ZlLXRleHQtY29tcG9uZW50JykpXG4gICAgLm1hcChlID0+IG1vdmVFbGVtZW50VG9FdmVudChlKSk7XG5cbiAgICB0aGlzLl9ub3RpZnlIYW5kbGVycyh7XG4gICAgICB0eXBlOiAnaW5pdCcsXG4gICAgICBnYW1lU3RhdGVFdmVudHMsXG4gICAgICBtb3ZlRXZlbnRzLFxuICAgICAgb3BlbmluZ05hbWU6IG9wZW5pbmdFbGVtZW50VG9OYW1lKG9wZW5pbmdOYW1lRWxlbSksXG4gICAgfSk7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IFtcbiAgICAgIG5ldyBDaGF0T2JzZXJ2ZXIoY2hhdFN0cmVhbUVsZW0sIHRoaXMuX2dhbWVJZCksXG4gICAgICBuZXcgTW92ZXNPYnNlcnZlcihtb3Zlc0xpc3RFbGVtKSxcbiAgICAgIG5ldyBPcGVuaW5nT2JzZXJ2ZXIob3BlbmluZ05hbWVFbGVtKSxcbiAgICAgIG5ldyBUaW1lT2JzZXJ2ZXIod2hpdGVUaW1lRWxlbSwgJ3doaXRlJyksXG4gICAgICBuZXcgVGltZU9ic2VydmVyKGJsYWNrVGltZUVsZW0sICdibGFjaycpLFxuICAgICAgbmV3IFBpbmdPYnNlcnZlcih0aGlzLl9waW5nRnJlcXVlbmN5KSxcbiAgICBdO1xuICAgIGNoaWxkcmVuLmZvckVhY2goYyA9PiB0aGlzLmFkZENoaWxkKGMpKTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIExPRygnb2JzZXJ2aW5nIHN0YXJ0ZWQuLi4nKTtcbiAgICB0aGlzLl9vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMsIG9iaikgPT4ge1xuICAgICAgZm9yIChsZXQgbXV0YXRpb24gb2YgbXV0YXRpb25zKSB7XG4gICAgICAgIGlmIChtdXRhdGlvbi50eXBlID09PSAnY2hpbGRMaXN0Jykge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXV0YXRpb24uYWRkZWROb2Rlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IG11dGF0aW9uLmFkZGVkTm9kZXMuaXRlbShpKTtcbiAgICAgICAgICAgIGlmIChub2RlLmlkICYmIG5vZGUuaWQuc3RhcnRzV2l0aCgnY2hhdC1ib2FyZHMtJykpIHtcblxuICAgICAgICAgICAgICAvLyBsb29rcyBsaWtlIGlkIG9mIG5vZGUgaXMgY2hhdC1ib2FyZC0gZm9sbG93ZWQgYnkgMCBmb2xsb3dlZCBieSBnYW1lSUQsIGlzIHRoaXMgdHJ1ZT9cbiAgICAgICAgICAgICAgdGhpcy5fZ2FtZUlkID0gbm9kZS5pZC5zdWJzdHIoMTMpO1xuXG4gICAgICAgICAgICAgIC8vIHdlIHNldCB0aW1lb3V0IHNvIHRoYXQgaW5pdGlhbCBtb3ZlcyBsaXN0IGFuZCBvcGVuaW5nIG5hbWUgaGF2ZSB0aW1lIHRvIGxvYWRcbiAgICAgICAgICAgICAgLy8gbWF5YmUgdGhpcyBzaG91bGQgYmUgZG9uZSBpbiBhIGJldHRlciB3YXk/XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcENoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckNoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0Q2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0Q2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIC5vYnNlcnZlKHRoaXMuX3RhcmdldCwge1xuICAgICAgYXR0cmlidXRlczogZmFsc2UsXG4gICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2UsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgTGl2ZUdhbWVPYnNlcnZlciB9O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/observers/games.js\n");

/***/ }),

/***/ "./src/js/observers/index.js":
/*!***********************************!*\
  !*** ./src/js/observers/index.js ***!
  \***********************************/
/*! exports provided: LiveGameObserver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _games__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./games */ \"./src/js/observers/games.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"LiveGameObserver\", function() { return _games__WEBPACK_IMPORTED_MODULE_0__[\"LiveGameObserver\"]; });\n\n\n\n\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvb2JzZXJ2ZXJzL2luZGV4LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2pzL29ic2VydmVycy9pbmRleC5qcz9iMTJjIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgTGl2ZUdhbWVPYnNlcnZlciB9IGZyb20gJy4vZ2FtZXMnO1xuXG5leHBvcnQgeyBMaXZlR2FtZU9ic2VydmVyIH07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/observers/index.js\n");

/***/ }),

/***/ "./src/js/observers/moves.js":
/*!***********************************!*\
  !*** ./src/js/observers/moves.js ***!
  \***********************************/
/*! exports provided: moveElementToEvent, MovesObserver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"moveElementToEvent\", function() { return moveElementToEvent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MovesObserver\", function() { return MovesObserver; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/js/utils.js\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract */ \"./src/js/observers/abstract.js\");\n\n\n\n\n\nconst moveElementToEvent = (e) => {\n  return {\n    type: 'move',\n    san: e.textContent.trim(),\n  };\n}\n\nclass MovesObserver extends _abstract__WEBPACK_IMPORTED_MODULE_1__[\"AbstractDOMObserver\"] {\n\n  start() {\n    Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"LOG\"])('moves observing started...');\n    this._observer = new MutationObserver((mutations, obj) => {\n      for (let mutation of mutations) {\n        if (mutation.type === 'childList') {\n          for (let i = 0; i < mutation.addedNodes.length; ++i) {\n            const node = mutation.addedNodes.item(i);\n            const moveNodes = node.querySelectorAll('.move-text-component');\n            for (const moveNode of moveNodes) {\n              this._notifyHandlers(moveElementToEvent(moveNode));\n            }\n          }\n        }\n      }\n    })\n    .observe(this._target, {\n      attributes: false,\n      childList: true,\n      subtree: true,\n      characterData: false,\n    });\n  }\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvb2JzZXJ2ZXJzL21vdmVzLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2pzL29ic2VydmVycy9tb3Zlcy5qcz8zZjJiIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgTE9HIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgQWJzdHJhY3RET01PYnNlcnZlciB9IGZyb20gJy4vYWJzdHJhY3QnO1xuXG5jb25zdCBtb3ZlRWxlbWVudFRvRXZlbnQgPSAoZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdtb3ZlJyxcbiAgICBzYW46IGUudGV4dENvbnRlbnQudHJpbSgpLFxuICB9O1xufVxuXG5jbGFzcyBNb3Zlc09ic2VydmVyIGV4dGVuZHMgQWJzdHJhY3RET01PYnNlcnZlciB7XG5cbiAgc3RhcnQoKSB7XG4gICAgTE9HKCdtb3ZlcyBvYnNlcnZpbmcgc3RhcnRlZC4uLicpO1xuICAgIHRoaXMuX29ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucywgb2JqKSA9PiB7XG4gICAgICBmb3IgKGxldCBtdXRhdGlvbiBvZiBtdXRhdGlvbnMpIHtcbiAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT09ICdjaGlsZExpc3QnKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtdXRhdGlvbi5hZGRlZE5vZGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gbXV0YXRpb24uYWRkZWROb2Rlcy5pdGVtKGkpO1xuICAgICAgICAgICAgY29uc3QgbW92ZU5vZGVzID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKCcubW92ZS10ZXh0LWNvbXBvbmVudCcpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBtb3ZlTm9kZSBvZiBtb3ZlTm9kZXMpIHtcbiAgICAgICAgICAgICAgdGhpcy5fbm90aWZ5SGFuZGxlcnMobW92ZUVsZW1lbnRUb0V2ZW50KG1vdmVOb2RlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICAub2JzZXJ2ZSh0aGlzLl90YXJnZXQsIHtcbiAgICAgIGF0dHJpYnV0ZXM6IGZhbHNlLFxuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIG1vdmVFbGVtZW50VG9FdmVudCxcbiAgTW92ZXNPYnNlcnZlcixcbn07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/observers/moves.js\n");

/***/ }),

/***/ "./src/js/observers/opening.js":
/*!*************************************!*\
  !*** ./src/js/observers/opening.js ***!
  \*************************************/
/*! exports provided: openingElementToName, OpeningObserver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"openingElementToName\", function() { return openingElementToName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OpeningObserver\", function() { return OpeningObserver; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/js/utils.js\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract */ \"./src/js/observers/abstract.js\");\n\n\n\n\n\nconst openingElementToName = e => e.textContent.trim();\n\nclass OpeningObserver extends _abstract__WEBPACK_IMPORTED_MODULE_1__[\"AbstractDOMObserver\"] {\n\n  start() {\n    Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"LOG\"])('starting opening name observer');\n    this._observer = new MutationObserver((mutations, obj) => {\n      const openingName = openingElementToName(this._target);\n      this._notifyHandlers({\n        type: 'openingName',\n        name: openingName,\n      });\n    })\n    .observe(this._target, {\n      attributes: false,\n      childList: true,\n      subtree: false,\n      characterData: false,\n    });\n  }\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvb2JzZXJ2ZXJzL29wZW5pbmcuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvb2JzZXJ2ZXJzL29wZW5pbmcuanM/ZTNjNyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IExPRyB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IEFic3RyYWN0RE9NT2JzZXJ2ZXIgfSBmcm9tICcuL2Fic3RyYWN0JztcblxuY29uc3Qgb3BlbmluZ0VsZW1lbnRUb05hbWUgPSBlID0+IGUudGV4dENvbnRlbnQudHJpbSgpO1xuXG5jbGFzcyBPcGVuaW5nT2JzZXJ2ZXIgZXh0ZW5kcyBBYnN0cmFjdERPTU9ic2VydmVyIHtcblxuICBzdGFydCgpIHtcbiAgICBMT0coJ3N0YXJ0aW5nIG9wZW5pbmcgbmFtZSBvYnNlcnZlcicpO1xuICAgIHRoaXMuX29ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucywgb2JqKSA9PiB7XG4gICAgICBjb25zdCBvcGVuaW5nTmFtZSA9IG9wZW5pbmdFbGVtZW50VG9OYW1lKHRoaXMuX3RhcmdldCk7XG4gICAgICB0aGlzLl9ub3RpZnlIYW5kbGVycyh7XG4gICAgICAgIHR5cGU6ICdvcGVuaW5nTmFtZScsXG4gICAgICAgIG5hbWU6IG9wZW5pbmdOYW1lLFxuICAgICAgfSk7XG4gICAgfSlcbiAgICAub2JzZXJ2ZSh0aGlzLl90YXJnZXQsIHtcbiAgICAgIGF0dHJpYnV0ZXM6IGZhbHNlLFxuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgc3VidHJlZTogZmFsc2UsXG4gICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBvcGVuaW5nRWxlbWVudFRvTmFtZSxcbiAgT3BlbmluZ09ic2VydmVyLFxufTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/observers/opening.js\n");

/***/ }),

/***/ "./src/js/observers/ping.js":
/*!**********************************!*\
  !*** ./src/js/observers/ping.js ***!
  \**********************************/
/*! exports provided: PingObserver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PingObserver\", function() { return PingObserver; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/js/utils.js\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract */ \"./src/js/observers/abstract.js\");\n\n\n\n\n\nclass PingObserver extends _abstract__WEBPACK_IMPORTED_MODULE_1__[\"AbstractObserver\"] {\n\n  constructor(frequency) {\n    super();\n    this._frequency = frequency;\n    this._interval = null;\n    return this;\n  }\n\n  stop() {\n    super.stop();\n    this._interval && clearInterval(this._interval);\n  }\n\n  start() {\n    Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"LOG\"])('starting ping observer');\n    this._interval = setInterval(() => {\n      this._notifyHandlers({ type: 'ping' });\n    }, 1000*this._frequency);\n  }\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvb2JzZXJ2ZXJzL3BpbmcuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvb2JzZXJ2ZXJzL3BpbmcuanM/YzQzYiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IExPRyB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IEFic3RyYWN0T2JzZXJ2ZXIgfSBmcm9tICcuL2Fic3RyYWN0JztcblxuY2xhc3MgUGluZ09ic2VydmVyIGV4dGVuZHMgQWJzdHJhY3RPYnNlcnZlciB7XG5cbiAgY29uc3RydWN0b3IoZnJlcXVlbmN5KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9mcmVxdWVuY3kgPSBmcmVxdWVuY3k7XG4gICAgdGhpcy5faW50ZXJ2YWwgPSBudWxsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICBzdXBlci5zdG9wKCk7XG4gICAgdGhpcy5faW50ZXJ2YWwgJiYgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbCk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBMT0coJ3N0YXJ0aW5nIHBpbmcgb2JzZXJ2ZXInKTtcbiAgICB0aGlzLl9pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHRoaXMuX25vdGlmeUhhbmRsZXJzKHsgdHlwZTogJ3BpbmcnIH0pO1xuICAgIH0sIDEwMDAqdGhpcy5fZnJlcXVlbmN5KTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBQaW5nT2JzZXJ2ZXIsXG59O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/observers/ping.js\n");

/***/ }),

/***/ "./src/js/observers/time.js":
/*!**********************************!*\
  !*** ./src/js/observers/time.js ***!
  \**********************************/
/*! exports provided: timeElementToSeconds, TimeObserver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"timeElementToSeconds\", function() { return timeElementToSeconds; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TimeObserver\", function() { return TimeObserver; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/js/utils.js\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract */ \"./src/js/observers/abstract.js\");\n\n\n\n\n\nconst timeElementToSeconds = e => {\n  const val = e.getAttribute('data-clock');\n  const firstSplit = val.split(':');\n  const minutes = parseInt(firstSplit[0]);\n  const secondSplit = firstSplit[1].split('.');\n  const seconds = parseInt(secondSplit[0]);\n  return 60*minutes + seconds;\n}\n\nclass TimeObserver extends _abstract__WEBPACK_IMPORTED_MODULE_1__[\"AbstractDOMObserver\"] {\n\n  constructor(target, playerColor) {\n    super(target);\n    this._playerColor = playerColor;\n    this._seconds = null;\n    return this;\n  }\n\n  start() {\n    Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"LOG\"])('starting time observer');\n    this._observer = new MutationObserver((mutations, obj) => {\n      const seconds = timeElementToSeconds(this._target);\n      if (this._seconds === null || seconds < this._seconds) {\n        this._seconds = seconds;\n        this._notifyHandlers({\n          type: 'time',\n          playerColor: this._playerColor,\n          seconds,\n        });\n      }\n    })\n    .observe(this._target, {\n      attributes: true,\n      childList: true,\n      subtree: false,\n      characterData: false,\n    });\n  }\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvb2JzZXJ2ZXJzL3RpbWUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvb2JzZXJ2ZXJzL3RpbWUuanM/YjU2OCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IExPRyB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IEFic3RyYWN0RE9NT2JzZXJ2ZXIgfSBmcm9tICcuL2Fic3RyYWN0JztcblxuY29uc3QgdGltZUVsZW1lbnRUb1NlY29uZHMgPSBlID0+IHtcbiAgY29uc3QgdmFsID0gZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2xvY2snKTtcbiAgY29uc3QgZmlyc3RTcGxpdCA9IHZhbC5zcGxpdCgnOicpO1xuICBjb25zdCBtaW51dGVzID0gcGFyc2VJbnQoZmlyc3RTcGxpdFswXSk7XG4gIGNvbnN0IHNlY29uZFNwbGl0ID0gZmlyc3RTcGxpdFsxXS5zcGxpdCgnLicpO1xuICBjb25zdCBzZWNvbmRzID0gcGFyc2VJbnQoc2Vjb25kU3BsaXRbMF0pO1xuICByZXR1cm4gNjAqbWludXRlcyArIHNlY29uZHM7XG59XG5cbmNsYXNzIFRpbWVPYnNlcnZlciBleHRlbmRzIEFic3RyYWN0RE9NT2JzZXJ2ZXIge1xuXG4gIGNvbnN0cnVjdG9yKHRhcmdldCwgcGxheWVyQ29sb3IpIHtcbiAgICBzdXBlcih0YXJnZXQpO1xuICAgIHRoaXMuX3BsYXllckNvbG9yID0gcGxheWVyQ29sb3I7XG4gICAgdGhpcy5fc2Vjb25kcyA9IG51bGw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBMT0coJ3N0YXJ0aW5nIHRpbWUgb2JzZXJ2ZXInKTtcbiAgICB0aGlzLl9vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMsIG9iaikgPT4ge1xuICAgICAgY29uc3Qgc2Vjb25kcyA9IHRpbWVFbGVtZW50VG9TZWNvbmRzKHRoaXMuX3RhcmdldCk7XG4gICAgICBpZiAodGhpcy5fc2Vjb25kcyA9PT0gbnVsbCB8fCBzZWNvbmRzIDwgdGhpcy5fc2Vjb25kcykge1xuICAgICAgICB0aGlzLl9zZWNvbmRzID0gc2Vjb25kcztcbiAgICAgICAgdGhpcy5fbm90aWZ5SGFuZGxlcnMoe1xuICAgICAgICAgIHR5cGU6ICd0aW1lJyxcbiAgICAgICAgICBwbGF5ZXJDb2xvcjogdGhpcy5fcGxheWVyQ29sb3IsXG4gICAgICAgICAgc2Vjb25kcyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSlcbiAgICAub2JzZXJ2ZSh0aGlzLl90YXJnZXQsIHtcbiAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICBzdWJ0cmVlOiBmYWxzZSxcbiAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIHRpbWVFbGVtZW50VG9TZWNvbmRzLFxuICBUaW1lT2JzZXJ2ZXIsXG59O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/observers/time.js\n");

/***/ }),

/***/ "./src/js/settings/index.js":
/*!**********************************!*\
  !*** ./src/js/settings/index.js ***!
  \**********************************/
/*! exports provided: Settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Settings\", function() { return Settings; });\n\n\nclass Settings {\n  static get(keys, callback) {\n    return chrome.storage.sync.get(keys, callback);\n  }\n\n  static set(dict, callback) {\n    return chrome.storage.sync.set(dict, callback);\n  }\n};\n\nSettings.defaults = {\n  voice: 'default',\n  volume: 50,\n  mute: false,\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvc2V0dGluZ3MvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvc2V0dGluZ3MvaW5kZXguanM/YjRhZiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyB7XG4gIHN0YXRpYyBnZXQoa2V5cywgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoa2V5cywgY2FsbGJhY2spO1xuICB9XG5cbiAgc3RhdGljIHNldChkaWN0LCBjYWxsYmFjaykge1xuICAgIHJldHVybiBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldChkaWN0LCBjYWxsYmFjayk7XG4gIH1cbn07XG5cblNldHRpbmdzLmRlZmF1bHRzID0ge1xuICB2b2ljZTogJ2RlZmF1bHQnLFxuICB2b2x1bWU6IDUwLFxuICBtdXRlOiBmYWxzZSxcbn07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/settings/index.js\n");

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! exports provided: LOG, pieceCodeToName, matchSan */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LOG\", function() { return LOG; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pieceCodeToName\", function() { return pieceCodeToName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"matchSan\", function() { return matchSan; });\n\n\nconst DEBUG = false;\n\nconst LOG = (msg) => {\n  if (!DEBUG) {\n    return;\n  }\n  chrome.runtime.sendMessage({ type: 'log', message: msg });\n};\n\nconst pieceCodeToName = {\n  'K': 'king',\n  'Q': 'queen',\n  'R': 'rook',\n  'B': 'bishop',\n  'N': 'knight',\n};\n\nconst matchSan = (san) => {\n  // pattern for SAN based on this thread https://stackoverflow.com/questions/40007937/regex-help-for-chess-moves-san\n  // with modifications\n  const pattern = /(?:(O-O(?:-O)?)|(?:([NBRQK])?([a-h])?([1-8])?(x)?([a-h])([1-8])(=[NBRQK])?))(\\+)?(#)?/;\n  return san.match(pattern);\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvdXRpbHMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMuanM/OTk0NCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IERFQlVHID0gZmFsc2U7XG5cbmNvbnN0IExPRyA9IChtc2cpID0+IHtcbiAgaWYgKCFERUJVRykge1xuICAgIHJldHVybjtcbiAgfVxuICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IHR5cGU6ICdsb2cnLCBtZXNzYWdlOiBtc2cgfSk7XG59O1xuXG5jb25zdCBwaWVjZUNvZGVUb05hbWUgPSB7XG4gICdLJzogJ2tpbmcnLFxuICAnUSc6ICdxdWVlbicsXG4gICdSJzogJ3Jvb2snLFxuICAnQic6ICdiaXNob3AnLFxuICAnTic6ICdrbmlnaHQnLFxufTtcblxuY29uc3QgbWF0Y2hTYW4gPSAoc2FuKSA9PiB7XG4gIC8vIHBhdHRlcm4gZm9yIFNBTiBiYXNlZCBvbiB0aGlzIHRocmVhZCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80MDAwNzkzNy9yZWdleC1oZWxwLWZvci1jaGVzcy1tb3Zlcy1zYW5cbiAgLy8gd2l0aCBtb2RpZmljYXRpb25zXG4gIGNvbnN0IHBhdHRlcm4gPSAvKD86KE8tTyg/Oi1PKT8pfCg/OihbTkJSUUtdKT8oW2EtaF0pPyhbMS04XSk/KHgpPyhbYS1oXSkoWzEtOF0pKD1bTkJSUUtdKT8pKShcXCspPygjKT8vO1xuICByZXR1cm4gc2FuLm1hdGNoKHBhdHRlcm4pO1xufVxuXG5leHBvcnQge1xuICBMT0csXG4gIHBpZWNlQ29kZVRvTmFtZSxcbiAgbWF0Y2hTYW4sXG4gfTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/utils.js\n");

/***/ })

/******/ });