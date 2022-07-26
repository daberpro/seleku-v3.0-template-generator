/**
* Seleku Create and maintenance By Ari Susanto 
* check my github at 
* @link https://github.com/daberpro 

*/
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
					const {${Object.keys({ ...attribute, ...data }).map((e) => {
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
					const {${Object.keys({ ...prop, ...props }).join(",")}} = props; 
					const result = \`${_content}\`

					return result;
					`);
        context.replaceData(0, context.data.length, _RealContext2({ ...prop, ...props }, Component));
      },
      uid
    };
  }
  static registerContext(content, Observer2) {
    for (let x in content.linked) {
      if (x !== "uid" && x !== "condition" && x !== "loop" && x !== "async")
        Observer2.subscribe(x, (object) => {
          content.update(content.content, { ...content.linked, ...object });
        });
    }
  }
  static destroy(Component) {
    Component.remove();
  }
};

// node_modules/seleku-v3.0/seleku-core/Observer.js
var Observer = class {
  handlers = {};
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
var CreateState = class {
  object = null;
  state = null;
  constructor(object) {
    this.object = object;
    this.state = new Proxy(this.object, this.#handler());
  }
  #handler() {
    const main = this;
    const _handler = {
      set(object, prop, value) {
        object[prop] = value;
        if (prop in object) {
          main.update(prop);
          return object[prop];
        }
        return 0;
      },
      get(target, prop, receiver) {
        if (prop in target) {
          return target[prop];
        }
        return 0;
      }
    };
    return _handler;
  }
  update() {
  }
};

// node_modules/seleku-v3.0/seleku-core/index.js
var Seleku = new Node();
Array.prototype.update = function(index, value) {
  this[index] = value;
  return index;
};

// app.selek
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
  const div47 = Seleku.createElement("div");
  const div47_attribute = Seleku.createAttribute(div47, {
    "class": "container",
    "id": "app"
  });
  const div47_content = Seleku.createContent(div47, " ", {});
  Node.registerContext(div47_content, _Observer);
  const div48 = Seleku.createElement("div");
  const div48_attribute = Seleku.createAttribute(div48, {
    "class": "box"
  });
  const div48_content = Seleku.createContent(div48, " ", {});
  Node.registerContext(div48_content, _Observer);
  Node.Render(div48, div47);
  const h149 = Seleku.createElement("h1");
  const h149_attribute = Seleku.createAttribute(h149, {
    "class": "title"
  });
  const h149_content = Seleku.createContent(h149, "Welcome To Seleku", {});
  Node.registerContext(h149_content, _Observer);
  Node.Render(h149, div48);
  const p50 = Seleku.createElement("p");
  const p50_attribute = Seleku.createAttribute(p50, {});
  const p50_content = Seleku.createContent(p50, "create by Ari susanto", {});
  Node.registerContext(p50_content, _Observer);
  Node.Render(p50, div48);
  const h351 = Seleku.createElement("h3");
  const h351_attribute = Seleku.createAttribute(h351, {});
  const h351_content = Seleku.createContent(h351, "${count}", {
    count
  });
  Node.registerContext(h351_content, _Observer);
  Node.Render(h351, div48);
  const button52 = Seleku.createElement("button");
  const button52_attribute = Seleku.createAttribute(button52, {
    "onclick": "counting",
    "$$$_onclick": counting
  });
  const button52_content = Seleku.createContent(button52, "counting", {});
  Node.registerContext(button52_content, _Observer);
  Node.Render(button52, div48);
  _Observer.subscribe("counting", (data) => button52_attribute.update(data));
  return {
    element: div47,
    update(content, data) {
      div47_attribute.update(data);
      div47_content.update(content, data);
      div48_attribute.update(data);
      div48_content.update(content, data);
      h149_attribute.update(data);
      h149_content.update(content, data);
      p50_attribute.update(data);
      p50_content.update(content, data);
      h351_attribute.update(data);
      h351_content.update(content, data);
      button52_attribute.update(data);
      button52_content.update(content, data);
    }
  };
  ;
};
Node.Render(Welcome(), document.body);
