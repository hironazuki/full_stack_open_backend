(this.webpackJsonp2b=this.webpackJsonp2b||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(14),c=t.n(o),u=(t(20),t(2)),l=t(4),s=t(3),i=t.n(s),m="/api/persons",d=function(){return i.a.get(m).then((function(e){return e.data}))},f=function(e){return i.a.post(m,e).then((function(e){return e.data}))},h=function(e,n){return i.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},g=function(e){return i.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},b=function(e){var n=e.personsToShow,t=e.persons,a=e.setPersons;return r.a.createElement("div",null,n.map((function(e){return r.a.createElement("p",{key:e.id},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name))&&(g(e),a(t.filter((function(n){return n.id!==e}))))}(e.id)}},"delete"))})))},p=function(e){var n=e.persons,t=e.setPersons,o=e.setSuccessMessage,c=e.setErrorMessage,l=Object(a.useState)(""),s=Object(u.a)(l,2),i=s[0],m=s[1],d=Object(a.useState)(""),g=Object(u.a)(d,2),b=g[0],p=g[1];return r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a={name:i,number:b};if(n.some((function(e){return e.name===i}))){if(window.confirm("".concat(i," is already added to phonebook, replace the old number with a new one?"))){var r=n.find((function(e){return e.name===i}));h(r.id,a).then((function(e){t(n.map((function(n){return n.id!==r.id?n:e}))),m(""),p(""),o("Updated ".concat(r.name)),setTimeout((function(){o(null)}),5e3)})).catch((function(e){c("Infomation of ".concat(r.name," has already been removed from server")),setTimeout((function(){c(null)}),5e3),console.log(e),t(n.filter((function(e){return e.id!==r.id})))}))}}else f(a).then((function(e){t(n.concat(e)),m(""),p(""),o("Added ".concat(e.name)),setTimeout((function(){o(null)}),5e3)}))}},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:i,onChange:function(e){console.log(e.target.value),m(e.target.value)},placeholder:"a new person."})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:b,onChange:function(e){p(e.target.value)},placeholder:"a new number."})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},v=function(e){var n=e.handleSearchNameChange,t=e.searchName;return r.a.createElement(r.a.Fragment,null,"filter shown with ",r.a.createElement("input",{value:t,onChange:n,placeholder:"search name"}))},E=function(e){var n=e.successMessage,t=e.errorMessage,a={background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return n?r.a.createElement("div",{style:Object(l.a)({},a,{color:"green"})},n):t?r.a.createElement("div",{style:Object(l.a)({},a,{color:"red"})},t):null},w=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),l=Object(u.a)(c,2),s=l[0],i=l[1],m=Object(a.useState)(null),f=Object(u.a)(m,2),h=f[0],g=f[1],w=Object(a.useState)(null),S=Object(u.a)(w,2),j=S[0],O=S[1];Object(a.useEffect)((function(){console.log("effect"),d().then((function(e){console.log("promise fulfilled"),o(e)}))}),[o]),console.log("those ".concat(t.length));var y=""===s?t:t.filter((function(e){return e.name.match(new RegExp(s,"ig"))}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(E,{successMessage:h,errorMessage:j}),r.a.createElement(v,{handleSearchNameChange:function(e){i(e.target.value)},searchName:s}),r.a.createElement("h3",null,"add a new"),r.a.createElement(p,{persons:t,setPersons:o,setSuccessMessage:g,setErrorMessage:O}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(b,{personsToShow:y,persons:t,setPersons:o}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[15,1,2]]]);
//# sourceMappingURL=main.34387cc9.chunk.js.map