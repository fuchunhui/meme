/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Mr(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ge = {}, an = [], lt = () => {
}, Ta = () => !1, ws = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Ir = (e) => e.startsWith("onUpdate:"), Me = Object.assign, Nr = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Aa = Object.prototype.hasOwnProperty, me = (e, t) => Aa.call(e, t), Y = Array.isArray, cn = (e) => Es(e) === "[object Map]", vi = (e) => Es(e) === "[object Set]", Z = (e) => typeof e == "function", Ee = (e) => typeof e == "string", Tt = (e) => typeof e == "symbol", ye = (e) => e !== null && typeof e == "object", yi = (e) => (ye(e) || Z(e)) && Z(e.then) && Z(e.catch), bi = Object.prototype.toString, Es = (e) => bi.call(e), Oa = (e) => Es(e).slice(8, -1), wi = (e) => Es(e) === "[object Object]", Fr = (e) => Ee(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, On = /* @__PURE__ */ Mr(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ss = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Pa = /-(\w)/g, it = Ss(
  (e) => e.replace(Pa, (t, n) => n ? n.toUpperCase() : "")
), Da = /\B([A-Z])/g, Wt = Ss(
  (e) => e.replace(Da, "-$1").toLowerCase()
), xs = Ss((e) => e.charAt(0).toUpperCase() + e.slice(1)), Bs = Ss(
  (e) => e ? `on${xs(e)}` : ""
), Vt = (e, t) => !Object.is(e, t), Ks = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Ei = (e, t, n, s = !1) => {
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
let lo;
const Rs = () => lo || (lo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function vn(e) {
  if (Y(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = Ee(s) ? $a(s) : vn(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (Ee(e) || ye(e))
    return e;
}
const Ia = /;(?![^(]*\))/g, Na = /:([^]+)/, Fa = /\/\*[^]*?\*\//g;
function $a(e) {
  const t = {};
  return e.replace(Fa, "").split(Ia).forEach((n) => {
    if (n) {
      const s = n.split(Na);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function At(e) {
  let t = "";
  if (Ee(e))
    t = e;
  else if (Y(e))
    for (let n = 0; n < e.length; n++) {
      const s = At(e[n]);
      s && (t += s + " ");
    }
  else if (ye(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const La = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Ua = /* @__PURE__ */ Mr(La);
function Si(e) {
  return !!e || e === "";
}
const xi = (e) => !!(e && e.__v_isRef === !0), Ct = (e) => Ee(e) ? e : e == null ? "" : Y(e) || ye(e) && (e.toString === bi || !Z(e.toString)) ? xi(e) ? Ct(e.value) : JSON.stringify(e, Ri, 2) : String(e), Ri = (e, t) => xi(t) ? Ri(e, t.value) : cn(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], o) => (n[zs(s, o) + " =>"] = r, n),
    {}
  )
} : vi(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => zs(n))
} : Tt(t) ? zs(t) : ye(t) && !Y(t) && !wi(t) ? String(t) : t, zs = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Tt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
var ja = { npm_package_repository: "fuchunhui/meme-view", npm_package_devDependencies_npm_run_all2: "^7.0.1", TERM_PROGRAM: "vscode", NODE: "/opt/homebrew/Cellar/node/22.8.0/bin/node", INIT_CWD: "/Users/fuchunhui/github/meme-view", NVM_CD_FLAGS: "-q", npm_package_dependencies_axios: "^1.7.9", npm_package_devDependencies_typescript: "~5.6.3", npm_package_homepage: "", TERM: "xterm-256color", SHELL: "/bin/zsh", npm_package_scripts_commitlint: "node scripts/verify-commit.js", npm_package_devDependencies_vite: "^6.0.1", HOMEBREW_REPOSITORY: "/opt/homebrew", TMPDIR: "/var/folders/b4/zxmfly155510n61rfm0yhjhh0000gp/T/", npm_package_devDependencies_semver: "^7.6.3", npm_package_scripts_release: "pnpm run lib && node scripts/release.js", TERM_PROGRAM_VERSION: "1.96.0", npm_package_scripts_dev: "vite", npm_package_devDependencies__vitejs_plugin_vue: "^5.2.1", ZDOTDIR: "/Users/fuchunhui", MONGODB_HOME: "/usr/local/mongodb/bin", ORIGINAL_XDG_CURRENT_DESKTOP: "undefined", MallocNanoZone: "0", SDKMAN_PLATFORM: "darwinarm64", npm_config_registry: "https://registry.npmjs.org/", npm_config_home: "https://www.npmjs.org", NVM_DIR: "/Users/fuchunhui/.nvm", USER: "fuchunhui", npm_package_description: "custom view for meme.", COMMAND_MODE: "unix2003", npm_package_scripts_deploy: "", PNPM_SCRIPT_SRC_DIR: "/Users/fuchunhui/github/meme-view", SDKMAN_CANDIDATES_API: "https://api.sdkman.io/2", SSH_AUTH_SOCK: "/private/tmp/com.apple.launchd.mtMddZahvW/Listeners", __CF_USER_TEXT_ENCODING: "0x1F6:0x19:0x34", npm_package_devDependencies_eslint: "^9.14.0", npm_package_devDependencies_less: "^4.2.1", npm_package_devDependencies_rollup_plugin_copy: "^3.5.0", npm_execpath: "/opt/homebrew/lib/node_modules/pnpm/bin/pnpm.cjs", npm_package_module: "dist/imeme.es.js", npm_package_scripts_type_check: "vue-tsc --build", npm_config_frozen_lockfile: "", PATH: "/Users/fuchunhui/github/meme-view/node_modules/.bin:/opt/homebrew/lib/node_modules/pnpm/dist/node-gyp-bin:/Users/fuchunhui/github/meme-view/node_modules/.bin:/opt/homebrew/lib/node_modules/pnpm/dist/node-gyp-bin:/usr/local/mongodb/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/mongodb/bin:/opt/homebrew/bin:/opt/homebrew/sbin", npm_package_dependencies_vue: "^3.5.13", USER_ZDOTDIR: "/Users/fuchunhui", __CFBundleIdentifier: "com.microsoft.VSCode", npm_package_keywords_4: "robot", npm_package_author: "fuchunhui", PWD: "/Users/fuchunhui/github/meme-view", npm_command: "run-script", npm_package_scripts_build_only: "vite build --mode development", npm_package_scripts_lib: "vue-tsc --build && vite build --mode lib --config vite.lib.config.ts", npm_lifecycle_event: "lib", LANG: "en_US.UTF-8", npm_package_name: "meme-view", npm_package_types: "index.d.ts", npm_package_devDependencies_execa: "^9.5.2", npm_package_keywords_0: "imeme", SDKMAN_VERSION: "5.16.0", npm_package_keywords_1: "meme", NODE_PATH: "/Users/fuchunhui/github/meme-view/node_modules/.pnpm/vite@6.0.3_@types+node@22.10.2_less@4.2.1/node_modules/vite/bin/node_modules:/Users/fuchunhui/github/meme-view/node_modules/.pnpm/vite@6.0.3_@types+node@22.10.2_less@4.2.1/node_modules/vite/node_modules:/Users/fuchunhui/github/meme-view/node_modules/.pnpm/vite@6.0.3_@types+node@22.10.2_less@4.2.1/node_modules:/Users/fuchunhui/github/meme-view/node_modules/.pnpm/node_modules", npm_package_scripts_build: 'run-p type-check "build-only {@}" --', npm_package_keywords_2: "vite", VSCODE_GIT_ASKPASS_EXTRA_ARGS: "", XPC_FLAGS: "0x0", npm_package_keywords_3: "lib", npm_package_engines_node: ">=16.0", npm_package_main: "dist/imeme.umd.js", npm_config_node_gyp: "/opt/homebrew/lib/node_modules/pnpm/dist/node_modules/node-gyp/bin/node-gyp.js", XPC_SERVICE_NAME: "0", npm_package_version: "2.2.0", VSCODE_INJECTION: "1", npm_package_dependencies_pinia: "^2.3.0", SHLVL: "3", HOME: "/Users/fuchunhui", npm_package_type: "module", npm_package_devDependencies__vue_tsconfig: "^0.7.0", VSCODE_GIT_ASKPASS_MAIN: "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass-main.js", npm_package_devDependencies_eslint_plugin_vue: "^9.30.0", npm_package_scripts_serve: "vite preview", HOMEBREW_PREFIX: "/opt/homebrew", npm_package_devDependencies_husky: "^8.0.3", npm_package_devDependencies__vue_eslint_config_typescript: "^14.1.3", LOGNAME: "fuchunhui", SDKMAN_DIR: "/Users/fuchunhui/.sdkman", npm_lifecycle_script: "vue-tsc --build && vite build --mode lib --config vite.lib.config.ts", VSCODE_GIT_IPC_HANDLE: "/var/folders/b4/zxmfly155510n61rfm0yhjhh0000gp/T/vscode-git-3b20d3e4f6.sock", npm_package_devDependencies__tsconfig_node22: "^22.0.0", npm_config_user_agent: "pnpm/9.12.1 npm/? node/v22.8.0 darwin arm64", VSCODE_GIT_ASKPASS_NODE: "/Applications/Visual Studio Code.app/Contents/Frameworks/Code Helper (Plugin).app/Contents/MacOS/Code Helper (Plugin)", GIT_ASKPASS: "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass.sh", SDKMAN_CANDIDATES_DIR: "/Users/fuchunhui/.sdkman/candidates", INFOPATH: "/opt/homebrew/share/info:/opt/homebrew/share/info:", HOMEBREW_CELLAR: "/opt/homebrew/Cellar", npm_package_devDependencies__types_node: "^22.9.3", npm_package_devDependencies_chalk: "^5.3.0", npm_package_files_2: "index.d.ts", npm_package_devDependencies_vite_plugin_vue_devtools: "^7.6.5", npm_package_files_1: "README.md", npm_package_files_0: "dist", npm_package_dependencies_vue_router: "^4.2.2", COLORTERM: "truecolor", npm_package_devDependencies_vue_tsc: "^2.1.10", npm_package_devDependencies_enquirer: "^2.4.1", npm_node_execpath: "/opt/homebrew/Cellar/node/22.8.0/bin/node", NODE_ENV: "production", VITE_USER_NODE_ENV: "production" };
let Be;
class Ci {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Be, !t && Be && (this.index = (Be.scopes || (Be.scopes = [])).push(
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
      const n = Be;
      try {
        return Be = this, t();
      } finally {
        Be = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Be = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Be = this.parent;
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
function ki(e) {
  return new Ci(e);
}
function Ti() {
  return Be;
}
function Ha(e, t = !1) {
  Be && Be.cleanups.push(e);
}
let _e;
const Ws = /* @__PURE__ */ new WeakSet();
class Ai {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Be && Be.active && Be.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Ws.has(this) && (Ws.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Pi(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, ao(this), Di(this);
    const t = _e, n = at;
    _e = this, at = !0;
    try {
      return this.fn();
    } finally {
      Mi(this), _e = t, at = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Ur(t);
      this.deps = this.depsTail = void 0, ao(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Ws.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ur(this) && this.run();
  }
  get dirty() {
    return ur(this);
  }
}
let Oi = 0, Pn, Dn;
function Pi(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Dn, Dn = e;
    return;
  }
  e.next = Pn, Pn = e;
}
function $r() {
  Oi++;
}
function Lr() {
  if (--Oi > 0)
    return;
  if (Dn) {
    let t = Dn;
    for (Dn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Pn; ) {
    let t = Pn;
    for (Pn = void 0; t; ) {
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
function Di(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Mi(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), Ur(s), Va(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function ur(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ii(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ii(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === jn))
    return;
  e.globalVersion = jn;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !ur(e)) {
    e.flags &= -3;
    return;
  }
  const n = _e, s = at;
  _e = e, at = !0;
  try {
    Di(e);
    const r = e.fn(e._value);
    (t.version === 0 || Vt(r, e._value)) && (e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    _e = n, at = s, Mi(e), e.flags &= -3;
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
let at = !0;
const Ni = [];
function Ot() {
  Ni.push(at), at = !1;
}
function Pt() {
  const e = Ni.pop();
  at = e === void 0 ? !0 : e;
}
function ao(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = _e;
    _e = void 0;
    try {
      t();
    } finally {
      _e = n;
    }
  }
}
let jn = 0;
class Ba {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class jr {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
  }
  track(t) {
    if (!_e || !at || _e === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== _e)
      n = this.activeLink = new Ba(_e, this), _e.deps ? (n.prevDep = _e.depsTail, _e.depsTail.nextDep = n, _e.depsTail = n) : _e.deps = _e.depsTail = n, Fi(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = _e.depsTail, n.nextDep = void 0, _e.depsTail.nextDep = n, _e.depsTail = n, _e.deps === n && (_e.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, jn++, this.notify(t);
  }
  notify(t) {
    $r();
    try {
      ja.NODE_ENV;
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Lr();
    }
  }
}
function Fi(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        Fi(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const cs = /* @__PURE__ */ new WeakMap(), Zt = Symbol(
  ""
), fr = Symbol(
  ""
), Hn = Symbol(
  ""
);
function $e(e, t, n) {
  if (at && _e) {
    let s = cs.get(e);
    s || cs.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new jr()), r.map = s, r.key = n), r.track();
  }
}
function wt(e, t, n, s, r, o) {
  const i = cs.get(e);
  if (!i) {
    jn++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if ($r(), t === "clear")
    i.forEach(l);
  else {
    const a = Y(e), u = a && Fr(n);
    if (a && n === "length") {
      const c = Number(s);
      i.forEach((f, m) => {
        (m === "length" || m === Hn || !Tt(m) && m >= c) && l(f);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), u && l(i.get(Hn)), t) {
        case "add":
          a ? u && l(i.get("length")) : (l(i.get(Zt)), cn(e) && l(i.get(fr)));
          break;
        case "delete":
          a || (l(i.get(Zt)), cn(e) && l(i.get(fr)));
          break;
        case "set":
          cn(e) && l(i.get(Zt));
          break;
      }
  }
  Lr();
}
function Ka(e, t) {
  const n = cs.get(e);
  return n && n.get(t);
}
function sn(e) {
  const t = ce(e);
  return t === e ? t : ($e(t, "iterate", Hn), rt(e) ? t : t.map(Le));
}
function Cs(e) {
  return $e(e = ce(e), "iterate", Hn), e;
}
const za = {
  __proto__: null,
  [Symbol.iterator]() {
    return Gs(this, Symbol.iterator, Le);
  },
  concat(...e) {
    return sn(this).concat(
      ...e.map((t) => Y(t) ? sn(t) : t)
    );
  },
  entries() {
    return Gs(this, "entries", (e) => (e[1] = Le(e[1]), e));
  },
  every(e, t) {
    return vt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return vt(this, "filter", e, t, (n) => n.map(Le), arguments);
  },
  find(e, t) {
    return vt(this, "find", e, t, Le, arguments);
  },
  findIndex(e, t) {
    return vt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return vt(this, "findLast", e, t, Le, arguments);
  },
  findLastIndex(e, t) {
    return vt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return vt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return qs(this, "includes", e);
  },
  indexOf(...e) {
    return qs(this, "indexOf", e);
  },
  join(e) {
    return sn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return qs(this, "lastIndexOf", e);
  },
  map(e, t) {
    return vt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return xn(this, "pop");
  },
  push(...e) {
    return xn(this, "push", e);
  },
  reduce(e, ...t) {
    return co(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return co(this, "reduceRight", e, t);
  },
  shift() {
    return xn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return vt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return xn(this, "splice", e);
  },
  toReversed() {
    return sn(this).toReversed();
  },
  toSorted(e) {
    return sn(this).toSorted(e);
  },
  toSpliced(...e) {
    return sn(this).toSpliced(...e);
  },
  unshift(...e) {
    return xn(this, "unshift", e);
  },
  values() {
    return Gs(this, "values", Le);
  }
};
function Gs(e, t, n) {
  const s = Cs(e), r = s[t]();
  return s !== e && !rt(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.value && (o.value = n(o.value)), o;
  }), r;
}
const Wa = Array.prototype;
function vt(e, t, n, s, r, o) {
  const i = Cs(e), l = i !== e && !rt(e), a = i[t];
  if (a !== Wa[t]) {
    const f = a.apply(e, o);
    return l ? Le(f) : f;
  }
  let u = n;
  i !== e && (l ? u = function(f, m) {
    return n.call(this, Le(f), m, e);
  } : n.length > 2 && (u = function(f, m) {
    return n.call(this, f, m, e);
  }));
  const c = a.call(i, u, s);
  return l && r ? r(c) : c;
}
function co(e, t, n, s) {
  const r = Cs(e);
  let o = n;
  return r !== e && (rt(e) ? n.length > 3 && (o = function(i, l, a) {
    return n.call(this, i, l, a, e);
  }) : o = function(i, l, a) {
    return n.call(this, i, Le(l), a, e);
  }), r[t](o, ...s);
}
function qs(e, t, n) {
  const s = ce(e);
  $e(s, "iterate", Hn);
  const r = s[t](...n);
  return (r === -1 || r === !1) && Hr(n[0]) ? (n[0] = ce(n[0]), s[t](...n)) : r;
}
function xn(e, t, n = []) {
  Ot(), $r();
  const s = ce(e)[t].apply(e, n);
  return Lr(), Pt(), s;
}
const Ga = /* @__PURE__ */ Mr("__proto__,__v_isRef,__isVue"), $i = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Tt)
);
function qa(e) {
  Tt(e) || (e = String(e));
  const t = ce(this);
  return $e(t, "has", e), t.hasOwnProperty(e);
}
class Li {
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
      return s === (r ? o ? Ki : Bi : o ? Vi : Hi).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = Y(t);
    if (!r) {
      let a;
      if (i && (a = za[n]))
        return a;
      if (n === "hasOwnProperty")
        return qa;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      be(t) ? t : s
    );
    return (Tt(n) ? $i.has(n) : Ga(n)) || (r || $e(t, "get", n), o) ? l : be(l) ? i && Fr(n) ? l : l.value : ye(l) ? r ? Wi(l) : Xn(l) : l;
  }
}
class Ui extends Li {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (!this._isShallow) {
      const a = tn(o);
      if (!rt(s) && !tn(s) && (o = ce(o), s = ce(s)), !Y(t) && be(o) && !be(s))
        return a ? !1 : (o.value = s, !0);
    }
    const i = Y(t) && Fr(n) ? Number(n) < t.length : me(t, n), l = Reflect.set(
      t,
      n,
      s,
      be(t) ? t : r
    );
    return t === ce(r) && (i ? Vt(s, o) && wt(t, "set", n, s) : wt(t, "add", n, s)), l;
  }
  deleteProperty(t, n) {
    const s = me(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && wt(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Tt(n) || !$i.has(n)) && $e(t, "has", n), s;
  }
  ownKeys(t) {
    return $e(
      t,
      "iterate",
      Y(t) ? "length" : Zt
    ), Reflect.ownKeys(t);
  }
}
class ji extends Li {
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
const Xa = /* @__PURE__ */ new Ui(), Ja = /* @__PURE__ */ new ji(), Ya = /* @__PURE__ */ new Ui(!0), Za = /* @__PURE__ */ new ji(!0), dr = (e) => e, Qn = (e) => Reflect.getPrototypeOf(e);
function Qa(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = ce(r), i = cn(o), l = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, u = r[e](...s), c = n ? dr : t ? pr : Le;
    return !t && $e(
      o,
      "iterate",
      a ? fr : Zt
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
function es(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function ec(e, t) {
  const n = {
    get(r) {
      const o = this.__v_raw, i = ce(o), l = ce(r);
      e || (Vt(r, l) && $e(i, "get", r), $e(i, "get", l));
      const { has: a } = Qn(i), u = t ? dr : e ? pr : Le;
      if (a.call(i, r))
        return u(o.get(r));
      if (a.call(i, l))
        return u(o.get(l));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && $e(ce(r), "iterate", Zt), Reflect.get(r, "size", r);
    },
    has(r) {
      const o = this.__v_raw, i = ce(o), l = ce(r);
      return e || (Vt(r, l) && $e(i, "has", r), $e(i, "has", l)), r === l ? o.has(r) : o.has(r) || o.has(l);
    },
    forEach(r, o) {
      const i = this, l = i.__v_raw, a = ce(l), u = t ? dr : e ? pr : Le;
      return !e && $e(a, "iterate", Zt), l.forEach((c, f) => r.call(o, u(c), u(f), i));
    }
  };
  return Me(
    n,
    e ? {
      add: es("add"),
      set: es("set"),
      delete: es("delete"),
      clear: es("clear")
    } : {
      add(r) {
        !t && !rt(r) && !tn(r) && (r = ce(r));
        const o = ce(this);
        return Qn(o).has.call(o, r) || (o.add(r), wt(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !rt(o) && !tn(o) && (o = ce(o));
        const i = ce(this), { has: l, get: a } = Qn(i);
        let u = l.call(i, r);
        u || (r = ce(r), u = l.call(i, r));
        const c = a.call(i, r);
        return i.set(r, o), u ? Vt(o, c) && wt(i, "set", r, o) : wt(i, "add", r, o), this;
      },
      delete(r) {
        const o = ce(this), { has: i, get: l } = Qn(o);
        let a = i.call(o, r);
        a || (r = ce(r), a = i.call(o, r)), l && l.call(o, r);
        const u = o.delete(r);
        return a && wt(o, "delete", r, void 0), u;
      },
      clear() {
        const r = ce(this), o = r.size !== 0, i = r.clear();
        return o && wt(
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
    n[r] = Qa(r, e, t);
  }), n;
}
function ks(e, t) {
  const n = ec(e, t);
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    me(n, r) && r in s ? n : s,
    r,
    o
  );
}
const tc = {
  get: /* @__PURE__ */ ks(!1, !1)
}, nc = {
  get: /* @__PURE__ */ ks(!1, !0)
}, sc = {
  get: /* @__PURE__ */ ks(!0, !1)
}, rc = {
  get: /* @__PURE__ */ ks(!0, !0)
}, Hi = /* @__PURE__ */ new WeakMap(), Vi = /* @__PURE__ */ new WeakMap(), Bi = /* @__PURE__ */ new WeakMap(), Ki = /* @__PURE__ */ new WeakMap();
function oc(e) {
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
function ic(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : oc(Oa(e));
}
function Xn(e) {
  return tn(e) ? e : Ts(
    e,
    !1,
    Xa,
    tc,
    Hi
  );
}
function zi(e) {
  return Ts(
    e,
    !1,
    Ya,
    nc,
    Vi
  );
}
function Wi(e) {
  return Ts(
    e,
    !0,
    Ja,
    sc,
    Bi
  );
}
function ts(e) {
  return Ts(
    e,
    !0,
    Za,
    rc,
    Ki
  );
}
function Ts(e, t, n, s, r) {
  if (!ye(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = ic(e);
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, l), l;
}
function Bt(e) {
  return tn(e) ? Bt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function tn(e) {
  return !!(e && e.__v_isReadonly);
}
function rt(e) {
  return !!(e && e.__v_isShallow);
}
function Hr(e) {
  return e ? !!e.__v_raw : !1;
}
function ce(e) {
  const t = e && e.__v_raw;
  return t ? ce(t) : e;
}
function Vr(e) {
  return !me(e, "__v_skip") && Object.isExtensible(e) && Ei(e, "__v_skip", !0), e;
}
const Le = (e) => ye(e) ? Xn(e) : e, pr = (e) => ye(e) ? Wi(e) : e;
function be(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function X(e) {
  return Gi(e, !1);
}
function lc(e) {
  return Gi(e, !0);
}
function Gi(e, t) {
  return be(e) ? e : new ac(e, t);
}
class ac {
  constructor(t, n) {
    this.dep = new jr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : ce(t), this._value = n ? t : Le(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || rt(t) || tn(t);
    t = s ? t : ce(t), Vt(t, n) && (this._rawValue = t, this._value = s ? t : Le(t), this.dep.trigger());
  }
}
function P(e) {
  return be(e) ? e.value : e;
}
const cc = {
  get: (e, t, n) => t === "__v_raw" ? e : P(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return be(r) && !be(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function qi(e) {
  return Bt(e) ? e : new Proxy(e, cc);
}
function kt(e) {
  const t = Y(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = fc(e, n);
  return t;
}
class uc {
  constructor(t, n, s) {
    this._object = t, this._key = n, this._defaultValue = s, this.__v_isRef = !0, this._value = void 0;
  }
  get value() {
    const t = this._object[this._key];
    return this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return Ka(ce(this._object), this._key);
  }
}
function fc(e, t, n) {
  const s = e[t];
  return be(s) ? s : new uc(e, t, n);
}
class dc {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new jr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = jn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    _e !== this)
      return Pi(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Ii(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function pc(e, t, n = !1) {
  let s, r;
  return Z(e) ? s = e : (s = e.get, r = e.set), new dc(s, r, n);
}
const ns = {}, us = /* @__PURE__ */ new WeakMap();
let Jt;
function hc(e, t = !1, n = Jt) {
  if (n) {
    let s = us.get(n);
    s || us.set(n, s = []), s.push(e);
  }
}
function mc(e, t, n = ge) {
  const { immediate: s, deep: r, once: o, scheduler: i, augmentJob: l, call: a } = n, u = (k) => r ? k : rt(k) || r === !1 || r === 0 ? Et(k, 1) : Et(k);
  let c, f, m, h, v = !1, w = !1;
  if (be(e) ? (f = () => e.value, v = rt(e)) : Bt(e) ? (f = () => u(e), v = !0) : Y(e) ? (w = !0, v = e.some((k) => Bt(k) || rt(k)), f = () => e.map((k) => {
    if (be(k))
      return k.value;
    if (Bt(k))
      return u(k);
    if (Z(k))
      return a ? a(k, 2) : k();
  })) : Z(e) ? t ? f = a ? () => a(e, 2) : e : f = () => {
    if (m) {
      Ot();
      try {
        m();
      } finally {
        Pt();
      }
    }
    const k = Jt;
    Jt = c;
    try {
      return a ? a(e, 3, [h]) : e(h);
    } finally {
      Jt = k;
    }
  } : f = lt, t && r) {
    const k = f, L = r === !0 ? 1 / 0 : r;
    f = () => Et(k(), L);
  }
  const R = Ti(), M = () => {
    c.stop(), R && R.active && Nr(R.effects, c);
  };
  if (o && t) {
    const k = t;
    t = (...L) => {
      k(...L), M();
    };
  }
  let C = w ? new Array(e.length).fill(ns) : ns;
  const E = (k) => {
    if (!(!(c.flags & 1) || !c.dirty && !k))
      if (t) {
        const L = c.run();
        if (r || v || (w ? L.some((se, G) => Vt(se, C[G])) : Vt(L, C))) {
          m && m();
          const se = Jt;
          Jt = c;
          try {
            const G = [
              L,
              // pass undefined as the old value when it's changed for the first time
              C === ns ? void 0 : w && C[0] === ns ? [] : C,
              h
            ];
            a ? a(t, 3, G) : (
              // @ts-expect-error
              t(...G)
            ), C = L;
          } finally {
            Jt = se;
          }
        }
      } else
        c.run();
  };
  return l && l(E), c = new Ai(f), c.scheduler = i ? () => i(E, !1) : E, h = (k) => hc(k, !1, c), m = c.onStop = () => {
    const k = us.get(c);
    if (k) {
      if (a)
        a(k, 4);
      else
        for (const L of k) L();
      us.delete(c);
    }
  }, t ? s ? E(!0) : C = c.run() : i ? i(E.bind(null, !0), !0) : c.run(), M.pause = c.pause.bind(c), M.resume = c.resume.bind(c), M.stop = M, M;
}
function Et(e, t = 1 / 0, n) {
  if (t <= 0 || !ye(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, be(e))
    Et(e.value, t, n);
  else if (Y(e))
    for (let s = 0; s < e.length; s++)
      Et(e[s], t, n);
  else if (vi(e) || cn(e))
    e.forEach((s) => {
      Et(s, t, n);
    });
  else if (wi(e)) {
    for (const s in e)
      Et(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && Et(e[s], t, n);
  }
  return e;
}
var Lt = { npm_package_repository: "fuchunhui/meme-view", npm_package_devDependencies_npm_run_all2: "^7.0.1", TERM_PROGRAM: "vscode", NODE: "/opt/homebrew/Cellar/node/22.8.0/bin/node", INIT_CWD: "/Users/fuchunhui/github/meme-view", NVM_CD_FLAGS: "-q", npm_package_dependencies_axios: "^1.7.9", npm_package_devDependencies_typescript: "~5.6.3", npm_package_homepage: "", TERM: "xterm-256color", SHELL: "/bin/zsh", npm_package_scripts_commitlint: "node scripts/verify-commit.js", npm_package_devDependencies_vite: "^6.0.1", HOMEBREW_REPOSITORY: "/opt/homebrew", TMPDIR: "/var/folders/b4/zxmfly155510n61rfm0yhjhh0000gp/T/", npm_package_devDependencies_semver: "^7.6.3", npm_package_scripts_release: "pnpm run lib && node scripts/release.js", TERM_PROGRAM_VERSION: "1.96.0", npm_package_scripts_dev: "vite", npm_package_devDependencies__vitejs_plugin_vue: "^5.2.1", ZDOTDIR: "/Users/fuchunhui", MONGODB_HOME: "/usr/local/mongodb/bin", ORIGINAL_XDG_CURRENT_DESKTOP: "undefined", MallocNanoZone: "0", SDKMAN_PLATFORM: "darwinarm64", npm_config_registry: "https://registry.npmjs.org/", npm_config_home: "https://www.npmjs.org", NVM_DIR: "/Users/fuchunhui/.nvm", USER: "fuchunhui", npm_package_description: "custom view for meme.", COMMAND_MODE: "unix2003", npm_package_scripts_deploy: "", PNPM_SCRIPT_SRC_DIR: "/Users/fuchunhui/github/meme-view", SDKMAN_CANDIDATES_API: "https://api.sdkman.io/2", SSH_AUTH_SOCK: "/private/tmp/com.apple.launchd.mtMddZahvW/Listeners", __CF_USER_TEXT_ENCODING: "0x1F6:0x19:0x34", npm_package_devDependencies_eslint: "^9.14.0", npm_package_devDependencies_less: "^4.2.1", npm_package_devDependencies_rollup_plugin_copy: "^3.5.0", npm_execpath: "/opt/homebrew/lib/node_modules/pnpm/bin/pnpm.cjs", npm_package_module: "dist/imeme.es.js", npm_package_scripts_type_check: "vue-tsc --build", npm_config_frozen_lockfile: "", PATH: "/Users/fuchunhui/github/meme-view/node_modules/.bin:/opt/homebrew/lib/node_modules/pnpm/dist/node-gyp-bin:/Users/fuchunhui/github/meme-view/node_modules/.bin:/opt/homebrew/lib/node_modules/pnpm/dist/node-gyp-bin:/usr/local/mongodb/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/mongodb/bin:/opt/homebrew/bin:/opt/homebrew/sbin", npm_package_dependencies_vue: "^3.5.13", USER_ZDOTDIR: "/Users/fuchunhui", __CFBundleIdentifier: "com.microsoft.VSCode", npm_package_keywords_4: "robot", npm_package_author: "fuchunhui", PWD: "/Users/fuchunhui/github/meme-view", npm_command: "run-script", npm_package_scripts_build_only: "vite build --mode development", npm_package_scripts_lib: "vue-tsc --build && vite build --mode lib --config vite.lib.config.ts", npm_lifecycle_event: "lib", LANG: "en_US.UTF-8", npm_package_name: "meme-view", npm_package_types: "index.d.ts", npm_package_devDependencies_execa: "^9.5.2", npm_package_keywords_0: "imeme", SDKMAN_VERSION: "5.16.0", npm_package_keywords_1: "meme", NODE_PATH: "/Users/fuchunhui/github/meme-view/node_modules/.pnpm/vite@6.0.3_@types+node@22.10.2_less@4.2.1/node_modules/vite/bin/node_modules:/Users/fuchunhui/github/meme-view/node_modules/.pnpm/vite@6.0.3_@types+node@22.10.2_less@4.2.1/node_modules/vite/node_modules:/Users/fuchunhui/github/meme-view/node_modules/.pnpm/vite@6.0.3_@types+node@22.10.2_less@4.2.1/node_modules:/Users/fuchunhui/github/meme-view/node_modules/.pnpm/node_modules", npm_package_scripts_build: 'run-p type-check "build-only {@}" --', npm_package_keywords_2: "vite", VSCODE_GIT_ASKPASS_EXTRA_ARGS: "", XPC_FLAGS: "0x0", npm_package_keywords_3: "lib", npm_package_engines_node: ">=16.0", npm_package_main: "dist/imeme.umd.js", npm_config_node_gyp: "/opt/homebrew/lib/node_modules/pnpm/dist/node_modules/node-gyp/bin/node-gyp.js", XPC_SERVICE_NAME: "0", npm_package_version: "2.2.0", VSCODE_INJECTION: "1", npm_package_dependencies_pinia: "^2.3.0", SHLVL: "3", HOME: "/Users/fuchunhui", npm_package_type: "module", npm_package_devDependencies__vue_tsconfig: "^0.7.0", VSCODE_GIT_ASKPASS_MAIN: "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass-main.js", npm_package_devDependencies_eslint_plugin_vue: "^9.30.0", npm_package_scripts_serve: "vite preview", HOMEBREW_PREFIX: "/opt/homebrew", npm_package_devDependencies_husky: "^8.0.3", npm_package_devDependencies__vue_eslint_config_typescript: "^14.1.3", LOGNAME: "fuchunhui", SDKMAN_DIR: "/Users/fuchunhui/.sdkman", npm_lifecycle_script: "vue-tsc --build && vite build --mode lib --config vite.lib.config.ts", VSCODE_GIT_IPC_HANDLE: "/var/folders/b4/zxmfly155510n61rfm0yhjhh0000gp/T/vscode-git-3b20d3e4f6.sock", npm_package_devDependencies__tsconfig_node22: "^22.0.0", npm_config_user_agent: "pnpm/9.12.1 npm/? node/v22.8.0 darwin arm64", VSCODE_GIT_ASKPASS_NODE: "/Applications/Visual Studio Code.app/Contents/Frameworks/Code Helper (Plugin).app/Contents/MacOS/Code Helper (Plugin)", GIT_ASKPASS: "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass.sh", SDKMAN_CANDIDATES_DIR: "/Users/fuchunhui/.sdkman/candidates", INFOPATH: "/opt/homebrew/share/info:/opt/homebrew/share/info:", HOMEBREW_CELLAR: "/opt/homebrew/Cellar", npm_package_devDependencies__types_node: "^22.9.3", npm_package_devDependencies_chalk: "^5.3.0", npm_package_files_2: "index.d.ts", npm_package_devDependencies_vite_plugin_vue_devtools: "^7.6.5", npm_package_files_1: "README.md", npm_package_files_0: "dist", npm_package_dependencies_vue_router: "^4.2.2", COLORTERM: "truecolor", npm_package_devDependencies_vue_tsc: "^2.1.10", npm_package_devDependencies_enquirer: "^2.4.1", npm_node_execpath: "/opt/homebrew/Cellar/node/22.8.0/bin/node", NODE_ENV: "production", VITE_USER_NODE_ENV: "production" };
const Mn = [];
let Xs = !1;
function gc(e, ...t) {
  if (Xs) return;
  Xs = !0, Ot();
  const n = Mn.length ? Mn[Mn.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = _c();
  if (s)
    yn(
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
          ({ vnode: o }) => `at <${Tl(n, o.type)}>`
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
  Pt(), Xs = !1;
}
function _c() {
  let e = Mn[Mn.length - 1];
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
`], ...yc(n));
  }), t;
}
function yc({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${Tl(
    e.component,
    e.type,
    s
  )}`, o = ">" + n;
  return e.props ? [r, ...bc(e.props), o] : [r + o];
}
function bc(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...Xi(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Xi(e, t, n) {
  return Ee(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : be(t) ? (t = Xi(e, ce(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : Z(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = ce(t), n ? t : [`${e}=`, t]);
}
function yn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    As(r, t, n);
  }
}
function _t(e, t, n, s) {
  if (Z(e)) {
    const r = yn(e, t, n, s);
    return r && yi(r) && r.catch((o) => {
      As(o, t, n);
    }), r;
  }
  if (Y(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(_t(e[o], t, n, s));
    return r;
  }
}
function As(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || ge;
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
      Ot(), yn(o, null, 10, [
        e,
        a,
        u
      ]), Pt();
      return;
    }
  }
  wc(e, n, r, s, i);
}
function wc(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const Ke = [];
let mt = -1;
const un = [];
let Ut = null, on = 0;
const Ji = /* @__PURE__ */ Promise.resolve();
let fs = null;
function Br(e) {
  const t = fs || Ji;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ec(e) {
  let t = mt + 1, n = Ke.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = Ke[s], o = Vn(r);
    o < e || o === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function Kr(e) {
  if (!(e.flags & 1)) {
    const t = Vn(e), n = Ke[Ke.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Vn(n) ? Ke.push(e) : Ke.splice(Ec(t), 0, e), e.flags |= 1, Yi();
  }
}
function Yi() {
  fs || (fs = Ji.then(Qi));
}
function Sc(e) {
  Y(e) ? un.push(...e) : Ut && e.id === -1 ? Ut.splice(on + 1, 0, e) : e.flags & 1 || (un.push(e), e.flags |= 1), Yi();
}
function uo(e, t, n = mt + 1) {
  for (; n < Ke.length; n++) {
    const s = Ke[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      Ke.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function Zi(e) {
  if (un.length) {
    const t = [...new Set(un)].sort(
      (n, s) => Vn(n) - Vn(s)
    );
    if (un.length = 0, Ut) {
      Ut.push(...t);
      return;
    }
    for (Ut = t, on = 0; on < Ut.length; on++) {
      const n = Ut[on];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Ut = null, on = 0;
  }
}
const Vn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Qi(e) {
  const t = lt;
  try {
    for (mt = 0; mt < Ke.length; mt++) {
      const n = Ke[mt];
      n && !(n.flags & 8) && (Lt.NODE_ENV !== "production" && t(n), n.flags & 4 && (n.flags &= -2), yn(
        n,
        n.i,
        n.i ? 15 : 14
      ), n.flags & 4 || (n.flags &= -2));
    }
  } finally {
    for (; mt < Ke.length; mt++) {
      const n = Ke[mt];
      n && (n.flags &= -2);
    }
    mt = -1, Ke.length = 0, Zi(), fs = null, (Ke.length || un.length) && Qi();
  }
}
let De = null, el = null;
function ds(e) {
  const t = De;
  return De = e, el = e && e.type.__scopeId || null, t;
}
function zr(e, t = De, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && bo(-1);
    const o = ds(t);
    let i;
    try {
      i = e(...r);
    } finally {
      ds(o), s._d && bo(1);
    }
    return i;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function dn(e, t) {
  if (De === null)
    return e;
  const n = Is(De), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, i, l, a = ge] = t[r];
    o && (Z(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && Et(i), s.push({
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
function qt(e, t, n, s) {
  const r = e.dirs, o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    o && (l.oldValue = o[i].value);
    let a = l.dir[s];
    a && (Ot(), _t(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Pt());
  }
}
const xc = Symbol("_vte"), Rc = (e) => e.__isTeleport;
function Wr(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Wr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Ie(e, t) {
  return Z(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Me({ name: e.name }, t, { setup: e })
  ) : e;
}
function tl(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function ps(e, t, n, s, r = !1) {
  if (Y(e)) {
    e.forEach(
      (v, w) => ps(
        v,
        t && (Y(t) ? t[w] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (fn(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && ps(e, t, n, s.component.subTree);
    return;
  }
  const o = s.shapeFlag & 4 ? Is(s.component) : s.el, i = r ? null : o, { i: l, r: a } = e, u = t && t.r, c = l.refs === ge ? l.refs = {} : l.refs, f = l.setupState, m = ce(f), h = f === ge ? () => !1 : (v) => me(m, v);
  if (u != null && u !== a && (Ee(u) ? (c[u] = null, h(u) && (f[u] = null)) : be(u) && (u.value = null)), Z(a))
    yn(a, l, 12, [i, c]);
  else {
    const v = Ee(a), w = be(a);
    if (v || w) {
      const R = () => {
        if (e.f) {
          const M = v ? h(a) ? f[a] : c[a] : a.value;
          r ? Y(M) && Nr(M, o) : Y(M) ? M.includes(o) || M.push(o) : v ? (c[a] = [o], h(a) && (f[a] = c[a])) : (a.value = [o], e.k && (c[e.k] = a.value));
        } else v ? (c[a] = i, h(a) && (f[a] = i)) : w && (a.value = i, e.k && (c[e.k] = i));
      };
      i ? (R.id = -1, Ze(R, n)) : R();
    }
  }
}
Rs().requestIdleCallback;
Rs().cancelIdleCallback;
const fn = (e) => !!e.type.__asyncLoader, nl = (e) => e.type.__isKeepAlive;
function Cc(e, t) {
  sl(e, "a", t);
}
function kc(e, t) {
  sl(e, "da", t);
}
function sl(e, t, n = ke) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Os(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      nl(r.parent.vnode) && Tc(s, t, n, r), r = r.parent;
  }
}
function Tc(e, t, n, s) {
  const r = Os(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  rl(() => {
    Nr(s[t], r);
  }, n);
}
function Os(e, t, n = ke, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      Ot();
      const l = Jn(n), a = _t(t, n, e, i);
      return l(), Pt(), a;
    });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const Dt = (e) => (t, n = ke) => {
  (!zn || e === "sp") && Os(e, (...s) => t(...s), n);
}, Ac = Dt("bm"), bn = Dt("m"), Oc = Dt(
  "bu"
), Pc = Dt("u"), Dc = Dt(
  "bum"
), rl = Dt("um"), Mc = Dt(
  "sp"
), Ic = Dt("rtg"), Nc = Dt("rtc");
function Fc(e, t = ke) {
  Os("ec", e, t);
}
const $c = "components";
function Lc(e, t) {
  return jc($c, e, !0, t) || e;
}
const Uc = Symbol.for("v-ndc");
function jc(e, t, n = !0, s = !1) {
  const r = De || ke;
  if (r) {
    const o = r.type;
    {
      const l = kl(
        o,
        !1
      );
      if (l && (l === t || l === it(t) || l === xs(it(t))))
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
  return e && (e[t] || e[it(t)] || e[xs(it(t))]);
}
function hr(e, t, n, s) {
  let r;
  const o = n, i = Y(e);
  if (i || Ee(e)) {
    const l = i && Bt(e);
    let a = !1;
    l && (a = !rt(e), e = Cs(e)), r = new Array(e.length);
    for (let u = 0, c = e.length; u < c; u++)
      r[u] = t(
        a ? Le(e[u]) : e[u],
        u,
        void 0,
        o
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, o);
  } else if (ye(e))
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
function Hc(e, t, n = {}, s, r) {
  if (De.ce || De.parent && fn(De.parent) && De.parent.ce)
    return Q(), et(
      Ce,
      null,
      [B("slot", n, s && s())],
      64
    );
  let o = e[t];
  o && o._c && (o._d = !1), Q();
  const i = o && ol(o(n)), l = n.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  i && i.key, a = et(
    Ce,
    {
      key: (l && !Tt(l) ? l : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!i && s ? "_fb" : "")
    },
    i || (s ? s() : []),
    i && e._ === 1 ? 64 : -2
  );
  return a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), o && o._c && (o._d = !0), a;
}
function ol(e) {
  return e.some((t) => Kn(t) ? !(t.type === zt || t.type === Ce && !ol(t.children)) : !0) ? e : null;
}
const mr = (e) => e ? Rl(e) ? Is(e) : mr(e.parent) : null, In = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Me(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => mr(e.parent),
    $root: (e) => mr(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Gr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Kr(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Br.bind(e.proxy)),
    $watch: (e) => cu.bind(e)
  })
), Js = (e, t) => e !== ge && !e.__isScriptSetup && me(e, t), Vc = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: l, appContext: a } = e;
    let u;
    if (t[0] !== "$") {
      const h = i[t];
      if (h !== void 0)
        switch (h) {
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
        if (Js(s, t))
          return i[t] = 1, s[t];
        if (r !== ge && me(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && me(u, t)
        )
          return i[t] = 3, o[t];
        if (n !== ge && me(n, t))
          return i[t] = 4, n[t];
        gr && (i[t] = 0);
      }
    }
    const c = In[t];
    let f, m;
    if (c)
      return t === "$attrs" && $e(e.attrs, "get", ""), c(e);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== ge && me(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      m = a.config.globalProperties, me(m, t)
    )
      return m[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return Js(r, t) ? (r[t] = n, !0) : s !== ge && me(s, t) ? (s[t] = n, !0) : me(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o }
  }, i) {
    let l;
    return !!n[i] || e !== ge && me(e, i) || Js(t, i) || (l = o[0]) && me(l, i) || me(s, i) || me(In, i) || me(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : me(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function po(e) {
  return Y(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let gr = !0;
function Bc(e) {
  const t = Gr(e), n = e.proxy, s = e.ctx;
  gr = !1, t.beforeCreate && ho(t.beforeCreate, e, "bc");
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
    beforeUpdate: h,
    updated: v,
    activated: w,
    deactivated: R,
    beforeDestroy: M,
    beforeUnmount: C,
    destroyed: E,
    unmounted: k,
    render: L,
    renderTracked: se,
    renderTriggered: G,
    errorCaptured: K,
    serverPrefetch: z,
    // public API
    expose: H,
    inheritAttrs: q,
    // assets
    components: te,
    directives: ae,
    filters: Ae
  } = t;
  if (u && Kc(u, s, null), i)
    for (const W in i) {
      const oe = i[W];
      Z(oe) && (s[W] = oe.bind(n));
    }
  if (r) {
    const W = r.call(n, n);
    ye(W) && (e.data = Xn(W));
  }
  if (gr = !0, o)
    for (const W in o) {
      const oe = o[W], je = Z(oe) ? oe.bind(n, n) : Z(oe.get) ? oe.get.bind(n, n) : lt, We = !Z(oe) && Z(oe.set) ? oe.set.bind(n) : lt, Fe = ue({
        get: je,
        set: We
      });
      Object.defineProperty(s, W, {
        enumerable: !0,
        configurable: !0,
        get: () => Fe.value,
        set: (Se) => Fe.value = Se
      });
    }
  if (l)
    for (const W in l)
      il(l[W], s, n, W);
  if (a) {
    const W = Z(a) ? a.call(n) : a;
    Reflect.ownKeys(W).forEach((oe) => {
      ot(oe, W[oe]);
    });
  }
  c && ho(c, e, "c");
  function fe(W, oe) {
    Y(oe) ? oe.forEach((je) => W(je.bind(n))) : oe && W(oe.bind(n));
  }
  if (fe(Ac, f), fe(bn, m), fe(Oc, h), fe(Pc, v), fe(Cc, w), fe(kc, R), fe(Fc, K), fe(Nc, se), fe(Ic, G), fe(Dc, C), fe(rl, k), fe(Mc, z), Y(H))
    if (H.length) {
      const W = e.exposed || (e.exposed = {});
      H.forEach((oe) => {
        Object.defineProperty(W, oe, {
          get: () => n[oe],
          set: (je) => n[oe] = je
        });
      });
    } else e.exposed || (e.exposed = {});
  L && e.render === lt && (e.render = L), q != null && (e.inheritAttrs = q), te && (e.components = te), ae && (e.directives = ae), z && tl(e);
}
function Kc(e, t, n = lt) {
  Y(e) && (e = _r(e));
  for (const s in e) {
    const r = e[s];
    let o;
    ye(r) ? "default" in r ? o = Te(
      r.from || s,
      r.default,
      !0
    ) : o = Te(r.from || s) : o = Te(r), be(o) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (i) => o.value = i
    }) : t[s] = o;
  }
}
function ho(e, t, n) {
  _t(
    Y(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function il(e, t, n, s) {
  let r = s.includes(".") ? bl(n, s) : () => n[s];
  if (Ee(e)) {
    const o = t[e];
    Z(o) && St(r, o);
  } else if (Z(e))
    St(r, e.bind(n));
  else if (ye(e))
    if (Y(e))
      e.forEach((o) => il(o, t, n, s));
    else {
      const o = Z(e.handler) ? e.handler.bind(n) : t[e.handler];
      Z(o) && St(r, o, e);
    }
}
function Gr(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = o.get(t);
  let a;
  return l ? a = l : !r.length && !n && !s ? a = t : (a = {}, r.length && r.forEach(
    (u) => hs(a, u, i, !0)
  ), hs(a, t, i)), ye(t) && o.set(t, a), a;
}
function hs(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && hs(e, o, n, !0), r && r.forEach(
    (i) => hs(e, i, n, !0)
  );
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = zc[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const zc = {
  data: mo,
  props: go,
  emits: go,
  // objects
  methods: An,
  computed: An,
  // lifecycle
  beforeCreate: Ve,
  created: Ve,
  beforeMount: Ve,
  mounted: Ve,
  beforeUpdate: Ve,
  updated: Ve,
  beforeDestroy: Ve,
  beforeUnmount: Ve,
  destroyed: Ve,
  unmounted: Ve,
  activated: Ve,
  deactivated: Ve,
  errorCaptured: Ve,
  serverPrefetch: Ve,
  // assets
  components: An,
  directives: An,
  // watch
  watch: Gc,
  // provide / inject
  provide: mo,
  inject: Wc
};
function mo(e, t) {
  return t ? e ? function() {
    return Me(
      Z(e) ? e.call(this, this) : e,
      Z(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Wc(e, t) {
  return An(_r(e), _r(t));
}
function _r(e) {
  if (Y(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ve(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function An(e, t) {
  return e ? Me(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function go(e, t) {
  return e ? Y(e) && Y(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Me(
    /* @__PURE__ */ Object.create(null),
    po(e),
    po(t ?? {})
  ) : t;
}
function Gc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Me(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Ve(e[s], t[s]);
  return n;
}
function ll() {
  return {
    app: null,
    config: {
      isNativeTag: Ta,
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
let qc = 0;
function Xc(e, t) {
  return function(s, r = null) {
    Z(s) || (s = Me({}, s)), r != null && !ye(r) && (r = null);
    const o = ll(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const u = o.app = {
      _uid: qc++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: Pu,
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
          const h = u._ceVNode || B(s, r);
          return h.appContext = o, m === !0 ? m = "svg" : m === !1 && (m = void 0), f && t ? t(h, c) : e(h, c, m), a = !0, u._container = c, c.__vue_app__ = u, Is(h.component);
        }
      },
      onUnmount(c) {
        l.push(c);
      },
      unmount() {
        a && (_t(
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
function ot(e, t) {
  if (ke) {
    let n = ke.provides;
    const s = ke.parent && ke.parent.provides;
    s === n && (n = ke.provides = Object.create(s)), n[e] = t;
  }
}
function Te(e, t, n = !1) {
  const s = ke || De;
  if (s || Qt) {
    const r = Qt ? Qt._context.provides : s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && Z(t) ? t.call(s && s.proxy) : t;
  }
}
function Jc() {
  return !!(ke || De || Qt);
}
const al = {}, cl = () => Object.create(al), ul = (e) => Object.getPrototypeOf(e) === al;
function Yc(e, t, n, s = !1) {
  const r = {}, o = cl();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), fl(e, t, r, o);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  n ? e.props = s ? r : zi(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function Zc(e, t, n, s) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: i }
  } = e, l = ce(r), [a] = e.propsOptions;
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
        if (Ps(e.emitsOptions, m))
          continue;
        const h = t[m];
        if (a)
          if (me(o, m))
            h !== o[m] && (o[m] = h, u = !0);
          else {
            const v = it(m);
            r[v] = vr(
              a,
              l,
              v,
              h,
              e,
              !1
            );
          }
        else
          h !== o[m] && (o[m] = h, u = !0);
      }
    }
  } else {
    fl(e, t, r, o) && (u = !0);
    let c;
    for (const f in l)
      (!t || // for camelCase
      !me(t, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Wt(f)) === f || !me(t, c))) && (a ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[c] !== void 0) && (r[f] = vr(
        a,
        l,
        f,
        void 0,
        e,
        !0
      )) : delete r[f]);
    if (o !== l)
      for (const f in o)
        (!t || !me(t, f)) && (delete o[f], u = !0);
  }
  u && wt(e.attrs, "set", "");
}
function fl(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let a in t) {
      if (On(a))
        continue;
      const u = t[a];
      let c;
      r && me(r, c = it(a)) ? !o || !o.includes(c) ? n[c] = u : (l || (l = {}))[c] = u : Ps(e.emitsOptions, a) || (!(a in s) || u !== s[a]) && (s[a] = u, i = !0);
    }
  if (o) {
    const a = ce(n), u = l || ge;
    for (let c = 0; c < o.length; c++) {
      const f = o[c];
      n[f] = vr(
        r,
        a,
        f,
        u[f],
        e,
        !me(u, f)
      );
    }
  }
  return i;
}
function vr(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const l = me(i, "default");
    if (l && s === void 0) {
      const a = i.default;
      if (i.type !== Function && !i.skipFactory && Z(a)) {
        const { propsDefaults: u } = r;
        if (n in u)
          s = u[n];
        else {
          const c = Jn(r);
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
const Qc = /* @__PURE__ */ new WeakMap();
function dl(e, t, n = !1) {
  const s = n ? Qc : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const o = e.props, i = {}, l = [];
  let a = !1;
  if (!Z(e)) {
    const c = (f) => {
      a = !0;
      const [m, h] = dl(f, t, !0);
      Me(i, m), h && l.push(...h);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!o && !a)
    return ye(e) && s.set(e, an), an;
  if (Y(o))
    for (let c = 0; c < o.length; c++) {
      const f = it(o[c]);
      _o(f) && (i[f] = ge);
    }
  else if (o)
    for (const c in o) {
      const f = it(c);
      if (_o(f)) {
        const m = o[c], h = i[f] = Y(m) || Z(m) ? { type: m } : Me({}, m), v = h.type;
        let w = !1, R = !0;
        if (Y(v))
          for (let M = 0; M < v.length; ++M) {
            const C = v[M], E = Z(C) && C.name;
            if (E === "Boolean") {
              w = !0;
              break;
            } else E === "String" && (R = !1);
          }
        else
          w = Z(v) && v.name === "Boolean";
        h[
          0
          /* shouldCast */
        ] = w, h[
          1
          /* shouldCastTrue */
        ] = R, (w || me(h, "default")) && l.push(f);
      }
    }
  const u = [i, l];
  return ye(e) && s.set(e, u), u;
}
function _o(e) {
  return e[0] !== "$" && !On(e);
}
const pl = (e) => e[0] === "_" || e === "$stable", qr = (e) => Y(e) ? e.map(gt) : [gt(e)], eu = (e, t, n) => {
  if (t._n)
    return t;
  const s = zr((...r) => (Lt.NODE_ENV !== "production" && ke && (!n || (n.root, ke.root)), qr(t(...r))), n);
  return s._c = !1, s;
}, hl = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (pl(r)) continue;
    const o = e[r];
    if (Z(o))
      t[r] = eu(r, o, s);
    else if (o != null) {
      const i = qr(o);
      t[r] = () => i;
    }
  }
}, ml = (e, t) => {
  const n = qr(t);
  e.slots.default = () => n;
}, gl = (e, t, n) => {
  for (const s in t)
    (n || s !== "_") && (e[s] = t[s]);
}, tu = (e, t, n) => {
  const s = e.slots = cl();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (gl(s, t, n), n && Ei(s, "_", r, !0)) : hl(t, s);
  } else t && ml(e, t);
}, nu = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let o = !0, i = ge;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? o = !1 : gl(r, t, n) : (o = !t.$stable, hl(t, r)), i = t;
  } else t && (ml(e, t), i = { default: 1 });
  if (o)
    for (const l in r)
      !pl(l) && i[l] == null && delete r[l];
}, Ze = gu;
function su(e) {
  return ru(e);
}
function ru(e, t) {
  const n = Rs();
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
    setScopeId: h = lt,
    insertStaticContent: v
  } = e, w = (p, d, _, O = null, g = null, S = null, y = void 0, b = null, x = !!d.dynamicChildren) => {
    if (p === d)
      return;
    p && !Rn(p, d) && (O = D(p), Se(p, g, S, !0), p = null), d.patchFlag === -2 && (x = !1, d.dynamicChildren = null);
    const { type: T, ref: N, shapeFlag: I } = d;
    switch (T) {
      case Ds:
        R(p, d, _, O);
        break;
      case zt:
        M(p, d, _, O);
        break;
      case Qs:
        p == null && C(d, _, O, y);
        break;
      case Ce:
        te(
          p,
          d,
          _,
          O,
          g,
          S,
          y,
          b,
          x
        );
        break;
      default:
        I & 1 ? L(
          p,
          d,
          _,
          O,
          g,
          S,
          y,
          b,
          x
        ) : I & 6 ? ae(
          p,
          d,
          _,
          O,
          g,
          S,
          y,
          b,
          x
        ) : (I & 64 || I & 128) && T.process(
          p,
          d,
          _,
          O,
          g,
          S,
          y,
          b,
          x,
          V
        );
    }
    N != null && g && ps(N, p && p.ref, S, d || p, !d);
  }, R = (p, d, _, O) => {
    if (p == null)
      s(
        d.el = l(d.children),
        _,
        O
      );
    else {
      const g = d.el = p.el;
      d.children !== p.children && u(g, d.children);
    }
  }, M = (p, d, _, O) => {
    p == null ? s(
      d.el = a(d.children || ""),
      _,
      O
    ) : d.el = p.el;
  }, C = (p, d, _, O) => {
    [p.el, p.anchor] = v(
      p.children,
      d,
      _,
      O,
      p.el,
      p.anchor
    );
  }, E = ({ el: p, anchor: d }, _, O) => {
    let g;
    for (; p && p !== d; )
      g = m(p), s(p, _, O), p = g;
    s(d, _, O);
  }, k = ({ el: p, anchor: d }) => {
    let _;
    for (; p && p !== d; )
      _ = m(p), r(p), p = _;
    r(d);
  }, L = (p, d, _, O, g, S, y, b, x) => {
    d.type === "svg" ? y = "svg" : d.type === "math" && (y = "mathml"), p == null ? se(
      d,
      _,
      O,
      g,
      S,
      y,
      b,
      x
    ) : z(
      p,
      d,
      g,
      S,
      y,
      b,
      x
    );
  }, se = (p, d, _, O, g, S, y, b) => {
    let x, T;
    const { props: N, shapeFlag: I, transition: F, dirs: j } = p;
    if (x = p.el = i(
      p.type,
      S,
      N && N.is,
      N
    ), I & 8 ? c(x, p.children) : I & 16 && K(
      p.children,
      x,
      null,
      O,
      g,
      Ys(p, S),
      y,
      b
    ), j && qt(p, null, O, "created"), G(x, p, p.scopeId, y, O), N) {
      for (const re in N)
        re !== "value" && !On(re) && o(x, re, null, N[re], S, O);
      "value" in N && o(x, "value", null, N.value, S), (T = N.onVnodeBeforeMount) && pt(T, O, p);
    }
    j && qt(p, null, O, "beforeMount");
    const J = ou(g, F);
    J && F.beforeEnter(x), s(x, d, _), ((T = N && N.onVnodeMounted) || J || j) && Ze(() => {
      T && pt(T, O, p), J && F.enter(x), j && qt(p, null, O, "mounted");
    }, g);
  }, G = (p, d, _, O, g) => {
    if (_ && h(p, _), O)
      for (let S = 0; S < O.length; S++)
        h(p, O[S]);
    if (g) {
      let S = g.subTree;
      if (d === S || El(S.type) && (S.ssContent === d || S.ssFallback === d)) {
        const y = g.vnode;
        G(
          p,
          y,
          y.scopeId,
          y.slotScopeIds,
          g.parent
        );
      }
    }
  }, K = (p, d, _, O, g, S, y, b, x = 0) => {
    for (let T = x; T < p.length; T++) {
      const N = p[T] = b ? jt(p[T]) : gt(p[T]);
      w(
        null,
        N,
        d,
        _,
        O,
        g,
        S,
        y,
        b
      );
    }
  }, z = (p, d, _, O, g, S, y) => {
    const b = d.el = p.el;
    let { patchFlag: x, dynamicChildren: T, dirs: N } = d;
    x |= p.patchFlag & 16;
    const I = p.props || ge, F = d.props || ge;
    let j;
    if (_ && Xt(_, !1), (j = F.onVnodeBeforeUpdate) && pt(j, _, d, p), N && qt(d, p, _, "beforeUpdate"), _ && Xt(_, !0), (I.innerHTML && F.innerHTML == null || I.textContent && F.textContent == null) && c(b, ""), T ? H(
      p.dynamicChildren,
      T,
      b,
      _,
      O,
      Ys(d, g),
      S
    ) : y || oe(
      p,
      d,
      b,
      null,
      _,
      O,
      Ys(d, g),
      S,
      !1
    ), x > 0) {
      if (x & 16)
        q(b, I, F, _, g);
      else if (x & 2 && I.class !== F.class && o(b, "class", null, F.class, g), x & 4 && o(b, "style", I.style, F.style, g), x & 8) {
        const J = d.dynamicProps;
        for (let re = 0; re < J.length; re++) {
          const ie = J[re], Ne = I[ie], we = F[ie];
          (we !== Ne || ie === "value") && o(b, ie, Ne, we, g, _);
        }
      }
      x & 1 && p.children !== d.children && c(b, d.children);
    } else !y && T == null && q(b, I, F, _, g);
    ((j = F.onVnodeUpdated) || N) && Ze(() => {
      j && pt(j, _, d, p), N && qt(d, p, _, "updated");
    }, O);
  }, H = (p, d, _, O, g, S, y) => {
    for (let b = 0; b < d.length; b++) {
      const x = p[b], T = d[b], N = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        x.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (x.type === Ce || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Rn(x, T) || // - In the case of a component, it could contain anything.
        x.shapeFlag & 70) ? f(x.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          _
        )
      );
      w(
        x,
        T,
        N,
        null,
        O,
        g,
        S,
        y,
        !0
      );
    }
  }, q = (p, d, _, O, g) => {
    if (d !== _) {
      if (d !== ge)
        for (const S in d)
          !On(S) && !(S in _) && o(
            p,
            S,
            d[S],
            null,
            g,
            O
          );
      for (const S in _) {
        if (On(S)) continue;
        const y = _[S], b = d[S];
        y !== b && S !== "value" && o(p, S, b, y, g, O);
      }
      "value" in _ && o(p, "value", d.value, _.value, g);
    }
  }, te = (p, d, _, O, g, S, y, b, x) => {
    const T = d.el = p ? p.el : l(""), N = d.anchor = p ? p.anchor : l("");
    let { patchFlag: I, dynamicChildren: F, slotScopeIds: j } = d;
    j && (b = b ? b.concat(j) : j), p == null ? (s(T, _, O), s(N, _, O), K(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      _,
      N,
      g,
      S,
      y,
      b,
      x
    )) : I > 0 && I & 64 && F && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren ? (H(
      p.dynamicChildren,
      F,
      _,
      g,
      S,
      y,
      b
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || g && d === g.subTree) && _l(
      p,
      d,
      !0
      /* shallow */
    )) : oe(
      p,
      d,
      _,
      N,
      g,
      S,
      y,
      b,
      x
    );
  }, ae = (p, d, _, O, g, S, y, b, x) => {
    d.slotScopeIds = b, p == null ? d.shapeFlag & 512 ? g.ctx.activate(
      d,
      _,
      O,
      y,
      x
    ) : Ae(
      d,
      _,
      O,
      g,
      S,
      y,
      x
    ) : ve(p, d, x);
  }, Ae = (p, d, _, O, g, S, y) => {
    const b = p.component = Su(
      p,
      O,
      g
    );
    if (nl(p) && (b.ctx.renderer = V), xu(b, !1, y), b.asyncDep) {
      if (g && g.registerDep(b, fe, y), !p.el) {
        const x = b.subTree = B(zt);
        M(null, x, d, _);
      }
    } else
      fe(
        b,
        p,
        d,
        _,
        g,
        S,
        y
      );
  }, ve = (p, d, _) => {
    const O = d.component = p.component;
    if (hu(p, d, _))
      if (O.asyncDep && !O.asyncResolved) {
        W(O, d, _);
        return;
      } else
        O.next = d, O.update();
    else
      d.el = p.el, O.vnode = d;
  }, fe = (p, d, _, O, g, S, y) => {
    const b = () => {
      if (p.isMounted) {
        let { next: I, bu: F, u: j, parent: J, vnode: re } = p;
        {
          const He = vl(p);
          if (He) {
            I && (I.el = re.el, W(p, I, y)), He.asyncDep.then(() => {
              p.isUnmounted || b();
            });
            return;
          }
        }
        let ie = I, Ne;
        Xt(p, !1), I ? (I.el = re.el, W(p, I, y)) : I = re, F && Ks(F), (Ne = I.props && I.props.onVnodeBeforeUpdate) && pt(Ne, J, I, re), Xt(p, !0);
        const we = Zs(p), Je = p.subTree;
        p.subTree = we, w(
          Je,
          we,
          // parent may have changed if it's in a teleport
          f(Je.el),
          // anchor may have changed if it's in a fragment
          D(Je),
          p,
          g,
          S
        ), I.el = we.el, ie === null && mu(p, we.el), j && Ze(j, g), (Ne = I.props && I.props.onVnodeUpdated) && Ze(
          () => pt(Ne, J, I, re),
          g
        );
      } else {
        let I;
        const { el: F, props: j } = d, { bm: J, m: re, parent: ie, root: Ne, type: we } = p, Je = fn(d);
        if (Xt(p, !1), J && Ks(J), !Je && (I = j && j.onVnodeBeforeMount) && pt(I, ie, d), Xt(p, !0), F && de) {
          const He = () => {
            p.subTree = Zs(p), de(
              F,
              p.subTree,
              p,
              g,
              null
            );
          };
          Je && we.__asyncHydrate ? we.__asyncHydrate(
            F,
            p,
            He
          ) : He();
        } else {
          Ne.ce && Ne.ce._injectChildStyle(we);
          const He = p.subTree = Zs(p);
          w(
            null,
            He,
            _,
            O,
            p,
            g,
            S
          ), d.el = He.el;
        }
        if (re && Ze(re, g), !Je && (I = j && j.onVnodeMounted)) {
          const He = d;
          Ze(
            () => pt(I, ie, He),
            g
          );
        }
        (d.shapeFlag & 256 || ie && fn(ie.vnode) && ie.vnode.shapeFlag & 256) && p.a && Ze(p.a, g), p.isMounted = !0, d = _ = O = null;
      }
    };
    p.scope.on();
    const x = p.effect = new Ai(b);
    p.scope.off();
    const T = p.update = x.run.bind(x), N = p.job = x.runIfDirty.bind(x);
    N.i = p, N.id = p.uid, x.scheduler = () => Kr(N), Xt(p, !0), T();
  }, W = (p, d, _) => {
    d.component = p;
    const O = p.vnode.props;
    p.vnode = d, p.next = null, Zc(p, d.props, O, _), nu(p, d.children, _), Ot(), uo(p), Pt();
  }, oe = (p, d, _, O, g, S, y, b, x = !1) => {
    const T = p && p.children, N = p ? p.shapeFlag : 0, I = d.children, { patchFlag: F, shapeFlag: j } = d;
    if (F > 0) {
      if (F & 128) {
        We(
          T,
          I,
          _,
          O,
          g,
          S,
          y,
          b,
          x
        );
        return;
      } else if (F & 256) {
        je(
          T,
          I,
          _,
          O,
          g,
          S,
          y,
          b,
          x
        );
        return;
      }
    }
    j & 8 ? (N & 16 && Oe(T, g, S), I !== T && c(_, I)) : N & 16 ? j & 16 ? We(
      T,
      I,
      _,
      O,
      g,
      S,
      y,
      b,
      x
    ) : Oe(T, g, S, !0) : (N & 8 && c(_, ""), j & 16 && K(
      I,
      _,
      O,
      g,
      S,
      y,
      b,
      x
    ));
  }, je = (p, d, _, O, g, S, y, b, x) => {
    p = p || an, d = d || an;
    const T = p.length, N = d.length, I = Math.min(T, N);
    let F;
    for (F = 0; F < I; F++) {
      const j = d[F] = x ? jt(d[F]) : gt(d[F]);
      w(
        p[F],
        j,
        _,
        null,
        g,
        S,
        y,
        b,
        x
      );
    }
    T > N ? Oe(
      p,
      g,
      S,
      !0,
      !1,
      I
    ) : K(
      d,
      _,
      O,
      g,
      S,
      y,
      b,
      x,
      I
    );
  }, We = (p, d, _, O, g, S, y, b, x) => {
    let T = 0;
    const N = d.length;
    let I = p.length - 1, F = N - 1;
    for (; T <= I && T <= F; ) {
      const j = p[T], J = d[T] = x ? jt(d[T]) : gt(d[T]);
      if (Rn(j, J))
        w(
          j,
          J,
          _,
          null,
          g,
          S,
          y,
          b,
          x
        );
      else
        break;
      T++;
    }
    for (; T <= I && T <= F; ) {
      const j = p[I], J = d[F] = x ? jt(d[F]) : gt(d[F]);
      if (Rn(j, J))
        w(
          j,
          J,
          _,
          null,
          g,
          S,
          y,
          b,
          x
        );
      else
        break;
      I--, F--;
    }
    if (T > I) {
      if (T <= F) {
        const j = F + 1, J = j < N ? d[j].el : O;
        for (; T <= F; )
          w(
            null,
            d[T] = x ? jt(d[T]) : gt(d[T]),
            _,
            J,
            g,
            S,
            y,
            b,
            x
          ), T++;
      }
    } else if (T > F)
      for (; T <= I; )
        Se(p[T], g, S, !0), T++;
    else {
      const j = T, J = T, re = /* @__PURE__ */ new Map();
      for (T = J; T <= F; T++) {
        const Ye = d[T] = x ? jt(d[T]) : gt(d[T]);
        Ye.key != null && re.set(Ye.key, T);
      }
      let ie, Ne = 0;
      const we = F - J + 1;
      let Je = !1, He = 0;
      const Gt = new Array(we);
      for (T = 0; T < we; T++) Gt[T] = 0;
      for (T = j; T <= I; T++) {
        const Ye = p[T];
        if (Ne >= we) {
          Se(Ye, g, S, !0);
          continue;
        }
        let dt;
        if (Ye.key != null)
          dt = re.get(Ye.key);
        else
          for (ie = J; ie <= F; ie++)
            if (Gt[ie - J] === 0 && Rn(Ye, d[ie])) {
              dt = ie;
              break;
            }
        dt === void 0 ? Se(Ye, g, S, !0) : (Gt[dt - J] = T + 1, dt >= He ? He = dt : Je = !0, w(
          Ye,
          d[dt],
          _,
          null,
          g,
          S,
          y,
          b,
          x
        ), Ne++);
      }
      const Sn = Je ? iu(Gt) : an;
      for (ie = Sn.length - 1, T = we - 1; T >= 0; T--) {
        const Ye = J + T, dt = d[Ye], io = Ye + 1 < N ? d[Ye + 1].el : O;
        Gt[T] === 0 ? w(
          null,
          dt,
          _,
          io,
          g,
          S,
          y,
          b,
          x
        ) : Je && (ie < 0 || T !== Sn[ie] ? Fe(dt, _, io, 2) : ie--);
      }
    }
  }, Fe = (p, d, _, O, g = null) => {
    const { el: S, type: y, transition: b, children: x, shapeFlag: T } = p;
    if (T & 6) {
      Fe(p.component.subTree, d, _, O);
      return;
    }
    if (T & 128) {
      p.suspense.move(d, _, O);
      return;
    }
    if (T & 64) {
      y.move(p, d, _, V);
      return;
    }
    if (y === Ce) {
      s(S, d, _);
      for (let I = 0; I < x.length; I++)
        Fe(x[I], d, _, O);
      s(p.anchor, d, _);
      return;
    }
    if (y === Qs) {
      E(p, d, _);
      return;
    }
    if (O !== 2 && T & 1 && b)
      if (O === 0)
        b.beforeEnter(S), s(S, d, _), Ze(() => b.enter(S), g);
      else {
        const { leave: I, delayLeave: F, afterLeave: j } = b, J = () => s(S, d, _), re = () => {
          I(S, () => {
            J(), j && j();
          });
        };
        F ? F(S, J, re) : re();
      }
    else
      s(S, d, _);
  }, Se = (p, d, _, O = !1, g = !1) => {
    const {
      type: S,
      props: y,
      ref: b,
      children: x,
      dynamicChildren: T,
      shapeFlag: N,
      patchFlag: I,
      dirs: F,
      cacheIndex: j
    } = p;
    if (I === -2 && (g = !1), b != null && ps(b, null, _, p, !0), j != null && (d.renderCache[j] = void 0), N & 256) {
      d.ctx.deactivate(p);
      return;
    }
    const J = N & 1 && F, re = !fn(p);
    let ie;
    if (re && (ie = y && y.onVnodeBeforeUnmount) && pt(ie, d, p), N & 6)
      ft(p.component, _, O);
    else {
      if (N & 128) {
        p.suspense.unmount(_, O);
        return;
      }
      J && qt(p, null, d, "beforeUnmount"), N & 64 ? p.type.remove(
        p,
        d,
        _,
        V,
        O
      ) : T && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !T.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (S !== Ce || I > 0 && I & 64) ? Oe(
        T,
        d,
        _,
        !1,
        !0
      ) : (S === Ce && I & 384 || !g && N & 16) && Oe(x, d, _), O && Ge(p);
    }
    (re && (ie = y && y.onVnodeUnmounted) || J) && Ze(() => {
      ie && pt(ie, d, p), J && qt(p, null, d, "unmounted");
    }, _);
  }, Ge = (p) => {
    const { type: d, el: _, anchor: O, transition: g } = p;
    if (d === Ce) {
      qe(_, O);
      return;
    }
    if (d === Qs) {
      k(p);
      return;
    }
    const S = () => {
      r(_), g && !g.persisted && g.afterLeave && g.afterLeave();
    };
    if (p.shapeFlag & 1 && g && !g.persisted) {
      const { leave: y, delayLeave: b } = g, x = () => y(_, S);
      b ? b(p.el, S, x) : x();
    } else
      S();
  }, qe = (p, d) => {
    let _;
    for (; p !== d; )
      _ = m(p), r(p), p = _;
    r(d);
  }, ft = (p, d, _) => {
    const { bum: O, scope: g, job: S, subTree: y, um: b, m: x, a: T } = p;
    vo(x), vo(T), O && Ks(O), g.stop(), S && (S.flags |= 8, Se(y, p, d, _)), b && Ze(b, d), Ze(() => {
      p.isUnmounted = !0;
    }, d), d && d.pendingBranch && !d.isUnmounted && p.asyncDep && !p.asyncResolved && p.suspenseId === d.pendingId && (d.deps--, d.deps === 0 && d.resolve());
  }, Oe = (p, d, _, O = !1, g = !1, S = 0) => {
    for (let y = S; y < p.length; y++)
      Se(p[y], d, _, O, g);
  }, D = (p) => {
    if (p.shapeFlag & 6)
      return D(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const d = m(p.anchor || p.el), _ = d && d[xc];
    return _ ? m(_) : d;
  };
  let U = !1;
  const $ = (p, d, _) => {
    p == null ? d._vnode && Se(d._vnode, null, null, !0) : w(
      d._vnode || null,
      p,
      d,
      null,
      null,
      null,
      _
    ), d._vnode = p, U || (U = !0, uo(), Zi(), U = !1);
  }, V = {
    p: w,
    um: Se,
    m: Fe,
    r: Ge,
    mt: Ae,
    mc: K,
    pc: oe,
    pbc: H,
    n: D,
    o: e
  };
  let le, de;
  return {
    render: $,
    hydrate: le,
    createApp: Xc($, le)
  };
}
function Ys({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Xt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function ou(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function _l(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (Y(s) && Y(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let l = r[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[o] = jt(r[o]), l.el = i.el), !n && l.patchFlag !== -2 && _l(i, l)), l.type === Ds && (l.el = i.el);
    }
}
function iu(e) {
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
function vl(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : vl(t);
}
function vo(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const lu = Symbol.for("v-scx"), au = () => Te(lu);
function St(e, t, n) {
  return yl(e, t, n);
}
function yl(e, t, n = ge) {
  const { immediate: s, deep: r, flush: o, once: i } = n, l = Me({}, n), a = t && s || !t && o !== "post";
  let u;
  if (zn) {
    if (o === "sync") {
      const h = au();
      u = h.__watcherHandles || (h.__watcherHandles = []);
    } else if (!a) {
      const h = () => {
      };
      return h.stop = lt, h.resume = lt, h.pause = lt, h;
    }
  }
  const c = ke;
  l.call = (h, v, w) => _t(h, c, v, w);
  let f = !1;
  o === "post" ? l.scheduler = (h) => {
    Ze(h, c && c.suspense);
  } : o !== "sync" && (f = !0, l.scheduler = (h, v) => {
    v ? h() : Kr(h);
  }), l.augmentJob = (h) => {
    t && (h.flags |= 4), f && (h.flags |= 2, c && (h.id = c.uid, h.i = c));
  };
  const m = mc(e, t, l);
  return zn && (u ? u.push(m) : a && m()), m;
}
function cu(e, t, n) {
  const s = this.proxy, r = Ee(e) ? e.includes(".") ? bl(s, e) : () => s[e] : e.bind(s, s);
  let o;
  Z(t) ? o = t : (o = t.handler, n = t);
  const i = Jn(this), l = yl(r, o.bind(s), n);
  return i(), l;
}
function bl(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const uu = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${it(t)}Modifiers`] || e[`${Wt(t)}Modifiers`];
function fu(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || ge;
  let r = n;
  const o = t.startsWith("update:"), i = o && uu(s, t.slice(7));
  i && (i.trim && (r = n.map((c) => Ee(c) ? c.trim() : c)), i.number && (r = n.map(Ma)));
  let l, a = s[l = Bs(t)] || // also try camelCase event handler (#2249)
  s[l = Bs(it(t))];
  !a && o && (a = s[l = Bs(Wt(t))]), a && _t(
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
    e.emitted[l] = !0, _t(
      u,
      e,
      6,
      r
    );
  }
}
function wl(e, t, n = !1) {
  const s = t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let i = {}, l = !1;
  if (!Z(e)) {
    const a = (u) => {
      const c = wl(u, t, !0);
      c && (l = !0, Me(i, c));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !l ? (ye(e) && s.set(e, null), null) : (Y(o) ? o.forEach((a) => i[a] = null) : Me(i, o), ye(e) && s.set(e, i), i);
}
function Ps(e, t) {
  return !e || !ws(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), me(e, t[0].toLowerCase() + t.slice(1)) || me(e, Wt(t)) || me(e, t));
}
function Zs(e) {
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
    setupState: h,
    ctx: v,
    inheritAttrs: w
  } = e, R = ds(e);
  let M, C;
  try {
    if (n.shapeFlag & 4) {
      const k = r || s, L = Lt.NODE_ENV !== "production" && h.__isScriptSetup ? new Proxy(k, {
        get(se, G, K) {
          return gc(
            `Property '${String(
              G
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(se, G, K);
        }
      }) : k;
      M = gt(
        u.call(
          L,
          k,
          c,
          Lt.NODE_ENV !== "production" ? ts(f) : f,
          h,
          m,
          v
        )
      ), C = l;
    } else {
      const k = t;
      Lt.NODE_ENV, M = gt(
        k.length > 1 ? k(
          Lt.NODE_ENV !== "production" ? ts(f) : f,
          Lt.NODE_ENV !== "production" ? {
            get attrs() {
              return ts(l);
            },
            slots: i,
            emit: a
          } : { attrs: l, slots: i, emit: a }
        ) : k(
          Lt.NODE_ENV !== "production" ? ts(f) : f,
          null
        )
      ), C = t.props ? l : du(l);
    }
  } catch (k) {
    Nn.length = 0, As(k, e, 1), M = B(zt);
  }
  let E = M;
  if (C && w !== !1) {
    const k = Object.keys(C), { shapeFlag: L } = E;
    k.length && L & 7 && (o && k.some(Ir) && (C = pu(
      C,
      o
    )), E = pn(E, C, !1, !0));
  }
  return n.dirs && (E = pn(E, null, !1, !0), E.dirs = E.dirs ? E.dirs.concat(n.dirs) : n.dirs), n.transition && Wr(E, n.transition), M = E, ds(R), M;
}
const du = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || ws(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, pu = (e, t) => {
  const n = {};
  for (const s in e)
    (!Ir(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function hu(e, t, n) {
  const { props: s, children: r, component: o } = e, { props: i, children: l, patchFlag: a } = t, u = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? yo(s, i, u) : !!i;
    if (a & 8) {
      const c = t.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        const m = c[f];
        if (i[m] !== s[m] && !Ps(u, m))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : s === i ? !1 : s ? i ? yo(s, i, u) : !0 : !!i;
  return !1;
}
function yo(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !Ps(n, o))
      return !0;
  }
  return !1;
}
function mu({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const El = (e) => e.__isSuspense;
function gu(e, t) {
  t && t.pendingBranch ? Y(e) ? t.effects.push(...e) : t.effects.push(e) : Sc(e);
}
const Ce = Symbol.for("v-fgt"), Ds = Symbol.for("v-txt"), zt = Symbol.for("v-cmt"), Qs = Symbol.for("v-stc"), Nn = [];
let Qe = null;
function Q(e = !1) {
  Nn.push(Qe = e ? null : []);
}
function _u() {
  Nn.pop(), Qe = Nn[Nn.length - 1] || null;
}
let Bn = 1;
function bo(e, t = !1) {
  Bn += e, e < 0 && Qe && t && (Qe.hasOnce = !0);
}
function Sl(e) {
  return e.dynamicChildren = Bn > 0 ? Qe || an : null, _u(), Bn > 0 && Qe && Qe.push(e), e;
}
function pe(e, t, n, s, r, o) {
  return Sl(
    ne(
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
function et(e, t, n, s, r) {
  return Sl(
    B(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function Kn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Rn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const xl = ({ key: e }) => e ?? null, rs = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Ee(e) || be(e) || Z(e) ? { i: De, r: e, k: t, f: !!n } : e : null);
function ne(e, t = null, n = null, s = 0, r = null, o = e === Ce ? 0 : 1, i = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && xl(t),
    ref: t && rs(t),
    scopeId: el,
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
    ctx: De
  };
  return l ? (Xr(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= Ee(n) ? 8 : 16), Bn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Qe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Qe.push(a), a;
}
const B = vu;
function vu(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === Uc) && (e = zt), Kn(e)) {
    const l = pn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Xr(l, n), Bn > 0 && !o && Qe && (l.shapeFlag & 6 ? Qe[Qe.indexOf(e)] = l : Qe.push(l)), l.patchFlag = -2, l;
  }
  if (Ou(e) && (e = e.__vccOpts), t) {
    t = yu(t);
    let { class: l, style: a } = t;
    l && !Ee(l) && (t.class = At(l)), ye(a) && (Hr(a) && !Y(a) && (a = Me({}, a)), t.style = vn(a));
  }
  const i = Ee(e) ? 1 : El(e) ? 128 : Rc(e) ? 64 : ye(e) ? 4 : Z(e) ? 2 : 0;
  return ne(
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
function yu(e) {
  return e ? Hr(e) || ul(e) ? Me({}, e) : e : null;
}
function pn(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: l, transition: a } = e, u = t ? bu(r || {}, t) : r, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && xl(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? Y(o) ? o.concat(rs(t)) : [o, rs(t)] : rs(t)
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
    patchFlag: t && e.type !== Ce ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && pn(e.ssContent),
    ssFallback: e.ssFallback && pn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && s && Wr(
    c,
    a.clone(c)
  ), c;
}
function Ms(e = " ", t = 0) {
  return B(Ds, null, e, t);
}
function Fn(e = "", t = !1) {
  return t ? (Q(), et(zt, null, e)) : B(zt, null, e);
}
function gt(e) {
  return e == null || typeof e == "boolean" ? B(zt) : Y(e) ? B(
    Ce,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Kn(e) ? jt(e) : B(Ds, null, String(e));
}
function jt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : pn(e);
}
function Xr(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (Y(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Xr(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !ul(t) ? t._ctx = De : r === 3 && De && (De.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Z(t) ? (t = { default: t, _ctx: De }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Ms(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function bu(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = At([t.class, s.class]));
      else if (r === "style")
        t.style = vn([t.style, s.style]);
      else if (ws(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(Y(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function pt(e, t, n, s = null) {
  _t(e, t, 7, [
    n,
    s
  ]);
}
const wu = ll();
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
    scope: new Ci(
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
    propsOptions: dl(s, r),
    emitsOptions: wl(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ge,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: ge,
    data: ge,
    props: ge,
    attrs: ge,
    slots: ge,
    refs: ge,
    setupState: ge,
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = fu.bind(null, o), e.ce && e.ce(o), o;
}
let ke = null, ms, yr;
{
  const e = Rs(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  ms = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ke = n
  ), yr = t(
    "__VUE_SSR_SETTERS__",
    (n) => zn = n
  );
}
const Jn = (e) => {
  const t = ke;
  return ms(e), e.scope.on(), () => {
    e.scope.off(), ms(t);
  };
}, wo = () => {
  ke && ke.scope.off(), ms(null);
};
function Rl(e) {
  return e.vnode.shapeFlag & 4;
}
let zn = !1;
function xu(e, t = !1, n = !1) {
  t && yr(t);
  const { props: s, children: r } = e.vnode, o = Rl(e);
  Yc(e, s, o, t), tu(e, r, n);
  const i = o ? Ru(e, t) : void 0;
  return t && yr(!1), i;
}
function Ru(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Vc);
  const { setup: s } = n;
  if (s) {
    Ot();
    const r = e.setupContext = s.length > 1 ? ku(e) : null, o = Jn(e), i = yn(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = yi(i);
    if (Pt(), o(), (l || e.sp) && !fn(e) && tl(e), l) {
      if (i.then(wo, wo), t)
        return i.then((a) => {
          Eo(e, a, t);
        }).catch((a) => {
          As(a, e, 0);
        });
      e.asyncDep = i;
    } else
      Eo(e, i, t);
  } else
    Cl(e, t);
}
function Eo(e, t, n) {
  Z(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ye(t) && (e.setupState = qi(t)), Cl(e, n);
}
let So;
function Cl(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && So && !s.render) {
      const r = s.template || Gr(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config, { delimiters: l, compilerOptions: a } = s, u = Me(
          Me(
            {
              isCustomElement: o,
              delimiters: l
            },
            i
          ),
          a
        );
        s.render = So(r, u);
      }
    }
    e.render = s.render || lt;
  }
  {
    const r = Jn(e);
    Ot();
    try {
      Bc(e);
    } finally {
      Pt(), r();
    }
  }
}
const Cu = {
  get(e, t) {
    return $e(e, "get", ""), e[t];
  }
};
function ku(e) {
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
function Is(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(qi(Vr(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in In)
        return In[n](e);
    },
    has(t, n) {
      return n in t || n in In;
    }
  })) : e.proxy;
}
const Tu = /(?:^|[-_])(\w)/g, Au = (e) => e.replace(Tu, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function kl(e, t = !0) {
  return Z(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Tl(e, t, n = !1) {
  let s = kl(t);
  if (!s && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (s = r[1]);
  }
  if (!s && e && e.parent) {
    const r = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    s = r(
      e.components || e.parent.type.components
    ) || r(e.appContext.components);
  }
  return s ? Au(s) : n ? "App" : "Anonymous";
}
function Ou(e) {
  return Z(e) && "__vccOpts" in e;
}
const ue = (e, t) => pc(e, t, zn);
function Al(e, t, n) {
  const s = arguments.length;
  return s === 2 ? ye(t) && !Y(t) ? Kn(t) ? B(e, null, [t]) : B(e, t) : B(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Kn(n) && (n = [n]), B(e, t, n));
}
const Pu = "3.5.13";
let br;
const xo = typeof window < "u" && window.trustedTypes;
if (xo)
  try {
    br = /* @__PURE__ */ xo.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Ol = br ? (e) => br.createHTML(e) : (e) => e, Du = "http://www.w3.org/2000/svg", Mu = "http://www.w3.org/1998/Math/MathML", bt = typeof document < "u" ? document : null, Ro = bt && /* @__PURE__ */ bt.createElement("template"), Iu = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? bt.createElementNS(Du, e) : t === "mathml" ? bt.createElementNS(Mu, e) : n ? bt.createElement(e, { is: n }) : bt.createElement(e);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => bt.createTextNode(e),
  createComment: (e) => bt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => bt.querySelector(e),
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
      Ro.innerHTML = Ol(
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
}, Nu = Symbol("_vtc");
function Fu(e, t, n) {
  const s = e[Nu];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const gs = Symbol("_vod"), Pl = Symbol("_vsh"), hn = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[gs] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Cn(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), Cn(e, !0), s.enter(e)) : s.leave(e, () => {
      Cn(e, !1);
    }) : Cn(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Cn(e, t);
  }
};
function Cn(e, t) {
  e.style.display = t ? e[gs] : "none", e[Pl] = !t;
}
const $u = Symbol(""), Lu = /(^|;)\s*display\s*:/;
function Uu(e, t, n) {
  const s = e.style, r = Ee(n);
  let o = !1;
  if (n && !r) {
    if (t)
      if (Ee(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && os(s, l, "");
        }
      else
        for (const i in t)
          n[i] == null && os(s, i, "");
    for (const i in n)
      i === "display" && (o = !0), os(s, i, n[i]);
  } else if (r) {
    if (t !== n) {
      const i = s[$u];
      i && (n += ";" + i), s.cssText = n, o = Lu.test(n);
    }
  } else t && e.removeAttribute("style");
  gs in e && (e[gs] = o ? s.display : "", e[Pl] && (s.display = "none"));
}
const Co = /\s*!important$/;
function os(e, t, n) {
  if (Y(n))
    n.forEach((s) => os(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = ju(e, t);
    Co.test(n) ? e.setProperty(
      Wt(s),
      n.replace(Co, ""),
      "important"
    ) : e[s] = n;
  }
}
const ko = ["Webkit", "Moz", "ms"], er = {};
function ju(e, t) {
  const n = er[t];
  if (n)
    return n;
  let s = it(t);
  if (s !== "filter" && s in e)
    return er[t] = s;
  s = xs(s);
  for (let r = 0; r < ko.length; r++) {
    const o = ko[r] + s;
    if (o in e)
      return er[t] = o;
  }
  return t;
}
const To = "http://www.w3.org/1999/xlink";
function Ao(e, t, n, s, r, o = Ua(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(To, t.slice(6, t.length)) : e.setAttributeNS(To, t, n) : n == null || o && !Si(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    o ? "" : Tt(n) ? String(n) : n
  );
}
function Oo(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Ol(n) : n);
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
    l === "boolean" ? n = Si(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(r || t);
}
function Hu(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Vu(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Po = Symbol("_vei");
function Bu(e, t, n, s, r = null) {
  const o = e[Po] || (e[Po] = {}), i = o[t];
  if (s && i)
    i.value = s;
  else {
    const [l, a] = Ku(t);
    if (s) {
      const u = o[t] = Gu(
        s,
        r
      );
      Hu(e, l, u, a);
    } else i && (Vu(e, l, i, a), o[t] = void 0);
  }
}
const Do = /(?:Once|Passive|Capture)$/;
function Ku(e) {
  let t;
  if (Do.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Do); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Wt(e.slice(2)), t];
}
let tr = 0;
const zu = /* @__PURE__ */ Promise.resolve(), Wu = () => tr || (zu.then(() => tr = 0), tr = Date.now());
function Gu(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    _t(
      qu(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = Wu(), n;
}
function qu(e, t) {
  if (Y(t)) {
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
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Xu = (e, t, n, s, r, o) => {
  const i = r === "svg";
  t === "class" ? Fu(e, s, i) : t === "style" ? Uu(e, n, s) : ws(t) ? Ir(t) || Bu(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ju(e, t, s, i)) ? (Oo(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ao(e, t, s, i, o, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !Ee(s)) ? Oo(e, it(t), s, o, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Ao(e, t, s, i));
};
function Ju(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Mo(t) && Z(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Mo(t) && Ee(n) ? !1 : t in e;
}
const Yu = ["ctrl", "shift", "alt", "meta"], Zu = {
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
  exact: (e, t) => Yu.some((n) => e[`${n}Key`] && !t.includes(n))
}, Qu = (e, t) => {
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = (r, ...o) => {
    for (let i = 0; i < t.length; i++) {
      const l = Zu[t[i]];
      if (l && l(r, t)) return;
    }
    return e(r, ...o);
  });
}, ef = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, tf = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = (r) => {
    if (!("key" in r))
      return;
    const o = Wt(r.key);
    if (t.some(
      (i) => i === o || ef[i] === o
    ))
      return e(r);
  });
}, nf = /* @__PURE__ */ Me({ patchProp: Xu }, Iu);
let Io;
function sf() {
  return Io || (Io = su(nf));
}
const rf = (...e) => {
  const t = sf().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = lf(s);
    if (!r) return;
    const o = t._component;
    !Z(o) && !o.render && !o.template && (o.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const i = n(r, !1, of(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i;
  }, t;
};
function of(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function lf(e) {
  return Ee(e) ? document.querySelector(e) : e;
}
var af = !1, Dl = { npm_package_repository: "fuchunhui/meme-view", npm_package_devDependencies_npm_run_all2: "^7.0.1", TERM_PROGRAM: "vscode", NODE: "/opt/homebrew/Cellar/node/22.8.0/bin/node", INIT_CWD: "/Users/fuchunhui/github/meme-view", NVM_CD_FLAGS: "-q", npm_package_dependencies_axios: "^1.7.9", npm_package_devDependencies_typescript: "~5.6.3", npm_package_homepage: "", TERM: "xterm-256color", SHELL: "/bin/zsh", npm_package_scripts_commitlint: "node scripts/verify-commit.js", npm_package_devDependencies_vite: "^6.0.1", HOMEBREW_REPOSITORY: "/opt/homebrew", TMPDIR: "/var/folders/b4/zxmfly155510n61rfm0yhjhh0000gp/T/", npm_package_devDependencies_semver: "^7.6.3", npm_package_scripts_release: "pnpm run lib && node scripts/release.js", TERM_PROGRAM_VERSION: "1.96.0", npm_package_scripts_dev: "vite", npm_package_devDependencies__vitejs_plugin_vue: "^5.2.1", ZDOTDIR: "/Users/fuchunhui", MONGODB_HOME: "/usr/local/mongodb/bin", ORIGINAL_XDG_CURRENT_DESKTOP: "undefined", MallocNanoZone: "0", SDKMAN_PLATFORM: "darwinarm64", npm_config_registry: "https://registry.npmjs.org/", npm_config_home: "https://www.npmjs.org", NVM_DIR: "/Users/fuchunhui/.nvm", USER: "fuchunhui", npm_package_description: "custom view for meme.", COMMAND_MODE: "unix2003", npm_package_scripts_deploy: "", PNPM_SCRIPT_SRC_DIR: "/Users/fuchunhui/github/meme-view", SDKMAN_CANDIDATES_API: "https://api.sdkman.io/2", SSH_AUTH_SOCK: "/private/tmp/com.apple.launchd.mtMddZahvW/Listeners", __CF_USER_TEXT_ENCODING: "0x1F6:0x19:0x34", npm_package_devDependencies_eslint: "^9.14.0", npm_package_devDependencies_less: "^4.2.1", npm_package_devDependencies_rollup_plugin_copy: "^3.5.0", npm_execpath: "/opt/homebrew/lib/node_modules/pnpm/bin/pnpm.cjs", npm_package_module: "dist/imeme.es.js", npm_package_scripts_type_check: "vue-tsc --build", npm_config_frozen_lockfile: "", PATH: "/Users/fuchunhui/github/meme-view/node_modules/.bin:/opt/homebrew/lib/node_modules/pnpm/dist/node-gyp-bin:/Users/fuchunhui/github/meme-view/node_modules/.bin:/opt/homebrew/lib/node_modules/pnpm/dist/node-gyp-bin:/usr/local/mongodb/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/mongodb/bin:/opt/homebrew/bin:/opt/homebrew/sbin", npm_package_dependencies_vue: "^3.5.13", USER_ZDOTDIR: "/Users/fuchunhui", __CFBundleIdentifier: "com.microsoft.VSCode", npm_package_keywords_4: "robot", npm_package_author: "fuchunhui", PWD: "/Users/fuchunhui/github/meme-view", npm_command: "run-script", npm_package_scripts_build_only: "vite build --mode development", npm_package_scripts_lib: "vue-tsc --build && vite build --mode lib --config vite.lib.config.ts", npm_lifecycle_event: "lib", LANG: "en_US.UTF-8", npm_package_name: "meme-view", npm_package_types: "index.d.ts", npm_package_devDependencies_execa: "^9.5.2", npm_package_keywords_0: "imeme", SDKMAN_VERSION: "5.16.0", npm_package_keywords_1: "meme", NODE_PATH: "/Users/fuchunhui/github/meme-view/node_modules/.pnpm/vite@6.0.3_@types+node@22.10.2_less@4.2.1/node_modules/vite/bin/node_modules:/Users/fuchunhui/github/meme-view/node_modules/.pnpm/vite@6.0.3_@types+node@22.10.2_less@4.2.1/node_modules/vite/node_modules:/Users/fuchunhui/github/meme-view/node_modules/.pnpm/vite@6.0.3_@types+node@22.10.2_less@4.2.1/node_modules:/Users/fuchunhui/github/meme-view/node_modules/.pnpm/node_modules", npm_package_scripts_build: 'run-p type-check "build-only {@}" --', npm_package_keywords_2: "vite", VSCODE_GIT_ASKPASS_EXTRA_ARGS: "", XPC_FLAGS: "0x0", npm_package_keywords_3: "lib", npm_package_engines_node: ">=16.0", npm_package_main: "dist/imeme.umd.js", npm_config_node_gyp: "/opt/homebrew/lib/node_modules/pnpm/dist/node_modules/node-gyp/bin/node-gyp.js", XPC_SERVICE_NAME: "0", npm_package_version: "2.2.0", VSCODE_INJECTION: "1", npm_package_dependencies_pinia: "^2.3.0", SHLVL: "3", HOME: "/Users/fuchunhui", npm_package_type: "module", npm_package_devDependencies__vue_tsconfig: "^0.7.0", VSCODE_GIT_ASKPASS_MAIN: "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass-main.js", npm_package_devDependencies_eslint_plugin_vue: "^9.30.0", npm_package_scripts_serve: "vite preview", HOMEBREW_PREFIX: "/opt/homebrew", npm_package_devDependencies_husky: "^8.0.3", npm_package_devDependencies__vue_eslint_config_typescript: "^14.1.3", LOGNAME: "fuchunhui", SDKMAN_DIR: "/Users/fuchunhui/.sdkman", npm_lifecycle_script: "vue-tsc --build && vite build --mode lib --config vite.lib.config.ts", VSCODE_GIT_IPC_HANDLE: "/var/folders/b4/zxmfly155510n61rfm0yhjhh0000gp/T/vscode-git-3b20d3e4f6.sock", npm_package_devDependencies__tsconfig_node22: "^22.0.0", npm_config_user_agent: "pnpm/9.12.1 npm/? node/v22.8.0 darwin arm64", VSCODE_GIT_ASKPASS_NODE: "/Applications/Visual Studio Code.app/Contents/Frameworks/Code Helper (Plugin).app/Contents/MacOS/Code Helper (Plugin)", GIT_ASKPASS: "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass.sh", SDKMAN_CANDIDATES_DIR: "/Users/fuchunhui/.sdkman/candidates", INFOPATH: "/opt/homebrew/share/info:/opt/homebrew/share/info:", HOMEBREW_CELLAR: "/opt/homebrew/Cellar", npm_package_devDependencies__types_node: "^22.9.3", npm_package_devDependencies_chalk: "^5.3.0", npm_package_files_2: "index.d.ts", npm_package_devDependencies_vite_plugin_vue_devtools: "^7.6.5", npm_package_files_1: "README.md", npm_package_files_0: "dist", npm_package_dependencies_vue_router: "^4.2.2", COLORTERM: "truecolor", npm_package_devDependencies_vue_tsc: "^2.1.10", npm_package_devDependencies_enquirer: "^2.4.1", npm_node_execpath: "/opt/homebrew/Cellar/node/22.8.0/bin/node", NODE_ENV: "production", VITE_USER_NODE_ENV: "production" };
let Ml;
const Ns = (e) => Ml = e, Il = (
  /* istanbul ignore next */
  Symbol()
);
function wr(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var $n;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})($n || ($n = {}));
function cf() {
  const e = ki(!0), t = e.run(() => X({}));
  let n = [], s = [];
  const r = Vr({
    install(o) {
      Ns(r), r._a = o, o.provide(Il, r), o.config.globalProperties.$pinia = r, s.forEach((i) => n.push(i)), s = [];
    },
    use(o) {
      return !this._a && !af ? s.push(o) : n.push(o), this;
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
const Nl = () => {
};
function No(e, t, n, s = Nl) {
  e.push(t);
  const r = () => {
    const o = e.indexOf(t);
    o > -1 && (e.splice(o, 1), s());
  };
  return !n && Ti() && Ha(r), r;
}
function rn(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const uf = (e) => e(), Fo = Symbol(), nr = Symbol();
function Er(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, s) => e.set(s, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const s = t[n], r = e[n];
    wr(r) && wr(s) && e.hasOwnProperty(n) && !be(s) && !Bt(s) ? e[n] = Er(r, s) : e[n] = s;
  }
  return e;
}
const ff = (
  /* istanbul ignore next */
  Symbol()
);
function df(e) {
  return !wr(e) || !e.hasOwnProperty(ff);
}
const { assign: $t } = Object;
function pf(e) {
  return !!(be(e) && e.effect);
}
function hf(e, t, n, s) {
  const { state: r, actions: o, getters: i } = t, l = n.state.value[e];
  let a;
  function u() {
    !l && Dl.NODE_ENV === "production" && (n.state.value[e] = r ? r() : {});
    const c = kt(n.state.value[e]);
    return $t(c, o, Object.keys(i || {}).reduce((f, m) => (f[m] = Vr(ue(() => {
      Ns(n);
      const h = n._s.get(e);
      return i[m].call(h, h);
    })), f), {}));
  }
  return a = Fl(e, u, t, n, s, !0), a;
}
function Fl(e, t, n = {}, s, r, o) {
  let i;
  const l = $t({ actions: {} }, n), a = { deep: !0 };
  let u, c, f = [], m = [], h;
  const v = s.state.value[e];
  !o && !v && Dl.NODE_ENV === "production" && (s.state.value[e] = {}), X({});
  let w;
  function R(K) {
    let z;
    u = c = !1, typeof K == "function" ? (K(s.state.value[e]), z = {
      type: $n.patchFunction,
      storeId: e,
      events: h
    }) : (Er(s.state.value[e], K), z = {
      type: $n.patchObject,
      payload: K,
      storeId: e,
      events: h
    });
    const H = w = Symbol();
    Br().then(() => {
      w === H && (u = !0);
    }), c = !0, rn(f, z, s.state.value[e]);
  }
  const M = o ? function() {
    const { state: z } = n, H = z ? z() : {};
    this.$patch((q) => {
      $t(q, H);
    });
  } : (
    /* istanbul ignore next */
    Nl
  );
  function C() {
    i.stop(), f = [], m = [], s._s.delete(e);
  }
  const E = (K, z = "") => {
    if (Fo in K)
      return K[nr] = z, K;
    const H = function() {
      Ns(s);
      const q = Array.from(arguments), te = [], ae = [];
      function Ae(W) {
        te.push(W);
      }
      function ve(W) {
        ae.push(W);
      }
      rn(m, {
        args: q,
        name: H[nr],
        store: L,
        after: Ae,
        onError: ve
      });
      let fe;
      try {
        fe = K.apply(this && this.$id === e ? this : L, q);
      } catch (W) {
        throw rn(ae, W), W;
      }
      return fe instanceof Promise ? fe.then((W) => (rn(te, W), W)).catch((W) => (rn(ae, W), Promise.reject(W))) : (rn(te, fe), fe);
    };
    return H[Fo] = !0, H[nr] = z, H;
  }, k = {
    _p: s,
    // _s: scope,
    $id: e,
    $onAction: No.bind(null, m),
    $patch: R,
    $reset: M,
    $subscribe(K, z = {}) {
      const H = No(f, K, z.detached, () => q()), q = i.run(() => St(() => s.state.value[e], (te) => {
        (z.flush === "sync" ? c : u) && K({
          storeId: e,
          type: $n.direct,
          events: h
        }, te);
      }, $t({}, a, z)));
      return H;
    },
    $dispose: C
  }, L = Xn(k);
  s._s.set(e, L);
  const G = (s._a && s._a.runWithContext || uf)(() => s._e.run(() => (i = ki()).run(() => t({ action: E }))));
  for (const K in G) {
    const z = G[K];
    if (be(z) && !pf(z) || Bt(z))
      o || (v && df(z) && (be(z) ? z.value = v[K] : Er(z, v[K])), s.state.value[e][K] = z);
    else if (typeof z == "function") {
      const H = E(z, K);
      G[K] = H, l.actions[K] = z;
    }
  }
  return $t(L, G), $t(ce(L), G), Object.defineProperty(L, "$state", {
    get: () => s.state.value[e],
    set: (K) => {
      R((z) => {
        $t(z, K);
      });
    }
  }), s._p.forEach((K) => {
    $t(L, i.run(() => K({
      store: L,
      app: s._a,
      pinia: s,
      options: l
    })));
  }), v && o && n.hydrate && n.hydrate(L.$state, v), u = !0, c = !0, L;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function mf(e, t, n) {
  let s, r;
  const o = typeof t == "function";
  s = e, r = o ? n : t;
  function i(l, a) {
    const u = Jc();
    return l = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    l || (u ? Te(Il, null) : null), l && Ns(l), l = Ml, l._s.has(s) || (o ? Fl(s, t, r, l) : hf(s, r, l)), l._s.get(s);
  }
  return i.$id = s, i;
}
const Jr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, gf = {};
function _f(e, t) {
  const n = Lc("router-view");
  return Q(), et(n);
}
const vf = /* @__PURE__ */ Jr(gf, [["render", _f]]), ln = typeof document < "u";
function $l(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function yf(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module" || // support CF with dynamic imports that do not
  // add the Module string tag
  e.default && $l(e.default);
}
const he = Object.assign;
function sr(e, t) {
  const n = {};
  for (const s in t) {
    const r = t[s];
    n[s] = ct(r) ? r.map(e) : e(r);
  }
  return n;
}
const Ln = () => {
}, ct = Array.isArray, Ll = /#/g, bf = /&/g, wf = /\//g, Ef = /=/g, Sf = /\?/g, Ul = /\+/g, xf = /%5B/g, Rf = /%5D/g, jl = /%5E/g, Cf = /%60/g, Hl = /%7B/g, kf = /%7C/g, Vl = /%7D/g, Tf = /%20/g;
function Yr(e) {
  return encodeURI("" + e).replace(kf, "|").replace(xf, "[").replace(Rf, "]");
}
function Af(e) {
  return Yr(e).replace(Hl, "{").replace(Vl, "}").replace(jl, "^");
}
function Sr(e) {
  return Yr(e).replace(Ul, "%2B").replace(Tf, "+").replace(Ll, "%23").replace(bf, "%26").replace(Cf, "`").replace(Hl, "{").replace(Vl, "}").replace(jl, "^");
}
function Of(e) {
  return Sr(e).replace(Ef, "%3D");
}
function Pf(e) {
  return Yr(e).replace(Ll, "%23").replace(Sf, "%3F");
}
function Df(e) {
  return e == null ? "" : Pf(e).replace(wf, "%2F");
}
function Wn(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
  }
  return "" + e;
}
const Mf = /\/$/, If = (e) => e.replace(Mf, "");
function rr(e, t, n = "/") {
  let s, r = {}, o = "", i = "";
  const l = t.indexOf("#");
  let a = t.indexOf("?");
  return l < a && l >= 0 && (a = -1), a > -1 && (s = t.slice(0, a), o = t.slice(a + 1, l > -1 ? l : t.length), r = e(o)), l > -1 && (s = s || t.slice(0, l), i = t.slice(l, t.length)), s = Lf(s ?? t, n), {
    fullPath: s + (o && "?") + o + i,
    path: s,
    query: r,
    hash: Wn(i)
  };
}
function Nf(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function $o(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function Ff(e, t, n) {
  const s = t.matched.length - 1, r = n.matched.length - 1;
  return s > -1 && s === r && mn(t.matched[s], n.matched[r]) && Bl(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function mn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Bl(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!$f(e[n], t[n]))
      return !1;
  return !0;
}
function $f(e, t) {
  return ct(e) ? Lo(e, t) : ct(t) ? Lo(t, e) : e === t;
}
function Lo(e, t) {
  return ct(t) ? e.length === t.length && e.every((n, s) => n === t[s]) : e.length === 1 && e[0] === t;
}
function Lf(e, t) {
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
  return n.slice(0, o).join("/") + "/" + s.slice(i).join("/");
}
const Mt = {
  path: "/",
  // TODO: could we use a symbol in the future?
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
var Gn;
(function(e) {
  e.pop = "pop", e.push = "push";
})(Gn || (Gn = {}));
var Un;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(Un || (Un = {}));
function Uf(e) {
  if (!e)
    if (ln) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), If(e);
}
const jf = /^[^#]+#/;
function Hf(e, t) {
  return e.replace(jf, "#") + t;
}
function Vf(e, t) {
  const n = document.documentElement.getBoundingClientRect(), s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0)
  };
}
const Fs = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function Bf(e) {
  let t;
  if ("el" in e) {
    const n = e.el, s = typeof n == "string" && n.startsWith("#"), r = typeof n == "string" ? s ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!r)
      return;
    t = Vf(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Uo(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const xr = /* @__PURE__ */ new Map();
function Kf(e, t) {
  xr.set(e, t);
}
function zf(e) {
  const t = xr.get(e);
  return xr.delete(e), t;
}
let Wf = () => location.protocol + "//" + location.host;
function Kl(e, t) {
  const { pathname: n, search: s, hash: r } = t, o = e.indexOf("#");
  if (o > -1) {
    let l = r.includes(e.slice(o)) ? e.slice(o).length : 1, a = r.slice(l);
    return a[0] !== "/" && (a = "/" + a), $o(a, "");
  }
  return $o(n, e) + s + r;
}
function Gf(e, t, n, s) {
  let r = [], o = [], i = null;
  const l = ({ state: m }) => {
    const h = Kl(e, location), v = n.value, w = t.value;
    let R = 0;
    if (m) {
      if (n.value = h, t.value = m, i && i === v) {
        i = null;
        return;
      }
      R = w ? m.position - w.position : 0;
    } else
      s(h);
    r.forEach((M) => {
      M(n.value, v, {
        delta: R,
        type: Gn.pop,
        direction: R ? R > 0 ? Un.forward : Un.back : Un.unknown
      });
    });
  };
  function a() {
    i = n.value;
  }
  function u(m) {
    r.push(m);
    const h = () => {
      const v = r.indexOf(m);
      v > -1 && r.splice(v, 1);
    };
    return o.push(h), h;
  }
  function c() {
    const { history: m } = window;
    m.state && m.replaceState(he({}, m.state, { scroll: Fs() }), "");
  }
  function f() {
    for (const m of o)
      m();
    o = [], window.removeEventListener("popstate", l), window.removeEventListener("beforeunload", c);
  }
  return window.addEventListener("popstate", l), window.addEventListener("beforeunload", c, {
    passive: !0
  }), {
    pauseListeners: a,
    listen: u,
    destroy: f
  };
}
function jo(e, t, n, s = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: r ? Fs() : null
  };
}
function qf(e) {
  const { history: t, location: n } = window, s = {
    value: Kl(e, n)
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
  function o(a, u, c) {
    const f = e.indexOf("#"), m = f > -1 ? (n.host && document.querySelector("base") ? e : e.slice(f)) + a : Wf() + e + a;
    try {
      t[c ? "replaceState" : "pushState"](u, "", m), r.value = u;
    } catch (h) {
      console.error(h), n[c ? "replace" : "assign"](m);
    }
  }
  function i(a, u) {
    const c = he({}, t.state, jo(
      r.value.back,
      // keep back and forward entries but override current position
      a,
      r.value.forward,
      !0
    ), u, { position: r.value.position });
    o(a, c, !0), s.value = a;
  }
  function l(a, u) {
    const c = he(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      r.value,
      t.state,
      {
        forward: a,
        scroll: Fs()
      }
    );
    o(c.current, c, !0);
    const f = he({}, jo(s.value, a, null), { position: c.position + 1 }, u);
    o(a, f, !1), s.value = a;
  }
  return {
    location: s,
    state: r,
    push: l,
    replace: i
  };
}
function Xf(e) {
  e = Uf(e);
  const t = qf(e), n = Gf(e, t.state, t.location, t.replace);
  function s(o, i = !0) {
    i || n.pauseListeners(), history.go(o);
  }
  const r = he({
    // it's overridden right after
    location: "",
    base: e,
    go: s,
    createHref: Hf.bind(null, e)
  }, t, n);
  return Object.defineProperty(r, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(r, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), r;
}
function Jf(e) {
  return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), Xf(e);
}
function Yf(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function zl(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const Wl = Symbol("");
var Ho;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(Ho || (Ho = {}));
function gn(e, t) {
  return he(new Error(), {
    type: e,
    [Wl]: !0
  }, t);
}
function yt(e, t) {
  return e instanceof Error && Wl in e && (t == null || !!(e.type & t));
}
const Vo = "[^/]+?", Zf = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, Qf = /[.+*?^${}()[\]/\\]/g;
function ed(e, t) {
  const n = he({}, Zf, t), s = [];
  let r = n.start ? "^" : "";
  const o = [];
  for (const u of e) {
    const c = u.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !u.length && (r += "/");
    for (let f = 0; f < u.length; f++) {
      const m = u[f];
      let h = 40 + (n.sensitive ? 0.25 : 0);
      if (m.type === 0)
        f || (r += "/"), r += m.value.replace(Qf, "\\$&"), h += 40;
      else if (m.type === 1) {
        const { value: v, repeatable: w, optional: R, regexp: M } = m;
        o.push({
          name: v,
          repeatable: w,
          optional: R
        });
        const C = M || Vo;
        if (C !== Vo) {
          h += 10;
          try {
            new RegExp(`(${C})`);
          } catch (k) {
            throw new Error(`Invalid custom RegExp for param "${v}" (${C}): ` + k.message);
          }
        }
        let E = w ? `((?:${C})(?:/(?:${C}))*)` : `(${C})`;
        f || (E = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        R && u.length < 2 ? `(?:/${E})` : "/" + E), R && (E += "?"), r += E, h += 20, R && (h += -8), w && (h += -20), C === ".*" && (h += -50);
      }
      c.push(h);
    }
    s.push(c);
  }
  if (n.strict && n.end) {
    const u = s.length - 1;
    s[u][s[u].length - 1] += 0.7000000000000001;
  }
  n.strict || (r += "/?"), n.end ? r += "$" : n.strict && !r.endsWith("/") && (r += "(?:/|$)");
  const i = new RegExp(r, n.sensitive ? "" : "i");
  function l(u) {
    const c = u.match(i), f = {};
    if (!c)
      return null;
    for (let m = 1; m < c.length; m++) {
      const h = c[m] || "", v = o[m - 1];
      f[v.name] = h && v.repeatable ? h.split("/") : h;
    }
    return f;
  }
  function a(u) {
    let c = "", f = !1;
    for (const m of e) {
      (!f || !c.endsWith("/")) && (c += "/"), f = !1;
      for (const h of m)
        if (h.type === 0)
          c += h.value;
        else if (h.type === 1) {
          const { value: v, repeatable: w, optional: R } = h, M = v in u ? u[v] : "";
          if (ct(M) && !w)
            throw new Error(`Provided param "${v}" is an array but it is not repeatable (* or + modifiers)`);
          const C = ct(M) ? M.join("/") : M;
          if (!C)
            if (R)
              m.length < 2 && (c.endsWith("/") ? c = c.slice(0, -1) : f = !0);
            else
              throw new Error(`Missing required param "${v}"`);
          c += C;
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
function td(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n];
    if (s)
      return s;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function Gl(e, t) {
  let n = 0;
  const s = e.score, r = t.score;
  for (; n < s.length && n < r.length; ) {
    const o = td(s[n], r[n]);
    if (o)
      return o;
    n++;
  }
  if (Math.abs(r.length - s.length) === 1) {
    if (Bo(s))
      return 1;
    if (Bo(r))
      return -1;
  }
  return r.length - s.length;
}
function Bo(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const nd = {
  type: 0,
  value: ""
}, sd = /[a-zA-Z0-9_]/;
function rd(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[nd]];
  if (!e.startsWith("/"))
    throw new Error(`Invalid path "${e}"`);
  function t(h) {
    throw new Error(`ERR (${n})/"${u}": ${h}`);
  }
  let n = 0, s = n;
  const r = [];
  let o;
  function i() {
    o && r.push(o), o = [];
  }
  let l = 0, a, u = "", c = "";
  function f() {
    u && (n === 0 ? o.push({
      type: 0,
      value: u
    }) : n === 1 || n === 2 || n === 3 ? (o.length > 1 && (a === "*" || a === "+") && t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`), o.push({
      type: 1,
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
    if (a = e[l++], a === "\\" && n !== 2) {
      s = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        a === "/" ? (u && f(), i()) : a === ":" ? (f(), n = 1) : m();
        break;
      case 4:
        m(), n = s;
        break;
      case 1:
        a === "(" ? n = 2 : sd.test(a) ? m() : (f(), n = 0, a !== "*" && a !== "?" && a !== "+" && l--);
        break;
      case 2:
        a === ")" ? c[c.length - 1] == "\\" ? c = c.slice(0, -1) + a : n = 3 : c += a;
        break;
      case 3:
        f(), n = 0, a !== "*" && a !== "?" && a !== "+" && l--, c = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), f(), i(), r;
}
function od(e, t, n) {
  const s = ed(rd(e.path), n), r = he(s, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function id(e, t) {
  const n = [], s = /* @__PURE__ */ new Map();
  t = Go({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(f) {
    return s.get(f);
  }
  function o(f, m, h) {
    const v = !h, w = zo(f);
    w.aliasOf = h && h.record;
    const R = Go(t, f), M = [w];
    if ("alias" in f) {
      const k = typeof f.alias == "string" ? [f.alias] : f.alias;
      for (const L of k)
        M.push(
          // we need to normalize again to ensure the `mods` property
          // being non enumerable
          zo(he({}, w, {
            // this allows us to hold a copy of the `components` option
            // so that async components cache is hold on the original record
            components: h ? h.record.components : w.components,
            path: L,
            // we might be the child of an alias
            aliasOf: h ? h.record : w
            // the aliases are always of the same kind as the original since they
            // are defined on the same record
          }))
        );
    }
    let C, E;
    for (const k of M) {
      const { path: L } = k;
      if (m && L[0] !== "/") {
        const se = m.record.path, G = se[se.length - 1] === "/" ? "" : "/";
        k.path = m.record.path + (L && G + L);
      }
      if (C = od(k, m, R), h ? h.alias.push(C) : (E = E || C, E !== C && E.alias.push(C), v && f.name && !Wo(C) && i(f.name)), ql(C) && a(C), w.children) {
        const se = w.children;
        for (let G = 0; G < se.length; G++)
          o(se[G], C, h && h.children[G]);
      }
      h = h || C;
    }
    return E ? () => {
      i(E);
    } : Ln;
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
  function a(f) {
    const m = cd(f, n);
    n.splice(m, 0, f), f.record.name && !Wo(f) && s.set(f.record.name, f);
  }
  function u(f, m) {
    let h, v = {}, w, R;
    if ("name" in f && f.name) {
      if (h = s.get(f.name), !h)
        throw gn(1, {
          location: f
        });
      R = h.record.name, v = he(
        // paramsFromLocation is a new object
        Ko(
          m.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          h.keys.filter((E) => !E.optional).concat(h.parent ? h.parent.keys.filter((E) => E.optional) : []).map((E) => E.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        f.params && Ko(f.params, h.keys.map((E) => E.name))
      ), w = h.stringify(v);
    } else if (f.path != null)
      w = f.path, h = n.find((E) => E.re.test(w)), h && (v = h.parse(w), R = h.record.name);
    else {
      if (h = m.name ? s.get(m.name) : n.find((E) => E.re.test(m.path)), !h)
        throw gn(1, {
          location: f,
          currentLocation: m
        });
      R = h.record.name, v = he({}, m.params, f.params), w = h.stringify(v);
    }
    const M = [];
    let C = h;
    for (; C; )
      M.unshift(C.record), C = C.parent;
    return {
      name: R,
      path: w,
      params: v,
      matched: M,
      meta: ad(M)
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
function Ko(e, t) {
  const n = {};
  for (const s of t)
    s in e && (n[s] = e[s]);
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
    props: ld(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    // must be declared afterwards
    // mods: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
  return Object.defineProperty(t, "mods", {
    value: {}
  }), t;
}
function ld(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e)
    t.default = n;
  else
    for (const s in e.components)
      t[s] = typeof n == "object" ? n[s] : n;
  return t;
}
function Wo(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function ad(e) {
  return e.reduce((t, n) => he(t, n.meta), {});
}
function Go(e, t) {
  const n = {};
  for (const s in e)
    n[s] = s in t ? t[s] : e[s];
  return n;
}
function cd(e, t) {
  let n = 0, s = t.length;
  for (; n !== s; ) {
    const o = n + s >> 1;
    Gl(e, t[o]) < 0 ? s = o : n = o + 1;
  }
  const r = ud(e);
  return r && (s = t.lastIndexOf(r, s - 1)), s;
}
function ud(e) {
  let t = e;
  for (; t = t.parent; )
    if (ql(t) && Gl(e, t) === 0)
      return t;
}
function ql({ record: e }) {
  return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
}
function fd(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const s = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < s.length; ++r) {
    const o = s[r].replace(Ul, " "), i = o.indexOf("="), l = Wn(i < 0 ? o : o.slice(0, i)), a = i < 0 ? null : Wn(o.slice(i + 1));
    if (l in t) {
      let u = t[l];
      ct(u) || (u = t[l] = [u]), u.push(a);
    } else
      t[l] = a;
  }
  return t;
}
function qo(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (n = Of(n), s == null) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (ct(s) ? s.map((o) => o && Sr(o)) : [s && Sr(s)]).forEach((o) => {
      o !== void 0 && (t += (t.length ? "&" : "") + n, o != null && (t += "=" + o));
    });
  }
  return t;
}
function dd(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 && (t[n] = ct(s) ? s.map((r) => r == null ? null : "" + r) : s == null ? s : "" + s);
  }
  return t;
}
const pd = Symbol(""), Xo = Symbol(""), Zr = Symbol(""), Qr = Symbol(""), Rr = Symbol("");
function kn() {
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
function Ht(e, t, n, s, r, o = (i) => i()) {
  const i = s && // name is defined if record is because of the function overload
  (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
  return () => new Promise((l, a) => {
    const u = (m) => {
      m === !1 ? a(gn(4, {
        from: n,
        to: t
      })) : m instanceof Error ? a(m) : Yf(m) ? a(gn(2, {
        from: t,
        to: m
      })) : (i && // since enterCallbackArray is truthy, both record and name also are
      s.enterCallbacks[r] === i && typeof m == "function" && i.push(m), l());
    }, c = o(() => e.call(s && s.instances[r], t, n, u));
    let f = Promise.resolve(c);
    e.length < 3 && (f = f.then(u)), f.catch((m) => a(m));
  });
}
function or(e, t, n, s, r = (o) => o()) {
  const o = [];
  for (const i of e)
    for (const l in i.components) {
      let a = i.components[l];
      if (!(t !== "beforeRouteEnter" && !i.instances[l]))
        if ($l(a)) {
          const c = (a.__vccOpts || a)[t];
          c && o.push(Ht(c, n, s, i, l, r));
        } else {
          let u = a();
          o.push(() => u.then((c) => {
            if (!c)
              throw new Error(`Couldn't resolve component "${l}" at "${i.path}"`);
            const f = yf(c) ? c.default : c;
            i.mods[l] = c, i.components[l] = f;
            const h = (f.__vccOpts || f)[t];
            return h && Ht(h, n, s, i, l, r)();
          }));
        }
    }
  return o;
}
function Jo(e) {
  const t = Te(Zr), n = Te(Qr), s = ue(() => {
    const a = P(e.to);
    return t.resolve(a);
  }), r = ue(() => {
    const { matched: a } = s.value, { length: u } = a, c = a[u - 1], f = n.matched;
    if (!c || !f.length)
      return -1;
    const m = f.findIndex(mn.bind(null, c));
    if (m > -1)
      return m;
    const h = Yo(a[u - 2]);
    return (
      // we are dealing with nested routes
      u > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      Yo(c) === h && // avoid comparing the child with its parent
      f[f.length - 1].path !== h ? f.findIndex(mn.bind(null, a[u - 2])) : m
    );
  }), o = ue(() => r.value > -1 && vd(n.params, s.value.params)), i = ue(() => r.value > -1 && r.value === n.matched.length - 1 && Bl(n.params, s.value.params));
  function l(a = {}) {
    if (_d(a)) {
      const u = t[P(e.replace) ? "replace" : "push"](
        P(e.to)
        // avoid uncaught errors are they are logged anyway
      ).catch(Ln);
      return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => u), u;
    }
    return Promise.resolve();
  }
  return {
    route: s,
    href: ue(() => s.value.href),
    isActive: o,
    isExactActive: i,
    navigate: l
  };
}
function hd(e) {
  return e.length === 1 ? e[0] : e;
}
const md = /* @__PURE__ */ Ie({
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
  useLink: Jo,
  setup(e, { slots: t }) {
    const n = Xn(Jo(e)), { options: s } = Te(Zr), r = ue(() => ({
      [Zo(e.activeClass, s.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [Zo(e.exactActiveClass, s.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const o = t.default && hd(t.default(n));
      return e.custom ? o : Al("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: r.value
      }, o);
    };
  }
}), gd = md;
function _d(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function vd(e, t) {
  for (const n in t) {
    const s = t[n], r = e[n];
    if (typeof s == "string") {
      if (s !== r)
        return !1;
    } else if (!ct(r) || r.length !== s.length || s.some((o, i) => o !== r[i]))
      return !1;
  }
  return !0;
}
function Yo(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const Zo = (e, t, n) => e ?? t ?? n, yd = /* @__PURE__ */ Ie({
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
    const s = Te(Rr), r = ue(() => e.route || s.value), o = Te(Xo, 0), i = ue(() => {
      let u = P(o);
      const { matched: c } = r.value;
      let f;
      for (; (f = c[u]) && !f.components; )
        u++;
      return u;
    }), l = ue(() => r.value.matched[i.value]);
    ot(Xo, ue(() => i.value + 1)), ot(pd, l), ot(Rr, r);
    const a = X();
    return St(() => [a.value, l.value, e.name], ([u, c, f], [m, h, v]) => {
      c && (c.instances[f] = u, h && h !== c && u && u === m && (c.leaveGuards.size || (c.leaveGuards = h.leaveGuards), c.updateGuards.size || (c.updateGuards = h.updateGuards))), u && c && // if there is no instance but to and from are the same this might be
      // the first visit
      (!h || !mn(c, h) || !m) && (c.enterCallbacks[f] || []).forEach((w) => w(u));
    }, { flush: "post" }), () => {
      const u = r.value, c = e.name, f = l.value, m = f && f.components[c];
      if (!m)
        return Qo(n.default, { Component: m, route: u });
      const h = f.props[c], v = h ? h === !0 ? u.params : typeof h == "function" ? h(u) : h : null, R = Al(m, he({}, v, t, {
        onVnodeUnmounted: (M) => {
          M.component.isUnmounted && (f.instances[c] = null);
        },
        ref: a
      }));
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        Qo(n.default, { Component: R, route: u }) || R
      );
    };
  }
});
function Qo(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const bd = yd;
function wd(e) {
  const t = id(e.routes, e), n = e.parseQuery || fd, s = e.stringifyQuery || qo, r = e.history, o = kn(), i = kn(), l = kn(), a = lc(Mt);
  let u = Mt;
  ln && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const c = sr.bind(null, (D) => "" + D), f = sr.bind(null, Df), m = (
    // @ts-expect-error: intentionally avoid the type check
    sr.bind(null, Wn)
  );
  function h(D, U) {
    let $, V;
    return zl(D) ? ($ = t.getRecordMatcher(D), V = U) : V = D, t.addRoute(V, $);
  }
  function v(D) {
    const U = t.getRecordMatcher(D);
    U && t.removeRoute(U);
  }
  function w() {
    return t.getRoutes().map((D) => D.record);
  }
  function R(D) {
    return !!t.getRecordMatcher(D);
  }
  function M(D, U) {
    if (U = he({}, U || a.value), typeof D == "string") {
      const d = rr(n, D, U.path), _ = t.resolve({ path: d.path }, U), O = r.createHref(d.fullPath);
      return he(d, _, {
        params: m(_.params),
        hash: Wn(d.hash),
        redirectedFrom: void 0,
        href: O
      });
    }
    let $;
    if (D.path != null)
      $ = he({}, D, {
        path: rr(n, D.path, U.path).path
      });
    else {
      const d = he({}, D.params);
      for (const _ in d)
        d[_] == null && delete d[_];
      $ = he({}, D, {
        params: f(d)
      }), U.params = f(U.params);
    }
    const V = t.resolve($, U), le = D.hash || "";
    V.params = c(m(V.params));
    const de = Nf(s, he({}, D, {
      hash: Af(le),
      path: V.path
    })), p = r.createHref(de);
    return he({
      fullPath: de,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: le,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        s === qo ? dd(D.query) : D.query || {}
      )
    }, V, {
      redirectedFrom: void 0,
      href: p
    });
  }
  function C(D) {
    return typeof D == "string" ? rr(n, D, a.value.path) : he({}, D);
  }
  function E(D, U) {
    if (u !== D)
      return gn(8, {
        from: U,
        to: D
      });
  }
  function k(D) {
    return G(D);
  }
  function L(D) {
    return k(he(C(D), { replace: !0 }));
  }
  function se(D) {
    const U = D.matched[D.matched.length - 1];
    if (U && U.redirect) {
      const { redirect: $ } = U;
      let V = typeof $ == "function" ? $(D) : $;
      return typeof V == "string" && (V = V.includes("?") || V.includes("#") ? V = C(V) : (
        // force empty params
        { path: V }
      ), V.params = {}), he({
        query: D.query,
        hash: D.hash,
        // avoid transferring params if the redirect has a path
        params: V.path != null ? {} : D.params
      }, V);
    }
  }
  function G(D, U) {
    const $ = u = M(D), V = a.value, le = D.state, de = D.force, p = D.replace === !0, d = se($);
    if (d)
      return G(
        he(C(d), {
          state: typeof d == "object" ? he({}, le, d.state) : le,
          force: de,
          replace: p
        }),
        // keep original redirectedFrom if it exists
        U || $
      );
    const _ = $;
    _.redirectedFrom = U;
    let O;
    return !de && Ff(s, V, $) && (O = gn(16, { to: _, from: V }), Fe(
      V,
      V,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (O ? Promise.resolve(O) : H(_, V)).catch((g) => yt(g) ? (
      // navigation redirects still mark the router as ready
      yt(
        g,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? g : We(g)
    ) : (
      // reject any unknown error
      oe(g, _, V)
    )).then((g) => {
      if (g) {
        if (yt(
          g,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return G(
            // keep options
            he({
              // preserve an existing replacement but allow the redirect to override it
              replace: p
            }, C(g.to), {
              state: typeof g.to == "object" ? he({}, le, g.to.state) : le,
              force: de
            }),
            // preserve the original redirectedFrom if any
            U || _
          );
      } else
        g = te(_, V, !0, p, le);
      return q(_, V, g), g;
    });
  }
  function K(D, U) {
    const $ = E(D, U);
    return $ ? Promise.reject($) : Promise.resolve();
  }
  function z(D) {
    const U = qe.values().next().value;
    return U && typeof U.runWithContext == "function" ? U.runWithContext(D) : D();
  }
  function H(D, U) {
    let $;
    const [V, le, de] = Ed(D, U);
    $ = or(V.reverse(), "beforeRouteLeave", D, U);
    for (const d of V)
      d.leaveGuards.forEach((_) => {
        $.push(Ht(_, D, U));
      });
    const p = K.bind(null, D, U);
    return $.push(p), Oe($).then(() => {
      $ = [];
      for (const d of o.list())
        $.push(Ht(d, D, U));
      return $.push(p), Oe($);
    }).then(() => {
      $ = or(le, "beforeRouteUpdate", D, U);
      for (const d of le)
        d.updateGuards.forEach((_) => {
          $.push(Ht(_, D, U));
        });
      return $.push(p), Oe($);
    }).then(() => {
      $ = [];
      for (const d of de)
        if (d.beforeEnter)
          if (ct(d.beforeEnter))
            for (const _ of d.beforeEnter)
              $.push(Ht(_, D, U));
          else
            $.push(Ht(d.beforeEnter, D, U));
      return $.push(p), Oe($);
    }).then(() => (D.matched.forEach((d) => d.enterCallbacks = {}), $ = or(de, "beforeRouteEnter", D, U, z), $.push(p), Oe($))).then(() => {
      $ = [];
      for (const d of i.list())
        $.push(Ht(d, D, U));
      return $.push(p), Oe($);
    }).catch((d) => yt(
      d,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? d : Promise.reject(d));
  }
  function q(D, U, $) {
    l.list().forEach((V) => z(() => V(D, U, $)));
  }
  function te(D, U, $, V, le) {
    const de = E(D, U);
    if (de)
      return de;
    const p = U === Mt, d = ln ? history.state : {};
    $ && (V || p ? r.replace(D.fullPath, he({
      scroll: p && d && d.scroll
    }, le)) : r.push(D.fullPath, le)), a.value = D, Fe(D, U, $, p), We();
  }
  let ae;
  function Ae() {
    ae || (ae = r.listen((D, U, $) => {
      if (!ft.listening)
        return;
      const V = M(D), le = se(V);
      if (le) {
        G(he(le, { replace: !0, force: !0 }), V).catch(Ln);
        return;
      }
      u = V;
      const de = a.value;
      ln && Kf(Uo(de.fullPath, $.delta), Fs()), H(V, de).catch((p) => yt(
        p,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? p : yt(
        p,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (G(
        he(C(p.to), {
          force: !0
        }),
        V
        // avoid an uncaught rejection, let push call triggerError
      ).then((d) => {
        yt(
          d,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !$.delta && $.type === Gn.pop && r.go(-1, !1);
      }).catch(Ln), Promise.reject()) : ($.delta && r.go(-$.delta, !1), oe(p, V, de))).then((p) => {
        p = p || te(
          // after navigation, all matched components are resolved
          V,
          de,
          !1
        ), p && ($.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !yt(
          p,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-$.delta, !1) : $.type === Gn.pop && yt(
          p,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), q(V, de, p);
      }).catch(Ln);
    }));
  }
  let ve = kn(), fe = kn(), W;
  function oe(D, U, $) {
    We(D);
    const V = fe.list();
    return V.length ? V.forEach((le) => le(D, U, $)) : console.error(D), Promise.reject(D);
  }
  function je() {
    return W && a.value !== Mt ? Promise.resolve() : new Promise((D, U) => {
      ve.add([D, U]);
    });
  }
  function We(D) {
    return W || (W = !D, Ae(), ve.list().forEach(([U, $]) => D ? $(D) : U()), ve.reset()), D;
  }
  function Fe(D, U, $, V) {
    const { scrollBehavior: le } = e;
    if (!ln || !le)
      return Promise.resolve();
    const de = !$ && zf(Uo(D.fullPath, 0)) || (V || !$) && history.state && history.state.scroll || null;
    return Br().then(() => le(D, U, de)).then((p) => p && Bf(p)).catch((p) => oe(p, D, U));
  }
  const Se = (D) => r.go(D);
  let Ge;
  const qe = /* @__PURE__ */ new Set(), ft = {
    currentRoute: a,
    listening: !0,
    addRoute: h,
    removeRoute: v,
    clearRoutes: t.clearRoutes,
    hasRoute: R,
    getRoutes: w,
    resolve: M,
    options: e,
    push: k,
    replace: L,
    go: Se,
    back: () => Se(-1),
    forward: () => Se(1),
    beforeEach: o.add,
    beforeResolve: i.add,
    afterEach: l.add,
    onError: fe.add,
    isReady: je,
    install(D) {
      const U = this;
      D.component("RouterLink", gd), D.component("RouterView", bd), D.config.globalProperties.$router = U, Object.defineProperty(D.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => P(a)
      }), ln && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !Ge && a.value === Mt && (Ge = !0, k(r.location).catch((le) => {
      }));
      const $ = {};
      for (const le in Mt)
        Object.defineProperty($, le, {
          get: () => a.value[le],
          enumerable: !0
        });
      D.provide(Zr, U), D.provide(Qr, zi($)), D.provide(Rr, a);
      const V = D.unmount;
      qe.add(D), D.unmount = function() {
        qe.delete(D), qe.size < 1 && (u = Mt, ae && ae(), ae = null, a.value = Mt, Ge = !1, W = !1), V();
      };
    }
  };
  function Oe(D) {
    return D.reduce((U, $) => U.then(() => z($)), Promise.resolve());
  }
  return ft;
}
function Ed(e, t) {
  const n = [], s = [], r = [], o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const l = t.matched[i];
    l && (e.matched.find((u) => mn(u, l)) ? s.push(l) : n.push(l));
    const a = e.matched[i];
    a && (t.matched.find((u) => mn(u, a)) || r.push(a));
  }
  return [n, s, r];
}
function Xl(e) {
  return Te(Qr);
}
const Jl = /* @__PURE__ */ mf("counter", () => {
  const e = X("");
  return {
    currentPath: e,
    setPath: (n) => {
      e.value = n;
    }
  };
}), Sd = { class: "side" }, xd = { class: "side-content-title" }, Rd = ["onClick"], Cd = /* @__PURE__ */ Ie({
  __name: "Side",
  props: {
    catalogList: {},
    current: {}
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = kt(n).catalogList, o = (i, l) => {
      s("change", { type: i, child: l });
    };
    return (i, l) => (Q(), pe("div", Sd, [
      (Q(!0), pe(Ce, null, hr(P(r), (a) => (Q(), pe("div", {
        key: a.id,
        class: "side-content"
      }, [
        ne("p", xd, Ct(a.text), 1),
        (Q(!0), pe(Ce, null, hr(a.children, (u) => (Q(), pe("div", {
          key: u.mid,
          class: At({
            "side-content-cell": !0,
            "side-content-cell-active": i.current === u.mid
          }),
          onClick: (c) => o(a.type, u)
        }, Ct(u.title), 11, Rd))), 128))
      ]))), 128))
    ]));
  }
}), xt = /* @__PURE__ */ Ie({
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
    return (t, n) => (Q(), pe("button", {
      class: At([
        "meme-button",
        {
          disabled: e.disabled
        }
      ])
    }, [
      Hc(t.$slots, "default", {}, () => [
        Ms(Ct(e.label), 1)
      ])
    ], 2));
  }
}), kd = /* @__PURE__ */ Ie({
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
    const n = X(null), s = (o) => {
      t("update:modelValue", o.target.value);
    };
    return {
      input: n,
      blur: (o) => {
        s(o), t("blur");
      }
    };
  }
}), Td = ["title", "value"];
function Ad(e, t, n, s, r, o) {
  return Q(), pe("input", {
    ref: "input",
    class: At([
      "meme-input",
      {
        disabled: e.disabled
      }
    ]),
    title: e.title,
    value: e.modelValue,
    onBlur: t[0] || (t[0] = (...i) => e.blur && e.blur(...i)),
    onKeyup: t[1] || (t[1] = tf((i) => {
      var l;
      return (l = e.input) == null ? void 0 : l.blur();
    }, ["enter"]))
  }, null, 42, Td);
}
const Re = /* @__PURE__ */ Jr(kd, [["render", Ad]]), Od = { class: "meme-radio" }, Pd = ["name", "value", "checked"], Dd = { class: "meme-radio-label" }, st = /* @__PURE__ */ Ie({
  __name: "Radio",
  props: {
    label: {},
    name: {},
    value: {},
    checked: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = t, s = (r) => {
      n("toggle", r);
    };
    return (r, o) => (Q(), pe("label", Od, [
      ne("input", {
        class: "meme-radio-input",
        type: "radio",
        name: r.name,
        value: r.value,
        checked: r.checked,
        onChange: o[0] || (o[0] = (i) => s(r.value))
      }, null, 40, Pd),
      ne("span", Dd, Ct(r.label), 1)
    ]));
  }
}), Md = { class: "meme-file-upload" }, Id = { class: "file-button" }, Nd = 1 * 1024 * 1024, Yl = /* @__PURE__ */ Ie({
  __name: "FileUpload",
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = Te("commands"), s = t, r = (h) => {
      const v = h.target.files;
      if (!v)
        return !1;
      c(v);
    }, o = (h) => {
      h.stopPropagation(), h.preventDefault();
    }, i = (h) => {
      h.stopPropagation(), h.preventDefault();
    }, l = (h) => {
      h.stopPropagation(), h.preventDefault();
      const v = h.dataTransfer.files;
      c(v);
    }, a = (h) => {
      h.stopPropagation(), h.preventDefault();
      const v = h.clipboardData.files;
      c(v);
    }, u = /^image\//, c = (h) => {
      if (h.length !== 1)
        return f("不支持多个文件同时操作，请仅选择单个文件"), !1;
      const v = h[0], { name: w, size: R, type: M } = v;
      if (!u.test(M))
        return f(`当前文件类型为${M}，类型不符，请选择图片类型！`), !1;
      const C = w.replace(/\.\w*$/g, "");
      if (n.value.includes(C))
        return f(`当前文件名称【${w}】与系统默认关键指令【${C}】冲突，请重命名上传文件！`), !1;
      if (R > Nd)
        return f("文件超过最大限制1M，请重新选择"), !1;
      const E = new FileReader();
      E.onload = (k) => {
        const L = k.target.result;
        m(w, L);
      }, E.onerror = () => {
        f(E.error.message);
      }, E.readAsDataURL(v);
    }, f = (h) => {
      alert(h);
    }, m = (h, v) => {
      s("change", {
        name: h,
        base64: v
      });
    };
    return (h, v) => (Q(), pe("div", Md, [
      ne("div", Id, [
        v[0] || (v[0] = ne("i", { class: "file-glyphicon" }, null, -1)),
        v[1] || (v[1] = ne("span", null, "UPLOAD FILE", -1)),
        ne("input", {
          class: "file-input",
          type: "file",
          name: "file",
          accept: "image/*",
          title: "",
          onChange: r
        }, null, 32)
      ]),
      ne("div", {
        class: "file-area",
        draggable: !0,
        contenteditable: !0,
        onDragenter: o,
        onDragover: i,
        onDrop: l,
        onPaste: a
      }, v[2] || (v[2] = [
        ne("i", { class: "file-tips" }, "Drop files here to upload", -1)
      ]), 32)
    ]));
  }
}), Fd = ["value", "selected"], $d = /* @__PURE__ */ Ie({
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
    return (r, o) => (Q(), pe("select", {
      class: "meme-select",
      onChange: s
    }, [
      (Q(!0), pe(Ce, null, hr(r.options, (i) => (Q(), pe("option", {
        key: i.value,
        class: "meme-option",
        value: i.value,
        selected: r.selected === i.value
      }, Ct(i.label), 9, Fd))), 128))
    ], 32));
  }
}), Ld = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 32 32"
}, Ud = ["fill"], _s = /* @__PURE__ */ Ie({
  __name: "DiceButton",
  props: {
    color: {
      type: String,
      default: "#FF0000"
    }
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = ue(() => ["transparent", "#FFFFFF"].includes(n.color) ? "gray" : n.color), o = () => {
      s("click");
    };
    return (i, l) => (Q(), et(P(xt), {
      class: "dice-button",
      u: "icon",
      onClick: o
    }, {
      default: zr(() => [
        (Q(), pe("svg", Ld, [
          l[0] || (l[0] = ne("title", null, "dice", -1)),
          ne("path", {
            fill: r.value,
            d: "M27 6h-16c-2.75 0-5 2.25-5 5v16c0 2.75 2.25 5 5 5h16c2.75 0 5-2.25 5-5v-16c0-2.75-2.25-5-5-5zM13 28c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM13 16c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM19 22c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25 28c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25 16c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25.899 4c-0.467-2.275-2.491-4-4.899-4h-16c-2.75 0-5 2.25-5 5v16c0 2.408 1.725 4.432 4 4.899v-19.899c0-1.1 0.9-2 2-2h19.899z"
          }, null, 8, Ud)
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
}, Hd = ["fill"], Zl = /* @__PURE__ */ Ie({
  __name: "PickerButton",
  props: {
    color: {
      type: String,
      default: "#FF0000"
    }
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = ue(() => ["transparent", "#FFFFFF"].includes(n.color) ? "gray" : n.color), o = () => {
      s("click");
    };
    return (i, l) => (Q(), et(P(xt), {
      class: "picker-button",
      u: "icon",
      onClick: o
    }, {
      default: zr(() => [
        (Q(), pe("svg", jd, [
          l[0] || (l[0] = ne("title", null, "picker", -1)),
          ne("path", {
            fill: r.value,
            d: "M30.828 1.172c-1.562-1.562-4.095-1.562-5.657 0l-5.379 5.379-3.793-3.793-4.243 4.243 3.326 3.326-14.754 14.754c-0.252 0.252-0.358 0.592-0.322 0.921h-0.008v5c0 0.552 0.448 1 1 1h5c0 0 0.083 0 0.125 0 0.288 0 0.576-0.11 0.795-0.329l14.754-14.754 3.326 3.326 4.243-4.243-3.793-3.793 5.379-5.379c1.562-1.562 1.562-4.095 0-5.657zM5.409 30h-3.409v-3.409l14.674-14.674 3.409 3.409-14.674 14.674z"
          }, null, 8, Hd)
        ]))
      ]),
      _: 1
    }));
  }
}), Vd = { class: "property" }, Ql = /* @__PURE__ */ Ie({
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
    const n = e, s = t, r = Te("text"), o = Te("updateText"), { max: i, size: l, color: a, align: u, direction: c, blur: f, degree: m, stroke: h, swidth: v } = kt(n), w = (C, E) => {
      const k = {
        max: i.value,
        size: l.value,
        color: a.value,
        align: u.value,
        direction: c.value,
        blur: f.value,
        degree: m.value,
        stroke: h.value,
        swidth: v.value
      };
      k[E] = ["color", "align", "direction", "stroke"].includes(E) ? C : parseInt(C), s("change", k);
    }, R = (C) => {
      const E = "#" + Math.floor(Math.random() * 16777215).toString(16);
      w(E, C);
    }, M = () => {
      s("pick");
    };
    return (C, E) => (Q(), pe("div", Vd, [
      B(P(Re), {
        class: "property-max",
        value: P(i),
        "onUpdate:modelValue": E[0] || (E[0] = (k) => w(k, "max"))
      }, null, 8, ["value"]),
      B(P(Re), {
        class: "property-size",
        value: P(l),
        "onUpdate:modelValue": E[1] || (E[1] = (k) => w(k, "size"))
      }, null, 8, ["value"]),
      B(P(Re), {
        class: "property-color",
        value: P(a),
        "onUpdate:modelValue": E[2] || (E[2] = (k) => w(k, "color"))
      }, null, 8, ["value"]),
      B(_s, {
        color: P(a),
        onClick: E[3] || (E[3] = (k) => R("color"))
      }, null, 8, ["color"]),
      B(Zl, {
        color: P(a),
        onClick: M
      }, null, 8, ["color"]),
      B(P(Re), {
        class: "property-color",
        value: P(h),
        "onUpdate:modelValue": E[4] || (E[4] = (k) => w(k, "stroke"))
      }, null, 8, ["value"]),
      B(_s, {
        color: P(h),
        onClick: E[5] || (E[5] = (k) => R("stroke"))
      }, null, 8, ["color"]),
      B(P(Re), {
        class: "property-swidth",
        value: P(v),
        "onUpdate:modelValue": E[6] || (E[6] = (k) => w(k, "swidth"))
      }, null, 8, ["value"]),
      B(P(st), {
        label: "start",
        name: "align",
        value: "start",
        checked: P(u) === "start",
        onToggle: E[7] || (E[7] = (k) => w(k, "align"))
      }, null, 8, ["checked"]),
      B(P(st), {
        label: "center",
        name: "align",
        value: "center",
        checked: P(u) === "center",
        onToggle: E[8] || (E[8] = (k) => w(k, "align"))
      }, null, 8, ["checked"]),
      B(P(st), {
        class: "property-end",
        label: "end",
        name: "align",
        value: "end",
        checked: P(u) === "end",
        onToggle: E[9] || (E[9] = (k) => w(k, "align"))
      }, null, 8, ["checked"]),
      B(P(Re), {
        class: "property-text",
        value: P(r),
        "onUpdate:modelValue": P(o)
      }, null, 8, ["value", "onUpdate:modelValue"]),
      B(P(st), {
        label: "up",
        name: "direction",
        value: "up",
        checked: P(c) === "up",
        onToggle: E[10] || (E[10] = (k) => w(k, "direction"))
      }, null, 8, ["checked"]),
      B(P(st), {
        label: "center",
        name: "direction",
        value: "center",
        checked: P(c) === "center",
        onToggle: E[11] || (E[11] = (k) => w(k, "direction"))
      }, null, 8, ["checked"]),
      B(P(st), {
        label: "down",
        name: "direction",
        value: "down",
        checked: P(c) === "down",
        onToggle: E[12] || (E[12] = (k) => w(k, "direction"))
      }, null, 8, ["checked"]),
      B(P(Re), {
        class: "property-degree",
        value: P(m),
        "onUpdate:modelValue": E[13] || (E[13] = (k) => w(k, "degree"))
      }, null, 8, ["value"])
    ]));
  }
}), Kt = 1.2, ze = 11, nt = 14, ei = nt * ze, ti = nt * ze, Rt = nt * ze, ni = nt, Bd = (() => {
  const e = [];
  for (let t = 1; t < ze; t++)
    e.push([t, 0, t, ze]), e.push([0, t, ze, t]);
  return e.map((t) => t.map((n) => n * nt));
})(), Kd = (e, t, n) => {
  let s = 0, r = e.length - 1;
  for (; s <= r; ) {
    const o = Math.floor((s + r) / 2), i = n.measureText(e.substring(0, o)).width, l = n.measureText(e.substring(0, o + 1)).width;
    if (i <= t && l > t)
      return o;
    i < t ? s = o + 1 : r = o - 1;
  }
  return -1;
}, ea = (e, t, n) => {
  const s = [];
  let r = 0;
  for (; (r = Kd(e, t, n)) !== -1; )
    s.push(e.substring(0, r)), e = e.substring(r);
  return e && s.push(e), s;
}, Cr = (e, t, n, s) => {
  const { x: r, y: o, font: i, color: l, stroke: a, swidth: u, align: c, max: f, direction: m, blur: h = 0, degree: v = 0 } = s;
  e.font = i || "32px sans-serif", e.fillStyle = l || "#000000", h && (e.filter = `blur(${h}px)`), e.textAlign = c || "center", e.strokeStyle = a, e.lineWidth = u;
  const w = f || t, R = _n(i), M = ea(n, w, e);
  M.forEach((C, E) => {
    let k = 0;
    m === "down" ? k = E : m === "center" ? k = E - (M.length - 1) / 2 : k = E - (M.length - 1), e.save(), v ? (e.translate(r, o + k * R * Kt), e.rotate(v * Math.PI / 180), e.strokeText(C, 0, 0, w), e.fillText(C, 0, 0, w)) : (e.strokeText(C, r, o + k * R * Kt, w), e.fillText(C, r, o + k * R * Kt, w)), e.restore();
  });
}, zd = (e, t, n, s) => {
  const { x: r, y: o, font: i, color: l, stroke: a, swidth: u, align: c, max: f, direction: m } = s;
  e.font = i || "32px sans-serif", e.fillStyle = l || "#000000", e.textAlign = c || "center", e.strokeStyle = a, e.lineWidth = u;
  const h = f || t, v = _n(i), w = ea(n, h, e);
  w.forEach((R, M) => {
    let C = 0;
    m === "down" ? C = M : m === "center" ? C = M - (w.length - 1) / 2 : C = M - (w.length - 1), e.strokeText(R, r, o + C * v * Kt, h), e.fillText(R, r, o + C * v * Kt, h);
  });
}, Wd = (e) => {
  e.imageSmoothingEnabled = !1, e.lineCap = "round", e.beginPath(), e.strokeStyle = "#000000", e.arc(ze * nt / 2, ze * nt / 2, ze * nt / 2 - 1, 0, Math.PI * 2), e.stroke(), e.clip(), e.strokeStyle = "#D6D6D6", Bd.forEach((t) => {
    const { 0: n, 1: s, 2: r, 3: o } = t;
    e.moveTo(n, s), e.lineTo(r, o);
  }), e.stroke(), e.beginPath(), e.strokeStyle = "#FF0000", e.rect((ze - 1) * nt / 2, (ze - 1) * nt / 2, 1 * nt, 1 * nt), e.stroke();
}, eo = (e, t, n, s) => {
  t.style.left = `${n + ni}px`, t.style.top = `${s + ni}px`;
  const r = t.getContext("2d"), o = Math.min(Math.max(0, n - 5), e.width - ze), i = Math.min(Math.max(0, s - 5), e.height - ze);
  r.clearRect(0, 0, ei, ti), r.drawImage(e, o, i, ze, ze, 0, 0, ei, ti), Wd(r);
}, _n = (e) => {
  const t = e.match(/(\d{1,3})px/) || ["", "32"];
  return Number(t[1]);
}, to = (e) => {
  var s;
  return ((s = e.split(";base64,")[0].match(/[a-z]+$/g)) == null ? void 0 : s[0]) || "png";
}, ta = (e, t, n) => {
  const r = `image/${["jpeg", "jpg"].includes(t) ? "jpeg" : "png"}`, o = e.toDataURL(r), i = document.createElement("a");
  i.setAttribute("download", n), i.setAttribute("href", o), i.setAttribute("target", "_blank"), i.click();
}, Gd = { class: "container" }, qd = { class: "container-header" }, Xd = { class: "container-title" }, Jd = {
  key: 0,
  class: "container-wall"
}, Yd = { class: "container-wraper" }, Zd = ["width", "height"], Qd = {
  key: 0,
  class: "container-additional"
}, ep = { class: "container-footer" }, It = 20, tp = /* @__PURE__ */ Ie({
  __name: "Container",
  props: {
    story: {},
    additional: {}
  },
  emits: ["change", "create", "replace", "update", "additional"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = kt(n).story, o = X(null), i = X(null), l = X(null), a = X(!0), u = X(!0);
    let c = null;
    const f = X(!1), m = X(!1), h = X(null), v = X("金馆长"), w = (g) => {
      v.value = g, q();
    };
    ot("text", v), ot("updateText", w);
    const R = X(0), M = X(0), C = (g, S) => {
      r.value.x = g, r.value.y = S;
    }, E = (g) => {
      const { max: S, size: y, color: b, align: x, direction: T, blur: N, degree: I, stroke: F, swidth: j } = g;
      r.value.max = S, r.value.font = `${y}px sans-serif`, r.value.color = b, r.value.stroke = F, r.value.swidth = j, r.value.align = x, r.value.direction = T, r.value.blur = N, r.value.degree = I;
    }, k = ue(() => _n(r.value.font)), L = ue(() => to(r.value.image)), se = ue(() => `${r.value.title}.${L.value} ${R.value} * ${M.value} (${r.value.x}, ${r.value.y})`), G = ue(() => {
      const g = r.value.max || R.value;
      return {
        start: 0,
        center: Math.floor(g / 2),
        end: g
      }[r.value.align];
    }), K = new Image(), z = () => {
      K.onload = async () => {
        const g = o.value;
        g.width = K.naturalWidth, g.height = K.naturalHeight, R.value = g.width, M.value = g.height, H(), q(), te();
      }, K.onerror = (g) => {
        console.error(g);
      }, K.src = r.value.image;
    }, H = () => {
      const g = i.value;
      g.style.width = `${R.value}px`, g.style.height = `${M.value}px`;
    }, q = () => {
      const g = o.value, S = g.getContext("2d");
      S.drawImage(K, 0, 0);
      let y = v.value;
      r.value.senior === 2 && (y += _.value.text), Cr(S, g.width, y, r.value);
    }, te = () => {
      const { x: g, y: S, max: y } = r.value, b = l.value;
      b.style.width = `${y}px`, b.style.height = `${k.value * Kt}px`, b.style.top = `${S - k.value + 2}px`, b.style.left = `${g - G.value}px`;
    };
    St(r, (g, S) => {
      g.mid !== S.mid ? z() : (q(), te());
    }, { deep: !0 });
    let ae = 0, Ae = 0, ve = !1;
    const fe = (g) => {
      ve = !0;
      const { clientX: S, clientY: y } = g;
      ae = S, Ae = y;
    }, W = (g) => {
      if (!ve)
        return;
      const { clientX: S, clientY: y } = g, b = l.value, { width: x, height: T } = b.getBoundingClientRect();
      let N = b.offsetLeft + S - ae, I = b.offsetTop + y - Ae;
      N < -It || I < -It || N > R.value - x + It || I > M.value - T + It ? ve = !1 : (ae = S, Ae = y), N = Math.max(Math.min(N, R.value - x + It), -It), I = Math.max(Math.min(I, M.value - T + It), -It), N += G.value, I += k.value - 2, C(N, I);
    }, oe = () => {
      ve && (ve = !1);
    }, je = () => {
      a.value ? a.value = !1 : (a.value = !0, u.value = !0, c ? (qe(c), c = null) : z());
    }, We = () => {
      c && (qe(c), c = null);
    }, Fe = () => {
      const g = o.value, S = `imeme_${r.value.title}_${v.value}`;
      ta(g, L.value, S);
    }, Se = () => {
      a.value ? s("change", r.value) : u.value || (s("create", r.value, We), a.value = !0, u.value = !0);
    }, Ge = ({ name: g, base64: S }) => {
      u.value = !1;
      const {
        mid: y,
        title: b,
        feature: x,
        image: T,
        x: N,
        y: I,
        max: F,
        font: j,
        color: J,
        align: re,
        direction: ie,
        senior: Ne,
        blur: we,
        degree: Je,
        stroke: He,
        swidth: Gt
      } = r.value;
      c = {
        mid: y,
        title: b,
        feature: x,
        image: T,
        x: N,
        y: I,
        max: F,
        font: j,
        color: J,
        align: re,
        direction: ie,
        senior: Ne,
        blur: we,
        degree: Je,
        stroke: He,
        swidth: Gt
      };
      const Sn = g.slice(0, g.lastIndexOf("."));
      qe({
        mid: `meme_${(/* @__PURE__ */ new Date()).getTime()}`,
        title: Sn,
        feature: Sn,
        image: S,
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
    }, qe = (g) => {
      s("replace", g);
    }, ft = () => {
      f.value = !0;
    }, Oe = (g, S) => {
      const y = o.value, b = h.value;
      eo(y, b, g, S);
    }, D = async (g) => {
      if (!f.value)
        return !1;
      const { offsetX: S, offsetY: y } = g;
      S < 0 || y < 0 || (m.value = !0, Oe(S, y));
    }, U = () => {
      if (!f.value)
        return !1;
      m.value = !1;
    }, $ = (g) => {
      const S = (N) => N.toString(16).padStart(2, "0"), { 0: y, 1: b, 2: x, 3: T } = g.data;
      return `#${S(y)}${S(b)}${S(x)}${S(T)}`.toUpperCase();
    }, V = (g, S) => {
      const x = o.value.getContext("2d").getImageData(g, S, 1, 1);
      return $(x);
    }, le = (g) => {
      if (!f.value)
        return !1;
      const { offsetX: S, offsetY: y } = g;
      if (S < 0 || y < 0)
        return;
      const b = V(S, y);
      r.value.color = b, m.value = !1, f.value = !1;
    }, de = Xl(), p = ue(() => de.path.includes("/edit")), d = (g) => {
      g !== r.value.title && (r.value.title = g, s("update", r.value));
    }, _ = kt(n).additional, O = (g) => {
      g !== _.value.text && (_.value.text = g, q(), s("additional", _.value));
    };
    return bn(() => {
      z();
    }), (g, S) => (Q(), pe("div", Gd, [
      ne("div", qd, [
        ne("div", Xd, [
          p.value ? (Q(), et(P(Re), {
            key: 0,
            class: "container-title-label",
            value: P(r).title,
            "onUpdate:modelValue": S[0] || (S[0] = (y) => d(y))
          }, null, 8, ["value"])) : (Q(), pe(Ce, { key: 1 }, [
            Ms(Ct(se.value), 1)
          ], 64))
        ]),
        B(P(xt), {
          label: a.value ? "添加" : "取消添加",
          u: "primary",
          onClick: je
        }, null, 8, ["label"]),
        B(P(xt), {
          label: "下载",
          u: "primary",
          onClick: Fe
        })
      ]),
      !a.value && u.value ? (Q(), pe("div", Jd, [
        B(P(Yl), { onChange: Ge })
      ])) : (Q(), pe(Ce, { key: 1 }, [
        ne("div", Yd, [
          ne("canvas", {
            ref_key: "canvasRef",
            ref: o,
            class: At({
              "container-canvas": !0,
              "container-pointer": f.value
            }),
            onMousemove: D,
            onMouseleave: U,
            onClick: le
          }, null, 34),
          dn(ne("div", {
            class: "container-area",
            ref_key: "areaRef",
            ref: i,
            onMousemove: W,
            onMouseup: oe
          }, [
            ne("div", {
              class: "container-drag",
              ref_key: "dragRef",
              ref: l,
              onMousedown: fe
            }, null, 544)
          ], 544), [
            [hn, !f.value]
          ]),
          dn(ne("canvas", {
            ref_key: "layerRef",
            ref: h,
            class: "container-layer",
            style: vn({
              borderRadius: `${P(Rt)}px`
            }),
            width: P(Rt),
            height: P(Rt)
          }, null, 12, Zd), [
            [hn, f.value && m.value]
          ])
        ]),
        B(Ql, {
          max: P(r).max,
          color: P(r).color,
          stroke: P(r).stroke,
          swidth: P(r).swidth,
          size: k.value,
          align: P(r).align,
          direction: P(r).direction,
          blur: P(r).blur,
          degree: P(r).degree,
          onChange: E,
          onPick: ft
        }, null, 8, ["max", "color", "stroke", "swidth", "size", "align", "direction", "blur", "degree"]),
        P(r).senior === 2 && p.value ? (Q(), pe("div", Qd, [
          B(P(Re), {
            class: "container-additional-label",
            value: P(_).text,
            "onUpdate:modelValue": S[1] || (S[1] = (y) => O(y))
          }, null, 8, ["value"])
        ])) : Fn("", !0)
      ], 64)),
      ne("footer", ep, [
        B(P(xt), {
          label: a.value ? "更新" : "确认",
          u: "primary",
          onClick: Se
        }, null, 8, ["label"])
      ])
    ]));
  }
}), np = { class: "feature-property" }, sp = /* @__PURE__ */ Ie({
  __name: "FeatureProperty",
  props: {
    width: {},
    height: {},
    ipath: {}
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = Te("text"), o = Te("updateText"), i = Te("paths"), { width: l, height: a, ipath: u } = kt(n), c = (f, m) => {
      const h = {
        width: l.value,
        height: a.value,
        ipath: u.value
      };
      h[m] = ["ipath"].includes(m) ? f : parseInt(f), s("change", h);
    };
    return (f, m) => (Q(), pe("div", np, [
      B(P(Re), {
        class: "feature-property-size",
        value: P(l),
        "onUpdate:modelValue": m[0] || (m[0] = (h) => c(h, "width"))
      }, null, 8, ["value"]),
      B(P(Re), {
        class: "feature-property-size",
        value: P(a),
        "onUpdate:modelValue": m[1] || (m[1] = (h) => c(h, "height"))
      }, null, 8, ["value"]),
      B(P($d), {
        class: "feature-property-path",
        options: P(i),
        selected: P(u),
        "onUpdate:modelValue": m[2] || (m[2] = (h) => c(h, "ipath"))
      }, null, 8, ["options", "selected"]),
      B(P(Re), {
        class: "feature-property-text",
        value: P(r),
        "onUpdate:modelValue": P(o)
      }, null, 8, ["value", "onUpdate:modelValue"])
    ]));
  }
}), si = {
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
  getImageBase64: {
    url: "/image/base64",
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
function na(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: rp } = Object.prototype, { getPrototypeOf: no } = Object, $s = /* @__PURE__ */ ((e) => (t) => {
  const n = rp.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), ut = (e) => (e = e.toLowerCase(), (t) => $s(t) === e), Ls = (e) => (t) => typeof t === e, { isArray: wn } = Array, qn = Ls("undefined");
function op(e) {
  return e !== null && !qn(e) && e.constructor !== null && !qn(e.constructor) && tt(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const sa = ut("ArrayBuffer");
function ip(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && sa(e.buffer), t;
}
const lp = Ls("string"), tt = Ls("function"), ra = Ls("number"), Us = (e) => e !== null && typeof e == "object", ap = (e) => e === !0 || e === !1, is = (e) => {
  if ($s(e) !== "object")
    return !1;
  const t = no(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, cp = ut("Date"), up = ut("File"), fp = ut("Blob"), dp = ut("FileList"), pp = (e) => Us(e) && tt(e.pipe), hp = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || tt(e.append) && ((t = $s(e)) === "formdata" || // detect form-data instance
  t === "object" && tt(e.toString) && e.toString() === "[object FormData]"));
}, mp = ut("URLSearchParams"), [gp, _p, vp, yp] = ["ReadableStream", "Request", "Response", "Headers"].map(ut), bp = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Yn(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let s, r;
  if (typeof e != "object" && (e = [e]), wn(e))
    for (s = 0, r = e.length; s < r; s++)
      t.call(null, e[s], s, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), i = o.length;
    let l;
    for (s = 0; s < i; s++)
      l = o[s], t.call(null, e[l], l, e);
  }
}
function oa(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let s = n.length, r;
  for (; s-- > 0; )
    if (r = n[s], t === r.toLowerCase())
      return r;
  return null;
}
const Yt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, ia = (e) => !qn(e) && e !== Yt;
function kr() {
  const { caseless: e } = ia(this) && this || {}, t = {}, n = (s, r) => {
    const o = e && oa(t, r) || r;
    is(t[o]) && is(s) ? t[o] = kr(t[o], s) : is(s) ? t[o] = kr({}, s) : wn(s) ? t[o] = s.slice() : t[o] = s;
  };
  for (let s = 0, r = arguments.length; s < r; s++)
    arguments[s] && Yn(arguments[s], n);
  return t;
}
const wp = (e, t, n, { allOwnKeys: s } = {}) => (Yn(t, (r, o) => {
  n && tt(r) ? e[o] = na(r, n) : e[o] = r;
}, { allOwnKeys: s }), e), Ep = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Sp = (e, t, n, s) => {
  e.prototype = Object.create(t.prototype, s), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, xp = (e, t, n, s) => {
  let r, o, i;
  const l = {};
  if (t = t || {}, e == null) return t;
  do {
    for (r = Object.getOwnPropertyNames(e), o = r.length; o-- > 0; )
      i = r[o], (!s || s(i, e, t)) && !l[i] && (t[i] = e[i], l[i] = !0);
    e = n !== !1 && no(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Rp = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const s = e.indexOf(t, n);
  return s !== -1 && s === n;
}, Cp = (e) => {
  if (!e) return null;
  if (wn(e)) return e;
  let t = e.length;
  if (!ra(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, kp = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && no(Uint8Array)), Tp = (e, t) => {
  const s = (e && e[Symbol.iterator]).call(e);
  let r;
  for (; (r = s.next()) && !r.done; ) {
    const o = r.value;
    t.call(e, o[0], o[1]);
  }
}, Ap = (e, t) => {
  let n;
  const s = [];
  for (; (n = e.exec(t)) !== null; )
    s.push(n);
  return s;
}, Op = ut("HTMLFormElement"), Pp = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, s, r) {
    return s.toUpperCase() + r;
  }
), ri = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Dp = ut("RegExp"), la = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), s = {};
  Yn(n, (r, o) => {
    let i;
    (i = t(r, o, e)) !== !1 && (s[o] = i || r);
  }), Object.defineProperties(e, s);
}, Mp = (e) => {
  la(e, (t, n) => {
    if (tt(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const s = e[n];
    if (tt(s)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, Ip = (e, t) => {
  const n = {}, s = (r) => {
    r.forEach((o) => {
      n[o] = !0;
    });
  };
  return wn(e) ? s(e) : s(String(e).split(t)), n;
}, Np = () => {
}, Fp = (e, t) => e != null && Number.isFinite(e = +e) ? e : t, ir = "abcdefghijklmnopqrstuvwxyz", oi = "0123456789", aa = {
  DIGIT: oi,
  ALPHA: ir,
  ALPHA_DIGIT: ir + ir.toUpperCase() + oi
}, $p = (e = 16, t = aa.ALPHA_DIGIT) => {
  let n = "";
  const { length: s } = t;
  for (; e--; )
    n += t[Math.random() * s | 0];
  return n;
};
function Lp(e) {
  return !!(e && tt(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const Up = (e) => {
  const t = new Array(10), n = (s, r) => {
    if (Us(s)) {
      if (t.indexOf(s) >= 0)
        return;
      if (!("toJSON" in s)) {
        t[r] = s;
        const o = wn(s) ? [] : {};
        return Yn(s, (i, l) => {
          const a = n(i, r + 1);
          !qn(a) && (o[l] = a);
        }), t[r] = void 0, o;
      }
    }
    return s;
  };
  return n(e, 0);
}, jp = ut("AsyncFunction"), Hp = (e) => e && (Us(e) || tt(e)) && tt(e.then) && tt(e.catch), ca = ((e, t) => e ? setImmediate : t ? ((n, s) => (Yt.addEventListener("message", ({ source: r, data: o }) => {
  r === Yt && o === n && s.length && s.shift()();
}, !1), (r) => {
  s.push(r), Yt.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  tt(Yt.postMessage)
), Vp = typeof queueMicrotask < "u" ? queueMicrotask.bind(Yt) : typeof process < "u" && process.nextTick || ca, A = {
  isArray: wn,
  isArrayBuffer: sa,
  isBuffer: op,
  isFormData: hp,
  isArrayBufferView: ip,
  isString: lp,
  isNumber: ra,
  isBoolean: ap,
  isObject: Us,
  isPlainObject: is,
  isReadableStream: gp,
  isRequest: _p,
  isResponse: vp,
  isHeaders: yp,
  isUndefined: qn,
  isDate: cp,
  isFile: up,
  isBlob: fp,
  isRegExp: Dp,
  isFunction: tt,
  isStream: pp,
  isURLSearchParams: mp,
  isTypedArray: kp,
  isFileList: dp,
  forEach: Yn,
  merge: kr,
  extend: wp,
  trim: bp,
  stripBOM: Ep,
  inherits: Sp,
  toFlatObject: xp,
  kindOf: $s,
  kindOfTest: ut,
  endsWith: Rp,
  toArray: Cp,
  forEachEntry: Tp,
  matchAll: Ap,
  isHTMLForm: Op,
  hasOwnProperty: ri,
  hasOwnProp: ri,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: la,
  freezeMethods: Mp,
  toObjectSet: Ip,
  toCamelCase: Pp,
  noop: Np,
  toFiniteNumber: Fp,
  findKey: oa,
  global: Yt,
  isContextDefined: ia,
  ALPHABET: aa,
  generateString: $p,
  isSpecCompliantForm: Lp,
  toJSONObject: Up,
  isAsyncFn: jp,
  isThenable: Hp,
  setImmediate: ca,
  asap: Vp
};
function ee(e, t, n, s, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), s && (this.request = s), r && (this.response = r, this.status = r.status ? r.status : null);
}
A.inherits(ee, Error, {
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
      config: A.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const ua = ee.prototype, fa = {};
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
  fa[e] = { value: e };
});
Object.defineProperties(ee, fa);
Object.defineProperty(ua, "isAxiosError", { value: !0 });
ee.from = (e, t, n, s, r, o) => {
  const i = Object.create(ua);
  return A.toFlatObject(e, i, function(a) {
    return a !== Error.prototype;
  }, (l) => l !== "isAxiosError"), ee.call(i, e.message, t, n, s, r), i.cause = e, i.name = e.name, o && Object.assign(i, o), i;
};
const Bp = null;
function Tr(e) {
  return A.isPlainObject(e) || A.isArray(e);
}
function da(e) {
  return A.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function ii(e, t, n) {
  return e ? e.concat(t).map(function(r, o) {
    return r = da(r), !n && o ? "[" + r + "]" : r;
  }).join(n ? "." : "") : t;
}
function Kp(e) {
  return A.isArray(e) && !e.some(Tr);
}
const zp = A.toFlatObject(A, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function js(e, t, n) {
  if (!A.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = A.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(w, R) {
    return !A.isUndefined(R[w]);
  });
  const s = n.metaTokens, r = n.visitor || c, o = n.dots, i = n.indexes, a = (n.Blob || typeof Blob < "u" && Blob) && A.isSpecCompliantForm(t);
  if (!A.isFunction(r))
    throw new TypeError("visitor must be a function");
  function u(v) {
    if (v === null) return "";
    if (A.isDate(v))
      return v.toISOString();
    if (!a && A.isBlob(v))
      throw new ee("Blob is not supported. Use a Buffer instead.");
    return A.isArrayBuffer(v) || A.isTypedArray(v) ? a && typeof Blob == "function" ? new Blob([v]) : Buffer.from(v) : v;
  }
  function c(v, w, R) {
    let M = v;
    if (v && !R && typeof v == "object") {
      if (A.endsWith(w, "{}"))
        w = s ? w : w.slice(0, -2), v = JSON.stringify(v);
      else if (A.isArray(v) && Kp(v) || (A.isFileList(v) || A.endsWith(w, "[]")) && (M = A.toArray(v)))
        return w = da(w), M.forEach(function(E, k) {
          !(A.isUndefined(E) || E === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? ii([w], k, o) : i === null ? w : w + "[]",
            u(E)
          );
        }), !1;
    }
    return Tr(v) ? !0 : (t.append(ii(R, w, o), u(v)), !1);
  }
  const f = [], m = Object.assign(zp, {
    defaultVisitor: c,
    convertValue: u,
    isVisitable: Tr
  });
  function h(v, w) {
    if (!A.isUndefined(v)) {
      if (f.indexOf(v) !== -1)
        throw Error("Circular reference detected in " + w.join("."));
      f.push(v), A.forEach(v, function(M, C) {
        (!(A.isUndefined(M) || M === null) && r.call(
          t,
          M,
          A.isString(C) ? C.trim() : C,
          w,
          m
        )) === !0 && h(M, w ? w.concat(C) : [C]);
      }), f.pop();
    }
  }
  if (!A.isObject(e))
    throw new TypeError("data must be an object");
  return h(e), t;
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
function so(e, t) {
  this._pairs = [], e && js(e, this, t);
}
const pa = so.prototype;
pa.append = function(t, n) {
  this._pairs.push([t, n]);
};
pa.toString = function(t) {
  const n = t ? function(s) {
    return t.call(this, s, li);
  } : li;
  return this._pairs.map(function(r) {
    return n(r[0]) + "=" + n(r[1]);
  }, "").join("&");
};
function Wp(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function ha(e, t, n) {
  if (!t)
    return e;
  const s = n && n.encode || Wp;
  A.isFunction(n) && (n = {
    serialize: n
  });
  const r = n && n.serialize;
  let o;
  if (r ? o = r(t, n) : o = A.isURLSearchParams(t) ? t.toString() : new so(t, n).toString(s), o) {
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
const ma = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Gp = typeof URLSearchParams < "u" ? URLSearchParams : so, qp = typeof FormData < "u" ? FormData : null, Xp = typeof Blob < "u" ? Blob : null, Jp = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Gp,
    FormData: qp,
    Blob: Xp
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, ro = typeof window < "u" && typeof document < "u", Ar = typeof navigator == "object" && navigator || void 0, Yp = ro && (!Ar || ["ReactNative", "NativeScript", "NS"].indexOf(Ar.product) < 0), Zp = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Qp = ro && window.location.href || "http://localhost", eh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: ro,
  hasStandardBrowserEnv: Yp,
  hasStandardBrowserWebWorkerEnv: Zp,
  navigator: Ar,
  origin: Qp
}, Symbol.toStringTag, { value: "Module" })), Ue = {
  ...eh,
  ...Jp
};
function th(e, t) {
  return js(e, new Ue.classes.URLSearchParams(), Object.assign({
    visitor: function(n, s, r, o) {
      return Ue.isNode && A.isBuffer(n) ? (this.append(s, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function nh(e) {
  return A.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function sh(e) {
  const t = {}, n = Object.keys(e);
  let s;
  const r = n.length;
  let o;
  for (s = 0; s < r; s++)
    o = n[s], t[o] = e[o];
  return t;
}
function ga(e) {
  function t(n, s, r, o) {
    let i = n[o++];
    if (i === "__proto__") return !0;
    const l = Number.isFinite(+i), a = o >= n.length;
    return i = !i && A.isArray(r) ? r.length : i, a ? (A.hasOwnProp(r, i) ? r[i] = [r[i], s] : r[i] = s, !l) : ((!r[i] || !A.isObject(r[i])) && (r[i] = []), t(n, s, r[i], o) && A.isArray(r[i]) && (r[i] = sh(r[i])), !l);
  }
  if (A.isFormData(e) && A.isFunction(e.entries)) {
    const n = {};
    return A.forEachEntry(e, (s, r) => {
      t(nh(s), r, n, 0);
    }), n;
  }
  return null;
}
function rh(e, t, n) {
  if (A.isString(e))
    try {
      return (t || JSON.parse)(e), A.trim(e);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (0, JSON.stringify)(e);
}
const Zn = {
  transitional: ma,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const s = n.getContentType() || "", r = s.indexOf("application/json") > -1, o = A.isObject(t);
    if (o && A.isHTMLForm(t) && (t = new FormData(t)), A.isFormData(t))
      return r ? JSON.stringify(ga(t)) : t;
    if (A.isArrayBuffer(t) || A.isBuffer(t) || A.isStream(t) || A.isFile(t) || A.isBlob(t) || A.isReadableStream(t))
      return t;
    if (A.isArrayBufferView(t))
      return t.buffer;
    if (A.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let l;
    if (o) {
      if (s.indexOf("application/x-www-form-urlencoded") > -1)
        return th(t, this.formSerializer).toString();
      if ((l = A.isFileList(t)) || s.indexOf("multipart/form-data") > -1) {
        const a = this.env && this.env.FormData;
        return js(
          l ? { "files[]": t } : t,
          a && new a(),
          this.formSerializer
        );
      }
    }
    return o || r ? (n.setContentType("application/json", !1), rh(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || Zn.transitional, s = n && n.forcedJSONParsing, r = this.responseType === "json";
    if (A.isResponse(t) || A.isReadableStream(t))
      return t;
    if (t && A.isString(t) && (s && !this.responseType || r)) {
      const i = !(n && n.silentJSONParsing) && r;
      try {
        return JSON.parse(t);
      } catch (l) {
        if (i)
          throw l.name === "SyntaxError" ? ee.from(l, ee.ERR_BAD_RESPONSE, this, null, this.response) : l;
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
    FormData: Ue.classes.FormData,
    Blob: Ue.classes.Blob
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
A.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Zn.headers[e] = {};
});
const oh = A.toObjectSet([
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
]), ih = (e) => {
  const t = {};
  let n, s, r;
  return e && e.split(`
`).forEach(function(i) {
    r = i.indexOf(":"), n = i.substring(0, r).trim().toLowerCase(), s = i.substring(r + 1).trim(), !(!n || t[n] && oh[n]) && (n === "set-cookie" ? t[n] ? t[n].push(s) : t[n] = [s] : t[n] = t[n] ? t[n] + ", " + s : s);
  }), t;
}, ci = Symbol("internals");
function Tn(e) {
  return e && String(e).trim().toLowerCase();
}
function ls(e) {
  return e === !1 || e == null ? e : A.isArray(e) ? e.map(ls) : String(e);
}
function lh(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = n.exec(e); )
    t[s[1]] = s[2];
  return t;
}
const ah = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function lr(e, t, n, s, r) {
  if (A.isFunction(s))
    return s.call(this, t, n);
  if (r && (t = n), !!A.isString(t)) {
    if (A.isString(s))
      return t.indexOf(s) !== -1;
    if (A.isRegExp(s))
      return s.test(t);
  }
}
function ch(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, s) => n.toUpperCase() + s);
}
function uh(e, t) {
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
class Xe {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, s) {
    const r = this;
    function o(l, a, u) {
      const c = Tn(a);
      if (!c)
        throw new Error("header name must be a non-empty string");
      const f = A.findKey(r, c);
      (!f || r[f] === void 0 || u === !0 || u === void 0 && r[f] !== !1) && (r[f || a] = ls(l));
    }
    const i = (l, a) => A.forEach(l, (u, c) => o(u, c, a));
    if (A.isPlainObject(t) || t instanceof this.constructor)
      i(t, n);
    else if (A.isString(t) && (t = t.trim()) && !ah(t))
      i(ih(t), n);
    else if (A.isHeaders(t))
      for (const [l, a] of t.entries())
        o(a, l, s);
    else
      t != null && o(n, t, s);
    return this;
  }
  get(t, n) {
    if (t = Tn(t), t) {
      const s = A.findKey(this, t);
      if (s) {
        const r = this[s];
        if (!n)
          return r;
        if (n === !0)
          return lh(r);
        if (A.isFunction(n))
          return n.call(this, r, s);
        if (A.isRegExp(n))
          return n.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = Tn(t), t) {
      const s = A.findKey(this, t);
      return !!(s && this[s] !== void 0 && (!n || lr(this, this[s], s, n)));
    }
    return !1;
  }
  delete(t, n) {
    const s = this;
    let r = !1;
    function o(i) {
      if (i = Tn(i), i) {
        const l = A.findKey(s, i);
        l && (!n || lr(s, s[l], l, n)) && (delete s[l], r = !0);
      }
    }
    return A.isArray(t) ? t.forEach(o) : o(t), r;
  }
  clear(t) {
    const n = Object.keys(this);
    let s = n.length, r = !1;
    for (; s--; ) {
      const o = n[s];
      (!t || lr(this, this[o], o, t, !0)) && (delete this[o], r = !0);
    }
    return r;
  }
  normalize(t) {
    const n = this, s = {};
    return A.forEach(this, (r, o) => {
      const i = A.findKey(s, o);
      if (i) {
        n[i] = ls(r), delete n[o];
        return;
      }
      const l = t ? ch(o) : String(o).trim();
      l !== o && delete n[o], n[l] = ls(r), s[l] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return A.forEach(this, (s, r) => {
      s != null && s !== !1 && (n[r] = t && A.isArray(s) ? s.join(", ") : s);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
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
      const l = Tn(i);
      s[l] || (uh(r, i), s[l] = !0);
    }
    return A.isArray(t) ? t.forEach(o) : o(t), this;
  }
}
Xe.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
A.reduceDescriptors(Xe.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(s) {
      this[n] = s;
    }
  };
});
A.freezeMethods(Xe);
function ar(e, t) {
  const n = this || Zn, s = t || n, r = Xe.from(s.headers);
  let o = s.data;
  return A.forEach(e, function(l) {
    o = l.call(n, o, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), o;
}
function _a(e) {
  return !!(e && e.__CANCEL__);
}
function En(e, t, n) {
  ee.call(this, e ?? "canceled", ee.ERR_CANCELED, t, n), this.name = "CanceledError";
}
A.inherits(En, ee, {
  __CANCEL__: !0
});
function va(e, t, n) {
  const s = n.config.validateStatus;
  !n.status || !s || s(n.status) ? e(n) : t(new ee(
    "Request failed with status code " + n.status,
    [ee.ERR_BAD_REQUEST, ee.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function fh(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function dh(e, t) {
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
    const h = c && u - c;
    return h ? Math.round(m * 1e3 / h) : void 0;
  };
}
function ph(e, t) {
  let n = 0, s = 1e3 / t, r, o;
  const i = (u, c = Date.now()) => {
    n = c, r = null, o && (clearTimeout(o), o = null), e.apply(null, u);
  };
  return [(...u) => {
    const c = Date.now(), f = c - n;
    f >= s ? i(u, c) : (r = u, o || (o = setTimeout(() => {
      o = null, i(r);
    }, s - f)));
  }, () => r && i(r)];
}
const vs = (e, t, n = 3) => {
  let s = 0;
  const r = dh(50, 250);
  return ph((o) => {
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
}, fi = (e) => (...t) => A.asap(() => e(...t)), hh = Ue.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, Ue.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(Ue.origin),
  Ue.navigator && /(msie|trident)/i.test(Ue.navigator.userAgent)
) : () => !0, mh = Ue.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, s, r, o) {
      const i = [e + "=" + encodeURIComponent(t)];
      A.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()), A.isString(s) && i.push("path=" + s), A.isString(r) && i.push("domain=" + r), o === !0 && i.push("secure"), document.cookie = i.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
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
function gh(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function _h(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function ya(e, t) {
  return e && !gh(t) ? _h(e, t) : t;
}
const di = (e) => e instanceof Xe ? { ...e } : e;
function nn(e, t) {
  t = t || {};
  const n = {};
  function s(u, c, f, m) {
    return A.isPlainObject(u) && A.isPlainObject(c) ? A.merge.call({ caseless: m }, u, c) : A.isPlainObject(c) ? A.merge({}, c) : A.isArray(c) ? c.slice() : c;
  }
  function r(u, c, f, m) {
    if (A.isUndefined(c)) {
      if (!A.isUndefined(u))
        return s(void 0, u, f, m);
    } else return s(u, c, f, m);
  }
  function o(u, c) {
    if (!A.isUndefined(c))
      return s(void 0, c);
  }
  function i(u, c) {
    if (A.isUndefined(c)) {
      if (!A.isUndefined(u))
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
  return A.forEach(Object.keys(Object.assign({}, e, t)), function(c) {
    const f = a[c] || r, m = f(e[c], t[c], c);
    A.isUndefined(m) && f !== l || (n[c] = m);
  }), n;
}
const ba = (e) => {
  const t = nn({}, e);
  let { data: n, withXSRFToken: s, xsrfHeaderName: r, xsrfCookieName: o, headers: i, auth: l } = t;
  t.headers = i = Xe.from(i), t.url = ha(ya(t.baseURL, t.url), e.params, e.paramsSerializer), l && i.set(
    "Authorization",
    "Basic " + btoa((l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : ""))
  );
  let a;
  if (A.isFormData(n)) {
    if (Ue.hasStandardBrowserEnv || Ue.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if ((a = i.getContentType()) !== !1) {
      const [u, ...c] = a ? a.split(";").map((f) => f.trim()).filter(Boolean) : [];
      i.setContentType([u || "multipart/form-data", ...c].join("; "));
    }
  }
  if (Ue.hasStandardBrowserEnv && (s && A.isFunction(s) && (s = s(t)), s || s !== !1 && hh(t.url))) {
    const u = r && o && mh.read(o);
    u && i.set(r, u);
  }
  return t;
}, vh = typeof XMLHttpRequest < "u", yh = vh && function(e) {
  return new Promise(function(n, s) {
    const r = ba(e);
    let o = r.data;
    const i = Xe.from(r.headers).normalize();
    let { responseType: l, onUploadProgress: a, onDownloadProgress: u } = r, c, f, m, h, v;
    function w() {
      h && h(), v && v(), r.cancelToken && r.cancelToken.unsubscribe(c), r.signal && r.signal.removeEventListener("abort", c);
    }
    let R = new XMLHttpRequest();
    R.open(r.method.toUpperCase(), r.url, !0), R.timeout = r.timeout;
    function M() {
      if (!R)
        return;
      const E = Xe.from(
        "getAllResponseHeaders" in R && R.getAllResponseHeaders()
      ), L = {
        data: !l || l === "text" || l === "json" ? R.responseText : R.response,
        status: R.status,
        statusText: R.statusText,
        headers: E,
        config: e,
        request: R
      };
      va(function(G) {
        n(G), w();
      }, function(G) {
        s(G), w();
      }, L), R = null;
    }
    "onloadend" in R ? R.onloadend = M : R.onreadystatechange = function() {
      !R || R.readyState !== 4 || R.status === 0 && !(R.responseURL && R.responseURL.indexOf("file:") === 0) || setTimeout(M);
    }, R.onabort = function() {
      R && (s(new ee("Request aborted", ee.ECONNABORTED, e, R)), R = null);
    }, R.onerror = function() {
      s(new ee("Network Error", ee.ERR_NETWORK, e, R)), R = null;
    }, R.ontimeout = function() {
      let k = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const L = r.transitional || ma;
      r.timeoutErrorMessage && (k = r.timeoutErrorMessage), s(new ee(
        k,
        L.clarifyTimeoutError ? ee.ETIMEDOUT : ee.ECONNABORTED,
        e,
        R
      )), R = null;
    }, o === void 0 && i.setContentType(null), "setRequestHeader" in R && A.forEach(i.toJSON(), function(k, L) {
      R.setRequestHeader(L, k);
    }), A.isUndefined(r.withCredentials) || (R.withCredentials = !!r.withCredentials), l && l !== "json" && (R.responseType = r.responseType), u && ([m, v] = vs(u, !0), R.addEventListener("progress", m)), a && R.upload && ([f, h] = vs(a), R.upload.addEventListener("progress", f), R.upload.addEventListener("loadend", h)), (r.cancelToken || r.signal) && (c = (E) => {
      R && (s(!E || E.type ? new En(null, e, R) : E), R.abort(), R = null);
    }, r.cancelToken && r.cancelToken.subscribe(c), r.signal && (r.signal.aborted ? c() : r.signal.addEventListener("abort", c)));
    const C = fh(r.url);
    if (C && Ue.protocols.indexOf(C) === -1) {
      s(new ee("Unsupported protocol " + C + ":", ee.ERR_BAD_REQUEST, e));
      return;
    }
    R.send(o || null);
  });
}, bh = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let s = new AbortController(), r;
    const o = function(u) {
      if (!r) {
        r = !0, l();
        const c = u instanceof Error ? u : this.reason;
        s.abort(c instanceof ee ? c : new En(c instanceof Error ? c.message : c));
      }
    };
    let i = t && setTimeout(() => {
      i = null, o(new ee(`timeout ${t} of ms exceeded`, ee.ETIMEDOUT));
    }, t);
    const l = () => {
      e && (i && clearTimeout(i), i = null, e.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(o) : u.removeEventListener("abort", o);
      }), e = null);
    };
    e.forEach((u) => u.addEventListener("abort", o));
    const { signal: a } = s;
    return a.unsubscribe = () => A.asap(l), a;
  }
}, wh = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let s = 0, r;
  for (; s < n; )
    r = s + t, yield e.slice(s, r), s = r;
}, Eh = async function* (e, t) {
  for await (const n of Sh(e))
    yield* wh(n, t);
}, Sh = async function* (e) {
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
}, pi = (e, t, n, s) => {
  const r = Eh(e, t);
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
}, Hs = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", wa = Hs && typeof ReadableStream == "function", xh = Hs && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), Ea = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, Rh = wa && Ea(() => {
  let e = !1;
  const t = new Request(Ue.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), hi = 64 * 1024, Or = wa && Ea(() => A.isReadableStream(new Response("").body)), ys = {
  stream: Or && ((e) => e.body)
};
Hs && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !ys[t] && (ys[t] = A.isFunction(e[t]) ? (n) => n[t]() : (n, s) => {
      throw new ee(`Response type '${t}' is not supported`, ee.ERR_NOT_SUPPORT, s);
    });
  });
})(new Response());
const Ch = async (e) => {
  if (e == null)
    return 0;
  if (A.isBlob(e))
    return e.size;
  if (A.isSpecCompliantForm(e))
    return (await new Request(Ue.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (A.isArrayBufferView(e) || A.isArrayBuffer(e))
    return e.byteLength;
  if (A.isURLSearchParams(e) && (e = e + ""), A.isString(e))
    return (await xh(e)).byteLength;
}, kh = async (e, t) => {
  const n = A.toFiniteNumber(e.getContentLength());
  return n ?? Ch(t);
}, Th = Hs && (async (e) => {
  let {
    url: t,
    method: n,
    data: s,
    signal: r,
    cancelToken: o,
    timeout: i,
    onDownloadProgress: l,
    onUploadProgress: a,
    responseType: u,
    headers: c,
    withCredentials: f = "same-origin",
    fetchOptions: m
  } = ba(e);
  u = u ? (u + "").toLowerCase() : "text";
  let h = bh([r, o && o.toAbortSignal()], i), v;
  const w = h && h.unsubscribe && (() => {
    h.unsubscribe();
  });
  let R;
  try {
    if (a && Rh && n !== "get" && n !== "head" && (R = await kh(c, s)) !== 0) {
      let L = new Request(t, {
        method: "POST",
        body: s,
        duplex: "half"
      }), se;
      if (A.isFormData(s) && (se = L.headers.get("content-type")) && c.setContentType(se), L.body) {
        const [G, K] = ui(
          R,
          vs(fi(a))
        );
        s = pi(L.body, hi, G, K);
      }
    }
    A.isString(f) || (f = f ? "include" : "omit");
    const M = "credentials" in Request.prototype;
    v = new Request(t, {
      ...m,
      signal: h,
      method: n.toUpperCase(),
      headers: c.normalize().toJSON(),
      body: s,
      duplex: "half",
      credentials: M ? f : void 0
    });
    let C = await fetch(v);
    const E = Or && (u === "stream" || u === "response");
    if (Or && (l || E && w)) {
      const L = {};
      ["status", "statusText", "headers"].forEach((z) => {
        L[z] = C[z];
      });
      const se = A.toFiniteNumber(C.headers.get("content-length")), [G, K] = l && ui(
        se,
        vs(fi(l), !0)
      ) || [];
      C = new Response(
        pi(C.body, hi, G, () => {
          K && K(), w && w();
        }),
        L
      );
    }
    u = u || "text";
    let k = await ys[A.findKey(ys, u) || "text"](C, e);
    return !E && w && w(), await new Promise((L, se) => {
      va(L, se, {
        data: k,
        headers: Xe.from(C.headers),
        status: C.status,
        statusText: C.statusText,
        config: e,
        request: v
      });
    });
  } catch (M) {
    throw w && w(), M && M.name === "TypeError" && /fetch/i.test(M.message) ? Object.assign(
      new ee("Network Error", ee.ERR_NETWORK, e, v),
      {
        cause: M.cause || M
      }
    ) : ee.from(M, M && M.code, e, v);
  }
}), Pr = {
  http: Bp,
  xhr: yh,
  fetch: Th
};
A.forEach(Pr, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const mi = (e) => `- ${e}`, Ah = (e) => A.isFunction(e) || e === null || e === !1, Sa = {
  getAdapter: (e) => {
    e = A.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, s;
    const r = {};
    for (let o = 0; o < t; o++) {
      n = e[o];
      let i;
      if (s = n, !Ah(n) && (s = Pr[(i = String(n)).toLowerCase()], s === void 0))
        throw new ee(`Unknown adapter '${i}'`);
      if (s)
        break;
      r[i || "#" + o] = s;
    }
    if (!s) {
      const o = Object.entries(r).map(
        ([l, a]) => `adapter ${l} ` + (a === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let i = t ? o.length > 1 ? `since :
` + o.map(mi).join(`
`) : " " + mi(o[0]) : "as no adapter specified";
      throw new ee(
        "There is no suitable adapter to dispatch the request " + i,
        "ERR_NOT_SUPPORT"
      );
    }
    return s;
  },
  adapters: Pr
};
function cr(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new En(null, e);
}
function gi(e) {
  return cr(e), e.headers = Xe.from(e.headers), e.data = ar.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Sa.getAdapter(e.adapter || Zn.adapter)(e).then(function(s) {
    return cr(e), s.data = ar.call(
      e,
      e.transformResponse,
      s
    ), s.headers = Xe.from(s.headers), s;
  }, function(s) {
    return _a(s) || (cr(e), s && s.response && (s.response.data = ar.call(
      e,
      e.transformResponse,
      s.response
    ), s.response.headers = Xe.from(s.response.headers))), Promise.reject(s);
  });
}
const xa = "1.7.9", Vs = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Vs[e] = function(s) {
    return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const _i = {};
Vs.transitional = function(t, n, s) {
  function r(o, i) {
    return "[Axios v" + xa + "] Transitional option '" + o + "'" + i + (s ? ". " + s : "");
  }
  return (o, i, l) => {
    if (t === !1)
      throw new ee(
        r(i, " has been removed" + (n ? " in " + n : "")),
        ee.ERR_DEPRECATED
      );
    return n && !_i[i] && (_i[i] = !0, console.warn(
      r(
        i,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(o, i, l) : !0;
  };
};
Vs.spelling = function(t) {
  return (n, s) => (console.warn(`${s} is likely a misspelling of ${t}`), !0);
};
function Oh(e, t, n) {
  if (typeof e != "object")
    throw new ee("options must be an object", ee.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(e);
  let r = s.length;
  for (; r-- > 0; ) {
    const o = s[r], i = t[o];
    if (i) {
      const l = e[o], a = l === void 0 || i(l, o, e);
      if (a !== !0)
        throw new ee("option " + o + " must be " + a, ee.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new ee("Unknown option " + o, ee.ERR_BAD_OPTION);
  }
}
const as = {
  assertOptions: Oh,
  validators: Vs
}, ht = as.validators;
class en {
  constructor(t) {
    this.defaults = t, this.interceptors = {
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
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = nn(this.defaults, n);
    const { transitional: s, paramsSerializer: r, headers: o } = n;
    s !== void 0 && as.assertOptions(s, {
      silentJSONParsing: ht.transitional(ht.boolean),
      forcedJSONParsing: ht.transitional(ht.boolean),
      clarifyTimeoutError: ht.transitional(ht.boolean)
    }, !1), r != null && (A.isFunction(r) ? n.paramsSerializer = {
      serialize: r
    } : as.assertOptions(r, {
      encode: ht.function,
      serialize: ht.function
    }, !0)), as.assertOptions(n, {
      baseUrl: ht.spelling("baseURL"),
      withXsrfToken: ht.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let i = o && A.merge(
      o.common,
      o[n.method]
    );
    o && A.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (v) => {
        delete o[v];
      }
    ), n.headers = Xe.concat(i, o);
    const l = [];
    let a = !0;
    this.interceptors.request.forEach(function(w) {
      typeof w.runWhen == "function" && w.runWhen(n) === !1 || (a = a && w.synchronous, l.unshift(w.fulfilled, w.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(w) {
      u.push(w.fulfilled, w.rejected);
    });
    let c, f = 0, m;
    if (!a) {
      const v = [gi.bind(this), void 0];
      for (v.unshift.apply(v, l), v.push.apply(v, u), m = v.length, c = Promise.resolve(n); f < m; )
        c = c.then(v[f++], v[f++]);
      return c;
    }
    m = l.length;
    let h = n;
    for (f = 0; f < m; ) {
      const v = l[f++], w = l[f++];
      try {
        h = v(h);
      } catch (R) {
        w.call(this, R);
        break;
      }
    }
    try {
      c = gi.call(this, h);
    } catch (v) {
      return Promise.reject(v);
    }
    for (f = 0, m = u.length; f < m; )
      c = c.then(u[f++], u[f++]);
    return c;
  }
  getUri(t) {
    t = nn(this.defaults, t);
    const n = ya(t.baseURL, t.url);
    return ha(n, t.params, t.paramsSerializer);
  }
}
A.forEach(["delete", "get", "head", "options"], function(t) {
  en.prototype[t] = function(n, s) {
    return this.request(nn(s || {}, {
      method: t,
      url: n,
      data: (s || {}).data
    }));
  };
});
A.forEach(["post", "put", "patch"], function(t) {
  function n(s) {
    return function(o, i, l) {
      return this.request(nn(l || {}, {
        method: t,
        headers: s ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: i
      }));
    };
  }
  en.prototype[t] = n(), en.prototype[t + "Form"] = n(!0);
});
class oo {
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
      s.reason || (s.reason = new En(o, i, l), n(s.reason));
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
      token: new oo(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
}
function Ph(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function Dh(e) {
  return A.isObject(e) && e.isAxiosError === !0;
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
  NetworkAuthenticationRequired: 511
};
Object.entries(Dr).forEach(([e, t]) => {
  Dr[t] = e;
});
function Ra(e) {
  const t = new en(e), n = na(en.prototype.request, t);
  return A.extend(n, en.prototype, t, { allOwnKeys: !0 }), A.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(r) {
    return Ra(nn(e, r));
  }, n;
}
const xe = Ra(Zn);
xe.Axios = en;
xe.CanceledError = En;
xe.CancelToken = oo;
xe.isCancel = _a;
xe.VERSION = xa;
xe.toFormData = js;
xe.AxiosError = ee;
xe.Cancel = xe.CanceledError;
xe.all = function(t) {
  return Promise.all(t);
};
xe.spread = Ph;
xe.isAxiosError = Dh;
xe.mergeConfig = nn;
xe.AxiosHeaders = Xe;
xe.formToJSON = (e) => ga(A.isHTMLForm(e) ? new FormData(e) : e);
xe.getAdapter = Sa.getAdapter;
xe.HttpStatusCode = Dr;
xe.default = xe;
let Ca = "";
const Mh = () => Ca, Ih = (e) => {
  Ca = e;
}, Nh = (e) => async (t = {}, n = {}) => {
  const { url: s, method: r } = e;
  let o = s;
  Jl().currentPath.startsWith("/butter") && (o = s.replace("/image", "/butter"));
  const l = Mh();
  return xe.request({
    withCredentials: !1,
    url: l + o,
    method: r,
    [r === "get" ? "params" : "data"]: t
  }).then((a) => {
    const u = a.data;
    return n != null && n.stream ? a : u.errNo === 0 ? u.data : Promise.reject(u);
  }).catch((a) => Promise.reject(a));
}, Pe = {};
for (const e in si)
  Pe[e] = Nh(si[e]);
const bs = {
  COMMAND: "COMMAND",
  TEXT: "TEXT",
  IMAGE: "IMAGE",
  REPEAT: "REPEAT"
}, Fh = { class: "container" }, $h = { class: "container-header" }, Lh = { class: "container-title" }, Uh = ["width", "height"], jh = { class: "container-footer" }, Hh = "金馆长", Nt = 20, Vh = /* @__PURE__ */ Ie({
  __name: "FeatureContainer",
  props: {
    feature: {}
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = kt(n).feature, o = X(null), i = X(null), l = X(null), a = X(!1), u = X(!1), c = X(null), f = X("金馆长"), m = X(""), h = (y) => {
      f.value = y, R.value ? ae() : Pe.getImageBase64({
        ipath: L.value.ipath,
        value: y
      }).then((b) => {
        m.value = b, b ? z.src = b : ae();
      });
    };
    ot("text", f), ot("updateText", h);
    const v = X(0), w = X(0), R = ue(() => [bs.TEXT, bs.REPEAT].includes(r.value.type)), M = ue(() => {
      var y;
      return R.value ? _n((y = r.value.et) == null ? void 0 : y.font) : 0;
    }), C = ue(() => to(r.value.story.image)), E = ue(() => {
      const y = R.value ? k.value : L.value;
      return `${r.value.story.title}.${C.value} ${v.value} * ${w.value} (${y.x}, ${y.y})`;
    }), k = ue(() => r.value.et), L = ue(() => r.value.ei), se = ue(() => {
      if (R.value) {
        const y = k.value.max || v.value;
        return {
          start: 0,
          center: Math.floor(y / 2),
          end: y
        }[k.value.align];
      }
      return 0;
    }), G = ue(() => {
      const { font: y, color: b, direction: x, blur: T, degree: N, stroke: I, swidth: F } = r.value.story, { x: j, y: J, width: re } = L.value;
      return {
        x: j + re / 2,
        y: J + _n(y),
        max: re,
        font: y,
        color: b,
        align: "center",
        direction: x,
        blur: T,
        degree: N,
        stroke: I,
        swidth: F
      };
    }), K = (y) => {
      const { max: b, size: x, color: T, align: N, direction: I, blur: F, degree: j, stroke: J, swidth: re } = y;
      r.value.et.max = b, r.value.et.font = `${x}px sans-serif`, r.value.et.color = T, r.value.et.align = N, r.value.et.direction = I, r.value.et.blur = F, r.value.et.degree = j, r.value.et.stroke = J, r.value.et.swidth = re;
    }, z = new Image();
    z.onerror = (y) => {
      console.error(y);
    }, z.onload = () => {
      ae();
    };
    const H = new Image(), q = () => {
      H.onload = async () => {
        const y = o.value;
        y.width = H.naturalWidth, y.height = H.naturalHeight, v.value = y.width, w.value = y.height, te(), ae(), Ae();
      }, H.onerror = (y) => {
        console.error(y);
      }, H.src = r.value.story.image;
    }, te = () => {
      const y = i.value;
      y.style.width = `${v.value}px`, y.style.height = `${w.value}px`;
    }, ae = () => {
      const y = o.value, b = y.getContext("2d");
      if (b.drawImage(H, 0, 0), b.save(), Cr(b, y.width, Hh, r.value.story), R.value || !R.value && !m.value) {
        const x = R.value ? k.value : G.value;
        b.restore(), Cr(b, y.width, f.value, x);
      } else {
        const { x, y: T, width: N, height: I } = L.value;
        b.drawImage(z, x, T, N, I);
      }
    }, Ae = () => {
      let y = 0, b = 0, x = 0, T = 0;
      if (R.value) {
        const { x: I, y: F, max: j } = k.value;
        y = j, b = M.value * Kt, x = F - M.value + 2, T = I - se.value;
      } else {
        const { x: I, y: F, width: j, height: J } = L.value;
        y = j, b = J, x = F, T = I;
      }
      const N = l.value;
      N.style.width = `${y}px`, N.style.height = `${b}px`, N.style.top = `${x}px`, N.style.left = `${T}px`;
    };
    St(r, (y, b) => {
      y.mid !== b.mid ? q() : (ae(), Ae());
    }, { deep: !0 });
    let ve = 0, fe = 0, W = !1;
    const oe = (y) => {
      W = !0;
      const { clientX: b, clientY: x } = y;
      ve = b, fe = x;
    }, je = (y) => {
      if (!W)
        return;
      const { clientX: b, clientY: x } = y, T = l.value, { width: N, height: I } = T.getBoundingClientRect();
      let F = T.offsetLeft + b - ve, j = T.offsetTop + x - fe;
      F < -Nt || j < -Nt || F > v.value - N + Nt || j > w.value - I + Nt ? W = !1 : (ve = b, fe = x), F = Math.max(Math.min(F, v.value - N + Nt), -Nt), j = Math.max(Math.min(j, w.value - I + Nt), -Nt), We(F, j);
    }, We = (y, b) => {
      R.value ? (k.value.x = y + se.value, k.value.y = b + M.value - 2) : (L.value.x = y, L.value.y = b);
    }, Fe = () => {
      W && (W = !1);
    }, Se = () => {
      const y = o.value, b = `imeme_${r.value.story.title}_${f.value}`;
      ta(y, C.value, b);
    }, Ge = () => {
      const { mid: y, type: b, et: x, ei: T } = r.value;
      s("change", {
        mid: y,
        type: b,
        options: R.value ? x : T
      });
    }, qe = () => {
      a.value = !0;
    }, ft = (y, b) => {
      const x = o.value, T = c.value;
      eo(x, T, y, b);
    }, Oe = async (y) => {
      if (!a.value)
        return !1;
      const { offsetX: b, offsetY: x } = y;
      b < 0 || x < 0 || (u.value = !0, ft(b, x));
    }, D = () => {
      if (!a.value)
        return !1;
      u.value = !1;
    }, U = (y) => {
      const b = (F) => F.toString(16).padStart(2, "0"), { 0: x, 1: T, 2: N, 3: I } = y.data;
      return `#${b(x)}${b(T)}${b(N)}${b(I)}`.toUpperCase();
    }, $ = (y, b) => {
      const N = o.value.getContext("2d").getImageData(y, b, 1, 1);
      return U(N);
    }, V = (y) => {
      if (!a.value)
        return !1;
      const { offsetX: b, offsetY: x } = y;
      if (b < 0 || x < 0)
        return;
      const T = $(b, x);
      r.value.et.color = T, u.value = !1, a.value = !1;
    }, le = X(null);
    let de = 0, p = 0, d = !1;
    const _ = (y) => {
      d = !0;
      const { clientX: b, clientY: x } = y;
      de = b, p = x;
    }, O = (y) => {
      if (!d)
        return;
      const { clientX: b, clientY: x } = y, T = i.value, { x: N, y: I, width: F, height: j } = T.getBoundingClientRect();
      if (b < N || x < I || b > N + F || x > I + j) {
        d = !1;
        return;
      }
      const J = b - de, re = x - p, { width: ie, height: Ne } = L.value, we = l.value;
      we.style.width = `${ie + J}px`, we.style.height = `${Ne + re}px`;
    }, g = (y) => {
      if (!d)
        return;
      d = !1;
      const { clientX: b, clientY: x } = y, T = b - de, N = x - p, { width: I, height: F } = L.value;
      L.value.width = I + T, L.value.height = F + N;
    }, S = (y) => {
      const { width: b, height: x, ipath: T } = y;
      r.value.ei.width = b, r.value.ei.height = x, r.value.ei.ipath = T;
    };
    return bn(() => {
      q();
    }), (y, b) => (Q(), pe("div", Fh, [
      ne("div", $h, [
        ne("div", Lh, Ct(E.value), 1),
        B(P(xt), {
          label: "下载",
          u: "primary",
          onClick: Se
        })
      ]),
      ne("div", {
        class: "container-wraper",
        onMousemove: O,
        onMouseup: g
      }, [
        ne("canvas", {
          ref_key: "canvasRef",
          ref: o,
          class: At({
            "container-canvas": !0,
            "container-pointer": a.value
          }),
          onMousemove: Oe,
          onMouseleave: D,
          onClick: V
        }, null, 34),
        dn(ne("div", {
          class: "container-area",
          ref_key: "areaRef",
          ref: i,
          onMousemove: je,
          onMouseup: Fe
        }, [
          ne("div", {
            class: "container-drag",
            ref_key: "dragRef",
            ref: l,
            onMousedown: oe
          }, [
            R.value ? Fn("", !0) : (Q(), pe("div", {
              key: 0,
              ref_key: "cornerRef",
              ref: le,
              class: "container-drag-corner",
              onMousedown: Qu(_, ["stop", "prevent"])
            }, null, 544))
          ], 544)
        ], 544), [
          [hn, !a.value]
        ]),
        dn(ne("canvas", {
          ref_key: "layerRef",
          ref: c,
          class: "container-layer",
          style: vn({
            borderRadius: `${P(Rt)}px`
          }),
          width: P(Rt),
          height: P(Rt)
        }, null, 12, Uh), [
          [hn, a.value && u.value]
        ])
      ], 32),
      R.value ? (Q(), et(Ql, {
        key: 0,
        max: k.value.max,
        color: k.value.color,
        size: M.value,
        align: k.value.align,
        direction: k.value.direction,
        blur: k.value.blur,
        degree: k.value.degree,
        stroke: k.value.stroke,
        swidth: k.value.swidth,
        onChange: K,
        onPick: qe
      }, null, 8, ["max", "color", "size", "align", "direction", "blur", "degree", "stroke", "swidth"])) : (Q(), et(sp, {
        key: 1,
        width: L.value.width,
        height: L.value.height,
        ipath: L.value.ipath,
        onChange: S
      }, null, 8, ["width", "height", "ipath"])),
      ne("footer", jh, [
        B(P(xt), {
          label: "更新",
          u: "primary",
          onClick: Ge
        })
      ])
    ]));
  }
}), Bh = { class: "gif-property" }, Kh = /* @__PURE__ */ Ie({
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
    const n = e, s = t, r = Te("text"), o = Te("updateText"), { max: i, size: l, color: a, stroke: u, swidth: c, align: f, direction: m, frame: h } = kt(n), v = (M, C) => {
      const E = {
        max: i.value,
        size: l.value,
        color: a.value,
        stroke: u.value,
        swidth: c.value,
        align: f.value,
        direction: m.value,
        frame: h.value
      };
      E[C] = ["color", "align", "direction", "stroke", "frame"].includes(C) ? M : parseInt(M), s("change", E);
    }, w = (M) => {
      const C = "#" + Math.floor(Math.random() * 16777215).toString(16);
      v(C, M);
    }, R = () => {
      s("pick");
    };
    return (M, C) => (Q(), pe("div", Bh, [
      B(P(Re), {
        class: "gif-property-max",
        value: P(i),
        "onUpdate:modelValue": C[0] || (C[0] = (E) => v(E, "max"))
      }, null, 8, ["value"]),
      B(P(Re), {
        class: "gif-property-size",
        value: P(l),
        "onUpdate:modelValue": C[1] || (C[1] = (E) => v(E, "size"))
      }, null, 8, ["value"]),
      B(P(Re), {
        class: "gif-property-color",
        value: P(a),
        "onUpdate:modelValue": C[2] || (C[2] = (E) => v(E, "color"))
      }, null, 8, ["value"]),
      B(_s, {
        color: P(a),
        onClick: C[3] || (C[3] = (E) => w("color"))
      }, null, 8, ["color"]),
      B(Zl, {
        color: P(a),
        onClick: R
      }, null, 8, ["color"]),
      B(P(Re), {
        class: "gif-property-color",
        value: P(u),
        "onUpdate:modelValue": C[4] || (C[4] = (E) => v(E, "stroke"))
      }, null, 8, ["value"]),
      B(_s, {
        color: P(u),
        onClick: C[5] || (C[5] = (E) => w("stroke"))
      }, null, 8, ["color"]),
      B(P(Re), {
        class: "gif-property-swidth",
        value: P(c),
        "onUpdate:modelValue": C[6] || (C[6] = (E) => v(E, "swidth"))
      }, null, 8, ["value"]),
      B(P(st), {
        label: "start",
        name: "align",
        value: "start",
        checked: P(f) === "start",
        onToggle: C[7] || (C[7] = (E) => v(E, "align"))
      }, null, 8, ["checked"]),
      B(P(st), {
        label: "center",
        name: "align",
        value: "center",
        checked: P(f) === "center",
        onToggle: C[8] || (C[8] = (E) => v(E, "align"))
      }, null, 8, ["checked"]),
      B(P(st), {
        class: "gif-property-end",
        label: "end",
        name: "align",
        value: "end",
        checked: P(f) === "end",
        onToggle: C[9] || (C[9] = (E) => v(E, "align"))
      }, null, 8, ["checked"]),
      B(P(Re), {
        class: "gif-property-text",
        value: P(r),
        "onUpdate:modelValue": P(o)
      }, null, 8, ["value", "onUpdate:modelValue"]),
      B(P(st), {
        label: "up",
        name: "direction",
        value: "up",
        checked: P(m) === "up",
        onToggle: C[10] || (C[10] = (E) => v(E, "direction"))
      }, null, 8, ["checked"]),
      B(P(st), {
        label: "center",
        name: "direction",
        value: "center",
        checked: P(m) === "center",
        onToggle: C[11] || (C[11] = (E) => v(E, "direction"))
      }, null, 8, ["checked"]),
      B(P(st), {
        label: "down",
        name: "direction",
        value: "down",
        checked: P(m) === "down",
        onToggle: C[12] || (C[12] = (E) => v(E, "direction"))
      }, null, 8, ["checked"])
    ]));
  }
}), zh = { class: "gif-container" }, Wh = { class: "gif-container-header" }, Gh = { class: "gif-container-title" }, qh = {
  key: 0,
  class: "gif-container-wall"
}, Xh = { class: "gif-container-wraper" }, Jh = ["width", "height"], Yh = { class: "gif-container-footer" }, Ft = 20, Zh = /* @__PURE__ */ Ie({
  __name: "GIFContainer",
  props: {
    gif: {}
  },
  emits: ["change", "create", "replace", "update"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = kt(n).gif, o = X(null), i = X(null), l = X(null), a = X(!0), u = X(!0);
    let c = null;
    const f = X(!1), m = X(!1), h = X(null), v = X("金馆长"), w = (d) => {
      v.value = d, q();
    };
    ot("text", v), ot("updateText", w);
    const R = X(0), M = X(0), C = (d, _) => {
      r.value.x = d, r.value.y = _;
    }, E = (d) => {
      const { max: _, size: O, color: g, align: S, direction: y, stroke: b, swidth: x, frame: T } = d;
      r.value.max = _, r.value.font = `${O}px sans-serif`, r.value.color = g, r.value.stroke = b, r.value.swidth = x, r.value.align = S, r.value.direction = y, r.value.frame = T;
    }, k = ue(() => _n(r.value.font)), L = ue(() => to(r.value.image)), se = ue(() => `${r.value.title}.${L.value} ${R.value} * ${M.value} (${r.value.x}, ${r.value.y})`), G = ue(() => {
      const d = r.value.max || R.value;
      return {
        start: 0,
        center: Math.floor(d / 2),
        end: d
      }[r.value.align];
    }), K = new Image(), z = () => {
      K.onload = async () => {
        const d = o.value;
        d.width = K.naturalWidth, d.height = K.naturalHeight, R.value = d.width, M.value = d.height, H(), q(), te();
      }, K.onerror = (d) => {
        console.error(d);
      }, K.src = r.value.image;
    }, H = () => {
      const d = i.value;
      d.style.width = `${R.value}px`, d.style.height = `${M.value}px`;
    }, q = () => {
      const d = o.value, _ = d.getContext("2d");
      _.drawImage(K, 0, 0), zd(_, d.width, v.value, r.value);
    }, te = () => {
      const { x: d, y: _, max: O } = r.value, g = l.value;
      g.style.width = `${O}px`, g.style.height = `${k.value * Kt}px`, g.style.top = `${_ - k.value + 2}px`, g.style.left = `${d - G.value}px`;
    };
    St(r, (d, _) => {
      d.mid !== _.mid ? z() : (q(), te());
    }, { deep: !0 });
    let ae = 0, Ae = 0, ve = !1;
    const fe = (d) => {
      ve = !0;
      const { clientX: _, clientY: O } = d;
      ae = _, Ae = O;
    }, W = (d) => {
      if (!ve)
        return;
      const { clientX: _, clientY: O } = d, g = l.value, { width: S, height: y } = g.getBoundingClientRect();
      let b = g.offsetLeft + _ - ae, x = g.offsetTop + O - Ae;
      b < -Ft || x < -Ft || b > R.value - S + Ft || x > M.value - y + Ft ? ve = !1 : (ae = _, Ae = O), b = Math.max(Math.min(b, R.value - S + Ft), -Ft), x = Math.max(Math.min(x, M.value - y + Ft), -Ft), b += G.value, x += k.value - 2, C(b, x);
    }, oe = () => {
      ve && (ve = !1);
    }, je = () => {
      a.value ? a.value = !1 : (a.value = !0, u.value = !0, c ? (Ge(c), c = null) : z());
    }, We = () => {
      c && (Ge(c), c = null);
    }, Fe = () => {
      a.value ? s("change", r.value) : u.value || (s("create", r.value, We), a.value = !0, u.value = !0);
    }, Se = ({ name: d, base64: _ }) => {
      u.value = !1;
      const { mid: O, title: g, image: S, x: y, y: b, max: x, font: T, color: N, stroke: I, swidth: F, align: j, direction: J, frame: re } = r.value;
      c = {
        mid: O,
        title: g,
        image: S,
        x: y,
        y: b,
        max: x,
        font: T,
        color: N,
        stroke: I,
        swidth: F,
        align: j,
        direction: J,
        frame: re
      };
      const ie = d.slice(0, d.lastIndexOf("."));
      Ge({
        mid: `meme_${(/* @__PURE__ */ new Date()).getTime()}`,
        title: ie,
        image: _,
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
    }, Ge = (d) => {
      s("replace", d);
    }, qe = () => {
      f.value = !0;
    }, ft = (d, _) => {
      const O = o.value, g = h.value;
      eo(O, g, d, _);
    }, Oe = async (d) => {
      if (!f.value)
        return !1;
      const { offsetX: _, offsetY: O } = d;
      _ < 0 || O < 0 || (m.value = !0, ft(_, O));
    }, D = () => {
      if (!f.value)
        return !1;
      m.value = !1;
    }, U = (d) => {
      const _ = (b) => b.toString(16).padStart(2, "0"), { 0: O, 1: g, 2: S, 3: y } = d.data;
      return `#${_(O)}${_(g)}${_(S)}${_(y)}`.toUpperCase();
    }, $ = (d, _) => {
      const S = o.value.getContext("2d").getImageData(d, _, 1, 1);
      return U(S);
    }, V = (d) => {
      if (!f.value)
        return !1;
      const { offsetX: _, offsetY: O } = d;
      if (_ < 0 || O < 0)
        return;
      const g = $(_, O);
      r.value.color = g, m.value = !1, f.value = !1;
    }, le = Xl(), de = ue(() => le.path.includes("/edit")), p = (d) => {
      d !== r.value.title && (r.value.title = d, s("update", r.value));
    };
    return bn(() => {
      z();
    }), (d, _) => (Q(), pe("div", zh, [
      ne("div", Wh, [
        ne("div", Gh, [
          de.value ? (Q(), et(P(Re), {
            key: 0,
            class: "gif-container-title-label",
            value: P(r).title,
            "onUpdate:modelValue": _[0] || (_[0] = (O) => p(O))
          }, null, 8, ["value"])) : (Q(), pe(Ce, { key: 1 }, [
            Ms(Ct(se.value), 1)
          ], 64))
        ]),
        B(P(xt), {
          label: a.value ? "添加" : "取消添加",
          u: "primary",
          onClick: je
        }, null, 8, ["label"])
      ]),
      !a.value && u.value ? (Q(), pe("div", qh, [
        B(P(Yl), { onChange: Se })
      ])) : (Q(), pe(Ce, { key: 1 }, [
        ne("div", Xh, [
          ne("canvas", {
            ref_key: "canvasRef",
            ref: o,
            class: At({
              "gif-container-canvas": !0,
              "gif-container-pointer": f.value
            }),
            onMousemove: Oe,
            onMouseleave: D,
            onClick: V
          }, null, 34),
          dn(ne("div", {
            class: "gif-container-area",
            ref_key: "areaRef",
            ref: i,
            onMousemove: W,
            onMouseup: oe
          }, [
            ne("div", {
              class: "gif-container-drag",
              ref_key: "dragRef",
              ref: l,
              onMousedown: fe
            }, null, 544)
          ], 544), [
            [hn, !f.value]
          ]),
          dn(ne("canvas", {
            ref_key: "layerRef",
            ref: h,
            class: "gif-container-layer",
            style: vn({
              borderRadius: `${P(Rt)}px`
            }),
            width: P(Rt),
            height: P(Rt)
          }, null, 12, Jh), [
            [hn, f.value && m.value]
          ])
        ]),
        B(Kh, {
          max: P(r).max,
          color: P(r).color,
          stroke: P(r).stroke,
          swidth: P(r).swidth,
          size: k.value,
          align: P(r).align,
          direction: P(r).direction,
          frame: P(r).frame,
          onChange: E,
          onPick: qe
        }, null, 8, ["max", "color", "stroke", "swidth", "size", "align", "direction", "frame"])
      ], 64)),
      ne("footer", Yh, [
        B(P(xt), {
          label: a.value ? "更新" : "确认",
          u: "primary",
          onClick: Fe
        }, null, 8, ["label"])
      ])
    ]));
  }
}), Qh = { class: "image-wrap" }, ss = /* @__PURE__ */ Ie({
  __name: "ImageWrap",
  setup(e) {
    const t = X([]), n = X(""), s = X("");
    let r = X({
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
    }), o = X({
      mid: "",
      feature: "",
      type: "",
      story: r
    }), i = X({
      mid: "",
      text: ""
    }), l = X({
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
      const H = await Pe.getCatalog({});
      t.value = H;
    }, u = ({ type: H, child: q }) => {
      n.value !== q.mid && (n.value = q.mid, s.value = H);
    };
    St([n, s], () => {
      c(n.value, s.value);
    });
    const c = (H, q) => {
      M.value ? Pe.openImage({
        mid: H,
        type: q
      }).then((te) => {
        r.value = te, te.senior === 2 && Pe.getAdditional({
          mid: H
        }).then((ae) => {
          i.value = ae;
        });
      }) : C.value ? Pe.openGif({
        mid: H,
        type: q
      }).then((te) => {
        l.value = te;
      }) : Pe.getFeatureImage({
        mid: H
      }).then((te) => {
        o.value = te;
      });
    }, f = (H) => {
      const q = { ...H, image: "" };
      Pe.saveImage(q);
    }, m = (H) => {
      r.value = H;
    }, h = async (H, q) => {
      const te = await Pe.createImage(H).catch((ae) => {
        alert(ae.message);
      });
      te ? (await a(), n.value = te.mid) : q();
    }, v = X([]), w = X();
    ot("commands", v), ot("paths", w);
    const R = async () => {
      const { commands: H, paths: q } = await Pe.getConfig({});
      v.value = H, w.value = q.map((te) => ({
        label: te,
        value: te
      }));
    }, M = ue(() => ["STORY", "SERIES", "SPECIAL"].includes(s.value)), C = ue(() => ["GIF"].includes(s.value)), E = ({ mid: H, type: q, options: te }) => {
      [bs.TEXT, bs.REPEAT].includes(q) ? Pe.saveImage(te) : Pe.saveFeatureImage({
        mid: H,
        type: q,
        ...te
      });
    }, k = (H) => {
      Pe.updateImage(H);
    }, L = (H) => {
      Pe.updateAdditional(H);
    }, se = (H) => {
      const q = { ...H, image: "" };
      Pe.saveGifImage(q);
    }, G = async (H, q) => {
      const te = await Pe.createGifImage(H).catch((ae) => {
        alert(ae.message);
      });
      te ? (await a(), n.value = te.mid) : q();
    }, K = (H) => {
      l.value = H;
    }, z = (H) => {
      Pe.updateGifImage(H);
    };
    return bn(() => {
      a(), R();
    }), (H, q) => (Q(), pe("div", Qh, [
      B(Cd, {
        current: n.value,
        "catalog-list": t.value,
        onChange: u
      }, null, 8, ["current", "catalog-list"]),
      M.value && P(r).image && P(r).mid ? (Q(), et(tp, {
        key: 0,
        story: P(r),
        additional: P(i),
        onChange: f,
        onReplace: m,
        onCreate: h,
        onUpdate: k,
        onAdditional: L
      }, null, 8, ["story", "additional"])) : Fn("", !0),
      s.value === "FEATURE" && P(o).mid ? (Q(), et(Vh, {
        key: 1,
        feature: P(o),
        onChange: E
      }, null, 8, ["feature"])) : Fn("", !0),
      C.value && P(l).image && P(l).mid ? (Q(), et(Zh, {
        key: 2,
        gif: P(l),
        onChange: se,
        onReplace: K,
        onCreate: G,
        onUpdate: z
      }, null, 8, ["gif"])) : Fn("", !0)
    ]));
  }
}), em = {}, tm = { class: "warn-center" };
function nm(e, t) {
  return Q(), pe("div", tm, " 功能已不再维护，感谢您过去的热爱。 ");
}
const sm = /* @__PURE__ */ Jr(em, [["render", nm]]), rm = { class: "material-center" }, om = /* @__PURE__ */ Ie({
  __name: "MaterialCenter",
  setup(e) {
    const t = () => {
      Pe.getMaterialCatalog({
        type: "DB".toLowerCase()
      }).then((n) => {
        console.log(n);
      });
    };
    return bn(() => {
      t();
    }), (n, s) => (Q(), pe("div", rm, " 什么都没有的荒原 "));
  }
}), im = [
  {
    path: "/",
    component: sm
  },
  {
    path: "/story",
    component: ss
  },
  {
    path: "/story/edit",
    component: ss
  },
  {
    path: "/center",
    component: om
  },
  {
    path: "/butter",
    component: ss
  },
  {
    path: "/butter/edit",
    component: ss
  }
], ka = wd({
  history: Jf(),
  routes: im
});
ka.beforeResolve(async (e) => {
  e.path && Jl().setPath(e.path);
});
const lm = (e, t) => {
  Ih(t || "http://localhost:8080");
  const n = rf(vf);
  return n.use(cf()), n.use(ka), n.mount(e);
}, am = {
  load: lm
};
export {
  am as default
};
