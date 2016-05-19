/**
 * @description  酒店的公用模块
 * @author cwj
 * @edit 2015-04-16
 * @modify bianwangyang
 * @description 增加了存储事件相关的处理方法，数组填充，字体裁剪
 */
define(function(require, exports, module){
	var $ = require('zepto');
	var dialog = require('dialog');
	var storage = require('TN_cache');
	var template = require('template');

	/**
	 * 工具类
	 * @type {Object}
	 */
	var utils = {
		alert: function(msg) {
			dialog({
				type: 'info',
				message: msg
			});
		},
		historypush: function(id, main) {
			var self = this;
			
			// 添加history
			window.history.replaceState({id: id, main: main}, '', '');
			window.history.pushState({}, '', '#'+id);

			self.showPage($('#'+id));
			self.hidePage($('#'+main));
            $(window).scrollTop(0);
		},
		historypop: function() {
			var self = this;

			$(window).bind('popstate', function(e) {
				if(e.state && e.state.id) {
					self.showPage($('#'+e.state.main));
					self.hidePage($('#'+e.state.id));
                    $(window).scrollTop(0);
				}
			});
		},
		/**
		 * 显示页面
		 * @return {[type]}
		 */
		showPage: function(node) {
			$(node).removeClass('hide');
		},
		/**
		 * 隐藏页面
		 * @param  {[type]}
		 * @return {[type]}
		 */
		hidePage: function(node) {
			$(node).addClass('hide');
		},
		// 换成的对象
		cache: {
			KeywordsCache: 'M_Hotel_default_index_keywords',
			HotelSearchCache: 'M_hotel_default_index_search',
			ListKeywordsCache: 'M_hotel_default_list_keywords',
			ListImagesCache: 'M_hotel_default_list_images'
		},
		/**
		 * 定位信息
		 * @param  {[type]} success [description]
		 * @param  {[type]} error   [description]
		 * @return {[type]}         [description]
		 */
		getGeo: function(success, error) {
			if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(successFn, errorFn);
			} else {
				if(error && typeof error == 'function') {
					utils.alert('您的浏览器不支持定位功能');
				}
			}

			function successFn(result) {
				if(success && typeof success == 'function') {
					success(result);
				}
			}

			function errorFn(result) {
				if(error && typeof error == 'function') {
					error(result);
				}
				switch(result.code) {
					case result.PERMISSION_DENIED:
						utils.alert('用户不允许地理定位');
						break;
					case result.POSITION_UNAVAILABLE:
						utils.alert('无法获取当前位置');
						break;
					case result.TIMEOUT:
						utils.alert('定位超时');
						break;
					case result.UNKNOWN_ERROR:
						utils.alert('发生未知错误');
						break;
				}
			}
		},
		getCityByCode: function(code) {
			var self = this;

			var result = {};
			if(!code) { return result; }

			if(!self.cities) {
				$.ajax({
					url: '/api/hotel/city/getHotelCityList',
					type: 'GET',
					async: false,
					dataType: 'JSON',
					success: function(data) {
						// 循环获取城市信息
						data = JSON.parse(data);
						self.cities = (data && data.data && data.data.indexCityList) || {};
					}
				});
			}

			var data = self.cities;
			for(var key in data) {
				var val = data[key];

				var filter = val.filter(function(obj) {
					return code == obj.cityCode;
				});
				if(filter.length) {
					result = filter[0];
					return result;
				}
			}

			return result;
		},
		/**
		 * 获取template渲染后的数据
		 * @param name template名称
		 * @param data 渲染的数据
		 * @param iscache 是否需要缓存页面
		 */
		getTpl: function(name, data, iscache) {
			if(!name) {
			    return '';
			}

			var self = this,
				templates = self.templates;

			// 获取template
			var result =  iscache ? templates[name] : '';
			if(!result) {
			    var base = window.m2015Config.cdnHost + '/site/m2015/js/modules/hotel/tpl/';
                var stamp = '2016012701';
                if(window.m2015Config && window.m2015Config.timeStamp) {
                    stamp = window.m2015Config.timeStamp;  //系统刷的版本号
                }
			    $.ajax({
			        url: base + name + '.html?v='+ stamp,
			        type: 'GET',
			        async: false,
			        success: function(tpl) {
			            result = template.compile(tpl)(data);
			        }
			    });
			}
			iscache && self.setTpl(name, result);
			return result;
		},
		// 缓存template
		templates: {},
		/**
		* 缓存template至template对象中
		* @param str template
		*/
		setTpl: function(name, str) {
			if(!name) {
			    return '';
			}

			var self = this,
				templates = self.templates;

			templates[name] = str;
		},
		encode_base64: function(data){
			return window.btoa(JSON.stringify(data));
		},
		decode_base64: function(data){
			return JSON.parse(window.atob(data));
		},
        /**
         * 将在页面中的临时值存储到sessionStorage中
         * @param which string,要操作哪一个对象
         * @param key option,要存储或者获取的键值
         * @param value option,要存储的值
         * @returns {*} 返回value值或者整个对象
         */
        handleSessionStorage: function(which,key,value,access){
            //var hotel_cache = cache.sessioncache.get("hotel_cache");
            var access = access||"read";
            var hotel_cache = storage.sessioncache.get(which);
            if(hotel_cache==null&&access=="read") {//没有存储过日期选择信息，并且不是存储信息
                return null;
            }
            if(key == undefined&&access=="read") {
                return hotel_cache;
            }
            if(value===undefined&&access=="read"){
                return hotel_cache[key];
            }
            if(hotel_cache===null) {
                hotel_cache = {};
            }
            if(value===null) {
                storage.sessioncache.set(which,key);
            } else {
                hotel_cache[key]=value;
                storage.sessioncache.set(which,hotel_cache);
            }
        },
        /**
         * 将在页面中的临时值存储到localStorage中
         * @param which string,要操作哪一个对象
         * @param key option,要存储或者获取的键值
         * @param value option,要存储的值
         * @returns {*} undefined
         */
        handleLocalStorage: function(which,key,value,access){
            var timeout = +new Date()+7*24*60*60*1000,//过期时间为7天
                access = access||"read";
            var hotel_cache = storage.localcache.get(which);
            if(hotel_cache==null&&access=="read") {//没有存储过日期选择信息，并且不是存储信息
                return null;
            }
            if(key == undefined&&access=="read") {
                return hotel_cache;
            }
            if(value===undefined&&access=="read"){
                return hotel_cache[key];
            }
            if(hotel_cache===null) {
                hotel_cache = {};
            }
            if(value===null) {
                storage.localcache.set(which,key);
            } else {
                hotel_cache[key]=value;
                storage.localcache.set(which,hotel_cache);
            }
        },
        /**
         * 给arr数组补齐成num的整数倍
         * @param arr 需要补齐的数组
         * @param num 数组元素的个数补齐为num的整数倍
         * @public
         */
        padArray: function(arr,num) {
            var remain;
            if(arr&&arr.length&&(remain=num-arr.length%num)!=num) {
                for(var tmpi=0; tmpi<remain; tmpi++) {
                    arr.push({});
                }
            }
        },
        localStorage: {
            getItem: function (key) {
                return localStorage.getItem(key);
            },
            setItem: function (key, value) {
                console.log("utils,setItem:" + key + "," + value);
                localStorage.setItem(key, value);
                //存储事件--在本窗口触发
                var se = document.createEvent("StorageEvent");
                se.initStorageEvent('storage', false, false, key, null, value);
                window.dispatchEvent(se);
            },
            removeItem: function (key) {
                localStorage.removeItem(key);
            },
            clear: function () {
                localStorage.clear();
            }
        },
        wordFilter: function(word) {
            return word.length > 10 ? word.substring(0, 9) + "…" : word;
        },
        getKeywords: function() {
            var keyword_suggest = storage.localcache.get("hotel-keyword-suggest"),
                keyword_user = storage.localcache.get("hotel-keyword-user"),
                keyword = '';
            if(keyword_suggest&&keyword_suggest.hasOwnProperty('name')) {
                keyword = keyword_suggest['name'];
            } else if(keyword_user) {
                keyword = keyword_user;
            }
            return keyword;
        }
	};

	/**
	 * 获取和设置本地存储的方法
	 * @param  {[type]} utils.cache [description]
	 * @return {[type]}             [description]
	 */
	if(utils.cache) {
		$.each(utils.cache, function(key, value) {
			utils['get'+key] = function() {
				return storage.localcache.get(utils.cache[key]);
			}

			utils['set'+key] = function(data) {
				storage.localcache.set(utils.cache[key], data, 1*24*60*60*1000);
			}
		})
	}

	module.exports = utils;
});
