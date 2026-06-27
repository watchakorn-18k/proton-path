---
name: threejs-gear-model
description: Guidelines for building Three.js 3D gear models and scene props in src/pages/gear.astro. Use when adding new gear items, redesigning existing models, or creating structural scene objects (racks, platforms, etc.).
license: MIT
---

# Three.js Gear Model — Proton Path

## When to Use This Skill

Apply whenever you add, replace, or redesign a 3D object in `src/pages/gear.astro`:
- New gear item added to `GEAR[]` + `CREATORS[]`
- Redesigning an existing `create*()` function
- Adding a non-interactive scene prop (rack, shelf, floor detail)

---

## Scene Configuration

```
Camera:      OrthographicCamera, frustumSize=10
Position:    (16, 13, 12) → lookAt(0, 0.4, 0)   ← isometric-ish view
Up axis:     Y  (y=0 is platform surface)
Fog:         FogExp2, density 0.018
Lighting:    HemisphereLight + DirectionalLight (sun) + fill DirectionalLight
Shadows:     PCFSoftShadowMap, castShadow + receiveShadow on every Mesh
```

**Visible world range (approximate, at y=0):**
- X: –7 to +7
- Z: –3 to +3
- Y for items: 0 (floor) to ~1.8 (top of tall pack)

---

## Primitive Helpers

Both helpers auto-enable shadows.

```js
// Box — width, height, depth, hex color, shininess (default 20)
const part = box(0.6, 1.0, 0.4, 0x1e3056, 20)

// Cylinder — topRadius, bottomRadius, height, hex color, segments (default 12), shininess
const tube = cyl(0.1, 0.1, 0.8, 0x404050, 16, 30)
```

`extra` (optional 3rd/last arg on both) passes straight to `THREE.MeshPhongMaterial`:
```js
box(0.3, 0.3, 0.1, 0xffffff, 5, { transparent: true, opacity: 0.4 })
```

---

## Model Anatomy — Gear Item

Every gear item is a `THREE.Group` returned by a `create*()` function.

```js
function createMyItem() {
  const g = new THREE.Group()

  // 1. Define palette at the top as named constants
  const MAIN  = 0x1e3056  // body colour
  const DARK  = 0x111e38  // shadow / recessed areas
  const ACCNT = 0x3677d4  // zipper, buckle, highlight

  // 2. Build parts with box() / cyl()
  const body = box(0.64, 1.05, 0.45, MAIN, 20)
  body.position.y = 0.585          // raise so bottom sits at y=0

  // 3. g.add() every part — never nest Groups inside Groups
  g.add(body, ...)
  return g
}
```

### Y-origin convention

**The group origin sits at y=0 (platform surface).** Parts are offset upward:
- `body.position.y = height / 2` puts the base on the floor
- A 1.0-tall box → `position.y = 0.5`

### Size reference

| Object | Approx size (W × H × D) |
|---|---|
| Backpack 55L | 0.64 × 1.30 × 0.45 |
| Backpack 70L | 0.66 × 1.44 × 0.48 |
| Tent (folded) | 0.45 × 1.10 × 0.45 |
| Water bottle | 0.18 × 0.90 × 0.18 |
| Headlamp | 0.28 × 0.26 × 0.18 |

Use these as anchors when sizing new items. The camera frustum is 10 units tall so a model taller than ~1.8 starts to feel large.

---

## Palette Guidelines

```js
// Declare all colours as named constants at function top
const BODY  = 0x______  // primary surface
const DARK  = 0x______  // panels, recesses (5–15% darker than BODY)
const LITE  = 0x______  // lid, highlights (5–15% lighter than BODY)
const ACCNT = 0x______  // zipper, buckle, logo detail (contrasting hue)
const STRAP = 0x181820  // straps, hardware — near-black for all items
```

Shininess scale:
- `5–10`  matte fabric / rubber
- `15–25` standard gear plastic / nylon
- `30–48` polished metal / chrome
- `60+`   shiny zipper tape, gloss surface

---

## Edge Wireframe

`addEdges()` is called on every gear item automatically via the CREATORS loop.  
For **scene props** (not in CREATORS), call it manually:

```js
const rack = createRack()
addEdges(rack, 0x404055)   // pass a custom edge colour
rack.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true } })
scene.add(rack)
```

Default edge colour `0x2a3f22` is forest-green — fine for gear items.  
Metal/steel props look better with a neutral grey edge (`0x404055`).

---

## Adding a New Gear Item (Checklist)

1. **GEAR[]** — add data object with `name`, `nameEn`, `tags`, `price`, `desc`, `tips`, optionally `link`
2. **create\*() function** — build the model following the anatomy above
3. **CREATORS[]** — append the function reference
4. **BASE_POS[]** — append a `THREE.Vector3` for grid placement

### Grid layout (current)

```
z = -1.2  (front row):  x = -5.0, -3.0, -1.0, 1.0, 3.0
z =  1.2  (back row):   x = -3.0, -1.0,  1.0, 3.0
```

Step between grid columns: 2.0 units. Next available slots: extend front row to x=5.0, or start a third row at z=2.6.

### Hanging items

If a model should hang from the rack, raise its BASE_POS Y:

```js
// rod is at y=2.1; handle (top of bag) at relative y_handle
// BASE_POS.y = 2.1 - y_handle
new THREE.Vector3(-3.0, 0.60, -1.2)   // Gregory — handle at y_rel=1.50
new THREE.Vector3(-5.0, 0.56, -1.2)   // Naturehike — handle at y_rel=1.54
```

---

## Scene Props (Non-interactive)

Props like the display rack are **not** added to `CREATORS[]`.  
Create and add them directly after the `itemGroups` block:

```js
const rack = createRack()
addEdges(rack, 0x404055)
rack.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true } })
scene.add(rack)
```

Props should use world-space coordinates directly (no external position.copy()).

---

## Rotation & Tilt

Parts can be individually rotated to imply shape:

```js
// Shoulder strap leaning outward
strap.rotation.z =  0.18   // tilt left strap left
strap.rotation.x = -0.15   // lean forward

// Hip belt flaring out
hipL.rotation.y = 0.45
hipR.rotation.y = -0.45    // mirror right side (negate Y rotation)
```

The root group itself should **not** be rotated — the isometric camera does the work.

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Part base at y=0 makes it sink into platform | Add `position.y = height / 2` |
| Parts too large — overflow visible area | Keep total model under ~1.8 H, ~0.8 W |
| Nesting Groups inside Groups | Keep flat: one Group, many Meshes |
| Not calling `addEdges` on a prop | Props need manual `addEdges(prop, edgeColor)` |
| Forgetting `castShadow`/`receiveShadow` on prop meshes | Use `prop.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true } })` |
| Using `THREE.Color` string instead of hex int | Always pass `0xRRGGBB` integers to `box()`/`cyl()` |
