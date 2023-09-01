function u(r, t) {
  if (!r || !t || typeof t != "string")
    return null;
  let h = [];
  for (h.push(r); h.length; ) {
    let n = h.pop();
    if (n && n.id === t)
      return n;
    n && n.children && h.push(...n.children);
  }
  return null;
}
function o(r, t, h) {
  const n = {
    id: r.id,
    children: r.children ? r.children.map((e) => ({ ...e })) : []
  };
  let i = [];
  for (i.push(n); i.length; ) {
    let e = i.pop();
    if (e && e.id === t)
      return Object.assign(e, h), n;
    e && e.children && i.push(...e.children);
  }
  return null;
}
function p(r, t) {
  if (!r || !t)
    return null;
  const h = {
    id: r.id,
    children: r.children ? r.children.map((i) => ({ ...i })) : []
  };
  let n = [];
  for (n.push(h); n.length; ) {
    let i = n.pop();
    if (i && i.children.some((e) => e.id === t))
      return i.children = i.children.filter(
        (e) => e.id !== t
      ), h;
    i && i.children && n.push(...i.children);
  }
  return null;
}
function f(r, t, h, n) {
  if (!r || !t || !h)
    throw new Error("Invalid input parameters");
  const i = {
    id: r.id,
    children: r.children ? r.children.map((l) => ({ ...l })) : []
  };
  let e = [];
  for (e.push(i); e.length; ) {
    let l = e.pop();
    if (l && l.id === t)
      return l.children.splice(n, 0, h), i;
    l && l.children && e.push(...l.children);
  }
  throw new Error("Parent id not found in tree");
}
function s(r, t, h) {
  if (!r || !t || !h)
    throw new Error("Invalid input parameters");
  const n = {
    id: r.id,
    children: r.children ? r.children.map((d) => ({ ...d })) : []
  };
  let i = null, e = null, l = [];
  for (l.push(n); l.length; ) {
    let d = l.pop();
    d && d.id === t && (e && (e.children = e.children.filter(
      (c) => c.id !== t
    )), i = d), d && d.children && (e = d, l.push(...d.children));
  }
  if (!i)
    throw new Error("Node id not found in tree");
  for (l = [], l.push(n); l.length; ) {
    let d = l.pop();
    if (d && d.id === h)
      return d.children.push(i), n;
    d && d.children && l.push(...d.children);
  }
  throw new Error("New parent id not found in tree");
}
export {
  f as addNode,
  p as deleteNode,
  u as getNodeById,
  s as moveNode,
  o as updateNode
};
