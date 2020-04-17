(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/wuc-tab/wuc-tab"],{"0960":function(t,n,e){"use strict";var u,r=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return u}))},5524:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u={name:"wuc-tab",data:function(){return{}},props:{tabList:{type:Array,default:function(){return[]}},tabCur:{type:Number,default:function(){return 0}},tabClass:{type:String,default:function(){return""}},tabStyle:{type:String,default:function(){return""}},textFlex:{type:Boolean,default:function(){return!1}},selectClass:{type:String,default:function(){return"text-blue"}}},methods:{tabSelect:function(t,n){if(this.currentTab===t)return!1;this.$emit("update:tabCur",t),this.$emit("change",t)}},computed:{scrollLeft:function(){return 60*(this.tabCur-1)}}};n.default=u},8809:function(t,n,e){"use strict";var u=e("df11"),r=e.n(u);r.a},"8aa6":function(t,n,e){"use strict";e.r(n);var u=e("5524"),r=e.n(u);for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);n["default"]=r.a},b6b0:function(t,n,e){"use strict";e.r(n);var u=e("0960"),r=e("8aa6");for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);e("8809");var c,f=e("f0c5"),i=Object(f["a"])(r["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],c);n["default"]=i.exports},df11:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/wuc-tab/wuc-tab-create-component',
    {
        'components/wuc-tab/wuc-tab-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("b6b0"))
        })
    },
    [['components/wuc-tab/wuc-tab-create-component']]
]);
