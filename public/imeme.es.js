// @__NO_SIDE_EFFECTS__
function Mr(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ae = {}, rn = [], lt = () => {
}, vi = () => !1, Es = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Lr = (e) => e.startsWith("onUpdate:"), De = Object.assign, Ur = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, xc = Object.prototype.hasOwnProperty, ie = (e, t) => xc.call(e, t), q = Array.isArray, on = (e) => ws(e) === "[object Map]", Ei = (e) => ws(e) === "[object Set]", z = (e) => typeof e == "function", Ee = (e) => typeof e == "string", It = (e) => typeof e == "symbol", he = (e) => e !== null && typeof e == "object", wi = (e) => (he(e) || z(e)) && z(e.then) && z(e.catch), Si = Object.prototype.toString, ws = (e) => Si.call(e), Tc = (e) => ws(e).slice(8, -1), Ai = (e) => ws(e) === "[object Object]", Ss = (e) => Ee(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Rn = /* @__PURE__ */ Mr(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), As = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Pc = /-\w/g, ot = As(
  (e) => e.replace(Pc, (t) => t.slice(1).toUpperCase())
), Nc = /\B([A-Z])/g, Vt = As(
  (e) => e.replace(Nc, "-$1").toLowerCase()
), Rs = As((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ws = As(
  (e) => e ? `on${Rs(e)}` : ""
), Ht = (e, t) => !Object.is(e, t), qs = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Ri = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Ic = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let oo;
const Cs = () => oo || (oo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function an(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = Ee(s) ? Uc(s) : an(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (Ee(e) || he(e))
    return e;
}
const Dc = /;(?![^(]*\))/g, Mc = /:([^]+)/, Lc = /\/\*[^]*?\*\//g;
function Uc(e) {
  const t = {};
  return e.replace(Lc, "").split(Dc).forEach((n) => {
    if (n) {
      const s = n.split(Mc);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function $t(e) {
  let t = "";
  if (Ee(e))
    t = e;
  else if (q(e))
    for (let n = 0; n < e.length; n++) {
      const s = $t(e[n]);
      s && (t += s + " ");
    }
  else if (he(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Fc = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", kc = /* @__PURE__ */ Mr(Fc);
function Ci(e) {
  return !!e || e === "";
}
const Oi = (e) => !!(e && e.__v_isRef === !0), it = (e) => Ee(e) ? e : e == null ? "" : q(e) || he(e) && (e.toString === Si || !z(e.toString)) ? Oi(e) ? it(e.value) : JSON.stringify(e, xi, 2) : String(e), xi = (e, t) => Oi(t) ? xi(e, t.value) : on(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], o) => (n[zs(s, o) + " =>"] = r, n),
    {}
  )
} : Ei(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => zs(n))
} : It(t) ? zs(t) : he(t) && !q(t) && !Ai(t) ? String(t) : t, zs = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    It(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
var Bc = { NODE_ENV: "production" };
let Pe;
class Ti {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Pe, !t && Pe && (this.index = (Pe.scopes || (Pe.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Pe;
      try {
        return Pe = this, t();
      } finally {
        Pe = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Pe, Pe = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Pe = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Pi(e) {
  return new Ti(e);
}
function Ni() {
  return Pe;
}
function jc(e, t = !1) {
  Pe && Pe.cleanups.push(e);
}
let de;
const Js = /* @__PURE__ */ new WeakSet();
class Ii {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Pe && Pe.active && Pe.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Js.has(this) && (Js.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Mi(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, io(this), Li(this);
    const t = de, n = ct;
    de = this, ct = !0;
    try {
      return this.fn();
    } finally {
      Ui(this), de = t, ct = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Br(t);
      this.deps = this.depsTail = void 0, io(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Js.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    pr(this) && this.run();
  }
  get dirty() {
    return pr(this);
  }
}
let Di = 0, Cn, On;
function Mi(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = On, On = e;
    return;
  }
  e.next = Cn, Cn = e;
}
function Fr() {
  Di++;
}
function kr() {
  if (--Di > 0)
    return;
  if (On) {
    let t = On;
    for (On = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Cn; ) {
    let t = Cn;
    for (Cn = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Li(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ui(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), Br(s), Hc(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function pr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Fi(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Fi(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Un) || (e.globalVersion = Un, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !pr(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = de, s = ct;
  de = e, ct = !0;
  try {
    Li(e);
    const r = e.fn(e._value);
    (t.version === 0 || Ht(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    de = n, ct = s, Ui(e), e.flags &= -3;
  }
}
function Br(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep)
      Br(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Hc(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let ct = !0;
const ki = [];
function vt() {
  ki.push(ct), ct = !1;
}
function Et() {
  const e = ki.pop();
  ct = e === void 0 ? !0 : e;
}
function io(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = de;
    de = void 0;
    try {
      t();
    } finally {
      de = n;
    }
  }
}
let Un = 0;
class Vc {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class jr {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!de || !ct || de === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== de)
      n = this.activeLink = new Vc(de, this), de.deps ? (n.prevDep = de.depsTail, de.depsTail.nextDep = n, de.depsTail = n) : de.deps = de.depsTail = n, Bi(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = de.depsTail, n.nextDep = void 0, de.depsTail.nextDep = n, de.depsTail = n, de.deps === n && (de.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, Un++, this.notify(t);
  }
  notify(t) {
    Fr();
    try {
      Bc.NODE_ENV;
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      kr();
    }
  }
}
function Bi(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        Bi(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const fs = /* @__PURE__ */ new WeakMap(), Xt = /* @__PURE__ */ Symbol(
  ""
), hr = /* @__PURE__ */ Symbol(
  ""
), Fn = /* @__PURE__ */ Symbol(
  ""
);
function Ne(e, t, n) {
  if (ct && de) {
    let s = fs.get(e);
    s || fs.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new jr()), r.map = s, r.key = n), r.track();
  }
}
function Ot(e, t, n, s, r, o) {
  const i = fs.get(e);
  if (!i) {
    Un++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (Fr(), t === "clear")
    i.forEach(l);
  else {
    const c = q(e), u = c && Ss(n);
    if (c && n === "length") {
      const a = Number(s);
      i.forEach((f, m) => {
        (m === "length" || m === Fn || !It(m) && m >= a) && l(f);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), u && l(i.get(Fn)), t) {
        case "add":
          c ? u && l(i.get("length")) : (l(i.get(Xt)), on(e) && l(i.get(hr)));
          break;
        case "delete":
          c || (l(i.get(Xt)), on(e) && l(i.get(hr)));
          break;
        case "set":
          on(e) && l(i.get(Xt));
          break;
      }
  }
  kr();
}
function $c(e, t) {
  const n = fs.get(e);
  return n && n.get(t);
}
function en(e) {
  const t = se(e);
  return t === e ? t : (Ne(t, "iterate", Fn), Qe(e) ? t : t.map(at));
}
function Os(e) {
  return Ne(e = se(e), "iterate", Fn), e;
}
function Ut(e, t) {
  return Pt(e) ? Tt(e) ? un(at(t)) : un(t) : at(t);
}
const Gc = {
  __proto__: null,
  [Symbol.iterator]() {
    return Xs(this, Symbol.iterator, (e) => Ut(this, e));
  },
  concat(...e) {
    return en(this).concat(
      ...e.map((t) => q(t) ? en(t) : t)
    );
  },
  entries() {
    return Xs(this, "entries", (e) => (e[1] = Ut(this, e[1]), e));
  },
  every(e, t) {
    return St(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return St(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => Ut(this, s)),
      arguments
    );
  },
  find(e, t) {
    return St(
      this,
      "find",
      e,
      t,
      (n) => Ut(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return St(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return St(
      this,
      "findLast",
      e,
      t,
      (n) => Ut(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return St(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return St(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Ys(this, "includes", e);
  },
  indexOf(...e) {
    return Ys(this, "indexOf", e);
  },
  join(e) {
    return en(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Ys(this, "lastIndexOf", e);
  },
  map(e, t) {
    return St(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return yn(this, "pop");
  },
  push(...e) {
    return yn(this, "push", e);
  },
  reduce(e, ...t) {
    return lo(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return lo(this, "reduceRight", e, t);
  },
  shift() {
    return yn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return St(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return yn(this, "splice", e);
  },
  toReversed() {
    return en(this).toReversed();
  },
  toSorted(e) {
    return en(this).toSorted(e);
  },
  toSpliced(...e) {
    return en(this).toSpliced(...e);
  },
  unshift(...e) {
    return yn(this, "unshift", e);
  },
  values() {
    return Xs(this, "values", (e) => Ut(this, e));
  }
};
function Xs(e, t, n) {
  const s = Os(e), r = s[t]();
  return s !== e && !Qe(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.done || (o.value = n(o.value)), o;
  }), r;
}
const Kc = Array.prototype;
function St(e, t, n, s, r, o) {
  const i = Os(e), l = i !== e && !Qe(e), c = i[t];
  if (c !== Kc[t]) {
    const f = c.apply(e, o);
    return l ? at(f) : f;
  }
  let u = n;
  i !== e && (l ? u = function(f, m) {
    return n.call(this, Ut(e, f), m, e);
  } : n.length > 2 && (u = function(f, m) {
    return n.call(this, f, m, e);
  }));
  const a = c.call(i, u, s);
  return l && r ? r(a) : a;
}
function lo(e, t, n, s) {
  const r = Os(e);
  let o = n;
  return r !== e && (Qe(e) ? n.length > 3 && (o = function(i, l, c) {
    return n.call(this, i, l, c, e);
  }) : o = function(i, l, c) {
    return n.call(this, i, Ut(e, l), c, e);
  }), r[t](o, ...s);
}
function Ys(e, t, n) {
  const s = se(e);
  Ne(s, "iterate", Fn);
  const r = s[t](...n);
  return (r === -1 || r === !1) && Ps(n[0]) ? (n[0] = se(n[0]), s[t](...n)) : r;
}
function yn(e, t, n = []) {
  vt(), Fr();
  const s = se(e)[t].apply(e, n);
  return kr(), Et(), s;
}
const Wc = /* @__PURE__ */ Mr("__proto__,__v_isRef,__isVue"), ji = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(It)
);
function qc(e) {
  It(e) || (e = String(e));
  const t = se(this);
  return Ne(t, "has", e), t.hasOwnProperty(e);
}
class Hi {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return s === (r ? o ? qi : Wi : o ? Ki : Gi).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = q(t);
    if (!r) {
      let c;
      if (i && (c = Gc[n]))
        return c;
      if (n === "hasOwnProperty")
        return qc;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      me(t) ? t : s
    );
    if ((It(n) ? ji.has(n) : Wc(n)) || (r || Ne(t, "get", n), o))
      return l;
    if (me(l)) {
      const c = i && Ss(n) ? l : l.value;
      return r && he(c) ? gr(c) : c;
    }
    return he(l) ? r ? gr(l) : Kn(l) : l;
  }
}
class Vi extends Hi {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    const i = q(t) && Ss(n);
    if (!this._isShallow) {
      const u = Pt(o);
      if (!Qe(s) && !Pt(s) && (o = se(o), s = se(s)), !i && me(o) && !me(s))
        return u || (o.value = s), !0;
    }
    const l = i ? Number(n) < t.length : ie(t, n), c = Reflect.set(
      t,
      n,
      s,
      me(t) ? t : r
    );
    return t === se(r) && (l ? Ht(s, o) && Ot(t, "set", n, s) : Ot(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = ie(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && Ot(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!It(n) || !ji.has(n)) && Ne(t, "has", n), s;
  }
  ownKeys(t) {
    return Ne(
      t,
      "iterate",
      q(t) ? "length" : Xt
    ), Reflect.ownKeys(t);
  }
}
class $i extends Hi {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const zc = /* @__PURE__ */ new Vi(), Jc = /* @__PURE__ */ new $i(), Xc = /* @__PURE__ */ new Vi(!0), Yc = /* @__PURE__ */ new $i(!0), mr = (e) => e, Qn = (e) => Reflect.getPrototypeOf(e);
function Qc(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = se(r), i = on(o), l = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, u = r[e](...s), a = n ? mr : t ? un : at;
    return !t && Ne(
      o,
      "iterate",
      c ? hr : Xt
    ), {
      // iterator protocol
      next() {
        const { value: f, done: m } = u.next();
        return m ? { value: f, done: m } : {
          value: l ? [a(f[0]), a(f[1])] : a(f),
          done: m
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Zn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Zc(e, t) {
  const n = {
    get(r) {
      const o = this.__v_raw, i = se(o), l = se(r);
      e || (Ht(r, l) && Ne(i, "get", r), Ne(i, "get", l));
      const { has: c } = Qn(i), u = t ? mr : e ? un : at;
      if (c.call(i, r))
        return u(o.get(r));
      if (c.call(i, l))
        return u(o.get(l));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && Ne(se(r), "iterate", Xt), r.size;
    },
    has(r) {
      const o = this.__v_raw, i = se(o), l = se(r);
      return e || (Ht(r, l) && Ne(i, "has", r), Ne(i, "has", l)), r === l ? o.has(r) : o.has(r) || o.has(l);
    },
    forEach(r, o) {
      const i = this, l = i.__v_raw, c = se(l), u = t ? mr : e ? un : at;
      return !e && Ne(c, "iterate", Xt), l.forEach((a, f) => r.call(o, u(a), u(f), i));
    }
  };
  return De(
    n,
    e ? {
      add: Zn("add"),
      set: Zn("set"),
      delete: Zn("delete"),
      clear: Zn("clear")
    } : {
      add(r) {
        !t && !Qe(r) && !Pt(r) && (r = se(r));
        const o = se(this);
        return Qn(o).has.call(o, r) || (o.add(r), Ot(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !Qe(o) && !Pt(o) && (o = se(o));
        const i = se(this), { has: l, get: c } = Qn(i);
        let u = l.call(i, r);
        u || (r = se(r), u = l.call(i, r));
        const a = c.call(i, r);
        return i.set(r, o), u ? Ht(o, a) && Ot(i, "set", r, o) : Ot(i, "add", r, o), this;
      },
      delete(r) {
        const o = se(this), { has: i, get: l } = Qn(o);
        let c = i.call(o, r);
        c || (r = se(r), c = i.call(o, r)), l && l.call(o, r);
        const u = o.delete(r);
        return c && Ot(o, "delete", r, void 0), u;
      },
      clear() {
        const r = se(this), o = r.size !== 0, i = r.clear();
        return o && Ot(
          r,
          "clear",
          void 0,
          void 0
        ), i;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    n[r] = Qc(r, e, t);
  }), n;
}
function xs(e, t) {
  const n = Zc(e, t);
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    ie(n, r) && r in s ? n : s,
    r,
    o
  );
}
const ea = {
  get: /* @__PURE__ */ xs(!1, !1)
}, ta = {
  get: /* @__PURE__ */ xs(!1, !0)
}, na = {
  get: /* @__PURE__ */ xs(!0, !1)
}, sa = {
  get: /* @__PURE__ */ xs(!0, !0)
}, Gi = /* @__PURE__ */ new WeakMap(), Ki = /* @__PURE__ */ new WeakMap(), Wi = /* @__PURE__ */ new WeakMap(), qi = /* @__PURE__ */ new WeakMap();
function ra(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function oa(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ra(Tc(e));
}
function Kn(e) {
  return Pt(e) ? e : Ts(
    e,
    !1,
    zc,
    ea,
    Gi
  );
}
function zi(e) {
  return Ts(
    e,
    !1,
    Xc,
    ta,
    Ki
  );
}
function gr(e) {
  return Ts(
    e,
    !0,
    Jc,
    na,
    Wi
  );
}
function es(e) {
  return Ts(
    e,
    !0,
    Yc,
    sa,
    qi
  );
}
function Ts(e, t, n, s, r) {
  if (!he(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = oa(e);
  if (o === 0)
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const l = new Proxy(
    e,
    o === 2 ? s : n
  );
  return r.set(e, l), l;
}
function Tt(e) {
  return Pt(e) ? Tt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Pt(e) {
  return !!(e && e.__v_isReadonly);
}
function Qe(e) {
  return !!(e && e.__v_isShallow);
}
function Ps(e) {
  return e ? !!e.__v_raw : !1;
}
function se(e) {
  const t = e && e.__v_raw;
  return t ? se(t) : e;
}
function Hr(e) {
  return !ie(e, "__v_skip") && Object.isExtensible(e) && Ri(e, "__v_skip", !0), e;
}
const at = (e) => he(e) ? Kn(e) : e, un = (e) => he(e) ? gr(e) : e;
function me(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function pe(e) {
  return Ji(e, !1);
}
function ia(e) {
  return Ji(e, !0);
}
function Ji(e, t) {
  return me(e) ? e : new la(e, t);
}
class la {
  constructor(t, n) {
    this.dep = new jr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : se(t), this._value = n ? t : at(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || Qe(t) || Pt(t);
    t = s ? t : se(t), Ht(t, n) && (this._rawValue = t, this._value = s ? t : at(t), this.dep.trigger());
  }
}
function B(e) {
  return me(e) ? e.value : e;
}
const ca = {
  get: (e, t, n) => t === "__v_raw" ? e : B(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return me(r) && !me(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Xi(e) {
  return Tt(e) ? e : new Proxy(e, ca);
}
function Wn(e) {
  const t = q(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = ua(e, n);
  return t;
}
class aa {
  constructor(t, n, s) {
    this._object = t, this._key = n, this._defaultValue = s, this.__v_isRef = !0, this._value = void 0, this._raw = se(t);
    let r = !0, o = t;
    if (!q(t) || !Ss(String(n)))
      do
        r = !Ps(o) || Qe(o);
      while (r && (o = o.__v_raw));
    this._shallow = r;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = B(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && me(this._raw[this._key])) {
      const n = this._object[this._key];
      if (me(n)) {
        n.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return $c(this._raw, this._key);
  }
}
function ua(e, t, n) {
  return new aa(e, t, n);
}
class fa {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new jr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Un - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    de !== this)
      return Mi(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Fi(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function da(e, t, n = !1) {
  let s, r;
  return z(e) ? s = e : (s = e.get, r = e.set), new fa(s, r, n);
}
const ts = {}, ds = /* @__PURE__ */ new WeakMap();
let Wt;
function pa(e, t = !1, n = Wt) {
  if (n) {
    let s = ds.get(n);
    s || ds.set(n, s = []), s.push(e);
  }
}
function ha(e, t, n = ae) {
  const { immediate: s, deep: r, once: o, scheduler: i, augmentJob: l, call: c } = n, u = (R) => r ? R : Qe(R) || r === !1 || r === 0 ? xt(R, 1) : xt(R);
  let a, f, m, _, b = !1, v = !1;
  if (me(e) ? (f = () => e.value, b = Qe(e)) : Tt(e) ? (f = () => u(e), b = !0) : q(e) ? (v = !0, b = e.some((R) => Tt(R) || Qe(R)), f = () => e.map((R) => {
    if (me(R))
      return R.value;
    if (Tt(R))
      return u(R);
    if (z(R))
      return c ? c(R, 2) : R();
  })) : z(e) ? t ? f = c ? () => c(e, 2) : e : f = () => {
    if (m) {
      vt();
      try {
        m();
      } finally {
        Et();
      }
    }
    const R = Wt;
    Wt = a;
    try {
      return c ? c(e, 3, [_]) : e(_);
    } finally {
      Wt = R;
    }
  } : f = lt, t && r) {
    const R = f, M = r === !0 ? 1 / 0 : r;
    f = () => xt(R(), M);
  }
  const y = Ni(), T = () => {
    a.stop(), y && y.active && Ur(y.effects, a);
  };
  if (o && t) {
    const R = t;
    t = (...M) => {
      R(...M), T();
    };
  }
  let w = v ? new Array(e.length).fill(ts) : ts;
  const C = (R) => {
    if (!(!(a.flags & 1) || !a.dirty && !R))
      if (t) {
        const M = a.run();
        if (r || b || (v ? M.some((k, D) => Ht(k, w[D])) : Ht(M, w))) {
          m && m();
          const k = Wt;
          Wt = a;
          try {
            const D = [
              M,
              // pass undefined as the old value when it's changed for the first time
              w === ts ? void 0 : v && w[0] === ts ? [] : w,
              _
            ];
            w = M, c ? c(t, 3, D) : (
              // @ts-expect-error
              t(...D)
            );
          } finally {
            Wt = k;
          }
        }
      } else
        a.run();
  };
  return l && l(C), a = new Ii(f), a.scheduler = i ? () => i(C, !1) : C, _ = (R) => pa(R, !1, a), m = a.onStop = () => {
    const R = ds.get(a);
    if (R) {
      if (c)
        c(R, 4);
      else
        for (const M of R) M();
      ds.delete(a);
    }
  }, t ? s ? C(!0) : w = a.run() : i ? i(C.bind(null, !0), !0) : a.run(), T.pause = a.pause.bind(a), T.resume = a.resume.bind(a), T.stop = T, T;
}
function xt(e, t = 1 / 0, n) {
  if (t <= 0 || !he(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, me(e))
    xt(e.value, t, n);
  else if (q(e))
    for (let s = 0; s < e.length; s++)
      xt(e[s], t, n);
  else if (Ei(e) || on(e))
    e.forEach((s) => {
      xt(s, t, n);
    });
  else if (Ai(e)) {
    for (const s in e)
      xt(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && xt(e[s], t, n);
  }
  return e;
}
var Ft = {  NODE_ENV: "production" };
const xn = [];
let Qs = !1;
function ma(e, ...t) {
  if (Qs) return;
  Qs = !0, vt();
  const n = xn.length ? xn[xn.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = ga();
  if (s)
    mn(
      s,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((o) => {
          var i, l;
          return (l = (i = o.toString) == null ? void 0 : i.call(o)) != null ? l : JSON.stringify(o);
        }).join(""),
        n && n.proxy,
        r.map(
          ({ vnode: o }) => `at <${Dl(n, o.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ..._a(r)), console.warn(...o);
  }
  Et(), Qs = !1;
}
function ga() {
  let e = xn[xn.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function _a(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...ba(n));
  }), t;
}
function ba({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${Dl(
    e.component,
    e.type,
    s
  )}`, o = ">" + n;
  return e.props ? [r, ...ya(e.props), o] : [r + o];
}
function ya(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...Yi(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Yi(e, t, n) {
  return Ee(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : me(t) ? (t = Yi(e, se(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : z(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = se(t), n ? t : [`${e}=`, t]);
}
function mn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    Ns(r, t, n);
  }
}
function wt(e, t, n, s) {
  if (z(e)) {
    const r = mn(e, t, n, s);
    return r && wi(r) && r.catch((o) => {
      Ns(o, t, n);
    }), r;
  }
  if (q(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(wt(e[o], t, n, s));
    return r;
  }
}
function Ns(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || ae;
  if (t) {
    let l = t.parent;
    const c = t.proxy, u = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let f = 0; f < a.length; f++)
          if (a[f](e, c, u) === !1)
            return;
      }
      l = l.parent;
    }
    if (o) {
      vt(), mn(o, null, 10, [
        e,
        c,
        u
      ]), Et();
      return;
    }
  }
  va(e, n, r, s, i);
}
function va(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const Fe = [];
let _t = -1;
const ln = [];
let kt = null, nn = 0;
const Qi = /* @__PURE__ */ Promise.resolve();
let ps = null;
function Vr(e) {
  const t = ps || Qi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ea(e) {
  let t = _t + 1, n = Fe.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = Fe[s], o = kn(r);
    o < e || o === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function $r(e) {
  if (!(e.flags & 1)) {
    const t = kn(e), n = Fe[Fe.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= kn(n) ? Fe.push(e) : Fe.splice(Ea(t), 0, e), e.flags |= 1, Zi();
  }
}
function Zi() {
  ps || (ps = Qi.then(tl));
}
function wa(e) {
  q(e) ? ln.push(...e) : kt && e.id === -1 ? kt.splice(nn + 1, 0, e) : e.flags & 1 || (ln.push(e), e.flags |= 1), Zi();
}
function co(e, t, n = _t + 1) {
  for (; n < Fe.length; n++) {
    const s = Fe[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      Fe.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function el(e) {
  if (ln.length) {
    const t = [...new Set(ln)].sort(
      (n, s) => kn(n) - kn(s)
    );
    if (ln.length = 0, kt) {
      kt.push(...t);
      return;
    }
    for (kt = t, nn = 0; nn < kt.length; nn++) {
      const n = kt[nn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    kt = null, nn = 0;
  }
}
const kn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function tl(e) {
  const t = lt;
  try {
    for (_t = 0; _t < Fe.length; _t++) {
      const n = Fe[_t];
      n && !(n.flags & 8) && (Ft.NODE_ENV !== "production" && t(n), n.flags & 4 && (n.flags &= -2), mn(
        n,
        n.i,
        n.i ? 15 : 14
      ), n.flags & 4 || (n.flags &= -2));
    }
  } finally {
    for (; _t < Fe.length; _t++) {
      const n = Fe[_t];
      n && (n.flags &= -2);
    }
    _t = -1, Fe.length = 0, el(), ps = null, (Fe.length || ln.length) && tl();
  }
}
let xe = null, nl = null;
function hs(e) {
  const t = xe;
  return xe = e, nl = e && e.type.__scopeId || null, t;
}
function Bn(e, t = xe, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && _s(-1);
    const o = hs(t);
    let i;
    try {
      i = e(...r);
    } finally {
      hs(o), s._d && _s(1);
    }
    return i;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function ao(e, t) {
  if (xe === null)
    return e;
  const n = Us(xe), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, i, l, c = ae] = t[r];
    o && (z(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && xt(i), s.push({
      dir: o,
      instance: n,
      value: i,
      oldValue: void 0,
      arg: l,
      modifiers: c
    }));
  }
  return e;
}
function Gt(e, t, n, s) {
  const r = e.dirs, o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    o && (l.oldValue = o[i].value);
    let c = l.dir[s];
    c && (vt(), wt(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Et());
  }
}
function Tn(e, t) {
  if (Oe) {
    let n = Oe.provides;
    const s = Oe.parent && Oe.parent.provides;
    s === n && (n = Oe.provides = Object.create(s)), n[e] = t;
  }
}
function Ze(e, t, n = !1) {
  const s = Tl();
  if (s || Yt) {
    let r = Yt ? Yt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && z(t) ? t.call(s && s.proxy) : t;
  }
}
function Sa() {
  return !!(Tl() || Yt);
}
const Aa = /* @__PURE__ */ Symbol.for("v-scx"), Ra = () => Ze(Aa);
function yt(e, t, n) {
  return sl(e, t, n);
}
function sl(e, t, n = ae) {
  const { immediate: s, deep: r, flush: o, once: i } = n, l = De({}, n), c = t && s || !t && o !== "post";
  let u;
  if ($n) {
    if (o === "sync") {
      const _ = Ra();
      u = _.__watcherHandles || (_.__watcherHandles = []);
    } else if (!c) {
      const _ = () => {
      };
      return _.stop = lt, _.resume = lt, _.pause = lt, _;
    }
  }
  const a = Oe;
  l.call = (_, b, v) => wt(_, a, b, v);
  let f = !1;
  o === "post" ? l.scheduler = (_) => {
    Xe(_, a && a.suspense);
  } : o !== "sync" && (f = !0, l.scheduler = (_, b) => {
    b ? _() : $r(_);
  }), l.augmentJob = (_) => {
    t && (_.flags |= 4), f && (_.flags |= 2, a && (_.id = a.uid, _.i = a));
  };
  const m = ha(e, t, l);
  return $n && (u ? u.push(m) : c && m()), m;
}
function Ca(e, t, n) {
  const s = this.proxy, r = Ee(e) ? e.includes(".") ? rl(s, e) : () => s[e] : e.bind(s, s);
  let o;
  z(t) ? o = t : (o = t.handler, n = t);
  const i = qn(this), l = sl(r, o.bind(s), n);
  return i(), l;
}
function rl(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const Oa = /* @__PURE__ */ Symbol("_vte"), xa = (e) => e.__isTeleport, Ta = /* @__PURE__ */ Symbol("_leaveCb");
function Gr(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Gr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Be(e, t) {
  return z(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    De({ name: e.name }, t, { setup: e })
  ) : e;
}
function ol(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const ms = /* @__PURE__ */ new WeakMap();
function Pn(e, t, n, s, r = !1) {
  if (q(e)) {
    e.forEach(
      (b, v) => Pn(
        b,
        t && (q(t) ? t[v] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (cn(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Pn(e, t, n, s.component.subTree);
    return;
  }
  const o = s.shapeFlag & 4 ? Us(s.component) : s.el, i = r ? null : o, { i: l, r: c } = e, u = t && t.r, a = l.refs === ae ? l.refs = {} : l.refs, f = l.setupState, m = se(f), _ = f === ae ? vi : (b) => ie(m, b);
  if (u != null && u !== c) {
    if (uo(t), Ee(u))
      a[u] = null, _(u) && (f[u] = null);
    else if (me(u)) {
      u.value = null;
      const b = t;
      b.k && (a[b.k] = null);
    }
  }
  if (z(c))
    mn(c, l, 12, [i, a]);
  else {
    const b = Ee(c), v = me(c);
    if (b || v) {
      const y = () => {
        if (e.f) {
          const T = b ? _(c) ? f[c] : a[c] : c.value;
          if (r)
            q(T) && Ur(T, o);
          else if (q(T))
            T.includes(o) || T.push(o);
          else if (b)
            a[c] = [o], _(c) && (f[c] = a[c]);
          else {
            const w = [o];
            c.value = w, e.k && (a[e.k] = w);
          }
        } else b ? (a[c] = i, _(c) && (f[c] = i)) : v && (c.value = i, e.k && (a[e.k] = i));
      };
      if (i) {
        const T = () => {
          y(), ms.delete(e);
        };
        T.id = -1, ms.set(e, T), Xe(T, n);
      } else
        uo(e), y();
    }
  }
}
function uo(e) {
  const t = ms.get(e);
  t && (t.flags |= 8, ms.delete(e));
}
Cs().requestIdleCallback;
Cs().cancelIdleCallback;
const cn = (e) => !!e.type.__asyncLoader, il = (e) => e.type.__isKeepAlive;
function Pa(e, t) {
  ll(e, "a", t);
}
function Na(e, t) {
  ll(e, "da", t);
}
function ll(e, t, n = Oe) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Is(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      il(r.parent.vnode) && Ia(s, t, n, r), r = r.parent;
  }
}
function Ia(e, t, n, s) {
  const r = Is(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  al(() => {
    Ur(s[t], r);
  }, n);
}
function Is(e, t, n = Oe, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      vt();
      const l = qn(n), c = wt(t, n, e, i);
      return l(), Et(), c;
    });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const Dt = (e) => (t, n = Oe) => {
  (!$n || e === "sp") && Is(e, (...s) => t(...s), n);
}, Da = Dt("bm"), Ds = Dt("m"), Ma = Dt(
  "bu"
), La = Dt("u"), cl = Dt(
  "bum"
), al = Dt("um"), Ua = Dt(
  "sp"
), Fa = Dt("rtg"), ka = Dt("rtc");
function Ba(e, t = Oe) {
  Is("ec", e, t);
}
const ja = "components";
function Ha(e, t) {
  return $a(ja, e, !0, t) || e;
}
const Va = /* @__PURE__ */ Symbol.for("v-ndc");
function $a(e, t, n = !0, s = !1) {
  const r = xe || Oe;
  if (r) {
    const o = r.type;
    {
      const l = Il(
        o,
        !1
      );
      if (l && (l === t || l === ot(t) || l === Rs(ot(t))))
        return o;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      fo(r[e] || o[e], t) || // global registration
      fo(r.appContext[e], t)
    );
    return !i && s ? o : i;
  }
}
function fo(e, t) {
  return e && (e[t] || e[ot(t)] || e[Rs(ot(t))]);
}
function jn(e, t, n, s) {
  let r;
  const o = n, i = q(e);
  if (i || Ee(e)) {
    const l = i && Tt(e);
    let c = !1, u = !1;
    l && (c = !Qe(e), u = Pt(e), e = Os(e)), r = new Array(e.length);
    for (let a = 0, f = e.length; a < f; a++)
      r[a] = t(
        c ? u ? un(at(e[a])) : at(e[a]) : e[a],
        a,
        void 0,
        o
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, o);
  } else if (he(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (l, c) => t(l, c, void 0, o)
      );
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let c = 0, u = l.length; c < u; c++) {
        const a = l[c];
        r[c] = t(e[a], a, c, o);
      }
    }
  else
    r = [];
  return r;
}
function Kr(e, t, n = {}, s, r) {
  if (xe.ce || xe.parent && cn(xe.parent) && xe.parent.ce) {
    const u = Object.keys(n).length > 0;
    return K(), Ue(
      Ae,
      null,
      [ee("slot", n, s && s())],
      u ? -2 : 64
    );
  }
  let o = e[t];
  o && o._c && (o._d = !1), K();
  const i = o && ul(o(n)), l = n.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  i && i.key, c = Ue(
    Ae,
    {
      key: (l && !It(l) ? l : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!i && s ? "_fb" : "")
    },
    i || (s ? s() : []),
    i && e._ === 1 ? 64 : -2
  );
  return c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), o && o._c && (o._d = !0), c;
}
function ul(e) {
  return e.some((t) => Vn(t) ? !(t.type === Nt || t.type === Ae && !ul(t.children)) : !0) ? e : null;
}
const _r = (e) => e ? Pl(e) ? Us(e) : _r(e.parent) : null, Nn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ De(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => _r(e.parent),
    $root: (e) => _r(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => dl(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      $r(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Vr.bind(e.proxy)),
    $watch: (e) => Ca.bind(e)
  })
), Zs = (e, t) => e !== ae && !e.__isScriptSetup && ie(e, t), Ga = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: l, appContext: c } = e;
    if (t[0] !== "$") {
      const m = i[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (Zs(s, t))
          return i[t] = 1, s[t];
        if (r !== ae && ie(r, t))
          return i[t] = 2, r[t];
        if (ie(o, t))
          return i[t] = 3, o[t];
        if (n !== ae && ie(n, t))
          return i[t] = 4, n[t];
        br && (i[t] = 0);
      }
    }
    const u = Nn[t];
    let a, f;
    if (u)
      return t === "$attrs" && Ne(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (n !== ae && ie(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      f = c.config.globalProperties, ie(f, t)
    )
      return f[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return Zs(r, t) ? (r[t] = n, !0) : s !== ae && ie(s, t) ? (s[t] = n, !0) : ie(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, props: o, type: i }
  }, l) {
    let c;
    return !!(n[l] || e !== ae && l[0] !== "$" && ie(e, l) || Zs(t, l) || ie(o, l) || ie(s, l) || ie(Nn, l) || ie(r.config.globalProperties, l) || (c = i.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ie(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function po(e) {
  return q(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let br = !0;
function Ka(e) {
  const t = dl(e), n = e.proxy, s = e.ctx;
  br = !1, t.beforeCreate && ho(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: o,
    methods: i,
    watch: l,
    provide: c,
    inject: u,
    // lifecycle
    created: a,
    beforeMount: f,
    mounted: m,
    beforeUpdate: _,
    updated: b,
    activated: v,
    deactivated: y,
    beforeDestroy: T,
    beforeUnmount: w,
    destroyed: C,
    unmounted: R,
    render: M,
    renderTracked: k,
    renderTriggered: D,
    errorCaptured: G,
    serverPrefetch: J,
    // public API
    expose: ce,
    inheritAttrs: ge,
    // assets
    components: Se,
    directives: _e,
    filters: Te
  } = t;
  if (u && Wa(u, s, null), i)
    for (const $ in i) {
      const Y = i[$];
      z(Y) && (s[$] = Y.bind(n));
    }
  if (r) {
    const $ = r.call(n, n);
    he($) && (e.data = Kn($));
  }
  if (br = !0, o)
    for (const $ in o) {
      const Y = o[$], je = z(Y) ? Y.bind(n, n) : z(Y.get) ? Y.get.bind(n, n) : lt, et = !z(Y) && z(Y.set) ? Y.set.bind(n) : lt, ye = Ce({
        get: je,
        set: et
      });
      Object.defineProperty(s, $, {
        enumerable: !0,
        configurable: !0,
        get: () => ye.value,
        set: (ue) => ye.value = ue
      });
    }
  if (l)
    for (const $ in l)
      fl(l[$], s, n, $);
  if (c) {
    const $ = z(c) ? c.call(n) : c;
    Reflect.ownKeys($).forEach((Y) => {
      Tn(Y, $[Y]);
    });
  }
  a && ho(a, e, "c");
  function Z($, Y) {
    q(Y) ? Y.forEach((je) => $(je.bind(n))) : Y && $(Y.bind(n));
  }
  if (Z(Da, f), Z(Ds, m), Z(Ma, _), Z(La, b), Z(Pa, v), Z(Na, y), Z(Ba, G), Z(ka, k), Z(Fa, D), Z(cl, w), Z(al, R), Z(Ua, J), q(ce))
    if (ce.length) {
      const $ = e.exposed || (e.exposed = {});
      ce.forEach((Y) => {
        Object.defineProperty($, Y, {
          get: () => n[Y],
          set: (je) => n[Y] = je,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  M && e.render === lt && (e.render = M), ge != null && (e.inheritAttrs = ge), Se && (e.components = Se), _e && (e.directives = _e), J && ol(e);
}
function Wa(e, t, n = lt) {
  q(e) && (e = yr(e));
  for (const s in e) {
    const r = e[s];
    let o;
    he(r) ? "default" in r ? o = Ze(
      r.from || s,
      r.default,
      !0
    ) : o = Ze(r.from || s) : o = Ze(r), me(o) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (i) => o.value = i
    }) : t[s] = o;
  }
}
function ho(e, t, n) {
  wt(
    q(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function fl(e, t, n, s) {
  let r = s.includes(".") ? rl(n, s) : () => n[s];
  if (Ee(e)) {
    const o = t[e];
    z(o) && yt(r, o);
  } else if (z(e))
    yt(r, e.bind(n));
  else if (he(e))
    if (q(e))
      e.forEach((o) => fl(o, t, n, s));
    else {
      const o = z(e.handler) ? e.handler.bind(n) : t[e.handler];
      z(o) && yt(r, o, e);
    }
}
function dl(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = o.get(t);
  let c;
  return l ? c = l : !r.length && !n && !s ? c = t : (c = {}, r.length && r.forEach(
    (u) => gs(c, u, i, !0)
  ), gs(c, t, i)), he(t) && o.set(t, c), c;
}
function gs(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && gs(e, o, n, !0), r && r.forEach(
    (i) => gs(e, i, n, !0)
  );
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = qa[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const qa = {
  data: mo,
  props: go,
  emits: go,
  // objects
  methods: An,
  computed: An,
  // lifecycle
  beforeCreate: Me,
  created: Me,
  beforeMount: Me,
  mounted: Me,
  beforeUpdate: Me,
  updated: Me,
  beforeDestroy: Me,
  beforeUnmount: Me,
  destroyed: Me,
  unmounted: Me,
  activated: Me,
  deactivated: Me,
  errorCaptured: Me,
  serverPrefetch: Me,
  // assets
  components: An,
  directives: An,
  // watch
  watch: Ja,
  // provide / inject
  provide: mo,
  inject: za
};
function mo(e, t) {
  return t ? e ? function() {
    return De(
      z(e) ? e.call(this, this) : e,
      z(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function za(e, t) {
  return An(yr(e), yr(t));
}
function yr(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Me(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function An(e, t) {
  return e ? De(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function go(e, t) {
  return e ? q(e) && q(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : De(
    /* @__PURE__ */ Object.create(null),
    po(e),
    po(t ?? {})
  ) : t;
}
function Ja(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = De(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Me(e[s], t[s]);
  return n;
}
function pl() {
  return {
    app: null,
    config: {
      isNativeTag: vi,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Xa = 0;
function Ya(e, t) {
  return function(s, r = null) {
    z(s) || (s = De({}, s)), r != null && !he(r) && (r = null);
    const o = pl(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const u = o.app = {
      _uid: Xa++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: Tu,
      get config() {
        return o.config;
      },
      set config(a) {
      },
      use(a, ...f) {
        return i.has(a) || (a && z(a.install) ? (i.add(a), a.install(u, ...f)) : z(a) && (i.add(a), a(u, ...f))), u;
      },
      mixin(a) {
        return o.mixins.includes(a) || o.mixins.push(a), u;
      },
      component(a, f) {
        return f ? (o.components[a] = f, u) : o.components[a];
      },
      directive(a, f) {
        return f ? (o.directives[a] = f, u) : o.directives[a];
      },
      mount(a, f, m) {
        if (!c) {
          const _ = u._ceVNode || ee(s, r);
          return _.appContext = o, m === !0 ? m = "svg" : m === !1 && (m = void 0), e(_, a, m), c = !0, u._container = a, a.__vue_app__ = u, Us(_.component);
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        c && (wt(
          l,
          u._instance,
          16
        ), e(null, u._container), delete u._container.__vue_app__);
      },
      provide(a, f) {
        return o.provides[a] = f, u;
      },
      runWithContext(a) {
        const f = Yt;
        Yt = u;
        try {
          return a();
        } finally {
          Yt = f;
        }
      }
    };
    return u;
  };
}
let Yt = null;
const Qa = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ot(t)}Modifiers`] || e[`${Vt(t)}Modifiers`];
function Za(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || ae;
  let r = n;
  const o = t.startsWith("update:"), i = o && Qa(s, t.slice(7));
  i && (i.trim && (r = n.map((a) => Ee(a) ? a.trim() : a)), i.number && (r = n.map(Ic)));
  let l, c = s[l = Ws(t)] || // also try camelCase event handler (#2249)
  s[l = Ws(ot(t))];
  !c && o && (c = s[l = Ws(Vt(t))]), c && wt(
    c,
    e,
    6,
    r
  );
  const u = s[l + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, wt(
      u,
      e,
      6,
      r
    );
  }
}
const eu = /* @__PURE__ */ new WeakMap();
function hl(e, t, n = !1) {
  const s = n ? eu : t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let i = {}, l = !1;
  if (!z(e)) {
    const c = (u) => {
      const a = hl(u, t, !0);
      a && (l = !0, De(i, a));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !o && !l ? (he(e) && s.set(e, null), null) : (q(o) ? o.forEach((c) => i[c] = null) : De(i, o), he(e) && s.set(e, i), i);
}
function Ms(e, t) {
  return !e || !Es(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), ie(e, t[0].toLowerCase() + t.slice(1)) || ie(e, Vt(t)) || ie(e, t));
}
function _o(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    propsOptions: [o],
    slots: i,
    attrs: l,
    emit: c,
    render: u,
    renderCache: a,
    props: f,
    data: m,
    setupState: _,
    ctx: b,
    inheritAttrs: v
  } = e, y = hs(e);
  let T, w;
  try {
    if (n.shapeFlag & 4) {
      const R = r || s, M = Ft.NODE_ENV !== "production" && _.__isScriptSetup ? new Proxy(R, {
        get(k, D, G) {
          return ma(
            `Property '${String(
              D
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(k, D, G);
        }
      }) : R;
      T = bt(
        u.call(
          M,
          R,
          a,
          Ft.NODE_ENV !== "production" ? es(f) : f,
          _,
          m,
          b
        )
      ), w = l;
    } else {
      const R = t;
      Ft.NODE_ENV, T = bt(
        R.length > 1 ? R(
          Ft.NODE_ENV !== "production" ? es(f) : f,
          Ft.NODE_ENV !== "production" ? {
            get attrs() {
              return es(l);
            },
            slots: i,
            emit: c
          } : { attrs: l, slots: i, emit: c }
        ) : R(
          Ft.NODE_ENV !== "production" ? es(f) : f,
          null
        )
      ), w = t.props ? l : tu(l);
    }
  } catch (R) {
    In.length = 0, Ns(R, e, 1), T = ee(Nt);
  }
  let C = T;
  if (w && v !== !1) {
    const R = Object.keys(w), { shapeFlag: M } = C;
    R.length && M & 7 && (o && R.some(Lr) && (w = nu(
      w,
      o
    )), C = fn(C, w, !1, !0));
  }
  return n.dirs && (C = fn(C, null, !1, !0), C.dirs = C.dirs ? C.dirs.concat(n.dirs) : n.dirs), n.transition && Gr(C, n.transition), T = C, hs(y), T;
}
const tu = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Es(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, nu = (e, t) => {
  const n = {};
  for (const s in e)
    (!Lr(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function su(e, t, n) {
  const { props: s, children: r, component: o } = e, { props: i, children: l, patchFlag: c } = t, u = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return s ? bo(s, i, u) : !!i;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let f = 0; f < a.length; f++) {
        const m = a[f];
        if (i[m] !== s[m] && !Ms(u, m))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : s === i ? !1 : s ? i ? bo(s, i, u) : !0 : !!i;
  return !1;
}
function bo(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !Ms(n, o))
      return !0;
  }
  return !1;
}
function ru({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const ml = {}, gl = () => Object.create(ml), _l = (e) => Object.getPrototypeOf(e) === ml;
function ou(e, t, n, s = !1) {
  const r = {}, o = gl();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), bl(e, t, r, o);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  n ? e.props = s ? r : zi(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function iu(e, t, n, s) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: i }
  } = e, l = se(r), [c] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const a = e.vnode.dynamicProps;
      for (let f = 0; f < a.length; f++) {
        let m = a[f];
        if (Ms(e.emitsOptions, m))
          continue;
        const _ = t[m];
        if (c)
          if (ie(o, m))
            _ !== o[m] && (o[m] = _, u = !0);
          else {
            const b = ot(m);
            r[b] = vr(
              c,
              l,
              b,
              _,
              e,
              !1
            );
          }
        else
          _ !== o[m] && (o[m] = _, u = !0);
      }
    }
  } else {
    bl(e, t, r, o) && (u = !0);
    let a;
    for (const f in l)
      (!t || // for camelCase
      !ie(t, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = Vt(f)) === f || !ie(t, a))) && (c ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[a] !== void 0) && (r[f] = vr(
        c,
        l,
        f,
        void 0,
        e,
        !0
      )) : delete r[f]);
    if (o !== l)
      for (const f in o)
        (!t || !ie(t, f)) && (delete o[f], u = !0);
  }
  u && Ot(e.attrs, "set", "");
}
function bl(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let c in t) {
      if (Rn(c))
        continue;
      const u = t[c];
      let a;
      r && ie(r, a = ot(c)) ? !o || !o.includes(a) ? n[a] = u : (l || (l = {}))[a] = u : Ms(e.emitsOptions, c) || (!(c in s) || u !== s[c]) && (s[c] = u, i = !0);
    }
  if (o) {
    const c = se(n), u = l || ae;
    for (let a = 0; a < o.length; a++) {
      const f = o[a];
      n[f] = vr(
        r,
        c,
        f,
        u[f],
        e,
        !ie(u, f)
      );
    }
  }
  return i;
}
function vr(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const l = ie(i, "default");
    if (l && s === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && z(c)) {
        const { propsDefaults: u } = r;
        if (n in u)
          s = u[n];
        else {
          const a = qn(r);
          s = u[n] = c.call(
            null,
            t
          ), a();
        }
      } else
        s = c;
      r.ce && r.ce._setProp(n, s);
    }
    i[
      0
      /* shouldCast */
    ] && (o && !l ? s = !1 : i[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === Vt(n)) && (s = !0));
  }
  return s;
}
const lu = /* @__PURE__ */ new WeakMap();
function yl(e, t, n = !1) {
  const s = n ? lu : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const o = e.props, i = {}, l = [];
  let c = !1;
  if (!z(e)) {
    const a = (f) => {
      c = !0;
      const [m, _] = yl(f, t, !0);
      De(i, m), _ && l.push(..._);
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!o && !c)
    return he(e) && s.set(e, rn), rn;
  if (q(o))
    for (let a = 0; a < o.length; a++) {
      const f = ot(o[a]);
      yo(f) && (i[f] = ae);
    }
  else if (o)
    for (const a in o) {
      const f = ot(a);
      if (yo(f)) {
        const m = o[a], _ = i[f] = q(m) || z(m) ? { type: m } : De({}, m), b = _.type;
        let v = !1, y = !0;
        if (q(b))
          for (let T = 0; T < b.length; ++T) {
            const w = b[T], C = z(w) && w.name;
            if (C === "Boolean") {
              v = !0;
              break;
            } else C === "String" && (y = !1);
          }
        else
          v = z(b) && b.name === "Boolean";
        _[
          0
          /* shouldCast */
        ] = v, _[
          1
          /* shouldCastTrue */
        ] = y, (v || ie(_, "default")) && l.push(f);
      }
    }
  const u = [i, l];
  return he(e) && s.set(e, u), u;
}
function yo(e) {
  return e[0] !== "$" && !Rn(e);
}
const Wr = (e) => e === "_" || e === "_ctx" || e === "$stable", qr = (e) => q(e) ? e.map(bt) : [bt(e)], cu = (e, t, n) => {
  if (t._n)
    return t;
  const s = Bn((...r) => (Ft.NODE_ENV !== "production" && Oe && !(n === null && xe) && (n && (n.root, Oe.root)), qr(t(...r))), n);
  return s._c = !1, s;
}, vl = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (Wr(r)) continue;
    const o = e[r];
    if (z(o))
      t[r] = cu(r, o, s);
    else if (o != null) {
      const i = qr(o);
      t[r] = () => i;
    }
  }
}, El = (e, t) => {
  const n = qr(t);
  e.slots.default = () => n;
}, wl = (e, t, n) => {
  for (const s in t)
    (n || !Wr(s)) && (e[s] = t[s]);
}, au = (e, t, n) => {
  const s = e.slots = gl();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (wl(s, t, n), n && Ri(s, "_", r, !0)) : vl(t, s);
  } else t && El(e, t);
}, uu = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let o = !0, i = ae;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? o = !1 : wl(r, t, n) : (o = !t.$stable, vl(t, r)), i = t;
  } else t && (El(e, t), i = { default: 1 });
  if (o)
    for (const l in r)
      !Wr(l) && i[l] == null && delete r[l];
}, Xe = mu;
function fu(e) {
  return du(e);
}
function du(e, t) {
  const n = Cs();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: r,
    patchProp: o,
    createElement: i,
    createText: l,
    createComment: c,
    setText: u,
    setElementText: a,
    parentNode: f,
    nextSibling: m,
    setScopeId: _ = lt,
    insertStaticContent: b
  } = e, v = (d, h, p, g = null, E = null, A = null, x = void 0, I = null, N = !!h.dynamicChildren) => {
    if (d === h)
      return;
    d && !vn(d, h) && (g = O(d), ue(d, E, A, !0), d = null), h.patchFlag === -2 && (N = !1, h.dynamicChildren = null);
    const { type: P, ref: V, shapeFlag: U } = h;
    switch (P) {
      case Ls:
        y(d, h, p, g);
        break;
      case Nt:
        T(d, h, p, g);
        break;
      case tr:
        d == null && w(h, p, g, x);
        break;
      case Ae:
        Se(
          d,
          h,
          p,
          g,
          E,
          A,
          x,
          I,
          N
        );
        break;
      default:
        U & 1 ? M(
          d,
          h,
          p,
          g,
          E,
          A,
          x,
          I,
          N
        ) : U & 6 ? _e(
          d,
          h,
          p,
          g,
          E,
          A,
          x,
          I,
          N
        ) : (U & 64 || U & 128) && P.process(
          d,
          h,
          p,
          g,
          E,
          A,
          x,
          I,
          N,
          j
        );
    }
    V != null && E ? Pn(V, d && d.ref, A, h || d, !h) : V == null && d && d.ref != null && Pn(d.ref, null, A, d, !0);
  }, y = (d, h, p, g) => {
    if (d == null)
      s(
        h.el = l(h.children),
        p,
        g
      );
    else {
      const E = h.el = d.el;
      h.children !== d.children && u(E, h.children);
    }
  }, T = (d, h, p, g) => {
    d == null ? s(
      h.el = c(h.children || ""),
      p,
      g
    ) : h.el = d.el;
  }, w = (d, h, p, g) => {
    [d.el, d.anchor] = b(
      d.children,
      h,
      p,
      g,
      d.el,
      d.anchor
    );
  }, C = ({ el: d, anchor: h }, p, g) => {
    let E;
    for (; d && d !== h; )
      E = m(d), s(d, p, g), d = E;
    s(h, p, g);
  }, R = ({ el: d, anchor: h }) => {
    let p;
    for (; d && d !== h; )
      p = m(d), r(d), d = p;
    r(h);
  }, M = (d, h, p, g, E, A, x, I, N) => {
    if (h.type === "svg" ? x = "svg" : h.type === "math" && (x = "mathml"), d == null)
      k(
        h,
        p,
        g,
        E,
        A,
        x,
        I,
        N
      );
    else {
      const P = d.el && d.el._isVueCE ? d.el : null;
      try {
        P && P._beginPatch(), J(
          d,
          h,
          E,
          A,
          x,
          I,
          N
        );
      } finally {
        P && P._endPatch();
      }
    }
  }, k = (d, h, p, g, E, A, x, I) => {
    let N, P;
    const { props: V, shapeFlag: U, transition: H, dirs: W } = d;
    if (N = d.el = i(
      d.type,
      A,
      V && V.is,
      V
    ), U & 8 ? a(N, d.children) : U & 16 && G(
      d.children,
      N,
      null,
      g,
      E,
      er(d, A),
      x,
      I
    ), W && Gt(d, null, g, "created"), D(N, d, d.scopeId, x, g), V) {
      for (const fe in V)
        fe !== "value" && !Rn(fe) && o(N, fe, null, V[fe], A, g);
      "value" in V && o(N, "value", null, V.value, A), (P = V.onVnodeBeforeMount) && mt(P, g, d);
    }
    W && Gt(d, null, g, "beforeMount");
    const ne = pu(E, H);
    ne && H.beforeEnter(N), s(N, h, p), ((P = V && V.onVnodeMounted) || ne || W) && Xe(() => {
      P && mt(P, g, d), ne && H.enter(N), W && Gt(d, null, g, "mounted");
    }, E);
  }, D = (d, h, p, g, E) => {
    if (p && _(d, p), g)
      for (let A = 0; A < g.length; A++)
        _(d, g[A]);
    if (E) {
      let A = E.subTree;
      if (h === A || Cl(A.type) && (A.ssContent === h || A.ssFallback === h)) {
        const x = E.vnode;
        D(
          d,
          x,
          x.scopeId,
          x.slotScopeIds,
          E.parent
        );
      }
    }
  }, G = (d, h, p, g, E, A, x, I, N = 0) => {
    for (let P = N; P < d.length; P++) {
      const V = d[P] = I ? Bt(d[P]) : bt(d[P]);
      v(
        null,
        V,
        h,
        p,
        g,
        E,
        A,
        x,
        I
      );
    }
  }, J = (d, h, p, g, E, A, x) => {
    const I = h.el = d.el;
    let { patchFlag: N, dynamicChildren: P, dirs: V } = h;
    N |= d.patchFlag & 16;
    const U = d.props || ae, H = h.props || ae;
    let W;
    if (p && Kt(p, !1), (W = H.onVnodeBeforeUpdate) && mt(W, p, h, d), V && Gt(h, d, p, "beforeUpdate"), p && Kt(p, !0), (U.innerHTML && H.innerHTML == null || U.textContent && H.textContent == null) && a(I, ""), P ? ce(
      d.dynamicChildren,
      P,
      I,
      p,
      g,
      er(h, E),
      A
    ) : x || Y(
      d,
      h,
      I,
      null,
      p,
      g,
      er(h, E),
      A,
      !1
    ), N > 0) {
      if (N & 16)
        ge(I, U, H, p, E);
      else if (N & 2 && U.class !== H.class && o(I, "class", null, H.class, E), N & 4 && o(I, "style", U.style, H.style, E), N & 8) {
        const ne = h.dynamicProps;
        for (let fe = 0; fe < ne.length; fe++) {
          const le = ne[fe], Ve = U[le], $e = H[le];
          ($e !== Ve || le === "value") && o(I, le, Ve, $e, E, p);
        }
      }
      N & 1 && d.children !== h.children && a(I, h.children);
    } else !x && P == null && ge(I, U, H, p, E);
    ((W = H.onVnodeUpdated) || V) && Xe(() => {
      W && mt(W, p, h, d), V && Gt(h, d, p, "updated");
    }, g);
  }, ce = (d, h, p, g, E, A, x) => {
    for (let I = 0; I < h.length; I++) {
      const N = d[I], P = h[I], V = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        N.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (N.type === Ae || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !vn(N, P) || // - In the case of a component, it could contain anything.
        N.shapeFlag & 198) ? f(N.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          p
        )
      );
      v(
        N,
        P,
        V,
        null,
        g,
        E,
        A,
        x,
        !0
      );
    }
  }, ge = (d, h, p, g, E) => {
    if (h !== p) {
      if (h !== ae)
        for (const A in h)
          !Rn(A) && !(A in p) && o(
            d,
            A,
            h[A],
            null,
            E,
            g
          );
      for (const A in p) {
        if (Rn(A)) continue;
        const x = p[A], I = h[A];
        x !== I && A !== "value" && o(d, A, I, x, E, g);
      }
      "value" in p && o(d, "value", h.value, p.value, E);
    }
  }, Se = (d, h, p, g, E, A, x, I, N) => {
    const P = h.el = d ? d.el : l(""), V = h.anchor = d ? d.anchor : l("");
    let { patchFlag: U, dynamicChildren: H, slotScopeIds: W } = h;
    W && (I = I ? I.concat(W) : W), d == null ? (s(P, p, g), s(V, p, g), G(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      h.children || [],
      p,
      V,
      E,
      A,
      x,
      I,
      N
    )) : U > 0 && U & 64 && H && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    d.dynamicChildren && d.dynamicChildren.length === H.length ? (ce(
      d.dynamicChildren,
      H,
      p,
      E,
      A,
      x,
      I
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (h.key != null || E && h === E.subTree) && Sl(
      d,
      h,
      !0
      /* shallow */
    )) : Y(
      d,
      h,
      p,
      V,
      E,
      A,
      x,
      I,
      N
    );
  }, _e = (d, h, p, g, E, A, x, I, N) => {
    h.slotScopeIds = I, d == null ? h.shapeFlag & 512 ? E.ctx.activate(
      h,
      p,
      g,
      x,
      N
    ) : Te(
      h,
      p,
      g,
      E,
      A,
      x,
      N
    ) : qe(d, h, N);
  }, Te = (d, h, p, g, E, A, x) => {
    const I = d.component = Eu(
      d,
      g,
      E
    );
    if (il(d) && (I.ctx.renderer = j), wu(I, !1, x), I.asyncDep) {
      if (E && E.registerDep(I, Z, x), !d.el) {
        const N = I.subTree = ee(Nt);
        T(null, N, h, p), d.placeholder = N.el;
      }
    } else
      Z(
        I,
        d,
        h,
        p,
        E,
        A,
        x
      );
  }, qe = (d, h, p) => {
    const g = h.component = d.component;
    if (su(d, h, p))
      if (g.asyncDep && !g.asyncResolved) {
        $(g, h, p);
        return;
      } else
        g.next = h, g.update();
    else
      h.el = d.el, g.vnode = h;
  }, Z = (d, h, p, g, E, A, x) => {
    const I = () => {
      if (d.isMounted) {
        let { next: U, bu: H, u: W, parent: ne, vnode: fe } = d;
        {
          const pt = Al(d);
          if (pt) {
            U && (U.el = fe.el, $(d, U, x)), pt.asyncDep.then(() => {
              d.isUnmounted || I();
            });
            return;
          }
        }
        let le = U, Ve;
        Kt(d, !1), U ? (U.el = fe.el, $(d, U, x)) : U = fe, H && qs(H), (Ve = U.props && U.props.onVnodeBeforeUpdate) && mt(Ve, ne, U, fe), Kt(d, !0);
        const $e = _o(d), dt = d.subTree;
        d.subTree = $e, v(
          dt,
          $e,
          // parent may have changed if it's in a teleport
          f(dt.el),
          // anchor may have changed if it's in a fragment
          O(dt),
          d,
          E,
          A
        ), U.el = $e.el, le === null && ru(d, $e.el), W && Xe(W, E), (Ve = U.props && U.props.onVnodeUpdated) && Xe(
          () => mt(Ve, ne, U, fe),
          E
        );
      } else {
        let U;
        const { el: H, props: W } = h, { bm: ne, m: fe, parent: le, root: Ve, type: $e } = d, dt = cn(h);
        Kt(d, !1), ne && qs(ne), !dt && (U = W && W.onVnodeBeforeMount) && mt(U, le, h), Kt(d, !0);
        {
          Ve.ce && // @ts-expect-error _def is private
          Ve.ce._def.shadowRoot !== !1 && Ve.ce._injectChildStyle($e);
          const pt = d.subTree = _o(d);
          v(
            null,
            pt,
            p,
            g,
            d,
            E,
            A
          ), h.el = pt.el;
        }
        if (fe && Xe(fe, E), !dt && (U = W && W.onVnodeMounted)) {
          const pt = h;
          Xe(
            () => mt(U, le, pt),
            E
          );
        }
        (h.shapeFlag & 256 || le && cn(le.vnode) && le.vnode.shapeFlag & 256) && d.a && Xe(d.a, E), d.isMounted = !0, h = p = g = null;
      }
    };
    d.scope.on();
    const N = d.effect = new Ii(I);
    d.scope.off();
    const P = d.update = N.run.bind(N), V = d.job = N.runIfDirty.bind(N);
    V.i = d, V.id = d.uid, N.scheduler = () => $r(V), Kt(d, !0), P();
  }, $ = (d, h, p) => {
    h.component = d;
    const g = d.vnode.props;
    d.vnode = h, d.next = null, iu(d, h.props, g, p), uu(d, h.children, p), vt(), co(d), Et();
  }, Y = (d, h, p, g, E, A, x, I, N = !1) => {
    const P = d && d.children, V = d ? d.shapeFlag : 0, U = h.children, { patchFlag: H, shapeFlag: W } = h;
    if (H > 0) {
      if (H & 128) {
        et(
          P,
          U,
          p,
          g,
          E,
          A,
          x,
          I,
          N
        );
        return;
      } else if (H & 256) {
        je(
          P,
          U,
          p,
          g,
          E,
          A,
          x,
          I,
          N
        );
        return;
      }
    }
    W & 8 ? (V & 16 && He(P, E, A), U !== P && a(p, U)) : V & 16 ? W & 16 ? et(
      P,
      U,
      p,
      g,
      E,
      A,
      x,
      I,
      N
    ) : He(P, E, A, !0) : (V & 8 && a(p, ""), W & 16 && G(
      U,
      p,
      g,
      E,
      A,
      x,
      I,
      N
    ));
  }, je = (d, h, p, g, E, A, x, I, N) => {
    d = d || rn, h = h || rn;
    const P = d.length, V = h.length, U = Math.min(P, V);
    let H;
    for (H = 0; H < U; H++) {
      const W = h[H] = N ? Bt(h[H]) : bt(h[H]);
      v(
        d[H],
        W,
        p,
        null,
        E,
        A,
        x,
        I,
        N
      );
    }
    P > V ? He(
      d,
      E,
      A,
      !0,
      !1,
      U
    ) : G(
      h,
      p,
      g,
      E,
      A,
      x,
      I,
      N,
      U
    );
  }, et = (d, h, p, g, E, A, x, I, N) => {
    let P = 0;
    const V = h.length;
    let U = d.length - 1, H = V - 1;
    for (; P <= U && P <= H; ) {
      const W = d[P], ne = h[P] = N ? Bt(h[P]) : bt(h[P]);
      if (vn(W, ne))
        v(
          W,
          ne,
          p,
          null,
          E,
          A,
          x,
          I,
          N
        );
      else
        break;
      P++;
    }
    for (; P <= U && P <= H; ) {
      const W = d[U], ne = h[H] = N ? Bt(h[H]) : bt(h[H]);
      if (vn(W, ne))
        v(
          W,
          ne,
          p,
          null,
          E,
          A,
          x,
          I,
          N
        );
      else
        break;
      U--, H--;
    }
    if (P > U) {
      if (P <= H) {
        const W = H + 1, ne = W < V ? h[W].el : g;
        for (; P <= H; )
          v(
            null,
            h[P] = N ? Bt(h[P]) : bt(h[P]),
            p,
            ne,
            E,
            A,
            x,
            I,
            N
          ), P++;
      }
    } else if (P > H)
      for (; P <= U; )
        ue(d[P], E, A, !0), P++;
    else {
      const W = P, ne = P, fe = /* @__PURE__ */ new Map();
      for (P = ne; P <= H; P++) {
        const Je = h[P] = N ? Bt(h[P]) : bt(h[P]);
        Je.key != null && fe.set(Je.key, P);
      }
      let le, Ve = 0;
      const $e = H - ne + 1;
      let dt = !1, pt = 0;
      const bn = new Array($e);
      for (P = 0; P < $e; P++) bn[P] = 0;
      for (P = W; P <= U; P++) {
        const Je = d[P];
        if (Ve >= $e) {
          ue(Je, E, A, !0);
          continue;
        }
        let ht;
        if (Je.key != null)
          ht = fe.get(Je.key);
        else
          for (le = ne; le <= H; le++)
            if (bn[le - ne] === 0 && vn(Je, h[le])) {
              ht = le;
              break;
            }
        ht === void 0 ? ue(Je, E, A, !0) : (bn[ht - ne] = P + 1, ht >= pt ? pt = ht : dt = !0, v(
          Je,
          h[ht],
          p,
          null,
          E,
          A,
          x,
          I,
          N
        ), Ve++);
      }
      const no = dt ? hu(bn) : rn;
      for (le = no.length - 1, P = $e - 1; P >= 0; P--) {
        const Je = ne + P, ht = h[Je], so = h[Je + 1], ro = Je + 1 < V ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          so.el || Rl(so)
        ) : g;
        bn[P] === 0 ? v(
          null,
          ht,
          p,
          ro,
          E,
          A,
          x,
          I,
          N
        ) : dt && (le < 0 || P !== no[le] ? ye(ht, p, ro, 2) : le--);
      }
    }
  }, ye = (d, h, p, g, E = null) => {
    const { el: A, type: x, transition: I, children: N, shapeFlag: P } = d;
    if (P & 6) {
      ye(d.component.subTree, h, p, g);
      return;
    }
    if (P & 128) {
      d.suspense.move(h, p, g);
      return;
    }
    if (P & 64) {
      x.move(d, h, p, j);
      return;
    }
    if (x === Ae) {
      s(A, h, p);
      for (let U = 0; U < N.length; U++)
        ye(N[U], h, p, g);
      s(d.anchor, h, p);
      return;
    }
    if (x === tr) {
      C(d, h, p);
      return;
    }
    if (g !== 2 && P & 1 && I)
      if (g === 0)
        I.beforeEnter(A), s(A, h, p), Xe(() => I.enter(A), E);
      else {
        const { leave: U, delayLeave: H, afterLeave: W } = I, ne = () => {
          d.ctx.isUnmounted ? r(A) : s(A, h, p);
        }, fe = () => {
          A._isLeaving && A[Ta](
            !0
            /* cancelled */
          ), U(A, () => {
            ne(), W && W();
          });
        };
        H ? H(A, ne, fe) : fe();
      }
    else
      s(A, h, p);
  }, ue = (d, h, p, g = !1, E = !1) => {
    const {
      type: A,
      props: x,
      ref: I,
      children: N,
      dynamicChildren: P,
      shapeFlag: V,
      patchFlag: U,
      dirs: H,
      cacheIndex: W
    } = d;
    if (U === -2 && (E = !1), I != null && (vt(), Pn(I, null, p, d, !0), Et()), W != null && (h.renderCache[W] = void 0), V & 256) {
      h.ctx.deactivate(d);
      return;
    }
    const ne = V & 1 && H, fe = !cn(d);
    let le;
    if (fe && (le = x && x.onVnodeBeforeUnmount) && mt(le, h, d), V & 6)
      nt(d.component, p, g);
    else {
      if (V & 128) {
        d.suspense.unmount(p, g);
        return;
      }
      ne && Gt(d, null, h, "beforeUnmount"), V & 64 ? d.type.remove(
        d,
        h,
        p,
        j,
        g
      ) : P && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !P.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (A !== Ae || U > 0 && U & 64) ? He(
        P,
        h,
        p,
        !1,
        !0
      ) : (A === Ae && U & 384 || !E && V & 16) && He(N, h, p), g && tt(d);
    }
    (fe && (le = x && x.onVnodeUnmounted) || ne) && Xe(() => {
      le && mt(le, h, d), ne && Gt(d, null, h, "unmounted");
    }, p);
  }, tt = (d) => {
    const { type: h, el: p, anchor: g, transition: E } = d;
    if (h === Ae) {
      ze(p, g);
      return;
    }
    if (h === tr) {
      R(d);
      return;
    }
    const A = () => {
      r(p), E && !E.persisted && E.afterLeave && E.afterLeave();
    };
    if (d.shapeFlag & 1 && E && !E.persisted) {
      const { leave: x, delayLeave: I } = E, N = () => x(p, A);
      I ? I(d.el, A, N) : N();
    } else
      A();
  }, ze = (d, h) => {
    let p;
    for (; d !== h; )
      p = m(d), r(d), d = p;
    r(h);
  }, nt = (d, h, p) => {
    const { bum: g, scope: E, job: A, subTree: x, um: I, m: N, a: P } = d;
    vo(N), vo(P), g && qs(g), E.stop(), A && (A.flags |= 8, ue(x, d, h, p)), I && Xe(I, h), Xe(() => {
      d.isUnmounted = !0;
    }, h);
  }, He = (d, h, p, g = !1, E = !1, A = 0) => {
    for (let x = A; x < d.length; x++)
      ue(d[x], h, p, g, E);
  }, O = (d) => {
    if (d.shapeFlag & 6)
      return O(d.component.subTree);
    if (d.shapeFlag & 128)
      return d.suspense.next();
    const h = m(d.anchor || d.el), p = h && h[Oa];
    return p ? m(p) : h;
  };
  let F = !1;
  const L = (d, h, p) => {
    let g;
    d == null ? h._vnode && (ue(h._vnode, null, null, !0), g = h._vnode.component) : v(
      h._vnode || null,
      d,
      h,
      null,
      null,
      null,
      p
    ), h._vnode = d, F || (F = !0, co(g), el(), F = !1);
  }, j = {
    p: v,
    um: ue,
    m: ye,
    r: tt,
    mt: Te,
    mc: G,
    pc: Y,
    pbc: ce,
    n: O,
    o: e
  };
  return {
    render: L,
    hydrate: void 0,
    createApp: Ya(L)
  };
}
function er({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Kt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function pu(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Sl(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (q(s) && q(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let l = r[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[o] = Bt(r[o]), l.el = i.el), !n && l.patchFlag !== -2 && Sl(i, l)), l.type === Ls && (l.patchFlag !== -1 ? l.el = i.el : l.__elIndex = o + // take fragment start anchor into account
      (e.type === Ae ? 1 : 0)), l.type === Nt && !l.el && (l.el = i.el);
    }
}
function hu(e) {
  const t = e.slice(), n = [0];
  let s, r, o, i, l;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const u = e[s];
    if (u !== 0) {
      if (r = n[n.length - 1], e[r] < u) {
        t[s] = r, n.push(s);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        l = o + i >> 1, e[n[l]] < u ? o = l + 1 : i = l;
      u < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), n[o] = s);
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; )
    n[o] = i, i = t[i];
  return n;
}
function Al(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Al(t);
}
function vo(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Rl(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Rl(t.subTree) : null;
}
const Cl = (e) => e.__isSuspense;
function mu(e, t) {
  t && t.pendingBranch ? q(e) ? t.effects.push(...e) : t.effects.push(e) : wa(e);
}
const Ae = /* @__PURE__ */ Symbol.for("v-fgt"), Ls = /* @__PURE__ */ Symbol.for("v-txt"), Nt = /* @__PURE__ */ Symbol.for("v-cmt"), tr = /* @__PURE__ */ Symbol.for("v-stc"), In = [];
let Ye = null;
function K(e = !1) {
  In.push(Ye = e ? null : []);
}
function gu() {
  In.pop(), Ye = In[In.length - 1] || null;
}
let Hn = 1;
function _s(e, t = !1) {
  Hn += e, e < 0 && Ye && t && (Ye.hasOnce = !0);
}
function Ol(e) {
  return e.dynamicChildren = Hn > 0 ? Ye || rn : null, gu(), Hn > 0 && Ye && Ye.push(e), e;
}
function re(e, t, n, s, r, o) {
  return Ol(
    Q(
      e,
      t,
      n,
      s,
      r,
      o,
      !0
    )
  );
}
function Ue(e, t, n, s, r) {
  return Ol(
    ee(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function Vn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function vn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const xl = ({ key: e }) => e ?? null, os = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Ee(e) || me(e) || z(e) ? { i: xe, r: e, k: t, f: !!n } : e : null);
function Q(e, t = null, n = null, s = 0, r = null, o = e === Ae ? 0 : 1, i = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && xl(t),
    ref: t && os(t),
    scopeId: nl,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: xe
  };
  return l ? (Jr(c, n), o & 128 && e.normalize(c)) : n && (c.shapeFlag |= Ee(n) ? 8 : 16), Hn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Ye && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Ye.push(c), c;
}
const ee = _u;
function _u(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === Va) && (e = Nt), Vn(e)) {
    const l = fn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Jr(l, n), Hn > 0 && !o && Ye && (l.shapeFlag & 6 ? Ye[Ye.indexOf(e)] = l : Ye.push(l)), l.patchFlag = -2, l;
  }
  if (xu(e) && (e = e.__vccOpts), t) {
    t = bu(t);
    let { class: l, style: c } = t;
    l && !Ee(l) && (t.class = $t(l)), he(c) && (Ps(c) && !q(c) && (c = De({}, c)), t.style = an(c));
  }
  const i = Ee(e) ? 1 : Cl(e) ? 128 : xa(e) ? 64 : he(e) ? 4 : z(e) ? 2 : 0;
  return Q(
    e,
    t,
    n,
    s,
    r,
    i,
    o,
    !0
  );
}
function bu(e) {
  return e ? Ps(e) || _l(e) ? De({}, e) : e : null;
}
function fn(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: l, transition: c } = e, u = t ? Er(r || {}, t) : r, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && xl(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? q(o) ? o.concat(os(t)) : [o, os(t)] : os(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Ae ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && fn(e.ssContent),
    ssFallback: e.ssFallback && fn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && s && Gr(
    a,
    c.clone(a)
  ), a;
}
function zr(e = " ", t = 0) {
  return ee(Ls, null, e, t);
}
function qt(e = "", t = !1) {
  return t ? (K(), Ue(Nt, null, e)) : ee(Nt, null, e);
}
function bt(e) {
  return e == null || typeof e == "boolean" ? ee(Nt) : q(e) ? ee(
    Ae,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Vn(e) ? Bt(e) : ee(Ls, null, String(e));
}
function Bt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : fn(e);
}
function Jr(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (q(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Jr(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !_l(t) ? t._ctx = xe : r === 3 && xe && (xe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else z(t) ? (t = { default: t, _ctx: xe }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [zr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Er(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = $t([t.class, s.class]));
      else if (r === "style")
        t.style = an([t.style, s.style]);
      else if (Es(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(q(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function mt(e, t, n, s = null) {
  wt(e, t, 7, [
    n,
    s
  ]);
}
const yu = pl();
let vu = 0;
function Eu(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || yu, o = {
    uid: vu++,
    vnode: e,
    type: s,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Ti(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: yl(s, r),
    emitsOptions: hl(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ae,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: ae,
    data: ae,
    props: ae,
    attrs: ae,
    slots: ae,
    refs: ae,
    setupState: ae,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = Za.bind(null, o), e.ce && e.ce(o), o;
}
let Oe = null;
const Tl = () => Oe || xe;
let bs, wr;
{
  const e = Cs(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  bs = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Oe = n
  ), wr = t(
    "__VUE_SSR_SETTERS__",
    (n) => $n = n
  );
}
const qn = (e) => {
  const t = Oe;
  return bs(e), e.scope.on(), () => {
    e.scope.off(), bs(t);
  };
}, Eo = () => {
  Oe && Oe.scope.off(), bs(null);
};
function Pl(e) {
  return e.vnode.shapeFlag & 4;
}
let $n = !1;
function wu(e, t = !1, n = !1) {
  t && wr(t);
  const { props: s, children: r } = e.vnode, o = Pl(e);
  ou(e, s, o, t), au(e, r, n || t);
  const i = o ? Su(e, t) : void 0;
  return t && wr(!1), i;
}
function Su(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ga);
  const { setup: s } = n;
  if (s) {
    vt();
    const r = e.setupContext = s.length > 1 ? Ru(e) : null, o = qn(e), i = mn(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = wi(i);
    if (Et(), o(), (l || e.sp) && !cn(e) && ol(e), l) {
      if (i.then(Eo, Eo), t)
        return i.then((c) => {
          wo(e, c);
        }).catch((c) => {
          Ns(c, e, 0);
        });
      e.asyncDep = i;
    } else
      wo(e, i);
  } else
    Nl(e);
}
function wo(e, t, n) {
  z(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : he(t) && (e.setupState = Xi(t)), Nl(e);
}
function Nl(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || lt);
  {
    const r = qn(e);
    vt();
    try {
      Ka(e);
    } finally {
      Et(), r();
    }
  }
}
const Au = {
  get(e, t) {
    return Ne(e, "get", ""), e[t];
  }
};
function Ru(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Au),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Us(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Xi(Hr(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Nn)
        return Nn[n](e);
    },
    has(t, n) {
      return n in t || n in Nn;
    }
  })) : e.proxy;
}
const Cu = /(?:^|[-_])\w/g, Ou = (e) => e.replace(Cu, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Il(e, t = !0) {
  return z(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Dl(e, t, n = !1) {
  let s = Il(t);
  if (!s && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (s = r[1]);
  }
  if (!s && e) {
    const r = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    s = r(e.components) || e.parent && r(
      e.parent.type.components
    ) || r(e.appContext.components);
  }
  return s ? Ou(s) : n ? "App" : "Anonymous";
}
function xu(e) {
  return z(e) && "__vccOpts" in e;
}
const Ce = (e, t) => da(e, t, $n);
function Ml(e, t, n) {
  try {
    _s(-1);
    const s = arguments.length;
    return s === 2 ? he(t) && !q(t) ? Vn(t) ? ee(e, null, [t]) : ee(e, t) : ee(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Vn(n) && (n = [n]), ee(e, t, n));
  } finally {
    _s(1);
  }
}
const Tu = "3.5.26";
let Sr;
const So = typeof window < "u" && window.trustedTypes;
if (So)
  try {
    Sr = /* @__PURE__ */ So.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Ll = Sr ? (e) => Sr.createHTML(e) : (e) => e, Pu = "http://www.w3.org/2000/svg", Nu = "http://www.w3.org/1998/Math/MathML", Rt = typeof document < "u" ? document : null, Ao = Rt && /* @__PURE__ */ Rt.createElement("template"), Iu = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? Rt.createElementNS(Pu, e) : t === "mathml" ? Rt.createElementNS(Nu, e) : n ? Rt.createElement(e, { is: n }) : Rt.createElement(e);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => Rt.createTextNode(e),
  createComment: (e) => Rt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Rt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, r, o) {
    const i = n ? n.previousSibling : t.lastChild;
    if (r && (r === o || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === o || !(r = r.nextSibling)); )
        ;
    else {
      Ao.innerHTML = Ll(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Ao.content;
      if (s === "svg" || s === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Du = /* @__PURE__ */ Symbol("_vtc");
function Mu(e, t, n) {
  const s = e[Du];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const ys = /* @__PURE__ */ Symbol("_vod"), Ul = /* @__PURE__ */ Symbol("_vsh"), Ro = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: n }) {
    e[ys] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : En(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), En(e, !0), s.enter(e)) : s.leave(e, () => {
      En(e, !1);
    }) : En(e, t));
  },
  beforeUnmount(e, { value: t }) {
    En(e, t);
  }
};
function En(e, t) {
  e.style.display = t ? e[ys] : "none", e[Ul] = !t;
}
const Lu = /* @__PURE__ */ Symbol(""), Uu = /(?:^|;)\s*display\s*:/;
function Fu(e, t, n) {
  const s = e.style, r = Ee(n);
  let o = !1;
  if (n && !r) {
    if (t)
      if (Ee(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && is(s, l, "");
        }
      else
        for (const i in t)
          n[i] == null && is(s, i, "");
    for (const i in n)
      i === "display" && (o = !0), is(s, i, n[i]);
  } else if (r) {
    if (t !== n) {
      const i = s[Lu];
      i && (n += ";" + i), s.cssText = n, o = Uu.test(n);
    }
  } else t && e.removeAttribute("style");
  ys in e && (e[ys] = o ? s.display : "", e[Ul] && (s.display = "none"));
}
const Co = /\s*!important$/;
function is(e, t, n) {
  if (q(n))
    n.forEach((s) => is(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = ku(e, t);
    Co.test(n) ? e.setProperty(
      Vt(s),
      n.replace(Co, ""),
      "important"
    ) : e[s] = n;
  }
}
const Oo = ["Webkit", "Moz", "ms"], nr = {};
function ku(e, t) {
  const n = nr[t];
  if (n)
    return n;
  let s = ot(t);
  if (s !== "filter" && s in e)
    return nr[t] = s;
  s = Rs(s);
  for (let r = 0; r < Oo.length; r++) {
    const o = Oo[r] + s;
    if (o in e)
      return nr[t] = o;
  }
  return t;
}
const xo = "http://www.w3.org/1999/xlink";
function To(e, t, n, s, r, o = kc(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(xo, t.slice(6, t.length)) : e.setAttributeNS(xo, t, n) : n == null || o && !Ci(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    o ? "" : It(n) ? String(n) : n
  );
}
function Po(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Ll(n) : n);
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && // custom elements may use _value internally
  !o.includes("-")) {
    const l = o === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = Ci(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(r || t);
}
function Bu(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function ju(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const No = /* @__PURE__ */ Symbol("_vei");
function Hu(e, t, n, s, r = null) {
  const o = e[No] || (e[No] = {}), i = o[t];
  if (s && i)
    i.value = s;
  else {
    const [l, c] = Vu(t);
    if (s) {
      const u = o[t] = Ku(
        s,
        r
      );
      Bu(e, l, u, c);
    } else i && (ju(e, l, i, c), o[t] = void 0);
  }
}
const Io = /(?:Once|Passive|Capture)$/;
function Vu(e) {
  let t;
  if (Io.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Io); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Vt(e.slice(2)), t];
}
let sr = 0;
const $u = /* @__PURE__ */ Promise.resolve(), Gu = () => sr || ($u.then(() => sr = 0), sr = Date.now());
function Ku(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    wt(
      Wu(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = Gu(), n;
}
function Wu(e, t) {
  if (q(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (s) => (r) => !r._stopped && s && s(r)
    );
  } else
    return t;
}
const Do = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, qu = (e, t, n, s, r, o) => {
  const i = r === "svg";
  t === "class" ? Mu(e, s, i) : t === "style" ? Fu(e, n, s) : Es(t) ? Lr(t) || Hu(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : zu(e, t, s, i)) ? (Po(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && To(e, t, s, i, o, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !Ee(s)) ? Po(e, ot(t), s, o, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), To(e, t, s, i));
};
function zu(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Do(t) && z(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Do(t) && Ee(n) ? !1 : t in e;
}
const Ju = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Xu = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = ((r) => {
    if (!("key" in r))
      return;
    const o = Vt(r.key);
    if (t.some(
      (i) => i === o || Ju[i] === o
    ))
      return e(r);
  }));
}, Yu = /* @__PURE__ */ De({ patchProp: qu }, Iu);
let Mo;
function Qu() {
  return Mo || (Mo = fu(Yu));
}
const Zu = ((...e) => {
  const t = Qu().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = tf(s);
    if (!r) return;
    const o = t._component;
    !z(o) && !o.render && !o.template && (o.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const i = n(r, !1, ef(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i;
  }, t;
});
function ef(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function tf(e) {
  return Ee(e) ? document.querySelector(e) : e;
}
let Fl;
const Fs = (e) => Fl = e, kl = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function Ar(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Dn;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Dn || (Dn = {}));
function nf() {
  const e = Pi(!0), t = e.run(() => pe({}));
  let n = [], s = [];
  const r = Hr({
    install(o) {
      Fs(r), r._a = o, o.provide(kl, r), o.config.globalProperties.$pinia = r, s.forEach((i) => n.push(i)), s = [];
    },
    use(o) {
      return this._a ? n.push(o) : s.push(o), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return r;
}
const Bl = () => {
};
function Lo(e, t, n, s = Bl) {
  e.add(t);
  const r = () => {
    e.delete(t) && s();
  };
  return !n && Ni() && jc(r), r;
}
function tn(e, ...t) {
  e.forEach((n) => {
    n(...t);
  });
}
const sf = (e) => e(), Uo = /* @__PURE__ */ Symbol(), rr = /* @__PURE__ */ Symbol();
function Rr(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, s) => e.set(s, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const s = t[n], r = e[n];
    Ar(r) && Ar(s) && e.hasOwnProperty(n) && !me(s) && !Tt(s) ? e[n] = Rr(r, s) : e[n] = s;
  }
  return e;
}
const rf = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function of(e) {
  return !Ar(e) || !Object.prototype.hasOwnProperty.call(e, rf);
}
const { assign: Lt } = Object;
function lf(e) {
  return !!(me(e) && e.effect);
}
function cf(e, t, n, s) {
  const { state: r, actions: o, getters: i } = t, l = n.state.value[e];
  let c;
  function u() {
    l || (n.state.value[e] = r ? r() : {});
    const a = Wn(n.state.value[e]);
    return Lt(a, o, Object.keys(i || {}).reduce((f, m) => (f[m] = Hr(Ce(() => {
      Fs(n);
      const _ = n._s.get(e);
      return i[m].call(_, _);
    })), f), {}));
  }
  return c = jl(e, u, t, n, s, !0), c;
}
function jl(e, t, n = {}, s, r, o) {
  let i;
  const l = Lt({ actions: {} }, n), c = { deep: !0 };
  let u, a, f = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set(), _;
  const b = s.state.value[e];
  !o && !b && (s.state.value[e] = {}), pe({});
  let v;
  function y(G) {
    let J;
    u = a = !1, typeof G == "function" ? (G(s.state.value[e]), J = {
      type: Dn.patchFunction,
      storeId: e,
      events: _
    }) : (Rr(s.state.value[e], G), J = {
      type: Dn.patchObject,
      payload: G,
      storeId: e,
      events: _
    });
    const ce = v = /* @__PURE__ */ Symbol();
    Vr().then(() => {
      v === ce && (u = !0);
    }), a = !0, tn(f, J, s.state.value[e]);
  }
  const T = o ? function() {
    const { state: J } = n, ce = J ? J() : {};
    this.$patch((ge) => {
      Lt(ge, ce);
    });
  } : (
    /* istanbul ignore next */
    Bl
  );
  function w() {
    i.stop(), f.clear(), m.clear(), s._s.delete(e);
  }
  const C = (G, J = "") => {
    if (Uo in G)
      return G[rr] = J, G;
    const ce = function() {
      Fs(s);
      const ge = Array.from(arguments), Se = /* @__PURE__ */ new Set(), _e = /* @__PURE__ */ new Set();
      function Te($) {
        Se.add($);
      }
      function qe($) {
        _e.add($);
      }
      tn(m, {
        args: ge,
        name: ce[rr],
        store: M,
        after: Te,
        onError: qe
      });
      let Z;
      try {
        Z = G.apply(this && this.$id === e ? this : M, ge);
      } catch ($) {
        throw tn(_e, $), $;
      }
      return Z instanceof Promise ? Z.then(($) => (tn(Se, $), $)).catch(($) => (tn(_e, $), Promise.reject($))) : (tn(Se, Z), Z);
    };
    return ce[Uo] = !0, ce[rr] = J, ce;
  }, R = {
    _p: s,
    // _s: scope,
    $id: e,
    $onAction: Lo.bind(null, m),
    $patch: y,
    $reset: T,
    $subscribe(G, J = {}) {
      const ce = Lo(f, G, J.detached, () => ge()), ge = i.run(() => yt(() => s.state.value[e], (Se) => {
        (J.flush === "sync" ? a : u) && G({
          storeId: e,
          type: Dn.direct,
          events: _
        }, Se);
      }, Lt({}, c, J)));
      return ce;
    },
    $dispose: w
  }, M = Kn(R);
  s._s.set(e, M);
  const D = (s._a && s._a.runWithContext || sf)(() => s._e.run(() => (i = Pi()).run(() => t({ action: C }))));
  for (const G in D) {
    const J = D[G];
    if (me(J) && !lf(J) || Tt(J))
      o || (b && of(J) && (me(J) ? J.value = b[G] : Rr(J, b[G])), s.state.value[e][G] = J);
    else if (typeof J == "function") {
      const ce = C(J, G);
      D[G] = ce, l.actions[G] = J;
    }
  }
  return Lt(M, D), Lt(se(M), D), Object.defineProperty(M, "$state", {
    get: () => s.state.value[e],
    set: (G) => {
      y((J) => {
        Lt(J, G);
      });
    }
  }), s._p.forEach((G) => {
    Lt(M, i.run(() => G({
      store: M,
      app: s._a,
      pinia: s,
      options: l
    })));
  }), b && o && n.hydrate && n.hydrate(M.$state, b), u = !0, a = !0, M;
}
// @__NO_SIDE_EFFECTS__
function af(e, t, n) {
  let s;
  const r = typeof t == "function";
  s = r ? n : t;
  function o(i, l) {
    const c = Sa();
    return i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    i || (c ? Ze(kl, null) : null), i && Fs(i), i = Fl, i._s.has(e) || (r ? jl(e, t, s, i) : cf(e, s, i)), i._s.get(e);
  }
  return o.$id = e, o;
}
const ks = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, uf = {};
function ff(e, t) {
  const n = Ha("router-view");
  return K(), Ue(n);
}
const df = /* @__PURE__ */ ks(uf, [["render", ff]]), sn = typeof document < "u";
function Hl(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function pf(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module" || e.default && Hl(e.default);
}
const oe = Object.assign;
function or(e, t) {
  const n = {};
  for (const s in t) {
    const r = t[s];
    n[s] = ut(r) ? r.map(e) : e(r);
  }
  return n;
}
const Mn = () => {
}, ut = Array.isArray;
function Fo(e, t) {
  const n = {};
  for (const s in e) n[s] = s in t ? t[s] : e[s];
  return n;
}
const Vl = /#/g, hf = /&/g, mf = /\//g, gf = /=/g, _f = /\?/g, $l = /\+/g, bf = /%5B/g, yf = /%5D/g, Gl = /%5E/g, vf = /%60/g, Kl = /%7B/g, Ef = /%7C/g, Wl = /%7D/g, wf = /%20/g;
function Xr(e) {
  return e == null ? "" : encodeURI("" + e).replace(Ef, "|").replace(bf, "[").replace(yf, "]");
}
function Sf(e) {
  return Xr(e).replace(Kl, "{").replace(Wl, "}").replace(Gl, "^");
}
function Cr(e) {
  return Xr(e).replace($l, "%2B").replace(wf, "+").replace(Vl, "%23").replace(hf, "%26").replace(vf, "`").replace(Kl, "{").replace(Wl, "}").replace(Gl, "^");
}
function Af(e) {
  return Cr(e).replace(gf, "%3D");
}
function Rf(e) {
  return Xr(e).replace(Vl, "%23").replace(_f, "%3F");
}
function Cf(e) {
  return Rf(e).replace(mf, "%2F");
}
function Gn(e) {
  if (e == null) return null;
  try {
    return decodeURIComponent("" + e);
  } catch {
  }
  return "" + e;
}
const Of = /\/$/, xf = (e) => e.replace(Of, "");
function ir(e, t, n = "/") {
  let s, r = {}, o = "", i = "";
  const l = t.indexOf("#");
  let c = t.indexOf("?");
  return c = l >= 0 && c > l ? -1 : c, c >= 0 && (s = t.slice(0, c), o = t.slice(c, l > 0 ? l : t.length), r = e(o.slice(1))), l >= 0 && (s = s || t.slice(0, l), i = t.slice(l, t.length)), s = If(s ?? t, n), {
    fullPath: s + o + i,
    path: s,
    query: r,
    hash: Gn(i)
  };
}
function Tf(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function ko(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function Pf(e, t, n) {
  const s = t.matched.length - 1, r = n.matched.length - 1;
  return s > -1 && s === r && dn(t.matched[s], n.matched[r]) && ql(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function dn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function ql(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (var n in e) if (!Nf(e[n], t[n])) return !1;
  return !0;
}
function Nf(e, t) {
  return ut(e) ? Bo(e, t) : ut(t) ? Bo(t, e) : e?.valueOf() === t?.valueOf();
}
function Bo(e, t) {
  return ut(t) ? e.length === t.length && e.every((n, s) => n === t[s]) : e.length === 1 && e[0] === t;
}
function If(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"), s = e.split("/"), r = s[s.length - 1];
  (r === ".." || r === ".") && s.push("");
  let o = n.length - 1, i, l;
  for (i = 0; i < s.length; i++)
    if (l = s[i], l !== ".")
      if (l === "..")
        o > 1 && o--;
      else break;
  return n.slice(0, o).join("/") + "/" + s.slice(i).join("/");
}
const Mt = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
let Or = /* @__PURE__ */ (function(e) {
  return e.pop = "pop", e.push = "push", e;
})({}), lr = /* @__PURE__ */ (function(e) {
  return e.back = "back", e.forward = "forward", e.unknown = "", e;
})({});
function Df(e) {
  if (!e) if (sn) {
    const t = document.querySelector("base");
    e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
  } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), xf(e);
}
const Mf = /^[^#]+#/;
function Lf(e, t) {
  return e.replace(Mf, "#") + t;
}
function Uf(e, t) {
  const n = document.documentElement.getBoundingClientRect(), s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0)
  };
}
const Bs = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function Ff(e) {
  let t;
  if ("el" in e) {
    const n = e.el, s = typeof n == "string" && n.startsWith("#"), r = typeof n == "string" ? s ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!r)
      return;
    t = Uf(r, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function jo(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const xr = /* @__PURE__ */ new Map();
function kf(e, t) {
  xr.set(e, t);
}
function Bf(e) {
  const t = xr.get(e);
  return xr.delete(e), t;
}
function jf(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function zl(e) {
  return typeof e == "string" || typeof e == "symbol";
}
let be = /* @__PURE__ */ (function(e) {
  return e[e.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", e[e.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", e[e.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", e[e.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", e[e.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", e;
})({});
const Jl = /* @__PURE__ */ Symbol("");
be.MATCHER_NOT_FOUND + "", be.NAVIGATION_GUARD_REDIRECT + "", be.NAVIGATION_ABORTED + "", be.NAVIGATION_CANCELLED + "", be.NAVIGATION_DUPLICATED + "";
function pn(e, t) {
  return oe(/* @__PURE__ */ new Error(), {
    type: e,
    [Jl]: !0
  }, t);
}
function At(e, t) {
  return e instanceof Error && Jl in e && (t == null || !!(e.type & t));
}
const Hf = [
  "params",
  "query",
  "hash"
];
function Vf(e) {
  if (typeof e == "string") return e;
  if (e.path != null) return e.path;
  const t = {};
  for (const n of Hf) n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
function $f(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const n = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < n.length; ++s) {
    const r = n[s].replace($l, " "), o = r.indexOf("="), i = Gn(o < 0 ? r : r.slice(0, o)), l = o < 0 ? null : Gn(r.slice(o + 1));
    if (i in t) {
      let c = t[i];
      ut(c) || (c = t[i] = [c]), c.push(l);
    } else t[i] = l;
  }
  return t;
}
function Ho(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (n = Af(n), s == null) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (ut(s) ? s.map((r) => r && Cr(r)) : [s && Cr(s)]).forEach((r) => {
      r !== void 0 && (t += (t.length ? "&" : "") + n, r != null && (t += "=" + r));
    });
  }
  return t;
}
function Gf(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 && (t[n] = ut(s) ? s.map((r) => r == null ? null : "" + r) : s == null ? s : "" + s);
  }
  return t;
}
const Kf = /* @__PURE__ */ Symbol(""), Vo = /* @__PURE__ */ Symbol(""), js = /* @__PURE__ */ Symbol(""), Yr = /* @__PURE__ */ Symbol(""), Tr = /* @__PURE__ */ Symbol("");
function wn() {
  let e = [];
  function t(s) {
    return e.push(s), () => {
      const r = e.indexOf(s);
      r > -1 && e.splice(r, 1);
    };
  }
  function n() {
    e = [];
  }
  return {
    add: t,
    list: () => e.slice(),
    reset: n
  };
}
function jt(e, t, n, s, r, o = (i) => i()) {
  const i = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
  return () => new Promise((l, c) => {
    const u = (m) => {
      m === !1 ? c(pn(be.NAVIGATION_ABORTED, {
        from: n,
        to: t
      })) : m instanceof Error ? c(m) : jf(m) ? c(pn(be.NAVIGATION_GUARD_REDIRECT, {
        from: t,
        to: m
      })) : (i && s.enterCallbacks[r] === i && typeof m == "function" && i.push(m), l());
    }, a = o(() => e.call(s && s.instances[r], t, n, u));
    let f = Promise.resolve(a);
    e.length < 3 && (f = f.then(u)), f.catch((m) => c(m));
  });
}
function cr(e, t, n, s, r = (o) => o()) {
  const o = [];
  for (const i of e)
    for (const l in i.components) {
      let c = i.components[l];
      if (!(t !== "beforeRouteEnter" && !i.instances[l]))
        if (Hl(c)) {
          const u = (c.__vccOpts || c)[t];
          u && o.push(jt(u, n, s, i, l, r));
        } else {
          let u = c();
          o.push(() => u.then((a) => {
            if (!a) throw new Error(`Couldn't resolve component "${l}" at "${i.path}"`);
            const f = pf(a) ? a.default : a;
            i.mods[l] = a, i.components[l] = f;
            const m = (f.__vccOpts || f)[t];
            return m && jt(m, n, s, i, l, r)();
          }));
        }
    }
  return o;
}
function Wf(e, t) {
  const n = [], s = [], r = [], o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const l = t.matched[i];
    l && (e.matched.find((u) => dn(u, l)) ? s.push(l) : n.push(l));
    const c = e.matched[i];
    c && (t.matched.find((u) => dn(u, c)) || r.push(c));
  }
  return [
    n,
    s,
    r
  ];
}
let qf = () => location.protocol + "//" + location.host;
function Xl(e, t) {
  const { pathname: n, search: s, hash: r } = t, o = e.indexOf("#");
  if (o > -1) {
    let i = r.includes(e.slice(o)) ? e.slice(o).length : 1, l = r.slice(i);
    return l[0] !== "/" && (l = "/" + l), ko(l, "");
  }
  return ko(n, e) + s + r;
}
function zf(e, t, n, s) {
  let r = [], o = [], i = null;
  const l = ({ state: m }) => {
    const _ = Xl(e, location), b = n.value, v = t.value;
    let y = 0;
    if (m) {
      if (n.value = _, t.value = m, i && i === b) {
        i = null;
        return;
      }
      y = v ? m.position - v.position : 0;
    } else s(_);
    r.forEach((T) => {
      T(n.value, b, {
        delta: y,
        type: Or.pop,
        direction: y ? y > 0 ? lr.forward : lr.back : lr.unknown
      });
    });
  };
  function c() {
    i = n.value;
  }
  function u(m) {
    r.push(m);
    const _ = () => {
      const b = r.indexOf(m);
      b > -1 && r.splice(b, 1);
    };
    return o.push(_), _;
  }
  function a() {
    if (document.visibilityState === "hidden") {
      const { history: m } = window;
      if (!m.state) return;
      m.replaceState(oe({}, m.state, { scroll: Bs() }), "");
    }
  }
  function f() {
    for (const m of o) m();
    o = [], window.removeEventListener("popstate", l), window.removeEventListener("pagehide", a), document.removeEventListener("visibilitychange", a);
  }
  return window.addEventListener("popstate", l), window.addEventListener("pagehide", a), document.addEventListener("visibilitychange", a), {
    pauseListeners: c,
    listen: u,
    destroy: f
  };
}
function $o(e, t, n, s = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: r ? Bs() : null
  };
}
function Jf(e) {
  const { history: t, location: n } = window, s = { value: Xl(e, n) }, r = { value: t.state };
  r.value || o(s.value, {
    back: null,
    current: s.value,
    forward: null,
    position: t.length - 1,
    replaced: !0,
    scroll: null
  }, !0);
  function o(c, u, a) {
    const f = e.indexOf("#"), m = f > -1 ? (n.host && document.querySelector("base") ? e : e.slice(f)) + c : qf() + e + c;
    try {
      t[a ? "replaceState" : "pushState"](u, "", m), r.value = u;
    } catch (_) {
      console.error(_), n[a ? "replace" : "assign"](m);
    }
  }
  function i(c, u) {
    o(c, oe({}, t.state, $o(r.value.back, c, r.value.forward, !0), u, { position: r.value.position }), !0), s.value = c;
  }
  function l(c, u) {
    const a = oe({}, r.value, t.state, {
      forward: c,
      scroll: Bs()
    });
    o(a.current, a, !0), o(c, oe({}, $o(s.value, c, null), { position: a.position + 1 }, u), !1), s.value = c;
  }
  return {
    location: s,
    state: r,
    push: l,
    replace: i
  };
}
function Xf(e) {
  e = Df(e);
  const t = Jf(e), n = zf(e, t.state, t.location, t.replace);
  function s(o, i = !0) {
    i || n.pauseListeners(), history.go(o);
  }
  const r = oe({
    location: "",
    base: e,
    go: s,
    createHref: Lf.bind(null, e)
  }, t, n);
  return Object.defineProperty(r, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(r, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), r;
}
function Yf(e) {
  return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), Xf(e);
}
let zt = /* @__PURE__ */ (function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.Group = 2] = "Group", e;
})({});
var Re = /* @__PURE__ */ (function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.ParamRegExp = 2] = "ParamRegExp", e[e.ParamRegExpEnd = 3] = "ParamRegExpEnd", e[e.EscapeNext = 4] = "EscapeNext", e;
})(Re || {});
const Qf = {
  type: zt.Static,
  value: ""
}, Zf = /[a-zA-Z0-9_]/;
function ed(e) {
  if (!e) return [[]];
  if (e === "/") return [[Qf]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(_) {
    throw new Error(`ERR (${n})/"${u}": ${_}`);
  }
  let n = Re.Static, s = n;
  const r = [];
  let o;
  function i() {
    o && r.push(o), o = [];
  }
  let l = 0, c, u = "", a = "";
  function f() {
    u && (n === Re.Static ? o.push({
      type: zt.Static,
      value: u
    }) : n === Re.Param || n === Re.ParamRegExp || n === Re.ParamRegExpEnd ? (o.length > 1 && (c === "*" || c === "+") && t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`), o.push({
      type: zt.Param,
      value: u,
      regexp: a,
      repeatable: c === "*" || c === "+",
      optional: c === "*" || c === "?"
    })) : t("Invalid state to consume buffer"), u = "");
  }
  function m() {
    u += c;
  }
  for (; l < e.length; ) {
    if (c = e[l++], c === "\\" && n !== Re.ParamRegExp) {
      s = n, n = Re.EscapeNext;
      continue;
    }
    switch (n) {
      case Re.Static:
        c === "/" ? (u && f(), i()) : c === ":" ? (f(), n = Re.Param) : m();
        break;
      case Re.EscapeNext:
        m(), n = s;
        break;
      case Re.Param:
        c === "(" ? n = Re.ParamRegExp : Zf.test(c) ? m() : (f(), n = Re.Static, c !== "*" && c !== "?" && c !== "+" && l--);
        break;
      case Re.ParamRegExp:
        c === ")" ? a[a.length - 1] == "\\" ? a = a.slice(0, -1) + c : n = Re.ParamRegExpEnd : a += c;
        break;
      case Re.ParamRegExpEnd:
        f(), n = Re.Static, c !== "*" && c !== "?" && c !== "+" && l--, a = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === Re.ParamRegExp && t(`Unfinished custom RegExp for param "${u}"`), f(), i(), r;
}
const Go = "[^/]+?", td = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
};
var Le = /* @__PURE__ */ (function(e) {
  return e[e._multiplier = 10] = "_multiplier", e[e.Root = 90] = "Root", e[e.Segment = 40] = "Segment", e[e.SubSegment = 30] = "SubSegment", e[e.Static = 40] = "Static", e[e.Dynamic = 20] = "Dynamic", e[e.BonusCustomRegExp = 10] = "BonusCustomRegExp", e[e.BonusWildcard = -50] = "BonusWildcard", e[e.BonusRepeatable = -20] = "BonusRepeatable", e[e.BonusOptional = -8] = "BonusOptional", e[e.BonusStrict = 0.7000000000000001] = "BonusStrict", e[e.BonusCaseSensitive = 0.25] = "BonusCaseSensitive", e;
})(Le || {});
const nd = /[.+*?^${}()[\]/\\]/g;
function sd(e, t) {
  const n = oe({}, td, t), s = [];
  let r = n.start ? "^" : "";
  const o = [];
  for (const u of e) {
    const a = u.length ? [] : [Le.Root];
    n.strict && !u.length && (r += "/");
    for (let f = 0; f < u.length; f++) {
      const m = u[f];
      let _ = Le.Segment + (n.sensitive ? Le.BonusCaseSensitive : 0);
      if (m.type === zt.Static)
        f || (r += "/"), r += m.value.replace(nd, "\\$&"), _ += Le.Static;
      else if (m.type === zt.Param) {
        const { value: b, repeatable: v, optional: y, regexp: T } = m;
        o.push({
          name: b,
          repeatable: v,
          optional: y
        });
        const w = T || Go;
        if (w !== Go) {
          _ += Le.BonusCustomRegExp;
          try {
            `${w}`;
          } catch (R) {
            throw new Error(`Invalid custom RegExp for param "${b}" (${w}): ` + R.message);
          }
        }
        let C = v ? `((?:${w})(?:/(?:${w}))*)` : `(${w})`;
        f || (C = y && u.length < 2 ? `(?:/${C})` : "/" + C), y && (C += "?"), r += C, _ += Le.Dynamic, y && (_ += Le.BonusOptional), v && (_ += Le.BonusRepeatable), w === ".*" && (_ += Le.BonusWildcard);
      }
      a.push(_);
    }
    s.push(a);
  }
  if (n.strict && n.end) {
    const u = s.length - 1;
    s[u][s[u].length - 1] += Le.BonusStrict;
  }
  n.strict || (r += "/?"), n.end ? r += "$" : n.strict && !r.endsWith("/") && (r += "(?:/|$)");
  const i = new RegExp(r, n.sensitive ? "" : "i");
  function l(u) {
    const a = u.match(i), f = {};
    if (!a) return null;
    for (let m = 1; m < a.length; m++) {
      const _ = a[m] || "", b = o[m - 1];
      f[b.name] = _ && b.repeatable ? _.split("/") : _;
    }
    return f;
  }
  function c(u) {
    let a = "", f = !1;
    for (const m of e) {
      (!f || !a.endsWith("/")) && (a += "/"), f = !1;
      for (const _ of m) if (_.type === zt.Static) a += _.value;
      else if (_.type === zt.Param) {
        const { value: b, repeatable: v, optional: y } = _, T = b in u ? u[b] : "";
        if (ut(T) && !v) throw new Error(`Provided param "${b}" is an array but it is not repeatable (* or + modifiers)`);
        const w = ut(T) ? T.join("/") : T;
        if (!w) if (y)
          m.length < 2 && (a.endsWith("/") ? a = a.slice(0, -1) : f = !0);
        else throw new Error(`Missing required param "${b}"`);
        a += w;
      }
    }
    return a || "/";
  }
  return {
    re: i,
    score: s,
    keys: o,
    parse: l,
    stringify: c
  };
}
function rd(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n];
    if (s) return s;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === Le.Static + Le.Segment ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === Le.Static + Le.Segment ? 1 : -1 : 0;
}
function Yl(e, t) {
  let n = 0;
  const s = e.score, r = t.score;
  for (; n < s.length && n < r.length; ) {
    const o = rd(s[n], r[n]);
    if (o) return o;
    n++;
  }
  if (Math.abs(r.length - s.length) === 1) {
    if (Ko(s)) return 1;
    if (Ko(r)) return -1;
  }
  return r.length - s.length;
}
function Ko(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const od = {
  strict: !1,
  end: !0,
  sensitive: !1
};
function id(e, t, n) {
  const s = sd(ed(e.path), n), r = oe(s, {
    record: e,
    parent: t,
    children: [],
    alias: []
  });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function ld(e, t) {
  const n = [], s = /* @__PURE__ */ new Map();
  t = Fo(od, t);
  function r(f) {
    return s.get(f);
  }
  function o(f, m, _) {
    const b = !_, v = qo(f);
    v.aliasOf = _ && _.record;
    const y = Fo(t, f), T = [v];
    if ("alias" in f) {
      const R = typeof f.alias == "string" ? [f.alias] : f.alias;
      for (const M of R) T.push(qo(oe({}, v, {
        components: _ ? _.record.components : v.components,
        path: M,
        aliasOf: _ ? _.record : v
      })));
    }
    let w, C;
    for (const R of T) {
      const { path: M } = R;
      if (m && M[0] !== "/") {
        const k = m.record.path, D = k[k.length - 1] === "/" ? "" : "/";
        R.path = m.record.path + (M && D + M);
      }
      if (w = id(R, m, y), _ ? _.alias.push(w) : (C = C || w, C !== w && C.alias.push(w), b && f.name && !zo(w) && i(f.name)), Ql(w) && c(w), v.children) {
        const k = v.children;
        for (let D = 0; D < k.length; D++) o(k[D], w, _ && _.children[D]);
      }
      _ = _ || w;
    }
    return C ? () => {
      i(C);
    } : Mn;
  }
  function i(f) {
    if (zl(f)) {
      const m = s.get(f);
      m && (s.delete(f), n.splice(n.indexOf(m), 1), m.children.forEach(i), m.alias.forEach(i));
    } else {
      const m = n.indexOf(f);
      m > -1 && (n.splice(m, 1), f.record.name && s.delete(f.record.name), f.children.forEach(i), f.alias.forEach(i));
    }
  }
  function l() {
    return n;
  }
  function c(f) {
    const m = ud(f, n);
    n.splice(m, 0, f), f.record.name && !zo(f) && s.set(f.record.name, f);
  }
  function u(f, m) {
    let _, b = {}, v, y;
    if ("name" in f && f.name) {
      if (_ = s.get(f.name), !_) throw pn(be.MATCHER_NOT_FOUND, { location: f });
      y = _.record.name, b = oe(Wo(m.params, _.keys.filter((C) => !C.optional).concat(_.parent ? _.parent.keys.filter((C) => C.optional) : []).map((C) => C.name)), f.params && Wo(f.params, _.keys.map((C) => C.name))), v = _.stringify(b);
    } else if (f.path != null)
      v = f.path, _ = n.find((C) => C.re.test(v)), _ && (b = _.parse(v), y = _.record.name);
    else {
      if (_ = m.name ? s.get(m.name) : n.find((C) => C.re.test(m.path)), !_) throw pn(be.MATCHER_NOT_FOUND, {
        location: f,
        currentLocation: m
      });
      y = _.record.name, b = oe({}, m.params, f.params), v = _.stringify(b);
    }
    const T = [];
    let w = _;
    for (; w; )
      T.unshift(w.record), w = w.parent;
    return {
      name: y,
      path: v,
      params: b,
      matched: T,
      meta: ad(T)
    };
  }
  e.forEach((f) => o(f));
  function a() {
    n.length = 0, s.clear();
  }
  return {
    addRoute: o,
    resolve: u,
    removeRoute: i,
    clearRoutes: a,
    getRoutes: l,
    getRecordMatcher: r
  };
}
function Wo(e, t) {
  const n = {};
  for (const s of t) s in e && (n[s] = e[s]);
  return n;
}
function qo(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: cd(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
  return Object.defineProperty(t, "mods", { value: {} }), t;
}
function cd(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const s in e.components) t[s] = typeof n == "object" ? n[s] : n;
  return t;
}
function zo(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function ad(e) {
  return e.reduce((t, n) => oe(t, n.meta), {});
}
function ud(e, t) {
  let n = 0, s = t.length;
  for (; n !== s; ) {
    const o = n + s >> 1;
    Yl(e, t[o]) < 0 ? s = o : n = o + 1;
  }
  const r = fd(e);
  return r && (s = t.lastIndexOf(r, s - 1)), s;
}
function fd(e) {
  let t = e;
  for (; t = t.parent; ) if (Ql(t) && Yl(e, t) === 0) return t;
}
function Ql({ record: e }) {
  return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
}
function Jo(e) {
  const t = Ze(js), n = Ze(Yr), s = Ce(() => {
    const c = B(e.to);
    return t.resolve(c);
  }), r = Ce(() => {
    const { matched: c } = s.value, { length: u } = c, a = c[u - 1], f = n.matched;
    if (!a || !f.length) return -1;
    const m = f.findIndex(dn.bind(null, a));
    if (m > -1) return m;
    const _ = Xo(c[u - 2]);
    return u > 1 && Xo(a) === _ && f[f.length - 1].path !== _ ? f.findIndex(dn.bind(null, c[u - 2])) : m;
  }), o = Ce(() => r.value > -1 && gd(n.params, s.value.params)), i = Ce(() => r.value > -1 && r.value === n.matched.length - 1 && ql(n.params, s.value.params));
  function l(c = {}) {
    if (md(c)) {
      const u = t[B(e.replace) ? "replace" : "push"](B(e.to)).catch(Mn);
      return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => u), u;
    }
    return Promise.resolve();
  }
  return {
    route: s,
    href: Ce(() => s.value.href),
    isActive: o,
    isExactActive: i,
    navigate: l
  };
}
function dd(e) {
  return e.length === 1 ? e[0] : e;
}
const pd = /* @__PURE__ */ Be({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink: Jo,
  setup(e, { slots: t }) {
    const n = Kn(Jo(e)), { options: s } = Ze(js), r = Ce(() => ({
      [Yo(e.activeClass, s.linkActiveClass, "router-link-active")]: n.isActive,
      [Yo(e.exactActiveClass, s.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const o = t.default && dd(t.default(n));
      return e.custom ? o : Ml("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        onClick: n.navigate,
        class: r.value
      }, o);
    };
  }
}), hd = pd;
function md(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function gd(e, t) {
  for (const n in t) {
    const s = t[n], r = e[n];
    if (typeof s == "string") {
      if (s !== r) return !1;
    } else if (!ut(r) || r.length !== s.length || s.some((o, i) => o.valueOf() !== r[i].valueOf())) return !1;
  }
  return !0;
}
function Xo(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const Yo = (e, t, n) => e ?? t ?? n, _d = /* @__PURE__ */ Be({
  name: "RouterView",
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t, slots: n }) {
    const s = Ze(Tr), r = Ce(() => e.route || s.value), o = Ze(Vo, 0), i = Ce(() => {
      let u = B(o);
      const { matched: a } = r.value;
      let f;
      for (; (f = a[u]) && !f.components; ) u++;
      return u;
    }), l = Ce(() => r.value.matched[i.value]);
    Tn(Vo, Ce(() => i.value + 1)), Tn(Kf, l), Tn(Tr, r);
    const c = pe();
    return yt(() => [
      c.value,
      l.value,
      e.name
    ], ([u, a, f], [m, _, b]) => {
      a && (a.instances[f] = u, _ && _ !== a && u && u === m && (a.leaveGuards.size || (a.leaveGuards = _.leaveGuards), a.updateGuards.size || (a.updateGuards = _.updateGuards))), u && a && (!_ || !dn(a, _) || !m) && (a.enterCallbacks[f] || []).forEach((v) => v(u));
    }, { flush: "post" }), () => {
      const u = r.value, a = e.name, f = l.value, m = f && f.components[a];
      if (!m) return Qo(n.default, {
        Component: m,
        route: u
      });
      const _ = f.props[a], b = _ ? _ === !0 ? u.params : typeof _ == "function" ? _(u) : _ : null, y = Ml(m, oe({}, b, t, {
        onVnodeUnmounted: (T) => {
          T.component.isUnmounted && (f.instances[a] = null);
        },
        ref: c
      }));
      return Qo(n.default, {
        Component: y,
        route: u
      }) || y;
    };
  }
});
function Qo(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const bd = _d;
function yd(e) {
  const t = ld(e.routes, e), n = e.parseQuery || $f, s = e.stringifyQuery || Ho, r = e.history, o = wn(), i = wn(), l = wn(), c = ia(Mt);
  let u = Mt;
  sn && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const a = or.bind(null, (O) => "" + O), f = or.bind(null, Cf), m = or.bind(null, Gn);
  function _(O, F) {
    let L, j;
    return zl(O) ? (L = t.getRecordMatcher(O), j = F) : j = O, t.addRoute(j, L);
  }
  function b(O) {
    const F = t.getRecordMatcher(O);
    F && t.removeRoute(F);
  }
  function v() {
    return t.getRoutes().map((O) => O.record);
  }
  function y(O) {
    return !!t.getRecordMatcher(O);
  }
  function T(O, F) {
    if (F = oe({}, F || c.value), typeof O == "string") {
      const p = ir(n, O, F.path), g = t.resolve({ path: p.path }, F), E = r.createHref(p.fullPath);
      return oe(p, g, {
        params: m(g.params),
        hash: Gn(p.hash),
        redirectedFrom: void 0,
        href: E
      });
    }
    let L;
    if (O.path != null)
      L = oe({}, O, { path: ir(n, O.path, F.path).path });
    else {
      const p = oe({}, O.params);
      for (const g in p) p[g] == null && delete p[g];
      L = oe({}, O, { params: f(p) }), F.params = f(F.params);
    }
    const j = t.resolve(L, F), te = O.hash || "";
    j.params = a(m(j.params));
    const d = Tf(s, oe({}, O, {
      hash: Sf(te),
      path: j.path
    })), h = r.createHref(d);
    return oe({
      fullPath: d,
      hash: te,
      query: s === Ho ? Gf(O.query) : O.query || {}
    }, j, {
      redirectedFrom: void 0,
      href: h
    });
  }
  function w(O) {
    return typeof O == "string" ? ir(n, O, c.value.path) : oe({}, O);
  }
  function C(O, F) {
    if (u !== O) return pn(be.NAVIGATION_CANCELLED, {
      from: F,
      to: O
    });
  }
  function R(O) {
    return D(O);
  }
  function M(O) {
    return R(oe(w(O), { replace: !0 }));
  }
  function k(O, F) {
    const L = O.matched[O.matched.length - 1];
    if (L && L.redirect) {
      const { redirect: j } = L;
      let te = typeof j == "function" ? j(O, F) : j;
      return typeof te == "string" && (te = te.includes("?") || te.includes("#") ? te = w(te) : { path: te }, te.params = {}), oe({
        query: O.query,
        hash: O.hash,
        params: te.path != null ? {} : O.params
      }, te);
    }
  }
  function D(O, F) {
    const L = u = T(O), j = c.value, te = O.state, d = O.force, h = O.replace === !0, p = k(L, j);
    if (p) return D(oe(w(p), {
      state: typeof p == "object" ? oe({}, te, p.state) : te,
      force: d,
      replace: h
    }), F || L);
    const g = L;
    g.redirectedFrom = F;
    let E;
    return !d && Pf(s, j, L) && (E = pn(be.NAVIGATION_DUPLICATED, {
      to: g,
      from: j
    }), ye(j, j, !0, !1)), (E ? Promise.resolve(E) : ce(g, j)).catch((A) => At(A) ? At(A, be.NAVIGATION_GUARD_REDIRECT) ? A : et(A) : Y(A, g, j)).then((A) => {
      if (A) {
        if (At(A, be.NAVIGATION_GUARD_REDIRECT))
          return D(oe({ replace: h }, w(A.to), {
            state: typeof A.to == "object" ? oe({}, te, A.to.state) : te,
            force: d
          }), F || g);
      } else A = Se(g, j, !0, h, te);
      return ge(g, j, A), A;
    });
  }
  function G(O, F) {
    const L = C(O, F);
    return L ? Promise.reject(L) : Promise.resolve();
  }
  function J(O) {
    const F = ze.values().next().value;
    return F && typeof F.runWithContext == "function" ? F.runWithContext(O) : O();
  }
  function ce(O, F) {
    let L;
    const [j, te, d] = Wf(O, F);
    L = cr(j.reverse(), "beforeRouteLeave", O, F);
    for (const p of j) p.leaveGuards.forEach((g) => {
      L.push(jt(g, O, F));
    });
    const h = G.bind(null, O, F);
    return L.push(h), He(L).then(() => {
      L = [];
      for (const p of o.list()) L.push(jt(p, O, F));
      return L.push(h), He(L);
    }).then(() => {
      L = cr(te, "beforeRouteUpdate", O, F);
      for (const p of te) p.updateGuards.forEach((g) => {
        L.push(jt(g, O, F));
      });
      return L.push(h), He(L);
    }).then(() => {
      L = [];
      for (const p of d) if (p.beforeEnter) if (ut(p.beforeEnter)) for (const g of p.beforeEnter) L.push(jt(g, O, F));
      else L.push(jt(p.beforeEnter, O, F));
      return L.push(h), He(L);
    }).then(() => (O.matched.forEach((p) => p.enterCallbacks = {}), L = cr(d, "beforeRouteEnter", O, F, J), L.push(h), He(L))).then(() => {
      L = [];
      for (const p of i.list()) L.push(jt(p, O, F));
      return L.push(h), He(L);
    }).catch((p) => At(p, be.NAVIGATION_CANCELLED) ? p : Promise.reject(p));
  }
  function ge(O, F, L) {
    l.list().forEach((j) => J(() => j(O, F, L)));
  }
  function Se(O, F, L, j, te) {
    const d = C(O, F);
    if (d) return d;
    const h = F === Mt, p = sn ? history.state : {};
    L && (j || h ? r.replace(O.fullPath, oe({ scroll: h && p && p.scroll }, te)) : r.push(O.fullPath, te)), c.value = O, ye(O, F, L, h), et();
  }
  let _e;
  function Te() {
    _e || (_e = r.listen((O, F, L) => {
      if (!nt.listening) return;
      const j = T(O), te = k(j, nt.currentRoute.value);
      if (te) {
        D(oe(te, {
          replace: !0,
          force: !0
        }), j).catch(Mn);
        return;
      }
      u = j;
      const d = c.value;
      sn && kf(jo(d.fullPath, L.delta), Bs()), ce(j, d).catch((h) => At(h, be.NAVIGATION_ABORTED | be.NAVIGATION_CANCELLED) ? h : At(h, be.NAVIGATION_GUARD_REDIRECT) ? (D(oe(w(h.to), { force: !0 }), j).then((p) => {
        At(p, be.NAVIGATION_ABORTED | be.NAVIGATION_DUPLICATED) && !L.delta && L.type === Or.pop && r.go(-1, !1);
      }).catch(Mn), Promise.reject()) : (L.delta && r.go(-L.delta, !1), Y(h, j, d))).then((h) => {
        h = h || Se(j, d, !1), h && (L.delta && !At(h, be.NAVIGATION_CANCELLED) ? r.go(-L.delta, !1) : L.type === Or.pop && At(h, be.NAVIGATION_ABORTED | be.NAVIGATION_DUPLICATED) && r.go(-1, !1)), ge(j, d, h);
      }).catch(Mn);
    }));
  }
  let qe = wn(), Z = wn(), $;
  function Y(O, F, L) {
    et(O);
    const j = Z.list();
    return j.length ? j.forEach((te) => te(O, F, L)) : console.error(O), Promise.reject(O);
  }
  function je() {
    return $ && c.value !== Mt ? Promise.resolve() : new Promise((O, F) => {
      qe.add([O, F]);
    });
  }
  function et(O) {
    return $ || ($ = !O, Te(), qe.list().forEach(([F, L]) => O ? L(O) : F()), qe.reset()), O;
  }
  function ye(O, F, L, j) {
    const { scrollBehavior: te } = e;
    if (!sn || !te) return Promise.resolve();
    const d = !L && Bf(jo(O.fullPath, 0)) || (j || !L) && history.state && history.state.scroll || null;
    return Vr().then(() => te(O, F, d)).then((h) => h && Ff(h)).catch((h) => Y(h, O, F));
  }
  const ue = (O) => r.go(O);
  let tt;
  const ze = /* @__PURE__ */ new Set(), nt = {
    currentRoute: c,
    listening: !0,
    addRoute: _,
    removeRoute: b,
    clearRoutes: t.clearRoutes,
    hasRoute: y,
    getRoutes: v,
    resolve: T,
    options: e,
    push: R,
    replace: M,
    go: ue,
    back: () => ue(-1),
    forward: () => ue(1),
    beforeEach: o.add,
    beforeResolve: i.add,
    afterEach: l.add,
    onError: Z.add,
    isReady: je,
    install(O) {
      O.component("RouterLink", hd), O.component("RouterView", bd), O.config.globalProperties.$router = nt, Object.defineProperty(O.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => B(c)
      }), sn && !tt && c.value === Mt && (tt = !0, R(r.location).catch((j) => {
      }));
      const F = {};
      for (const j in Mt) Object.defineProperty(F, j, {
        get: () => c.value[j],
        enumerable: !0
      });
      O.provide(js, nt), O.provide(Yr, zi(F)), O.provide(Tr, c);
      const L = O.unmount;
      ze.add(O), O.unmount = function() {
        ze.delete(O), ze.size < 1 && (u = Mt, _e && _e(), _e = null, c.value = Mt, tt = !1, $ = !1), L();
      };
    }
  };
  function He(O) {
    return O.reduce((F, L) => F.then(() => J(L)), Promise.resolve());
  }
  return nt;
}
function vd() {
  return Ze(js);
}
function Zl(e) {
  return Ze(Yr);
}
const ec = /* @__PURE__ */ af("counter", () => {
  const e = pe("");
  return {
    currentPath: e,
    setPath: (n) => {
      e.value = n;
    }
  };
}), Ed = { class: "side" }, wd = { class: "side-content-title" }, Sd = ["onClick"], Ad = /* @__PURE__ */ Be({
  __name: "Side",
  props: {
    catalogList: {},
    current: {}
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = Wn(n).catalogList, o = (i, l) => {
      s("change", { type: i, child: l });
    };
    return (i, l) => (K(), re("div", Ed, [
      (K(!0), re(Ae, null, jn(B(r), (c) => (K(), re("div", {
        key: c.id,
        class: "side-content"
      }, [
        Q("p", wd, it(c.name), 1),
        (K(!0), re(Ae, null, jn(c.children, (u) => (K(), re("div", {
          key: u.mid,
          class: $t({
            "side-content-cell": !0,
            "side-content-cell-active": e.current === u.mid
          }),
          onClick: (a) => o(c.type, u)
        }, it(u.name), 11, Sd))), 128))
      ]))), 128))
    ]));
  }
}), Ct = /* @__PURE__ */ Be({
  __name: "Button",
  props: {
    label: {
      type: String,
      default: "提交"
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return (t, n) => (K(), re("button", {
      class: $t([
        "meme-button",
        {
          disabled: e.disabled
        }
      ])
    }, [
      Kr(t.$slots, "default", {}, () => [
        zr(it(e.label), 1)
      ])
    ], 2));
  }
}), Rd = /* @__PURE__ */ Be({
  name: "Input",
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue", "blur"],
  setup(e, { emit: t }) {
    const n = pe(null), s = (o) => {
      t("update:modelValue", o.target.value);
    };
    return {
      input: n,
      blur: (o) => {
        s(o), t("blur");
      }
    };
  }
}), Cd = ["value"];
function Od(e, t, n, s, r, o) {
  return K(), re("input", {
    ref: "input",
    class: $t([
      "meme-input",
      {
        disabled: e.disabled
      }
    ]),
    name: "input",
    value: e.modelValue,
    onBlur: t[0] || (t[0] = (...i) => e.blur && e.blur(...i)),
    onKeyup: t[1] || (t[1] = Xu((i) => e.input?.blur(), ["enter"]))
  }, null, 42, Cd);
}
const st = /* @__PURE__ */ ks(Rd, [["render", Od]]), xd = { class: "meme-file-upload" }, Td = { class: "file-button" }, Pd = {
  key: 0,
  class: "file-preview"
}, Nd = ["src", "alt"], Id = { class: "file-preview-info" }, Dd = { class: "file-preview-name" }, Md = { class: "file-preview-size" }, Ld = {
  key: 1,
  class: "file-tips"
}, Ud = 1 * 1024 * 1024, Fd = /* @__PURE__ */ Be({
  __name: "FileUpload",
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = Ze("commands"), s = t, r = pe(""), o = pe(null), i = (v) => {
      const y = v.target.files;
      if (!y)
        return !1;
      m(y);
    }, l = (v) => {
      v.stopPropagation(), v.preventDefault();
    }, c = (v) => {
      v.stopPropagation(), v.preventDefault();
    }, u = (v) => {
      v.stopPropagation(), v.preventDefault();
      const y = v.dataTransfer.files;
      m(y);
    }, a = (v) => {
      v.stopPropagation(), v.preventDefault();
      const y = v.clipboardData.files;
      m(y);
    }, f = /^image\//, m = (v) => {
      if (v.length !== 1)
        return _("不支持多个文件同时操作，请仅选择单个文件"), !1;
      const y = v[0];
      if (!y)
        return _("请选择文件"), !1;
      const { name: T, size: w, type: C } = y;
      if (!f.test(C))
        return _(`当前文件类型为${C}，类型不符，请选择图片类型！`), !1;
      const R = T.replace(/\.\w*$/g, "");
      if (n.value.includes(R))
        return _(`当前文件名称【${T}】与系统默认关键指令【${R}】冲突，请重命名上传文件！`), !1;
      if (w > Ud)
        return _("文件超过最大限制1M，请重新选择"), !1;
      const M = new FileReader();
      M.onload = (k) => {
        const D = k.target.result;
        b(T, D);
      }, M.onerror = () => {
        _(M.error.message);
      }, M.readAsDataURL(y);
    }, _ = (v) => {
      alert(v);
    }, b = (v, y) => {
      r.value = y;
      const T = new Image();
      T.onload = () => {
        const w = v.slice(v.lastIndexOf(".") + 1), C = v.slice(0, v.lastIndexOf(".")) || v;
        o.value = {
          name: C,
          ext: w,
          width: T.naturalWidth,
          height: T.naturalHeight
        };
      }, T.src = y, s("change", {
        name: v,
        base64: y
      });
    };
    return (v, y) => (K(), re("div", xd, [
      Q("div", Td, [
        y[0] || (y[0] = Q("i", { class: "file-glyphicon" }, null, -1)),
        y[1] || (y[1] = Q("span", null, "UPLOAD FILE", -1)),
        Q("input", {
          class: "file-input",
          type: "file",
          name: "file",
          accept: "image/*",
          title: "",
          onChange: i
        }, null, 32)
      ]),
      Q("div", {
        class: "file-area",
        draggable: !0,
        contenteditable: !0,
        onDragenter: l,
        onDragover: c,
        onDrop: u,
        onPaste: a
      }, [
        r.value && o.value ? (K(), re("div", Pd, [
          Q("img", {
            src: r.value,
            alt: o.value.name,
            class: "file-preview-image"
          }, null, 8, Nd),
          Q("div", Id, [
            Q("div", Dd, it(o.value.name) + "." + it(o.value.ext), 1),
            Q("div", Md, it(o.value.width) + " × " + it(o.value.height), 1)
          ])
        ])) : (K(), re("i", Ld, "Drop files here to upload"))
      ], 32)
    ]));
  }
}), kd = ["value", "selected"], ls = /* @__PURE__ */ Be({
  __name: "Select",
  props: {
    options: {},
    selected: {}
  },
  emits: ["change", "update:model-value"],
  setup(e, { emit: t }) {
    const n = t, s = (r) => {
      const o = r.target.value;
      r.target.blur(), n("update:model-value", o), n("change", o);
    };
    return (r, o) => (K(), re("select", {
      class: "meme-select",
      name: "select",
      onChange: s
    }, [
      (K(!0), re(Ae, null, jn(e.options, (i) => (K(), re("option", {
        key: i.value,
        class: "meme-option",
        value: i.value,
        selected: e.selected === i.value
      }, it(i.label), 9, kd))), 128))
    ], 32));
  }
}), Bd = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 32 32"
}, jd = ["fill"], Zo = /* @__PURE__ */ Be({
  __name: "DiceButton",
  props: {
    color: {
      type: String,
      default: "#FF0000"
    }
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = Ce(() => ["transparent", "#FFFFFF"].includes(n.color) ? "gray" : n.color), o = () => {
      s("click");
    };
    return (i, l) => (K(), Ue(B(Ct), {
      class: "dice-button",
      u: "icon",
      onClick: o
    }, {
      default: Bn(() => [
        (K(), re("svg", Bd, [
          l[0] || (l[0] = Q("title", null, "dice", -1)),
          Q("path", {
            fill: r.value,
            d: "M27 6h-16c-2.75 0-5 2.25-5 5v16c0 2.75 2.25 5 5 5h16c2.75 0 5-2.25 5-5v-16c0-2.75-2.25-5-5-5zM13 28c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM13 16c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM19 22c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25 28c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25 16c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25.899 4c-0.467-2.275-2.491-4-4.899-4h-16c-2.75 0-5 2.25-5 5v16c0 2.408 1.725 4.432 4 4.899v-19.899c0-1.1 0.9-2 2-2h19.899z"
          }, null, 8, jd)
        ]))
      ]),
      _: 1
    }));
  }
}), Hd = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 32 32"
}, Vd = ["fill"], $d = /* @__PURE__ */ Be({
  __name: "PickerButton",
  props: {
    color: {
      type: String,
      default: "#FF0000"
    }
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = Ce(() => ["transparent", "#FFFFFF"].includes(n.color) ? "gray" : n.color), o = () => {
      s("click");
    };
    return (i, l) => (K(), Ue(B(Ct), {
      class: "picker-button",
      u: "icon",
      onClick: o
    }, {
      default: Bn(() => [
        (K(), re("svg", Hd, [
          l[0] || (l[0] = Q("title", null, "picker", -1)),
          Q("path", {
            fill: r.value,
            d: "M30.828 1.172c-1.562-1.562-4.095-1.562-5.657 0l-5.379 5.379-3.793-3.793-4.243 4.243 3.326 3.326-14.754 14.754c-0.252 0.252-0.358 0.592-0.322 0.921h-0.008v5c0 0.552 0.448 1 1 1h5c0 0 0.083 0 0.125 0 0.288 0 0.576-0.11 0.795-0.329l14.754-14.754 3.326 3.326 4.243-4.243-3.793-3.793 5.379-5.379c1.562-1.562 1.562-4.095 0-5.657zM5.409 30h-3.409v-3.409l14.674-14.674 3.409 3.409-14.674 14.674z"
          }, null, 8, Vd)
        ]))
      ]),
      _: 1
    }));
  }
}), Gd = { class: "property text-property" }, Kd = /* @__PURE__ */ Be({
  __name: "TextProperty",
  props: {
    eid: {},
    content: {},
    x: {},
    y: {},
    max: {},
    size: {},
    font: {},
    color: {},
    align: {},
    direction: {},
    blur: {},
    degree: {},
    stroke: {},
    swidth: {}
  },
  emits: ["change", "pick"],
  setup(e, { emit: t }) {
    const n = e, s = t, { max: r, size: o, font: i, color: l, align: c, direction: u, blur: a, degree: f, stroke: m, swidth: _, content: b } = Wn(n), v = [
      { label: "Sans Serif", value: "sans-serif" },
      { label: "Serif", value: "serif" },
      { label: "Monospace", value: "monospace" },
      { label: "Cursive", value: "cursive" },
      { label: "Fantasy", value: "fantasy" }
    ], y = [
      { label: "Start", value: "start" },
      { label: "Center", value: "center" },
      { label: "End", value: "end" }
    ], T = [
      { label: "Up", value: "up" },
      { label: "Center", value: "center" },
      { label: "Down", value: "down" }
    ], w = (M, k) => {
      const D = {
        eid: n.eid,
        max: r.value,
        size: o.value,
        font: i.value,
        color: l.value,
        align: c.value,
        direction: u.value,
        blur: a.value,
        degree: f.value,
        stroke: m.value,
        swidth: _.value,
        content: b.value
      }, G = ["color", "align", "direction", "stroke", "font", "content"].includes(k);
      D[k] = G ? M : parseInt(M), s("change", D);
    }, C = (M) => {
      const k = "#" + Math.floor(Math.random() * 16777215).toString(16);
      w(k, M);
    }, R = () => {
      s("pick");
    };
    return (M, k) => (K(), re("div", Gd, [
      Kr(M.$slots, "default"),
      ee(B(st), {
        class: "property-content",
        title: "content",
        placeholder: "附加文本",
        value: B(b),
        "onUpdate:modelValue": k[0] || (k[0] = (D) => w(D, "content"))
      }, null, 8, ["value"]),
      ee(B(st), {
        class: "property-max",
        title: "max",
        value: B(r),
        "onUpdate:modelValue": k[1] || (k[1] = (D) => w(D, "max"))
      }, null, 8, ["value"]),
      ee(B(st), {
        class: "property-size",
        title: "size",
        value: B(o),
        "onUpdate:modelValue": k[2] || (k[2] = (D) => w(D, "size"))
      }, null, 8, ["value"]),
      ee(B(ls), {
        class: "property-font",
        options: v,
        selected: B(i),
        "onUpdate:modelValue": k[3] || (k[3] = (D) => w(D, "font"))
      }, null, 8, ["selected"]),
      ee(B(st), {
        class: "property-color",
        title: "color",
        value: B(l),
        "onUpdate:modelValue": k[4] || (k[4] = (D) => w(D, "color"))
      }, null, 8, ["value"]),
      ee(Zo, {
        color: B(l),
        onClick: k[5] || (k[5] = (D) => C("color"))
      }, null, 8, ["color"]),
      ee($d, {
        color: B(l),
        onClick: R
      }, null, 8, ["color"]),
      ee(B(st), {
        class: "property-color",
        title: "stroke",
        value: B(m),
        "onUpdate:modelValue": k[6] || (k[6] = (D) => w(D, "stroke"))
      }, null, 8, ["value"]),
      ee(Zo, {
        color: B(m),
        onClick: k[7] || (k[7] = (D) => C("stroke"))
      }, null, 8, ["color"]),
      ee(B(st), {
        class: "property-swidth",
        value: B(_),
        title: "swidth",
        "onUpdate:modelValue": k[8] || (k[8] = (D) => w(D, "swidth"))
      }, null, 8, ["value"]),
      ee(B(ls), {
        class: "property-align",
        options: y,
        selected: B(c),
        "onUpdate:modelValue": k[9] || (k[9] = (D) => w(D, "align"))
      }, null, 8, ["selected"]),
      ee(B(ls), {
        class: "property-direction",
        options: T,
        selected: B(u),
        "onUpdate:modelValue": k[10] || (k[10] = (D) => w(D, "direction"))
      }, null, 8, ["selected"]),
      ee(B(st), {
        class: "property-degree",
        title: "degree",
        value: B(f),
        "onUpdate:modelValue": k[11] || (k[11] = (D) => w(D, "degree"))
      }, null, 8, ["value"])
    ]));
  }
}), Wd = { class: "property image-property" }, qd = /* @__PURE__ */ Be({
  __name: "ImageProperty",
  props: {
    eid: {},
    x: {},
    y: {},
    width: {},
    height: {},
    ipath: {}
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = [
      { label: "SVG", value: "SVG" },
      { label: "IMAGE", value: "IMAGE" },
      { label: "DB", value: "DB" }
    ], { width: o, height: i, ipath: l } = Wn(n), c = (u, a) => {
      const f = {
        eid: n.eid,
        width: o.value,
        height: i.value,
        ipath: l.value
      };
      a === "ipath" ? f.ipath = u : a === "width" ? f.width = parseInt(u) : a === "height" && (f.height = parseInt(u)), s("change", f);
    };
    return (u, a) => (K(), re("div", Wd, [
      Kr(u.$slots, "default"),
      ee(B(st), {
        class: "property-size",
        value: B(o),
        "onUpdate:modelValue": a[0] || (a[0] = (f) => c(f, "width"))
      }, null, 8, ["value"]),
      ee(B(st), {
        class: "property-size",
        value: B(i),
        "onUpdate:modelValue": a[1] || (a[1] = (f) => c(f, "height"))
      }, null, 8, ["value"]),
      ee(B(ls), {
        class: "property-path",
        options: r,
        selected: B(l),
        "onUpdate:modelValue": a[2] || (a[2] = (f) => c(f, "ipath"))
      }, null, 8, ["selected"])
    ]));
  }
}), zd = ["onMousedown"], Jd = { class: "drag-overlay__tag" }, ns = 20, Xd = /* @__PURE__ */ Be({
  __name: "DragOverlay",
  props: {
    layers: {},
    bounds: {},
    disabled: { type: Boolean },
    offset: {}
  },
  emits: ["dragStart", "dragMove", "dragEnd"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = pe(null), o = pe({ x: 0, y: 0 }), i = pe({ x: 0, y: 0 }), l = pe({ x: 0, y: 0 }), c = Ce(() => ({
      top: n.offset?.top ?? 10,
      left: n.offset?.left ?? 10
    })), u = (y) => n.layers.find((T) => T.id === y), a = (y, T, w) => {
      const C = n.bounds.width - y.width + ns, R = n.bounds.height - y.height + ns;
      return {
        x: Math.max(Math.min(T, C), -ns),
        y: Math.max(Math.min(w, R), -ns)
      };
    }, f = (y) => {
      if (!r.value)
        return;
      const T = u(r.value);
      if (!T)
        return;
      const w = y.clientX - o.value.x, C = y.clientY - o.value.y, R = a(T, i.value.x + w, i.value.y + C);
      l.value = R, s("dragMove", {
        id: T.id,
        x: R.x,
        y: R.y
      });
    }, m = () => {
      window.removeEventListener("mousemove", f), window.removeEventListener("mouseup", _);
    }, _ = () => {
      r.value && (s("dragEnd", {
        id: r.value,
        x: l.value.x,
        y: l.value.y
      }), r.value = null, m());
    }, b = (y, T) => {
      n.disabled || (r.value = y.id, o.value = { x: T.clientX, y: T.clientY }, i.value = { x: y.x, y: y.y }, l.value = { x: y.x, y: y.y }, s("dragStart", {
        id: y.id,
        x: y.x,
        y: y.y
      }), window.addEventListener("mousemove", f), window.addEventListener("mouseup", _), T.preventDefault());
    };
    cl(() => {
      m();
    });
    const v = (y) => ({
      width: `${y.width}px`,
      height: `${y.height}px`,
      transform: `translate(${y.x}px, ${y.y}px)`
    });
    return (y, T) => (K(), re("div", {
      class: $t(["drag-overlay", {
        "drag-overlay--disabled": e.disabled
      }]),
      style: an({
        width: `${e.bounds.width}px`,
        height: `${e.bounds.height}px`,
        top: `${c.value.top}px`,
        left: `${c.value.left}px`
      })
    }, [
      (K(!0), re(Ae, null, jn(e.layers, (w) => (K(), re("div", {
        key: w.id,
        class: "drag-overlay__item",
        style: an(v(w)),
        onMousedown: (C) => b(w, C)
      }, [
        Q("span", Jd, it(w.type.toLowerCase()), 1)
      ], 44, zd))), 128))
    ], 6));
  }
}), Yd = /* @__PURE__ */ ks(Xd, [["__scopeId", "data-v-1bb2305a"]]), Ln = 1.2, ke = 11, rt = 14, ei = rt * ke, ti = rt * ke, ar = rt * ke, ni = rt, Qd = (() => {
  const e = [];
  for (let t = 1; t < ke; t++)
    e.push([t, 0, t, ke]), e.push([0, t, ke, t]);
  return e.map((t) => t.map((n) => n * rt));
})(), Zd = (e, t, n) => {
  let s = 0, r = e.length - 1;
  for (; s <= r; ) {
    const o = Math.floor((s + r) / 2), i = n.measureText(e.substring(0, o)).width, l = n.measureText(e.substring(0, o + 1)).width;
    if (i <= t && l > t)
      return o;
    i < t ? s = o + 1 : r = o - 1;
  }
  return -1;
}, tc = (e, t, n) => {
  const s = [];
  let r = 0;
  for (; (r = Zd(e, t, n)) !== -1; )
    s.push(e.substring(0, r)), e = e.substring(r);
  return e && s.push(e), s;
}, ep = (e, t, n) => {
  const { content: s, x: r, y: o, size: i, font: l, color: c, stroke: u, swidth: a, align: f, max: m, direction: _, blur: b = 0, degree: v = 0 } = n;
  e.font = `${i}px ${l}` || "32px sans-serif", e.fillStyle = c || "#000000", b && (e.filter = `blur(${b}px)`), e.textAlign = f || "center", e.strokeStyle = u, e.lineWidth = a;
  const y = m || t, T = tc(s || "金馆长", y, e);
  T.forEach((w, C) => {
    let R = 0;
    _ === "down" ? R = C : _ === "center" ? R = C - (T.length - 1) / 2 : R = C - (T.length - 1), e.save(), v ? (e.translate(r, o + R * i * Ln), e.rotate(v * Math.PI / 180), e.strokeText(w, 0, 0, y), e.fillText(w, 0, 0, y)) : (e.strokeText(w, r, o + R * i * Ln, y), e.fillText(w, r, o + R * i * Ln, y)), e.restore();
  });
}, tp = (e) => {
  e.imageSmoothingEnabled = !1, e.lineCap = "round", e.beginPath(), e.strokeStyle = "#000000", e.arc(ke * rt / 2, ke * rt / 2, ke * rt / 2 - 1, 0, Math.PI * 2), e.stroke(), e.clip(), e.strokeStyle = "#D6D6D6", Qd.forEach((t) => {
    const { 0: n = 0, 1: s = 0, 2: r = 0, 3: o = 0 } = t;
    e.moveTo(n, s), e.lineTo(r, o);
  }), e.stroke(), e.beginPath(), e.strokeStyle = "#FF0000", e.rect((ke - 1) * rt / 2, (ke - 1) * rt / 2, 1 * rt, 1 * rt), e.stroke();
}, np = (e, t, n, s) => {
  t.style.left = `${n + ni}px`, t.style.top = `${s + ni}px`;
  const r = t.getContext("2d"), o = Math.min(Math.max(0, n - 5), e.width - ke), i = Math.min(Math.max(0, s - 5), e.height - ke);
  r.clearRect(0, 0, ei, ti), r.drawImage(e, o, i, ke, ke, 0, 0, ei, ti), tp(r);
}, sp = (e) => e.split(";base64,")[0]?.match(/[a-z]+$/g)?.[0] || "png", rp = (e, t, n) => {
  const r = `image/${["jpeg", "jpg"].includes(t) ? "jpeg" : "png"}`, o = e.toDataURL(r), i = document.createElement("a");
  i.setAttribute("download", n), i.setAttribute("href", o), i.setAttribute("target", "_blank"), i.click();
}, Ge = {
  TEXT: "TEXT",
  IMAGE: "IMAGE"
}, op = { class: "container" }, ip = { class: "container-header" }, lp = { class: "container-title" }, cp = {
  key: 0,
  class: "container-wall"
}, ap = { class: "container-wrapper" }, up = { class: "container-area" }, fp = ["width", "height"], dp = {
  key: 0,
  class: "property-actions"
}, pp = ["onClick"], hp = ["onClick"], mp = ["onClick"], gp = {
  key: 0,
  class: "property-actions"
}, _p = ["onClick"], bp = ["onClick"], yp = ["onClick"], vp = {
  key: 1,
  class: "container-footer"
}, Ep = /* @__PURE__ */ Be({
  __name: "Container",
  props: {
    story: {}
  },
  emits: ["change", "create", "create-layer", "delete-layer", "reorder-layer", "update-name"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = Wn(n).story, o = pe(null), i = pe(!1), l = pe(null), c = pe(!1), u = pe(!1), a = pe(null), f = pe(null), m = pe(!1), _ = pe("金馆长"), b = (p) => {
      _.value = p, k();
    }, v = pe(0), y = pe(0), T = (p) => {
      const g = r.value.children.find((E) => E.options.eid === p.eid);
      if (g) {
        if (g.type === Ge.TEXT && "content" in p)
          Object.assign(g.options, p);
        else if (g.type === Ge.IMAGE && "ipath" in p)
          Object.assign(g.options, p);
        else
          return;
        s("change", r.value);
      }
    }, w = Ce(() => sp(r.value.image)), C = Ce(() => `${r.value.name}.${w.value} ${v.value} * ${y.value}`), R = new Image(), M = () => {
      R.onload = async () => {
        const p = o.value;
        p.width = R.naturalWidth, p.height = R.naturalHeight, v.value = p.width, y.value = p.height, k();
      }, R.onerror = () => {
        console.error("图片加载失败");
      }, R.src = r.value.image;
    }, k = () => {
      const p = o.value, g = p.getContext("2d");
      g.drawImage(R, 0, 0), r.value.children.forEach(({ type: E, options: A }) => {
        E === Ge.TEXT ? ep(g, p.width, {
          ...A,
          content: _.value + A.content
        }) : Ge.IMAGE;
      });
    }, D = typeof document < "u" ? document.createElement("canvas").getContext("2d") : null, G = (p, g) => ({
      start: 0,
      center: Math.floor(g / 2),
      end: g
    })[p] ?? 0, J = (p, g) => {
      if (!g || !D)
        return p.size * Ln;
      D.font = p.font ? `${p.size}px ${p.font}` : `${p.size}px sans-serif`;
      const E = tc(p.content || "", g, D);
      return Math.max(E.length, 1) * p.size * Ln;
    }, ce = Ce(() => {
      const p = v.value, g = y.value;
      return !p || !g ? [] : r.value.children.map((E, A) => {
        if (E.type === Ge.TEXT) {
          const x = E.options, I = x.max || p, N = G(x.align || "start", I), P = J(x, I);
          return {
            id: x.eid || `text-${A}`,
            x: x.x - N,
            y: x.y - x.size + 2,
            width: I,
            height: P,
            alignOffset: N,
            size: x.size,
            type: E.type
          };
        }
        if (E.type === Ge.IMAGE) {
          const x = E.options;
          return {
            id: x.eid || `image-${A}`,
            x: x.x,
            y: x.y,
            width: x.width,
            height: x.height,
            alignOffset: 0,
            size: 0,
            type: E.type
          };
        }
        return null;
      }).filter((E) => !!E);
    }), ge = (p, g, E) => {
      const A = r.value.children.find((x, I) => {
        const N = x.options.eid;
        return N ? N === p : `${I}` === p;
      });
      if (A) {
        if (A.type === Ge.TEXT) {
          const x = A.options, I = x.max || v.value, N = G(x.align || "start", I);
          x.x = Math.round(g + N), x.y = Math.round(E + x.size - 2);
        } else if (A.type === Ge.IMAGE) {
          const x = A.options;
          x.x = Math.round(g), x.y = Math.round(E);
        }
      }
    }, Se = ({ id: p, x: g, y: E }) => {
      ge(p, g, E);
    }, _e = ({ id: p, x: g, y: E }) => {
      console.log(g, E), ge(p, g, E);
    }, Te = ({ id: p, x: g, y: E }) => {
      ge(p, g, E), s("change", r.value);
    };
    yt(() => r.value.mid, () => {
      M();
    }), yt(() => r.value.image, () => {
      M();
    }), yt(() => r.value.children, () => {
      k();
    }, { deep: !0 });
    const qe = () => {
      if (i.value)
        return;
      const p = o.value, g = `imeme_${r.value.name}_${_.value}`;
      rp(p, w.value, g);
    }, Z = () => {
      i.value = !0;
    }, $ = () => {
      i.value = !1, l.value = null;
    }, Y = () => {
      l.value && s("create", l.value, $);
    }, je = ({ name: p, base64: g }) => {
      l.value = {
        name: p.slice(0, p.lastIndexOf(".")) || p,
        image: g,
        layerType: Ge.TEXT
      };
    }, et = (p) => {
      f.value = p, c.value = !0;
    }, ye = () => {
      m.value = !m.value;
    }, ue = (p, g) => {
      !r.value.mid || !g || s("reorder-layer", { mid: r.value.mid, eid: g, direction: p });
    }, tt = (p, g) => {
      const E = o.value, A = a.value;
      np(E, A, p, g);
    }, ze = async (p) => {
      if (!c.value)
        return !1;
      const { offsetX: g, offsetY: E } = p;
      g < 0 || E < 0 || (u.value = !0, tt(g, E));
    }, nt = () => {
      if (!c.value)
        return !1;
      u.value = !1;
    }, He = (p) => {
      const g = (N) => N.toString(16).padStart(2, "0"), { 0: E = 0, 1: A = 0, 2: x = 0, 3: I = 0 } = p.data;
      return `#${g(E)}${g(A)}${g(x)}${g(I)}`.toUpperCase();
    }, O = (p, g) => {
      const x = o.value.getContext("2d").getImageData(p, g, 1, 1);
      return He(x);
    }, F = (p) => {
      if (!c.value)
        return !1;
      const { offsetX: g, offsetY: E } = p;
      if (g < 0 || E < 0)
        return;
      const A = O(g, E), x = r.value.children.find((I) => {
        if (I.type !== Ge.TEXT)
          return !1;
        const N = I.options.eid;
        return f.value ? N === f.value : !0;
      });
      x && (x.options.color = A, s("change", r.value)), u.value = !1, c.value = !1, f.value = null;
    }, L = (p) => {
      r.value.mid && s("create-layer", { mid: r.value.mid, type: p });
    }, j = (p) => {
      !r.value.mid || !p || s("delete-layer", { mid: r.value.mid, eid: p });
    }, te = Zl(), d = Ce(() => te.path.includes("/edit")), h = (p) => {
      p !== r.value.name && (r.value.name = p, s("update-name", r.value));
    };
    return Ds(() => {
      M();
    }), (p, g) => (K(), re("div", op, [
      Q("div", ip, [
        Q("div", lp, [
          d.value ? (K(), Ue(B(st), {
            key: 0,
            class: "container-title-label",
            value: B(r).name,
            "onUpdate:modelValue": g[0] || (g[0] = (E) => h(E))
          }, null, 8, ["value"])) : (K(), re(Ae, { key: 1 }, [
            zr(it(C.value), 1)
          ], 64))
        ]),
        i.value ? (K(), Ue(B(Ct), {
          key: 0,
          label: "保存新故事",
          u: "primary",
          onClick: Y
        })) : qt("", !0),
        i.value ? (K(), Ue(B(Ct), {
          key: 1,
          label: "取消新建",
          u: "primary",
          onClick: $
        })) : (K(), Ue(B(Ct), {
          key: 2,
          label: "新建故事",
          u: "primary",
          onClick: Z
        })),
        ee(B(Ct), {
          label: "下载",
          u: "primary",
          disabled: i.value,
          onClick: qe
        }, null, 8, ["disabled"])
      ]),
      i.value ? (K(), re("div", cp, [
        ee(B(Fd), { onChange: je })
      ])) : qt("", !0),
      ao(Q("div", ap, [
        Q("div", up, [
          Q("canvas", {
            ref_key: "canvasRef",
            ref: o,
            class: $t({
              "container-canvas": !0,
              "container-pointer": c.value
            }),
            onMousemove: ze,
            onMouseleave: nt,
            onClick: F
          }, null, 34),
          !c.value && v.value && y.value ? (K(), Ue(Yd, {
            key: 0,
            class: "container-overlay",
            layers: ce.value,
            bounds: { width: v.value, height: y.value },
            offset: { top: 10, left: 10 },
            onDragStart: Se,
            onDragMove: _e,
            onDragEnd: Te
          }, null, 8, ["layers", "bounds"])) : qt("", !0),
          ao(Q("canvas", {
            ref_key: "layerRef",
            ref: a,
            class: "container-layer",
            style: an({
              borderRadius: `${B(ar)}px`
            }),
            width: B(ar),
            height: B(ar)
          }, null, 12, fp), [
            [Ro, c.value && u.value]
          ])
        ]),
        (K(!0), re(Ae, null, jn(B(r).children, (E, A) => (K(), re(Ae, { key: A }, [
          E.type === B(Ge).IMAGE ? (K(), Ue(qd, Er({
            key: 0,
            ref_for: !0
          }, E.options, { onChange: T }), {
            default: Bn(() => [
              (K(), Ue(B(st), {
                class: "property-text",
                key: A,
                title: "text",
                value: _.value,
                "onUpdate:modelValue": b
              }, null, 8, ["value"])),
              m.value ? (K(), re("div", dp, [
                Q("button", {
                  class: "icon-button",
                  type: "button",
                  onClick: (x) => ue("up", E.options.eid),
                  title: "上移"
                }, [...g[3] || (g[3] = [
                  Q("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, [
                    Q("path", { d: "M12 5l6 6H6z" })
                  ], -1)
                ])], 8, pp),
                Q("button", {
                  class: "icon-button",
                  type: "button",
                  onClick: (x) => ue("down", E.options.eid),
                  title: "下移"
                }, [...g[4] || (g[4] = [
                  Q("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, [
                    Q("path", { d: "M12 19l-6-6h12z" })
                  ], -1)
                ])], 8, hp),
                Q("button", {
                  class: "icon-button danger",
                  type: "button",
                  onClick: (x) => j(E.options.eid),
                  title: "删除图层"
                }, [...g[5] || (g[5] = [
                  Q("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, [
                    Q("path", { d: "M16 9v9H8V9h8m-1.5-4h-5l-1 1H6v2h12V6h-2.5l-1-1z" })
                  ], -1)
                ])], 8, mp)
              ])) : qt("", !0)
            ]),
            _: 2
          }, 1040)) : (K(), Ue(Kd, Er({ key: A }, { ref_for: !0 }, E.options, {
            onChange: T,
            onPick: () => et(E.options.eid)
          }), {
            default: Bn(() => [
              ee(B(st), {
                class: "property-text",
                title: "text",
                value: _.value,
                "onUpdate:modelValue": b
              }, null, 8, ["value"]),
              m.value ? (K(), re("div", gp, [
                Q("button", {
                  class: "icon-button",
                  type: "button",
                  onClick: (x) => ue("up", E.options.eid),
                  title: "上移"
                }, [...g[6] || (g[6] = [
                  Q("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, [
                    Q("path", { d: "M12 5l6 6H6z" })
                  ], -1)
                ])], 8, _p),
                Q("button", {
                  class: "icon-button",
                  type: "button",
                  onClick: (x) => ue("down", E.options.eid),
                  title: "下移"
                }, [...g[7] || (g[7] = [
                  Q("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, [
                    Q("path", { d: "M12 19l-6-6h12z" })
                  ], -1)
                ])], 8, bp),
                Q("button", {
                  class: "icon-button danger",
                  type: "button",
                  onClick: (x) => j(E.options.eid),
                  title: "删除图层"
                }, [...g[8] || (g[8] = [
                  Q("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, [
                    Q("path", { d: "M16 9v9H8V9h8m-1.5-4h-5l-1 1H6v2h12V6h-2.5l-1-1z" })
                  ], -1)
                ])], 8, yp)
              ])) : qt("", !0)
            ]),
            _: 2
          }, 1040, ["onPick"]))
        ], 64))), 128))
      ], 512), [
        [Ro, !i.value]
      ]),
      i.value ? qt("", !0) : (K(), re("footer", vp, [
        ee(B(Ct), {
          class: "container-footer-label",
          label: "添加文本层",
          u: "primary",
          onClick: g[1] || (g[1] = () => L(B(Ge).TEXT))
        }),
        ee(B(Ct), {
          class: "container-footer-label",
          label: "添加图片层",
          u: "primary",
          onClick: g[2] || (g[2] = () => L(B(Ge).IMAGE))
        }),
        ee(B(Ct), {
          label: m.value ? "隐藏操作区" : "显示操作区",
          u: "primary",
          onClick: ye
        }, null, 8, ["label"])
      ]))
    ]));
  }
}), si = {
  getConfig: {
    url: "/image/config",
    method: "get"
  },
  getCatalog: {
    url: "/image/catalog",
    method: "get"
  },
  openImage: {
    url: "/image/open",
    method: "get"
  },
  createImage: {
    url: "/image/create",
    method: "post"
  },
  updateImage: {
    url: "/image/update",
    method: "post"
  },
  updateName: {
    url: "/image/update/name",
    method: "post"
  },
  getNamed: {
    url: "/image/named",
    method: "get"
  },
  createLayer: {
    url: "/image/layer/create",
    method: "post"
  },
  deleteLayer: {
    url: "/image/layer/delete",
    method: "post"
  },
  reorderLayer: {
    url: "/image/layer/reorder",
    method: "post"
  }
};
function nc(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: wp } = Object.prototype, { getPrototypeOf: Qr } = Object, { iterator: Hs, toStringTag: sc } = Symbol, Vs = /* @__PURE__ */ ((e) => (t) => {
  const n = wp.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), ft = (e) => (e = e.toLowerCase(), (t) => Vs(t) === e), $s = (e) => (t) => typeof t === e, { isArray: gn } = Array, hn = $s("undefined");
function zn(e) {
  return e !== null && !hn(e) && e.constructor !== null && !hn(e.constructor) && Ke(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const rc = ft("ArrayBuffer");
function Sp(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && rc(e.buffer), t;
}
const Ap = $s("string"), Ke = $s("function"), oc = $s("number"), Jn = (e) => e !== null && typeof e == "object", Rp = (e) => e === !0 || e === !1, cs = (e) => {
  if (Vs(e) !== "object")
    return !1;
  const t = Qr(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(sc in e) && !(Hs in e);
}, Cp = (e) => {
  if (!Jn(e) || zn(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, Op = ft("Date"), xp = ft("File"), Tp = ft("Blob"), Pp = ft("FileList"), Np = (e) => Jn(e) && Ke(e.pipe), Ip = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Ke(e.append) && ((t = Vs(e)) === "formdata" || // detect form-data instance
  t === "object" && Ke(e.toString) && e.toString() === "[object FormData]"));
}, Dp = ft("URLSearchParams"), [Mp, Lp, Up, Fp] = ["ReadableStream", "Request", "Response", "Headers"].map(ft), kp = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Xn(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let s, r;
  if (typeof e != "object" && (e = [e]), gn(e))
    for (s = 0, r = e.length; s < r; s++)
      t.call(null, e[s], s, e);
  else {
    if (zn(e))
      return;
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), i = o.length;
    let l;
    for (s = 0; s < i; s++)
      l = o[s], t.call(null, e[l], l, e);
  }
}
function ic(e, t) {
  if (zn(e))
    return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let s = n.length, r;
  for (; s-- > 0; )
    if (r = n[s], t === r.toLowerCase())
      return r;
  return null;
}
const Jt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, lc = (e) => !hn(e) && e !== Jt;
function Pr() {
  const { caseless: e, skipUndefined: t } = lc(this) && this || {}, n = {}, s = (r, o) => {
    const i = e && ic(n, o) || o;
    cs(n[i]) && cs(r) ? n[i] = Pr(n[i], r) : cs(r) ? n[i] = Pr({}, r) : gn(r) ? n[i] = r.slice() : (!t || !hn(r)) && (n[i] = r);
  };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && Xn(arguments[r], s);
  return n;
}
const Bp = (e, t, n, { allOwnKeys: s } = {}) => (Xn(t, (r, o) => {
  n && Ke(r) ? e[o] = nc(r, n) : e[o] = r;
}, { allOwnKeys: s }), e), jp = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Hp = (e, t, n, s) => {
  e.prototype = Object.create(t.prototype, s), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, Vp = (e, t, n, s) => {
  let r, o, i;
  const l = {};
  if (t = t || {}, e == null) return t;
  do {
    for (r = Object.getOwnPropertyNames(e), o = r.length; o-- > 0; )
      i = r[o], (!s || s(i, e, t)) && !l[i] && (t[i] = e[i], l[i] = !0);
    e = n !== !1 && Qr(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, $p = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const s = e.indexOf(t, n);
  return s !== -1 && s === n;
}, Gp = (e) => {
  if (!e) return null;
  if (gn(e)) return e;
  let t = e.length;
  if (!oc(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, Kp = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Qr(Uint8Array)), Wp = (e, t) => {
  const s = (e && e[Hs]).call(e);
  let r;
  for (; (r = s.next()) && !r.done; ) {
    const o = r.value;
    t.call(e, o[0], o[1]);
  }
}, qp = (e, t) => {
  let n;
  const s = [];
  for (; (n = e.exec(t)) !== null; )
    s.push(n);
  return s;
}, zp = ft("HTMLFormElement"), Jp = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, s, r) {
    return s.toUpperCase() + r;
  }
), ri = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Xp = ft("RegExp"), cc = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), s = {};
  Xn(n, (r, o) => {
    let i;
    (i = t(r, o, e)) !== !1 && (s[o] = i || r);
  }), Object.defineProperties(e, s);
}, Yp = (e) => {
  cc(e, (t, n) => {
    if (Ke(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const s = e[n];
    if (Ke(s)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, Qp = (e, t) => {
  const n = {}, s = (r) => {
    r.forEach((o) => {
      n[o] = !0;
    });
  };
  return gn(e) ? s(e) : s(String(e).split(t)), n;
}, Zp = () => {
}, eh = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function th(e) {
  return !!(e && Ke(e.append) && e[sc] === "FormData" && e[Hs]);
}
const nh = (e) => {
  const t = new Array(10), n = (s, r) => {
    if (Jn(s)) {
      if (t.indexOf(s) >= 0)
        return;
      if (zn(s))
        return s;
      if (!("toJSON" in s)) {
        t[r] = s;
        const o = gn(s) ? [] : {};
        return Xn(s, (i, l) => {
          const c = n(i, r + 1);
          !hn(c) && (o[l] = c);
        }), t[r] = void 0, o;
      }
    }
    return s;
  };
  return n(e, 0);
}, sh = ft("AsyncFunction"), rh = (e) => e && (Jn(e) || Ke(e)) && Ke(e.then) && Ke(e.catch), ac = ((e, t) => e ? setImmediate : t ? ((n, s) => (Jt.addEventListener("message", ({ source: r, data: o }) => {
  r === Jt && o === n && s.length && s.shift()();
}, !1), (r) => {
  s.push(r), Jt.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  Ke(Jt.postMessage)
), oh = typeof queueMicrotask < "u" ? queueMicrotask.bind(Jt) : typeof process < "u" && process.nextTick || ac, ih = (e) => e != null && Ke(e[Hs]), S = {
  isArray: gn,
  isArrayBuffer: rc,
  isBuffer: zn,
  isFormData: Ip,
  isArrayBufferView: Sp,
  isString: Ap,
  isNumber: oc,
  isBoolean: Rp,
  isObject: Jn,
  isPlainObject: cs,
  isEmptyObject: Cp,
  isReadableStream: Mp,
  isRequest: Lp,
  isResponse: Up,
  isHeaders: Fp,
  isUndefined: hn,
  isDate: Op,
  isFile: xp,
  isBlob: Tp,
  isRegExp: Xp,
  isFunction: Ke,
  isStream: Np,
  isURLSearchParams: Dp,
  isTypedArray: Kp,
  isFileList: Pp,
  forEach: Xn,
  merge: Pr,
  extend: Bp,
  trim: kp,
  stripBOM: jp,
  inherits: Hp,
  toFlatObject: Vp,
  kindOf: Vs,
  kindOfTest: ft,
  endsWith: $p,
  toArray: Gp,
  forEachEntry: Wp,
  matchAll: qp,
  isHTMLForm: zp,
  hasOwnProperty: ri,
  hasOwnProp: ri,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: cc,
  freezeMethods: Yp,
  toObjectSet: Qp,
  toCamelCase: Jp,
  noop: Zp,
  toFiniteNumber: eh,
  findKey: ic,
  global: Jt,
  isContextDefined: lc,
  isSpecCompliantForm: th,
  toJSONObject: nh,
  isAsyncFn: sh,
  isThenable: rh,
  setImmediate: ac,
  asap: oh,
  isIterable: ih
};
function X(e, t, n, s, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), s && (this.request = s), r && (this.response = r, this.status = r.status ? r.status : null);
}
S.inherits(X, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: S.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const uc = X.prototype, fc = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  fc[e] = { value: e };
});
Object.defineProperties(X, fc);
Object.defineProperty(uc, "isAxiosError", { value: !0 });
X.from = (e, t, n, s, r, o) => {
  const i = Object.create(uc);
  S.toFlatObject(e, i, function(a) {
    return a !== Error.prototype;
  }, (u) => u !== "isAxiosError");
  const l = e && e.message ? e.message : "Error", c = t == null && e ? e.code : t;
  return X.call(i, l, c, n, s, r), e && i.cause == null && Object.defineProperty(i, "cause", { value: e, configurable: !0 }), i.name = e && e.name || "Error", o && Object.assign(i, o), i;
};
const lh = null;
function Nr(e) {
  return S.isPlainObject(e) || S.isArray(e);
}
function dc(e) {
  return S.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function oi(e, t, n) {
  return e ? e.concat(t).map(function(r, o) {
    return r = dc(r), !n && o ? "[" + r + "]" : r;
  }).join(n ? "." : "") : t;
}
function ch(e) {
  return S.isArray(e) && !e.some(Nr);
}
const ah = S.toFlatObject(S, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Gs(e, t, n) {
  if (!S.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = S.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(v, y) {
    return !S.isUndefined(y[v]);
  });
  const s = n.metaTokens, r = n.visitor || a, o = n.dots, i = n.indexes, c = (n.Blob || typeof Blob < "u" && Blob) && S.isSpecCompliantForm(t);
  if (!S.isFunction(r))
    throw new TypeError("visitor must be a function");
  function u(b) {
    if (b === null) return "";
    if (S.isDate(b))
      return b.toISOString();
    if (S.isBoolean(b))
      return b.toString();
    if (!c && S.isBlob(b))
      throw new X("Blob is not supported. Use a Buffer instead.");
    return S.isArrayBuffer(b) || S.isTypedArray(b) ? c && typeof Blob == "function" ? new Blob([b]) : Buffer.from(b) : b;
  }
  function a(b, v, y) {
    let T = b;
    if (b && !y && typeof b == "object") {
      if (S.endsWith(v, "{}"))
        v = s ? v : v.slice(0, -2), b = JSON.stringify(b);
      else if (S.isArray(b) && ch(b) || (S.isFileList(b) || S.endsWith(v, "[]")) && (T = S.toArray(b)))
        return v = dc(v), T.forEach(function(C, R) {
          !(S.isUndefined(C) || C === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? oi([v], R, o) : i === null ? v : v + "[]",
            u(C)
          );
        }), !1;
    }
    return Nr(b) ? !0 : (t.append(oi(y, v, o), u(b)), !1);
  }
  const f = [], m = Object.assign(ah, {
    defaultVisitor: a,
    convertValue: u,
    isVisitable: Nr
  });
  function _(b, v) {
    if (!S.isUndefined(b)) {
      if (f.indexOf(b) !== -1)
        throw Error("Circular reference detected in " + v.join("."));
      f.push(b), S.forEach(b, function(T, w) {
        (!(S.isUndefined(T) || T === null) && r.call(
          t,
          T,
          S.isString(w) ? w.trim() : w,
          v,
          m
        )) === !0 && _(T, v ? v.concat(w) : [w]);
      }), f.pop();
    }
  }
  if (!S.isObject(e))
    throw new TypeError("data must be an object");
  return _(e), t;
}
function ii(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(s) {
    return t[s];
  });
}
function Zr(e, t) {
  this._pairs = [], e && Gs(e, this, t);
}
const pc = Zr.prototype;
pc.append = function(t, n) {
  this._pairs.push([t, n]);
};
pc.toString = function(t) {
  const n = t ? function(s) {
    return t.call(this, s, ii);
  } : ii;
  return this._pairs.map(function(r) {
    return n(r[0]) + "=" + n(r[1]);
  }, "").join("&");
};
function uh(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function hc(e, t, n) {
  if (!t)
    return e;
  const s = n && n.encode || uh;
  S.isFunction(n) && (n = {
    serialize: n
  });
  const r = n && n.serialize;
  let o;
  if (r ? o = r(t, n) : o = S.isURLSearchParams(t) ? t.toString() : new Zr(t, n).toString(s), o) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class li {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, s) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: s ? s.synchronous : !1,
      runWhen: s ? s.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    S.forEach(this.handlers, function(s) {
      s !== null && t(s);
    });
  }
}
const mc = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, fh = typeof URLSearchParams < "u" ? URLSearchParams : Zr, dh = typeof FormData < "u" ? FormData : null, ph = typeof Blob < "u" ? Blob : null, hh = {
  isBrowser: !0,
  classes: {
    URLSearchParams: fh,
    FormData: dh,
    Blob: ph
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, eo = typeof window < "u" && typeof document < "u", Ir = typeof navigator == "object" && navigator || void 0, mh = eo && (!Ir || ["ReactNative", "NativeScript", "NS"].indexOf(Ir.product) < 0), gh = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", _h = eo && window.location.href || "http://localhost", bh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: eo,
  hasStandardBrowserEnv: mh,
  hasStandardBrowserWebWorkerEnv: gh,
  navigator: Ir,
  origin: _h
}, Symbol.toStringTag, { value: "Module" })), Ie = {
  ...bh,
  ...hh
};
function yh(e, t) {
  return Gs(e, new Ie.classes.URLSearchParams(), {
    visitor: function(n, s, r, o) {
      return Ie.isNode && S.isBuffer(n) ? (this.append(s, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function vh(e) {
  return S.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Eh(e) {
  const t = {}, n = Object.keys(e);
  let s;
  const r = n.length;
  let o;
  for (s = 0; s < r; s++)
    o = n[s], t[o] = e[o];
  return t;
}
function gc(e) {
  function t(n, s, r, o) {
    let i = n[o++];
    if (i === "__proto__") return !0;
    const l = Number.isFinite(+i), c = o >= n.length;
    return i = !i && S.isArray(r) ? r.length : i, c ? (S.hasOwnProp(r, i) ? r[i] = [r[i], s] : r[i] = s, !l) : ((!r[i] || !S.isObject(r[i])) && (r[i] = []), t(n, s, r[i], o) && S.isArray(r[i]) && (r[i] = Eh(r[i])), !l);
  }
  if (S.isFormData(e) && S.isFunction(e.entries)) {
    const n = {};
    return S.forEachEntry(e, (s, r) => {
      t(vh(s), r, n, 0);
    }), n;
  }
  return null;
}
function wh(e, t, n) {
  if (S.isString(e))
    try {
      return (t || JSON.parse)(e), S.trim(e);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (n || JSON.stringify)(e);
}
const Yn = {
  transitional: mc,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const s = n.getContentType() || "", r = s.indexOf("application/json") > -1, o = S.isObject(t);
    if (o && S.isHTMLForm(t) && (t = new FormData(t)), S.isFormData(t))
      return r ? JSON.stringify(gc(t)) : t;
    if (S.isArrayBuffer(t) || S.isBuffer(t) || S.isStream(t) || S.isFile(t) || S.isBlob(t) || S.isReadableStream(t))
      return t;
    if (S.isArrayBufferView(t))
      return t.buffer;
    if (S.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let l;
    if (o) {
      if (s.indexOf("application/x-www-form-urlencoded") > -1)
        return yh(t, this.formSerializer).toString();
      if ((l = S.isFileList(t)) || s.indexOf("multipart/form-data") > -1) {
        const c = this.env && this.env.FormData;
        return Gs(
          l ? { "files[]": t } : t,
          c && new c(),
          this.formSerializer
        );
      }
    }
    return o || r ? (n.setContentType("application/json", !1), wh(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || Yn.transitional, s = n && n.forcedJSONParsing, r = this.responseType === "json";
    if (S.isResponse(t) || S.isReadableStream(t))
      return t;
    if (t && S.isString(t) && (s && !this.responseType || r)) {
      const i = !(n && n.silentJSONParsing) && r;
      try {
        return JSON.parse(t, this.parseReviver);
      } catch (l) {
        if (i)
          throw l.name === "SyntaxError" ? X.from(l, X.ERR_BAD_RESPONSE, this, null, this.response) : l;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: Ie.classes.FormData,
    Blob: Ie.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
S.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Yn.headers[e] = {};
});
const Sh = S.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), Ah = (e) => {
  const t = {};
  let n, s, r;
  return e && e.split(`
`).forEach(function(i) {
    r = i.indexOf(":"), n = i.substring(0, r).trim().toLowerCase(), s = i.substring(r + 1).trim(), !(!n || t[n] && Sh[n]) && (n === "set-cookie" ? t[n] ? t[n].push(s) : t[n] = [s] : t[n] = t[n] ? t[n] + ", " + s : s);
  }), t;
}, ci = /* @__PURE__ */ Symbol("internals");
function Sn(e) {
  return e && String(e).trim().toLowerCase();
}
function as(e) {
  return e === !1 || e == null ? e : S.isArray(e) ? e.map(as) : String(e);
}
function Rh(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = n.exec(e); )
    t[s[1]] = s[2];
  return t;
}
const Ch = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function ur(e, t, n, s, r) {
  if (S.isFunction(s))
    return s.call(this, t, n);
  if (r && (t = n), !!S.isString(t)) {
    if (S.isString(s))
      return t.indexOf(s) !== -1;
    if (S.isRegExp(s))
      return s.test(t);
  }
}
function Oh(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, s) => n.toUpperCase() + s);
}
function xh(e, t) {
  const n = S.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(e, s + n, {
      value: function(r, o, i) {
        return this[s].call(this, t, r, o, i);
      },
      configurable: !0
    });
  });
}
let We = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, s) {
    const r = this;
    function o(l, c, u) {
      const a = Sn(c);
      if (!a)
        throw new Error("header name must be a non-empty string");
      const f = S.findKey(r, a);
      (!f || r[f] === void 0 || u === !0 || u === void 0 && r[f] !== !1) && (r[f || c] = as(l));
    }
    const i = (l, c) => S.forEach(l, (u, a) => o(u, a, c));
    if (S.isPlainObject(t) || t instanceof this.constructor)
      i(t, n);
    else if (S.isString(t) && (t = t.trim()) && !Ch(t))
      i(Ah(t), n);
    else if (S.isObject(t) && S.isIterable(t)) {
      let l = {}, c, u;
      for (const a of t) {
        if (!S.isArray(a))
          throw TypeError("Object iterator must return a key-value pair");
        l[u = a[0]] = (c = l[u]) ? S.isArray(c) ? [...c, a[1]] : [c, a[1]] : a[1];
      }
      i(l, n);
    } else
      t != null && o(n, t, s);
    return this;
  }
  get(t, n) {
    if (t = Sn(t), t) {
      const s = S.findKey(this, t);
      if (s) {
        const r = this[s];
        if (!n)
          return r;
        if (n === !0)
          return Rh(r);
        if (S.isFunction(n))
          return n.call(this, r, s);
        if (S.isRegExp(n))
          return n.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = Sn(t), t) {
      const s = S.findKey(this, t);
      return !!(s && this[s] !== void 0 && (!n || ur(this, this[s], s, n)));
    }
    return !1;
  }
  delete(t, n) {
    const s = this;
    let r = !1;
    function o(i) {
      if (i = Sn(i), i) {
        const l = S.findKey(s, i);
        l && (!n || ur(s, s[l], l, n)) && (delete s[l], r = !0);
      }
    }
    return S.isArray(t) ? t.forEach(o) : o(t), r;
  }
  clear(t) {
    const n = Object.keys(this);
    let s = n.length, r = !1;
    for (; s--; ) {
      const o = n[s];
      (!t || ur(this, this[o], o, t, !0)) && (delete this[o], r = !0);
    }
    return r;
  }
  normalize(t) {
    const n = this, s = {};
    return S.forEach(this, (r, o) => {
      const i = S.findKey(s, o);
      if (i) {
        n[i] = as(r), delete n[o];
        return;
      }
      const l = t ? Oh(o) : String(o).trim();
      l !== o && delete n[o], n[l] = as(r), s[l] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return S.forEach(this, (s, r) => {
      s != null && s !== !1 && (n[r] = t && S.isArray(s) ? s.join(", ") : s);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const s = new this(t);
    return n.forEach((r) => s.set(r)), s;
  }
  static accessor(t) {
    const s = (this[ci] = this[ci] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function o(i) {
      const l = Sn(i);
      s[l] || (xh(r, i), s[l] = !0);
    }
    return S.isArray(t) ? t.forEach(o) : o(t), this;
  }
};
We.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
S.reduceDescriptors(We.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(s) {
      this[n] = s;
    }
  };
});
S.freezeMethods(We);
function fr(e, t) {
  const n = this || Yn, s = t || n, r = We.from(s.headers);
  let o = s.data;
  return S.forEach(e, function(l) {
    o = l.call(n, o, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), o;
}
function _c(e) {
  return !!(e && e.__CANCEL__);
}
function _n(e, t, n) {
  X.call(this, e ?? "canceled", X.ERR_CANCELED, t, n), this.name = "CanceledError";
}
S.inherits(_n, X, {
  __CANCEL__: !0
});
function bc(e, t, n) {
  const s = n.config.validateStatus;
  !n.status || !s || s(n.status) ? e(n) : t(new X(
    "Request failed with status code " + n.status,
    [X.ERR_BAD_REQUEST, X.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function Th(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Ph(e, t) {
  e = e || 10;
  const n = new Array(e), s = new Array(e);
  let r = 0, o = 0, i;
  return t = t !== void 0 ? t : 1e3, function(c) {
    const u = Date.now(), a = s[o];
    i || (i = u), n[r] = c, s[r] = u;
    let f = o, m = 0;
    for (; f !== r; )
      m += n[f++], f = f % e;
    if (r = (r + 1) % e, r === o && (o = (o + 1) % e), u - i < t)
      return;
    const _ = a && u - a;
    return _ ? Math.round(m * 1e3 / _) : void 0;
  };
}
function Nh(e, t) {
  let n = 0, s = 1e3 / t, r, o;
  const i = (u, a = Date.now()) => {
    n = a, r = null, o && (clearTimeout(o), o = null), e(...u);
  };
  return [(...u) => {
    const a = Date.now(), f = a - n;
    f >= s ? i(u, a) : (r = u, o || (o = setTimeout(() => {
      o = null, i(r);
    }, s - f)));
  }, () => r && i(r)];
}
const vs = (e, t, n = 3) => {
  let s = 0;
  const r = Ph(50, 250);
  return Nh((o) => {
    const i = o.loaded, l = o.lengthComputable ? o.total : void 0, c = i - s, u = r(c), a = i <= l;
    s = i;
    const f = {
      loaded: i,
      total: l,
      progress: l ? i / l : void 0,
      bytes: c,
      rate: u || void 0,
      estimated: u && l && a ? (l - i) / u : void 0,
      event: o,
      lengthComputable: l != null,
      [t ? "download" : "upload"]: !0
    };
    e(f);
  }, n);
}, ai = (e, t) => {
  const n = e != null;
  return [(s) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: s
  }), t[1]];
}, ui = (e) => (...t) => S.asap(() => e(...t)), Ih = Ie.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, Ie.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(Ie.origin),
  Ie.navigator && /(msie|trident)/i.test(Ie.navigator.userAgent)
) : () => !0, Dh = Ie.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, s, r, o, i) {
      if (typeof document > "u") return;
      const l = [`${e}=${encodeURIComponent(t)}`];
      S.isNumber(n) && l.push(`expires=${new Date(n).toUTCString()}`), S.isString(s) && l.push(`path=${s}`), S.isString(r) && l.push(`domain=${r}`), o === !0 && l.push("secure"), S.isString(i) && l.push(`SameSite=${i}`), document.cookie = l.join("; ");
    },
    read(e) {
      if (typeof document > "u") return null;
      const t = document.cookie.match(new RegExp("(?:^|; )" + e + "=([^;]*)"));
      return t ? decodeURIComponent(t[1]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function Mh(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Lh(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function yc(e, t, n) {
  let s = !Mh(t);
  return e && (s || n == !1) ? Lh(e, t) : t;
}
const fi = (e) => e instanceof We ? { ...e } : e;
function Zt(e, t) {
  t = t || {};
  const n = {};
  function s(u, a, f, m) {
    return S.isPlainObject(u) && S.isPlainObject(a) ? S.merge.call({ caseless: m }, u, a) : S.isPlainObject(a) ? S.merge({}, a) : S.isArray(a) ? a.slice() : a;
  }
  function r(u, a, f, m) {
    if (S.isUndefined(a)) {
      if (!S.isUndefined(u))
        return s(void 0, u, f, m);
    } else return s(u, a, f, m);
  }
  function o(u, a) {
    if (!S.isUndefined(a))
      return s(void 0, a);
  }
  function i(u, a) {
    if (S.isUndefined(a)) {
      if (!S.isUndefined(u))
        return s(void 0, u);
    } else return s(void 0, a);
  }
  function l(u, a, f) {
    if (f in t)
      return s(u, a);
    if (f in e)
      return s(void 0, u);
  }
  const c = {
    url: o,
    method: o,
    data: o,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: l,
    headers: (u, a, f) => r(fi(u), fi(a), f, !0)
  };
  return S.forEach(Object.keys({ ...e, ...t }), function(a) {
    const f = c[a] || r, m = f(e[a], t[a], a);
    S.isUndefined(m) && f !== l || (n[a] = m);
  }), n;
}
const vc = (e) => {
  const t = Zt({}, e);
  let { data: n, withXSRFToken: s, xsrfHeaderName: r, xsrfCookieName: o, headers: i, auth: l } = t;
  if (t.headers = i = We.from(i), t.url = hc(yc(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), l && i.set(
    "Authorization",
    "Basic " + btoa((l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : ""))
  ), S.isFormData(n)) {
    if (Ie.hasStandardBrowserEnv || Ie.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if (S.isFunction(n.getHeaders)) {
      const c = n.getHeaders(), u = ["content-type", "content-length"];
      Object.entries(c).forEach(([a, f]) => {
        u.includes(a.toLowerCase()) && i.set(a, f);
      });
    }
  }
  if (Ie.hasStandardBrowserEnv && (s && S.isFunction(s) && (s = s(t)), s || s !== !1 && Ih(t.url))) {
    const c = r && o && Dh.read(o);
    c && i.set(r, c);
  }
  return t;
}, Uh = typeof XMLHttpRequest < "u", Fh = Uh && function(e) {
  return new Promise(function(n, s) {
    const r = vc(e);
    let o = r.data;
    const i = We.from(r.headers).normalize();
    let { responseType: l, onUploadProgress: c, onDownloadProgress: u } = r, a, f, m, _, b;
    function v() {
      _ && _(), b && b(), r.cancelToken && r.cancelToken.unsubscribe(a), r.signal && r.signal.removeEventListener("abort", a);
    }
    let y = new XMLHttpRequest();
    y.open(r.method.toUpperCase(), r.url, !0), y.timeout = r.timeout;
    function T() {
      if (!y)
        return;
      const C = We.from(
        "getAllResponseHeaders" in y && y.getAllResponseHeaders()
      ), M = {
        data: !l || l === "text" || l === "json" ? y.responseText : y.response,
        status: y.status,
        statusText: y.statusText,
        headers: C,
        config: e,
        request: y
      };
      bc(function(D) {
        n(D), v();
      }, function(D) {
        s(D), v();
      }, M), y = null;
    }
    "onloadend" in y ? y.onloadend = T : y.onreadystatechange = function() {
      !y || y.readyState !== 4 || y.status === 0 && !(y.responseURL && y.responseURL.indexOf("file:") === 0) || setTimeout(T);
    }, y.onabort = function() {
      y && (s(new X("Request aborted", X.ECONNABORTED, e, y)), y = null);
    }, y.onerror = function(R) {
      const M = R && R.message ? R.message : "Network Error", k = new X(M, X.ERR_NETWORK, e, y);
      k.event = R || null, s(k), y = null;
    }, y.ontimeout = function() {
      let R = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const M = r.transitional || mc;
      r.timeoutErrorMessage && (R = r.timeoutErrorMessage), s(new X(
        R,
        M.clarifyTimeoutError ? X.ETIMEDOUT : X.ECONNABORTED,
        e,
        y
      )), y = null;
    }, o === void 0 && i.setContentType(null), "setRequestHeader" in y && S.forEach(i.toJSON(), function(R, M) {
      y.setRequestHeader(M, R);
    }), S.isUndefined(r.withCredentials) || (y.withCredentials = !!r.withCredentials), l && l !== "json" && (y.responseType = r.responseType), u && ([m, b] = vs(u, !0), y.addEventListener("progress", m)), c && y.upload && ([f, _] = vs(c), y.upload.addEventListener("progress", f), y.upload.addEventListener("loadend", _)), (r.cancelToken || r.signal) && (a = (C) => {
      y && (s(!C || C.type ? new _n(null, e, y) : C), y.abort(), y = null);
    }, r.cancelToken && r.cancelToken.subscribe(a), r.signal && (r.signal.aborted ? a() : r.signal.addEventListener("abort", a)));
    const w = Th(r.url);
    if (w && Ie.protocols.indexOf(w) === -1) {
      s(new X("Unsupported protocol " + w + ":", X.ERR_BAD_REQUEST, e));
      return;
    }
    y.send(o || null);
  });
}, kh = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let s = new AbortController(), r;
    const o = function(u) {
      if (!r) {
        r = !0, l();
        const a = u instanceof Error ? u : this.reason;
        s.abort(a instanceof X ? a : new _n(a instanceof Error ? a.message : a));
      }
    };
    let i = t && setTimeout(() => {
      i = null, o(new X(`timeout ${t} of ms exceeded`, X.ETIMEDOUT));
    }, t);
    const l = () => {
      e && (i && clearTimeout(i), i = null, e.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(o) : u.removeEventListener("abort", o);
      }), e = null);
    };
    e.forEach((u) => u.addEventListener("abort", o));
    const { signal: c } = s;
    return c.unsubscribe = () => S.asap(l), c;
  }
}, Bh = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let s = 0, r;
  for (; s < n; )
    r = s + t, yield e.slice(s, r), s = r;
}, jh = async function* (e, t) {
  for await (const n of Hh(e))
    yield* Bh(n, t);
}, Hh = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: s } = await t.read();
      if (n)
        break;
      yield s;
    }
  } finally {
    await t.cancel();
  }
}, di = (e, t, n, s) => {
  const r = jh(e, t);
  let o = 0, i, l = (c) => {
    i || (i = !0, s && s(c));
  };
  return new ReadableStream({
    async pull(c) {
      try {
        const { done: u, value: a } = await r.next();
        if (u) {
          l(), c.close();
          return;
        }
        let f = a.byteLength;
        if (n) {
          let m = o += f;
          n(m);
        }
        c.enqueue(new Uint8Array(a));
      } catch (u) {
        throw l(u), u;
      }
    },
    cancel(c) {
      return l(c), r.return();
    }
  }, {
    highWaterMark: 2
  });
}, pi = 64 * 1024, { isFunction: ss } = S, Vh = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(S.global), {
  ReadableStream: hi,
  TextEncoder: mi
} = S.global, gi = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, $h = (e) => {
  e = S.merge.call({
    skipUndefined: !0
  }, Vh, e);
  const { fetch: t, Request: n, Response: s } = e, r = t ? ss(t) : typeof fetch == "function", o = ss(n), i = ss(s);
  if (!r)
    return !1;
  const l = r && ss(hi), c = r && (typeof mi == "function" ? /* @__PURE__ */ ((b) => (v) => b.encode(v))(new mi()) : async (b) => new Uint8Array(await new n(b).arrayBuffer())), u = o && l && gi(() => {
    let b = !1;
    const v = new n(Ie.origin, {
      body: new hi(),
      method: "POST",
      get duplex() {
        return b = !0, "half";
      }
    }).headers.has("Content-Type");
    return b && !v;
  }), a = i && l && gi(() => S.isReadableStream(new s("").body)), f = {
    stream: a && ((b) => b.body)
  };
  r && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((b) => {
    !f[b] && (f[b] = (v, y) => {
      let T = v && v[b];
      if (T)
        return T.call(v);
      throw new X(`Response type '${b}' is not supported`, X.ERR_NOT_SUPPORT, y);
    });
  });
  const m = async (b) => {
    if (b == null)
      return 0;
    if (S.isBlob(b))
      return b.size;
    if (S.isSpecCompliantForm(b))
      return (await new n(Ie.origin, {
        method: "POST",
        body: b
      }).arrayBuffer()).byteLength;
    if (S.isArrayBufferView(b) || S.isArrayBuffer(b))
      return b.byteLength;
    if (S.isURLSearchParams(b) && (b = b + ""), S.isString(b))
      return (await c(b)).byteLength;
  }, _ = async (b, v) => {
    const y = S.toFiniteNumber(b.getContentLength());
    return y ?? m(v);
  };
  return async (b) => {
    let {
      url: v,
      method: y,
      data: T,
      signal: w,
      cancelToken: C,
      timeout: R,
      onDownloadProgress: M,
      onUploadProgress: k,
      responseType: D,
      headers: G,
      withCredentials: J = "same-origin",
      fetchOptions: ce
    } = vc(b), ge = t || fetch;
    D = D ? (D + "").toLowerCase() : "text";
    let Se = kh([w, C && C.toAbortSignal()], R), _e = null;
    const Te = Se && Se.unsubscribe && (() => {
      Se.unsubscribe();
    });
    let qe;
    try {
      if (k && u && y !== "get" && y !== "head" && (qe = await _(G, T)) !== 0) {
        let ye = new n(v, {
          method: "POST",
          body: T,
          duplex: "half"
        }), ue;
        if (S.isFormData(T) && (ue = ye.headers.get("content-type")) && G.setContentType(ue), ye.body) {
          const [tt, ze] = ai(
            qe,
            vs(ui(k))
          );
          T = di(ye.body, pi, tt, ze);
        }
      }
      S.isString(J) || (J = J ? "include" : "omit");
      const Z = o && "credentials" in n.prototype, $ = {
        ...ce,
        signal: Se,
        method: y.toUpperCase(),
        headers: G.normalize().toJSON(),
        body: T,
        duplex: "half",
        credentials: Z ? J : void 0
      };
      _e = o && new n(v, $);
      let Y = await (o ? ge(_e, ce) : ge(v, $));
      const je = a && (D === "stream" || D === "response");
      if (a && (M || je && Te)) {
        const ye = {};
        ["status", "statusText", "headers"].forEach((nt) => {
          ye[nt] = Y[nt];
        });
        const ue = S.toFiniteNumber(Y.headers.get("content-length")), [tt, ze] = M && ai(
          ue,
          vs(ui(M), !0)
        ) || [];
        Y = new s(
          di(Y.body, pi, tt, () => {
            ze && ze(), Te && Te();
          }),
          ye
        );
      }
      D = D || "text";
      let et = await f[S.findKey(f, D) || "text"](Y, b);
      return !je && Te && Te(), await new Promise((ye, ue) => {
        bc(ye, ue, {
          data: et,
          headers: We.from(Y.headers),
          status: Y.status,
          statusText: Y.statusText,
          config: b,
          request: _e
        });
      });
    } catch (Z) {
      throw Te && Te(), Z && Z.name === "TypeError" && /Load failed|fetch/i.test(Z.message) ? Object.assign(
        new X("Network Error", X.ERR_NETWORK, b, _e),
        {
          cause: Z.cause || Z
        }
      ) : X.from(Z, Z && Z.code, b, _e);
    }
  };
}, Gh = /* @__PURE__ */ new Map(), Ec = (e) => {
  let t = e && e.env || {};
  const { fetch: n, Request: s, Response: r } = t, o = [
    s,
    r,
    n
  ];
  let i = o.length, l = i, c, u, a = Gh;
  for (; l--; )
    c = o[l], u = a.get(c), u === void 0 && a.set(c, u = l ? /* @__PURE__ */ new Map() : $h(t)), a = u;
  return u;
};
Ec();
const to = {
  http: lh,
  xhr: Fh,
  fetch: {
    get: Ec
  }
};
S.forEach(to, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const _i = (e) => `- ${e}`, Kh = (e) => S.isFunction(e) || e === null || e === !1;
function Wh(e, t) {
  e = S.isArray(e) ? e : [e];
  const { length: n } = e;
  let s, r;
  const o = {};
  for (let i = 0; i < n; i++) {
    s = e[i];
    let l;
    if (r = s, !Kh(s) && (r = to[(l = String(s)).toLowerCase()], r === void 0))
      throw new X(`Unknown adapter '${l}'`);
    if (r && (S.isFunction(r) || (r = r.get(t))))
      break;
    o[l || "#" + i] = r;
  }
  if (!r) {
    const i = Object.entries(o).map(
      ([c, u]) => `adapter ${c} ` + (u === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let l = n ? i.length > 1 ? `since :
` + i.map(_i).join(`
`) : " " + _i(i[0]) : "as no adapter specified";
    throw new X(
      "There is no suitable adapter to dispatch the request " + l,
      "ERR_NOT_SUPPORT"
    );
  }
  return r;
}
const wc = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: Wh,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: to
};
function dr(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new _n(null, e);
}
function bi(e) {
  return dr(e), e.headers = We.from(e.headers), e.data = fr.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), wc.getAdapter(e.adapter || Yn.adapter, e)(e).then(function(s) {
    return dr(e), s.data = fr.call(
      e,
      e.transformResponse,
      s
    ), s.headers = We.from(s.headers), s;
  }, function(s) {
    return _c(s) || (dr(e), s && s.response && (s.response.data = fr.call(
      e,
      e.transformResponse,
      s.response
    ), s.response.headers = We.from(s.response.headers))), Promise.reject(s);
  });
}
const Sc = "1.13.2", Ks = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Ks[e] = function(s) {
    return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const yi = {};
Ks.transitional = function(t, n, s) {
  function r(o, i) {
    return "[Axios v" + Sc + "] Transitional option '" + o + "'" + i + (s ? ". " + s : "");
  }
  return (o, i, l) => {
    if (t === !1)
      throw new X(
        r(i, " has been removed" + (n ? " in " + n : "")),
        X.ERR_DEPRECATED
      );
    return n && !yi[i] && (yi[i] = !0, console.warn(
      r(
        i,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(o, i, l) : !0;
  };
};
Ks.spelling = function(t) {
  return (n, s) => (console.warn(`${s} is likely a misspelling of ${t}`), !0);
};
function qh(e, t, n) {
  if (typeof e != "object")
    throw new X("options must be an object", X.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(e);
  let r = s.length;
  for (; r-- > 0; ) {
    const o = s[r], i = t[o];
    if (i) {
      const l = e[o], c = l === void 0 || i(l, o, e);
      if (c !== !0)
        throw new X("option " + o + " must be " + c, X.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new X("Unknown option " + o, X.ERR_BAD_OPTION);
  }
}
const us = {
  assertOptions: qh,
  validators: Ks
}, gt = us.validators;
let Qt = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new li(),
      response: new li()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (s) {
      if (s instanceof Error) {
        let r = {};
        Error.captureStackTrace ? Error.captureStackTrace(r) : r = new Error();
        const o = r.stack ? r.stack.replace(/^.+\n/, "") : "";
        try {
          s.stack ? o && !String(s.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (s.stack += `
` + o) : s.stack = o;
        } catch {
        }
      }
      throw s;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Zt(this.defaults, n);
    const { transitional: s, paramsSerializer: r, headers: o } = n;
    s !== void 0 && us.assertOptions(s, {
      silentJSONParsing: gt.transitional(gt.boolean),
      forcedJSONParsing: gt.transitional(gt.boolean),
      clarifyTimeoutError: gt.transitional(gt.boolean)
    }, !1), r != null && (S.isFunction(r) ? n.paramsSerializer = {
      serialize: r
    } : us.assertOptions(r, {
      encode: gt.function,
      serialize: gt.function
    }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), us.assertOptions(n, {
      baseUrl: gt.spelling("baseURL"),
      withXsrfToken: gt.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let i = o && S.merge(
      o.common,
      o[n.method]
    );
    o && S.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (b) => {
        delete o[b];
      }
    ), n.headers = We.concat(i, o);
    const l = [];
    let c = !0;
    this.interceptors.request.forEach(function(v) {
      typeof v.runWhen == "function" && v.runWhen(n) === !1 || (c = c && v.synchronous, l.unshift(v.fulfilled, v.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(v) {
      u.push(v.fulfilled, v.rejected);
    });
    let a, f = 0, m;
    if (!c) {
      const b = [bi.bind(this), void 0];
      for (b.unshift(...l), b.push(...u), m = b.length, a = Promise.resolve(n); f < m; )
        a = a.then(b[f++], b[f++]);
      return a;
    }
    m = l.length;
    let _ = n;
    for (; f < m; ) {
      const b = l[f++], v = l[f++];
      try {
        _ = b(_);
      } catch (y) {
        v.call(this, y);
        break;
      }
    }
    try {
      a = bi.call(this, _);
    } catch (b) {
      return Promise.reject(b);
    }
    for (f = 0, m = u.length; f < m; )
      a = a.then(u[f++], u[f++]);
    return a;
  }
  getUri(t) {
    t = Zt(this.defaults, t);
    const n = yc(t.baseURL, t.url, t.allowAbsoluteUrls);
    return hc(n, t.params, t.paramsSerializer);
  }
};
S.forEach(["delete", "get", "head", "options"], function(t) {
  Qt.prototype[t] = function(n, s) {
    return this.request(Zt(s || {}, {
      method: t,
      url: n,
      data: (s || {}).data
    }));
  };
});
S.forEach(["post", "put", "patch"], function(t) {
  function n(s) {
    return function(o, i, l) {
      return this.request(Zt(l || {}, {
        method: t,
        headers: s ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: i
      }));
    };
  }
  Qt.prototype[t] = n(), Qt.prototype[t + "Form"] = n(!0);
});
let zh = class Ac {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(o) {
      n = o;
    });
    const s = this;
    this.promise.then((r) => {
      if (!s._listeners) return;
      let o = s._listeners.length;
      for (; o-- > 0; )
        s._listeners[o](r);
      s._listeners = null;
    }), this.promise.then = (r) => {
      let o;
      const i = new Promise((l) => {
        s.subscribe(l), o = l;
      }).then(r);
      return i.cancel = function() {
        s.unsubscribe(o);
      }, i;
    }, t(function(o, i, l) {
      s.reason || (s.reason = new _n(o, i, l), n(s.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (s) => {
      t.abort(s);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new Ac(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
};
function Jh(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function Xh(e) {
  return S.isObject(e) && e.isAxiosError === !0;
}
const Dr = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(Dr).forEach(([e, t]) => {
  Dr[t] = e;
});
function Rc(e) {
  const t = new Qt(e), n = nc(Qt.prototype.request, t);
  return S.extend(n, Qt.prototype, t, { allOwnKeys: !0 }), S.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(r) {
    return Rc(Zt(e, r));
  }, n;
}
const we = Rc(Yn);
we.Axios = Qt;
we.CanceledError = _n;
we.CancelToken = zh;
we.isCancel = _c;
we.VERSION = Sc;
we.toFormData = Gs;
we.AxiosError = X;
we.Cancel = we.CanceledError;
we.all = function(t) {
  return Promise.all(t);
};
we.spread = Jh;
we.isAxiosError = Xh;
we.mergeConfig = Zt;
we.AxiosHeaders = We;
we.formToJSON = (e) => gc(S.isHTMLForm(e) ? new FormData(e) : e);
we.getAdapter = wc.getAdapter;
we.HttpStatusCode = Dr;
we.default = we;
const {
  Axios: fm,
  AxiosError: dm,
  CanceledError: pm,
  isCancel: hm,
  CancelToken: mm,
  VERSION: gm,
  all: _m,
  Cancel: bm,
  isAxiosError: ym,
  spread: vm,
  toFormData: Em,
  AxiosHeaders: wm,
  HttpStatusCode: Sm,
  formToJSON: Am,
  getAdapter: Rm,
  mergeConfig: Cm
} = we;
let Cc = "";
const Yh = () => Cc, Qh = (e) => {
  Cc = e;
}, Zh = (e) => async (t = {}, n = {}) => {
  const { url: s, method: r } = e;
  let o = s;
  ec().currentPath.startsWith("/butter") && (o = s.replace("/image", "/butter"));
  const l = Yh();
  return we.request({
    withCredentials: !1,
    url: l + o,
    method: r,
    [r === "get" ? "params" : "data"]: t
  }).then((c) => {
    const u = c.data;
    return n?.stream ? c : u.errNo === 0 ? u.data : Promise.reject(u);
  }).catch((c) => Promise.reject(c));
}, ve = {};
for (const e in si) {
  const t = si[e];
  t && (ve[e] = Zh(t));
}
const em = { class: "image-wrap" }, rs = /* @__PURE__ */ Be({
  __name: "ImageWrap",
  setup(e) {
    const t = pe([]), n = pe(""), s = Zl(), r = vd();
    let o = pe({
      mid: "",
      name: "",
      feature: "",
      type: "",
      image: "",
      children: []
    });
    const i = async () => {
      if (!ve.getCatalog) return;
      const w = await ve.getCatalog({});
      t.value = w;
    }, l = () => {
      const w = s.path.includes("/butter"), C = s.path.includes("/edit");
      let R = w ? "/butter" : "/story";
      return C && (R += "/edit"), R;
    }, c = ({ child: w }) => {
      const C = l(), R = w.mid;
      r.replace({ path: `${C}/${R}` });
    };
    yt(n, (w) => {
      w && u(w);
    }), yt(() => s.params.mid, (w) => {
      typeof w == "string" && (n.value = w);
    });
    const u = (w) => {
      ve.openImage && ve.openImage({
        mid: w
      }).then((C) => {
        o.value = C;
      });
    }, a = async (w) => {
      if (w?.children?.length && ve.updateImage)
        try {
          await Promise.all(w.children.map((C) => ve.updateImage({
            eid: C.options.eid,
            type: C.type,
            options: C.options
          })));
        } catch (C) {
          window.alert(C?.message || "更新失败");
        }
    }, f = async (w, C) => {
      if (!w?.name || !w?.image) {
        window.alert("缺少必要的故事信息");
        return;
      }
      if (ve.createImage)
        try {
          const R = await ve.createImage(w), M = R?.mid || R?.data?.mid;
          if (!M) {
            window.alert(R?.message || "创建失败");
            return;
          }
          await i(), n.value = M, await u(M), C?.();
        } catch (R) {
          window.alert(R?.message || "创建失败");
        }
    }, m = async (w) => {
      !w?.mid || !w?.name || !ve.updateName || await ve.updateName({ mid: w.mid, name: w.name });
    }, _ = async ({ mid: w, type: C }) => {
      const R = w || n.value;
      !R || !ve.createLayer || (await ve.createLayer({ mid: R, type: C || Ge.TEXT }), u(R));
    }, b = async ({ mid: w, eid: C }) => {
      const R = w || n.value;
      !R || !C || !ve.deleteLayer || (await ve.deleteLayer({ mid: R, eid: C }), u(R));
    }, v = async ({ mid: w, eid: C, direction: R }) => {
      const M = w || n.value;
      !M || !C || !ve.reorderLayer || (await ve.reorderLayer({ mid: M, eid: C, direction: R }), u(M));
    }, y = pe([]);
    Tn("commands", y);
    const T = async () => {
      if (!ve.getConfig) return;
      const { commands: w } = await ve.getConfig({});
      y.value = w;
    };
    return Ds(() => {
      i(), T();
      const w = s.params.mid;
      w && (n.value = w);
    }), (w, C) => (K(), re("div", em, [
      ee(Ad, {
        current: n.value,
        "catalog-list": t.value,
        onChange: c
      }, null, 8, ["current", "catalog-list"]),
      B(o).image ? (K(), Ue(Ep, {
        key: 0,
        story: B(o),
        onChange: a,
        onCreate: f,
        onUpdateName: m,
        onCreateLayer: _,
        onDeleteLayer: b,
        onReorderLayer: v
      }, null, 8, ["story"])) : qt("", !0)
    ]));
  }
}), tm = {}, nm = { class: "warn-center" };
function sm(e, t) {
  return K(), re("div", nm, " 功能已不再维护，感谢您过去的热爱。 ");
}
const rm = /* @__PURE__ */ ks(tm, [["render", sm]]), om = { class: "material-center" }, im = /* @__PURE__ */ Be({
  __name: "MaterialCenter",
  setup(e) {
    const t = () => {
      ve.getMaterialCatalog && ve.getMaterialCatalog({
        type: "DB".toLowerCase()
      }).then(() => {
      });
    };
    return Ds(() => {
      t();
    }), (n, s) => (K(), re("div", om, " 什么都没有的荒原 "));
  }
}), lm = [
  {
    path: "/",
    component: rm
  },
  {
    path: "/story/:mid?",
    component: rs
  },
  {
    path: "/story/edit/:mid?",
    component: rs
  },
  {
    path: "/center",
    component: im
  },
  {
    path: "/butter/:mid?",
    component: rs
  },
  {
    path: "/butter/edit/:mid?",
    component: rs
  }
], Oc = yd({
  history: Yf(),
  routes: lm
});
Oc.beforeResolve(async (e) => {
  e.path && ec().setPath(e.path);
});
const cm = (e, t) => {
  Qh(t || "http://localhost:8080");
  const n = Zu(df);
  return n.use(nf()), n.use(Oc), n.mount(e);
}, Om = {
  load: cm
};
export {
  Om as default
};
