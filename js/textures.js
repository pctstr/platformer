// ============================================================
//  TEXTURES — procedural pixel art via Canvas 2D
// ============================================================
const PAL = {
  sky1: 0x8ab88a, sky2: 0x6a9a6a,
  hill: 0x5a8a5a,
  plat: 0x4a7a4a, platT: 0x6aaa6a, platS: 0x3a5a3a,
  gnd: 0x3a5a3a, gndT: 0x5a8a5a,
  ply: 0x2a5a2a, plyH: 0x3a7a3a, plyE: 0xc8e8c8, plyP: 0x1a2a1a,
  coin: 0xc4d88c, coinG: 0xdce8b0, coinD: 0x94a86c,
  goal: 0x6aaa6a, goalI: 0x8ac88a, flagC: 0xc8e8c8,
  vine: 0x3a6a3a, vineL: 0x4a8a4a,
  tree: 0x4a3a2a, treeD: 0x3a2a1a, leaf: 0x4a8a4a, leafL: 0x5a9a5a,
  stone: 0x6a6a6a, stoneD: 0x5a5a5a, stoneL: 0x7a7a7a,
  torch: 0xd4a840, torchF: 0xe8c860, torchG: 0xa87820,
  btnBg: 0x2a5a2a, btnBd: 0x4a8a4a, txt: 0xd4e8d4,
};

function px(ctx, x, y, color) {
  if (color !== undefined) {
    ctx.fillStyle = '#' + color.toString(16).padStart(6,'0');
    ctx.fillRect(x, y, 1, 1);
  }
}

function makeTex(id, w, h, fn) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  fn(c.getContext('2d'), w, h);
  return { id, data: c };
}

export const textures2d = [
  makeTex('player', 12, 24, (ctx) => {
    const rows = [
      '...HHHH...', '..HHHHHH..', '.HHHHHHHH.', '.HPPPPPPH.',
      '.HPPPPPH..', '..HHHH....', '..HHHH....', '..HHHH....',
      '.HHHHHH...', '.H.HH.H...', '.H.HH.H...', '..H..H....',
      '..H..H....', '..HHHH....', '.HHHHHH...', '..H..H....',
      '..H..H....', '..H..H....', '..H..H....', '..H..H....',
      '..H..H....', '.HH..HH...', '.HH..HH...', '..H..H....',
    ];
    for (let y=0; y<24; y++) {
      for (let x=0; x<12; x++) {
        const ch = rows[y]?.[x];
        let col;
        if (ch==='H') col=PAL.plyH; else if (ch==='P') col=PAL.ply;
        else if (ch==='E') col=PAL.plyE; else continue;
        ctx.fillStyle = '#'+col.toString(16).padStart(6,'0');
        ctx.fillRect(x, y, 1, 1);
      }
    }
    px(ctx, 4, 8, PAL.plyE); px(ctx, 7, 8, PAL.plyE);
    px(ctx, 5, 8, PAL.plyP); px(ctx, 8, 8, PAL.plyP);
  }),

  makeTex('ground', 16, 16, (ctx) => {
    ctx.fillStyle='#'+PAL.gnd.toString(16).padStart(6,'0'); ctx.fillRect(0,0,16,16);
    ctx.fillStyle='#'+PAL.gndT.toString(16).padStart(6,'0'); ctx.fillRect(0,0,16,4);
    px(ctx,2,0,PAL.gndT); px(ctx,6,0,PAL.gndT); px(ctx,10,0,PAL.gndT); px(ctx,14,1,PAL.gndT);
  }),

  makeTex('platform', 16, 16, (ctx) => {
    ctx.fillStyle='#'+PAL.plat.toString(16).padStart(6,'0'); ctx.fillRect(0,0,16,16);
    ctx.fillStyle='#'+PAL.platT.toString(16).padStart(6,'0'); ctx.fillRect(0,0,16,4);
    ctx.fillStyle='#'+PAL.platS.toString(16).padStart(6,'0');
    ctx.fillRect(0,0,2,16); ctx.fillRect(14,0,2,16);
    px(ctx,5,8,PAL.platS); px(ctx,11,10,PAL.platS); px(ctx,8,13,PAL.platS);
  }),

  makeTex('coin', 8, 8, (ctx) => {
    ctx.fillStyle='#'+PAL.coin.toString(16).padStart(6,'0');
    ctx.fillRect(1,0,6,1); ctx.fillRect(0,1,8,6); ctx.fillRect(1,7,6,1);
    ctx.fillStyle='#'+PAL.coinG.toString(16).padStart(6,'0'); ctx.fillRect(2,2,4,4);
    ctx.fillStyle='#'+PAL.coinD.toString(16).padStart(6,'0'); ctx.fillRect(4,3,2,3);
  }),

  makeTex('goal', 16, 24, (ctx) => {
    ctx.fillStyle='#'+PAL.goal.toString(16).padStart(6,'0'); ctx.fillRect(6,0,4,24);
    ctx.fillStyle='#'+PAL.flagC.toString(16).padStart(6,'0'); ctx.fillRect(10,2,12,10);
    ctx.fillStyle='#'+PAL.goalI.toString(16).padStart(6,'0'); ctx.fillRect(10,2,12,3);
  }),

  makeTex('vine', 4, 16, (ctx) => {
    ctx.fillStyle='#'+PAL.vine.toString(16).padStart(6,'0'); ctx.fillRect(0,0,4,16);
    ctx.fillStyle='#'+PAL.vineL.toString(16).padStart(6,'0');
    ctx.fillRect(1,0,1,16); ctx.fillRect(3,2,1,12);
  }),

  makeTex('tree', 16, 32, (ctx) => {
    ctx.fillStyle='#'+PAL.tree.toString(16).padStart(6,'0'); ctx.fillRect(4,0,8,32);
    ctx.fillStyle='#'+PAL.treeD.toString(16).padStart(6,'0'); ctx.fillRect(4,0,2,32);
    ctx.fillStyle='#'+PAL.leaf.toString(16).padStart(6,'0');
    ctx.fillRect(0,0,4,4); ctx.fillRect(12,0,4,4);
    ctx.fillRect(0,4,16,4);
  }),

  makeTex('stone', 16, 16, (ctx) => {
    ctx.fillStyle='#'+PAL.stone.toString(16).padStart(6,'0'); ctx.fillRect(0,0,16,16);
    ctx.fillStyle='#'+PAL.stoneL.toString(16).padStart(6,'0'); ctx.fillRect(0,0,16,2);
    ctx.fillStyle='#'+PAL.stoneD.toString(16).padStart(6,'0');
    ctx.fillRect(0,0,2,16); ctx.fillRect(14,0,2,16);
    px(ctx,5,6,PAL.stoneD); px(ctx,11,9,PAL.stoneD); px(ctx,8,12,PAL.stoneD);
  }),

  makeTex('torch', 8, 16, (ctx) => {
    ctx.fillStyle='#'+PAL.torchG.toString(16).padStart(6,'0'); ctx.fillRect(3,8,2,8);
    ctx.fillStyle='#'+PAL.torch.toString(16).padStart(6,'0');
    ctx.fillRect(2,4,4,4); ctx.fillRect(3,2,2,2);
    ctx.fillStyle='#'+PAL.torchF.toString(16).padStart(6,'0');
    ctx.fillRect(3,0,2,2);
  }),
];

export function registerTextures(scene) {
  for (const t of textures2d) {
    scene.textures.addCanvas(t.id, t.data);
  }
}