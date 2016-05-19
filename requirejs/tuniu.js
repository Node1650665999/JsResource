/**
 * 酒店详情页房型及价格计划加载js
 * @author cjl
 * @date 20150718
 */

 define(function(require, exports, module) {
    var $ = require('zepto');
    var dialog = require('dialog');
    var template = require('template');
    var utils = require('hotelCommon');
    var dateEx = require('dateEx');

    var checkInDate = $('#checkInDate').val(),
        checkOutDate = $('#checkOutDate').val();

    var submitData = {
            productId: parseInt($('#hotelId').val(),10),
            checkInDate: checkInDate,
            checkOutDate: checkOutDate
        },
        roomDataCashFlag, 
        roomTypeCashBack, 
        roomTypeData, 
        pricePlanData, 
        roomTypeDataCashBack, 
        pricePlanDataCashBack;

    var listShow = (function() {

        return {
            /**
             * 页面初始化
             */
            init: function() {
                this.renderDetail(submitData);
            },
            /**
             * 事件绑定
             */
            bindEvent: function() {
                var self = this;

                $(window).scroll(function(){
                    if($(window).scrollTop() > 175){
                        $('.filter-bar').addClass('fixed');
                        $('.filter-standing').removeClass('hide');
                    }else{
                        $('.filter-bar').removeClass('fixed');
                        $('.filter-standing').addClass('hide');
                    }
                });
                $('#main').on('click', '.touch .price', function(){
                    var child = $(this).find('i'),
                        parent = $(this).parents('.touch'),
                        siblingNode = $(parent).next();
                    if(child.hasClass('icon-dropdown2')){
                        child.removeClass('icon-dropdown2').addClass('icon-dropdown1');
                        siblingNode.removeClass('hide');
                        var top = parent.offset().top - 93;
                        $(window).scrollTop(top);
                    }else{
                        child.removeClass('icon-dropdown1').addClass('icon-dropdown2');
                        siblingNode.addClass('hide');
                    }
                });
                $('#main').on('click', '.action', function(){
                    // 没有返现优惠的房型时，以弹框提示
                    var cashBackFlag = true, cashBackLength = 0;
                    roomDataCashFlag.forEach(function(item){
                        if(!item.cashBack){
                            cashBackLength++;
                            // console.log('cashBackLength',cashBackLength);
                        }
                    });
                    cashBackLength == roomDataCashFlag.length ? cashBackFlag = false : cashBackFlag = true;
                    if(!cashBackFlag && $(this).find('p').text() == '返后价'){
                        dialog({
                            type: 'info',
                            message: '暂无可享返现优惠的房型'
                        });
                        return;
                    }
                    $('.filter-mask').removeClass('hide');
                    $('.choose-pannel').addClass('hide');
                    var name = $(this).data('name');
                    $('[name="'+ name +'"]').removeClass('hide');
                });
                $('#main').on('click', '.choose-pannel .select', function(){
                    if(typeof roomDataCashFlag == 'undefined'){
                        return;
                    }
                    var value = parseInt($(this).data('value'),10),
                        name = $(this).parents('.choose-pannel').attr('name'),
                        filterNode = $('[data-name="'+ name +'"]'),
                        status = filterNode.siblings('.action').find('p').data('status'),
                        parentNode = $(this).parent(),
                        data;
                    $('.select', parentNode).removeClass('active');
                    $(this).addClass('active');
                    switch(value){
                        case 1: 
                            self.noneCashSort(filterNode, parentNode, status, data);
                            break;
                        case 2:
                            self.cashBackSort(filterNode, parentNode, status, data);
                            break;
                        case 3:
                            self.allUnfoldSort(filterNode, parentNode, status, data);
                            break;
                        case 4:
                            self.allFoldSort(filterNode, parentNode, status, data);
                            break;
                    }
                });
                $('#main').on('click', '.room-price-lists .extend',function(){
                    $(this).prev().toggleClass('hide');
                    $(this).find('p').toggleClass('hide');                  
                });
                $('#main').on('click', '.filter-mask, .cancel',function(){
                    $('.filter-mask').addClass('hide');
                    $('.choose-pannel').addClass('hide');
                });
                $('#main').on('click', '.fold-area, .unit, .room-detail-info', function(e){
                    var event = e || window.event,
                        target = event.target || event.srcElement;

                    if($(target).hasClass('book-btn') || $(target).parent().hasClass('book-btn-pre') || $(target).parent().hasClass('book')){
                        return;
                    }    

                    var roomId = $(this).data('id'),
                        type = parseInt($(this).data('type'),10),
                        isPre = parseInt($(this).data('ispre'),10),
                        listsNode = $(this).parent().next(),
                        data, facilityData, isBtn = true;
                    if(listsNode.hasClass('room-lists')){
                        if(!listsNode.hasClass('hide')){
                            isBtn = false;
                        }
                    }

                    isPre == 0 ? data = JSON.parse(JSON.stringify(pricePlanDataCashBack)) : data = JSON.parse(JSON.stringify(pricePlanData));
                    facilityData = data.filter(function(item) {
                        return item.roomId == roomId;
                    });
                    console.log('facilityData',facilityData);
                    self.showRoomDialog(facilityData[0], type, isBtn);
                    // console.log();
                });
            },
            /**
             * 渲染页面
             */
            renderDetail: function(submitData) {
                var self = this;

                $.ajax({
                    url: $('#hotelRoomDetail').val(),
                    type:'get',
                    dataType: 'json',
                    data: {
                        d: JSON.stringify(submitData)
                    },
                    beforeSend: function(){
                        $('.loading').removeClass('hide');
                    },
                    success:function(json){
                        if(json.success && json.data && json.data.length){
                            // json.data = [];

                            roomDataCashFlag = JSON.parse(JSON.stringify(json.data));

                            // console.log('json.data', json.data);
                            roomDataCashFlag.forEach(function(item){
                                item.canBook = true;
                                var pLength = item.packages.length;
                                if(pLength > 0){
                                    var count = 0,
                                        picFlag = 0,
                                        roomTypePics = [];

                                    item.packages.forEach(function(subItem,i){
                                        subItem.roomSmallPic = item.roomSmallPic;
                                        subItem.bedTypeDesc = item.bedTypeDesc;
                                        subItem.adultNum = item.adultNum;
                                        subItem.internet = item.internet;
                                        subItem.typeName = item.name;
                                        subItem.roomFloor = item.roomFloor;
                                        subItem.roomSize = item.roomSize;
                                        subItem.typeRoomFacilities = subItem.roomFacilities;
                                        subItem.childLength = pLength;
                                        if(i == 0){
                                            item.roomId = subItem.roomId;
                                        }
                                        if(subItem.roomPics && subItem.roomPics.length > 0 && picFlag == 0){
                                            picFlag++;
                                            roomTypePics = subItem.roomPics.slice(0);
                                        }
                                        if(!subItem.canBook){
                                            count++;
                                        }
                                        if(subItem.labelInfo.length > 0){
                                            subItem.labelInfo.forEach(function(typeItem){
                                                switch(typeItem.labelType){
                                                    case 1: 
                                                        item.nightSpec = true;
                                                        break;
                                                    case 2: 
                                                        item.gift = true;
                                                        break;
                                                    case 3:
                                                        item.phoneOnly = true;
                                                        break;
                                                    case 4: 
                                                        item.cashBack = true;
                                                        break;
                                                    case 5:
                                                        item.promotion = true;
                                                        break;
                                                    case 6:
                                                        item.discount = true;
                                                        break;
                                                    case 7:
                                                        item.coupon = true;
                                                        break;
                                                    case 8:
                                                        item.groupPurchase = true;
                                                        break;
                                                }
                                            });
                                        }
                                    });
                                    if(pLength == count){
                                        item.canBook = false;
                                    }
                                    item.roomTypePics = roomTypePics.slice(0);
                                }
                            });
                            // 每个价格计划保存对应房型的图片，以方便价格计划弹框显示
                            roomDataCashFlag.forEach(function(item){
                                item.packages.forEach(function(subItem){
                                    subItem.roomTypePics = item.roomTypePics.slice(0);
                                });
                            });
                            // 返前房型的起始价替换为相应价格计划的最低价
                            roomDataCashFlag.forEach(function(item){
                                var packages = item.packages.filter(function(subItem, i) {
                                    return subItem.price > 0;
                                });
                                if(packages.length > 0){
                                    packages.sort(function(a,b){
                                        return a.price < b.price ? -1 : 1;
                                    });
                                    item.startingPrice = packages[0].price;
                                }
                            });
                            console.log('cashBackFlag',roomDataCashFlag);

                            // 返后价的计算
                            roomTypeCashBack =  JSON.parse(JSON.stringify(roomDataCashFlag));
                            roomTypeCashBack.forEach(function(item){
                                if(item.packages.length > 0){
                                    item.packages.forEach(function(subItem){
                                        // subItem.roomSmallPic = item.roomSmallPic;
                                        if(subItem.price > 0 && subItem.cashBack > 0){
                                            subItem.originalPrice = subItem.price;
                                            subItem.price = subItem.price - subItem.cashBack;
                                        }
                                    });
                                }
                            })

                            // 返后房型的起始价替换为相应价格计划的最低价
                            roomTypeCashBack.forEach(function(item){
                                var packages = item.packages.filter(function(subItem, i) {
                                    return subItem.price > 0;
                                });
                                if(packages.length > 0){
                                    packages.sort(function(a,b){
                                        return a.price < b.price ? -1 : 1;
                                    });
                                    item.startingPrice = packages[0].price;
                                }
                            });

                            // console.log('roomTypeCashBack',roomTypeCashBack);
                            roomTypeData = self.roomTypeData(roomDataCashFlag); 
                            pricePlanData = self.pricePlanData(roomDataCashFlag);
                            roomTypeDataCashBack = self.roomTypeDataCashBack(roomTypeCashBack);
                            pricePlanDataCashBack = self.pricePlanDataCashBack(roomTypeCashBack);
                            // 返后价的房型列表展示
                            console.log('roomTypeDataCashBack',roomTypeDataCashBack);

                            
                            // 如果每个房型下面只有一个价格计划，则直接渲染返现后的价格计划列表
                            var typeLength = 0, showFlag;
                            roomTypeDataCashBack.forEach(function(item){
                                if(item.packages && item.packages.length == 1){
                                    typeLength++;
                                }
                            });
                            typeLength == roomTypeDataCashBack.length ? showFlag = true : showFlag = false;

                            if(showFlag){
                                $('#typeLists').empty();
                                setTimeout(function(){
                                    $('.loading').addClass('hide');
                                    $('#roomPriceLists').html(template('roomPriceListsTemplate', {
                                        data: pricePlanDataCashBack,
                                        isPre: 0
                                    }));
                                },100);

                            }else{
                                $('#roomPriceLists').empty();
                                setTimeout(function(){
                                    $('.loading').addClass('hide');
                                    $('#typeLists').html(template('typeListsTemplate', {
                                        data: roomTypeDataCashBack,
                                        isPre: 0
                                    }));
                                    var touchNode = $('.card').eq(0);
                                    touchNode.find('.can-fold span').removeClass('icon-dropdown2').addClass('icon-dropdown1');
                                    touchNode.find('.room-lists').removeClass('hide');
                                },100);
                            }
                            
                            $('.loading').addClass('hide');

                            self.bindEvent();
                        }else{
                            $('.loading').addClass('hide'); 
                            $('.list-empty').removeClass('hide');
                        }
                    },
                    error: function(){
                       $('.loading').addClass('hide'); 
                       $('.list-empty').removeClass('hide');
                    }
                });
            },
            sortPriceType: function(data){
                var dataExc,
                    dataInc;
                data.forEach(function(item) {
                    var packagesNot, packages;
                    if(item.canBook && item.packages.length > 0){
                        packagesNot = item.packages.filter(function(subItem, i){
                            return subItem.price == 0 || !subItem.canBook;
                        });
                        packages = item.packages.filter(function(subItem, i) {
                            return subItem.price > 0 && subItem.canBook;
                        });
                        
                        packages.sort(function(a, b) {
                            return a.price < b.price ? -1 : 1;
                        });
                        packagesNot.forEach(function(subItem){
                            packages.push(subItem);
                        });
                        item.packages = packages;
                    }
                });
                dataInc = data.filter(function(item){
                    return item.startingPrice > 0 && item.canBook;
                });
                dataExc = data.filter(function(item){
                    return item.startingPrice <= 0 || !item.canBook;
                });
                dataInc.sort(function(a, b) {
                    return a.startingPrice < b.startingPrice ? -1 : 1;
                });
                dataExc.sort(function(a, b) {
                    return a.startingPrice < b.startingPrice ? -1 : 1;
                });
                dataExc.forEach(function(item){
                    dataInc.push(item);
                });
                data = dataInc;
                return data;
            },
            sortPriceRoom: function(data){
                var dataInc,
                    dataExc;
                dataInc = data.filter(function(item){
                    return item.canBook && item.price > 0;
                });
                dataExc = data.filter(function(item){
                    return !item.canBook || item.price <= 0;
                });
                dataInc.sort(function(a, b) {
                    return a.price < b.price ? -1 : 1;
                });
                dataExc.forEach(function(item){
                    dataInc.push(item);
                });
                data = dataInc;
                return data;
            },
            roomTypeData: function(roomDataCashFlag){
                if(roomDataCashFlag && roomDataCashFlag.length > 0){
                    var self = this, 
                        roomTypeData, 
                        roomTypeDataInc, 
                        roomTypeDataExc;
                    // 1.返前价 -> 房型价格从低到高
                    roomTypeData = JSON.parse(JSON.stringify(roomDataCashFlag));
                    return self.sortPriceType(roomTypeData);
                }
            },
            pricePlanData: function(roomDataCashFlag){
                if(roomDataCashFlag && roomDataCashFlag.length > 0){
                    // 1.返前价 -> 价格计划从低到高
                    var self = this,
                        roomListData = [],
                        roomListDataInc,
                        roomListDataExc,
                        backUp;

                    backUp = JSON.parse(JSON.stringify(roomDataCashFlag));
                    backUp.forEach(function(item){
                        item.packages.forEach(function(subItem){
                            roomListData.push(subItem);
                        });
                    });
                    return self.sortPriceRoom(roomListData);
                }
            },
            roomTypeDataCashBack: function(roomTypeCashBack){
                if(roomTypeCashBack && roomTypeCashBack.length > 0){
                    var self = this,
                        backUp = JSON.parse(JSON.stringify(roomTypeCashBack)),
                        backUpInc, backUpExc;

                    // 2.返后价 -> 房型价格从低到高
                    return self.sortPriceType(backUp);
                }
            },
            pricePlanDataCashBack: function(roomTypeCashBack){
                if(roomTypeCashBack && roomTypeCashBack.length > 0){
                    var self = this,
                        backUp = JSON.parse(JSON.stringify(roomTypeCashBack)),
                        roomListCashBack = [],
                        roomListDataBackupInc, 
                        roomListDataBackupExc;
                    // 2.返后价 -> 价格计划从低到高
                    backUp.forEach(function(item){
                        item.packages.forEach(function(subItem){
                            roomListCashBack.push(subItem);
                        });
                    });

                    return self.sortPriceRoom(roomListCashBack);
                }
            },
            noneCashSort: function(filterNode, parentNode, status, data){
                var self = this,
                    isPre = 0;
                filterNode.find('p').html('返前价');
                filterNode.find('p').data('status','1');
                isPre = 1;
                if(status == 1){
                    // 返前价的价格计划列表展示
                    data = pricePlanData;
                    $('#typeLists').empty();
                    $('#roomPriceLists').html(template('roomPriceListsTemplate', {
                        data: data,
                        isPre: isPre
                    }));

                } else if(status == 2){
                    data = roomTypeData;
                    // 返前价的房型列表展示
                    $('#roomPriceLists').empty();
                    $('#typeLists').html(template('typeListsTemplate', {
                        data: data,
                        isPre: isPre
                    }));
                }

                $('.filter-mask').addClass('hide');
                parentNode.addClass('hide');
            },
            cashBackSort: function(filterNode, parentNode, status, data){
                var self = this,
                    isPre = 0;
                filterNode.find('p').html('返后价');
                filterNode.find('p').data('status','2');
                if(status == 1){
                    data = pricePlanDataCashBack;
                    // 返后价的价格计划列表展示
                    $('#typeLists').empty();
                    $('#roomPriceLists').html(template('roomPriceListsTemplate', {
                        data: data,
                        isPre: isPre
                    }));
                } else if(status == 2){
                    data = roomTypeDataCashBack;
                    // 返后价的房型列表展示
                    $('#roomPriceLists').empty();
                    $('#typeLists').html(template('typeListsTemplate', {
                        data: data,
                        isPre: isPre
                    }));
                }
                $('.filter-mask').addClass('hide');
                parentNode.addClass('hide');
            },
            allUnfoldSort: function(filterNode, parentNode, status, data){
                var self = this,
                    isPre = 0;
                filterNode.find('p').html('全部展开');
                filterNode.find('p').data('status','1');
                filterNode.find('i').removeClass('icon-dropdown2').addClass('icon-dropdown1');
                if(status == 1){
                    data = pricePlanData;
                    // 返前价的价格计划列表
                    isPre = 1;
                    $('#typeLists').empty();
                    $('#roomPriceLists').html(template('roomPriceListsTemplate', {
                        data: data,
                        isPre: isPre
                    }));
                } else if(status == 2){
                    data = pricePlanDataCashBack;
                    // 返后价的价格计划列表
                    $('#typeLists').empty();
                    $('#roomPriceLists').html(template('roomPriceListsTemplate', {
                        data: data,
                        isPre: isPre
                    }));
                }
                $('.filter-mask').addClass('hide');
                parentNode.addClass('hide');
            },
            allFoldSort: function(filterNode, parentNode, status, data){
                var self = this,
                    isPre = 0;
                filterNode.find('p').html('全部折叠');
                filterNode.find('p').data('status','2');
                filterNode.find('i').removeClass('icon-dropdown1').addClass('icon-dropdown2');
                if(status == 1){
                    data = roomTypeData;
                    // 返前价的房型列表
                    isPre = 1;
                    $('#roomPriceLists').empty();
                    $('#typeLists').html(template('typeListsTemplate', {
                        data: data,
                        isPre: isPre
                    }));
                } else if(status == 2){
                    data = roomTypeDataCashBack;
                    // 返后价的房型列表
                    $('#roomPriceLists').empty();
                    $('#typeLists').html(template('typeListsTemplate', {
                        data: data,
                        isPre: isPre
                    }));
                }
                $('.filter-mask').addClass('hide');
                parentNode.addClass('hide');
            },
            showRoomDialog: function(data, type, isBtn) {
                // 1表示房型，2表示价格计划
                $('body').append(utils.getTpl('fx-dialog', { fx: data, type: type, isBtn: isBtn }));
            }
        }
    })()
    listShow.init();
    module.exports = listShow;
});