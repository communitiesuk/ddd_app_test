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
		client: {start:"_app/immutable/entry/start.Cb-559hA.js",app:"_app/immutable/entry/app.D5NpQP4t.js",imports:["_app/immutable/entry/start.Cb-559hA.js","_app/immutable/chunks/Dx7noS0G.js","_app/immutable/chunks/Bw2Ol33g.js","_app/immutable/chunks/Bw8atLgL.js","_app/immutable/entry/app.D5NpQP4t.js","_app/immutable/chunks/Bw2Ol33g.js","_app/immutable/chunks/DZbTqkiL.js","_app/immutable/chunks/F5Ul1txK.js","_app/immutable/chunks/Dg49y20t.js","_app/immutable/chunks/Bw8atLgL.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-CMF79ycU.js')),
			__memo(() => import('./chunks/1-BR13B_2R.js')),
			__memo(() => import('./chunks/2-DrxDhD22.js')),
			__memo(() => import('./chunks/3-CQTtnnqo.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api",
				pattern: /^\/api\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-UIbVjfc_.js'))
			},
			{
				id: "/form_approach",
				pattern: /^\/form_approach\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
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
