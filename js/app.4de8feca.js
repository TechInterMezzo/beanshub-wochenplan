(function(t){function e(e){for(var r,i,o=e[0],c=e[1],u=e[2],f=0,d=[];f<o.length;f++)i=o[f],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&d.push(n[i][0]),n[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);l&&l(e);while(d.length)d.shift()();return s.push.apply(s,u||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],r=!0,o=1;o<a.length;o++){var c=a[o];0!==n[c]&&(r=!1)}r&&(s.splice(e--,1),t=i(i.s=a[0]))}return t}var r={},n={app:0},s=[];function i(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=r,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(a,r,function(e){return t[e]}.bind(null,r));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/wochenplan/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var l=c;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("cd49")},"22cb":function(t,e,a){"use strict";var r=a("8eb4"),n=a.n(r);n.a},"5c0b":function(t,e,a){"use strict";var r=a("9c0c"),n=a.n(r);n.a},"8eb4":function(t,e,a){},"9c0c":function(t,e,a){},c4da:function(t,e,a){},c86b:function(t,e,a){"use strict";var r=a("c4da"),n=a.n(r);n.a},cd49:function(t,e,a){"use strict";a.r(e);a("4de4"),a("d3b7"),a("25f0"),a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),n=a("0086"),s=a.n(n),i=a("c28b"),o=a.n(i),c=a("f13c"),u=a.n(c),l=a("5a0c"),f=a.n(l),d=a("2a04"),h=a.n(d),v=a("6210"),p=a.n(v),m=a("ecee"),y=a("c074"),b=a("b702"),D=a("f2d1"),g=a("ad3d"),O=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{attrs:{id:"app"}},[a("navigation"),a("week")],1)},w=[],k=(a("a4d3"),a("e439"),a("dbb4"),a("b64b"),a("e25e"),a("ac1f"),a("2ca0"),a("159b"),a("ade3")),P=a("2f62"),j=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{staticClass:"navbar navbar is-fixed-top",attrs:{id:"navigation"}},[a("div",{staticClass:"navbar-menu"},[a("div",{staticClass:"navbar-start"},[a("a",{staticClass:"navbar-item",attrs:{href:"/"}},[t._v("BeansHub")]),a("a",{directives:[{name:"show",rawName:"v-show",value:t.hasPreviousDate,expression:"hasPreviousDate"}],staticClass:"navbar-item",attrs:{href:t._f("date")(t.previousDate)},on:{click:function(e){return e.preventDefault(),t.selectDate(t.previousDate)}}},[a("fa",{attrs:{icon:["fas","angle-left"],size:"2x"}})],1),a("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.closeDatePicker,expression:"closeDatePicker"}],staticClass:"navbar-item has-dropdown",class:t.datePickerMenuClass},[a("a",{staticClass:"navbar-link",on:{click:t.toggleDatePicker}},[t._v(t._s(t._f("year")(t.currentDate))+" KW "+t._s(t._f("week")(t.currentDate)))]),a("div",{staticClass:"navbar-dropdown"},[a("div",{staticClass:"navbar-item"},[a("date-picker",{attrs:{"is-open":t.isDatePickerOpen},on:{close:t.closeDatePicker}})],1)])])]),a("div",{staticClass:"navbar-end"},[a("a",{directives:[{name:"show",rawName:"v-show",value:t.hasNextDate,expression:"hasNextDate"}],staticClass:"navbar-item is-right",attrs:{href:t._f("date")(t.nextDate)},on:{click:function(e){return e.preventDefault(),t.selectDate(t.nextDate)}}},[a("fa",{attrs:{icon:["fas","angle-right"],size:"2x"}})],1)])])])},_=[],C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"date-picker",attrs:{id:"date-picker"}},[a("div",{staticClass:"field is-grouped"},[a("div",{staticClass:"control"},[a("button",{directives:[{name:"show",rawName:"v-show",value:t.hasPreviousMonth,expression:"hasPreviousMonth"}],staticClass:"button is-compact is-text",on:{click:t.setToPreviousMonth}},[a("fa",{attrs:{icon:["fas","angle-left"],size:"lg"}})],1)]),a("div",{staticClass:"control"},[a("div",{staticClass:"select"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.month,expression:"month"}],on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.month=e.target.multiple?a:a[0]}}},t._l(t.months,(function(e){return a("option",{key:e,domProps:{value:e}},[t._v(t._s(t._f("month")(e)))])})),0)])]),a("div",{staticClass:"control"},[a("div",{staticClass:"select"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.year,expression:"year"}],on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.year=e.target.multiple?a:a[0]}}},t._l(t.years,(function(e){return a("option",{key:e,domProps:{value:e}},[t._v(t._s(e))])})),0)])]),a("div",{staticClass:"control"},[a("button",{directives:[{name:"show",rawName:"v-show",value:t.hasNextMonth,expression:"hasNextMonth"}],staticClass:"button is-compact is-text",on:{click:t.setToNextMonth}},[a("fa",{attrs:{icon:["fas","angle-right"],size:"lg"}})],1)])]),a("div",{staticClass:"calendar field is-grouped is-grouped-multiline",on:{click:t.selectDay}},[a("span",{staticClass:"button is-compact is-static"},[t._v("Mo")]),a("span",{staticClass:"button is-compact is-static"},[t._v("Di")]),a("span",{staticClass:"button is-compact is-static"},[t._v("Mi")]),a("span",{staticClass:"button is-compact is-static"},[t._v("Do")]),a("span",{staticClass:"button is-compact is-static"},[t._v("Fr")]),a("span",{staticClass:"button is-compact is-static"},[t._v("Sa")]),a("span",{staticClass:"button is-compact is-static"},[t._v("So")]),t._l(t.days,(function(e,r){return a("a",{key:r,staticClass:"button is-compact",class:t.dayClass(e,t.day),attrs:{"data-day":e}},[t._v(" "+t._s(t._f("day")(e))+" ")])}))],2),a("div",{staticClass:"field"}),a("div",{staticClass:"field"},[a("div",{staticClass:"control"},[a("button",{staticClass:"button is-fullwidth",attrs:{disabled:!t.isValid},on:{click:t.confirmSelection}},[t._v("Auswahl bestätigen")])])]),a("div",{staticClass:"field"},[a("div",{staticClass:"control"},[a("button",{staticClass:"button is-text is-fullwidth",on:{click:t.selectToday}},[t._v("Heute auswählen")])])])])},x=[];a("4d90");function S(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function M(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?S(Object(a),!0).forEach((function(e){Object(k["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):S(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var T=r["a"].extend({name:"date-picker",data:function(){return{year:0,month:0,day:0}},created:function(){this.reset()},computed:M({years:function(){for(var t=[],e=f()(this.firstDate).year(),a=f()(this.lastDate).year(),r=a;r>=e;r--)t.push(r);return t},months:function(){if(!this.year)return[];for(var t=[],e=1;e<=12;e++){var a=new Date(this.year,e-1,1).valueOf();a>=this.firstDate&&a<=this.lastDate&&t.push(e)}return t},days:function(){if(!this.month)return[];for(var t=[],e=new Date(this.year,this.month-1,1).valueOf(),a=f()(e).daysInMonth(),r=(f()(e).day()||7)-1,n=0;n<r;n++)t.push(0);for(var s=1;s<=a;s++){var i=new Date(this.year,this.month-1,s).valueOf();i>=this.firstDate&&i<=this.lastDate&&t.push(s)}for(var o=7-t.length%7,c=0;c<o;c++)t.push(0);return t},date:function(){return new Date(this.year,this.month-1,this.day).valueOf()},isValid:function(){return f()(this.date).isValid()&&this.date>=this.firstDate&&this.date<=this.lastDate},hasNextMonth:function(){return this.lastDate>=f()(this.date).add(1,"month").startOf("month").valueOf()},hasPreviousMonth:function(){return this.firstDate<=f()(this.date).subtract(1,"month").startOf("month").valueOf()}},Object(P["e"])(["firstDate","lastDate","currentDate"])),watch:{currentDate:function(){this.reset()}},methods:M({reset:function(){this.setDate(this.currentDate)},setDate:function(t){var e=f()(t);this.year=e.year(),this.month=e.month()+1,this.day=e.date()},setToNextMonth:function(){this.setDate(f()(this.date).add(1,"month").valueOf())},setToPreviousMonth:function(){this.setDate(f()(this.date).subtract(1,"month").valueOf())},dayClass:function(t,e){return t?t==e?"is-active":"":"is-static"},selectDay:function(t){var e=t.target;e&&e.dataset.day&&(this.day=parseInt(e.dataset.day))},confirmSelection:function(){this.selectDate(this.date),this.close()},selectToday:function(){this.selectDate(),this.close()},close:function(){this.$emit("close")}},Object(P["b"])(["selectDate"])),filters:{month:function(t){return p.a.months?p.a.months[t-1]:""},day:function(t){return t?t.toString().padStart(2,"0"):""}}}),N=T,I=(a("22cb"),a("2877")),E=Object(I["a"])(N,C,x,!1,null,null,null),Y=E.exports;function W(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function R(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?W(Object(a),!0).forEach((function(e){Object(k["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):W(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var V=r["a"].extend({name:"navigation",data:function(){return{isDatePickerOpen:!1}},computed:R({datePickerMenuClass:function(){return this.isDatePickerOpen?"is-active":""}},Object(P["e"])(["currentDate"]),{},Object(P["c"])(["previousDate","nextDate","hasPreviousDate","hasNextDate"])),methods:R({toggleDatePicker:function(){this.isDatePickerOpen=!this.isDatePickerOpen},closeDatePicker:function(){this.isDatePickerOpen&&(this.isDatePickerOpen=!1)}},Object(P["b"])(["selectDate"])),components:{DatePicker:Y}}),$=V,H=Object(I["a"])($,j,_,!1,null,null,null),L=H.exports,z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"touch",rawName:"v-touch:swipe.left",value:t.swipeLeft,expression:"swipeLeft",arg:"swipe",modifiers:{left:!0}},{name:"touch",rawName:"v-touch:swipe.right",value:t.swipeRight,expression:"swipeRight",arg:"swipe",modifiers:{right:!0}}],staticClass:"week",class:t.weekClass,attrs:{id:"week"}},[a("div",{staticClass:"columns is-mobile is-marginless"},t._l(t.days,(function(e){return a("div",{key:e.date,staticClass:"column has-text-centered"},[a("div",{staticClass:"head"},[a("div",{staticClass:"is-uppercase is-size-5 has-text-white has-text-weight-bold"},[t._v(t._s(t._f("dayOfWeek")(e.date)))]),a("a",{staticClass:"has-text-white",attrs:{href:t._f("date")(e.date)},on:{click:function(a){return a.preventDefault(),t.selectDate(e.date)}}},[t._v(t._s(t._f("date")(e.date)))])])])})),0),t._l(t.slotGroupCount,(function(e){return a("div",{key:e,staticClass:"columns is-mobile is-marginless"},t._l(t.days,(function(r){return a("div",{key:r.date,staticClass:"slots column is-flex"},t._l(r.slotGroups[e-1],(function(e){return a("div",{key:t.getSlotId(e,r),staticClass:"slot",class:t.getSlotClass(e),attrs:{id:t.getSlotId(e,r)}},[a("div",[a("span",[t._v(t._s(t._f("time")(e.timeStart)))]),a("span",{staticClass:"is-size-7"},[t._v(" "),a("fa",{attrs:{icon:["far","clock"]}}),t._v(" "+t._s(t._f("duration")(e.duration))+" ")],1),e.episodeId?a("a",{staticClass:"has-text-grey",attrs:{href:"https://rocketbeans.tv/mediathek/video/"+e.episodeId,target:"_blank",rel:"noopener noreferrer"}},[a("fa",{attrs:{icon:["fab","youtube"]}})],1):t._e()]),a("div",[a("span",{staticClass:"has-text-grey-lighter"},[t._v(t._s(e.title))]),e.topic?a("span",{staticClass:"has-text-grey"},[t._v(" | "+t._s(e.topic))]):t._e()]),e===t.activeSlot?a("progress",{staticClass:"progress is-warning has-background-black is-radiusless",attrs:{max:"100"},domProps:{value:t.slotProgress}},[t._v(" "+t._s(t.slotProgress)+"% ")]):t._e()])})),0)})),0)}))],2)},A=[];function G(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function J(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?G(Object(a),!0).forEach((function(e){Object(k["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):G(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var B=r["a"].extend({name:"week",data:function(){return{isDatePickerOpen:!1}},computed:J({weekClass:function(){return this.dayCount>1?"multiple":"single"},slotGroupCount:function(){return this.days.length>0&&this.days[0].slotGroups?this.days[0].slotGroups.length:0},slotProgress:function(){if(!this.activeSlot)return 0;var t=f()(this.activeSlot.timeStart).valueOf(),e=f()(this.activeSlot.timeEnd).valueOf();return Math.floor((this.realTime-t)/(e-t)*100)}},Object(P["e"])(["realTime","currentDate","days","hasMouse"]),{},Object(P["c"])(["dayCount","previousDate","nextDate","hasPreviousDate","hasNextDate","activeSlot"])),methods:J({toggleDatePicker:function(){this.isDatePickerOpen=!this.isDatePickerOpen},closeDatePicker:function(){this.isDatePickerOpen&&(this.isDatePickerOpen=!1)},swipeLeft:function(){this.selectDate(this.nextDate)},swipeRight:function(){this.selectDate(this.previousDate)},getSlotId:function(t,e){return"slot-"+f()(e.date).format("YYYYMMDD")+"-"+t.id},getSlotClass:function(t){return"is-"+t.type+(t===this.activeSlot?" is-active":"")}},Object(P["b"])(["selectDate"]))}),F=B,K=(a("c86b"),Object(I["a"])(F,z,A,!1,null,null,null)),U=K.exports;function q(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function Q(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?q(Object(a),!0).forEach((function(e){Object(k["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):q(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var X=r["a"].extend({name:"app",created:function(){var t=this;this.updateRealTime(),this.updateViewWidth(),setInterval(this.updateRealTime,5e3),window.addEventListener("resize",this.updateViewWidth),window.addEventListener("popstate",(function(e){return t.setCurrentDate(e.state)})),window.addEventListener("dragstart",(function(t){return t.preventDefault()}),!0),this.updateMeta(),this.setCurrentDate(this.getDefaultDate())},computed:Q({activeSlotId:function(){return this.activeSlot?"slot-"+f()(this.realDate).format("YYYYMMDD")+"-"+this.activeSlot.id:""}},Object(P["c"])(["realDate","dates","activeSlot"])),watch:{realDate:function(t){this.setCurrentDate(t)},dates:function(t){this.updateDays(t)},activeSlotId:function(t){var e=this;t&&this.$nextTick((function(){return e.scrollToSlot(t)}))}},methods:Q({getDefaultDate:function(){var t=location.href,e=document.getElementsByTagName("base")[0].href;if(t.startsWith(e)){var a=t.substring(e.length),r=/^([0-9]+)\.([0-9]+)\.([0-9]+)$/i.exec(a);if(r)return new Date(parseInt(r[3]),parseInt(r[2])-1,parseInt(r[1])).valueOf()}return this.realDate},scrollToSlot:function(t){var e=document.getElementById("navigation"),a=document.getElementById(t);e&&a&&this.$scrollTo(a,{offset:-e.clientHeight})}},Object(P["d"])(["updateRealTime","updateViewWidth","setCurrentDate","setMouse"]),{},Object(P["b"])(["updateMeta","updateDays"])),components:{Navigation:L,Week:U}}),Z=X,tt=(a("5c0b"),Object(I["a"])(Z,O,w,!1,null,null,null)),et=tt.exports,at=(a("e01a"),a("d28b"),a("d81d"),a("3ca3"),a("ddb0"),a("96cf"),a("1da1")),rt=a("d4ec"),nt=a("bee2"),st=a("bc3a"),it=a.n(st),ot=function(){function t(e){Object(rt["a"])(this,t),this.timeout=6e4,this.storage=e,this.busy={}}return Object(nt["a"])(t,[{key:"getValues",value:function(t,e){var a=this;return Promise.all(t.map((function(t){return a.loadAsync(t)}))).then((function(t){t.some((function(t){return t}))&&e()})),t.map((function(t){return a.getItem(t).value}))}},{key:"getValue",value:function(t,e){return this.loadAsync(t).then((function(t){t&&e()})),this.getItem(t).value}},{key:"loadAsync",value:function(){var t=Object(at["a"])(regeneratorRuntime.mark((function t(e){var a,r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!this.busy[e]){t.next=2;break}return t.abrupt("return",!1);case 2:if(this.busy[e]=!0,a=!1,r=this.getItem(e),r.etag&&!(Date.now()>=r.timestamp+this.timeout)){t.next=12;break}return t.next=8,it.a.get(e,{baseURL:"/data/schedule/",headers:this.getHeaders(r.etag),validateStatus:function(){return!0}});case 8:n=t.sent,200==n.status&&(a=JSON.stringify(n.data)!=JSON.stringify(r.value),r.value=n.data,r.etag=n.headers.etag||""),r.timestamp=Date.now(),this.setItem(e,r);case 12:return this.busy[e]=!1,t.abrupt("return",a);case 14:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"getItem",value:function(t){var e=this.storage.getItem("cache_"+t);return e?JSON.parse(e):{value:null,etag:"",timestamp:0}}},{key:"setItem",value:function(t,e){this.storage.setItem("cache_"+t,JSON.stringify(e))}},{key:"getHeaders",value:function(t){return t?{"If-None-Match":t}:{}}}]),t}(),ct=new ot(sessionStorage);new ot(localStorage);r["a"].use(P["a"]);var ut=0,lt=new P["a"].Store({state:{realTime:0,viewWidth:0,firstDate:0,lastDate:0,currentDate:0,days:[]},getters:{dayCount:function(t){return Math.min(Math.floor(t.viewWidth/260),7)},realDate:function(t){return f()(t.realTime).startOf("day").valueOf()},startDate:function(t,e){var a=8-(f()(t.currentDate).day()||7);return a>=e.dayCount?t.currentDate:f()(t.currentDate).subtract(e.dayCount-a,"day").valueOf()},previousDate:function(t,e){return f()(e.startDate).subtract(e.dayCount,"day").valueOf()},nextDate:function(t,e){return f()(e.startDate).add(e.dayCount,"day").valueOf()},hasPreviousDate:function(t,e){return t.firstDate>0&&e.nextDate>=t.firstDate},hasNextDate:function(t,e){return t.lastDate>0&&e.nextDate<=t.lastDate},dates:function(t,e){for(var a=[],r=f()(e.startDate),n=0;n<e.dayCount;n++){var s=r.add(n,"day").valueOf();s>=t.firstDate&&s<=t.lastDate&&a.push(s)}return a},activeSlot:function(t){var e=t.realTime,a=!0,r=!1,n=void 0;try{for(var s,i=t.days[Symbol.iterator]();!(a=(s=i.next()).done);a=!0){var o=s.value;if(o.date<=e&&o.nextDate>e){var c=!0,u=!1,l=void 0;try{for(var d,h=o.slotGroups[Symbol.iterator]();!(c=(d=h.next()).done);c=!0){var v=d.value,p=!0,m=!1,y=void 0;try{for(var b,D=v[Symbol.iterator]();!(p=(b=D.next()).done);p=!0){var g=b.value;if(f()(g.timeStart).valueOf()<=e&&f()(g.timeEnd).valueOf()>e)return g}}catch(O){m=!0,y=O}finally{try{p||null==D.return||D.return()}finally{if(m)throw y}}}}catch(O){u=!0,l=O}finally{try{c||null==h.return||h.return()}finally{if(u)throw l}}}}}catch(O){r=!0,n=O}finally{try{a||null==i.return||i.return()}finally{if(r)throw n}}return null}},mutations:{updateRealTime:function(t){t.realTime=Date.now()},updateViewWidth:function(t){t.viewWidth=window.innerWidth*window.devicePixelRatio},setCurrentDate:function(t,e){t.currentDate=e},setMetaDates:function(t,e){t.firstDate=f()(e.firstDate).valueOf(),t.lastDate=f()(e.lastDate).valueOf()},setDays:function(t,e){t.days=e}},actions:{selectDate:function(t,e){var a=t.commit,r=t.state,n=t.getters,s=e?f()(e).format("DD.MM.YYYY"):"./";e=e||n.realDate,e>=r.firstDate&&e<=r.lastDate&&(history.pushState(e,document.title,s),document.activeElement instanceof HTMLElement&&document.activeElement.blur(),a("setCurrentDate",e))},updateMeta:function(t){var e=t.commit,a=t.dispatch,r=t.getters;clearTimeout(ut);var n=ct.getValue("meta.json",(function(){return a("updateMeta")}));n&&(e("setMetaDates",n),a("updateDays",r.dates)),ut=setTimeout((function(){return a("updateMeta")}),6e4)},updateDays:function(t,e){var a=t.commit,r=t.dispatch,n=(t.state,e.map((function(t){return"slots/"+f()(t).format("YYYY/MM/DD")+".json"}))),s=ct.getValues(n,(function(){return r("updateDays",e)})).map((function(t,a){if(!t)return[];for(var r=e[a],n=new Array(6),s=0;s<n.length;s++)n[s]=[];var i=f()(r),o=[i.hour(10).minute(30),i.hour(20),i.add(1,"day")],c=0,u=!0,l=!1,d=void 0;try{for(var h,v=t[Symbol.iterator]();!(u=(h=v.next()).done);u=!0){var p=h.value,m=f()(p.timeStart);while(!m.isBefore(o[c]))c++;var y=2*c;0==n[y].length?n[y].push(p):n[y+1].push(p)}}catch(b){l=!0,d=b}finally{try{u||null==v.return||v.return()}finally{if(l)throw d}}return{date:e[a],nextDate:f()(e[a]).add(1,"day").valueOf(),slotGroups:n}}));a("setDays",s)}}});f.a.extend(h.a),f.a.locale("de"),m["c"].add(y["a"],y["b"],b["a"],D["a"]),r["a"].config.productionTip=!1,r["a"].component("fa",g["a"]),r["a"].use(s.a,{swipeTolerance:50}),r["a"].use(o.a),r["a"].use(u.a),r["a"].filter("year",(function(t){return t?f()(t).year().toString():""})),r["a"].filter("week",(function(t){return t?f()(t).week().toString():""})),r["a"].filter("date",(function(t){return t?f()(t).format("DD.MM.YYYY"):""})),r["a"].filter("dayOfWeek",(function(t){return t?f()(t).format("dddd"):""})),r["a"].filter("time",(function(t){return t?f()(t).format("HH:mm"):""})),r["a"].filter("duration",(function(t){var e=Math.floor(t/3600),a=Math.round(t%3600/60);return(e?e+" h ":"")+a+" min"})),new r["a"]({store:lt,render:function(t){return t(et)}}).$mount("#app")}});
//# sourceMappingURL=app.4de8feca.js.map