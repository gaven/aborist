function l(p, f, i = "children") {
  if (!p || !f || typeof f != "string")
    return null;
  let t = [];
  for (t.push(p); t.length; ) {
    let u = t.pop();
    if (u && u.id === f)
      return u;
    u && u[i] && t.push(...u[i]);
  }
  return null;
}
function a(p, f, i, t = "children") {
  const u = {
    id: p.id,
    [t]: p[t] ? p[t].map((o) => ({ ...o })) : []
  };
  let r = [];
  for (r.push(u); r.length; ) {
    let o = r.pop();
    if (o && o.id === f)
      return Object.assign(o, i), u;
    o && o[t] && r.push(...o[t]);
  }
  return null;
}
function N(p, f, i = "children") {
  if (!p || !f)
    return null;
  const t = {
    id: p.id,
    [i]: p[i] ? p[i].map((r) => ({ ...r })) : []
  };
  let u = [];
  for (u.push(t); u.length; ) {
    let r = u.pop();
    if (r && r[i].some((o) => o.id === f))
      return r[i] = r[i].filter(
        (o) => o.id !== f
      ), t;
    r && r[i] && u.push(...r[i]);
  }
  return null;
}
function w(p, f, i, t, u = "children") {
  if (!p || !f || !i)
    throw new Error("Invalid input parameters");
  const r = {
    id: p.id,
    [u]: p[u] ? p[u].map((n) => ({ ...n })) : []
  };
  let o = [];
  for (o.push(r); o.length; ) {
    let n = o.pop();
    if (n && n.id === f)
      return n[u].splice(t, 0, i), r;
    n && n[u] && o.push(...n[u]);
  }
  throw new Error("Parent id not found in tree");
}
function d(p, f, i, t = "children") {
  if (!p || !f || !i)
    throw new Error("Invalid input parameters");
  const u = {
    id: p.id,
    [t]: p[t] ? p[t].map((s) => ({ ...s })) : []
  };
  let r = null, o = null, n = [];
  for (n.push(u); n.length; ) {
    let s = n.pop();
    s && s.id === f && (o && (o[t] = o[t].filter(
      (e) => e.id !== f
    )), r = s), s && s[t] && (o = s, n.push(...s[t]));
  }
  if (!r)
    throw new Error("Node id not found in tree");
  for (n = [], n.push(u); n.length; ) {
    let s = n.pop();
    if (s && s.id === i)
      return s[t].push(r), u;
    s && s[t] && n.push(...s[t]);
  }
  throw new Error("New parent id not found in tree");
}
export {
  w as addNode,
  N as deleteNode,
  l as getNodeById,
  d as moveNode,
  a as updateNode
};
