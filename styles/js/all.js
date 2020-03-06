if (!Array.prototype.forEach) {
// Array.prototype.forEach
Array.prototype.forEach = function forEach(callback, scope) {
	for (var array = this, index = 0, length = array.length; index < length; ++index) {
		callback.call(scope || window, array[index], index, array);
	}
};

}
if (!Array.prototype.filter) {
// Array.prototype.filter
Array.prototype.filter = function filter(callback, scope) {
	for (var array = this, arrayB = [], index = 0, length = array.length, element; index < length; ++index) {
		element = array[index];

		if (callback.call(scope || window, element, index, array)) {
			arrayB.push(element);
		}
	}

	return arrayB;
};

}
if (!Function.prototype.bind) {
// Function.prototype.bind
Function.prototype.bind = function bind(scope) {
	var
	callback = this,
	prepend = Array.prototype.slice.call(arguments, 1),
	Constructor = function () {},
	bound = function () {
		return callback.apply(
			this instanceof Constructor && scope ? this : scope,
			prepend.concat(Array.prototype.slice.call(arguments, 0))
		);
	};

	Constructor.prototype = bound.prototype = callback.prototype;

	return bound;
};

}
if (!Array.prototype.indexOf) {
// Array.prototype.indexOf
Array.prototype.indexOf = function indexOf(searchElement) {
	for (var array = this, index = 0, length = array.length; index < length; ++index) {
		if (array[index] === searchElement) {
			return index;
		}
	}

	return -1;
};

}
if (typeof Array !== "undefined" && !Array.isArray) {
// Array.isArray
Array.isArray = function isArray(array) {
	return array && Object.prototype.toString.call(array) === '[object Array]';
};

}
if (typeof Object !== "undefined" && !Object.is) {
// Object.is
Object.is = function is(a, b) {
	return (a === b && (a !== 0 || 1 / a === 1 / b)) || (a !== a && b !== b);
};

}
if (typeof Object !== "undefined" && !Object.defineProperty) {
// Object.defineProperty
Object.defineProperty = function (object, property, descriptor) {
	if (descriptor.get) {
		object.__defineGetter__(property, descriptor.get);
	}

	if (descriptor.set) {
		object.__defineSetter__(property, descriptor.set);
	}

	return object;
};

}

if(!NodeList.prototype.forEach){
	NodeList.prototype.forEach = Array.prototype.forEach;
}
if(!Array.isArray){
	Array.isArray = function(arg){
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}
if(!Object.is){
	Object.is = function(x, y){
		if(x === y){
			return x !== 0 || 1 / x === 1 / y;
		} else {
			return x !== x && y !== y;
		}
	};
}
/*!
 * Datepicker v1.0.8
 * https://fengyuanchen.github.io/datepicker
 *
 * Copyright 2014-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2019-06-23T08:07:40.545Z
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):e((t=t||self).jQuery)}(this,function(D){"use strict";function a(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}D=D&&D.hasOwnProperty("default")?D.default:D;var s={autoShow:!1,autoHide:!1,autoPick:!1,inline:!1,container:null,trigger:null,language:"",format:"mm/dd/yyyy",date:null,startDate:null,endDate:null,startView:0,weekStart:0,yearFirst:!1,yearSuffix:"",days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],itemTag:"li",mutedClass:"muted",pickedClass:"picked",disabledClass:"disabled",highlightedClass:"highlighted",template:'<div class="datepicker-container"><div class="datepicker-panel" data-view="years picker"><ul><li data-view="years prev">&lsaquo;</li><li data-view="years current"></li><li data-view="years next">&rsaquo;</li></ul><ul data-view="years"></ul></div><div class="datepicker-panel" data-view="months picker"><ul><li data-view="year prev">&lsaquo;</li><li data-view="year current"></li><li data-view="year next">&rsaquo;</li></ul><ul data-view="months"></ul></div><div class="datepicker-panel" data-view="days picker"><ul><li data-view="month prev">&lsaquo;</li><li data-view="month current"></li><li data-view="month next">&rsaquo;</li></ul><ul data-view="week"></ul><ul data-view="days"></ul></div></div>',offset:10,zIndex:1e3,filter:null,show:null,hide:null,pick:null},t="undefined"!=typeof window,e=t?window:{},i=t&&"ontouchstart"in e.document.documentElement,c="datepicker",n="click.".concat(c),r="focus.".concat(c),h="hide.".concat(c),o="keyup.".concat(c),l="pick.".concat(c),d="resize.".concat(c),u="scroll.".concat(c),p="show.".concat(c),f="touchstart.".concat(c),g="".concat(c,"-hide"),y={},m=0,v=1,w=2,k=Object.prototype.toString;function b(t){return"string"==typeof t}var C=Number.isNaN||e.isNaN;function $(t){return"number"==typeof t&&!C(t)}function x(t){return void 0===t}function F(t){return"date"===function(t){return k.call(t).slice(8,-1).toLowerCase()}(t)&&!C(t.getTime())}function M(a,s){for(var t=arguments.length,n=new Array(2<t?t-2:0),e=2;e<t;e++)n[e-2]=arguments[e];return function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return a.apply(s,n.concat(e))}}function Y(t){return'[data-view="'.concat(t,'"]')}function G(t,e){return[31,function(t){return t%4==0&&t%100!=0||t%400==0}(t)?29:28,31,30,31,30,31,31,30,31,30,31][e]}function V(t,e,i){return Math.min(i,G(t,e))}var T=/(y|m|d)+/g;function S(t,e){var i=1<arguments.length&&void 0!==e?e:1,a=String(Math.abs(t)),s=a.length,n="";for(t<0&&(n+="-");s<i;)s+=1,n+="0";return n+a}var I=/\d+/g,P={show:function(){this.built||this.build(),this.shown||this.trigger(p).isDefaultPrevented()||(this.shown=!0,this.$picker.removeClass(g).on(n,D.proxy(this.click,this)),this.showView(this.options.startView),this.inline||(this.$scrollParent.on(u,D.proxy(this.place,this)),D(window).on(d,this.onResize=M(this.place,this)),D(document).on(n,this.onGlobalClick=M(this.globalClick,this)),D(document).on(o,this.onGlobalKeyup=M(this.globalKeyup,this)),i&&D(document).on(f,this.onTouchStart=M(this.touchstart,this)),this.place()))},hide:function(){this.shown&&(this.trigger(h).isDefaultPrevented()||(this.shown=!1,this.$picker.addClass(g).off(n,this.click),this.inline||(this.$scrollParent.off(u,this.place),D(window).off(d,this.onResize),D(document).off(n,this.onGlobalClick),D(document).off(o,this.onGlobalKeyup),i&&D(document).off(f,this.onTouchStart))))},toggle:function(){this.shown?this.hide():this.show()},update:function(){var t=this.getValue();t!==this.oldValue&&(this.setDate(t,!0),this.oldValue=t)},pick:function(t){var e=this.$element,i=this.date;this.trigger(l,{view:t||"",date:i}).isDefaultPrevented()||(i=this.formatDate(this.date),this.setValue(i),this.isInput&&(e.trigger("input"),e.trigger("change")))},reset:function(){this.setDate(this.initialDate,!0),this.setValue(this.initialValue),this.shown&&this.showView(this.options.startView)},getMonthName:function(t,e){var i=this.options,a=i.monthsShort,s=i.months;return D.isNumeric(t)?t=Number(t):x(e)&&(e=t),!0===e&&(s=a),s[$(t)?t:this.date.getMonth()]},getDayName:function(t,e,i){var a=this.options,s=a.days;return D.isNumeric(t)?t=Number(t):(x(i)&&(i=e),x(e)&&(e=t)),i?s=a.daysMin:e&&(s=a.daysShort),s[$(t)?t:this.date.getDay()]},getDate:function(t){var e=this.date;return t?this.formatDate(e):new Date(e)},setDate:function(t,e){var i=this.options.filter;if(F(t)||b(t)){if(t=this.parseDate(t),D.isFunction(i)&&!1===i.call(this.$element,t,"day"))return;this.date=t,this.viewDate=new Date(t),e||this.pick(),this.built&&this.render()}},setStartDate:function(t){F(t)||b(t)?this.startDate=this.parseDate(t):this.startDate=null,this.built&&this.render()},setEndDate:function(t){F(t)||b(t)?this.endDate=this.parseDate(t):this.endDate=null,this.built&&this.render()},parseDate:function(a){var s=this.format,t=[];return F(a)||(b(a)&&(t=a.match(I)||[]),F(a=a?new Date(a):new Date)||(a=new Date),t.length===s.parts.length&&D.each(t,function(t,e){var i=parseInt(e,10);switch(s.parts[t]){case"dd":case"d":a.setDate(i);break;case"mm":case"m":a.setMonth(i-1);break;case"yy":a.setFullYear(2e3+i);break;case"yyyy":a.setFullYear(2===e.length?2e3+i:i)}})),new Date(a.getFullYear(),a.getMonth(),a.getDate())},formatDate:function(t){var e=this.format,i="";if(F(t)){var a=t.getFullYear(),s=t.getMonth(),n=t.getDate(),r={d:n,dd:S(n,2),m:s+1,mm:S(s+1,2),yy:String(a).substring(2),yyyy:S(a,4)};i=e.source,D.each(e.parts,function(t,e){i=i.replace(e,r[e])})}return i},destroy:function(){this.unbind(),this.unbuild(),this.$element.removeData(c)}},N={click:function(t){var e=D(t.target),i=this.options,a=this.date,s=this.viewDate,n=this.format;if(t.stopPropagation(),t.preventDefault(),!e.hasClass("disabled")){var r=e.data("view"),h=s.getFullYear(),o=s.getMonth(),l=s.getDate();switch(r){case"years prev":case"years next":h="years prev"===r?h-10:h+10,s.setFullYear(h),s.setDate(V(h,o,l)),this.renderYears();break;case"year prev":case"year next":h="year prev"===r?h-1:h+1,s.setFullYear(h),s.setDate(V(h,o,l)),this.renderMonths();break;case"year current":n.hasYear&&this.showView(w);break;case"year picked":n.hasMonth?this.showView(v):(e.siblings(".".concat(i.pickedClass)).removeClass(i.pickedClass).data("view","year"),this.hideView()),this.pick("year");break;case"year":h=parseInt(e.text(),10),a.setDate(V(h,o,l)),a.setFullYear(h),s.setDate(V(h,o,l)),s.setFullYear(h),n.hasMonth?this.showView(v):(e.addClass(i.pickedClass).data("view","year picked").siblings(".".concat(i.pickedClass)).removeClass(i.pickedClass).data("view","year"),this.hideView()),this.pick("year");break;case"month prev":case"month next":(o="month prev"===r?o-1:o+1)<0?(h-=1,o+=12):11<o&&(h+=1,o-=12),s.setFullYear(h),s.setDate(V(h,o,l)),s.setMonth(o),this.renderDays();break;case"month current":n.hasMonth&&this.showView(v);break;case"month picked":n.hasDay?this.showView(m):(e.siblings(".".concat(i.pickedClass)).removeClass(i.pickedClass).data("view","month"),this.hideView()),this.pick("month");break;case"month":o=D.inArray(e.text(),i.monthsShort),a.setFullYear(h),a.setDate(V(h,o,l)),a.setMonth(o),s.setFullYear(h),s.setDate(V(h,o,l)),s.setMonth(o),n.hasDay?this.showView(m):(e.addClass(i.pickedClass).data("view","month picked").siblings(".".concat(i.pickedClass)).removeClass(i.pickedClass).data("view","month"),this.hideView()),this.pick("month");break;case"day prev":case"day next":case"day":"day prev"===r?o-=1:"day next"===r&&(o+=1),l=parseInt(e.text(),10),a.setDate(1),a.setFullYear(h),a.setMonth(o),a.setDate(l),s.setDate(1),s.setFullYear(h),s.setMonth(o),s.setDate(l),this.renderDays(),"day"===r&&this.hideView(),this.pick("day");break;case"day picked":this.hideView(),this.pick("day")}}},globalClick:function(t){for(var e=t.target,i=this.element,a=this.$trigger[0],s=!0;e!==document;){if(e===a||e===i){s=!1;break}e=e.parentNode}s&&this.hide()},keyup:function(){this.update()},globalKeyup:function(t){var e=t.target,i=t.key,a=t.keyCode;this.isInput&&e!==this.element&&this.shown&&("Tab"===i||9===a)&&this.hide()},touchstart:function(t){var e=t.target;this.isInput&&e!==this.element&&!D.contains(this.$picker[0],e)&&(this.hide(),this.element.blur())}},j={render:function(){this.renderYears(),this.renderMonths(),this.renderDays()},renderWeek:function(){var i=this,a=[],t=this.options,e=t.weekStart,s=t.daysMin;e=parseInt(e,10)%7,s=s.slice(e).concat(s.slice(0,e)),D.each(s,function(t,e){a.push(i.createItem({text:e}))}),this.$week.html(a.join(""))},renderYears:function(){var t,e=this.options,i=this.startDate,a=this.endDate,s=e.disabledClass,n=e.filter,r=e.yearSuffix,h=this.viewDate.getFullYear(),o=(new Date).getFullYear(),l=this.date.getFullYear(),c=[],d=!1,u=!1;for(t=-5;t<=6;t+=1){var p=new Date(h+t,1,1),f=!1;i&&(f=p.getFullYear()<i.getFullYear(),-5===t&&(d=f)),!f&&a&&(f=p.getFullYear()>a.getFullYear(),6===t&&(u=f)),!f&&n&&(f=!1===n.call(this.$element,p,"year"));var g=h+t===l,y=g?"year picked":"year";c.push(this.createItem({picked:g,disabled:f,text:h+t,view:f?"year disabled":y,highlighted:p.getFullYear()===o}))}this.$yearsPrev.toggleClass(s,d),this.$yearsNext.toggleClass(s,u),this.$yearsCurrent.toggleClass(s,!0).html("".concat(h+-5+r," - ").concat(h+6).concat(r)),this.$years.html(c.join(""))},renderMonths:function(){var t,e=this.options,i=this.startDate,a=this.endDate,s=this.viewDate,n=e.disabledClass||"",r=e.monthsShort,h=D.isFunction(e.filter)&&e.filter,o=s.getFullYear(),l=new Date,c=l.getFullYear(),d=l.getMonth(),u=this.date.getFullYear(),p=this.date.getMonth(),f=[],g=!1,y=!1;for(t=0;t<=11;t+=1){var m=new Date(o,t,1),v=!1;i&&(v=(g=m.getFullYear()===i.getFullYear())&&m.getMonth()<i.getMonth()),!v&&a&&(v=(y=m.getFullYear()===a.getFullYear())&&m.getMonth()>a.getMonth()),!v&&h&&(v=!1===h.call(this.$element,m,"month"));var w=o===u&&t===p,k=w?"month picked":"month";f.push(this.createItem({disabled:v,picked:w,highlighted:o===c&&m.getMonth()===d,index:t,text:r[t],view:v?"month disabled":k}))}this.$yearPrev.toggleClass(n,g),this.$yearNext.toggleClass(n,y),this.$yearCurrent.toggleClass(n,g&&y).html(o+e.yearSuffix||""),this.$months.html(f.join(""))},renderDays:function(){var t,e,i,a=this.$element,s=this.options,n=this.startDate,r=this.endDate,h=this.viewDate,o=this.date,l=s.disabledClass,c=s.filter,d=s.months,u=s.weekStart,p=s.yearSuffix,f=h.getFullYear(),g=h.getMonth(),y=new Date,m=y.getFullYear(),v=y.getMonth(),w=y.getDate(),k=o.getFullYear(),D=o.getMonth(),b=o.getDate(),C=[],$=f,x=g,F=!1;0===g?($-=1,x=11):x-=1,t=G($,x);var M=new Date(f,g,1);for((i=M.getDay()-parseInt(u,10)%7)<=0&&(i+=7),n&&(F=M.getTime()<=n.getTime()),e=t-(i-1);e<=t;e+=1){var Y=new Date($,x,e),V=!1;n&&(V=Y.getTime()<n.getTime()),!V&&c&&(V=!1===c.call(a,Y,"day")),C.push(this.createItem({disabled:V,highlighted:$===m&&x===v&&Y.getDate()===w,muted:!0,picked:$===k&&x===D&&e===b,text:e,view:"day prev"}))}var T=[],S=f,I=g,P=!1;11===g?(S+=1,I=0):I+=1,t=G(f,g),i=42-(C.length+t);var N=new Date(f,g,t);for(r&&(P=N.getTime()>=r.getTime()),e=1;e<=i;e+=1){var j=new Date(S,I,e),q=S===k&&I===D&&e===b,A=!1;r&&(A=j.getTime()>r.getTime()),!A&&c&&(A=!1===c.call(a,j,"day")),T.push(this.createItem({disabled:A,picked:q,highlighted:S===m&&I===v&&j.getDate()===w,muted:!0,text:e,view:"day next"}))}var O=[];for(e=1;e<=t;e+=1){var W=new Date(f,g,e),z=!1;n&&(z=W.getTime()<n.getTime()),!z&&r&&(z=W.getTime()>r.getTime()),!z&&c&&(z=!1===c.call(a,W,"day"));var J=f===k&&g===D&&e===b,E=J?"day picked":"day";O.push(this.createItem({disabled:z,picked:J,highlighted:f===m&&g===v&&W.getDate()===w,text:e,view:z?"day disabled":E}))}this.$monthPrev.toggleClass(l,F),this.$monthNext.toggleClass(l,P),this.$monthCurrent.toggleClass(l,F&&P).html(s.yearFirst?"".concat(f+p," ").concat(d[g]):"".concat(d[g]," ").concat(f).concat(p)),this.$days.html(C.join("")+O.join("")+T.join(""))}},q="".concat(c,"-top-left"),A="".concat(c,"-top-right"),O="".concat(c,"-bottom-left"),W="".concat(c,"-bottom-right"),z=[q,A,O,W].join(" "),J=function(){function i(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),this.$element=D(t),this.element=t,this.options=D.extend({},s,y[e.language],D.isPlainObject(e)&&e),this.$scrollParent=function(t,e){var i=1<arguments.length&&void 0!==e&&e,a=D(t),s=a.css("position"),n="absolute"===s,r=i?/auto|scroll|hidden/:/auto|scroll/,h=a.parents().filter(function(t,e){var i=D(e);return(!n||"static"!==i.css("position"))&&r.test(i.css("overflow")+i.css("overflow-y")+i.css("overflow-x"))}).eq(0);return"fixed"!==s&&h.length?h:D(t.ownerDocument||document)}(t,!0),this.built=!1,this.shown=!1,this.isInput=!1,this.inline=!1,this.initialValue="",this.initialDate=null,this.startDate=null,this.endDate=null,this.init()}return function(t,e,i){e&&a(t.prototype,e),i&&a(t,i)}(i,[{key:"init",value:function(){var t=this.$element,e=this.options,i=e.startDate,a=e.endDate,s=e.date;this.$trigger=D(e.trigger),this.isInput=t.is("input")||t.is("textarea"),this.inline=e.inline&&(e.container||!this.isInput),this.format=function(i){var t=String(i).toLowerCase(),e=t.match(T);if(!e||0===e.length)throw new Error("Invalid date format.");return i={source:t,parts:e},D.each(e,function(t,e){switch(e){case"dd":case"d":i.hasDay=!0;break;case"mm":case"m":i.hasMonth=!0;break;case"yyyy":case"yy":i.hasYear=!0}}),i}(e.format);var n=this.getValue();this.initialValue=n,this.oldValue=n,s=this.parseDate(s||n),i&&(i=this.parseDate(i),s.getTime()<i.getTime()&&(s=new Date(i)),this.startDate=i),a&&(a=this.parseDate(a),i&&a.getTime()<i.getTime()&&(a=new Date(i)),s.getTime()>a.getTime()&&(s=new Date(a)),this.endDate=a),this.date=s,this.viewDate=new Date(s),this.initialDate=new Date(this.date),this.bind(),(e.autoShow||this.inline)&&this.show(),e.autoPick&&this.pick()}},{key:"build",value:function(){if(!this.built){this.built=!0;var t=this.$element,e=this.options,i=D(e.template);this.$picker=i,this.$week=i.find(Y("week")),this.$yearsPicker=i.find(Y("years picker")),this.$yearsPrev=i.find(Y("years prev")),this.$yearsNext=i.find(Y("years next")),this.$yearsCurrent=i.find(Y("years current")),this.$years=i.find(Y("years")),this.$monthsPicker=i.find(Y("months picker")),this.$yearPrev=i.find(Y("year prev")),this.$yearNext=i.find(Y("year next")),this.$yearCurrent=i.find(Y("year current")),this.$months=i.find(Y("months")),this.$daysPicker=i.find(Y("days picker")),this.$monthPrev=i.find(Y("month prev")),this.$monthNext=i.find(Y("month next")),this.$monthCurrent=i.find(Y("month current")),this.$days=i.find(Y("days")),this.inline?D(e.container||t).append(i.addClass("".concat(c,"-inline"))):(D(document.body).append(i.addClass("".concat(c,"-dropdown"))),i.addClass(g).css({zIndex:parseInt(e.zIndex,10)})),this.renderWeek()}}},{key:"unbuild",value:function(){this.built&&(this.built=!1,this.$picker.remove())}},{key:"bind",value:function(){var t=this.options,e=this.$element;D.isFunction(t.show)&&e.on(p,t.show),D.isFunction(t.hide)&&e.on(h,t.hide),D.isFunction(t.pick)&&e.on(l,t.pick),this.isInput&&e.on(o,D.proxy(this.keyup,this)),this.inline||(t.trigger?this.$trigger.on(n,D.proxy(this.toggle,this)):this.isInput?e.on(r,D.proxy(this.show,this)):e.on(n,D.proxy(this.show,this)))}},{key:"unbind",value:function(){var t=this.$element,e=this.options;D.isFunction(e.show)&&t.off(p,e.show),D.isFunction(e.hide)&&t.off(h,e.hide),D.isFunction(e.pick)&&t.off(l,e.pick),this.isInput&&t.off(o,this.keyup),this.inline||(e.trigger?this.$trigger.off(n,this.toggle):this.isInput?t.off(r,this.show):t.off(n,this.show))}},{key:"showView",value:function(t){var e=this.$yearsPicker,i=this.$monthsPicker,a=this.$daysPicker,s=this.format;if(s.hasYear||s.hasMonth||s.hasDay)switch(Number(t)){case w:i.addClass(g),a.addClass(g),s.hasYear?(this.renderYears(),e.removeClass(g),this.place()):this.showView(m);break;case v:e.addClass(g),a.addClass(g),s.hasMonth?(this.renderMonths(),i.removeClass(g),this.place()):this.showView(w);break;default:e.addClass(g),i.addClass(g),s.hasDay?(this.renderDays(),a.removeClass(g),this.place()):this.showView(v)}}},{key:"hideView",value:function(){!this.inline&&this.options.autoHide&&this.hide()}},{key:"place",value:function(){if(!this.inline){var t=this.$element,e=this.options,i=this.$picker,a=D(document).outerWidth(),s=D(document).outerHeight(),n=t.outerWidth(),r=t.outerHeight(),h=i.width(),o=i.height(),l=t.offset(),c=l.left,d=l.top,u=parseFloat(e.offset),p=q;C(u)&&(u=10),o<d&&s<d+r+o?(d-=o+u,p=O):d+=r+u,a<c+h&&(c+=n-h,p=p.replace("left","right")),i.removeClass(z).addClass(p).css({top:d,left:c})}}},{key:"trigger",value:function(t,e){var i=D.Event(t,e);return this.$element.trigger(i),i}},{key:"createItem",value:function(t){var e=this.options,i=e.itemTag,a={text:"",view:"",muted:!1,picked:!1,disabled:!1,highlighted:!1},s=[];return D.extend(a,t),a.muted&&s.push(e.mutedClass),a.highlighted&&s.push(e.highlightedClass),a.picked&&s.push(e.pickedClass),a.disabled&&s.push(e.disabledClass),"<".concat(i,' class="').concat(s.join(" "),'" data-view="').concat(a.view,'">').concat(a.text,"</").concat(i,">")}},{key:"getValue",value:function(){var t=this.$element;return this.isInput?t.val():t.text()}},{key:"setValue",value:function(t){var e=0<arguments.length&&void 0!==t?t:"",i=this.$element;this.isInput?i.val(e):this.inline&&!this.options.container||i.text(e)}}],[{key:"setDefaults",value:function(t){var e=0<arguments.length&&void 0!==t?t:{};D.extend(s,y[e.language],D.isPlainObject(e)&&e)}}]),i}();if(D.extend&&D.extend(J.prototype,j,N,P),D.fn){var E=D.fn.datepicker;D.fn.datepicker=function(h){for(var t=arguments.length,o=new Array(1<t?t-1:0),e=1;e<t;e++)o[e-1]=arguments[e];var l;return this.each(function(t,e){var i=D(e),a="destroy"===h,s=i.data(c);if(!s){if(a)return;var n=D.extend({},i.data(),D.isPlainObject(h)&&h);s=new J(e,n),i.data(c,s)}if(b(h)){var r=s[h];D.isFunction(r)&&(l=r.apply(s,o),a&&i.removeData(c))}}),x(l)?this:l},D.fn.datepicker.Constructor=J,D.fn.datepicker.languages=y,D.fn.datepicker.setDefaults=J.setDefaults,D.fn.datepicker.noConflict=function(){return D.fn.datepicker=E,this}}});
function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return true;
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        return true;
    }
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       //return true;
    }
    return false;
}
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if(iOS == true){
	document.documentElement.classList.add('ios');
	document.body.classList.add('ios');
}
/*Фикс MinHeight*/
function fixVhValueIE(){
	document.querySelectorAll('*').forEach(function(el){
		var _style = window.getComputedStyle(el).minHeight;
		if(_style != ''){
			var _clear = _style.replace(/(?:[0-9])/g, '');
			if(_clear && _clear != ''){
				if(/(vh)/.test(_clear) == true || window.innerHeight == parseInt(window.getComputedStyle(el).minHeight, 10)){
					if(el.nodeName.toLowerCase() != 'body' && el.nodeName.toLowerCase() != 'html'){
						el.style.height = '';
						if(window.innerHeight >= el.clientHeight){
							el.style.height = window.innerHeight+'px';
						}
					}
				}
			}
		}
	});
}
window.addEventListener('resize', fixVhValueIE);
if(detectIE() == true){
	fixVhValueIE();
}
/*Фикс MinHeight - конец*/
/*Фикс align-items в IE*/
function fixAliStIE(){
	document.querySelectorAll('*').forEach(function(el){
		document.querySelectorAll('.ie-fix-ali_st').forEach(function(el){
			el.style.height = '';
			var _parent = el.parentNode,
				_parentHeight = _parent.clientHeight;
			el.style.height = _parentHeight + 'px';
		});
	});
}
function fixMinHeight(){
	document.querySelectorAll('*').forEach(function(el){
		document.querySelectorAll('.ie-fix-min_height').forEach(function(el){
			el.style.height = '';
			var _height = el.clientHeight;
			el.style.height = _height + 'px';
		});
	});
}
window.addEventListener('resize', function(){
	fixAliStIE();
	fixMinHeight();
});
if(detectIE() == true){
	fixAliStIE();
	fixMinHeight();
}
/*Фикс align-items в IE - конец*/
;(function(){
    var regExp = function(name) {
        return new RegExp('(^| )'+ name +'( |$)');
    };
	/*
	Работа с родительскими элементами
	*/
    function wp__plugin(element) {
        this.element = element;
    }
	var animateValueTimer;
    wp__plugin.prototype = {
		retrieveBlockByClass: function(findClass){
			var current = this.element;
			var _ReturnParent = [];
			while(current.parentNode != null && current.parentNode != document.documentElement){
				if(current.parentNode.getAttribute('class') != null){
					if(regExp(findClass).test(current.parentNode.getAttribute('class')) == true){
						_ReturnParent.push(current.parentNode);
					}
				}
				current = current.parentNode;
			}
			if(_ReturnParent.length == 0){
				_ReturnParent = [document.documentElement];
			}
			return _ReturnParent;
		},
		retrieveBlock: function(el){
			var current = this.element;
			var _ReturnParent = [];
			while(current.parentNode != null && current.parentNode != document.documentElement){
				if(current.nodeName.toLowerCase() == el){
					_ReturnParent.push(current);
				}
				current = current.parentNode;
			}
			if(_ReturnParent.length == 0){
				_ReturnParent = [document.documentElement];
			}
			return _ReturnParent;
		},
		hasClassParents: function(findClass){
			var current = this.element;
			var _ReturnTest = false;
			while(current.parentNode != null && current.parentNode != document.documentElement){
				if(current.parentNode.getAttribute('class') != null){
					if(regExp(findClass).test(current.parentNode.getAttribute('class')) == true){
						_ReturnTest = true;
					}
				}
				current = current.parentNode;
			}
			return _ReturnTest;
		},
		hasClass: function(findClass){
			if(regExp(findClass).test(this.element.getAttribute('class')) == true){
				return true;
			}
			return false;
		},
		returnPrice: function(){
			var _number_result = wp__returnPrice(this.element.innerText);
			this.element.innerText = '';
			this.element.innerText = _number_result;
			var _element_attr = this.element.getAttribute('data-old_price');
			if(!_element_attr){
				this.element.setAttribute('data-old_price',_number_result);
			}
		},
		animateValue: function(start, end, duration, mode){
			obj = this.element;
			start = start.toString();
			end = end || parseInt(start.replace(/\D/g, ""));
			var range = end - start,
				minTimer = 50,
				stepTime = Math.abs(Math.floor(duration / range));
			stepTime = Math.max(stepTime, minTimer);
			var startTime = new Date().getTime(),
				endTime = startTime + duration;
			if(animateValueTimer){
				clearInterval(animateValueTimer);
			}
			function run() {
				var now = new Date().getTime();
				var remaining = Math.max((endTime - now) / duration, 0);
				var value = Math.round(end - (remaining * range));
				switch(mode){
					case 'price' : {
						obj.innerHTML = wp__returnPrice(start.replace(/([0-9]+)/g, value));
					} break;
					default: {
						obj.innerHTML = start.replace(/([0-9]+)/g, value);
					} break;
				}
				if (value == end) {
					clearInterval(animateValueTimer);
				}
			}
			animateValueTimer = setInterval(run, stepTime);
			run();
		},
		hasCSSProperty: function(_property,_value){
			var current = this.element;
			var _ReturnTest = false;
			while(current.parentNode != null && current.parentNode != document.documentElement && current.parentNode.nodeName.toLowerCase() != 'main' && current.parentNode.classList.contains('container') == false){
				if(window.getComputedStyle(current)[_property.toString()] == _value){
					_ReturnTest = true;
				}
				current = current.parentNode;
			}
			return _ReturnTest;
		}
    };
	Object.defineProperty(Element.prototype, 'wp__plugin', {
		get: function(){
			return new wp__plugin(this);
		}
	});
})();
Object.defineProperty(Element.prototype, '_outerWidth', {
	'get': function(){
		var width = this.clientWidth;
		var computedStyle = window.getComputedStyle(this); 
		width += parseInt(computedStyle.marginLeft, 10);
		width += parseInt(computedStyle.marginRight, 10);
		width += parseInt(computedStyle.borderLeftWidth, 10);
		width += parseInt(computedStyle.borderRightWidth, 10);
		return width;
	}
});
function wp__checkWidthBlock(_block,mode){
	var Block = document.createElement('div');
	Block.className = 'wp__checkWidthBlock';
	document.body.appendChild(Block);
	Block.innerHTML = _block;
	var widthBlock = Math.ceil(Block.clientWidth+1);
	var heightBlock = Math.ceil(Block.clientHeight+1);
	document.body.removeChild(Block);
	switch(mode){
		case 'height': {
			return heightBlock;
		} break;
		default: {
			return widthBlock;
		} break;
	}
}
//---------------------------
///Добавление пробелов к цене
//---------------------------
function wp__returnPrice(number, mode){
	var _number = number.toString().replace(/(\n|\t|\s|\r)/gi, ''), ///Очиста
		_numbers_array = _number.split(new RegExp('([0-9])','g')), ///Массив из чисел
		_number_array = [], ///Финальный массив с числами
		_number_result = ''; ///Результат который нужно вернуть
	_numbers_array.forEach(function(el){
		if(el != '') _number_array.push(el);
	});
	var _number_dif = Math.floor(_number_array.length / 3),
		_number_delimiter_indexs = ( _number_array.length - ( _number_dif * 3 ) ) - 1,
		_number_count = 0;
	_number_array.forEach(function(el,index){
		if(index > _number_delimiter_indexs){
			if(_number_count < 3){
				switch(mode){
					case 'span': {
						_number_result += '<span>'+el+'</span>';
					}
					break;
					default: {
						_number_result += el;
					}
					break;
				}
				_number_count++;
			} else {
				_number_result += ' '+el;
				_number_count = 0;
			}
		} else if(_number_delimiter_indexs > -1){
			var _delimiter = index == _number_delimiter_indexs ? ' ': '';
			_number_result += el+_delimiter;
		}
	});
	return _number_result;
}
function _checkPhone(value){
	var phoneFilter = /^[+]*[7]\s[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
	if(!phoneFilter.test(value)){
		return false;
	}
	return true;
}
function _checkPhone_Start(value){
	/*var phoneFilter = /^[+]*[7]\s[(]{0,1}([0-9][_]{2}|[0-9]{2}[_]|[0-9]){1,3}[)]{0,1}([-\s\./0-9]|\s([_]|[0-9]){3}[-]([_]|[0-9]){2}[-]([_]|[0-9]){2})*$/g;*/
	var phoneFilter = /^[+][7]\s\(([0-9\_]){1,3}\)([-\s\./0-9]|\s([0-9\_]){3}\-([0-9\_]){2}\-([0-9\_]){2})*$/g;
	if(!phoneFilter.test(value)){
		return false;
	}
	return true;
}
function _checkEmail(email){
	var emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g;
	if (!emailFilter.test(email)) {
		return false;
	}
	return true;
}
function _setScrollbar() {
	var rect = document.body.getBoundingClientRect();
	var _isBodyOverflowing = rect.left + rect.right < window.innerWidth;
	var _scrollbarWidth = _getScrollbarWidth();
	if(_isBodyOverflowing){
		$('body').css('padding-right',_scrollbarWidth+'px');
	}
};
function _resetScrollbar(){
	$('body').css('padding-right','0px');
}
function _getScrollbarWidth() {
	var scrollDiv = document.createElement('div');
	scrollDiv.className = 'modal-scrollbar-measure';
	document.body.appendChild(scrollDiv);
	var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
	document.body.removeChild(scrollDiv);
	return scrollbarWidth;
};
var parentsDelFile = '';
function deleteFile(_self){
	if(Array.isArray(_self) == false){
		_self = $(_self);
	}
	parentsDelFile = _self.parents('.document-link').length == 1 ? _self.parents('.document-link') : false;
	if(parentsDelFile != false){
		if(parentsDelFile.hasClass('with-del') == true){
			if(_self.hasClass('openModalBTN') == true){
				var targetModal = $('#'+_self.attr('data-targetModal')).length > 0 ? $('#'+_self.attr('data-targetModal')) : false;
				if(targetModal != false){
					var buttonAfterOk = targetModal.find('*[data-action="del-file-after-modal"]').length > 0 ? targetModal.find('*[data-action="del-file-after-modal"]') : false;
					if(buttonAfterOk != false){
						buttonAfterOk.on('click', function(){
							$('body').removeClass('overflow');
							$('html').removeClass('overflow');
							_resetScrollbar();
							targetModal.removeClass('openModal');
							parentsDelFile.remove();
						});
					}
				}
			} else {
				parentsDelFile.remove();
			}
		}
	}
}
$(function(){
	if($('.photos--item').length > 0){
		_GALLERY = $('.photos--item');
		_GALLERY.lightGallery({
			download: false,
			counter: false,
			share: false,
			autoplay: false,
			actualSize: false,
			thumbnail: false,
			selector: 'this'
		});
	}
	/*$(window).click(function(event){
		if($(event.target).hasClass('modal') == true){
			if($('.mobile-menu_btn').hasClass('open-menu') == false){
				$('body').removeClass('openModal');
				$('html').removeClass('openModal');
				_resetScrollbar();
			}
			$(event.target).removeClass('openModal');
		}
	});*/
	/*Маска телефона*/	
	if($('.phone_input').length > 0){
		$('.phone_input').inputmask({
			"showMaskOnHover": false,
			"mask": "+7 (999) 999-99-99"
		});
	}
	/*Поиск*/
	var searchAction = {
		'click': function(_self){
			if($('.search-container').length > 0){
				var startCount = _self.parents('.nav-btns'),
					startCountTop = ( startCount.offset().top + ( startCount.outerHeight(true) / 2 ) ) - ( $('.search-container').outerHeight(true) / 2 ),
					endCount = _self.parents('.navigation-container').find('.logo'),
					startCountNum = $(window).width() - startCount.offset().left,
					endCountNum = ( endCount.offset().left + endCount.outerWidth(true) ) + 52;
				if($('.search-container').hasClass('active') == true){
					$('.search-container').removeClass('active');
				} else {
					$('.search-container').addClass('active');
				}
				$('.search-container').css({
					'left': endCountNum+'px',
					'right': startCountNum+'px',
					'top': startCountTop+'px'
				});
			}
		},
		'refresh': function(){
			if($('.search-container').length > 0){
				var _self = $('.navigation-container .nav-btns').find('.search');
				var startCount = _self.parents('.nav-btns'),
					startCountTop = ( startCount.offset().top + ( startCount.outerHeight(true) / 2 ) ) - ( $('.search-container').outerHeight(true) / 2 ),
					endCount = _self.parents('.navigation-container').find('.logo'),
					startCountNum = $(window).width() - startCount.offset().left,
					endCountNum = ( endCount.offset().left + endCount.outerWidth(true) ) + 52;
				$('.search-container').css({
					'left': endCountNum+'px',
					'right': startCountNum+'px',
					'top': startCountTop+'px'
				});
			}
		}
	}
	window.addEventListener('resize', searchAction.refresh);
	/*События*/
	function _chechedIcon(_el,_mode){
		var _find_icon = _el.parents('.label-wrapper').find('.tgk-checked').length > 0 ? _el.parents('.label-wrapper').find('.tgk-checked') : false,
			_find_wrapper = _el.parents('.label-wrapper').length > 0 ? _el.parents('.label-wrapper') : false;
		if(_find_icon != false && _find_wrapper != false){
			switch(_mode){
				case 'remove': {
					_find_wrapper.removeClass('checked');
				} break;
				default: {
					_find_wrapper.addClass('checked');
				} break;
			}
		}
	}
	function checkValForInput(_self, _modeForm){
		if(_self.attr('type') == 'email'){
			/*E-mail*/
			if(_self.val() != ''){
				if(_checkEmail(_self.val()) == true){
					_self.parents('.label-input').removeClass('error');
					_chechedIcon(_self);
				} else {
					_self.parents('.label-input').addClass('error');
					_chechedIcon(_self,'remove');
				}
				_self.parents('.label-input').addClass('value');
			} else {
				_self.parents('.label-input').removeClass('value');
				if(_checkEmail(_self.val()) == false){
					_self.parents('.label-input').removeClass('error');
					_chechedIcon(_self,'remove');
				}
			}
		} else if(_self.hasClass('phone_input') == true){
			/*Телефон*/
			if((_self.val() != '' && _checkPhone_Start(_self.val()) == true ) || (_self.val() != '' && _checkPhone(_self.val()) == true)){
				if(_checkPhone(_self.val()) == true){
					_self.parents('.label-input').removeClass('error');
					_chechedIcon(_self);
				} else {
					if(_checkPhone_Start(_self.val()) == true){
						_self.parents('.label-input').addClass('error');
					}
					_chechedIcon(_self,'remove');
				}
				_self.parents('.label-input').addClass('value');
			} else {
				_self.parents('.label-input').removeClass('value');
				if(_checkPhone_Start(_self.val()) == false){
					_self.parents('.label-input').removeClass('error');
				}
				_chechedIcon(_self,'remove');
			}
		} else if(_self.attr('type') == 'password'){
			/*Пароль*/
			var _parent = _self.parents('.label-input'),
				_parent_next = _parent.next('.label-input'),
				_parent_next_input = _parent_next.find('input[type="password"]'),
				_parent_next_input_check = 	_parent_next_input.length > 0 ? true : false,
				_parent_prev_input_check = _parent.prev('.label-input').find('input[type="password"]').length > 0 ? true : false,
				_check_wrapper = _parent.parents('.label-wrapper').length > 0 ? true : false;
			if(_check_wrapper == true){
				_parent = _self.parents('.label-wrapper').find('.label-input');
				_parent_next = _self.parents('.label-wrapper').next('.label-wrapper').find('.label-input');
				_parent_next_input = _parent_next.find('input[type="password"]');
				_parent_next_input_check = 	_parent_next_input.length > 0 ? true : false;
				_parent_prev_input_check = _self.parents('.label-wrapper').prev('.label-wrapper').find('.label-input').find('input[type="password"]').length > 0 ? true : false;
			}
			if(_parent_next_input_check == false && _parent_prev_input_check == false){
				if(_self.val() != ''){
					_self.parents('.label-input').addClass('value');
					_chechedIcon(_self);
					_self.parents('.label-input').removeClass('error');
				} else {
					_self.parents('.label-input').removeClass('value');
				}
			} else {
				if(_parent_prev_input_check == true){
					_parent_next = _parent.prev('.label-input');
					_parent_next_input = _parent.prev('.label-input').find('input[type="password"]');
					if(_check_wrapper == true){
						_parent_next = _parent.parents('.label-wrapper').prev('.label-wrapper').find('.label-input');
						_parent_next_input = _parent_next.find('input[type="password"]');
					}
				}
				if(_self.val() == _parent_next_input.val()){
					/*Пароли совпали*/
					_self.parents('.label-input').removeClass('error');
					_parent_next.removeClass('error');
					_chechedIcon(_self);
					_chechedIcon(_parent_next);
				} else {
					/*Пароли не совпали*/
					_self.parents('.label-input').addClass('error');
					_parent_next.addClass('error');
					_chechedIcon(_self,'remove');
					_chechedIcon(_parent_next,'remove');
				}
				if(_self.val() != ''){
					_self.parents('.label-input').addClass('value');
				} else {
					_self.parents('.label-input').removeClass('value');
				}
			}
		} else if(_self.attr('type') == 'text'){
			/*Обычный текст*/
			if(_self.val() != ''){
				_self.parents('.label-input').addClass('value');
				_chechedIcon(_self);
				_self.parents('.label-input').removeClass('error');
			} else {
				_self.parents('.label-input').removeClass('value');
				_chechedIcon(_self,'remove');
			}
			if(_modeForm == true){
				if(_self.prop('required') == true){
					if(_self.val() == ''){
						_self.parents('.label-input').addClass('error');
					} else {
						_self.parents('.label-input').removeClass('error');
					}
				}
			}
		} else if(_self.is('textarea') == true){
			/*Обычный текст*/
			if(_self.val() != ''){
				_self.parents('.label-textarea').addClass('value');
				_chechedIcon(_self);
				_self.parents('.label-textarea').removeClass('error');
			} else {
				_self.parents('.label-textarea').removeClass('value');
				_chechedIcon(_self,'remove');
			}
			if(_modeForm == true){
				if(_self.prop('required') == true){
					if(_self.val() == ''){
						_self.parents('.label-textarea').addClass('error');
					} else {
						_self.parents('.label-textarea').removeClass('error');
					}
				}
			}
		}
	}
	$('input').each(function(){
		checkValForInput($(this));
	});
	$('textarea').each(function(){
		checkValForInput($(this));
	});
	document.onload = function(){
		$('input').each(function(){
			checkValForInput($(this));
		});
		$('textarea').each(function(){
			checkValForInput($(this));
		});
	};
	var startInputCheck = new Date().getTime();
	function stepInputCheck(timestamp){
		var nowInputCheck = new Date().getTime(),
			dif = nowInputCheck - startInputCheck;
		if(dif > 1500){
			startInputCheck = nowInputCheck;
			$('input').each(function(){
				if($(this).parents('label').hasClass('error') == false){
					checkValForInput($(this));
				}
			});
			$('textarea').each(function(){
				if($(this).parents('label').hasClass('error') == false){
					checkValForInput($(this));
				}
			});
		}
		window.requestAnimationFrame(stepInputCheck);
	}
	window.requestAnimationFrame(stepInputCheck);
	$(document).on('change, keyup, input', function(){
		var _self = $(event.target);
		checkValForInput(_self);
	});
	$(document).on('change', 'input[type="file"]', function(){
		for(var i = 0; i < $(this)[0].files.length; i++){
			var file = $(this)[0].files[i].name,
				blockForFiles = $('#'+$(this).attr('data-file_upload_block')),
				blockForFilesOldHtml = blockForFiles.html(),
				templateDocument = '<div class="document-link with-del">'+
										'<img src="styles/img/files/pdf-file.svg" alt="" />'+
										'<p>'+file+'</p>'+
										'<span class="document-delete tgk-delete"></span>'+
									'</div>';
			blockForFiles.html(blockForFilesOldHtml+templateDocument);
		}
		if(
			$(this).attr('data-empty_files') 
			&& 
			$(this).attr('data-empty_files') != '' 
			&& 
			$(this).attr('data-empty_files') 
			&& 
			$(this).attr('data-empty_files') != ''
		){
			var btn = $(this).parents('.label-file').find('.label-file_button');
			if(blockForFiles.find('.document-link').length > 0){
				btn.text($(this).attr('data-not_empty_files'));
			} else {
				btn.text($(this).attr('data-empty_files'));
			}
		}
	});
	$(document).on('click', function(event){
		var _self = $(event.target);
		/*Удаление файла*/
		if(_self.hasClass('document-delete') == true || _self.parents('document-delete').length > 0){
			deleteFile(_self);
		}
		/*Навигационная панель*/
		if(
			(
				(
					_self.hasClass('navmenu-close') == true 
					|| 
					_self.parents('.navmenu-close').length > 0 
				) 
				&& 
				_self.parents('.navmenu').length > 0
			) 
			|| 
			( 
				_self.parents('.nav-btns').length > 0 
				&& 
				( _self.hasClass('menu') == true || _self.parents('.menu').length > 0 )
			)
		){
			$('.navmenu').toggleClass('active');
			$('html').toggleClass('overflow');
			$('body').toggleClass('overflow');
		}
		/*Следующий блок*/
		if(_self.hasClass('goto_next_section') == true || _self.parents('.goto_next_section').length > 0){
			event.preventDefault();
			var nextSection = _self.parents('section').next(),
				nextSectionPos = nextSection.offset().top;
			$([document.documentElement, document.body]).stop().animate({
				scrollTop: nextSectionPos
			}, 1000);
		}
		/*Модальные окна*/
		if(
			( _self.hasClass('openModalBTN') == true || _self.parents('.openModalBTN').length > 0 ) 
			|| 
			( _self.parents('.openModalBTN').length > 0 ) 
		){
			event.preventDefault();
			_self = _self.hasClass('openModalBTN') == false ? _self.parents('.openModalBTN') : _self;
			_setScrollbar();
			$('body').addClass('overflow');
			$('html').addClass('overflow');
			var targetBlock = _self.attr('data-targetModal');
			$('.modal').removeClass('openModal');
			$('#'+targetBlock).addClass('openModal');
		}
		if(
			( _self.hasClass('modal-close') == true || _self.parents('.modal-close').length > 0 ) 
			|| 
			_self.hasClass('modal') == true 
		){
			var _self = _self.hasClass('modal') == false ? _self.parents('.modal') : _self;
			$('body').removeClass('overflow');
			$('html').removeClass('overflow');
			_resetScrollbar();
			_self.removeClass('openModal');
		}
		if(_self.attr('data-action') == 'modal-close' || _self.parents().attr('data-action') == 'modal-close'){
			var _self = _self.hasClass('modal') == false ? _self.parents('.modal') : _self;
			$('body').removeClass('overflow');
			$('html').removeClass('overflow');
			_resetScrollbar();
			_self.removeClass('openModal');
		}
		/*Табы*/
		if(
			( _self.attr('data-action') && _self.attr('data-action') != '' && _self.attr('data-action') == 'tab-chnger' ) 
			|| 
			( _self.parents('[data-action]').attr('data-action') && _self.parents('[data-action]').attr('data-action') != '' && _self.parents('[data-action]').attr('data-action') == 'tab-chnger' )
		){
			var _self = ( !_self.attr('data-action') && _self.attr('data-action') != 'tab-chnger' ) ? _self.parents('[data-action]') : _self,
				_main_class = ( _self.attr('data-tab_main_class') && _self.attr('data-tab_main_class') != '' ) ? _self.attr('data-tab_main_class') : false,
				_tab_id = ( _self.attr('data-tab_id') && _self.attr('data-tab_id') != '' ) ? _self.attr('data-tab_id') : false;
			if(_main_class != false && _tab_id != false){
				var _test_main_class = $('.'+_main_class).length > 0 ? $('.'+_main_class) : false,
					_test_tab_id = $('#'+_tab_id).length > 0 ? $('#'+_tab_id) : false;
				if(_test_main_class != false && _test_tab_id != false){
					var _all_btns = $('button[data-tab_main_class="'+_main_class+'"]');
					_all_btns.removeClass('active');
					_self.addClass('active');
					_test_main_class.removeClass('active');
					_test_tab_id.addClass('active');
					var checkSlider = _test_tab_id.find('.slick-slider').length > 0 ? _test_tab_id.find('.slick-slider') : false;
					if(checkSlider != false){
						checkSlider.each(function(){
							$(this).slick('slickGoTo', 0);
						});
					}
				}
			}
		}
		/*Аккордион с таблицами*/
		if(_self[0].classList.contains('table-accordion--title') == true || _self[0].wp__plugin.hasClassParents('table-accordion--title') == true){
			var _accordion = _self[0].wp__plugin.retrieveBlockByClass('table-accordion--item')[0];
			document.querySelectorAll('.table-accordion--item').forEach(function(el){
				if(Object.is(el, _accordion) == false){
					el.classList.remove('active');
				}
			});
			_accordion.classList.toggle('active');
		}
		/*Проверка полей для ввода*/
		if( _self.parents('form').length > 0 && ( _self.parents('button').length > 0 || _self.is('button') == true ) ){
			_self = _self.is('button') == false ? _self.parents('button') : _self;
			var _form = _self.parents('form'),
				_inputs = _form.find('input'),
				_textarea = _form.find('textarea'),
				_checkbox = _form.find('input[type="checkbox"]');
			_inputs.each(function(){
				if($(this).prop('required') == true){
					if($(this).hasClass('phone_input') == true){
						if(($(this).val() != '' && _checkPhone_Start($(this).val()) == true ) || ($(this).val() != '' && _checkPhone($(this).val()) == true)){
							if(_checkPhone($(this).val()) == true){
								$(this).parents('.label-input').removeClass('error');
								_chechedIcon($(this));
							} else {
								if(_checkPhone_Start($(this).val()) == true){
									$(this).parents('.label-input').addClass('error');
								}
								_chechedIcon($(this),'remove');
							}
						} else {
							if(_checkPhone_Start($(this).val()) == false){
								$(this).parents('.label-input').addClass('error');
							}
							_chechedIcon($(this),'remove');
						}
					} else if(_self.attr('type') == 'email'){
						/*E-mail*/
						if(_self.val() != ''){
							if(_checkEmail(_self.val()) == true){
								_self.parents('.label-input').removeClass('error');
								_chechedIcon(_self);
							} else {
								_self.parents('.label-input').addClass('error');
								_chechedIcon(_self,'remove');
							}
						} else {
							if(_checkEmail(_self.val()) == false){
								_self.parents('.label-input').removeClass('error');
								_chechedIcon(_self,'remove');
							}
						}
					} else {
						if($(this).val() == ''){
							$(this).parents('.label-input').addClass('error');
						} else {
							$(this).parents('.label-input').removeClass('error');
						}
					}
				}
			});
			_textarea.each(function(){
				if($(this).prop('required') == true){
					if($(this).val() == ''){
						$(this).parents('.label-textarea').addClass('error');
					} else {
						$(this).parents('.label-textarea').removeClass('error');
					}
				}
			});
			_checkbox.each(function(){
				if($(this).prop('required') == true){
					if($(this).prop('checked') == false){
						$(this).parents('.label-checkbox').addClass('error');
					} else {
						$(this).parents('.label-checkbox').removeClass('error');
					}
				}
			});
		}
		/*Поиск*/
		if(_self.hasClass('search') == true || _self.parents('.search').length > 0){
			_self = _self.hasClass('search') == true ? _self : _self.parents('.search');
			searchAction.click(_self);
		}
	});
	$(document).on('change', 'input[type="checkbox"]', function(){
		if($(this).parents('.label-checkbox').hasClass('error') == true){
			if($(this).prop('required') == true){
				if($(this).prop('checked') == true){
					$(this).parents('.label-checkbox').removeClass('error');
				}
			}
		}
	});
	/*Кастомные селекты*/
	$('.select').each(function(){
		$(this).styler({selectSmartPositioning:false});
	});
	$('.select-filter').each(function(){
		$(this).styler({selectSmartPositioning:false});
	});
	$('.select-region--select').each(function(){
		$(this).styler({selectSmartPositioning:false});
	});
	/*Выпадающий календарь*/
	if($('[data-toggle="datepicker"]').length > 0){
		$('[data-toggle="datepicker"]').datepicker({
			format: 'dd.mm.yyyy',
			days: ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],
			daysShort: ["Вос","Пон","Вто","Сре","Чет","Пят","Суб"],
			daysMin: ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],
			months: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
			monthsShort: ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"]
		});
		$('[data-toggle="datepicker"]').inputmask({
			"showMaskOnHover": false,
			"mask": "99.99.9999"
		});
	}
	/*Кнопки в личном кабинете*/
	if($('.user-tabs-btns').length > 0){
		if($('.user-tabs-btns--container')){
			function returnWidth(){
				if(detectIE() == true){
					$('.user-tabs-btns--container').css('min-width','1px');
					var minWidth = 0;
					$('.user-tabs-btns--container').find('button').each(function(){
						$(this).css('min-width','1px');
						var minWidthSpan = 0,
							padding = {
								'left': parseInt(window.getComputedStyle($(this)[0]).paddingLeft, 10),
								'right': parseInt(window.getComputedStyle($(this)[0]).paddingRight, 10)
							}
						$(this).find('span').each(function(){
							minWidthSpan += $(this).outerWidth(true);
						});
						minWidthSpan += ( padding.left +padding.right );
						$(this).css('min-width',minWidthSpan+'px');
						minWidth += minWidthSpan;
					});
					$('.user-tabs-btns--container').css('min-width',minWidth+'px');
				} else {
					$('.user-tabs-btns--container').css('min-width','1px');
					$('.user-tabs-btns--container').css('min-width',$('.user-tabs-btns--container').outerWidth(true)+'px');
				}
			}
			returnWidth();
			$(".user-tabs-btns").mCustomScrollbar({
				axis:"x",
				autoHideScrollbar:false
			});
			window.addEventListener('resize', function(){
				$(".user-tabs-btns").mCustomScrollbar("destroy");
				returnWidth();
				$(".user-tabs-btns").mCustomScrollbar({
					axis:"x",
					autoHideScrollbar:false
				});
			});
		}
	}
	/*Кнопки в фильтре*/
	if($(".filter-tab-btns").length > 0){
		if($('.filter-tab-btns--inner')){
			function returnWidth(){
				if(detectIE() == true){
					$('.filter-tab-btns--inner').css('min-width','1px');
					var minWidth = 0;
					$('.filter-tab-btns--inner').find('button').each(function(){
						$(this).css('min-width','1px');
						var minWidthSpan = 0,
							padding = {
								'left': parseInt(window.getComputedStyle($(this)[0]).paddingLeft, 10),
								'right': parseInt(window.getComputedStyle($(this)[0]).paddingRight, 10)
							}
						$(this).find('span').each(function(){
							minWidthSpan += $(this).outerWidth(true);
						});
						minWidthSpan += ( padding.left +padding.right );
						$(this).css('min-width',minWidthSpan+'px');
						minWidth += minWidthSpan;
					});
					$('.filter-tab-btns--inner').css('min-width',minWidth+'px');
				} else {
					$('.filter-tab-btns--inner').css('min-width','1px');
					$('.filter-tab-btns--inner').css('min-width',$('.filter-tab-btns--inner').outerWidth(true)+'px');
				}
			}
			returnWidth();
			$(".filter-tab-btns").mCustomScrollbar({
				axis:"x",
				autoHideScrollbar:false
			});
			window.addEventListener('resize', function(){
				$(".filter-tab-btns").mCustomScrollbar("destroy");
				returnWidth();
				$(".filter-tab-btns").mCustomScrollbar({
					axis:"x",
					autoHideScrollbar:false
				});
			});
		}
	}
	/*Кнопки в Забайкалье*/
	if($(".zab-tab-btns").length > 0){
		if($('.zab-tab-btns--inner')){
			function returnWidth(){
				if(detectIE() == true){
					$('.zab-tab-btns--inner').css('min-width','1px');
					var minWidth = 0;
					$('.zab-tab-btns--inner').find('button').each(function(){
						$(this).css('min-width','1px');
						var minWidthSpan = 0,
							padding = {
								'left': parseInt(window.getComputedStyle($(this)[0]).paddingLeft, 10),
								'right': parseInt(window.getComputedStyle($(this)[0]).paddingRight, 10)
							}
						$(this).find('span').each(function(){
							minWidthSpan += $(this).outerWidth(true);
						});
						minWidthSpan += ( padding.left +padding.right );
						$(this).css('min-width',minWidthSpan+'px');
						minWidth += minWidthSpan;
					});
					$('.zab-tab-btns--inner').css('min-width',minWidth+'px');
				} else {
					$('.zab-tab-btns--inner').css('min-width','1px');
					$('.zab-tab-btns--inner').css('min-width',$('.zab-tab-btns--inner').outerWidth(true)+'px');
				}
			}
			returnWidth();
			$(".zab-tab-btns").mCustomScrollbar({
				axis:"x",
				autoHideScrollbar:false
			});
			window.addEventListener('resize', function(){
				$(".zab-tab-btns").mCustomScrollbar("destroy");
				returnWidth();
				$(".zab-tab-btns").mCustomScrollbar({
					axis:"x",
					autoHideScrollbar:false
				});
			});
		}
	}
	/*Детальная страница новостей*/
	if($('.news-detail--left').length > 0){
		function scrollLeftSideNews(){
			if($(window).width() > 991){
				var _nowPos = window.pageYOffset || document.documentElement.scrollTop,
					_posBlock = $('.news-detail--left').offset().top;
				if(_nowPos >= _posBlock){
					var _maxScroll = ( $('.news-detail--next').offset().top - 85 ) - $('.news-detail--left-inner').outerHeight(true);
					if(_nowPos < _maxScroll){
						$('.news-detail--left-inner').css('top',(_nowPos - _posBlock)+'px');
					} else {
						$('.news-detail--left-inner').css('top',(_maxScroll - _posBlock)+'px');
					}
				} else {
					$('.news-detail--left-inner').css('top','0');
				}
			} else {
				$('.news-detail--left-inner').css('top','0');
			}
		}
		scrollLeftSideNews();
		window.addEventListener('scroll', scrollLeftSideNews);
		window.addEventListener('resize', scrollLeftSideNews);
	}
});
/*----------------*/
/*----Заглушки----*/
/*Нужно для того чтобы показывать модальные окна при выполнении условий функции*/
/*----------------*/
function stub_form(event,_this){
	event.preventDefault();
	if(_this){
		var _self = $(_this).find('.stub_form--btn');
		_setScrollbar();
		$('body').addClass('overflow');
		$('html').addClass('overflow');
		var targetBlock = _self.attr('data-targetModal');
		$('.modal').removeClass('openModal');
		$('#'+targetBlock).addClass('openModal');
	}
}
/*----------------*/
/*Заглушки - конец*/
/*----------------*/
/*-------------
Таблица
-------------*/
var tableAccordion = {
	'init': function(){
		/*Проверяем кол-во основных блоков таблицы*/
		var _mainBlock = document.querySelectorAll('.table-accordion').length > 0 ? document.querySelectorAll('.table-accordion') : false;
		if(_mainBlock != false){
			var _minWidth = {};
			_mainBlock.forEach(function(table){
				/*Проверяем кол-во таблиц*/
				var _tableContainer = table.querySelectorAll('.table-accordion--container').length > 0 ? table.querySelectorAll('.table-accordion--container') : false;
				if(_tableContainer != false){
					_tableContainer.forEach(function(_container){
						/*Получаем все таблицы*/
						var _tableContainerTables = _container.querySelectorAll('table').length > 0 ? _container.querySelectorAll('table') : false;
						if(_tableContainerTables != false){
							_tableContainerTables.forEach(function(_table){
								/*Получаем все линии*/
								var _tableTR = _table.querySelectorAll('tr').length > 0 ? _table.querySelectorAll('tr') : false;
								if(_tableTR != false){
									_tableTR.forEach(function(_tr, index){
										if(index == 0){
											/*Получаем все заголовки и холдеры*/
											var _check = 	_tr.querySelectorAll('th').length > 0 
															? 
															_tr.querySelectorAll('th') 
															: 
															(
																_tr.querySelectorAll('td').length > 0 
																? 
																_tr.querySelectorAll('td') 
																: 
																false 
															);
											if(_check != false){
												_check.forEach(function(_block, index){
													//_block.style.width = '';
													_block.style.minWidth = '';
													_block.style.maxWidth = '';
													var _width = _block._outerWidth;
													/*Установка минимальных значений*/
													if(!_minWidth[index] || _minWidth[index] == ''){
														_minWidth[index] = _width;
													} else {
														if(_width > _minWidth[index]){
															_minWidth[index] = _width;
														}
													}
												});
											}
										}
									});
								}
							});
						}
					});
					_tableContainer.forEach(function(_container){
						/*Получаем все таблицы*/
						var _tableContainerTables = _container.querySelectorAll('table').length > 0 ? _container.querySelectorAll('table') : false;
						if(_tableContainerTables != false){
							_tableContainerTables.forEach(function(_table){
								/*Получаем все линии*/
								var _tableTR = _table.querySelectorAll('tr').length > 0 ? _table.querySelectorAll('tr') : false;
								if(_tableTR != false){
									_tableTR.forEach(function(_tr, index){
										if(index == 0){
											/*Получаем все заголовки и холдеры*/
											var _check = 	_tr.querySelectorAll('th').length > 0 
															? 
															_tr.querySelectorAll('th') 
															: 
															(
																_tr.querySelectorAll('td').length > 0 
																? 
																_tr.querySelectorAll('td') 
																: 
																false 
															);
											if(_check != false){
												_check.forEach(function(_block, index){
													//_block.style.width = '';
													_block.style.minWidth = '';
													_block.style.maxWidth = '';
													//_block.style.width = _minWidth[index]+'px';
													_block.style.minWidth = _minWidth[index]+'px';
													_block.style.maxWidth = _minWidth[index]+'px';
												});
											}
										}
									});
								}
							});
						}
					});
				}
				tableAccordion.events();
			});
		}
	},
	'events': function(){
		/*Проверяем кол-во основных блоков таблицы*/
		var _mainBlock = document.querySelectorAll('.table-accordion').length > 0 ? document.querySelectorAll('.table-accordion') : false;
		if(_mainBlock != false){
			var _minWidth = {};
			_mainBlock.forEach(function(table){
				/*Проверяем кол-во таблиц*/
				var _tableContainer = table.querySelectorAll('.table-accordion--container').length > 0 ? table.querySelectorAll('.table-accordion--container') : false,
					scrollX = 0;
				if(_tableContainer != false){
					_tableContainer.forEach(function(_container){
						_container.addEventListener('scroll', function(){
							scrollX = this.scrollLeft;
							var _containerThis = this;
							_tableContainer.forEach(function(_containerForEvent){
								if(Object.is(_containerThis, _containerForEvent) == false){
									_containerForEvent.scrollLeft = scrollX;
								}
							});
						});
					});
				}
			});
		}
		window.addEventListener('resize', tableAccordion.init);
	}
}
tableAccordion.init();
window.onload = tableAccordion.init;
document.addEventListener("DOMContentLoaded", tableAccordion.init);
/*-------------
Таблица - конец
-------------*/
//---------------------------
///Добавление пробелов к цене - конец
//---------------------------
$(function(){
	var about_us = {
		'init_small': function(){
			$('.about_us--small').each(function(){
				var count = $(this).find('.about_us--small-slide').length,
					counter_now = $(this).find('.about_us--small-counter__now'),
					counter_full = $(this).find('.about_us--small-counter__all');
				counter_now.text('1');
				counter_full.text(count);
				$(this).find('.about_us--small-main').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 5000,
					arrows: false,
					dots: false
				});
				$(this).find('.about_us--small-main').on('afterChange', function(event, slick, currentSlide){
					counter_now.text((currentSlide+1));
				});
			});
		},
		'init_horiz': function(){
			$('.about_us--horiz-main').each(function(){
				var el = $(this),
					timeoutcount,
					_parent = el.parents('.about_us--horiz'),
					nav = _parent.find('.nav-carousel'),
					nav_test = nav.length > 0 ? true : false;
				if(nav_test == true){
					var count_slide = el.find('.about_us--horiz-slide').length,
						count_slide_while = 1,
						count_slide_btn = '';
					while(count_slide_while <= count_slide){
						count_slide_btn += '<li><button data-slide="'+(count_slide_while-1)+'"></button></li>';
						count_slide_while++;
					}
					nav.find('ul').html(count_slide_btn);
				}
				el.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: false
				});
				if(nav_test == true){
					nav.find('ul').find('button').click(function(){
						var index = parseInt($(this).attr('data-slide'), 10);
						el.slick('slickGoTo', index);
					});
					nav.find('.nav-carousel--arrow').click(function(){
						var action = $(this).attr('data-action');
						switch(action){
							case 'prev' : {
								el.slick('slickPrev');
							} break;
							case 'next' : {
								el.slick('slickNext');
							} break;
						}
					});
				}
				var cuerent_slide = el.find('.about_us--horiz-slide.slick-active').find('h2[data-count_to]');
				if(cuerent_slide.length > 0){
					var count_to = parseFloat(el.find('.about_us--horiz-slide.slick-active').find('h2').attr('data-count_to').replace(/(\n|\t|\s|\r)/gi, ''));
					jQuery({ Counter: 0 }).animate({ Counter: count_to }, {
						duration: 3000,
						easing: 'swing',
						step: function () {
							cuerent_slide.html(wp__returnPrice(Math.ceil(this.Counter), 'span'));
						}
					});
					if(timeoutcount){
						timeoutcount = null;
					}
					timeoutcount = setTimeout(function(){
						cuerent_slide.html(wp__returnPrice(count_to, 'span'));
					}, 3000);
				}
				el.on('afterChange', function(event, slick, currentSlide){
					var cuerent_slide = $(slick.$slider).find('.about_us--horiz-slide.slick-active').find('h2[data-count_to]');
					if(cuerent_slide.length > 0){
						var count_to = parseFloat(cuerent_slide.attr('data-count_to').replace(/(\n|\t|\s|\r)/gi, ''));
						$(slick.$slider).find('h2[data-count_to]').html('');
						jQuery({ Counter: 0 }).animate({ Counter: count_to }, {
							duration: 3000,
							easing: 'swing',
							step: function () {
								cuerent_slide.html(wp__returnPrice(Math.ceil(this.Counter), 'span'));
							}
						});
						if(timeoutcount){
							timeoutcount = null;
						}
						timeoutcount = setTimeout(function(){
							cuerent_slide.html(wp__returnPrice(count_to, 'span'));
						}, 3000);
					}
				});
			});
		}
	}
	about_us.init_small();
	about_us.init_horiz();
})
$(function(){
	var hideContent = {
		'click': function(_btn){
			var content = _btn.parent().find('.content-hidden');
			if(content.length > 0){
				content.toggleClass('opened');
				if(content.hasClass('opened') == true){
					_btn.text(_btn.attr('data-closed_text'));
				} else {
					_btn.text(_btn.attr('data-opened_text'));
				}
				this.resize();
			}
		},
		'resize': function(){
			var content_hidden = document.querySelectorAll('.content-hidden');
			content_hidden.forEach(function(_block){
				if($(_block).hasClass('opened') == true){
					var _html = '<div class="about_us_tabs--content about_us_tabs--inner" style="width:'+$(_block).outerWidth(true)+'px;">'+_block.innerHTML+'</div>',
						height = wp__checkWidthBlock(_html, 'height');
					_block.style.maxHeight = height+'px';
				} else {
					_block.style.maxHeight = '';
				}
			});
		},
		'update': function(){
			window.addEventListener('resize', function(){
				hideContent.resize();
			});
		}
	}
	$(document).on('click', '.btn-open_hidden_content', function(){
		/*
		var content = $(this).parent().find('.content-hidden');
		if(content.length > 0){
			content.toggleClass('opened');
			if(content.hasClass('opened') == true){
				$(this).text($(this).attr('data-closed_text'));
			} else {
				$(this).text($(this).attr('data-opened_text'));
			}
		}
		*/
		hideContent.click($(this));
	});
	if($('.about_us_tabs--carousel').length > 0 && $('.about_us_tabs').length > 0){
		$('.about_us_tabs').each(function(){
			var el = $(this),	
				collection_btn = '';
			$(this).find('.about_us_tabs--slide').each(function(index){
				console.log(index);
				var title = $(this).attr('data-title_for_btn'),
					_class = index == 0 ? ' active' : '';
				collection_btn += '<button class="btn_line'+_class+'" data-index="'+index+'">'+title+'</button>';
			});
			el.find('.about_us_tabs--top').html('');
			el.find('.about_us_tabs--top').html(collection_btn);
			var carousel = el.find('.about_us_tabs--carousel');
			el.find('.about_us_tabs--top button').click(function(){
				var index = parseInt($(this).attr('data-index'), 10);
				carousel.slick('slickGoTo',index);
				el.find('.about_us_tabs--top button').removeClass('active');
				$(this).addClass('active');
			});
			carousel.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				dots: false,
				fade: true
			});
			carousel.on('afterChange', function(event, slick, currentSlide){
				carousel.parents('.about_us_tabs').find('.about_us_tabs--top button').removeClass('active');
				carousel.parents('.about_us_tabs').find('.about_us_tabs--top button[data-index="'+currentSlide+'"]').addClass('active');
			});
		});
	}
});

document.addEventListener('click', function(event){
	var _self = event.target;
	//-----------
	///Аккордионы
	//-----------
	if(_self.classList.contains('accordion--top') == true || _self.wp__plugin.hasClassParents('accordion--top') == true){
		var _accordion = _self.wp__plugin.retrieveBlockByClass('accordion')[0];
		document.querySelectorAll('.accordion').forEach(function(el){
			if(Object.is(el, _accordion) == false){
				el.classList.remove('active');
			}
		});
		_accordion.classList.toggle('active');
	}
});