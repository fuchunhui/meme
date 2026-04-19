// @__NO_SIDE_EFFECTS__
function Mr(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const pe = {}, on = [], ct = () => {
}, Ei = () => !1, ws = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), kr = (e) => e.startsWith("onUpdate:"), Le = Object.assign, Fr = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Pa = Object.prototype.hasOwnProperty, fe = (e, t) => Pa.call(e, t), Q = Array.isArray, ln = (e) => Es(e) === "[object Map]", Si = (e) => Es(e) === "[object Set]", Z = (e) => typeof e == "function", Ae = (e) => typeof e == "string", Mt = (e) => typeof e == "symbol", be = (e) => e !== null && typeof e == "object", xi = (e) => (be(e) || Z(e)) && Z(e.then) && Z(e.catch), Ri = Object.prototype.toString, Es = (e) => Ri.call(e), Ia = (e) => Es(e).slice(8, -1), Ci = (e) => Es(e) === "[object Object]", Ss = (e) => Ae(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Cn = /* @__PURE__ */ Mr(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), xs = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Na = /-\w/g, at = xs(
  (e) => e.replace(Na, (t) => t.slice(1).toUpperCase())
), Da = /\B([A-Z])/g, Wt = xs(
  (e) => e.replace(Da, "-$1").toLowerCase()
), Rs = xs((e) => e.charAt(0).toUpperCase() + e.slice(1)), Gs = xs(
  (e) => e ? `on${Rs(e)}` : ""
), qt = (e, t) => !Object.is(e, t), zs = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Ai = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Ma = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let io;
const Cs = () => io || (io = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function un(e) {
  if (Q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = Ae(s) ? $a(s) : un(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (Ae(e) || be(e))
    return e;
}
const ka = /;(?![^(]*\))/g, Fa = /:([^]+)/, La = /\/\*[^]*?\*\//g;
function $a(e) {
  const t = {};
  return e.replace(La, "").split(ka).forEach((n) => {
    if (n) {
      const s = n.split(Fa);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function kt(e) {
  let t = "";
  if (Ae(e))
    t = e;
  else if (Q(e))
    for (let n = 0; n < e.length; n++) {
      const s = kt(e[n]);
      s && (t += s + " ");
    }
  else if (be(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Ua = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Ba = /* @__PURE__ */ Mr(Ua);
function Oi(e) {
  return !!e || e === "";
}
const Ti = (e) => !!(e && e.__v_isRef === !0), ge = (e) => Ae(e) ? e : e == null ? "" : Q(e) || be(e) && (e.toString === Ri || !Z(e.toString)) ? Ti(e) ? ge(e.value) : JSON.stringify(e, Pi, 2) : String(e), Pi = (e, t) => Ti(t) ? Pi(e, t.value) : ln(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], o) => (n[Ks(s, o) + " =>"] = r, n),
    {}
  )
} : Si(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Ks(n))
} : Mt(t) ? Ks(t) : be(t) && !Q(t) && !Ci(t) ? String(t) : t, Ks = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Mt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
var ja = { NODE_ENV: "production" };
let Me;
class Ii {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Me, !t && Me && (this.index = (Me.scopes || (Me.scopes = [])).push(
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
      const n = Me;
      try {
        return Me = this, t();
      } finally {
        Me = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Me, Me = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Me = this.prevScope, this.prevScope = void 0);
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
function Ni(e) {
  return new Ii(e);
}
function Di() {
  return Me;
}
function Ha(e, t = !1) {
  Me && Me.cleanups.push(e);
}
let ye;
const Js = /* @__PURE__ */ new WeakSet();
class Mi {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Me && Me.active && Me.effects.push(this);
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
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Fi(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, lo(this), Li(this);
    const t = ye, n = ut;
    ye = this, ut = !0;
    try {
      return this.fn();
    } finally {
      $i(this), ye = t, ut = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Ur(t);
      this.deps = this.depsTail = void 0, lo(this), this.onStop && this.onStop(), this.flags &= -2;
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
let ki = 0, An, On;
function Fi(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = On, On = e;
    return;
  }
  e.next = An, An = e;
}
function Lr() {
  ki++;
}
function $r() {
  if (--ki > 0)
    return;
  if (On) {
    let t = On;
    for (On = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; An; ) {
    let t = An;
    for (An = void 0; t; ) {
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
function $i(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), Ur(s), Va(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function hr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ui(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ui(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ln) || (e.globalVersion = Ln, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !hr(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ye, s = ut;
  ye = e, ut = !0;
  try {
    Li(e);
    const r = e.fn(e._value);
    (t.version === 0 || qt(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    ye = n, ut = s, $i(e), e.flags &= -3;
  }
}
function Ur(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep)
      Ur(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Va(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let ut = !0;
const Bi = [];
function Et() {
  Bi.push(ut), ut = !1;
}
function St() {
  const e = Bi.pop();
  ut = e === void 0 ? !0 : e;
}
function lo(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = ye;
    ye = void 0;
    try {
      t();
    } finally {
      ye = n;
    }
  }
}
let Ln = 0;
class qa {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Br {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ye || !ut || ye === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ye)
      n = this.activeLink = new qa(ye, this), ye.deps ? (n.prevDep = ye.depsTail, ye.depsTail.nextDep = n, ye.depsTail = n) : ye.deps = ye.depsTail = n, ji(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = ye.depsTail, n.nextDep = void 0, ye.depsTail.nextDep = n, ye.depsTail = n, ye.deps === n && (ye.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, Ln++, this.notify(t);
  }
  notify(t) {
    Lr();
    try {
      ja.NODE_ENV;
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      $r();
    }
  }
}
function ji(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        ji(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const fs = /* @__PURE__ */ new WeakMap(), Yt = /* @__PURE__ */ Symbol(
  ""
), pr = /* @__PURE__ */ Symbol(
  ""
), $n = /* @__PURE__ */ Symbol(
  ""
);
function ke(e, t, n) {
  if (ut && ye) {
    let s = fs.get(e);
    s || fs.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new Br()), r.map = s, r.key = n), r.track();
  }
}
function Ot(e, t, n, s, r, o) {
  const i = fs.get(e);
  if (!i) {
    Ln++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (Lr(), t === "clear")
    i.forEach(l);
  else {
    const a = Q(e), u = a && Ss(n);
    if (a && n === "length") {
      const c = Number(s);
      i.forEach((f, m) => {
        (m === "length" || m === $n || !Mt(m) && m >= c) && l(f);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), u && l(i.get($n)), t) {
        case "add":
          a ? u && l(i.get("length")) : (l(i.get(Yt)), ln(e) && l(i.get(pr)));
          break;
        case "delete":
          a || (l(i.get(Yt)), ln(e) && l(i.get(pr)));
          break;
        case "set":
          ln(e) && l(i.get(Yt));
          break;
      }
  }
  $r();
}
function Wa(e, t) {
  const n = fs.get(e);
  return n && n.get(t);
}
function tn(e) {
  const t = ie(e);
  return t === e ? t : (ke(t, "iterate", $n), rt(e) ? t : t.map(dt));
}
function As(e) {
  return ke(e = ie(e), "iterate", $n), e;
}
function Ut(e, t) {
  return Nt(e) ? It(e) ? fn(dt(t)) : fn(t) : dt(t);
}
const Ga = {
  __proto__: null,
  [Symbol.iterator]() {
    return Xs(this, Symbol.iterator, (e) => Ut(this, e));
  },
  concat(...e) {
    return tn(this).concat(
      ...e.map((t) => Q(t) ? tn(t) : t)
    );
  },
  entries() {
    return Xs(this, "entries", (e) => (e[1] = Ut(this, e[1]), e));
  },
  every(e, t) {
    return Rt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Rt(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => Ut(this, s)),
      arguments
    );
  },
  find(e, t) {
    return Rt(
      this,
      "find",
      e,
      t,
      (n) => Ut(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return Rt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Rt(
      this,
      "findLast",
      e,
      t,
      (n) => Ut(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Rt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Rt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Ys(this, "includes", e);
  },
  indexOf(...e) {
    return Ys(this, "indexOf", e);
  },
  join(e) {
    return tn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Ys(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Rt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return bn(this, "pop");
  },
  push(...e) {
    return bn(this, "push", e);
  },
  reduce(e, ...t) {
    return ao(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return ao(this, "reduceRight", e, t);
  },
  shift() {
    return bn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Rt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return bn(this, "splice", e);
  },
  toReversed() {
    return tn(this).toReversed();
  },
  toSorted(e) {
    return tn(this).toSorted(e);
  },
  toSpliced(...e) {
    return tn(this).toSpliced(...e);
  },
  unshift(...e) {
    return bn(this, "unshift", e);
  },
  values() {
    return Xs(this, "values", (e) => Ut(this, e));
  }
};
function Xs(e, t, n) {
  const s = As(e), r = s[t]();
  return s !== e && !rt(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.done || (o.value = n(o.value)), o;
  }), r;
}
const za = Array.prototype;
function Rt(e, t, n, s, r, o) {
  const i = As(e), l = i !== e && !rt(e), a = i[t];
  if (a !== za[t]) {
    const f = a.apply(e, o);
    return l ? dt(f) : f;
  }
  let u = n;
  i !== e && (l ? u = function(f, m) {
    return n.call(this, Ut(e, f), m, e);
  } : n.length > 2 && (u = function(f, m) {
    return n.call(this, f, m, e);
  }));
  const c = a.call(i, u, s);
  return l && r ? r(c) : c;
}
function ao(e, t, n, s) {
  const r = As(e);
  let o = n;
  return r !== e && (rt(e) ? n.length > 3 && (o = function(i, l, a) {
    return n.call(this, i, l, a, e);
  }) : o = function(i, l, a) {
    return n.call(this, i, Ut(e, l), a, e);
  }), r[t](o, ...s);
}
function Ys(e, t, n) {
  const s = ie(e);
  ke(s, "iterate", $n);
  const r = s[t](...n);
  return (r === -1 || r === !1) && Ps(n[0]) ? (n[0] = ie(n[0]), s[t](...n)) : r;
}
function bn(e, t, n = []) {
  Et(), Lr();
  const s = ie(e)[t].apply(e, n);
  return $r(), St(), s;
}
const Ka = /* @__PURE__ */ Mr("__proto__,__v_isRef,__isVue"), Hi = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Mt)
);
function Ja(e) {
  Mt(e) || (e = String(e));
  const t = ie(this);
  return ke(t, "has", e), t.hasOwnProperty(e);
}
class Vi {
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
      return s === (r ? o ? Ji : Ki : o ? zi : Gi).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = Q(t);
    if (!r) {
      let a;
      if (i && (a = Ga[n]))
        return a;
      if (n === "hasOwnProperty")
        return Ja;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      xe(t) ? t : s
    );
    if ((Mt(n) ? Hi.has(n) : Ka(n)) || (r || ke(t, "get", n), o))
      return l;
    if (xe(l)) {
      const a = i && Ss(n) ? l : l.value;
      return r && be(a) ? gr(a) : a;
    }
    return be(l) ? r ? gr(l) : Wn(l) : l;
  }
}
class qi extends Vi {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    const i = Q(t) && Ss(n);
    if (!this._isShallow) {
      const u = Nt(o);
      if (!rt(s) && !Nt(s) && (o = ie(o), s = ie(s)), !i && xe(o) && !xe(s))
        return u || (o.value = s), !0;
    }
    const l = i ? Number(n) < t.length : fe(t, n), a = Reflect.set(
      t,
      n,
      s,
      xe(t) ? t : r
    );
    return t === ie(r) && (l ? qt(s, o) && Ot(t, "set", n, s) : Ot(t, "add", n, s)), a;
  }
  deleteProperty(t, n) {
    const s = fe(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && Ot(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Mt(n) || !Hi.has(n)) && ke(t, "has", n), s;
  }
  ownKeys(t) {
    return ke(
      t,
      "iterate",
      Q(t) ? "length" : Yt
    ), Reflect.ownKeys(t);
  }
}
class Wi extends Vi {
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
const Xa = /* @__PURE__ */ new qi(), Ya = /* @__PURE__ */ new Wi(), Qa = /* @__PURE__ */ new qi(!0), Za = /* @__PURE__ */ new Wi(!0), mr = (e) => e, Qn = (e) => Reflect.getPrototypeOf(e);
function ec(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = ie(r), i = ln(o), l = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, u = r[e](...s), c = n ? mr : t ? fn : dt;
    return !t && ke(
      o,
      "iterate",
      a ? pr : Yt
    ), {
      // iterator protocol
      next() {
        const { value: f, done: m } = u.next();
        return m ? { value: f, done: m } : {
          value: l ? [c(f[0]), c(f[1])] : c(f),
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
function tc(e, t) {
  const n = {
    get(r) {
      const o = this.__v_raw, i = ie(o), l = ie(r);
      e || (qt(r, l) && ke(i, "get", r), ke(i, "get", l));
      const { has: a } = Qn(i), u = t ? mr : e ? fn : dt;
      if (a.call(i, r))
        return u(o.get(r));
      if (a.call(i, l))
        return u(o.get(l));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && ke(ie(r), "iterate", Yt), r.size;
    },
    has(r) {
      const o = this.__v_raw, i = ie(o), l = ie(r);
      return e || (qt(r, l) && ke(i, "has", r), ke(i, "has", l)), r === l ? o.has(r) : o.has(r) || o.has(l);
    },
    forEach(r, o) {
      const i = this, l = i.__v_raw, a = ie(l), u = t ? mr : e ? fn : dt;
      return !e && ke(a, "iterate", Yt), l.forEach((c, f) => r.call(o, u(c), u(f), i));
    }
  };
  return Le(
    n,
    e ? {
      add: Zn("add"),
      set: Zn("set"),
      delete: Zn("delete"),
      clear: Zn("clear")
    } : {
      add(r) {
        !t && !rt(r) && !Nt(r) && (r = ie(r));
        const o = ie(this);
        return Qn(o).has.call(o, r) || (o.add(r), Ot(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !rt(o) && !Nt(o) && (o = ie(o));
        const i = ie(this), { has: l, get: a } = Qn(i);
        let u = l.call(i, r);
        u || (r = ie(r), u = l.call(i, r));
        const c = a.call(i, r);
        return i.set(r, o), u ? qt(o, c) && Ot(i, "set", r, o) : Ot(i, "add", r, o), this;
      },
      delete(r) {
        const o = ie(this), { has: i, get: l } = Qn(o);
        let a = i.call(o, r);
        a || (r = ie(r), a = i.call(o, r)), l && l.call(o, r);
        const u = o.delete(r);
        return a && Ot(o, "delete", r, void 0), u;
      },
      clear() {
        const r = ie(this), o = r.size !== 0, i = r.clear();
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
    n[r] = ec(r, e, t);
  }), n;
}
function Os(e, t) {
  const n = tc(e, t);
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    fe(n, r) && r in s ? n : s,
    r,
    o
  );
}
const nc = {
  get: /* @__PURE__ */ Os(!1, !1)
}, sc = {
  get: /* @__PURE__ */ Os(!1, !0)
}, rc = {
  get: /* @__PURE__ */ Os(!0, !1)
}, oc = {
  get: /* @__PURE__ */ Os(!0, !0)
}, Gi = /* @__PURE__ */ new WeakMap(), zi = /* @__PURE__ */ new WeakMap(), Ki = /* @__PURE__ */ new WeakMap(), Ji = /* @__PURE__ */ new WeakMap();
function ic(e) {
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
function lc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ic(Ia(e));
}
function Wn(e) {
  return Nt(e) ? e : Ts(
    e,
    !1,
    Xa,
    nc,
    Gi
  );
}
function Xi(e) {
  return Ts(
    e,
    !1,
    Qa,
    sc,
    zi
  );
}
function gr(e) {
  return Ts(
    e,
    !0,
    Ya,
    rc,
    Ki
  );
}
function es(e) {
  return Ts(
    e,
    !0,
    Za,
    oc,
    Ji
  );
}
function Ts(e, t, n, s, r) {
  if (!be(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = lc(e);
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
function It(e) {
  return Nt(e) ? It(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Nt(e) {
  return !!(e && e.__v_isReadonly);
}
function rt(e) {
  return !!(e && e.__v_isShallow);
}
function Ps(e) {
  return e ? !!e.__v_raw : !1;
}
function ie(e) {
  const t = e && e.__v_raw;
  return t ? ie(t) : e;
}
function jr(e) {
  return !fe(e, "__v_skip") && Object.isExtensible(e) && Ai(e, "__v_skip", !0), e;
}
const dt = (e) => be(e) ? Wn(e) : e, fn = (e) => be(e) ? gr(e) : e;
function xe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function se(e) {
  return Yi(e, !1);
}
function ac(e) {
  return Yi(e, !0);
}
function Yi(e, t) {
  return xe(e) ? e : new cc(e, t);
}
class cc {
  constructor(t, n) {
    this.dep = new Br(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : ie(t), this._value = n ? t : dt(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || rt(t) || Nt(t);
    t = s ? t : ie(t), qt(t, n) && (this._rawValue = t, this._value = s ? t : dt(t), this.dep.trigger());
  }
}
function V(e) {
  return xe(e) ? e.value : e;
}
const uc = {
  get: (e, t, n) => t === "__v_raw" ? e : V(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return xe(r) && !xe(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Qi(e) {
  return It(e) ? e : new Proxy(e, uc);
}
function Gn(e) {
  const t = Q(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = dc(e, n);
  return t;
}
class fc {
  constructor(t, n, s) {
    this._object = t, this._key = n, this._defaultValue = s, this.__v_isRef = !0, this._value = void 0, this._raw = ie(t);
    let r = !0, o = t;
    if (!Q(t) || !Ss(String(n)))
      do
        r = !Ps(o) || rt(o);
      while (r && (o = o.__v_raw));
    this._shallow = r;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = V(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && xe(this._raw[this._key])) {
      const n = this._object[this._key];
      if (xe(n)) {
        n.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return Wa(this._raw, this._key);
  }
}
function dc(e, t, n) {
  return new fc(e, t, n);
}
class hc {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Br(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ln - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ye !== this)
      return Fi(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Ui(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function pc(e, t, n = !1) {
  let s, r;
  return Z(e) ? s = e : (s = e.get, r = e.set), new hc(s, r, n);
}
const ts = {}, ds = /* @__PURE__ */ new WeakMap();
let Kt;
function mc(e, t = !1, n = Kt) {
  if (n) {
    let s = ds.get(n);
    s || ds.set(n, s = []), s.push(e);
  }
}
function gc(e, t, n = pe) {
  const { immediate: s, deep: r, once: o, scheduler: i, augmentJob: l, call: a } = n, u = (R) => r ? R : rt(R) || r === !1 || r === 0 ? Tt(R, 1) : Tt(R);
  let c, f, m, g, _ = !1, b = !1;
  if (xe(e) ? (f = () => e.value, _ = rt(e)) : It(e) ? (f = () => u(e), _ = !0) : Q(e) ? (b = !0, _ = e.some((R) => It(R) || rt(R)), f = () => e.map((R) => {
    if (xe(R))
      return R.value;
    if (It(R))
      return u(R);
    if (Z(R))
      return a ? a(R, 2) : R();
  })) : Z(e) ? t ? f = a ? () => a(e, 2) : e : f = () => {
    if (m) {
      Et();
      try {
        m();
      } finally {
        St();
      }
    }
    const R = Kt;
    Kt = c;
    try {
      return a ? a(e, 3, [g]) : e(g);
    } finally {
      Kt = R;
    }
  } : f = ct, t && r) {
    const R = f, F = r === !0 ? 1 / 0 : r;
    f = () => Tt(R(), F);
  }
  const v = Di(), O = () => {
    c.stop(), v && v.active && Fr(v.effects, c);
  };
  if (o && t) {
    const R = t;
    t = (...F) => {
      R(...F), O();
    };
  }
  let E = b ? new Array(e.length).fill(ts) : ts;
  const C = (R) => {
    if (!(!(c.flags & 1) || !c.dirty && !R))
      if (t) {
        const F = c.run();
        if (r || _ || (b ? F.some((q, L) => qt(q, E[L])) : qt(F, E))) {
          m && m();
          const q = Kt;
          Kt = c;
          try {
            const L = [
              F,
              // pass undefined as the old value when it's changed for the first time
              E === ts ? void 0 : b && E[0] === ts ? [] : E,
              g
            ];
            E = F, a ? a(t, 3, L) : (
              // @ts-expect-error
              t(...L)
            );
          } finally {
            Kt = q;
          }
        }
      } else
        c.run();
  };
  return l && l(C), c = new Mi(f), c.scheduler = i ? () => i(C, !1) : C, g = (R) => mc(R, !1, c), m = c.onStop = () => {
    const R = ds.get(c);
    if (R) {
      if (a)
        a(R, 4);
      else
        for (const F of R) F();
      ds.delete(c);
    }
  }, t ? s ? C(!0) : E = c.run() : i ? i(C.bind(null, !0), !0) : c.run(), O.pause = c.pause.bind(c), O.resume = c.resume.bind(c), O.stop = O, O;
}
function Tt(e, t = 1 / 0, n) {
  if (t <= 0 || !be(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, xe(e))
    Tt(e.value, t, n);
  else if (Q(e))
    for (let s = 0; s < e.length; s++)
      Tt(e[s], t, n);
  else if (Si(e) || ln(e))
    e.forEach((s) => {
      Tt(s, t, n);
    });
  else if (Ci(e)) {
    for (const s in e)
      Tt(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && Tt(e[s], t, n);
  }
  return e;
}
var Bt = { NODE_ENV: "production" };
const Tn = [];
let Qs = !1;
function yc(e, ...t) {
  if (Qs) return;
  Qs = !0, Et();
  const n = Tn.length ? Tn[Tn.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = _c();
  if (s)
    gn(
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
          ({ vnode: o }) => `at <${kl(n, o.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...vc(r)), console.warn(...o);
  }
  St(), Qs = !1;
}
function _c() {
  let e = Tn[Tn.length - 1];
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
function vc(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...bc(n));
  }), t;
}
function bc({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${kl(
    e.component,
    e.type,
    s
  )}`, o = ">" + n;
  return e.props ? [r, ...wc(e.props), o] : [r + o];
}
function wc(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...Zi(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Zi(e, t, n) {
  return Ae(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : xe(t) ? (t = Zi(e, ie(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : Z(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = ie(t), n ? t : [`${e}=`, t]);
}
function gn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    Is(r, t, n);
  }
}
function xt(e, t, n, s) {
  if (Z(e)) {
    const r = gn(e, t, n, s);
    return r && xi(r) && r.catch((o) => {
      Is(o, t, n);
    }), r;
  }
  if (Q(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(xt(e[o], t, n, s));
    return r;
  }
}
function Is(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || pe;
  if (t) {
    let l = t.parent;
    const a = t.proxy, u = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const c = l.ec;
      if (c) {
        for (let f = 0; f < c.length; f++)
          if (c[f](e, a, u) === !1)
            return;
      }
      l = l.parent;
    }
    if (o) {
      Et(), gn(o, null, 10, [
        e,
        a,
        u
      ]), St();
      return;
    }
  }
  Ec(e, n, r, s, i);
}
function Ec(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const Ve = [];
let bt = -1;
const an = [];
let jt = null, sn = 0;
const el = /* @__PURE__ */ Promise.resolve();
let hs = null;
function Hr(e) {
  const t = hs || el;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Sc(e) {
  let t = bt + 1, n = Ve.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = Ve[s], o = Un(r);
    o < e || o === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function Vr(e) {
  if (!(e.flags & 1)) {
    const t = Un(e), n = Ve[Ve.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Un(n) ? Ve.push(e) : Ve.splice(Sc(t), 0, e), e.flags |= 1, tl();
  }
}
function tl() {
  hs || (hs = el.then(sl));
}
function xc(e) {
  Q(e) ? an.push(...e) : jt && e.id === -1 ? jt.splice(sn + 1, 0, e) : e.flags & 1 || (an.push(e), e.flags |= 1), tl();
}
function co(e, t, n = bt + 1) {
  for (; n < Ve.length; n++) {
    const s = Ve[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      Ve.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function nl(e) {
  if (an.length) {
    const t = [...new Set(an)].sort(
      (n, s) => Un(n) - Un(s)
    );
    if (an.length = 0, jt) {
      jt.push(...t);
      return;
    }
    for (jt = t, sn = 0; sn < jt.length; sn++) {
      const n = jt[sn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    jt = null, sn = 0;
  }
}
const Un = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function sl(e) {
  const t = ct;
  try {
    for (bt = 0; bt < Ve.length; bt++) {
      const n = Ve[bt];
      n && !(n.flags & 8) && (Bt.NODE_ENV !== "production" && t(n), n.flags & 4 && (n.flags &= -2), gn(
        n,
        n.i,
        n.i ? 15 : 14
      ), n.flags & 4 || (n.flags &= -2));
    }
  } finally {
    for (; bt < Ve.length; bt++) {
      const n = Ve[bt];
      n && (n.flags &= -2);
    }
    bt = -1, Ve.length = 0, nl(), hs = null, (Ve.length || an.length) && sl();
  }
}
let Ne = null, rl = null;
function ps(e) {
  const t = Ne;
  return Ne = e, rl = e && e.type.__scopeId || null, t;
}
function Bn(e, t = Ne, n) {
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
function uo(e, t) {
  if (Ne === null)
    return e;
  const n = Fs(Ne), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, i, l, a = pe] = t[r];
    o && (Z(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && Tt(i), s.push({
      dir: o,
      instance: n,
      value: i,
      oldValue: void 0,
      arg: l,
      modifiers: a
    }));
  }
  return e;
}
function Gt(e, t, n, s) {
  const r = e.dirs, o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    o && (l.oldValue = o[i].value);
    let a = l.dir[s];
    a && (Et(), xt(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), St());
  }
}
function Pn(e, t) {
  if (Ie) {
    let n = Ie.provides;
    const s = Ie.parent && Ie.parent.provides;
    s === n && (n = Ie.provides = Object.create(s)), n[e] = t;
  }
}
function ot(e, t, n = !1) {
  const s = Il();
  if (s || Qt) {
    let r = Qt ? Qt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && Z(t) ? t.call(s && s.proxy) : t;
  }
}
function Rc() {
  return !!(Il() || Qt);
}
const Cc = /* @__PURE__ */ Symbol.for("v-scx"), Ac = () => ot(Cc);
function ft(e, t, n) {
  return ol(e, t, n);
}
function ol(e, t, n = pe) {
  const { immediate: s, deep: r, flush: o, once: i } = n, l = Le({}, n), a = t && s || !t && o !== "post";
  let u;
  if (Vn) {
    if (o === "sync") {
      const g = Ac();
      u = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!a) {
      const g = () => {
      };
      return g.stop = ct, g.resume = ct, g.pause = ct, g;
    }
  }
  const c = Ie;
  l.call = (g, _, b) => xt(g, c, _, b);
  let f = !1;
  o === "post" ? l.scheduler = (g) => {
    et(g, c && c.suspense);
  } : o !== "sync" && (f = !0, l.scheduler = (g, _) => {
    _ ? g() : Vr(g);
  }), l.augmentJob = (g) => {
    t && (g.flags |= 4), f && (g.flags |= 2, c && (g.id = c.uid, g.i = c));
  };
  const m = gc(e, t, l);
  return Vn && (u ? u.push(m) : a && m()), m;
}
function Oc(e, t, n) {
  const s = this.proxy, r = Ae(e) ? e.includes(".") ? il(s, e) : () => s[e] : e.bind(s, s);
  let o;
  Z(t) ? o = t : (o = t.handler, n = t);
  const i = zn(this), l = ol(r, o.bind(s), n);
  return i(), l;
}
function il(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const Tc = /* @__PURE__ */ Symbol("_vte"), Pc = (e) => e.__isTeleport, Ic = /* @__PURE__ */ Symbol("_leaveCb");
function qr(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, qr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function We(e, t) {
  return Z(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Le({ name: e.name }, t, { setup: e })
  ) : e;
}
function ll(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const ms = /* @__PURE__ */ new WeakMap();
function In(e, t, n, s, r = !1) {
  if (Q(e)) {
    e.forEach(
      (_, b) => In(
        _,
        t && (Q(t) ? t[b] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (cn(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && In(e, t, n, s.component.subTree);
    return;
  }
  const o = s.shapeFlag & 4 ? Fs(s.component) : s.el, i = r ? null : o, { i: l, r: a } = e, u = t && t.r, c = l.refs === pe ? l.refs = {} : l.refs, f = l.setupState, m = ie(f), g = f === pe ? Ei : (_) => fe(m, _);
  if (u != null && u !== a) {
    if (fo(t), Ae(u))
      c[u] = null, g(u) && (f[u] = null);
    else if (xe(u)) {
      u.value = null;
      const _ = t;
      _.k && (c[_.k] = null);
    }
  }
  if (Z(a))
    gn(a, l, 12, [i, c]);
  else {
    const _ = Ae(a), b = xe(a);
    if (_ || b) {
      const v = () => {
        if (e.f) {
          const O = _ ? g(a) ? f[a] : c[a] : a.value;
          if (r)
            Q(O) && Fr(O, o);
          else if (Q(O))
            O.includes(o) || O.push(o);
          else if (_)
            c[a] = [o], g(a) && (f[a] = c[a]);
          else {
            const E = [o];
            a.value = E, e.k && (c[e.k] = E);
          }
        } else _ ? (c[a] = i, g(a) && (f[a] = i)) : b && (a.value = i, e.k && (c[e.k] = i));
      };
      if (i) {
        const O = () => {
          v(), ms.delete(e);
        };
        O.id = -1, ms.set(e, O), et(O, n);
      } else
        fo(e), v();
    }
  }
}
function fo(e) {
  const t = ms.get(e);
  t && (t.flags |= 8, ms.delete(e));
}
Cs().requestIdleCallback;
Cs().cancelIdleCallback;
const cn = (e) => !!e.type.__asyncLoader, al = (e) => e.type.__isKeepAlive;
function Nc(e, t) {
  cl(e, "a", t);
}
function Dc(e, t) {
  cl(e, "da", t);
}
function cl(e, t, n = Ie) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Ns(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      al(r.parent.vnode) && Mc(s, t, n, r), r = r.parent;
  }
}
function Mc(e, t, n, s) {
  const r = Ns(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  fl(() => {
    Fr(s[t], r);
  }, n);
}
function Ns(e, t, n = Ie, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      Et();
      const l = zn(n), a = xt(t, n, e, i);
      return l(), St(), a;
    });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const Ft = (e) => (t, n = Ie) => {
  (!Vn || e === "sp") && Ns(e, (...s) => t(...s), n);
}, kc = Ft("bm"), Ds = Ft("m"), Fc = Ft(
  "bu"
), Lc = Ft("u"), ul = Ft(
  "bum"
), fl = Ft("um"), $c = Ft(
  "sp"
), Uc = Ft("rtg"), Bc = Ft("rtc");
function jc(e, t = Ie) {
  Ns("ec", e, t);
}
const Hc = "components";
function Vc(e, t) {
  return Wc(Hc, e, !0, t) || e;
}
const qc = /* @__PURE__ */ Symbol.for("v-ndc");
function Wc(e, t, n = !0, s = !1) {
  const r = Ne || Ie;
  if (r) {
    const o = r.type;
    {
      const l = Ml(
        o,
        !1
      );
      if (l && (l === t || l === at(t) || l === Rs(at(t))))
        return o;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      ho(r[e] || o[e], t) || // global registration
      ho(r.appContext[e], t)
    );
    return !i && s ? o : i;
  }
}
function ho(e, t) {
  return e && (e[t] || e[at(t)] || e[Rs(at(t))]);
}
function Pt(e, t, n, s) {
  let r;
  const o = n, i = Q(e);
  if (i || Ae(e)) {
    const l = i && It(e);
    let a = !1, u = !1;
    l && (a = !rt(e), u = Nt(e), e = As(e)), r = new Array(e.length);
    for (let c = 0, f = e.length; c < f; c++)
      r[c] = t(
        a ? u ? fn(dt(e[c])) : dt(e[c]) : e[c],
        c,
        void 0,
        o
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, o);
  } else if (be(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (l, a) => t(l, a, void 0, o)
      );
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let a = 0, u = l.length; a < u; a++) {
        const c = l[a];
        r[a] = t(e[c], c, a, o);
      }
    }
  else
    r = [];
  return r;
}
function Wr(e, t, n = {}, s, r) {
  if (Ne.ce || Ne.parent && cn(Ne.parent) && Ne.parent.ce) {
    const u = Object.keys(n).length > 0;
    return j(), He(
      Ee,
      null,
      [ee("slot", n, s && s())],
      u ? -2 : 64
    );
  }
  let o = e[t];
  o && o._c && (o._d = !1), j();
  const i = o && dl(o(n)), l = n.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  i && i.key, a = He(
    Ee,
    {
      key: (l && !Mt(l) ? l : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!i && s ? "_fb" : "")
    },
    i || (s ? s() : []),
    i && e._ === 1 ? 64 : -2
  );
  return a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), o && o._c && (o._d = !0), a;
}
function dl(e) {
  return e.some((t) => Hn(t) ? !(t.type === Dt || t.type === Ee && !dl(t.children)) : !0) ? e : null;
}
const yr = (e) => e ? Nl(e) ? Fs(e) : yr(e.parent) : null, Nn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Le(/* @__PURE__ */ Object.create(null), {
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
    $options: (e) => pl(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Vr(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Hr.bind(e.proxy)),
    $watch: (e) => Oc.bind(e)
  })
), Zs = (e, t) => e !== pe && !e.__isScriptSetup && fe(e, t), Gc = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: l, appContext: a } = e;
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
        if (r !== pe && fe(r, t))
          return i[t] = 2, r[t];
        if (fe(o, t))
          return i[t] = 3, o[t];
        if (n !== pe && fe(n, t))
          return i[t] = 4, n[t];
        _r && (i[t] = 0);
      }
    }
    const u = Nn[t];
    let c, f;
    if (u)
      return t === "$attrs" && ke(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (c = l.__cssModules) && (c = c[t])
    )
      return c;
    if (n !== pe && fe(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      f = a.config.globalProperties, fe(f, t)
    )
      return f[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return Zs(r, t) ? (r[t] = n, !0) : s !== pe && fe(s, t) ? (s[t] = n, !0) : fe(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, props: o, type: i }
  }, l) {
    let a;
    return !!(n[l] || e !== pe && l[0] !== "$" && fe(e, l) || Zs(t, l) || fe(o, l) || fe(s, l) || fe(Nn, l) || fe(r.config.globalProperties, l) || (a = i.__cssModules) && a[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : fe(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function po(e) {
  return Q(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let _r = !0;
function zc(e) {
  const t = pl(e), n = e.proxy, s = e.ctx;
  _r = !1, t.beforeCreate && mo(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: o,
    methods: i,
    watch: l,
    provide: a,
    inject: u,
    // lifecycle
    created: c,
    beforeMount: f,
    mounted: m,
    beforeUpdate: g,
    updated: _,
    activated: b,
    deactivated: v,
    beforeDestroy: O,
    beforeUnmount: E,
    destroyed: C,
    unmounted: R,
    render: F,
    renderTracked: q,
    renderTriggered: L,
    errorCaptured: J,
    serverPrefetch: X,
    // public API
    expose: ce,
    inheritAttrs: _e,
    // assets
    components: Se,
    directives: we,
    filters: Te
  } = t;
  if (u && Kc(u, s, null), i)
    for (const M in i) {
      const k = i[M];
      Z(k) && (s[M] = k.bind(n));
    }
  if (r) {
    const M = r.call(n, n);
    be(M) && (e.data = Wn(M));
  }
  if (_r = !0, o)
    for (const M in o) {
      const k = o[M], U = Z(k) ? k.bind(n, n) : Z(k.get) ? k.get.bind(n, n) : ct, ve = !Z(k) && Z(k.set) ? k.set.bind(n) : ct, he = Ce({
        get: U,
        set: ve
      });
      Object.defineProperty(s, M, {
        enumerable: !0,
        configurable: !0,
        get: () => he.value,
        set: (le) => he.value = le
      });
    }
  if (l)
    for (const M in l)
      hl(l[M], s, n, M);
  if (a) {
    const M = Z(a) ? a.call(n) : a;
    Reflect.ownKeys(M).forEach((k) => {
      Pn(k, M[k]);
    });
  }
  c && mo(c, e, "c");
  function ne(M, k) {
    Q(k) ? k.forEach((U) => M(U.bind(n))) : k && M(k.bind(n));
  }
  if (ne(kc, f), ne(Ds, m), ne(Fc, g), ne(Lc, _), ne(Nc, b), ne(Dc, v), ne(jc, J), ne(Bc, q), ne(Uc, L), ne(ul, E), ne(fl, R), ne($c, X), Q(ce))
    if (ce.length) {
      const M = e.exposed || (e.exposed = {});
      ce.forEach((k) => {
        Object.defineProperty(M, k, {
          get: () => n[k],
          set: (U) => n[k] = U,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  F && e.render === ct && (e.render = F), _e != null && (e.inheritAttrs = _e), Se && (e.components = Se), we && (e.directives = we), X && ll(e);
}
function Kc(e, t, n = ct) {
  Q(e) && (e = vr(e));
  for (const s in e) {
    const r = e[s];
    let o;
    be(r) ? "default" in r ? o = ot(
      r.from || s,
      r.default,
      !0
    ) : o = ot(r.from || s) : o = ot(r), xe(o) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (i) => o.value = i
    }) : t[s] = o;
  }
}
function mo(e, t, n) {
  xt(
    Q(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function hl(e, t, n, s) {
  let r = s.includes(".") ? il(n, s) : () => n[s];
  if (Ae(e)) {
    const o = t[e];
    Z(o) && ft(r, o);
  } else if (Z(e))
    ft(r, e.bind(n));
  else if (be(e))
    if (Q(e))
      e.forEach((o) => hl(o, t, n, s));
    else {
      const o = Z(e.handler) ? e.handler.bind(n) : t[e.handler];
      Z(o) && ft(r, o, e);
    }
}
function pl(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = o.get(t);
  let a;
  return l ? a = l : !r.length && !n && !s ? a = t : (a = {}, r.length && r.forEach(
    (u) => gs(a, u, i, !0)
  ), gs(a, t, i)), be(t) && o.set(t, a), a;
}
function gs(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && gs(e, o, n, !0), r && r.forEach(
    (i) => gs(e, i, n, !0)
  );
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = Jc[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Jc = {
  data: go,
  props: yo,
  emits: yo,
  // objects
  methods: Rn,
  computed: Rn,
  // lifecycle
  beforeCreate: Be,
  created: Be,
  beforeMount: Be,
  mounted: Be,
  beforeUpdate: Be,
  updated: Be,
  beforeDestroy: Be,
  beforeUnmount: Be,
  destroyed: Be,
  unmounted: Be,
  activated: Be,
  deactivated: Be,
  errorCaptured: Be,
  serverPrefetch: Be,
  // assets
  components: Rn,
  directives: Rn,
  // watch
  watch: Yc,
  // provide / inject
  provide: go,
  inject: Xc
};
function go(e, t) {
  return t ? e ? function() {
    return Le(
      Z(e) ? e.call(this, this) : e,
      Z(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Xc(e, t) {
  return Rn(vr(e), vr(t));
}
function vr(e) {
  if (Q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Be(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Rn(e, t) {
  return e ? Le(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function yo(e, t) {
  return e ? Q(e) && Q(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Le(
    /* @__PURE__ */ Object.create(null),
    po(e),
    po(t ?? {})
  ) : t;
}
function Yc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Le(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Be(e[s], t[s]);
  return n;
}
function ml() {
  return {
    app: null,
    config: {
      isNativeTag: Ei,
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
let Qc = 0;
function Zc(e, t) {
  return function(s, r = null) {
    Z(s) || (s = Le({}, s)), r != null && !be(r) && (r = null);
    const o = ml(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const u = o.app = {
      _uid: Qc++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: Iu,
      get config() {
        return o.config;
      },
      set config(c) {
      },
      use(c, ...f) {
        return i.has(c) || (c && Z(c.install) ? (i.add(c), c.install(u, ...f)) : Z(c) && (i.add(c), c(u, ...f))), u;
      },
      mixin(c) {
        return o.mixins.includes(c) || o.mixins.push(c), u;
      },
      component(c, f) {
        return f ? (o.components[c] = f, u) : o.components[c];
      },
      directive(c, f) {
        return f ? (o.directives[c] = f, u) : o.directives[c];
      },
      mount(c, f, m) {
        if (!a) {
          const g = u._ceVNode || ee(s, r);
          return g.appContext = o, m === !0 ? m = "svg" : m === !1 && (m = void 0), e(g, c, m), a = !0, u._container = c, c.__vue_app__ = u, Fs(g.component);
        }
      },
      onUnmount(c) {
        l.push(c);
      },
      unmount() {
        a && (xt(
          l,
          u._instance,
          16
        ), e(null, u._container), delete u._container.__vue_app__);
      },
      provide(c, f) {
        return o.provides[c] = f, u;
      },
      runWithContext(c) {
        const f = Qt;
        Qt = u;
        try {
          return c();
        } finally {
          Qt = f;
        }
      }
    };
    return u;
  };
}
let Qt = null;
const eu = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${at(t)}Modifiers`] || e[`${Wt(t)}Modifiers`];
function tu(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || pe;
  let r = n;
  const o = t.startsWith("update:"), i = o && eu(s, t.slice(7));
  i && (i.trim && (r = n.map((c) => Ae(c) ? c.trim() : c)), i.number && (r = n.map(Ma)));
  let l, a = s[l = Gs(t)] || // also try camelCase event handler (#2249)
  s[l = Gs(at(t))];
  !a && o && (a = s[l = Gs(Wt(t))]), a && xt(
    a,
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
    e.emitted[l] = !0, xt(
      u,
      e,
      6,
      r
    );
  }
}
const nu = /* @__PURE__ */ new WeakMap();
function gl(e, t, n = !1) {
  const s = n ? nu : t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let i = {}, l = !1;
  if (!Z(e)) {
    const a = (u) => {
      const c = gl(u, t, !0);
      c && (l = !0, Le(i, c));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !l ? (be(e) && s.set(e, null), null) : (Q(o) ? o.forEach((a) => i[a] = null) : Le(i, o), be(e) && s.set(e, i), i);
}
function Ms(e, t) {
  return !e || !ws(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), fe(e, t[0].toLowerCase() + t.slice(1)) || fe(e, Wt(t)) || fe(e, t));
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
    emit: a,
    render: u,
    renderCache: c,
    props: f,
    data: m,
    setupState: g,
    ctx: _,
    inheritAttrs: b
  } = e, v = ps(e);
  let O, E;
  try {
    if (n.shapeFlag & 4) {
      const R = r || s, F = Bt.NODE_ENV !== "production" && g.__isScriptSetup ? new Proxy(R, {
        get(q, L, J) {
          return yc(
            `Property '${String(
              L
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(q, L, J);
        }
      }) : R;
      O = wt(
        u.call(
          F,
          R,
          c,
          Bt.NODE_ENV !== "production" ? es(f) : f,
          g,
          m,
          _
        )
      ), E = l;
    } else {
      const R = t;
      Bt.NODE_ENV, O = wt(
        R.length > 1 ? R(
          Bt.NODE_ENV !== "production" ? es(f) : f,
          Bt.NODE_ENV !== "production" ? {
            get attrs() {
              return es(l);
            },
            slots: i,
            emit: a
          } : { attrs: l, slots: i, emit: a }
        ) : R(
          Bt.NODE_ENV !== "production" ? es(f) : f,
          null
        )
      ), E = t.props ? l : su(l);
    }
  } catch (R) {
    Dn.length = 0, Is(R, e, 1), O = ee(Dt);
  }
  let C = O;
  if (E && b !== !1) {
    const R = Object.keys(E), { shapeFlag: F } = C;
    R.length && F & 7 && (o && R.some(kr) && (E = ru(
      E,
      o
    )), C = dn(C, E, !1, !0));
  }
  return n.dirs && (C = dn(C, null, !1, !0), C.dirs = C.dirs ? C.dirs.concat(n.dirs) : n.dirs), n.transition && qr(C, n.transition), O = C, ps(v), O;
}
const su = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || ws(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, ru = (e, t) => {
  const n = {};
  for (const s in e)
    (!kr(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function ou(e, t, n) {
  const { props: s, children: r, component: o } = e, { props: i, children: l, patchFlag: a } = t, u = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? vo(s, i, u) : !!i;
    if (a & 8) {
      const c = t.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        const m = c[f];
        if (i[m] !== s[m] && !Ms(u, m))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : s === i ? !1 : s ? i ? vo(s, i, u) : !0 : !!i;
  return !1;
}
function vo(e, t, n) {
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
function iu({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const yl = {}, _l = () => Object.create(yl), vl = (e) => Object.getPrototypeOf(e) === yl;
function lu(e, t, n, s = !1) {
  const r = {}, o = _l();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), bl(e, t, r, o);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  n ? e.props = s ? r : Xi(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function au(e, t, n, s) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: i }
  } = e, l = ie(r), [a] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const c = e.vnode.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        let m = c[f];
        if (Ms(e.emitsOptions, m))
          continue;
        const g = t[m];
        if (a)
          if (fe(o, m))
            g !== o[m] && (o[m] = g, u = !0);
          else {
            const _ = at(m);
            r[_] = br(
              a,
              l,
              _,
              g,
              e,
              !1
            );
          }
        else
          g !== o[m] && (o[m] = g, u = !0);
      }
    }
  } else {
    bl(e, t, r, o) && (u = !0);
    let c;
    for (const f in l)
      (!t || // for camelCase
      !fe(t, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Wt(f)) === f || !fe(t, c))) && (a ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[c] !== void 0) && (r[f] = br(
        a,
        l,
        f,
        void 0,
        e,
        !0
      )) : delete r[f]);
    if (o !== l)
      for (const f in o)
        (!t || !fe(t, f)) && (delete o[f], u = !0);
  }
  u && Ot(e.attrs, "set", "");
}
function bl(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let a in t) {
      if (Cn(a))
        continue;
      const u = t[a];
      let c;
      r && fe(r, c = at(a)) ? !o || !o.includes(c) ? n[c] = u : (l || (l = {}))[c] = u : Ms(e.emitsOptions, a) || (!(a in s) || u !== s[a]) && (s[a] = u, i = !0);
    }
  if (o) {
    const a = ie(n), u = l || pe;
    for (let c = 0; c < o.length; c++) {
      const f = o[c];
      n[f] = br(
        r,
        a,
        f,
        u[f],
        e,
        !fe(u, f)
      );
    }
  }
  return i;
}
function br(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const l = fe(i, "default");
    if (l && s === void 0) {
      const a = i.default;
      if (i.type !== Function && !i.skipFactory && Z(a)) {
        const { propsDefaults: u } = r;
        if (n in u)
          s = u[n];
        else {
          const c = zn(r);
          s = u[n] = a.call(
            null,
            t
          ), c();
        }
      } else
        s = a;
      r.ce && r.ce._setProp(n, s);
    }
    i[
      0
      /* shouldCast */
    ] && (o && !l ? s = !1 : i[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === Wt(n)) && (s = !0));
  }
  return s;
}
const cu = /* @__PURE__ */ new WeakMap();
function wl(e, t, n = !1) {
  const s = n ? cu : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const o = e.props, i = {}, l = [];
  let a = !1;
  if (!Z(e)) {
    const c = (f) => {
      a = !0;
      const [m, g] = wl(f, t, !0);
      Le(i, m), g && l.push(...g);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!o && !a)
    return be(e) && s.set(e, on), on;
  if (Q(o))
    for (let c = 0; c < o.length; c++) {
      const f = at(o[c]);
      bo(f) && (i[f] = pe);
    }
  else if (o)
    for (const c in o) {
      const f = at(c);
      if (bo(f)) {
        const m = o[c], g = i[f] = Q(m) || Z(m) ? { type: m } : Le({}, m), _ = g.type;
        let b = !1, v = !0;
        if (Q(_))
          for (let O = 0; O < _.length; ++O) {
            const E = _[O], C = Z(E) && E.name;
            if (C === "Boolean") {
              b = !0;
              break;
            } else C === "String" && (v = !1);
          }
        else
          b = Z(_) && _.name === "Boolean";
        g[
          0
          /* shouldCast */
        ] = b, g[
          1
          /* shouldCastTrue */
        ] = v, (b || fe(g, "default")) && l.push(f);
      }
    }
  const u = [i, l];
  return be(e) && s.set(e, u), u;
}
function bo(e) {
  return e[0] !== "$" && !Cn(e);
}
const Gr = (e) => e === "_" || e === "_ctx" || e === "$stable", zr = (e) => Q(e) ? e.map(wt) : [wt(e)], uu = (e, t, n) => {
  if (t._n)
    return t;
  const s = Bn((...r) => (Bt.NODE_ENV !== "production" && Ie && !(n === null && Ne) && (n && (n.root, Ie.root)), zr(t(...r))), n);
  return s._c = !1, s;
}, El = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (Gr(r)) continue;
    const o = e[r];
    if (Z(o))
      t[r] = uu(r, o, s);
    else if (o != null) {
      const i = zr(o);
      t[r] = () => i;
    }
  }
}, Sl = (e, t) => {
  const n = zr(t);
  e.slots.default = () => n;
}, xl = (e, t, n) => {
  for (const s in t)
    (n || !Gr(s)) && (e[s] = t[s]);
}, fu = (e, t, n) => {
  const s = e.slots = _l();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (xl(s, t, n), n && Ai(s, "_", r, !0)) : El(t, s);
  } else t && Sl(e, t);
}, du = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let o = !0, i = pe;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? o = !1 : xl(r, t, n) : (o = !t.$stable, El(t, r)), i = t;
  } else t && (Sl(e, t), i = { default: 1 });
  if (o)
    for (const l in r)
      !Gr(l) && i[l] == null && delete r[l];
}, et = yu;
function hu(e) {
  return pu(e);
}
function pu(e, t) {
  const n = Cs();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: r,
    patchProp: o,
    createElement: i,
    createText: l,
    createComment: a,
    setText: u,
    setElementText: c,
    parentNode: f,
    nextSibling: m,
    setScopeId: g = ct,
    insertStaticContent: _
  } = e, b = (d, p, h, y = null, w = null, x = null, T = void 0, N = null, I = !!p.dynamicChildren) => {
    if (d === p)
      return;
    d && !wn(d, p) && (y = A(d), le(d, w, x, !0), d = null), p.patchFlag === -2 && (I = !1, p.dynamicChildren = null);
    const { type: P, ref: K, shapeFlag: B } = p;
    switch (P) {
      case ks:
        v(d, p, h, y);
        break;
      case Dt:
        O(d, p, h, y);
        break;
      case tr:
        d == null && E(p, h, y, T);
        break;
      case Ee:
        Se(
          d,
          p,
          h,
          y,
          w,
          x,
          T,
          N,
          I
        );
        break;
      default:
        B & 1 ? F(
          d,
          p,
          h,
          y,
          w,
          x,
          T,
          N,
          I
        ) : B & 6 ? we(
          d,
          p,
          h,
          y,
          w,
          x,
          T,
          N,
          I
        ) : (B & 64 || B & 128) && P.process(
          d,
          p,
          h,
          y,
          w,
          x,
          T,
          N,
          I,
          W
        );
    }
    K != null && w ? In(K, d && d.ref, x, p || d, !p) : K == null && d && d.ref != null && In(d.ref, null, x, d, !0);
  }, v = (d, p, h, y) => {
    if (d == null)
      s(
        p.el = l(p.children),
        h,
        y
      );
    else {
      const w = p.el = d.el;
      p.children !== d.children && u(w, p.children);
    }
  }, O = (d, p, h, y) => {
    d == null ? s(
      p.el = a(p.children || ""),
      h,
      y
    ) : p.el = d.el;
  }, E = (d, p, h, y) => {
    [d.el, d.anchor] = _(
      d.children,
      p,
      h,
      y,
      d.el,
      d.anchor
    );
  }, C = ({ el: d, anchor: p }, h, y) => {
    let w;
    for (; d && d !== p; )
      w = m(d), s(d, h, y), d = w;
    s(p, h, y);
  }, R = ({ el: d, anchor: p }) => {
    let h;
    for (; d && d !== p; )
      h = m(d), r(d), d = h;
    r(p);
  }, F = (d, p, h, y, w, x, T, N, I) => {
    if (p.type === "svg" ? T = "svg" : p.type === "math" && (T = "mathml"), d == null)
      q(
        p,
        h,
        y,
        w,
        x,
        T,
        N,
        I
      );
    else {
      const P = d.el && d.el._isVueCE ? d.el : null;
      try {
        P && P._beginPatch(), X(
          d,
          p,
          w,
          x,
          T,
          N,
          I
        );
      } finally {
        P && P._endPatch();
      }
    }
  }, q = (d, p, h, y, w, x, T, N) => {
    let I, P;
    const { props: K, shapeFlag: B, transition: G, dirs: Y } = d;
    if (I = d.el = i(
      d.type,
      x,
      K && K.is,
      K
    ), B & 8 ? c(I, d.children) : B & 16 && J(
      d.children,
      I,
      null,
      y,
      w,
      er(d, x),
      T,
      N
    ), Y && Gt(d, null, y, "created"), L(I, d, d.scopeId, T, y), K) {
      for (const me in K)
        me !== "value" && !Cn(me) && o(I, me, null, K[me], x, y);
      "value" in K && o(I, "value", null, K.value, x), (P = K.onVnodeBeforeMount) && _t(P, y, d);
    }
    Y && Gt(d, null, y, "beforeMount");
    const oe = mu(w, G);
    oe && G.beforeEnter(I), s(I, p, h), ((P = K && K.onVnodeMounted) || oe || Y) && et(() => {
      P && _t(P, y, d), oe && G.enter(I), Y && Gt(d, null, y, "mounted");
    }, w);
  }, L = (d, p, h, y, w) => {
    if (h && g(d, h), y)
      for (let x = 0; x < y.length; x++)
        g(d, y[x]);
    if (w) {
      let x = w.subTree;
      if (p === x || Ol(x.type) && (x.ssContent === p || x.ssFallback === p)) {
        const T = w.vnode;
        L(
          d,
          T,
          T.scopeId,
          T.slotScopeIds,
          w.parent
        );
      }
    }
  }, J = (d, p, h, y, w, x, T, N, I = 0) => {
    for (let P = I; P < d.length; P++) {
      const K = d[P] = N ? Ht(d[P]) : wt(d[P]);
      b(
        null,
        K,
        p,
        h,
        y,
        w,
        x,
        T,
        N
      );
    }
  }, X = (d, p, h, y, w, x, T) => {
    const N = p.el = d.el;
    let { patchFlag: I, dynamicChildren: P, dirs: K } = p;
    I |= d.patchFlag & 16;
    const B = d.props || pe, G = p.props || pe;
    let Y;
    if (h && zt(h, !1), (Y = G.onVnodeBeforeUpdate) && _t(Y, h, p, d), K && Gt(p, d, h, "beforeUpdate"), h && zt(h, !0), (B.innerHTML && G.innerHTML == null || B.textContent && G.textContent == null) && c(N, ""), P ? ce(
      d.dynamicChildren,
      P,
      N,
      h,
      y,
      er(p, w),
      x
    ) : T || k(
      d,
      p,
      N,
      null,
      h,
      y,
      er(p, w),
      x,
      !1
    ), I > 0) {
      if (I & 16)
        _e(N, B, G, h, w);
      else if (I & 2 && B.class !== G.class && o(N, "class", null, G.class, w), I & 4 && o(N, "style", B.style, G.style, w), I & 8) {
        const oe = p.dynamicProps;
        for (let me = 0; me < oe.length; me++) {
          const de = oe[me], ze = B[de], Ke = G[de];
          (Ke !== ze || de === "value") && o(N, de, ze, Ke, w, h);
        }
      }
      I & 1 && d.children !== p.children && c(N, p.children);
    } else !T && P == null && _e(N, B, G, h, w);
    ((Y = G.onVnodeUpdated) || K) && et(() => {
      Y && _t(Y, h, p, d), K && Gt(p, d, h, "updated");
    }, y);
  }, ce = (d, p, h, y, w, x, T) => {
    for (let N = 0; N < p.length; N++) {
      const I = d[N], P = p[N], K = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        I.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (I.type === Ee || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !wn(I, P) || // - In the case of a component, it could contain anything.
        I.shapeFlag & 198) ? f(I.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      b(
        I,
        P,
        K,
        null,
        y,
        w,
        x,
        T,
        !0
      );
    }
  }, _e = (d, p, h, y, w) => {
    if (p !== h) {
      if (p !== pe)
        for (const x in p)
          !Cn(x) && !(x in h) && o(
            d,
            x,
            p[x],
            null,
            w,
            y
          );
      for (const x in h) {
        if (Cn(x)) continue;
        const T = h[x], N = p[x];
        T !== N && x !== "value" && o(d, x, N, T, w, y);
      }
      "value" in h && o(d, "value", p.value, h.value, w);
    }
  }, Se = (d, p, h, y, w, x, T, N, I) => {
    const P = p.el = d ? d.el : l(""), K = p.anchor = d ? d.anchor : l("");
    let { patchFlag: B, dynamicChildren: G, slotScopeIds: Y } = p;
    Y && (N = N ? N.concat(Y) : Y), d == null ? (s(P, h, y), s(K, h, y), J(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      p.children || [],
      h,
      K,
      w,
      x,
      T,
      N,
      I
    )) : B > 0 && B & 64 && G && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    d.dynamicChildren && d.dynamicChildren.length === G.length ? (ce(
      d.dynamicChildren,
      G,
      h,
      w,
      x,
      T,
      N
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (p.key != null || w && p === w.subTree) && Rl(
      d,
      p,
      !0
      /* shallow */
    )) : k(
      d,
      p,
      h,
      K,
      w,
      x,
      T,
      N,
      I
    );
  }, we = (d, p, h, y, w, x, T, N, I) => {
    p.slotScopeIds = N, d == null ? p.shapeFlag & 512 ? w.ctx.activate(
      p,
      h,
      y,
      T,
      I
    ) : Te(
      p,
      h,
      y,
      w,
      x,
      T,
      I
    ) : $e(d, p, I);
  }, Te = (d, p, h, y, w, x, T) => {
    const N = d.component = Su(
      d,
      y,
      w
    );
    if (al(d) && (N.ctx.renderer = W), xu(N, !1, T), N.asyncDep) {
      if (w && w.registerDep(N, ne, T), !d.el) {
        const I = N.subTree = ee(Dt);
        O(null, I, p, h), d.placeholder = I.el;
      }
    } else
      ne(
        N,
        d,
        p,
        h,
        w,
        x,
        T
      );
  }, $e = (d, p, h) => {
    const y = p.component = d.component;
    if (ou(d, p, h))
      if (y.asyncDep && !y.asyncResolved) {
        M(y, p, h);
        return;
      } else
        y.next = p, y.update();
    else
      p.el = d.el, y.vnode = p;
  }, ne = (d, p, h, y, w, x, T) => {
    const N = () => {
      if (d.isMounted) {
        let { next: B, bu: G, u: Y, parent: oe, vnode: me } = d;
        {
          const gt = Cl(d);
          if (gt) {
            B && (B.el = me.el, M(d, B, T)), gt.asyncDep.then(() => {
              d.isUnmounted || N();
            });
            return;
          }
        }
        let de = B, ze;
        zt(d, !1), B ? (B.el = me.el, M(d, B, T)) : B = me, G && zs(G), (ze = B.props && B.props.onVnodeBeforeUpdate) && _t(ze, oe, B, me), zt(d, !0);
        const Ke = _o(d), mt = d.subTree;
        d.subTree = Ke, b(
          mt,
          Ke,
          // parent may have changed if it's in a teleport
          f(mt.el),
          // anchor may have changed if it's in a fragment
          A(mt),
          d,
          w,
          x
        ), B.el = Ke.el, de === null && iu(d, Ke.el), Y && et(Y, w), (ze = B.props && B.props.onVnodeUpdated) && et(
          () => _t(ze, oe, B, me),
          w
        );
      } else {
        let B;
        const { el: G, props: Y } = p, { bm: oe, m: me, parent: de, root: ze, type: Ke } = d, mt = cn(p);
        zt(d, !1), oe && zs(oe), !mt && (B = Y && Y.onVnodeBeforeMount) && _t(B, de, p), zt(d, !0);
        {
          ze.ce && // @ts-expect-error _def is private
          ze.ce._def.shadowRoot !== !1 && ze.ce._injectChildStyle(Ke);
          const gt = d.subTree = _o(d);
          b(
            null,
            gt,
            h,
            y,
            d,
            w,
            x
          ), p.el = gt.el;
        }
        if (me && et(me, w), !mt && (B = Y && Y.onVnodeMounted)) {
          const gt = p;
          et(
            () => _t(B, de, gt),
            w
          );
        }
        (p.shapeFlag & 256 || de && cn(de.vnode) && de.vnode.shapeFlag & 256) && d.a && et(d.a, w), d.isMounted = !0, p = h = y = null;
      }
    };
    d.scope.on();
    const I = d.effect = new Mi(N);
    d.scope.off();
    const P = d.update = I.run.bind(I), K = d.job = I.runIfDirty.bind(I);
    K.i = d, K.id = d.uid, I.scheduler = () => Vr(K), zt(d, !0), P();
  }, M = (d, p, h) => {
    p.component = d;
    const y = d.vnode.props;
    d.vnode = p, d.next = null, au(d, p.props, y, h), du(d, p.children, h), Et(), co(d), St();
  }, k = (d, p, h, y, w, x, T, N, I = !1) => {
    const P = d && d.children, K = d ? d.shapeFlag : 0, B = p.children, { patchFlag: G, shapeFlag: Y } = p;
    if (G > 0) {
      if (G & 128) {
        ve(
          P,
          B,
          h,
          y,
          w,
          x,
          T,
          N,
          I
        );
        return;
      } else if (G & 256) {
        U(
          P,
          B,
          h,
          y,
          w,
          x,
          T,
          N,
          I
        );
        return;
      }
    }
    Y & 8 ? (K & 16 && Ge(P, w, x), B !== P && c(h, B)) : K & 16 ? Y & 16 ? ve(
      P,
      B,
      h,
      y,
      w,
      x,
      T,
      N,
      I
    ) : Ge(P, w, x, !0) : (K & 8 && c(h, ""), Y & 16 && J(
      B,
      h,
      y,
      w,
      x,
      T,
      N,
      I
    ));
  }, U = (d, p, h, y, w, x, T, N, I) => {
    d = d || on, p = p || on;
    const P = d.length, K = p.length, B = Math.min(P, K);
    let G;
    for (G = 0; G < B; G++) {
      const Y = p[G] = I ? Ht(p[G]) : wt(p[G]);
      b(
        d[G],
        Y,
        h,
        null,
        w,
        x,
        T,
        N,
        I
      );
    }
    P > K ? Ge(
      d,
      w,
      x,
      !0,
      !1,
      B
    ) : J(
      p,
      h,
      y,
      w,
      x,
      T,
      N,
      I,
      B
    );
  }, ve = (d, p, h, y, w, x, T, N, I) => {
    let P = 0;
    const K = p.length;
    let B = d.length - 1, G = K - 1;
    for (; P <= B && P <= G; ) {
      const Y = d[P], oe = p[P] = I ? Ht(p[P]) : wt(p[P]);
      if (wn(Y, oe))
        b(
          Y,
          oe,
          h,
          null,
          w,
          x,
          T,
          N,
          I
        );
      else
        break;
      P++;
    }
    for (; P <= B && P <= G; ) {
      const Y = d[B], oe = p[G] = I ? Ht(p[G]) : wt(p[G]);
      if (wn(Y, oe))
        b(
          Y,
          oe,
          h,
          null,
          w,
          x,
          T,
          N,
          I
        );
      else
        break;
      B--, G--;
    }
    if (P > B) {
      if (P <= G) {
        const Y = G + 1, oe = Y < K ? p[Y].el : y;
        for (; P <= G; )
          b(
            null,
            p[P] = I ? Ht(p[P]) : wt(p[P]),
            h,
            oe,
            w,
            x,
            T,
            N,
            I
          ), P++;
      }
    } else if (P > G)
      for (; P <= B; )
        le(d[P], w, x, !0), P++;
    else {
      const Y = P, oe = P, me = /* @__PURE__ */ new Map();
      for (P = oe; P <= G; P++) {
        const Ze = p[P] = I ? Ht(p[P]) : wt(p[P]);
        Ze.key != null && me.set(Ze.key, P);
      }
      let de, ze = 0;
      const Ke = G - oe + 1;
      let mt = !1, gt = 0;
      const vn = new Array(Ke);
      for (P = 0; P < Ke; P++) vn[P] = 0;
      for (P = Y; P <= B; P++) {
        const Ze = d[P];
        if (ze >= Ke) {
          le(Ze, w, x, !0);
          continue;
        }
        let yt;
        if (Ze.key != null)
          yt = me.get(Ze.key);
        else
          for (de = oe; de <= G; de++)
            if (vn[de - oe] === 0 && wn(Ze, p[de])) {
              yt = de;
              break;
            }
        yt === void 0 ? le(Ze, w, x, !0) : (vn[yt - oe] = P + 1, yt >= gt ? gt = yt : mt = !0, b(
          Ze,
          p[yt],
          h,
          null,
          w,
          x,
          T,
          N,
          I
        ), ze++);
      }
      const so = mt ? gu(vn) : on;
      for (de = so.length - 1, P = Ke - 1; P >= 0; P--) {
        const Ze = oe + P, yt = p[Ze], ro = p[Ze + 1], oo = Ze + 1 < K ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          ro.el || Al(ro)
        ) : y;
        vn[P] === 0 ? b(
          null,
          yt,
          h,
          oo,
          w,
          x,
          T,
          N,
          I
        ) : mt && (de < 0 || P !== so[de] ? he(yt, h, oo, 2) : de--);
      }
    }
  }, he = (d, p, h, y, w = null) => {
    const { el: x, type: T, transition: N, children: I, shapeFlag: P } = d;
    if (P & 6) {
      he(d.component.subTree, p, h, y);
      return;
    }
    if (P & 128) {
      d.suspense.move(p, h, y);
      return;
    }
    if (P & 64) {
      T.move(d, p, h, W);
      return;
    }
    if (T === Ee) {
      s(x, p, h);
      for (let B = 0; B < I.length; B++)
        he(I[B], p, h, y);
      s(d.anchor, p, h);
      return;
    }
    if (T === tr) {
      C(d, p, h);
      return;
    }
    if (y !== 2 && P & 1 && N)
      if (y === 0)
        N.beforeEnter(x), s(x, p, h), et(() => N.enter(x), w);
      else {
        const { leave: B, delayLeave: G, afterLeave: Y } = N, oe = () => {
          d.ctx.isUnmounted ? r(x) : s(x, p, h);
        }, me = () => {
          x._isLeaving && x[Ic](
            !0
            /* cancelled */
          ), B(x, () => {
            oe(), Y && Y();
          });
        };
        G ? G(x, oe, me) : me();
      }
    else
      s(x, p, h);
  }, le = (d, p, h, y = !1, w = !1) => {
    const {
      type: x,
      props: T,
      ref: N,
      children: I,
      dynamicChildren: P,
      shapeFlag: K,
      patchFlag: B,
      dirs: G,
      cacheIndex: Y
    } = d;
    if (B === -2 && (w = !1), N != null && (Et(), In(N, null, h, d, !0), St()), Y != null && (p.renderCache[Y] = void 0), K & 256) {
      p.ctx.deactivate(d);
      return;
    }
    const oe = K & 1 && G, me = !cn(d);
    let de;
    if (me && (de = T && T.onVnodeBeforeUnmount) && _t(de, p, d), K & 6)
      it(d.component, h, y);
    else {
      if (K & 128) {
        d.suspense.unmount(h, y);
        return;
      }
      oe && Gt(d, null, p, "beforeUnmount"), K & 64 ? d.type.remove(
        d,
        p,
        h,
        W,
        y
      ) : P && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !P.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (x !== Ee || B > 0 && B & 64) ? Ge(
        P,
        p,
        h,
        !1,
        !0
      ) : (x === Ee && B & 384 || !w && K & 16) && Ge(I, p, h), y && De(d);
    }
    (me && (de = T && T.onVnodeUnmounted) || oe) && et(() => {
      de && _t(de, p, d), oe && Gt(d, null, p, "unmounted");
    }, h);
  }, De = (d) => {
    const { type: p, el: h, anchor: y, transition: w } = d;
    if (p === Ee) {
      Ue(h, y);
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
      const { leave: T, delayLeave: N } = w, I = () => T(h, x);
      N ? N(d.el, x, I) : I();
    } else
      x();
  }, Ue = (d, p) => {
    let h;
    for (; d !== p; )
      h = m(d), r(d), d = h;
    r(p);
  }, it = (d, p, h) => {
    const { bum: y, scope: w, job: x, subTree: T, um: N, m: I, a: P } = d;
    wo(I), wo(P), y && zs(y), w.stop(), x && (x.flags |= 8, le(T, d, p, h)), N && et(N, p), et(() => {
      d.isUnmounted = !0;
    }, p);
  }, Ge = (d, p, h, y = !1, w = !1, x = 0) => {
    for (let T = x; T < d.length; T++)
      le(d[T], p, h, y, w);
  }, A = (d) => {
    if (d.shapeFlag & 6)
      return A(d.component.subTree);
    if (d.shapeFlag & 128)
      return d.suspense.next();
    const p = m(d.anchor || d.el), h = p && p[Tc];
    return h ? m(h) : p;
  };
  let H = !1;
  const $ = (d, p, h) => {
    let y;
    d == null ? p._vnode && (le(p._vnode, null, null, !0), y = p._vnode.component) : b(
      p._vnode || null,
      d,
      p,
      null,
      null,
      null,
      h
    ), p._vnode = d, H || (H = !0, co(y), nl(), H = !1);
  }, W = {
    p: b,
    um: le,
    m: he,
    r: De,
    mt: Te,
    mc: J,
    pc: k,
    pbc: ce,
    n: A,
    o: e
  };
  return {
    render: $,
    hydrate: void 0,
    createApp: Zc($)
  };
}
function er({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function zt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function mu(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Rl(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (Q(s) && Q(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let l = r[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[o] = Ht(r[o]), l.el = i.el), !n && l.patchFlag !== -2 && Rl(i, l)), l.type === ks && (l.patchFlag !== -1 ? l.el = i.el : l.__elIndex = o + // take fragment start anchor into account
      (e.type === Ee ? 1 : 0)), l.type === Dt && !l.el && (l.el = i.el);
    }
}
function gu(e) {
  const t = e.slice(), n = [0];
  let s, r, o, i, l;
  const a = e.length;
  for (s = 0; s < a; s++) {
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
function Cl(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Cl(t);
}
function wo(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Al(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Al(t.subTree) : null;
}
const Ol = (e) => e.__isSuspense;
function yu(e, t) {
  t && t.pendingBranch ? Q(e) ? t.effects.push(...e) : t.effects.push(e) : xc(e);
}
const Ee = /* @__PURE__ */ Symbol.for("v-fgt"), ks = /* @__PURE__ */ Symbol.for("v-txt"), Dt = /* @__PURE__ */ Symbol.for("v-cmt"), tr = /* @__PURE__ */ Symbol.for("v-stc"), Dn = [];
let st = null;
function j(e = !1) {
  Dn.push(st = e ? null : []);
}
function _u() {
  Dn.pop(), st = Dn[Dn.length - 1] || null;
}
let jn = 1;
function ys(e, t = !1) {
  jn += e, e < 0 && st && t && (st.hasOnce = !0);
}
function Tl(e) {
  return e.dynamicChildren = jn > 0 ? st || on : null, _u(), jn > 0 && st && st.push(e), e;
}
function z(e, t, n, s, r, o) {
  return Tl(
    D(
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
function He(e, t, n, s, r) {
  return Tl(
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
function wn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Pl = ({ key: e }) => e ?? null, os = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Ae(e) || xe(e) || Z(e) ? { i: Ne, r: e, k: t, f: !!n } : e : null);
function D(e, t = null, n = null, s = 0, r = null, o = e === Ee ? 0 : 1, i = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Pl(t),
    ref: t && os(t),
    scopeId: rl,
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
    ctx: Ne
  };
  return l ? (Jr(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= Ae(n) ? 8 : 16), jn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  st && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && st.push(a), a;
}
const ee = vu;
function vu(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === qc) && (e = Dt), Hn(e)) {
    const l = dn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Jr(l, n), jn > 0 && !o && st && (l.shapeFlag & 6 ? st[st.indexOf(e)] = l : st.push(l)), l.patchFlag = -2, l;
  }
  if (Pu(e) && (e = e.__vccOpts), t) {
    t = bu(t);
    let { class: l, style: a } = t;
    l && !Ae(l) && (t.class = kt(l)), be(a) && (Ps(a) && !Q(a) && (a = Le({}, a)), t.style = un(a));
  }
  const i = Ae(e) ? 1 : Ol(e) ? 128 : Pc(e) ? 64 : be(e) ? 4 : Z(e) ? 2 : 0;
  return D(
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
  return e ? Ps(e) || vl(e) ? Le({}, e) : e : null;
}
function dn(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: l, transition: a } = e, u = t ? wr(r || {}, t) : r, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && Pl(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? Q(o) ? o.concat(os(t)) : [o, os(t)] : os(t)
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
    patchFlag: t && e.type !== Ee ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && dn(e.ssContent),
    ssFallback: e.ssFallback && dn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && s && qr(
    c,
    a.clone(c)
  ), c;
}
function Kr(e = " ", t = 0) {
  return ee(ks, null, e, t);
}
function nt(e = "", t = !1) {
  return t ? (j(), He(Dt, null, e)) : ee(Dt, null, e);
}
function wt(e) {
  return e == null || typeof e == "boolean" ? ee(Dt) : Q(e) ? ee(
    Ee,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Hn(e) ? Ht(e) : ee(ks, null, String(e));
}
function Ht(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : dn(e);
}
function Jr(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (Q(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Jr(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !vl(t) ? t._ctx = Ne : r === 3 && Ne && (Ne.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Z(t) ? (t = { default: t, _ctx: Ne }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Kr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function wr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = kt([t.class, s.class]));
      else if (r === "style")
        t.style = un([t.style, s.style]);
      else if (ws(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(Q(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function _t(e, t, n, s = null) {
  xt(e, t, 7, [
    n,
    s
  ]);
}
const wu = ml();
let Eu = 0;
function Su(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || wu, o = {
    uid: Eu++,
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
    scope: new Ii(
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
    propsOptions: wl(s, r),
    emitsOptions: gl(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: pe,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: pe,
    data: pe,
    props: pe,
    attrs: pe,
    slots: pe,
    refs: pe,
    setupState: pe,
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = tu.bind(null, o), e.ce && e.ce(o), o;
}
let Ie = null;
const Il = () => Ie || Ne;
let _s, Er;
{
  const e = Cs(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  _s = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ie = n
  ), Er = t(
    "__VUE_SSR_SETTERS__",
    (n) => Vn = n
  );
}
const zn = (e) => {
  const t = Ie;
  return _s(e), e.scope.on(), () => {
    e.scope.off(), _s(t);
  };
}, Eo = () => {
  Ie && Ie.scope.off(), _s(null);
};
function Nl(e) {
  return e.vnode.shapeFlag & 4;
}
let Vn = !1;
function xu(e, t = !1, n = !1) {
  t && Er(t);
  const { props: s, children: r } = e.vnode, o = Nl(e);
  lu(e, s, o, t), fu(e, r, n || t);
  const i = o ? Ru(e, t) : void 0;
  return t && Er(!1), i;
}
function Ru(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Gc);
  const { setup: s } = n;
  if (s) {
    Et();
    const r = e.setupContext = s.length > 1 ? Au(e) : null, o = zn(e), i = gn(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = xi(i);
    if (St(), o(), (l || e.sp) && !cn(e) && ll(e), l) {
      if (i.then(Eo, Eo), t)
        return i.then((a) => {
          So(e, a);
        }).catch((a) => {
          Is(a, e, 0);
        });
      e.asyncDep = i;
    } else
      So(e, i);
  } else
    Dl(e);
}
function So(e, t, n) {
  Z(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : be(t) && (e.setupState = Qi(t)), Dl(e);
}
function Dl(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || ct);
  {
    const r = zn(e);
    Et();
    try {
      zc(e);
    } finally {
      St(), r();
    }
  }
}
const Cu = {
  get(e, t) {
    return ke(e, "get", ""), e[t];
  }
};
function Au(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Cu),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Fs(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Qi(jr(e.exposed)), {
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
const Ou = /(?:^|[-_])\w/g, Tu = (e) => e.replace(Ou, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Ml(e, t = !0) {
  return Z(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function kl(e, t, n = !1) {
  let s = Ml(t);
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
  return s ? Tu(s) : n ? "App" : "Anonymous";
}
function Pu(e) {
  return Z(e) && "__vccOpts" in e;
}
const Ce = (e, t) => pc(e, t, Vn);
function Fl(e, t, n) {
  try {
    ys(-1);
    const s = arguments.length;
    return s === 2 ? be(t) && !Q(t) ? Hn(t) ? ee(e, null, [t]) : ee(e, t) : ee(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Hn(n) && (n = [n]), ee(e, t, n));
  } finally {
    ys(1);
  }
}
const Iu = "3.5.26";
let Sr;
const xo = typeof window < "u" && window.trustedTypes;
if (xo)
  try {
    Sr = /* @__PURE__ */ xo.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Ll = Sr ? (e) => Sr.createHTML(e) : (e) => e, Nu = "http://www.w3.org/2000/svg", Du = "http://www.w3.org/1998/Math/MathML", At = typeof document < "u" ? document : null, Ro = At && /* @__PURE__ */ At.createElement("template"), Mu = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? At.createElementNS(Nu, e) : t === "mathml" ? At.createElementNS(Du, e) : n ? At.createElement(e, { is: n }) : At.createElement(e);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => At.createTextNode(e),
  createComment: (e) => At.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => At.querySelector(e),
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
      Ro.innerHTML = Ll(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Ro.content;
      if (s === "svg" || s === "mathml") {
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
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
}, ku = /* @__PURE__ */ Symbol("_vtc");
function Fu(e, t, n) {
  const s = e[ku];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const vs = /* @__PURE__ */ Symbol("_vod"), $l = /* @__PURE__ */ Symbol("_vsh"), Co = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: n }) {
    e[vs] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : En(e, t);
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
  e.style.display = t ? e[vs] : "none", e[$l] = !t;
}
const Lu = /* @__PURE__ */ Symbol(""), $u = /(?:^|;)\s*display\s*:/;
function Uu(e, t, n) {
  const s = e.style, r = Ae(n);
  let o = !1;
  if (n && !r) {
    if (t)
      if (Ae(t))
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
      i && (n += ";" + i), s.cssText = n, o = $u.test(n);
    }
  } else t && e.removeAttribute("style");
  vs in e && (e[vs] = o ? s.display : "", e[$l] && (s.display = "none"));
}
const Ao = /\s*!important$/;
function is(e, t, n) {
  if (Q(n))
    n.forEach((s) => is(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Bu(e, t);
    Ao.test(n) ? e.setProperty(
      Wt(s),
      n.replace(Ao, ""),
      "important"
    ) : e[s] = n;
  }
}
const Oo = ["Webkit", "Moz", "ms"], nr = {};
function Bu(e, t) {
  const n = nr[t];
  if (n)
    return n;
  let s = at(t);
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
const To = "http://www.w3.org/1999/xlink";
function Po(e, t, n, s, r, o = Ba(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(To, t.slice(6, t.length)) : e.setAttributeNS(To, t, n) : n == null || o && !Oi(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    o ? "" : Mt(n) ? String(n) : n
  );
}
function Io(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Ll(n) : n);
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && // custom elements may use _value internally
  !o.includes("-")) {
    const l = o === "OPTION" ? e.getAttribute("value") || "" : e.value, a = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== a || !("_value" in e)) && (e.value = a), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = Oi(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(r || t);
}
function ju(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Hu(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const No = /* @__PURE__ */ Symbol("_vei");
function Vu(e, t, n, s, r = null) {
  const o = e[No] || (e[No] = {}), i = o[t];
  if (s && i)
    i.value = s;
  else {
    const [l, a] = qu(t);
    if (s) {
      const u = o[t] = zu(
        s,
        r
      );
      ju(e, l, u, a);
    } else i && (Hu(e, l, i, a), o[t] = void 0);
  }
}
const Do = /(?:Once|Passive|Capture)$/;
function qu(e) {
  let t;
  if (Do.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Do); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Wt(e.slice(2)), t];
}
let sr = 0;
const Wu = /* @__PURE__ */ Promise.resolve(), Gu = () => sr || (Wu.then(() => sr = 0), sr = Date.now());
function zu(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    xt(
      Ku(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = Gu(), n;
}
function Ku(e, t) {
  if (Q(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (s) => (r) => !r._stopped && s && s(r)
    );
  } else
    return t;
}
const Mo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Ju = (e, t, n, s, r, o) => {
  const i = r === "svg";
  t === "class" ? Fu(e, s, i) : t === "style" ? Uu(e, n, s) : ws(t) ? kr(t) || Vu(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Xu(e, t, s, i)) ? (Io(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Po(e, t, s, i, o, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !Ae(s)) ? Io(e, at(t), s, o, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Po(e, t, s, i));
};
function Xu(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Mo(t) && Z(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Mo(t) && Ae(n) ? !1 : t in e;
}
const Yu = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Qu = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = ((r) => {
    if (!("key" in r))
      return;
    const o = Wt(r.key);
    if (t.some(
      (i) => i === o || Yu[i] === o
    ))
      return e(r);
  }));
}, Zu = /* @__PURE__ */ Le({ patchProp: Ju }, Mu);
let ko;
function ef() {
  return ko || (ko = hu(Zu));
}
const tf = ((...e) => {
  const t = ef().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = sf(s);
    if (!r) return;
    const o = t._component;
    !Z(o) && !o.render && !o.template && (o.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const i = n(r, !1, nf(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i;
  }, t;
});
function nf(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function sf(e) {
  return Ae(e) ? document.querySelector(e) : e;
}
let Ul;
const Ls = (e) => Ul = e, Bl = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function xr(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Mn;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Mn || (Mn = {}));
function rf() {
  const e = Ni(!0), t = e.run(() => se({}));
  let n = [], s = [];
  const r = jr({
    install(o) {
      Ls(r), r._a = o, o.provide(Bl, r), o.config.globalProperties.$pinia = r, s.forEach((i) => n.push(i)), s = [];
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
const jl = () => {
};
function Fo(e, t, n, s = jl) {
  e.add(t);
  const r = () => {
    e.delete(t) && s();
  };
  return !n && Di() && Ha(r), r;
}
function nn(e, ...t) {
  e.forEach((n) => {
    n(...t);
  });
}
const of = (e) => e(), Lo = /* @__PURE__ */ Symbol(), rr = /* @__PURE__ */ Symbol();
function Rr(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, s) => e.set(s, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const s = t[n], r = e[n];
    xr(r) && xr(s) && e.hasOwnProperty(n) && !xe(s) && !It(s) ? e[n] = Rr(r, s) : e[n] = s;
  }
  return e;
}
const lf = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function af(e) {
  return !xr(e) || !Object.prototype.hasOwnProperty.call(e, lf);
}
const { assign: $t } = Object;
function cf(e) {
  return !!(xe(e) && e.effect);
}
function uf(e, t, n, s) {
  const { state: r, actions: o, getters: i } = t, l = n.state.value[e];
  let a;
  function u() {
    l || (n.state.value[e] = r ? r() : {});
    const c = Gn(n.state.value[e]);
    return $t(c, o, Object.keys(i || {}).reduce((f, m) => (f[m] = jr(Ce(() => {
      Ls(n);
      const g = n._s.get(e);
      return i[m].call(g, g);
    })), f), {}));
  }
  return a = Hl(e, u, t, n, s, !0), a;
}
function Hl(e, t, n = {}, s, r, o) {
  let i;
  const l = $t({ actions: {} }, n), a = { deep: !0 };
  let u, c, f = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set(), g;
  const _ = s.state.value[e];
  !o && !_ && (s.state.value[e] = {}), se({});
  let b;
  function v(J) {
    let X;
    u = c = !1, typeof J == "function" ? (J(s.state.value[e]), X = {
      type: Mn.patchFunction,
      storeId: e,
      events: g
    }) : (Rr(s.state.value[e], J), X = {
      type: Mn.patchObject,
      payload: J,
      storeId: e,
      events: g
    });
    const ce = b = /* @__PURE__ */ Symbol();
    Hr().then(() => {
      b === ce && (u = !0);
    }), c = !0, nn(f, X, s.state.value[e]);
  }
  const O = o ? function() {
    const { state: X } = n, ce = X ? X() : {};
    this.$patch((_e) => {
      $t(_e, ce);
    });
  } : (
    /* istanbul ignore next */
    jl
  );
  function E() {
    i.stop(), f.clear(), m.clear(), s._s.delete(e);
  }
  const C = (J, X = "") => {
    if (Lo in J)
      return J[rr] = X, J;
    const ce = function() {
      Ls(s);
      const _e = Array.from(arguments), Se = /* @__PURE__ */ new Set(), we = /* @__PURE__ */ new Set();
      function Te(M) {
        Se.add(M);
      }
      function $e(M) {
        we.add(M);
      }
      nn(m, {
        args: _e,
        name: ce[rr],
        store: F,
        after: Te,
        onError: $e
      });
      let ne;
      try {
        ne = J.apply(this && this.$id === e ? this : F, _e);
      } catch (M) {
        throw nn(we, M), M;
      }
      return ne instanceof Promise ? ne.then((M) => (nn(Se, M), M)).catch((M) => (nn(we, M), Promise.reject(M))) : (nn(Se, ne), ne);
    };
    return ce[Lo] = !0, ce[rr] = X, ce;
  }, R = {
    _p: s,
    // _s: scope,
    $id: e,
    $onAction: Fo.bind(null, m),
    $patch: v,
    $reset: O,
    $subscribe(J, X = {}) {
      const ce = Fo(f, J, X.detached, () => _e()), _e = i.run(() => ft(() => s.state.value[e], (Se) => {
        (X.flush === "sync" ? c : u) && J({
          storeId: e,
          type: Mn.direct,
          events: g
        }, Se);
      }, $t({}, a, X)));
      return ce;
    },
    $dispose: E
  }, F = Wn(R);
  s._s.set(e, F);
  const L = (s._a && s._a.runWithContext || of)(() => s._e.run(() => (i = Ni()).run(() => t({ action: C }))));
  for (const J in L) {
    const X = L[J];
    if (xe(X) && !cf(X) || It(X))
      o || (_ && af(X) && (xe(X) ? X.value = _[J] : Rr(X, _[J])), s.state.value[e][J] = X);
    else if (typeof X == "function") {
      const ce = C(X, J);
      L[J] = ce, l.actions[J] = X;
    }
  }
  return $t(F, L), $t(ie(F), L), Object.defineProperty(F, "$state", {
    get: () => s.state.value[e],
    set: (J) => {
      v((X) => {
        $t(X, J);
      });
    }
  }), s._p.forEach((J) => {
    $t(F, i.run(() => J({
      store: F,
      app: s._a,
      pinia: s,
      options: l
    })));
  }), _ && o && n.hydrate && n.hydrate(F.$state, _), u = !0, c = !0, F;
}
// @__NO_SIDE_EFFECTS__
function ff(e, t, n) {
  let s;
  const r = typeof t == "function";
  s = r ? n : t;
  function o(i, l) {
    const a = Rc();
    return i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    i || (a ? ot(Bl, null) : null), i && Ls(i), i = Ul, i._s.has(e) || (r ? Hl(e, t, s, i) : uf(e, s, i)), i._s.get(e);
  }
  return o.$id = e, o;
}
const $s = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, df = {};
function hf(e, t) {
  const n = Vc("router-view");
  return j(), He(n);
}
const pf = /* @__PURE__ */ $s(df, [["render", hf]]), rn = typeof document < "u";
function Vl(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function mf(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module" || e.default && Vl(e.default);
}
const ue = Object.assign;
function or(e, t) {
  const n = {};
  for (const s in t) {
    const r = t[s];
    n[s] = ht(r) ? r.map(e) : e(r);
  }
  return n;
}
const kn = () => {
}, ht = Array.isArray;
function $o(e, t) {
  const n = {};
  for (const s in e) n[s] = s in t ? t[s] : e[s];
  return n;
}
const ql = /#/g, gf = /&/g, yf = /\//g, _f = /=/g, vf = /\?/g, Wl = /\+/g, bf = /%5B/g, wf = /%5D/g, Gl = /%5E/g, Ef = /%60/g, zl = /%7B/g, Sf = /%7C/g, Kl = /%7D/g, xf = /%20/g;
function Xr(e) {
  return e == null ? "" : encodeURI("" + e).replace(Sf, "|").replace(bf, "[").replace(wf, "]");
}
function Rf(e) {
  return Xr(e).replace(zl, "{").replace(Kl, "}").replace(Gl, "^");
}
function Cr(e) {
  return Xr(e).replace(Wl, "%2B").replace(xf, "+").replace(ql, "%23").replace(gf, "%26").replace(Ef, "`").replace(zl, "{").replace(Kl, "}").replace(Gl, "^");
}
function Cf(e) {
  return Cr(e).replace(_f, "%3D");
}
function Af(e) {
  return Xr(e).replace(ql, "%23").replace(vf, "%3F");
}
function Of(e) {
  return Af(e).replace(yf, "%2F");
}
function qn(e) {
  if (e == null) return null;
  try {
    return decodeURIComponent("" + e);
  } catch {
  }
  return "" + e;
}
const Tf = /\/$/, Pf = (e) => e.replace(Tf, "");
function ir(e, t, n = "/") {
  let s, r = {}, o = "", i = "";
  const l = t.indexOf("#");
  let a = t.indexOf("?");
  return a = l >= 0 && a > l ? -1 : a, a >= 0 && (s = t.slice(0, a), o = t.slice(a, l > 0 ? l : t.length), r = e(o.slice(1))), l >= 0 && (s = s || t.slice(0, l), i = t.slice(l, t.length)), s = Mf(s ?? t, n), {
    fullPath: s + o + i,
    path: s,
    query: r,
    hash: qn(i)
  };
}
function If(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Uo(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function Nf(e, t, n) {
  const s = t.matched.length - 1, r = n.matched.length - 1;
  return s > -1 && s === r && hn(t.matched[s], n.matched[r]) && Jl(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function hn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Jl(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (var n in e) if (!Df(e[n], t[n])) return !1;
  return !0;
}
function Df(e, t) {
  return ht(e) ? Bo(e, t) : ht(t) ? Bo(t, e) : e?.valueOf() === t?.valueOf();
}
function Bo(e, t) {
  return ht(t) ? e.length === t.length && e.every((n, s) => n === t[s]) : e.length === 1 && e[0] === t;
}
function Mf(e, t) {
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
const Lt = {
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
function kf(e) {
  if (!e) if (rn) {
    const t = document.querySelector("base");
    e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
  } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Pf(e);
}
const Ff = /^[^#]+#/;
function Lf(e, t) {
  return e.replace(Ff, "#") + t;
}
function $f(e, t) {
  const n = document.documentElement.getBoundingClientRect(), s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0)
  };
}
const Us = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function Uf(e) {
  let t;
  if ("el" in e) {
    const n = e.el, s = typeof n == "string" && n.startsWith("#"), r = typeof n == "string" ? s ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!r)
      return;
    t = $f(r, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function jo(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Or = /* @__PURE__ */ new Map();
function Bf(e, t) {
  Or.set(e, t);
}
function jf(e) {
  const t = Or.get(e);
  return Or.delete(e), t;
}
function Hf(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function Xl(e) {
  return typeof e == "string" || typeof e == "symbol";
}
let Re = /* @__PURE__ */ (function(e) {
  return e[e.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", e[e.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", e[e.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", e[e.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", e[e.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", e;
})({});
const Yl = /* @__PURE__ */ Symbol("");
Re.MATCHER_NOT_FOUND + "", Re.NAVIGATION_GUARD_REDIRECT + "", Re.NAVIGATION_ABORTED + "", Re.NAVIGATION_CANCELLED + "", Re.NAVIGATION_DUPLICATED + "";
function pn(e, t) {
  return ue(/* @__PURE__ */ new Error(), {
    type: e,
    [Yl]: !0
  }, t);
}
function Ct(e, t) {
  return e instanceof Error && Yl in e && (t == null || !!(e.type & t));
}
const Vf = [
  "params",
  "query",
  "hash"
];
function qf(e) {
  if (typeof e == "string") return e;
  if (e.path != null) return e.path;
  const t = {};
  for (const n of Vf) n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
function Wf(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const n = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < n.length; ++s) {
    const r = n[s].replace(Wl, " "), o = r.indexOf("="), i = qn(o < 0 ? r : r.slice(0, o)), l = o < 0 ? null : qn(r.slice(o + 1));
    if (i in t) {
      let a = t[i];
      ht(a) || (a = t[i] = [a]), a.push(l);
    } else t[i] = l;
  }
  return t;
}
function Ho(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (n = Cf(n), s == null) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (ht(s) ? s.map((r) => r && Cr(r)) : [s && Cr(s)]).forEach((r) => {
      r !== void 0 && (t += (t.length ? "&" : "") + n, r != null && (t += "=" + r));
    });
  }
  return t;
}
function Gf(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 && (t[n] = ht(s) ? s.map((r) => r == null ? null : "" + r) : s == null ? s : "" + s);
  }
  return t;
}
const zf = /* @__PURE__ */ Symbol(""), Vo = /* @__PURE__ */ Symbol(""), Bs = /* @__PURE__ */ Symbol(""), Yr = /* @__PURE__ */ Symbol(""), Tr = /* @__PURE__ */ Symbol("");
function Sn() {
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
function Vt(e, t, n, s, r, o = (i) => i()) {
  const i = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
  return () => new Promise((l, a) => {
    const u = (m) => {
      m === !1 ? a(pn(Re.NAVIGATION_ABORTED, {
        from: n,
        to: t
      })) : m instanceof Error ? a(m) : Hf(m) ? a(pn(Re.NAVIGATION_GUARD_REDIRECT, {
        from: t,
        to: m
      })) : (i && s.enterCallbacks[r] === i && typeof m == "function" && i.push(m), l());
    }, c = o(() => e.call(s && s.instances[r], t, n, u));
    let f = Promise.resolve(c);
    e.length < 3 && (f = f.then(u)), f.catch((m) => a(m));
  });
}
function ar(e, t, n, s, r = (o) => o()) {
  const o = [];
  for (const i of e)
    for (const l in i.components) {
      let a = i.components[l];
      if (!(t !== "beforeRouteEnter" && !i.instances[l]))
        if (Vl(a)) {
          const u = (a.__vccOpts || a)[t];
          u && o.push(Vt(u, n, s, i, l, r));
        } else {
          let u = a();
          o.push(() => u.then((c) => {
            if (!c) throw new Error(`Couldn't resolve component "${l}" at "${i.path}"`);
            const f = mf(c) ? c.default : c;
            i.mods[l] = c, i.components[l] = f;
            const m = (f.__vccOpts || f)[t];
            return m && Vt(m, n, s, i, l, r)();
          }));
        }
    }
  return o;
}
function Kf(e, t) {
  const n = [], s = [], r = [], o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const l = t.matched[i];
    l && (e.matched.find((u) => hn(u, l)) ? s.push(l) : n.push(l));
    const a = e.matched[i];
    a && (t.matched.find((u) => hn(u, a)) || r.push(a));
  }
  return [
    n,
    s,
    r
  ];
}
let Jf = () => location.protocol + "//" + location.host;
function Ql(e, t) {
  const { pathname: n, search: s, hash: r } = t, o = e.indexOf("#");
  if (o > -1) {
    let i = r.includes(e.slice(o)) ? e.slice(o).length : 1, l = r.slice(i);
    return l[0] !== "/" && (l = "/" + l), Uo(l, "");
  }
  return Uo(n, e) + s + r;
}
function Xf(e, t, n, s) {
  let r = [], o = [], i = null;
  const l = ({ state: m }) => {
    const g = Ql(e, location), _ = n.value, b = t.value;
    let v = 0;
    if (m) {
      if (n.value = g, t.value = m, i && i === _) {
        i = null;
        return;
      }
      v = b ? m.position - b.position : 0;
    } else s(g);
    r.forEach((O) => {
      O(n.value, _, {
        delta: v,
        type: Ar.pop,
        direction: v ? v > 0 ? lr.forward : lr.back : lr.unknown
      });
    });
  };
  function a() {
    i = n.value;
  }
  function u(m) {
    r.push(m);
    const g = () => {
      const _ = r.indexOf(m);
      _ > -1 && r.splice(_, 1);
    };
    return o.push(g), g;
  }
  function c() {
    if (document.visibilityState === "hidden") {
      const { history: m } = window;
      if (!m.state) return;
      m.replaceState(ue({}, m.state, { scroll: Us() }), "");
    }
  }
  function f() {
    for (const m of o) m();
    o = [], window.removeEventListener("popstate", l), window.removeEventListener("pagehide", c), document.removeEventListener("visibilitychange", c);
  }
  return window.addEventListener("popstate", l), window.addEventListener("pagehide", c), document.addEventListener("visibilitychange", c), {
    pauseListeners: a,
    listen: u,
    destroy: f
  };
}
function qo(e, t, n, s = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: r ? Us() : null
  };
}
function Yf(e) {
  const { history: t, location: n } = window, s = { value: Ql(e, n) }, r = { value: t.state };
  r.value || o(s.value, {
    back: null,
    current: s.value,
    forward: null,
    position: t.length - 1,
    replaced: !0,
    scroll: null
  }, !0);
  function o(a, u, c) {
    const f = e.indexOf("#"), m = f > -1 ? (n.host && document.querySelector("base") ? e : e.slice(f)) + a : Jf() + e + a;
    try {
      t[c ? "replaceState" : "pushState"](u, "", m), r.value = u;
    } catch (g) {
      console.error(g), n[c ? "replace" : "assign"](m);
    }
  }
  function i(a, u) {
    o(a, ue({}, t.state, qo(r.value.back, a, r.value.forward, !0), u, { position: r.value.position }), !0), s.value = a;
  }
  function l(a, u) {
    const c = ue({}, r.value, t.state, {
      forward: a,
      scroll: Us()
    });
    o(c.current, c, !0), o(a, ue({}, qo(s.value, a, null), { position: c.position + 1 }, u), !1), s.value = a;
  }
  return {
    location: s,
    state: r,
    push: l,
    replace: i
  };
}
function Qf(e) {
  e = kf(e);
  const t = Yf(e), n = Xf(e, t.state, t.location, t.replace);
  function s(o, i = !0) {
    i || n.pauseListeners(), history.go(o);
  }
  const r = ue({
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
function Zf(e) {
  return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), Qf(e);
}
let Jt = /* @__PURE__ */ (function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.Group = 2] = "Group", e;
})({});
var Pe = /* @__PURE__ */ (function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.ParamRegExp = 2] = "ParamRegExp", e[e.ParamRegExpEnd = 3] = "ParamRegExpEnd", e[e.EscapeNext = 4] = "EscapeNext", e;
})(Pe || {});
const ed = {
  type: Jt.Static,
  value: ""
}, td = /[a-zA-Z0-9_]/;
function nd(e) {
  if (!e) return [[]];
  if (e === "/") return [[ed]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(g) {
    throw new Error(`ERR (${n})/"${u}": ${g}`);
  }
  let n = Pe.Static, s = n;
  const r = [];
  let o;
  function i() {
    o && r.push(o), o = [];
  }
  let l = 0, a, u = "", c = "";
  function f() {
    u && (n === Pe.Static ? o.push({
      type: Jt.Static,
      value: u
    }) : n === Pe.Param || n === Pe.ParamRegExp || n === Pe.ParamRegExpEnd ? (o.length > 1 && (a === "*" || a === "+") && t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`), o.push({
      type: Jt.Param,
      value: u,
      regexp: c,
      repeatable: a === "*" || a === "+",
      optional: a === "*" || a === "?"
    })) : t("Invalid state to consume buffer"), u = "");
  }
  function m() {
    u += a;
  }
  for (; l < e.length; ) {
    if (a = e[l++], a === "\\" && n !== Pe.ParamRegExp) {
      s = n, n = Pe.EscapeNext;
      continue;
    }
    switch (n) {
      case Pe.Static:
        a === "/" ? (u && f(), i()) : a === ":" ? (f(), n = Pe.Param) : m();
        break;
      case Pe.EscapeNext:
        m(), n = s;
        break;
      case Pe.Param:
        a === "(" ? n = Pe.ParamRegExp : td.test(a) ? m() : (f(), n = Pe.Static, a !== "*" && a !== "?" && a !== "+" && l--);
        break;
      case Pe.ParamRegExp:
        a === ")" ? c[c.length - 1] == "\\" ? c = c.slice(0, -1) + a : n = Pe.ParamRegExpEnd : c += a;
        break;
      case Pe.ParamRegExpEnd:
        f(), n = Pe.Static, a !== "*" && a !== "?" && a !== "+" && l--, c = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === Pe.ParamRegExp && t(`Unfinished custom RegExp for param "${u}"`), f(), i(), r;
}
const Wo = "[^/]+?", sd = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
};
var je = /* @__PURE__ */ (function(e) {
  return e[e._multiplier = 10] = "_multiplier", e[e.Root = 90] = "Root", e[e.Segment = 40] = "Segment", e[e.SubSegment = 30] = "SubSegment", e[e.Static = 40] = "Static", e[e.Dynamic = 20] = "Dynamic", e[e.BonusCustomRegExp = 10] = "BonusCustomRegExp", e[e.BonusWildcard = -50] = "BonusWildcard", e[e.BonusRepeatable = -20] = "BonusRepeatable", e[e.BonusOptional = -8] = "BonusOptional", e[e.BonusStrict = 0.7000000000000001] = "BonusStrict", e[e.BonusCaseSensitive = 0.25] = "BonusCaseSensitive", e;
})(je || {});
const rd = /[.+*?^${}()[\]/\\]/g;
function od(e, t) {
  const n = ue({}, sd, t), s = [];
  let r = n.start ? "^" : "";
  const o = [];
  for (const u of e) {
    const c = u.length ? [] : [je.Root];
    n.strict && !u.length && (r += "/");
    for (let f = 0; f < u.length; f++) {
      const m = u[f];
      let g = je.Segment + (n.sensitive ? je.BonusCaseSensitive : 0);
      if (m.type === Jt.Static)
        f || (r += "/"), r += m.value.replace(rd, "\\$&"), g += je.Static;
      else if (m.type === Jt.Param) {
        const { value: _, repeatable: b, optional: v, regexp: O } = m;
        o.push({
          name: _,
          repeatable: b,
          optional: v
        });
        const E = O || Wo;
        if (E !== Wo) {
          g += je.BonusCustomRegExp;
          try {
            `${E}`;
          } catch (R) {
            throw new Error(`Invalid custom RegExp for param "${_}" (${E}): ` + R.message);
          }
        }
        let C = b ? `((?:${E})(?:/(?:${E}))*)` : `(${E})`;
        f || (C = v && u.length < 2 ? `(?:/${C})` : "/" + C), v && (C += "?"), r += C, g += je.Dynamic, v && (g += je.BonusOptional), b && (g += je.BonusRepeatable), E === ".*" && (g += je.BonusWildcard);
      }
      c.push(g);
    }
    s.push(c);
  }
  if (n.strict && n.end) {
    const u = s.length - 1;
    s[u][s[u].length - 1] += je.BonusStrict;
  }
  n.strict || (r += "/?"), n.end ? r += "$" : n.strict && !r.endsWith("/") && (r += "(?:/|$)");
  const i = new RegExp(r, n.sensitive ? "" : "i");
  function l(u) {
    const c = u.match(i), f = {};
    if (!c) return null;
    for (let m = 1; m < c.length; m++) {
      const g = c[m] || "", _ = o[m - 1];
      f[_.name] = g && _.repeatable ? g.split("/") : g;
    }
    return f;
  }
  function a(u) {
    let c = "", f = !1;
    for (const m of e) {
      (!f || !c.endsWith("/")) && (c += "/"), f = !1;
      for (const g of m) if (g.type === Jt.Static) c += g.value;
      else if (g.type === Jt.Param) {
        const { value: _, repeatable: b, optional: v } = g, O = _ in u ? u[_] : "";
        if (ht(O) && !b) throw new Error(`Provided param "${_}" is an array but it is not repeatable (* or + modifiers)`);
        const E = ht(O) ? O.join("/") : O;
        if (!E) if (v)
          m.length < 2 && (c.endsWith("/") ? c = c.slice(0, -1) : f = !0);
        else throw new Error(`Missing required param "${_}"`);
        c += E;
      }
    }
    return c || "/";
  }
  return {
    re: i,
    score: s,
    keys: o,
    parse: l,
    stringify: a
  };
}
function id(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n];
    if (s) return s;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === je.Static + je.Segment ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === je.Static + je.Segment ? 1 : -1 : 0;
}
function Zl(e, t) {
  let n = 0;
  const s = e.score, r = t.score;
  for (; n < s.length && n < r.length; ) {
    const o = id(s[n], r[n]);
    if (o) return o;
    n++;
  }
  if (Math.abs(r.length - s.length) === 1) {
    if (Go(s)) return 1;
    if (Go(r)) return -1;
  }
  return r.length - s.length;
}
function Go(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const ld = {
  strict: !1,
  end: !0,
  sensitive: !1
};
function ad(e, t, n) {
  const s = od(nd(e.path), n), r = ue(s, {
    record: e,
    parent: t,
    children: [],
    alias: []
  });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function cd(e, t) {
  const n = [], s = /* @__PURE__ */ new Map();
  t = $o(ld, t);
  function r(f) {
    return s.get(f);
  }
  function o(f, m, g) {
    const _ = !g, b = Ko(f);
    b.aliasOf = g && g.record;
    const v = $o(t, f), O = [b];
    if ("alias" in f) {
      const R = typeof f.alias == "string" ? [f.alias] : f.alias;
      for (const F of R) O.push(Ko(ue({}, b, {
        components: g ? g.record.components : b.components,
        path: F,
        aliasOf: g ? g.record : b
      })));
    }
    let E, C;
    for (const R of O) {
      const { path: F } = R;
      if (m && F[0] !== "/") {
        const q = m.record.path, L = q[q.length - 1] === "/" ? "" : "/";
        R.path = m.record.path + (F && L + F);
      }
      if (E = ad(R, m, v), g ? g.alias.push(E) : (C = C || E, C !== E && C.alias.push(E), _ && f.name && !Jo(E) && i(f.name)), ea(E) && a(E), b.children) {
        const q = b.children;
        for (let L = 0; L < q.length; L++) o(q[L], E, g && g.children[L]);
      }
      g = g || E;
    }
    return C ? () => {
      i(C);
    } : kn;
  }
  function i(f) {
    if (Xl(f)) {
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
  function a(f) {
    const m = dd(f, n);
    n.splice(m, 0, f), f.record.name && !Jo(f) && s.set(f.record.name, f);
  }
  function u(f, m) {
    let g, _ = {}, b, v;
    if ("name" in f && f.name) {
      if (g = s.get(f.name), !g) throw pn(Re.MATCHER_NOT_FOUND, { location: f });
      v = g.record.name, _ = ue(zo(m.params, g.keys.filter((C) => !C.optional).concat(g.parent ? g.parent.keys.filter((C) => C.optional) : []).map((C) => C.name)), f.params && zo(f.params, g.keys.map((C) => C.name))), b = g.stringify(_);
    } else if (f.path != null)
      b = f.path, g = n.find((C) => C.re.test(b)), g && (_ = g.parse(b), v = g.record.name);
    else {
      if (g = m.name ? s.get(m.name) : n.find((C) => C.re.test(m.path)), !g) throw pn(Re.MATCHER_NOT_FOUND, {
        location: f,
        currentLocation: m
      });
      v = g.record.name, _ = ue({}, m.params, f.params), b = g.stringify(_);
    }
    const O = [];
    let E = g;
    for (; E; )
      O.unshift(E.record), E = E.parent;
    return {
      name: v,
      path: b,
      params: _,
      matched: O,
      meta: fd(O)
    };
  }
  e.forEach((f) => o(f));
  function c() {
    n.length = 0, s.clear();
  }
  return {
    addRoute: o,
    resolve: u,
    removeRoute: i,
    clearRoutes: c,
    getRoutes: l,
    getRecordMatcher: r
  };
}
function zo(e, t) {
  const n = {};
  for (const s of t) s in e && (n[s] = e[s]);
  return n;
}
function Ko(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: ud(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
  return Object.defineProperty(t, "mods", { value: {} }), t;
}
function ud(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const s in e.components) t[s] = typeof n == "object" ? n[s] : n;
  return t;
}
function Jo(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function fd(e) {
  return e.reduce((t, n) => ue(t, n.meta), {});
}
function dd(e, t) {
  let n = 0, s = t.length;
  for (; n !== s; ) {
    const o = n + s >> 1;
    Zl(e, t[o]) < 0 ? s = o : n = o + 1;
  }
  const r = hd(e);
  return r && (s = t.lastIndexOf(r, s - 1)), s;
}
function hd(e) {
  let t = e;
  for (; t = t.parent; ) if (ea(t) && Zl(e, t) === 0) return t;
}
function ea({ record: e }) {
  return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
}
function Xo(e) {
  const t = ot(Bs), n = ot(Yr), s = Ce(() => {
    const a = V(e.to);
    return t.resolve(a);
  }), r = Ce(() => {
    const { matched: a } = s.value, { length: u } = a, c = a[u - 1], f = n.matched;
    if (!c || !f.length) return -1;
    const m = f.findIndex(hn.bind(null, c));
    if (m > -1) return m;
    const g = Yo(a[u - 2]);
    return u > 1 && Yo(c) === g && f[f.length - 1].path !== g ? f.findIndex(hn.bind(null, a[u - 2])) : m;
  }), o = Ce(() => r.value > -1 && _d(n.params, s.value.params)), i = Ce(() => r.value > -1 && r.value === n.matched.length - 1 && Jl(n.params, s.value.params));
  function l(a = {}) {
    if (yd(a)) {
      const u = t[V(e.replace) ? "replace" : "push"](V(e.to)).catch(kn);
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
function pd(e) {
  return e.length === 1 ? e[0] : e;
}
const md = /* @__PURE__ */ We({
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
  useLink: Xo,
  setup(e, { slots: t }) {
    const n = Wn(Xo(e)), { options: s } = ot(Bs), r = Ce(() => ({
      [Qo(e.activeClass, s.linkActiveClass, "router-link-active")]: n.isActive,
      [Qo(e.exactActiveClass, s.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const o = t.default && pd(t.default(n));
      return e.custom ? o : Fl("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        onClick: n.navigate,
        class: r.value
      }, o);
    };
  }
}), gd = md;
function yd(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function _d(e, t) {
  for (const n in t) {
    const s = t[n], r = e[n];
    if (typeof s == "string") {
      if (s !== r) return !1;
    } else if (!ht(r) || r.length !== s.length || s.some((o, i) => o.valueOf() !== r[i].valueOf())) return !1;
  }
  return !0;
}
function Yo(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const Qo = (e, t, n) => e ?? t ?? n, vd = /* @__PURE__ */ We({
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
    const s = ot(Tr), r = Ce(() => e.route || s.value), o = ot(Vo, 0), i = Ce(() => {
      let u = V(o);
      const { matched: c } = r.value;
      let f;
      for (; (f = c[u]) && !f.components; ) u++;
      return u;
    }), l = Ce(() => r.value.matched[i.value]);
    Pn(Vo, Ce(() => i.value + 1)), Pn(zf, l), Pn(Tr, r);
    const a = se();
    return ft(() => [
      a.value,
      l.value,
      e.name
    ], ([u, c, f], [m, g, _]) => {
      c && (c.instances[f] = u, g && g !== c && u && u === m && (c.leaveGuards.size || (c.leaveGuards = g.leaveGuards), c.updateGuards.size || (c.updateGuards = g.updateGuards))), u && c && (!g || !hn(c, g) || !m) && (c.enterCallbacks[f] || []).forEach((b) => b(u));
    }, { flush: "post" }), () => {
      const u = r.value, c = e.name, f = l.value, m = f && f.components[c];
      if (!m) return Zo(n.default, {
        Component: m,
        route: u
      });
      const g = f.props[c], _ = g ? g === !0 ? u.params : typeof g == "function" ? g(u) : g : null, v = Fl(m, ue({}, _, t, {
        onVnodeUnmounted: (O) => {
          O.component.isUnmounted && (f.instances[c] = null);
        },
        ref: a
      }));
      return Zo(n.default, {
        Component: v,
        route: u
      }) || v;
    };
  }
});
function Zo(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const bd = vd;
function wd(e) {
  const t = cd(e.routes, e), n = e.parseQuery || Wf, s = e.stringifyQuery || Ho, r = e.history, o = Sn(), i = Sn(), l = Sn(), a = ac(Lt);
  let u = Lt;
  rn && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const c = or.bind(null, (A) => "" + A), f = or.bind(null, Of), m = or.bind(null, qn);
  function g(A, H) {
    let $, W;
    return Xl(A) ? ($ = t.getRecordMatcher(A), W = H) : W = A, t.addRoute(W, $);
  }
  function _(A) {
    const H = t.getRecordMatcher(A);
    H && t.removeRoute(H);
  }
  function b() {
    return t.getRoutes().map((A) => A.record);
  }
  function v(A) {
    return !!t.getRecordMatcher(A);
  }
  function O(A, H) {
    if (H = ue({}, H || a.value), typeof A == "string") {
      const h = ir(n, A, H.path), y = t.resolve({ path: h.path }, H), w = r.createHref(h.fullPath);
      return ue(h, y, {
        params: m(y.params),
        hash: qn(h.hash),
        redirectedFrom: void 0,
        href: w
      });
    }
    let $;
    if (A.path != null)
      $ = ue({}, A, { path: ir(n, A.path, H.path).path });
    else {
      const h = ue({}, A.params);
      for (const y in h) h[y] == null && delete h[y];
      $ = ue({}, A, { params: f(h) }), H.params = f(H.params);
    }
    const W = t.resolve($, H), re = A.hash || "";
    W.params = c(m(W.params));
    const d = If(s, ue({}, A, {
      hash: Rf(re),
      path: W.path
    })), p = r.createHref(d);
    return ue({
      fullPath: d,
      hash: re,
      query: s === Ho ? Gf(A.query) : A.query || {}
    }, W, {
      redirectedFrom: void 0,
      href: p
    });
  }
  function E(A) {
    return typeof A == "string" ? ir(n, A, a.value.path) : ue({}, A);
  }
  function C(A, H) {
    if (u !== A) return pn(Re.NAVIGATION_CANCELLED, {
      from: H,
      to: A
    });
  }
  function R(A) {
    return L(A);
  }
  function F(A) {
    return R(ue(E(A), { replace: !0 }));
  }
  function q(A, H) {
    const $ = A.matched[A.matched.length - 1];
    if ($ && $.redirect) {
      const { redirect: W } = $;
      let re = typeof W == "function" ? W(A, H) : W;
      return typeof re == "string" && (re = re.includes("?") || re.includes("#") ? re = E(re) : { path: re }, re.params = {}), ue({
        query: A.query,
        hash: A.hash,
        params: re.path != null ? {} : A.params
      }, re);
    }
  }
  function L(A, H) {
    const $ = u = O(A), W = a.value, re = A.state, d = A.force, p = A.replace === !0, h = q($, W);
    if (h) return L(ue(E(h), {
      state: typeof h == "object" ? ue({}, re, h.state) : re,
      force: d,
      replace: p
    }), H || $);
    const y = $;
    y.redirectedFrom = H;
    let w;
    return !d && Nf(s, W, $) && (w = pn(Re.NAVIGATION_DUPLICATED, {
      to: y,
      from: W
    }), he(W, W, !0, !1)), (w ? Promise.resolve(w) : ce(y, W)).catch((x) => Ct(x) ? Ct(x, Re.NAVIGATION_GUARD_REDIRECT) ? x : ve(x) : k(x, y, W)).then((x) => {
      if (x) {
        if (Ct(x, Re.NAVIGATION_GUARD_REDIRECT))
          return L(ue({ replace: p }, E(x.to), {
            state: typeof x.to == "object" ? ue({}, re, x.to.state) : re,
            force: d
          }), H || y);
      } else x = Se(y, W, !0, p, re);
      return _e(y, W, x), x;
    });
  }
  function J(A, H) {
    const $ = C(A, H);
    return $ ? Promise.reject($) : Promise.resolve();
  }
  function X(A) {
    const H = Ue.values().next().value;
    return H && typeof H.runWithContext == "function" ? H.runWithContext(A) : A();
  }
  function ce(A, H) {
    let $;
    const [W, re, d] = Kf(A, H);
    $ = ar(W.reverse(), "beforeRouteLeave", A, H);
    for (const h of W) h.leaveGuards.forEach((y) => {
      $.push(Vt(y, A, H));
    });
    const p = J.bind(null, A, H);
    return $.push(p), Ge($).then(() => {
      $ = [];
      for (const h of o.list()) $.push(Vt(h, A, H));
      return $.push(p), Ge($);
    }).then(() => {
      $ = ar(re, "beforeRouteUpdate", A, H);
      for (const h of re) h.updateGuards.forEach((y) => {
        $.push(Vt(y, A, H));
      });
      return $.push(p), Ge($);
    }).then(() => {
      $ = [];
      for (const h of d) if (h.beforeEnter) if (ht(h.beforeEnter)) for (const y of h.beforeEnter) $.push(Vt(y, A, H));
      else $.push(Vt(h.beforeEnter, A, H));
      return $.push(p), Ge($);
    }).then(() => (A.matched.forEach((h) => h.enterCallbacks = {}), $ = ar(d, "beforeRouteEnter", A, H, X), $.push(p), Ge($))).then(() => {
      $ = [];
      for (const h of i.list()) $.push(Vt(h, A, H));
      return $.push(p), Ge($);
    }).catch((h) => Ct(h, Re.NAVIGATION_CANCELLED) ? h : Promise.reject(h));
  }
  function _e(A, H, $) {
    l.list().forEach((W) => X(() => W(A, H, $)));
  }
  function Se(A, H, $, W, re) {
    const d = C(A, H);
    if (d) return d;
    const p = H === Lt, h = rn ? history.state : {};
    $ && (W || p ? r.replace(A.fullPath, ue({ scroll: p && h && h.scroll }, re)) : r.push(A.fullPath, re)), a.value = A, he(A, H, $, p), ve();
  }
  let we;
  function Te() {
    we || (we = r.listen((A, H, $) => {
      if (!it.listening) return;
      const W = O(A), re = q(W, it.currentRoute.value);
      if (re) {
        L(ue(re, {
          replace: !0,
          force: !0
        }), W).catch(kn);
        return;
      }
      u = W;
      const d = a.value;
      rn && Bf(jo(d.fullPath, $.delta), Us()), ce(W, d).catch((p) => Ct(p, Re.NAVIGATION_ABORTED | Re.NAVIGATION_CANCELLED) ? p : Ct(p, Re.NAVIGATION_GUARD_REDIRECT) ? (L(ue(E(p.to), { force: !0 }), W).then((h) => {
        Ct(h, Re.NAVIGATION_ABORTED | Re.NAVIGATION_DUPLICATED) && !$.delta && $.type === Ar.pop && r.go(-1, !1);
      }).catch(kn), Promise.reject()) : ($.delta && r.go(-$.delta, !1), k(p, W, d))).then((p) => {
        p = p || Se(W, d, !1), p && ($.delta && !Ct(p, Re.NAVIGATION_CANCELLED) ? r.go(-$.delta, !1) : $.type === Ar.pop && Ct(p, Re.NAVIGATION_ABORTED | Re.NAVIGATION_DUPLICATED) && r.go(-1, !1)), _e(W, d, p);
      }).catch(kn);
    }));
  }
  let $e = Sn(), ne = Sn(), M;
  function k(A, H, $) {
    ve(A);
    const W = ne.list();
    return W.length ? W.forEach((re) => re(A, H, $)) : console.error(A), Promise.reject(A);
  }
  function U() {
    return M && a.value !== Lt ? Promise.resolve() : new Promise((A, H) => {
      $e.add([A, H]);
    });
  }
  function ve(A) {
    return M || (M = !A, Te(), $e.list().forEach(([H, $]) => A ? $(A) : H()), $e.reset()), A;
  }
  function he(A, H, $, W) {
    const { scrollBehavior: re } = e;
    if (!rn || !re) return Promise.resolve();
    const d = !$ && jf(jo(A.fullPath, 0)) || (W || !$) && history.state && history.state.scroll || null;
    return Hr().then(() => re(A, H, d)).then((p) => p && Uf(p)).catch((p) => k(p, A, H));
  }
  const le = (A) => r.go(A);
  let De;
  const Ue = /* @__PURE__ */ new Set(), it = {
    currentRoute: a,
    listening: !0,
    addRoute: g,
    removeRoute: _,
    clearRoutes: t.clearRoutes,
    hasRoute: v,
    getRoutes: b,
    resolve: O,
    options: e,
    push: R,
    replace: F,
    go: le,
    back: () => le(-1),
    forward: () => le(1),
    beforeEach: o.add,
    beforeResolve: i.add,
    afterEach: l.add,
    onError: ne.add,
    isReady: U,
    install(A) {
      A.component("RouterLink", gd), A.component("RouterView", bd), A.config.globalProperties.$router = it, Object.defineProperty(A.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => V(a)
      }), rn && !De && a.value === Lt && (De = !0, R(r.location).catch((W) => {
      }));
      const H = {};
      for (const W in Lt) Object.defineProperty(H, W, {
        get: () => a.value[W],
        enumerable: !0
      });
      A.provide(Bs, it), A.provide(Yr, Xi(H)), A.provide(Tr, a);
      const $ = A.unmount;
      Ue.add(A), A.unmount = function() {
        Ue.delete(A), Ue.size < 1 && (u = Lt, we && we(), we = null, a.value = Lt, De = !1, M = !1), $();
      };
    }
  };
  function Ge(A) {
    return A.reduce((H, $) => H.then(() => X($)), Promise.resolve());
  }
  return it;
}
function ta() {
  return ot(Bs);
}
function Qr(e) {
  return ot(Yr);
}
const na = /* @__PURE__ */ ff("counter", () => {
  const e = se("");
  return {
    currentPath: e,
    setPath: (n) => {
      e.value = n;
    }
  };
}), Ed = { class: "side" }, Sd = { class: "side-content-title" }, xd = ["onClick"], Rd = /* @__PURE__ */ We({
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
    return (i, l) => (j(), z("div", Ed, [
      (j(!0), z(Ee, null, Pt(V(r), (a) => (j(), z("div", {
        key: a.id,
        class: "side-content"
      }, [
        D("p", Sd, ge(a.name), 1),
        (j(!0), z(Ee, null, Pt(a.children, (u) => (j(), z("div", {
          key: u.mid,
          class: kt({
            "side-content-cell": !0,
            "side-content-cell-active": e.current === u.mid
          }),
          onClick: (c) => o(a.type, u)
        }, ge(u.name), 11, xd))), 128))
      ]))), 128))
    ]));
  }
}), tt = /* @__PURE__ */ We({
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
    return (t, n) => (j(), z("button", {
      class: kt([
        "meme-button",
        {
          disabled: e.disabled
        }
      ])
    }, [
      Wr(t.$slots, "default", {}, () => [
        Kr(ge(e.label), 1)
      ])
    ], 2));
  }
}), Cd = /* @__PURE__ */ We({
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
    const n = se(null), s = (o) => {
      t("update:modelValue", o.target.value);
    };
    return {
      input: n,
      blur: (o) => {
        s(o), t("blur");
      }
    };
  }
}), Ad = ["value"];
function Od(e, t, n, s, r, o) {
  return j(), z("input", {
    ref: "input",
    class: kt([
      "meme-input",
      {
        disabled: e.disabled
      }
    ]),
    name: "input",
    value: e.modelValue,
    onBlur: t[0] || (t[0] = (...i) => e.blur && e.blur(...i)),
    onKeyup: t[1] || (t[1] = Qu((i) => e.input?.blur(), ["enter"]))
  }, null, 42, Ad);
}
const Xe = /* @__PURE__ */ $s(Cd, [["render", Od]]), Td = { class: "meme-file-upload" }, Pd = { class: "file-button" }, Id = {
  key: 0,
  class: "file-preview"
}, Nd = ["src", "alt"], Dd = { class: "file-preview-info" }, Md = { class: "file-preview-name" }, kd = { class: "file-preview-size" }, Fd = {
  key: 1,
  class: "file-tips"
}, Ld = 1 * 1024 * 1024, $d = /* @__PURE__ */ We({
  __name: "FileUpload",
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = ot("commands"), s = t, r = se(""), o = se(null), i = (b) => {
      const v = b.target.files;
      if (!v)
        return !1;
      m(v);
    }, l = (b) => {
      b.stopPropagation(), b.preventDefault();
    }, a = (b) => {
      b.stopPropagation(), b.preventDefault();
    }, u = (b) => {
      b.stopPropagation(), b.preventDefault();
      const v = b.dataTransfer.files;
      m(v);
    }, c = (b) => {
      b.stopPropagation(), b.preventDefault();
      const v = b.clipboardData.files;
      m(v);
    }, f = /^image\//, m = (b) => {
      if (b.length !== 1)
        return g("不支持多个文件同时操作，请仅选择单个文件"), !1;
      const v = b[0];
      if (!v)
        return g("请选择文件"), !1;
      const { name: O, size: E, type: C } = v;
      if (!f.test(C))
        return g(`当前文件类型为${C}，类型不符，请选择图片类型！`), !1;
      const R = O.replace(/\.\w*$/g, "");
      if (n.value.includes(R))
        return g(`当前文件名称【${O}】与系统默认关键指令【${R}】冲突，请重命名上传文件！`), !1;
      if (E > Ld)
        return g("文件超过最大限制1M，请重新选择"), !1;
      const F = new FileReader();
      F.onload = (q) => {
        const L = q.target.result;
        _(O, L);
      }, F.onerror = () => {
        g(F.error.message);
      }, F.readAsDataURL(v);
    }, g = (b) => {
      alert(b);
    }, _ = (b, v) => {
      r.value = v;
      const O = new Image();
      O.onload = () => {
        const E = b.slice(b.lastIndexOf(".") + 1), C = b.slice(0, b.lastIndexOf(".")) || b;
        o.value = {
          name: C,
          ext: E,
          width: O.naturalWidth,
          height: O.naturalHeight
        };
      }, O.src = v, s("change", {
        name: b,
        base64: v
      });
    };
    return (b, v) => (j(), z("div", Td, [
      D("div", Pd, [
        v[0] || (v[0] = D("i", { class: "file-glyphicon" }, null, -1)),
        v[1] || (v[1] = D("span", null, "UPLOAD FILE", -1)),
        D("input", {
          class: "file-input",
          type: "file",
          name: "file",
          accept: "image/*",
          title: "",
          onChange: i
        }, null, 32)
      ]),
      D("div", {
        class: "file-area",
        draggable: !0,
        contenteditable: !0,
        onDragenter: l,
        onDragover: a,
        onDrop: u,
        onPaste: c
      }, [
        r.value && o.value ? (j(), z("div", Id, [
          D("img", {
            src: r.value,
            alt: o.value.name,
            class: "file-preview-image"
          }, null, 8, Nd),
          D("div", Dd, [
            D("div", Md, ge(o.value.name) + "." + ge(o.value.ext), 1),
            D("div", kd, ge(o.value.width) + " × " + ge(o.value.height), 1)
          ])
        ])) : (j(), z("i", Fd, "Drop files here to upload"))
      ], 32)
    ]));
  }
}), Ud = ["value", "selected"], ls = /* @__PURE__ */ We({
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
    return (r, o) => (j(), z("select", {
      class: "meme-select",
      name: "select",
      onChange: s
    }, [
      (j(!0), z(Ee, null, Pt(e.options, (i) => (j(), z("option", {
        key: i.value,
        class: "meme-option",
        value: i.value,
        selected: e.selected === i.value
      }, ge(i.label), 9, Ud))), 128))
    ], 32));
  }
}), Bd = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 32 32"
}, jd = ["fill"], ei = /* @__PURE__ */ We({
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
    return (i, l) => (j(), He(V(tt), {
      class: "dice-button",
      u: "icon",
      onClick: o
    }, {
      default: Bn(() => [
        (j(), z("svg", Bd, [
          l[0] || (l[0] = D("title", null, "dice", -1)),
          D("path", {
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
}, Vd = ["fill"], qd = /* @__PURE__ */ We({
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
    return (i, l) => (j(), He(V(tt), {
      class: "picker-button",
      u: "icon",
      onClick: o
    }, {
      default: Bn(() => [
        (j(), z("svg", Hd, [
          l[0] || (l[0] = D("title", null, "picker", -1)),
          D("path", {
            fill: r.value,
            d: "M30.828 1.172c-1.562-1.562-4.095-1.562-5.657 0l-5.379 5.379-3.793-3.793-4.243 4.243 3.326 3.326-14.754 14.754c-0.252 0.252-0.358 0.592-0.322 0.921h-0.008v5c0 0.552 0.448 1 1 1h5c0 0 0.083 0 0.125 0 0.288 0 0.576-0.11 0.795-0.329l14.754-14.754 3.326 3.326 4.243-4.243-3.793-3.793 5.379-5.379c1.562-1.562 1.562-4.095 0-5.657zM5.409 30h-3.409v-3.409l14.674-14.674 3.409 3.409-14.674 14.674z"
          }, null, 8, Vd)
        ]))
      ]),
      _: 1
    }));
  }
}), Wd = { class: "property text-property" }, Gd = /* @__PURE__ */ We({
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
    const n = e, s = t, { max: r, size: o, font: i, color: l, align: a, direction: u, blur: c, degree: f, stroke: m, swidth: g, content: _ } = Gn(n), b = [
      { label: "Sans Serif", value: "sans-serif" },
      { label: "Serif", value: "serif" },
      { label: "Monospace", value: "monospace" },
      { label: "Cursive", value: "cursive" },
      { label: "Fantasy", value: "fantasy" }
    ], v = [
      { label: "Start", value: "start" },
      { label: "Center", value: "center" },
      { label: "End", value: "end" }
    ], O = [
      { label: "Up", value: "up" },
      { label: "Center", value: "center" },
      { label: "Down", value: "down" }
    ], E = (F, q) => {
      const L = {
        eid: n.eid,
        max: r.value,
        size: o.value,
        font: i.value,
        color: l.value,
        align: a.value,
        direction: u.value,
        blur: c.value,
        degree: f.value,
        stroke: m.value,
        swidth: g.value,
        content: _.value
      }, J = ["color", "align", "direction", "stroke", "font", "content"].includes(q);
      L[q] = J ? F : parseInt(F), s("change", L);
    }, C = (F) => {
      const q = "#" + Math.floor(Math.random() * 16777215).toString(16);
      E(q, F);
    }, R = () => {
      s("pick");
    };
    return (F, q) => (j(), z("div", Wd, [
      Wr(F.$slots, "default"),
      ee(V(Xe), {
        class: "property-content",
        title: "content",
        placeholder: "附加文本",
        value: V(_),
        "onUpdate:modelValue": q[0] || (q[0] = (L) => E(L, "content"))
      }, null, 8, ["value"]),
      ee(V(Xe), {
        class: "property-max",
        title: "max",
        value: V(r),
        "onUpdate:modelValue": q[1] || (q[1] = (L) => E(L, "max"))
      }, null, 8, ["value"]),
      ee(V(Xe), {
        class: "property-size",
        title: "size",
        value: V(o),
        "onUpdate:modelValue": q[2] || (q[2] = (L) => E(L, "size"))
      }, null, 8, ["value"]),
      ee(V(ls), {
        class: "property-font",
        options: b,
        selected: V(i),
        "onUpdate:modelValue": q[3] || (q[3] = (L) => E(L, "font"))
      }, null, 8, ["selected"]),
      ee(V(Xe), {
        class: "property-color",
        title: "color",
        value: V(l),
        "onUpdate:modelValue": q[4] || (q[4] = (L) => E(L, "color"))
      }, null, 8, ["value"]),
      ee(ei, {
        color: V(l),
        onClick: q[5] || (q[5] = (L) => C("color"))
      }, null, 8, ["color"]),
      ee(qd, {
        color: V(l),
        onClick: R
      }, null, 8, ["color"]),
      ee(V(Xe), {
        class: "property-color",
        title: "stroke",
        value: V(m),
        "onUpdate:modelValue": q[6] || (q[6] = (L) => E(L, "stroke"))
      }, null, 8, ["value"]),
      ee(ei, {
        color: V(m),
        onClick: q[7] || (q[7] = (L) => C("stroke"))
      }, null, 8, ["color"]),
      ee(V(Xe), {
        class: "property-swidth",
        value: V(g),
        title: "swidth",
        "onUpdate:modelValue": q[8] || (q[8] = (L) => E(L, "swidth"))
      }, null, 8, ["value"]),
      ee(V(ls), {
        class: "property-align",
        options: v,
        selected: V(a),
        "onUpdate:modelValue": q[9] || (q[9] = (L) => E(L, "align"))
      }, null, 8, ["selected"]),
      ee(V(ls), {
        class: "property-direction",
        options: O,
        selected: V(u),
        "onUpdate:modelValue": q[10] || (q[10] = (L) => E(L, "direction"))
      }, null, 8, ["selected"]),
      ee(V(Xe), {
        class: "property-degree",
        title: "degree",
        value: V(f),
        "onUpdate:modelValue": q[11] || (q[11] = (L) => E(L, "degree"))
      }, null, 8, ["value"])
    ]));
  }
}), zd = { class: "property image-property" }, Kd = /* @__PURE__ */ We({
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
    ], { width: o, height: i, ipath: l } = Gn(n), a = (u, c) => {
      const f = {
        eid: n.eid,
        width: o.value,
        height: i.value,
        ipath: l.value
      };
      c === "ipath" ? f.ipath = u : c === "width" ? f.width = parseInt(u) : c === "height" && (f.height = parseInt(u)), s("change", f);
    };
    return (u, c) => (j(), z("div", zd, [
      Wr(u.$slots, "default"),
      ee(V(Xe), {
        class: "property-size",
        value: V(o),
        "onUpdate:modelValue": c[0] || (c[0] = (f) => a(f, "width"))
      }, null, 8, ["value"]),
      ee(V(Xe), {
        class: "property-size",
        value: V(i),
        "onUpdate:modelValue": c[1] || (c[1] = (f) => a(f, "height"))
      }, null, 8, ["value"]),
      ee(V(ls), {
        class: "property-path",
        options: r,
        selected: V(l),
        "onUpdate:modelValue": c[2] || (c[2] = (f) => a(f, "ipath"))
      }, null, 8, ["selected"])
    ]));
  }
}), Jd = ["onMousedown"], Xd = { class: "drag-overlay__tag" }, ns = 20, Yd = /* @__PURE__ */ We({
  __name: "DragOverlay",
  props: {
    layers: {},
    bounds: {},
    disabled: { type: Boolean },
    offset: {}
  },
  emits: ["dragStart", "dragMove", "dragEnd"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = se(null), o = se({ x: 0, y: 0 }), i = se({ x: 0, y: 0 }), l = se({ x: 0, y: 0 }), a = Ce(() => ({
      top: n.offset?.top ?? 10,
      left: n.offset?.left ?? 10
    })), u = (v) => n.layers.find((O) => O.id === v), c = (v, O, E) => {
      const C = n.bounds.width - v.width + ns, R = n.bounds.height - v.height + ns;
      return {
        x: Math.max(Math.min(O, C), -ns),
        y: Math.max(Math.min(E, R), -ns)
      };
    }, f = (v) => {
      if (!r.value)
        return;
      const O = u(r.value);
      if (!O)
        return;
      const E = v.clientX - o.value.x, C = v.clientY - o.value.y, R = c(O, i.value.x + E, i.value.y + C);
      l.value = R, s("dragMove", {
        id: O.id,
        x: R.x,
        y: R.y
      });
    }, m = () => {
      window.removeEventListener("mousemove", f), window.removeEventListener("mouseup", g);
    }, g = () => {
      r.value && (s("dragEnd", {
        id: r.value,
        x: l.value.x,
        y: l.value.y
      }), r.value = null, m());
    }, _ = (v, O) => {
      n.disabled || (r.value = v.id, o.value = { x: O.clientX, y: O.clientY }, i.value = { x: v.x, y: v.y }, l.value = { x: v.x, y: v.y }, s("dragStart", {
        id: v.id,
        x: v.x,
        y: v.y
      }), window.addEventListener("mousemove", f), window.addEventListener("mouseup", g), O.preventDefault());
    };
    ul(() => {
      m();
    });
    const b = (v) => ({
      width: `${v.width}px`,
      height: `${v.height}px`,
      transform: `translate(${v.x}px, ${v.y}px)`
    });
    return (v, O) => (j(), z("div", {
      class: kt(["drag-overlay", {
        "drag-overlay--disabled": e.disabled
      }]),
      style: un({
        width: `${e.bounds.width}px`,
        height: `${e.bounds.height}px`,
        top: `${a.value.top}px`,
        left: `${a.value.left}px`
      })
    }, [
      (j(!0), z(Ee, null, Pt(e.layers, (E) => (j(), z("div", {
        key: E.id,
        class: "drag-overlay__item",
        style: un(b(E)),
        onMousedown: (C) => _(E, C)
      }, [
        D("span", Xd, ge(E.type.toLowerCase()), 1)
      ], 44, Jd))), 128))
    ], 6));
  }
}), Qd = /* @__PURE__ */ $s(Yd, [["__scopeId", "data-v-1bb2305a"]]), Fn = 1.2, qe = 11, lt = 14, ti = lt * qe, ni = lt * qe, cr = lt * qe, si = lt, Zd = (() => {
  const e = [];
  for (let t = 1; t < qe; t++)
    e.push([t, 0, t, qe]), e.push([0, t, qe, t]);
  return e.map((t) => t.map((n) => n * lt));
})(), eh = (e, t, n) => {
  let s = 0, r = e.length - 1;
  for (; s <= r; ) {
    const o = Math.floor((s + r) / 2), i = n.measureText(e.substring(0, o)).width, l = n.measureText(e.substring(0, o + 1)).width;
    if (i <= t && l > t)
      return o;
    i < t ? s = o + 1 : r = o - 1;
  }
  return -1;
}, sa = (e, t, n) => {
  const s = [];
  let r = 0;
  for (; (r = eh(e, t, n)) !== -1; )
    s.push(e.substring(0, r)), e = e.substring(r);
  return e && s.push(e), s;
}, th = (e, t, n) => {
  const { content: s, x: r, y: o, size: i, font: l, color: a, stroke: u, swidth: c, align: f, max: m, direction: g, blur: _ = 0, degree: b = 0 } = n;
  e.font = `${i}px ${l}` || "32px sans-serif", e.fillStyle = a || "#000000", _ && (e.filter = `blur(${_}px)`), e.textAlign = f || "center", e.strokeStyle = u, e.lineWidth = c;
  const v = m || t, O = sa(s || "金馆长", v, e);
  O.forEach((E, C) => {
    let R = 0;
    g === "down" ? R = C : g === "center" ? R = C - (O.length - 1) / 2 : R = C - (O.length - 1), e.save(), b ? (e.translate(r, o + R * i * Fn), e.rotate(b * Math.PI / 180), e.strokeText(E, 0, 0, v), e.fillText(E, 0, 0, v)) : (e.strokeText(E, r, o + R * i * Fn, v), e.fillText(E, r, o + R * i * Fn, v)), e.restore();
  });
}, nh = (e) => {
  e.imageSmoothingEnabled = !1, e.lineCap = "round", e.beginPath(), e.strokeStyle = "#000000", e.arc(qe * lt / 2, qe * lt / 2, qe * lt / 2 - 1, 0, Math.PI * 2), e.stroke(), e.clip(), e.strokeStyle = "#D6D6D6", Zd.forEach((t) => {
    const { 0: n = 0, 1: s = 0, 2: r = 0, 3: o = 0 } = t;
    e.moveTo(n, s), e.lineTo(r, o);
  }), e.stroke(), e.beginPath(), e.strokeStyle = "#FF0000", e.rect((qe - 1) * lt / 2, (qe - 1) * lt / 2, 1 * lt, 1 * lt), e.stroke();
}, sh = (e, t, n, s) => {
  t.style.left = `${n + si}px`, t.style.top = `${s + si}px`;
  const r = t.getContext("2d"), o = Math.min(Math.max(0, n - 5), e.width - qe), i = Math.min(Math.max(0, s - 5), e.height - qe);
  r.clearRect(0, 0, ti, ni), r.drawImage(e, o, i, qe, qe, 0, 0, ti, ni), nh(r);
}, rh = (e) => e.split(";base64,")[0]?.match(/[a-z]+$/g)?.[0] || "png", oh = (e, t, n) => {
  const r = `image/${["jpeg", "jpg"].includes(t) ? "jpeg" : "png"}`, o = e.toDataURL(r), i = document.createElement("a");
  i.setAttribute("download", n), i.setAttribute("href", o), i.setAttribute("target", "_blank"), i.click();
}, Je = {
  TEXT: "TEXT",
  IMAGE: "IMAGE"
}, ih = { class: "container" }, lh = { class: "container-header" }, ah = { class: "container-title" }, ch = {
  key: 0,
  class: "container-wall"
}, uh = { class: "container-wrapper" }, fh = { class: "container-area" }, dh = ["width", "height"], hh = {
  key: 0,
  class: "property-actions"
}, ph = ["onClick"], mh = ["onClick"], gh = ["onClick"], yh = {
  key: 0,
  class: "property-actions"
}, _h = ["onClick"], vh = ["onClick"], bh = ["onClick"], wh = {
  key: 1,
  class: "container-footer"
}, Eh = /* @__PURE__ */ We({
  __name: "Container",
  props: {
    story: {}
  },
  emits: ["change", "create", "create-layer", "delete-layer", "reorder-layer", "update-name"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = Gn(n).story, o = se(null), i = se(!1), l = se(null), a = se(!1), u = se(!1), c = se(null), f = se(null), m = se(!1), g = se("金馆长"), _ = (h) => {
      g.value = h, q();
    }, b = se(0), v = se(0), O = (h) => {
      const y = r.value.children.find((w) => w.options.eid === h.eid);
      if (y) {
        if (y.type === Je.TEXT && "content" in h)
          Object.assign(y.options, h);
        else if (y.type === Je.IMAGE && "ipath" in h)
          Object.assign(y.options, h);
        else
          return;
        s("change", r.value);
      }
    }, E = Ce(() => rh(r.value.image)), C = Ce(() => `${r.value.name}.${E.value} ${b.value} * ${v.value}`), R = new Image(), F = () => {
      R.onload = async () => {
        const h = o.value;
        h.width = R.naturalWidth, h.height = R.naturalHeight, b.value = h.width, v.value = h.height, q();
      }, R.onerror = () => {
        console.error("图片加载失败");
      }, R.src = r.value.image;
    }, q = () => {
      const h = o.value, y = h.getContext("2d");
      y.drawImage(R, 0, 0), r.value.children.forEach(({ type: w, options: x }) => {
        w === Je.TEXT ? th(y, h.width, {
          ...x,
          content: g.value + x.content
        }) : Je.IMAGE;
      });
    }, L = typeof document < "u" ? document.createElement("canvas").getContext("2d") : null, J = (h, y) => ({
      start: 0,
      center: Math.floor(y / 2),
      end: y
    })[h] ?? 0, X = (h, y) => {
      if (!y || !L)
        return h.size * Fn;
      L.font = h.font ? `${h.size}px ${h.font}` : `${h.size}px sans-serif`;
      const w = sa(h.content || "", y, L);
      return Math.max(w.length, 1) * h.size * Fn;
    }, ce = Ce(() => {
      const h = b.value, y = v.value;
      return !h || !y ? [] : r.value.children.map((w, x) => {
        if (w.type === Je.TEXT) {
          const T = w.options, N = T.max || h, I = J(T.align || "start", N), P = X(T, N);
          return {
            id: T.eid || `text-${x}`,
            x: T.x - I,
            y: T.y - T.size + 2,
            width: N,
            height: P,
            alignOffset: I,
            size: T.size,
            type: w.type
          };
        }
        if (w.type === Je.IMAGE) {
          const T = w.options;
          return {
            id: T.eid || `image-${x}`,
            x: T.x,
            y: T.y,
            width: T.width,
            height: T.height,
            alignOffset: 0,
            size: 0,
            type: w.type
          };
        }
        return null;
      }).filter((w) => !!w);
    }), _e = (h, y, w) => {
      const x = r.value.children.find((T, N) => {
        const I = T.options.eid;
        return I ? I === h : `${N}` === h;
      });
      if (x) {
        if (x.type === Je.TEXT) {
          const T = x.options, N = T.max || b.value, I = J(T.align || "start", N);
          T.x = Math.round(y + I), T.y = Math.round(w + T.size - 2);
        } else if (x.type === Je.IMAGE) {
          const T = x.options;
          T.x = Math.round(y), T.y = Math.round(w);
        }
      }
    }, Se = ({ id: h, x: y, y: w }) => {
      _e(h, y, w);
    }, we = ({ id: h, x: y, y: w }) => {
      console.log(y, w), _e(h, y, w);
    }, Te = ({ id: h, x: y, y: w }) => {
      _e(h, y, w), s("change", r.value);
    };
    ft(() => r.value.mid, () => {
      F();
    }), ft(() => r.value.image, () => {
      F();
    }), ft(() => r.value.children, () => {
      q();
    }, { deep: !0 });
    const $e = () => {
      if (i.value)
        return;
      const h = o.value, y = `imeme_${r.value.name}_${g.value}`;
      oh(h, E.value, y);
    }, ne = () => {
      i.value = !0;
    }, M = () => {
      i.value = !1, l.value = null;
    }, k = () => {
      l.value && s("create", l.value, M);
    }, U = ({ name: h, base64: y }) => {
      l.value = {
        name: h.slice(0, h.lastIndexOf(".")) || h,
        image: y,
        layerType: Je.TEXT
      };
    }, ve = (h) => {
      f.value = h, a.value = !0;
    }, he = () => {
      m.value = !m.value;
    }, le = (h, y) => {
      !r.value.mid || !y || s("reorder-layer", { mid: r.value.mid, eid: y, direction: h });
    }, De = (h, y) => {
      const w = o.value, x = c.value;
      sh(w, x, h, y);
    }, Ue = async (h) => {
      if (!a.value)
        return !1;
      const { offsetX: y, offsetY: w } = h;
      y < 0 || w < 0 || (u.value = !0, De(y, w));
    }, it = () => {
      if (!a.value)
        return !1;
      u.value = !1;
    }, Ge = (h) => {
      const y = (I) => I.toString(16).padStart(2, "0"), { 0: w = 0, 1: x = 0, 2: T = 0, 3: N = 0 } = h.data;
      return `#${y(w)}${y(x)}${y(T)}${y(N)}`.toUpperCase();
    }, A = (h, y) => {
      const T = o.value.getContext("2d").getImageData(h, y, 1, 1);
      return Ge(T);
    }, H = (h) => {
      if (!a.value)
        return !1;
      const { offsetX: y, offsetY: w } = h;
      if (y < 0 || w < 0)
        return;
      const x = A(y, w), T = r.value.children.find((N) => {
        if (N.type !== Je.TEXT)
          return !1;
        const I = N.options.eid;
        return f.value ? I === f.value : !0;
      });
      T && (T.options.color = x, s("change", r.value)), u.value = !1, a.value = !1, f.value = null;
    }, $ = (h) => {
      r.value.mid && s("create-layer", { mid: r.value.mid, type: h });
    }, W = (h) => {
      !r.value.mid || !h || s("delete-layer", { mid: r.value.mid, eid: h });
    }, re = Qr(), d = Ce(() => re.path.includes("/edit")), p = (h) => {
      h !== r.value.name && (r.value.name = h, s("update-name", r.value));
    };
    return Ds(() => {
      F();
    }), (h, y) => (j(), z("div", ih, [
      D("div", lh, [
        D("div", ah, [
          d.value ? (j(), He(V(Xe), {
            key: 0,
            class: "container-title-label",
            value: V(r).name,
            "onUpdate:modelValue": y[0] || (y[0] = (w) => p(w))
          }, null, 8, ["value"])) : (j(), z(Ee, { key: 1 }, [
            Kr(ge(C.value), 1)
          ], 64))
        ]),
        i.value ? (j(), He(V(tt), {
          key: 0,
          label: "保存新故事",
          u: "primary",
          onClick: k
        })) : nt("", !0),
        i.value ? (j(), He(V(tt), {
          key: 1,
          label: "取消新建",
          u: "primary",
          onClick: M
        })) : (j(), He(V(tt), {
          key: 2,
          label: "新建故事",
          u: "primary",
          onClick: ne
        })),
        ee(V(tt), {
          label: "下载",
          u: "primary",
          disabled: i.value,
          onClick: $e
        }, null, 8, ["disabled"])
      ]),
      i.value ? (j(), z("div", ch, [
        ee(V($d), { onChange: U })
      ])) : nt("", !0),
      uo(D("div", uh, [
        D("div", fh, [
          D("canvas", {
            ref_key: "canvasRef",
            ref: o,
            class: kt({
              "container-canvas": !0,
              "container-pointer": a.value
            }),
            onMousemove: Ue,
            onMouseleave: it,
            onClick: H
          }, null, 34),
          !a.value && b.value && v.value ? (j(), He(Qd, {
            key: 0,
            class: "container-overlay",
            layers: ce.value,
            bounds: { width: b.value, height: v.value },
            offset: { top: 10, left: 10 },
            onDragStart: Se,
            onDragMove: we,
            onDragEnd: Te
          }, null, 8, ["layers", "bounds"])) : nt("", !0),
          uo(D("canvas", {
            ref_key: "layerRef",
            ref: c,
            class: "container-layer",
            style: un({
              borderRadius: `${V(cr)}px`
            }),
            width: V(cr),
            height: V(cr)
          }, null, 12, dh), [
            [Co, a.value && u.value]
          ])
        ]),
        (j(!0), z(Ee, null, Pt(V(r).children, (w, x) => (j(), z(Ee, { key: x }, [
          w.type === V(Je).IMAGE ? (j(), He(Kd, wr({
            key: 0,
            ref_for: !0
          }, w.options, { onChange: O }), {
            default: Bn(() => [
              (j(), He(V(Xe), {
                class: "property-text",
                key: x,
                title: "text",
                value: g.value,
                "onUpdate:modelValue": _
              }, null, 8, ["value"])),
              m.value ? (j(), z("div", hh, [
                D("button", {
                  class: "icon-button",
                  type: "button",
                  onClick: (T) => le("up", w.options.eid),
                  title: "上移"
                }, [...y[3] || (y[3] = [
                  D("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, [
                    D("path", { d: "M12 5l6 6H6z" })
                  ], -1)
                ])], 8, ph),
                D("button", {
                  class: "icon-button",
                  type: "button",
                  onClick: (T) => le("down", w.options.eid),
                  title: "下移"
                }, [...y[4] || (y[4] = [
                  D("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, [
                    D("path", { d: "M12 19l-6-6h12z" })
                  ], -1)
                ])], 8, mh),
                D("button", {
                  class: "icon-button danger",
                  type: "button",
                  onClick: (T) => W(w.options.eid),
                  title: "删除图层"
                }, [...y[5] || (y[5] = [
                  D("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, [
                    D("path", { d: "M16 9v9H8V9h8m-1.5-4h-5l-1 1H6v2h12V6h-2.5l-1-1z" })
                  ], -1)
                ])], 8, gh)
              ])) : nt("", !0)
            ]),
            _: 2
          }, 1040)) : (j(), He(Gd, wr({ key: x }, { ref_for: !0 }, w.options, {
            onChange: O,
            onPick: () => ve(w.options.eid)
          }), {
            default: Bn(() => [
              ee(V(Xe), {
                class: "property-text",
                title: "text",
                value: g.value,
                "onUpdate:modelValue": _
              }, null, 8, ["value"]),
              m.value ? (j(), z("div", yh, [
                D("button", {
                  class: "icon-button",
                  type: "button",
                  onClick: (T) => le("up", w.options.eid),
                  title: "上移"
                }, [...y[6] || (y[6] = [
                  D("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, [
                    D("path", { d: "M12 5l6 6H6z" })
                  ], -1)
                ])], 8, _h),
                D("button", {
                  class: "icon-button",
                  type: "button",
                  onClick: (T) => le("down", w.options.eid),
                  title: "下移"
                }, [...y[7] || (y[7] = [
                  D("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, [
                    D("path", { d: "M12 19l-6-6h12z" })
                  ], -1)
                ])], 8, vh),
                D("button", {
                  class: "icon-button danger",
                  type: "button",
                  onClick: (T) => W(w.options.eid),
                  title: "删除图层"
                }, [...y[8] || (y[8] = [
                  D("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false"
                  }, [
                    D("path", { d: "M16 9v9H8V9h8m-1.5-4h-5l-1 1H6v2h12V6h-2.5l-1-1z" })
                  ], -1)
                ])], 8, bh)
              ])) : nt("", !0)
            ]),
            _: 2
          }, 1040, ["onPick"]))
        ], 64))), 128))
      ], 512), [
        [Co, !i.value]
      ]),
      i.value ? nt("", !0) : (j(), z("footer", wh, [
        ee(V(tt), {
          class: "container-footer-label",
          label: "添加文本层",
          u: "primary",
          onClick: y[1] || (y[1] = () => $(V(Je).TEXT))
        }),
        ee(V(tt), {
          class: "container-footer-label",
          label: "添加图片层",
          u: "primary",
          onClick: y[2] || (y[2] = () => $(V(Je).IMAGE))
        }),
        ee(V(tt), {
          label: m.value ? "隐藏操作区" : "显示操作区",
          u: "primary",
          onClick: he
        }, null, 8, ["label"])
      ]))
    ]));
  }
}), ri = {
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
  },
  getStaticCatalog: {
    url: "/image/static/catalog",
    method: "get"
  },
  getStaticItems: {
    url: "/image/static/items",
    method: "get"
  },
  getStaticItemImage: {
    url: "/image/static/item",
    method: "get"
  },
  createStaticCollection: {
    url: "/image/static/create",
    method: "post"
  },
  addStaticItems: {
    url: "/image/static/add",
    method: "post"
  },
  deleteStaticItem: {
    url: "/image/static/item/delete",
    method: "post"
  }
};
function ra(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Sh } = Object.prototype, { getPrototypeOf: Zr } = Object, { iterator: js, toStringTag: oa } = Symbol, Hs = /* @__PURE__ */ ((e) => (t) => {
  const n = Sh.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), pt = (e) => (e = e.toLowerCase(), (t) => Hs(t) === e), Vs = (e) => (t) => typeof t === e, { isArray: yn } = Array, mn = Vs("undefined");
function Kn(e) {
  return e !== null && !mn(e) && e.constructor !== null && !mn(e.constructor) && Ye(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const ia = pt("ArrayBuffer");
function xh(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && ia(e.buffer), t;
}
const Rh = Vs("string"), Ye = Vs("function"), la = Vs("number"), Jn = (e) => e !== null && typeof e == "object", Ch = (e) => e === !0 || e === !1, as = (e) => {
  if (Hs(e) !== "object")
    return !1;
  const t = Zr(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(oa in e) && !(js in e);
}, Ah = (e) => {
  if (!Jn(e) || Kn(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, Oh = pt("Date"), Th = pt("File"), Ph = pt("Blob"), Ih = pt("FileList"), Nh = (e) => Jn(e) && Ye(e.pipe), Dh = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Ye(e.append) && ((t = Hs(e)) === "formdata" || // detect form-data instance
  t === "object" && Ye(e.toString) && e.toString() === "[object FormData]"));
}, Mh = pt("URLSearchParams"), [kh, Fh, Lh, $h] = ["ReadableStream", "Request", "Response", "Headers"].map(pt), Uh = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Xn(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let s, r;
  if (typeof e != "object" && (e = [e]), yn(e))
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
function aa(e, t) {
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
const Xt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, ca = (e) => !mn(e) && e !== Xt;
function Pr() {
  const { caseless: e, skipUndefined: t } = ca(this) && this || {}, n = {}, s = (r, o) => {
    const i = e && aa(n, o) || o;
    as(n[i]) && as(r) ? n[i] = Pr(n[i], r) : as(r) ? n[i] = Pr({}, r) : yn(r) ? n[i] = r.slice() : (!t || !mn(r)) && (n[i] = r);
  };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && Xn(arguments[r], s);
  return n;
}
const Bh = (e, t, n, { allOwnKeys: s } = {}) => (Xn(t, (r, o) => {
  n && Ye(r) ? e[o] = ra(r, n) : e[o] = r;
}, { allOwnKeys: s }), e), jh = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Hh = (e, t, n, s) => {
  e.prototype = Object.create(t.prototype, s), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, Vh = (e, t, n, s) => {
  let r, o, i;
  const l = {};
  if (t = t || {}, e == null) return t;
  do {
    for (r = Object.getOwnPropertyNames(e), o = r.length; o-- > 0; )
      i = r[o], (!s || s(i, e, t)) && !l[i] && (t[i] = e[i], l[i] = !0);
    e = n !== !1 && Zr(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, qh = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const s = e.indexOf(t, n);
  return s !== -1 && s === n;
}, Wh = (e) => {
  if (!e) return null;
  if (yn(e)) return e;
  let t = e.length;
  if (!la(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, Gh = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Zr(Uint8Array)), zh = (e, t) => {
  const s = (e && e[js]).call(e);
  let r;
  for (; (r = s.next()) && !r.done; ) {
    const o = r.value;
    t.call(e, o[0], o[1]);
  }
}, Kh = (e, t) => {
  let n;
  const s = [];
  for (; (n = e.exec(t)) !== null; )
    s.push(n);
  return s;
}, Jh = pt("HTMLFormElement"), Xh = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, s, r) {
    return s.toUpperCase() + r;
  }
), oi = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Yh = pt("RegExp"), ua = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), s = {};
  Xn(n, (r, o) => {
    let i;
    (i = t(r, o, e)) !== !1 && (s[o] = i || r);
  }), Object.defineProperties(e, s);
}, Qh = (e) => {
  ua(e, (t, n) => {
    if (Ye(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const s = e[n];
    if (Ye(s)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, Zh = (e, t) => {
  const n = {}, s = (r) => {
    r.forEach((o) => {
      n[o] = !0;
    });
  };
  return yn(e) ? s(e) : s(String(e).split(t)), n;
}, ep = () => {
}, tp = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function np(e) {
  return !!(e && Ye(e.append) && e[oa] === "FormData" && e[js]);
}
const sp = (e) => {
  const t = new Array(10), n = (s, r) => {
    if (Jn(s)) {
      if (t.indexOf(s) >= 0)
        return;
      if (Kn(s))
        return s;
      if (!("toJSON" in s)) {
        t[r] = s;
        const o = yn(s) ? [] : {};
        return Xn(s, (i, l) => {
          const a = n(i, r + 1);
          !mn(a) && (o[l] = a);
        }), t[r] = void 0, o;
      }
    }
    return s;
  };
  return n(e, 0);
}, rp = pt("AsyncFunction"), op = (e) => e && (Jn(e) || Ye(e)) && Ye(e.then) && Ye(e.catch), fa = ((e, t) => e ? setImmediate : t ? ((n, s) => (Xt.addEventListener("message", ({ source: r, data: o }) => {
  r === Xt && o === n && s.length && s.shift()();
}, !1), (r) => {
  s.push(r), Xt.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  Ye(Xt.postMessage)
), ip = typeof queueMicrotask < "u" ? queueMicrotask.bind(Xt) : typeof process < "u" && process.nextTick || fa, lp = (e) => e != null && Ye(e[js]), S = {
  isArray: yn,
  isArrayBuffer: ia,
  isBuffer: Kn,
  isFormData: Dh,
  isArrayBufferView: xh,
  isString: Rh,
  isNumber: la,
  isBoolean: Ch,
  isObject: Jn,
  isPlainObject: as,
  isEmptyObject: Ah,
  isReadableStream: kh,
  isRequest: Fh,
  isResponse: Lh,
  isHeaders: $h,
  isUndefined: mn,
  isDate: Oh,
  isFile: Th,
  isBlob: Ph,
  isRegExp: Yh,
  isFunction: Ye,
  isStream: Nh,
  isURLSearchParams: Mh,
  isTypedArray: Gh,
  isFileList: Ih,
  forEach: Xn,
  merge: Pr,
  extend: Bh,
  trim: Uh,
  stripBOM: jh,
  inherits: Hh,
  toFlatObject: Vh,
  kindOf: Hs,
  kindOfTest: pt,
  endsWith: qh,
  toArray: Wh,
  forEachEntry: zh,
  matchAll: Kh,
  isHTMLForm: Jh,
  hasOwnProperty: oi,
  hasOwnProp: oi,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: ua,
  freezeMethods: Qh,
  toObjectSet: Zh,
  toCamelCase: Xh,
  noop: ep,
  toFiniteNumber: tp,
  findKey: aa,
  global: Xt,
  isContextDefined: ca,
  isSpecCompliantForm: np,
  toJSONObject: sp,
  isAsyncFn: rp,
  isThenable: op,
  setImmediate: fa,
  asap: ip,
  isIterable: lp
};
function te(e, t, n, s, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), s && (this.request = s), r && (this.response = r, this.status = r.status ? r.status : null);
}
S.inherits(te, Error, {
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
const da = te.prototype, ha = {};
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
  ha[e] = { value: e };
});
Object.defineProperties(te, ha);
Object.defineProperty(da, "isAxiosError", { value: !0 });
te.from = (e, t, n, s, r, o) => {
  const i = Object.create(da);
  S.toFlatObject(e, i, function(c) {
    return c !== Error.prototype;
  }, (u) => u !== "isAxiosError");
  const l = e && e.message ? e.message : "Error", a = t == null && e ? e.code : t;
  return te.call(i, l, a, n, s, r), e && i.cause == null && Object.defineProperty(i, "cause", { value: e, configurable: !0 }), i.name = e && e.name || "Error", o && Object.assign(i, o), i;
};
const ap = null;
function Ir(e) {
  return S.isPlainObject(e) || S.isArray(e);
}
function pa(e) {
  return S.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function ii(e, t, n) {
  return e ? e.concat(t).map(function(r, o) {
    return r = pa(r), !n && o ? "[" + r + "]" : r;
  }).join(n ? "." : "") : t;
}
function cp(e) {
  return S.isArray(e) && !e.some(Ir);
}
const up = S.toFlatObject(S, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function qs(e, t, n) {
  if (!S.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = S.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(b, v) {
    return !S.isUndefined(v[b]);
  });
  const s = n.metaTokens, r = n.visitor || c, o = n.dots, i = n.indexes, a = (n.Blob || typeof Blob < "u" && Blob) && S.isSpecCompliantForm(t);
  if (!S.isFunction(r))
    throw new TypeError("visitor must be a function");
  function u(_) {
    if (_ === null) return "";
    if (S.isDate(_))
      return _.toISOString();
    if (S.isBoolean(_))
      return _.toString();
    if (!a && S.isBlob(_))
      throw new te("Blob is not supported. Use a Buffer instead.");
    return S.isArrayBuffer(_) || S.isTypedArray(_) ? a && typeof Blob == "function" ? new Blob([_]) : Buffer.from(_) : _;
  }
  function c(_, b, v) {
    let O = _;
    if (_ && !v && typeof _ == "object") {
      if (S.endsWith(b, "{}"))
        b = s ? b : b.slice(0, -2), _ = JSON.stringify(_);
      else if (S.isArray(_) && cp(_) || (S.isFileList(_) || S.endsWith(b, "[]")) && (O = S.toArray(_)))
        return b = pa(b), O.forEach(function(C, R) {
          !(S.isUndefined(C) || C === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? ii([b], R, o) : i === null ? b : b + "[]",
            u(C)
          );
        }), !1;
    }
    return Ir(_) ? !0 : (t.append(ii(v, b, o), u(_)), !1);
  }
  const f = [], m = Object.assign(up, {
    defaultVisitor: c,
    convertValue: u,
    isVisitable: Ir
  });
  function g(_, b) {
    if (!S.isUndefined(_)) {
      if (f.indexOf(_) !== -1)
        throw Error("Circular reference detected in " + b.join("."));
      f.push(_), S.forEach(_, function(O, E) {
        (!(S.isUndefined(O) || O === null) && r.call(
          t,
          O,
          S.isString(E) ? E.trim() : E,
          b,
          m
        )) === !0 && g(O, b ? b.concat(E) : [E]);
      }), f.pop();
    }
  }
  if (!S.isObject(e))
    throw new TypeError("data must be an object");
  return g(e), t;
}
function li(e) {
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
function eo(e, t) {
  this._pairs = [], e && qs(e, this, t);
}
const ma = eo.prototype;
ma.append = function(t, n) {
  this._pairs.push([t, n]);
};
ma.toString = function(t) {
  const n = t ? function(s) {
    return t.call(this, s, li);
  } : li;
  return this._pairs.map(function(r) {
    return n(r[0]) + "=" + n(r[1]);
  }, "").join("&");
};
function fp(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function ga(e, t, n) {
  if (!t)
    return e;
  const s = n && n.encode || fp;
  S.isFunction(n) && (n = {
    serialize: n
  });
  const r = n && n.serialize;
  let o;
  if (r ? o = r(t, n) : o = S.isURLSearchParams(t) ? t.toString() : new eo(t, n).toString(s), o) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class ai {
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
const ya = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, dp = typeof URLSearchParams < "u" ? URLSearchParams : eo, hp = typeof FormData < "u" ? FormData : null, pp = typeof Blob < "u" ? Blob : null, mp = {
  isBrowser: !0,
  classes: {
    URLSearchParams: dp,
    FormData: hp,
    Blob: pp
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, to = typeof window < "u" && typeof document < "u", Nr = typeof navigator == "object" && navigator || void 0, gp = to && (!Nr || ["ReactNative", "NativeScript", "NS"].indexOf(Nr.product) < 0), yp = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", _p = to && window.location.href || "http://localhost", vp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: to,
  hasStandardBrowserEnv: gp,
  hasStandardBrowserWebWorkerEnv: yp,
  navigator: Nr,
  origin: _p
}, Symbol.toStringTag, { value: "Module" })), Fe = {
  ...vp,
  ...mp
};
function bp(e, t) {
  return qs(e, new Fe.classes.URLSearchParams(), {
    visitor: function(n, s, r, o) {
      return Fe.isNode && S.isBuffer(n) ? (this.append(s, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function wp(e) {
  return S.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Ep(e) {
  const t = {}, n = Object.keys(e);
  let s;
  const r = n.length;
  let o;
  for (s = 0; s < r; s++)
    o = n[s], t[o] = e[o];
  return t;
}
function _a(e) {
  function t(n, s, r, o) {
    let i = n[o++];
    if (i === "__proto__") return !0;
    const l = Number.isFinite(+i), a = o >= n.length;
    return i = !i && S.isArray(r) ? r.length : i, a ? (S.hasOwnProp(r, i) ? r[i] = [r[i], s] : r[i] = s, !l) : ((!r[i] || !S.isObject(r[i])) && (r[i] = []), t(n, s, r[i], o) && S.isArray(r[i]) && (r[i] = Ep(r[i])), !l);
  }
  if (S.isFormData(e) && S.isFunction(e.entries)) {
    const n = {};
    return S.forEachEntry(e, (s, r) => {
      t(wp(s), r, n, 0);
    }), n;
  }
  return null;
}
function Sp(e, t, n) {
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
  transitional: ya,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const s = n.getContentType() || "", r = s.indexOf("application/json") > -1, o = S.isObject(t);
    if (o && S.isHTMLForm(t) && (t = new FormData(t)), S.isFormData(t))
      return r ? JSON.stringify(_a(t)) : t;
    if (S.isArrayBuffer(t) || S.isBuffer(t) || S.isStream(t) || S.isFile(t) || S.isBlob(t) || S.isReadableStream(t))
      return t;
    if (S.isArrayBufferView(t))
      return t.buffer;
    if (S.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let l;
    if (o) {
      if (s.indexOf("application/x-www-form-urlencoded") > -1)
        return bp(t, this.formSerializer).toString();
      if ((l = S.isFileList(t)) || s.indexOf("multipart/form-data") > -1) {
        const a = this.env && this.env.FormData;
        return qs(
          l ? { "files[]": t } : t,
          a && new a(),
          this.formSerializer
        );
      }
    }
    return o || r ? (n.setContentType("application/json", !1), Sp(t)) : t;
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
          throw l.name === "SyntaxError" ? te.from(l, te.ERR_BAD_RESPONSE, this, null, this.response) : l;
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
    FormData: Fe.classes.FormData,
    Blob: Fe.classes.Blob
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
const xp = S.toObjectSet([
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
]), Rp = (e) => {
  const t = {};
  let n, s, r;
  return e && e.split(`
`).forEach(function(i) {
    r = i.indexOf(":"), n = i.substring(0, r).trim().toLowerCase(), s = i.substring(r + 1).trim(), !(!n || t[n] && xp[n]) && (n === "set-cookie" ? t[n] ? t[n].push(s) : t[n] = [s] : t[n] = t[n] ? t[n] + ", " + s : s);
  }), t;
}, ci = /* @__PURE__ */ Symbol("internals");
function xn(e) {
  return e && String(e).trim().toLowerCase();
}
function cs(e) {
  return e === !1 || e == null ? e : S.isArray(e) ? e.map(cs) : String(e);
}
function Cp(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = n.exec(e); )
    t[s[1]] = s[2];
  return t;
}
const Ap = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
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
function Op(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, s) => n.toUpperCase() + s);
}
function Tp(e, t) {
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
let Qe = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, s) {
    const r = this;
    function o(l, a, u) {
      const c = xn(a);
      if (!c)
        throw new Error("header name must be a non-empty string");
      const f = S.findKey(r, c);
      (!f || r[f] === void 0 || u === !0 || u === void 0 && r[f] !== !1) && (r[f || a] = cs(l));
    }
    const i = (l, a) => S.forEach(l, (u, c) => o(u, c, a));
    if (S.isPlainObject(t) || t instanceof this.constructor)
      i(t, n);
    else if (S.isString(t) && (t = t.trim()) && !Ap(t))
      i(Rp(t), n);
    else if (S.isObject(t) && S.isIterable(t)) {
      let l = {}, a, u;
      for (const c of t) {
        if (!S.isArray(c))
          throw TypeError("Object iterator must return a key-value pair");
        l[u = c[0]] = (a = l[u]) ? S.isArray(a) ? [...a, c[1]] : [a, c[1]] : c[1];
      }
      i(l, n);
    } else
      t != null && o(n, t, s);
    return this;
  }
  get(t, n) {
    if (t = xn(t), t) {
      const s = S.findKey(this, t);
      if (s) {
        const r = this[s];
        if (!n)
          return r;
        if (n === !0)
          return Cp(r);
        if (S.isFunction(n))
          return n.call(this, r, s);
        if (S.isRegExp(n))
          return n.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = xn(t), t) {
      const s = S.findKey(this, t);
      return !!(s && this[s] !== void 0 && (!n || ur(this, this[s], s, n)));
    }
    return !1;
  }
  delete(t, n) {
    const s = this;
    let r = !1;
    function o(i) {
      if (i = xn(i), i) {
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
        n[i] = cs(r), delete n[o];
        return;
      }
      const l = t ? Op(o) : String(o).trim();
      l !== o && delete n[o], n[l] = cs(r), s[l] = !0;
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
      const l = xn(i);
      s[l] || (Tp(r, i), s[l] = !0);
    }
    return S.isArray(t) ? t.forEach(o) : o(t), this;
  }
};
Qe.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
S.reduceDescriptors(Qe.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(s) {
      this[n] = s;
    }
  };
});
S.freezeMethods(Qe);
function fr(e, t) {
  const n = this || Yn, s = t || n, r = Qe.from(s.headers);
  let o = s.data;
  return S.forEach(e, function(l) {
    o = l.call(n, o, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), o;
}
function va(e) {
  return !!(e && e.__CANCEL__);
}
function _n(e, t, n) {
  te.call(this, e ?? "canceled", te.ERR_CANCELED, t, n), this.name = "CanceledError";
}
S.inherits(_n, te, {
  __CANCEL__: !0
});
function ba(e, t, n) {
  const s = n.config.validateStatus;
  !n.status || !s || s(n.status) ? e(n) : t(new te(
    "Request failed with status code " + n.status,
    [te.ERR_BAD_REQUEST, te.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function Pp(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Ip(e, t) {
  e = e || 10;
  const n = new Array(e), s = new Array(e);
  let r = 0, o = 0, i;
  return t = t !== void 0 ? t : 1e3, function(a) {
    const u = Date.now(), c = s[o];
    i || (i = u), n[r] = a, s[r] = u;
    let f = o, m = 0;
    for (; f !== r; )
      m += n[f++], f = f % e;
    if (r = (r + 1) % e, r === o && (o = (o + 1) % e), u - i < t)
      return;
    const g = c && u - c;
    return g ? Math.round(m * 1e3 / g) : void 0;
  };
}
function Np(e, t) {
  let n = 0, s = 1e3 / t, r, o;
  const i = (u, c = Date.now()) => {
    n = c, r = null, o && (clearTimeout(o), o = null), e(...u);
  };
  return [(...u) => {
    const c = Date.now(), f = c - n;
    f >= s ? i(u, c) : (r = u, o || (o = setTimeout(() => {
      o = null, i(r);
    }, s - f)));
  }, () => r && i(r)];
}
const bs = (e, t, n = 3) => {
  let s = 0;
  const r = Ip(50, 250);
  return Np((o) => {
    const i = o.loaded, l = o.lengthComputable ? o.total : void 0, a = i - s, u = r(a), c = i <= l;
    s = i;
    const f = {
      loaded: i,
      total: l,
      progress: l ? i / l : void 0,
      bytes: a,
      rate: u || void 0,
      estimated: u && l && c ? (l - i) / u : void 0,
      event: o,
      lengthComputable: l != null,
      [t ? "download" : "upload"]: !0
    };
    e(f);
  }, n);
}, ui = (e, t) => {
  const n = e != null;
  return [(s) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: s
  }), t[1]];
}, fi = (e) => (...t) => S.asap(() => e(...t)), Dp = Fe.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, Fe.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(Fe.origin),
  Fe.navigator && /(msie|trident)/i.test(Fe.navigator.userAgent)
) : () => !0, Mp = Fe.hasStandardBrowserEnv ? (
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
function kp(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Fp(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function wa(e, t, n) {
  let s = !kp(t);
  return e && (s || n == !1) ? Fp(e, t) : t;
}
const di = (e) => e instanceof Qe ? { ...e } : e;
function en(e, t) {
  t = t || {};
  const n = {};
  function s(u, c, f, m) {
    return S.isPlainObject(u) && S.isPlainObject(c) ? S.merge.call({ caseless: m }, u, c) : S.isPlainObject(c) ? S.merge({}, c) : S.isArray(c) ? c.slice() : c;
  }
  function r(u, c, f, m) {
    if (S.isUndefined(c)) {
      if (!S.isUndefined(u))
        return s(void 0, u, f, m);
    } else return s(u, c, f, m);
  }
  function o(u, c) {
    if (!S.isUndefined(c))
      return s(void 0, c);
  }
  function i(u, c) {
    if (S.isUndefined(c)) {
      if (!S.isUndefined(u))
        return s(void 0, u);
    } else return s(void 0, c);
  }
  function l(u, c, f) {
    if (f in t)
      return s(u, c);
    if (f in e)
      return s(void 0, u);
  }
  const a = {
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
    headers: (u, c, f) => r(di(u), di(c), f, !0)
  };
  return S.forEach(Object.keys({ ...e, ...t }), function(c) {
    const f = a[c] || r, m = f(e[c], t[c], c);
    S.isUndefined(m) && f !== l || (n[c] = m);
  }), n;
}
const Ea = (e) => {
  const t = en({}, e);
  let { data: n, withXSRFToken: s, xsrfHeaderName: r, xsrfCookieName: o, headers: i, auth: l } = t;
  if (t.headers = i = Qe.from(i), t.url = ga(wa(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), l && i.set(
    "Authorization",
    "Basic " + btoa((l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : ""))
  ), S.isFormData(n)) {
    if (Fe.hasStandardBrowserEnv || Fe.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if (S.isFunction(n.getHeaders)) {
      const a = n.getHeaders(), u = ["content-type", "content-length"];
      Object.entries(a).forEach(([c, f]) => {
        u.includes(c.toLowerCase()) && i.set(c, f);
      });
    }
  }
  if (Fe.hasStandardBrowserEnv && (s && S.isFunction(s) && (s = s(t)), s || s !== !1 && Dp(t.url))) {
    const a = r && o && Mp.read(o);
    a && i.set(r, a);
  }
  return t;
}, Lp = typeof XMLHttpRequest < "u", $p = Lp && function(e) {
  return new Promise(function(n, s) {
    const r = Ea(e);
    let o = r.data;
    const i = Qe.from(r.headers).normalize();
    let { responseType: l, onUploadProgress: a, onDownloadProgress: u } = r, c, f, m, g, _;
    function b() {
      g && g(), _ && _(), r.cancelToken && r.cancelToken.unsubscribe(c), r.signal && r.signal.removeEventListener("abort", c);
    }
    let v = new XMLHttpRequest();
    v.open(r.method.toUpperCase(), r.url, !0), v.timeout = r.timeout;
    function O() {
      if (!v)
        return;
      const C = Qe.from(
        "getAllResponseHeaders" in v && v.getAllResponseHeaders()
      ), F = {
        data: !l || l === "text" || l === "json" ? v.responseText : v.response,
        status: v.status,
        statusText: v.statusText,
        headers: C,
        config: e,
        request: v
      };
      ba(function(L) {
        n(L), b();
      }, function(L) {
        s(L), b();
      }, F), v = null;
    }
    "onloadend" in v ? v.onloadend = O : v.onreadystatechange = function() {
      !v || v.readyState !== 4 || v.status === 0 && !(v.responseURL && v.responseURL.indexOf("file:") === 0) || setTimeout(O);
    }, v.onabort = function() {
      v && (s(new te("Request aborted", te.ECONNABORTED, e, v)), v = null);
    }, v.onerror = function(R) {
      const F = R && R.message ? R.message : "Network Error", q = new te(F, te.ERR_NETWORK, e, v);
      q.event = R || null, s(q), v = null;
    }, v.ontimeout = function() {
      let R = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const F = r.transitional || ya;
      r.timeoutErrorMessage && (R = r.timeoutErrorMessage), s(new te(
        R,
        F.clarifyTimeoutError ? te.ETIMEDOUT : te.ECONNABORTED,
        e,
        v
      )), v = null;
    }, o === void 0 && i.setContentType(null), "setRequestHeader" in v && S.forEach(i.toJSON(), function(R, F) {
      v.setRequestHeader(F, R);
    }), S.isUndefined(r.withCredentials) || (v.withCredentials = !!r.withCredentials), l && l !== "json" && (v.responseType = r.responseType), u && ([m, _] = bs(u, !0), v.addEventListener("progress", m)), a && v.upload && ([f, g] = bs(a), v.upload.addEventListener("progress", f), v.upload.addEventListener("loadend", g)), (r.cancelToken || r.signal) && (c = (C) => {
      v && (s(!C || C.type ? new _n(null, e, v) : C), v.abort(), v = null);
    }, r.cancelToken && r.cancelToken.subscribe(c), r.signal && (r.signal.aborted ? c() : r.signal.addEventListener("abort", c)));
    const E = Pp(r.url);
    if (E && Fe.protocols.indexOf(E) === -1) {
      s(new te("Unsupported protocol " + E + ":", te.ERR_BAD_REQUEST, e));
      return;
    }
    v.send(o || null);
  });
}, Up = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let s = new AbortController(), r;
    const o = function(u) {
      if (!r) {
        r = !0, l();
        const c = u instanceof Error ? u : this.reason;
        s.abort(c instanceof te ? c : new _n(c instanceof Error ? c.message : c));
      }
    };
    let i = t && setTimeout(() => {
      i = null, o(new te(`timeout ${t} of ms exceeded`, te.ETIMEDOUT));
    }, t);
    const l = () => {
      e && (i && clearTimeout(i), i = null, e.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(o) : u.removeEventListener("abort", o);
      }), e = null);
    };
    e.forEach((u) => u.addEventListener("abort", o));
    const { signal: a } = s;
    return a.unsubscribe = () => S.asap(l), a;
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
}, jp = async function* (e, t) {
  for await (const n of Hp(e))
    yield* Bp(n, t);
}, Hp = async function* (e) {
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
}, hi = (e, t, n, s) => {
  const r = jp(e, t);
  let o = 0, i, l = (a) => {
    i || (i = !0, s && s(a));
  };
  return new ReadableStream({
    async pull(a) {
      try {
        const { done: u, value: c } = await r.next();
        if (u) {
          l(), a.close();
          return;
        }
        let f = c.byteLength;
        if (n) {
          let m = o += f;
          n(m);
        }
        a.enqueue(new Uint8Array(c));
      } catch (u) {
        throw l(u), u;
      }
    },
    cancel(a) {
      return l(a), r.return();
    }
  }, {
    highWaterMark: 2
  });
}, pi = 64 * 1024, { isFunction: ss } = S, Vp = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(S.global), {
  ReadableStream: mi,
  TextEncoder: gi
} = S.global, yi = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, qp = (e) => {
  e = S.merge.call({
    skipUndefined: !0
  }, Vp, e);
  const { fetch: t, Request: n, Response: s } = e, r = t ? ss(t) : typeof fetch == "function", o = ss(n), i = ss(s);
  if (!r)
    return !1;
  const l = r && ss(mi), a = r && (typeof gi == "function" ? /* @__PURE__ */ ((_) => (b) => _.encode(b))(new gi()) : async (_) => new Uint8Array(await new n(_).arrayBuffer())), u = o && l && yi(() => {
    let _ = !1;
    const b = new n(Fe.origin, {
      body: new mi(),
      method: "POST",
      get duplex() {
        return _ = !0, "half";
      }
    }).headers.has("Content-Type");
    return _ && !b;
  }), c = i && l && yi(() => S.isReadableStream(new s("").body)), f = {
    stream: c && ((_) => _.body)
  };
  r && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((_) => {
    !f[_] && (f[_] = (b, v) => {
      let O = b && b[_];
      if (O)
        return O.call(b);
      throw new te(`Response type '${_}' is not supported`, te.ERR_NOT_SUPPORT, v);
    });
  });
  const m = async (_) => {
    if (_ == null)
      return 0;
    if (S.isBlob(_))
      return _.size;
    if (S.isSpecCompliantForm(_))
      return (await new n(Fe.origin, {
        method: "POST",
        body: _
      }).arrayBuffer()).byteLength;
    if (S.isArrayBufferView(_) || S.isArrayBuffer(_))
      return _.byteLength;
    if (S.isURLSearchParams(_) && (_ = _ + ""), S.isString(_))
      return (await a(_)).byteLength;
  }, g = async (_, b) => {
    const v = S.toFiniteNumber(_.getContentLength());
    return v ?? m(b);
  };
  return async (_) => {
    let {
      url: b,
      method: v,
      data: O,
      signal: E,
      cancelToken: C,
      timeout: R,
      onDownloadProgress: F,
      onUploadProgress: q,
      responseType: L,
      headers: J,
      withCredentials: X = "same-origin",
      fetchOptions: ce
    } = Ea(_), _e = t || fetch;
    L = L ? (L + "").toLowerCase() : "text";
    let Se = Up([E, C && C.toAbortSignal()], R), we = null;
    const Te = Se && Se.unsubscribe && (() => {
      Se.unsubscribe();
    });
    let $e;
    try {
      if (q && u && v !== "get" && v !== "head" && ($e = await g(J, O)) !== 0) {
        let he = new n(b, {
          method: "POST",
          body: O,
          duplex: "half"
        }), le;
        if (S.isFormData(O) && (le = he.headers.get("content-type")) && J.setContentType(le), he.body) {
          const [De, Ue] = ui(
            $e,
            bs(fi(q))
          );
          O = hi(he.body, pi, De, Ue);
        }
      }
      S.isString(X) || (X = X ? "include" : "omit");
      const ne = o && "credentials" in n.prototype, M = {
        ...ce,
        signal: Se,
        method: v.toUpperCase(),
        headers: J.normalize().toJSON(),
        body: O,
        duplex: "half",
        credentials: ne ? X : void 0
      };
      we = o && new n(b, M);
      let k = await (o ? _e(we, ce) : _e(b, M));
      const U = c && (L === "stream" || L === "response");
      if (c && (F || U && Te)) {
        const he = {};
        ["status", "statusText", "headers"].forEach((it) => {
          he[it] = k[it];
        });
        const le = S.toFiniteNumber(k.headers.get("content-length")), [De, Ue] = F && ui(
          le,
          bs(fi(F), !0)
        ) || [];
        k = new s(
          hi(k.body, pi, De, () => {
            Ue && Ue(), Te && Te();
          }),
          he
        );
      }
      L = L || "text";
      let ve = await f[S.findKey(f, L) || "text"](k, _);
      return !U && Te && Te(), await new Promise((he, le) => {
        ba(he, le, {
          data: ve,
          headers: Qe.from(k.headers),
          status: k.status,
          statusText: k.statusText,
          config: _,
          request: we
        });
      });
    } catch (ne) {
      throw Te && Te(), ne && ne.name === "TypeError" && /Load failed|fetch/i.test(ne.message) ? Object.assign(
        new te("Network Error", te.ERR_NETWORK, _, we),
        {
          cause: ne.cause || ne
        }
      ) : te.from(ne, ne && ne.code, _, we);
    }
  };
}, Wp = /* @__PURE__ */ new Map(), Sa = (e) => {
  let t = e && e.env || {};
  const { fetch: n, Request: s, Response: r } = t, o = [
    s,
    r,
    n
  ];
  let i = o.length, l = i, a, u, c = Wp;
  for (; l--; )
    a = o[l], u = c.get(a), u === void 0 && c.set(a, u = l ? /* @__PURE__ */ new Map() : qp(t)), c = u;
  return u;
};
Sa();
const no = {
  http: ap,
  xhr: $p,
  fetch: {
    get: Sa
  }
};
S.forEach(no, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const _i = (e) => `- ${e}`, Gp = (e) => S.isFunction(e) || e === null || e === !1;
function zp(e, t) {
  e = S.isArray(e) ? e : [e];
  const { length: n } = e;
  let s, r;
  const o = {};
  for (let i = 0; i < n; i++) {
    s = e[i];
    let l;
    if (r = s, !Gp(s) && (r = no[(l = String(s)).toLowerCase()], r === void 0))
      throw new te(`Unknown adapter '${l}'`);
    if (r && (S.isFunction(r) || (r = r.get(t))))
      break;
    o[l || "#" + i] = r;
  }
  if (!r) {
    const i = Object.entries(o).map(
      ([a, u]) => `adapter ${a} ` + (u === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let l = n ? i.length > 1 ? `since :
` + i.map(_i).join(`
`) : " " + _i(i[0]) : "as no adapter specified";
    throw new te(
      "There is no suitable adapter to dispatch the request " + l,
      "ERR_NOT_SUPPORT"
    );
  }
  return r;
}
const xa = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: zp,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: no
};
function dr(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new _n(null, e);
}
function vi(e) {
  return dr(e), e.headers = Qe.from(e.headers), e.data = fr.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), xa.getAdapter(e.adapter || Yn.adapter, e)(e).then(function(s) {
    return dr(e), s.data = fr.call(
      e,
      e.transformResponse,
      s
    ), s.headers = Qe.from(s.headers), s;
  }, function(s) {
    return va(s) || (dr(e), s && s.response && (s.response.data = fr.call(
      e,
      e.transformResponse,
      s.response
    ), s.response.headers = Qe.from(s.response.headers))), Promise.reject(s);
  });
}
const Ra = "1.13.2", Ws = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Ws[e] = function(s) {
    return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const bi = {};
Ws.transitional = function(t, n, s) {
  function r(o, i) {
    return "[Axios v" + Ra + "] Transitional option '" + o + "'" + i + (s ? ". " + s : "");
  }
  return (o, i, l) => {
    if (t === !1)
      throw new te(
        r(i, " has been removed" + (n ? " in " + n : "")),
        te.ERR_DEPRECATED
      );
    return n && !bi[i] && (bi[i] = !0, console.warn(
      r(
        i,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(o, i, l) : !0;
  };
};
Ws.spelling = function(t) {
  return (n, s) => (console.warn(`${s} is likely a misspelling of ${t}`), !0);
};
function Kp(e, t, n) {
  if (typeof e != "object")
    throw new te("options must be an object", te.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(e);
  let r = s.length;
  for (; r-- > 0; ) {
    const o = s[r], i = t[o];
    if (i) {
      const l = e[o], a = l === void 0 || i(l, o, e);
      if (a !== !0)
        throw new te("option " + o + " must be " + a, te.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new te("Unknown option " + o, te.ERR_BAD_OPTION);
  }
}
const us = {
  assertOptions: Kp,
  validators: Ws
}, vt = us.validators;
let Zt = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new ai(),
      response: new ai()
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
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = en(this.defaults, n);
    const { transitional: s, paramsSerializer: r, headers: o } = n;
    s !== void 0 && us.assertOptions(s, {
      silentJSONParsing: vt.transitional(vt.boolean),
      forcedJSONParsing: vt.transitional(vt.boolean),
      clarifyTimeoutError: vt.transitional(vt.boolean)
    }, !1), r != null && (S.isFunction(r) ? n.paramsSerializer = {
      serialize: r
    } : us.assertOptions(r, {
      encode: vt.function,
      serialize: vt.function
    }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), us.assertOptions(n, {
      baseUrl: vt.spelling("baseURL"),
      withXsrfToken: vt.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let i = o && S.merge(
      o.common,
      o[n.method]
    );
    o && S.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (_) => {
        delete o[_];
      }
    ), n.headers = Qe.concat(i, o);
    const l = [];
    let a = !0;
    this.interceptors.request.forEach(function(b) {
      typeof b.runWhen == "function" && b.runWhen(n) === !1 || (a = a && b.synchronous, l.unshift(b.fulfilled, b.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(b) {
      u.push(b.fulfilled, b.rejected);
    });
    let c, f = 0, m;
    if (!a) {
      const _ = [vi.bind(this), void 0];
      for (_.unshift(...l), _.push(...u), m = _.length, c = Promise.resolve(n); f < m; )
        c = c.then(_[f++], _[f++]);
      return c;
    }
    m = l.length;
    let g = n;
    for (; f < m; ) {
      const _ = l[f++], b = l[f++];
      try {
        g = _(g);
      } catch (v) {
        b.call(this, v);
        break;
      }
    }
    try {
      c = vi.call(this, g);
    } catch (_) {
      return Promise.reject(_);
    }
    for (f = 0, m = u.length; f < m; )
      c = c.then(u[f++], u[f++]);
    return c;
  }
  getUri(t) {
    t = en(this.defaults, t);
    const n = wa(t.baseURL, t.url, t.allowAbsoluteUrls);
    return ga(n, t.params, t.paramsSerializer);
  }
};
S.forEach(["delete", "get", "head", "options"], function(t) {
  Zt.prototype[t] = function(n, s) {
    return this.request(en(s || {}, {
      method: t,
      url: n,
      data: (s || {}).data
    }));
  };
});
S.forEach(["post", "put", "patch"], function(t) {
  function n(s) {
    return function(o, i, l) {
      return this.request(en(l || {}, {
        method: t,
        headers: s ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: i
      }));
    };
  }
  Zt.prototype[t] = n(), Zt.prototype[t + "Form"] = n(!0);
});
let Jp = class Ca {
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
      token: new Ca(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
};
function Xp(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function Yp(e) {
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
function Aa(e) {
  const t = new Zt(e), n = ra(Zt.prototype.request, t);
  return S.extend(n, Zt.prototype, t, { allOwnKeys: !0 }), S.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(r) {
    return Aa(en(e, r));
  }, n;
}
const Oe = Aa(Yn);
Oe.Axios = Zt;
Oe.CanceledError = _n;
Oe.CancelToken = Jp;
Oe.isCancel = va;
Oe.VERSION = Ra;
Oe.toFormData = qs;
Oe.AxiosError = te;
Oe.Cancel = Oe.CanceledError;
Oe.all = function(t) {
  return Promise.all(t);
};
Oe.spread = Xp;
Oe.isAxiosError = Yp;
Oe.mergeConfig = en;
Oe.AxiosHeaders = Qe;
Oe.formToJSON = (e) => _a(S.isHTMLForm(e) ? new FormData(e) : e);
Oe.getAdapter = xa.getAdapter;
Oe.HttpStatusCode = Dr;
Oe.default = Oe;
const {
  Axios: sg,
  AxiosError: rg,
  CanceledError: og,
  isCancel: ig,
  CancelToken: lg,
  VERSION: ag,
  all: cg,
  Cancel: ug,
  isAxiosError: fg,
  spread: dg,
  toFormData: hg,
  AxiosHeaders: pg,
  HttpStatusCode: mg,
  formToJSON: gg,
  getAdapter: yg,
  mergeConfig: _g
} = Oe;
let Oa = "";
const Qp = () => Oa, Zp = (e) => {
  Oa = e;
}, em = (e) => async (t = {}, n = {}) => {
  const { url: s, method: r } = e;
  let o = s;
  na().currentPath.startsWith("/butter") && (o = s.replace("/image", "/butter"));
  const l = Qp();
  return Oe.request({
    withCredentials: !1,
    url: l + o,
    method: r,
    [r === "get" ? "params" : "data"]: t
  }).then((a) => {
    const u = a.data;
    return n?.stream ? a : u.errNo === 0 ? u.data : Promise.reject(u);
  }).catch((a) => Promise.reject(a));
}, ae = {};
for (const e in ri) {
  const t = ri[e];
  t && (ae[e] = em(t));
}
const tm = { class: "image-wrap" }, rs = /* @__PURE__ */ We({
  __name: "ImageWrap",
  setup(e) {
    const t = se([]), n = se(""), s = Qr(), r = ta();
    let o = se({
      mid: "",
      name: "",
      feature: "",
      type: "",
      image: "",
      children: []
    });
    const i = async () => {
      if (!ae.getCatalog) return;
      const E = await ae.getCatalog({});
      t.value = E;
    }, l = () => {
      const E = s.path.includes("/butter"), C = s.path.includes("/edit");
      let R = E ? "/butter" : "/story";
      return C && (R += "/edit"), R;
    }, a = ({ child: E }) => {
      const C = l(), R = E.mid;
      r.replace({ path: `${C}/${R}` });
    };
    ft(n, (E) => {
      E && u(E);
    }), ft(() => s.params.mid, (E) => {
      typeof E == "string" && (n.value = E);
    });
    const u = (E) => {
      ae.openImage && ae.openImage({
        mid: E
      }).then((C) => {
        o.value = C;
      });
    }, c = async (E) => {
      if (E?.children?.length && ae.updateImage)
        try {
          await Promise.all(E.children.map((C) => ae.updateImage({
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
      if (ae.createImage)
        try {
          const R = await ae.createImage(E), F = R?.mid || R?.data?.mid;
          if (!F) {
            window.alert(R?.message || "创建失败");
            return;
          }
          await i(), n.value = F, await u(F), C?.();
        } catch (R) {
          window.alert(R?.message || "创建失败");
        }
    }, m = async (E) => {
      !E?.mid || !E?.name || !ae.updateName || await ae.updateName({ mid: E.mid, name: E.name });
    }, g = async ({ mid: E, type: C }) => {
      const R = E || n.value;
      !R || !ae.createLayer || (await ae.createLayer({ mid: R, type: C || Je.TEXT }), u(R));
    }, _ = async ({ mid: E, eid: C }) => {
      const R = E || n.value;
      !R || !C || !ae.deleteLayer || (await ae.deleteLayer({ mid: R, eid: C }), u(R));
    }, b = async ({ mid: E, eid: C, direction: R }) => {
      const F = E || n.value;
      !F || !C || !ae.reorderLayer || (await ae.reorderLayer({ mid: F, eid: C, direction: R }), u(F));
    }, v = se([]);
    Pn("commands", v);
    const O = async () => {
      if (!ae.getConfig) return;
      const { commands: E } = await ae.getConfig({});
      v.value = E;
    };
    return Ds(() => {
      i(), O();
      const E = s.params.mid;
      E && (n.value = E);
    }), (E, C) => (j(), z("div", tm, [
      ee(Rd, {
        current: n.value,
        "catalog-list": t.value,
        onChange: a
      }, null, 8, ["current", "catalog-list"]),
      V(o).image ? (j(), He(Eh, {
        key: 0,
        story: V(o),
        onChange: c,
        onCreate: f,
        onUpdateName: m,
        onCreateLayer: g,
        onDeleteLayer: _,
        onReorderLayer: b
      }, null, 8, ["story"])) : nt("", !0)
    ]));
  }
}), nm = {}, sm = { class: "warn-center" };
function rm(e, t) {
  return j(), z("div", sm, " 功能已不再维护，感谢您过去的热爱。 ");
}
const om = /* @__PURE__ */ $s(nm, [["render", rm]]), im = { class: "material-center" }, lm = { class: "material-center__sidebar" }, am = { class: "material-center__sidebar-head" }, cm = { class: "material-center__title" }, um = { class: "material-center__panel" }, fm = { class: "material-center__form-row" }, dm = { class: "material-center__input-wrap" }, hm = { class: "material-center__form-row" }, pm = { class: "material-center__input-wrap" }, mm = { class: "material-center__upload-wrap" }, gm = { class: "material-center__upload-button" }, ym = {
  key: 0,
  class: "material-center__queue"
}, _m = { class: "material-center__queue-title" }, vm = { class: "material-center__queue-list" }, bm = ["onClick"], wm = { class: "material-center__panel material-center__catalog-panel" }, Em = { class: "material-center__panel-title" }, Sm = { class: "material-center__muted" }, xm = { class: "material-center__catalog-list" }, Rm = ["onClick"], Cm = { class: "material-center__catalog-name" }, Am = { class: "material-center__catalog-meta" }, Om = {
  key: 0,
  class: "material-center__catalog-feature"
}, Tm = {
  key: 0,
  class: "material-center__empty"
}, Pm = { class: "material-center__content" }, Im = { class: "material-center__content-head" }, Nm = {
  key: 0,
  class: "material-center__content-count"
}, Dm = {
  key: 0,
  class: "material-center__append-box"
}, Mm = { class: "material-center__append-top" }, km = { class: "material-center__upload-button" }, Fm = {
  key: 0,
  class: "material-center__queue"
}, Lm = { class: "material-center__queue-title" }, $m = { class: "material-center__queue-list" }, Um = ["onClick"], Bm = {
  key: 1,
  class: "material-center__grid-wrap"
}, jm = {
  key: 0,
  class: "material-center__empty"
}, Hm = {
  key: 1,
  class: "material-center__empty"
}, Vm = {
  key: 2,
  class: "material-center__grid"
}, qm = { class: "material-center__thumb" }, Wm = {
  key: 0,
  class: "material-center__thumb-placeholder"
}, Gm = ["src", "alt"], zm = {
  key: 2,
  class: "material-center__thumb-placeholder"
}, Km = { class: "material-center__card-body" }, Jm = { class: "material-center__card-hash" }, Xm = { class: "material-center__card-time" }, Ym = { class: "material-center__card-actions" }, Qm = {
  key: 2,
  class: "material-center__blank"
}, wi = /* @__PURE__ */ We({
  __name: "MaterialCenter",
  setup(e) {
    const t = Qr(), n = ta(), s = se([]), r = se(""), o = se([]), i = se(!1), l = se(!1), a = se(!1), u = se(!1), c = se(null), f = se({
      name: "",
      feature: ""
    }), m = se([]), g = se([]), _ = Ce(() => s.value.find((M) => M.mid === r.value) || null), b = Ce(() => t.path.startsWith("/butter")), v = Ce(() => b.value ? "Butter Static Center" : "Static Center"), O = (M) => M.map((k) => k.base64), E = () => {
      f.value = {
        name: "",
        feature: ""
      }, m.value = [];
    }, C = () => {
      g.value = [];
    }, R = (M) => {
      window.alert(M);
    }, F = async () => {
      if (ae.getStaticCatalog) {
        i.value = !0;
        try {
          const M = await ae.getStaticCatalog({});
          if (s.value = M || [], !s.value.length) {
            r.value = "", o.value = [];
            return;
          }
          s.value.some((U) => U.mid === r.value) || (r.value = s.value[0]?.mid || "");
        } catch (M) {
          R(M?.message || "获取 static 列表失败");
        } finally {
          i.value = !1;
        }
      }
    }, q = async (M) => ae.getStaticItemImage && (await ae.getStaticItemImage({ id: M }))?.image || "", L = async (M) => {
      if (!M || !ae.getStaticItems) {
        o.value = [];
        return;
      }
      l.value = !0;
      try {
        const k = await ae.getStaticItems({ mid: M });
        o.value = (k || []).map((U) => ({
          ...U,
          image: "",
          loading: !0
        })), await Promise.all(o.value.map(async (U) => {
          try {
            U.image = await q(U.id);
          } catch {
            U.image = "";
          } finally {
            U.loading = !1;
          }
        }));
      } catch (k) {
        o.value = [], R(k?.message || "获取 static 图片失败");
      } finally {
        l.value = !1;
      }
    };
    ft(r, (M) => {
      M ? L(M) : o.value = [];
    });
    const J = (M) => {
      M !== r.value && (r.value = M);
    }, X = (M, k) => !M.some((U) => U.name === k.name && U.base64 === k.base64), ce = async (M) => {
      const U = Array.from(M || []).filter((ve) => /^image\//.test(ve.type));
      return U.length ? Promise.all(U.map((ve) => new Promise((he, le) => {
        const De = new FileReader();
        De.onload = (Ue) => {
          he({
            name: ve.name,
            base64: Ue.target?.result
          });
        }, De.onerror = () => le(De.error), De.readAsDataURL(ve);
      }))) : (R("请选择图片文件"), []);
    }, _e = async (M, k) => {
      const U = M.target, ve = U.files;
      if (ve?.length)
        try {
          const he = await ce(ve);
          k === "create" ? m.value = he.filter((le) => X(m.value, le)).concat(m.value) : g.value = he.filter((le) => X(g.value, le)).concat(g.value);
        } catch (he) {
          R(he?.message || "读取文件失败");
        } finally {
          U.value = "";
        }
    }, Se = (M, k) => {
      M === "create" ? m.value = m.value.filter((U) => U.name !== k) : g.value = g.value.filter((U) => U.name !== k);
    }, we = async () => {
      if (ae.createStaticCollection) {
        if (!f.value.name.trim()) {
          R("请输入命令名");
          return;
        }
        if (!m.value.length) {
          R("请至少上传一张图片");
          return;
        }
        a.value = !0;
        try {
          const M = await ae.createStaticCollection({
            name: f.value.name.trim(),
            feature: f.value.feature.trim(),
            images: O(m.value)
          });
          await F(), r.value = M?.mid || r.value, E();
        } catch (M) {
          R(M?.message || "创建 static 命令失败");
        } finally {
          a.value = !1;
        }
      }
    }, Te = async () => {
      if (ae.addStaticItems) {
        if (!r.value) {
          R("请先选择一个 static 命令");
          return;
        }
        if (!g.value.length) {
          R("请先选择要追加的图片");
          return;
        }
        u.value = !0;
        try {
          await ae.addStaticItems({
            mid: r.value,
            images: O(g.value)
          }), C(), await Promise.all([F(), L(r.value)]);
        } catch (M) {
          R(M?.message || "追加图片失败");
        } finally {
          u.value = !1;
        }
      }
    }, $e = async (M) => {
      if (!(!ae.deleteStaticItem || c.value || !window.confirm("确认删除这张静态表情吗？"))) {
        c.value = M;
        try {
          await ae.deleteStaticItem({ id: M }), await Promise.all([F(), L(r.value)]);
        } catch (U) {
          R(U?.message || "删除失败");
        } finally {
          c.value = null;
        }
      }
    }, ne = () => {
      n.push(b.value ? "/butter/edit" : "/story/edit");
    };
    return Ds(() => {
      F();
    }), (M, k) => (j(), z("div", im, [
      D("aside", lm, [
        D("div", am, [
          D("div", null, [
            D("h1", cm, ge(v.value), 1),
            k[4] || (k[4] = D("p", { class: "material-center__desc" }, "管理静态表情命令与图片集合", -1))
          ]),
          ee(V(tt), {
            u: "grey",
            label: "模板编辑",
            onClick: ne
          })
        ]),
        D("div", um, [
          k[9] || (k[9] = D("div", { class: "material-center__panel-title" }, "新建 Static 命令", -1)),
          D("div", fm, [
            k[5] || (k[5] = D("label", null, "命令名", -1)),
            D("div", dm, [
              ee(V(Xe), {
                "model-value": f.value.name,
                "onUpdate:modelValue": k[0] || (k[0] = (U) => f.value.name = String(U))
              }, null, 8, ["model-value"])
            ])
          ]),
          D("div", hm, [
            k[6] || (k[6] = D("label", null, "特征词", -1)),
            D("div", pm, [
              ee(V(Xe), {
                "model-value": f.value.feature,
                "onUpdate:modelValue": k[1] || (k[1] = (U) => f.value.feature = String(U))
              }, null, 8, ["model-value"])
            ])
          ]),
          D("div", mm, [
            D("label", gm, [
              D("input", {
                type: "file",
                multiple: "",
                accept: "image/*",
                onChange: k[2] || (k[2] = (U) => _e(U, "create"))
              }, null, 32),
              k[7] || (k[7] = D("span", null, "选择图片", -1))
            ]),
            k[8] || (k[8] = D("span", { class: "material-center__tips" }, "支持多选，直接创建命令并写入图片集合", -1))
          ]),
          m.value.length ? (j(), z("div", ym, [
            D("div", _m, "待创建图片 " + ge(m.value.length), 1),
            D("div", vm, [
              (j(!0), z(Ee, null, Pt(m.value, (U) => (j(), z("div", {
                key: U.name,
                class: "material-center__queue-item"
              }, [
                D("span", null, ge(U.name), 1),
                D("button", {
                  type: "button",
                  onClick: (ve) => Se("create", U.name)
                }, "移除", 8, bm)
              ]))), 128))
            ])
          ])) : nt("", !0),
          ee(V(tt), {
            u: "primary",
            disabled: a.value,
            label: "创建命令",
            onClick: we
          }, null, 8, ["disabled"])
        ]),
        D("div", wm, [
          D("div", Em, [
            k[10] || (k[10] = D("span", null, "命令列表", -1)),
            D("span", Sm, ge(i.value ? "加载中" : `${s.value.length} 项`), 1)
          ]),
          D("div", xm, [
            (j(!0), z(Ee, null, Pt(s.value, (U) => (j(), z("button", {
              key: U.mid,
              type: "button",
              class: kt(["material-center__catalog-item", { "material-center__catalog-item--active": U.mid === r.value }]),
              onClick: (ve) => J(U.mid)
            }, [
              D("div", Cm, ge(U.name), 1),
              D("div", Am, ge(U.count) + " 张", 1),
              U.feature ? (j(), z("div", Om, ge(U.feature), 1)) : nt("", !0)
            ], 10, Rm))), 128)),
            !s.value.length && !i.value ? (j(), z("div", Tm, " 还没有 static 命令 ")) : nt("", !0)
          ])
        ])
      ]),
      D("main", Pm, [
        D("div", Im, [
          D("div", null, [
            D("h2", null, ge(_.value?.name || "请选择一个命令"), 1),
            D("p", null, ge(_.value?.feature || "选中左侧命令后，可在这里追加图片并管理已上传内容"), 1)
          ]),
          _.value ? (j(), z("div", Nm, ge(_.value.count) + " 张", 1)) : nt("", !0)
        ]),
        _.value ? (j(), z("div", Dm, [
          D("div", Mm, [
            D("label", km, [
              D("input", {
                type: "file",
                multiple: "",
                accept: "image/*",
                onChange: k[3] || (k[3] = (U) => _e(U, "append"))
              }, null, 32),
              k[11] || (k[11] = D("span", null, "追加图片", -1))
            ]),
            ee(V(tt), {
              u: "primary",
              disabled: u.value || !g.value.length,
              label: "确认追加",
              onClick: Te
            }, null, 8, ["disabled"])
          ]),
          g.value.length ? (j(), z("div", Fm, [
            D("div", Lm, "待追加图片 " + ge(g.value.length), 1),
            D("div", $m, [
              (j(!0), z(Ee, null, Pt(g.value, (U) => (j(), z("div", {
                key: U.name,
                class: "material-center__queue-item"
              }, [
                D("span", null, ge(U.name), 1),
                D("button", {
                  type: "button",
                  onClick: (ve) => Se("append", U.name)
                }, "移除", 8, Um)
              ]))), 128))
            ])
          ])) : nt("", !0)
        ])) : nt("", !0),
        _.value ? (j(), z("div", Bm, [
          l.value ? (j(), z("div", jm, "图片加载中...")) : o.value.length ? (j(), z("div", Vm, [
            (j(!0), z(Ee, null, Pt(o.value, (U) => (j(), z("article", {
              key: U.id,
              class: "material-center__card"
            }, [
              D("div", qm, [
                U.loading ? (j(), z("div", Wm, "加载中...")) : U.image ? (j(), z("img", {
                  key: 1,
                  src: U.image,
                  alt: U.hash
                }, null, 8, Gm)) : (j(), z("div", zm, "图片缺失"))
              ]),
              D("div", Km, [
                D("div", Jm, ge(U.hash) + "." + ge(U.ext), 1),
                D("div", Xm, ge(U.created_at || "未知时间"), 1),
                D("div", Ym, [
                  ee(V(tt), {
                    u: "grey",
                    disabled: c.value === U.id,
                    label: "删除",
                    onClick: (ve) => $e(U.id)
                  }, null, 8, ["disabled", "onClick"])
                ])
              ])
            ]))), 128))
          ])) : (j(), z("div", Hm, "这个命令下还没有图片"))
        ])) : (j(), z("div", Qm, [...k[12] || (k[12] = [
          D("div", { class: "material-center__blank-title" }, "选择一个 static 命令开始管理", -1),
          D("div", { class: "material-center__blank-desc" }, "左侧可创建新命令，右侧查看与维护图片集合", -1)
        ])]))
      ])
    ]));
  }
}), Zm = [
  {
    path: "/",
    component: om
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
    component: wi
  },
  {
    path: "/butter/center",
    component: wi
  },
  {
    path: "/butter/:mid?",
    component: rs
  },
  {
    path: "/butter/edit/:mid?",
    component: rs
  }
], Ta = wd({
  history: Zf(),
  routes: Zm
});
Ta.beforeResolve(async (e) => {
  e.path && na().setPath(e.path);
});
const eg = (e, t) => {
  Zp(t || "http://localhost:8080");
  const n = tf(pf);
  return n.use(rf()), n.use(Ta), n.mount(e);
}, vg = {
  load: eg
};
export {
  vg as default
};
