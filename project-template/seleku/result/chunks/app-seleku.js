/**
* Seleku Create and maintenance By Ari Susanto 
* check my github at 
* @link https://github.com/daberpro 

*/
(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg);
  };
  var __privateGet = (obj, member, getter) => {
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
  };
  var __privateAdd = (obj, member, value) => {
    if (member.has(obj))
      throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };
  var __privateSet = (obj, member, value, setter) => {
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
  };
  var __privateMethod = (obj, member, method) => {
    __accessCheck(obj, member, "access private method");
    return method;
  };

  // node_modules/seleku-v3.0/seleku-core/CustomState.js
  var _object;
  var CreateCustomState = class {
    constructor(object, handler) {
      __privateAdd(this, _object, null);
      __publicField(this, "state", null);
      __privateSet(this, _object, object);
      this.state = new Proxy(__privateGet(this, _object), handler);
    }
  };
  _object = new WeakMap();

  // node_modules/seleku-v3.0/seleku-core/Node.js
  var Node = class {
    static Render(Component, target) {
      if (Component instanceof HTMLElement) {
        if (Component instanceof HTMLElement) {
          target.appendChild(Component);
        }
        if (Component instanceof Array) {
          for (let x of Component) {
            if (x instanceof HTMLElement)
              target.appendChild(x);
          }
        }
        return Component;
      } else {
        if (Component.element instanceof HTMLElement) {
          target.appendChild(Component.element);
        }
        if (Component.element instanceof Array) {
          for (let x of Component.element) {
            if (x instanceof HTMLElement)
              target.appendChild(x);
          }
        }
        return Component;
      }
    }
    static RenderBefore(Component, target) {
      if (Component instanceof HTMLElement) {
        if (Component instanceof HTMLElement) {
          target.insertBefore(Component, target.firstChild);
        }
        if (Component instanceof Array) {
          for (let x of Component) {
            if (x instanceof HTMLElement)
              target.insertBefore(x, target.firstChild);
          }
        }
        return Component;
      } else {
        if (Component.element instanceof HTMLElement) {
          target.insertBefore(Component.element, target.firstChild);
        }
        if (Component.element instanceof Array) {
          for (let x of Component.element) {
            if (x instanceof HTMLElement)
              target.insertBefore(x, target.firstChild);
          }
        }
        return Component;
      }
    }
    constructor(name, content, attribute) {
    }
    createElement(name) {
      const Component = document.createElement(name);
      return Component;
    }
    createAttribute(Component, attribute) {
      if (Component instanceof HTMLElement && !(attribute instanceof Object && !(attribute instanceof Array))) {
        return 0;
      }
      let template = "";
      for (let x in attribute) {
        if (typeof attribute[x] === "function") {
          Component[x.replace(/\$\$\$\_/igm, "")] = attribute[x];
        } else {
          const _RealAttrContext = new Function("$$$___attr", "Component", `
					const {${Object.keys(attribute).map((e) => {
            if (e === "class") {
              return "$_class";
            }
            return e;
          })}} = $$$___attr;

	        try{
	          if(typeof $$$_${x} !== 'function' && $$$_${x}){

	          	Component.setAttribute('${x}', $$$_${x});

	          }else{
				
				Component.setAttribute('${x}', '${attribute[x]}');

	          }
	        }catch(e){
	          if(typeof ${x.replace(/class/igm, "$$_$&")} !== 'function' && ${x.replace(/class/igm, "$$_$&")}){
	          	Component.setAttribute('${x}', ${x.replace(/class/igm, "$$_$&")});
	          }else{
	          	Component.setAttribute('${x}', '${attribute[x]}');
	          }
	        }
	        
				`);
          if (!/\$\$\$\_/igm.test(x)) {
            _RealAttrContext(attribute, Component);
            template += `Component.setAttribute('${x}', ${attribute[x]});`;
          }
        }
      }
      return {
        update(data) {
          const _RealAttrContext = new Function("$$$___attr", "Component", `
					const {${Object.keys(__spreadValues(__spreadValues({}, attribute), data)).map((e) => {
            if (e === "class") {
              return "$_class";
            }
            return e;
          })}} = $$$___attr;
					${template}
				`);
          _RealAttrContext(data, Component);
        }
      };
    }
    createContent(Component, content, prop = {}, uid = void 0) {
      const context = new Text(content);
      const main = this;
      const child = /* @__PURE__ */ new Map();
      Component.appendChild(context);
      const _RealContext = new Function("props", "parent", `
					const {${Object.keys(prop).join(",")}} = props; 
					const result = \`${content}\`

					return result;
					`);
      context.replaceData(0, context.data.length, _RealContext(prop, Component));
      return {
        content,
        linked: prop,
        child,
        update(_content = content, props = { uid: main.uid }) {
          this.linked = props;
          const _RealContext2 = new Function("props", "parent", `
					const {${Object.keys(__spreadValues(__spreadValues({}, prop), props)).join(",")}} = props; 
					const result = \`${_content}\`

					return result;
					`);
          context.replaceData(0, context.data.length, _RealContext2(__spreadValues(__spreadValues({}, prop), props), Component));
        },
        uid
      };
    }
    static registerContext(content, Observer2) {
      for (let x in content.linked) {
        if (x !== "uid" && x !== "condition" && x !== "loop" && x !== "async")
          Observer2.subscribe(x, (object) => {
            content.update(content.content, __spreadValues(__spreadValues({}, content.linked), object));
          });
      }
    }
    static destroy(Component) {
      Component.remove();
    }
  };

  // node_modules/seleku-v3.0/seleku-core/Observer.js
  var Observer = class {
    constructor() {
      __publicField(this, "handlers", {});
    }
    subscribe(target, fn) {
      const main = this.handlers[target];
      if (this.handlers.hasOwnProperty(target)) {
        this.handlers[target] = function(args) {
          main.call(this, args);
          fn.call(this, args);
        };
      } else {
        this.handlers[target] = fn;
      }
    }
    unsubscribe(target) {
      if (target in this.handlers) {
        delete this.handlers[target];
      }
    }
    emit(target, args) {
      if (this.handlers[target])
        return this.handlers[target](args);
    }
  };

  // node_modules/seleku-v3.0/seleku-core/State.js
  var _handler, handler_fn;
  var CreateState = class {
    constructor(object) {
      __privateAdd(this, _handler);
      __publicField(this, "object", null);
      __publicField(this, "state", null);
      this.object = object;
      this.state = new Proxy(this.object, __privateMethod(this, _handler, handler_fn).call(this));
    }
    update() {
    }
  };
  _handler = new WeakSet();
  handler_fn = function() {
    const main = this;
    const _handler2 = {
      set(object, prop, value) {
        object[prop] = value;
        if (prop in object) {
          main.update(prop);
          return object[prop] ? object[prop] : true;
        }
        return true;
      },
      get(target, prop, receiver) {
        if (prop in target) {
          return target[prop];
        }
        return false;
      }
    };
    return _handler2;
  };

  // node_modules/seleku-v3.0/seleku-core/ArrayWatcher.js
  var ArrayWatcher = function(array, event) {
    const cache = /* @__PURE__ */ new Map();
    let once = [];
    let evaluationValue = null;
    let unshiftValue = [];
    return new Proxy(array, {
      get(target, property, receiver) {
        if (event instanceof Object && event.hasOwnProperty("watch") && property !== "length" && isNaN(parseFloat(property))) {
          cache.set("property", property);
          once[0] = "";
        } else {
          if (property !== "length")
            event.watch(property, "get");
        }
        return target[property];
      },
      set(target, property, value, receiver) {
        target[property] = value;
        if (once[0] !== cache.get("property") && cache.get("property") !== "unshift") {
          once[0] = cache.get("property");
          event.watch(cache.get("property"), "set", target, property);
        } else if (cache.get("property") === "unshift") {
          evaluationValue = value;
        }
        if (evaluationValue !== target.length) {
          unshiftValue.unshift(evaluationValue);
        } else {
          event.watch(cache.get("property"), "set", unshiftValue, 0);
        }
        ;
        return true;
      }
    });
  };

  // node_modules/seleku-v3.0/seleku-core/index.js
  var Seleku = new Node();
  Array.prototype.update = function(index, value) {
    this[index] = value;
    return index;
  };

  // assets/seleku.png
  var seleku_default = "../assets/seleku-UAMSTX3X.png";

  // app.selek
  var Card = ({ about }, $$_parent) => {
    let _Observer = new Observer();
    const _State = class extends CreateState {
      constructor(args) {
        super(args);
      }
      update(prop) {
        _Observer.emit(prop, this.object);
      }
    };
    let $$State = new _State({});
    const goto = (_) => {
      location.href = about.url;
    };
    const div73 = Seleku.createElement("div");
    const div73_attribute = Seleku.createAttribute(div73, {
      "class": "card",
      "onclick": "goto",
      "$$$_onclick": goto,
      "goto": goto
    });
    const div73_content = Seleku.createContent(div73, " ", {});
    Node.registerContext(div73_content, _Observer);
    _Observer.subscribe("goto", (data) => div73_attribute.update(data));
    const h174 = Seleku.createElement("h1");
    const h174_attribute = Seleku.createAttribute(h174, {});
    const h174_content = Seleku.createContent(h174, "${about.title}", {
      about
    });
    Node.registerContext(h174_content, _Observer);
    Node.Render(h174, div73);
    const h375 = Seleku.createElement("h3");
    const h375_attribute = Seleku.createAttribute(h375, {});
    const h375_content = Seleku.createContent(h375, "${about.description}", {
      about
    });
    Node.registerContext(h375_content, _Observer);
    Node.Render(h375, div73);
    return {
      element: div73,
      update(content, data, state, value) {
        div73_attribute.update(data);
        div73_content.update(content, data);
        h174_attribute.update(data);
        h174_content.update(content, data);
        h375_attribute.update(data);
        h375_content.update(content, data);
        $$State.state[state] = value;
      }
    };
    ;
  };
  var Welcome = ($$_parent) => {
    let _Observer = new Observer();
    const _State = class extends CreateState {
      constructor(args) {
        super(args);
      }
      update(prop) {
        _Observer.emit(prop, this.object);
      }
    };
    let $$State = new _State({});
    let count = 14;
    $$State.state.count = count;
    const counting = (_) => $$State.state.count++;
    let data = [{
      title: "Github",
      description: "see my works",
      url: "https://github.com/daberpro"
    }, {
      title: "Twitter",
      description: "check update from seleku",
      url: "https://twitter.com/daberdev"
    }];
    const div76 = Seleku.createElement("div");
    const div76_attribute = Seleku.createAttribute(div76, {
      "class": "container",
      "id": "app"
    });
    const div76_content = Seleku.createContent(div76, " ", {});
    Node.registerContext(div76_content, _Observer);
    const div77 = Seleku.createElement("div");
    const div77_attribute = Seleku.createAttribute(div77, {
      "class": "box"
    });
    const div77_content = Seleku.createContent(div77, " ", {});
    Node.registerContext(div77_content, _Observer);
    Node.Render(div77, div76);
    const h178 = Seleku.createElement("h1");
    const h178_attribute = Seleku.createAttribute(h178, {
      "class": "title"
    });
    const h178_content = Seleku.createContent(h178, "Welcome To Seleku", {});
    Node.registerContext(h178_content, _Observer);
    Node.Render(h178, div77);
    const img79 = Seleku.createElement("img");
    const img79_attribute = Seleku.createAttribute(img79, {
      "style": "width: 100px;",
      "src": "seleku",
      "$$$_src": seleku_default,
      "seleku": seleku_default
    });
    const img79_content = Seleku.createContent(img79, "", {});
    Node.registerContext(img79_content, _Observer);
    Node.Render(img79, div77);
    _Observer.subscribe("seleku", (data2) => img79_attribute.update(data2));
    const p80 = Seleku.createElement("p");
    const p80_attribute = Seleku.createAttribute(p80, {});
    const p80_content = Seleku.createContent(p80, "create by Ari susanto", {});
    Node.registerContext(p80_content, _Observer);
    Node.Render(p80, div77);
    const h381 = Seleku.createElement("h3");
    const h381_attribute = Seleku.createAttribute(h381, {});
    const h381_content = Seleku.createContent(h381, "${count}", {
      count
    });
    Node.registerContext(h381_content, _Observer);
    Node.Render(h381, div77);
    const button82 = Seleku.createElement("button");
    const button82_attribute = Seleku.createAttribute(button82, {
      "onclick": "counting",
      "$$$_onclick": counting,
      "counting": counting
    });
    const button82_content = Seleku.createContent(button82, "counting", {});
    Node.registerContext(button82_content, _Observer);
    Node.Render(button82, div77);
    _Observer.subscribe("counting", (data2) => button82_attribute.update(data2));
    const div83 = Seleku.createElement("div");
    const div83_attribute = Seleku.createAttribute(div83, {
      "class": "box-card"
    });
    const div83_content = Seleku.createContent(div83, " ", {});
    Node.registerContext(div83_content, _Observer);
    Node.Render(div83, div76);
    const ArrayOfComponent_$$Card_component = [];
    const $$Template_Function_$$Card_component = ({ target, data: data2, index }, Node2) => {
      let _info = data2[index];
      const $$Card_component = Node2.Render(Card({
        "about": _info
      }, div83), div83);
      _Observer.subscribe("_info", (data3) => $$Card_component.update(void 0, data3, "about", data3["_info"]));
      return {
        update(props) {
          $$Card_component.update(void 0, __spreadValues({
            about: props["_info"]
          }, props));
        },
        destroy() {
          Node2.destroy($$Card_component.element);
        }
      };
    };
    const loopHandler_$$Card_component = {
      push(props) {
        ArrayOfComponent_$$Card_component.push($$Template_Function_$$Card_component(props, Node));
      },
      unshift(props) {
        ArrayOfComponent_$$Card_component.unshift($$Template_Function_$$Card_component(__spreadProps(__spreadValues({}, props), {
          index: 0
        }), {
          Render: Node.RenderBefore,
          destroy: Node.destroy
        }));
      },
      shift(props) {
        if (ArrayOfComponent_$$Card_component.length > 0) {
          ArrayOfComponent_$$Card_component[0].destroy(props);
          ArrayOfComponent_$$Card_component.shift();
        }
      },
      pop(props) {
        const { index, data: data2 } = props;
        if (ArrayOfComponent_$$Card_component.length > 0) {
          ArrayOfComponent_$$Card_component[data2.length].destroy(props);
          ArrayOfComponent_$$Card_component.pop();
        }
      },
      update(props) {
        const { data: data2, index } = props;
        if (ArrayOfComponent_$$Card_component.length > 0)
          ArrayOfComponent_$$Card_component[index].update({
            _info: data2[index]
          });
      }
    };
    for (let x in loopHandler_$$Card_component) {
      _Observer.subscribe("_info_" + x, loopHandler_$$Card_component[x]);
    }
    for (let $$LoopData in data) {
      if (Number.isInteger(parseInt($$LoopData))) {
        ArrayOfComponent_$$Card_component.push($$Template_Function_$$Card_component({
          target: null,
          data,
          index: parseInt($$LoopData)
        }, Node));
      }
    }
    data = ArrayWatcher(data, {
      watch(target, from, object, property) {
        if (from === "set") {
          _Observer.emit("_info_" + target, {
            data: object,
            index: property,
            target
          });
        }
        return 1;
      }
    });
    return {
      element: div76,
      update(content, data2, state, value) {
        div76_attribute.update(data2);
        div76_content.update(content, data2);
        div77_attribute.update(data2);
        div77_content.update(content, data2);
        h178_attribute.update(data2);
        h178_content.update(content, data2);
        img79_attribute.update(data2);
        img79_content.update(content, data2);
        p80_attribute.update(data2);
        p80_content.update(content, data2);
        h381_attribute.update(data2);
        h381_content.update(content, data2);
        button82_attribute.update(data2);
        button82_content.update(content, data2);
        div83_attribute.update(data2);
        div83_content.update(content, data2);
        $$State.state[state] = value;
      }
    };
    ;
  };
  Node.Render(Welcome(), document.body);
})();
