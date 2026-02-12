// @__NO_SIDE_EFFECTS__
function Mr(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ae = {}, rn = [], lt = () => {
}, vi = () => !1, ws = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Lr = (e) => e.startsWith("onUpdate:"), De = Object.assign, Fr = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Oc = Object.prototype.hasOwnProperty, ie = (e, t) => Oc.call(e, t), z = Array.isArray, on = (e) => Es(e) === "[object Map]", wi = (e) => Es(e) === "[object Set]", K = (e) => typeof e == "function", we = (e) => typeof e == "string", It = (e) => typeof e == "symbol", pe = (e) => e !== null && typeof e == "object", Ei = (e) => (pe(e) || K(e)) && K(e.then) && K(e.catch), Si = Object.prototype.toString, Es = (e) => Si.call(e), Tc = (e) => Es(e).slice(8, -1), xi = (e) => Es(e) === "[object Object]", Ss = (e) => we(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Rn = /* @__PURE__ */ Mr(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), xs = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Pc = /-\w/g, ot = xs(
  (e) => e.replace(Pc, (t) => t.slice(1).toUpperCase())
), Nc = /\B([A-Z])/g, Ht = xs(
  (e) => e.replace(Nc, "-$1").toLowerCase()
), Rs = xs((e) => e.charAt(0).toUpperCase() + e.slice(1)), Gs = xs(
  (e) => e ? `on${Rs(e)}` : ""
), jt = (e, t) => !Object.is(e, t), zs = (e, ...t) => {
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
  if (z(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = we(s) ? Fc(s) : an(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (we(e) || pe(e))
    return e;
}
const Dc = /;(?![^(]*\))/g, Mc = /:([^]+)/, Lc = /\/\*[^]*?\*\//g;
function Fc(e) {
  const t = {};
  return e.replace(Lc, "").split(Dc).forEach((n) => {
    if (n) {
      const s = n.split(Mc);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Vt(e) {
  let t = "";
  if (we(e))
    t = e;
  else if (z(e))
    for (let n = 0; n < e.length; n++) {
      const s = Vt(e[n]);
      s && (t += s + " ");
    }
  else if (pe(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const kc = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Uc = /* @__PURE__ */ Mr(kc);
function Ci(e) {
  return !!e || e === "";
}
const Ai = (e) => !!(e && e.__v_isRef === !0), it = (e) => we(e) ? e : e == null ? "" : z(e) || pe(e) && (e.toString === Si || !K(e.toString)) ? Ai(e) ? it(e.value) : JSON.stringify(e, Oi, 2) : String(e), Oi = (e, t) => Ai(t) ? Oi(e, t.value) : on(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], o) => (n[Ks(s, o) + " =>"] = r, n),
    {}
  )
} : wi(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Ks(n))
} : It(t) ? Ks(t) : pe(t) && !z(t) && !xi(t) ? String(t) : t, Ks = (e, t = "") => {
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
function $c(e, t = !1) {
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
      Fi(this), de = t, ct = n, this.flags &= -3;
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
    hr(this) && this.run();
  }
  get dirty() {
    return hr(this);
  }
}
let Di = 0, Cn, An;
function Mi(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = An, An = e;
    return;
  }
  e.next = Cn, Cn = e;
}
function kr() {
  Di++;
}
function Ur() {
  if (--Di > 0)
    return;
  if (An) {
    let t = An;
    for (An = void 0; t; ) {
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
function Fi(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), Br(s), jc(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function hr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ki(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ki(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Fn) || (e.globalVersion = Fn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !hr(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = de, s = ct;
  de = e, ct = !0;
  try {
    Li(e);
    const r = e.fn(e._value);
    (t.version === 0 || jt(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    de = n, ct = s, Fi(e), e.flags &= -3;
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
function jc(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let ct = !0;
const Ui = [];
function vt() {
  Ui.push(ct), ct = !1;
}
function wt() {
  const e = Ui.pop();
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
let Fn = 0;
class Hc {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class $r {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!de || !ct || de === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== de)
      n = this.activeLink = new Hc(de, this), de.deps ? (n.prevDep = de.depsTail, de.depsTail.nextDep = n, de.depsTail = n) : de.deps = de.depsTail = n, Bi(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = de.depsTail, n.nextDep = void 0, de.depsTail.nextDep = n, de.depsTail = n, de.deps === n && (de.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, Fn++, this.notify(t);
  }
  notify(t) {
    kr();
    try {
      Bc.NODE_ENV;
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Ur();
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
), pr = /* @__PURE__ */ Symbol(
  ""
), kn = /* @__PURE__ */ Symbol(
  ""
);
function Ne(e, t, n) {
  if (ct && de) {
    let s = fs.get(e);
    s || fs.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new $r()), r.map = s, r.key = n), r.track();
  }
}
function At(e, t, n, s, r, o) {
  const i = fs.get(e);
  if (!i) {
    Fn++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (kr(), t === "clear")
    i.forEach(l);
  else {
    const c = z(e), u = c && Ss(n);
    if (c && n === "length") {
      const a = Number(s);
      i.forEach((f, m) => {
        (m === "length" || m === kn || !It(m) && m >= a) && l(f);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), u && l(i.get(kn)), t) {
        case "add":
          c ? u && l(i.get("length")) : (l(i.get(Xt)), on(e) && l(i.get(pr)));
          break;
        case "delete":
          c || (l(i.get(Xt)), on(e) && l(i.get(pr)));
          break;
        case "set":
          on(e) && l(i.get(Xt));
          break;
      }
  }
  Ur();
}
function Vc(e, t) {
  const n = fs.get(e);
  return n && n.get(t);
}
function en(e) {
  const t = se(e);
  return t === e ? t : (Ne(t, "iterate", kn), Qe(e) ? t : t.map(at));
}
function As(e) {
  return Ne(e = se(e), "iterate", kn), e;
}
function Ft(e, t) {
  return Pt(e) ? Tt(e) ? un(at(t)) : un(t) : at(t);
}
const Wc = {
  __proto__: null,
  [Symbol.iterator]() {
    return Xs(this, Symbol.iterator, (e) => Ft(this, e));
  },
  concat(...e) {
    return en(this).concat(
      ...e.map((t) => z(t) ? en(t) : t)
    );
  },
  entries() {
    return Xs(this, "entries", (e) => (e[1] = Ft(this, e[1]), e));
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
      (n) => n.map((s) => Ft(this, s)),
      arguments
    );
  },
  find(e, t) {
    return St(
      this,
      "find",
      e,
      t,
      (n) => Ft(this, n),
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
      (n) => Ft(this, n),
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
    return _n(this, "pop");
  },
  push(...e) {
    return _n(this, "push", e);
  },
  reduce(e, ...t) {
    return lo(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return lo(this, "reduceRight", e, t);
  },
  shift() {
    return _n(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return St(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return _n(this, "splice", e);
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
    return _n(this, "unshift", e);
  },
  values() {
    return Xs(this, "values", (e) => Ft(this, e));
  }
};
function Xs(e, t, n) {
  const s = As(e), r = s[t]();
  return s !== e && !Qe(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.done || (o.value = n(o.value)), o;
  }), r;
}
const qc = Array.prototype;
function St(e, t, n, s, r, o) {
  const i = As(e), l = i !== e && !Qe(e), c = i[t];
  if (c !== qc[t]) {
    const f = c.apply(e, o);
    return l ? at(f) : f;
  }
  let u = n;
  i !== e && (l ? u = function(f, m) {
    return n.call(this, Ft(e, f), m, e);
  } : n.length > 2 && (u = function(f, m) {
    return n.call(this, f, m, e);
  }));
  const a = c.call(i, u, s);
  return l && r ? r(a) : a;
}
function lo(e, t, n, s) {
  const r = As(e);
  let o = n;
  return r !== e && (Qe(e) ? n.length > 3 && (o = function(i, l, c) {
    return n.call(this, i, l, c, e);
  }) : o = function(i, l, c) {
    return n.call(this, i, Ft(e, l), c, e);
  }), r[t](o, ...s);
}
function Ys(e, t, n) {
  const s = se(e);
  Ne(s, "iterate", kn);
  const r = s[t](...n);
  return (r === -1 || r === !1) && Ps(n[0]) ? (n[0] = se(n[0]), s[t](...n)) : r;
}
function _n(e, t, n = []) {
  vt(), kr();
  const s = se(e)[t].apply(e, n);
  return Ur(), wt(), s;
}
const Gc = /* @__PURE__ */ Mr("__proto__,__v_isRef,__isVue"), $i = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(It)
);
function zc(e) {
  It(e) || (e = String(e));
  const t = se(this);
  return Ne(t, "has", e), t.hasOwnProperty(e);
}
class ji {
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
      return s === (r ? o ? zi : Gi : o ? qi : Wi).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = z(t);
    if (!r) {
      let c;
      if (i && (c = Wc[n]))
        return c;
      if (n === "hasOwnProperty")
        return zc;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      me(t) ? t : s
    );
    if ((It(n) ? $i.has(n) : Gc(n)) || (r || Ne(t, "get", n), o))
      return l;
    if (me(l)) {
      const c = i && Ss(n) ? l : l.value;
      return r && pe(c) ? gr(c) : c;
    }
    return pe(l) ? r ? gr(l) : qn(l) : l;
  }
}
class Hi extends ji {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    const i = z(t) && Ss(n);
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
    return t === se(r) && (l ? jt(s, o) && At(t, "set", n, s) : At(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = ie(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && At(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!It(n) || !$i.has(n)) && Ne(t, "has", n), s;
  }
  ownKeys(t) {
    return Ne(
      t,
      "iterate",
      z(t) ? "length" : Xt
    ), Reflect.ownKeys(t);
  }
}
class Vi extends ji {
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
const Kc = /* @__PURE__ */ new Hi(), Jc = /* @__PURE__ */ new Vi(), Xc = /* @__PURE__ */ new Hi(!0), Yc = /* @__PURE__ */ new Vi(!0), mr = (e) => e, Qn = (e) => Reflect.getPrototypeOf(e);
function Qc(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = se(r), i = on(o), l = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, u = r[e](...s), a = n ? mr : t ? un : at;
    return !t && Ne(
      o,
      "iterate",
      c ? pr : Xt
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
      e || (jt(r, l) && Ne(i, "get", r), Ne(i, "get", l));
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
      return e || (jt(r, l) && Ne(i, "has", r), Ne(i, "has", l)), r === l ? o.has(r) : o.has(r) || o.has(l);
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
        return Qn(o).has.call(o, r) || (o.add(r), At(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !Qe(o) && !Pt(o) && (o = se(o));
        const i = se(this), { has: l, get: c } = Qn(i);
        let u = l.call(i, r);
        u || (r = se(r), u = l.call(i, r));
        const a = c.call(i, r);
        return i.set(r, o), u ? jt(o, a) && At(i, "set", r, o) : At(i, "add", r, o), this;
      },
      delete(r) {
        const o = se(this), { has: i, get: l } = Qn(o);
        let c = i.call(o, r);
        c || (r = se(r), c = i.call(o, r)), l && l.call(o, r);
        const u = o.delete(r);
        return c && At(o, "delete", r, void 0), u;
      },
      clear() {
        const r = se(this), o = r.size !== 0, i = r.clear();
        return o && At(
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
function Os(e, t) {
  const n = Zc(e, t);
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    ie(n, r) && r in s ? n : s,
    r,
    o
  );
}
const ea = {
  get: /* @__PURE__ */ Os(!1, !1)
}, ta = {
  get: /* @__PURE__ */ Os(!1, !0)
}, na = {
  get: /* @__PURE__ */ Os(!0, !1)
}, sa = {
  get: /* @__PURE__ */ Os(!0, !0)
}, Wi = /* @__PURE__ */ new WeakMap(), qi = /* @__PURE__ */ new WeakMap(), Gi = /* @__PURE__ */ new WeakMap(), zi = /* @__PURE__ */ new WeakMap();
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
function qn(e) {
  return Pt(e) ? e : Ts(
    e,
    !1,
    Kc,
    ea,
    Wi
  );
}
function Ki(e) {
  return Ts(
    e,
    !1,
    Xc,
    ta,
    qi
  );
}
function gr(e) {
  return Ts(
    e,
    !0,
    Jc,
    na,
    Gi
  );
}
function es(e) {
  return Ts(
    e,
    !0,
    Yc,
    sa,
    zi
  );
}
function Ts(e, t, n, s, r) {
  if (!pe(e) || e.__v_raw && !(t && e.__v_isReactive))
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
function jr(e) {
  return !ie(e, "__v_skip") && Object.isExtensible(e) && Ri(e, "__v_skip", !0), e;
}
const at = (e) => pe(e) ? qn(e) : e, un = (e) => pe(e) ? gr(e) : e;
function me(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function he(e) {
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
    this.dep = new $r(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : se(t), this._value = n ? t : at(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || Qe(t) || Pt(t);
    t = s ? t : se(t), jt(t, n) && (this._rawValue = t, this._value = s ? t : at(t), this.dep.trigger());
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
function Gn(e) {
  const t = z(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = ua(e, n);
  return t;
}
class aa {
  constructor(t, n, s) {
    this._object = t, this._key = n, this._defaultValue = s, this.__v_isRef = !0, this._value = void 0, this._raw = se(t);
    let r = !0, o = t;
    if (!z(t) || !Ss(String(n)))
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
    return Vc(this._raw, this._key);
  }
}
function ua(e, t, n) {
  return new aa(e, t, n);
}
class fa {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new $r(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Fn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
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
    return ki(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function da(e, t, n = !1) {
  let s, r;
  return K(e) ? s = e : (s = e.get, r = e.set), new fa(s, r, n);
}
const ts = {}, ds = /* @__PURE__ */ new WeakMap();
let Gt;
function ha(e, t = !1, n = Gt) {
  if (n) {
    let s = ds.get(n);
    s || ds.set(n, s = []), s.push(e);
  }
}
function pa(e, t, n = ae) {
  const { immediate: s, deep: r, once: o, scheduler: i, augmentJob: l, call: c } = n, u = (R) => r ? R : Qe(R) || r === !1 || r === 0 ? Ot(R, 1) : Ot(R);
  let a, f, m, y, b = !1, v = !1;
  if (me(e) ? (f = () => e.value, b = Qe(e)) : Tt(e) ? (f = () => u(e), b = !0) : z(e) ? (v = !0, b = e.some((R) => Tt(R) || Qe(R)), f = () => e.map((R) => {
    if (me(R))
      return R.value;
    if (Tt(R))
      return u(R);
    if (K(R))
      return c ? c(R, 2) : R();
  })) : K(e) ? t ? f = c ? () => c(e, 2) : e : f = () => {
    if (m) {
      vt();
      try {
        m();
      } finally {
        wt();
      }
    }
    const R = Gt;
    Gt = a;
    try {
      return c ? c(e, 3, [y]) : e(y);
    } finally {
      Gt = R;
    }
  } : f = lt, t && r) {
    const R = f, M = r === !0 ? 1 / 0 : r;
    f = () => Ot(R(), M);
  }
  const _ = Ni(), T = () => {
    a.stop(), _ && _.active && Fr(_.effects, a);
  };
  if (o && t) {
    const R = t;
    t = (...M) => {
      R(...M), T();
    };
  }
  let E = v ? new Array(e.length).fill(ts) : ts;
  const C = (R) => {
    if (!(!(a.flags & 1) || !a.dirty && !R))
      if (t) {
        const M = a.run();
        if (r || b || (v ? M.some((U, D) => jt(U, E[D])) : jt(M, E))) {
          m && m();
          const U = Gt;
          Gt = a;
          try {
            const D = [
              M,
              // pass undefined as the old value when it's changed for the first time
              E === ts ? void 0 : v && E[0] === ts ? [] : E,
              y
            ];
            E = M, c ? c(t, 3, D) : (
              // @ts-expect-error
              t(...D)
            );
          } finally {
            Gt = U;
          }
        }
      } else
        a.run();
  };
  return l && l(C), a = new Ii(f), a.scheduler = i ? () => i(C, !1) : C, y = (R) => ha(R, !1, a), m = a.onStop = () => {
    const R = ds.get(a);
    if (R) {
      if (c)
        c(R, 4);
      else
        for (const M of R) M();
      ds.delete(a);
    }
  }, t ? s ? C(!0) : E = a.run() : i ? i(C.bind(null, !0), !0) : a.run(), T.pause = a.pause.bind(a), T.resume = a.resume.bind(a), T.stop = T, T;
}
function Ot(e, t = 1 / 0, n) {
  if (t <= 0 || !pe(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, me(e))
    Ot(e.value, t, n);
  else if (z(e))
    for (let s = 0; s < e.length; s++)
      Ot(e[s], t, n);
  else if (wi(e) || on(e))
    e.forEach((s) => {
      Ot(s, t, n);
    });
  else if (xi(e)) {
    for (const s in e)
      Ot(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && Ot(e[s], t, n);
  }
  return e;
}
var kt = { NODE_ENV: "production" };
const On = [];
let Qs = !1;
function ma(e, ...t) {
  if (Qs) return;
  Qs = !0, vt();
  const n = On.length ? On[On.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = ga();
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
`, ...ya(r)), console.warn(...o);
  }
  wt(), Qs = !1;
}
function ga() {
  let e = On[On.length - 1];
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
function ya(e) {
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
  return e.props ? [r, ..._a(e.props), o] : [r + o];
}
function _a(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...Yi(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Yi(e, t, n) {
  return we(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : me(t) ? (t = Yi(e, se(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : K(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = se(t), n ? t : [`${e}=`, t]);
}
function mn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    Ns(r, t, n);
  }
}
function Et(e, t, n, s) {
  if (K(e)) {
    const r = mn(e, t, n, s);
    return r && Ei(r) && r.catch((o) => {
      Ns(o, t, n);
    }), r;
  }
  if (z(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(Et(e[o], t, n, s));
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
      ]), wt();
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
const ke = [];
let yt = -1;
const ln = [];
let Ut = null, nn = 0;
const Qi = /* @__PURE__ */ Promise.resolve();
let hs = null;
function Hr(e) {
  const t = hs || Qi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function wa(e) {
  let t = yt + 1, n = ke.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = ke[s], o = Un(r);
    o < e || o === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function Vr(e) {
  if (!(e.flags & 1)) {
    const t = Un(e), n = ke[ke.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Un(n) ? ke.push(e) : ke.splice(wa(t), 0, e), e.flags |= 1, Zi();
  }
}
function Zi() {
  hs || (hs = Qi.then(tl));
}
function Ea(e) {
  z(e) ? ln.push(...e) : Ut && e.id === -1 ? Ut.splice(nn + 1, 0, e) : e.flags & 1 || (ln.push(e), e.flags |= 1), Zi();
}
function co(e, t, n = yt + 1) {
  for (; n < ke.length; n++) {
    const s = ke[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      ke.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function el(e) {
  if (ln.length) {
    const t = [...new Set(ln)].sort(
      (n, s) => Un(n) - Un(s)
    );
    if (ln.length = 0, Ut) {
      Ut.push(...t);
      return;
    }
    for (Ut = t, nn = 0; nn < Ut.length; nn++) {
      const n = Ut[nn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Ut = null, nn = 0;
  }
}
const Un = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function tl(e) {
  const t = lt;
  try {
    for (yt = 0; yt < ke.length; yt++) {
      const n = ke[yt];
      n && !(n.flags & 8) && (kt.NODE_ENV !== "production" && t(n), n.flags & 4 && (n.flags &= -2), mn(
        n,
        n.i,
        n.i ? 15 : 14
      ), n.flags & 4 || (n.flags &= -2));
    }
  } finally {
    for (; yt < ke.length; yt++) {
      const n = ke[yt];
      n && (n.flags &= -2);
    }
    yt = -1, ke.length = 0, el(), hs = null, (ke.length || ln.length) && tl();
  }
}
let Oe = null, nl = null;
function ps(e) {
  const t = Oe;
  return Oe = e, nl = e && e.type.__scopeId || null, t;
}
function Bn(e, t = Oe, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && ys(-1);
    const o = ps(t);
    let i;
    try {
      i = e(...r);
    } finally {
      ps(o), s._d && ys(1);
    }
    return i;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function ao(e, t) {
  if (Oe === null)
    return e;
  const n = Fs(Oe), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, i, l, c = ae] = t[r];
    o && (K(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && Ot(i), s.push({
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
function Wt(e, t, n, s) {
  const r = e.dirs, o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    o && (l.oldValue = o[i].value);
    let c = l.dir[s];
    c && (vt(), Et(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), wt());
  }
}
function Tn(e, t) {
  if (Ae) {
    let n = Ae.provides;
    const s = Ae.parent && Ae.parent.provides;
    s === n && (n = Ae.provides = Object.create(s)), n[e] = t;
  }
}
function Ze(e, t, n = !1) {
  const s = Tl();
  if (s || Yt) {
    let r = Yt ? Yt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && K(t) ? t.call(s && s.proxy) : t;
  }
}
function Sa() {
  return !!(Tl() || Yt);
}
const xa = /* @__PURE__ */ Symbol.for("v-scx"), Ra = () => Ze(xa);
function _t(e, t, n) {
  return sl(e, t, n);
}
function sl(e, t, n = ae) {
  const { immediate: s, deep: r, flush: o, once: i } = n, l = De({}, n), c = t && s || !t && o !== "post";
  let u;
  if (Vn) {
    if (o === "sync") {
      const y = Ra();
      u = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!c) {
      const y = () => {
      };
      return y.stop = lt, y.resume = lt, y.pause = lt, y;
    }
  }
  const a = Ae;
  l.call = (y, b, v) => Et(y, a, b, v);
  let f = !1;
  o === "post" ? l.scheduler = (y) => {
    Xe(y, a && a.suspense);
  } : o !== "sync" && (f = !0, l.scheduler = (y, b) => {
    b ? y() : Vr(y);
  }), l.augmentJob = (y) => {
    t && (y.flags |= 4), f && (y.flags |= 2, a && (y.id = a.uid, y.i = a));
  };
  const m = pa(e, t, l);
  return Vn && (u ? u.push(m) : c && m()), m;
}
function Ca(e, t, n) {
  const s = this.proxy, r = we(e) ? e.includes(".") ? rl(s, e) : () => s[e] : e.bind(s, s);
  let o;
  K(t) ? o = t : (o = t.handler, n = t);
  const i = zn(this), l = sl(r, o.bind(s), n);
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
const Aa = /* @__PURE__ */ Symbol("_vte"), Oa = (e) => e.__isTeleport, Ta = /* @__PURE__ */ Symbol("_leaveCb");
function Wr(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Wr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Be(e, t) {
  return K(e) ? (
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
  if (z(e)) {
    e.forEach(
      (b, v) => Pn(
        b,
        t && (z(t) ? t[v] : t),
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
  const o = s.shapeFlag & 4 ? Fs(s.component) : s.el, i = r ? null : o, { i: l, r: c } = e, u = t && t.r, a = l.refs === ae ? l.refs = {} : l.refs, f = l.setupState, m = se(f), y = f === ae ? vi : (b) => ie(m, b);
  if (u != null && u !== c) {
    if (uo(t), we(u))
      a[u] = null, y(u) && (f[u] = null);
    else if (me(u)) {
      u.value = null;
      const b = t;
      b.k && (a[b.k] = null);
    }
  }
  if (K(c))
    mn(c, l, 12, [i, a]);
  else {
    const b = we(c), v = me(c);
    if (b || v) {
      const _ = () => {
        if (e.f) {
          const T = b ? y(c) ? f[c] : a[c] : c.value;
          if (r)
            z(T) && Fr(T, o);
          else if (z(T))
            T.includes(o) || T.push(o);
          else if (b)
            a[c] = [o], y(c) && (f[c] = a[c]);
          else {
            const E = [o];
            c.value = E, e.k && (a[e.k] = E);
          }
        } else b ? (a[c] = i, y(c) && (f[c] = i)) : v && (c.value = i, e.k && (a[e.k] = i));
      };
      if (i) {
        const T = () => {
          _(), ms.delete(e);
        };
        T.id = -1, ms.set(e, T), Xe(T, n);
      } else
        uo(e), _();
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
function ll(e, t, n = Ae) {
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
    Fr(s[t], r);
  }, n);
}
function Is(e, t, n = Ae, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      vt();
      const l = zn(n), c = Et(t, n, e, i);
      return l(), wt(), c;
    });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const Dt = (e) => (t, n = Ae) => {
  (!Vn || e === "sp") && Is(e, (...s) => t(...s), n);
}, Da = Dt("bm"), Ds = Dt("m"), Ma = Dt(
  "bu"
), La = Dt("u"), cl = Dt(
  "bum"
), al = Dt("um"), Fa = Dt(
  "sp"
), ka = Dt("rtg"), Ua = Dt("rtc");
function Ba(e, t = Ae) {
  Is("ec", e, t);
}
const $a = "components";
function ja(e, t) {
  return Va($a, e, !0, t) || e;
}
const Ha = /* @__PURE__ */ Symbol.for("v-ndc");
function Va(e, t, n = !0, s = !1) {
  const r = Oe || Ae;
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
function $n(e, t, n, s) {
  let r;
  const o = n, i = z(e);
  if (i || we(e)) {
    const l = i && Tt(e);
    let c = !1, u = !1;
    l && (c = !Qe(e), u = Pt(e), e = As(e)), r = new Array(e.length);
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
  } else if (pe(e))
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
function qr(e, t, n = {}, s, r) {
  if (Oe.ce || Oe.parent && cn(Oe.parent) && Oe.parent.ce) {
    const u = Object.keys(n).length > 0;
    return q(), Fe(
      xe,
      null,
      [ee("slot", n, s && s())],
      u ? -2 : 64
    );
  }
  let o = e[t];
  o && o._c && (o._d = !1), q();
  const i = o && ul(o(n)), l = n.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  i && i.key, c = Fe(
    xe,
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
  return e.some((t) => Hn(t) ? !(t.type === Nt || t.type === xe && !ul(t.children)) : !0) ? e : null;
}
const yr = (e) => e ? Pl(e) ? Fs(e) : yr(e.parent) : null, Nn = (
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
    $parent: (e) => yr(e.parent),
    $root: (e) => yr(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => dl(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Vr(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Hr.bind(e.proxy)),
    $watch: (e) => Ca.bind(e)
  })
), Zs = (e, t) => e !== ae && !e.__isScriptSetup && ie(e, t), Wa = {
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
function ho(e) {
  return z(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let br = !0;
function qa(e) {
  const t = dl(e), n = e.proxy, s = e.ctx;
  br = !1, t.beforeCreate && po(t.beforeCreate, e, "bc");
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
    beforeUpdate: y,
    updated: b,
    activated: v,
    deactivated: _,
    beforeDestroy: T,
    beforeUnmount: E,
    destroyed: C,
    unmounted: R,
    render: M,
    renderTracked: U,
    renderTriggered: D,
    errorCaptured: W,
    serverPrefetch: J,
    // public API
    expose: ce,
    inheritAttrs: ge,
    // assets
    components: Se,
    directives: ye,
    filters: Te
  } = t;
  if (u && Ga(u, s, null), i)
    for (const V in i) {
      const Y = i[V];
      K(Y) && (s[V] = Y.bind(n));
    }
  if (r) {
    const V = r.call(n, n);
    pe(V) && (e.data = qn(V));
  }
  if (br = !0, o)
    for (const V in o) {
      const Y = o[V], $e = K(Y) ? Y.bind(n, n) : K(Y.get) ? Y.get.bind(n, n) : lt, et = !K(Y) && K(Y.set) ? Y.set.bind(n) : lt, _e = Ce({
        get: $e,
        set: et
      });
      Object.defineProperty(s, V, {
        enumerable: !0,
        configurable: !0,
        get: () => _e.value,
        set: (ue) => _e.value = ue
      });
    }
  if (l)
    for (const V in l)
      fl(l[V], s, n, V);
  if (c) {
    const V = K(c) ? c.call(n) : c;
    Reflect.ownKeys(V).forEach((Y) => {
      Tn(Y, V[Y]);
    });
  }
  a && po(a, e, "c");
  function Z(V, Y) {
    z(Y) ? Y.forEach(($e) => V($e.bind(n))) : Y && V(Y.bind(n));
  }
  if (Z(Da, f), Z(Ds, m), Z(Ma, y), Z(La, b), Z(Pa, v), Z(Na, _), Z(Ba, W), Z(Ua, U), Z(ka, D), Z(cl, E), Z(al, R), Z(Fa, J), z(ce))
    if (ce.length) {
      const V = e.exposed || (e.exposed = {});
      ce.forEach((Y) => {
        Object.defineProperty(V, Y, {
          get: () => n[Y],
          set: ($e) => n[Y] = $e,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  M && e.render === lt && (e.render = M), ge != null && (e.inheritAttrs = ge), Se && (e.components = Se), ye && (e.directives = ye), J && ol(e);
}
function Ga(e, t, n = lt) {
  z(e) && (e = _r(e));
  for (const s in e) {
    const r = e[s];
    let o;
    pe(r) ? "default" in r ? o = Ze(
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
function po(e, t, n) {
  Et(
    z(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function fl(e, t, n, s) {
  let r = s.includes(".") ? rl(n, s) : () => n[s];
  if (we(e)) {
    const o = t[e];
    K(o) && _t(r, o);
  } else if (K(e))
    _t(r, e.bind(n));
  else if (pe(e))
    if (z(e))
      e.forEach((o) => fl(o, t, n, s));
    else {
      const o = K(e.handler) ? e.handler.bind(n) : t[e.handler];
      K(o) && _t(r, o, e);
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
  ), gs(c, t, i)), pe(t) && o.set(t, c), c;
}
function gs(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && gs(e, o, n, !0), r && r.forEach(
    (i) => gs(e, i, n, !0)
  );
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = za[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const za = {
  data: mo,
  props: go,
  emits: go,
  // objects
  methods: xn,
  computed: xn,
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
  components: xn,
  directives: xn,
  // watch
  watch: Ja,
  // provide / inject
  provide: mo,
  inject: Ka
};
function mo(e, t) {
  return t ? e ? function() {
    return De(
      K(e) ? e.call(this, this) : e,
      K(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Ka(e, t) {
  return xn(_r(e), _r(t));
}
function _r(e) {
  if (z(e)) {
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
function xn(e, t) {
  return e ? De(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function go(e, t) {
  return e ? z(e) && z(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : De(
    /* @__PURE__ */ Object.create(null),
    ho(e),
    ho(t ?? {})
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
function hl() {
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
    K(s) || (s = De({}, s)), r != null && !pe(r) && (r = null);
    const o = hl(), i = /* @__PURE__ */ new WeakSet(), l = [];
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
        return i.has(a) || (a && K(a.install) ? (i.add(a), a.install(u, ...f)) : K(a) && (i.add(a), a(u, ...f))), u;
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
          const y = u._ceVNode || ee(s, r);
          return y.appContext = o, m === !0 ? m = "svg" : m === !1 && (m = void 0), e(y, a, m), c = !0, u._container = a, a.__vue_app__ = u, Fs(y.component);
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        c && (Et(
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
const Qa = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ot(t)}Modifiers`] || e[`${Ht(t)}Modifiers`];
function Za(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || ae;
  let r = n;
  const o = t.startsWith("update:"), i = o && Qa(s, t.slice(7));
  i && (i.trim && (r = n.map((a) => we(a) ? a.trim() : a)), i.number && (r = n.map(Ic)));
  let l, c = s[l = Gs(t)] || // also try camelCase event handler (#2249)
  s[l = Gs(ot(t))];
  !c && o && (c = s[l = Gs(Ht(t))]), c && Et(
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
    e.emitted[l] = !0, Et(
      u,
      e,
      6,
      r
    );
  }
}
const eu = /* @__PURE__ */ new WeakMap();
function pl(e, t, n = !1) {
  const s = n ? eu : t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let i = {}, l = !1;
  if (!K(e)) {
    const c = (u) => {
      const a = pl(u, t, !0);
      a && (l = !0, De(i, a));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !o && !l ? (pe(e) && s.set(e, null), null) : (z(o) ? o.forEach((c) => i[c] = null) : De(i, o), pe(e) && s.set(e, i), i);
}
function Ms(e, t) {
  return !e || !ws(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), ie(e, t[0].toLowerCase() + t.slice(1)) || ie(e, Ht(t)) || ie(e, t));
}
function yo(e) {
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
    setupState: y,
    ctx: b,
    inheritAttrs: v
  } = e, _ = ps(e);
  let T, E;
  try {
    if (n.shapeFlag & 4) {
      const R = r || s, M = kt.NODE_ENV !== "production" && y.__isScriptSetup ? new Proxy(R, {
        get(U, D, W) {
          return ma(
            `Property '${String(
              D
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(U, D, W);
        }
      }) : R;
      T = bt(
        u.call(
          M,
          R,
          a,
          kt.NODE_ENV !== "production" ? es(f) : f,
          y,
          m,
          b
        )
      ), E = l;
    } else {
      const R = t;
      kt.NODE_ENV, T = bt(
        R.length > 1 ? R(
          kt.NODE_ENV !== "production" ? es(f) : f,
          kt.NODE_ENV !== "production" ? {
            get attrs() {
              return es(l);
            },
            slots: i,
            emit: c
          } : { attrs: l, slots: i, emit: c }
        ) : R(
          kt.NODE_ENV !== "production" ? es(f) : f,
          null
        )
      ), E = t.props ? l : tu(l);
    }
  } catch (R) {
    In.length = 0, Ns(R, e, 1), T = ee(Nt);
  }
  let C = T;
  if (E && v !== !1) {
    const R = Object.keys(E), { shapeFlag: M } = C;
    R.length && M & 7 && (o && R.some(Lr) && (E = nu(
      E,
      o
    )), C = fn(C, E, !1, !0));
  }
  return n.dirs && (C = fn(C, null, !1, !0), C.dirs = C.dirs ? C.dirs.concat(n.dirs) : n.dirs), n.transition && Wr(C, n.transition), T = C, ps(_), T;
}
const tu = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || ws(n)) && ((t || (t = {}))[n] = e[n]);
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
const ml = {}, gl = () => Object.create(ml), yl = (e) => Object.getPrototypeOf(e) === ml;
function ou(e, t, n, s = !1) {
  const r = {}, o = gl();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), bl(e, t, r, o);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  n ? e.props = s ? r : Ki(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
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
        const y = t[m];
        if (c)
          if (ie(o, m))
            y !== o[m] && (o[m] = y, u = !0);
          else {
            const b = ot(m);
            r[b] = vr(
              c,
              l,
              b,
              y,
              e,
              !1
            );
          }
        else
          y !== o[m] && (o[m] = y, u = !0);
      }
    }
  } else {
    bl(e, t, r, o) && (u = !0);
    let a;
    for (const f in l)
      (!t || // for camelCase
      !ie(t, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = Ht(f)) === f || !ie(t, a))) && (c ? n && // for camelCase
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
  u && At(e.attrs, "set", "");
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
      if (i.type !== Function && !i.skipFactory && K(c)) {
        const { propsDefaults: u } = r;
        if (n in u)
          s = u[n];
        else {
          const a = zn(r);
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
    ] && (s === "" || s === Ht(n)) && (s = !0));
  }
  return s;
}
const lu = /* @__PURE__ */ new WeakMap();
function _l(e, t, n = !1) {
  const s = n ? lu : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const o = e.props, i = {}, l = [];
  let c = !1;
  if (!K(e)) {
    const a = (f) => {
      c = !0;
      const [m, y] = _l(f, t, !0);
      De(i, m), y && l.push(...y);
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!o && !c)
    return pe(e) && s.set(e, rn), rn;
  if (z(o))
    for (let a = 0; a < o.length; a++) {
      const f = ot(o[a]);
      _o(f) && (i[f] = ae);
    }
  else if (o)
    for (const a in o) {
      const f = ot(a);
      if (_o(f)) {
        const m = o[a], y = i[f] = z(m) || K(m) ? { type: m } : De({}, m), b = y.type;
        let v = !1, _ = !0;
        if (z(b))
          for (let T = 0; T < b.length; ++T) {
            const E = b[T], C = K(E) && E.name;
            if (C === "Boolean") {
              v = !0;
              break;
            } else C === "String" && (_ = !1);
          }
        else
          v = K(b) && b.name === "Boolean";
        y[
          0
          /* shouldCast */
        ] = v, y[
          1
          /* shouldCastTrue */
        ] = _, (v || ie(y, "default")) && l.push(f);
      }
    }
  const u = [i, l];
  return pe(e) && s.set(e, u), u;
}
function _o(e) {
  return e[0] !== "$" && !Rn(e);
}
const Gr = (e) => e === "_" || e === "_ctx" || e === "$stable", zr = (e) => z(e) ? e.map(bt) : [bt(e)], cu = (e, t, n) => {
  if (t._n)
    return t;
  const s = Bn((...r) => (kt.NODE_ENV !== "production" && Ae && !(n === null && Oe) && (n && (n.root, Ae.root)), zr(t(...r))), n);
  return s._c = !1, s;
}, vl = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (Gr(r)) continue;
    const o = e[r];
    if (K(o))
      t[r] = cu(r, o, s);
    else if (o != null) {
      const i = zr(o);
      t[r] = () => i;
    }
  }
}, wl = (e, t) => {
  const n = zr(t);
  e.slots.default = () => n;
}, El = (e, t, n) => {
  for (const s in t)
    (n || !Gr(s)) && (e[s] = t[s]);
}, au = (e, t, n) => {
  const s = e.slots = gl();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (El(s, t, n), n && Ri(s, "_", r, !0)) : vl(t, s);
  } else t && wl(e, t);
}, uu = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let o = !0, i = ae;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? o = !1 : El(r, t, n) : (o = !t.$stable, vl(t, r)), i = t;
  } else t && (wl(e, t), i = { default: 1 });
  if (o)
    for (const l in r)
      !Gr(l) && i[l] == null && delete r[l];
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
    setScopeId: y = lt,
    insertStaticContent: b
  } = e, v = (d, p, h, g = null, w = null, x = null, O = void 0, I = null, N = !!p.dynamicChildren) => {
    if (d === p)
      return;
    d && !vn(d, p) && (g = A(d), ue(d, w, x, !0), d = null), p.patchFlag === -2 && (N = !1, p.dynamicChildren = null);
    const { type: P, ref: H, shapeFlag: F } = p;
    switch (P) {
      case Ls:
        _(d, p, h, g);
        break;
      case Nt:
        T(d, p, h, g);
        break;
      case tr:
        d == null && E(p, h, g, O);
        break;
      case xe:
        Se(
          d,
          p,
          h,
          g,
          w,
          x,
          O,
          I,
          N
        );
        break;
      default:
        F & 1 ? M(
          d,
          p,
          h,
          g,
          w,
          x,
          O,
          I,
          N
        ) : F & 6 ? ye(
          d,
          p,
          h,
          g,
          w,
          x,
          O,
          I,
          N
        ) : (F & 64 || F & 128) && P.process(
          d,
          p,
          h,
          g,
          w,
          x,
          O,
          I,
          N,
          $
        );
    }
    H != null && w ? Pn(H, d && d.ref, x, p || d, !p) : H == null && d && d.ref != null && Pn(d.ref, null, x, d, !0);
  }, _ = (d, p, h, g) => {
    if (d == null)
      s(
        p.el = l(p.children),
        h,
        g
      );
    else {
      const w = p.el = d.el;
      p.children !== d.children && u(w, p.children);
    }
  }, T = (d, p, h, g) => {
    d == null ? s(
      p.el = c(p.children || ""),
      h,
      g
    ) : p.el = d.el;
  }, E = (d, p, h, g) => {
    [d.el, d.anchor] = b(
      d.children,
      p,
      h,
      g,
      d.el,
      d.anchor
    );
  }, C = ({ el: d, anchor: p }, h, g) => {
    let w;
    for (; d && d !== p; )
      w = m(d), s(d, h, g), d = w;
    s(p, h, g);
  }, R = ({ el: d, anchor: p }) => {
    let h;
    for (; d && d !== p; )
      h = m(d), r(d), d = h;
    r(p);
  }, M = (d, p, h, g, w, x, O, I, N) => {
    if (p.type === "svg" ? O = "svg" : p.type === "math" && (O = "mathml"), d == null)
      U(
        p,
        h,
        g,
        w,
        x,
        O,
        I,
        N
      );
    else {
      const P = d.el && d.el._isVueCE ? d.el : null;
      try {
        P && P._beginPatch(), J(
          d,
          p,
          w,
          x,
          O,
          I,
          N
        );
      } finally {
        P && P._endPatch();
      }
    }
  }, U = (d, p, h, g, w, x, O, I) => {
    let N, P;
    const { props: H, shapeFlag: F, transition: j, dirs: G } = d;
    if (N = d.el = i(
      d.type,
      x,
      H && H.is,
      H
    ), F & 8 ? a(N, d.children) : F & 16 && W(
      d.children,
      N,
      null,
      g,
      w,
      er(d, x),
      O,
      I
    ), G && Wt(d, null, g, "created"), D(N, d, d.scopeId, O, g), H) {
      for (const fe in H)
        fe !== "value" && !Rn(fe) && o(N, fe, null, H[fe], x, g);
      "value" in H && o(N, "value", null, H.value, x), (P = H.onVnodeBeforeMount) && mt(P, g, d);
    }
    G && Wt(d, null, g, "beforeMount");
    const ne = hu(w, j);
    ne && j.beforeEnter(N), s(N, p, h), ((P = H && H.onVnodeMounted) || ne || G) && Xe(() => {
      P && mt(P, g, d), ne && j.enter(N), G && Wt(d, null, g, "mounted");
    }, w);
  }, D = (d, p, h, g, w) => {
    if (h && y(d, h), g)
      for (let x = 0; x < g.length; x++)
        y(d, g[x]);
    if (w) {
      let x = w.subTree;
      if (p === x || Cl(x.type) && (x.ssContent === p || x.ssFallback === p)) {
        const O = w.vnode;
        D(
          d,
          O,
          O.scopeId,
          O.slotScopeIds,
          w.parent
        );
      }
    }
  }, W = (d, p, h, g, w, x, O, I, N = 0) => {
    for (let P = N; P < d.length; P++) {
      const H = d[P] = I ? Bt(d[P]) : bt(d[P]);
      v(
        null,
        H,
        p,
        h,
        g,
        w,
        x,
        O,
        I
      );
    }
  }, J = (d, p, h, g, w, x, O) => {
    const I = p.el = d.el;
    let { patchFlag: N, dynamicChildren: P, dirs: H } = p;
    N |= d.patchFlag & 16;
    const F = d.props || ae, j = p.props || ae;
    let G;
    if (h && qt(h, !1), (G = j.onVnodeBeforeUpdate) && mt(G, h, p, d), H && Wt(p, d, h, "beforeUpdate"), h && qt(h, !0), (F.innerHTML && j.innerHTML == null || F.textContent && j.textContent == null) && a(I, ""), P ? ce(
      d.dynamicChildren,
      P,
      I,
      h,
      g,
      er(p, w),
      x
    ) : O || Y(
      d,
      p,
      I,
      null,
      h,
      g,
      er(p, w),
      x,
      !1
    ), N > 0) {
      if (N & 16)
        ge(I, F, j, h, w);
      else if (N & 2 && F.class !== j.class && o(I, "class", null, j.class, w), N & 4 && o(I, "style", F.style, j.style, w), N & 8) {
        const ne = p.dynamicProps;
        for (let fe = 0; fe < ne.length; fe++) {
          const le = ne[fe], He = F[le], Ve = j[le];
          (Ve !== He || le === "value") && o(I, le, He, Ve, w, h);
        }
      }
      N & 1 && d.children !== p.children && a(I, p.children);
    } else !O && P == null && ge(I, F, j, h, w);
    ((G = j.onVnodeUpdated) || H) && Xe(() => {
      G && mt(G, h, p, d), H && Wt(p, d, h, "updated");
    }, g);
  }, ce = (d, p, h, g, w, x, O) => {
    for (let I = 0; I < p.length; I++) {
      const N = d[I], P = p[I], H = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        N.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (N.type === xe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !vn(N, P) || // - In the case of a component, it could contain anything.
        N.shapeFlag & 198) ? f(N.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      v(
        N,
        P,
        H,
        null,
        g,
        w,
        x,
        O,
        !0
      );
    }
  }, ge = (d, p, h, g, w) => {
    if (p !== h) {
      if (p !== ae)
        for (const x in p)
          !Rn(x) && !(x in h) && o(
            d,
            x,
            p[x],
            null,
            w,
            g
          );
      for (const x in h) {
        if (Rn(x)) continue;
        const O = h[x], I = p[x];
        O !== I && x !== "value" && o(d, x, I, O, w, g);
      }
      "value" in h && o(d, "value", p.value, h.value, w);
    }
  }, Se = (d, p, h, g, w, x, O, I, N) => {
    const P = p.el = d ? d.el : l(""), H = p.anchor = d ? d.anchor : l("");
    let { patchFlag: F, dynamicChildren: j, slotScopeIds: G } = p;
    G && (I = I ? I.concat(G) : G), d == null ? (s(P, h, g), s(H, h, g), W(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      p.children || [],
      h,
      H,
      w,
      x,
      O,
      I,
      N
    )) : F > 0 && F & 64 && j && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    d.dynamicChildren && d.dynamicChildren.length === j.length ? (ce(
      d.dynamicChildren,
      j,
      h,
      w,
      x,
      O,
      I
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (p.key != null || w && p === w.subTree) && Sl(
      d,
      p,
      !0
      /* shallow */
    )) : Y(
      d,
      p,
      h,
      H,
      w,
      x,
      O,
      I,
      N
    );
  }, ye = (d, p, h, g, w, x, O, I, N) => {
    p.slotScopeIds = I, d == null ? p.shapeFlag & 512 ? w.ctx.activate(
      p,
      h,
      g,
      O,
      N
    ) : Te(
      p,
      h,
      g,
      w,
      x,
      O,
      N
    ) : ze(d, p, N);
  }, Te = (d, p, h, g, w, x, O) => {
    const I = d.component = wu(
      d,
      g,
      w
    );
    if (il(d) && (I.ctx.renderer = $), Eu(I, !1, O), I.asyncDep) {
      if (w && w.registerDep(I, Z, O), !d.el) {
        const N = I.subTree = ee(Nt);
        T(null, N, p, h), d.placeholder = N.el;
      }
    } else
      Z(
        I,
        d,
        p,
        h,
        w,
        x,
        O
      );
  }, ze = (d, p, h) => {
    const g = p.component = d.component;
    if (su(d, p, h))
      if (g.asyncDep && !g.asyncResolved) {
        V(g, p, h);
        return;
      } else
        g.next = p, g.update();
    else
      p.el = d.el, g.vnode = p;
  }, Z = (d, p, h, g, w, x, O) => {
    const I = () => {
      if (d.isMounted) {
        let { next: F, bu: j, u: G, parent: ne, vnode: fe } = d;
        {
          const ht = xl(d);
          if (ht) {
            F && (F.el = fe.el, V(d, F, O)), ht.asyncDep.then(() => {
              d.isUnmounted || I();
            });
            return;
          }
        }
        let le = F, He;
        qt(d, !1), F ? (F.el = fe.el, V(d, F, O)) : F = fe, j && zs(j), (He = F.props && F.props.onVnodeBeforeUpdate) && mt(He, ne, F, fe), qt(d, !0);
        const Ve = yo(d), dt = d.subTree;
        d.subTree = Ve, v(
          dt,
          Ve,
          // parent may have changed if it's in a teleport
          f(dt.el),
          // anchor may have changed if it's in a fragment
          A(dt),
          d,
          w,
          x
        ), F.el = Ve.el, le === null && ru(d, Ve.el), G && Xe(G, w), (He = F.props && F.props.onVnodeUpdated) && Xe(
          () => mt(He, ne, F, fe),
          w
        );
      } else {
        let F;
        const { el: j, props: G } = p, { bm: ne, m: fe, parent: le, root: He, type: Ve } = d, dt = cn(p);
        qt(d, !1), ne && zs(ne), !dt && (F = G && G.onVnodeBeforeMount) && mt(F, le, p), qt(d, !0);
        {
          He.ce && // @ts-expect-error _def is private
          He.ce._def.shadowRoot !== !1 && He.ce._injectChildStyle(Ve);
          const ht = d.subTree = yo(d);
          v(
            null,
            ht,
            h,
            g,
            d,
            w,
            x
          ), p.el = ht.el;
        }
        if (fe && Xe(fe, w), !dt && (F = G && G.onVnodeMounted)) {
          const ht = p;
          Xe(
            () => mt(F, le, ht),
            w
          );
        }
        (p.shapeFlag & 256 || le && cn(le.vnode) && le.vnode.shapeFlag & 256) && d.a && Xe(d.a, w), d.isMounted = !0, p = h = g = null;
      }
    };
    d.scope.on();
    const N = d.effect = new Ii(I);
    d.scope.off();
    const P = d.update = N.run.bind(N), H = d.job = N.runIfDirty.bind(N);
    H.i = d, H.id = d.uid, N.scheduler = () => Vr(H), qt(d, !0), P();
  }, V = (d, p, h) => {
    p.component = d;
    const g = d.vnode.props;
    d.vnode = p, d.next = null, iu(d, p.props, g, h), uu(d, p.children, h), vt(), co(d), wt();
  }, Y = (d, p, h, g, w, x, O, I, N = !1) => {
    const P = d && d.children, H = d ? d.shapeFlag : 0, F = p.children, { patchFlag: j, shapeFlag: G } = p;
    if (j > 0) {
      if (j & 128) {
        et(
          P,
          F,
          h,
          g,
          w,
          x,
          O,
          I,
          N
        );
        return;
      } else if (j & 256) {
        $e(
          P,
          F,
          h,
          g,
          w,
          x,
          O,
          I,
          N
        );
        return;
      }
    }
    G & 8 ? (H & 16 && je(P, w, x), F !== P && a(h, F)) : H & 16 ? G & 16 ? et(
      P,
      F,
      h,
      g,
      w,
      x,
      O,
      I,
      N
    ) : je(P, w, x, !0) : (H & 8 && a(h, ""), G & 16 && W(
      F,
      h,
      g,
      w,
      x,
      O,
      I,
      N
    ));
  }, $e = (d, p, h, g, w, x, O, I, N) => {
    d = d || rn, p = p || rn;
    const P = d.length, H = p.length, F = Math.min(P, H);
    let j;
    for (j = 0; j < F; j++) {
      const G = p[j] = N ? Bt(p[j]) : bt(p[j]);
      v(
        d[j],
        G,
        h,
        null,
        w,
        x,
        O,
        I,
        N
      );
    }
    P > H ? je(
      d,
      w,
      x,
      !0,
      !1,
      F
    ) : W(
      p,
      h,
      g,
      w,
      x,
      O,
      I,
      N,
      F
    );
  }, et = (d, p, h, g, w, x, O, I, N) => {
    let P = 0;
    const H = p.length;
    let F = d.length - 1, j = H - 1;
    for (; P <= F && P <= j; ) {
      const G = d[P], ne = p[P] = N ? Bt(p[P]) : bt(p[P]);
      if (vn(G, ne))
        v(
          G,
          ne,
          h,
          null,
          w,
          x,
          O,
          I,
          N
        );
      else
        break;
      P++;
    }
    for (; P <= F && P <= j; ) {
      const G = d[F], ne = p[j] = N ? Bt(p[j]) : bt(p[j]);
      if (vn(G, ne))
        v(
          G,
          ne,
          h,
          null,
          w,
          x,
          O,
          I,
          N
        );
      else
        break;
      F--, j--;
    }
    if (P > F) {
      if (P <= j) {
        const G = j + 1, ne = G < H ? p[G].el : g;
        for (; P <= j; )
          v(
            null,
            p[P] = N ? Bt(p[P]) : bt(p[P]),
            h,
            ne,
            w,
            x,
            O,
            I,
            N
          ), P++;
      }
    } else if (P > j)
      for (; P <= F; )
        ue(d[P], w, x, !0), P++;
    else {
      const G = P, ne = P, fe = /* @__PURE__ */ new Map();
      for (P = ne; P <= j; P++) {
        const Je = p[P] = N ? Bt(p[P]) : bt(p[P]);
        Je.key != null && fe.set(Je.key, P);
      }
      let le, He = 0;
      const Ve = j - ne + 1;
      let dt = !1, ht = 0;
      const bn = new Array(Ve);
      for (P = 0; P < Ve; P++) bn[P] = 0;
      for (P = G; P <= F; P++) {
        const Je = d[P];
        if (He >= Ve) {
          ue(Je, w, x, !0);
          continue;
        }
        let pt;
        if (Je.key != null)
          pt = fe.get(Je.key);
        else
          for (le = ne; le <= j; le++)
            if (bn[le - ne] === 0 && vn(Je, p[le])) {
              pt = le;
              break;
            }
        pt === void 0 ? ue(Je, w, x, !0) : (bn[pt - ne] = P + 1, pt >= ht ? ht = pt : dt = !0, v(
          Je,
          p[pt],
          h,
          null,
          w,
          x,
          O,
          I,
          N
        ), He++);
      }
      const no = dt ? pu(bn) : rn;
      for (le = no.length - 1, P = Ve - 1; P >= 0; P--) {
        const Je = ne + P, pt = p[Je], so = p[Je + 1], ro = Je + 1 < H ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          so.el || Rl(so)
        ) : g;
        bn[P] === 0 ? v(
          null,
          pt,
          h,
          ro,
          w,
          x,
          O,
          I,
          N
        ) : dt && (le < 0 || P !== no[le] ? _e(pt, h, ro, 2) : le--);
      }
    }
  }, _e = (d, p, h, g, w = null) => {
    const { el: x, type: O, transition: I, children: N, shapeFlag: P } = d;
    if (P & 6) {
      _e(d.component.subTree, p, h, g);
      return;
    }
    if (P & 128) {
      d.suspense.move(p, h, g);
      return;
    }
    if (P & 64) {
      O.move(d, p, h, $);
      return;
    }
    if (O === xe) {
      s(x, p, h);
      for (let F = 0; F < N.length; F++)
        _e(N[F], p, h, g);
      s(d.anchor, p, h);
      return;
    }
    if (O === tr) {
      C(d, p, h);
      return;
    }
    if (g !== 2 && P & 1 && I)
      if (g === 0)
        I.beforeEnter(x), s(x, p, h), Xe(() => I.enter(x), w);
      else {
        const { leave: F, delayLeave: j, afterLeave: G } = I, ne = () => {
          d.ctx.isUnmounted ? r(x) : s(x, p, h);
        }, fe = () => {
          x._isLeaving && x[Ta](
            !0
            /* cancelled */
          ), F(x, () => {
            ne(), G && G();
          });
        };
        j ? j(x, ne, fe) : fe();
      }
    else
      s(x, p, h);
  }, ue = (d, p, h, g = !1, w = !1) => {
    const {
      type: x,
      props: O,
      ref: I,
      children: N,
      dynamicChildren: P,
      shapeFlag: H,
      patchFlag: F,
      dirs: j,
      cacheIndex: G
    } = d;
    if (F === -2 && (w = !1), I != null && (vt(), Pn(I, null, h, d, !0), wt()), G != null && (p.renderCache[G] = void 0), H & 256) {
      p.ctx.deactivate(d);
      return;
    }
    const ne = H & 1 && j, fe = !cn(d);
    let le;
    if (fe && (le = O && O.onVnodeBeforeUnmount) && mt(le, p, d), H & 6)
      nt(d.component, h, g);
    else {
      if (H & 128) {
        d.suspense.unmount(h, g);
        return;
      }
      ne && Wt(d, null, p, "beforeUnmount"), H & 64 ? d.type.remove(
        d,
        p,
        h,
        $,
        g
      ) : P && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !P.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (x !== xe || F > 0 && F & 64) ? je(
        P,
        p,
        h,
        !1,
        !0
      ) : (x === xe && F & 384 || !w && H & 16) && je(N, p, h), g && tt(d);
    }
    (fe && (le = O && O.onVnodeUnmounted) || ne) && Xe(() => {
      le && mt(le, p, d), ne && Wt(d, null, p, "unmounted");
    }, h);
  }, tt = (d) => {
    const { type: p, el: h, anchor: g, transition: w } = d;
    if (p === xe) {
      Ke(h, g);
      return;
    }
    if (p === tr) {
      R(d);
      return;
    }
    const x = () => {
      r(h), w && !w.persisted && w.afterLeave && w.afterLeave();
    };
    if (d.shapeFlag & 1 && w && !w.persisted) {
      const { leave: O, delayLeave: I } = w, N = () => O(h, x);
      I ? I(d.el, x, N) : N();
    } else
      x();
  }, Ke = (d, p) => {
    let h;
    for (; d !== p; )
      h = m(d), r(d), d = h;
    r(p);
  }, nt = (d, p, h) => {
    const { bum: g, scope: w, job: x, subTree: O, um: I, m: N, a: P } = d;
    vo(N), vo(P), g && zs(g), w.stop(), x && (x.flags |= 8, ue(O, d, p, h)), I && Xe(I, p), Xe(() => {
      d.isUnmounted = !0;
    }, p);
  }, je = (d, p, h, g = !1, w = !1, x = 0) => {
    for (let O = x; O < d.length; O++)
      ue(d[O], p, h, g, w);
  }, A = (d) => {
    if (d.shapeFlag & 6)
      return A(d.component.subTree);
    if (d.shapeFlag & 128)
      return d.suspense.next();
    const p = m(d.anchor || d.el), h = p && p[Aa];
    return h ? m(h) : p;
  };
  let k = !1;
  const L = (d, p, h) => {
    let g;
    d == null ? p._vnode && (ue(p._vnode, null, null, !0), g = p._vnode.component) : v(
      p._vnode || null,
      d,
      p,
      null,
      null,
      null,
      h
    ), p._vnode = d, k || (k = !0, co(g), el(), k = !1);
  }, $ = {
    p: v,
    um: ue,
    m: _e,
    r: tt,
    mt: Te,
    mc: W,
    pc: Y,
    pbc: ce,
    n: A,
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
function qt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function hu(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Sl(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (z(s) && z(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let l = r[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[o] = Bt(r[o]), l.el = i.el), !n && l.patchFlag !== -2 && Sl(i, l)), l.type === Ls && (l.patchFlag !== -1 ? l.el = i.el : l.__elIndex = o + // take fragment start anchor into account
      (e.type === xe ? 1 : 0)), l.type === Nt && !l.el && (l.el = i.el);
    }
}
function pu(e) {
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
function xl(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : xl(t);
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
  t && t.pendingBranch ? z(e) ? t.effects.push(...e) : t.effects.push(e) : Ea(e);
}
const xe = /* @__PURE__ */ Symbol.for("v-fgt"), Ls = /* @__PURE__ */ Symbol.for("v-txt"), Nt = /* @__PURE__ */ Symbol.for("v-cmt"), tr = /* @__PURE__ */ Symbol.for("v-stc"), In = [];
let Ye = null;
function q(e = !1) {
  In.push(Ye = e ? null : []);
}
function gu() {
  In.pop(), Ye = In[In.length - 1] || null;
}
let jn = 1;
function ys(e, t = !1) {
  jn += e, e < 0 && Ye && t && (Ye.hasOnce = !0);
}
function Al(e) {
  return e.dynamicChildren = jn > 0 ? Ye || rn : null, gu(), jn > 0 && Ye && Ye.push(e), e;
}
function re(e, t, n, s, r, o) {
  return Al(
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
function Fe(e, t, n, s, r) {
  return Al(
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
function Hn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function vn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ol = ({ key: e }) => e ?? null, os = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? we(e) || me(e) || K(e) ? { i: Oe, r: e, k: t, f: !!n } : e : null);
function Q(e, t = null, n = null, s = 0, r = null, o = e === xe ? 0 : 1, i = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ol(t),
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
    ctx: Oe
  };
  return l ? (Jr(c, n), o & 128 && e.normalize(c)) : n && (c.shapeFlag |= we(n) ? 8 : 16), jn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Ye && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Ye.push(c), c;
}
const ee = yu;
function yu(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === Ha) && (e = Nt), Hn(e)) {
    const l = fn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Jr(l, n), jn > 0 && !o && Ye && (l.shapeFlag & 6 ? Ye[Ye.indexOf(e)] = l : Ye.push(l)), l.patchFlag = -2, l;
  }
  if (Ou(e) && (e = e.__vccOpts), t) {
    t = bu(t);
    let { class: l, style: c } = t;
    l && !we(l) && (t.class = Vt(l)), pe(c) && (Ps(c) && !z(c) && (c = De({}, c)), t.style = an(c));
  }
  const i = we(e) ? 1 : Cl(e) ? 128 : Oa(e) ? 64 : pe(e) ? 4 : K(e) ? 2 : 0;
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
  return e ? Ps(e) || yl(e) ? De({}, e) : e : null;
}
function fn(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: l, transition: c } = e, u = t ? wr(r || {}, t) : r, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && Ol(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? z(o) ? o.concat(os(t)) : [o, os(t)] : os(t)
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
    patchFlag: t && e.type !== xe ? i === -1 ? 16 : i | 16 : i,
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
  return c && s && Wr(
    a,
    c.clone(a)
  ), a;
}
function Kr(e = " ", t = 0) {
  return ee(Ls, null, e, t);
}
function zt(e = "", t = !1) {
  return t ? (q(), Fe(Nt, null, e)) : ee(Nt, null, e);
}
function bt(e) {
  return e == null || typeof e == "boolean" ? ee(Nt) : z(e) ? ee(
    xe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Hn(e) ? Bt(e) : ee(Ls, null, String(e));
}
function Bt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : fn(e);
}
function Jr(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (z(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Jr(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !yl(t) ? t._ctx = Oe : r === 3 && Oe && (Oe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else K(t) ? (t = { default: t, _ctx: Oe }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Kr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function wr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Vt([t.class, s.class]));
      else if (r === "style")
        t.style = an([t.style, s.style]);
      else if (ws(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(z(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function mt(e, t, n, s = null) {
  Et(e, t, 7, [
    n,
    s
  ]);
}
const _u = hl();
let vu = 0;
function wu(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || _u, o = {
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
    propsOptions: _l(s, r),
    emitsOptions: pl(s, r),
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
let Ae = null;
const Tl = () => Ae || Oe;
let bs, Er;
{
  const e = Cs(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  bs = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ae = n
  ), Er = t(
    "__VUE_SSR_SETTERS__",
    (n) => Vn = n
  );
}
const zn = (e) => {
  const t = Ae;
  return bs(e), e.scope.on(), () => {
    e.scope.off(), bs(t);
  };
}, wo = () => {
  Ae && Ae.scope.off(), bs(null);
};
function Pl(e) {
  return e.vnode.shapeFlag & 4;
}
let Vn = !1;
function Eu(e, t = !1, n = !1) {
  t && Er(t);
  const { props: s, children: r } = e.vnode, o = Pl(e);
  ou(e, s, o, t), au(e, r, n || t);
  const i = o ? Su(e, t) : void 0;
  return t && Er(!1), i;
}
function Su(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Wa);
  const { setup: s } = n;
  if (s) {
    vt();
    const r = e.setupContext = s.length > 1 ? Ru(e) : null, o = zn(e), i = mn(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = Ei(i);
    if (wt(), o(), (l || e.sp) && !cn(e) && ol(e), l) {
      if (i.then(wo, wo), t)
        return i.then((c) => {
          Eo(e, c);
        }).catch((c) => {
          Ns(c, e, 0);
        });
      e.asyncDep = i;
    } else
      Eo(e, i);
  } else
    Nl(e);
}
function Eo(e, t, n) {
  K(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : pe(t) && (e.setupState = Xi(t)), Nl(e);
}
function Nl(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || lt);
  {
    const r = zn(e);
    vt();
    try {
      qa(e);
    } finally {
      wt(), r();
    }
  }
}
const xu = {
  get(e, t) {
    return Ne(e, "get", ""), e[t];
  }
};
function Ru(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, xu),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Fs(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Xi(jr(e.exposed)), {
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
const Cu = /(?:^|[-_])\w/g, Au = (e) => e.replace(Cu, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Il(e, t = !0) {
  return K(e) ? e.displayName || e.name : e.name || t && e.__name;
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
  return s ? Au(s) : n ? "App" : "Anonymous";
}
function Ou(e) {
  return K(e) && "__vccOpts" in e;
}
const Ce = (e, t) => da(e, t, Vn);
function Ml(e, t, n) {
  try {
    ys(-1);
    const s = arguments.length;
    return s === 2 ? pe(t) && !z(t) ? Hn(t) ? ee(e, null, [t]) : ee(e, t) : ee(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Hn(n) && (n = [n]), ee(e, t, n));
  } finally {
    ys(1);
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
const Ll = Sr ? (e) => Sr.createHTML(e) : (e) => e, Pu = "http://www.w3.org/2000/svg", Nu = "http://www.w3.org/1998/Math/MathML", Rt = typeof document < "u" ? document : null, xo = Rt && /* @__PURE__ */ Rt.createElement("template"), Iu = {
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
      xo.innerHTML = Ll(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = xo.content;
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
const _s = /* @__PURE__ */ Symbol("_vod"), Fl = /* @__PURE__ */ Symbol("_vsh"), Ro = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: n }) {
    e[_s] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : wn(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), wn(e, !0), s.enter(e)) : s.leave(e, () => {
      wn(e, !1);
    }) : wn(e, t));
  },
  beforeUnmount(e, { value: t }) {
    wn(e, t);
  }
};
function wn(e, t) {
  e.style.display = t ? e[_s] : "none", e[Fl] = !t;
}
const Lu = /* @__PURE__ */ Symbol(""), Fu = /(?:^|;)\s*display\s*:/;
function ku(e, t, n) {
  const s = e.style, r = we(n);
  let o = !1;
  if (n && !r) {
    if (t)
      if (we(t))
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
      i && (n += ";" + i), s.cssText = n, o = Fu.test(n);
    }
  } else t && e.removeAttribute("style");
  _s in e && (e[_s] = o ? s.display : "", e[Fl] && (s.display = "none"));
}
const Co = /\s*!important$/;
function is(e, t, n) {
  if (z(n))
    n.forEach((s) => is(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Uu(e, t);
    Co.test(n) ? e.setProperty(
      Ht(s),
      n.replace(Co, ""),
      "important"
    ) : e[s] = n;
  }
}
const Ao = ["Webkit", "Moz", "ms"], nr = {};
function Uu(e, t) {
  const n = nr[t];
  if (n)
    return n;
  let s = ot(t);
  if (s !== "filter" && s in e)
    return nr[t] = s;
  s = Rs(s);
  for (let r = 0; r < Ao.length; r++) {
    const o = Ao[r] + s;
    if (o in e)
      return nr[t] = o;
  }
  return t;
}
const Oo = "http://www.w3.org/1999/xlink";
function To(e, t, n, s, r, o = Uc(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Oo, t.slice(6, t.length)) : e.setAttributeNS(Oo, t, n) : n == null || o && !Ci(n) ? e.removeAttribute(t) : e.setAttribute(
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
function $u(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const No = /* @__PURE__ */ Symbol("_vei");
function ju(e, t, n, s, r = null) {
  const o = e[No] || (e[No] = {}), i = o[t];
  if (s && i)
    i.value = s;
  else {
    const [l, c] = Hu(t);
    if (s) {
      const u = o[t] = qu(
        s,
        r
      );
      Bu(e, l, u, c);
    } else i && ($u(e, l, i, c), o[t] = void 0);
  }
}
const Io = /(?:Once|Passive|Capture)$/;
function Hu(e) {
  let t;
  if (Io.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Io); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Ht(e.slice(2)), t];
}
let sr = 0;
const Vu = /* @__PURE__ */ Promise.resolve(), Wu = () => sr || (Vu.then(() => sr = 0), sr = Date.now());
function qu(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    Et(
      Gu(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = Wu(), n;
}
function Gu(e, t) {
  if (z(t)) {
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
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, zu = (e, t, n, s, r, o) => {
  const i = r === "svg";
  t === "class" ? Mu(e, s, i) : t === "style" ? ku(e, n, s) : ws(t) ? Lr(t) || ju(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ku(e, t, s, i)) ? (Po(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && To(e, t, s, i, o, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !we(s)) ? Po(e, ot(t), s, o, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), To(e, t, s, i));
};
function Ku(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Do(t) && K(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Do(t) && we(n) ? !1 : t in e;
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
    const o = Ht(r.key);
    if (t.some(
      (i) => i === o || Ju[i] === o
    ))
      return e(r);
  }));
}, Yu = /* @__PURE__ */ De({ patchProp: zu }, Iu);
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
    !K(o) && !o.render && !o.template && (o.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
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
  return we(e) ? document.querySelector(e) : e;
}
let kl;
const ks = (e) => kl = e, Ul = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function xr(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Dn;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Dn || (Dn = {}));
function nf() {
  const e = Pi(!0), t = e.run(() => he({}));
  let n = [], s = [];
  const r = jr({
    install(o) {
      ks(r), r._a = o, o.provide(Ul, r), o.config.globalProperties.$pinia = r, s.forEach((i) => n.push(i)), s = [];
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
  return !n && Ni() && $c(r), r;
}
function tn(e, ...t) {
  e.forEach((n) => {
    n(...t);
  });
}
const sf = (e) => e(), Fo = /* @__PURE__ */ Symbol(), rr = /* @__PURE__ */ Symbol();
function Rr(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, s) => e.set(s, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const s = t[n], r = e[n];
    xr(r) && xr(s) && e.hasOwnProperty(n) && !me(s) && !Tt(s) ? e[n] = Rr(r, s) : e[n] = s;
  }
  return e;
}
const rf = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function of(e) {
  return !xr(e) || !Object.prototype.hasOwnProperty.call(e, rf);
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
    const a = Gn(n.state.value[e]);
    return Lt(a, o, Object.keys(i || {}).reduce((f, m) => (f[m] = jr(Ce(() => {
      ks(n);
      const y = n._s.get(e);
      return i[m].call(y, y);
    })), f), {}));
  }
  return c = $l(e, u, t, n, s, !0), c;
}
function $l(e, t, n = {}, s, r, o) {
  let i;
  const l = Lt({ actions: {} }, n), c = { deep: !0 };
  let u, a, f = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set(), y;
  const b = s.state.value[e];
  !o && !b && (s.state.value[e] = {}), he({});
  let v;
  function _(W) {
    let J;
    u = a = !1, typeof W == "function" ? (W(s.state.value[e]), J = {
      type: Dn.patchFunction,
      storeId: e,
      events: y
    }) : (Rr(s.state.value[e], W), J = {
      type: Dn.patchObject,
      payload: W,
      storeId: e,
      events: y
    });
    const ce = v = /* @__PURE__ */ Symbol();
    Hr().then(() => {
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
  function E() {
    i.stop(), f.clear(), m.clear(), s._s.delete(e);
  }
  const C = (W, J = "") => {
    if (Fo in W)
      return W[rr] = J, W;
    const ce = function() {
      ks(s);
      const ge = Array.from(arguments), Se = /* @__PURE__ */ new Set(), ye = /* @__PURE__ */ new Set();
      function Te(V) {
        Se.add(V);
      }
      function ze(V) {
        ye.add(V);
      }
      tn(m, {
        args: ge,
        name: ce[rr],
        store: M,
        after: Te,
        onError: ze
      });
      let Z;
      try {
        Z = W.apply(this && this.$id === e ? this : M, ge);
      } catch (V) {
        throw tn(ye, V), V;
      }
      return Z instanceof Promise ? Z.then((V) => (tn(Se, V), V)).catch((V) => (tn(ye, V), Promise.reject(V))) : (tn(Se, Z), Z);
    };
    return ce[Fo] = !0, ce[rr] = J, ce;
  }, R = {
    _p: s,
    // _s: scope,
    $id: e,
    $onAction: Lo.bind(null, m),
    $patch: _,
    $reset: T,
    $subscribe(W, J = {}) {
      const ce = Lo(f, W, J.detached, () => ge()), ge = i.run(() => _t(() => s.state.value[e], (Se) => {
        (J.flush === "sync" ? a : u) && W({
          storeId: e,
          type: Dn.direct,
          events: y
        }, Se);
      }, Lt({}, c, J)));
      return ce;
    },
    $dispose: E
  }, M = qn(R);
  s._s.set(e, M);
  const D = (s._a && s._a.runWithContext || sf)(() => s._e.run(() => (i = Pi()).run(() => t({ action: C }))));
  for (const W in D) {
    const J = D[W];
    if (me(J) && !lf(J) || Tt(J))
      o || (b && of(J) && (me(J) ? J.value = b[W] : Rr(J, b[W])), s.state.value[e][W] = J);
    else if (typeof J == "function") {
      const ce = C(J, W);
      D[W] = ce, l.actions[W] = J;
    }
  }
  return Lt(M, D), Lt(se(M), D), Object.defineProperty(M, "$state", {
    get: () => s.state.value[e],
    set: (W) => {
      _((J) => {
        Lt(J, W);
      });
    }
  }), s._p.forEach((W) => {
    Lt(M, i.run(() => W({
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
    i || (c ? Ze(Ul, null) : null), i && ks(i), i = kl, i._s.has(e) || (r ? $l(e, t, s, i) : cf(e, s, i)), i._s.get(e);
  }
  return o.$id = e, o;
}
const Us = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, uf = {};
function ff(e, t) {
  const n = ja("router-view");
  return q(), Fe(n);
}
const df = /* @__PURE__ */ Us(uf, [["render", ff]]), sn = typeof document < "u";
function jl(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function hf(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module" || e.default && jl(e.default);
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
function ko(e, t) {
  const n = {};
  for (const s in e) n[s] = s in t ? t[s] : e[s];
  return n;
}
const Hl = /#/g, pf = /&/g, mf = /\//g, gf = /=/g, yf = /\?/g, Vl = /\+/g, bf = /%5B/g, _f = /%5D/g, Wl = /%5E/g, vf = /%60/g, ql = /%7B/g, wf = /%7C/g, Gl = /%7D/g, Ef = /%20/g;
function Xr(e) {
  return e == null ? "" : encodeURI("" + e).replace(wf, "|").replace(bf, "[").replace(_f, "]");
}
function Sf(e) {
  return Xr(e).replace(ql, "{").replace(Gl, "}").replace(Wl, "^");
}
function Cr(e) {
  return Xr(e).replace(Vl, "%2B").replace(Ef, "+").replace(Hl, "%23").replace(pf, "%26").replace(vf, "`").replace(ql, "{").replace(Gl, "}").replace(Wl, "^");
}
function xf(e) {
  return Cr(e).replace(gf, "%3D");
}
function Rf(e) {
  return Xr(e).replace(Hl, "%23").replace(yf, "%3F");
}
function Cf(e) {
  return Rf(e).replace(mf, "%2F");
}
function Wn(e) {
  if (e == null) return null;
  try {
    return decodeURIComponent("" + e);
  } catch {
  }
  return "" + e;
}
const Af = /\/$/, Of = (e) => e.replace(Af, "");
function ir(e, t, n = "/") {
  let s, r = {}, o = "", i = "";
  const l = t.indexOf("#");
  let c = t.indexOf("?");
  return c = l >= 0 && c > l ? -1 : c, c >= 0 && (s = t.slice(0, c), o = t.slice(c, l > 0 ? l : t.length), r = e(o.slice(1))), l >= 0 && (s = s || t.slice(0, l), i = t.slice(l, t.length)), s = If(s ?? t, n), {
    fullPath: s + o + i,
    path: s,
    query: r,
    hash: Wn(i)
  };
}
function Tf(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Uo(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function Pf(e, t, n) {
  const s = t.matched.length - 1, r = n.matched.length - 1;
  return s > -1 && s === r && dn(t.matched[s], n.matched[r]) && zl(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function dn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function zl(e, t) {
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
let Ar = /* @__PURE__ */ (function(e) {
  return e.pop = "pop", e.push = "push", e;
})({}), lr = /* @__PURE__ */ (function(e) {
  return e.back = "back", e.forward = "forward", e.unknown = "", e;
})({});
function Df(e) {
  if (!e) if (sn) {
    const t = document.querySelector("base");
    e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
  } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Of(e);
}
const Mf = /^[^#]+#/;
function Lf(e, t) {
  return e.replace(Mf, "#") + t;
}
function Ff(e, t) {
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
function kf(e) {
  let t;
  if ("el" in e) {
    const n = e.el, s = typeof n == "string" && n.startsWith("#"), r = typeof n == "string" ? s ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!r)
      return;
    t = Ff(r, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function $o(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Or = /* @__PURE__ */ new Map();
function Uf(e, t) {
  Or.set(e, t);
}
function Bf(e) {
  const t = Or.get(e);
  return Or.delete(e), t;
}
function $f(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function Kl(e) {
  return typeof e == "string" || typeof e == "symbol";
}
let be = /* @__PURE__ */ (function(e) {
  return e[e.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", e[e.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", e[e.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", e[e.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", e[e.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", e;
})({});
const Jl = /* @__PURE__ */ Symbol("");
be.MATCHER_NOT_FOUND + "", be.NAVIGATION_GUARD_REDIRECT + "", be.NAVIGATION_ABORTED + "", be.NAVIGATION_CANCELLED + "", be.NAVIGATION_DUPLICATED + "";
function hn(e, t) {
  return oe(/* @__PURE__ */ new Error(), {
    type: e,
    [Jl]: !0
  }, t);
}
function xt(e, t) {
  return e instanceof Error && Jl in e && (t == null || !!(e.type & t));
}
const jf = [
  "params",
  "query",
  "hash"
];
function Hf(e) {
  if (typeof e == "string") return e;
  if (e.path != null) return e.path;
  const t = {};
  for (const n of jf) n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
function Vf(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const n = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < n.length; ++s) {
    const r = n[s].replace(Vl, " "), o = r.indexOf("="), i = Wn(o < 0 ? r : r.slice(0, o)), l = o < 0 ? null : Wn(r.slice(o + 1));
    if (i in t) {
      let c = t[i];
      ut(c) || (c = t[i] = [c]), c.push(l);
    } else t[i] = l;
  }
  return t;
}
function jo(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (n = xf(n), s == null) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (ut(s) ? s.map((r) => r && Cr(r)) : [s && Cr(s)]).forEach((r) => {
      r !== void 0 && (t += (t.length ? "&" : "") + n, r != null && (t += "=" + r));
    });
  }
  return t;
}
function Wf(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 && (t[n] = ut(s) ? s.map((r) => r == null ? null : "" + r) : s == null ? s : "" + s);
  }
  return t;
}
const qf = /* @__PURE__ */ Symbol(""), Ho = /* @__PURE__ */ Symbol(""), $s = /* @__PURE__ */ Symbol(""), Yr = /* @__PURE__ */ Symbol(""), Tr = /* @__PURE__ */ Symbol("");
function En() {
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
function $t(e, t, n, s, r, o = (i) => i()) {
  const i = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
  return () => new Promise((l, c) => {
    const u = (m) => {
      m === !1 ? c(hn(be.NAVIGATION_ABORTED, {
        from: n,
        to: t
      })) : m instanceof Error ? c(m) : $f(m) ? c(hn(be.NAVIGATION_GUARD_REDIRECT, {
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
        if (jl(c)) {
          const u = (c.__vccOpts || c)[t];
          u && o.push($t(u, n, s, i, l, r));
        } else {
          let u = c();
          o.push(() => u.then((a) => {
            if (!a) throw new Error(`Couldn't resolve component "${l}" at "${i.path}"`);
            const f = hf(a) ? a.default : a;
            i.mods[l] = a, i.components[l] = f;
            const m = (f.__vccOpts || f)[t];
            return m && $t(m, n, s, i, l, r)();
          }));
        }
    }
  return o;
}
function Gf(e, t) {
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
let zf = () => location.protocol + "//" + location.host;
function Xl(e, t) {
  const { pathname: n, search: s, hash: r } = t, o = e.indexOf("#");
  if (o > -1) {
    let i = r.includes(e.slice(o)) ? e.slice(o).length : 1, l = r.slice(i);
    return l[0] !== "/" && (l = "/" + l), Uo(l, "");
  }
  return Uo(n, e) + s + r;
}
function Kf(e, t, n, s) {
  let r = [], o = [], i = null;
  const l = ({ state: m }) => {
    const y = Xl(e, location), b = n.value, v = t.value;
    let _ = 0;
    if (m) {
      if (n.value = y, t.value = m, i && i === b) {
        i = null;
        return;
      }
      _ = v ? m.position - v.position : 0;
    } else s(y);
    r.forEach((T) => {
      T(n.value, b, {
        delta: _,
        type: Ar.pop,
        direction: _ ? _ > 0 ? lr.forward : lr.back : lr.unknown
      });
    });
  };
  function c() {
    i = n.value;
  }
  function u(m) {
    r.push(m);
    const y = () => {
      const b = r.indexOf(m);
      b > -1 && r.splice(b, 1);
    };
    return o.push(y), y;
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
function Vo(e, t, n, s = !1, r = !1) {
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
    const f = e.indexOf("#"), m = f > -1 ? (n.host && document.querySelector("base") ? e : e.slice(f)) + c : zf() + e + c;
    try {
      t[a ? "replaceState" : "pushState"](u, "", m), r.value = u;
    } catch (y) {
      console.error(y), n[a ? "replace" : "assign"](m);
    }
  }
  function i(c, u) {
    o(c, oe({}, t.state, Vo(r.value.back, c, r.value.forward, !0), u, { position: r.value.position }), !0), s.value = c;
  }
  function l(c, u) {
    const a = oe({}, r.value, t.state, {
      forward: c,
      scroll: Bs()
    });
    o(a.current, a, !0), o(c, oe({}, Vo(s.value, c, null), { position: a.position + 1 }, u), !1), s.value = c;
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
  const t = Jf(e), n = Kf(e, t.state, t.location, t.replace);
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
let Kt = /* @__PURE__ */ (function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.Group = 2] = "Group", e;
})({});
var Re = /* @__PURE__ */ (function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.ParamRegExp = 2] = "ParamRegExp", e[e.ParamRegExpEnd = 3] = "ParamRegExpEnd", e[e.EscapeNext = 4] = "EscapeNext", e;
})(Re || {});
const Qf = {
  type: Kt.Static,
  value: ""
}, Zf = /[a-zA-Z0-9_]/;
function ed(e) {
  if (!e) return [[]];
  if (e === "/") return [[Qf]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(y) {
    throw new Error(`ERR (${n})/"${u}": ${y}`);
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
      type: Kt.Static,
      value: u
    }) : n === Re.Param || n === Re.ParamRegExp || n === Re.ParamRegExpEnd ? (o.length > 1 && (c === "*" || c === "+") && t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`), o.push({
      type: Kt.Param,
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
const Wo = "[^/]+?", td = {
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
      let y = Le.Segment + (n.sensitive ? Le.BonusCaseSensitive : 0);
      if (m.type === Kt.Static)
        f || (r += "/"), r += m.value.replace(nd, "\\$&"), y += Le.Static;
      else if (m.type === Kt.Param) {
        const { value: b, repeatable: v, optional: _, regexp: T } = m;
        o.push({
          name: b,
          repeatable: v,
          optional: _
        });
        const E = T || Wo;
        if (E !== Wo) {
          y += Le.BonusCustomRegExp;
          try {
            `${E}`;
          } catch (R) {
            throw new Error(`Invalid custom RegExp for param "${b}" (${E}): ` + R.message);
          }
        }
        let C = v ? `((?:${E})(?:/(?:${E}))*)` : `(${E})`;
        f || (C = _ && u.length < 2 ? `(?:/${C})` : "/" + C), _ && (C += "?"), r += C, y += Le.Dynamic, _ && (y += Le.BonusOptional), v && (y += Le.BonusRepeatable), E === ".*" && (y += Le.BonusWildcard);
      }
      a.push(y);
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
      const y = a[m] || "", b = o[m - 1];
      f[b.name] = y && b.repeatable ? y.split("/") : y;
    }
    return f;
  }
  function c(u) {
    let a = "", f = !1;
    for (const m of e) {
      (!f || !a.endsWith("/")) && (a += "/"), f = !1;
      for (const y of m) if (y.type === Kt.Static) a += y.value;
      else if (y.type === Kt.Param) {
        const { value: b, repeatable: v, optional: _ } = y, T = b in u ? u[b] : "";
        if (ut(T) && !v) throw new Error(`Provided param "${b}" is an array but it is not repeatable (* or + modifiers)`);
        const E = ut(T) ? T.join("/") : T;
        if (!E) if (_)
          m.length < 2 && (a.endsWith("/") ? a = a.slice(0, -1) : f = !0);
        else throw new Error(`Missing required param "${b}"`);
        a += E;
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
    if (qo(s)) return 1;
    if (qo(r)) return -1;
  }
  return r.length - s.length;
}
function qo(e) {
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
  t = ko(od, t);
  function r(f) {
    return s.get(f);
  }
  function o(f, m, y) {
    const b = !y, v = zo(f);
    v.aliasOf = y && y.record;
    const _ = ko(t, f), T = [v];
    if ("alias" in f) {
      const R = typeof f.alias == "string" ? [f.alias] : f.alias;
      for (const M of R) T.push(zo(oe({}, v, {
        components: y ? y.record.components : v.components,
        path: M,
        aliasOf: y ? y.record : v
      })));
    }
    let E, C;
    for (const R of T) {
      const { path: M } = R;
      if (m && M[0] !== "/") {
        const U = m.record.path, D = U[U.length - 1] === "/" ? "" : "/";
        R.path = m.record.path + (M && D + M);
      }
      if (E = id(R, m, _), y ? y.alias.push(E) : (C = C || E, C !== E && C.alias.push(E), b && f.name && !Ko(E) && i(f.name)), Ql(E) && c(E), v.children) {
        const U = v.children;
        for (let D = 0; D < U.length; D++) o(U[D], E, y && y.children[D]);
      }
      y = y || E;
    }
    return C ? () => {
      i(C);
    } : Mn;
  }
  function i(f) {
    if (Kl(f)) {
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
    n.splice(m, 0, f), f.record.name && !Ko(f) && s.set(f.record.name, f);
  }
  function u(f, m) {
    let y, b = {}, v, _;
    if ("name" in f && f.name) {
      if (y = s.get(f.name), !y) throw hn(be.MATCHER_NOT_FOUND, { location: f });
      _ = y.record.name, b = oe(Go(m.params, y.keys.filter((C) => !C.optional).concat(y.parent ? y.parent.keys.filter((C) => C.optional) : []).map((C) => C.name)), f.params && Go(f.params, y.keys.map((C) => C.name))), v = y.stringify(b);
    } else if (f.path != null)
      v = f.path, y = n.find((C) => C.re.test(v)), y && (b = y.parse(v), _ = y.record.name);
    else {
      if (y = m.name ? s.get(m.name) : n.find((C) => C.re.test(m.path)), !y) throw hn(be.MATCHER_NOT_FOUND, {
        location: f,
        currentLocation: m
      });
      _ = y.record.name, b = oe({}, m.params, f.params), v = y.stringify(b);
    }
    const T = [];
    let E = y;
    for (; E; )
      T.unshift(E.record), E = E.parent;
    return {
      name: _,
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
function Go(e, t) {
  const n = {};
  for (const s of t) s in e && (n[s] = e[s]);
  return n;
}
function zo(e) {
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
function Ko(e) {
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
  const t = Ze($s), n = Ze(Yr), s = Ce(() => {
    const c = B(e.to);
    return t.resolve(c);
  }), r = Ce(() => {
    const { matched: c } = s.value, { length: u } = c, a = c[u - 1], f = n.matched;
    if (!a || !f.length) return -1;
    const m = f.findIndex(dn.bind(null, a));
    if (m > -1) return m;
    const y = Xo(c[u - 2]);
    return u > 1 && Xo(a) === y && f[f.length - 1].path !== y ? f.findIndex(dn.bind(null, c[u - 2])) : m;
  }), o = Ce(() => r.value > -1 && gd(n.params, s.value.params)), i = Ce(() => r.value > -1 && r.value === n.matched.length - 1 && zl(n.params, s.value.params));
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
const hd = /* @__PURE__ */ Be({
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
    const n = qn(Jo(e)), { options: s } = Ze($s), r = Ce(() => ({
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
}), pd = hd;
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
const Yo = (e, t, n) => e ?? t ?? n, yd = /* @__PURE__ */ Be({
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
    const s = Ze(Tr), r = Ce(() => e.route || s.value), o = Ze(Ho, 0), i = Ce(() => {
      let u = B(o);
      const { matched: a } = r.value;
      let f;
      for (; (f = a[u]) && !f.components; ) u++;
      return u;
    }), l = Ce(() => r.value.matched[i.value]);
    Tn(Ho, Ce(() => i.value + 1)), Tn(qf, l), Tn(Tr, r);
    const c = he();
    return _t(() => [
      c.value,
      l.value,
      e.name
    ], ([u, a, f], [m, y, b]) => {
      a && (a.instances[f] = u, y && y !== a && u && u === m && (a.leaveGuards.size || (a.leaveGuards = y.leaveGuards), a.updateGuards.size || (a.updateGuards = y.updateGuards))), u && a && (!y || !dn(a, y) || !m) && (a.enterCallbacks[f] || []).forEach((v) => v(u));
    }, { flush: "post" }), () => {
      const u = r.value, a = e.name, f = l.value, m = f && f.components[a];
      if (!m) return Qo(n.default, {
        Component: m,
        route: u
      });
      const y = f.props[a], b = y ? y === !0 ? u.params : typeof y == "function" ? y(u) : y : null, _ = Ml(m, oe({}, b, t, {
        onVnodeUnmounted: (T) => {
          T.component.isUnmounted && (f.instances[a] = null);
        },
        ref: c
      }));
      return Qo(n.default, {
        Component: _,
        route: u
      }) || _;
    };
  }
});
function Qo(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const bd = yd;
function _d(e) {
  const t = ld(e.routes, e), n = e.parseQuery || Vf, s = e.stringifyQuery || jo, r = e.history, o = En(), i = En(), l = En(), c = ia(Mt);
  let u = Mt;
  sn && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const a = or.bind(null, (A) => "" + A), f = or.bind(null, Cf), m = or.bind(null, Wn);
  function y(A, k) {
    let L, $;
    return Kl(A) ? (L = t.getRecordMatcher(A), $ = k) : $ = A, t.addRoute($, L);
  }
  function b(A) {
    const k = t.getRecordMatcher(A);
    k && t.removeRoute(k);
  }
  function v() {
    return t.getRoutes().map((A) => A.record);
  }
  function _(A) {
    return !!t.getRecordMatcher(A);
  }
  function T(A, k) {
    if (k = oe({}, k || c.value), typeof A == "string") {
      const h = ir(n, A, k.path), g = t.resolve({ path: h.path }, k), w = r.createHref(h.fullPath);
      return oe(h, g, {
        params: m(g.params),
        hash: Wn(h.hash),
        redirectedFrom: void 0,
        href: w
      });
    }
    let L;
    if (A.path != null)
      L = oe({}, A, { path: ir(n, A.path, k.path).path });
    else {
      const h = oe({}, A.params);
      for (const g in h) h[g] == null && delete h[g];
      L = oe({}, A, { params: f(h) }), k.params = f(k.params);
    }
    const $ = t.resolve(L, k), te = A.hash || "";
    $.params = a(m($.params));
    const d = Tf(s, oe({}, A, {
      hash: Sf(te),
      path: $.path
    })), p = r.createHref(d);
    return oe({
      fullPath: d,
      hash: te,
      query: s === jo ? Wf(A.query) : A.query || {}
    }, $, {
      redirectedFrom: void 0,
      href: p
    });
  }
  function E(A) {
    return typeof A == "string" ? ir(n, A, c.value.path) : oe({}, A);
  }
  function C(A, k) {
    if (u !== A) return hn(be.NAVIGATION_CANCELLED, {
      from: k,
      to: A
    });
  }
  function R(A) {
    return D(A);
  }
  function M(A) {
    return R(oe(E(A), { replace: !0 }));
  }
  function U(A, k) {
    const L = A.matched[A.matched.length - 1];
    if (L && L.redirect) {
      const { redirect: $ } = L;
      let te = typeof $ == "function" ? $(A, k) : $;
      return typeof te == "string" && (te = te.includes("?") || te.includes("#") ? te = E(te) : { path: te }, te.params = {}), oe({
        query: A.query,
        hash: A.hash,
        params: te.path != null ? {} : A.params
      }, te);
    }
  }
  function D(A, k) {
    const L = u = T(A), $ = c.value, te = A.state, d = A.force, p = A.replace === !0, h = U(L, $);
    if (h) return D(oe(E(h), {
      state: typeof h == "object" ? oe({}, te, h.state) : te,
      force: d,
      replace: p
    }), k || L);
    const g = L;
    g.redirectedFrom = k;
    let w;
    return !d && Pf(s, $, L) && (w = hn(be.NAVIGATION_DUPLICATED, {
      to: g,
      from: $
    }), _e($, $, !0, !1)), (w ? Promise.resolve(w) : ce(g, $)).catch((x) => xt(x) ? xt(x, be.NAVIGATION_GUARD_REDIRECT) ? x : et(x) : Y(x, g, $)).then((x) => {
      if (x) {
        if (xt(x, be.NAVIGATION_GUARD_REDIRECT))
          return D(oe({ replace: p }, E(x.to), {
            state: typeof x.to == "object" ? oe({}, te, x.to.state) : te,
            force: d
          }), k || g);
      } else x = Se(g, $, !0, p, te);
      return ge(g, $, x), x;
    });
  }
  function W(A, k) {
    const L = C(A, k);
    return L ? Promise.reject(L) : Promise.resolve();
  }
  function J(A) {
    const k = Ke.values().next().value;
    return k && typeof k.runWithContext == "function" ? k.runWithContext(A) : A();
  }
  function ce(A, k) {
    let L;
    const [$, te, d] = Gf(A, k);
    L = cr($.reverse(), "beforeRouteLeave", A, k);
    for (const h of $) h.leaveGuards.forEach((g) => {
      L.push($t(g, A, k));
    });
    const p = W.bind(null, A, k);
    return L.push(p), je(L).then(() => {
      L = [];
      for (const h of o.list()) L.push($t(h, A, k));
      return L.push(p), je(L);
    }).then(() => {
      L = cr(te, "beforeRouteUpdate", A, k);
      for (const h of te) h.updateGuards.forEach((g) => {
        L.push($t(g, A, k));
      });
      return L.push(p), je(L);
    }).then(() => {
      L = [];
      for (const h of d) if (h.beforeEnter) if (ut(h.beforeEnter)) for (const g of h.beforeEnter) L.push($t(g, A, k));
      else L.push($t(h.beforeEnter, A, k));
      return L.push(p), je(L);
    }).then(() => (A.matched.forEach((h) => h.enterCallbacks = {}), L = cr(d, "beforeRouteEnter", A, k, J), L.push(p), je(L))).then(() => {
      L = [];
      for (const h of i.list()) L.push($t(h, A, k));
      return L.push(p), je(L);
    }).catch((h) => xt(h, be.NAVIGATION_CANCELLED) ? h : Promise.reject(h));
  }
  function ge(A, k, L) {
    l.list().forEach(($) => J(() => $(A, k, L)));
  }
  function Se(A, k, L, $, te) {
    const d = C(A, k);
    if (d) return d;
    const p = k === Mt, h = sn ? history.state : {};
    L && ($ || p ? r.replace(A.fullPath, oe({ scroll: p && h && h.scroll }, te)) : r.push(A.fullPath, te)), c.value = A, _e(A, k, L, p), et();
  }
  let ye;
  function Te() {
    ye || (ye = r.listen((A, k, L) => {
      if (!nt.listening) return;
      const $ = T(A), te = U($, nt.currentRoute.value);
      if (te) {
        D(oe(te, {
          replace: !0,
          force: !0
        }), $).catch(Mn);
        return;
      }
      u = $;
      const d = c.value;
      sn && Uf($o(d.fullPath, L.delta), Bs()), ce($, d).catch((p) => xt(p, be.NAVIGATION_ABORTED | be.NAVIGATION_CANCELLED) ? p : xt(p, be.NAVIGATION_GUARD_REDIRECT) ? (D(oe(E(p.to), { force: !0 }), $).then((h) => {
        xt(h, be.NAVIGATION_ABORTED | be.NAVIGATION_DUPLICATED) && !L.delta && L.type === Ar.pop && r.go(-1, !1);
      }).catch(Mn), Promise.reject()) : (L.delta && r.go(-L.delta, !1), Y(p, $, d))).then((p) => {
        p = p || Se($, d, !1), p && (L.delta && !xt(p, be.NAVIGATION_CANCELLED) ? r.go(-L.delta, !1) : L.type === Ar.pop && xt(p, be.NAVIGATION_ABORTED | be.NAVIGATION_DUPLICATED) && r.go(-1, !1)), ge($, d, p);
      }).catch(Mn);
    }));
  }
  let ze = En(), Z = En(), V;
  function Y(A, k, L) {
    et(A);
    const $ = Z.list();
    return $.length ? $.forEach((te) => te(A, k, L)) : console.error(A), Promise.reject(A);
  }
  function $e() {
    return V && c.value !== Mt ? Promise.resolve() : new Promise((A, k) => {
      ze.add([A, k]);
    });
  }
  function et(A) {
    return V || (V = !A, Te(), ze.list().forEach(([k, L]) => A ? L(A) : k()), ze.reset()), A;
  }
  function _e(A, k, L, $) {
    const { scrollBehavior: te } = e;
    if (!sn || !te) return Promise.resolve();
    const d = !L && Bf($o(A.fullPath, 0)) || ($ || !L) && history.state && history.state.scroll || null;
    return Hr().then(() => te(A, k, d)).then((p) => p && kf(p)).catch((p) => Y(p, A, k));
  }
  const ue = (A) => r.go(A);
  let tt;
  const Ke = /* @__PURE__ */ new Set(), nt = {
    currentRoute: c,
    listening: !0,
    addRoute: y,
    removeRoute: b,
    clearRoutes: t.clearRoutes,
    hasRoute: _,
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
    isReady: $e,
    install(A) {
      A.component("RouterLink", pd), A.component("RouterView", bd), A.config.globalProperties.$router = nt, Object.defineProperty(A.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => B(c)
      }), sn && !tt && c.value === Mt && (tt = !0, R(r.location).catch(($) => {
      }));
      const k = {};
      for (const $ in Mt) Object.defineProperty(k, $, {
        get: () => c.value[$],
        enumerable: !0
      });
      A.provide($s, nt), A.provide(Yr, Ki(k)), A.provide(Tr, c);
      const L = A.unmount;
      Ke.add(A), A.unmount = function() {
        Ke.delete(A), Ke.size < 1 && (u = Mt, ye && ye(), ye = null, c.value = Mt, tt = !1, V = !1), L();
      };
    }
  };
  function je(A) {
    return A.reduce((k, L) => k.then(() => J(L)), Promise.resolve());
  }
  return nt;
}
function vd() {
  return Ze($s);
}
function Zl(e) {
  return Ze(Yr);
}
const ec = /* @__PURE__ */ af("counter", () => {
  const e = he("");
  return {
    currentPath: e,
    setPath: (n) => {
      e.value = n;
    }
  };
}), wd = { class: "side" }, Ed = { class: "side-content-title" }, Sd = ["onClick"], xd = /* @__PURE__ */ Be({
  __name: "Side",
  props: {
    catalogList: {},
    current: {}
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = Gn(n).catalogList, o = (i, l) => {
      s("change", { type: i, child: l });
    };
    return (i, l) => (q(), re("div", wd, [
      (q(!0), re(xe, null, $n(B(r), (c) => (q(), re("div", {
        key: c.id,
        class: "side-content"
      }, [
        Q("p", Ed, it(c.name), 1),
        (q(!0), re(xe, null, $n(c.children, (u) => (q(), re("div", {
          key: u.mid,
          class: Vt({
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
    return (t, n) => (q(), re("button", {
      class: Vt([
        "meme-button",
        {
          disabled: e.disabled
        }
      ])
    }, [
      qr(t.$slots, "default", {}, () => [
        Kr(it(e.label), 1)
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
    const n = he(null), s = (o) => {
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
function Ad(e, t, n, s, r, o) {
  return q(), re("input", {
    ref: "input",
    class: Vt([
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
const st = /* @__PURE__ */ Us(Rd, [["render", Ad]]), Od = { class: "meme-file-upload" }, Td = { class: "file-button" }, Pd = {
  key: 0,
  class: "file-preview"
}, Nd = ["src", "alt"], Id = { class: "file-preview-info" }, Dd = { class: "file-preview-name" }, Md = { class: "file-preview-size" }, Ld = {
  key: 1,
  class: "file-tips"
}, Fd = 1 * 1024 * 1024, kd = /* @__PURE__ */ Be({
  __name: "FileUpload",
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = Ze("commands"), s = t, r = he(""), o = he(null), i = (v) => {
      const _ = v.target.files;
      if (!_)
        return !1;
      m(_);
    }, l = (v) => {
      v.stopPropagation(), v.preventDefault();
    }, c = (v) => {
      v.stopPropagation(), v.preventDefault();
    }, u = (v) => {
      v.stopPropagation(), v.preventDefault();
      const _ = v.dataTransfer.files;
      m(_);
    }, a = (v) => {
      v.stopPropagation(), v.preventDefault();
      const _ = v.clipboardData.files;
      m(_);
    }, f = /^image\//, m = (v) => {
      if (v.length !== 1)
        return y("不支持多个文件同时操作，请仅选择单个文件"), !1;
      const _ = v[0];
      if (!_)
        return y("请选择文件"), !1;
      const { name: T, size: E, type: C } = _;
      if (!f.test(C))
        return y(`当前文件类型为${C}，类型不符，请选择图片类型！`), !1;
      const R = T.replace(/\.\w*$/g, "");
      if (n.value.includes(R))
        return y(`当前文件名称【${T}】与系统默认关键指令【${R}】冲突，请重命名上传文件！`), !1;
      if (E > Fd)
        return y("文件超过最大限制1M，请重新选择"), !1;
      const M = new FileReader();
      M.onload = (U) => {
        const D = U.target.result;
        b(T, D);
      }, M.onerror = () => {
        y(M.error.message);
      }, M.readAsDataURL(_);
    }, y = (v) => {
      alert(v);
    }, b = (v, _) => {
      r.value = _;
      const T = new Image();
      T.onload = () => {
        const E = v.slice(v.lastIndexOf(".") + 1), C = v.slice(0, v.lastIndexOf(".")) || v;
        o.value = {
          name: C,
          ext: E,
          width: T.naturalWidth,
          height: T.naturalHeight
        };
      }, T.src = _, s("change", {
        name: v,
        base64: _
      });
    };
    return (v, _) => (q(), re("div", Od, [
      Q("div", Td, [
        _[0] || (_[0] = Q("i", { class: "file-glyphicon" }, null, -1)),
        _[1] || (_[1] = Q("span", null, "UPLOAD FILE", -1)),
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
        r.value && o.value ? (q(), re("div", Pd, [
          Q("img", {
            src: r.value,
            alt: o.value.name,
            class: "file-preview-image"
          }, null, 8, Nd),
          Q("div", Id, [
            Q("div", Dd, it(o.value.name) + "." + it(o.value.ext), 1),
            Q("div", Md, it(o.value.width) + " × " + it(o.value.height), 1)
          ])
        ])) : (q(), re("i", Ld, "Drop files here to upload"))
      ], 32)
    ]));
  }
}), Ud = ["value", "selected"], ls = /* @__PURE__ */ Be({
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
    return (r, o) => (q(), re("select", {
      class: "meme-select",
      name: "select",
      onChange: s
    }, [
      (q(!0), re(xe, null, $n(e.options, (i) => (q(), re("option", {
        key: i.value,
        class: "meme-option",
        value: i.value,
        selected: e.selected === i.value
      }, it(i.label), 9, Ud))), 128))
    ], 32));
  }
}), Bd = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 32 32"
}, $d = ["fill"], Zo = /* @__PURE__ */ Be({
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
    return (i, l) => (q(), Fe(B(Ct), {
      class: "dice-button",
      u: "icon",
      onClick: o
    }, {
      default: Bn(() => [
        (q(), re("svg", Bd, [
          l[0] || (l[0] = Q("title", null, "dice", -1)),
          Q("path", {
            fill: r.value,
            d: "M27 6h-16c-2.75 0-5 2.25-5 5v16c0 2.75 2.25 5 5 5h16c2.75 0 5-2.25 5-5v-16c0-2.75-2.25-5-5-5zM13 28c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM13 16c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM19 22c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25 28c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25 16c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25.899 4c-0.467-2.275-2.491-4-4.899-4h-16c-2.75 0-5 2.25-5 5v16c0 2.408 1.725 4.432 4 4.899v-19.899c0-1.1 0.9-2 2-2h19.899z"
          }, null, 8, $d)
        ]))
      ]),
      _: 1
    }));
  }
}), jd = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 32 32"
}, Hd = ["fill"], Vd = /* @__PURE__ */ Be({
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
    return (i, l) => (q(), Fe(B(Ct), {
      class: "picker-button",
      u: "icon",
      onClick: o
    }, {
      default: Bn(() => [
        (q(), re("svg", jd, [
          l[0] || (l[0] = Q("title", null, "picker", -1)),
          Q("path", {
            fill: r.value,
            d: "M30.828 1.172c-1.562-1.562-4.095-1.562-5.657 0l-5.379 5.379-3.793-3.793-4.243 4.243 3.326 3.326-14.754 14.754c-0.252 0.252-0.358 0.592-0.322 0.921h-0.008v5c0 0.552 0.448 1 1 1h5c0 0 0.083 0 0.125 0 0.288 0 0.576-0.11 0.795-0.329l14.754-14.754 3.326 3.326 4.243-4.243-3.793-3.793 5.379-5.379c1.562-1.562 1.562-4.095 0-5.657zM5.409 30h-3.409v-3.409l14.674-14.674 3.409 3.409-14.674 14.674z"
          }, null, 8, Hd)
        ]))
      ]),
      _: 1
    }));
  }
}), Wd = { class: "property text-property" }, qd = /* @__PURE__ */ Be({
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
    const n = e, s = t, { max: r, size: o, font: i, color: l, align: c, direction: u, blur: a, degree: f, stroke: m, swidth: y, content: b } = Gn(n), v = [
      { label: "Sans Serif", value: "sans-serif" },
      { label: "Serif", value: "serif" },
      { label: "Monospace", value: "monospace" },
      { label: "Cursive", value: "cursive" },
      { label: "Fantasy", value: "fantasy" }
    ], _ = [
      { label: "Start", value: "start" },
      { label: "Center", value: "center" },
      { label: "End", value: "end" }
    ], T = [
      { label: "Up", value: "up" },
      { label: "Center", value: "center" },
      { label: "Down", value: "down" }
    ], E = (M, U) => {
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
        swidth: y.value,
        content: b.value
      }, W = ["color", "align", "direction", "stroke", "font", "content"].includes(U);
      D[U] = W ? M : parseInt(M), s("change", D);
    }, C = (M) => {
      const U = "#" + Math.floor(Math.random() * 16777215).toString(16);
      E(U, M);
    }, R = () => {
      s("pick");
    };
    return (M, U) => (q(), re("div", Wd, [
      qr(M.$slots, "default"),
      ee(B(st), {
        class: "property-content",
        title: "content",
        placeholder: "附加文本",
        value: B(b),
        "onUpdate:modelValue": U[0] || (U[0] = (D) => E(D, "content"))
      }, null, 8, ["value"]),
      ee(B(st), {
        class: "property-max",
        title: "max",
        value: B(r),
        "onUpdate:modelValue": U[1] || (U[1] = (D) => E(D, "max"))
      }, null, 8, ["value"]),
      ee(B(st), {
        class: "property-size",
        title: "size",
        value: B(o),
        "onUpdate:modelValue": U[2] || (U[2] = (D) => E(D, "size"))
      }, null, 8, ["value"]),
      ee(B(ls), {
        class: "property-font",
        options: v,
        selected: B(i),
        "onUpdate:modelValue": U[3] || (U[3] = (D) => E(D, "font"))
      }, null, 8, ["selected"]),
      ee(B(st), {
        class: "property-color",
        title: "color",
        value: B(l),
        "onUpdate:modelValue": U[4] || (U[4] = (D) => E(D, "color"))
      }, null, 8, ["value"]),
      ee(Zo, {
        color: B(l),
        onClick: U[5] || (U[5] = (D) => C("color"))
      }, null, 8, ["color"]),
      ee(Vd, {
        color: B(l),
        onClick: R
      }, null, 8, ["color"]),
      ee(B(st), {
        class: "property-color",
        title: "stroke",
        value: B(m),
        "onUpdate:modelValue": U[6] || (U[6] = (D) => E(D, "stroke"))
      }, null, 8, ["value"]),
      ee(Zo, {
        color: B(m),
        onClick: U[7] || (U[7] = (D) => C("stroke"))
      }, null, 8, ["color"]),
      ee(B(st), {
        class: "property-swidth",
        value: B(y),
        title: "swidth",
        "onUpdate:modelValue": U[8] || (U[8] = (D) => E(D, "swidth"))
      }, null, 8, ["value"]),
      ee(B(ls), {
        class: "property-align",
        options: _,
        selected: B(c),
        "onUpdate:modelValue": U[9] || (U[9] = (D) => E(D, "align"))
      }, null, 8, ["selected"]),
      ee(B(ls), {
        class: "property-direction",
        options: T,
        selected: B(u),
        "onUpdate:modelValue": U[10] || (U[10] = (D) => E(D, "direction"))
      }, null, 8, ["selected"]),
      ee(B(st), {
        class: "property-degree",
        title: "degree",
        value: B(f),
        "onUpdate:modelValue": U[11] || (U[11] = (D) => E(D, "degree"))
      }, null, 8, ["value"])
    ]));
  }
}), Gd = { class: "property image-property" }, zd = /* @__PURE__ */ Be({
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
    ], { width: o, height: i, ipath: l } = Gn(n), c = (u, a) => {
      const f = {
        eid: n.eid,
        width: o.value,
        height: i.value,
        ipath: l.value
      };
      a === "ipath" ? f.ipath = u : a === "width" ? f.width = parseInt(u) : a === "height" && (f.height = parseInt(u)), s("change", f);
    };
    return (u, a) => (q(), re("div", Gd, [
      qr(u.$slots, "default"),
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
}), Kd = ["onMousedown"], Jd = { class: "drag-overlay__tag" }, ns = 20, Xd = /* @__PURE__ */ Be({
  __name: "DragOverlay",
  props: {
    layers: {},
    bounds: {},
    disabled: { type: Boolean },
    offset: {}
  },
  emits: ["dragStart", "dragMove", "dragEnd"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = he(null), o = he({ x: 0, y: 0 }), i = he({ x: 0, y: 0 }), l = he({ x: 0, y: 0 }), c = Ce(() => ({
      top: n.offset?.top ?? 10,
      left: n.offset?.left ?? 10
    })), u = (_) => n.layers.find((T) => T.id === _), a = (_, T, E) => {
      const C = n.bounds.width - _.width + ns, R = n.bounds.height - _.height + ns;
      return {
        x: Math.max(Math.min(T, C), -ns),
        y: Math.max(Math.min(E, R), -ns)
      };
    }, f = (_) => {
      if (!r.value)
        return;
      const T = u(r.value);
      if (!T)
        return;
      const E = _.clientX - o.value.x, C = _.clientY - o.value.y, R = a(T, i.value.x + E, i.value.y + C);
      l.value = R, s("dragMove", {
        id: T.id,
        x: R.x,
        y: R.y
      });
    }, m = () => {
      window.removeEventListener("mousemove", f), window.removeEventListener("mouseup", y);
    }, y = () => {
      r.value && (s("dragEnd", {
        id: r.value,
        x: l.value.x,
        y: l.value.y
      }), r.value = null, m());
    }, b = (_, T) => {
      n.disabled || (r.value = _.id, o.value = { x: T.clientX, y: T.clientY }, i.value = { x: _.x, y: _.y }, l.value = { x: _.x, y: _.y }, s("dragStart", {
        id: _.id,
        x: _.x,
        y: _.y
      }), window.addEventListener("mousemove", f), window.addEventListener("mouseup", y), T.preventDefault());
    };
    cl(() => {
      m();
    });
    const v = (_) => ({
      width: `${_.width}px`,
      height: `${_.height}px`,
      transform: `translate(${_.x}px, ${_.y}px)`
    });
    return (_, T) => (q(), re("div", {
      class: Vt(["drag-overlay", {
        "drag-overlay--disabled": e.disabled
      }]),
      style: an({
        width: `${e.bounds.width}px`,
        height: `${e.bounds.height}px`,
        top: `${c.value.top}px`,
        left: `${c.value.left}px`
      })
    }, [
      (q(!0), re(xe, null, $n(e.layers, (E) => (q(), re("div", {
        key: E.id,
        class: "drag-overlay__item",
        style: an(v(E)),
        onMousedown: (C) => b(E, C)
      }, [
        Q("span", Jd, it(E.type.toLowerCase()), 1)
      ], 44, Kd))), 128))
    ], 6));
  }
}), Yd = /* @__PURE__ */ Us(Xd, [["__scopeId", "data-v-1bb2305a"]]), Ln = 1.2, Ue = 11, rt = 14, ei = rt * Ue, ti = rt * Ue, ar = rt * Ue, ni = rt, Qd = (() => {
  const e = [];
  for (let t = 1; t < Ue; t++)
    e.push([t, 0, t, Ue]), e.push([0, t, Ue, t]);
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
}, eh = (e, t, n) => {
  const { content: s, x: r, y: o, size: i, font: l, color: c, stroke: u, swidth: a, align: f, max: m, direction: y, blur: b = 0, degree: v = 0 } = n;
  e.font = `${i}px ${l}` || "32px sans-serif", e.fillStyle = c || "#000000", b && (e.filter = `blur(${b}px)`), e.textAlign = f || "center", e.strokeStyle = u, e.lineWidth = a;
  const _ = m || t, T = tc(s || "金馆长", _, e);
  T.forEach((E, C) => {
    let R = 0;
    y === "down" ? R = C : y === "center" ? R = C - (T.length - 1) / 2 : R = C - (T.length - 1), e.save(), v ? (e.translate(r, o + R * i * Ln), e.rotate(v * Math.PI / 180), e.strokeText(E, 0, 0, _), e.fillText(E, 0, 0, _)) : (e.strokeText(E, r, o + R * i * Ln, _), e.fillText(E, r, o + R * i * Ln, _)), e.restore();
  });
}, th = (e) => {
  e.imageSmoothingEnabled = !1, e.lineCap = "round", e.beginPath(), e.strokeStyle = "#000000", e.arc(Ue * rt / 2, Ue * rt / 2, Ue * rt / 2 - 1, 0, Math.PI * 2), e.stroke(), e.clip(), e.strokeStyle = "#D6D6D6", Qd.forEach((t) => {
    const { 0: n = 0, 1: s = 0, 2: r = 0, 3: o = 0 } = t;
    e.moveTo(n, s), e.lineTo(r, o);
  }), e.stroke(), e.beginPath(), e.strokeStyle = "#FF0000", e.rect((Ue - 1) * rt / 2, (Ue - 1) * rt / 2, 1 * rt, 1 * rt), e.stroke();
}, nh = (e, t, n, s) => {
  t.style.left = `${n + ni}px`, t.style.top = `${s + ni}px`;
  const r = t.getContext("2d"), o = Math.min(Math.max(0, n - 5), e.width - Ue), i = Math.min(Math.max(0, s - 5), e.height - Ue);
  r.clearRect(0, 0, ei, ti), r.drawImage(e, o, i, Ue, Ue, 0, 0, ei, ti), th(r);
}, sh = (e) => e.split(";base64,")[0]?.match(/[a-z]+$/g)?.[0] || "png", rh = (e, t, n) => {
  const r = `image/${["jpeg", "jpg"].includes(t) ? "jpeg" : "png"}`, o = e.toDataURL(r), i = document.createElement("a");
  i.setAttribute("download", n), i.setAttribute("href", o), i.setAttribute("target", "_blank"), i.click();
}, We = {
  TEXT: "TEXT",
  IMAGE: "IMAGE"
}, oh = { class: "container" }, ih = { class: "container-header" }, lh = { class: "container-title" }, ch = {
  key: 0,
  class: "container-wall"
}, ah = { class: "container-wrapper" }, uh = { class: "container-area" }, fh = ["width", "height"], dh = {
  key: 0,
  class: "property-actions"
}, hh = ["onClick"], ph = ["onClick"], mh = ["onClick"], gh = {
  key: 0,
  class: "property-actions"
}, yh = ["onClick"], bh = ["onClick"], _h = ["onClick"], vh = {
  key: 1,
  class: "container-footer"
}, wh = /* @__PURE__ */ Be({
  __name: "Container",
  props: {
    story: {}
  },
  emits: ["change", "create", "create-layer", "delete-layer", "reorder-layer", "update-name"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = Gn(n).story, o = he(null), i = he(!1), l = he(null), c = he(!1), u = he(!1), a = he(null), f = he(null), m = he(!1), y = he("金馆长"), b = (h) => {
      y.value = h, U();
    }, v = he(0), _ = he(0), T = (h) => {
      const g = r.value.children.find((w) => w.options.eid === h.eid);
      if (g) {
        if (g.type === We.TEXT && "content" in h)
          Object.assign(g.options, h);
        else if (g.type === We.IMAGE && "ipath" in h)
          Object.assign(g.options, h);
        else
          return;
        s("change", r.value);
      }
    }, E = Ce(() => sh(r.value.image)), C = Ce(() => `${r.value.name}.${E.value} ${v.value} * ${_.value}`), R = new Image(), M = () => {
      R.onload = async () => {
        const h = o.value;
        h.width = R.naturalWidth, h.height = R.naturalHeight, v.value = h.width, _.value = h.height, U();
      }, R.onerror = () => {
        console.error("图片加载失败");
      }, R.src = r.value.image;
    }, U = () => {
      const h = o.value, g = h.getContext("2d");
      g.drawImage(R, 0, 0), r.value.children.forEach(({ type: w, options: x }) => {
        w === We.TEXT ? eh(g, h.width, {
          ...x,
          content: y.value + x.content
        }) : We.IMAGE;
      });
    }, D = typeof document < "u" ? document.createElement("canvas").getContext("2d") : null, W = (h, g) => ({
      start: 0,
      center: Math.floor(g / 2),
      end: g
    })[h] ?? 0, J = (h, g) => {
      if (!g || !D)
        return h.size * Ln;
      D.font = h.font ? `${h.size}px ${h.font}` : `${h.size}px sans-serif`;
      const w = tc(h.content || "", g, D);
      return Math.max(w.length, 1) * h.size * Ln;
    }, ce = Ce(() => {
      const h = v.value, g = _.value;
      return !h || !g ? [] : r.value.children.map((w, x) => {
        if (w.type === We.TEXT) {
          const O = w.options, I = O.max || h, N = W(O.align || "start", I), P = J(O, I);
          return {
            id: O.eid || `text-${x}`,
            x: O.x - N,
            y: O.y - O.size + 2,
            width: I,
            height: P,
            alignOffset: N,
            size: O.size,
            type: w.type
          };
        }
        if (w.type === We.IMAGE) {
          const O = w.options;
          return {
            id: O.eid || `image-${x}`,
            x: O.x,
            y: O.y,
            width: O.width,
            height: O.height,
            alignOffset: 0,
            size: 0,
            type: w.type
          };
        }
        return null;
      }).filter((w) => !!w);
    }), ge = (h, g, w) => {
      const x = r.value.children.find((O, I) => {
        const N = O.options.eid;
        return N ? N === h : `${I}` === h;
      });
      if (x) {
        if (x.type === We.TEXT) {
          const O = x.options, I = O.max || v.value, N = W(O.align || "start", I);
          O.x = Math.round(g + N), O.y = Math.round(w + O.size - 2);
        } else if (x.type === We.IMAGE) {
          const O = x.options;
          O.x = Math.round(g), O.y = Math.round(w);
        }
      }
    }, Se = ({ id: h, x: g, y: w }) => {
      ge(h, g, w);
    }, ye = ({ id: h, x: g, y: w }) => {
      console.log(g, w), ge(h, g, w);
    }, Te = ({ id: h, x: g, y: w }) => {
      ge(h, g, w), s("change", r.value);
    };
    _t(() => r.value.mid, () => {
      M();
    }), _t(() => r.value.image, () => {
      M();
    }), _t(() => r.value.children, () => {
      U();
    }, { deep: !0 });
    const ze = () => {
      if (i.value)
        return;
      const h = o.value, g = `imeme_${r.value.name}_${y.value}`;
      rh(h, E.value, g);
    }, Z = () => {
      i.value = !0;
    }, V = () => {
      i.value = !1, l.value = null;
    }, Y = () => {
      l.value && s("create", l.value, V);
    }, $e = ({ name: h, base64: g }) => {
      l.value = {
        name: h.slice(0, h.lastIndexOf(".")) || h,
        image: g,
        layerType: We.TEXT
      };
    }, et = (h) => {
      f.value = h, c.value = !0;
    }, _e = () => {
      m.value = !m.value;
    }, ue = (h, g) => {
      !r.value.mid || !g || s("reorder-layer", { mid: r.value.mid, eid: g, direction: h });
    }, tt = (h, g) => {
      const w = o.value, x = a.value;
      nh(w, x, h, g);
    }, Ke = async (h) => {
      if (!c.value)
        return !1;
      const { offsetX: g, offsetY: w } = h;
      g < 0 || w < 0 || (u.value = !0, tt(g, w));
    }, nt = () => {
      if (!c.value)
        return !1;
      u.value = !1;
    }, je = (h) => {
      const g = (N) => N.toString(16).padStart(2, "0"), { 0: w = 0, 1: x = 0, 2: O = 0, 3: I = 0 } = h.data;
      return `#${g(w)}${g(x)}${g(O)}${g(I)}`.toUpperCase();
    }, A = (h, g) => {
      const O = o.value.getContext("2d").getImageData(h, g, 1, 1);
      return je(O);
    }, k = (h) => {
      if (!c.value)
        return !1;
      const { offsetX: g, offsetY: w } = h;
      if (g < 0 || w < 0)
        return;
      const x = A(g, w), O = r.value.children.find((I) => {
        if (I.type !== We.TEXT)
          return !1;
        const N = I.options.eid;
        return f.value ? N === f.value : !0;
      });
      O && (O.options.color = x, s("change", r.value)), u.value = !1, c.value = !1, f.value = null;
    }, L = (h) => {
      r.value.mid && s("create-layer", { mid: r.value.mid, type: h });
    }, $ = (h) => {
      !r.value.mid || !h || s("delete-layer", { mid: r.value.mid, eid: h });
    }, te = Zl(), d = Ce(() => te.path.includes("/edit")), p = (h) => {
      h !== r.value.name && (r.value.name = h, s("update-name", r.value));
    };
    return Ds(() => {
      M();
    }), (h, g) => (q(), re("div", oh, [
      Q("div", ih, [
        Q("div", lh, [
          d.value ? (q(), Fe(B(st), {
            key: 0,
            class: "container-title-label",
            value: B(r).name,
            "onUpdate:modelValue": g[0] || (g[0] = (w) => p(w))
          }, null, 8, ["value"])) : (q(), re(xe, { key: 1 }, [
            Kr(it(C.value), 1)
          ], 64))
        ]),
        i.value ? (q(), Fe(B(Ct), {
          key: 0,
          label: "保存新故事",
          u: "primary",
          onClick: Y
        })) : zt("", !0),
        i.value ? (q(), Fe(B(Ct), {
          key: 1,
          label: "取消新建",
          u: "primary",
          onClick: V
        })) : (q(), Fe(B(Ct), {
          key: 2,
          label: "新建故事",
          u: "primary",
          onClick: Z
        })),
        ee(B(Ct), {
          label: "下载",
          u: "primary",
          disabled: i.value,
          onClick: ze
        }, null, 8, ["disabled"])
      ]),
      i.value ? (q(), re("div", ch, [
        ee(B(kd), { onChange: $e })
      ])) : zt("", !0),
      ao(Q("div", ah, [
        Q("div", uh, [
          Q("canvas", {
            ref_key: "canvasRef",
            ref: o,
            class: Vt({
              "container-canvas": !0,
              "container-pointer": c.value
            }),
            onMousemove: Ke,
            onMouseleave: nt,
            onClick: k
          }, null, 34),
          !c.value && v.value && _.value ? (q(), Fe(Yd, {
            key: 0,
            class: "container-overlay",
            layers: ce.value,
            bounds: { width: v.value, height: _.value },
            offset: { top: 10, left: 10 },
            onDragStart: Se,
            onDragMove: ye,
            onDragEnd: Te
          }, null, 8, ["layers", "bounds"])) : zt("", !0),
          ao(Q("canvas", {
            ref_key: "layerRef",
            ref: a,
            class: "container-layer",
            style: an({
              borderRadius: `${B(ar)}px`
            }),
            width: B(ar),
            height: B(ar)
          }, null, 12, fh), [
            [Ro, c.value && u.value]
          ])
        ]),
        (q(!0), re(xe, null, $n(B(r).children, (w, x) => (q(), re(xe, { key: x }, [
          w.type === B(We).IMAGE ? (q(), Fe(zd, wr({
            key: 0,
            ref_for: !0
          }, w.options, { onChange: T }), {
            default: Bn(() => [
              (q(), Fe(B(st), {
                class: "property-text",
                key: x,
                title: "text",
                value: y.value,
                "onUpdate:modelValue": b
              }, null, 8, ["value"])),
              m.value ? (q(), re("div", dh, [
                Q("button", {
                  class: "icon-button",
                  type: "button",
                  onClick: (O) => ue("up", w.options.eid),
                  title: "上移"
                }, [...g[3] || (g[3] = [
                  Q("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, [
                    Q("path", { d: "M12 5l6 6H6z" })
                  ], -1)
                ])], 8, hh),
                Q("button", {
                  class: "icon-button",
                  type: "button",
                  onClick: (O) => ue("down", w.options.eid),
                  title: "下移"
                }, [...g[4] || (g[4] = [
                  Q("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, [
                    Q("path", { d: "M12 19l-6-6h12z" })
                  ], -1)
                ])], 8, ph),
                Q("button", {
                  class: "icon-button danger",
                  type: "button",
                  onClick: (O) => $(w.options.eid),
                  title: "删除图层"
                }, [...g[5] || (g[5] = [
                  Q("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, [
                    Q("path", { d: "M16 9v9H8V9h8m-1.5-4h-5l-1 1H6v2h12V6h-2.5l-1-1z" })
                  ], -1)
                ])], 8, mh)
              ])) : zt("", !0)
            ]),
            _: 2
          }, 1040)) : (q(), Fe(qd, wr({ key: x }, { ref_for: !0 }, w.options, {
            onChange: T,
            onPick: () => et(w.options.eid)
          }), {
            default: Bn(() => [
              ee(B(st), {
                class: "property-text",
                title: "text",
                value: y.value,
                "onUpdate:modelValue": b
              }, null, 8, ["value"]),
              m.value ? (q(), re("div", gh, [
                Q("button", {
                  class: "icon-button",
                  type: "button",
                  onClick: (O) => ue("up", w.options.eid),
                  title: "上移"
                }, [...g[6] || (g[6] = [
                  Q("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, [
                    Q("path", { d: "M12 5l6 6H6z" })
                  ], -1)
                ])], 8, yh),
                Q("button", {
                  class: "icon-button",
                  type: "button",
                  onClick: (O) => ue("down", w.options.eid),
                  title: "下移"
                }, [...g[7] || (g[7] = [
                  Q("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, [
                    Q("path", { d: "M12 19l-6-6h12z" })
                  ], -1)
                ])], 8, bh),
                Q("button", {
                  class: "icon-button danger",
                  type: "button",
                  onClick: (O) => $(w.options.eid),
                  title: "删除图层"
                }, [...g[8] || (g[8] = [
                  Q("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, [
                    Q("path", { d: "M16 9v9H8V9h8m-1.5-4h-5l-1 1H6v2h12V6h-2.5l-1-1z" })
                  ], -1)
                ])], 8, _h)
              ])) : zt("", !0)
            ]),
            _: 2
          }, 1040, ["onPick"]))
        ], 64))), 128))
      ], 512), [
        [Ro, !i.value]
      ]),
      i.value ? zt("", !0) : (q(), re("footer", vh, [
        ee(B(Ct), {
          class: "container-footer-label",
          label: "添加文本层",
          u: "primary",
          onClick: g[1] || (g[1] = () => L(B(We).TEXT))
        }),
        ee(B(Ct), {
          class: "container-footer-label",
          label: "添加图片层",
          u: "primary",
          onClick: g[2] || (g[2] = () => L(B(We).IMAGE))
        }),
        ee(B(Ct), {
          label: m.value ? "隐藏操作区" : "显示操作区",
          u: "primary",
          onClick: _e
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
const { toString: Eh } = Object.prototype, { getPrototypeOf: Qr } = Object, { iterator: js, toStringTag: sc } = Symbol, Hs = /* @__PURE__ */ ((e) => (t) => {
  const n = Eh.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), ft = (e) => (e = e.toLowerCase(), (t) => Hs(t) === e), Vs = (e) => (t) => typeof t === e, { isArray: gn } = Array, pn = Vs("undefined");
function Kn(e) {
  return e !== null && !pn(e) && e.constructor !== null && !pn(e.constructor) && qe(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const rc = ft("ArrayBuffer");
function Sh(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && rc(e.buffer), t;
}
const xh = Vs("string"), qe = Vs("function"), oc = Vs("number"), Jn = (e) => e !== null && typeof e == "object", Rh = (e) => e === !0 || e === !1, cs = (e) => {
  if (Hs(e) !== "object")
    return !1;
  const t = Qr(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(sc in e) && !(js in e);
}, Ch = (e) => {
  if (!Jn(e) || Kn(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, Ah = ft("Date"), Oh = ft("File"), Th = ft("Blob"), Ph = ft("FileList"), Nh = (e) => Jn(e) && qe(e.pipe), Ih = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || qe(e.append) && ((t = Hs(e)) === "formdata" || // detect form-data instance
  t === "object" && qe(e.toString) && e.toString() === "[object FormData]"));
}, Dh = ft("URLSearchParams"), [Mh, Lh, Fh, kh] = ["ReadableStream", "Request", "Response", "Headers"].map(ft), Uh = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Xn(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let s, r;
  if (typeof e != "object" && (e = [e]), gn(e))
    for (s = 0, r = e.length; s < r; s++)
      t.call(null, e[s], s, e);
  else {
    if (Kn(e))
      return;
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), i = o.length;
    let l;
    for (s = 0; s < i; s++)
      l = o[s], t.call(null, e[l], l, e);
  }
}
function ic(e, t) {
  if (Kn(e))
    return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let s = n.length, r;
  for (; s-- > 0; )
    if (r = n[s], t === r.toLowerCase())
      return r;
  return null;
}
const Jt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, lc = (e) => !pn(e) && e !== Jt;
function Pr() {
  const { caseless: e, skipUndefined: t } = lc(this) && this || {}, n = {}, s = (r, o) => {
    const i = e && ic(n, o) || o;
    cs(n[i]) && cs(r) ? n[i] = Pr(n[i], r) : cs(r) ? n[i] = Pr({}, r) : gn(r) ? n[i] = r.slice() : (!t || !pn(r)) && (n[i] = r);
  };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && Xn(arguments[r], s);
  return n;
}
const Bh = (e, t, n, { allOwnKeys: s } = {}) => (Xn(t, (r, o) => {
  n && qe(r) ? e[o] = nc(r, n) : e[o] = r;
}, { allOwnKeys: s }), e), $h = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), jh = (e, t, n, s) => {
  e.prototype = Object.create(t.prototype, s), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, Hh = (e, t, n, s) => {
  let r, o, i;
  const l = {};
  if (t = t || {}, e == null) return t;
  do {
    for (r = Object.getOwnPropertyNames(e), o = r.length; o-- > 0; )
      i = r[o], (!s || s(i, e, t)) && !l[i] && (t[i] = e[i], l[i] = !0);
    e = n !== !1 && Qr(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Vh = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const s = e.indexOf(t, n);
  return s !== -1 && s === n;
}, Wh = (e) => {
  if (!e) return null;
  if (gn(e)) return e;
  let t = e.length;
  if (!oc(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, qh = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Qr(Uint8Array)), Gh = (e, t) => {
  const s = (e && e[js]).call(e);
  let r;
  for (; (r = s.next()) && !r.done; ) {
    const o = r.value;
    t.call(e, o[0], o[1]);
  }
}, zh = (e, t) => {
  let n;
  const s = [];
  for (; (n = e.exec(t)) !== null; )
    s.push(n);
  return s;
}, Kh = ft("HTMLFormElement"), Jh = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, s, r) {
    return s.toUpperCase() + r;
  }
), ri = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Xh = ft("RegExp"), cc = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), s = {};
  Xn(n, (r, o) => {
    let i;
    (i = t(r, o, e)) !== !1 && (s[o] = i || r);
  }), Object.defineProperties(e, s);
}, Yh = (e) => {
  cc(e, (t, n) => {
    if (qe(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const s = e[n];
    if (qe(s)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, Qh = (e, t) => {
  const n = {}, s = (r) => {
    r.forEach((o) => {
      n[o] = !0;
    });
  };
  return gn(e) ? s(e) : s(String(e).split(t)), n;
}, Zh = () => {
}, ep = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function tp(e) {
  return !!(e && qe(e.append) && e[sc] === "FormData" && e[js]);
}
const np = (e) => {
  const t = new Array(10), n = (s, r) => {
    if (Jn(s)) {
      if (t.indexOf(s) >= 0)
        return;
      if (Kn(s))
        return s;
      if (!("toJSON" in s)) {
        t[r] = s;
        const o = gn(s) ? [] : {};
        return Xn(s, (i, l) => {
          const c = n(i, r + 1);
          !pn(c) && (o[l] = c);
        }), t[r] = void 0, o;
      }
    }
    return s;
  };
  return n(e, 0);
}, sp = ft("AsyncFunction"), rp = (e) => e && (Jn(e) || qe(e)) && qe(e.then) && qe(e.catch), ac = ((e, t) => e ? setImmediate : t ? ((n, s) => (Jt.addEventListener("message", ({ source: r, data: o }) => {
  r === Jt && o === n && s.length && s.shift()();
}, !1), (r) => {
  s.push(r), Jt.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  qe(Jt.postMessage)
), op = typeof queueMicrotask < "u" ? queueMicrotask.bind(Jt) : typeof process < "u" && process.nextTick || ac, ip = (e) => e != null && qe(e[js]), S = {
  isArray: gn,
  isArrayBuffer: rc,
  isBuffer: Kn,
  isFormData: Ih,
  isArrayBufferView: Sh,
  isString: xh,
  isNumber: oc,
  isBoolean: Rh,
  isObject: Jn,
  isPlainObject: cs,
  isEmptyObject: Ch,
  isReadableStream: Mh,
  isRequest: Lh,
  isResponse: Fh,
  isHeaders: kh,
  isUndefined: pn,
  isDate: Ah,
  isFile: Oh,
  isBlob: Th,
  isRegExp: Xh,
  isFunction: qe,
  isStream: Nh,
  isURLSearchParams: Dh,
  isTypedArray: qh,
  isFileList: Ph,
  forEach: Xn,
  merge: Pr,
  extend: Bh,
  trim: Uh,
  stripBOM: $h,
  inherits: jh,
  toFlatObject: Hh,
  kindOf: Hs,
  kindOfTest: ft,
  endsWith: Vh,
  toArray: Wh,
  forEachEntry: Gh,
  matchAll: zh,
  isHTMLForm: Kh,
  hasOwnProperty: ri,
  hasOwnProp: ri,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: cc,
  freezeMethods: Yh,
  toObjectSet: Qh,
  toCamelCase: Jh,
  noop: Zh,
  toFiniteNumber: ep,
  findKey: ic,
  global: Jt,
  isContextDefined: lc,
  isSpecCompliantForm: tp,
  toJSONObject: np,
  isAsyncFn: sp,
  isThenable: rp,
  setImmediate: ac,
  asap: op,
  isIterable: ip
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
const lp = null;
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
function cp(e) {
  return S.isArray(e) && !e.some(Nr);
}
const ap = S.toFlatObject(S, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Ws(e, t, n) {
  if (!S.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = S.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(v, _) {
    return !S.isUndefined(_[v]);
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
  function a(b, v, _) {
    let T = b;
    if (b && !_ && typeof b == "object") {
      if (S.endsWith(v, "{}"))
        v = s ? v : v.slice(0, -2), b = JSON.stringify(b);
      else if (S.isArray(b) && cp(b) || (S.isFileList(b) || S.endsWith(v, "[]")) && (T = S.toArray(b)))
        return v = dc(v), T.forEach(function(C, R) {
          !(S.isUndefined(C) || C === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? oi([v], R, o) : i === null ? v : v + "[]",
            u(C)
          );
        }), !1;
    }
    return Nr(b) ? !0 : (t.append(oi(_, v, o), u(b)), !1);
  }
  const f = [], m = Object.assign(ap, {
    defaultVisitor: a,
    convertValue: u,
    isVisitable: Nr
  });
  function y(b, v) {
    if (!S.isUndefined(b)) {
      if (f.indexOf(b) !== -1)
        throw Error("Circular reference detected in " + v.join("."));
      f.push(b), S.forEach(b, function(T, E) {
        (!(S.isUndefined(T) || T === null) && r.call(
          t,
          T,
          S.isString(E) ? E.trim() : E,
          v,
          m
        )) === !0 && y(T, v ? v.concat(E) : [E]);
      }), f.pop();
    }
  }
  if (!S.isObject(e))
    throw new TypeError("data must be an object");
  return y(e), t;
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
  this._pairs = [], e && Ws(e, this, t);
}
const hc = Zr.prototype;
hc.append = function(t, n) {
  this._pairs.push([t, n]);
};
hc.toString = function(t) {
  const n = t ? function(s) {
    return t.call(this, s, ii);
  } : ii;
  return this._pairs.map(function(r) {
    return n(r[0]) + "=" + n(r[1]);
  }, "").join("&");
};
function up(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function pc(e, t, n) {
  if (!t)
    return e;
  const s = n && n.encode || up;
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
}, fp = typeof URLSearchParams < "u" ? URLSearchParams : Zr, dp = typeof FormData < "u" ? FormData : null, hp = typeof Blob < "u" ? Blob : null, pp = {
  isBrowser: !0,
  classes: {
    URLSearchParams: fp,
    FormData: dp,
    Blob: hp
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, eo = typeof window < "u" && typeof document < "u", Ir = typeof navigator == "object" && navigator || void 0, mp = eo && (!Ir || ["ReactNative", "NativeScript", "NS"].indexOf(Ir.product) < 0), gp = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", yp = eo && window.location.href || "http://localhost", bp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: eo,
  hasStandardBrowserEnv: mp,
  hasStandardBrowserWebWorkerEnv: gp,
  navigator: Ir,
  origin: yp
}, Symbol.toStringTag, { value: "Module" })), Ie = {
  ...bp,
  ...pp
};
function _p(e, t) {
  return Ws(e, new Ie.classes.URLSearchParams(), {
    visitor: function(n, s, r, o) {
      return Ie.isNode && S.isBuffer(n) ? (this.append(s, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function vp(e) {
  return S.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function wp(e) {
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
    return i = !i && S.isArray(r) ? r.length : i, c ? (S.hasOwnProp(r, i) ? r[i] = [r[i], s] : r[i] = s, !l) : ((!r[i] || !S.isObject(r[i])) && (r[i] = []), t(n, s, r[i], o) && S.isArray(r[i]) && (r[i] = wp(r[i])), !l);
  }
  if (S.isFormData(e) && S.isFunction(e.entries)) {
    const n = {};
    return S.forEachEntry(e, (s, r) => {
      t(vp(s), r, n, 0);
    }), n;
  }
  return null;
}
function Ep(e, t, n) {
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
        return _p(t, this.formSerializer).toString();
      if ((l = S.isFileList(t)) || s.indexOf("multipart/form-data") > -1) {
        const c = this.env && this.env.FormData;
        return Ws(
          l ? { "files[]": t } : t,
          c && new c(),
          this.formSerializer
        );
      }
    }
    return o || r ? (n.setContentType("application/json", !1), Ep(t)) : t;
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
const Sp = S.toObjectSet([
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
]), xp = (e) => {
  const t = {};
  let n, s, r;
  return e && e.split(`
`).forEach(function(i) {
    r = i.indexOf(":"), n = i.substring(0, r).trim().toLowerCase(), s = i.substring(r + 1).trim(), !(!n || t[n] && Sp[n]) && (n === "set-cookie" ? t[n] ? t[n].push(s) : t[n] = [s] : t[n] = t[n] ? t[n] + ", " + s : s);
  }), t;
}, ci = /* @__PURE__ */ Symbol("internals");
function Sn(e) {
  return e && String(e).trim().toLowerCase();
}
function as(e) {
  return e === !1 || e == null ? e : S.isArray(e) ? e.map(as) : String(e);
}
function Rp(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = n.exec(e); )
    t[s[1]] = s[2];
  return t;
}
const Cp = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
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
function Ap(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, s) => n.toUpperCase() + s);
}
function Op(e, t) {
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
let Ge = class {
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
    else if (S.isString(t) && (t = t.trim()) && !Cp(t))
      i(xp(t), n);
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
          return Rp(r);
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
      const l = t ? Ap(o) : String(o).trim();
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
      s[l] || (Op(r, i), s[l] = !0);
    }
    return S.isArray(t) ? t.forEach(o) : o(t), this;
  }
};
Ge.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
S.reduceDescriptors(Ge.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(s) {
      this[n] = s;
    }
  };
});
S.freezeMethods(Ge);
function fr(e, t) {
  const n = this || Yn, s = t || n, r = Ge.from(s.headers);
  let o = s.data;
  return S.forEach(e, function(l) {
    o = l.call(n, o, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), o;
}
function yc(e) {
  return !!(e && e.__CANCEL__);
}
function yn(e, t, n) {
  X.call(this, e ?? "canceled", X.ERR_CANCELED, t, n), this.name = "CanceledError";
}
S.inherits(yn, X, {
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
function Tp(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Pp(e, t) {
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
    const y = a && u - a;
    return y ? Math.round(m * 1e3 / y) : void 0;
  };
}
function Np(e, t) {
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
  const r = Pp(50, 250);
  return Np((o) => {
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
}, ui = (e) => (...t) => S.asap(() => e(...t)), Ip = Ie.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, Ie.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(Ie.origin),
  Ie.navigator && /(msie|trident)/i.test(Ie.navigator.userAgent)
) : () => !0, Dp = Ie.hasStandardBrowserEnv ? (
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
function Mp(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Lp(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function _c(e, t, n) {
  let s = !Mp(t);
  return e && (s || n == !1) ? Lp(e, t) : t;
}
const fi = (e) => e instanceof Ge ? { ...e } : e;
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
  if (t.headers = i = Ge.from(i), t.url = pc(_c(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), l && i.set(
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
  if (Ie.hasStandardBrowserEnv && (s && S.isFunction(s) && (s = s(t)), s || s !== !1 && Ip(t.url))) {
    const c = r && o && Dp.read(o);
    c && i.set(r, c);
  }
  return t;
}, Fp = typeof XMLHttpRequest < "u", kp = Fp && function(e) {
  return new Promise(function(n, s) {
    const r = vc(e);
    let o = r.data;
    const i = Ge.from(r.headers).normalize();
    let { responseType: l, onUploadProgress: c, onDownloadProgress: u } = r, a, f, m, y, b;
    function v() {
      y && y(), b && b(), r.cancelToken && r.cancelToken.unsubscribe(a), r.signal && r.signal.removeEventListener("abort", a);
    }
    let _ = new XMLHttpRequest();
    _.open(r.method.toUpperCase(), r.url, !0), _.timeout = r.timeout;
    function T() {
      if (!_)
        return;
      const C = Ge.from(
        "getAllResponseHeaders" in _ && _.getAllResponseHeaders()
      ), M = {
        data: !l || l === "text" || l === "json" ? _.responseText : _.response,
        status: _.status,
        statusText: _.statusText,
        headers: C,
        config: e,
        request: _
      };
      bc(function(D) {
        n(D), v();
      }, function(D) {
        s(D), v();
      }, M), _ = null;
    }
    "onloadend" in _ ? _.onloadend = T : _.onreadystatechange = function() {
      !_ || _.readyState !== 4 || _.status === 0 && !(_.responseURL && _.responseURL.indexOf("file:") === 0) || setTimeout(T);
    }, _.onabort = function() {
      _ && (s(new X("Request aborted", X.ECONNABORTED, e, _)), _ = null);
    }, _.onerror = function(R) {
      const M = R && R.message ? R.message : "Network Error", U = new X(M, X.ERR_NETWORK, e, _);
      U.event = R || null, s(U), _ = null;
    }, _.ontimeout = function() {
      let R = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const M = r.transitional || mc;
      r.timeoutErrorMessage && (R = r.timeoutErrorMessage), s(new X(
        R,
        M.clarifyTimeoutError ? X.ETIMEDOUT : X.ECONNABORTED,
        e,
        _
      )), _ = null;
    }, o === void 0 && i.setContentType(null), "setRequestHeader" in _ && S.forEach(i.toJSON(), function(R, M) {
      _.setRequestHeader(M, R);
    }), S.isUndefined(r.withCredentials) || (_.withCredentials = !!r.withCredentials), l && l !== "json" && (_.responseType = r.responseType), u && ([m, b] = vs(u, !0), _.addEventListener("progress", m)), c && _.upload && ([f, y] = vs(c), _.upload.addEventListener("progress", f), _.upload.addEventListener("loadend", y)), (r.cancelToken || r.signal) && (a = (C) => {
      _ && (s(!C || C.type ? new yn(null, e, _) : C), _.abort(), _ = null);
    }, r.cancelToken && r.cancelToken.subscribe(a), r.signal && (r.signal.aborted ? a() : r.signal.addEventListener("abort", a)));
    const E = Tp(r.url);
    if (E && Ie.protocols.indexOf(E) === -1) {
      s(new X("Unsupported protocol " + E + ":", X.ERR_BAD_REQUEST, e));
      return;
    }
    _.send(o || null);
  });
}, Up = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let s = new AbortController(), r;
    const o = function(u) {
      if (!r) {
        r = !0, l();
        const a = u instanceof Error ? u : this.reason;
        s.abort(a instanceof X ? a : new yn(a instanceof Error ? a.message : a));
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
}, Bp = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let s = 0, r;
  for (; s < n; )
    r = s + t, yield e.slice(s, r), s = r;
}, $p = async function* (e, t) {
  for await (const n of jp(e))
    yield* Bp(n, t);
}, jp = async function* (e) {
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
  const r = $p(e, t);
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
}, hi = 64 * 1024, { isFunction: ss } = S, Hp = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(S.global), {
  ReadableStream: pi,
  TextEncoder: mi
} = S.global, gi = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, Vp = (e) => {
  e = S.merge.call({
    skipUndefined: !0
  }, Hp, e);
  const { fetch: t, Request: n, Response: s } = e, r = t ? ss(t) : typeof fetch == "function", o = ss(n), i = ss(s);
  if (!r)
    return !1;
  const l = r && ss(pi), c = r && (typeof mi == "function" ? /* @__PURE__ */ ((b) => (v) => b.encode(v))(new mi()) : async (b) => new Uint8Array(await new n(b).arrayBuffer())), u = o && l && gi(() => {
    let b = !1;
    const v = new n(Ie.origin, {
      body: new pi(),
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
    !f[b] && (f[b] = (v, _) => {
      let T = v && v[b];
      if (T)
        return T.call(v);
      throw new X(`Response type '${b}' is not supported`, X.ERR_NOT_SUPPORT, _);
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
  }, y = async (b, v) => {
    const _ = S.toFiniteNumber(b.getContentLength());
    return _ ?? m(v);
  };
  return async (b) => {
    let {
      url: v,
      method: _,
      data: T,
      signal: E,
      cancelToken: C,
      timeout: R,
      onDownloadProgress: M,
      onUploadProgress: U,
      responseType: D,
      headers: W,
      withCredentials: J = "same-origin",
      fetchOptions: ce
    } = vc(b), ge = t || fetch;
    D = D ? (D + "").toLowerCase() : "text";
    let Se = Up([E, C && C.toAbortSignal()], R), ye = null;
    const Te = Se && Se.unsubscribe && (() => {
      Se.unsubscribe();
    });
    let ze;
    try {
      if (U && u && _ !== "get" && _ !== "head" && (ze = await y(W, T)) !== 0) {
        let _e = new n(v, {
          method: "POST",
          body: T,
          duplex: "half"
        }), ue;
        if (S.isFormData(T) && (ue = _e.headers.get("content-type")) && W.setContentType(ue), _e.body) {
          const [tt, Ke] = ai(
            ze,
            vs(ui(U))
          );
          T = di(_e.body, hi, tt, Ke);
        }
      }
      S.isString(J) || (J = J ? "include" : "omit");
      const Z = o && "credentials" in n.prototype, V = {
        ...ce,
        signal: Se,
        method: _.toUpperCase(),
        headers: W.normalize().toJSON(),
        body: T,
        duplex: "half",
        credentials: Z ? J : void 0
      };
      ye = o && new n(v, V);
      let Y = await (o ? ge(ye, ce) : ge(v, V));
      const $e = a && (D === "stream" || D === "response");
      if (a && (M || $e && Te)) {
        const _e = {};
        ["status", "statusText", "headers"].forEach((nt) => {
          _e[nt] = Y[nt];
        });
        const ue = S.toFiniteNumber(Y.headers.get("content-length")), [tt, Ke] = M && ai(
          ue,
          vs(ui(M), !0)
        ) || [];
        Y = new s(
          di(Y.body, hi, tt, () => {
            Ke && Ke(), Te && Te();
          }),
          _e
        );
      }
      D = D || "text";
      let et = await f[S.findKey(f, D) || "text"](Y, b);
      return !$e && Te && Te(), await new Promise((_e, ue) => {
        bc(_e, ue, {
          data: et,
          headers: Ge.from(Y.headers),
          status: Y.status,
          statusText: Y.statusText,
          config: b,
          request: ye
        });
      });
    } catch (Z) {
      throw Te && Te(), Z && Z.name === "TypeError" && /Load failed|fetch/i.test(Z.message) ? Object.assign(
        new X("Network Error", X.ERR_NETWORK, b, ye),
        {
          cause: Z.cause || Z
        }
      ) : X.from(Z, Z && Z.code, b, ye);
    }
  };
}, Wp = /* @__PURE__ */ new Map(), wc = (e) => {
  let t = e && e.env || {};
  const { fetch: n, Request: s, Response: r } = t, o = [
    s,
    r,
    n
  ];
  let i = o.length, l = i, c, u, a = Wp;
  for (; l--; )
    c = o[l], u = a.get(c), u === void 0 && a.set(c, u = l ? /* @__PURE__ */ new Map() : Vp(t)), a = u;
  return u;
};
wc();
const to = {
  http: lp,
  xhr: kp,
  fetch: {
    get: wc
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
const yi = (e) => `- ${e}`, qp = (e) => S.isFunction(e) || e === null || e === !1;
function Gp(e, t) {
  e = S.isArray(e) ? e : [e];
  const { length: n } = e;
  let s, r;
  const o = {};
  for (let i = 0; i < n; i++) {
    s = e[i];
    let l;
    if (r = s, !qp(s) && (r = to[(l = String(s)).toLowerCase()], r === void 0))
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
` + i.map(yi).join(`
`) : " " + yi(i[0]) : "as no adapter specified";
    throw new X(
      "There is no suitable adapter to dispatch the request " + l,
      "ERR_NOT_SUPPORT"
    );
  }
  return r;
}
const Ec = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: Gp,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: to
};
function dr(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new yn(null, e);
}
function bi(e) {
  return dr(e), e.headers = Ge.from(e.headers), e.data = fr.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Ec.getAdapter(e.adapter || Yn.adapter, e)(e).then(function(s) {
    return dr(e), s.data = fr.call(
      e,
      e.transformResponse,
      s
    ), s.headers = Ge.from(s.headers), s;
  }, function(s) {
    return yc(s) || (dr(e), s && s.response && (s.response.data = fr.call(
      e,
      e.transformResponse,
      s.response
    ), s.response.headers = Ge.from(s.response.headers))), Promise.reject(s);
  });
}
const Sc = "1.13.2", qs = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  qs[e] = function(s) {
    return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const _i = {};
qs.transitional = function(t, n, s) {
  function r(o, i) {
    return "[Axios v" + Sc + "] Transitional option '" + o + "'" + i + (s ? ". " + s : "");
  }
  return (o, i, l) => {
    if (t === !1)
      throw new X(
        r(i, " has been removed" + (n ? " in " + n : "")),
        X.ERR_DEPRECATED
      );
    return n && !_i[i] && (_i[i] = !0, console.warn(
      r(
        i,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(o, i, l) : !0;
  };
};
qs.spelling = function(t) {
  return (n, s) => (console.warn(`${s} is likely a misspelling of ${t}`), !0);
};
function zp(e, t, n) {
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
  assertOptions: zp,
  validators: qs
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
    ), n.headers = Ge.concat(i, o);
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
    let y = n;
    for (; f < m; ) {
      const b = l[f++], v = l[f++];
      try {
        y = b(y);
      } catch (_) {
        v.call(this, _);
        break;
      }
    }
    try {
      a = bi.call(this, y);
    } catch (b) {
      return Promise.reject(b);
    }
    for (f = 0, m = u.length; f < m; )
      a = a.then(u[f++], u[f++]);
    return a;
  }
  getUri(t) {
    t = Zt(this.defaults, t);
    const n = _c(t.baseURL, t.url, t.allowAbsoluteUrls);
    return pc(n, t.params, t.paramsSerializer);
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
let Kp = class xc {
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
      s.reason || (s.reason = new yn(o, i, l), n(s.reason));
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
      token: new xc(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
};
function Jp(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function Xp(e) {
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
const Ee = Rc(Yn);
Ee.Axios = Qt;
Ee.CanceledError = yn;
Ee.CancelToken = Kp;
Ee.isCancel = yc;
Ee.VERSION = Sc;
Ee.toFormData = Ws;
Ee.AxiosError = X;
Ee.Cancel = Ee.CanceledError;
Ee.all = function(t) {
  return Promise.all(t);
};
Ee.spread = Jp;
Ee.isAxiosError = Xp;
Ee.mergeConfig = Zt;
Ee.AxiosHeaders = Ge;
Ee.formToJSON = (e) => gc(S.isHTMLForm(e) ? new FormData(e) : e);
Ee.getAdapter = Ec.getAdapter;
Ee.HttpStatusCode = Dr;
Ee.default = Ee;
const {
  Axios: fm,
  AxiosError: dm,
  CanceledError: hm,
  isCancel: pm,
  CancelToken: mm,
  VERSION: gm,
  all: ym,
  Cancel: bm,
  isAxiosError: _m,
  spread: vm,
  toFormData: wm,
  AxiosHeaders: Em,
  HttpStatusCode: Sm,
  formToJSON: xm,
  getAdapter: Rm,
  mergeConfig: Cm
} = Ee;
let Cc = "";
const Yp = () => Cc, Qp = (e) => {
  Cc = e;
}, Zp = (e) => async (t = {}, n = {}) => {
  const { url: s, method: r } = e;
  let o = s;
  ec().currentPath.startsWith("/butter") && (o = s.replace("/image", "/butter"));
  const l = Yp();
  return Ee.request({
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
  t && (ve[e] = Zp(t));
}
const em = { class: "image-wrap" }, rs = /* @__PURE__ */ Be({
  __name: "ImageWrap",
  setup(e) {
    const t = he([]), n = he(""), s = Zl(), r = vd();
    let o = he({
      mid: "",
      name: "",
      feature: "",
      type: "",
      image: "",
      children: []
    });
    const i = async () => {
      if (!ve.getCatalog) return;
      const E = await ve.getCatalog({});
      t.value = E;
    }, l = () => {
      const E = s.path.includes("/butter"), C = s.path.includes("/edit");
      let R = E ? "/butter" : "/story";
      return C && (R += "/edit"), R;
    }, c = ({ child: E }) => {
      const C = l(), R = E.mid;
      r.replace({ path: `${C}/${R}` });
    };
    _t(n, (E) => {
      E && u(E);
    }), _t(() => s.params.mid, (E) => {
      typeof E == "string" && (n.value = E);
    });
    const u = (E) => {
      ve.openImage && ve.openImage({
        mid: E
      }).then((C) => {
        o.value = C;
      });
    }, a = async (E) => {
      if (E?.children?.length && ve.updateImage)
        try {
          await Promise.all(E.children.map((C) => ve.updateImage({
            eid: C.options.eid,
            type: C.type,
            options: C.options
          })));
        } catch (C) {
          window.alert(C?.message || "更新失败");
        }
    }, f = async (E, C) => {
      if (!E?.name || !E?.image) {
        window.alert("缺少必要的故事信息");
        return;
      }
      if (ve.createImage)
        try {
          const R = await ve.createImage(E), M = R?.mid || R?.data?.mid;
          if (!M) {
            window.alert(R?.message || "创建失败");
            return;
          }
          await i(), n.value = M, await u(M), C?.();
        } catch (R) {
          window.alert(R?.message || "创建失败");
        }
    }, m = async (E) => {
      !E?.mid || !E?.name || !ve.updateName || await ve.updateName({ mid: E.mid, name: E.name });
    }, y = async ({ mid: E, type: C }) => {
      const R = E || n.value;
      !R || !ve.createLayer || (await ve.createLayer({ mid: R, type: C || We.TEXT }), u(R));
    }, b = async ({ mid: E, eid: C }) => {
      const R = E || n.value;
      !R || !C || !ve.deleteLayer || (await ve.deleteLayer({ mid: R, eid: C }), u(R));
    }, v = async ({ mid: E, eid: C, direction: R }) => {
      const M = E || n.value;
      !M || !C || !ve.reorderLayer || (await ve.reorderLayer({ mid: M, eid: C, direction: R }), u(M));
    }, _ = he([]);
    Tn("commands", _);
    const T = async () => {
      if (!ve.getConfig) return;
      const { commands: E } = await ve.getConfig({});
      _.value = E;
    };
    return Ds(() => {
      i(), T();
      const E = s.params.mid;
      E && (n.value = E);
    }), (E, C) => (q(), re("div", em, [
      ee(xd, {
        current: n.value,
        "catalog-list": t.value,
        onChange: c
      }, null, 8, ["current", "catalog-list"]),
      B(o).image ? (q(), Fe(wh, {
        key: 0,
        story: B(o),
        onChange: a,
        onCreate: f,
        onUpdateName: m,
        onCreateLayer: y,
        onDeleteLayer: b,
        onReorderLayer: v
      }, null, 8, ["story"])) : zt("", !0)
    ]));
  }
}), tm = {}, nm = { class: "warn-center" };
function sm(e, t) {
  return q(), re("div", nm, " 功能已不再维护，感谢您过去的热爱。 ");
}
const rm = /* @__PURE__ */ Us(tm, [["render", sm]]), om = { class: "material-center" }, im = /* @__PURE__ */ Be({
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
    }), (n, s) => (q(), re("div", om, " 什么都没有的荒原 "));
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
], Ac = _d({
  history: Yf(),
  routes: lm
});
Ac.beforeResolve(async (e) => {
  e.path && ec().setPath(e.path);
});
const cm = (e, t) => {
  Qp(t || "http://localhost:8080");
  const n = Zu(df);
  return n.use(nf()), n.use(Ac), n.mount(e);
}, Am = {
  load: cm
};
export {
  Am as default
};
