!function(t){var e={};function n(s){if(e[s])return e[s].exports;var r=e[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(s,r,function(e){return t[e]}.bind(null,r));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){const s=n(1);function r(){return[{name:"A sample URL",url:"https://asampleurl.com"},{name:"Another sample URL",url:"https://anothersampleurl.com"},{name:"A final sample URL",url:"https://afinalsampleurl.com"}]}addEventListener("fetch",t=>{t.respondWith(async function(t){const e=new s;e.get(".*/links",()=>function(t){const e=JSON.stringify(r());return new Response(e,{headers:{"content-type":"application/json"}})}()),e.get(".*/*",()=>async function(t){let e=await fetch("https://static-links-page.signalnerve.workers.dev");return a.transform(e)}());return await e.route(t.request)}(t))});class i{constructor(t){this.newText=t}element(t){console.log(this.newText),t.setInnerContent(this.newText)}}class o{constructor(t,e){this.attributeName=t,this.newValue=e}element(t){t.setAttribute(this.attributeName,this.newValue)}}const a=(new HTMLRewriter).on("div[id='links']",new class{constructor(t){this.links=t}element(t){for(let e of this.links)t.append('<a href="'+e.url+'">'+e.name+"</a>",{html:!0})}}([{name:"A sample URL",url:"https://asampleurl.com"},{name:"Another sample URL",url:"https://anothersampleurl.com"},{name:"A final sample URL",url:"https://afinalsampleurl.com"}])).on("div[id='profile']",new o("style","display: block")).on("div[id='social']",new o("style","display: flex")).on("div[id='social']",new class{constructor(t){this.links=t}async element(t){for(let e of this.links){await fetch(e.svg).then(t=>t.text()).then(n=>{t.append('<a href="'+e.url+'">'+n.slice(0,4)+' style="width: inherit; height:inherit; "'+n.slice(4)+"</a>",{html:!0})})}}}([{svg:"https://simpleicons.org/icons/instagram.svg",url:"https://www.instagram.com/amiiigh"},{svg:"https://simpleicons.org/icons/linkedin.svg",url:"https://www.linkedin.com/in/amiiigh/"},{svg:"https://simpleicons.org/icons/github.svg",url:"https://github.com/amiiigh"},{svg:"https://simpleicons.org/icons/twitter.svg",url:"https://twitter.com/amiiigh"}])).on("title",new i("Amir Ghafari")).on("svg",new o("style","width: inherit; height: inherit")).on("body",new o("class","bg-green-900")).on("img[id='avatar']",new o("src","https://people.cs.umass.edu/~ghafari/assets/images/ah3.jpg")).on("h1[id='name']",new i("Amir Ghafari"))},function(t,e){const n=t=>e=>e.method.toLowerCase()===t.toLowerCase(),s=n("connect"),r=n("delete"),i=n("get"),o=n("head"),a=n("options"),l=n("patch"),u=n("post"),c=n("put"),h=n("trace"),p=t=>e=>{const n=new URL(e.url).pathname;return(n.match(t)||[])[0]===n};t.exports=class{constructor(){this.routes=[]}handle(t,e){return this.routes.push({conditions:t,handler:e}),this}connect(t,e){return this.handle([s,p(t)],e)}delete(t,e){return this.handle([r,p(t)],e)}get(t,e){return this.handle([i,p(t)],e)}head(t,e){return this.handle([o,p(t)],e)}options(t,e){return this.handle([a,p(t)],e)}patch(t,e){return this.handle([l,p(t)],e)}post(t,e){return this.handle([u,p(t)],e)}put(t,e){return this.handle([c,p(t)],e)}trace(t,e){return this.handle([h,p(t)],e)}all(t){return this.handle([],t)}route(t){const e=this.resolve(t);return e?e.handler(t):new Response("resource not found",{status:404,statusText:"not found",headers:{"content-type":"text/plain"}})}resolve(t){return this.routes.find(e=>!(e.conditions&&(!Array.isArray(e)||e.conditions.length))||("function"==typeof e.conditions?e.conditions(t):e.conditions.every(e=>e(t))))}}}]);