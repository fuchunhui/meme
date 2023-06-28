/*eslint-disable*/
function Gs(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let r = 0; r < s.length; r++)
    n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const he = {}, Wt = [], Ze = () => {
}, ml = () => !1, gl = /^on[^a-z]/, ss = (e) => gl.test(e), Qs = (e) => e.startsWith("onUpdate:"), Te = Object.assign, Zs = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, vl = Object.prototype.hasOwnProperty, se = (e, t) => vl.call(e, t), K = Array.isArray, qt = (e) => rs(e) === "[object Map]", Do = (e) => rs(e) === "[object Set]", q = (e) => typeof e == "function", xe = (e) => typeof e == "string", er = (e) => typeof e == "symbol", ge = (e) => e !== null && typeof e == "object", Lo = (e) => ge(e) && q(e.then) && q(e.catch), Uo = Object.prototype.toString, rs = (e) => Uo.call(e), yl = (e) => rs(e).slice(8, -1), Bo = (e) => rs(e) === "[object Object]", tr = (e) => xe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, zn = /* @__PURE__ */ Gs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), os = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, _l = /-(\w)/g, lt = os((e) => e.replace(_l, (t, n) => n ? n.toUpperCase() : "")), bl = /\B([A-Z])/g, zt = os(
  (e) => e.replace(bl, "-$1").toLowerCase()
), is = os(
  (e) => e.charAt(0).toUpperCase() + e.slice(1)
), _s = os(
  (e) => e ? `on${is(e)}` : ""
), Cn = (e, t) => !Object.is(e, t), bs = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, qn = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, wl = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Pr;
const ks = () => Pr || (Pr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function rn(e) {
  if (K(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = xe(s) ? Cl(s) : rn(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else {
    if (xe(e))
      return e;
    if (ge(e))
      return e;
  }
}
const xl = /;(?![^(]*\))/g, El = /:([^]+)/, Rl = /\/\*[^]*?\*\//g;
function Cl(e) {
  const t = {};
  return e.replace(Rl, "").split(xl).forEach((n) => {
    if (n) {
      const s = n.split(El);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function pt(e) {
  let t = "";
  if (xe(e))
    t = e;
  else if (K(e))
    for (let n = 0; n < e.length; n++) {
      const s = pt(e[n]);
      s && (t += s + " ");
    }
  else if (ge(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Tl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Pl = /* @__PURE__ */ Gs(Tl);
function jo(e) {
  return !!e || e === "";
}
const At = (e) => xe(e) ? e : e == null ? "" : K(e) || ge(e) && (e.toString === Uo || !q(e.toString)) ? JSON.stringify(e, Ho, 2) : String(e), Ho = (e, t) => t && t.__v_isRef ? Ho(e, t.value) : qt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, r]) => (n[`${s} =>`] = r, n), {})
} : Do(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : ge(t) && !K(t) && !Bo(t) ? String(t) : t;
let Ye;
class Sl {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Ye, !t && Ye && (this.index = (Ye.scopes || (Ye.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Ye;
      try {
        return Ye = this, t();
      } finally {
        Ye = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Ye = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Ye = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Ol(e, t = Ye) {
  t && t.active && t.effects.push(e);
}
function Al() {
  return Ye;
}
const nr = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, zo = (e) => (e.w & kt) > 0, Ko = (e) => (e.n & kt) > 0, kl = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= kt;
}, Ml = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      zo(r) && !Ko(r) ? r.delete(e) : t[n++] = r, r.w &= ~kt, r.n &= ~kt;
    }
    t.length = n;
  }
}, Jn = /* @__PURE__ */ new WeakMap();
let gn = 0, kt = 1;
const Ms = 30;
let Ge;
const Bt = Symbol(""), $s = Symbol("");
class sr {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Ol(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = Ge, n = Tt;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = Ge, Ge = this, Tt = !0, kt = 1 << ++gn, gn <= Ms ? kl(this) : Sr(this), this.fn();
    } finally {
      gn <= Ms && Ml(this), kt = 1 << --gn, Ge = this.parent, Tt = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    Ge === this ? this.deferStop = !0 : this.active && (Sr(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Sr(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Tt = !0;
const Vo = [];
function on() {
  Vo.push(Tt), Tt = !1;
}
function ln() {
  const e = Vo.pop();
  Tt = e === void 0 ? !0 : e;
}
function je(e, t, n) {
  if (Tt && Ge) {
    let s = Jn.get(e);
    s || Jn.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = nr()), Wo(r);
  }
}
function Wo(e, t) {
  let n = !1;
  gn <= Ms ? Ko(e) || (e.n |= kt, n = !zo(e)) : n = !e.has(Ge), n && (e.add(Ge), Ge.deps.push(e));
}
function ht(e, t, n, s, r, o) {
  const i = Jn.get(e);
  if (!i)
    return;
  let l = [];
  if (t === "clear")
    l = [...i.values()];
  else if (n === "length" && K(e)) {
    const a = Number(s);
    i.forEach((c, u) => {
      (u === "length" || u >= a) && l.push(c);
    });
  } else
    switch (n !== void 0 && l.push(i.get(n)), t) {
      case "add":
        K(e) ? tr(n) && l.push(i.get("length")) : (l.push(i.get(Bt)), qt(e) && l.push(i.get($s)));
        break;
      case "delete":
        K(e) || (l.push(i.get(Bt)), qt(e) && l.push(i.get($s)));
        break;
      case "set":
        qt(e) && l.push(i.get(Bt));
        break;
    }
  if (l.length === 1)
    l[0] && Is(l[0]);
  else {
    const a = [];
    for (const c of l)
      c && a.push(...c);
    Is(nr(a));
  }
}
function Is(e, t) {
  const n = K(e) ? e : [...e];
  for (const s of n)
    s.computed && Or(s);
  for (const s of n)
    s.computed || Or(s);
}
function Or(e, t) {
  (e !== Ge || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function $l(e, t) {
  var n;
  return (n = Jn.get(e)) == null ? void 0 : n.get(t);
}
const Il = /* @__PURE__ */ Gs("__proto__,__v_isRef,__isVue"), qo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(er)
), Fl = /* @__PURE__ */ rr(), Nl = /* @__PURE__ */ rr(!1, !0), Dl = /* @__PURE__ */ rr(!0), Ar = /* @__PURE__ */ Ll();
function Ll() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = oe(this);
      for (let o = 0, i = this.length; o < i; o++)
        je(s, "get", o + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(oe)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      on();
      const s = oe(this)[t].apply(this, n);
      return ln(), s;
    };
  }), e;
}
function Ul(e) {
  const t = oe(this);
  return je(t, "has", e), t.hasOwnProperty(e);
}
function rr(e = !1, t = !1) {
  return function(s, r, o) {
    if (r === "__v_isReactive")
      return !e;
    if (r === "__v_isReadonly")
      return e;
    if (r === "__v_isShallow")
      return t;
    if (r === "__v_raw" && o === (e ? t ? ta : Qo : t ? Go : Yo).get(s))
      return s;
    const i = K(s);
    if (!e) {
      if (i && se(Ar, r))
        return Reflect.get(Ar, r, o);
      if (r === "hasOwnProperty")
        return Ul;
    }
    const l = Reflect.get(s, r, o);
    return (er(r) ? qo.has(r) : Il(r)) || (e || je(s, "get", r), t) ? l : Oe(l) ? i && tr(r) ? l : l.value : ge(l) ? e ? Zo(l) : $n(l) : l;
  };
}
const Bl = /* @__PURE__ */ Jo(), jl = /* @__PURE__ */ Jo(!0);
function Jo(e = !1) {
  return function(n, s, r, o) {
    let i = n[s];
    if (Yt(i) && Oe(i) && !Oe(r))
      return !1;
    if (!e && (!Xn(r) && !Yt(r) && (i = oe(i), r = oe(r)), !K(n) && Oe(i) && !Oe(r)))
      return i.value = r, !0;
    const l = K(n) && tr(s) ? Number(s) < n.length : se(n, s), a = Reflect.set(n, s, r, o);
    return n === oe(o) && (l ? Cn(r, i) && ht(n, "set", s, r) : ht(n, "add", s, r)), a;
  };
}
function Hl(e, t) {
  const n = se(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && ht(e, "delete", t, void 0), s;
}
function zl(e, t) {
  const n = Reflect.has(e, t);
  return (!er(t) || !qo.has(t)) && je(e, "has", t), n;
}
function Kl(e) {
  return je(e, "iterate", K(e) ? "length" : Bt), Reflect.ownKeys(e);
}
const Xo = {
  get: Fl,
  set: Bl,
  deleteProperty: Hl,
  has: zl,
  ownKeys: Kl
}, Vl = {
  get: Dl,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, Wl = /* @__PURE__ */ Te(
  {},
  Xo,
  {
    get: Nl,
    set: jl
  }
), or = (e) => e, ls = (e) => Reflect.getPrototypeOf(e);
function Dn(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = oe(e), o = oe(t);
  n || (t !== o && je(r, "get", t), je(r, "get", o));
  const { has: i } = ls(r), l = s ? or : n ? ar : Tn;
  if (i.call(r, t))
    return l(e.get(t));
  if (i.call(r, o))
    return l(e.get(o));
  e !== r && e.get(t);
}
function Ln(e, t = !1) {
  const n = this.__v_raw, s = oe(n), r = oe(e);
  return t || (e !== r && je(s, "has", e), je(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function Un(e, t = !1) {
  return e = e.__v_raw, !t && je(oe(e), "iterate", Bt), Reflect.get(e, "size", e);
}
function kr(e) {
  e = oe(e);
  const t = oe(this);
  return ls(t).has.call(t, e) || (t.add(e), ht(t, "add", e, e)), this;
}
function Mr(e, t) {
  t = oe(t);
  const n = oe(this), { has: s, get: r } = ls(n);
  let o = s.call(n, e);
  o || (e = oe(e), o = s.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), o ? Cn(t, i) && ht(n, "set", e, t) : ht(n, "add", e, t), this;
}
function $r(e) {
  const t = oe(this), { has: n, get: s } = ls(t);
  let r = n.call(t, e);
  r || (e = oe(e), r = n.call(t, e)), s && s.call(t, e);
  const o = t.delete(e);
  return r && ht(t, "delete", e, void 0), o;
}
function Ir() {
  const e = oe(this), t = e.size !== 0, n = e.clear();
  return t && ht(e, "clear", void 0, void 0), n;
}
function Bn(e, t) {
  return function(s, r) {
    const o = this, i = o.__v_raw, l = oe(i), a = t ? or : e ? ar : Tn;
    return !e && je(l, "iterate", Bt), i.forEach((c, u) => s.call(r, a(c), a(u), o));
  };
}
function jn(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = oe(r), i = qt(o), l = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, c = r[e](...s), u = n ? or : t ? ar : Tn;
    return !t && je(
      o,
      "iterate",
      a ? $s : Bt
    ), {
      // iterator protocol
      next() {
        const { value: h, done: p } = c.next();
        return p ? { value: h, done: p } : {
          value: l ? [u(h[0]), u(h[1])] : u(h),
          done: p
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function yt(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function ql() {
  const e = {
    get(o) {
      return Dn(this, o);
    },
    get size() {
      return Un(this);
    },
    has: Ln,
    add: kr,
    set: Mr,
    delete: $r,
    clear: Ir,
    forEach: Bn(!1, !1)
  }, t = {
    get(o) {
      return Dn(this, o, !1, !0);
    },
    get size() {
      return Un(this);
    },
    has: Ln,
    add: kr,
    set: Mr,
    delete: $r,
    clear: Ir,
    forEach: Bn(!1, !0)
  }, n = {
    get(o) {
      return Dn(this, o, !0);
    },
    get size() {
      return Un(this, !0);
    },
    has(o) {
      return Ln.call(this, o, !0);
    },
    add: yt("add"),
    set: yt("set"),
    delete: yt("delete"),
    clear: yt("clear"),
    forEach: Bn(!0, !1)
  }, s = {
    get(o) {
      return Dn(this, o, !0, !0);
    },
    get size() {
      return Un(this, !0);
    },
    has(o) {
      return Ln.call(this, o, !0);
    },
    add: yt("add"),
    set: yt("set"),
    delete: yt("delete"),
    clear: yt("clear"),
    forEach: Bn(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = jn(
      o,
      !1,
      !1
    ), n[o] = jn(
      o,
      !0,
      !1
    ), t[o] = jn(
      o,
      !1,
      !0
    ), s[o] = jn(
      o,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    s
  ];
}
const [
  Jl,
  Xl,
  Yl,
  Gl
] = /* @__PURE__ */ ql();
function ir(e, t) {
  const n = t ? e ? Gl : Yl : e ? Xl : Jl;
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    se(n, r) && r in s ? n : s,
    r,
    o
  );
}
const Ql = {
  get: /* @__PURE__ */ ir(!1, !1)
}, Zl = {
  get: /* @__PURE__ */ ir(!1, !0)
}, ea = {
  get: /* @__PURE__ */ ir(!0, !1)
}, Yo = /* @__PURE__ */ new WeakMap(), Go = /* @__PURE__ */ new WeakMap(), Qo = /* @__PURE__ */ new WeakMap(), ta = /* @__PURE__ */ new WeakMap();
function na(e) {
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
function sa(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : na(yl(e));
}
function $n(e) {
  return Yt(e) ? e : lr(
    e,
    !1,
    Xo,
    Ql,
    Yo
  );
}
function ra(e) {
  return lr(
    e,
    !1,
    Wl,
    Zl,
    Go
  );
}
function Zo(e) {
  return lr(
    e,
    !0,
    Vl,
    ea,
    Qo
  );
}
function lr(e, t, n, s, r) {
  if (!ge(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = sa(e);
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, l), l;
}
function Jt(e) {
  return Yt(e) ? Jt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Yt(e) {
  return !!(e && e.__v_isReadonly);
}
function Xn(e) {
  return !!(e && e.__v_isShallow);
}
function ei(e) {
  return Jt(e) || Yt(e);
}
function oe(e) {
  const t = e && e.__v_raw;
  return t ? oe(t) : e;
}
function ti(e) {
  return qn(e, "__v_skip", !0), e;
}
const Tn = (e) => ge(e) ? $n(e) : e, ar = (e) => ge(e) ? Zo(e) : e;
function ni(e) {
  Tt && Ge && (e = oe(e), Wo(e.dep || (e.dep = nr())));
}
function si(e, t) {
  e = oe(e);
  const n = e.dep;
  n && Is(n);
}
function Oe(e) {
  return !!(e && e.__v_isRef === !0);
}
function V(e) {
  return ri(e, !1);
}
function oa(e) {
  return ri(e, !0);
}
function ri(e, t) {
  return Oe(e) ? e : new ia(e, t);
}
class ia {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : oe(t), this._value = n ? t : Tn(t);
  }
  get value() {
    return ni(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Xn(t) || Yt(t);
    t = n ? t : oe(t), Cn(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Tn(t), si(this));
  }
}
function P(e) {
  return Oe(e) ? e.value : e;
}
const la = {
  get: (e, t, n) => P(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return Oe(r) && !Oe(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function oi(e) {
  return Jt(e) ? e : new Proxy(e, la);
}
function Mt(e) {
  const t = K(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = ca(e, n);
  return t;
}
class aa {
  constructor(t, n, s) {
    this._object = t, this._key = n, this._defaultValue = s, this.__v_isRef = !0;
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return $l(oe(this._object), this._key);
  }
}
function ca(e, t, n) {
  const s = e[t];
  return Oe(s) ? s : new aa(
    e,
    t,
    n
  );
}
class ua {
  constructor(t, n, s, r) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new sr(t, () => {
      this._dirty || (this._dirty = !0, si(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = s;
  }
  get value() {
    const t = oe(this);
    return ni(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function fa(e, t, n = !1) {
  let s, r;
  const o = q(e);
  return o ? (s = e, r = Ze) : (s = e.get, r = e.set), new ua(s, r, o || !r, n);
}
function Pt(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (o) {
    as(o, t, n);
  }
  return r;
}
function et(e, t, n, s) {
  if (q(e)) {
    const o = Pt(e, t, n, s);
    return o && Lo(o) && o.catch((i) => {
      as(i, t, n);
    }), o;
  }
  const r = [];
  for (let o = 0; o < e.length; o++)
    r.push(et(e[o], t, n, s));
  return r;
}
function as(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, l = n;
    for (; o; ) {
      const c = o.ec;
      if (c) {
        for (let u = 0; u < c.length; u++)
          if (c[u](e, i, l) === !1)
            return;
      }
      o = o.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      Pt(
        a,
        null,
        10,
        [e, i, l]
      );
      return;
    }
  }
  da(e, n, r, s);
}
function da(e, t, n, s = !0) {
  console.error(e);
}
let Pn = !1, Fs = !1;
const Me = [];
let it = 0;
const Xt = [];
let ct = null, Dt = 0;
const ii = /* @__PURE__ */ Promise.resolve();
let cr = null;
function li(e) {
  const t = cr || ii;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ha(e) {
  let t = it + 1, n = Me.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    Sn(Me[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function ur(e) {
  (!Me.length || !Me.includes(
    e,
    Pn && e.allowRecurse ? it + 1 : it
  )) && (e.id == null ? Me.push(e) : Me.splice(ha(e.id), 0, e), ai());
}
function ai() {
  !Pn && !Fs && (Fs = !0, cr = ii.then(ui));
}
function pa(e) {
  const t = Me.indexOf(e);
  t > it && Me.splice(t, 1);
}
function ma(e) {
  K(e) ? Xt.push(...e) : (!ct || !ct.includes(
    e,
    e.allowRecurse ? Dt + 1 : Dt
  )) && Xt.push(e), ai();
}
function Fr(e, t = Pn ? it + 1 : 0) {
  for (; t < Me.length; t++) {
    const n = Me[t];
    n && n.pre && (Me.splice(t, 1), t--, n());
  }
}
function ci(e) {
  if (Xt.length) {
    const t = [...new Set(Xt)];
    if (Xt.length = 0, ct) {
      ct.push(...t);
      return;
    }
    for (ct = t, ct.sort((n, s) => Sn(n) - Sn(s)), Dt = 0; Dt < ct.length; Dt++)
      ct[Dt]();
    ct = null, Dt = 0;
  }
}
const Sn = (e) => e.id == null ? 1 / 0 : e.id, ga = (e, t) => {
  const n = Sn(e) - Sn(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function ui(e) {
  Fs = !1, Pn = !0, Me.sort(ga);
  const t = Ze;
  try {
    for (it = 0; it < Me.length; it++) {
      const n = Me[it];
      n && n.active !== !1 && Pt(n, null, 14);
    }
  } finally {
    it = 0, Me.length = 0, ci(), Pn = !1, cr = null, (Me.length || Xt.length) && ui();
  }
}
function va(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const s = e.vnode.props || he;
  let r = n;
  const o = t.startsWith("update:"), i = o && t.slice(7);
  if (i && i in s) {
    const u = `${i === "modelValue" ? "model" : i}Modifiers`, { number: h, trim: p } = s[u] || he;
    p && (r = n.map((g) => xe(g) ? g.trim() : g)), h && (r = n.map(wl));
  }
  let l, a = s[l = _s(t)] || // also try camelCase event handler (#2249)
  s[l = _s(lt(t))];
  !a && o && (a = s[l = _s(zt(t))]), a && et(
    a,
    e,
    6,
    r
  );
  const c = s[l + "Once"];
  if (c) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, et(
      c,
      e,
      6,
      r
    );
  }
}
function fi(e, t, n = !1) {
  const s = t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let i = {}, l = !1;
  if (!q(e)) {
    const a = (c) => {
      const u = fi(c, t, !0);
      u && (l = !0, Te(i, u));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !l ? (ge(e) && s.set(e, null), null) : (K(o) ? o.forEach((a) => i[a] = null) : Te(i, o), ge(e) && s.set(e, i), i);
}
function cs(e, t) {
  return !e || !ss(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), se(e, t[0].toLowerCase() + t.slice(1)) || se(e, zt(t)) || se(e, t));
}
let $e = null, di = null;
function Yn(e) {
  const t = $e;
  return $e = e, di = e && e.type.__scopeId || null, t;
}
function fr(e, t = $e, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && Wr(-1);
    const o = Yn(t);
    let i;
    try {
      i = e(...r);
    } finally {
      Yn(o), s._d && Wr(1);
    }
    return i;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function ws(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    props: o,
    propsOptions: [i],
    slots: l,
    attrs: a,
    emit: c,
    render: u,
    renderCache: h,
    data: p,
    setupState: g,
    ctx: x,
    inheritAttrs: T
  } = e;
  let I, S;
  const E = Yn(e);
  try {
    if (n.shapeFlag & 4) {
      const F = r || s;
      I = ot(
        u.call(
          F,
          F,
          h,
          o,
          g,
          p,
          x
        )
      ), S = a;
    } else {
      const F = t;
      I = ot(
        F.length > 1 ? F(
          o,
          { attrs: a, slots: l, emit: c }
        ) : F(
          o,
          null
          /* we know it doesn't need it */
        )
      ), S = t.props ? a : ya(a);
    }
  } catch (F) {
    wn.length = 0, as(F, e, 1), I = B($t);
  }
  let k = I;
  if (S && T !== !1) {
    const F = Object.keys(S), { shapeFlag: fe } = k;
    F.length && fe & 7 && (i && F.some(Qs) && (S = _a(
      S,
      i
    )), k = Qt(k, S));
  }
  return n.dirs && (k = Qt(k), k.dirs = k.dirs ? k.dirs.concat(n.dirs) : n.dirs), n.transition && (k.transition = n.transition), I = k, Yn(E), I;
}
const ya = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || ss(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, _a = (e, t) => {
  const n = {};
  for (const s in e)
    (!Qs(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function ba(e, t, n) {
  const { props: s, children: r, component: o } = e, { props: i, children: l, patchFlag: a } = t, c = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? Nr(s, i, c) : !!i;
    if (a & 8) {
      const u = t.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        const p = u[h];
        if (i[p] !== s[p] && !cs(c, p))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : s === i ? !1 : s ? i ? Nr(s, i, c) : !0 : !!i;
  return !1;
}
function Nr(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !cs(n, o))
      return !0;
  }
  return !1;
}
function wa({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const xa = (e) => e.__isSuspense;
function Ea(e, t) {
  t && t.pendingBranch ? K(e) ? t.effects.push(...e) : t.effects.push(e) : ma(e);
}
const Hn = {};
function St(e, t, n) {
  return hi(e, t, n);
}
function hi(e, t, { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = he) {
  var l;
  const a = Al() === ((l = Se) == null ? void 0 : l.scope) ? Se : null;
  let c, u = !1, h = !1;
  if (Oe(e) ? (c = () => e.value, u = Xn(e)) : Jt(e) ? (c = () => e, s = !0) : K(e) ? (h = !0, u = e.some((F) => Jt(F) || Xn(F)), c = () => e.map((F) => {
    if (Oe(F))
      return F.value;
    if (Jt(F))
      return Ut(F);
    if (q(F))
      return Pt(F, a, 2);
  })) : q(e) ? t ? c = () => Pt(e, a, 2) : c = () => {
    if (!(a && a.isUnmounted))
      return p && p(), et(
        e,
        a,
        3,
        [g]
      );
  } : c = Ze, t && s) {
    const F = c;
    c = () => Ut(F());
  }
  let p, g = (F) => {
    p = E.onStop = () => {
      Pt(F, a, 4);
    };
  }, x;
  if (An)
    if (g = Ze, t ? n && et(t, a, 3, [
      c(),
      h ? [] : void 0,
      g
    ]) : c(), r === "sync") {
      const F = vc();
      x = F.__watcherHandles || (F.__watcherHandles = []);
    } else
      return Ze;
  let T = h ? new Array(e.length).fill(Hn) : Hn;
  const I = () => {
    if (E.active)
      if (t) {
        const F = E.run();
        (s || u || (h ? F.some(
          (fe, de) => Cn(fe, T[de])
        ) : Cn(F, T))) && (p && p(), et(t, a, 3, [
          F,
          // pass undefined as the old value when it's changed for the first time
          T === Hn ? void 0 : h && T[0] === Hn ? [] : T,
          g
        ]), T = F);
      } else
        E.run();
  };
  I.allowRecurse = !!t;
  let S;
  r === "sync" ? S = I : r === "post" ? S = () => Be(I, a && a.suspense) : (I.pre = !0, a && (I.id = a.uid), S = () => ur(I));
  const E = new sr(c, S);
  t ? n ? I() : T = E.run() : r === "post" ? Be(
    E.run.bind(E),
    a && a.suspense
  ) : E.run();
  const k = () => {
    E.stop(), a && a.scope && Zs(a.scope.effects, E);
  };
  return x && x.push(k), k;
}
function Ra(e, t, n) {
  const s = this.proxy, r = xe(e) ? e.includes(".") ? pi(s, e) : () => s[e] : e.bind(s, s);
  let o;
  q(t) ? o = t : (o = t.handler, n = t);
  const i = Se;
  Zt(this);
  const l = hi(r, o.bind(s), n);
  return i ? Zt(i) : jt(), l;
}
function pi(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
function Ut(e, t) {
  if (!ge(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), Oe(e))
    Ut(e.value, t);
  else if (K(e))
    for (let n = 0; n < e.length; n++)
      Ut(e[n], t);
  else if (Do(e) || qt(e))
    e.forEach((n) => {
      Ut(n, t);
    });
  else if (Bo(e))
    for (const n in e)
      Ut(e[n], t);
  return e;
}
function Gt(e, t) {
  const n = $e;
  if (n === null)
    return e;
  const s = ps(n) || n.proxy, r = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [i, l, a, c = he] = t[o];
    i && (q(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Ut(l), r.push({
      dir: i,
      instance: s,
      value: l,
      oldValue: void 0,
      arg: a,
      modifiers: c
    }));
  }
  return e;
}
function Ft(e, t, n, s) {
  const r = e.dirs, o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    o && (l.oldValue = o[i].value);
    let a = l.dir[s];
    a && (on(), et(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), ln());
  }
}
function Pe(e, t) {
  return q(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => Te({ name: e.name }, t, { setup: e }))()
  ) : e;
}
const _n = (e) => !!e.type.__asyncLoader, mi = (e) => e.type.__isKeepAlive;
function Ca(e, t) {
  gi(e, "a", t);
}
function Ta(e, t) {
  gi(e, "da", t);
}
function gi(e, t, n = Se) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (us(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      mi(r.parent.vnode) && Pa(s, t, n, r), r = r.parent;
  }
}
function Pa(e, t, n, s) {
  const r = us(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  vi(() => {
    Zs(s[t], r);
  }, n);
}
function us(e, t, n = Se, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      on(), Zt(n);
      const l = et(t, n, e, i);
      return jt(), ln(), l;
    });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const mt = (e) => (t, n = Se) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!An || e === "sp") && us(e, (...s) => t(...s), n)
), Sa = mt("bm"), an = mt("m"), Oa = mt("bu"), Aa = mt("u"), ka = mt("bum"), vi = mt("um"), Ma = mt("sp"), $a = mt(
  "rtg"
), Ia = mt(
  "rtc"
);
function Fa(e, t = Se) {
  us("ec", e, t);
}
const yi = "components";
function Na(e, t) {
  return La(yi, e, !0, t) || e;
}
const Da = Symbol.for("v-ndc");
function La(e, t, n = !0, s = !1) {
  const r = $e || Se;
  if (r) {
    const o = r.type;
    if (e === yi) {
      const l = pc(
        o,
        !1
        /* do not include inferred name to avoid breaking existing code */
      );
      if (l && (l === t || l === lt(t) || l === is(lt(t))))
        return o;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      Dr(r[e] || o[e], t) || // global registration
      Dr(r.appContext[e], t)
    );
    return !i && s ? o : i;
  }
}
function Dr(e, t) {
  return e && (e[t] || e[lt(t)] || e[is(lt(t))]);
}
function Ns(e, t, n, s) {
  let r;
  const o = n && n[s];
  if (K(e) || xe(e)) {
    r = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      r[i] = t(e[i], i, void 0, o && o[i]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let i = 0; i < e; i++)
      r[i] = t(i + 1, i, void 0, o && o[i]);
  } else if (ge(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (i, l) => t(i, l, void 0, o && o[l])
      );
    else {
      const i = Object.keys(e);
      r = new Array(i.length);
      for (let l = 0, a = i.length; l < a; l++) {
        const c = i[l];
        r[l] = t(e[c], c, l, o && o[l]);
      }
    }
  else
    r = [];
  return n && (n[s] = r), r;
}
function Ua(e, t, n = {}, s, r) {
  if ($e.isCE || $e.parent && _n($e.parent) && $e.parent.isCE)
    return t !== "default" && (n.name = t), B("slot", n, s && s());
  let o = e[t];
  o && o._c && (o._d = !1), W();
  const i = o && _i(o(n)), l = Je(
    Re,
    {
      key: n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      i && i.key || `_${t}`
    },
    i || (s ? s() : []),
    i && e._ === 1 ? 64 : -2
  );
  return !r && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), o && o._c && (o._d = !0), l;
}
function _i(e) {
  return e.some((t) => Zn(t) ? !(t.type === $t || t.type === Re && !_i(t.children)) : !0) ? e : null;
}
const Ds = (e) => e ? Ai(e) ? ps(e) || e.proxy : Ds(e.parent) : null, bn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Te(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ds(e.parent),
    $root: (e) => Ds(e.root),
    $emit: (e) => e.emit,
    $options: (e) => dr(e),
    $forceUpdate: (e) => e.f || (e.f = () => ur(e.update)),
    $nextTick: (e) => e.n || (e.n = li.bind(e.proxy)),
    $watch: (e) => Ra.bind(e)
  })
), xs = (e, t) => e !== he && !e.__isScriptSetup && se(e, t), Ba = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: l, appContext: a } = e;
    let c;
    if (t[0] !== "$") {
      const g = i[t];
      if (g !== void 0)
        switch (g) {
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
        if (xs(s, t))
          return i[t] = 1, s[t];
        if (r !== he && se(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (c = e.propsOptions[0]) && se(c, t)
        )
          return i[t] = 3, o[t];
        if (n !== he && se(n, t))
          return i[t] = 4, n[t];
        Ls && (i[t] = 0);
      }
    }
    const u = bn[t];
    let h, p;
    if (u)
      return t === "$attrs" && je(e, "get", t), u(e);
    if (
      // css module (injected by vue-loader)
      (h = l.__cssModules) && (h = h[t])
    )
      return h;
    if (n !== he && se(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      p = a.config.globalProperties, se(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return xs(r, t) ? (r[t] = n, !0) : s !== he && se(s, t) ? (s[t] = n, !0) : se(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o }
  }, i) {
    let l;
    return !!n[i] || e !== he && se(e, i) || xs(t, i) || (l = o[0]) && se(l, i) || se(s, i) || se(bn, i) || se(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : se(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Lr(e) {
  return K(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Ls = !0;
function ja(e) {
  const t = dr(e), n = e.proxy, s = e.ctx;
  Ls = !1, t.beforeCreate && Ur(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: o,
    methods: i,
    watch: l,
    provide: a,
    inject: c,
    // lifecycle
    created: u,
    beforeMount: h,
    mounted: p,
    beforeUpdate: g,
    updated: x,
    activated: T,
    deactivated: I,
    beforeDestroy: S,
    beforeUnmount: E,
    destroyed: k,
    unmounted: F,
    render: fe,
    renderTracked: de,
    renderTriggered: ae,
    errorCaptured: pe,
    serverPrefetch: be,
    // public API
    expose: H,
    inheritAttrs: Q,
    // assets
    components: J,
    directives: ue,
    filters: _e
  } = t;
  if (c && Ha(c, s, null), i)
    for (const ne in i) {
      const Z = i[ne];
      q(Z) && (s[ne] = Z.bind(n));
    }
  if (r) {
    const ne = r.call(n, n);
    ge(ne) && (e.data = $n(ne));
  }
  if (Ls = !0, o)
    for (const ne in o) {
      const Z = o[ne], Ie = q(Z) ? Z.bind(n, n) : q(Z.get) ? Z.get.bind(n, n) : Ze, Le = !q(Z) && q(Z.set) ? Z.set.bind(n) : Ze, Ae = te({
        get: Ie,
        set: Le
      });
      Object.defineProperty(s, ne, {
        enumerable: !0,
        configurable: !0,
        get: () => Ae.value,
        set: (ve) => Ae.value = ve
      });
    }
  if (l)
    for (const ne in l)
      bi(l[ne], s, n, ne);
  if (a) {
    const ne = q(a) ? a.call(n) : a;
    Reflect.ownKeys(ne).forEach((Z) => {
      qe(Z, ne[Z]);
    });
  }
  u && Ur(u, e, "c");
  function ce(ne, Z) {
    K(Z) ? Z.forEach((Ie) => ne(Ie.bind(n))) : Z && ne(Z.bind(n));
  }
  if (ce(Sa, h), ce(an, p), ce(Oa, g), ce(Aa, x), ce(Ca, T), ce(Ta, I), ce(Fa, pe), ce(Ia, de), ce($a, ae), ce(ka, E), ce(vi, F), ce(Ma, be), K(H))
    if (H.length) {
      const ne = e.exposed || (e.exposed = {});
      H.forEach((Z) => {
        Object.defineProperty(ne, Z, {
          get: () => n[Z],
          set: (Ie) => n[Z] = Ie
        });
      });
    } else
      e.exposed || (e.exposed = {});
  fe && e.render === Ze && (e.render = fe), Q != null && (e.inheritAttrs = Q), J && (e.components = J), ue && (e.directives = ue);
}
function Ha(e, t, n = Ze) {
  K(e) && (e = Us(e));
  for (const s in e) {
    const r = e[s];
    let o;
    ge(r) ? "default" in r ? o = Ce(
      r.from || s,
      r.default,
      !0
      /* treat default function as factory */
    ) : o = Ce(r.from || s) : o = Ce(r), Oe(o) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (i) => o.value = i
    }) : t[s] = o;
  }
}
function Ur(e, t, n) {
  et(
    K(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function bi(e, t, n, s) {
  const r = s.includes(".") ? pi(n, s) : () => n[s];
  if (xe(e)) {
    const o = t[e];
    q(o) && St(r, o);
  } else if (q(e))
    St(r, e.bind(n));
  else if (ge(e))
    if (K(e))
      e.forEach((o) => bi(o, t, n, s));
    else {
      const o = q(e.handler) ? e.handler.bind(n) : t[e.handler];
      q(o) && St(r, o, e);
    }
}
function dr(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = o.get(t);
  let a;
  return l ? a = l : !r.length && !n && !s ? a = t : (a = {}, r.length && r.forEach(
    (c) => Gn(a, c, i, !0)
  ), Gn(a, t, i)), ge(t) && o.set(t, a), a;
}
function Gn(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && Gn(e, o, n, !0), r && r.forEach(
    (i) => Gn(e, i, n, !0)
  );
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = za[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const za = {
  data: Br,
  props: jr,
  emits: jr,
  // objects
  methods: vn,
  computed: vn,
  // lifecycle
  beforeCreate: Fe,
  created: Fe,
  beforeMount: Fe,
  mounted: Fe,
  beforeUpdate: Fe,
  updated: Fe,
  beforeDestroy: Fe,
  beforeUnmount: Fe,
  destroyed: Fe,
  unmounted: Fe,
  activated: Fe,
  deactivated: Fe,
  errorCaptured: Fe,
  serverPrefetch: Fe,
  // assets
  components: vn,
  directives: vn,
  // watch
  watch: Va,
  // provide / inject
  provide: Br,
  inject: Ka
};
function Br(e, t) {
  return t ? e ? function() {
    return Te(
      q(e) ? e.call(this, this) : e,
      q(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Ka(e, t) {
  return vn(Us(e), Us(t));
}
function Us(e) {
  if (K(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Fe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function vn(e, t) {
  return e ? Te(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function jr(e, t) {
  return e ? K(e) && K(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Te(
    /* @__PURE__ */ Object.create(null),
    Lr(e),
    Lr(t ?? {})
  ) : t;
}
function Va(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = Te(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Fe(e[s], t[s]);
  return n;
}
function wi() {
  return {
    app: null,
    config: {
      isNativeTag: ml,
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
let Wa = 0;
function qa(e, t) {
  return function(s, r = null) {
    q(s) || (s = Te({}, s)), r != null && !ge(r) && (r = null);
    const o = wi(), i = /* @__PURE__ */ new Set();
    let l = !1;
    const a = o.app = {
      _uid: Wa++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: yc,
      get config() {
        return o.config;
      },
      set config(c) {
      },
      use(c, ...u) {
        return i.has(c) || (c && q(c.install) ? (i.add(c), c.install(a, ...u)) : q(c) && (i.add(c), c(a, ...u))), a;
      },
      mixin(c) {
        return o.mixins.includes(c) || o.mixins.push(c), a;
      },
      component(c, u) {
        return u ? (o.components[c] = u, a) : o.components[c];
      },
      directive(c, u) {
        return u ? (o.directives[c] = u, a) : o.directives[c];
      },
      mount(c, u, h) {
        if (!l) {
          const p = B(
            s,
            r
          );
          return p.appContext = o, u && t ? t(p, c) : e(p, c, h), l = !0, a._container = c, c.__vue_app__ = a, ps(p.component) || p.component.proxy;
        }
      },
      unmount() {
        l && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(c, u) {
        return o.provides[c] = u, a;
      },
      runWithContext(c) {
        Qn = a;
        try {
          return c();
        } finally {
          Qn = null;
        }
      }
    };
    return a;
  };
}
let Qn = null;
function qe(e, t) {
  if (Se) {
    let n = Se.provides;
    const s = Se.parent && Se.parent.provides;
    s === n && (n = Se.provides = Object.create(s)), n[e] = t;
  }
}
function Ce(e, t, n = !1) {
  const s = Se || $e;
  if (s || Qn) {
    const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : Qn._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && q(t) ? t.call(s && s.proxy) : t;
  }
}
function Ja(e, t, n, s = !1) {
  const r = {}, o = {};
  qn(o, ds, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), xi(e, t, r, o);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  n ? e.props = s ? r : ra(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function Xa(e, t, n, s) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: i }
  } = e, l = oe(r), [a] = e.propsOptions;
  let c = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        let p = u[h];
        if (cs(e.emitsOptions, p))
          continue;
        const g = t[p];
        if (a)
          if (se(o, p))
            g !== o[p] && (o[p] = g, c = !0);
          else {
            const x = lt(p);
            r[x] = Bs(
              a,
              l,
              x,
              g,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          g !== o[p] && (o[p] = g, c = !0);
      }
    }
  } else {
    xi(e, t, r, o) && (c = !0);
    let u;
    for (const h in l)
      (!t || // for camelCase
      !se(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = zt(h)) === h || !se(t, u))) && (a ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[u] !== void 0) && (r[h] = Bs(
        a,
        l,
        h,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete r[h]);
    if (o !== l)
      for (const h in o)
        (!t || !se(t, h)) && (delete o[h], c = !0);
  }
  c && ht(e, "set", "$attrs");
}
function xi(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let a in t) {
      if (zn(a))
        continue;
      const c = t[a];
      let u;
      r && se(r, u = lt(a)) ? !o || !o.includes(u) ? n[u] = c : (l || (l = {}))[u] = c : cs(e.emitsOptions, a) || (!(a in s) || c !== s[a]) && (s[a] = c, i = !0);
    }
  if (o) {
    const a = oe(n), c = l || he;
    for (let u = 0; u < o.length; u++) {
      const h = o[u];
      n[h] = Bs(
        r,
        a,
        h,
        c[h],
        e,
        !se(c, h)
      );
    }
  }
  return i;
}
function Bs(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const l = se(i, "default");
    if (l && s === void 0) {
      const a = i.default;
      if (i.type !== Function && !i.skipFactory && q(a)) {
        const { propsDefaults: c } = r;
        n in c ? s = c[n] : (Zt(r), s = c[n] = a.call(
          null,
          t
        ), jt());
      } else
        s = a;
    }
    i[
      0
      /* shouldCast */
    ] && (o && !l ? s = !1 : i[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === zt(n)) && (s = !0));
  }
  return s;
}
function Ei(e, t, n = !1) {
  const s = t.propsCache, r = s.get(e);
  if (r)
    return r;
  const o = e.props, i = {}, l = [];
  let a = !1;
  if (!q(e)) {
    const u = (h) => {
      a = !0;
      const [p, g] = Ei(h, t, !0);
      Te(i, p), g && l.push(...g);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!o && !a)
    return ge(e) && s.set(e, Wt), Wt;
  if (K(o))
    for (let u = 0; u < o.length; u++) {
      const h = lt(o[u]);
      Hr(h) && (i[h] = he);
    }
  else if (o)
    for (const u in o) {
      const h = lt(u);
      if (Hr(h)) {
        const p = o[u], g = i[h] = K(p) || q(p) ? { type: p } : Te({}, p);
        if (g) {
          const x = Vr(Boolean, g.type), T = Vr(String, g.type);
          g[
            0
            /* shouldCast */
          ] = x > -1, g[
            1
            /* shouldCastTrue */
          ] = T < 0 || x < T, (x > -1 || se(g, "default")) && l.push(h);
        }
      }
    }
  const c = [i, l];
  return ge(e) && s.set(e, c), c;
}
function Hr(e) {
  return e[0] !== "$";
}
function zr(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Kr(e, t) {
  return zr(e) === zr(t);
}
function Vr(e, t) {
  return K(t) ? t.findIndex((n) => Kr(n, e)) : q(t) && Kr(t, e) ? 0 : -1;
}
const Ri = (e) => e[0] === "_" || e === "$stable", hr = (e) => K(e) ? e.map(ot) : [ot(e)], Ya = (e, t, n) => {
  if (t._n)
    return t;
  const s = fr((...r) => hr(t(...r)), n);
  return s._c = !1, s;
}, Ci = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (Ri(r))
      continue;
    const o = e[r];
    if (q(o))
      t[r] = Ya(r, o, s);
    else if (o != null) {
      const i = hr(o);
      t[r] = () => i;
    }
  }
}, Ti = (e, t) => {
  const n = hr(t);
  e.slots.default = () => n;
}, Ga = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = oe(t), qn(t, "_", n)) : Ci(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && Ti(e, t);
  qn(e.slots, ds, 1);
}, Qa = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let o = !0, i = he;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? o = !1 : (Te(r, t), !n && l === 1 && delete r._) : (o = !t.$stable, Ci(t, r)), i = t;
  } else
    t && (Ti(e, t), i = { default: 1 });
  if (o)
    for (const l in r)
      !Ri(l) && !(l in i) && delete r[l];
};
function js(e, t, n, s, r = !1) {
  if (K(e)) {
    e.forEach(
      (p, g) => js(
        p,
        t && (K(t) ? t[g] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (_n(s) && !r)
    return;
  const o = s.shapeFlag & 4 ? ps(s.component) || s.component.proxy : s.el, i = r ? null : o, { i: l, r: a } = e, c = t && t.r, u = l.refs === he ? l.refs = {} : l.refs, h = l.setupState;
  if (c != null && c !== a && (xe(c) ? (u[c] = null, se(h, c) && (h[c] = null)) : Oe(c) && (c.value = null)), q(a))
    Pt(a, l, 12, [i, u]);
  else {
    const p = xe(a), g = Oe(a);
    if (p || g) {
      const x = () => {
        if (e.f) {
          const T = p ? se(h, a) ? h[a] : u[a] : a.value;
          r ? K(T) && Zs(T, o) : K(T) ? T.includes(o) || T.push(o) : p ? (u[a] = [o], se(h, a) && (h[a] = u[a])) : (a.value = [o], e.k && (u[e.k] = a.value));
        } else
          p ? (u[a] = i, se(h, a) && (h[a] = i)) : g && (a.value = i, e.k && (u[e.k] = i));
      };
      i ? (x.id = -1, Be(x, n)) : x();
    }
  }
}
const Be = Ea;
function Za(e) {
  return ec(e);
}
function ec(e, t) {
  const n = ks();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: r,
    patchProp: o,
    createElement: i,
    createText: l,
    createComment: a,
    setText: c,
    setElementText: u,
    parentNode: h,
    nextSibling: p,
    setScopeId: g = Ze,
    insertStaticContent: x
  } = e, T = (d, f, m, w = null, v = null, b = null, y = !1, _ = null, R = !!f.dynamicChildren) => {
    if (d === f)
      return;
    d && !dn(d, f) && (w = O(d), ve(d, v, b, !0), d = null), f.patchFlag === -2 && (R = !1, f.dynamicChildren = null);
    const { type: C, ref: $, shapeFlag: M } = f;
    switch (C) {
      case fs:
        I(d, f, m, w);
        break;
      case $t:
        S(d, f, m, w);
        break;
      case Es:
        d == null && E(f, m, w, y);
        break;
      case Re:
        J(
          d,
          f,
          m,
          w,
          v,
          b,
          y,
          _,
          R
        );
        break;
      default:
        M & 1 ? fe(
          d,
          f,
          m,
          w,
          v,
          b,
          y,
          _,
          R
        ) : M & 6 ? ue(
          d,
          f,
          m,
          w,
          v,
          b,
          y,
          _,
          R
        ) : (M & 64 || M & 128) && C.process(
          d,
          f,
          m,
          w,
          v,
          b,
          y,
          _,
          R,
          N
        );
    }
    $ != null && v && js($, d && d.ref, b, f || d, !f);
  }, I = (d, f, m, w) => {
    if (d == null)
      s(
        f.el = l(f.children),
        m,
        w
      );
    else {
      const v = f.el = d.el;
      f.children !== d.children && c(v, f.children);
    }
  }, S = (d, f, m, w) => {
    d == null ? s(
      f.el = a(f.children || ""),
      m,
      w
    ) : f.el = d.el;
  }, E = (d, f, m, w) => {
    [d.el, d.anchor] = x(
      d.children,
      f,
      m,
      w,
      d.el,
      d.anchor
    );
  }, k = ({ el: d, anchor: f }, m, w) => {
    let v;
    for (; d && d !== f; )
      v = p(d), s(d, m, w), d = v;
    s(f, m, w);
  }, F = ({ el: d, anchor: f }) => {
    let m;
    for (; d && d !== f; )
      m = p(d), r(d), d = m;
    r(f);
  }, fe = (d, f, m, w, v, b, y, _, R) => {
    y = y || f.type === "svg", d == null ? de(
      f,
      m,
      w,
      v,
      b,
      y,
      _,
      R
    ) : be(
      d,
      f,
      v,
      b,
      y,
      _,
      R
    );
  }, de = (d, f, m, w, v, b, y, _) => {
    let R, C;
    const { type: $, props: M, shapeFlag: D, transition: U, dirs: z } = d;
    if (R = d.el = i(
      d.type,
      b,
      M && M.is,
      M
    ), D & 8 ? u(R, d.children) : D & 16 && pe(
      d.children,
      R,
      null,
      w,
      v,
      b && $ !== "foreignObject",
      y,
      _
    ), z && Ft(d, null, w, "created"), ae(R, d, d.scopeId, y, w), M) {
      for (const ee in M)
        ee !== "value" && !zn(ee) && o(
          R,
          ee,
          null,
          M[ee],
          b,
          d.children,
          w,
          v,
          ye
        );
      "value" in M && o(R, "value", null, M.value), (C = M.onVnodeBeforeMount) && rt(C, w, d);
    }
    z && Ft(d, null, w, "beforeMount");
    const G = (!v || v && !v.pendingBranch) && U && !U.persisted;
    G && U.beforeEnter(R), s(R, f, m), ((C = M && M.onVnodeMounted) || G || z) && Be(() => {
      C && rt(C, w, d), G && U.enter(R), z && Ft(d, null, w, "mounted");
    }, v);
  }, ae = (d, f, m, w, v) => {
    if (m && g(d, m), w)
      for (let b = 0; b < w.length; b++)
        g(d, w[b]);
    if (v) {
      let b = v.subTree;
      if (f === b) {
        const y = v.vnode;
        ae(
          d,
          y,
          y.scopeId,
          y.slotScopeIds,
          v.parent
        );
      }
    }
  }, pe = (d, f, m, w, v, b, y, _, R = 0) => {
    for (let C = R; C < d.length; C++) {
      const $ = d[C] = _ ? Rt(d[C]) : ot(d[C]);
      T(
        null,
        $,
        f,
        m,
        w,
        v,
        b,
        y,
        _
      );
    }
  }, be = (d, f, m, w, v, b, y) => {
    const _ = f.el = d.el;
    let { patchFlag: R, dynamicChildren: C, dirs: $ } = f;
    R |= d.patchFlag & 16;
    const M = d.props || he, D = f.props || he;
    let U;
    m && Nt(m, !1), (U = D.onVnodeBeforeUpdate) && rt(U, m, f, d), $ && Ft(f, d, m, "beforeUpdate"), m && Nt(m, !0);
    const z = v && f.type !== "foreignObject";
    if (C ? H(
      d.dynamicChildren,
      C,
      _,
      m,
      w,
      z,
      b
    ) : y || Z(
      d,
      f,
      _,
      null,
      m,
      w,
      z,
      b,
      !1
    ), R > 0) {
      if (R & 16)
        Q(
          _,
          f,
          M,
          D,
          m,
          w,
          v
        );
      else if (R & 2 && M.class !== D.class && o(_, "class", null, D.class, v), R & 4 && o(_, "style", M.style, D.style, v), R & 8) {
        const G = f.dynamicProps;
        for (let ee = 0; ee < G.length; ee++) {
          const me = G[ee], ke = M[me], vt = D[me];
          (vt !== ke || me === "value") && o(
            _,
            me,
            ke,
            vt,
            v,
            d.children,
            m,
            w,
            ye
          );
        }
      }
      R & 1 && d.children !== f.children && u(_, f.children);
    } else
      !y && C == null && Q(
        _,
        f,
        M,
        D,
        m,
        w,
        v
      );
    ((U = D.onVnodeUpdated) || $) && Be(() => {
      U && rt(U, m, f, d), $ && Ft(f, d, m, "updated");
    }, w);
  }, H = (d, f, m, w, v, b, y) => {
    for (let _ = 0; _ < f.length; _++) {
      const R = d[_], C = f[_], $ = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        R.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (R.type === Re || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !dn(R, C) || // - In the case of a component, it could contain anything.
        R.shapeFlag & 70) ? h(R.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      T(
        R,
        C,
        $,
        null,
        w,
        v,
        b,
        y,
        !0
      );
    }
  }, Q = (d, f, m, w, v, b, y) => {
    if (m !== w) {
      if (m !== he)
        for (const _ in m)
          !zn(_) && !(_ in w) && o(
            d,
            _,
            m[_],
            null,
            y,
            f.children,
            v,
            b,
            ye
          );
      for (const _ in w) {
        if (zn(_))
          continue;
        const R = w[_], C = m[_];
        R !== C && _ !== "value" && o(
          d,
          _,
          C,
          R,
          y,
          f.children,
          v,
          b,
          ye
        );
      }
      "value" in w && o(d, "value", m.value, w.value);
    }
  }, J = (d, f, m, w, v, b, y, _, R) => {
    const C = f.el = d ? d.el : l(""), $ = f.anchor = d ? d.anchor : l("");
    let { patchFlag: M, dynamicChildren: D, slotScopeIds: U } = f;
    U && (_ = _ ? _.concat(U) : U), d == null ? (s(C, m, w), s($, m, w), pe(
      f.children,
      m,
      $,
      v,
      b,
      y,
      _,
      R
    )) : M > 0 && M & 64 && D && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    d.dynamicChildren ? (H(
      d.dynamicChildren,
      D,
      m,
      v,
      b,
      y,
      _
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || v && f === v.subTree) && Pi(
      d,
      f,
      !0
      /* shallow */
    )) : Z(
      d,
      f,
      m,
      $,
      v,
      b,
      y,
      _,
      R
    );
  }, ue = (d, f, m, w, v, b, y, _, R) => {
    f.slotScopeIds = _, d == null ? f.shapeFlag & 512 ? v.ctx.activate(
      f,
      m,
      w,
      y,
      R
    ) : _e(
      f,
      m,
      w,
      v,
      b,
      y,
      R
    ) : De(d, f, R);
  }, _e = (d, f, m, w, v, b, y) => {
    const _ = d.component = cc(
      d,
      w,
      v
    );
    if (mi(d) && (_.ctx.renderer = N), uc(_), _.asyncDep) {
      if (v && v.registerDep(_, ce), !d.el) {
        const R = _.subTree = B($t);
        S(null, R, f, m);
      }
      return;
    }
    ce(
      _,
      d,
      f,
      m,
      v,
      b,
      y
    );
  }, De = (d, f, m) => {
    const w = f.component = d.component;
    if (ba(d, f, m))
      if (w.asyncDep && !w.asyncResolved) {
        ne(w, f, m);
        return;
      } else
        w.next = f, pa(w.update), w.update();
    else
      f.el = d.el, w.vnode = f;
  }, ce = (d, f, m, w, v, b, y) => {
    const _ = () => {
      if (d.isMounted) {
        let { next: $, bu: M, u: D, parent: U, vnode: z } = d, G = $, ee;
        Nt(d, !1), $ ? ($.el = z.el, ne(d, $, y)) : $ = z, M && bs(M), (ee = $.props && $.props.onVnodeBeforeUpdate) && rt(ee, U, $, z), Nt(d, !0);
        const me = ws(d), ke = d.subTree;
        d.subTree = me, T(
          ke,
          me,
          // parent may have changed if it's in a teleport
          h(ke.el),
          // anchor may have changed if it's in a fragment
          O(ke),
          d,
          v,
          b
        ), $.el = me.el, G === null && wa(d, me.el), D && Be(D, v), (ee = $.props && $.props.onVnodeUpdated) && Be(
          () => rt(ee, U, $, z),
          v
        );
      } else {
        let $;
        const { el: M, props: D } = f, { bm: U, m: z, parent: G } = d, ee = _n(f);
        if (Nt(d, !1), U && bs(U), !ee && ($ = D && D.onVnodeBeforeMount) && rt($, G, f), Nt(d, !0), M && Y) {
          const me = () => {
            d.subTree = ws(d), Y(
              M,
              d.subTree,
              d,
              v,
              null
            );
          };
          ee ? f.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !d.isUnmounted && me()
          ) : me();
        } else {
          const me = d.subTree = ws(d);
          T(
            null,
            me,
            m,
            w,
            d,
            v,
            b
          ), f.el = me.el;
        }
        if (z && Be(z, v), !ee && ($ = D && D.onVnodeMounted)) {
          const me = f;
          Be(
            () => rt($, G, me),
            v
          );
        }
        (f.shapeFlag & 256 || G && _n(G.vnode) && G.vnode.shapeFlag & 256) && d.a && Be(d.a, v), d.isMounted = !0, f = m = w = null;
      }
    }, R = d.effect = new sr(
      _,
      () => ur(C),
      d.scope
      // track it in component's effect scope
    ), C = d.update = () => R.run();
    C.id = d.uid, Nt(d, !0), C();
  }, ne = (d, f, m) => {
    f.component = d;
    const w = d.vnode.props;
    d.vnode = f, d.next = null, Xa(d, f.props, w, m), Qa(d, f.children, m), on(), Fr(), ln();
  }, Z = (d, f, m, w, v, b, y, _, R = !1) => {
    const C = d && d.children, $ = d ? d.shapeFlag : 0, M = f.children, { patchFlag: D, shapeFlag: U } = f;
    if (D > 0) {
      if (D & 128) {
        Le(
          C,
          M,
          m,
          w,
          v,
          b,
          y,
          _,
          R
        );
        return;
      } else if (D & 256) {
        Ie(
          C,
          M,
          m,
          w,
          v,
          b,
          y,
          _,
          R
        );
        return;
      }
    }
    U & 8 ? ($ & 16 && ye(C, v, b), M !== C && u(m, M)) : $ & 16 ? U & 16 ? Le(
      C,
      M,
      m,
      w,
      v,
      b,
      y,
      _,
      R
    ) : ye(C, v, b, !0) : ($ & 8 && u(m, ""), U & 16 && pe(
      M,
      m,
      w,
      v,
      b,
      y,
      _,
      R
    ));
  }, Ie = (d, f, m, w, v, b, y, _, R) => {
    d = d || Wt, f = f || Wt;
    const C = d.length, $ = f.length, M = Math.min(C, $);
    let D;
    for (D = 0; D < M; D++) {
      const U = f[D] = R ? Rt(f[D]) : ot(f[D]);
      T(
        d[D],
        U,
        m,
        null,
        v,
        b,
        y,
        _,
        R
      );
    }
    C > $ ? ye(
      d,
      v,
      b,
      !0,
      !1,
      M
    ) : pe(
      f,
      m,
      w,
      v,
      b,
      y,
      _,
      R,
      M
    );
  }, Le = (d, f, m, w, v, b, y, _, R) => {
    let C = 0;
    const $ = f.length;
    let M = d.length - 1, D = $ - 1;
    for (; C <= M && C <= D; ) {
      const U = d[C], z = f[C] = R ? Rt(f[C]) : ot(f[C]);
      if (dn(U, z))
        T(
          U,
          z,
          m,
          null,
          v,
          b,
          y,
          _,
          R
        );
      else
        break;
      C++;
    }
    for (; C <= M && C <= D; ) {
      const U = d[M], z = f[D] = R ? Rt(f[D]) : ot(f[D]);
      if (dn(U, z))
        T(
          U,
          z,
          m,
          null,
          v,
          b,
          y,
          _,
          R
        );
      else
        break;
      M--, D--;
    }
    if (C > M) {
      if (C <= D) {
        const U = D + 1, z = U < $ ? f[U].el : w;
        for (; C <= D; )
          T(
            null,
            f[C] = R ? Rt(f[C]) : ot(f[C]),
            m,
            z,
            v,
            b,
            y,
            _,
            R
          ), C++;
      }
    } else if (C > D)
      for (; C <= M; )
        ve(d[C], v, b, !0), C++;
    else {
      const U = C, z = C, G = /* @__PURE__ */ new Map();
      for (C = z; C <= D; C++) {
        const ze = f[C] = R ? Rt(f[C]) : ot(f[C]);
        ze.key != null && G.set(ze.key, C);
      }
      let ee, me = 0;
      const ke = D - z + 1;
      let vt = !1, Nn = 0;
      const It = new Array(ke);
      for (C = 0; C < ke; C++)
        It[C] = 0;
      for (C = U; C <= M; C++) {
        const ze = d[C];
        if (me >= ke) {
          ve(ze, v, b, !0);
          continue;
        }
        let st;
        if (ze.key != null)
          st = G.get(ze.key);
        else
          for (ee = z; ee <= D; ee++)
            if (It[ee - z] === 0 && dn(ze, f[ee])) {
              st = ee;
              break;
            }
        st === void 0 ? ve(ze, v, b, !0) : (It[st - z] = C + 1, st >= Nn ? Nn = st : vt = !0, T(
          ze,
          f[st],
          m,
          null,
          v,
          b,
          y,
          _,
          R
        ), me++);
      }
      const fn = vt ? tc(It) : Wt;
      for (ee = fn.length - 1, C = ke - 1; C >= 0; C--) {
        const ze = z + C, st = f[ze], Tr = ze + 1 < $ ? f[ze + 1].el : w;
        It[C] === 0 ? T(
          null,
          st,
          m,
          Tr,
          v,
          b,
          y,
          _,
          R
        ) : vt && (ee < 0 || C !== fn[ee] ? Ae(st, m, Tr, 2) : ee--);
      }
    }
  }, Ae = (d, f, m, w, v = null) => {
    const { el: b, type: y, transition: _, children: R, shapeFlag: C } = d;
    if (C & 6) {
      Ae(d.component.subTree, f, m, w);
      return;
    }
    if (C & 128) {
      d.suspense.move(f, m, w);
      return;
    }
    if (C & 64) {
      y.move(d, f, m, N);
      return;
    }
    if (y === Re) {
      s(b, f, m);
      for (let M = 0; M < R.length; M++)
        Ae(R[M], f, m, w);
      s(d.anchor, f, m);
      return;
    }
    if (y === Es) {
      k(d, f, m);
      return;
    }
    if (w !== 2 && C & 1 && _)
      if (w === 0)
        _.beforeEnter(b), s(b, f, m), Be(() => _.enter(b), v);
      else {
        const { leave: M, delayLeave: D, afterLeave: U } = _, z = () => s(b, f, m), G = () => {
          M(b, () => {
            z(), U && U();
          });
        };
        D ? D(b, z, G) : G();
      }
    else
      s(b, f, m);
  }, ve = (d, f, m, w = !1, v = !1) => {
    const {
      type: b,
      props: y,
      ref: _,
      children: R,
      dynamicChildren: C,
      shapeFlag: $,
      patchFlag: M,
      dirs: D
    } = d;
    if (_ != null && js(_, null, m, d, !0), $ & 256) {
      f.ctx.deactivate(d);
      return;
    }
    const U = $ & 1 && D, z = !_n(d);
    let G;
    if (z && (G = y && y.onVnodeBeforeUnmount) && rt(G, f, d), $ & 6)
      nt(d.component, m, w);
    else {
      if ($ & 128) {
        d.suspense.unmount(m, w);
        return;
      }
      U && Ft(d, null, f, "beforeUnmount"), $ & 64 ? d.type.remove(
        d,
        f,
        m,
        v,
        N,
        w
      ) : C && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== Re || M > 0 && M & 64) ? ye(
        C,
        f,
        m,
        !1,
        !0
      ) : (b === Re && M & 384 || !v && $ & 16) && ye(R, f, m), w && Ue(d);
    }
    (z && (G = y && y.onVnodeUnmounted) || U) && Be(() => {
      G && rt(G, f, d), U && Ft(d, null, f, "unmounted");
    }, m);
  }, Ue = (d) => {
    const { type: f, el: m, anchor: w, transition: v } = d;
    if (f === Re) {
      Ke(m, w);
      return;
    }
    if (f === Es) {
      F(d);
      return;
    }
    const b = () => {
      r(m), v && !v.persisted && v.afterLeave && v.afterLeave();
    };
    if (d.shapeFlag & 1 && v && !v.persisted) {
      const { leave: y, delayLeave: _ } = v, R = () => y(m, b);
      _ ? _(d.el, b, R) : R();
    } else
      b();
  }, Ke = (d, f) => {
    let m;
    for (; d !== f; )
      m = p(d), r(d), d = m;
    r(f);
  }, nt = (d, f, m) => {
    const { bum: w, scope: v, update: b, subTree: y, um: _ } = d;
    w && bs(w), v.stop(), b && (b.active = !1, ve(y, d, f, m)), _ && Be(_, f), Be(() => {
      d.isUnmounted = !0;
    }, f), f && f.pendingBranch && !f.isUnmounted && d.asyncDep && !d.asyncResolved && d.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve());
  }, ye = (d, f, m, w = !1, v = !1, b = 0) => {
    for (let y = b; y < d.length; y++)
      ve(d[y], f, m, w, v);
  }, O = (d) => d.shapeFlag & 6 ? O(d.component.subTree) : d.shapeFlag & 128 ? d.suspense.next() : p(d.anchor || d.el), L = (d, f, m) => {
    d == null ? f._vnode && ve(f._vnode, null, null, !0) : T(f._vnode || null, d, f, null, null, null, m), Fr(), ci(), f._vnode = d;
  }, N = {
    p: T,
    um: ve,
    m: Ae,
    r: Ue,
    mt: _e,
    mc: pe,
    pc: Z,
    pbc: H,
    n: O,
    o: e
  };
  let j, Y;
  return t && ([j, Y] = t(
    N
  )), {
    render: L,
    hydrate: j,
    createApp: qa(L, j)
  };
}
function Nt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Pi(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (K(s) && K(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let l = r[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[o] = Rt(r[o]), l.el = i.el), n || Pi(i, l)), l.type === fs && (l.el = i.el);
    }
}
function tc(e) {
  const t = e.slice(), n = [0];
  let s, r, o, i, l;
  const a = e.length;
  for (s = 0; s < a; s++) {
    const c = e[s];
    if (c !== 0) {
      if (r = n[n.length - 1], e[r] < c) {
        t[s] = r, n.push(s);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        l = o + i >> 1, e[n[l]] < c ? o = l + 1 : i = l;
      c < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), n[o] = s);
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; )
    n[o] = i, i = t[i];
  return n;
}
const nc = (e) => e.__isTeleport, Re = Symbol.for("v-fgt"), fs = Symbol.for("v-txt"), $t = Symbol.for("v-cmt"), Es = Symbol.for("v-stc"), wn = [];
let Qe = null;
function W(e = !1) {
  wn.push(Qe = e ? null : []);
}
function sc() {
  wn.pop(), Qe = wn[wn.length - 1] || null;
}
let On = 1;
function Wr(e) {
  On += e;
}
function Si(e) {
  return e.dynamicChildren = On > 0 ? Qe || Wt : null, sc(), On > 0 && Qe && Qe.push(e), e;
}
function ie(e, t, n, s, r, o) {
  return Si(
    X(
      e,
      t,
      n,
      s,
      r,
      o,
      !0
      /* isBlock */
    )
  );
}
function Je(e, t, n, s, r) {
  return Si(
    B(
      e,
      t,
      n,
      s,
      r,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function Zn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function dn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const ds = "__vInternal", Oi = ({ key: e }) => e ?? null, Kn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? xe(e) || Oe(e) || q(e) ? { i: $e, r: e, k: t, f: !!n } : e : null);
function X(e, t = null, n = null, s = 0, r = null, o = e === Re ? 0 : 1, i = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Oi(t),
    ref: t && Kn(t),
    scopeId: di,
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
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: $e
  };
  return l ? (pr(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= xe(n) ? 8 : 16), On > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Qe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Qe.push(a), a;
}
const B = rc;
function rc(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === Da) && (e = $t), Zn(e)) {
    const l = Qt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && pr(l, n), On > 0 && !o && Qe && (l.shapeFlag & 6 ? Qe[Qe.indexOf(e)] = l : Qe.push(l)), l.patchFlag |= -2, l;
  }
  if (mc(e) && (e = e.__vccOpts), t) {
    t = oc(t);
    let { class: l, style: a } = t;
    l && !xe(l) && (t.class = pt(l)), ge(a) && (ei(a) && !K(a) && (a = Te({}, a)), t.style = rn(a));
  }
  const i = xe(e) ? 1 : xa(e) ? 128 : nc(e) ? 64 : ge(e) ? 4 : q(e) ? 2 : 0;
  return X(
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
function oc(e) {
  return e ? ei(e) || ds in e ? Te({}, e) : e : null;
}
function Qt(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e, l = t ? ic(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Oi(l),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? K(r) ? r.concat(Kn(t)) : [r, Kn(t)] : Kn(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Re ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Qt(e.ssContent),
    ssFallback: e.ssFallback && Qt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function hs(e = " ", t = 0) {
  return B(fs, null, e, t);
}
function xn(e = "", t = !1) {
  return t ? (W(), Je($t, null, e)) : B($t, null, e);
}
function ot(e) {
  return e == null || typeof e == "boolean" ? B($t) : K(e) ? B(
    Re,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Rt(e) : B(fs, null, String(e));
}
function Rt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Qt(e);
}
function pr(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (K(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), pr(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(ds in t) ? t._ctx = $e : r === 3 && $e && ($e.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    q(t) ? (t = { default: t, _ctx: $e }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [hs(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function ic(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = pt([t.class, s.class]));
      else if (r === "style")
        t.style = rn([t.style, s.style]);
      else if (ss(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(K(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else
        r !== "" && (t[r] = s[r]);
  }
  return t;
}
function rt(e, t, n, s = null) {
  et(e, t, 7, [
    n,
    s
  ]);
}
const lc = wi();
let ac = 0;
function cc(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || lc, o = {
    uid: ac++,
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
    scope: new Sl(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Ei(s, r),
    emitsOptions: fi(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: he,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: he,
    data: he,
    props: he,
    attrs: he,
    slots: he,
    refs: he,
    setupState: he,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = va.bind(null, o), e.ce && e.ce(o), o;
}
let Se = null, mr, Kt, qr = "__VUE_INSTANCE_SETTERS__";
(Kt = ks()[qr]) || (Kt = ks()[qr] = []), Kt.push((e) => Se = e), mr = (e) => {
  Kt.length > 1 ? Kt.forEach((t) => t(e)) : Kt[0](e);
};
const Zt = (e) => {
  mr(e), e.scope.on();
}, jt = () => {
  Se && Se.scope.off(), mr(null);
};
function Ai(e) {
  return e.vnode.shapeFlag & 4;
}
let An = !1;
function uc(e, t = !1) {
  An = t;
  const { props: n, children: s } = e.vnode, r = Ai(e);
  Ja(e, n, r, t), Ga(e, s);
  const o = r ? fc(e, t) : void 0;
  return An = !1, o;
}
function fc(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = ti(new Proxy(e.ctx, Ba));
  const { setup: s } = n;
  if (s) {
    const r = e.setupContext = s.length > 1 ? hc(e) : null;
    Zt(e), on();
    const o = Pt(
      s,
      e,
      0,
      [e.props, r]
    );
    if (ln(), jt(), Lo(o)) {
      if (o.then(jt, jt), t)
        return o.then((i) => {
          Jr(e, i, t);
        }).catch((i) => {
          as(i, e, 0);
        });
      e.asyncDep = o;
    } else
      Jr(e, o, t);
  } else
    ki(e, t);
}
function Jr(e, t, n) {
  q(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ge(t) && (e.setupState = oi(t)), ki(e, n);
}
let Xr;
function ki(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Xr && !s.render) {
      const r = s.template || dr(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config, { delimiters: l, compilerOptions: a } = s, c = Te(
          Te(
            {
              isCustomElement: o,
              delimiters: l
            },
            i
          ),
          a
        );
        s.render = Xr(r, c);
      }
    }
    e.render = s.render || Ze;
  }
  Zt(e), on(), ja(e), ln(), jt();
}
function dc(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return je(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function hc(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return dc(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function ps(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(oi(ti(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in bn)
          return bn[n](e);
      },
      has(t, n) {
        return n in t || n in bn;
      }
    }));
}
function pc(e, t = !0) {
  return q(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function mc(e) {
  return q(e) && "__vccOpts" in e;
}
const te = (e, t) => fa(e, t, An);
function Mi(e, t, n) {
  const s = arguments.length;
  return s === 2 ? ge(t) && !K(t) ? Zn(t) ? B(e, null, [t]) : B(e, t) : B(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Zn(n) && (n = [n]), B(e, t, n));
}
const gc = Symbol.for("v-scx"), vc = () => Ce(gc), yc = "3.3.4", _c = "http://www.w3.org/2000/svg", Lt = typeof document < "u" ? document : null, Yr = Lt && /* @__PURE__ */ Lt.createElement("template"), bc = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t ? Lt.createElementNS(_c, e) : Lt.createElement(e, n ? { is: n } : void 0);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => Lt.createTextNode(e),
  createComment: (e) => Lt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Lt.querySelector(e),
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
      Yr.innerHTML = s ? `<svg>${e}</svg>` : e;
      const l = Yr.content;
      if (s) {
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
};
function wc(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function xc(e, t, n) {
  const s = e.style, r = xe(n);
  if (n && !r) {
    if (t && !xe(t))
      for (const o in t)
        n[o] == null && Hs(s, o, "");
    for (const o in n)
      Hs(s, o, n[o]);
  } else {
    const o = s.display;
    r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (s.display = o);
  }
}
const Gr = /\s*!important$/;
function Hs(e, t, n) {
  if (K(n))
    n.forEach((s) => Hs(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Ec(e, t);
    Gr.test(n) ? e.setProperty(
      zt(s),
      n.replace(Gr, ""),
      "important"
    ) : e[s] = n;
  }
}
const Qr = ["Webkit", "Moz", "ms"], Rs = {};
function Ec(e, t) {
  const n = Rs[t];
  if (n)
    return n;
  let s = lt(t);
  if (s !== "filter" && s in e)
    return Rs[t] = s;
  s = is(s);
  for (let r = 0; r < Qr.length; r++) {
    const o = Qr[r] + s;
    if (o in e)
      return Rs[t] = o;
  }
  return t;
}
const Zr = "http://www.w3.org/1999/xlink";
function Rc(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(Zr, t.slice(6, t.length)) : e.setAttributeNS(Zr, t, n);
  else {
    const o = Pl(t);
    n == null || o && !jo(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n);
  }
}
function Cc(e, t, n, s, r, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    s && i(s, r, o), e[t] = n ?? "";
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && // custom elements may use _value internally
  !l.includes("-")) {
    e._value = n;
    const c = l === "OPTION" ? e.getAttribute("value") : e.value, u = n ?? "";
    c !== u && (e.value = u), n == null && e.removeAttribute(t);
    return;
  }
  let a = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean" ? n = jo(n) : n == null && c === "string" ? (n = "", a = !0) : c === "number" && (n = 0, a = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  a && e.removeAttribute(t);
}
function Tc(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Pc(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function Sc(e, t, n, s, r = null) {
  const o = e._vei || (e._vei = {}), i = o[t];
  if (s && i)
    i.value = s;
  else {
    const [l, a] = Oc(t);
    if (s) {
      const c = o[t] = Mc(s, r);
      Tc(e, l, c, a);
    } else
      i && (Pc(e, l, i, a), o[t] = void 0);
  }
}
const eo = /(?:Once|Passive|Capture)$/;
function Oc(e) {
  let t;
  if (eo.test(e)) {
    t = {};
    let s;
    for (; s = e.match(eo); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : zt(e.slice(2)), t];
}
let Cs = 0;
const Ac = /* @__PURE__ */ Promise.resolve(), kc = () => Cs || (Ac.then(() => Cs = 0), Cs = Date.now());
function Mc(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    et(
      $c(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = kc(), n;
}
function $c(e, t) {
  if (K(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((s) => (r) => !r._stopped && s && s(r));
  } else
    return t;
}
const to = /^on[a-z]/, Ic = (e, t, n, s, r = !1, o, i, l, a) => {
  t === "class" ? wc(e, s, r) : t === "style" ? xc(e, n, s) : ss(t) ? Qs(t) || Sc(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Fc(e, t, s, r)) ? Cc(
    e,
    t,
    s,
    o,
    i,
    l,
    a
  ) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Rc(e, t, s, r));
};
function Fc(e, t, n, s) {
  return s ? !!(t === "innerHTML" || t === "textContent" || t in e && to.test(t) && q(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || to.test(t) && xe(n) ? !1 : t in e;
}
const Nc = ["ctrl", "shift", "alt", "meta"], Dc = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Nc.some((n) => e[`${n}Key`] && !t.includes(n))
}, Lc = (e, t) => (n, ...s) => {
  for (let r = 0; r < t.length; r++) {
    const o = Dc[t[r]];
    if (o && o(n, t))
      return;
  }
  return e(n, ...s);
}, Uc = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Bc = (e, t) => (n) => {
  if (!("key" in n))
    return;
  const s = zt(n.key);
  if (t.some((r) => r === s || Uc[r] === s))
    return e(n);
}, en = {
  beforeMount(e, { value: t }, { transition: n }) {
    e._vod = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : hn(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), hn(e, !0), s.enter(e)) : s.leave(e, () => {
      hn(e, !1);
    }) : hn(e, t));
  },
  beforeUnmount(e, { value: t }) {
    hn(e, t);
  }
};
function hn(e, t) {
  e.style.display = t ? e._vod : "none";
}
const jc = /* @__PURE__ */ Te({ patchProp: Ic }, bc);
let no;
function Hc() {
  return no || (no = Za(jc));
}
const zc = (...e) => {
  const t = Hc().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = Kc(s);
    if (!r)
      return;
    const o = t._component;
    !q(o) && !o.render && !o.template && (o.template = r.innerHTML), r.innerHTML = "";
    const i = n(r, !1, r instanceof SVGElement);
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i;
  }, t;
};
function Kc(e) {
  return xe(e) ? document.querySelector(e) : e;
}
const $i = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, Vc = {};
function Wc(e, t) {
  const n = Na("router-view");
  return W(), Je(n);
}
const qc = /* @__PURE__ */ $i(Vc, [["render", Wc]]);
/*!
  * vue-router v4.2.2
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const Vt = typeof window < "u";
function Jc(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const le = Object.assign;
function Ts(e, t) {
  const n = {};
  for (const s in t) {
    const r = t[s];
    n[s] = tt(r) ? r.map(e) : e(r);
  }
  return n;
}
const En = () => {
}, tt = Array.isArray, Xc = /\/$/, Yc = (e) => e.replace(Xc, "");
function Ps(e, t, n = "/") {
  let s, r = {}, o = "", i = "";
  const l = t.indexOf("#");
  let a = t.indexOf("?");
  return l < a && l >= 0 && (a = -1), a > -1 && (s = t.slice(0, a), o = t.slice(a + 1, l > -1 ? l : t.length), r = e(o)), l > -1 && (s = s || t.slice(0, l), i = t.slice(l, t.length)), s = eu(s ?? t, n), {
    fullPath: s + (o && "?") + o + i,
    path: s,
    query: r,
    hash: i
  };
}
function Gc(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function so(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function Qc(e, t, n) {
  const s = t.matched.length - 1, r = n.matched.length - 1;
  return s > -1 && s === r && tn(t.matched[s], n.matched[r]) && Ii(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function tn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Ii(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!Zc(e[n], t[n]))
      return !1;
  return !0;
}
function Zc(e, t) {
  return tt(e) ? ro(e, t) : tt(t) ? ro(t, e) : e === t;
}
function ro(e, t) {
  return tt(t) ? e.length === t.length && e.every((n, s) => n === t[s]) : e.length === 1 && e[0] === t;
}
function eu(e, t) {
  if (e.startsWith("/"))
    return e;
  if (!e)
    return t;
  const n = t.split("/"), s = e.split("/"), r = s[s.length - 1];
  (r === ".." || r === ".") && s.push("");
  let o = n.length - 1, i, l;
  for (i = 0; i < s.length; i++)
    if (l = s[i], l !== ".")
      if (l === "..")
        o > 1 && o--;
      else
        break;
  return n.slice(0, o).join("/") + "/" + s.slice(i - (i === s.length ? 1 : 0)).join("/");
}
var kn;
(function(e) {
  e.pop = "pop", e.push = "push";
})(kn || (kn = {}));
var Rn;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(Rn || (Rn = {}));
function tu(e) {
  if (!e)
    if (Vt) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Yc(e);
}
const nu = /^[^#]+#/;
function su(e, t) {
  return e.replace(nu, "#") + t;
}
function ru(e, t) {
  const n = document.documentElement.getBoundingClientRect(), s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0)
  };
}
const ms = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function ou(e) {
  let t;
  if ("el" in e) {
    const n = e.el, s = typeof n == "string" && n.startsWith("#"), r = typeof n == "string" ? s ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!r)
      return;
    t = ru(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset);
}
function oo(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const zs = /* @__PURE__ */ new Map();
function iu(e, t) {
  zs.set(e, t);
}
function lu(e) {
  const t = zs.get(e);
  return zs.delete(e), t;
}
let au = () => location.protocol + "//" + location.host;
function Fi(e, t) {
  const { pathname: n, search: s, hash: r } = t, o = e.indexOf("#");
  if (o > -1) {
    let l = r.includes(e.slice(o)) ? e.slice(o).length : 1, a = r.slice(l);
    return a[0] !== "/" && (a = "/" + a), so(a, "");
  }
  return so(n, e) + s + r;
}
function cu(e, t, n, s) {
  let r = [], o = [], i = null;
  const l = ({ state: p }) => {
    const g = Fi(e, location), x = n.value, T = t.value;
    let I = 0;
    if (p) {
      if (n.value = g, t.value = p, i && i === x) {
        i = null;
        return;
      }
      I = T ? p.position - T.position : 0;
    } else
      s(g);
    r.forEach((S) => {
      S(n.value, x, {
        delta: I,
        type: kn.pop,
        direction: I ? I > 0 ? Rn.forward : Rn.back : Rn.unknown
      });
    });
  };
  function a() {
    i = n.value;
  }
  function c(p) {
    r.push(p);
    const g = () => {
      const x = r.indexOf(p);
      x > -1 && r.splice(x, 1);
    };
    return o.push(g), g;
  }
  function u() {
    const { history: p } = window;
    p.state && p.replaceState(le({}, p.state, { scroll: ms() }), "");
  }
  function h() {
    for (const p of o)
      p();
    o = [], window.removeEventListener("popstate", l), window.removeEventListener("beforeunload", u);
  }
  return window.addEventListener("popstate", l), window.addEventListener("beforeunload", u, {
    passive: !0
  }), {
    pauseListeners: a,
    listen: c,
    destroy: h
  };
}
function io(e, t, n, s = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: r ? ms() : null
  };
}
function uu(e) {
  const { history: t, location: n } = window, s = {
    value: Fi(e, n)
  }, r = { value: t.state };
  r.value || o(s.value, {
    back: null,
    current: s.value,
    forward: null,
    // the length is off by one, we need to decrease it
    position: t.length - 1,
    replaced: !0,
    // don't add a scroll as the user may have an anchor, and we want
    // scrollBehavior to be triggered without a saved position
    scroll: null
  }, !0);
  function o(a, c, u) {
    const h = e.indexOf("#"), p = h > -1 ? (n.host && document.querySelector("base") ? e : e.slice(h)) + a : au() + e + a;
    try {
      t[u ? "replaceState" : "pushState"](c, "", p), r.value = c;
    } catch (g) {
      console.error(g), n[u ? "replace" : "assign"](p);
    }
  }
  function i(a, c) {
    const u = le({}, t.state, io(
      r.value.back,
      // keep back and forward entries but override current position
      a,
      r.value.forward,
      !0
    ), c, { position: r.value.position });
    o(a, u, !0), s.value = a;
  }
  function l(a, c) {
    const u = le(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      r.value,
      t.state,
      {
        forward: a,
        scroll: ms()
      }
    );
    o(u.current, u, !0);
    const h = le({}, io(s.value, a, null), { position: u.position + 1 }, c);
    o(a, h, !1), s.value = a;
  }
  return {
    location: s,
    state: r,
    push: l,
    replace: i
  };
}
function fu(e) {
  e = tu(e);
  const t = uu(e), n = cu(e, t.state, t.location, t.replace);
  function s(o, i = !0) {
    i || n.pauseListeners(), history.go(o);
  }
  const r = le({
    // it's overridden right after
    location: "",
    base: e,
    go: s,
    createHref: su.bind(null, e)
  }, t, n);
  return Object.defineProperty(r, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(r, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), r;
}
function du(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function Ni(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const _t = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
}, Di = Symbol("");
var lo;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(lo || (lo = {}));
function nn(e, t) {
  return le(new Error(), {
    type: e,
    [Di]: !0
  }, t);
}
function at(e, t) {
  return e instanceof Error && Di in e && (t == null || !!(e.type & t));
}
const ao = "[^/]+?", hu = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, pu = /[.+*?^${}()[\]/\\]/g;
function mu(e, t) {
  const n = le({}, hu, t), s = [];
  let r = n.start ? "^" : "";
  const o = [];
  for (const c of e) {
    const u = c.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !c.length && (r += "/");
    for (let h = 0; h < c.length; h++) {
      const p = c[h];
      let g = 40 + (n.sensitive ? 0.25 : 0);
      if (p.type === 0)
        h || (r += "/"), r += p.value.replace(pu, "\\$&"), g += 40;
      else if (p.type === 1) {
        const { value: x, repeatable: T, optional: I, regexp: S } = p;
        o.push({
          name: x,
          repeatable: T,
          optional: I
        });
        const E = S || ao;
        if (E !== ao) {
          g += 10;
          try {
            new RegExp(`(${E})`);
          } catch (F) {
            throw new Error(`Invalid custom RegExp for param "${x}" (${E}): ` + F.message);
          }
        }
        let k = T ? `((?:${E})(?:/(?:${E}))*)` : `(${E})`;
        h || (k = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        I && c.length < 2 ? `(?:/${k})` : "/" + k), I && (k += "?"), r += k, g += 20, I && (g += -8), T && (g += -20), E === ".*" && (g += -50);
      }
      u.push(g);
    }
    s.push(u);
  }
  if (n.strict && n.end) {
    const c = s.length - 1;
    s[c][s[c].length - 1] += 0.7000000000000001;
  }
  n.strict || (r += "/?"), n.end ? r += "$" : n.strict && (r += "(?:/|$)");
  const i = new RegExp(r, n.sensitive ? "" : "i");
  function l(c) {
    const u = c.match(i), h = {};
    if (!u)
      return null;
    for (let p = 1; p < u.length; p++) {
      const g = u[p] || "", x = o[p - 1];
      h[x.name] = g && x.repeatable ? g.split("/") : g;
    }
    return h;
  }
  function a(c) {
    let u = "", h = !1;
    for (const p of e) {
      (!h || !u.endsWith("/")) && (u += "/"), h = !1;
      for (const g of p)
        if (g.type === 0)
          u += g.value;
        else if (g.type === 1) {
          const { value: x, repeatable: T, optional: I } = g, S = x in c ? c[x] : "";
          if (tt(S) && !T)
            throw new Error(`Provided param "${x}" is an array but it is not repeatable (* or + modifiers)`);
          const E = tt(S) ? S.join("/") : S;
          if (!E)
            if (I)
              p.length < 2 && (u.endsWith("/") ? u = u.slice(0, -1) : h = !0);
            else
              throw new Error(`Missing required param "${x}"`);
          u += E;
        }
    }
    return u || "/";
  }
  return {
    re: i,
    score: s,
    keys: o,
    parse: l,
    stringify: a
  };
}
function gu(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n];
    if (s)
      return s;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 40 + 40 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 40 + 40 ? 1 : -1 : 0;
}
function vu(e, t) {
  let n = 0;
  const s = e.score, r = t.score;
  for (; n < s.length && n < r.length; ) {
    const o = gu(s[n], r[n]);
    if (o)
      return o;
    n++;
  }
  if (Math.abs(r.length - s.length) === 1) {
    if (co(s))
      return 1;
    if (co(r))
      return -1;
  }
  return r.length - s.length;
}
function co(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const yu = {
  type: 0,
  value: ""
}, _u = /[a-zA-Z0-9_]/;
function bu(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[yu]];
  if (!e.startsWith("/"))
    throw new Error(`Invalid path "${e}"`);
  function t(g) {
    throw new Error(`ERR (${n})/"${c}": ${g}`);
  }
  let n = 0, s = n;
  const r = [];
  let o;
  function i() {
    o && r.push(o), o = [];
  }
  let l = 0, a, c = "", u = "";
  function h() {
    c && (n === 0 ? o.push({
      type: 0,
      value: c
    }) : n === 1 || n === 2 || n === 3 ? (o.length > 1 && (a === "*" || a === "+") && t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`), o.push({
      type: 1,
      value: c,
      regexp: u,
      repeatable: a === "*" || a === "+",
      optional: a === "*" || a === "?"
    })) : t("Invalid state to consume buffer"), c = "");
  }
  function p() {
    c += a;
  }
  for (; l < e.length; ) {
    if (a = e[l++], a === "\\" && n !== 2) {
      s = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        a === "/" ? (c && h(), i()) : a === ":" ? (h(), n = 1) : p();
        break;
      case 4:
        p(), n = s;
        break;
      case 1:
        a === "(" ? n = 2 : _u.test(a) ? p() : (h(), n = 0, a !== "*" && a !== "?" && a !== "+" && l--);
        break;
      case 2:
        a === ")" ? u[u.length - 1] == "\\" ? u = u.slice(0, -1) + a : n = 3 : u += a;
        break;
      case 3:
        h(), n = 0, a !== "*" && a !== "?" && a !== "+" && l--, u = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${c}"`), h(), i(), r;
}
function wu(e, t, n) {
  const s = mu(bu(e.path), n), r = le(s, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function xu(e, t) {
  const n = [], s = /* @__PURE__ */ new Map();
  t = ho({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(u) {
    return s.get(u);
  }
  function o(u, h, p) {
    const g = !p, x = Eu(u);
    x.aliasOf = p && p.record;
    const T = ho(t, u), I = [
      x
    ];
    if ("alias" in u) {
      const k = typeof u.alias == "string" ? [u.alias] : u.alias;
      for (const F of k)
        I.push(le({}, x, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: p ? p.record.components : x.components,
          path: F,
          // we might be the child of an alias
          aliasOf: p ? p.record : x
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let S, E;
    for (const k of I) {
      const { path: F } = k;
      if (h && F[0] !== "/") {
        const fe = h.record.path, de = fe[fe.length - 1] === "/" ? "" : "/";
        k.path = h.record.path + (F && de + F);
      }
      if (S = wu(k, h, T), p ? p.alias.push(S) : (E = E || S, E !== S && E.alias.push(S), g && u.name && !fo(S) && i(u.name)), x.children) {
        const fe = x.children;
        for (let de = 0; de < fe.length; de++)
          o(fe[de], S, p && p.children[de]);
      }
      p = p || S, (S.record.components && Object.keys(S.record.components).length || S.record.name || S.record.redirect) && a(S);
    }
    return E ? () => {
      i(E);
    } : En;
  }
  function i(u) {
    if (Ni(u)) {
      const h = s.get(u);
      h && (s.delete(u), n.splice(n.indexOf(h), 1), h.children.forEach(i), h.alias.forEach(i));
    } else {
      const h = n.indexOf(u);
      h > -1 && (n.splice(h, 1), u.record.name && s.delete(u.record.name), u.children.forEach(i), u.alias.forEach(i));
    }
  }
  function l() {
    return n;
  }
  function a(u) {
    let h = 0;
    for (; h < n.length && vu(u, n[h]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (u.record.path !== n[h].record.path || !Li(u, n[h])); )
      h++;
    n.splice(h, 0, u), u.record.name && !fo(u) && s.set(u.record.name, u);
  }
  function c(u, h) {
    let p, g = {}, x, T;
    if ("name" in u && u.name) {
      if (p = s.get(u.name), !p)
        throw nn(1, {
          location: u
        });
      T = p.record.name, g = le(
        // paramsFromLocation is a new object
        uo(
          h.params,
          // only keep params that exist in the resolved location
          // TODO: only keep optional params coming from a parent record
          p.keys.filter((E) => !E.optional).map((E) => E.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        u.params && uo(u.params, p.keys.map((E) => E.name))
      ), x = p.stringify(g);
    } else if ("path" in u)
      x = u.path, p = n.find((E) => E.re.test(x)), p && (g = p.parse(x), T = p.record.name);
    else {
      if (p = h.name ? s.get(h.name) : n.find((E) => E.re.test(h.path)), !p)
        throw nn(1, {
          location: u,
          currentLocation: h
        });
      T = p.record.name, g = le({}, h.params, u.params), x = p.stringify(g);
    }
    const I = [];
    let S = p;
    for (; S; )
      I.unshift(S.record), S = S.parent;
    return {
      name: T,
      path: x,
      params: g,
      matched: I,
      meta: Cu(I)
    };
  }
  return e.forEach((u) => o(u)), { addRoute: o, resolve: c, removeRoute: i, getRoutes: l, getRecordMatcher: r };
}
function uo(e, t) {
  const n = {};
  for (const s of t)
    s in e && (n[s] = e[s]);
  return n;
}
function Eu(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Ru(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function Ru(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e)
    t.default = n;
  else
    for (const s in e.components)
      t[s] = typeof n == "boolean" ? n : n[s];
  return t;
}
function fo(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function Cu(e) {
  return e.reduce((t, n) => le(t, n.meta), {});
}
function ho(e, t) {
  const n = {};
  for (const s in e)
    n[s] = s in t ? t[s] : e[s];
  return n;
}
function Li(e, t) {
  return t.children.some((n) => n === e || Li(e, n));
}
const Ui = /#/g, Tu = /&/g, Pu = /\//g, Su = /=/g, Ou = /\?/g, Bi = /\+/g, Au = /%5B/g, ku = /%5D/g, ji = /%5E/g, Mu = /%60/g, Hi = /%7B/g, $u = /%7C/g, zi = /%7D/g, Iu = /%20/g;
function gr(e) {
  return encodeURI("" + e).replace($u, "|").replace(Au, "[").replace(ku, "]");
}
function Fu(e) {
  return gr(e).replace(Hi, "{").replace(zi, "}").replace(ji, "^");
}
function Ks(e) {
  return gr(e).replace(Bi, "%2B").replace(Iu, "+").replace(Ui, "%23").replace(Tu, "%26").replace(Mu, "`").replace(Hi, "{").replace(zi, "}").replace(ji, "^");
}
function Nu(e) {
  return Ks(e).replace(Su, "%3D");
}
function Du(e) {
  return gr(e).replace(Ui, "%23").replace(Ou, "%3F");
}
function Lu(e) {
  return e == null ? "" : Du(e).replace(Pu, "%2F");
}
function es(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
  }
  return "" + e;
}
function Uu(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const s = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < s.length; ++r) {
    const o = s[r].replace(Bi, " "), i = o.indexOf("="), l = es(i < 0 ? o : o.slice(0, i)), a = i < 0 ? null : es(o.slice(i + 1));
    if (l in t) {
      let c = t[l];
      tt(c) || (c = t[l] = [c]), c.push(a);
    } else
      t[l] = a;
  }
  return t;
}
function po(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (n = Nu(n), s == null) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (tt(s) ? s.map((o) => o && Ks(o)) : [s && Ks(s)]).forEach((o) => {
      o !== void 0 && (t += (t.length ? "&" : "") + n, o != null && (t += "=" + o));
    });
  }
  return t;
}
function Bu(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 && (t[n] = tt(s) ? s.map((r) => r == null ? null : "" + r) : s == null ? s : "" + s);
  }
  return t;
}
const ju = Symbol(""), mo = Symbol(""), vr = Symbol(""), yr = Symbol(""), Vs = Symbol("");
function pn() {
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
    list: () => e,
    reset: n
  };
}
function Ct(e, t, n, s, r) {
  const o = s && // name is defined if record is because of the function overload
  (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
  return () => new Promise((i, l) => {
    const a = (h) => {
      h === !1 ? l(nn(4, {
        from: n,
        to: t
      })) : h instanceof Error ? l(h) : du(h) ? l(nn(2, {
        from: t,
        to: h
      })) : (o && // since enterCallbackArray is truthy, both record and name also are
      s.enterCallbacks[r] === o && typeof h == "function" && o.push(h), i());
    }, c = e.call(s && s.instances[r], t, n, a);
    let u = Promise.resolve(c);
    e.length < 3 && (u = u.then(a)), u.catch((h) => l(h));
  });
}
function Ss(e, t, n, s) {
  const r = [];
  for (const o of e)
    for (const i in o.components) {
      let l = o.components[i];
      if (!(t !== "beforeRouteEnter" && !o.instances[i]))
        if (Hu(l)) {
          const c = (l.__vccOpts || l)[t];
          c && r.push(Ct(c, n, s, o, i));
        } else {
          let a = l();
          r.push(() => a.then((c) => {
            if (!c)
              return Promise.reject(new Error(`Couldn't resolve component "${i}" at "${o.path}"`));
            const u = Jc(c) ? c.default : c;
            o.components[i] = u;
            const p = (u.__vccOpts || u)[t];
            return p && Ct(p, n, s, o, i)();
          }));
        }
    }
  return r;
}
function Hu(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function go(e) {
  const t = Ce(vr), n = Ce(yr), s = te(() => t.resolve(P(e.to))), r = te(() => {
    const { matched: a } = s.value, { length: c } = a, u = a[c - 1], h = n.matched;
    if (!u || !h.length)
      return -1;
    const p = h.findIndex(tn.bind(null, u));
    if (p > -1)
      return p;
    const g = vo(a[c - 2]);
    return (
      // we are dealing with nested routes
      c > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      vo(u) === g && // avoid comparing the child with its parent
      h[h.length - 1].path !== g ? h.findIndex(tn.bind(null, a[c - 2])) : p
    );
  }), o = te(() => r.value > -1 && Wu(n.params, s.value.params)), i = te(() => r.value > -1 && r.value === n.matched.length - 1 && Ii(n.params, s.value.params));
  function l(a = {}) {
    return Vu(a) ? t[P(e.replace) ? "replace" : "push"](
      P(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(En) : Promise.resolve();
  }
  return {
    route: s,
    href: te(() => s.value.href),
    isActive: o,
    isExactActive: i,
    navigate: l
  };
}
const zu = /* @__PURE__ */ Pe({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink: go,
  setup(e, { slots: t }) {
    const n = $n(go(e)), { options: s } = Ce(vr), r = te(() => ({
      [yo(e.activeClass, s.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [yo(e.exactActiveClass, s.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const o = t.default && t.default(n);
      return e.custom ? o : Mi("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: r.value
      }, o);
    };
  }
}), Ku = zu;
function Vu(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Wu(e, t) {
  for (const n in t) {
    const s = t[n], r = e[n];
    if (typeof s == "string") {
      if (s !== r)
        return !1;
    } else if (!tt(r) || r.length !== s.length || s.some((o, i) => o !== r[i]))
      return !1;
  }
  return !0;
}
function vo(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const yo = (e, t, n) => e ?? t ?? n, qu = /* @__PURE__ */ Pe({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t, slots: n }) {
    const s = Ce(Vs), r = te(() => e.route || s.value), o = Ce(mo, 0), i = te(() => {
      let c = P(o);
      const { matched: u } = r.value;
      let h;
      for (; (h = u[c]) && !h.components; )
        c++;
      return c;
    }), l = te(() => r.value.matched[i.value]);
    qe(mo, te(() => i.value + 1)), qe(ju, l), qe(Vs, r);
    const a = V();
    return St(() => [a.value, l.value, e.name], ([c, u, h], [p, g, x]) => {
      u && (u.instances[h] = c, g && g !== u && c && c === p && (u.leaveGuards.size || (u.leaveGuards = g.leaveGuards), u.updateGuards.size || (u.updateGuards = g.updateGuards))), c && u && // if there is no instance but to and from are the same this might be
      // the first visit
      (!g || !tn(u, g) || !p) && (u.enterCallbacks[h] || []).forEach((T) => T(c));
    }, { flush: "post" }), () => {
      const c = r.value, u = e.name, h = l.value, p = h && h.components[u];
      if (!p)
        return _o(n.default, { Component: p, route: c });
      const g = h.props[u], x = g ? g === !0 ? c.params : typeof g == "function" ? g(c) : g : null, I = Mi(p, le({}, x, t, {
        onVnodeUnmounted: (S) => {
          S.component.isUnmounted && (h.instances[u] = null);
        },
        ref: a
      }));
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        _o(n.default, { Component: I, route: c }) || I
      );
    };
  }
});
function _o(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Ju = qu;
function Xu(e) {
  const t = xu(e.routes, e), n = e.parseQuery || Uu, s = e.stringifyQuery || po, r = e.history, o = pn(), i = pn(), l = pn(), a = oa(_t);
  let c = _t;
  Vt && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const u = Ts.bind(null, (O) => "" + O), h = Ts.bind(null, Lu), p = (
    // @ts-expect-error: intentionally avoid the type check
    Ts.bind(null, es)
  );
  function g(O, L) {
    let N, j;
    return Ni(O) ? (N = t.getRecordMatcher(O), j = L) : j = O, t.addRoute(j, N);
  }
  function x(O) {
    const L = t.getRecordMatcher(O);
    L && t.removeRoute(L);
  }
  function T() {
    return t.getRoutes().map((O) => O.record);
  }
  function I(O) {
    return !!t.getRecordMatcher(O);
  }
  function S(O, L) {
    if (L = le({}, L || a.value), typeof O == "string") {
      const m = Ps(n, O, L.path), w = t.resolve({ path: m.path }, L), v = r.createHref(m.fullPath);
      return le(m, w, {
        params: p(w.params),
        hash: es(m.hash),
        redirectedFrom: void 0,
        href: v
      });
    }
    let N;
    if ("path" in O)
      N = le({}, O, {
        path: Ps(n, O.path, L.path).path
      });
    else {
      const m = le({}, O.params);
      for (const w in m)
        m[w] == null && delete m[w];
      N = le({}, O, {
        params: h(m)
      }), L.params = h(L.params);
    }
    const j = t.resolve(N, L), Y = O.hash || "";
    j.params = u(p(j.params));
    const d = Gc(s, le({}, O, {
      hash: Fu(Y),
      path: j.path
    })), f = r.createHref(d);
    return le({
      fullPath: d,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: Y,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        s === po ? Bu(O.query) : O.query || {}
      )
    }, j, {
      redirectedFrom: void 0,
      href: f
    });
  }
  function E(O) {
    return typeof O == "string" ? Ps(n, O, a.value.path) : le({}, O);
  }
  function k(O, L) {
    if (c !== O)
      return nn(8, {
        from: L,
        to: O
      });
  }
  function F(O) {
    return ae(O);
  }
  function fe(O) {
    return F(le(E(O), { replace: !0 }));
  }
  function de(O) {
    const L = O.matched[O.matched.length - 1];
    if (L && L.redirect) {
      const { redirect: N } = L;
      let j = typeof N == "function" ? N(O) : N;
      return typeof j == "string" && (j = j.includes("?") || j.includes("#") ? j = E(j) : (
        // force empty params
        { path: j }
      ), j.params = {}), le({
        query: O.query,
        hash: O.hash,
        // avoid transferring params if the redirect has a path
        params: "path" in j ? {} : O.params
      }, j);
    }
  }
  function ae(O, L) {
    const N = c = S(O), j = a.value, Y = O.state, d = O.force, f = O.replace === !0, m = de(N);
    if (m)
      return ae(
        le(E(m), {
          state: typeof m == "object" ? le({}, Y, m.state) : Y,
          force: d,
          replace: f
        }),
        // keep original redirectedFrom if it exists
        L || N
      );
    const w = N;
    w.redirectedFrom = L;
    let v;
    return !d && Qc(s, j, N) && (v = nn(16, { to: w, from: j }), Ae(
      j,
      j,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (v ? Promise.resolve(v) : H(w, j)).catch((b) => at(b) ? (
      // navigation redirects still mark the router as ready
      at(
        b,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? b : Le(b)
    ) : (
      // reject any unknown error
      Z(b, w, j)
    )).then((b) => {
      if (b) {
        if (at(
          b,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return ae(
            // keep options
            le({
              // preserve an existing replacement but allow the redirect to override it
              replace: f
            }, E(b.to), {
              state: typeof b.to == "object" ? le({}, Y, b.to.state) : Y,
              force: d
            }),
            // preserve the original redirectedFrom if any
            L || w
          );
      } else
        b = J(w, j, !0, f, Y);
      return Q(w, j, b), b;
    });
  }
  function pe(O, L) {
    const N = k(O, L);
    return N ? Promise.reject(N) : Promise.resolve();
  }
  function be(O) {
    const L = Ke.values().next().value;
    return L && typeof L.runWithContext == "function" ? L.runWithContext(O) : O();
  }
  function H(O, L) {
    let N;
    const [j, Y, d] = Yu(O, L);
    N = Ss(j.reverse(), "beforeRouteLeave", O, L);
    for (const m of j)
      m.leaveGuards.forEach((w) => {
        N.push(Ct(w, O, L));
      });
    const f = pe.bind(null, O, L);
    return N.push(f), ye(N).then(() => {
      N = [];
      for (const m of o.list())
        N.push(Ct(m, O, L));
      return N.push(f), ye(N);
    }).then(() => {
      N = Ss(Y, "beforeRouteUpdate", O, L);
      for (const m of Y)
        m.updateGuards.forEach((w) => {
          N.push(Ct(w, O, L));
        });
      return N.push(f), ye(N);
    }).then(() => {
      N = [];
      for (const m of O.matched)
        if (m.beforeEnter && !L.matched.includes(m))
          if (tt(m.beforeEnter))
            for (const w of m.beforeEnter)
              N.push(Ct(w, O, L));
          else
            N.push(Ct(m.beforeEnter, O, L));
      return N.push(f), ye(N);
    }).then(() => (O.matched.forEach((m) => m.enterCallbacks = {}), N = Ss(d, "beforeRouteEnter", O, L), N.push(f), ye(N))).then(() => {
      N = [];
      for (const m of i.list())
        N.push(Ct(m, O, L));
      return N.push(f), ye(N);
    }).catch((m) => at(
      m,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? m : Promise.reject(m));
  }
  function Q(O, L, N) {
    for (const j of l.list())
      be(() => j(O, L, N));
  }
  function J(O, L, N, j, Y) {
    const d = k(O, L);
    if (d)
      return d;
    const f = L === _t, m = Vt ? history.state : {};
    N && (j || f ? r.replace(O.fullPath, le({
      scroll: f && m && m.scroll
    }, Y)) : r.push(O.fullPath, Y)), a.value = O, Ae(O, L, N, f), Le();
  }
  let ue;
  function _e() {
    ue || (ue = r.listen((O, L, N) => {
      if (!nt.listening)
        return;
      const j = S(O), Y = de(j);
      if (Y) {
        ae(le(Y, { replace: !0 }), j).catch(En);
        return;
      }
      c = j;
      const d = a.value;
      Vt && iu(oo(d.fullPath, N.delta), ms()), H(j, d).catch((f) => at(
        f,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? f : at(
        f,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (ae(
        f.to,
        j
        // avoid an uncaught rejection, let push call triggerError
      ).then((m) => {
        at(
          m,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !N.delta && N.type === kn.pop && r.go(-1, !1);
      }).catch(En), Promise.reject()) : (N.delta && r.go(-N.delta, !1), Z(f, j, d))).then((f) => {
        f = f || J(
          // after navigation, all matched components are resolved
          j,
          d,
          !1
        ), f && (N.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !at(
          f,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-N.delta, !1) : N.type === kn.pop && at(
          f,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), Q(j, d, f);
      }).catch(En);
    }));
  }
  let De = pn(), ce = pn(), ne;
  function Z(O, L, N) {
    Le(O);
    const j = ce.list();
    return j.length ? j.forEach((Y) => Y(O, L, N)) : console.error(O), Promise.reject(O);
  }
  function Ie() {
    return ne && a.value !== _t ? Promise.resolve() : new Promise((O, L) => {
      De.add([O, L]);
    });
  }
  function Le(O) {
    return ne || (ne = !O, _e(), De.list().forEach(([L, N]) => O ? N(O) : L()), De.reset()), O;
  }
  function Ae(O, L, N, j) {
    const { scrollBehavior: Y } = e;
    if (!Vt || !Y)
      return Promise.resolve();
    const d = !N && lu(oo(O.fullPath, 0)) || (j || !N) && history.state && history.state.scroll || null;
    return li().then(() => Y(O, L, d)).then((f) => f && ou(f)).catch((f) => Z(f, O, L));
  }
  const ve = (O) => r.go(O);
  let Ue;
  const Ke = /* @__PURE__ */ new Set(), nt = {
    currentRoute: a,
    listening: !0,
    addRoute: g,
    removeRoute: x,
    hasRoute: I,
    getRoutes: T,
    resolve: S,
    options: e,
    push: F,
    replace: fe,
    go: ve,
    back: () => ve(-1),
    forward: () => ve(1),
    beforeEach: o.add,
    beforeResolve: i.add,
    afterEach: l.add,
    onError: ce.add,
    isReady: Ie,
    install(O) {
      const L = this;
      O.component("RouterLink", Ku), O.component("RouterView", Ju), O.config.globalProperties.$router = L, Object.defineProperty(O.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => P(a)
      }), Vt && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !Ue && a.value === _t && (Ue = !0, F(r.location).catch((Y) => {
      }));
      const N = {};
      for (const Y in _t)
        N[Y] = te(() => a.value[Y]);
      O.provide(vr, L), O.provide(yr, $n(N)), O.provide(Vs, a);
      const j = O.unmount;
      Ke.add(O), O.unmount = function() {
        Ke.delete(O), Ke.size < 1 && (c = _t, ue && ue(), ue = null, a.value = _t, Ue = !1, ne = !1), j();
      };
    }
  };
  function ye(O) {
    return O.reduce((L, N) => L.then(() => be(N)), Promise.resolve());
  }
  return nt;
}
function Yu(e, t) {
  const n = [], s = [], r = [], o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const l = t.matched[i];
    l && (e.matched.find((c) => tn(c, l)) ? s.push(l) : n.push(l));
    const a = e.matched[i];
    a && (t.matched.find((c) => tn(c, a)) || r.push(a));
  }
  return [n, s, r];
}
function Ki() {
  return Ce(yr);
}
const Gu = { class: "side" }, Qu = { class: "side-content-title" }, Zu = ["onClick"], ef = /* @__PURE__ */ Pe({
  __name: "Side",
  props: {
    catalogList: {},
    current: {}
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const s = Mt(e).catalogList, r = (o, i) => {
      t("change", { type: o, child: i });
    };
    return (o, i) => (W(), ie("div", Gu, [
      (W(!0), ie(Re, null, Ns(P(s), (l) => (W(), ie("div", {
        key: l.id,
        class: "side-content"
      }, [
        X("p", Qu, At(l.text), 1),
        (W(!0), ie(Re, null, Ns(l.children, (a) => (W(), ie("div", {
          key: a.mid,
          class: pt({
            "side-content-cell": !0,
            "side-content-cell-active": o.current === a.mid
          }),
          onClick: (c) => r(l.type, a)
        }, At(a.title), 11, Zu))), 128))
      ]))), 128))
    ]));
  }
});
const ut = /* @__PURE__ */ Pe({
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
    return (t, n) => (W(), ie("button", {
      class: pt([
        "meme-button",
        {
          disabled: e.disabled
        }
      ])
    }, [
      Ua(t.$slots, "default", {}, () => [
        hs(At(e.label), 1)
      ])
    ], 2));
  }
});
const tf = Pe({
  name: "Input",
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue", "blur"],
  setup(e, { emit: t }) {
    const n = V(null), s = (o) => {
      t("update:modelValue", o.target.value);
    };
    return {
      input: n,
      blur: (o) => {
        s(o), t("blur");
      }
    };
  }
});
const nf = ["title", "value"];
function sf(e, t, n, s, r, o) {
  return W(), ie("input", {
    ref: "input",
    class: pt([
      "meme-input",
      {
        disabled: e.disabled
      }
    ]),
    title: e.title,
    value: e.modelValue,
    onBlur: t[0] || (t[0] = (...i) => e.blur && e.blur(...i)),
    onKeyup: t[1] || (t[1] = Bc((i) => {
      var l;
      return (l = e.input) == null ? void 0 : l.blur();
    }, ["enter"]))
  }, null, 42, nf);
}
const we = /* @__PURE__ */ $i(tf, [["render", sf]]);
const rf = { class: "meme-radio" }, of = ["name", "value", "checked"], lf = { class: "meme-radio-label" }, We = /* @__PURE__ */ Pe({
  __name: "Radio",
  props: {
    label: {},
    name: {},
    value: {},
    checked: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = (s) => {
      t("toggle", s);
    };
    return (s, r) => (W(), ie("label", rf, [
      X("input", {
        class: "meme-radio-input",
        type: "radio",
        name: s.name,
        value: s.value,
        checked: s.checked,
        onChange: r[0] || (r[0] = (o) => n(s.value))
      }, null, 40, of),
      X("span", lf, At(s.label), 1)
    ]));
  }
});
const af = { class: "meme-file-upload" }, cf = { class: "file-button" }, uf = /* @__PURE__ */ X("i", { class: "file-glyphicon" }, null, -1), ff = /* @__PURE__ */ X("span", null, "UPLOAD FILE", -1), df = /* @__PURE__ */ X("i", { class: "file-tips" }, "Drop files here to upload", -1), hf = [
  df
], pf = 1 * 1024 * 1024, Vi = /* @__PURE__ */ Pe({
  __name: "FileUpload",
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = Ce("commands"), s = (p) => {
      const g = p.target.files;
      if (!g)
        return !1;
      c(g);
    }, r = (p) => {
      p.stopPropagation(), p.preventDefault();
    }, o = (p) => {
      p.stopPropagation(), p.preventDefault();
    }, i = (p) => {
      p.stopPropagation(), p.preventDefault();
      const g = p.dataTransfer.files;
      c(g);
    }, l = (p) => {
      p.stopPropagation(), p.preventDefault();
      const g = p.clipboardData.files;
      c(g);
    }, a = /^image\//, c = (p) => {
      if (p.length !== 1)
        return u("不支持多个文件同时操作，请仅选择单个文件"), !1;
      const g = p[0], { name: x, size: T, type: I } = g;
      if (!a.test(I))
        return u(`当前文件类型为${I}，类型不符，请选择图片类型！`), !1;
      const S = x.replace(/\.\w*$/g, "");
      if (n.value.includes(S))
        return u(`当前文件名称【${x}】与系统默认关键指令【${S}】冲突，请重命名上传文件！`), !1;
      if (T > pf)
        return u("文件超过最大限制1M，请重新选择"), !1;
      const E = new FileReader();
      E.onload = (k) => {
        const F = k.target.result;
        h(x, F);
      }, E.onerror = () => {
        u(E.error.message);
      }, E.readAsDataURL(g);
    }, u = (p) => {
      alert(p);
    }, h = (p, g) => {
      t("change", {
        name: p,
        base64: g
      });
    };
    return (p, g) => (W(), ie("div", af, [
      X("div", cf, [
        uf,
        ff,
        X("input", {
          class: "file-input",
          type: "file",
          name: "file",
          accept: "image/*",
          title: "",
          onChange: s
        }, null, 32)
      ]),
      X("div", {
        class: "file-area",
        draggable: !0,
        contenteditable: !0,
        onDragenter: r,
        onDragover: o,
        onDrop: i,
        onPaste: l
      }, hf, 32)
    ]));
  }
});
const mf = ["value", "selected"], gf = /* @__PURE__ */ Pe({
  __name: "Select",
  props: {
    options: {},
    selected: {}
  },
  emits: ["change", "update:model-value"],
  setup(e, { emit: t }) {
    const n = (s) => {
      const r = s.target.value;
      s.target.blur(), t("update:model-value", r), t("change", r);
    };
    return (s, r) => (W(), ie("select", {
      class: "meme-select",
      onChange: n
    }, [
      (W(!0), ie(Re, null, Ns(s.options, (o) => (W(), ie("option", {
        key: o.value,
        class: "meme-option",
        value: o.value,
        selected: s.selected === o.value
      }, At(o.label), 9, mf))), 128))
    ], 32));
  }
});
const vf = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 32 32"
}, yf = /* @__PURE__ */ X("title", null, "dice", -1), _f = ["fill"], ts = /* @__PURE__ */ Pe({
  __name: "DiceButton",
  props: {
    color: {
      type: String,
      default: "#FF0000"
    }
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = e, s = te(() => ["transparent", "#FFFFFF"].includes(n.color) ? "gray" : n.color), r = () => {
      t("click");
    };
    return (o, i) => (W(), Je(P(ut), {
      class: "dice-button",
      u: "icon",
      onClick: r
    }, {
      default: fr(() => [
        (W(), ie("svg", vf, [
          yf,
          X("path", {
            fill: s.value,
            d: "M27 6h-16c-2.75 0-5 2.25-5 5v16c0 2.75 2.25 5 5 5h16c2.75 0 5-2.25 5-5v-16c0-2.75-2.25-5-5-5zM13 28c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM13 16c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM19 22c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25 28c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25 16c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25.899 4c-0.467-2.275-2.491-4-4.899-4h-16c-2.75 0-5 2.25-5 5v16c0 2.408 1.725 4.432 4 4.899v-19.899c0-1.1 0.9-2 2-2h19.899z"
          }, null, 8, _f)
        ]))
      ]),
      _: 1
    }));
  }
});
const bf = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 32 32"
}, wf = /* @__PURE__ */ X("title", null, "picker", -1), xf = ["fill"], Wi = /* @__PURE__ */ Pe({
  __name: "PickerButton",
  props: {
    color: {
      type: String,
      default: "#FF0000"
    }
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = e, s = te(() => ["transparent", "#FFFFFF"].includes(n.color) ? "gray" : n.color), r = () => {
      t("click");
    };
    return (o, i) => (W(), Je(P(ut), {
      class: "picker-button",
      u: "icon",
      onClick: r
    }, {
      default: fr(() => [
        (W(), ie("svg", bf, [
          wf,
          X("path", {
            fill: s.value,
            d: "M30.828 1.172c-1.562-1.562-4.095-1.562-5.657 0l-5.379 5.379-3.793-3.793-4.243 4.243 3.326 3.326-14.754 14.754c-0.252 0.252-0.358 0.592-0.322 0.921h-0.008v5c0 0.552 0.448 1 1 1h5c0 0 0.083 0 0.125 0 0.288 0 0.576-0.11 0.795-0.329l14.754-14.754 3.326 3.326 4.243-4.243-3.793-3.793 5.379-5.379c1.562-1.562 1.562-4.095 0-5.657zM5.409 30h-3.409v-3.409l14.674-14.674 3.409 3.409-14.674 14.674z"
          }, null, 8, xf)
        ]))
      ]),
      _: 1
    }));
  }
});
const Ef = { class: "property" }, qi = /* @__PURE__ */ Pe({
  __name: "Property",
  props: {
    max: {},
    size: {},
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
    const n = e, s = Ce("text"), r = Ce("updateText"), { max: o, size: i, color: l, align: a, direction: c, blur: u, degree: h, stroke: p, swidth: g } = Mt(n), x = (S, E) => {
      const k = {
        max: o.value,
        size: i.value,
        color: l.value,
        align: a.value,
        direction: c.value,
        blur: u.value,
        degree: h.value,
        stroke: p.value,
        swidth: g.value
      };
      k[E] = ["color", "align", "direction", "stroke"].includes(E) ? S : parseInt(S), t("change", k);
    }, T = (S) => {
      const E = "#" + Math.floor(Math.random() * 16777215).toString(16);
      x(E, S);
    }, I = () => {
      t("pick");
    };
    return (S, E) => (W(), ie("div", Ef, [
      B(P(we), {
        class: "property-max",
        value: P(o),
        "onUpdate:modelValue": E[0] || (E[0] = (k) => x(k, "max"))
      }, null, 8, ["value"]),
      B(P(we), {
        class: "property-size",
        value: P(i),
        "onUpdate:modelValue": E[1] || (E[1] = (k) => x(k, "size"))
      }, null, 8, ["value"]),
      B(P(we), {
        class: "property-color",
        value: P(l),
        "onUpdate:modelValue": E[2] || (E[2] = (k) => x(k, "color"))
      }, null, 8, ["value"]),
      B(ts, {
        color: P(l),
        onClick: E[3] || (E[3] = (k) => T("color"))
      }, null, 8, ["color"]),
      B(Wi, {
        color: P(l),
        onClick: I
      }, null, 8, ["color"]),
      B(P(we), {
        class: "property-color",
        value: P(p),
        "onUpdate:modelValue": E[4] || (E[4] = (k) => x(k, "stroke"))
      }, null, 8, ["value"]),
      B(ts, {
        color: P(p),
        onClick: E[5] || (E[5] = (k) => T("stroke"))
      }, null, 8, ["color"]),
      B(P(we), {
        class: "property-swidth",
        value: P(g),
        "onUpdate:modelValue": E[6] || (E[6] = (k) => x(k, "swidth"))
      }, null, 8, ["value"]),
      B(P(We), {
        label: "start",
        name: "align",
        value: "start",
        checked: P(a) === "start",
        onToggle: E[7] || (E[7] = (k) => x(k, "align"))
      }, null, 8, ["checked"]),
      B(P(We), {
        label: "center",
        name: "align",
        value: "center",
        checked: P(a) === "center",
        onToggle: E[8] || (E[8] = (k) => x(k, "align"))
      }, null, 8, ["checked"]),
      B(P(We), {
        class: "property-end",
        label: "end",
        name: "align",
        value: "end",
        checked: P(a) === "end",
        onToggle: E[9] || (E[9] = (k) => x(k, "align"))
      }, null, 8, ["checked"]),
      B(P(we), {
        class: "property-text",
        value: P(s),
        "onUpdate:modelValue": P(r)
      }, null, 8, ["value", "onUpdate:modelValue"]),
      B(P(We), {
        label: "up",
        name: "direction",
        value: "up",
        checked: P(c) === "up",
        onToggle: E[10] || (E[10] = (k) => x(k, "direction"))
      }, null, 8, ["checked"]),
      B(P(We), {
        label: "center",
        name: "direction",
        value: "center",
        checked: P(c) === "center",
        onToggle: E[11] || (E[11] = (k) => x(k, "direction"))
      }, null, 8, ["checked"]),
      B(P(We), {
        label: "down",
        name: "direction",
        value: "down",
        checked: P(c) === "down",
        onToggle: E[12] || (E[12] = (k) => x(k, "direction"))
      }, null, 8, ["checked"]),
      B(P(we), {
        class: "property-degree",
        value: P(h),
        "onUpdate:modelValue": E[13] || (E[13] = (k) => x(k, "degree"))
      }, null, 8, ["value"])
    ]));
  }
});
const Ot = 1.2, Ne = 11, Ve = 14, bo = Ve * Ne, wo = Ve * Ne, ft = Ve * Ne, xo = Ve, Rf = (() => {
  const e = [];
  for (let t = 1; t < Ne; t++)
    e.push([t, 0, t, Ne]), e.push([0, t, Ne, t]);
  return e.map((t) => t.map((n) => n * Ve));
})(), Cf = (e, t, n) => {
  let s = 0, r = e.length - 1;
  for (; s <= r; ) {
    const o = Math.floor((s + r) / 2), i = n.measureText(e.substring(0, o)).width, l = n.measureText(e.substring(0, o + 1)).width;
    if (i <= t && l > t)
      return o;
    i < t ? s = o + 1 : r = o - 1;
  }
  return -1;
}, Ji = (e, t, n) => {
  const s = [];
  let r = 0;
  for (; (r = Cf(e, t, n)) !== -1; )
    s.push(e.substring(0, r)), e = e.substring(r);
  return e && s.push(e), s;
}, Ws = (e, t, n, s) => {
  const { x: r, y: o, font: i, color: l, stroke: a, swidth: c, align: u, max: h, direction: p, blur: g, degree: x } = s;
  e.font = i || "32px sans-serif", e.fillStyle = l || "#000000", g && (e.filter = `blur(${g}px)`), e.textAlign = u || "center", e.strokeStyle = a, e.lineWidth = c;
  const T = h || t, I = sn(i), S = Ji(n, T, e);
  S.forEach((E, k) => {
    let F = 0;
    p === "down" ? F = k : p === "center" ? F = k - (S.length - 1) / 2 : F = k - (S.length - 1), e.save(), x ? (e.translate(r, o + F * I * Ot), e.rotate(x * Math.PI / 180), e.strokeText(E, 0, 0, T), e.fillText(E, 0, 0, T)) : (e.strokeText(E, r, o + F * I * Ot, T), e.fillText(E, r, o + F * I * Ot, T)), e.restore();
  });
}, Tf = (e, t, n, s) => {
  const { x: r, y: o, font: i, color: l, stroke: a, swidth: c, align: u, max: h, direction: p } = s;
  e.font = i || "32px sans-serif", e.fillStyle = l || "#000000", e.textAlign = u || "center", e.strokeStyle = a, e.lineWidth = c;
  const g = h || t, x = sn(i), T = Ji(n, g, e);
  T.forEach((I, S) => {
    let E = 0;
    p === "down" ? E = S : p === "center" ? E = S - (T.length - 1) / 2 : E = S - (T.length - 1), e.strokeText(I, r, o + E * x * Ot, g), e.fillText(I, r, o + E * x * Ot, g);
  });
}, Pf = (e) => {
  e.imageSmoothingEnabled = !1, e.lineCap = "round", e.beginPath(), e.strokeStyle = "#000000", e.arc(Ne * Ve / 2, Ne * Ve / 2, Ne * Ve / 2 - 1, 0, Math.PI * 2), e.stroke(), e.clip(), e.strokeStyle = "#D6D6D6", Rf.forEach((t) => {
    const { 0: n, 1: s, 2: r, 3: o } = t;
    e.moveTo(n, s), e.lineTo(r, o);
  }), e.stroke(), e.beginPath(), e.strokeStyle = "#FF0000", e.rect((Ne - 1) * Ve / 2, (Ne - 1) * Ve / 2, 1 * Ve, 1 * Ve), e.stroke();
}, _r = (e, t, n, s) => {
  t.style.left = `${n + xo}px`, t.style.top = `${s + xo}px`;
  const r = t.getContext("2d"), o = Math.min(Math.max(0, n - 5), e.width - Ne), i = Math.min(Math.max(0, s - 5), e.height - Ne);
  r.clearRect(0, 0, bo, wo), r.drawImage(e, o, i, Ne, Ne, 0, 0, bo, wo), Pf(r);
}, sn = (e) => {
  const t = e.match(/(\d{1,3})px/) || ["", "32"];
  return Number(t[1]);
}, br = (e) => {
  var s;
  return ((s = e.split(";base64,")[0].match(/[a-z]+$/g)) == null ? void 0 : s[0]) || "png";
}, Xi = (e, t, n) => {
  const r = `image/${["jpeg", "jpg"].includes(t) ? "jpeg" : "png"}`, o = e.toDataURL(r), i = document.createElement("a");
  i.setAttribute("download", n), i.setAttribute("href", o), i.setAttribute("target", "_blank"), i.click();
}, Sf = { class: "container" }, Of = { class: "container-header" }, Af = { class: "container-title" }, kf = {
  key: 0,
  class: "container-wall"
}, Mf = { class: "container-wraper" }, $f = ["width", "height"], If = {
  key: 0,
  class: "container-additional"
}, Ff = { class: "container-footer" }, bt = 20, Nf = /* @__PURE__ */ Pe({
  __name: "Container",
  props: {
    story: {},
    additional: {}
  },
  emits: ["change", "create", "replace", "update", "additional"],
  setup(e, { emit: t }) {
    const n = e, s = Mt(n).story, r = V(null), o = V(null), i = V(null), l = V(!0), a = V(!0);
    let c = null;
    const u = V(!1), h = V(!1), p = V(null), g = V("金馆长"), x = (v) => {
      g.value = v, H();
    };
    qe("text", g), qe("updateText", x);
    const T = V(0), I = V(0), S = (v, b) => {
      s.value.x = v, s.value.y = b;
    }, E = (v) => {
      const { max: b, size: y, color: _, align: R, direction: C, blur: $, degree: M, stroke: D, swidth: U } = v;
      s.value.max = b, s.value.font = `${y}px sans-serif`, s.value.color = _, s.value.stroke = D, s.value.swidth = U, s.value.align = R, s.value.direction = C, s.value.blur = $, s.value.degree = M;
    }, k = te(() => sn(s.value.font)), F = te(() => br(s.value.image)), fe = te(() => `${s.value.title}.${F.value} ${T.value} * ${I.value} (${s.value.x}, ${s.value.y})`), de = te(() => {
      const v = s.value.max || T.value;
      return {
        start: 0,
        center: Math.floor(v / 2),
        end: v
      }[s.value.align];
    }), ae = new Image(), pe = () => {
      ae.onload = async () => {
        const v = r.value;
        v.width = ae.naturalWidth, v.height = ae.naturalHeight, T.value = v.width, I.value = v.height, be(), H(), Q();
      }, ae.onerror = (v) => {
        console.error(v);
      }, ae.src = s.value.image;
    }, be = () => {
      const v = o.value;
      v.style.width = `${T.value}px`, v.style.height = `${I.value}px`;
    }, H = () => {
      const v = r.value, b = v.getContext("2d");
      b.drawImage(ae, 0, 0);
      let y = g.value;
      s.value.senior === 2 && (y += m.value.text), Ws(b, v.width, y, s.value);
    }, Q = () => {
      const { x: v, y: b, max: y } = s.value, _ = i.value;
      _.style.width = `${y}px`, _.style.height = `${k.value * Ot}px`, _.style.top = `${b - k.value + 2}px`, _.style.left = `${v - de.value}px`;
    };
    St(s, (v, b) => {
      v.mid !== b.mid ? pe() : (H(), Q());
    }, { deep: !0 });
    let J = 0, ue = 0, _e = !1;
    const De = (v) => {
      _e = !0;
      const { clientX: b, clientY: y } = v;
      J = b, ue = y;
    }, ce = (v) => {
      if (!_e)
        return;
      const { clientX: b, clientY: y } = v, _ = i.value, { width: R, height: C } = _.getBoundingClientRect();
      let $ = _.offsetLeft + b - J, M = _.offsetTop + y - ue;
      $ < -bt || M < -bt || $ > T.value - R + bt || M > I.value - C + bt ? _e = !1 : (J = b, ue = y), $ = Math.max(Math.min($, T.value - R + bt), -bt), M = Math.max(Math.min(M, I.value - C + bt), -bt), $ += de.value, M += k.value - 2, S($, M);
    }, ne = () => {
      _e && (_e = !1);
    }, Z = () => {
      l.value ? l.value = !1 : (l.value = !0, a.value = !0, c ? (Ue(c), c = null) : pe());
    }, Ie = () => {
      c && (Ue(c), c = null);
    }, Le = () => {
      const v = r.value, b = `imeme_${s.value.title}_${g.value}`;
      Xi(v, F.value, b);
    }, Ae = () => {
      l.value ? t("change", s.value) : a.value || (t("create", s.value, Ie), l.value = !0, a.value = !0);
    }, ve = ({ name: v, base64: b }) => {
      a.value = !1;
      const {
        mid: y,
        title: _,
        feature: R,
        image: C,
        x: $,
        y: M,
        max: D,
        font: U,
        color: z,
        align: G,
        direction: ee,
        senior: me,
        blur: ke,
        degree: vt,
        stroke: Nn,
        swidth: It
      } = s.value;
      c = {
        mid: y,
        title: _,
        feature: R,
        image: C,
        x: $,
        y: M,
        max: D,
        font: U,
        color: z,
        align: G,
        direction: ee,
        senior: me,
        blur: ke,
        degree: vt,
        stroke: Nn,
        swidth: It
      };
      const fn = v.slice(0, v.lastIndexOf("."));
      Ue({
        mid: `meme_${(/* @__PURE__ */ new Date()).getTime()}`,
        title: fn,
        feature: fn,
        image: b,
        x: 60,
        y: 60,
        max: 100,
        font: "32px sans-serif",
        color: "#FF0000",
        stroke: "transparent",
        swidth: 1,
        align: "start",
        direction: "down",
        blur: 0,
        degree: 0,
        senior: 0
      });
    }, Ue = (v) => {
      t("replace", v);
    }, Ke = () => {
      u.value = !0;
    }, nt = (v, b) => {
      const y = r.value, _ = p.value;
      _r(y, _, v, b);
    }, ye = async (v) => {
      if (!u.value)
        return !1;
      const { offsetX: b, offsetY: y } = v;
      b < 0 || y < 0 || (h.value = !0, nt(b, y));
    }, O = () => {
      if (!u.value)
        return !1;
      h.value = !1;
    }, L = (v) => {
      const b = ($) => $.toString(16).padStart(2, "0"), { 0: y, 1: _, 2: R, 3: C } = v.data;
      return `#${b(y)}${b(_)}${b(R)}${b(C)}`.toUpperCase();
    }, N = (v, b) => {
      const R = r.value.getContext("2d").getImageData(v, b, 1, 1);
      return L(R);
    }, j = (v) => {
      if (!u.value)
        return !1;
      const { offsetX: b, offsetY: y } = v;
      if (b < 0 || y < 0)
        return;
      const _ = N(b, y);
      s.value.color = _, h.value = !1, u.value = !1;
    }, Y = Ki(), d = te(() => Y.path === "/edit"), f = (v) => {
      v !== s.value.title && (s.value.title = v, t("update", s.value));
    }, m = Mt(n).additional, w = (v) => {
      v !== m.value.text && (m.value.text = v, H(), t("additional", m.value));
    };
    return an(() => {
      pe();
    }), (v, b) => (W(), ie("div", Sf, [
      X("div", Of, [
        X("div", Af, [
          d.value ? (W(), Je(P(we), {
            key: 0,
            class: "container-title-label",
            value: P(s).title,
            "onUpdate:modelValue": b[0] || (b[0] = (y) => f(y))
          }, null, 8, ["value"])) : (W(), ie(Re, { key: 1 }, [
            hs(At(fe.value), 1)
          ], 64))
        ]),
        B(P(ut), {
          label: l.value ? "添加" : "取消添加",
          u: "primary",
          onClick: Z
        }, null, 8, ["label"]),
        B(P(ut), {
          label: "下载",
          u: "primary",
          onClick: Le
        })
      ]),
      !l.value && a.value ? (W(), ie("div", kf, [
        B(P(Vi), { onChange: ve })
      ])) : (W(), ie(Re, { key: 1 }, [
        X("div", Mf, [
          X("canvas", {
            ref_key: "canvasRef",
            ref: r,
            class: pt({
              "container-canvas": !0,
              "container-pointer": u.value
            }),
            onMousemove: ye,
            onMouseleave: O,
            onClick: j
          }, null, 34),
          Gt(X("div", {
            class: "container-area",
            ref_key: "areaRef",
            ref: o,
            onMousemove: ce,
            onMouseup: ne
          }, [
            X("div", {
              class: "container-drag",
              ref_key: "dragRef",
              ref: i,
              onMousedown: De
            }, null, 544)
          ], 544), [
            [en, !u.value]
          ]),
          Gt(X("canvas", {
            ref_key: "layerRef",
            ref: p,
            class: "container-layer",
            style: rn({
              borderRadius: `${P(ft)}px`
            }),
            width: P(ft),
            height: P(ft)
          }, null, 12, $f), [
            [en, u.value && h.value]
          ])
        ]),
        B(qi, {
          max: P(s).max,
          color: P(s).color,
          stroke: P(s).stroke,
          swidth: P(s).swidth,
          size: k.value,
          align: P(s).align,
          direction: P(s).direction,
          blur: P(s).blur,
          degree: P(s).degree,
          onChange: E,
          onPick: Ke
        }, null, 8, ["max", "color", "stroke", "swidth", "size", "align", "direction", "blur", "degree"]),
        P(s).senior === 2 && d.value ? (W(), ie("div", If, [
          B(P(we), {
            class: "container-additional-label",
            value: P(m).text,
            "onUpdate:modelValue": b[1] || (b[1] = (y) => w(y))
          }, null, 8, ["value"])
        ])) : xn("", !0)
      ], 64)),
      X("footer", Ff, [
        B(P(ut), {
          label: l.value ? "更新" : "确认",
          u: "primary",
          onClick: Ae
        }, null, 8, ["label"])
      ])
    ]));
  }
});
const Df = { class: "feature-property" }, Lf = /* @__PURE__ */ Pe({
  __name: "FeatureProperty",
  props: {
    width: {},
    height: {},
    ipath: {}
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = e, s = Ce("text"), r = Ce("updateText"), o = Ce("paths"), { width: i, height: l, ipath: a } = Mt(n), c = (u, h) => {
      const p = {
        width: i.value,
        height: l.value,
        ipath: a.value
      };
      p[h] = ["ipath"].includes(h) ? u : parseInt(u), t("change", p);
    };
    return (u, h) => (W(), ie("div", Df, [
      B(P(we), {
        class: "feature-property-size",
        value: P(i),
        "onUpdate:modelValue": h[0] || (h[0] = (p) => c(p, "width"))
      }, null, 8, ["value"]),
      B(P(we), {
        class: "feature-property-size",
        value: P(l),
        "onUpdate:modelValue": h[1] || (h[1] = (p) => c(p, "height"))
      }, null, 8, ["value"]),
      B(P(gf), {
        class: "feature-property-path",
        options: P(o),
        selected: P(a),
        "onUpdate:modelValue": h[2] || (h[2] = (p) => c(p, "ipath"))
      }, null, 8, ["options", "selected"]),
      B(P(we), {
        class: "feature-property-text",
        value: P(s),
        "onUpdate:modelValue": P(r)
      }, null, 8, ["value", "onUpdate:modelValue"])
    ]));
  }
});
const Eo = {
  getCatalog: {
    url: "/image/catalog",
    method: "get"
  },
  openImage: {
    url: "/image/open",
    method: "get"
  },
  saveImage: {
    url: "/image/save",
    method: "post"
  },
  createImage: {
    url: "/image/create",
    method: "post"
  },
  updateImage: {
    url: "/image/update",
    method: "post"
  },
  getConfig: {
    url: "/image/config",
    method: "get"
  },
  getFeatureImage: {
    url: "/image/feature/open",
    method: "get"
  },
  saveFeatureImage: {
    url: "/image/feature/save",
    method: "post"
  },
  getMaterialBase64: {
    url: "/material/base64",
    method: "get"
  },
  getMaterialCatalog: {
    url: "/material/catalog",
    method: "get"
  },
  getAdditional: {
    url: "/image/additional",
    method: "get"
  },
  updateAdditional: {
    url: "/image/additional/update",
    method: "post"
  },
  openGif: {
    url: "/image/gif/open",
    method: "get"
  },
  saveGifImage: {
    url: "/image/gif/save",
    method: "post"
  },
  createGifImage: {
    url: "/image/gif/create",
    method: "post"
  },
  updateGifImage: {
    url: "/image/gif/update",
    method: "post"
  }
};
function Yi(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Gi } = Object.prototype, { getPrototypeOf: wr } = Object, xr = ((e) => (t) => {
  const n = Gi.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), gt = (e) => (e = e.toLowerCase(), (t) => xr(t) === e), gs = (e) => (t) => typeof t === e, { isArray: In } = Array, qs = gs("undefined");
function Uf(e) {
  return e !== null && !qs(e) && e.constructor !== null && !qs(e.constructor) && cn(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Qi = gt("ArrayBuffer");
function Bf(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Qi(e.buffer), t;
}
const jf = gs("string"), cn = gs("function"), Zi = gs("number"), el = (e) => e !== null && typeof e == "object", Hf = (e) => e === !0 || e === !1, Vn = (e) => {
  if (xr(e) !== "object")
    return !1;
  const t = wr(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, zf = gt("Date"), Kf = gt("File"), Vf = gt("Blob"), Wf = gt("FileList"), qf = (e) => el(e) && cn(e.pipe), Jf = (e) => {
  const t = "[object FormData]";
  return e && (typeof FormData == "function" && e instanceof FormData || Gi.call(e) === t || cn(e.toString) && e.toString() === t);
}, Xf = gt("URLSearchParams"), Yf = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function vs(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let s, r;
  if (typeof e != "object" && (e = [e]), In(e))
    for (s = 0, r = e.length; s < r; s++)
      t.call(null, e[s], s, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), i = o.length;
    let l;
    for (s = 0; s < i; s++)
      l = o[s], t.call(null, e[l], l, e);
  }
}
function Js() {
  const e = {}, t = (n, s) => {
    Vn(e[s]) && Vn(n) ? e[s] = Js(e[s], n) : Vn(n) ? e[s] = Js({}, n) : In(n) ? e[s] = n.slice() : e[s] = n;
  };
  for (let n = 0, s = arguments.length; n < s; n++)
    arguments[n] && vs(arguments[n], t);
  return e;
}
const Gf = (e, t, n, { allOwnKeys: s } = {}) => (vs(t, (r, o) => {
  n && cn(r) ? e[o] = Yi(r, n) : e[o] = r;
}, { allOwnKeys: s }), e), Qf = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Zf = (e, t, n, s) => {
  e.prototype = Object.create(t.prototype, s), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, ed = (e, t, n, s) => {
  let r, o, i;
  const l = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (r = Object.getOwnPropertyNames(e), o = r.length; o-- > 0; )
      i = r[o], (!s || s(i, e, t)) && !l[i] && (t[i] = e[i], l[i] = !0);
    e = n !== !1 && wr(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, td = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const s = e.indexOf(t, n);
  return s !== -1 && s === n;
}, nd = (e) => {
  if (!e)
    return null;
  if (In(e))
    return e;
  let t = e.length;
  if (!Zi(t))
    return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, sd = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && wr(Uint8Array)), rd = (e, t) => {
  const s = (e && e[Symbol.iterator]).call(e);
  let r;
  for (; (r = s.next()) && !r.done; ) {
    const o = r.value;
    t.call(e, o[0], o[1]);
  }
}, od = (e, t) => {
  let n;
  const s = [];
  for (; (n = e.exec(t)) !== null; )
    s.push(n);
  return s;
}, id = gt("HTMLFormElement"), ld = (e) => e.toLowerCase().replace(
  /[_-\s]([a-z\d])(\w*)/g,
  function(n, s, r) {
    return s.toUpperCase() + r;
  }
), Ro = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), ad = gt("RegExp"), tl = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), s = {};
  vs(n, (r, o) => {
    t(r, o, e) !== !1 && (s[o] = r);
  }), Object.defineProperties(e, s);
}, cd = (e) => {
  tl(e, (t, n) => {
    const s = e[n];
    if (cn(s)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not read-only method '" + n + "'");
      });
    }
  });
}, ud = (e, t) => {
  const n = {}, s = (r) => {
    r.forEach((o) => {
      n[o] = !0;
    });
  };
  return In(e) ? s(e) : s(String(e).split(t)), n;
}, fd = () => {
}, dd = (e, t) => (e = +e, Number.isFinite(e) ? e : t), A = {
  isArray: In,
  isArrayBuffer: Qi,
  isBuffer: Uf,
  isFormData: Jf,
  isArrayBufferView: Bf,
  isString: jf,
  isNumber: Zi,
  isBoolean: Hf,
  isObject: el,
  isPlainObject: Vn,
  isUndefined: qs,
  isDate: zf,
  isFile: Kf,
  isBlob: Vf,
  isRegExp: ad,
  isFunction: cn,
  isStream: qf,
  isURLSearchParams: Xf,
  isTypedArray: sd,
  isFileList: Wf,
  forEach: vs,
  merge: Js,
  extend: Gf,
  trim: Yf,
  stripBOM: Qf,
  inherits: Zf,
  toFlatObject: ed,
  kindOf: xr,
  kindOfTest: gt,
  endsWith: td,
  toArray: nd,
  forEachEntry: rd,
  matchAll: od,
  isHTMLForm: id,
  hasOwnProperty: Ro,
  hasOwnProp: Ro,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: tl,
  freezeMethods: cd,
  toObjectSet: ud,
  toCamelCase: ld,
  noop: fd,
  toFiniteNumber: dd
};
function re(e, t, n, s, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), s && (this.request = s), r && (this.response = r);
}
A.inherits(re, Error, {
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
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const nl = re.prototype, sl = {};
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
  sl[e] = { value: e };
});
Object.defineProperties(re, sl);
Object.defineProperty(nl, "isAxiosError", { value: !0 });
re.from = (e, t, n, s, r, o) => {
  const i = Object.create(nl);
  return A.toFlatObject(e, i, function(a) {
    return a !== Error.prototype;
  }, (l) => l !== "isAxiosError"), re.call(i, e.message, t, n, s, r), i.cause = e, i.name = e.name, o && Object.assign(i, o), i;
};
function hd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var pd = typeof self == "object" ? self.FormData : window.FormData;
const md = /* @__PURE__ */ hd(pd);
function Xs(e) {
  return A.isPlainObject(e) || A.isArray(e);
}
function rl(e) {
  return A.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Co(e, t, n) {
  return e ? e.concat(t).map(function(r, o) {
    return r = rl(r), !n && o ? "[" + r + "]" : r;
  }).join(n ? "." : "") : t;
}
function gd(e) {
  return A.isArray(e) && !e.some(Xs);
}
const vd = A.toFlatObject(A, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function yd(e) {
  return e && A.isFunction(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator];
}
function ys(e, t, n) {
  if (!A.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new (md || FormData)(), n = A.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(T, I) {
    return !A.isUndefined(I[T]);
  });
  const s = n.metaTokens, r = n.visitor || u, o = n.dots, i = n.indexes, a = (n.Blob || typeof Blob < "u" && Blob) && yd(t);
  if (!A.isFunction(r))
    throw new TypeError("visitor must be a function");
  function c(x) {
    if (x === null)
      return "";
    if (A.isDate(x))
      return x.toISOString();
    if (!a && A.isBlob(x))
      throw new re("Blob is not supported. Use a Buffer instead.");
    return A.isArrayBuffer(x) || A.isTypedArray(x) ? a && typeof Blob == "function" ? new Blob([x]) : Buffer.from(x) : x;
  }
  function u(x, T, I) {
    let S = x;
    if (x && !I && typeof x == "object") {
      if (A.endsWith(T, "{}"))
        T = s ? T : T.slice(0, -2), x = JSON.stringify(x);
      else if (A.isArray(x) && gd(x) || A.isFileList(x) || A.endsWith(T, "[]") && (S = A.toArray(x)))
        return T = rl(T), S.forEach(function(k, F) {
          !(A.isUndefined(k) || k === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? Co([T], F, o) : i === null ? T : T + "[]",
            c(k)
          );
        }), !1;
    }
    return Xs(x) ? !0 : (t.append(Co(I, T, o), c(x)), !1);
  }
  const h = [], p = Object.assign(vd, {
    defaultVisitor: u,
    convertValue: c,
    isVisitable: Xs
  });
  function g(x, T) {
    if (!A.isUndefined(x)) {
      if (h.indexOf(x) !== -1)
        throw Error("Circular reference detected in " + T.join("."));
      h.push(x), A.forEach(x, function(S, E) {
        (!(A.isUndefined(S) || S === null) && r.call(
          t,
          S,
          A.isString(E) ? E.trim() : E,
          T,
          p
        )) === !0 && g(S, T ? T.concat(E) : [E]);
      }), h.pop();
    }
  }
  if (!A.isObject(e))
    throw new TypeError("data must be an object");
  return g(e), t;
}
function To(e) {
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
function Er(e, t) {
  this._pairs = [], e && ys(e, this, t);
}
const ol = Er.prototype;
ol.append = function(t, n) {
  this._pairs.push([t, n]);
};
ol.toString = function(t) {
  const n = t ? function(s) {
    return t.call(this, s, To);
  } : To;
  return this._pairs.map(function(r) {
    return n(r[0]) + "=" + n(r[1]);
  }, "").join("&");
};
function _d(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function il(e, t, n) {
  if (!t)
    return e;
  const s = n && n.encode || _d, r = n && n.serialize;
  let o;
  if (r ? o = r(t, n) : o = A.isURLSearchParams(t) ? t.toString() : new Er(t, n).toString(s), o) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class Po {
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
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
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
    A.forEach(this.handlers, function(s) {
      s !== null && t(s);
    });
  }
}
const ll = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, bd = typeof URLSearchParams < "u" ? URLSearchParams : Er, wd = FormData, xd = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), dt = {
  isBrowser: !0,
  classes: {
    URLSearchParams: bd,
    FormData: wd,
    Blob
  },
  isStandardBrowserEnv: xd,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function Ed(e, t) {
  return ys(e, new dt.classes.URLSearchParams(), Object.assign({
    visitor: function(n, s, r, o) {
      return dt.isNode && A.isBuffer(n) ? (this.append(s, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function Rd(e) {
  return A.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Cd(e) {
  const t = {}, n = Object.keys(e);
  let s;
  const r = n.length;
  let o;
  for (s = 0; s < r; s++)
    o = n[s], t[o] = e[o];
  return t;
}
function al(e) {
  function t(n, s, r, o) {
    let i = n[o++];
    const l = Number.isFinite(+i), a = o >= n.length;
    return i = !i && A.isArray(r) ? r.length : i, a ? (A.hasOwnProp(r, i) ? r[i] = [r[i], s] : r[i] = s, !l) : ((!r[i] || !A.isObject(r[i])) && (r[i] = []), t(n, s, r[i], o) && A.isArray(r[i]) && (r[i] = Cd(r[i])), !l);
  }
  if (A.isFormData(e) && A.isFunction(e.entries)) {
    const n = {};
    return A.forEachEntry(e, (s, r) => {
      t(Rd(s), r, n, 0);
    }), n;
  }
  return null;
}
function Td(e, t, n) {
  const s = n.config.validateStatus;
  !n.status || !s || s(n.status) ? e(n) : t(new re(
    "Request failed with status code " + n.status,
    [re.ERR_BAD_REQUEST, re.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
const Pd = dt.isStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  function() {
    return {
      write: function(n, s, r, o, i, l) {
        const a = [];
        a.push(n + "=" + encodeURIComponent(s)), A.isNumber(r) && a.push("expires=" + new Date(r).toGMTString()), A.isString(o) && a.push("path=" + o), A.isString(i) && a.push("domain=" + i), l === !0 && a.push("secure"), document.cookie = a.join("; ");
      },
      read: function(n) {
        const s = document.cookie.match(new RegExp("(^|;\\s*)(" + n + ")=([^;]*)"));
        return s ? decodeURIComponent(s[3]) : null;
      },
      remove: function(n) {
        this.write(n, "", Date.now() - 864e5);
      }
    };
  }()
) : (
  // Non standard browser env (web workers, react-native) lack needed support.
  function() {
    return {
      write: function() {
      },
      read: function() {
        return null;
      },
      remove: function() {
      }
    };
  }()
);
function Sd(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Od(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function cl(e, t) {
  return e && !Sd(t) ? Od(e, t) : t;
}
const Ad = dt.isStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a");
    let s;
    function r(o) {
      let i = o;
      return t && (n.setAttribute("href", i), i = n.href), n.setAttribute("href", i), {
        href: n.href,
        protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
        host: n.host,
        search: n.search ? n.search.replace(/^\?/, "") : "",
        hash: n.hash ? n.hash.replace(/^#/, "") : "",
        hostname: n.hostname,
        port: n.port,
        pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
      };
    }
    return s = r(window.location.href), function(i) {
      const l = A.isString(i) ? r(i) : i;
      return l.protocol === s.protocol && l.host === s.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  function() {
    return function() {
      return !0;
    };
  }()
);
function Fn(e, t, n) {
  re.call(this, e ?? "canceled", re.ERR_CANCELED, t, n), this.name = "CanceledError";
}
A.inherits(Fn, re, {
  __CANCEL__: !0
});
function kd(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
const Md = A.toObjectSet([
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
]), $d = (e) => {
  const t = {};
  let n, s, r;
  return e && e.split(`
`).forEach(function(i) {
    r = i.indexOf(":"), n = i.substring(0, r).trim().toLowerCase(), s = i.substring(r + 1).trim(), !(!n || t[n] && Md[n]) && (n === "set-cookie" ? t[n] ? t[n].push(s) : t[n] = [s] : t[n] = t[n] ? t[n] + ", " + s : s);
  }), t;
}, So = Symbol("internals"), ul = Symbol("defaults");
function yn(e) {
  return e && String(e).trim().toLowerCase();
}
function Wn(e) {
  return e === !1 || e == null ? e : A.isArray(e) ? e.map(Wn) : String(e);
}
function Id(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = n.exec(e); )
    t[s[1]] = s[2];
  return t;
}
function Oo(e, t, n, s) {
  if (A.isFunction(s))
    return s.call(this, t, n);
  if (A.isString(t)) {
    if (A.isString(s))
      return t.indexOf(s) !== -1;
    if (A.isRegExp(s))
      return s.test(t);
  }
}
function Fd(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, s) => n.toUpperCase() + s);
}
function Nd(e, t) {
  const n = A.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(e, s + n, {
      value: function(r, o, i) {
        return this[s].call(this, t, r, o, i);
      },
      configurable: !0
    });
  });
}
function mn(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let s = n.length, r;
  for (; s-- > 0; )
    if (r = n[s], t === r.toLowerCase())
      return r;
  return null;
}
function Xe(e, t) {
  e && this.set(e), this[ul] = t || null;
}
Object.assign(Xe.prototype, {
  set: function(e, t, n) {
    const s = this;
    function r(o, i, l) {
      const a = yn(i);
      if (!a)
        throw new Error("header name must be a non-empty string");
      const c = mn(s, a);
      c && l !== !0 && (s[c] === !1 || l === !1) || (s[c || i] = Wn(o));
    }
    return A.isPlainObject(e) ? A.forEach(e, (o, i) => {
      r(o, i, t);
    }) : r(t, e, n), this;
  },
  get: function(e, t) {
    if (e = yn(e), !e)
      return;
    const n = mn(this, e);
    if (n) {
      const s = this[n];
      if (!t)
        return s;
      if (t === !0)
        return Id(s);
      if (A.isFunction(t))
        return t.call(this, s, n);
      if (A.isRegExp(t))
        return t.exec(s);
      throw new TypeError("parser must be boolean|regexp|function");
    }
  },
  has: function(e, t) {
    if (e = yn(e), e) {
      const n = mn(this, e);
      return !!(n && (!t || Oo(this, this[n], n, t)));
    }
    return !1;
  },
  delete: function(e, t) {
    const n = this;
    let s = !1;
    function r(o) {
      if (o = yn(o), o) {
        const i = mn(n, o);
        i && (!t || Oo(n, n[i], i, t)) && (delete n[i], s = !0);
      }
    }
    return A.isArray(e) ? e.forEach(r) : r(e), s;
  },
  clear: function() {
    return Object.keys(this).forEach(this.delete.bind(this));
  },
  normalize: function(e) {
    const t = this, n = {};
    return A.forEach(this, (s, r) => {
      const o = mn(n, r);
      if (o) {
        t[o] = Wn(s), delete t[r];
        return;
      }
      const i = e ? Fd(r) : String(r).trim();
      i !== r && delete t[r], t[i] = Wn(s), n[i] = !0;
    }), this;
  },
  toJSON: function(e) {
    const t = /* @__PURE__ */ Object.create(null);
    return A.forEach(
      Object.assign({}, this[ul] || null, this),
      (n, s) => {
        n == null || n === !1 || (t[s] = e && A.isArray(n) ? n.join(", ") : n);
      }
    ), t;
  }
});
Object.assign(Xe, {
  from: function(e) {
    return A.isString(e) ? new this($d(e)) : e instanceof this ? e : new this(e);
  },
  accessor: function(e) {
    const n = (this[So] = this[So] = {
      accessors: {}
    }).accessors, s = this.prototype;
    function r(o) {
      const i = yn(o);
      n[i] || (Nd(s, o), n[i] = !0);
    }
    return A.isArray(e) ? e.forEach(r) : r(e), this;
  }
});
Xe.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent"]);
A.freezeMethods(Xe.prototype);
A.freezeMethods(Xe);
function Dd(e, t) {
  e = e || 10;
  const n = new Array(e), s = new Array(e);
  let r = 0, o = 0, i;
  return t = t !== void 0 ? t : 1e3, function(a) {
    const c = Date.now(), u = s[o];
    i || (i = c), n[r] = a, s[r] = c;
    let h = o, p = 0;
    for (; h !== r; )
      p += n[h++], h = h % e;
    if (r = (r + 1) % e, r === o && (o = (o + 1) % e), c - i < t)
      return;
    const g = u && c - u;
    return g ? Math.round(p * 1e3 / g) : void 0;
  };
}
function Ao(e, t) {
  let n = 0;
  const s = Dd(50, 250);
  return (r) => {
    const o = r.loaded, i = r.lengthComputable ? r.total : void 0, l = o - n, a = s(l), c = o <= i;
    n = o;
    const u = {
      loaded: o,
      total: i,
      progress: i ? o / i : void 0,
      bytes: l,
      rate: a || void 0,
      estimated: a && i && c ? (i - o) / a : void 0
    };
    u[t ? "download" : "upload"] = !0, e(u);
  };
}
function ko(e) {
  return new Promise(function(n, s) {
    let r = e.data;
    const o = Xe.from(e.headers).normalize(), i = e.responseType;
    let l;
    function a() {
      e.cancelToken && e.cancelToken.unsubscribe(l), e.signal && e.signal.removeEventListener("abort", l);
    }
    A.isFormData(r) && dt.isStandardBrowserEnv && o.setContentType(!1);
    let c = new XMLHttpRequest();
    if (e.auth) {
      const g = e.auth.username || "", x = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      o.set("Authorization", "Basic " + btoa(g + ":" + x));
    }
    const u = cl(e.baseURL, e.url);
    c.open(e.method.toUpperCase(), il(u, e.params, e.paramsSerializer), !0), c.timeout = e.timeout;
    function h() {
      if (!c)
        return;
      const g = Xe.from(
        "getAllResponseHeaders" in c && c.getAllResponseHeaders()
      ), T = {
        data: !i || i === "text" || i === "json" ? c.responseText : c.response,
        status: c.status,
        statusText: c.statusText,
        headers: g,
        config: e,
        request: c
      };
      Td(function(S) {
        n(S), a();
      }, function(S) {
        s(S), a();
      }, T), c = null;
    }
    if ("onloadend" in c ? c.onloadend = h : c.onreadystatechange = function() {
      !c || c.readyState !== 4 || c.status === 0 && !(c.responseURL && c.responseURL.indexOf("file:") === 0) || setTimeout(h);
    }, c.onabort = function() {
      c && (s(new re("Request aborted", re.ECONNABORTED, e, c)), c = null);
    }, c.onerror = function() {
      s(new re("Network Error", re.ERR_NETWORK, e, c)), c = null;
    }, c.ontimeout = function() {
      let x = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const T = e.transitional || ll;
      e.timeoutErrorMessage && (x = e.timeoutErrorMessage), s(new re(
        x,
        T.clarifyTimeoutError ? re.ETIMEDOUT : re.ECONNABORTED,
        e,
        c
      )), c = null;
    }, dt.isStandardBrowserEnv) {
      const g = (e.withCredentials || Ad(u)) && e.xsrfCookieName && Pd.read(e.xsrfCookieName);
      g && o.set(e.xsrfHeaderName, g);
    }
    r === void 0 && o.setContentType(null), "setRequestHeader" in c && A.forEach(o.toJSON(), function(x, T) {
      c.setRequestHeader(T, x);
    }), A.isUndefined(e.withCredentials) || (c.withCredentials = !!e.withCredentials), i && i !== "json" && (c.responseType = e.responseType), typeof e.onDownloadProgress == "function" && c.addEventListener("progress", Ao(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && c.upload && c.upload.addEventListener("progress", Ao(e.onUploadProgress)), (e.cancelToken || e.signal) && (l = (g) => {
      c && (s(!g || g.type ? new Fn(null, e, c) : g), c.abort(), c = null);
    }, e.cancelToken && e.cancelToken.subscribe(l), e.signal && (e.signal.aborted ? l() : e.signal.addEventListener("abort", l)));
    const p = kd(u);
    if (p && dt.protocols.indexOf(p) === -1) {
      s(new re("Unsupported protocol " + p + ":", re.ERR_BAD_REQUEST, e));
      return;
    }
    c.send(r || null);
  });
}
const Mo = {
  http: ko,
  xhr: ko
}, $o = {
  getAdapter: (e) => {
    if (A.isString(e)) {
      const t = Mo[e];
      if (!e)
        throw Error(
          A.hasOwnProp(e) ? `Adapter '${e}' is not available in the build` : `Can not resolve adapter '${e}'`
        );
      return t;
    }
    if (!A.isFunction(e))
      throw new TypeError("adapter is not a function");
    return e;
  },
  adapters: Mo
}, Ld = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function Ud() {
  let e;
  return typeof XMLHttpRequest < "u" ? e = $o.getAdapter("xhr") : typeof process < "u" && A.kindOf(process) === "process" && (e = $o.getAdapter("http")), e;
}
function Bd(e, t, n) {
  if (A.isString(e))
    try {
      return (t || JSON.parse)(e), A.trim(e);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (n || JSON.stringify)(e);
}
const un = {
  transitional: ll,
  adapter: Ud(),
  transformRequest: [function(t, n) {
    const s = n.getContentType() || "", r = s.indexOf("application/json") > -1, o = A.isObject(t);
    if (o && A.isHTMLForm(t) && (t = new FormData(t)), A.isFormData(t))
      return r && r ? JSON.stringify(al(t)) : t;
    if (A.isArrayBuffer(t) || A.isBuffer(t) || A.isStream(t) || A.isFile(t) || A.isBlob(t))
      return t;
    if (A.isArrayBufferView(t))
      return t.buffer;
    if (A.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let l;
    if (o) {
      if (s.indexOf("application/x-www-form-urlencoded") > -1)
        return Ed(t, this.formSerializer).toString();
      if ((l = A.isFileList(t)) || s.indexOf("multipart/form-data") > -1) {
        const a = this.env && this.env.FormData;
        return ys(
          l ? { "files[]": t } : t,
          a && new a(),
          this.formSerializer
        );
      }
    }
    return o || r ? (n.setContentType("application/json", !1), Bd(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || un.transitional, s = n && n.forcedJSONParsing, r = this.responseType === "json";
    if (t && A.isString(t) && (s && !this.responseType || r)) {
      const i = !(n && n.silentJSONParsing) && r;
      try {
        return JSON.parse(t);
      } catch (l) {
        if (i)
          throw l.name === "SyntaxError" ? re.from(l, re.ERR_BAD_RESPONSE, this, null, this.response) : l;
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
    FormData: dt.classes.FormData,
    Blob: dt.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};
A.forEach(["delete", "get", "head"], function(t) {
  un.headers[t] = {};
});
A.forEach(["post", "put", "patch"], function(t) {
  un.headers[t] = A.merge(Ld);
});
function Os(e, t) {
  const n = this || un, s = t || n, r = Xe.from(s.headers);
  let o = s.data;
  return A.forEach(e, function(l) {
    o = l.call(n, o, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), o;
}
function fl(e) {
  return !!(e && e.__CANCEL__);
}
function As(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Fn();
}
function Io(e) {
  return As(e), e.headers = Xe.from(e.headers), e.data = Os.call(
    e,
    e.transformRequest
  ), (e.adapter || un.adapter)(e).then(function(s) {
    return As(e), s.data = Os.call(
      e,
      e.transformResponse,
      s
    ), s.headers = Xe.from(s.headers), s;
  }, function(s) {
    return fl(s) || (As(e), s && s.response && (s.response.data = Os.call(
      e,
      e.transformResponse,
      s.response
    ), s.response.headers = Xe.from(s.response.headers))), Promise.reject(s);
  });
}
function Mn(e, t) {
  t = t || {};
  const n = {};
  function s(c, u) {
    return A.isPlainObject(c) && A.isPlainObject(u) ? A.merge(c, u) : A.isPlainObject(u) ? A.merge({}, u) : A.isArray(u) ? u.slice() : u;
  }
  function r(c) {
    if (A.isUndefined(t[c])) {
      if (!A.isUndefined(e[c]))
        return s(void 0, e[c]);
    } else
      return s(e[c], t[c]);
  }
  function o(c) {
    if (!A.isUndefined(t[c]))
      return s(void 0, t[c]);
  }
  function i(c) {
    if (A.isUndefined(t[c])) {
      if (!A.isUndefined(e[c]))
        return s(void 0, e[c]);
    } else
      return s(void 0, t[c]);
  }
  function l(c) {
    if (c in t)
      return s(e[c], t[c]);
    if (c in e)
      return s(void 0, e[c]);
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
    validateStatus: l
  };
  return A.forEach(Object.keys(e).concat(Object.keys(t)), function(u) {
    const h = a[u] || r, p = h(u);
    A.isUndefined(p) && h !== l || (n[u] = p);
  }), n;
}
const dl = "1.1.3", Rr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Rr[e] = function(s) {
    return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Fo = {};
Rr.transitional = function(t, n, s) {
  function r(o, i) {
    return "[Axios v" + dl + "] Transitional option '" + o + "'" + i + (s ? ". " + s : "");
  }
  return (o, i, l) => {
    if (t === !1)
      throw new re(
        r(i, " has been removed" + (n ? " in " + n : "")),
        re.ERR_DEPRECATED
      );
    return n && !Fo[i] && (Fo[i] = !0, console.warn(
      r(
        i,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(o, i, l) : !0;
  };
};
function jd(e, t, n) {
  if (typeof e != "object")
    throw new re("options must be an object", re.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(e);
  let r = s.length;
  for (; r-- > 0; ) {
    const o = s[r], i = t[o];
    if (i) {
      const l = e[o], a = l === void 0 || i(l, o, e);
      if (a !== !0)
        throw new re("option " + o + " must be " + a, re.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new re("Unknown option " + o, re.ERR_BAD_OPTION);
  }
}
const Ys = {
  assertOptions: jd,
  validators: Rr
}, wt = Ys.validators;
class Ht {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Po(),
      response: new Po()
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
  request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Mn(this.defaults, n);
    const { transitional: s, paramsSerializer: r } = n;
    s !== void 0 && Ys.assertOptions(s, {
      silentJSONParsing: wt.transitional(wt.boolean),
      forcedJSONParsing: wt.transitional(wt.boolean),
      clarifyTimeoutError: wt.transitional(wt.boolean)
    }, !1), r !== void 0 && Ys.assertOptions(r, {
      encode: wt.function,
      serialize: wt.function
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    const o = n.headers && A.merge(
      n.headers.common,
      n.headers[n.method]
    );
    o && A.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      function(x) {
        delete n.headers[x];
      }
    ), n.headers = new Xe(n.headers, o);
    const i = [];
    let l = !0;
    this.interceptors.request.forEach(function(x) {
      typeof x.runWhen == "function" && x.runWhen(n) === !1 || (l = l && x.synchronous, i.unshift(x.fulfilled, x.rejected));
    });
    const a = [];
    this.interceptors.response.forEach(function(x) {
      a.push(x.fulfilled, x.rejected);
    });
    let c, u = 0, h;
    if (!l) {
      const g = [Io.bind(this), void 0];
      for (g.unshift.apply(g, i), g.push.apply(g, a), h = g.length, c = Promise.resolve(n); u < h; )
        c = c.then(g[u++], g[u++]);
      return c;
    }
    h = i.length;
    let p = n;
    for (u = 0; u < h; ) {
      const g = i[u++], x = i[u++];
      try {
        p = g(p);
      } catch (T) {
        x.call(this, T);
        break;
      }
    }
    try {
      c = Io.call(this, p);
    } catch (g) {
      return Promise.reject(g);
    }
    for (u = 0, h = a.length; u < h; )
      c = c.then(a[u++], a[u++]);
    return c;
  }
  getUri(t) {
    t = Mn(this.defaults, t);
    const n = cl(t.baseURL, t.url);
    return il(n, t.params, t.paramsSerializer);
  }
}
A.forEach(["delete", "get", "head", "options"], function(t) {
  Ht.prototype[t] = function(n, s) {
    return this.request(Mn(s || {}, {
      method: t,
      url: n,
      data: (s || {}).data
    }));
  };
});
A.forEach(["post", "put", "patch"], function(t) {
  function n(s) {
    return function(o, i, l) {
      return this.request(Mn(l || {}, {
        method: t,
        headers: s ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: i
      }));
    };
  }
  Ht.prototype[t] = n(), Ht.prototype[t + "Form"] = n(!0);
});
class Cr {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(o) {
      n = o;
    });
    const s = this;
    this.promise.then((r) => {
      if (!s._listeners)
        return;
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
      s.reason || (s.reason = new Fn(o, i, l), n(s.reason));
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
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new Cr(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
}
function Hd(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function zd(e) {
  return A.isObject(e) && e.isAxiosError === !0;
}
function hl(e) {
  const t = new Ht(e), n = Yi(Ht.prototype.request, t);
  return A.extend(n, Ht.prototype, t, { allOwnKeys: !0 }), A.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(r) {
    return hl(Mn(e, r));
  }, n;
}
const He = hl(un);
He.Axios = Ht;
He.CanceledError = Fn;
He.CancelToken = Cr;
He.isCancel = fl;
He.VERSION = dl;
He.toFormData = ys;
He.AxiosError = re;
He.Cancel = He.CanceledError;
He.all = function(t) {
  return Promise.all(t);
};
He.spread = Hd;
He.isAxiosError = zd;
He.formToJSON = (e) => al(A.isHTMLForm(e) ? new FormData(e) : e);
let pl = "";
const Kd = () => pl, Vd = (e) => {
  pl = e;
}, Wd = (e) => async (t = {}, n = {}) => {
  const { url: s, method: r } = e, o = Kd();
  return He.request({
    withCredentials: !1,
    url: o + s,
    method: r,
    [r === "get" ? "params" : "data"]: t
  }).then((i) => {
    const l = i.data;
    return n != null && n.stream ? i : l.errNo === 0 ? l.data : Promise.reject(l);
  }).catch((i) => Promise.reject(i));
}, Ee = {};
for (const e in Eo)
  Ee[e] = Wd(Eo[e]);
const ns = {
  COMMAND: "COMMAND",
  TEXT: "TEXT",
  IMAGE: "IMAGE",
  REPEAT: "REPEAT"
}, qd = { class: "container" }, Jd = { class: "container-header" }, Xd = { class: "container-title" }, Yd = ["onMousedown"], Gd = ["width", "height"], Qd = { class: "container-footer" }, Zd = "金馆长", xt = 20, eh = /* @__PURE__ */ Pe({
  __name: "FeatureContainer",
  props: {
    feature: {}
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const s = Mt(e).feature, r = V(null), o = V(null), i = V(null), l = V(!1), a = V(!1), c = V(null), u = V("金馆长"), h = V(""), p = (y) => {
      u.value = y, T.value ? J() : Ee.getMaterialBase64({
        ipath: F.value.ipath,
        value: y
      }).then((_) => {
        h.value = _, _ ? pe.src = _ : J();
      });
    };
    qe("text", u), qe("updateText", p);
    const g = V(0), x = V(0), T = te(() => [ns.TEXT, ns.REPEAT].includes(s.value.type)), I = te(() => {
      var y;
      return T.value ? sn((y = s.value.et) == null ? void 0 : y.font) : 0;
    }), S = te(() => br(s.value.story.image)), E = te(() => {
      const y = T.value ? k.value : F.value;
      return `${s.value.story.title}.${S.value} ${g.value} * ${x.value} (${y.x}, ${y.y})`;
    }), k = te(() => s.value.et), F = te(() => s.value.ei), fe = te(() => {
      if (T.value) {
        const y = k.value.max || g.value;
        return {
          start: 0,
          center: Math.floor(y / 2),
          end: y
        }[k.value.align];
      }
      return 0;
    }), de = te(() => {
      const { font: y, color: _, direction: R, blur: C, degree: $, stroke: M, swidth: D } = s.value.story, { x: U, y: z, width: G } = F.value;
      return {
        x: U + G / 2,
        y: z + sn(y),
        max: G,
        font: y,
        color: _,
        align: "center",
        direction: R,
        blur: C,
        degree: $,
        stroke: M,
        swidth: D
      };
    }), ae = (y) => {
      const { max: _, size: R, color: C, align: $, direction: M, blur: D, degree: U, stroke: z, swidth: G } = y;
      s.value.et.max = _, s.value.et.font = `${R}px sans-serif`, s.value.et.color = C, s.value.et.align = $, s.value.et.direction = M, s.value.et.blur = D, s.value.et.degree = U, s.value.et.stroke = z, s.value.et.swidth = G;
    }, pe = new Image();
    pe.onerror = (y) => {
      console.error(y);
    }, pe.onload = () => {
      J();
    };
    const be = new Image(), H = () => {
      be.onload = async () => {
        const y = r.value;
        y.width = be.naturalWidth, y.height = be.naturalHeight, g.value = y.width, x.value = y.height, Q(), J(), ue();
      }, be.onerror = (y) => {
        console.error(y);
      }, be.src = s.value.story.image;
    }, Q = () => {
      const y = o.value;
      y.style.width = `${g.value}px`, y.style.height = `${x.value}px`;
    }, J = () => {
      const y = r.value, _ = y.getContext("2d");
      if (_.drawImage(be, 0, 0), _.save(), Ws(_, y.width, Zd, s.value.story), T.value || !T.value && !h.value) {
        const R = T.value ? k.value : de.value;
        _.restore(), Ws(_, y.width, u.value, R);
      } else {
        const { x: R, y: C, width: $, height: M } = F.value;
        _.drawImage(pe, R, C, $, M);
      }
    }, ue = () => {
      let y = 0, _ = 0, R = 0, C = 0;
      if (T.value) {
        const { x: M, y: D, max: U } = k.value;
        y = U, _ = I.value * Ot, R = D - I.value + 2, C = M - fe.value;
      } else {
        const { x: M, y: D, width: U, height: z } = F.value;
        y = U, _ = z, R = D, C = M;
      }
      const $ = i.value;
      $.style.width = `${y}px`, $.style.height = `${_}px`, $.style.top = `${R}px`, $.style.left = `${C}px`;
    };
    St(s, (y, _) => {
      y.mid !== _.mid ? H() : (J(), ue());
    }, { deep: !0 });
    let _e = 0, De = 0, ce = !1;
    const ne = (y) => {
      ce = !0;
      const { clientX: _, clientY: R } = y;
      _e = _, De = R;
    }, Z = (y) => {
      if (!ce)
        return;
      const { clientX: _, clientY: R } = y, C = i.value, { width: $, height: M } = C.getBoundingClientRect();
      let D = C.offsetLeft + _ - _e, U = C.offsetTop + R - De;
      D < -xt || U < -xt || D > g.value - $ + xt || U > x.value - M + xt ? ce = !1 : (_e = _, De = R), D = Math.max(Math.min(D, g.value - $ + xt), -xt), U = Math.max(Math.min(U, x.value - M + xt), -xt), Ie(D, U);
    }, Ie = (y, _) => {
      T.value ? (k.value.x = y + fe.value, k.value.y = _ + I.value - 2) : (F.value.x = y, F.value.y = _);
    }, Le = () => {
      ce && (ce = !1);
    }, Ae = () => {
      const y = r.value, _ = `imeme_${s.value.story.title}_${u.value}`;
      Xi(y, S.value, _);
    }, ve = () => {
      const { mid: y, type: _, et: R, ei: C } = s.value;
      t("change", {
        mid: y,
        type: _,
        options: T.value ? R : C
      });
    }, Ue = () => {
      l.value = !0;
    }, Ke = (y, _) => {
      const R = r.value, C = c.value;
      _r(R, C, y, _);
    }, nt = async (y) => {
      if (!l.value)
        return !1;
      const { offsetX: _, offsetY: R } = y;
      _ < 0 || R < 0 || (a.value = !0, Ke(_, R));
    }, ye = () => {
      if (!l.value)
        return !1;
      a.value = !1;
    }, O = (y) => {
      const _ = (D) => D.toString(16).padStart(2, "0"), { 0: R, 1: C, 2: $, 3: M } = y.data;
      return `#${_(R)}${_(C)}${_($)}${_(M)}`.toUpperCase();
    }, L = (y, _) => {
      const $ = r.value.getContext("2d").getImageData(y, _, 1, 1);
      return O($);
    }, N = (y) => {
      if (!l.value)
        return !1;
      const { offsetX: _, offsetY: R } = y;
      if (_ < 0 || R < 0)
        return;
      const C = L(_, R);
      s.value.et.color = C, a.value = !1, l.value = !1;
    }, j = V(null);
    let Y = 0, d = 0, f = !1;
    const m = (y) => {
      f = !0;
      const { clientX: _, clientY: R } = y;
      Y = _, d = R;
    }, w = (y) => {
      if (!f)
        return;
      const { clientX: _, clientY: R } = y, C = o.value, { x: $, y: M, width: D, height: U } = C.getBoundingClientRect();
      if (_ < $ || R < M || _ > $ + D || R > M + U) {
        f = !1;
        return;
      }
      const z = _ - Y, G = R - d, { width: ee, height: me } = F.value, ke = i.value;
      ke.style.width = `${ee + z}px`, ke.style.height = `${me + G}px`;
    }, v = (y) => {
      if (!f)
        return;
      f = !1;
      const { clientX: _, clientY: R } = y, C = _ - Y, $ = R - d, { width: M, height: D } = F.value;
      F.value.width = M + C, F.value.height = D + $;
    }, b = (y) => {
      const { width: _, height: R, ipath: C } = y;
      s.value.ei.width = _, s.value.ei.height = R, s.value.ei.ipath = C;
    };
    return an(() => {
      H();
    }), (y, _) => (W(), ie("div", qd, [
      X("div", Jd, [
        X("div", Xd, At(E.value), 1),
        B(P(ut), {
          label: "下载",
          u: "primary",
          onClick: Ae
        })
      ]),
      X("div", {
        class: "container-wraper",
        onMousemove: w,
        onMouseup: v
      }, [
        X("canvas", {
          ref_key: "canvasRef",
          ref: r,
          class: pt({
            "container-canvas": !0,
            "container-pointer": l.value
          }),
          onMousemove: nt,
          onMouseleave: ye,
          onClick: N
        }, null, 34),
        Gt(X("div", {
          class: "container-area",
          ref_key: "areaRef",
          ref: o,
          onMousemove: Z,
          onMouseup: Le
        }, [
          X("div", {
            class: "container-drag",
            ref_key: "dragRef",
            ref: i,
            onMousedown: ne
          }, [
            T.value ? xn("", !0) : (W(), ie("div", {
              key: 0,
              ref_key: "cornerRef",
              ref: j,
              class: "container-drag-corner",
              onMousedown: Lc(m, ["stop", "prevent"])
            }, null, 40, Yd))
          ], 544)
        ], 544), [
          [en, !l.value]
        ]),
        Gt(X("canvas", {
          ref_key: "layerRef",
          ref: c,
          class: "container-layer",
          style: rn({
            borderRadius: `${P(ft)}px`
          }),
          width: P(ft),
          height: P(ft)
        }, null, 12, Gd), [
          [en, l.value && a.value]
        ])
      ], 32),
      T.value ? (W(), Je(qi, {
        key: 0,
        max: k.value.max,
        color: k.value.color,
        size: I.value,
        align: k.value.align,
        direction: k.value.direction,
        blur: k.value.blur,
        degree: k.value.degree,
        stroke: k.value.stroke,
        swidth: k.value.swidth,
        onChange: ae,
        onPick: Ue
      }, null, 8, ["max", "color", "size", "align", "direction", "blur", "degree", "stroke", "swidth"])) : (W(), Je(Lf, {
        key: 1,
        width: F.value.width,
        height: F.value.height,
        ipath: F.value.ipath,
        onChange: b
      }, null, 8, ["width", "height", "ipath"])),
      X("footer", Qd, [
        B(P(ut), {
          label: "更新",
          u: "primary",
          onClick: ve
        })
      ])
    ]));
  }
});
const th = { class: "gif-property" }, nh = /* @__PURE__ */ Pe({
  __name: "GIFProperty",
  props: {
    max: {},
    size: {},
    color: {},
    stroke: {},
    swidth: {},
    align: {},
    direction: {},
    frame: {}
  },
  emits: ["change", "pick"],
  setup(e, { emit: t }) {
    const n = e, s = Ce("text"), r = Ce("updateText"), { max: o, size: i, color: l, stroke: a, swidth: c, align: u, direction: h, frame: p } = Mt(n), g = (I, S) => {
      const E = {
        max: o.value,
        size: i.value,
        color: l.value,
        stroke: a.value,
        swidth: c.value,
        align: u.value,
        direction: h.value,
        frame: p.value
      };
      E[S] = ["color", "align", "direction", "stroke", "frame"].includes(S) ? I : parseInt(I), t("change", E);
    }, x = (I) => {
      const S = "#" + Math.floor(Math.random() * 16777215).toString(16);
      g(S, I);
    }, T = () => {
      t("pick");
    };
    return (I, S) => (W(), ie("div", th, [
      B(P(we), {
        class: "gif-property-max",
        value: P(o),
        "onUpdate:modelValue": S[0] || (S[0] = (E) => g(E, "max"))
      }, null, 8, ["value"]),
      B(P(we), {
        class: "gif-property-size",
        value: P(i),
        "onUpdate:modelValue": S[1] || (S[1] = (E) => g(E, "size"))
      }, null, 8, ["value"]),
      B(P(we), {
        class: "gif-property-color",
        value: P(l),
        "onUpdate:modelValue": S[2] || (S[2] = (E) => g(E, "color"))
      }, null, 8, ["value"]),
      B(ts, {
        color: P(l),
        onClick: S[3] || (S[3] = (E) => x("color"))
      }, null, 8, ["color"]),
      B(Wi, {
        color: P(l),
        onClick: T
      }, null, 8, ["color"]),
      B(P(we), {
        class: "gif-property-color",
        value: P(a),
        "onUpdate:modelValue": S[4] || (S[4] = (E) => g(E, "stroke"))
      }, null, 8, ["value"]),
      B(ts, {
        color: P(a),
        onClick: S[5] || (S[5] = (E) => x("stroke"))
      }, null, 8, ["color"]),
      B(P(we), {
        class: "gif-property-swidth",
        value: P(c),
        "onUpdate:modelValue": S[6] || (S[6] = (E) => g(E, "swidth"))
      }, null, 8, ["value"]),
      B(P(We), {
        label: "start",
        name: "align",
        value: "start",
        checked: P(u) === "start",
        onToggle: S[7] || (S[7] = (E) => g(E, "align"))
      }, null, 8, ["checked"]),
      B(P(We), {
        label: "center",
        name: "align",
        value: "center",
        checked: P(u) === "center",
        onToggle: S[8] || (S[8] = (E) => g(E, "align"))
      }, null, 8, ["checked"]),
      B(P(We), {
        class: "gif-property-end",
        label: "end",
        name: "align",
        value: "end",
        checked: P(u) === "end",
        onToggle: S[9] || (S[9] = (E) => g(E, "align"))
      }, null, 8, ["checked"]),
      B(P(we), {
        class: "gif-property-text",
        value: P(s),
        "onUpdate:modelValue": P(r)
      }, null, 8, ["value", "onUpdate:modelValue"]),
      B(P(We), {
        label: "up",
        name: "direction",
        value: "up",
        checked: P(h) === "up",
        onToggle: S[10] || (S[10] = (E) => g(E, "direction"))
      }, null, 8, ["checked"]),
      B(P(We), {
        label: "center",
        name: "direction",
        value: "center",
        checked: P(h) === "center",
        onToggle: S[11] || (S[11] = (E) => g(E, "direction"))
      }, null, 8, ["checked"]),
      B(P(We), {
        label: "down",
        name: "direction",
        value: "down",
        checked: P(h) === "down",
        onToggle: S[12] || (S[12] = (E) => g(E, "direction"))
      }, null, 8, ["checked"])
    ]));
  }
});
const sh = { class: "gif-container" }, rh = { class: "gif-container-header" }, oh = { class: "gif-container-title" }, ih = {
  key: 0,
  class: "gif-container-wall"
}, lh = { class: "gif-container-wraper" }, ah = ["width", "height"], ch = { class: "gif-container-footer" }, Et = 20, uh = /* @__PURE__ */ Pe({
  __name: "GIFContainer",
  props: {
    gif: {}
  },
  emits: ["change", "create", "replace", "update"],
  setup(e, { emit: t }) {
    const s = Mt(e).gif, r = V(null), o = V(null), i = V(null), l = V(!0), a = V(!0);
    let c = null;
    const u = V(!1), h = V(!1), p = V(null), g = V("金馆长"), x = (f) => {
      g.value = f, H();
    };
    qe("text", g), qe("updateText", x);
    const T = V(0), I = V(0), S = (f, m) => {
      s.value.x = f, s.value.y = m;
    }, E = (f) => {
      const { max: m, size: w, color: v, align: b, direction: y, stroke: _, swidth: R, frame: C } = f;
      s.value.max = m, s.value.font = `${w}px sans-serif`, s.value.color = v, s.value.stroke = _, s.value.swidth = R, s.value.align = b, s.value.direction = y, s.value.frame = C;
    }, k = te(() => sn(s.value.font)), F = te(() => br(s.value.image)), fe = te(() => `${s.value.title}.${F.value} ${T.value} * ${I.value} (${s.value.x}, ${s.value.y})`), de = te(() => {
      const f = s.value.max || T.value;
      return {
        start: 0,
        center: Math.floor(f / 2),
        end: f
      }[s.value.align];
    }), ae = new Image(), pe = () => {
      ae.onload = async () => {
        const f = r.value;
        f.width = ae.naturalWidth, f.height = ae.naturalHeight, T.value = f.width, I.value = f.height, be(), H(), Q();
      }, ae.onerror = (f) => {
        console.error(f);
      }, ae.src = s.value.image;
    }, be = () => {
      const f = o.value;
      f.style.width = `${T.value}px`, f.style.height = `${I.value}px`;
    }, H = () => {
      const f = r.value, m = f.getContext("2d");
      m.drawImage(ae, 0, 0), Tf(m, f.width, g.value, s.value);
    }, Q = () => {
      const { x: f, y: m, max: w } = s.value, v = i.value;
      v.style.width = `${w}px`, v.style.height = `${k.value * Ot}px`, v.style.top = `${m - k.value + 2}px`, v.style.left = `${f - de.value}px`;
    };
    St(s, (f, m) => {
      f.mid !== m.mid ? pe() : (H(), Q());
    }, { deep: !0 });
    let J = 0, ue = 0, _e = !1;
    const De = (f) => {
      _e = !0;
      const { clientX: m, clientY: w } = f;
      J = m, ue = w;
    }, ce = (f) => {
      if (!_e)
        return;
      const { clientX: m, clientY: w } = f, v = i.value, { width: b, height: y } = v.getBoundingClientRect();
      let _ = v.offsetLeft + m - J, R = v.offsetTop + w - ue;
      _ < -Et || R < -Et || _ > T.value - b + Et || R > I.value - y + Et ? _e = !1 : (J = m, ue = w), _ = Math.max(Math.min(_, T.value - b + Et), -Et), R = Math.max(Math.min(R, I.value - y + Et), -Et), _ += de.value, R += k.value - 2, S(_, R);
    }, ne = () => {
      _e && (_e = !1);
    }, Z = () => {
      l.value ? l.value = !1 : (l.value = !0, a.value = !0, c ? (ve(c), c = null) : pe());
    }, Ie = () => {
      c && (ve(c), c = null);
    }, Le = () => {
      l.value ? t("change", s.value) : a.value || (t("create", s.value, Ie), l.value = !0, a.value = !0);
    }, Ae = ({ name: f, base64: m }) => {
      a.value = !1;
      const { mid: w, title: v, image: b, x: y, y: _, max: R, font: C, color: $, stroke: M, swidth: D, align: U, direction: z, frame: G } = s.value;
      c = {
        mid: w,
        title: v,
        image: b,
        x: y,
        y: _,
        max: R,
        font: C,
        color: $,
        stroke: M,
        swidth: D,
        align: U,
        direction: z,
        frame: G
      };
      const ee = f.slice(0, f.lastIndexOf("."));
      ve({
        mid: `meme_${(/* @__PURE__ */ new Date()).getTime()}`,
        title: ee,
        image: m,
        x: 60,
        y: 60,
        max: 100,
        font: "32px sans-serif",
        color: "#FF0000",
        stroke: "transparent",
        swidth: 1,
        align: "start",
        direction: "down",
        frame: "NORMAL"
      });
    }, ve = (f) => {
      t("replace", f);
    }, Ue = () => {
      u.value = !0;
    }, Ke = (f, m) => {
      const w = r.value, v = p.value;
      _r(w, v, f, m);
    }, nt = async (f) => {
      if (!u.value)
        return !1;
      const { offsetX: m, offsetY: w } = f;
      m < 0 || w < 0 || (h.value = !0, Ke(m, w));
    }, ye = () => {
      if (!u.value)
        return !1;
      h.value = !1;
    }, O = (f) => {
      const m = (_) => _.toString(16).padStart(2, "0"), { 0: w, 1: v, 2: b, 3: y } = f.data;
      return `#${m(w)}${m(v)}${m(b)}${m(y)}`.toUpperCase();
    }, L = (f, m) => {
      const b = r.value.getContext("2d").getImageData(f, m, 1, 1);
      return O(b);
    }, N = (f) => {
      if (!u.value)
        return !1;
      const { offsetX: m, offsetY: w } = f;
      if (m < 0 || w < 0)
        return;
      const v = L(m, w);
      s.value.color = v, h.value = !1, u.value = !1;
    }, j = Ki(), Y = te(() => j.path === "/edit"), d = (f) => {
      f !== s.value.title && (s.value.title = f, t("update", s.value));
    };
    return an(() => {
      pe();
    }), (f, m) => (W(), ie("div", sh, [
      X("div", rh, [
        X("div", oh, [
          Y.value ? (W(), Je(P(we), {
            key: 0,
            class: "gif-container-title-label",
            value: P(s).title,
            "onUpdate:modelValue": m[0] || (m[0] = (w) => d(w))
          }, null, 8, ["value"])) : (W(), ie(Re, { key: 1 }, [
            hs(At(fe.value), 1)
          ], 64))
        ]),
        B(P(ut), {
          label: l.value ? "添加" : "取消添加",
          u: "primary",
          onClick: Z
        }, null, 8, ["label"])
      ]),
      !l.value && a.value ? (W(), ie("div", ih, [
        B(P(Vi), { onChange: Ae })
      ])) : (W(), ie(Re, { key: 1 }, [
        X("div", lh, [
          X("canvas", {
            ref_key: "canvasRef",
            ref: r,
            class: pt({
              "gif-container-canvas": !0,
              "gif-container-pointer": u.value
            }),
            onMousemove: nt,
            onMouseleave: ye,
            onClick: N
          }, null, 34),
          Gt(X("div", {
            class: "gif-container-area",
            ref_key: "areaRef",
            ref: o,
            onMousemove: ce,
            onMouseup: ne
          }, [
            X("div", {
              class: "gif-container-drag",
              ref_key: "dragRef",
              ref: i,
              onMousedown: De
            }, null, 544)
          ], 544), [
            [en, !u.value]
          ]),
          Gt(X("canvas", {
            ref_key: "layerRef",
            ref: p,
            class: "gif-container-layer",
            style: rn({
              borderRadius: `${P(ft)}px`
            }),
            width: P(ft),
            height: P(ft)
          }, null, 12, ah), [
            [en, u.value && h.value]
          ])
        ]),
        B(nh, {
          max: P(s).max,
          color: P(s).color,
          stroke: P(s).stroke,
          swidth: P(s).swidth,
          size: k.value,
          align: P(s).align,
          direction: P(s).direction,
          frame: P(s).frame,
          onChange: E,
          onPick: Ue
        }, null, 8, ["max", "color", "stroke", "swidth", "size", "align", "direction", "frame"])
      ], 64)),
      X("footer", ch, [
        B(P(ut), {
          label: l.value ? "更新" : "确认",
          u: "primary",
          onClick: Le
        }, null, 8, ["label"])
      ])
    ]));
  }
});
const fh = { class: "image-wrap" }, No = /* @__PURE__ */ Pe({
  __name: "ImageWrap",
  setup(e) {
    const t = V([]), n = V(""), s = V("");
    let r = V({
      mid: "",
      title: "",
      feature: "",
      image: "",
      x: 0,
      y: 0,
      max: 100,
      font: "32px sans-serif",
      color: "#FFFFFF",
      stroke: "transparent",
      swidth: 1,
      align: "start",
      direction: "down",
      blur: 0,
      senior: 0,
      degree: 0
    }), o = V({
      mid: "",
      feature: "",
      type: "",
      story: r
    }), i = V({
      mid: "",
      text: ""
    }), l = V({
      mid: "",
      title: "",
      image: "",
      x: 0,
      y: 0,
      max: 100,
      font: "32px sans-serif",
      color: "#FFFFFF",
      stroke: "transparent",
      swidth: 1,
      align: "start",
      direction: "down",
      frame: "NORMAL"
    });
    const a = async () => {
      const H = await Ee.getCatalog({});
      t.value = H;
    }, c = ({ type: H, child: Q }) => {
      n.value !== Q.mid && (n.value = Q.mid, s.value = H);
    };
    St([n, s], () => {
      u(n.value, s.value);
    });
    const u = (H, Q) => {
      S.value ? Ee.openImage({
        mid: H,
        type: Q
      }).then((J) => {
        r.value = J, J.senior === 2 && Ee.getAdditional({
          mid: H
        }).then((ue) => {
          i.value = ue;
        });
      }) : E.value ? Ee.openGif({
        mid: H,
        type: Q
      }).then((J) => {
        l.value = J;
      }) : Ee.getFeatureImage({
        mid: H
      }).then((J) => {
        o.value = J;
      });
    }, h = (H) => {
      const Q = { ...H, image: "" };
      Ee.saveImage(Q);
    }, p = (H) => {
      r.value = H;
    }, g = async (H, Q) => {
      const J = await Ee.createImage(H).catch((ue) => {
        alert(ue.message);
      });
      J ? (await a(), n.value = J.mid) : Q();
    }, x = V([]), T = V();
    qe("commands", x), qe("paths", T);
    const I = async () => {
      const { commands: H, paths: Q } = await Ee.getConfig({});
      x.value = H, T.value = Q.map((J) => ({
        label: J,
        value: J
      }));
    }, S = te(() => ["STORY", "SERIES", "SPECIAL"].includes(s.value)), E = te(() => ["GIF"].includes(s.value)), k = ({ mid: H, type: Q, options: J }) => {
      [ns.TEXT, ns.REPEAT].includes(Q) ? Ee.saveImage(J) : Ee.saveFeatureImage({
        mid: H,
        type: Q,
        ...J
      });
    }, F = (H) => {
      Ee.updateImage(H);
    }, fe = (H) => {
      Ee.updateAdditional(H);
    }, de = (H) => {
      const Q = { ...H, image: "" };
      Ee.saveGifImage(Q);
    }, ae = async (H, Q) => {
      const J = await Ee.createGifImage(H).catch((ue) => {
        alert(ue.message);
      });
      J ? (await a(), n.value = J.mid) : Q();
    }, pe = (H) => {
      l.value = H;
    }, be = (H) => {
      Ee.updateGifImage(H);
    };
    return an(() => {
      a(), I();
    }), (H, Q) => (W(), ie("div", fh, [
      B(ef, {
        current: n.value,
        "catalog-list": t.value,
        onChange: c
      }, null, 8, ["current", "catalog-list"]),
      S.value && P(r).image && P(r).mid ? (W(), Je(Nf, {
        key: 0,
        story: P(r),
        additional: P(i),
        onChange: h,
        onReplace: p,
        onCreate: g,
        onUpdate: F,
        onAdditional: fe
      }, null, 8, ["story", "additional"])) : xn("", !0),
      s.value === "FEATURE" && P(o).mid ? (W(), Je(eh, {
        key: 1,
        feature: P(o),
        onChange: k
      }, null, 8, ["feature"])) : xn("", !0),
      E.value && P(l).image && P(l).mid ? (W(), Je(uh, {
        key: 2,
        gif: P(l),
        onChange: de,
        onReplace: pe,
        onCreate: ae,
        onUpdate: be
      }, null, 8, ["gif"])) : xn("", !0)
    ]));
  }
});
const dh = { class: "material-center" }, hh = /* @__PURE__ */ Pe({
  __name: "MaterialCenter",
  setup(e) {
    const t = () => {
      Ee.getMaterialCatalog({
        type: "DB".toLowerCase()
      }).then((n) => {
        console.log(n);
      });
    };
    return an(() => {
      t();
    }), (n, s) => (W(), ie("div", dh, " 什么都没有的荒原 "));
  }
});
const ph = [
  {
    path: "/",
    component: No
  },
  {
    path: "/center",
    component: hh
  },
  {
    path: "/edit",
    component: No
  }
], mh = Xu({
  history: fu(),
  routes: ph
}), gh = (e, t) => (Vd(t || "http://localhost:8080"), zc(qc).use(mh).mount(e)), vh = {
  load: gh
};
export {
  vh as default
};
