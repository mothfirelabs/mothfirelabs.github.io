var e=.3,t=.7,n=.6,r=Math.PI*2,i=(e,t,n)=>Math.max(t,Math.min(n,e)),a=(e,t)=>e+Math.random()*(t-e),o=(e,t)=>1-Math.exp(-e*t),s=(e,t,n)=>{let r=i((n-e)/(t-e),0,1);return r*r*(3-2*r)},c=e=>{let t=Math.sin(e*127.1)*43758.5453;return t-Math.floor(t)},l=e=>{let t=Math.floor(e),n=e-t;return c(t)+(c(t+1)-c(t))*n*n*(3-2*n)};function u(){return{flame:{x:0,y:0,height:1,room:1,lean:0,core:{x:0,y:0}},lamp:{x:0,y:0,intensity:0},moths:[],sparks:[],kindles:[],flare:0,surge:99,surgeFrom:0,nextMoth:2,nextSpark:0}}function d(e,t,n,r,i){Object.assign(e.flame,{x:t,y:n,height:r,room:i*.44}),f(e.flame)}function f(e){e.core.x=e.x+e.lean*.08*e.height,e.core.y=e.y-.34*e.height}function p(e,t,n,r,i){e=Math.abs(e);let a=(n-r)/i,o=Math.sqrt(1-a*a),s=-a*e+o*t;return s<0?Math.hypot(e,t)-n:s>o*i?Math.hypot(e,t-i)-r:o*e+a*t-n}function m(e,t){let n=(t.x-e.x)/e.height,r=(e.y-t.y)/e.height,a=i(r,0,1.2);return p(n-e.lean*.15*a*a,r-.15,.15,0,.8)}function h(e,t){let n=e.height,i=Math.random()<.5?-1:1,o=t??{x:e.x+i*a(.85,1.1)*n,y:e.y-a(.5,1)*n};return{x:o.x,y:o.y,vx:t?i*a(25,75):-i*120,vy:t?-a(200,260):a(-30,30),phase:a(0,r),bank:0,light:t?.8:0,depth:1,alpha:+!t,theta:o.x<e.x?Math.PI:0,dir:Math.random()<.5?-1:1,radius:a(.55,.68)*n,age:0,patience:t?a(16,26):a(32,44),diving:!1,lured:!1,startled:0,kindled:!!t,burning:-1,shed:0,nextDart:t?a(.9,1.3):a(.3,1),seed:a(0,100)}}function g(e,t){return i(t.height*.075,30,54)*(1+.18*e.depth)}var _=e=>e.kindled?s(.1,1.2,e.age):1;function v(e){if(e.burning>=0){let t=i((e.burning-.1)/n,0,1);return[Math.min(1,e.burning/.1)+t,1,1-t]}if(!e.kindled)return[0,1,1];let t=_(e);return[1-s(.25,1.3,e.age),s(.12,.42,e.age),.25+.75*t*t]}function y(e,t){for(let n of e.moths){let e=n.x-t.x,r=n.y-t.y,i=Math.max(1,Math.hypot(e,r));if(n.diving||n.burning>=0||i>240)continue;let o=a(260,360)*(1.2-i/240);n.vx+=e/i*o,n.vy+=r/i*o,n.startled=a(.3,.5),n.nextDart=a(.5,1)}e.kindles.length>=3&&e.kindles.shift(),e.kindles.push({x:t.x,y:t.y,age:0,life:a(.9,1.4),seed:a(1,100)});for(let n=Math.floor(a(4,7));n>0;n--){let n=-Math.PI/2+a(-1.3,1.3),r=a(110,280);x(e,{x:t.x,y:t.y,vx:Math.cos(n)*r,vy:Math.sin(n)*r,life:a(.4,.9),size:a(1.2,2),peak:a(.85,1),fall:650})}e.moths.length<3&&e.moths.push(h(e.flame,t))}function b(e){let t=e.age/e.life;return t>=1?0:(1+.6*Math.exp(-e.age/.07))*(1-(.15+.55*s(.45,1,t))*l(e.age*15+e.seed))*(1-s(.35,1,t))}function x(e,t){e.sparks.length>=28&&e.sparks.shift(),e.sparks.push({...t,age:0,seed:a(0,100)})}var S=(e,t)=>e.peak*Math.min(1,e.age/(e.fall?.02:.15))*(1-e.age/e.life)**1.5*(.75+.25*Math.sin(t*25+e.seed));function C(n,r,s,c,l){let{flame:u,lamp:d}=n;d.intensity+=(+!!c-d.intensity)*o(c?5:1.2,r);let p=i((d.x-u.x)/u.room,-1,1)*d.intensity;u.lean+=(p-u.lean)*o(1.5,r),f(u),n.flare*=Math.exp(-r/.7);let m=e+(.95-n.surgeFrom)/t;n.surge<m&&n.surge+r>=m&&D(n),n.surge+=r;for(let e=n.kindles.length-1;e>=0;e--){let t=n.kindles[e];t.age+=r,t.age>=t.life?n.kindles.splice(e,1):Math.random()<2.5*r*b(t)&&x(n,{x:t.x+a(-2,2),y:t.y-2,vx:a(-12,12),vy:-a(30,60),life:a(.7,1.3),size:a(1,1.5),peak:a(.45,.8)})}if(l){!n.moths.length&&s>n.nextMoth&&n.moths.push(h(u));for(let e=n.moths.length-1;e>=0;e--)w(n,n.moths[e],r,s)||(n.moths.splice(e,1),n.moths.length||(n.nextMoth=s+a(6,10)));if(s>n.nextSpark){n.nextSpark=s+a(.7,1.8);let e=u.height;x(n,{x:u.core.x+a(-.04,.04)*e,y:u.y-e*a(.62,.8),vx:a(-12,12),vy:-a(.06,.11)*e,life:a(1.8,3.2),size:a(1.4,2.2),peak:a(.45,.85)})}}O(n,r)}function w(e,t,n,c){let{flame:l,lamp:u}=e,d=l.height;if(t.age+=n,t.burning>=0)return T(e,t,n);let[f,p,h]=v(t);t.phase+=r*10*h*n,t.alpha=Math.min(1,t.alpha+n*(t.kindled?5:2.5));let g=s(.35,1,_(t)),y=Math.hypot(u.x-t.x,u.y-t.y);t.startled-=n,t.lured=!t.diving&&t.startled<=0&&u.intensity>.35&&y<(t.lured?420:260);let x,S;if(t.lured){t.theta+=t.dir*(4+1.5*Math.sin(c*1.7+t.seed))*n;let e=28+10*Math.sin(c*1.3+t.seed);x=u.x+e*Math.cos(t.theta),S=u.y+.5*e*Math.sin(t.theta),t.depth+=(Math.sin(t.theta)-t.depth)*o(6,n)}else if(t.diving)x=l.core.x,S=l.core.y,t.depth+=(1-t.depth)*o(4,n);else{let e=Math.min(1,t.age/t.patience),r=Math.min(t.radius,l.room)*(1-.85*e)*(1+.1*Math.sin(c*.9+t.seed));t.theta+=t.dir*i(170/Math.max(r,1),.4,3.4)*n,x=l.x+r*Math.cos(t.theta),S=l.y-.58*d+.04*d*Math.sin(c*.41+t.seed)+.22*r*Math.sin(t.theta),t.depth=Math.sin(t.theta),e>=1&&t.depth>.5&&(t.diving=!0)}if(g<1&&(t.depth=1+(t.depth-1)*g),t.nextDart-=n,t.nextDart<=0&&!t.diving){let e=a(0,r),n=a(120,240);t.vx+=Math.cos(e)*n,t.vy+=Math.sin(e)*n*.7,t.nextDart=a(.35,1.5)}let C=(t.diving?3.4:t.lured?6.5:5)*g;if(t.vx+=(C*C*(x-t.x)-2*C*t.vx)*n,t.vy+=(C*C*(S-t.y)-2*C*t.vy)*n,g<1){let r=Math.max(0,-Math.cos(t.phase));t.vy+=(1-g)*p*(900-3e3*r)*n;let i=Math.exp(-3.5*(1-g)*n);t.vx*=i,t.vy*=i,f>.3&&Math.random()<5*f*n&&E(e,t)}let w=Math.hypot(t.vx,t.vy);w>420&&(t.vx*=420/w,t.vy*=420/w),t.x+=t.vx*n,t.y+=t.vy*n,t.bank+=(i(t.vx/340,-.5,.5)-t.bank)*o(7,n);let D=Math.hypot(t.x-l.core.x,t.y-l.core.y),O=Math.max(Math.min(1,1.3*Math.exp(-D/(.4*d))),.85*u.intensity*Math.exp(-y/120));for(let n of e.kindles)O=Math.max(O,Math.min(1,b(n))*Math.exp(-Math.hypot(t.x-n.x,t.y-n.y)/70));return t.light+=(O-t.light)*o(5,n),t.diving&&m(l,t)<.02&&(t.burning=0,e.flare=1,e.surge=0,e.surgeFrom=i((l.y-t.y)/d,.1,.9)),!0}function T(e,t,a){let o=e.flame;t.burning+=a;let c=i((t.burning-.1)/n,0,1);t.phase+=r*10*(1-c)*a;let l=Math.exp(-2.5*a);if(t.vx=t.vx*l+(o.core.x-t.x)*8*a,t.vy=t.vy*l-.35*o.height*a,t.x+=t.vx*a,t.y+=t.vy*a,t.alpha=1-s(n,.75,t.burning),t.burning>.08&&c<.95)for(t.shed+=24*a;t.shed>=1;t.shed--)E(e,t);return t.burning<.75}function E(e,t){let n=g(t,e.flame),i=a(-.42,.42),o=a(-.16,.2),s=Math.cos(t.bank),c=Math.sin(t.bank),l=a(0,r),u=a(15,60);x(e,{x:t.x+n*(s*i+c*o),y:t.y+n*(c*i-s*o),vx:t.vx*.3+Math.cos(l)*u,vy:t.vy*.3+Math.sin(l)*u-30,life:a(1,2),size:a(1.1,1.9),peak:a(.5,.95)})}function D(e){let t=e.flame,n=t.height;for(let r=0;r<3;r++)x(e,{x:t.x+t.lean*.135*n+a(-.02,.02)*n,y:t.y-.95*n*(1+.16*e.flare),vx:a(-25,25),vy:-a(.12,.2)*n,life:a(1.4,2.4),size:a(1.2,1.9),peak:a(.6,.95)})}function O(e,t){let n=e.flame;for(let r=e.sparks.length-1;r>=0;r--){let i=e.sparks[r];if(i.age+=t,i.age>i.life){e.sparks.splice(r,1);continue}let a=(i.x-n.x)/n.height,o=(n.y-i.y)/n.height,s=o>0&&o<.95?Math.exp(-(a*a)/.06):0;i.vx+=(Math.sin(i.age*3+i.seed)*14+(n.core.x-i.x)*5*s)*t,i.vx*=1-.8*t,i.vy=i.vy*(1-.6*t)+((i.fall??0)-10-.12*n.height*s)*t,i.x+=i.vx*t,i.y+=i.vy*t}}var k=48,A=3,ee=`
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`,te=`
precision highp float;

uniform vec2 uRes;
uniform float uDpr;
uniform float uTime;
uniform float uDepth;
uniform vec3 uFlame;
uniform float uLean;
uniform float uFlare;
/** A pulse of light climbing the flame: seconds since it began, and from what height (flame heights). */
uniform vec2 uSurge;
/** The cursor's light: position (CSS px) and intensity. */
uniform vec3 uLight;
/** Moths: position (CSS px), wingspan (CSS px), opacity. */
uniform vec4 uMothA[3];
/** Moths: wing phase (rad), bank (rad), how lit (0..1), depth (1 in front of the flame, -1 behind). */
uniform vec4 uMothB[3];
/**
 * Moths: how far on fire (0 cold, 1 aflame or ember-hot, 2 burned away), how far its wings have opened (0..1),
 * how much of a wingbeat (rad) sweeps past while one frame is on screen, seed.
 */
uniform vec4 uMothC[3];
/** Lights struck by clicks: where (CSS px), and how bright (0 out, 1 steady, above 1 in the strike's flash). */
uniform vec3 uKindle[3];
uniform vec4 uSparks[28];

const int LEVELS = ${A};
const int MOTHS = 3;
const int KINDLES = 3;
const int SPARKS = 28;
const float SURGE_DELAY = ${e.toFixed(2)};
const float SURGE_SPEED = ${t.toFixed(2)};

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(11.7, 5.3);
    a *= 0.5;
  }
  return v;
}

// Uneven capsule (after Inigo Quilez): circle r1 at the origin tapering to r2 at (0, h).
float sdTear(vec2 p, float r1, float r2, float h) {
  p.x = abs(p.x);
  float b = (r1 - r2) / h;
  float a = sqrt(1.0 - b * b);
  float k = dot(p, vec2(-b, a));
  if (k < 0.0) return length(p) - r1;
  if (k > a * h) return length(p - vec2(0.0, h)) - r2;
  return dot(p, vec2(a, b)) - r1;
}

// Light intensity (0..1) of the flame at a CSS-px point.
float scene(vec2 p) {
  float t = uTime;
  // Flaring, the flame stretches up and burns brighter.
  vec2 q = vec2(p.x - uFlame.x, uFlame.y - p.y) / (uFlame.z * vec2(1.0 + 0.04 * uFlare, 1.0 + 0.16 * uFlare));
  float lift = clamp(q.y, 0.0, 1.2);

  float n = fbm(vec2(q.x * 2.2, q.y * 1.4 - t * 0.6));
  float m = fbm(vec2(q.x * 5.0 + 7.0, q.y * 3.2 - t * 1.4));

  // Sway grows with height; ragged tongues at the top; leans toward the cursor's light.
  vec2 w = q;
  w.x += (n - 0.5) * 0.5 * (1.0 + 0.5 * uFlare) * lift * lift + sin(t * 0.9 + q.y * 2.0) * 0.02 * lift;
  w.x -= uLean * 0.15 * lift * lift;
  float d = sdTear(w - vec2(0.0, 0.15), 0.15, 0.0, 0.8);
  d += (m - 0.5) * 0.16 * pow(lift, 1.5);

  float inside = 1.0 - smoothstep(-0.05, 0.012, d);
  float deep = clamp(-d / 0.1, 0.0, 1.0);
  vec2 cq = (q - vec2(0.0, 0.2)) * vec2(8.0, 3.0);
  float core = exp(-dot(cq, cq));
  float fadeUp = 1.0 - smoothstep(0.3, 1.0, q.y) * 0.5;

  float v = inside * ((0.36 + 0.3 * deep) * fadeUp + 0.55 * core);
  v += exp(-max(d, 0.0) * 10.0) * 0.3 * (1.0 - inside);

  // A moth's light: it brightens the flame where the moth burns, then climbs it to the top.
  float s = uSurge.x - SURGE_DELAY;
  if (s < 1.6) {
    float band = (q.y - uSurge.y - max(s, 0.0) * SURGE_SPEED) / 0.09;
    float pulse = exp(-band * band) * smoothstep(-SURGE_DELAY, 0.0, s) * (1.0 - smoothstep(0.6, 1.4, s));
    v += (inside + 0.5 * exp(-max(d, 0.0) * 8.0)) * 0.35 * pulse;
  }
  float halo = exp(-length((q - vec2(0.0, 0.32)) * vec2(1.0, 0.7)) * 2.6) * 0.16;
  return clamp(max(v, halo) * (1.0 + 0.25 * uFlare), 0.0, 1.0);
}

vec3 palette(float v) {
  vec3 c = mix(vec3(0.36, 0.11, 0.06), vec3(0.91, 0.26, 0.16), smoothstep(0.0, 0.3, v));
  c = mix(c, vec3(1.0, 0.56, 0.22), smoothstep(0.25, 0.55, v));
  c = mix(c, vec3(1.0, 0.86, 0.6), smoothstep(0.5, 0.85, v));
  return mix(c, vec3(1.0, 0.97, 0.9), smoothstep(0.86, 1.0, v));
}

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, s, -s, c);
}

// Approximate signed distance to an ellipse with radii r.
float sdEllipse(vec2 p, vec2 r) {
  return (length(p / r) - 1.0) * min(r.x, r.y);
}

float sdSegment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  return length(pa - ba * clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0));
}

// A moth's right wing at rest, in wingspans with y up: a raised forewing over a rounder hindwing.
float sdWing(vec2 q) {
  float fore = sdEllipse(rot(-0.42) * (q - vec2(0.21, 0.07)), vec2(0.27, 0.105));
  float hind = sdEllipse(rot(0.4) * (q - vec2(0.13, -0.09)), vec2(0.15, 0.095));
  return min(fore, hind);
}

float sdBody(vec2 q) {
  float thorax = sdEllipse(q - vec2(0.0, 0.05), vec2(0.045, 0.075));
  float abdomen = sdEllipse(q - vec2(0.0, -0.1), vec2(0.032, 0.12));
  float head = length(q - vec2(0.0, 0.145)) - 0.03;
  return min(min(thorax, abdomen), head);
}

// Wing elevation through a beat: a high upstroke and a shallower downstroke.
float elevation(float phase) {
  return 0.25 + 0.95 * sin(phase);
}

// One moth over col. Lit warm by the flame or the cursor's light against the
// dark; a silhouette against the fire; lost in the glare when it passes behind.
// Hot, it glows like an ember: new from a struck light, or catching fire.
vec3 drawMoth(vec3 col, vec2 p, vec4 A, vec4 B, vec4 C) {
  vec2 d = p - A.xy;
  if (A.w <= 0.0 || dot(d, d) > A.z * A.z * 0.38) return col;
  vec2 q = rot(B.y) * vec2(d.x, -d.y) / A.z;
  vec2 m = vec2(abs(q.x), q.y);
  float aa = 1.0 / A.z;

  // Wings beat faster than the eye can follow: average the frame's sweep.
  // A moth new from a light starts with its wings still folded.
  float wing = 0.0;
  for (int k = 0; k < 6; k++) {
    float e = mix(1.35, elevation(B.x - C.z * float(k) / 5.0), C.y);
    float sx = max(cos(e), 0.16);
    float x = m.x / sx;
    wing += 1.0 - smoothstep(-aa, aa, sdWing(vec2(x, m.y - x * sin(e) * 0.28)));
  }
  wing /= 6.0;
  float body = 1.0 - smoothstep(-aa, aa, sdBody(q));
  body = max(body, 1.0 - smoothstep(0.3 * aa, 1.1 * aa, sdSegment(m, vec2(0.012, 0.165), vec2(0.085, 0.29))));

  // Burning, it comes apart from the edges in, along a glowing edge.
  float heat = min(C.x, 1.0);
  float burn = C.x - heat;
  float rim = 0.0;
  if (burn > 0.0) {
    float e = 0.65 * noise(q * 7.0 + C.w) + 0.35 * noise(q * 19.0 - C.w) - mix(0.12, 0.92, burn);
    rim = (1.0 - smoothstep(0.0, 0.12, e)) * step(0.0, e) * max(wing, body);
    float keep = smoothstep(0.0, 0.03, e);
    wing *= keep;
    body *= keep;
  }

  float fire = scene(p);
  float backlit = smoothstep(0.12, 0.5, fire);
  vec3 lit = mix(vec3(0.05, 0.03, 0.022), vec3(0.9, 0.56, 0.3), B.z);
  vec3 ember = mix(vec3(1.0, 0.42, 0.12), vec3(1.0, 0.86, 0.58), heat);
  vec3 wingCol = mix(mix(lit * 0.9, vec3(0.42, 0.13, 0.04), backlit), ember, heat * 0.9);
  vec3 bodyCol = mix(mix(lit, vec3(0.03, 0.018, 0.012), backlit), ember, heat);
  float shown = A.w * (1.0 - clamp(-B.w * 1.6, 0.0, 1.0) * smoothstep(0.1, 0.4, fire));
  col = mix(col, wingCol, wing * 0.82 * shown);
  col = mix(col, bodyCol, body * shown);
  col += vec3(1.0, 0.62, 0.25) * rim * 1.6 * shown;
  return col + ember * heat * 0.3 * exp(-dot(d, d) / (A.z * A.z * 0.06)) * A.w;
}

void main() {
  vec2 css = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uDpr;

  // Walk down the quadtree. The split threshold is dithered per cell, so a
  // fractional depth refines a random subset of cells: a progressive render.
  float size = ${k.toFixed(1)};
  vec2 cell = floor(css / size);
  vec2 center = (cell + 0.5) * size;
  float level = 0.0;
  for (int i = 0; i < LEVELS; i++) {
    if (uDepth <= float(i) + hash(cell + float(i) * 17.0)) break;
    size *= 0.5;
    cell = floor(css / size);
    center = (cell + 0.5) * size;
    level += 1.0;
  }
  float fine = level / float(LEVELS);

  // Coarse cells are rough drafts: a little noisy and posterized.
  float v = scene(center);
  v += (hash(cell * 1.37 + level) - 0.5) * 0.14 * (1.0 - fine);
  float steps = mix(4.0, 28.0, fine);
  v = clamp(floor(v * steps + 0.5) / steps, 0.0, 1.0);

  float dist = length(css - center);
  float aa = 0.8 / uDpr;
  float r = 0.48 * size * sqrt(v);
  float dotA = (1.0 - smoothstep(r - aa, r + aa, dist)) * smoothstep(0.03, 0.08, v);

  // The cursor carries a faint light of its own. A struck light is an ember,
  // seen mostly by the dust of the field it catches around it.
  vec2 lp = css - uLight.xy;
  float glow = uLight.z * exp(-dot(lp, lp) / 18000.0);
  float struck = 0.0;
  for (int i = 0; i < KINDLES; i++) {
    vec2 kd = css - uKindle[i].xy;
    struck += max(uKindle[i].z, 0.0) * exp(-dot(kd, kd) / 4000.0);
  }
  float ambR = max(0.55, size * 0.07) * (1.0 + 0.6 * min(struck, 1.0));
  float amb = (1.0 - smoothstep(ambR - aa, ambR + aa, dist)) * 0.11;

  vec3 col = vec3(0.039, 0.031, 0.027);
  vec2 qb = (vec2(css.x - uFlame.x, uFlame.y - css.y) / uFlame.z - vec2(0.0, 0.3)) * vec2(1.6, 0.9);
  col += vec3(1.0, 0.42, 0.14) * ((0.06 + 0.07 * uFlare) * exp(-dot(qb, qb) * 2.6) + 0.035 * glow + 0.05 * struck);
  col += mix(vec3(0.96, 0.93, 0.89), vec3(1.0, 0.66, 0.36), min(struck, 1.0)) * amb * (1.0 + 1.5 * glow + 4.0 * struck);
  col = mix(col, palette(v) * (0.84 + 0.24 * fine), dotA);

  // The embers themselves: white in the strike's flash, reddening as they die.
  for (int i = 0; i < KINDLES; i++) {
    vec3 k = uKindle[i];
    if (k.z <= 0.0) continue;
    float kr = length(css - k.xy);
    float rc = 0.8 + 0.7 * min(k.z, 1.5);
    float ember = (1.0 - smoothstep(rc - aa, rc + aa, kr)) * min(k.z, 1.0) + 0.3 * k.z * exp(-kr * kr / 30.0);
    col += palette(min(0.3 + 0.55 * k.z, 1.0)) * ember;
  }

  for (int i = 0; i < MOTHS; i++) col = drawMoth(col, css, uMothA[i], uMothB[i], uMothC[i]);

  // Sparks: loose light, not bound to the grid.
  float sparkle = 0.0;
  for (int i = 0; i < SPARKS; i++) {
    vec4 s = uSparks[i];
    if (s.z <= 0.0) continue;
    vec2 sv = css - s.xy;
    float sd2 = dot(sv, sv);
    float w2 = s.w * s.w;
    if (sd2 > 64.0 * w2) continue;
    sparkle += s.z * ((1.0 - smoothstep(s.w * 0.45, s.w, sqrt(sd2))) + 0.25 * exp(-sd2 / (w2 * 12.0)));
  }
  col += vec3(1.0, 0.7, 0.36) * sparkle;

  gl_FragColor = vec4(col, 1.0);
}
`,ne=1.5,j=Math.PI*2,re=(e,t)=>e>=900?{x:e*.5,y:t*.93,height:Math.min(t*.72,e*.46)}:{x:e*.5,y:t*.74,height:Math.min(t*.5,e*.95)},ie=e=>1-(1-i(e,0,1))**3;function M(e,t,n){let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.error(e.getShaderInfoLog(r)),e.deleteShader(r),null)):null}function N(e,t={}){let n=t.layout??re,r=t.depth??2,a=t.moths??!1,o=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,s=e.parentElement??document.body,c=()=>s.classList.add(`field-fallback`),l=e.getContext(`webgl`,{antialias:!1,alpha:!1,powerPreference:`high-performance`});if(!l)return c();let f=M(l,l.VERTEX_SHADER,ee),p=M(l,l.FRAGMENT_SHADER,te),m=l.createProgram();if(!f||!p||!m)return c();if(l.attachShader(m,f),l.attachShader(m,p),l.linkProgram(m),!l.getProgramParameter(m,l.LINK_STATUS))return console.error(l.getProgramInfoLog(m)),c();l.useProgram(m);let _=l.createBuffer();l.bindBuffer(l.ARRAY_BUFFER,_),l.bufferData(l.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),l.STATIC_DRAW);let w=l.getAttribLocation(m,`aPos`);l.enableVertexAttribArray(w),l.vertexAttribPointer(w,2,l.FLOAT,!1,0,0);let T=e=>l.getUniformLocation(m,e),E={res:T(`uRes`),dpr:T(`uDpr`),time:T(`uTime`),depth:T(`uDepth`),flame:T(`uFlame`),lean:T(`uLean`),flare:T(`uFlare`),surge:T(`uSurge`),light:T(`uLight`),mothA:T(`uMothA`),mothB:T(`uMothB`),mothC:T(`uMothC`),kindle:T(`uKindle`),sparks:T(`uSparks`)},D=1,O=1,k=Math.min(window.devicePixelRatio||1,ne),A=n(1,1),N=-1e9,P=u(),{flame:F,lamp:I}=P,L=new Float32Array(12),R=new Float32Array(12),z=new Float32Array(12),B=new Float32Array(9),V=new Float32Array(112),H=performance.now(),U=!1,W=!0,G=0,K=H,q=0,J=0,Y=()=>{let t=s.getBoundingClientRect();D=Math.max(1,t.width),O=Math.max(1,t.height),e.width=Math.round(D*k),e.height=Math.round(O*k),l.viewport(0,0,e.width,e.height),A=n(D,O),d(P,A.x,A.y,A.height,D)},X=(t,n,i=!1)=>{let a=(t-H)/1e3,o=i?1:ie((a-.25)/1.9);L.fill(0),R.fill(0),z.fill(0),P.moths.forEach((e,t)=>{let r=3*Math.sin(a*j*2.3+e.seed),[i,o,s]=v(e);L.set([e.x+2*Math.sin(a*11+e.seed),e.y+r,g(e,F),e.alpha],t*4),R.set([e.phase,e.bank,e.light,e.depth],t*4),z.set([i,o,n*s,e.seed],t*4)}),B.fill(0),P.kindles.forEach((e,t)=>B.set([e.x,e.y,b(e)],t*3)),V.fill(0),P.sparks.forEach((e,t)=>V.set([e.x,e.y,S(e,a),e.size],t*4)),l.uniform2f(E.res,e.width,e.height),l.uniform1f(E.dpr,k),l.uniform1f(E.time,i?14.2:a),l.uniform1f(E.depth,r*o),l.uniform3f(E.flame,F.x,F.y,F.height),l.uniform1f(E.lean,F.lean),l.uniform1f(E.flare,P.flare),l.uniform2f(E.surge,Math.min(P.surge,99),P.surgeFrom),l.uniform3f(E.light,I.x,I.y,I.intensity),l.uniform4fv(E.mothA,L),l.uniform4fv(E.mothB,R),l.uniform4fv(E.mothC,z),l.uniform3fv(E.kindle,B),l.uniform4fv(E.sparks,V),l.drawArrays(l.TRIANGLES,0,3)},Z=e=>{G=requestAnimationFrame(Z),J++;let t=!(P.surge<2.5||P.kindles.length>0)&&e-N>2500&&e-H>4e3;if(t&&J%2)return;let n=e-K;K=e,J>30&&n>(t?48:28)?q++:q=Math.max(0,q-1),q>20&&k>.75&&(k=Math.max(.75,k-.5),q=0,Y());let r=Math.min(n,100)/1e3;C(P,r,(e-H)/1e3,e-N<2500,a),X(e,i(j*10*r,.6,2.4))},Q=()=>{U||o||(U=!0,K=performance.now(),G=requestAnimationFrame(Z))},$=()=>{U=!1,cancelAnimationFrame(G)},ae=t=>{let n=e.getBoundingClientRect();return{x:t.clientX-n.left,y:t.clientY-n.top}},oe=()=>{if(P.moths.length=0,P.sparks.length=0,a){let e=A.height,t=h(F,{x:A.x-.3*e,y:A.y-.78*e});Object.assign(t,{kindled:!1,alpha:1,phase:0,bank:.15,light:.6,depth:.4}),P.moths.push(t),x(P,{x:A.x+.02*e,y:A.y-.93*e,vx:0,vy:0,life:10,size:1.6,peak:.8}),x(P,{x:A.x-.05*e,y:A.y-1.02*e,vx:0,vy:0,life:10,size:1.3,peak:.5}),P.sparks.forEach(e=>e.age=1)}X(H,0,!0)};Y(),o?(oe(),new ResizeObserver(()=>{Y(),oe()}).observe(s),s.classList.add(`field-ready`)):(window.addEventListener(`pointermove`,e=>{if(e.pointerType===`touch`)return;let t=ae(e);I.x=t.x,I.y=t.y,N=performance.now()},{passive:!0}),document.documentElement.addEventListener(`pointerleave`,()=>{N=Math.min(N,performance.now()-2500)}),window.addEventListener(`pointerdown`,e=>{if(e.target?.closest(`a, button`))return;let t=ae(e);I.x=t.x,I.y=t.y,N=performance.now(),a&&y(P,t)},{passive:!0}),new ResizeObserver(()=>{k=Math.min(k,window.devicePixelRatio||1),Y(),U||X(performance.now(),0)}).observe(s),new IntersectionObserver(([e])=>{W=e?.isIntersecting??!0,W&&!document.hidden?Q():$()}).observe(e),document.addEventListener(`visibilitychange`,()=>{!document.hidden&&W?Q():$()}),e.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),$(),c()}),s.classList.add(`field-ready`),Q())}export{N as t};