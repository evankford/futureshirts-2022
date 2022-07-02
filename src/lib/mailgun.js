'use strict';

/*! For license information please see mailgun.web.js.LICENSE.txt */
define(() =>
	(() => {
		var t = {
				9669: (t, e, r) => {
					t.exports = r(1609);
				},
				5448: (t, e, r) => {
					'use strict';

					var n = r(4867),
						o = r(6026),
						s = r(4372),
						i = r(5327),
						a = r(4097),
						u = r(4109),
						c = r(7985),
						p = r(7874),
						f = r(2648),
						l = r(644),
						h = r(205);

					t.exports = function (t) {
						return new Promise(function (e, r) {
							var d,
								y = t.data,
								v = t.headers,
								m = t.responseType;

							function b() {
								t.cancelToken && t.cancelToken.unsubscribe(d),
									t.signal && t.signal.removeEventListener('abort', d);
							}

							n.isFormData(y) && n.isStandardBrowserEnv() && delete v['Content-Type'];
							var g = new XMLHttpRequest();

							if (t.auth) {
								var _ = t.auth.username || '',
									w = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) : '';

								v.Authorization = 'Basic ' + btoa(_ + ':' + w);
							}

							var O = a(t.baseURL, t.url);

							function R() {
								if (g) {
									var n = 'getAllResponseHeaders' in g ? u(g.getAllResponseHeaders()) : null,
										s = {
											data: m && 'text' !== m && 'json' !== m ? g.response : g.responseText,
											status: g.status,
											statusText: g.statusText,
											headers: n,
											config: t,
											request: g
										};
									o(
										function (t) {
											e(t), b();
										},
										function (t) {
											r(t), b();
										},
										s
									),
										(g = null);
								}
							}

							if (
								(g.open(t.method.toUpperCase(), i(O, t.params, t.paramsSerializer), !0),
								(g.timeout = t.timeout),
								'onloadend' in g
									? (g.onloadend = R)
									: (g.onreadystatechange = function () {
											g &&
												4 === g.readyState &&
												(0 !== g.status ||
													(g.responseURL && 0 === g.responseURL.indexOf('file:'))) &&
												setTimeout(R);
									  }),
								(g.onabort = function () {
									g && (r(new f('Request aborted', f.ECONNABORTED, t, g)), (g = null));
								}),
								(g.onerror = function () {
									r(new f('Network Error', f.ERR_NETWORK, t, g, g)), (g = null);
								}),
								(g.ontimeout = function () {
									var e = t.timeout
											? 'timeout of ' + t.timeout + 'ms exceeded'
											: 'timeout exceeded',
										n = t.transitional || p;
									t.timeoutErrorMessage && (e = t.timeoutErrorMessage),
										r(new f(e, n.clarifyTimeoutError ? f.ETIMEDOUT : f.ECONNABORTED, t, g)),
										(g = null);
								}),
								n.isStandardBrowserEnv())
							) {
								var q =
									(t.withCredentials || c(O)) && t.xsrfCookieName
										? s.read(t.xsrfCookieName)
										: void 0;
								q && (v[t.xsrfHeaderName] = q);
							}

							'setRequestHeader' in g &&
								n.forEach(v, function (t, e) {
									void 0 === y && 'content-type' === e.toLowerCase()
										? delete v[e]
										: g.setRequestHeader(e, t);
								}),
								n.isUndefined(t.withCredentials) || (g.withCredentials = !!t.withCredentials),
								m && 'json' !== m && (g.responseType = t.responseType),
								'function' == typeof t.onDownloadProgress &&
									g.addEventListener('progress', t.onDownloadProgress),
								'function' == typeof t.onUploadProgress &&
									g.upload &&
									g.upload.addEventListener('progress', t.onUploadProgress),
								(t.cancelToken || t.signal) &&
									((d = function (t) {
										g && (r(!t || (t && t.type) ? new l() : t), g.abort(), (g = null));
									}),
									t.cancelToken && t.cancelToken.subscribe(d),
									t.signal && (t.signal.aborted ? d() : t.signal.addEventListener('abort', d))),
								y || (y = null);
							var D = h(O);
							D && -1 === ['http', 'https', 'file'].indexOf(D)
								? r(new f('Unsupported protocol ' + D + ':', f.ERR_BAD_REQUEST, t))
								: g.send(y);
						});
					};
				},
				1609: (t, e, r) => {
					'use strict';

					var n = r(4867),
						o = r(1849),
						s = r(321),
						i = r(7185);

					var a = (function t(e) {
						var r = new s(e),
							a = o(s.prototype.request, r);
						return (
							n.extend(a, s.prototype, r),
							n.extend(a, r),
							(a.create = function (r) {
								return t(i(e, r));
							}),
							a
						);
					})(r(5546));

					(a.Axios = s),
						(a.CanceledError = r(644)),
						(a.CancelToken = r(4972)),
						(a.isCancel = r(6502)),
						(a.VERSION = r(7288).version),
						(a.toFormData = r(7675)),
						(a.AxiosError = r(2648)),
						(a.Cancel = a.CanceledError),
						(a.all = function (t) {
							return Promise.all(t);
						}),
						(a.spread = r(8713)),
						(a.isAxiosError = r(6268)),
						(t.exports = a),
						(t.exports.default = a);
				},
				4972: (t, e, r) => {
					'use strict';

					var n = r(644);

					function o(t) {
						if ('function' != typeof t) throw new TypeError('executor must be a function.');
						var e;
						this.promise = new Promise(function (t) {
							e = t;
						});
						var r = this;
						this.promise.then(function (t) {
							if (r._listeners) {
								var e,
									n = r._listeners.length;

								for (e = 0; e < n; e++) r._listeners[e](t);

								r._listeners = null;
							}
						}),
							(this.promise.then = function (t) {
								var e,
									n = new Promise(function (t) {
										r.subscribe(t), (e = t);
									}).then(t);
								return (
									(n.cancel = function () {
										r.unsubscribe(e);
									}),
									n
								);
							}),
							t(function (t) {
								r.reason || ((r.reason = new n(t)), e(r.reason));
							});
					}

					(o.prototype.throwIfRequested = function () {
						if (this.reason) throw this.reason;
					}),
						(o.prototype.subscribe = function (t) {
							this.reason
								? t(this.reason)
								: this._listeners
								? this._listeners.push(t)
								: (this._listeners = [t]);
						}),
						(o.prototype.unsubscribe = function (t) {
							if (this._listeners) {
								var e = this._listeners.indexOf(t);

								-1 !== e && this._listeners.splice(e, 1);
							}
						}),
						(o.source = function () {
							var t;
							return {
								token: new o(function (e) {
									t = e;
								}),
								cancel: t
							};
						}),
						(t.exports = o);
				},
				644: (t, e, r) => {
					'use strict';

					var n = r(2648);

					function o(t) {
						n.call(this, null == t ? 'canceled' : t, n.ERR_CANCELED), (this.name = 'CanceledError');
					}

					r(4867).inherits(o, n, {
						__CANCEL__: !0
					}),
						(t.exports = o);
				},
				6502: (t) => {
					'use strict';

					t.exports = function (t) {
						return !(!t || !t.__CANCEL__);
					};
				},
				321: (t, e, r) => {
					'use strict';

					var n = r(4867),
						o = r(5327),
						s = r(782),
						i = r(3572),
						a = r(7185),
						u = r(4097),
						c = r(4875),
						p = c.validators;

					function f(t) {
						(this.defaults = t),
							(this.interceptors = {
								request: new s(),
								response: new s()
							});
					}

					(f.prototype.request = function (t, e) {
						'string' == typeof t ? ((e = e || {}).url = t) : (e = t || {}),
							(e = a(this.defaults, e)).method
								? (e.method = e.method.toLowerCase())
								: this.defaults.method
								? (e.method = this.defaults.method.toLowerCase())
								: (e.method = 'get');
						var r = e.transitional;
						void 0 !== r &&
							c.assertOptions(
								r,
								{
									silentJSONParsing: p.transitional(p.boolean),
									forcedJSONParsing: p.transitional(p.boolean),
									clarifyTimeoutError: p.transitional(p.boolean)
								},
								!1
							);
						var n = [],
							o = !0;
						this.interceptors.request.forEach(function (t) {
							('function' == typeof t.runWhen && !1 === t.runWhen(e)) ||
								((o = o && t.synchronous), n.unshift(t.fulfilled, t.rejected));
						});
						var s,
							u = [];

						if (
							(this.interceptors.response.forEach(function (t) {
								u.push(t.fulfilled, t.rejected);
							}),
							!o)
						) {
							var f = [i, void 0];

							for (
								Array.prototype.unshift.apply(f, n), f = f.concat(u), s = Promise.resolve(e);
								f.length;

							)
								s = s.then(f.shift(), f.shift());

							return s;
						}

						for (var l = e; n.length; ) {
							var h = n.shift(),
								d = n.shift();

							try {
								l = h(l);
							} catch (t) {
								d(t);
								break;
							}
						}

						try {
							s = i(l);
						} catch (t) {
							return Promise.reject(t);
						}

						for (; u.length; ) s = s.then(u.shift(), u.shift());

						return s;
					}),
						(f.prototype.getUri = function (t) {
							t = a(this.defaults, t);
							var e = u(t.baseURL, t.url);
							return o(e, t.params, t.paramsSerializer);
						}),
						n.forEach(['delete', 'get', 'head', 'options'], function (t) {
							f.prototype[t] = function (e, r) {
								return this.request(
									a(r || {}, {
										method: t,
										url: e,
										data: (r || {}).data
									})
								);
							};
						}),
						n.forEach(['post', 'put', 'patch'], function (t) {
							function e(e) {
								return function (r, n, o) {
									return this.request(
										a(o || {}, {
											method: t,
											headers: e
												? {
														'Content-Type': 'multipart/form-data'
												  }
												: {},
											url: r,
											data: n
										})
									);
								};
							}

							(f.prototype[t] = e()), (f.prototype[t + 'Form'] = e(!0));
						}),
						(t.exports = f);
				},
				2648: (t, e, r) => {
					'use strict';

					var n = r(4867);

					function o(t, e, r, n, o) {
						Error.call(this),
							(this.message = t),
							(this.name = 'AxiosError'),
							e && (this.code = e),
							r && (this.config = r),
							n && (this.request = n),
							o && (this.response = o);
					}

					n.inherits(o, Error, {
						toJSON: function () {
							return {
								message: this.message,
								name: this.name,
								description: this.description,
								number: this.number,
								fileName: this.fileName,
								lineNumber: this.lineNumber,
								columnNumber: this.columnNumber,
								stack: this.stack,
								config: this.config,
								code: this.code,
								status: this.response && this.response.status ? this.response.status : null
							};
						}
					});
					var s = o.prototype,
						i = {};
					[
						'ERR_BAD_OPTION_VALUE',
						'ERR_BAD_OPTION',
						'ECONNABORTED',
						'ETIMEDOUT',
						'ERR_NETWORK',
						'ERR_FR_TOO_MANY_REDIRECTS',
						'ERR_DEPRECATED',
						'ERR_BAD_RESPONSE',
						'ERR_BAD_REQUEST',
						'ERR_CANCELED'
					].forEach(function (t) {
						i[t] = {
							value: t
						};
					}),
						Object.defineProperties(o, i),
						Object.defineProperty(s, 'isAxiosError', {
							value: !0
						}),
						(o.from = function (t, e, r, i, a, u) {
							var c = Object.create(s);
							return (
								n.toFlatObject(t, c, function (t) {
									return t !== Error.prototype;
								}),
								o.call(c, t.message, e, r, i, a),
								(c.name = t.name),
								u && Object.assign(c, u),
								c
							);
						}),
						(t.exports = o);
				},
				782: (t, e, r) => {
					'use strict';

					var n = r(4867);

					function o() {
						this.handlers = [];
					}

					(o.prototype.use = function (t, e, r) {
						return (
							this.handlers.push({
								fulfilled: t,
								rejected: e,
								synchronous: !!r && r.synchronous,
								runWhen: r ? r.runWhen : null
							}),
							this.handlers.length - 1
						);
					}),
						(o.prototype.eject = function (t) {
							this.handlers[t] && (this.handlers[t] = null);
						}),
						(o.prototype.forEach = function (t) {
							n.forEach(this.handlers, function (e) {
								null !== e && t(e);
							});
						}),
						(t.exports = o);
				},
				4097: (t, e, r) => {
					'use strict';

					var n = r(1793),
						o = r(7303);

					t.exports = function (t, e) {
						return t && !n(e) ? o(t, e) : e;
					};
				},
				3572: (t, e, r) => {
					'use strict';

					var n = r(4867),
						o = r(8527),
						s = r(6502),
						i = r(5546),
						a = r(644);

					function u(t) {
						if ((t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted))
							throw new a();
					}

					t.exports = function (t) {
						return (
							u(t),
							(t.headers = t.headers || {}),
							(t.data = o.call(t, t.data, t.headers, t.transformRequest)),
							(t.headers = n.merge(t.headers.common || {}, t.headers[t.method] || {}, t.headers)),
							n.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function (e) {
								delete t.headers[e];
							}),
							(t.adapter || i.adapter)(t).then(
								function (e) {
									return u(t), (e.data = o.call(t, e.data, e.headers, t.transformResponse)), e;
								},
								function (e) {
									return (
										s(e) ||
											(u(t),
											e &&
												e.response &&
												(e.response.data = o.call(
													t,
													e.response.data,
													e.response.headers,
													t.transformResponse
												))),
										Promise.reject(e)
									);
								}
							)
						);
					};
				},
				7185: (t, e, r) => {
					'use strict';

					var n = r(4867);

					t.exports = function (t, e) {
						e = e || {};
						var r = {};

						function o(t, e) {
							return n.isPlainObject(t) && n.isPlainObject(e)
								? n.merge(t, e)
								: n.isPlainObject(e)
								? n.merge({}, e)
								: n.isArray(e)
								? e.slice()
								: e;
						}

						function s(r) {
							return n.isUndefined(e[r])
								? n.isUndefined(t[r])
									? void 0
									: o(void 0, t[r])
								: o(t[r], e[r]);
						}

						function i(t) {
							if (!n.isUndefined(e[t])) return o(void 0, e[t]);
						}

						function a(r) {
							return n.isUndefined(e[r])
								? n.isUndefined(t[r])
									? void 0
									: o(void 0, t[r])
								: o(void 0, e[r]);
						}

						function u(r) {
							return r in e ? o(t[r], e[r]) : r in t ? o(void 0, t[r]) : void 0;
						}

						var c = {
							url: i,
							method: i,
							data: i,
							baseURL: a,
							transformRequest: a,
							transformResponse: a,
							paramsSerializer: a,
							timeout: a,
							timeoutMessage: a,
							withCredentials: a,
							adapter: a,
							responseType: a,
							xsrfCookieName: a,
							xsrfHeaderName: a,
							onUploadProgress: a,
							onDownloadProgress: a,
							decompress: a,
							maxContentLength: a,
							maxBodyLength: a,
							beforeRedirect: a,
							transport: a,
							httpAgent: a,
							httpsAgent: a,
							cancelToken: a,
							socketPath: a,
							responseEncoding: a,
							validateStatus: u
						};
						return (
							n.forEach(Object.keys(t).concat(Object.keys(e)), function (t) {
								var e = c[t] || s,
									o = e(t);
								(n.isUndefined(o) && e !== u) || (r[t] = o);
							}),
							r
						);
					};
				},
				6026: (t, e, r) => {
					'use strict';

					var n = r(2648);

					t.exports = function (t, e, r) {
						var o = r.config.validateStatus;
						r.status && o && !o(r.status)
							? e(
									new n(
										'Request failed with status code ' + r.status,
										[n.ERR_BAD_REQUEST, n.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
										r.config,
										r.request,
										r
									)
							  )
							: t(r);
					};
				},
				8527: (t, e, r) => {
					'use strict';

					var n = r(4867),
						o = r(5546);

					t.exports = function (t, e, r) {
						var s = this || o;
						return (
							n.forEach(r, function (r) {
								t = r.call(s, t, e);
							}),
							t
						);
					};
				},
				5546: (t, e, r) => {
					'use strict';

					var n = r(4867),
						o = r(6016),
						s = r(2648),
						i = r(7874),
						a = r(7675),
						u = {
							'Content-Type': 'application/x-www-form-urlencoded'
						};

					function c(t, e) {
						!n.isUndefined(t) && n.isUndefined(t['Content-Type']) && (t['Content-Type'] = e);
					}

					var p,
						f = {
							transitional: i,
							adapter:
								(('undefined' != typeof XMLHttpRequest ||
									('undefined' != typeof process &&
										'[object process]' === Object.prototype.toString.call(process))) &&
									(p = r(5448)),
								p),
							transformRequest: [
								function (t, e) {
									if (
										(o(e, 'Accept'),
										o(e, 'Content-Type'),
										n.isFormData(t) ||
											n.isArrayBuffer(t) ||
											n.isBuffer(t) ||
											n.isStream(t) ||
											n.isFile(t) ||
											n.isBlob(t))
									)
										return t;
									if (n.isArrayBufferView(t)) return t.buffer;
									if (n.isURLSearchParams(t))
										return c(e, 'application/x-www-form-urlencoded;charset=utf-8'), t.toString();
									var r,
										s = n.isObject(t),
										i = e && e['Content-Type'];

									if ((r = n.isFileList(t)) || (s && 'multipart/form-data' === i)) {
										var u = this.env && this.env.FormData;
										return a(
											r
												? {
														'files[]': t
												  }
												: t,
											u && new u()
										);
									}

									return s || 'application/json' === i
										? (c(e, 'application/json'),
										  (function (t, e, r) {
												if (n.isString(t))
													try {
														return (e || JSON.parse)(t), n.trim(t);
													} catch (t) {
														if ('SyntaxError' !== t.name) throw t;
													}
												return (r || JSON.stringify)(t);
										  })(t))
										: t;
								}
							],
							transformResponse: [
								function (t) {
									var e = this.transitional || f.transitional,
										r = e && e.silentJSONParsing,
										o = e && e.forcedJSONParsing,
										i = !r && 'json' === this.responseType;
									if (i || (o && n.isString(t) && t.length))
										try {
											return JSON.parse(t);
										} catch (t) {
											if (i) {
												if ('SyntaxError' === t.name)
													throw s.from(t, s.ERR_BAD_RESPONSE, this, null, this.response);
												throw t;
											}
										}
									return t;
								}
							],
							timeout: 0,
							xsrfCookieName: 'XSRF-TOKEN',
							xsrfHeaderName: 'X-XSRF-TOKEN',
							maxContentLength: -1,
							maxBodyLength: -1,
							env: {
								FormData: r(1623)
							},
							validateStatus: function (t) {
								return t >= 200 && t < 300;
							},
							headers: {
								common: {
									Accept: 'application/json, text/plain, */*'
								}
							}
						};
					n.forEach(['delete', 'get', 'head'], function (t) {
						f.headers[t] = {};
					}),
						n.forEach(['post', 'put', 'patch'], function (t) {
							f.headers[t] = n.merge(u);
						}),
						(t.exports = f);
				},
				7874: (t) => {
					'use strict';

					t.exports = {
						silentJSONParsing: !0,
						forcedJSONParsing: !0,
						clarifyTimeoutError: !1
					};
				},
				7288: (t) => {
					t.exports = {
						version: '0.27.2'
					};
				},
				1849: (t) => {
					'use strict';

					t.exports = function (t, e) {
						return function () {
							for (var r = new Array(arguments.length), n = 0; n < r.length; n++)
								r[n] = arguments[n];

							return t.apply(e, r);
						};
					};
				},
				5327: (t, e, r) => {
					'use strict';

					var n = r(4867);

					function o(t) {
						return encodeURIComponent(t)
							.replace(/%3A/gi, ':')
							.replace(/%24/g, '$')
							.replace(/%2C/gi, ',')
							.replace(/%20/g, '+')
							.replace(/%5B/gi, '[')
							.replace(/%5D/gi, ']');
					}

					t.exports = function (t, e, r) {
						if (!e) return t;
						var s;
						if (r) s = r(e);
						else if (n.isURLSearchParams(e)) s = e.toString();
						else {
							var i = [];
							n.forEach(e, function (t, e) {
								null != t &&
									(n.isArray(t) ? (e += '[]') : (t = [t]),
									n.forEach(t, function (t) {
										n.isDate(t) ? (t = t.toISOString()) : n.isObject(t) && (t = JSON.stringify(t)),
											i.push(o(e) + '=' + o(t));
									}));
							}),
								(s = i.join('&'));
						}

						if (s) {
							var a = t.indexOf('#');
							-1 !== a && (t = t.slice(0, a)), (t += (-1 === t.indexOf('?') ? '?' : '&') + s);
						}

						return t;
					};
				},
				7303: (t) => {
					'use strict';

					t.exports = function (t, e) {
						return e ? t.replace(/\/+$/, '') + '/' + e.replace(/^\/+/, '') : t;
					};
				},
				4372: (t, e, r) => {
					'use strict';

					var n = r(4867);
					t.exports = n.isStandardBrowserEnv()
						? {
								write: function (t, e, r, o, s, i) {
									var a = [];
									a.push(t + '=' + encodeURIComponent(e)),
										n.isNumber(r) && a.push('expires=' + new Date(r).toGMTString()),
										n.isString(o) && a.push('path=' + o),
										n.isString(s) && a.push('domain=' + s),
										!0 === i && a.push('secure'),
										(document.cookie = a.join('; '));
								},
								read: function (t) {
									var e = document.cookie.match(new RegExp('(^|;\\s*)(' + t + ')=([^;]*)'));
									return e ? decodeURIComponent(e[3]) : null;
								},
								remove: function (t) {
									this.write(t, '', Date.now() - 864e5);
								}
						  }
						: {
								write: function () {},
								read: function () {
									return null;
								},
								remove: function () {}
						  };
				},
				1793: (t) => {
					'use strict';

					t.exports = function (t) {
						return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
					};
				},
				6268: (t, e, r) => {
					'use strict';

					var n = r(4867);

					t.exports = function (t) {
						return n.isObject(t) && !0 === t.isAxiosError;
					};
				},
				7985: (t, e, r) => {
					'use strict';

					var n = r(4867);
					t.exports = n.isStandardBrowserEnv()
						? (function () {
								var t,
									e = /(msie|trident)/i.test(navigator.userAgent),
									r = document.createElement('a');

								function o(t) {
									var n = t;
									return (
										e && (r.setAttribute('href', n), (n = r.href)),
										r.setAttribute('href', n),
										{
											href: r.href,
											protocol: r.protocol ? r.protocol.replace(/:$/, '') : '',
											host: r.host,
											search: r.search ? r.search.replace(/^\?/, '') : '',
											hash: r.hash ? r.hash.replace(/^#/, '') : '',
											hostname: r.hostname,
											port: r.port,
											pathname: '/' === r.pathname.charAt(0) ? r.pathname : '/' + r.pathname
										}
									);
								}

								return (
									(t = o(window.location.href)),
									function (e) {
										var r = n.isString(e) ? o(e) : e;
										return r.protocol === t.protocol && r.host === t.host;
									}
								);
						  })()
						: function () {
								return !0;
						  };
				},
				6016: (t, e, r) => {
					'use strict';

					var n = r(4867);

					t.exports = function (t, e) {
						n.forEach(t, function (r, n) {
							n !== e && n.toUpperCase() === e.toUpperCase() && ((t[e] = r), delete t[n]);
						});
					};
				},
				1623: (t) => {
					t.exports = null;
				},
				4109: (t, e, r) => {
					'use strict';

					var n = r(4867),
						o = [
							'age',
							'authorization',
							'content-length',
							'content-type',
							'etag',
							'expires',
							'from',
							'host',
							'if-modified-since',
							'if-unmodified-since',
							'last-modified',
							'location',
							'max-forwards',
							'proxy-authorization',
							'referer',
							'retry-after',
							'user-agent'
						];

					t.exports = function (t) {
						var e,
							r,
							s,
							i = {};
						return t
							? (n.forEach(t.split('\n'), function (t) {
									if (
										((s = t.indexOf(':')),
										(e = n.trim(t.substr(0, s)).toLowerCase()),
										(r = n.trim(t.substr(s + 1))),
										e)
									) {
										if (i[e] && o.indexOf(e) >= 0) return;
										i[e] =
											'set-cookie' === e
												? (i[e] ? i[e] : []).concat([r])
												: i[e]
												? i[e] + ', ' + r
												: r;
									}
							  }),
							  i)
							: i;
					};
				},
				205: (t) => {
					'use strict';

					t.exports = function (t) {
						var e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
						return (e && e[1]) || '';
					};
				},
				8713: (t) => {
					'use strict';

					t.exports = function (t) {
						return function (e) {
							return t.apply(null, e);
						};
					};
				},
				7675: (t, e, r) => {
					'use strict';

					var n = r(4867);

					t.exports = function (t, e) {
						e = e || new FormData();
						var r = [];

						function o(t) {
							return null === t
								? ''
								: n.isDate(t)
								? t.toISOString()
								: n.isArrayBuffer(t) || n.isTypedArray(t)
								? 'function' == typeof Blob
									? new Blob([t])
									: Buffer.from(t)
								: t;
						}

						return (
							(function t(s, i) {
								if (n.isPlainObject(s) || n.isArray(s)) {
									if (-1 !== r.indexOf(s)) throw Error('Circular reference detected in ' + i);
									r.push(s),
										n.forEach(s, function (r, s) {
											if (!n.isUndefined(r)) {
												var a,
													u = i ? i + '.' + s : s;
												if (r && !i && 'object' == typeof r)
													if (n.endsWith(s, '{}')) r = JSON.stringify(r);
													else if (n.endsWith(s, '[]') && (a = n.toArray(r)))
														return void a.forEach(function (t) {
															!n.isUndefined(t) && e.append(u, o(t));
														});
												t(r, u);
											}
										}),
										r.pop();
								} else e.append(i, o(s));
							})(t),
							e
						);
					};
				},
				4875: (t, e, r) => {
					'use strict';

					var n = r(7288).version,
						o = r(2648),
						s = {};
					['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (t, e) {
						s[t] = function (r) {
							return typeof r === t || 'a' + (e < 1 ? 'n ' : ' ') + t;
						};
					});
					var i = {};
					(s.transitional = function (t, e, r) {
						function s(t, e) {
							return '[Axios v' + n + "] Transitional option '" + t + "'" + e + (r ? '. ' + r : '');
						}

						return function (r, n, a) {
							if (!1 === t)
								throw new o(s(n, ' has been removed' + (e ? ' in ' + e : '')), o.ERR_DEPRECATED);
							return (
								e &&
									!i[n] &&
									((i[n] = !0),
									console.warn(
										s(
											n,
											' has been deprecated since v' + e + ' and will be removed in the near future'
										)
									)),
								!t || t(r, n, a)
							);
						};
					}),
						(t.exports = {
							assertOptions: function (t, e, r) {
								if ('object' != typeof t)
									throw new o('options must be an object', o.ERR_BAD_OPTION_VALUE);

								for (var n = Object.keys(t), s = n.length; s-- > 0; ) {
									var i = n[s],
										a = e[i];

									if (a) {
										var u = t[i],
											c = void 0 === u || a(u, i, t);
										if (!0 !== c)
											throw new o('option ' + i + ' must be ' + c, o.ERR_BAD_OPTION_VALUE);
									} else if (!0 !== r) throw new o('Unknown option ' + i, o.ERR_BAD_OPTION);
								}
							},
							validators: s
						});
				},
				4867: (t, e, r) => {
					'use strict';

					var n,
						o = r(1849),
						s = Object.prototype.toString,
						i =
							((n = Object.create(null)),
							function (t) {
								var e = s.call(t);
								return n[e] || (n[e] = e.slice(8, -1).toLowerCase());
							});

					function a(t) {
						return (
							(t = t.toLowerCase()),
							function (e) {
								return i(e) === t;
							}
						);
					}

					function u(t) {
						return Array.isArray(t);
					}

					function c(t) {
						return void 0 === t;
					}

					var p = a('ArrayBuffer');

					function f(t) {
						return null !== t && 'object' == typeof t;
					}

					function l(t) {
						if ('object' !== i(t)) return !1;
						var e = Object.getPrototypeOf(t);
						return null === e || e === Object.prototype;
					}

					var h = a('Date'),
						d = a('File'),
						y = a('Blob'),
						v = a('FileList');

					function m(t) {
						return '[object Function]' === s.call(t);
					}

					var b = a('URLSearchParams');

					function g(t, e) {
						if (null != t)
							if (('object' != typeof t && (t = [t]), u(t)))
								for (var r = 0, n = t.length; r < n; r++) e.call(null, t[r], r, t);
							else
								for (var o in t)
									Object.prototype.hasOwnProperty.call(t, o) && e.call(null, t[o], o, t);
					}

					var _,
						w =
							((_ = 'undefined' != typeof Uint8Array && Object.getPrototypeOf(Uint8Array)),
							function (t) {
								return _ && t instanceof _;
							});

					t.exports = {
						isArray: u,
						isArrayBuffer: p,
						isBuffer: function (t) {
							return (
								null !== t &&
								!c(t) &&
								null !== t.constructor &&
								!c(t.constructor) &&
								'function' == typeof t.constructor.isBuffer &&
								t.constructor.isBuffer(t)
							);
						},
						isFormData: function (t) {
							var e = '[object FormData]';
							return (
								t &&
								(('function' == typeof FormData && t instanceof FormData) ||
									s.call(t) === e ||
									(m(t.toString) && t.toString() === e))
							);
						},
						isArrayBufferView: function (t) {
							return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
								? ArrayBuffer.isView(t)
								: t && t.buffer && p(t.buffer);
						},
						isString: function (t) {
							return 'string' == typeof t;
						},
						isNumber: function (t) {
							return 'number' == typeof t;
						},
						isObject: f,
						isPlainObject: l,
						isUndefined: c,
						isDate: h,
						isFile: d,
						isBlob: y,
						isFunction: m,
						isStream: function (t) {
							return f(t) && m(t.pipe);
						},
						isURLSearchParams: b,
						isStandardBrowserEnv: function () {
							return (
								('undefined' == typeof navigator ||
									('ReactNative' !== navigator.product &&
										'NativeScript' !== navigator.product &&
										'NS' !== navigator.product)) &&
								'undefined' != typeof window &&
								'undefined' != typeof document
							);
						},
						forEach: g,
						merge: function t() {
							var e = {};

							function r(r, n) {
								l(e[n]) && l(r)
									? (e[n] = t(e[n], r))
									: l(r)
									? (e[n] = t({}, r))
									: u(r)
									? (e[n] = r.slice())
									: (e[n] = r);
							}

							for (var n = 0, o = arguments.length; n < o; n++) g(arguments[n], r);

							return e;
						},
						extend: function (t, e, r) {
							return (
								g(e, function (e, n) {
									t[n] = r && 'function' == typeof e ? o(e, r) : e;
								}),
								t
							);
						},
						trim: function (t) {
							return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, '');
						},
						stripBOM: function (t) {
							return 65279 === t.charCodeAt(0) && (t = t.slice(1)), t;
						},
						inherits: function (t, e, r, n) {
							(t.prototype = Object.create(e.prototype, n)),
								(t.prototype.constructor = t),
								r && Object.assign(t.prototype, r);
						},
						toFlatObject: function (t, e, r) {
							var n,
								o,
								s,
								i = {};
							e = e || {};

							do {
								for (o = (n = Object.getOwnPropertyNames(t)).length; o-- > 0; )
									i[(s = n[o])] || ((e[s] = t[s]), (i[s] = !0));

								t = Object.getPrototypeOf(t);
							} while (t && (!r || r(t, e)) && t !== Object.prototype);

							return e;
						},
						kindOf: i,
						kindOfTest: a,
						endsWith: function (t, e, r) {
							(t = String(t)), (void 0 === r || r > t.length) && (r = t.length), (r -= e.length);
							var n = t.indexOf(e, r);
							return -1 !== n && n === r;
						},
						toArray: function (t) {
							if (!t) return null;
							var e = t.length;
							if (c(e)) return null;

							for (var r = new Array(e); e-- > 0; ) r[e] = t[e];

							return r;
						},
						isTypedArray: w,
						isFileList: v
					};
				},
				1475: function (t, e, r) {
					'use strict';

					var n =
							(this && this.__assign) ||
							function () {
								return (
									(n =
										Object.assign ||
										function (t) {
											for (var e, r = 1, n = arguments.length; r < n; r++)
												for (var o in (e = arguments[r]))
													Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);

											return t;
										}),
									n.apply(this, arguments)
								);
							},
						o =
							(this && this.__importDefault) ||
							function (t) {
								return t && t.__esModule
									? t
									: {
											default: t
									  };
							};

					Object.defineProperty(e, '__esModule', {
						value: !0
					});

					var s = o(r(4438)),
						i = o(r(4373)),
						a = o(r(5022)),
						u = o(r(3747)),
						c = o(r(4778)),
						p = o(r(4750)),
						f = o(r(3197)),
						l = o(r(5277)),
						h = o(r(9721)),
						d = o(r(9345)),
						y = o(r(9602)),
						v = o(r(6126)),
						m = o(r(5135)),
						b = o(r(5060)),
						g = o(r(7587)),
						_ = o(r(9955)),
						w = o(r(7075)),
						O = function (t, e) {
							var r = n({}, t);
							if ((r.url || (r.url = 'https://api.mailgun.net'), !r.username))
								throw new Error('Parameter "username" is required');
							if (!r.key) throw new Error('Parameter "key" is required');
							this.request = new s.default(r, e);
							var o = new m.default(this.request),
								O = new b.default(this.request),
								R = new _.default(this.request),
								q = new w.default(this.request),
								D = new g.default(this.request);
							(this.domains = new i.default(this.request, O, R, q)),
								(this.webhooks = new p.default(this.request)),
								(this.events = new a.default(this.request)),
								(this.stats = new u.default(this.request)),
								(this.suppressions = new c.default(this.request)),
								(this.messages = new f.default(this.request)),
								(this.routes = new l.default(this.request)),
								(this.ips = new d.default(this.request)),
								(this.ip_pools = new y.default(this.request)),
								(this.lists = new v.default(this.request, o)),
								(this.validate = new h.default(this.request, D));
						};

					e.default = O;
				},
				4373: function (t, e, r) {
					'use strict';

					var n =
							(this && this.__assign) ||
							function () {
								return (
									(n =
										Object.assign ||
										function (t) {
											for (var e, r = 1, n = arguments.length; r < n; r++)
												for (var o in (e = arguments[r]))
													Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);

											return t;
										}),
									n.apply(this, arguments)
								);
							},
						o =
							(this && this.__importDefault) ||
							function (t) {
								return t && t.__esModule
									? t
									: {
											default: t
									  };
							};

					Object.defineProperty(e, '__esModule', {
						value: !0
					}),
						(e.Domain = void 0);

					var s = o(r(4078)),
						i = o(r(3142)),
						a = function (t, e, r) {
							(this.name = t.name),
								(this.require_tls = t.require_tls),
								(this.skip_verification = t.skip_verification),
								(this.state = t.state),
								(this.wildcard = t.wildcard),
								(this.spam_action = t.spam_action),
								(this.created_at = t.created_at),
								(this.smtp_password = t.smtp_password),
								(this.smtp_login = t.smtp_login),
								(this.type = t.type),
								(this.receiving_dns_records = e || null),
								(this.sending_dns_records = r || null);
						};

					e.Domain = a;

					var u = (function () {
						function t(t, e, r, n) {
							(this.request = t),
								(this.domainCredentials = e),
								(this.domainTemplates = r),
								(this.domainTags = n);
						}

						return (
							(t.prototype._parseMessage = function (t) {
								return t.body;
							}),
							(t.prototype._parseDomainList = function (t) {
								return t.body.items.map(function (t) {
									return new a(t);
								});
							}),
							(t.prototype._parseDomain = function (t) {
								return new a(
									t.body.domain,
									t.body.receiving_dns_records,
									t.body.sending_dns_records
								);
							}),
							(t.prototype._parseTrackingSettings = function (t) {
								return t.body.tracking;
							}),
							(t.prototype._parseTrackingUpdate = function (t) {
								return t.body;
							}),
							(t.prototype.list = function (t) {
								var e = this;
								return this.request.get('/v3/domains', t).then(function (t) {
									return e._parseDomainList(t);
								});
							}),
							(t.prototype.get = function (t) {
								var e = this;
								return this.request.get('/v3/domains/'.concat(t)).then(function (t) {
									return e._parseDomain(t);
								});
							}),
							(t.prototype.create = function (t) {
								var e = this,
									r = n({}, t);
								return (
									'force_dkim_authority' in r &&
										'boolean' == typeof r.force_dkim_authority &&
										(r.force_dkim_authority = 'true' === r.toString() ? 'true' : 'false'),
									this.request.postWithFD('/v3/domains', r).then(function (t) {
										return e._parseDomain(t);
									})
								);
							}),
							(t.prototype.verify = function (t) {
								var e = this;
								return this.request.put('/v3/domains/'.concat(t, '/verify')).then(function (t) {
									return e._parseDomain(t);
								});
							}),
							(t.prototype.destroy = function (t) {
								var e = this;
								return this.request.delete('/v3/domains/'.concat(t)).then(function (t) {
									return e._parseMessage(t);
								});
							}),
							(t.prototype.getConnection = function (t) {
								return this.request
									.get('/v3/domains/'.concat(t, '/connection'))
									.then(function (t) {
										return t;
									})
									.then(function (t) {
										return t.body.connection;
									});
							}),
							(t.prototype.updateConnection = function (t, e) {
								return this.request
									.put('/v3/domains/'.concat(t, '/connection'), e)
									.then(function (t) {
										return t;
									})
									.then(function (t) {
										return t.body;
									});
							}),
							(t.prototype.getTracking = function (t) {
								return this.request
									.get((0, s.default)('/v3/domains', t, 'tracking'))
									.then(this._parseTrackingSettings);
							}),
							(t.prototype.updateTracking = function (t, e, r) {
								var n = this;
								if ('boolean' == typeof (null == r ? void 0 : r.active))
									throw new i.default({
										status: 400,
										statusText: 'Received boolean value for active property',
										body: {
											message: 'Property "active" must contain string value.'
										}
									});
								return this.request
									.putWithFD((0, s.default)('/v3/domains', t, 'tracking', e), r)
									.then(function (t) {
										return n._parseTrackingUpdate(t);
									});
							}),
							(t.prototype.getIps = function (t) {
								return this.request.get((0, s.default)('/v3/domains', t, 'ips')).then(function (t) {
									var e;
									return null === (e = null == t ? void 0 : t.body) || void 0 === e
										? void 0
										: e.items;
								});
							}),
							(t.prototype.assignIp = function (t, e) {
								return this.request.postWithFD((0, s.default)('/v3/domains', t, 'ips'), {
									ip: e
								});
							}),
							(t.prototype.deleteIp = function (t, e) {
								return this.request.delete((0, s.default)('/v3/domains', t, 'ips', e));
							}),
							(t.prototype.linkIpPool = function (t, e) {
								return this.request.postWithFD((0, s.default)('/v3/domains', t, 'ips'), {
									pool_id: e
								});
							}),
							(t.prototype.unlinkIpPoll = function (t, e) {
								var r = '';
								if (e.pool_id && e.ip)
									throw new i.default({
										status: 400,
										statusText: 'Too much data for replacement',
										body: {
											message: 'Please specify either pool_id or ip (not both)'
										}
									});
								return (
									e.pool_id
										? (r = '?pool_id='.concat(e.pool_id))
										: e.ip && (r = '?ip='.concat(e.ip)),
									this.request.delete((0, s.default)('/v3/domains', t, 'ips', 'ip_pool', r))
								);
							}),
							(t.prototype.updateDKIMAuthority = function (t, e) {
								return this.request
									.put(
										'/v3/domains/'.concat(t, '/dkim_authority'),
										{},
										{
											query: 'self='.concat(e.self)
										}
									)
									.then(function (t) {
										return t;
									})
									.then(function (t) {
										return t.body;
									});
							}),
							(t.prototype.updateDKIMSelector = function (t, e) {
								return this.request
									.put(
										'/v3/domains/'.concat(t, '/dkim_selector'),
										{},
										{
											query: 'dkim_selector='.concat(e.dkimSelector)
										}
									)
									.then(function (t) {
										return t;
									});
							}),
							(t.prototype.updateWebPrefix = function (t, e) {
								return this.request
									.put(
										'/v3/domains/'.concat(t, '/web_prefix'),
										{},
										{
											query: 'web_prefix='.concat(e.webPrefix)
										}
									)
									.then(function (t) {
										return t;
									});
							}),
							t
						);
					})();

					e.default = u;
				},
				5060: function (t, e, r) {
					'use strict';

					var n =
						(this && this.__importDefault) ||
						function (t) {
							return t && t.__esModule
								? t
								: {
										default: t
								  };
						};

					Object.defineProperty(e, '__esModule', {
						value: !0
					});

					var o = n(r(4078)),
						s = (function () {
							function t(t) {
								(this.request = t), (this.baseRoute = '/v3/domains/');
							}

							return (
								(t.prototype._parseDomainCredentialsList = function (t) {
									return {
										items: t.body.items,
										totalCount: t.body.total_count
									};
								}),
								(t.prototype._parseMessageResponse = function (t) {
									return {
										status: t.status,
										message: t.body.message
									};
								}),
								(t.prototype._parseDeletedResponse = function (t) {
									return {
										status: t.status,
										message: t.body.message,
										spec: t.body.spec
									};
								}),
								(t.prototype.list = function (t, e) {
									var r = this;
									return this.request
										.get((0, o.default)(this.baseRoute, t, '/credentials'), e)
										.then(function (t) {
											return r._parseDomainCredentialsList(t);
										});
								}),
								(t.prototype.create = function (t, e) {
									var r = this;
									return this.request
										.postWithFD(''.concat(this.baseRoute).concat(t, '/credentials'), e)
										.then(function (t) {
											return r._parseMessageResponse(t);
										});
								}),
								(t.prototype.update = function (t, e, r) {
									var n = this;
									return this.request
										.putWithFD(''.concat(this.baseRoute).concat(t, '/credentials/').concat(e), r)
										.then(function (t) {
											return n._parseMessageResponse(t);
										});
								}),
								(t.prototype.destroy = function (t, e) {
									var r = this;
									return this.request
										.delete(''.concat(this.baseRoute).concat(t, '/credentials/').concat(e))
										.then(function (t) {
											return r._parseDeletedResponse(t);
										});
								}),
								t
							);
						})();

					e.default = s;
				},
				7075: function (t, e, r) {
					'use strict';

					var n =
							(this && this.__assign) ||
							function () {
								return (
									(n =
										Object.assign ||
										function (t) {
											for (var e, r = 1, n = arguments.length; r < n; r++)
												for (var o in (e = arguments[r]))
													Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);

											return t;
										}),
									n.apply(this, arguments)
								);
							},
						o =
							(this && this.__importDefault) ||
							function (t) {
								return t && t.__esModule
									? t
									: {
											default: t
									  };
							};

					Object.defineProperty(e, '__esModule', {
						value: !0
					}),
						(e.DomainTagStatistic = e.DomainTag = void 0);

					var s = o(r(4078)),
						i = function (t) {
							(this.tag = t.tag),
								(this.description = t.description),
								(this['first-seen'] = new Date(t['first-seen'])),
								(this['last-seen'] = new Date(t['last-seen']));
						};

					e.DomainTag = i;

					var a = function (t) {
						(this.tag = t.body.tag),
							(this.description = t.body.description),
							(this.start = new Date(t.body.start)),
							(this.end = new Date(t.body.end)),
							(this.resolution = t.body.resolution),
							(this.stats = t.body.stats.map(function (t) {
								return n(n({}, t), {
									time: new Date(t.time)
								});
							}));
					};

					e.DomainTagStatistic = a;

					var u = (function () {
						function t(t) {
							(this.request = t), (this.baseRoute = '/v3/');
						}

						return (
							(t.prototype._parsePageLinks = function (t) {
								return Object.entries(t.body.paging).reduce(function (t, e) {
									var r = e[0],
										n = e[1];
									return (
										(t[r] = {
											id: r,
											url: n
										}),
										t
									);
								}, {});
							}),
							(t.prototype._parseDomainTagsList = function (t) {
								return {
									items: t.body.items.map(function (t) {
										return new i(t);
									}),
									pages: this._parsePageLinks(t)
								};
							}),
							(t.prototype._parseTagStatistic = function (t) {
								return new a(t);
							}),
							(t.prototype.list = function (t, e) {
								var r = this;
								return this.request
									.get((0, s.default)(this.baseRoute, t, '/tags'), e)
									.then(function (t) {
										return r._parseDomainTagsList(t);
									});
							}),
							(t.prototype.get = function (t, e) {
								return this.request
									.get((0, s.default)(this.baseRoute, t, '/tags', e))
									.then(function (t) {
										return new i(t.body);
									});
							}),
							(t.prototype.update = function (t, e, r) {
								return this.request
									.put((0, s.default)(this.baseRoute, t, '/tags', e), r)
									.then(function (t) {
										return t.body;
									});
							}),
							(t.prototype.destroy = function (t, e) {
								return this.request
									.delete(''.concat(this.baseRoute).concat(t, '/tags/').concat(e))
									.then(function (t) {
										return {
											message: t.body.message,
											status: t.status
										};
									});
							}),
							(t.prototype.statistic = function (t, e, r) {
								var n = this;
								return this.request
									.get((0, s.default)(this.baseRoute, t, '/tags', e, 'stats'), r)
									.then(function (t) {
										return n._parseTagStatistic(t);
									});
							}),
							(t.prototype.countries = function (t, e) {
								return this.request
									.get((0, s.default)(this.baseRoute, t, '/tags', e, 'stats/aggregates/countries'))
									.then(function (t) {
										return t.body;
									});
							}),
							(t.prototype.providers = function (t, e) {
								return this.request
									.get((0, s.default)(this.baseRoute, t, '/tags', e, 'stats/aggregates/providers'))
									.then(function (t) {
										return t.body;
									});
							}),
							(t.prototype.devices = function (t, e) {
								return this.request
									.get((0, s.default)(this.baseRoute, t, '/tags', e, 'stats/aggregates/devices'))
									.then(function (t) {
										return t.body;
									});
							}),
							t
						);
					})();

					e.default = u;
				},
				9955: function (t, e, r) {
					'use strict';

					var n =
							(this && this.__assign) ||
							function () {
								return (
									(n =
										Object.assign ||
										function (t) {
											for (var e, r = 1, n = arguments.length; r < n; r++)
												for (var o in (e = arguments[r]))
													Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);

											return t;
										}),
									n.apply(this, arguments)
								);
							},
						o =
							(this && this.__importDefault) ||
							function (t) {
								return t && t.__esModule
									? t
									: {
											default: t
									  };
							};

					Object.defineProperty(e, '__esModule', {
						value: !0
					}),
						(e.DomainTemplateItem = void 0);

					var s = o(r(4078)),
						i = function (t) {
							(this.name = t.name),
								(this.description = t.description),
								(this.createdAt = t.createdAt ? new Date(t.createdAt) : ''),
								(this.createdBy = t.createdBy),
								(this.id = t.id),
								t.version &&
									((this.version = t.version),
									t.version.createdAt && (this.version.createdAt = new Date(t.version.createdAt))),
								t.versions &&
									t.versions.length &&
									(this.versions = t.versions.map(function (t) {
										var e = n({}, t);
										return (e.createdAt = new Date(t.createdAt)), e;
									}));
						};

					e.DomainTemplateItem = i;

					var a = (function () {
						function t(t) {
							(this.request = t), (this.baseRoute = '/v3/');
						}

						return (
							(t.prototype.parseCreationResponse = function (t) {
								return new i(t.body.template);
							}),
							(t.prototype.parseCreationVersionResponse = function (t) {
								var e = {};
								return (
									(e.status = t.status),
									(e.message = t.body.message),
									t.body && t.body.template && (e.template = new i(t.body.template)),
									e
								);
							}),
							(t.prototype.parseMutationResponse = function (t) {
								var e = {};
								return (
									(e.status = t.status),
									(e.message = t.body.message),
									t.body && t.body.template && (e.templateName = t.body.template.name),
									e
								);
							}),
							(t.prototype.parseNotificationResponse = function (t) {
								var e = {};
								return (e.status = t.status), (e.message = t.body.message), e;
							}),
							(t.prototype.parseMutateTemplateVersionResponse = function (t) {
								var e = {};
								return (
									(e.status = t.status),
									(e.message = t.body.message),
									t.body.template &&
										((e.templateName = t.body.template.name),
										(e.templateVersion = {
											tag: t.body.template.version.tag
										})),
									e
								);
							}),
							(t.prototype.parseList = function (t) {
								var e = {};
								return (
									(e.items = t.body.items.map(function (t) {
										return new i(t);
									})),
									(e.pages = t.body.paging),
									e
								);
							}),
							(t.prototype.parseListTemplateVersions = function (t) {
								var e = {};
								return (e.template = new i(t.body.template)), (e.pages = t.body.paging), e;
							}),
							(t.prototype.list = function (t, e) {
								var r = this;
								return this.request
									.get((0, s.default)(this.baseRoute, t, '/templates'), e)
									.then(function (t) {
										return r.parseList(t);
									});
							}),
							(t.prototype.get = function (t, e, r) {
								return this.request
									.get((0, s.default)(this.baseRoute, t, '/templates/', e), r)
									.then(function (t) {
										return new i(t.body.template);
									});
							}),
							(t.prototype.create = function (t, e) {
								var r = this;
								return this.request
									.postWithFD((0, s.default)(this.baseRoute, t, '/templates'), e)
									.then(function (t) {
										return r.parseCreationResponse(t);
									});
							}),
							(t.prototype.update = function (t, e, r) {
								var n = this;
								return this.request
									.putWithFD((0, s.default)(this.baseRoute, t, '/templates/', e), r)
									.then(function (t) {
										return n.parseMutationResponse(t);
									});
							}),
							(t.prototype.destroy = function (t, e) {
								var r = this;
								return this.request
									.delete((0, s.default)(this.baseRoute, t, '/templates/', e))
									.then(function (t) {
										return r.parseMutationResponse(t);
									});
							}),
							(t.prototype.destroyAll = function (t) {
								var e = this;
								return this.request
									.delete((0, s.default)(this.baseRoute, t, '/templates'))
									.then(function (t) {
										return e.parseNotificationResponse(t);
									});
							}),
							(t.prototype.createVersion = function (t, e, r) {
								var n = this;
								return this.request
									.postWithFD((0, s.default)(this.baseRoute, t, '/templates/', e, '/versions'), r)
									.then(function (t) {
										return n.parseCreationVersionResponse(t);
									});
							}),
							(t.prototype.getVersion = function (t, e, r) {
								return this.request
									.get((0, s.default)(this.baseRoute, t, '/templates/', e, '/versions/', r))
									.then(function (t) {
										return new i(t.body.template);
									});
							}),
							(t.prototype.updateVersion = function (t, e, r, n) {
								var o = this;
								return this.request
									.putWithFD(
										(0, s.default)(this.baseRoute, t, '/templates/', e, '/versions/', r),
										n
									)
									.then(function (t) {
										return o.parseMutateTemplateVersionResponse(t);
									});
							}),
							(t.prototype.destroyVersion = function (t, e, r) {
								var n = this;
								return this.request
									.delete((0, s.default)(this.baseRoute, t, '/templates/', e, '/versions/', r))
									.then(function (t) {
										return n.parseMutateTemplateVersionResponse(t);
									});
							}),
							(t.prototype.listVersions = function (t, e, r) {
								var n = this;
								return this.request
									.get((0, s.default)(this.baseRoute, t, '/templates', e, '/versions'), r)
									.then(function (t) {
										return n.parseListTemplateVersions(t);
									});
							}),
							t
						);
					})();

					e.default = a;
				},
				3142: function (t, e) {
					'use strict';

					var r,
						n =
							(this && this.__extends) ||
							((r = function (t, e) {
								return (
									(r =
										Object.setPrototypeOf ||
										({
											__proto__: []
										} instanceof Array &&
											function (t, e) {
												t.__proto__ = e;
											}) ||
										function (t, e) {
											for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
										}),
									r(t, e)
								);
							}),
							function (t, e) {
								if ('function' != typeof e && null !== e)
									throw new TypeError(
										'Class extends value ' + String(e) + ' is not a constructor or null'
									);

								function n() {
									this.constructor = t;
								}

								r(t, e),
									(t.prototype =
										null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
							});
					Object.defineProperty(e, '__esModule', {
						value: !0
					});

					var o = (function (t) {
						function e(e) {
							var r = e.status,
								n = e.statusText,
								o = e.message,
								s = e.body,
								i = void 0 === s ? {} : s,
								a = this,
								u = '',
								c = '';
							return (
								'string' == typeof i
									? (u = i)
									: ((u = null == i ? void 0 : i.message), (c = null == i ? void 0 : i.error)),
								((a = t.call(this) || this).stack = ''),
								(a.status = r),
								(a.message = o || c || n),
								(a.details = u),
								a
							);
						}

						return n(e, t), e;
					})(Error);

					e.default = o;
				},
				5022: function (t, e, r) {
					'use strict';

					var n =
							(this && this.__assign) ||
							function () {
								return (
									(n =
										Object.assign ||
										function (t) {
											for (var e, r = 1, n = arguments.length; r < n; r++)
												for (var o in (e = arguments[r]))
													Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);

											return t;
										}),
									n.apply(this, arguments)
								);
							},
						o =
							(this && this.__importDefault) ||
							function (t) {
								return t && t.__esModule
									? t
									: {
											default: t
									  };
							};

					Object.defineProperty(e, '__esModule', {
						value: !0
					});

					var s = o(r(4078)),
						i = (function () {
							function t(t) {
								this.request = t;
							}

							return (
								(t.prototype._parsePageNumber = function (t) {
									return t.split('/').pop() || '';
								}),
								(t.prototype._parsePage = function (t, e) {
									return {
										id: t,
										number: this._parsePageNumber(e),
										url: e
									};
								}),
								(t.prototype._parsePageLinks = function (t) {
									var e = this;
									return Object.entries(t.body.paging).reduce(function (t, r) {
										var n = r[0],
											o = r[1];
										return (t[n] = e._parsePage(n, o)), t;
									}, {});
								}),
								(t.prototype._parseEventList = function (t) {
									return {
										items: t.body.items,
										pages: this._parsePageLinks(t)
									};
								}),
								(t.prototype.get = function (t, e) {
									var r,
										o = this,
										i = n({}, e);
									return (
										i && i.page
											? ((r = (0, s.default)('/v3', t, 'events', i.page)), delete i.page)
											: (r = (0, s.default)('/v3', t, 'events')),
										this.request.get(r, i).then(function (t) {
											return o._parseEventList(t);
										})
									);
								}),
								t
							);
						})();

					e.default = i;
				},
				4150: function (t, e) {
					'use strict';

					var r =
						(this && this.__assign) ||
						function () {
							return (
								(r =
									Object.assign ||
									function (t) {
										for (var e, r = 1, n = arguments.length; r < n; r++)
											for (var o in (e = arguments[r]))
												Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);

										return t;
									}),
								r.apply(this, arguments)
							);
						};

					Object.defineProperty(e, '__esModule', {
						value: !0
					});

					var n = (function () {
						function t(t) {
							this.FormDataConstructor = t;
						}

						return (
							(t.prototype.createFormData = function (t) {
								var e = this;
								if (!t) throw new Error('Please provide data object');
								return Object.keys(t)
									.filter(function (e) {
										return t[e];
									})
									.reduce(function (r, n) {
										return ['attachment', 'inline', 'multipleValidationFile'].includes(n)
											? (e.addFilesToFD(n, t[n], r), r)
											: 'message' === n
											? (e.addMimeDataToFD(n, t[n], r), r)
											: (e.addCommonPropertyToFD(n, t[n], r), r);
									}, new this.FormDataConstructor());
							}),
							(t.prototype.isNodeFormData = function (t) {
								return void 0 !== t.getHeaders;
							}),
							(t.prototype.getAttachmentOptions = function (t) {
								if ('object' != typeof t || this.isStream(t)) return {};
								var e = t.filename,
									n = t.contentType,
									o = t.knownLength;
								return r(
									r(
										r(
											{},
											e
												? {
														filename: e
												  }
												: {
														filename: 'file'
												  }
										),
										n && {
											contentType: n
										}
									),
									o && {
										knownLength: o
									}
								);
							}),
							(t.prototype.addMimeDataToFD = function (t, e, r) {
								this.isNodeFormData(r)
									? Buffer.isBuffer(e) &&
									  r.append(t, e, {
											filename: 'MimeMessage'
									  })
									: r.append(t, e, 'MimeMessage');
							}),
							(t.prototype.addFilesToFD = function (t, e, r) {
								var n = this,
									o = function (t, e, r) {
										var o = 'multipleValidationFile' === t ? 'file' : t,
											s = n.isStream(e) ? e : e.data,
											i = n.getAttachmentOptions(e);
										n.isNodeFormData(r) ? r.append(o, s, i) : r.append(o, s, i.filename);
									};

								Array.isArray(e)
									? e.forEach(function (e) {
											o(t, e, r);
									  })
									: o(t, e, r);
							}),
							(t.prototype.isStream = function (t) {
								return 'object' == typeof t && 'function' == typeof t.pipe;
							}),
							(t.prototype.addCommonPropertyToFD = function (t, e, r) {
								Array.isArray(e)
									? e.forEach(function (e) {
											r.append(t, e);
									  })
									: null != e && r.append(t, e);
							}),
							t
						);
					})();

					e.default = n;
				},
				6175: function (t, e, r) {
					'use strict';

					var n =
						(this && this.__importDefault) ||
						function (t) {
							return t && t.__esModule
								? t
								: {
										default: t
								  };
						};

					Object.defineProperty(e, '__esModule', {
						value: !0
					});

					var o = n(r(1475)),
						s = (function () {
							function t(t) {
								this.formData = t;
							}

							return (
								Object.defineProperty(t, 'default', {
									get: function () {
										return this;
									},
									enumerable: !1,
									configurable: !0
								}),
								(t.prototype.client = function (t) {
									return new o.default(t, this.formData);
								}),
								t
							);
						})();

					e.default = s;
				},
				3990: (t, e) => {
					'use strict';

					Object.defineProperty(e, '__esModule', {
						value: !0
					}),
						(e.SuppressionModels = void 0),
						(function (t) {
							(t.BOUNCES = 'bounces'),
								(t.COMPLAINTS = 'complaints'),
								(t.UNSUBSCRIBES = 'unsubscribes'),
								(t.WHITELISTS = 'whitelists');
						})(e.SuppressionModels || (e.SuppressionModels = {}));
				},
				9602: function (t, e) {
					'use strict';

					var r =
							(this && this.__assign) ||
							function () {
								return (
									(r =
										Object.assign ||
										function (t) {
											for (var e, r = 1, n = arguments.length; r < n; r++)
												for (var o in (e = arguments[r]))
													Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);

											return t;
										}),
									r.apply(this, arguments)
								);
							},
						n =
							(this && this.__awaiter) ||
							function (t, e, r, n) {
								return new (r || (r = Promise))(function (o, s) {
									function i(t) {
										try {
											u(n.next(t));
										} catch (t) {
											s(t);
										}
									}

									function a(t) {
										try {
											u(n.throw(t));
										} catch (t) {
											s(t);
										}
									}

									function u(t) {
										var e;
										t.done
											? o(t.value)
											: ((e = t.value),
											  e instanceof r
													? e
													: new r(function (t) {
															t(e);
													  })).then(i, a);
									}

									u((n = n.apply(t, e || [])).next());
								});
							},
						o =
							(this && this.__generator) ||
							function (t, e) {
								var r,
									n,
									o,
									s,
									i = {
										label: 0,
										sent: function () {
											if (1 & o[0]) throw o[1];
											return o[1];
										},
										trys: [],
										ops: []
									};
								return (
									(s = {
										next: a(0),
										throw: a(1),
										return: a(2)
									}),
									'function' == typeof Symbol &&
										(s[Symbol.iterator] = function () {
											return this;
										}),
									s
								);

								function a(s) {
									return function (a) {
										return (function (s) {
											if (r) throw new TypeError('Generator is already executing.');

											for (; i; )
												try {
													if (
														((r = 1),
														n &&
															(o =
																2 & s[0]
																	? n.return
																	: s[0]
																	? n.throw || ((o = n.return) && o.call(n), 0)
																	: n.next) &&
															!(o = o.call(n, s[1])).done)
													)
														return o;

													switch (((n = 0), o && (s = [2 & s[0], o.value]), s[0])) {
														case 0:
														case 1:
															o = s;
															break;

														case 4:
															return (
																i.label++,
																{
																	value: s[1],
																	done: !1
																}
															);

														case 5:
															i.label++, (n = s[1]), (s = [0]);
															continue;

														case 7:
															(s = i.ops.pop()), i.trys.pop();
															continue;

														default:
															if (
																!((o = i.trys),
																(o = o.length > 0 && o[o.length - 1]) || (6 !== s[0] && 2 !== s[0]))
															) {
																i = 0;
																continue;
															}

															if (3 === s[0] && (!o || (s[1] > o[0] && s[1] < o[3]))) {
																i.label = s[1];
																break;
															}

															if (6 === s[0] && i.label < o[1]) {
																(i.label = o[1]), (o = s);
																break;
															}

															if (o && i.label < o[2]) {
																(i.label = o[2]), i.ops.push(s);
																break;
															}

															o[2] && i.ops.pop(), i.trys.pop();
															continue;
													}

													s = e.call(t, i);
												} catch (t) {
													(s = [6, t]), (n = 0);
												} finally {
													r = o = 0;
												}

											if (5 & s[0]) throw s[1];
											return {
												value: s[0] ? s[1] : void 0,
												done: !0
											};
										})([s, a]);
									};
								}
							};

					Object.defineProperty(e, '__esModule', {
						value: !0
					});

					var s = (function () {
						function t(t) {
							this.request = t;
						}

						return (
							(t.prototype.list = function () {
								var t = this;
								return this.request.get('/v1/ip_pools').then(function (e) {
									return t.parseIpPoolsResponse(e);
								});
							}),
							(t.prototype.create = function (t) {
								return n(this, void 0, void 0, function () {
									var e;
									return o(this, function (n) {
										switch (n.label) {
											case 0:
												return [4, this.request.postWithFD('/v1/ip_pools', t)];

											case 1:
												return (
													(e = n.sent()),
													[
														2,
														r(
															{
																status: e.status
															},
															e.body
														)
													]
												);
										}
									});
								});
							}),
							(t.prototype.update = function (t, e) {
								return n(this, void 0, void 0, function () {
									var n;
									return o(this, function (o) {
										switch (o.label) {
											case 0:
												return [4, this.request.patchWithFD('/v1/ip_pools/'.concat(t), e)];

											case 1:
												return (
													(n = o.sent()),
													[
														2,
														r(
															{
																status: n.status
															},
															n.body
														)
													]
												);
										}
									});
								});
							}),
							(t.prototype.delete = function (t, e) {
								return n(this, void 0, void 0, function () {
									var n;
									return o(this, function (o) {
										switch (o.label) {
											case 0:
												return [4, this.request.delete('/v1/ip_pools/'.concat(t), e)];

											case 1:
												return (
													(n = o.sent()),
													[
														2,
														r(
															{
																status: n.status
															},
															n.body
														)
													]
												);
										}
									});
								});
							}),
							(t.prototype.parseIpPoolsResponse = function (t) {
								return r(
									{
										status: t.status
									},
									t.body
								);
							}),
							t
						);
					})();

					e.default = s;
				},
				9345: function (t, e) {
					'use strict';

					var r =
							(this && this.__awaiter) ||
							function (t, e, r, n) {
								return new (r || (r = Promise))(function (o, s) {
									function i(t) {
										try {
											u(n.next(t));
										} catch (t) {
											s(t);
										}
									}

									function a(t) {
										try {
											u(n.throw(t));
										} catch (t) {
											s(t);
										}
									}

									function u(t) {
										var e;
										t.done
											? o(t.value)
											: ((e = t.value),
											  e instanceof r
													? e
													: new r(function (t) {
															t(e);
													  })).then(i, a);
									}

									u((n = n.apply(t, e || [])).next());
								});
							},
						n =
							(this && this.__generator) ||
							function (t, e) {
								var r,
									n,
									o,
									s,
									i = {
										label: 0,
										sent: function () {
											if (1 & o[0]) throw o[1];
											return o[1];
										},
										trys: [],
										ops: []
									};
								return (
									(s = {
										next: a(0),
										throw: a(1),
										return: a(2)
									}),
									'function' == typeof Symbol &&
										(s[Symbol.iterator] = function () {
											return this;
										}),
									s
								);

								function a(s) {
									return function (a) {
										return (function (s) {
											if (r) throw new TypeError('Generator is already executing.');

											for (; i; )
												try {
													if (
														((r = 1),
														n &&
															(o =
																2 & s[0]
																	? n.return
																	: s[0]
																	? n.throw || ((o = n.return) && o.call(n), 0)
																	: n.next) &&
															!(o = o.call(n, s[1])).done)
													)
														return o;

													switch (((n = 0), o && (s = [2 & s[0], o.value]), s[0])) {
														case 0:
														case 1:
															o = s;
															break;

														case 4:
															return (
																i.label++,
																{
																	value: s[1],
																	done: !1
																}
															);

														case 5:
															i.label++, (n = s[1]), (s = [0]);
															continue;

														case 7:
															(s = i.ops.pop()), i.trys.pop();
															continue;

														default:
															if (
																!((o = i.trys),
																(o = o.length > 0 && o[o.length - 1]) || (6 !== s[0] && 2 !== s[0]))
															) {
																i = 0;
																continue;
															}

															if (3 === s[0] && (!o || (s[1] > o[0] && s[1] < o[3]))) {
																i.label = s[1];
																break;
															}

															if (6 === s[0] && i.label < o[1]) {
																(i.label = o[1]), (o = s);
																break;
															}

															if (o && i.label < o[2]) {
																(i.label = o[2]), i.ops.push(s);
																break;
															}

															o[2] && i.ops.pop(), i.trys.pop();
															continue;
													}

													s = e.call(t, i);
												} catch (t) {
													(s = [6, t]), (n = 0);
												} finally {
													r = o = 0;
												}

											if (5 & s[0]) throw s[1];
											return {
												value: s[0] ? s[1] : void 0,
												done: !0
											};
										})([s, a]);
									};
								}
							};

					Object.defineProperty(e, '__esModule', {
						value: !0
					});

					var o = (function () {
						function t(t) {
							this.request = t;
						}

						return (
							(t.prototype.list = function (t) {
								return r(this, void 0, void 0, function () {
									var e;
									return n(this, function (r) {
										switch (r.label) {
											case 0:
												return [4, this.request.get('/v3/ips', t)];

											case 1:
												return (e = r.sent()), [2, this.parseIpsResponse(e)];
										}
									});
								});
							}),
							(t.prototype.get = function (t) {
								return r(this, void 0, void 0, function () {
									var e;
									return n(this, function (r) {
										switch (r.label) {
											case 0:
												return [4, this.request.get('/v3/ips/'.concat(t))];

											case 1:
												return (e = r.sent()), [2, this.parseIpsResponse(e)];
										}
									});
								});
							}),
							(t.prototype.parseIpsResponse = function (t) {
								return t.body;
							}),
							t
						);
					})();

					e.default = o;
				},
				6126: function (t, e) {
					'use strict';

					var r =
						(this && this.__assign) ||
						function () {
							return (
								(r =
									Object.assign ||
									function (t) {
										for (var e, r = 1, n = arguments.length; r < n; r++)
											for (var o in (e = arguments[r]))
												Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);

										return t;
									}),
								r.apply(this, arguments)
							);
						};

					Object.defineProperty(e, '__esModule', {
						value: !0
					});

					var n = (function () {
						function t(t, e) {
							(this.request = t), (this.baseRoute = '/v3/lists'), (this.members = e);
						}

						return (
							(t.prototype.parseValidationResult = function (t, e) {
								return {
									status: t,
									validationResult: r(r({}, e), {
										created_at: new Date(1e3 * e.created_at)
									})
								};
							}),
							(t.prototype.list = function (t) {
								return this.request.get(''.concat(this.baseRoute, '/pages'), t).then(function (t) {
									return t.body.items;
								});
							}),
							(t.prototype.get = function (t) {
								return this.request
									.get(''.concat(this.baseRoute, '/').concat(t))
									.then(function (t) {
										return t.body.list;
									});
							}),
							(t.prototype.create = function (t) {
								return this.request.postWithFD(this.baseRoute, t).then(function (t) {
									return t.body.list;
								});
							}),
							(t.prototype.update = function (t, e) {
								return this.request
									.putWithFD(''.concat(this.baseRoute, '/').concat(t), e)
									.then(function (t) {
										return t.body.list;
									});
							}),
							(t.prototype.destroy = function (t) {
								return this.request
									.delete(''.concat(this.baseRoute, '/').concat(t))
									.then(function (t) {
										return t.body;
									});
							}),
							(t.prototype.validate = function (t) {
								return this.request
									.post(''.concat(this.baseRoute, '/').concat(t, '/validate'), {})
									.then(function (t) {
										return r(
											{
												status: t.status
											},
											t.body
										);
									});
							}),
							(t.prototype.validationResult = function (t) {
								var e = this;
								return this.request
									.get(''.concat(this.baseRoute, '/').concat(t, '/validate'))
									.then(function (t) {
										return e.parseValidationResult(t.status, t.body);
									});
							}),
							(t.prototype.cancelValidation = function (t) {
								return this.request
									.delete(''.concat(this.baseRoute, '/').concat(t, '/validate'))
									.then(function (t) {
										return {
											status: t.status,
											message: t.body.message
										};
									});
							}),
							t
						);
					})();

					e.default = n;
				},
				5135: function (t, e) {
					'use strict';

					var r =
						(this && this.__assign) ||
						function () {
							return (
								(r =
									Object.assign ||
									function (t) {
										for (var e, r = 1, n = arguments.length; r < n; r++)
											for (var o in (e = arguments[r]))
												Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);

										return t;
									}),
								r.apply(this, arguments)
							);
						};

					Object.defineProperty(e, '__esModule', {
						value: !0
					});

					var n = (function () {
						function t(t) {
							(this.request = t), (this.baseRoute = '/v3/lists');
						}

						return (
							(t.prototype.checkAndUpdateData = function (t) {
								var e = r({}, t);
								return (
									'object' == typeof t.vars && (e.vars = JSON.stringify(e.vars)),
									'boolean' == typeof t.subscribed && (e.subscribed = t.subscribed ? 'yes' : 'no'),
									e
								);
							}),
							(t.prototype.listMembers = function (t, e) {
								return this.request
									.get(''.concat(this.baseRoute, '/').concat(t, '/members/pages'), e)
									.then(function (t) {
										return t.body.items;
									});
							}),
							(t.prototype.getMember = function (t, e) {
								return this.request
									.get(''.concat(this.baseRoute, '/').concat(t, '/members/').concat(e))
									.then(function (t) {
										return t.body.member;
									});
							}),
							(t.prototype.createMember = function (t, e) {
								var r = this.checkAndUpdateData(e);
								return this.request
									.postWithFD(''.concat(this.baseRoute, '/').concat(t, '/members'), r)
									.then(function (t) {
										return t.body.member;
									});
							}),
							(t.prototype.createMembers = function (t, e) {
								var r = {
									members: Array.isArray(e.members) ? JSON.stringify(e.members) : e.members,
									upsert: e.upsert
								};
								return this.request
									.postWithFD(''.concat(this.baseRoute, '/').concat(t, '/members.json'), r)
									.then(function (t) {
										return t.body;
									});
							}),
							(t.prototype.updateMember = function (t, e, r) {
								var n = this.checkAndUpdateData(r);
								return this.request
									.putWithFD(''.concat(this.baseRoute, '/').concat(t, '/members/').concat(e), n)
									.then(function (t) {
										return t.body.member;
									});
							}),
							(t.prototype.destroyMember = function (t, e) {
								return this.request
									.delete(''.concat(this.baseRoute, '/').concat(t, '/members/').concat(e))
									.then(function (t) {
										return t.body;
									});
							}),
							t
						);
					})();

					e.default = n;
				},
				3197: function (t, e) {
					'use strict';

					var r =
						(this && this.__assign) ||
						function () {
							return (
								(r =
									Object.assign ||
									function (t) {
										for (var e, r = 1, n = arguments.length; r < n; r++)
											for (var o in (e = arguments[r]))
												Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);

										return t;
									}),
								r.apply(this, arguments)
							);
						};

					Object.defineProperty(e, '__esModule', {
						value: !0
					});

					var n = (function () {
						function t(t) {
							this.request = t;
						}

						return (
							(t.prototype.prepareBooleanValues = function (t) {
								var e = new Set([
									'o:testmode',
									't:text',
									'o:dkim',
									'o:tracking',
									'o:tracking-clicks',
									'o:tracking-opens',
									'o:require-tls',
									'o:skip-verification'
								]);
								return t && 0 !== Object.keys(t).length
									? Object.keys(t).reduce(function (r, n) {
											return (
												e.has(n) && 'boolean' == typeof t[n]
													? (r[n] = t[n] ? 'yes' : 'no')
													: (r[n] = t[n]),
												r
											);
									  }, {})
									: {};
							}),
							(t.prototype._parseResponse = function (t) {
								return r(
									{
										status: t.status
									},
									t.body
								);
							}),
							(t.prototype.create = function (t, e) {
								if (e.message)
									return this.request
										.postWithFD('/v3/'.concat(t, '/messages.mime'), e)
										.then(this._parseResponse);
								var r = this.prepareBooleanValues(e);
								return this.request
									.postWithFD('/v3/'.concat(t, '/messages'), r)
									.then(this._parseResponse);
							}),
							t
						);
					})();

					e.default = n;
				},
				7587: function (t, e) {
					'use strict';

					var r =
							(this && this.__assign) ||
							function () {
								return (
									(r =
										Object.assign ||
										function (t) {
											for (var e, r = 1, n = arguments.length; r < n; r++)
												for (var o in (e = arguments[r]))
													Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);

											return t;
										}),
									r.apply(this, arguments)
								);
							},
						n =
							(this && this.__awaiter) ||
							function (t, e, r, n) {
								return new (r || (r = Promise))(function (o, s) {
									function i(t) {
										try {
											u(n.next(t));
										} catch (t) {
											s(t);
										}
									}

									function a(t) {
										try {
											u(n.throw(t));
										} catch (t) {
											s(t);
										}
									}

									function u(t) {
										var e;
										t.done
											? o(t.value)
											: ((e = t.value),
											  e instanceof r
													? e
													: new r(function (t) {
															t(e);
													  })).then(i, a);
									}

									u((n = n.apply(t, e || [])).next());
								});
							},
						o =
							(this && this.__generator) ||
							function (t, e) {
								var r,
									n,
									o,
									s,
									i = {
										label: 0,
										sent: function () {
											if (1 & o[0]) throw o[1];
											return o[1];
										},
										trys: [],
										ops: []
									};
								return (
									(s = {
										next: a(0),
										throw: a(1),
										return: a(2)
									}),
									'function' == typeof Symbol &&
										(s[Symbol.iterator] = function () {
											return this;
										}),
									s
								);

								function a(s) {
									return function (a) {
										return (function (s) {
											if (r) throw new TypeError('Generator is already executing.');

											for (; i; )
												try {
													if (
														((r = 1),
														n &&
															(o =
																2 & s[0]
																	? n.return
																	: s[0]
																	? n.throw || ((o = n.return) && o.call(n), 0)
																	: n.next) &&
															!(o = o.call(n, s[1])).done)
													)
														return o;

													switch (((n = 0), o && (s = [2 & s[0], o.value]), s[0])) {
														case 0:
														case 1:
															o = s;
															break;

														case 4:
															return (
																i.label++,
																{
																	value: s[1],
																	done: !1
																}
															);

														case 5:
															i.label++, (n = s[1]), (s = [0]);
															continue;

														case 7:
															(s = i.ops.pop()), i.trys.pop();
															continue;

														default:
															if (
																!((o = i.trys),
																(o = o.length > 0 && o[o.length - 1]) || (6 !== s[0] && 2 !== s[0]))
															) {
																i = 0;
																continue;
															}

															if (3 === s[0] && (!o || (s[1] > o[0] && s[1] < o[3]))) {
																i.label = s[1];
																break;
															}

															if (6 === s[0] && i.label < o[1]) {
																(i.label = o[1]), (o = s);
																break;
															}

															if (o && i.label < o[2]) {
																(i.label = o[2]), i.ops.push(s);
																break;
															}

															o[2] && i.ops.pop(), i.trys.pop();
															continue;
													}

													s = e.call(t, i);
												} catch (t) {
													(s = [6, t]), (n = 0);
												} finally {
													r = o = 0;
												}

											if (5 & s[0]) throw s[1];
											return {
												value: s[0] ? s[1] : void 0,
												done: !0
											};
										})([s, a]);
									};
								}
							};

					Object.defineProperty(e, '__esModule', {
						value: !0
					});

					var s = (function () {
						function t(t) {
							this.request = t;
						}

						return (
							(t.prototype.handleResponse = function (t) {
								return r(
									{
										status: t.status
									},
									null == t ? void 0 : t.body
								);
							}),
							(t.prototype.list = function () {
								return n(this, void 0, void 0, function () {
									var t;
									return o(this, function (e) {
										switch (e.label) {
											case 0:
												return [4, this.request.get('/v4/address/validate/bulk')];

											case 1:
												return (t = e.sent()), [2, this.handleResponse(t)];
										}
									});
								});
							}),
							(t.prototype.get = function (t) {
								return n(this, void 0, void 0, function () {
									var e;
									return o(this, function (n) {
										switch (n.label) {
											case 0:
												return [4, this.request.get('/v4/address/validate/bulk/'.concat(t))];

											case 1:
												return (
													(e = n.sent()),
													[
														2,
														r(
															{
																responseStatusCode: e.status
															},
															null == e ? void 0 : e.body
														)
													]
												);
										}
									});
								});
							}),
							(t.prototype.create = function (t, e) {
								return n(this, void 0, void 0, function () {
									var n, s;
									return o(this, function (o) {
										switch (o.label) {
											case 0:
												return (
													delete (n = r(
														{
															multipleValidationFile: r({}, null == e ? void 0 : e.file)
														},
														e
													)).file,
													[4, this.request.postWithFD('/v4/address/validate/bulk/'.concat(t), n)]
												);

											case 1:
												return (s = o.sent()), [2, this.handleResponse(s)];
										}
									});
								});
							}),
							(t.prototype.destroy = function (t) {
								return n(this, void 0, void 0, function () {
									var e;
									return o(this, function (r) {
										switch (r.label) {
											case 0:
												return [4, this.request.delete('/v4/address/validate/bulk/'.concat(t))];

											case 1:
												return (e = r.sent()), [2, this.handleResponse(e)];
										}
									});
								});
							}),
							t
						);
					})();

					e.default = s;
				},
				4438: function (t, e, r) {
					'use strict';

					var n =
							(this && this.__assign) ||
							function () {
								return (
									(n =
										Object.assign ||
										function (t) {
											for (var e, r = 1, n = arguments.length; r < n; r++)
												for (var o in (e = arguments[r]))
													Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);

											return t;
										}),
									n.apply(this, arguments)
								);
							},
						o =
							(this && this.__createBinding) ||
							(Object.create
								? function (t, e, r, n) {
										void 0 === n && (n = r);
										var o = Object.getOwnPropertyDescriptor(e, r);
										(o && !('get' in o ? !e.__esModule : o.writable || o.configurable)) ||
											(o = {
												enumerable: !0,
												get: function () {
													return e[r];
												}
											}),
											Object.defineProperty(t, n, o);
								  }
								: function (t, e, r, n) {
										void 0 === n && (n = r), (t[n] = e[r]);
								  }),
						s =
							(this && this.__setModuleDefault) ||
							(Object.create
								? function (t, e) {
										Object.defineProperty(t, 'default', {
											enumerable: !0,
											value: e
										});
								  }
								: function (t, e) {
										t.default = e;
								  }),
						i =
							(this && this.__importStar) ||
							function (t) {
								if (t && t.__esModule) return t;
								var e = {};
								if (null != t)
									for (var r in t)
										'default' !== r && Object.prototype.hasOwnProperty.call(t, r) && o(e, t, r);
								return s(e, t), e;
							},
						a =
							(this && this.__awaiter) ||
							function (t, e, r, n) {
								return new (r || (r = Promise))(function (o, s) {
									function i(t) {
										try {
											u(n.next(t));
										} catch (t) {
											s(t);
										}
									}

									function a(t) {
										try {
											u(n.throw(t));
										} catch (t) {
											s(t);
										}
									}

									function u(t) {
										var e;
										t.done
											? o(t.value)
											: ((e = t.value),
											  e instanceof r
													? e
													: new r(function (t) {
															t(e);
													  })).then(i, a);
									}

									u((n = n.apply(t, e || [])).next());
								});
							},
						u =
							(this && this.__generator) ||
							function (t, e) {
								var r,
									n,
									o,
									s,
									i = {
										label: 0,
										sent: function () {
											if (1 & o[0]) throw o[1];
											return o[1];
										},
										trys: [],
										ops: []
									};
								return (
									(s = {
										next: a(0),
										throw: a(1),
										return: a(2)
									}),
									'function' == typeof Symbol &&
										(s[Symbol.iterator] = function () {
											return this;
										}),
									s
								);

								function a(s) {
									return function (a) {
										return (function (s) {
											if (r) throw new TypeError('Generator is already executing.');

											for (; i; )
												try {
													if (
														((r = 1),
														n &&
															(o =
																2 & s[0]
																	? n.return
																	: s[0]
																	? n.throw || ((o = n.return) && o.call(n), 0)
																	: n.next) &&
															!(o = o.call(n, s[1])).done)
													)
														return o;

													switch (((n = 0), o && (s = [2 & s[0], o.value]), s[0])) {
														case 0:
														case 1:
															o = s;
															break;

														case 4:
															return (
																i.label++,
																{
																	value: s[1],
																	done: !1
																}
															);

														case 5:
															i.label++, (n = s[1]), (s = [0]);
															continue;

														case 7:
															(s = i.ops.pop()), i.trys.pop();
															continue;

														default:
															if (
																!((o = i.trys),
																(o = o.length > 0 && o[o.length - 1]) || (6 !== s[0] && 2 !== s[0]))
															) {
																i = 0;
																continue;
															}

															if (3 === s[0] && (!o || (s[1] > o[0] && s[1] < o[3]))) {
																i.label = s[1];
																break;
															}

															if (6 === s[0] && i.label < o[1]) {
																(i.label = o[1]), (o = s);
																break;
															}

															if (o && i.label < o[2]) {
																(i.label = o[2]), i.ops.push(s);
																break;
															}

															o[2] && i.ops.pop(), i.trys.pop();
															continue;
													}

													s = e.call(t, i);
												} catch (t) {
													(s = [6, t]), (n = 0);
												} finally {
													r = o = 0;
												}

											if (5 & s[0]) throw s[1];
											return {
												value: s[0] ? s[1] : void 0,
												done: !0
											};
										})([s, a]);
									};
								}
							},
						c =
							(this && this.__importDefault) ||
							function (t) {
								return t && t.__esModule
									? t
									: {
											default: t
									  };
							};

					Object.defineProperty(e, '__esModule', {
						value: !0
					});

					var p = i(r(7501)),
						f = c(r(4078)),
						l = c(r(9669)),
						h = c(r(3142)),
						d = c(r(4150)),
						y = (function () {
							function t(t, e) {
								(this.username = t.username),
									(this.key = t.key),
									(this.url = t.url),
									(this.timeout = t.timeout),
									(this.headers = t.headers || {}),
									(this.formDataBuilder = new d.default(e)),
									(this.maxBodyLength = 25e6);
							}

							return (
								(t.prototype.request = function (t, e, r) {
									var o, s, i;
									return a(this, void 0, void 0, function () {
										var a, c, d, y, v, m, b, g, _;

										return u(this, function (u) {
											switch (u.label) {
												case 0:
													(a = n({}, r)),
														(c = p.encode(''.concat(this.username, ':').concat(this.key))),
														(d = a.headers ? a.headers : {}),
														(y = n(
															n(
																{
																	Authorization: 'Basic '.concat(c)
																},
																this.headers
															),
															d
														)),
														null == a || delete a.headers,
														(v = n({}, a)),
														(null == a ? void 0 : a.query) &&
															Object.getOwnPropertyNames(null == a ? void 0 : a.query).length > 0 &&
															((v.params = new URLSearchParams(a.query)), delete v.query),
														(null == a ? void 0 : a.body) &&
															((m = null == a ? void 0 : a.body), (v.data = m), delete v.body),
														(u.label = 1);

												case 1:
													return (
														u.trys.push([1, 3, , 4]),
														[
															4,
															l.default.request(
																n(
																	n(
																		{
																			method: t.toLocaleUpperCase(),
																			timeout: this.timeout,
																			url: (0, f.default)(this.url, e),
																			headers: y
																		},
																		v
																	),
																	{
																		maxBodyLength: this.maxBodyLength
																	}
																)
															)
														]
													);

												case 2:
													return (b = u.sent()), [3, 4];

												case 3:
													throw (
														((g = u.sent()),
														(_ = g),
														new h.default({
															status:
																(null === (o = null == _ ? void 0 : _.response) || void 0 === o
																	? void 0
																	: o.status) || 400,
															statusText:
																(null === (s = null == _ ? void 0 : _.response) || void 0 === s
																	? void 0
																	: s.statusText) || _.code,
															body:
																(null === (i = null == _ ? void 0 : _.response) || void 0 === i
																	? void 0
																	: i.data) || _.message
														}))
													);

												case 4:
													return [4, this.getResponseBody(b)];

												case 5:
													return [2, u.sent()];
											}
										});
									});
								}),
								(t.prototype.getResponseBody = function (t) {
									return a(this, void 0, void 0, function () {
										var e;
										return u(this, function (r) {
											if (
												((e = {
													body: {},
													status: null == t ? void 0 : t.status
												}),
												'string' == typeof t.data)
											) {
												if ('Mailgun Magnificent API' === t.data)
													throw new h.default({
														status: 400,
														statusText: 'Incorrect url',
														body: t.data
													});
												e.body = {
													message: t.data
												};
											} else e.body = t.data;

											return [2, e];
										});
									});
								}),
								(t.prototype.query = function (t, e, r, o) {
									return this.request(
										t,
										e,
										n(
											{
												query: r
											},
											o
										)
									);
								}),
								(t.prototype.command = function (t, e, r, o, s) {
									void 0 === s && (s = !0);
									var i = {};
									s &&
										(i = {
											'Content-Type': 'application/x-www-form-urlencoded'
										});
									var a = n(
										n(n({}, i), {
											body: r
										}),
										o
									);
									return this.request(t, e, a);
								}),
								(t.prototype.get = function (t, e, r) {
									return this.query('get', t, e, r);
								}),
								(t.prototype.post = function (t, e, r) {
									return this.command('post', t, e, r);
								}),
								(t.prototype.postWithFD = function (t, e) {
									var r = this.formDataBuilder.createFormData(e);
									return this.command(
										'post',
										t,
										r,
										{
											headers: {
												'Content-Type': 'multipart/form-data'
											}
										},
										!1
									);
								}),
								(t.prototype.putWithFD = function (t, e) {
									var r = this.formDataBuilder.createFormData(e);
									return this.command(
										'put',
										t,
										r,
										{
											headers: {
												'Content-Type': 'multipart/form-data'
											}
										},
										!1
									);
								}),
								(t.prototype.patchWithFD = function (t, e) {
									var r = this.formDataBuilder.createFormData(e);
									return this.command(
										'patch',
										t,
										r,
										{
											headers: {
												'Content-Type': 'multipart/form-data'
											}
										},
										!1
									);
								}),
								(t.prototype.put = function (t, e, r) {
									return this.command('put', t, e, r);
								}),
								(t.prototype.delete = function (t, e) {
									return this.command('delete', t, e);
								}),
								t
							);
						})();

					e.default = y;
				},
				5277: (t, e) => {
					'use strict';

					Object.defineProperty(e, '__esModule', {
						value: !0
					});

					var r = (function () {
						function t(t) {
							this.request = t;
						}

						return (
							(t.prototype.list = function (t) {
								return this.request.get('/v3/routes', t).then(function (t) {
									return t.body.items;
								});
							}),
							(t.prototype.get = function (t) {
								return this.request.get('/v3/routes/'.concat(t)).then(function (t) {
									return t.body.route;
								});
							}),
							(t.prototype.create = function (t) {
								return this.request.postWithFD('/v3/routes', t).then(function (t) {
									return t.body.route;
								});
							}),
							(t.prototype.update = function (t, e) {
								return this.request.putWithFD('/v3/routes/'.concat(t), e).then(function (t) {
									return t.body;
								});
							}),
							(t.prototype.destroy = function (t) {
								return this.request.delete('/v3/routes/'.concat(t)).then(function (t) {
									return t.body;
								});
							}),
							t
						);
					})();

					e.default = r;
				},
				3747: function (t, e, r) {
					'use strict';

					var n =
							(this && this.__assign) ||
							function () {
								return (
									(n =
										Object.assign ||
										function (t) {
											for (var e, r = 1, n = arguments.length; r < n; r++)
												for (var o in (e = arguments[r]))
													Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);

											return t;
										}),
									n.apply(this, arguments)
								);
							},
						o =
							(this && this.__spreadArray) ||
							function (t, e, r) {
								if (r || 2 === arguments.length)
									for (var n, o = 0, s = e.length; o < s; o++)
										(!n && o in e) ||
											(n || (n = Array.prototype.slice.call(e, 0, o)), (n[o] = e[o]));
								return t.concat(n || Array.prototype.slice.call(e));
							},
						s =
							(this && this.__importDefault) ||
							function (t) {
								return t && t.__esModule
									? t
									: {
											default: t
									  };
							};

					Object.defineProperty(e, '__esModule', {
						value: !0
					});

					var i = s(r(4078)),
						a = function (t) {
							(this.start = new Date(t.start)),
								(this.end = new Date(t.end)),
								(this.resolution = t.resolution),
								(this.stats = t.stats.map(function (t) {
									var e = n({}, t);
									return (e.time = new Date(t.time)), e;
								}));
						},
						u = (function () {
							function t(t) {
								this.request = t;
							}

							return (
								(t.prototype.prepareSearchParams = function (t) {
									var e = [];
									return (
										'object' == typeof t &&
											Object.keys(t).length &&
											(e = Object.entries(t).reduce(function (t, e) {
												var r = e[0],
													n = e[1];

												if (Array.isArray(n) && n.length) {
													var s = n.map(function (t) {
														return [r, t];
													});
													return o(o([], t, !0), s, !0);
												}

												return t.push([r, n]), t;
											}, [])),
										e
									);
								}),
								(t.prototype._parseStats = function (t) {
									return new a(t.body);
								}),
								(t.prototype.getDomain = function (t, e) {
									var r = this.prepareSearchParams(e);
									return this.request
										.get((0, i.default)('/v3', t, 'stats/total'), r)
										.then(this._parseStats);
								}),
								(t.prototype.getAccount = function (t) {
									var e = this.prepareSearchParams(t);
									return this.request.get('/v3/stats/total', e).then(this._parseStats);
								}),
								t
							);
						})();

					e.default = u;
				},
				4778: function (t, e, r) {
					'use strict';

					var n,
						o =
							(this && this.__extends) ||
							((n = function (t, e) {
								return (
									(n =
										Object.setPrototypeOf ||
										({
											__proto__: []
										} instanceof Array &&
											function (t, e) {
												t.__proto__ = e;
											}) ||
										function (t, e) {
											for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
										}),
									n(t, e)
								);
							}),
							function (t, e) {
								if ('function' != typeof e && null !== e)
									throw new TypeError(
										'Class extends value ' + String(e) + ' is not a constructor or null'
									);

								function r() {
									this.constructor = t;
								}

								n(t, e),
									(t.prototype =
										null === e ? Object.create(e) : ((r.prototype = e.prototype), new r()));
							}),
						s =
							(this && this.__spreadArray) ||
							function (t, e, r) {
								if (r || 2 === arguments.length)
									for (var n, o = 0, s = e.length; o < s; o++)
										(!n && o in e) ||
											(n || (n = Array.prototype.slice.call(e, 0, o)), (n[o] = e[o]));
								return t.concat(n || Array.prototype.slice.call(e));
							},
						i =
							(this && this.__importDefault) ||
							function (t) {
								return t && t.__esModule
									? t
									: {
											default: t
									  };
							};

					Object.defineProperty(e, '__esModule', {
						value: !0
					}),
						(e.WhiteList = e.Unsubscribe = e.Complaint = e.Bounce = e.Suppression = void 0);

					var a = i(r(4078)),
						u = r(3990),
						c = i(r(3142)),
						p = {
							headers: {
								'Content-Type': 'application/json'
							}
						},
						f = function (t) {
							this.type = t;
						};

					e.Suppression = f;

					var l = (function (t) {
						function e(e) {
							var r = t.call(this, u.SuppressionModels.BOUNCES) || this;
							return (
								(r.address = e.address),
								(r.code = +e.code),
								(r.error = e.error),
								(r.created_at = new Date(e.created_at)),
								r
							);
						}

						return o(e, t), e;
					})(f);

					e.Bounce = l;

					var h = (function (t) {
						function e(e) {
							var r = t.call(this, u.SuppressionModels.COMPLAINTS) || this;
							return (r.address = e.address), (r.created_at = new Date(e.created_at)), r;
						}

						return o(e, t), e;
					})(f);

					e.Complaint = h;

					var d = (function (t) {
						function e(e) {
							var r = t.call(this, u.SuppressionModels.UNSUBSCRIBES) || this;
							return (
								(r.address = e.address),
								(r.tags = e.tags),
								(r.created_at = new Date(e.created_at)),
								r
							);
						}

						return o(e, t), e;
					})(f);

					e.Unsubscribe = d;

					var y = (function (t) {
						function e(e) {
							var r = t.call(this, u.SuppressionModels.WHITELISTS) || this;
							return (
								(r.value = e.value), (r.reason = e.reason), (r.createdAt = new Date(e.createdAt)), r
							);
						}

						return o(e, t), e;
					})(f);

					e.WhiteList = y;

					var v = (function () {
						function t(t) {
							(this.request = t),
								(this.models = new Map()),
								this.models.set('bounces', l),
								this.models.set('complaints', h),
								this.models.set('unsubscribes', d),
								this.models.set('whitelists', y);
						}

						return (
							(t.prototype._parsePage = function (t, e) {
								var r = new URL(e).searchParams;
								return {
									id: t,
									page: r.has('page') ? r.get('page') : void 0,
									address: r.has('address') ? r.get('address') : void 0,
									url: e
								};
							}),
							(t.prototype._parsePageLinks = function (t) {
								var e = this;
								return Object.entries(t.body.paging).reduce(function (t, r) {
									var n = r[0],
										o = r[1];
									return (t[n] = e._parsePage(n, o)), t;
								}, {});
							}),
							(t.prototype._parseList = function (t, e) {
								var r = {};
								return (
									(r.items = t.body.items.map(function (t) {
										return new e(t);
									})),
									(r.pages = this._parsePageLinks(t)),
									r
								);
							}),
							(t.prototype._parseItem = function (t, e) {
								return new e(t);
							}),
							(t.prototype.createWhiteList = function (t, e) {
								if (Array.isArray(e))
									throw new c.default({
										status: 400,
										statusText: 'Data property should be an object',
										body: {
											message:
												"Whitelist's creation process does not support multiple creations. Data property should be an object"
										}
									});
								return this.request
									.postWithFD((0, a.default)('v3', t, 'whitelists'), e)
									.then(this.prepareResponse);
							}),
							(t.prototype.checkType = function (t) {
								if (!this.models.has(t))
									throw new c.default({
										status: 400,
										statusText: 'Unknown type value',
										body: {
											message:
												'Type may be only one of [bounces, complaints, unsubscribes, whitelists]'
										}
									});
							}),
							(t.prototype.prepareResponse = function (t) {
								return {
									message: t.body.message,
									type: t.body.type || '',
									value: t.body.value || '',
									status: t.status
								};
							}),
							(t.prototype.list = function (t, e, r) {
								var n = this;
								this.checkType(e);
								var o = this.models.get(e);
								return this.request.get((0, a.default)('v3', t, e), r).then(function (t) {
									return n._parseList(t, o);
								});
							}),
							(t.prototype.get = function (t, e, r) {
								var n = this;
								this.checkType(e);
								var o = this.models.get(e);
								return this.request
									.get((0, a.default)('v3', t, e, encodeURIComponent(r)))
									.then(function (t) {
										return n._parseItem(t.body, o);
									});
							}),
							(t.prototype.create = function (t, e, r) {
								var n;
								return (
									this.checkType(e),
									'whitelists' === e
										? this.createWhiteList(t, r)
										: ((n = Array.isArray(r) ? s([], r, !0) : [r]),
										  this.request
												.post((0, a.default)('v3', t, e), JSON.stringify(n), p)
												.then(this.prepareResponse))
								);
							}),
							(t.prototype.destroy = function (t, e, r) {
								return (
									this.checkType(e),
									this.request
										.delete((0, a.default)('v3', t, e, encodeURIComponent(r)))
										.then(function (t) {
											return {
												message: t.body.message,
												value: t.body.value || '',
												address: t.body.address || '',
												status: t.status
											};
										})
								);
							}),
							t
						);
					})();

					(e.default = v), (t.exports = v);
				},
				9721: function (t, e) {
					'use strict';

					var r =
							(this && this.__awaiter) ||
							function (t, e, r, n) {
								return new (r || (r = Promise))(function (o, s) {
									function i(t) {
										try {
											u(n.next(t));
										} catch (t) {
											s(t);
										}
									}

									function a(t) {
										try {
											u(n.throw(t));
										} catch (t) {
											s(t);
										}
									}

									function u(t) {
										var e;
										t.done
											? o(t.value)
											: ((e = t.value),
											  e instanceof r
													? e
													: new r(function (t) {
															t(e);
													  })).then(i, a);
									}

									u((n = n.apply(t, e || [])).next());
								});
							},
						n =
							(this && this.__generator) ||
							function (t, e) {
								var r,
									n,
									o,
									s,
									i = {
										label: 0,
										sent: function () {
											if (1 & o[0]) throw o[1];
											return o[1];
										},
										trys: [],
										ops: []
									};
								return (
									(s = {
										next: a(0),
										throw: a(1),
										return: a(2)
									}),
									'function' == typeof Symbol &&
										(s[Symbol.iterator] = function () {
											return this;
										}),
									s
								);

								function a(s) {
									return function (a) {
										return (function (s) {
											if (r) throw new TypeError('Generator is already executing.');

											for (; i; )
												try {
													if (
														((r = 1),
														n &&
															(o =
																2 & s[0]
																	? n.return
																	: s[0]
																	? n.throw || ((o = n.return) && o.call(n), 0)
																	: n.next) &&
															!(o = o.call(n, s[1])).done)
													)
														return o;

													switch (((n = 0), o && (s = [2 & s[0], o.value]), s[0])) {
														case 0:
														case 1:
															o = s;
															break;

														case 4:
															return (
																i.label++,
																{
																	value: s[1],
																	done: !1
																}
															);

														case 5:
															i.label++, (n = s[1]), (s = [0]);
															continue;

														case 7:
															(s = i.ops.pop()), i.trys.pop();
															continue;

														default:
															if (
																!((o = i.trys),
																(o = o.length > 0 && o[o.length - 1]) || (6 !== s[0] && 2 !== s[0]))
															) {
																i = 0;
																continue;
															}

															if (3 === s[0] && (!o || (s[1] > o[0] && s[1] < o[3]))) {
																i.label = s[1];
																break;
															}

															if (6 === s[0] && i.label < o[1]) {
																(i.label = o[1]), (o = s);
																break;
															}

															if (o && i.label < o[2]) {
																(i.label = o[2]), i.ops.push(s);
																break;
															}

															o[2] && i.ops.pop(), i.trys.pop();
															continue;
													}

													s = e.call(t, i);
												} catch (t) {
													(s = [6, t]), (n = 0);
												} finally {
													r = o = 0;
												}

											if (5 & s[0]) throw s[1];
											return {
												value: s[0] ? s[1] : void 0,
												done: !0
											};
										})([s, a]);
									};
								}
							};

					Object.defineProperty(e, '__esModule', {
						value: !0
					});

					var o = (function () {
						function t(t, e) {
							(this.request = t), (this.multipleValidation = e);
						}

						return (
							(t.prototype.get = function (t) {
								return r(this, void 0, void 0, function () {
									var e;
									return n(this, function (r) {
										switch (r.label) {
											case 0:
												return (
													(e = {
														address: t
													}),
													[4, this.request.get('/v4/address/validate', e)]
												);

											case 1:
												return [2, r.sent().body];
										}
									});
								});
							}),
							t
						);
					})();

					e.default = o;
				},
				4750: function (t, e, r) {
					'use strict';

					var n =
						(this && this.__importDefault) ||
						function (t) {
							return t && t.__esModule
								? t
								: {
										default: t
								  };
						};

					Object.defineProperty(e, '__esModule', {
						value: !0
					});

					var o = n(r(4078)),
						s = function (t, e) {
							(this.id = t), (this.url = e);
						},
						i = (function () {
							function t(t) {
								this.request = t;
							}

							return (
								(t.prototype._parseWebhookList = function (t) {
									return t.body.webhooks;
								}),
								(t.prototype._parseWebhookWithID = function (t) {
									return function (e) {
										var r,
											n =
												null === (r = null == e ? void 0 : e.body) || void 0 === r
													? void 0
													: r.webhook,
											o = null == n ? void 0 : n.url;
										return (
											o ||
												(o = (null == n ? void 0 : n.urls) && n.urls.length ? n.urls[0] : void 0),
											new s(t, o)
										);
									};
								}),
								(t.prototype._parseWebhookTest = function (t) {
									return {
										code: t.body.code,
										message: t.body.message
									};
								}),
								(t.prototype.list = function (t, e) {
									return this.request
										.get((0, o.default)('/v3/domains', t, 'webhooks'), e)
										.then(this._parseWebhookList);
								}),
								(t.prototype.get = function (t, e) {
									return this.request
										.get((0, o.default)('/v3/domains', t, 'webhooks', e))
										.then(this._parseWebhookWithID(e));
								}),
								(t.prototype.create = function (t, e, r, n) {
									return (
										void 0 === n && (n = !1),
										n
											? this.request
													.putWithFD((0, o.default)('/v3/domains', t, 'webhooks', e, 'test'), {
														url: r
													})
													.then(this._parseWebhookTest)
											: this.request
													.postWithFD((0, o.default)('/v3/domains', t, 'webhooks'), {
														id: e,
														url: r
													})
													.then(this._parseWebhookWithID(e))
									);
								}),
								(t.prototype.update = function (t, e, r) {
									return this.request
										.putWithFD((0, o.default)('/v3/domains', t, 'webhooks', e), {
											url: r
										})
										.then(this._parseWebhookWithID(e));
								}),
								(t.prototype.destroy = function (t, e) {
									return this.request
										.delete((0, o.default)('/v3/domains', t, 'webhooks', e))
										.then(this._parseWebhookWithID(e));
								}),
								t
							);
						})();

					e.default = i;
				},
				7501: function (t, e, r) {
					var n;
					(t = r.nmd(t)),
						(function (o) {
							var s = e,
								i = (t && t.exports, 'object' == typeof r.g && r.g);
							i.global !== i && i.window;

							var a = function (t) {
								this.message = t;
							};

							(a.prototype = new Error()).name = 'InvalidCharacterError';

							var u = function (t) {
									throw new a(t);
								},
								c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
								p = /[\t\n\f\r ]/g,
								f = {
									encode: function (t) {
										(t = String(t)),
											/[^\0-\xFF]/.test(t) &&
												u(
													'The string to be encoded contains characters outside of the Latin1 range.'
												);

										for (
											var e, r, n, o, s = t.length % 3, i = '', a = -1, p = t.length - s;
											++a < p;

										)
											(e = t.charCodeAt(a) << 16),
												(r = t.charCodeAt(++a) << 8),
												(n = t.charCodeAt(++a)),
												(i +=
													c.charAt(((o = e + r + n) >> 18) & 63) +
													c.charAt((o >> 12) & 63) +
													c.charAt((o >> 6) & 63) +
													c.charAt(63 & o));

										return (
											2 == s
												? ((e = t.charCodeAt(a) << 8),
												  (r = t.charCodeAt(++a)),
												  (i +=
														c.charAt((o = e + r) >> 10) +
														c.charAt((o >> 4) & 63) +
														c.charAt((o << 2) & 63) +
														'='))
												: 1 == s &&
												  ((o = t.charCodeAt(a)),
												  (i += c.charAt(o >> 2) + c.charAt((o << 4) & 63) + '==')),
											i
										);
									},
									decode: function (t) {
										var e = (t = String(t).replace(p, '')).length;
										e % 4 == 0 && (e = (t = t.replace(/==?$/, '')).length),
											(e % 4 == 1 || /[^+a-zA-Z0-9/]/.test(t)) &&
												u('Invalid character: the string to be decoded is not correctly encoded.');

										for (var r, n, o = 0, s = '', i = -1; ++i < e; )
											(n = c.indexOf(t.charAt(i))),
												(r = o % 4 ? 64 * r + n : n),
												o++ % 4 && (s += String.fromCharCode(255 & (r >> ((-2 * o) & 6))));

										return s;
									},
									version: '1.0.0'
								};

							void 0 ===
								(n = function () {
									return f;
								}.call(e, r, e, t)) || (t.exports = n);
						})();
				},
				4078: function (t, e, r) {
					var n, o, s;
					(s = function () {
						function t(t) {
							var e = [];
							if (0 === t.length) return '';
							if ('string' != typeof t[0])
								throw new TypeError('Url must be a string. Received ' + t[0]);

							if (t[0].match(/^[^/:]+:\/*$/) && t.length > 1) {
								var r = t.shift();
								t[0] = r + t[0];
							}

							t[0].match(/^file:\/\/\//)
								? (t[0] = t[0].replace(/^([^/:]+):\/*/, '$1:///'))
								: (t[0] = t[0].replace(/^([^/:]+):\/*/, '$1://'));

							for (var n = 0; n < t.length; n++) {
								var o = t[n];
								if ('string' != typeof o)
									throw new TypeError('Url must be a string. Received ' + o);
								'' !== o &&
									(n > 0 && (o = o.replace(/^[\/]+/, '')),
									(o = n < t.length - 1 ? o.replace(/[\/]+$/, '') : o.replace(/[\/]+$/, '/')),
									e.push(o));
							}

							var s = e.join('/'),
								i = (s = s.replace(/\/(\?|&|#[^!])/g, '$1')).split('?');
							return (s = i.shift() + (i.length > 0 ? '?' : '') + i.join('&'));
						}

						return function () {
							return t('object' == typeof arguments[0] ? arguments[0] : [].slice.call(arguments));
						};
					}),
						t.exports
							? (t.exports = s())
							: void 0 === (o = 'function' == typeof (n = s) ? n.call(e, r, e, t) : n) ||
							  (t.exports = o);
				}
			},
			e = {};

		function r(n) {
			var o = e[n];
			if (void 0 !== o) return o.exports;
			var s = (e[n] = {
				id: n,
				loaded: !1,
				exports: {}
			});
			return t[n].call(s.exports, s, s.exports, r), (s.loaded = !0), s.exports;
		}

		return (
			(r.g = (function () {
				if ('object' == typeof globalThis) return globalThis;

				try {
					return this || new Function('return this')();
				} catch (t) {
					if ('object' == typeof window) return window;
				}
			})()),
			(r.nmd = (t) => ((t.paths = []), t.children || (t.children = []), t)),
			r(6175)
		);
	})());
