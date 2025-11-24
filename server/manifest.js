const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.ClUQaBiU.js",app:"_app/immutable/entry/app.BtQikxIP.js",imports:["_app/immutable/entry/start.ClUQaBiU.js","_app/immutable/chunks/Bj8ubINB.js","_app/immutable/chunks/BNcx3LAd.js","_app/immutable/chunks/B7c6h4Q9.js","_app/immutable/entry/app.BtQikxIP.js","_app/immutable/chunks/BNcx3LAd.js","_app/immutable/chunks/CF1z4Vv1.js","_app/immutable/chunks/DlJmpeef.js","_app/immutable/chunks/B7c6h4Q9.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-DzO60eOK.js')),
			__memo(() => import('./chunks/1-DTA6NEer.js')),
			__memo(() => import('./chunks/2-DY_VvF1Q.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
