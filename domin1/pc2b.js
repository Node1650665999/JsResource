
//配置根路劲
requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '/Public/Js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        jquery: 'jquery',
        template: 'artTemplate',
        wangEditor : 'wangEditor'
    }
});

//index模块
define('Index',['jquery','template','paging','alert','url'],function($,template,Pg,p,url){
	//表单序列化
	$.fn.serializeObject = function()
	{
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};
	
	//查看图片插件
	$.fn.imgViewScroll = function(options){
		var config = {
			'width' : 800,   //轮播图宽度
			'height' : 500,  //轮播图高埗
			'time'   : 2000, //轮播时间建个
			'container' : '.mask', //容器名称,
			'from'  : 'prev'  // prev向左,next向右
		};
		$.extend(config, options);
		
		var nodeName = $(this).prop('nodeName');
		if(nodeName != 'IMG'){
			return;
		}
		
		//清空容器并显示
		$(config.container).empty().show();
		
		//轮播div
		var img = $(this).parent().find('img');
		var newImg = img.clone();
		var nums   = newImg.length;
		var imgBox = $('<div class="imgBox"></div>');
		var prev   = $('<span class="icon-angle-left"></span>');
		var next   = $('<span class="icon-angle-right"></span>');
		var iconBox  = $('<p class="iconBox"></p>');
		var close  = $('<span class="icon-remove-circle"></span');
		
		var str = '';
		for (var i=0; i<nums; i++) {
			str += '<span ></span>';
		}
		var listIcon = $(str);
		iconBox.append(listIcon);
		var imgCont = $('<div></div>');
		imgBox.html(imgCont);
		imgCont.html(newImg);
		imgBox.append(prev);
		imgBox.append(next);
		imgBox.append(iconBox);
		imgBox.append(close);
		imgBox.appendTo($(config.container));
		
		$('.imgBox img,.imgBox').css({
			'width' : config.width+'px',
			'height': config.height+'px'
		});
		imgBox.css({
			'overflow' : 'hidden',
			'margin'   : '0 auto',
			'z-index'  : 100,
			'position' : 'relative'
		});
		
		imgCont.css({
		'width' : config.width*nums+'px',
		'height': config.height+'px'
		});
		$('.imgBox img').css({
			'display' : 'inline-block'
		});
		prev.css({
			'font-size' : 80+'px',
			'left'      : 10+'px',
			'top'       : '50%',
			'position'  : 'absolute',
			'margin-top': '-40px'
		});
		next.css({
			'font-size' : 80+'px',
			'right'   : 10+'px',
			'top'  : '50%',
			'position' : 'absolute',
			'margin-top' : '-40px'
		});
		iconBox.css({
			'width' : '80%',
			'margin'   : '0 auto',
			'bottom'  : '20px',
			'position' : 'absolute',
			'left' : '50%',
			'text-align' : 'center',
			'margin-left' :'-40%'
		});
		listIcon.css({
			'width' : 15+'px',
			'height' : 15+'px',
			'border-radius' : 30+'px',
			'display' : 'inline-block',
			'background' : '#7E827D',
			'margin-left' : '10px'
		});
		close.css({
			'font-size' : config.height/6+'px',
			'right'   : '10px',
			'top'  : '10px',
			'position' : 'absolute',
			'color'  : '#D00707'
			
		});
		close.on('click',function(){
			$(config.container).hide().empty();
		});
		//轮播事件
		var i =1;
		$(listIcon[i-1]).addClass('current').siblings().removeClass('current');
		prev.on('click',function(){
			if(!imgCont.is(':animated')){
            	i++;
				if(i>nums){
					imgCont.animate({'margin-left':0});
					i=1;
					$(listIcon[i-1]).addClass('current').siblings().removeClass('current');
					return;
				}
				imgCont.stop(false,true).animate({  
                    'margin-left': '-='+config.width+'px'  //相对动画
                },  
                'slow');
                $(listIcon[i-1]).addClass('current').siblings().removeClass('current');
			}
		});
		
		next.on('click',function(){
			if(!imgCont.is(':animated')){
				i--;
				if(i<1){
					imgCont.animate({'margin-left':'-='+(nums-1)*config.width+'px'});
					i=5;
					$(listIcon[i-1]).addClass('current').siblings().removeClass('current');
					return;
				}
				imgCont.stop(false,true).animate({  
                    'margin-left': '+='+config.width+'px'  
                },  
                'slow');
                $(listIcon[i-1]).addClass('current').siblings().removeClass('current');
			}
		});
		
		listIcon.on('click',function(){
			var index = $(this).index();
			if(!$(this).is(':animated')){
				imgCont.clearQueue().animate({'margin-left':'-'+(index*config.width)+'px'});
				$(this).addClass('current').siblings().removeClass('current')
				i = index +1;
			}
		});
		
		//循环轮播
		var timer = setInterval(function(){
			config.from.click();
		},config.time);
		imgBox.hover(
		function(){
			clearInterval(timer);
		},
		function(){
			timer = setInterval(function(){
				prev.click();
			},config.time);
		});
		
		return $(this);   //支持链式调用
	}
	
	//模板引擎格式化函数
	template.helper('dataFormat', function (data, format) {
		if(format=='time'){
			if(data==0){
				return 0;
			}
			var time = new Date(parseInt(data)*1000);
			var y = time.getFullYear();
			var m = time.getMonth()+1;
			var d = time.getDate();
			var h = time.getHours();
			var mm = time.getMinutes();
			var s = time.getSeconds();
			return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
		}
		if(format=='str'){
			return '共'+data.length+'字';
		}
		if(format=='state' && data){
			var ddfk = [100];
			var ddfh = [200];
			var tkz  = [210];
			var ddyh = [300];
			var ebyh = [400];
			var jycg = [600, 611, 700, 701, 711, 872, 820, 801, 841, 855, 860];
			var cgjr = [815,832];
			var thz  = [610, 620, 630, 810, 811,710, 720, 730,  850, 851];
			var jygb = [110, 220, 410, 640, 740, 812, 814, 831, 852, 854, 871];
			var ddsh = [500, 510];
			var thjr = [800, 813, 830, 840, 853, 870];
			if(ddfk.indexOf(parseInt(data)) >-1) return '等待付款';
			if(ddfh.indexOf(parseInt(data)) >-1) return '等待发货';
			if(tkz.indexOf(parseInt(data))  >-1) return '退款中';
			if(ddyh.indexOf(parseInt(data)) >-1) return '等待验货';
			if(ebyh.indexOf(parseInt(data)) >-1) return '二宝验货中';
			if(jycg.indexOf(parseInt(data)) >-1) return '交易成功';
			if(cgjr.indexOf(parseInt(data)) >-1) return '交易成功-介入';  
			//老版后台的代码将815，832归为退货介入中，pc2b后台将832、815归为交易成功，前端详情中显示为《交易成功-介入》
			if(thz.indexOf(parseInt(data))  >-1) return '退货中';
			if(jygb.indexOf(parseInt(data)) >-1) return '交易关闭';
			if(ddsh.indexOf(parseInt(data)) >-1) return '等待收货';
			if(thjr.indexOf(parseInt(data)) >-1) return '退货-介入中';
		}
	});
	function add0(m){return m<10?'0'+m:m }
	
	
	//**********************通用模块的js****************************************
	var mod = {
		
		init     : function(){
			this.bindEvent();
		},		
		//初始化提交到服务端的数据
		initData : function(submitData, module,obj){
			var data = {};
			var whichPage = obj.attr('class');
			var extra     = JSON.parse(obj.attr('extra'));
			data.page 	  = 1;
			data.module    = module;
			data.path      = obj.attr('href');
			data.whichPage = whichPage;
			$.extend(data,extra,submitData);
			return data;
		},		
		//模版渲染
		tp : function(module, whichPage, mess){
			if(module=='goods'){
				if(whichPage == 'all' || whichPage == 'ds' || whichPage == 'zs' ||whichPage == 'ck' ||whichPage == 'del')	return template('goodsCommon',mess);
				if(whichPage == 'detail')	return template('goodsDetail',mess);
				if(whichPage == 'tag')	    return template('goodsTag',mess);
			}
			if(module=='order'){
				if(whichPage == 'all' || whichPage == 'jr' || whichPage == 'ddfk' || whichPage == 'ddfh' || whichPage == 'tkz'||whichPage == 'ddyh'||whichPage == '2byh'||whichPage == 'ddsh'||whichPage == 'cg'||whichPage == 'thz'||whichPage == 'jygb'){
					return template('orderCommon',mess);
				}
				if(whichPage == 'detail')	return template('orderDetail',mess);
			}
			if(module=='mct'){
				if(whichPage == 'all' || whichPage == 'wrz' || whichPage == 'yrz' || whichPage == 'shz' || whichPage == 'rzsb' || whichPage == 'fj' || whichPage == 'shgx'){
					return template('baoCommon',mess);
				} 
				if(whichPage == 'detail') return template('mctDetail',mess);
			}
			if(module=='user'){
				if(whichPage == 'all' || whichPage == 'fj' || whichPage == 'qy'){
					return template('userCommon',mess);
				} 
				if(whichPage == 'detail') return template('userDetail',mess);
			}
			if(module=='check'){
				if(whichPage == 'dsh') return template('dshCommon',mess);
				if(whichPage == 'dkx') return template('dkxCommon',mess);
				if(whichPage == 'dsj') return template('dsjCommon',mess);
				if(whichPage == 'ddb') return template('ddbCommon',mess);
				if(whichPage == 'dfh') return template('dfhCommon',mess);
				if(whichPage == 'dth') return template('dthCommon',mess);
				if(whichPage == 'yfh') return template('yfhCommon',mess);
				if(whichPage == 'yjq') return template('yjqCommon',mess);
				if(whichPage == 'yth') return template('ythCommon',mess);
				if(whichPage == 'ysj') return template('ysjCommon',mess);
				if(whichPage == 'ysjDetail') return template('ysjDetail',mess);
				if(whichPage == 'sjbb') return template('sjbbCommon',mess);
				if(whichPage == 'detail') return template('checkDetail',mess);
			}
			if(module=='account'){
				if(whichPage == 'tx') return template('txCommon',mess);
				if(whichPage == 'tk') return template('tkCommon',mess);
				if(whichPage == 'cz') return template('czCommon',mess);
				if(whichPage == 'txDetail') return template('txDetail',mess);
				if(whichPage == 'tkDetail') return template('tkDetail',mess);
				if(whichPage == 'czDetail') return template('czDetail',mess);
			}
			if(module=='market'){
				if(whichPage == 'window' || whichPage == 'subject') return template('winsubCommon',mess);
				if(whichPage == 'hotword') return template('hotWordCommon',mess);
				if(whichPage == 'picUpList') return template('picUpListCommon',mess);
			}
			if (module=='statis') {
				if(whichPage == 'search_list') return template('searchListCommon',mess);
				if(whichPage == 'userfeeds') return template('userfeedsCommon',mess);
				if(whichPage == 'mctfeeds') return template('mctfeedsCommon',mess);
			}
			if (module=='set') {
				if(whichPage == 'bankList') return template('bankListCommon',mess);
				if(whichPage == 'expressList') return template('expressListCommon',mess);
//				if(whichPage == 'userHelp') return template('userHelpCommon',mess);
//				if(whichPage == 'mctHelp') return template('mctHelpCommon',mess);
//				if(whichPage == 'changePass') return template('changePassCommon',mess);
//				if(whichPage == 'userAgree') return template('userAgreeCommon',mess);
//				if(whichPage == 'mctAgree') return template('mctAgreeCommon',mess);
				if(whichPage == 'upgrade') return template('upgradeCommon',mess);
				if(whichPage == 'log') return template('logCommon',mess);
			}
			
		},	
		//数据渲染
		render : function(mess,module,whichPage){
			var self = this;
			if(mess.page){
				var pg = Pg.pageShow(4, mess.page.page, mess.page.pages);                        //组装分页
				$('.wrap').find('.'+module).find('.'+whichPage).find('#page').html(pg);          //分页输出
			}
			if(mess.is_html){
				$('.wrap').find('.'+module).find('.'+whichPage).find('.content').empty().html(mess.data.content);
			}else{
				var content = self.tp(module, whichPage, mess);   		//模版渲染
				$('.wrap').find('.'+module).find('.'+whichPage).find('.content').html(content);  //渲染的内容填充
			}
		},
		//获取服务端的数据
		ajaxReturn : function(path,data,module,whichPage){
			var self = this;
			$.ajax({
				type:"post",
				url:path,
				data:data,
				async:true,
				success:function(mess){
					var mess = JSON.parse(mess);
					console.log(mess);
					if(mess.code==1){                    //查询到数据
						self.render(mess,module,whichPage);
						history.pushState(data, null, '/'+data.module+'/'+data.whichPage);
					}else if(mess.code==2){ 			 //修改数据
						new p.Pop().alert(mess.msg);
						$('#subnav').find('.'+data.module).find('.'+data.liPage).trigger('click');
//						self.historyReturn();
					}else if(mess.code==0){              //没有数据
//						new p.Pop().alert(mess.msg);
						$('.wrap').find('.'+module).find('.'+whichPage).find('.content').html('没有数据');  //渲染的内容填充
						return;
					}else{									 //回滚
						new p.Pop().alert(mess.msg);
						self.historyReturn();
					}
				}
			});
		},
		//事件绑定
		bindEvent: function(){
			var self = this;
			
			//导航栏的事件
			$('#nav').on('click','li',function(e){
				//给当前模块添加一个class=on
				$(this).addClass('on').siblings().removeClass('on');
				
				var module = this.id;    //当前模块
 				var arr = url[module];  //当前模块下的属性
				//每次点击模块，重新渲染此模块下的页面
				$('#subnav').empty();
				var ul = $('<ul class="nav nav-tabs"></ul>').addClass(module);
				//遍历类似url['goods']数据，动态填充到子导航中
				$.each(arr, function(key,val) {   
					ul.append($('<li><a onclick="return false;" extra='+JSON.stringify(val.extra)+' class="'+val.page+'" href="'+val.u+'">'+val.title+'</a></li>'));                                                          
				});
				ul.appendTo($('#subnav'));
				//只显示被点击了的模块
				$('.'+module).show().siblings().hide();
				//每个模块下的第一个页面默认显示
				$('#subnav').find('.'+module).find('a').eq(0).trigger('click');
			});
			
			
			//入口
			$('#subnav').on('click','a',function(e,submitData){   //数据可传可不传
				$(this).parent().addClass('on').siblings().removeClass('on');
				var module = $('#nav li.on').attr('id');  //当前模块
				var submitData = self.initData(submitData, module,$(this));
				$('.wrap').find('.'+submitData.module).find('.'+submitData.whichPage).show().siblings().hide(); 
				self.ajaxReturn(submitData.path,submitData,submitData.module,submitData.whichPage);
			});
			
			//搜索按钮和分页触发绑在li上的事件
			$(document).on('click','form button.search,ul.pagination a',function(e){
				var module = $('#nav li.on').attr('id'); 				    	 //当前模块
				var liPage 	= $('#subnav li.on a').attr('class'); 	     		//当前模块下的哪个页面
				var whichPage   = liPage;  						   			   //导航栏和页面不能一一对应,所以所个区分
				//当前模块的页面表单序列化的数据		
				var submitData = $('.wrap').find('.'+module).find('.'+whichPage).find('.form-inline').serializeObject();
				$.extend(submitData, {'whichPage' : whichPage,'module':module,'liPage':liPage});
				//分页
				if($(this).parents('.pagination')){
					var pageNum = $(this).attr('index');        //当前是第几页
					$.extend(submitData, {'page':pageNum});
				}
				//触发当前页面的渲染事件
				$('#subnav').find('.'+module).find('.'+liPage).trigger('click',submitData);
			});
			
			//禁止全局的a,submit的默认行为
			$(document).on('click','a',function(e){
				var target = e.target;
				//禁止a链接跳转
				e.preventDefault();
				return false;
			});
			$(document).on('submit','form',function(e){
				var target = e.target;
				e.preventDefault();
				return false;
			});
			//全选
			$(document).on('click','#checkAll',function(){
				$(this).parents('table').find('input[type=checkbox]').prop('checked',$(this).prop('checked'));
			});
			
			//查看图片
			$(document).on('click','.wrap img',function(){
				var options = {
					'width' : 800,
					'height' :600,
					'time'  : 1500
				};
				$(this).imgViewScroll(options);
			});
			
			//返回
			$(document).on('click','.historyBack',function(){
				history.back();
			});
			
			//初始化history事件
			self.historyReturn();
			
			//轮询
			function updateNums(data){
				$('#nav #goods .nums').html(data.goodsTotal);
				$('#nav #mct .nums').html(data.mctTotal);
				$('#nav #order .nums').html(data.autoTakeTotal);
				$('#nav #check .nums').html(data.signTotal);
			}
			function get_msg (url) {
					$.getJSON(url, function (data) {
						if (data.status) {
						   updateNums({
								"goodsTotal" : data.gtotal,
								"mctTotal" : data.mtotal,
								"involvedTotal" : data.jtotal,
								"signTotal" : data.qtotal,
								"userTotal" : data.ntotal,
								"autoTakeTotal" : data.dtotal,
//								"n_tx" : data.n_tx
							});
						}
						setTimeout(function () {
							get_msg(url);
						}, 1000*60);
					});
			}
			get_msg('/Common/getMsgUrl');
			
			
		},
		//history
		historyReturn : function(){
			//触发浏览器的前进后退事件
			window.onpopstate = function(e){
				var submitData = e.state;
				if(submitData){
					var module= submitData.module ? submitData.module : $('#nav li.on').attr('id');
					var whichPage = submitData.whichPage;
					var liPage = submitData.liPage ? submitData.liPage : submitData.whichPage;
//					history.replaceState(null, null, '/'+module+'/'+whichPage);
					$('.'+module).show().siblings().hide();
					$('#subnav').find('.'+module).find('.'+liPage).trigger('click',submitData);
				}
			}
		}
	};
	return mod;
});

/***********************************goods模块的js****************************************/
define('Goods',['jquery','template','alert'],function($,template,p){

	var mod = {
		init     : function(){
			this.bindEvent();
		},
		bindEvent: function(){
			
			$(document).on('click','.goods .handle',function(e){
				 event.preventDefault();
				var module = $('#nav li.on').attr('id');  //当前模块
				var liPage 	= $('#subnav li.on a').attr('class'); 	//当前模块下的哪个页面
				var whichPage   = liPage; 
				var goods_id = $(this).attr('href');
				var submitData = {'whichPage':'detail','path':'/Goods/goods_detail','goods_id':goods_id,'liPage':liPage,'module':module};
				//触发当前页面的渲染事件
				$('#subnav').find('.'+module).find('.'+liPage).trigger('click',submitData);
			});
			
			//日期控件
			$(".goods form .datepicker").datepicker({
				dateFormat: 'yy-mm-dd'
			});
			
			
			//detail页面的轮播特效
			$(document).on('click','.goods .detail .icon-chevron-up',function(){
				var $ul = $('.goods .detail .scroll ul');
				var $li = $ul.find('li');
				var height = $li.eq(0).height();
				$ul.animate({  
                        'margin-top':'-'+ height +'px'  
                    },  
                    'slow',  
                    function(){  
                        //此处保证能循环轮播  
                        //将已经轮播过的节点的第一张图片添加到末尾的位置  
                        //再将margin-top重置为0px;  
                        //这样就能一直的循环下去.  
                        $ul.css({'margin-top':0}).  
                            children('li').  
                            last().  
                            after(  
                                $ul.children('li').first()  
                            );  
                    });  
			});
			$(document).on('click','.goods .detail .icon-chevron-down',function(){
				var $ul = $('.goods .detail .scroll ul');
				var $li = $ul.find('li');
				var height = $li.eq(0).height();
				$ul.animate({  
                        'margin-bottom':'-'+ height +'px'  
                    },  
                    '3000',  
                    function(){  
                        $ul.css({'margin-bottom':0}).  
                            children('li').  
                            first().  
                            before(  
                            	$ul.children('li').last() 
                            );
                });  
			});
			
			//商品图片置顶
			$(document).on('click','.goods .detail .btn.toFirst',function(){
				var id = $(this).attr('value');
				var liPage 	= $('#subnav .goods li.on a').attr('class'); 	//当前模块下的哪个页面
				var whichPage   = liPage; 
				var submitData = {'gid':id,'whichPage':whichPage,'path':'/Goods/to_first','module':'goods','liPage':liPage};
				$('#subnav ul.goods').find('.'+liPage).trigger('click',submitData);
			});
			 
			//商品删除
			$(document).on('click','#goods_detail #del',function(e){
				var target = e.target;
				var liPage 	= $('#subnav .goods li.on a').attr('class'); 	//当前模块下的哪个页面
				var whichPage   = 'detail';  									//导航栏和页面不能一一对应,所以所个区分
				var target = e.target;
				var goods_id = $(target).attr('goods_id');
				var submitData = {'goods_id':goods_id,'whichPage':whichPage,'path':'/Goods/delGoods','module':'goods','liPage':liPage};
				new p.Pop().confirm('确定要删除吗？',{width:300,height:183});    //调起确认框
				$('.mymod').on('click','.btn',function(e){
					var target = e.target;
					$('.mymod').remove();
					if($(target).attr('id')=='ok'){
						//触发当前页面的渲染事件
						$('#subnav ul.goods').find('.'+liPage).trigger('click',submitData);
					}else{
						return false;
					}
				});
				
			});
			
			
			//备注
			$(document).on('click','#goods_detail #remark',function(){
				$('#goods_detail input[type=text]').focus();
			});
			//商品详情页的编辑提交
			$(document).on('click','#goods_detail button[type=submit]',function(){
				var liPage 		= $('#subnav .goods li.on a').attr('class'); 	//当前模块下的哪个页面
				var whichPage 	= liPage;
				var state = $('#goods_detail :radio[name=state]:checked').attr('value');
				var remark = $('.goods .detail form :text').val();
				if(state==0 && !remark){
					new p.Pop().alert('审核不通过时必须给理由');    //调起确认框
					$('#goods_detail input[type=text]').focus();
					return;
				}
				var submitData = $('.wrap div.goods #goods_detail').find('.form-horizontal').serializeObject();
				$.extend(submitData, {'whichPage' : whichPage,'module':'goods','liPage':liPage,'path':'/Goods/goods_edit'});
				//触发当前页面的渲染事件
				$('#subnav ul.goods').find('.'+liPage).trigger('click',submitData);
			});
			
			/*
			 	标签管理
			 * 
			 * */
			//编辑和保存切换
			$(document).on('click','.goods .tag .tagEdit,.goods .tag .tagSave',function(e){
				var target = e.target;
				if($(target).attr('class')=='tagEdit'){
					$(target).parents('tr').find('input[type=text]').removeAttr('disabled');
					$(target).parents('tr').find('#is_top+div,#sort+div').show();
					$(target).attr('class','tagSave').html('保存');
				}else{
					$(target).parents('tr').find('input[type=text]').attr('disabled','disabled');
					$(target).parents('tr').find('#is_top+div,#sort+div').hide();
					$(target).attr('class','tagEdit').html('编辑');
					
					//保存时提交数据
					var liPage 		= $('#subnav .goods li.on a').attr('class'); 	//当前模块下的哪个页面
					var whichPage 	= liPage;
					var submitData = {};
					submitData.name   = $(target).parents('tr').find('#name').val();
					submitData.is_top =  $(target).parents('tr').find('#is_top').attr('value');
					submitData.id 	  =parseInt($(target).parents('tr').find('#id').attr('value'));
					submitData.sort =  $(target).parents('tr').find('#sort').attr('value');
					submitData.whichPage = whichPage;
					submitData.liPage    = liPage;
					submitData.module    = 'goods';
					submitData.path      = '/Goods/labelEdit';
					//触发当前页面的渲染事件
					$('#subnav ul.goods').find('.'+liPage).trigger('click',submitData);
				}
			});
			
			//标签删除
			$(document).on('click','.goods .tag td .allowed',function(e){
				var target = e.target;
				var liPage 		= $('#subnav .goods li.on a').attr('class'); 	//当前模块下的哪个页面
				var whichPage 	= liPage;
				var submitData = {};
				submitData.id =parseInt($(target).parents('tr').find('#id').attr('value'));
				submitData.whichPage = whichPage;
				submitData.liPage    = liPage;
				submitData.module    = 'goods';
				submitData.path      = '/Goods/delete_label';
				//触发当前页面的渲染事件
				$('#subnav ul.goods').find('.'+liPage).trigger('click',submitData);
			});
			
			//箭头事件
			//首页展示
			$(document).on('click','.goods .tag td div.is_top',function(e){
				var target = e.target;
				if($(target).siblings('#is_top').attr('value')==1){
					$(target).siblings('#is_top').attr('value',0);
					$(target).siblings('#is_top').html('否');
				}else{
					$(target).siblings('#is_top').attr('value',1);
					$(target).siblings('#is_top').html('是');
				}
			});
			//标签排序
			$(document).on('click','.goods .tag td #add,.goods .tag td #reduce',function(e){
				var target = e.target;
				var val =parseInt($(target).parent().siblings('#sort').attr('value'));
				if($(target).attr('id')=='add'){
					$(target).parent().siblings('#sort').attr('value',val+1);
					$(target).parent().siblings('#sort').html(val+1);
				}else{
					var value;
					$(target).parent().siblings('#sort').attr('value',value = val-1> 0 ? val-1 : 1);
					$(target).parent().siblings('#sort').html(value = val-1> 0 ? val-1 : 1);
				}

			});
			
			//新增标签
			$(document).on('click','.goods .tag .addTag',function(){
				var newRow = '<tr class="newRow">'+
					'<td><input type="checkbox" name="checkbox"></td>'+  
					'<td><input type="text" id="name" value=""/></td>'+
					'<td><span id="is_top" value="1">是</span><div class="is_top"><i class="icon-caret-up"></i><i class="icon-caret-down"></i></div></td>'+
					'<td><span id="id"></span></td>'+
					'<td>'+
						'<span id="sort" value="1">1</span>'+
						'<div class="sort">'+
							'<p id="add"><i class="icon-caret-up"></i></p>'+
							'<p id="reduce"><i class="icon-caret-down"></i></p>'+
						'</div>'+
					'</td>'+
					'<td></td>'+
					'<td></td>'+
					'<td></td>'+
					'<td>'+
						'<a href="" onclick="return false;">'+
							'<i class="icon-ok"></i><span class="ok">确定</span>'+
						'</a>'+
						'<a href="" onclick="return false;">'+
							'<i class="icon-remove"></i><span class="cancel">取消</span>'+
						'</a>'+
					'</td>';
				$('.goods .tag table').append($(newRow));
				$('.newRow').find('td:eq(1) input[type=text]').focus();
				$('.newRow #is_top+div,.newRow #sort+div').show();
				//确定新增标签
				$('.newRow .ok').click(function(e){
					var target = e.target;
					if($('.newRow .name').val()==''){
						new p.Pop().alert('名称不能为空');    //名称不能为空
						return;
					}
					//提交数据
					var liPage 		= $('#subnav .goods li.on a').attr('class'); 	//当前模块下的哪个页面
					var whichPage 	= liPage;
					var submitData = {};
					submitData.name   = $(target).parents('tr').find('#name').val();
					submitData.is_top =  $(target).parents('tr').find('#is_top').attr('value');
					submitData.sort =  $(target).parents('tr').find('#sort').attr('value');
					submitData.whichPage = whichPage;
					submitData.liPage    = liPage;
					submitData.module    = 'goods';
					submitData.path      = '/Goods/add_label';
					//触发当前页面的渲染事件
					$('#subnav ul.goods').find('.'+liPage).trigger('click',submitData);
				});
				//取消新增标签
				$('.newRow .cancel').click(function(){
					$('.newRow').remove();
				})
			});
			
		}
	};
	return mod;
});
define('Order',['jquery','alert'],function($,p){
	var mod = {
		init : function(){
			this.bindEvent();
		},
		bindEvent : function(){
			var self = this;
			//订单详情
			$(document).on('click','.wrap .order .view',function(e){
				event.preventDefault();
				var data = {
					'whichPage' : 'detail',
					'path'      : '/Order/cat_order',
					'order_id'  : $(this).attr('href')
				};
				self.sendRequest(data);
			});
			//确认用户收货
			$(document).on('click','.wrap .order .confirm_take',function(){
				var data = {
					'path': '/Order/rec',
					'order_id': $(this).attr('order_id'),
					'state'   : $(this).attr('order_state')
				};
				self.sendRequest(data);
			});
			//标记异常
			$(document).on('click','.wrap .order .order_exception',function(){
				var data = {
					'path': '/Order/exc',
					'order_id': $(this).parents('.orderState').attr('order_id'),
					'state'   : $(this).parents('.orderState').attr('order_state')
				};
				self.sendRequest(data);
			});
			//交易成功
			$(document).on('click','.wrap .order .order_success',function(){
				var data = {
					'path': '/Order/order_success',
					'order_id': $(this).parents('.orderState').attr('order_id'),
					'state'   : $(this).parents('.orderState').attr('order_state')
				};
				self.sendRequest(data);
			});
			//同意退货和确认退货
			$(document).on('click','.wrap .order .confirm_agree_back',function(){
				var data = {
					'path': '/Order/pass',
					'order_id': $(this).parents('.orderState').attr('order_id'),
					'state'   : $(this).parents('.orderState').attr('order_state')
				};
				self.sendRequest(data);
			});
			//拒绝退货
			$(document).on('click','.wrap .order .refuse_back',function(){
				var data = {
					'path': '/Order/stop',
					'order_id': $(this).parents('.orderState').attr('order_id'),
					'state'   : $(this).parents('.orderState').attr('order_state')
				};
				self.sendRequest(data);
			});
			//交易关闭
			$(document).on('click','.wrap .order .order_close',function(){
				var data = {
					'path': '/Order/close',
					'order_id': $(this).parents('.orderState').attr('order_id'),
					'state'   : $(this).parents('.orderState').attr('order_state')
				};
				self.sendRequest(data);
			});
			//备注
			$(document).on('click','.wrap .order .orderRemark',function(){
				new p.Pop().prop({width:300,height:280});    //调起输入框
				var order_id = $(this).attr('order_id');
				$('.myProp .btn').click(function(){
					if(!$('.myProp .remark').val()){
						new p.Pop().alert('内容不能为空'); 
						return;
					}
					$('.myProp .remark').empty();
					var data = {
					'path': '/Order/remarks',
					'order_id': order_id,
					'remark' : $('.myProp .remark').val()
					};
					$('.myProp').remove();
					self.sendRequest(data);
				});
			});
			//查看物流详情
			$(document).on('click','.order .detail .mail_no',function(){
				var mail_no = $(this).text();
				$.ajax({
					type:"post",
					url:'/Order/query',
					async:true,
					data : {'query':mail_no},
					success : function(res){
						var res = JSON.parse(res);
						if(res.code==1){
							var container = $('<div></div>');	
							for (var i = 0; i < res.data.length; i++) {
								var time = $('<p>"'+res.data[i].acceptTime+'"</p>');
								var remark = $('<p>"'+res.data[i].remark+'"</p>');
								container.append(time).append(remark);
							}
							$('.order .detail .mail_query').slideToggle(300).html(container);
						}else{
							new p.Pop().alert(res.msg);
							return;
						}
					}
				});
			})
			
			
			//执行倒计时
			$(document).on('click','#subnav>ul>li.on a',function(){
				counter();
			});
			//倒计时
			function counter(){
				var str ='';
				function countDown() {
				var now = parseInt(new Date().getTime()/1000) ;
				var signTime = parseInt($('.order .signTime').attr('data-time'));
				var end  = signTime+2*24*60*60;
				var time = end-now;
					if(time>=0){
						var day =Math.floor(time/(24*60*60));
						day = day < 10 ? '0'+day : day;
						var hour = Math.floor(time%(24*60*60)/(60*60));
						hour = hour <10 ? '0' + hour : hour;
						var minute = Math.floor(time%(24*60*60)%(60*60)/60);
						minute = minute < 10 ? '0'+minute : minute;   
						var second = Math.floor(time%(24*60*60)%(60*60)%60);
						second = second<10 ? '0'+second : second;
						str =day+"天"+hour+"时"+minute+"分"+second+"秒";
					}else{
						str = '时间到!!';
						clearInterval(timer);
					}
					$('.order .countDown').html(str);
				}
				var timer = setInterval(countDown, 1000);
			}
		},
		sendRequest : function(data){
			var submitData = {};
			var module = $('#nav li.on').attr('id');  //当前模块
			var liPage 	= $('#subnav li.on a').attr('class'); 	//当前模块下的哪个页面
			var whichPage   = liPage;
			submitData.module    = module;
			submitData.liPage    = liPage;
			submitData.whichPage = whichPage;
			$.extend(submitData, data);
			
			//触发当前页面的渲染事件
			$('#subnav').find('.'+module).find('.'+liPage).trigger('click',submitData);
		}
	};
	
	return mod
});

define('Mct',['jquery','alert'],function($,p){
	var mod = {
		init : function(){
			this.bindEvent();
		},
		bindEvent : function(){
			var self = this;
			//订单详情
			$(document).on('click','.wrap .mct .mct_detail',function(e){
				event.preventDefault();
				var data = {
					'whichPage' : 'detail',
					'path'      : '/Bao/cat_merchant',
					'merchant_id'  : $(this).attr('href')
				};
				self.sendRequest(data);
			});
			
			//备注(备注也是往goods_log里面写remark,所以干脆让表单输入框获得焦点)
			$(document).on('click','.wrap .mct .mctRemark',function(e){
				var mct = $(this);
				new p.Pop().prop({width:300,height:280});    //调起输入框
				$('.myProp .btn').click(function(){
					if(!$('.myProp .remark').val()){
						new p.Pop().alert('内容不能为空'); 
						return;
					}
					$('.myProp .remark').empty();
					var data = {
					'path': '/Bao/remarks',
					'merchant_id': mct.attr('merchant_id'),
					'remark' : $('.myProp .remark').val()
					};
					$('.myProp').remove();
					self.sendRequest(data);
				});
			});
			
			//封禁 和启用
			$(document).on('click','.wrap .mct .mctFj',function(){
				var data = {
					'path'      : '/Bao/stops',
					'merchant_id'  : $(this).attr('merchant_id'),
					'merchant_lock' : $(this).attr('merchant_lock')
				};
				new p.Pop().confirm('确定吗？',{width:300,height:183});    //调起确认框
				$('.mymod').on('click','.btn',function(e){
					$('.mymod').remove();
					if($(this).attr('id')=='ok'){
						self.sendRequest(data);
					}else{
						return false;
					}
				});
			});
			
			//审核
			$(document).on('click','.mct .detail button[type=submit]',function(){
				var verify = $('.mct .detail form :radio[name=verify]:checked').attr('value');
				var remark = $('.mct .detail form :text').val();
				if(verify!=1 && !remark){
					new p.Pop().alert('审核不通过时必须给理由');    //调起提示框
					$('.mct .detail form input[type=text]').focus();
					return;
				}
				var data = $('.wrap .mct .detail').find('.form-horizontal').serializeObject();
				$.extend(data, {'path':'/Bao/verify_mer'});
				self.sendRequest(data);
			});
			
			//头像和店铺名的修改
			$(document).on('click','.mct .detail .isPass',function(){
				var data = {
					'path'      : '/Bao/through',
					'merchant_id'  : $(this).attr('merchant_id'),
					'verify_re'    : $(this).attr('verify_re')
				};
				new p.Pop().confirm('确定吗？',{width:300,height:183});    //调起确认框
				$('.mymod').on('click','.btn',function(e){
					$('.mymod').remove();
					if($(this).attr('id')=='ok'){
						self.sendRequest(data);
					}else{
						return false;
					}
				});
			});
		},
		sendRequest : function(data){
			var submitData = {};
			var module = $('#nav li.on').attr('id');  //当前模块
			var liPage 	= $('#subnav li.on a').attr('class'); 	//当前模块下的哪个页面
			var whichPage   = liPage;
			submitData.module    = module;
			submitData.liPage    = liPage;
			submitData.whichPage = whichPage;
			$.extend(submitData, data);
			
			//触发当前页面的渲染事件
			$('#subnav').find('.'+module).find('.'+liPage).trigger('click',submitData);
		}
	};
	
	return mod
});

define('User',['jquery','alert'],function($,p){
	var mod = {
		init : function(){
			this.bindEvent();
		},
		bindEvent : function(){
			var self = this;
			//详情
			$(document).on('click','.wrap .user .handle',function(e){
				event.preventDefault();
				var data = {
					'whichPage' : 'detail',
					'path'      : '/Users/cat_user',
					'user_id'   : $(this).attr('href')
				};
				self.sendRequest(data);
			});
			
			//备注
			$(document).on('click','.wrap .user .userRemark',function(e){
				var mct = $(this);
				new p.Pop().prop({width:300,height:280});    //调起输入框
				$('.myProp .btn').click(function(){
					if(!$('.myProp .remark').val()){
						new p.Pop().alert('内容不能为空'); 
						return;
					}
					$('.myProp .remark').empty();
					var data = {
					'path': '/Users/remarks',
					'user_id': mct.attr('user_id'),
					'remark' : $('.myProp .remark').val()
					};
					$('.myProp').remove();
					self.sendRequest(data);
				});
			});
			
			//封禁 和启用
			$(document).on('click','.wrap .user .userFj',function(){
				var data = {
					'path'      : '/Users/stops',
					'user_id'   : $(this).attr('user_id'),
					'is_lock'   : $(this).attr('is_lock')
				}; 
				new p.Pop().confirm('确定吗？',{width:300,height:183});    //调起确认框
				$('.mymod').on('click','.btn',function(e){
					$('.mymod').remove();
					if($(this).attr('id')=='ok'){
						self.sendRequest(data);
					}else{
						return false;
					}
				});
			});
		},
		sendRequest : function(data){
			var submitData = {};
			var module = $('#nav li.on').attr('id');  //当前模块
			var liPage 	= $('#subnav li.on a').attr('class'); 	//当前模块下的哪个页面
			var whichPage   = liPage;
			submitData.module    = module;
			submitData.liPage    = liPage;
			submitData.whichPage = whichPage;
			$.extend(submitData, data);
			
			//触发当前页面的渲染事件
			$('#subnav').find('.'+module).find('.'+liPage).trigger('click',submitData);
		}
	};
	
	return mod
});


define('Check',['jquery','alert'],function($,p){
	
	$.fn.erbaoCamera = function(options,func){
	  	 var config = {
	  	 	'width' : 640,
	  	 	'height' : 480,
	  	 	'container' : '.mask'
	  	 };
  		
	  	 $.extend(config,options);
	  	 
	  	 var Box = $('<div class="Box row"></div>');
	  	 var half      = $('<div class="col-md-6"></div>');
	  	 var videoEle  = $('<video  autoplay></video>');
	  	 var canvasEle = $('<canvas  style="display: none;"></canvas>');
	  	 var close  = $('<span class="icon-remove-circle"></span>');
	  	 var imgList = $('<form class="col-md-6" method="post" action=""></form>');
	  	 var imgListSub = $('<div></div>');
	  	 var imgListUp = $('<div></div>');
	  	 var uploadBtn = $('<button class="btn btn-primary btn-large btn-block">确定上传</button>');
	  	 var add = $('<button class="btn btn-primary btn-block icon-plus add "></button>');
	  	 
	  	videoEle.attr({width : config.width, height: config.height});
	  	canvasEle.attr({width : config.width, height: config.height});
		Box.append(half);
	    Box.append(imgList);
	    half.prepend(close);
	    half.append(videoEle);
	    half.append(canvasEle);
	    imgList.append(imgListSub);
	    imgListSub.append(add);
	    imgListSub.append(uploadBtn);
	    imgList.append(imgListUp);
		$(config.container).empty().append(Box).show();
		
		 //样式
	    $(config.container).css({
	    	'width' : '100%',
	    	'height' : '100%',
	    	'z-index' : '10',
	    	'position' : 'fixed'
	    });
	    
	    Box.css({
	    	'position' : 'fixed',
	    	'margin' : '20px 0 0 10px'
	    });
	    half.css({
	    	'width' : config.width + 'px',
	    	'height' : config.height + 'px',
	    	'margin-right' : '10px',
	    	'margin-top': '-16px',
	    	'text-align': 'center'
	    });
	    close.css({
	    	'font-size' : '80px',
            'color'  : '#D00707',
            'cursor': 'pointer'
	    });
	    add.css({
	    	'font-size' : '50px',
		    'position': 'relative',
    		'left':' 50%',
    		'cursor': 'pointer'
	    });
	    imgListUp.css({
	    	'height' : config.height+'px',
	    	'overflow' : 'auto',
	    	'width': config.width+'px',
	    	'background' : '#ccc'
	    });
	    uploadBtn.css({
	    	'width' : config.width+'px',
	    	'margin-bottom' : '10px'
	    });
	    
	  	//画布
	  	var canvas = canvasEle[0],  
	    context = canvas.getContext("2d"),  
	    video = videoEle[0],  
	    videoObj = { "video": true},  
	        //错误
	    errBack = function(error) {  
	        if("object" === typeof window.console){  
	            console.log("Video capture error: ", error.code);   
	        }  
	    };  
    
		//数据流
	    navigator.getUserMedia  = navigator.getUserMedia ||
	                      		  navigator.webkitGetUserMedia ||
	                              navigator.mozGetUserMedia ||
	                              navigator.msGetUserMedia;
	    if (navigator.getUserMedia) {
		    navigator.getUserMedia(videoObj, function(stream) {
		    	if (window.URL) {
				    video.src = window.URL.createObjectURL(stream);
				} else {
					video.src = stream;
				}
				window.stream = stream;
	            video.play();  //或者video.autoplay = true;
	        }, errBack); 
		} else {
		     alert('your browser does not support getUserMedia');
		}
		
		//新图片
		add.click(function(e){
			e.preventDefault();
			imgListUp.find('div').removeClass('current');
			var newImg = $('<div></div');
			newImg.addClass('current');
			imgListUp.append(newImg);
			newImg.css({
	    	'width' : config.width + 'px',
	    	'border' : '1px solid #ccc',
	    	'height' : config.height + 'px',
	    	'margin-bottom' : '5px'
	    	});
	    	imgListUp.find('div').dblclick(function(){
	  			$(this).remove();
	  		});
	  		return false;
		});
		
		//关闭摄像头
	     close.click(function(e){
	     	$(config.container).empty().hide();
	     	window.stream.getVideoTracks()[0].stop();
	     	URL.revokeObjectURL(video.src);
	     });
	    
	    // 拍照
	    var img ;
	    videoEle.click(function(){
	        // 画到画布上  
	        context.drawImage(video, 0, 0, config.width, config.height);  
	        img = $('<img name="pic[]" src="'+canvas.toDataURL('image/png')+'" />');
	        imgListUp.find('div.current').html(img);
	  		imgListUp.find('div').dblclick(function(){
	  			$(this).remove();
	  		});
	    });
	    
	    //提交表单
	    uploadBtn.click(function(e){
			e.preventDefault();
			var formData = [];
	    	(imgList.find('img')).each(function(){
	    		formData.push($(this).attr('src'));
	    	});
	    	config.data.subdata.pic = formData;
			close.click();
	    	$.ajax({
					type:"post",
					url:config.data.path,
					async:true,
					data : config.data.subdata,
					success : function(res){
						var res = JSON.parse(res);
						if(func && typeof func==='function'){
							func(res);
						}
					}
			});
	    });
	    
	    return $(this);
  }
	
	var mod = {
		init : function(){
			this.bindEvent();
		},
		bindEvent : function(){
			var self = this;
			$(document).on('click','.wrap .check .view',function(e){
				var data = {
					'whichPage' : 'detail',
					'path'      : '/Send/cat_orders',
					'order_id'   : $(this).attr('href')
				};
				self.sendRequest(data);
			});
			//签收
			$(document).on('click','.wrap .check .sign',function(){
				console.log(123);
				var data = {
					'path'      : '/Send/all_get',
					'order_id'   : $(this).attr('href') || $('.check .detail .rightSideState').attr('order_id'),
				};
				self.sendRequest(data);
			});
			
			//批量签收
			$(document).on('click','.wrap .check .signAll',function(e){
				var arr = [];
				$('table td input[type=checkbox]:checked').each(function(){
					arr.push($(this).attr('value'));
				})
				var str = arr.join(',');
				if(arr.length){
					var data = {
						'path'      : '/Send/all_get',
						'order_id'    : str
					}; 
					self.sendRequest(data);
				}else{
					new p.Pop().alert('请选择');
				}
			});
			//查看已送检详情
			$(document).on('click','.wrap .check .ysjView',function(e){
				var data = {
					'whichPage' : 'ysjDetail',
					'path'      : '/Send/index_sj_detail',
					'verify_order'   : $(this).attr('href')
				};
				self.sendRequest(data);
			});
			//已送检打印
			$(document).on('click','.wrap .check .ysjPrint',function(e){
				var data = {
					'whichPage' : 'sjbb',
					'path'      : '/Send/prints',
					'verify_order'   : $(this).attr('href')
				};
				self.sendRequest(data);
			});
			//生成报表(和已送检打印指向同一个页面)
			$(document).on('click','.wrap .check #analysis',function(e){
				var arr = [];
				$('table td input[type=checkbox]:checked').each(function(){
					arr.push($(this).attr('value'));
				})
				var str = arr.join(',');
				if(arr.length){
					var data = {
						'whichPage' : 'sjbb',
						'path'      : '/Send/list_exits',
						'orders'    : str
					}; 
					self.sendRequest(data);
				}else{
					new p.Pop().alert('请选择');
				}
			});
			//打印报表
			$(document).on('click','.wrap .check .sjbb #print',function(e){
				$('#nav,#subnav,.commonForm ').hide();
				print();
				$('#nav,#subnav,.commonForm ').show();
				return false;
			});
			// 待打包(由已送检变成待打包)
			$(document).on('click','.wrap .check .waitPack',function(e){
				var data = {
					'path'      : '/Send/verifys',
					'order_id'   : $(this).attr('href') || $('.check .detail .rightSideState').attr('order_id')
				};
				self.sendRequest(data);
			});
			//发货
			$(document).on('click','.wrap .check .sendGoods',function(){
				var data = {
					'path'      : '/Send/sends',
					'order_id'   : $(this).attr('href') || $('.check .detail .rightSideState').attr('order_id')
				};
				self.sendRequest(data);
			});
			
			/*************详情******************/
			//拒签
			$(document).on('click','.wrap .check .detail .jq',function(){
				var val = $('.check .detail .rightSideState :text').val();
				if(!val){
					new p.Pop().alert('拒签必须给理由');
					return;
				}
				var data = {
					'path'      : '/Send/stops',
					'order_id'  : $('.check .detail .rightSideState').attr('order_id'),
					'remark'    : val
				};
				self.sendRequest(data);
			});
			//开箱
			$(document).on('click','.wrap .check .detail .kx',function(){
				var data = {
					'path'      : '/Send/comp',
					'order_id'  : $('.check .detail .rightSideState').attr('order_id')
				};
				self.sendRequest(data);
			});
			//开箱退回
			$(document).on('click','.wrap .check .detail .kxth',function(){
				var val = $('.check .detail .rightSideState :text').val();
				if(!val){
					new p.Pop().alert('退回必须给理由');
					return;
				}
				var data = {
					'path'      : '/Send/com_b',
					'order_id'  : $('.check .detail .rightSideState').attr('order_id'),
					'remark'    : val
				};
				self.sendRequest(data);
			});
			//打印送检编号
			$(document).on('click','.wrap .check .detail .barcode',function(){
				var src = $('.check .detail #vsn img').attr('src');
				window.open(src,'_blank').print();
			});
			//生成送检编号
			$(document).on('click','.wrap .check .detail .makeBarcode',function(){
				$.ajax({
					type:"post",
					url:"/Send/get_sn",
					async:true,
					data : {'order_id' : $('.check .detail .rightSideState').attr('order_id')},
					success : function(res){
						var res = JSON.parse(res);
						new p.Pop().alert(res.msg);
						$('.check .detail #vsn span').html(res.data.verify_sn);
					}
				});
				
			});
			
			//完成打包
			$(document).on('click','.wrap .check .detail .db',function(){
				var data = {
					'path'      : '/Send/packs',
					'order_id'  : $('.check .detail .rightSideState').attr('order_id')
				};
				self.sendRequest(data);
			});
			//待打包,打包退回
			$(document).on('click','.wrap .check .detail .dbth,.wrap .check .detail .ddbth',function(){
				var val = $('.check .detail .rightSideState :text').val();
				if(!val){
					new p.Pop().alert('退回必须给理由');
					return;
				}
				var data = {
					'path'      : '/Send/packs_b',
					'order_id'  : $('.check .detail .rightSideState').attr('order_id'),
					'remark'    : val
				};
				self.sendRequest(data);
			});
			//关联订单
			$(document).on('click','.wrap .check .detail .relateOrder',function(){
				$.ajax({
					type:"post",
					url:"/Sf/contacts",
					async:true,
					data : {'order_id' : $('.check .detail .rightSideState').attr('order_id')},
					success : function(res){
						var res = JSON.parse(res);
						new p.Pop().alert(res.msg);
						return;
					}
				});
			});
			//下顺丰单(吊起输入表单和朦层)
			$(document).on('click','.wrap .check .detail .placeOrder',function(){
				$('.check .detail .orderForm,.mask').show();
			});
			//关闭朦层和输入表单
			$(document).on('click','.wrap .check .detail .orderFormClose',function(){
				$('.check .detail .orderForm,.mask').hide();
			});
			//确认下顺丰单
			$(document).on('click','.wrap .check .detail .orderForm button',function(){
				var submitData = $('.wrap .check .detail .orderForm form').serializeObject();
				submitData.order_id = $('.check .detail .rightSideState').attr('order_id');
				$.ajax({
					type:"post",
					url:"/Sf/add",
					async:true,
					data : submitData,
					success : function(res){
						var res = JSON.parse(res);
						if(res.code==2){
							$('.wrap .check .detail #esn span').html(res.data.express_sn_user);
						}
						$('.check .detail .orderForm,.mask').hide();
						new p.Pop().alert(res.msg);
						return;
					},
					beforeSend : function(){
						new p.Pop().alert('正在下单请等待');
					}
				});
			});
			//打印电子运单
			$(document).on('click','.wrap .check .detail .printSf',function(){
				$('#nav,#subnav').hide();
				var sftb = $('.check .detail .sf-tb').remove();
				$('.mask').append(sftb).css({'background':'rgba(245, 245, 245, 1)'}).show().siblings().hide();
				window.print();
				$('#nav,#subnav').show();
				$('.mask').empty().hide().siblings().show();
			});
			
			//确认退货
			$(document).on('click','.wrap .check .detail .confirm_th',function(){
				var val = $('.check .detail .rightSideState :text').val();
				if(!val){
					new p.Pop().alert('退货必须给理由');
					return;
				}
				var data = {
					'path'      : '/Send/backs',
					'order_id'  : $('.check .detail .rightSideState').attr('order_id'),
					'remark'    : val
				};
				self.sendRequest(data);
			});
			
			//备注
			$(document).on('click','.wrap .check .detail .remark',function(e){
				var mct = $(this);
				new p.Pop().prop({width:300,height:280});    //调起输入框
				$('.myProp .btn').click(function(){
					if(!$('.myProp .remark').val()){
						new p.Pop().alert('内容不能为空'); 
						return;
					}
					$('.myProp .remark').empty();
					var data = {
					'path': '/Send/remarks',
					'order_id': mct.attr('order_id'),
					'remark' : $('.myProp .remark').val()
					};
					$('.myProp').remove();
					self.sendRequest(data);
				});
			});
			
			//拍照
			$(document).on('click','.wrap .check .detail .takePhoto',function(){
				var options = {};
				options.data = {
					'path': '/Send/pic',
					'subdata':{'order_id': $('.check .detail .rightSideState').attr('order_id')},
				};
				$(this).erbaoCamera(options,function(res){
					if(res && res.code==1){
						new p.Pop().alert(res.msg);
						self.sendRequest(data={});
					}
					if(res && res.code==3){
						new p.Pop().alert(res.msg);
						return;
					}
				});
				return;
			});
		},
		sendRequest : function(data){
			var submitData = {};
			var module = $('#nav li.on').attr('id');  //当前模块
			var liPage 	= $('#subnav li.on a').attr('class'); 	//当前模块下的哪个页面
			var whichPage   = liPage;
			submitData.module    = module;
			submitData.liPage    = liPage;
			submitData.whichPage = whichPage;
			$.extend(submitData, data);
			//触发当前页面的渲染事件
			$('#subnav').find('.'+module).find('.'+liPage).trigger('click',submitData);
		}
	};
	
	return mod
});

//结算
define('Account',['jquery','alert'],function($,p){
	var mod = {
		init : function(){
			this.bindEvent();
		},
		bindEvent : function(){
			var self = this;
			//详情
			$(document).on('click','.wrap .account .view',function(e){
				var data = {
					'whichPage' : $(this).attr('whichPage'),
					'path'      : $(this).attr('path'),
					'id'   		: $(this).attr('href')
				};
				self.sendRequest(data);
			});
			//按钮事件(处理，完成，关闭)
			$(document).on('click','.wrap .account .detail .handle',function(e){
				var data = {
					'path'      : $(this).attr('path'),
					'id'   		: $(this).parents('.rightSideState').attr('id')
				};
				self.sendRequest(data);
			});
			
			//备注
			$(document).on('click','.wrap .account .detail .remark',function(e){
				var mct = $(this);
				new p.Pop().prop({width:300,height:280});    //调起输入框
				$('.myProp .btn').click(function(){
					if(!$('.myProp .remark').val()){
						new p.Pop().alert('内容不能为空'); 
						return;
					}
					$('.myProp .remark').empty();
					var data = {
					'path': mct.attr('path'),
					'id': mct.attr('id'),
					'remark' : $('.myProp .remark').val()
					};
					$('.myProp').remove();
					self.sendRequest(data);
				});
			});
			
			
		},
		sendRequest : function(data){
			var submitData = {};
			var module = $('#nav li.on').attr('id');  //当前模块
			var liPage 	= $('#subnav li.on a').attr('class'); 	//当前模块下的哪个页面
			var whichPage   = liPage;
			submitData.module    = module;
			submitData.liPage    = liPage;
			submitData.whichPage = whichPage;
			$.extend(submitData, data);
			
			//触发当前页面的渲染事件
			$('#subnav').find('.'+module).find('.'+liPage).trigger('click',submitData);
		}
	};
	
	return mod
});

//统计
define('Statis',['jquery','alert'],function($,p){
	var mod = {
		init : function(){
			this.bindEvent();
		},
		bindEvent : function(){
			var self = this;
		
		//反馈列表的备注
		$(document).on('click','.statis .feed .remark,.statis .feed .ok',function(){
			if($(this).attr('class')=='remark'){
					$(this).siblings('input').removeAttr('disabled');
					$(this).attr('class','ok').html('保存');
				}else{
					$(this).siblings('input').attr('disabled','disabled');
					$(this).attr('class','remark').html('备注');
					
					var data = {
						'remarks' : $(this).siblings('input').val(),
						'id' : $(this).attr('value')
					};
					if($(this).attr('id')=='user'){
						data.path = '/Feeds/remarks';
					}else{
						data.path = '/Feeds/merchants_remarks';
					}
						self.sendRequest(data);
					
				}
		});
		
		//标记收藏/未收藏
		$(document).on('click','.statis .feed .collected',function(){
			var data = {
					'collected' : $(this).attr('value'),
					'id' : $(this).attr('id')
				};
			if($(this).hasClass('user')){
				data.path = '/Feeds/users_collect';
			}else{
				data.path = '/Feeds/merchants_collect';
			}
			self.sendRequest(data);
		});
		
		//标记已读/未读
		$(document).on('click','.statis .feed .readed',function(){
			var data = {
					'readed' : $(this).attr('value'),
					'id' : $(this).attr('id')
				};
			if($(this).hasClass('user')){
				data.path = '/Feeds/users_readed';
			}else{
				data.path = '/Feeds/merchants_readed';
			}
			self.sendRequest(data);
		});
			
			
		},
		sendRequest : function(data){
			var submitData = {};
			var module = $('#nav li.on').attr('id');  //当前模块
			var liPage 	= $('#subnav li.on a').attr('class'); 	//当前模块下的哪个页面
			var whichPage   = liPage;
			submitData.module    = module;
			submitData.liPage    = liPage;
			submitData.whichPage = whichPage;
			$.extend(submitData, data);
			
			//触发当前页面的渲染事件
			$('#subnav').find('.'+module).find('.'+liPage).trigger('click',submitData);
		}
	};
	
	return mod
});

//营销模块
define('Market',['jquery','alert'],function($,p){
	var mod = {
		init : function(){
			this.bindEvent();
		},
		bindEvent : function(){
			var self = this;
			
			// 新增橱窗/专题
			$(document).on('click','.market .addWin',function(){
				$('.market table .newRow').show();
				//确定新增橱窗
				$('.market .window table .ok,.market .subject table .ok').click(function(e){
					$(this).parents('tr').find('input').each(function(i){
						if(!this.value){
							new p.Pop().alert('有表单数据为空,无法提交');    //数据不能为空
							return false;
						}
					});
					//上传
					self.ajaxFormData('/Window/add_handle',this);
					
				});
				//取消新增橱窗
				$('.market table .cancel').click(function(){
					$(this).parents('tr').hide();
				})
			});
			
			
			//橱窗/热词/图片删除
			$(document).on('click','.market table .del',function(){
				if($(this).hasClass('isWin')){
					var data = {
						'path' : '/Window/del',
						'id' : $(this).attr('href')
					};
				}else if($(this).hasClass('isUp')){
					var data = {
						'path' : '/Window/pic_delete',
						'id' : $(this).attr('href')
					};
				}
				else{
					var data = {
						'path' : '/Search/del',
						'id' : $(this).attr('href')
					};
				}
				new p.Pop().confirm('确定要删除吗？',{width:300,height:183});    //调起确认框
				$('.mymod').on('click','.btn',function(e){
					var target = e.target;
					$('.mymod').remove();
					if($(target).attr('id')=='ok'){
						//触发当前页面的渲染事件
						self.sendRequest(data);
					}else{
						return false;
					}
				});
				
			});
		
			//橱窗/热词编辑
			$(document).on('click','.market .table .edit,.market .table .save',function(){
				if($(this).attr('class')=='edit'){
					$(this).parents('tr').find('input[type=text],select').removeAttr('disabled');
					$(this).parents('tr').find('input[type=file]').show().siblings().hide();
					$(this).parents('tr').find('.otime,.ctime').show().siblings().hide();
					$(this).attr('class','save').html('保存');
				}else{
					$(this).parents('tr').find('input[type=text],select').attr('disabled','disabled');
					$(this).parents('tr').find('input[type=file]').hide().siblings().show();
					$(this).parents('tr').find('.otime,.ctime').hide().siblings().show();
					$(this).attr('class','edit').html('编辑');
					
					if($(this).attr('id')=='isWin'){
						
						self.ajaxFormData('/Window/edit',this);
						
					}else{
						var data = {
							'path' : '/Search/edit',
							'goods_name'   : $(this).parents('tr').find('[name=goods_name]').val(),
							'id'   :  $(this).parents('tr').find('[name=id]').val(),
							'sort' : $(this).parents('tr').find('[name=sort]').val()
						};
						self.sendRequest(data);
					}
					
				}
			});
			
			//上传橱窗/专题图文混排图片
			$(document).on('click','.market .picUpList .ok', function(){
				var data = new FormData();
				data.append('title',$(this).parents('tr').find('input[name=title]').val());
				data.append('pic',$(this).parents('tr').find('input[name=pic]')[0].files[0]);
				var module = $('#nav li.on').attr('id');  //当前模块
				var liPage 	= $('#subnav li.on a').attr('class'); 	//当前模块下的哪个页面
				var whichPage   = liPage;
				$.ajax({
				    url: '/Window/pic_up',
				    type: 'POST',
				    cache: false,
				    data: data,
				    processData: false,
				    contentType: false,
				    success : function(mess){
				    	var mess = JSON.parse(mess);
						if(mess.code==2){ 			 //修改数据
							new p.Pop().alert(mess.msg);
							$('#subnav').find('.'+module).find('.'+liPage).trigger('click');
						}else{									 //回滚
							new p.Pop().alert(mess.msg);
							return;
						}
				    }
				});
				
			});
			
			//关联商品
			$(document).on('focus','.market input[name=url]',function(){
				$(this).siblings('.relation_goods').toggle();
			});
			$(document).on('click','.market .relation_goods_search',function(){  //搜索
				var that = this;
				var value = $(this).siblings('input').val();
				$.ajax({
					type:"post",
					url:"/Window/search",
					data : {'goods' : value},
					async:true,
					success : function(mess){
						var mess = JSON.parse(mess);
						if(mess.code == 0){
							new p.Pop().alert(mess.msg);
							$(that).parent('.relation_goods').hide();
						}else{
							$(that).siblings('div').html(mess.data);
						}
						return;
					}
				});
			});
			$(document).on('click','.market .relation_goods input[type=checkbox]',function(){
				var urlEle = $(this).parents('td').find('input[name=url]');
				var urlValue = urlEle.val()+','+$(this).val();
				urlEle.val(urlValue.replace(/^,+/,''));
			});

			//新增热词
			$(document).on('click','.market .addHotWord',function(){
				$('.market table .newRow').show();
				
				//确定新增热词
				$('.market .hotword table .ok').click(function(e){
					$(this).parents('tr').find('input').each(function(i){
						if(!this.value){
							new p.Pop().alert('有表单数据为空,无法提交');    //数据不能为空
							return false;
						}
					});
					var data = {
							'path' : '/Search/add',
							'goods_name'   : $(this).parents('tr').find('[name=goods_name]').val(),
							'sort' : $(this).parents('tr').find('[name=sort]').val()
						};
					self.sendRequest(data);
				});
				//取消新增热词
				$('.market table .cancel').click(function(){
					$(this).parents('tr').hide();
				})
				
			});
			
			
			
			
			//推送
			$(document).on('click','.market .push .btn',function() {
				var data = $('.market .push form').serializeObject();
				var path;
				if($(this).hasClass('user')){
					path = '/Pushs/users_all';
				}else{
					path = '/Pushs/merchants_all';
				}
				$.ajax({
					type:   "post",
					url:	path,
					async:	true,
					data : 	data,
					success : function(mess){
						var mess = JSON.parse(mess);
						new p.Pop().alert(mess.msg);
						return;
					},
					beforeSend : function(){
						new p.Pop().alert('正在推送，请不要重复提交');
					}
				});
			});
		},
		sendRequest : function(data){
			var submitData = {};
			var module = $('#nav li.on').attr('id');  //当前模块
			var liPage 	= $('#subnav li.on a').attr('class'); 	//当前模块下的哪个页面
			var whichPage   = liPage;
			submitData.module    = module;
			submitData.liPage    = liPage;
			submitData.whichPage = whichPage;
			$.extend(submitData, data);
			
			//触发当前页面的渲染事件
			$('#subnav').find('.'+module).find('.'+liPage).trigger('click',submitData);
		},
		ajaxFormData : function(path,that){
			//aiax表单上传
				var data = new FormData();
				data.append('title',$(that).parents('tr').find('input[name=title]').val());
				data.append('wt',$(that).parents('tr').find('select[name=wt] option:selected').val());
				data.append('pic',$(that).parents('tr').find('input[type=file]')[0].files[0]);
				data.append('r_pic',$(that).parents('tr').find('input[name=r_pic]').val());
				data.append('url',$(that).parents('tr').find('input[name=url]').val());
				data.append('sort',$(that).parents('tr').find('input[name=sort]').val());
				data.append('otime',$(that).parents('tr').find('input[name=otime]').val());
				data.append('ctime',$(that).parents('tr').find('input[name=ctime]').val());
				data.append('maka_desc',$(that).parents('tr').find('input[name=maka_desc]').val());
				data.append('type',$(that).parents('tr').find('select[name=type] option:selected').val());
				data.append('status',$(that).parents('tr').find('select[name=status] option:selected').val());
				data.append('id',$(that).parents('tr').find('input[name=id]').val());
				
				var module = $('#nav li.on').attr('id');  //当前模块
				var liPage 	= $('#subnav li.on a').attr('class'); 	//当前模块下的哪个页面
				var whichPage   = liPage;
				$.ajax({
				    url: path,
				    type: 'POST',
				    cache: false,
				    data: data,
				    processData: false,
				    contentType: false,
				    success : function(mess){
				    	var mess = JSON.parse(mess);
						if(mess.code==2){ 			 //修改数据
							new p.Pop().alert(mess.msg);
							$('#subnav').find('.'+module).find('.'+liPage).trigger('click');
						}else{									 //回滚
							new p.Pop().alert(mess.msg);
							return;
						}
				    }
				});
		}
	};
	
	return mod
});

//配置模块
define('Set',['jquery','alert','wangEditor'],function($,p,WE){
	
	var mod = {
		init : function(){
			this.bindEvent();
		},
		bindEvent : function(){
			var self = this;
			
			//base显示列表,添加新版本（addVersion）
			$(document).on('click','.set .base .btn,.set .upgrade .addVersion',function(){
				var data = {
					'whichPage' : $(this).attr('whichPage'),
					'path' : $(this).attr('path')
				};
				self.sendRequest(data);
			});
			
			//编辑协议/帮助
			var editor;
			$(document).on('click','.set .umCommon .commonForm .btn.btn-large.edit', function(){
				if(editor){
		       		editor.destroy();
				}
				if($(this).hasClass('mctAgreeEdit')){
					 editor = new WE('wang');
				}
				if($(this).hasClass('userAgreeEdit')){
					 editor = new WE('wang2');
				}
				if($(this).hasClass('userHelpEdit')){
					 editor = new WE('wang3');
				}
				if($(this).hasClass('mctHelpEdit')){
					 editor = new WE('wang4');
				}
	       		editor.create();
				$(this).text('保存').attr('id','ok');	       		 
			});
			//保存协议/帮助
			$(document).on('click','.set .umCommon .commonForm .btn.btn-large#ok', function(){
				var data = {
					'content' : editor.$txt.html(),
					'path' : $(this).attr('path')
				};
				$(this).text('编辑').attr('id','');	
				editor.destroy();
				self.sendRequest(data);
			});
			
			//修改密码
			$(document).on('click','.set .changePass .btn',function(){
				var data = $('.set .changePass form').serializeObject();
				if(!data.o_pwd || !data.n_pwd || !data.c_pwd){
					new p.Pop().alert('不能为空');
					return false;
				}
				data.path = '/System/chmod_pwd';
				self.sendRequest(data);
			});
			
			//快递和银行编辑
			$(document).on('click','.set  .table .edit,.set .table .save',function(){
				if($(this).attr('class')=='edit'){
					$(this).parents('tr').find('input[type=text]').removeAttr('disabled');
					$(this).attr('class','save').html('保存');
				}else{
					$(this).parents('tr').find('input[type=text]').attr('disabled','disabled');
					$(this).attr('class','edit').html('编辑');
					
					if($(this).attr('id')=='bank'){
						var data = {
							'path' : '/Banks/bankEdit',
							'name'   : $(this).parents('tr').find('[name=name]').val(),
							'id'   :  $(this).parents('tr').find('[name=id]').val(),
							'sort' : $(this).parents('tr').find('[name=sort]').val()
						};
						
					}else{
						var data = {
							'path' : '/Safes/edit',
							'name'   : $(this).parents('tr').find('[name=name]').val(),
							'id'   :  $(this).parents('tr').find('[name=id]').val(),
							'name_sn' : $(this).parents('tr').find('[name=name_sn]').val()
						};
					}
					self.sendRequest(data);
					
				}
			});
			
			
			//添加快递/银行
			$(document).on('click','.set .commonForm .add',function(){
				$('.set table tbody tr:first-child').show();
			});
			
			//确定添加快递/银行
			$(document).on('click','.set .table .ok',function(){
				$(this).parents('tr').find('input').each(function(i){ 
					if(!this.value){
						new p.Pop().alert('有表单数据为空,无法提交');    //数据不能为空
						return false;  // 不能使用 break 语句来跳出循环，也不能使用 return 语句来从闭包函数中返回
						//导致这句没有起作用
					}
				});								
				if($(this).attr('id')=='bank'){
					var data = {
							'path' : '/Banks/add_bank',
							'name'   : $(this).parents('tr').find('[name=name]').val(),
							'sort' : $(this).parents('tr').find('[name=sort]').val()
						};
				}else if($(this).attr('id')=='express'){
					var data = {
							'path' : '/Safes/add',
							'name'   : $(this).parents('tr').find('[name=name]').val(),
							'name_sn' : $(this).parents('tr').find('[name=name_sn]').val()
						};
				}else{
					new p.Pop().alert('应该不会出现这种情况');
					return;
				}
				
				self.sendRequest(data);
				
			});
			
			//取消添加快递/银行
			$(document).on('click','.set .table .cancel', function(){
				$('.set table tbody tr:first-child').hide();
			});
			
			//版本信息删除
			$(document).on('click','.set .upgrade .delVersion',function(){
				var data = {
					'id' : $(this).attr('href'),
					'path' : '/Version/del'
				};
				
				new p.Pop().confirm('确定要删除吗？',{width:300,height:183});    //调起确认框
				$('.mymod').on('click','.btn',function(e){
					var target = e.target;
					$('.mymod').remove();
					if($(target).attr('id')=='ok'){
						//触发当前页面的渲染事件
						self.sendRequest(data);
					}else{
						return false;
					}
				});
			});
			
			//添加新版本
			$(document).on('change','.set .newVersion select[name=type],.set .newVersion select[name=os]',function(){
//				$('.set .newVersion form')[0].reset();
				var typeValue = $('.set .newVersion select[name=type]').val();
				var osValue   = $('.set .newVersion select[name=os]').val();
				if(osValue==1 && typeValue==1){
					$('.set .newVersion .package').hide();
					$('.set .newVersion .url').show();
				}else{
					$('.set .newVersion .package').show();
					$('.set .newVersion .url').hide();
				}
			});
			//上传
			$(document).on('click','.set .newVersion .up.btn',function(){
				var fileValue = $(this).siblings('input[type=file]').val();
				if(!fileValue){
					new p.Pop().alert('没有选择文件，无法上传');
					return;
				}
				var arr = [];
				arr['Filedata'] = $(this).siblings('input[type=file]')[0].files[0];
				$(this).parents('.package').hide();
				self.ajaxFormData('/Version/uploadFace',arr);
								
			});
			//remerk
			//加
			$(document).on('click','.set .newVersion button.plus',function(){
				var firstChild = $('.set .newVersion .remark input:first-child');
				firstChild.after(firstChild.clone());
			});
			//减
			$(document).on('click','.set .newVersion button.minus',function(){
				var firstChild = $('.set .newVersion .remark input:first-child');
				if(firstChild.next()){
					firstChild.next().remove();
				}else{
					new p.Pop().alert('最少一个文本框');
					return;
				}
			});
			//提交所有的版本信息
			$(document).on('click','.set .newVersion .ok',function(){
				var data = $('.set .newVersion form').serializeObject();
				data.path = '/Version/add';
				self.sendRequest(data);
			});
			
			
		},
		sendRequest : function(data){
			var submitData = {};
			var module = $('#nav li.on').attr('id');  //当前模块
			var liPage 	= $('#subnav li.on a').attr('class'); 	//当前模块下的哪个页面
			var whichPage   = liPage;
			submitData.module    = module;
			submitData.liPage    = liPage;
			submitData.whichPage = whichPage;
			$.extend(submitData, data);
			
			//触发当前页面的渲染事件
			$('#subnav').find('.'+module).find('.'+liPage).trigger('click',submitData);
		},
		ajaxFormData : function(path,arr){
			//aiax表单上传
				var data = new FormData();
				for(var key in arr){
					data.append(key,arr[key]);
				}
//				var module = $('#nav li.on').attr('id');  //当前模块
//				var liPage 	= 'upgrade'; 	//当前模块下的哪个页面
//				var whichPage   = liPage;
				$.ajax({
				    url: path,
				    type: 'POST',
				    cache: false,
				    data: data,
				    processData: false,
				    contentType: false,
				    success : function(mess){
				    	var mess = JSON.parse(mess);
						if(mess.code==2){ 			 //修改数据
							new p.Pop().alert(mess.msg);
							$('.set .newVersion .url').show().find('input').val(mess.data.url)
//							$('.set .newVersion .btn-large').addClass('ok');
						}else{									
							new p.Pop().alert(mess.msg);
							return;
						}
				   },
				   beforeSend : function(){
				   		new p.Pop().alert('正在上传请不要重复提交');
				   }
				});
		}
		
	};
	
	return mod
});


require(['Index','Goods','Order','Mct','User','Check','Account','Statis','Market','Set'],function(Index,Goods,Order,Mct,User,Check,Account,Statis,Market,Set){
		Index.init();
		$('#nav li').click(function(){
			var module = $(this).attr('id');
			switch (module){
				case 'goods':
					Goods.init();
					break;
				case 'order':
					Order.init();
					break;
				case 'mct':
					Mct.init();
					break;
				case 'user':
					User.init();
					break;
				case 'check':
					Check.init();
					break;
				case 'account':
					Account.init();
					break;
				case 'statis':
					Statis.init();
					break;
				case 'market':
					Market.init();
					break;
				case 'set':
					Set.init();
					break;
				default:
					break;
			}
		});
});

