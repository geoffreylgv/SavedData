function init_hornet_paths(ctxpath, fwkpath, yuipath, themespath) {

window["hornet_config"] = function() {

	FWK_BASE = (fwkpath.match(/^http(s)?:.*/) ? fwkpath : ctxpath + fwkpath) + '/',
	THEME_BASE = (themespath.match(/^http(s)?:.*/) ? themespath : ctxpath + themespath) + '/',

	YUI3_VERSION = '3.8.1',
	YUI3_BASE = (yuipath.match(/^http(s)?:.*/) ? yuipath : ctxpath + yuipath) + '/',

	GALLERY_VERSION = '2012.12.12-21-11',
	GALLERY_BUILD = '/',
	GALLERY_BASE = YUI3_BASE + '../../gallery/',

	YUI2_VERSION = '2.9.0',
	YUI2_BASE = YUI3_BASE + '../../2in3/',

	YUI_CONF = { version: YUI3_VERSION,
					filter: 'min',
					debug: false,
					lang: 'fr',
					base: YUI3_BASE,
					groups: {},
					patterns: {} },
	groups = YUI_CONF.groups,

	fwkUpdate = function(base, fwk) {
						groups.fwk.base = (base || FWK_BASE);
					},
	themeUpdate = function(base, theme) {
						groups.theme.base = (base || THEME_BASE);
					},
	yui2Update = function(base, yui2) {
						var root = (yui2 || YUI2_VERSION);
						groups.yui2.root = root;
						groups.yui2.base = (base || YUI2_BASE) + root + '/';
					},
	galleryUpdate = function(base, gallery) {
						var root = (gallery || GALLERY_VERSION) + GALLERY_BUILD;
						groups.gallery.root = root;
						groups.gallery.base = (base || GALLERY_BASE) + root;
					};


	groups.theme = {
		ext: false,
		combine: false,
		patterns: {
			'hornet-skin-': {
				configFn: function(me) {
					me.type = 'css';
					me.path = me.path.replace(/\.js/, '.css');
				}
			}
		}
	};

	groups.fwk = {
		ext: false,
		combine: false,
		patterns: { 'hornet-': { },
					'lang/hornet-': {} }
	};

	groups.gallery = {
		ext: false,
		combine: false,
		patterns: { 'gallery-': { },
					'lang/gallery-': {},
					'gallerycss-': { type: 'css' } }
	};

	groups.yui2 = {
		ext: false,
		combine: false,
		patterns: {
			'yui2-': {
				configFn: function(me) {
					if (/-skin|reset|fonts|grids|base/.test(me.name)) {
						me.type = 'css';
						me.path = me.path.replace(/\.js/, '.css');
						me.path = me.path.replace(/\/yui2-skin/,
										 '/assets/skins/sam/yui2-skin');
					}
				}
			}
		}
	};

	themeUpdate();
	fwkUpdate();
	galleryUpdate();
	yui2Update();

	return YUI_CONF;
};


}

var hornet = function(config, newInstance) {
	var _config = config || hornet.getDefaultConfig();

	if (!(!!hornet._instance && (hornet._instance instanceof YUI)) || !!newInstance) {
		hornet._instance = YUI(_config);
	} else if(!!config){
		hornet._instance.applyConfig(config);
	}
	return hornet._instance;
};

hornet.getDefaultConfig = function(){
	return hornet_config();
};

