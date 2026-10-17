#!/usr/bin/env python3
"""Orion Oil - diagram-style website images (dark + gold theme).
Generates SVGs (1600x900, no text) plus the 1200x630 OG image."""
import math, os, random

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public", "images")
GOLD = "#C6912F"

HEAD = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 __W__ __H__" width="__W__" height="__H__" role="img" aria-label="__LABEL__">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#141C27"/><stop offset="1" stop-color="#080B0F"/></linearGradient>
<radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#C6912F" stop-opacity=".30"/><stop offset="1" stop-color="#C6912F" stop-opacity="0"/></radialGradient>
<pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1.6" fill="#C6912F" fill-opacity=".15"/></pattern>
<linearGradient id="oilL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6DC8A"/><stop offset="1" stop-color="#DDA93A"/></linearGradient>
<linearGradient id="oilD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D58E2A"/><stop offset="1" stop-color="#8E4F12"/></linearGradient>
<linearGradient id="blk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#262B33"/><stop offset="1" stop-color="#05070A"/></linearGradient>
<linearGradient id="steel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#18202A"/><stop offset=".45" stop-color="#2B3644"/><stop offset="1" stop-color="#141B24"/></linearGradient>
<linearGradient id="goldG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E7BA5A"/><stop offset="1" stop-color="#B07A1F"/></linearGradient>
<linearGradient id="flame" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#D2691E"/><stop offset=".5" stop-color="#F0A030"/><stop offset="1" stop-color="#FFE08A"/></linearGradient>
<radialGradient id="hot" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFB347" stop-opacity=".55"/><stop offset="1" stop-color="#FFB347" stop-opacity="0"/></radialGradient>
</defs>
<style>
.l{fill:none;stroke:#C6912F;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.lt{fill:none;stroke:#C6912F;stroke-width:1.6;stroke-opacity:.45;stroke-linecap:round;stroke-linejoin:round}
.d{stroke-dasharray:12 11}
.p{fill:#151D27;stroke:#C6912F;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.pm{fill:#111820;stroke:#34414F;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.m{fill:none;stroke:#34414F;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.g{fill:#C6912F}
.gs{fill:#C6912F;fill-opacity:.14}
</style>
<rect width="__W__" height="__H__" fill="url(#bg)"/>
<rect width="__W__" height="__H__" fill="url(#dots)"/>
"""

import re

def wrap(body, label, glow=(800, 450, 760, 440), w=1600, h=900):
    gx, gy, rx, ry = glow
    s = HEAD.replace("__W__", str(w)).replace("__H__", str(h)).replace("__LABEL__", label)
    s += f'<ellipse cx="{gx}" cy="{gy}" rx="{rx}" ry="{ry}" fill="url(#glow)"/>\n'
    s += body
    if w == 1600:
        # thicker strokes so the line-art stays readable when shown at card size (~350px wide)
        s = re.sub(r'(stroke-width[=:]"?)(\d+(?:\.\d+)?)', lambda m: m.group(1) + f"{float(m.group(2)) * 1.5:.2f}", s)
    # corner brackets + bottom accent
    c = 36
    m = 34
    for (x, y, sx, sy) in [(m, m, 1, 1), (w - m, m, -1, 1), (m, h - m, 1, -1), (w - m, h - m, -1, -1)]:
        s += f'<path class="lt" d="M{x} {y+sy*c} L{x} {y} L{x+sx*c} {y}"/>\n'
    s += f'<rect y="{h-4}" width="{w}" height="4" fill="{GOLD}" fill-opacity=".75"/>\n</svg>\n'
    return s

# ---------- helpers ----------
def drop(cx, cy, s, fill="url(#oilL)", stroke=True):
    st = f' stroke="{GOLD}" stroke-width="{2.2/s:.2f}"' if stroke else ""
    return (f'<path transform="translate({cx} {cy}) scale({s})" fill="{fill}"{st} '
            f'd="M0 -2 C0.3 -1.2 1.2 -0.4 1.2 0.5 A1.2 1.2 0 0 1 -1.2 0.5 C-1.2 -0.4 -0.3 -1.2 0 -2 Z"/>\n')

def sparkle(cx, cy, r, op=.8):
    return (f'<path d="M{cx} {cy-r} Q{cx} {cy} {cx+r} {cy} Q{cx} {cy} {cx} {cy+r} Q{cx} {cy} {cx-r} {cy} Q{cx} {cy} {cx} {cy-r} Z" '
            f'fill="#FFE9A8" fill-opacity="{op}"/>\n')

def floor(y, x1, x2):
    return (f'<line class="m" x1="{x1}" y1="{y}" x2="{x2}" y2="{y}"/>'
            f'<line class="lt" x1="{x1+80}" y1="{y+14}" x2="{x2-80}" y2="{y+14}"/>\n')

def beaker(cx, by, w, h, level, grad, uid):
    x0 = cx - w / 2; y0 = by - h; r = 16; x1 = x0 + w
    ly = by - h * level
    out = f'M{x0} {y0} L{x0} {by-r} Q{x0} {by} {x0+r} {by} L{x1-r} {by} Q{x1} {by} {x1} {by-r} L{x1} {y0}'
    s = f'<clipPath id="{uid}"><path d="{out} Z"/></clipPath>\n'
    s += f'<path d="{out} Z" fill="#0E141B" fill-opacity=".7"/>\n'
    s += f'<g clip-path="url(#{uid})"><rect x="{x0}" y="{ly}" width="{w}" height="{by-ly+4}" fill="url(#{grad})"/>'
    s += f'<ellipse cx="{cx}" cy="{ly}" rx="{w/2}" ry="10" fill="#fff" fill-opacity=".22"/>'
    s += f'<rect x="{x0+22}" y="{ly+24}" width="9" height="{by-ly-70}" rx="4.5" fill="#fff" fill-opacity=".22"/></g>\n'
    s += f'<path class="l" d="{out}"/>\n'
    s += f'<path class="l" d="M{x0-18} {y0-9} L{x0} {y0} M{x1} {y0} L{x1+18} {y0-9}"/>\n'
    for i in range(1, 7):
        ty = by - 30 - i * (h - 60) / 7
        ln = 34 if i % 2 == 0 else 20
        s += f'<line x1="{x1-ln-2}" y1="{ty:.0f}" x2="{x1-2}" y2="{ty:.0f}" stroke="{GOLD}" stroke-width="2.4" stroke-opacity=".85"/>'
    return s + "\n"

def bottle(cx, by, w, h, level, grad, uid):
    x0 = cx - w / 2; x1 = cx + w / 2; nw = w * 0.46; nl = cx - nw / 2; nr = cx + nw / 2
    ny = by - h; sh = by - h * 0.74
    out = (f'M{nl} {ny} L{nl} {sh} Q{nl} {sh+26} {x0} {sh+46} L{x0} {by-16} Q{x0} {by} {x0+16} {by} '
           f'L{x1-16} {by} Q{x1} {by} {x1} {by-16} L{x1} {sh+46} Q{nr} {sh+26} {nr} {sh} L{nr} {ny}')
    ly = by - (by - sh) * level * 1.15
    s = f'<clipPath id="{uid}"><path d="{out} Z"/></clipPath>\n'
    s += f'<path d="{out} Z" fill="#0E141B" fill-opacity=".7"/>\n'
    s += f'<g clip-path="url(#{uid})"><rect x="{x0}" y="{ly}" width="{w}" height="{by-ly+4}" fill="url(#{grad})"/>'
    s += f'<rect x="{x0+16}" y="{ly+20}" width="8" height="{by-ly-56}" rx="4" fill="#fff" fill-opacity=".22"/></g>\n'
    s += f'<path class="l" d="{out}"/>\n'
    s += f'<rect x="{nl-7}" y="{ny-38}" width="{nw+14}" height="38" rx="7" fill="url(#goldG)" stroke="{GOLD}" stroke-width="3"/>'
    for i in range(1, 6):
        xx = nl - 7 + i * (nw + 14) / 6
        s += f'<line x1="{xx:.0f}" y1="{ny-32}" x2="{xx:.0f}" y2="{ny-6}" stroke="#7A5412" stroke-width="2"/>'
    return s + "\n"

def chain(x, y, n, dx=44, dy=26, branch=(), r=7, op=1.0, w=3):
    pts = [(x + i * dx, y + (dy if i % 2 else 0)) for i in range(n)]
    s = f'<path class="l" style="stroke-width:{w};opacity:{op}" d="M' + " L".join(f"{a:.0f} {b:.0f}" for a, b in pts) + '"/>'
    for bi in branch:
        a, b = pts[bi]
        by = b + 44 if bi % 2 else b - 44
        s += f'<line class="l" style="stroke-width:{w};opacity:{op}" x1="{a:.0f}" y1="{b:.0f}" x2="{a:.0f}" y2="{by:.0f}"/>'
        s += f'<circle cx="{a:.0f}" cy="{by:.0f}" r="{r-1}" fill="#0E131A" stroke="{GOLD}" stroke-width="{w}" stroke-opacity="{op}"/>'
    for a, b in pts:
        s += f'<circle cx="{a:.0f}" cy="{b:.0f}" r="{r}" fill="#0E131A" stroke="{GOLD}" stroke-width="{w}" stroke-opacity="{op}"/>'
    return s + "\n"

def gauge_bar(x1, x2, y, pos):
    s = f'<line class="l" x1="{x1}" y1="{y}" x2="{x2}" y2="{y}"/>'
    for i in range(0, 11):
        xx = x1 + (x2 - x1) * i / 10
        h = 18 if i % 5 == 0 else 10
        s += f'<line class="l" style="stroke-width:2.2" x1="{xx:.0f}" y1="{y}" x2="{xx:.0f}" y2="{y-h}"/>'
    mx = x1 + (x2 - x1) * pos
    s += f'<path class="g" d="M{mx:.0f} {y+8} L{mx-13:.0f} {y+32} L{mx+13:.0f} {y+32} Z"/>'
    return s + "\n"

def pipe(d, w=18):
    return (f'<path d="{d}" fill="none" stroke="{GOLD}" stroke-width="{w+6}" stroke-linecap="butt" stroke-linejoin="round"/>'
            f'<path d="{d}" fill="none" stroke="#18212C" stroke-width="{w}" stroke-linecap="butt" stroke-linejoin="round"/>\n')

def bar(x1, y1, x2, y2, w=30):
    return (f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{GOLD}" stroke-width="{w+6}" stroke-linecap="round"/>'
            f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#18212C" stroke-width="{w}" stroke-linecap="round"/>\n')

def chev(x, y, s=1, rot=0):
    return (f'<path transform="translate({x} {y}) rotate({rot}) scale({s})" class="l" style="stroke-width:{3/s:.1f}" d="M-8 -12 L8 0 L-8 12"/>\n')

def flame(cx, by, s, grad="flame"):
    d = "M0 0 C-42 0 -52 -52 -22 -92 C-24 -62 -4 -58 0 -126 C8 -84 40 -62 36 -30 C34 -10 18 0 0 0 Z"
    inner = "M0 0 C-20 0 -24 -26 -10 -46 C-8 -28 2 -26 2 -60 C8 -40 20 -30 18 -14 C16 -4 8 0 0 0 Z"
    return (f'<g transform="translate({cx} {by}) scale({s})"><path d="{d}" fill="url(#{grad})" stroke="#FFD27A" stroke-width="2.2"/>'
            f'<path d="{inner}" fill="#FFF1B8" fill-opacity=".9"/></g>\n')

def steam(x, y, n=3, h=120, gap=34, op=.5):
    s = ""
    for i in range(n):
        xx = x + i * gap
        s += (f'<path d="M{xx} {y} c14 -{h*.25:.0f} -14 -{h*.45:.0f} 0 -{h*.7:.0f} s14 -{h*.2:.0f} 0 -{h*.3:.0f}" fill="none" '
              f'stroke="#E9D9B0" stroke-opacity="{op}" stroke-width="3" stroke-linecap="round" class="d" style="stroke-dasharray:none"/>')
    return s + "\n"

def gear_path(cx, cy, n, ro, rr, rot):
    pts = []
    st = 2 * math.pi / n
    for i in range(n):
        a = rot + i * st
        for da, r in [(-0.30, rr), (-0.14, ro), (0.14, ro), (0.30, rr)]:
            aa = a + da * st
            pts.append((cx + r * math.cos(aa), cy + r * math.sin(aa)))
    return "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in pts) + " Z"

def gear(cx, cy, n, ro, rr, rot, holes=5, film=True):
    d = gear_path(cx, cy, n, ro, rr, rot)
    s = ""
    if film:
        s += f'<path d="{d}" fill="none" stroke="#F0B84A" stroke-opacity=".28" stroke-width="12" stroke-linejoin="round"/>'
    s += f'<path d="{d}" class="p"/>'
    hub = rr * 0.30; ring = rr * 0.62
    s += f'<circle cx="{cx}" cy="{cy}" r="{rr*0.86:.0f}" class="lt"/>'
    for i in range(holes):
        a = rot + i * 2 * math.pi / holes + math.pi / holes
        s += f'<circle cx="{cx+ring*math.cos(a):.0f}" cy="{cy+ring*math.sin(a):.0f}" r="{rr*0.17:.0f}" fill="#0B1016" stroke="{GOLD}" stroke-width="2.4"/>'
    s += f'<circle cx="{cx}" cy="{cy}" r="{hub:.0f}" fill="#0B1016" stroke="{GOLD}" stroke-width="3"/>'
    s += f'<circle cx="{cx}" cy="{cy}" r="{hub*0.42:.0f}" class="g"/>'
    return s + "\n"

def arc_arrow(cx, cy, r, a0, a1, w=3):
    x0, y0 = cx + r * math.cos(math.radians(a0)), cy + r * math.sin(math.radians(a0))
    x1, y1 = cx + r * math.cos(math.radians(a1)), cy + r * math.sin(math.radians(a1))
    large = 1 if abs(a1 - a0) > 180 else 0
    s = f'<path class="l d" style="stroke-width:{w}" d="M{x0:.0f} {y0:.0f} A{r} {r} 0 {large} 1 {x1:.0f} {y1:.0f}"/>'
    t = math.radians(a1 + 90)
    hx, hy = x1, y1
    s += (f'<path class="l" style="stroke-width:{w}" d="M{hx+14*math.cos(t+2.5):.0f} {hy+14*math.sin(t+2.5):.0f} '
          f'L{hx:.0f} {hy:.0f} L{hx+14*math.cos(t-2.5+math.pi*0):.0f} {hy+14*math.sin(t-2.5):.0f}"/>')
    return s + "\n"

def drum(cx, by, w, h, fill="url(#steel)", bands=3, stroke="class=\"p\""):
    x0 = cx - w / 2
    s = f'<rect x="{x0}" y="{by-h}" width="{w}" height="{h}" rx="10" fill="{fill}" stroke="{GOLD}" stroke-width="3"/>'
    s += f'<ellipse cx="{cx}" cy="{by-h}" rx="{w/2}" ry="{w*0.11:.0f}" fill="#202A36" stroke="{GOLD}" stroke-width="3"/>'
    for i in range(1, bands + 1):
        yy = by - h + i * h / (bands + 1)
        s += f'<path d="M{x0} {yy:.0f} Q{cx} {yy+w*0.1:.0f} {x0+w} {yy:.0f}" class="l" style="stroke-width:2.4;opacity:.75"/>'
    return s + "\n"

# =====================================================================
# PRODUCTS
# =====================================================================
def p_sn150():
    b = floor(780, 120, 1480)
    b += '<ellipse cx="500" cy="778" rx="300" ry="14" fill="#F6DC8A" fill-opacity=".10"/>'
    b += beaker(430, 770, 300, 400, .72, "oilL", "cB")
    b += bottle(720, 770, 170, 300, .78, "oilL", "cT")
    b += drop(430, 218, 20) + '<line class="lt d" x1="430" y1="244" x2="430" y2="320"/>\n'
    for (x, y, r) in [(330, 560, 14), (520, 520, 10), (760, 600, 9), (480, 640, 8)]:
        b += sparkle(x, y, r)
    # right panel: light, short chains + low viscosity gauge
    b += '<rect x="930" y="170" width="560" height="560" rx="22" class="pm"/>'
    for i, yy in enumerate([260, 360, 460, 560]):
        b += chain(990 + (i % 2) * 40, yy, 7 if i % 2 == 0 else 6, dx=62, dy=30)
    b += gauge_bar(990, 1430, 665, .22)
    return wrap(b, "Light, clear base oil - short molecular chains, low viscosity", glow=(560, 470, 640, 420))

def p_sn300():
    b = floor(780, 120, 1480)
    b += '<ellipse cx="440" cy="778" rx="320" ry="14" fill="#D58E2A" fill-opacity=".14"/>'
    b += beaker(420, 770, 330, 420, .80, "oilD", "cB")
    b += bottle(760, 770, 170, 300, .85, "oilD", "cT")
    # stirring rod lifted above the oil, with a slow viscous string falling back in
    b += f'<line x1="250" y1="100" x2="420" y2="318" stroke="{GOLD}" stroke-width="12" stroke-linecap="round"/>'
    b += f'<line x1="250" y1="100" x2="420" y2="318" stroke="#18212C" stroke-width="6" stroke-linecap="round"/>'
    b += f'<path d="M421 322 C426 360 414 385 420 428" fill="none" stroke="url(#oilD)" stroke-width="9" stroke-linecap="round"/>'
    b += '<ellipse cx="420" cy="438" rx="34" ry="7" fill="none" stroke="#F0B84A" stroke-opacity=".7" stroke-width="3"/>'
    b += '<ellipse cx="420" cy="438" rx="58" ry="11" fill="none" stroke="#F0B84A" stroke-opacity=".35" stroke-width="3"/>'
    b += '<rect x="960" y="170" width="530" height="560" rx="22" class="pm"/>'
    b += chain(1000, 255, 10, dx=45, dy=26, branch=(2, 5, 8))
    b += chain(1020, 385, 9, dx=48, dy=26, branch=(3, 6))
    b += chain(1000, 515, 10, dx=45, dy=26, branch=(1, 4, 7))
    b += gauge_bar(1000, 1450, 665, .78)
    return wrap(b, "Deep amber heavy base oil - long branched chains, high viscosity", glow=(520, 470, 640, 420))

def p_ldo():
    b = floor(790, 100, 1500)
    # tank
    b += '<path d="M120 330 L120 700 A210 42 0 0 0 540 700 L540 330 Z" class="p" style="fill:url(#steel)"/>'
    b += '<ellipse cx="330" cy="330" rx="210" ry="42" fill="#243040" stroke="#C6912F" stroke-width="3"/>'
    for yy in (430, 540, 640):
        b += f'<path d="M120 {yy} Q330 {yy+42} 540 {yy}" class="l" style="stroke-width:2.2;opacity:.6"/>'
    # level gauge
    b += '<rect x="468" y="380" width="26" height="260" rx="13" fill="#0B1016" stroke="#C6912F" stroke-width="3"/>'
    b += '<rect x="472" y="480" width="18" height="156" rx="9" fill="url(#oilL)"/>'
    # ladder
    b += '<path class="l" d="M168 360 L168 690 M208 360 L208 690"/>'
    for yy in range(385, 690, 40):
        b += f'<line class="l" style="stroke-width:2.4" x1="168" y1="{yy}" x2="208" y2="{yy}"/>'
    # pipe + pump + valve
    b += pipe("M540 660 L1030 660")
    b += f'<circle cx="720" cy="660" r="54" fill="#151D27" stroke="{GOLD}" stroke-width="4"/>'
    b += f'<path class="l" d="M720 622 L720 698 M682 660 L758 660 M693 633 L747 687 M747 633 L693 687" style="stroke-width:2.4"/>'
    b += f'<circle cx="720" cy="660" r="10" class="g"/>'
    b += f'<path d="M860 632 L860 688 L912 632 L912 688 Z" class="p"/><line class="l" x1="886" y1="660" x2="886" y2="590"/><line class="l" x1="860" y1="590" x2="912" y2="590"/>'
    for x in (610, 800, 960):
        b += chev(x, 660, .8)
    # boiler
    b += '<rect x="1030" y="470" width="450" height="250" rx="40" class="p" style="fill:url(#steel)"/>'
    b += '<ellipse cx="1180" cy="595" rx="120" ry="90" fill="url(#hot)"/>'
    b += flame(1170, 690, 1.05)
    b += '<rect x="1300" y="360" width="76" height="112" class="p"/>'
    b += steam(1318, 340, 3, 150, 22)
    b += f'<circle cx="1420" cy="545" r="32" fill="#0B1016" stroke="{GOLD}" stroke-width="3"/><path class="l" style="stroke-width:3" d="M1420 545 L1438 528"/>'
    return wrap(b, "Bulk storage tank feeding industrial LDO to a boiler", glow=(1000, 520, 760, 400))

def p_bitumen():
    b = ""
    # heated tank (top left)
    b += '<rect x="150" y="130" width="470" height="250" rx="34" class="p" style="fill:url(#steel)"/>'
    b += '<path class="l" style="stroke-width:3" d="M200 330 L560 330"/>'
    b += '<path d="M190 300 q22 -34 44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0" class="l" style="stroke:#F0A030"/>'
    b += '<path d="M190 255 q22 -34 44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0" class="l" style="stroke:#F0A030;opacity:.6"/>'
    b += '<rect x="540" y="372" width="56" height="64" class="p"/>'
    for lx in (210, 470):
        b += f'<path class="p" d="M{lx-24} 650 L{lx-10} 380 L{lx+10} 380 L{lx+24} 650 Z" style="fill:#18212C"/>'
    # stream
    b += '<path d="M550 436 C550 520 600 540 610 650 L650 650 C640 540 596 520 596 436 Z" fill="url(#blk)" stroke="#C6912F" stroke-width="3" stroke-linejoin="round"/>'
    b += '<path d="M566 450 C566 520 612 545 622 640" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="3" stroke-linecap="round"/>'
    b += steam(520, 470, 3, 140, 30, .45)
    # road section
    b += '<rect x="120" y="650" width="1360" height="64" fill="url(#blk)" stroke="#C6912F" stroke-width="3"/>'
    for i in range(46):
        x = 140 + i * 29.5
        b += f'<circle cx="{x:.0f}" cy="{672 + (i*7)%28}" r="2.2" fill="#C6912F" fill-opacity=".5"/>'
    b += '<rect x="120" y="714" width="1360" height="46" class="pm" style="fill:#18212C"/>'
    b += '<rect x="120" y="760" width="1360" height="30" class="pm" style="fill:#0F151C"/>'
    b += '<line x1="140" y1="668" x2="1460" y2="668" stroke="#E7BA5A" stroke-width="3" stroke-dasharray="50 40" stroke-opacity=".8"/>'
    # barrel + thermometer
    b += drum(1130, 590, 230, 360, fill="url(#blk)", bands=3)
    b += '<path d="M1060 330 q18 -26 36 0 t36 0 t36 0" class="l" style="stroke:#F0A030"/>'
    b += '<path d="M1060 296 q18 -26 36 0 t36 0 t36 0" class="l" style="stroke:#F0A030;opacity:.55"/>'
    b += f'<rect x="1318" y="270" width="30" height="270" rx="15" fill="#0B1016" stroke="{GOLD}" stroke-width="3"/>'
    b += '<rect x="1324" y="400" width="18" height="140" rx="9" fill="url(#flame)"/>'
    b += f'<circle cx="1333" cy="564" r="30" fill="url(#flame)" stroke="{GOLD}" stroke-width="3"/>'
    for i in range(6):
        b += f'<line class="l" style="stroke-width:2.2" x1="1360" y1="{300+i*40}" x2="1{378 if i%2==0 else 370}" y2="{300+i*40}"/>'
    return wrap(b, "Hot bitumen binder poured into a road surface layer", glow=(760, 520, 780, 420))

# =====================================================================
# INDUSTRIES
# =====================================================================
def i_lubricant():
    b = floor(800, 100, 1500)
    for cx in (230, 480):
        b += f'<path d="M{cx-110} 250 L{cx-110} 600 A110 24 0 0 0 {cx+110} 600 L{cx+110} 250 Z" class="p" style="fill:url(#steel)"/>'
        b += f'<ellipse cx="{cx}" cy="250" rx="110" ry="24" fill="#243040" stroke="{GOLD}" stroke-width="3"/>'
        b += f'<line class="l" x1="{cx}" y1="150" x2="{cx}" y2="226"/>'
        b += f'<rect x="{cx-26}" y="124" width="52" height="40" rx="8" class="p"/>'
        b += f'<path class="l" style="stroke-width:2.4;opacity:.8" d="M{cx-60} 420 Q{cx} 444 {cx+60} 420"/>'
        b += f'<rect x="{cx-8}" y="300" width="16" height="200" rx="8" fill="url(#oilL)" fill-opacity=".85"/>'
        for lx in (cx - 70, cx + 70):
            b += f'<line class="l" x1="{lx}" y1="624" x2="{lx}" y2="680"/>'
    b += pipe("M230 640 L230 700 L480 700", 14)
    b += pipe("M480 650 L480 700 L760 700 L760 560", 14)
    b += chev(620, 700, .7)
    # overhead transfer line from the second tank to the filling head + QC dial and seal
    b += pipe("M590 330 L760 330 L760 470", 12)
    b += chev(690, 330, .7)
    b += f'<circle cx="1160" cy="300" r="78" fill="#0B1016" stroke="{GOLD}" stroke-width="4"/>'
    for i in range(9):
        a = math.radians(-210 + i * 30)
        b += f'<line x1="{1160+58*math.cos(a):.0f}" y1="{300+58*math.sin(a):.0f}" x2="{1160+70*math.cos(a):.0f}" y2="{300+70*math.sin(a):.0f}" stroke="{GOLD}" stroke-width="2.4"/>'
    b += f'<path d="M1160 300 L1204 268" stroke="#FFD27A" stroke-width="5" stroke-linecap="round"/><circle cx="1160" cy="300" r="9" class="g"/>'
    b += f'<circle cx="1350" cy="300" r="72" fill="#151D27" stroke="{GOLD}" stroke-width="4"/>'
    b += f'<path d="M1318 302 L1342 328 L1388 276" fill="none" stroke="{GOLD}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>'
    # filling nozzle
    b += '<rect x="720" y="470" width="80" height="90" rx="10" class="p"/><path class="p" d="M742 560 L778 560 L768 600 L752 600 Z"/>'
    b += drop(760, 632, 9)
    # conveyor
    b += '<rect x="660" y="740" width="800" height="40" rx="20" class="p"/>'
    for x in range(700, 1440, 70):
        b += f'<circle cx="{x}" cy="760" r="9" fill="#0B1016" stroke="{GOLD}" stroke-width="2.4"/>'
    for i, x in enumerate((760, 930, 1100, 1270, 1420)):
        b += f'<g transform="translate({x} 740)">'
        b += f'<path class="p" d="M-38 0 L-38 -84 Q-38 -104 -22 -112 L-22 -134 L22 -134 L22 -112 Q38 -104 38 -84 L38 0 Z"/>'
        b += f'<rect x="-24" y="-152" width="48" height="22" rx="5" fill="url(#goldG)" stroke="{GOLD}" stroke-width="2.4"/>'
        fill = "url(#oilL)" if i < 4 else "none"
        if fill != "none":
            b += f'<rect x="-34" y="-72" width="68" height="68" rx="6" fill="{fill}" fill-opacity=".9"/>'
        b += '</g>'
    return wrap(b, "Lubricant blending tanks feeding an automated bottling line", glow=(800, 460, 780, 400))

def i_hydraulic():
    b = floor(790, 100, 1500)
    # reservoir
    b += '<rect x="120" y="340" width="230" height="300" rx="16" class="p" style="fill:url(#steel)"/>'
    b += '<rect x="132" y="470" width="206" height="158" rx="10" fill="url(#oilL)" fill-opacity=".85"/>'
    b += '<line x1="132" y1="470" x2="338" y2="470" stroke="#fff" stroke-opacity=".3" stroke-width="3"/>'
    # pump
    b += f'<circle cx="470" cy="700" r="70" fill="#151D27" stroke="{GOLD}" stroke-width="4"/>'
    b += f'<circle cx="470" cy="700" r="28" class="g"/><path class="l" style="stroke-width:2.4" d="M470 640 L470 760 M410 700 L530 700"/>'
    b += pipe("M350 580 C420 580 440 640 440 640", 14)
    # cylinder
    b += '<rect x="560" y="400" width="520" height="190" rx="22" class="p" style="fill:url(#steel)"/>'
    b += '<rect x="574" y="414" width="196" height="162" rx="12" fill="url(#oilL)" fill-opacity=".78"/>'
    b += f'<rect x="770" y="404" width="40" height="182" rx="8" fill="url(#goldG)" stroke="{GOLD}" stroke-width="3"/>'
    b += f'<rect x="810" y="478" width="560" height="38" rx="8" fill="url(#steel)" stroke="{GOLD}" stroke-width="3"/>'
    b += f'<rect x="1370" y="330" width="46" height="334" rx="10" class="p"/>'
    for x in (640, 715):
        b += chev(x, 495, 1.4)
    b += chev(1300, 497, 1.2)
    # pressure line (pump -> cylinder), return line (cylinder -> reservoir)
    b += pipe("M470 630 L470 340 Q470 300 510 300 L610 300 Q640 300 640 330 L640 400", 12)
    b += pipe("M1020 400 L1020 170 Q1020 150 1000 150 L320 150 Q300 150 300 170 L300 340", 12)
    # gauge teed into the cylinder
    b += pipe("M820 332 L820 400", 8)
    b += f'<circle cx="820" cy="270" r="62" fill="#0B1016" stroke="{GOLD}" stroke-width="4"/>'
    for i in range(9):
        a = math.radians(-210 + i * 30)
        b += f'<line x1="{820+46*math.cos(a):.0f}" y1="{270+46*math.sin(a):.0f}" x2="{820+56*math.cos(a):.0f}" y2="{270+56*math.sin(a):.0f}" stroke="{GOLD}" stroke-width="2.4"/>'
    b += f'<path d="M820 270 L856 234" stroke="#FFD27A" stroke-width="4" stroke-linecap="round"/><circle cx="820" cy="270" r="8" class="g"/>'
    return wrap(b, "Hydraulic cylinder, pump and reservoir circuit", glow=(840, 480, 780, 380))

def i_gear():
    n1, n2 = 20, 12
    rp1, rp2 = 220, 132
    add, ded = 22, 30
    c1 = (560, 480)
    th = math.radians(-24)
    dist = rp1 + rp2 + 8
    c2 = (c1[0] + dist * math.cos(th), c1[1] + dist * math.sin(th))
    b = '<rect x="140" y="110" width="1320" height="700" rx="26" class="m" style="stroke-dasharray:14 12;opacity:.55"/>'
    b += '<path d="M141 735 L1459 735 L1459 790 Q1459 810 1439 810 L161 810 Q141 810 141 790 Z" fill="url(#oilD)" fill-opacity=".55"/>'
    b += '<line x1="141" y1="735" x2="1459" y2="735" stroke="#F0B84A" stroke-opacity=".7" stroke-width="3"/>'
    b += gear(c1[0], c1[1], n1, rp1 + add, rp1 - ded, th, holes=5)
    b += gear(c2[0], c2[1], n2, rp2 + add, rp2 - ded, th + math.pi - math.pi / n2, holes=4)
    b += arc_arrow(c1[0], c1[1], 275, 150, 215)
    b += arc_arrow(c2[0], c2[1], 188, -60, 10)
    for (x, y, s) in [(755, 360, 9), (700, 215, 8), (835, 460, 7)]:
        b += drop(x, y, s)
    # level gauge (right)
    b += '<rect x="1230" y="260" width="54" height="440" rx="27" fill="#0B1016" stroke="#C6912F" stroke-width="3"/>'
    b += '<rect x="1236" y="500" width="42" height="194" rx="21" fill="url(#oilD)"/>'
    for i in range(7):
        b += f'<line x1="1296" y1="{300+i*60}" x2="{1330 if i%2==0 else 1318}" y2="{300+i*60}" stroke="{GOLD}" stroke-width="2.6"/>'
    b += chev(1257, 440, .9, -90)
    return wrap(b, "Meshing industrial gears protected by a film of lubricating oil", glow=(700, 440, 700, 420))

def i_boiler():
    b = floor(800, 100, 1500)
    b += '<rect x="330" y="360" width="900" height="320" rx="60" class="p" style="fill:url(#steel)"/>'
    b += '<line class="lt" x1="640" y1="372" x2="640" y2="668"/>'
    # fire tubes
    for i in range(5):
        yy = 410 + i * 56
        b += f'<rect x="670" y="{yy}" width="520" height="30" rx="15" fill="#0E141B" stroke="{GOLD}" stroke-width="2.4"/>'
        b += f'<rect x="676" y="{yy+4}" width="508" height="22" rx="11" fill="url(#hot)"/>'
    b += '<ellipse cx="480" cy="560" rx="170" ry="130" fill="url(#hot)"/>'
    b += flame(480, 650, 1.55)
    # burner + fuel line
    b += '<rect x="200" y="520" width="130" height="80" rx="14" class="p"/><path class="p" d="M330 536 L376 548 L376 572 L330 584 Z"/>'
    b += pipe("M120 560 L200 560", 12)
    b += chev(150, 560, .7)
    b += pipe("M120 560 L120 740", 12)
    # chimney + smoke
    b += '<rect x="1090" y="230" width="86" height="132" class="p"/>'
    b += '<line class="l" style="stroke-width:2.4" x1="1080" y1="230" x2="1186" y2="230"/>'
    b += steam(1110, 212, 3, 150, 28, .45)
    # gauge on top
    b += f'<circle cx="830" cy="268" r="62" fill="#0B1016" stroke="{GOLD}" stroke-width="4"/>'
    for i in range(9):
        a = math.radians(-210 + i * 30)
        b += f'<line x1="{830+46*math.cos(a):.0f}" y1="{268+46*math.sin(a):.0f}" x2="{830+56*math.cos(a):.0f}" y2="{268+56*math.sin(a):.0f}" stroke="{GOLD}" stroke-width="2.4"/>'
    b += f'<path d="M830 268 L868 244" stroke="#FFD27A" stroke-width="4" stroke-linecap="round"/><circle cx="830" cy="268" r="8" class="g"/>'
    b += '<line class="l" x1="830" y1="330" x2="830" y2="360"/>'
    # heat waves
    for x in (400, 470, 540):
        b += f'<path d="M{x} 330 q14 -26 0 -52 t0 -52" fill="none" stroke="#FFB347" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>'
    # supports
    for x in (420, 1140):
        b += f'<path class="p" d="M{x-50} 800 L{x-30} 680 L{x+30} 680 L{x+50} 800 Z"/>'
    return wrap(b, "Industrial boiler with a flame-fired furnace and fire tubes", glow=(640, 520, 780, 400))

def i_road():
    b = ""
    b += '<circle cx="1250" cy="640" r="190" fill="url(#hot)"/>'
    b += '<path class="lt" d="M120 620 Q330 520 560 600 T980 590 T1480 610"/>'
    # road
    b += '<rect x="100" y="700" width="1400" height="46" fill="url(#blk)" stroke="#C6912F" stroke-width="3"/>'
    b += '<rect x="100" y="746" width="1400" height="46" class="pm" style="fill:#18212C"/>'
    b += '<rect x="100" y="792" width="1400" height="30" class="pm" style="fill:#0F151C"/>'
    b += '<line x1="120" y1="718" x2="1480" y2="718" stroke="#E7BA5A" stroke-width="3" stroke-dasharray="44 36" stroke-opacity=".8"/>'
    # paver
    b += '<path class="p" d="M170 560 L170 690 L560 690 L560 580 L470 580 L440 520 L300 520 L280 560 Z" style="fill:url(#steel)"/>'
    b += '<path class="p" d="M110 470 L250 470 L290 560 L170 560 Z"/>'  # hopper
    b += '<rect x="320" y="440" width="120" height="82" rx="8" class="p"/><path class="l" d="M300 440 L460 440"/>'
    b += '<path class="p" d="M560 600 L640 600 L640 694 L560 694 Z"/>'  # screed
    for x in (230, 310, 390, 470):
        b += f'<circle cx="{x}" cy="690" r="24" fill="#0B1016" stroke="{GOLD}" stroke-width="3"/>'
    b += steam(580, 600, 3, 130, 26, .45)
    # roller
    b += '<rect x="860" y="520" width="250" height="110" rx="12" class="p" style="fill:url(#steel)"/>'
    b += '<rect x="940" y="440" width="110" height="80" rx="8" class="p"/><line class="l" x1="930" y1="440" x2="1060" y2="440"/>'
    b += f'<circle cx="900" cy="640" r="74" fill="#151D27" stroke="{GOLD}" stroke-width="4"/><circle cx="900" cy="640" r="24" class="g"/>'
    b += f'<circle cx="1090" cy="652" r="56" fill="#151D27" stroke="{GOLD}" stroke-width="4"/><circle cx="1090" cy="652" r="18" class="g"/>'
    # cones
    for x in (1300, 1380):
        b += f'<path d="M{x-24} 700 L{x} 636 L{x+24} 700 Z" fill="#C6912F" fill-opacity=".85"/><line x1="{x-17}" y1="680" x2="{x+17}" y2="680" stroke="#0B1016" stroke-width="5"/>'
    return wrap(b, "Asphalt paver and road roller laying a new road surface", glow=(700, 560, 800, 340))

def i_waterproof():
    b = ""
    # rain
    random.seed(4)
    for i in range(26):
        x = 200 + i * 52 + random.randint(-14, 14)
        y = 120 + random.randint(0, 150)
        b += f'<line x1="{x}" y1="{y}" x2="{x-26}" y2="{y+66}" stroke="#9FB4C8" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>'
    for x in range(330, 1440, 190):
        b += f'<path d="M{x-24} 520 q12 -26 24 0 M{x} 520 q12 -26 24 0" class="l" style="stroke:#9FB4C8;stroke-opacity:.55;stroke-width:2.4"/>'
    # shield chevrons
    b += '<path class="l" style="stroke-opacity:.9" d="M380 456 Q800 370 1220 456"/>'
    # layers
    b += '<rect x="420" y="660" width="1060" height="150" class="pm" style="fill:#1B2430"/>'
    for i in range(30):
        b += f'<circle cx="{450+i*34}" cy="{690+(i*37)%90}" r="{3 if i%3 else 5}" fill="#34414F"/>'
    b += '<rect x="420" y="640" width="1060" height="20" fill="#C6912F" fill-opacity=".28" stroke="#C6912F" stroke-width="2.4"/>'
    b += '<rect x="420" y="586" width="1060" height="54" fill="url(#blk)" stroke="#C6912F" stroke-width="3"/>'
    b += '<line x1="440" y1="602" x2="1460" y2="602" stroke="#fff" stroke-opacity=".22" stroke-width="3"/>'
    for i in range(34):
        b += f'<circle cx="{444+i*31}" cy="{540+(i*13)%34}" r="{15 if i%2 else 12}" fill="#232C38" stroke="#C6912F" stroke-opacity=".7" stroke-width="2"/>'
    b += '<rect x="420" y="520" width="1060" height="10" fill="none"/>'
    # roll + torch
    b += f'<circle cx="270" cy="598" r="82" fill="url(#blk)" stroke="{GOLD}" stroke-width="4"/>'
    for r in (62, 44, 26):
        b += f'<circle cx="270" cy="598" r="{r}" fill="none" stroke="{GOLD}" stroke-opacity=".6" stroke-width="2.4"/>'
    b += f'<circle cx="270" cy="598" r="9" class="g"/>'
    b += f'<path d="M270 680 L420 640 L420 586 L330 600" fill="url(#blk)" stroke="{GOLD}" stroke-width="3" stroke-linejoin="round"/>'
    b += '<rect x="130" y="730" width="260" height="30" rx="10" class="p"/>'
    b += flame(215, 728, .5)
    return wrap(b, "Bitumen waterproofing membrane layers protecting a flat roof from rain", glow=(800, 560, 780, 360))

def i_forge():
    random.seed(11)
    b = '<ellipse cx="800" cy="560" rx="420" ry="260" fill="url(#hot)"/>'
    # anvil
    b += f'<path d="M480 560 L1130 560 L1130 596 L1010 596 Q980 640 960 700 L1060 700 L1060 760 L540 760 L540 700 L640 700 Q620 640 590 596 L480 596 Q420 596 380 548 L480 548 Z" class="p" style="fill:url(#steel)"/>'
    b += f'<rect x="470" y="548" width="660" height="16" fill="#C6912F" fill-opacity=".35"/>'
    # billet
    b += '<rect x="640" y="508" width="300" height="44" rx="8" fill="url(#flame)" stroke="#FFD27A" stroke-width="3"/>'
    b += '<rect x="660" y="518" width="260" height="10" rx="5" fill="#FFF1B8" fill-opacity=".8"/>'
    # tongs
    b += bar(940, 520, 1180, 440, 16) + bar(940, 540, 1180, 500, 16)
    # hammer
    b += '<rect x="660" y="300" width="260" height="140" rx="14" fill="url(#steel)" stroke="#C6912F" stroke-width="4"/>'
    b += '<rect x="700" y="440" width="180" height="48" rx="8" class="p"/>'
    b += bar(790, 300, 790, 120, 36)
    b += '<rect x="720" y="326" width="140" height="10" rx="5" fill="#fff" fill-opacity=".18"/>'
    # sparks
    for i in range(46):
        a = random.uniform(math.pi * 1.0, math.pi * 2.0)
        r0 = random.uniform(40, 90)
        r1 = r0 + random.uniform(30, 150)
        cx, cy = 790, 520
        x0, y0 = cx + 0 + r0 * math.cos(a) * 2.2, cy + r0 * math.sin(a) * .8
        x1, y1 = cx + r1 * math.cos(a) * 2.2, cy + r1 * math.sin(a) * 1.0
        b += f'<line x1="{x0:.0f}" y1="{y0:.0f}" x2="{x1:.0f}" y2="{y1:.0f}" stroke="#FFC857" stroke-opacity="{random.uniform(.5,1):.2f}" stroke-width="{random.choice([2,3,4])}" stroke-linecap="round"/>'
    return wrap(b, "Forging press shaping a glowing hot steel billet on an anvil", glow=(800, 520, 780, 400))

def i_infra():
    b = '<path class="lt" d="M100 700 L100 610 L190 610 L190 560 L260 560 L260 640 L330 640 L330 580 L420 580 L420 690"/>'
    b += '<path class="lt" d="M1180 700 L1180 600 L1260 600 L1260 540 L1330 540 L1330 620 L1420 620 L1420 700"/>'
    b += floor(790, 80, 1520)
    # pillars
    for x in (330, 800, 1270):
        b += f'<path class="p" d="M{x-34} 790 L{x-26} 470 L{x+26} 470 L{x+34} 790 Z" style="fill:url(#steel)"/>'
        b += f'<path class="p" d="M{x-110} 470 L{x+110} 470 L{x+70} 520 L{x-70} 520 Z"/>'
        for yy in (560, 640, 720):
            b += f'<line class="l" style="stroke-width:2;opacity:.45" x1="{x-26}" y1="{yy}" x2="{x+26}" y2="{yy+18}"/><line class="l" style="stroke-width:2;opacity:.45" x1="{x+26}" y1="{yy}" x2="{x-26}" y2="{yy+18}"/>'
    # deck
    b += '<rect x="80" y="416" width="1440" height="54" class="p" style="fill:url(#steel)"/>'
    b += '<rect x="80" y="392" width="1440" height="26" fill="url(#blk)" stroke="#C6912F" stroke-width="3"/>'
    b += '<line x1="100" y1="405" x2="1500" y2="405" stroke="#E7BA5A" stroke-width="3" stroke-dasharray="40 30" stroke-opacity=".85"/>'
    for x in range(100, 1500, 70):
        b += f'<line class="l" style="stroke-width:2;opacity:.6" x1="{x}" y1="392" x2="{x}" y2="366"/>'
    b += '<line class="l" style="stroke-width:2.4" x1="80" y1="366" x2="1520" y2="366"/>'
    # crane
    b += bar(1450, 790, 1450, 160, 22)
    b += bar(1450, 160, 1000, 160, 16)
    b += '<path class="l" style="stroke-width:2.4" d="M1450 160 L1220 160 M1450 130 L1000 160 M1450 130 L1450 160"/>'
    b += '<line class="l" style="stroke-width:2.4" x1="1100" y1="160" x2="1100" y2="300"/><rect x="1080" y="300" width="40" height="30" rx="6" class="p"/>'
    b += '<path class="lt" d="M1450 130 L1450 80"/>'
    # rebar mesh
    for i in range(7):
        b += f'<line class="l" style="stroke-width:2;opacity:.55" x1="{560+i*24}" y1="640" x2="{560+i*24}" y2="780"/>'
    for i in range(6):
        b += f'<line class="l" style="stroke-width:2;opacity:.55" x1="560" y1="{650+i*24}" x2="704" y2="{650+i*24}"/>'
    return wrap(b, "Elevated expressway under construction with a crane", glow=(800, 430, 800, 360))

def i_manufacturing():
    b = floor(800, 90, 1510)
    # sawtooth roof silhouette
    b += '<path class="p" d="M110 330 L110 200 L260 320 L260 200 L410 320 L410 200 L560 320 L560 200 L710 320 L710 330 Z"/>'
    b += '<rect x="110" y="330" width="600" height="110" class="pm"/>'
    for x in range(150, 700, 90):
        b += f'<rect x="{x}" y="360" width="50" height="50" rx="6" fill="#C6912F" fill-opacity=".22" stroke="#C6912F" stroke-opacity=".6" stroke-width="2"/>'
    # conveyor
    b += '<rect x="140" y="720" width="900" height="40" rx="20" class="p"/>'
    for x in range(180, 1020, 70):
        b += f'<circle cx="{x}" cy="740" r="9" fill="#0B1016" stroke="{GOLD}" stroke-width="2.4"/>'
    for x in (230, 450, 700):
        b += f'<rect x="{x}" y="640" width="110" height="80" rx="8" class="p"/><line class="l" style="stroke-width:2.4" x1="{x}" y1="672" x2="{x+110}" y2="672"/>'
    # robot arm
    b += '<rect x="1050" y="700" width="170" height="60" rx="10" class="p"/><rect x="1090" y="640" width="90" height="60" rx="10" class="p"/>'
    b += bar(1135, 650, 1060, 480, 34)
    b += bar(1060, 480, 860, 460, 28)
    for (x, y, r) in [(1135, 650, 30), (1060, 480, 26), (860, 460, 20)]:
        b += f'<circle cx="{x}" cy="{y}" r="{r}" fill="#0B1016" stroke="{GOLD}" stroke-width="4"/><circle cx="{x}" cy="{y}" r="{r*0.35:.0f}" class="g"/>'
    b += '<path class="l" d="M860 480 L860 540 M820 540 L900 540 M820 540 L820 566 M900 540 L900 566"/>'
    b += '<rect x="806" y="566" width="108" height="64" rx="8" class="p"/>'
    # CNC
    b += '<rect x="1240" y="400" width="250" height="360" rx="16" class="p" style="fill:url(#steel)"/>'
    b += '<rect x="1270" y="440" width="190" height="150" rx="10" fill="#0B1016" stroke="#C6912F" stroke-width="3"/>'
    b += '<path class="l" style="stroke-width:2.4;opacity:.7" d="M1290 460 L1440 570"/>'
    b += '<line class="l" x1="1365" y1="470" x2="1365" y2="540"/><circle cx="1365" cy="548" r="12" class="g"/>'
    for i in range(4):
        b += f'<rect x="{1272+i*50}" y="640" width="36" height="22" rx="5" fill="#C6912F" fill-opacity="{.9 if i==0 else .3}"/>'
    # floating gears
    b += gear(900, 250, 12, 92, 72, .1, holes=4, film=False)
    b += gear(1070, 190, 8, 52, 40, .3, holes=3, film=False)
    return wrap(b, "Modern manufacturing floor with a robotic arm, conveyor and CNC machine", glow=(820, 520, 800, 380))

# =====================================================================
# OG IMAGE (1200x630)  - real text, rendered to PNG only
# =====================================================================
def og():
    b = ""
    # right visual: beaker + chain
    b += '<ellipse cx="900" cy="560" rx="260" ry="12" fill="#F6DC8A" fill-opacity=".10"/>'
    b += beaker(850, 560, 230, 310, .7, "oilL", "cB")
    b += bottle(1050, 560, 130, 230, .75, "oilL", "cT")
    b += chain(740, 150, 7, dx=52, dy=26, op=.9, w=2.6)
    b += drop(850, 210, 15)
    b += sparkle(760, 380, 11) + sparkle(1070, 250, 9)
    # left: brand
    gx, gy = 120, 170
    b += f'<circle cx="{gx}" cy="{gy}" r="34" fill="#10161E" stroke="{GOLD}" stroke-width="3"/>'
    b += f'<path transform="translate({gx} {gy+4}) scale(11)" fill="none" stroke="{GOLD}" stroke-width=".25" d="M0 -2 C0.3 -1.2 1.2 -0.4 1.2 0.5 A1.2 1.2 0 0 1 -1.2 0.5 C-1.2 -0.4 -0.3 -1.2 0 -2 Z"/>'
    b += (f'<text x="178" y="188" font-family="Liberation Serif, Times New Roman, DejaVu Serif, serif" font-weight="700" font-size="56" fill="#FFFFFF" letter-spacing="1">ORION '
          f'<tspan fill="{GOLD}">OIL</tspan></text>')
    b += f'<rect x="84" y="260" width="120" height="4" rx="2" fill="{GOLD}"/>'
    b += ('<text font-family="Liberation Serif, Times New Roman, DejaVu Serif, serif" font-weight="700" font-size="46" fill="#F2F4F7">'
          '<tspan x="84" y="336">Engineering the Future</tspan><tspan x="84" y="394">of Sustainable Lubricants</tspan></text>')
    b += ('<text x="84" y="470" font-family="Liberation Serif, Times New Roman, DejaVu Serif, serif" font-size="25" fill="#A9B4C2">'
          'Premium Base Oils &amp; Industrial Fuels</text>')
    b += ('<text x="84" y="508" font-family="Liberation Serif, Times New Roman, DejaVu Serif, serif" font-size="22" fill="#7F8B9A" letter-spacing="1">'
          'REFINED FROM RECYCLED FEEDSTOCKS  ·  PUNE, MAHARASHTRA</text>')
    return wrap(b, "Orion Oil - Engineering the Future of Sustainable Lubricants", glow=(880, 330, 520, 330), w=1200, h=630)

# =====================================================================
def i_road():  # refined version
    b = '<circle cx="1170" cy="380" r="300" fill="url(#hot)"/>'
    b += f'<circle cx="1170" cy="380" r="120" fill="none" stroke="{GOLD}" stroke-opacity=".7" stroke-width="3"/>'
    b += f'<circle cx="1170" cy="380" r="78" class="g" fill-opacity=".85"/>'
    b += '<path class="lt" d="M180 250 H560 M300 300 H700 M120 350 H420 M760 200 H980"/>'
    b += '<path d="M100 640 Q260 520 470 600 T820 590 T1100 620 L1100 700 L100 700 Z" fill="#101720" stroke="#34414F" stroke-width="2"/>'
    b += '<path d="M700 650 Q960 560 1200 630 T1500 600 L1500 700 L700 700 Z" fill="#0D131A" stroke="#34414F" stroke-width="2"/>'
    # road layers
    b += '<rect x="100" y="700" width="1400" height="46" fill="url(#blk)" stroke="#C6912F" stroke-width="3"/>'
    b += '<rect x="100" y="746" width="1400" height="46" class="pm" style="fill:#18212C"/>'
    b += '<rect x="100" y="792" width="1400" height="30" class="pm" style="fill:#0F151C"/>'
    b += '<line x1="120" y1="718" x2="1480" y2="718" stroke="#E7BA5A" stroke-width="3" stroke-dasharray="44 36" stroke-opacity=".8"/>'
    # paver (moving left): hopper, body, canopy, screed, tracks
    b += '<path class="p" d="M110 440 L290 440 L322 560 L170 560 Z"/>'
    b += '<path class="l" d="M170 470 L270 470 M180 505 L284 505" style="stroke-width:2.4;opacity:.6"/>'
    b += '<path class="p" d="M170 560 L170 650 L560 650 L560 590 L470 590 L440 530 L322 530 L322 560 Z" style="fill:url(#steel)"/>'
    b += '<path class="l" d="M345 530 L345 440 M440 530 L440 440 M325 440 L460 440"/>'
    b += '<rect x="560" y="580" width="100" height="116" class="p"/>'
    b += '<rect x="660" y="660" width="210" height="40" fill="url(#blk)" stroke="#C6912F" stroke-width="3"/>'
    b += '<rect x="200" y="650" width="340" height="56" rx="28" class="p"/>'
    for x in (232, 302, 372, 442, 512):
        b += f'<circle cx="{x}" cy="678" r="13" fill="#0B1016" stroke="{GOLD}" stroke-width="3"/>'
    b += steam(690, 656, 3, 130, 52, .45)
    # roller on the fresh mat
    b += '<rect x="900" y="540" width="260" height="100" rx="12" class="p" style="fill:url(#steel)"/>'
    b += '<path class="l" d="M960 540 L960 450 M1090 540 L1090 450 M940 450 L1110 450"/>'
    b += '<rect x="985" y="480" width="70" height="60" rx="8" class="p"/>'
    b += f'<circle cx="965" cy="628" r="72" fill="#151D27" stroke="{GOLD}" stroke-width="4"/><circle cx="965" cy="628" r="22" class="g"/>'
    b += f'<circle cx="1130" cy="634" r="66" fill="#151D27" stroke="{GOLD}" stroke-width="4"/><circle cx="1130" cy="634" r="20" class="g"/>'
    # cones
    for x in (1350, 1420):
        b += f'<path d="M{x-22} 700 L{x} 640 L{x+22} 700 Z" fill="#C6912F" fill-opacity=".85"/><line x1="{x-16}" y1="682" x2="{x+16}" y2="682" stroke="#0B1016" stroke-width="5"/>'
    b = '<g transform="translate(-96 -100) scale(1.12)">' + b + '</g>'
    return wrap(b, "Asphalt paver and road roller laying a new road surface", glow=(700, 520, 800, 340))

def i_waterproof():  # refined version
    random.seed(4)
    b = ""
    for i in range(24):
        x = 200 + i * 56 + random.randint(-14, 14)
        y = 90 + random.randint(0, 140)
        b += f'<line x1="{x}" y1="{y}" x2="{x-26}" y2="{y+66}" stroke="#9FB4C8" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>'
    # protection shield
    b += f'<path d="M800 270 L930 310 L930 400 Q930 470 800 510 Q670 470 670 400 L670 310 Z" fill="#151D27" stroke="{GOLD}" stroke-width="5" stroke-linejoin="round"/>'
    b += f'<path d="M740 395 L788 443 L868 346" fill="none" stroke="{GOLD}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>'
    # layers (slab, primer, membrane, protective stones)
    b += '<rect x="130" y="670" width="1350" height="140" class="pm" style="fill:#1B2430"/>'
    for i in range(36):
        b += f'<circle cx="{160+i*37}" cy="{695+(i*37)%95}" r="{3 if i%3 else 5}" fill="#34414F"/>'
    b += '<rect x="130" y="650" width="1350" height="20" fill="#C6912F" fill-opacity=".28" stroke="#C6912F" stroke-width="2.4"/>'
    b += '<rect x="260" y="620" width="1220" height="30" fill="url(#blk)" stroke="#C6912F" stroke-width="3"/>'
    b += '<line x1="300" y1="630" x2="1460" y2="630" stroke="#fff" stroke-opacity=".22" stroke-width="3"/>'
    for i in range(34):
        b += f'<circle cx="{574+i*27}" cy="{598+(i*13)%16}" r="{14 if i%2 else 11}" fill="#232C38" stroke="#C6912F" stroke-opacity=".75" stroke-width="2.4"/>'
    # roll + torch
    b += f'<circle cx="260" cy="568" r="82" fill="url(#blk)" stroke="{GOLD}" stroke-width="4"/>'
    for r in (62, 44, 26):
        b += f'<circle cx="260" cy="568" r="{r}" fill="none" stroke="{GOLD}" stroke-opacity=".6" stroke-width="2.4"/>'
    b += f'<circle cx="260" cy="568" r="9" class="g"/>'
    b += flame(330, 650, .42)
    b += f'<path d="M352 650 L420 600" stroke="{GOLD}" stroke-width="10" stroke-linecap="round"/><path d="M352 650 L420 600" stroke="#18212C" stroke-width="4" stroke-linecap="round"/>'
    return wrap(b, "Bitumen waterproofing membrane layers protecting a flat roof from rain", glow=(800, 520, 780, 380))

def i_infra():  # refined version
    b = '<path class="lt" d="M100 700 L100 610 L190 610 L190 560 L260 560 L260 640 L330 640 L330 580 L420 580 L420 690"/>'
    b += '<path class="lt" d="M1000 700 L1000 600 L1080 600 L1080 540 L1150 540 L1150 620 L1240 620 L1240 700"/>'
    b += floor(790, 80, 1520)
    for x in (330, 800, 1270):
        b += f'<path class="p" d="M{x-34} 790 L{x-26} 470 L{x+26} 470 L{x+34} 790 Z" style="fill:url(#steel)"/>'
        b += f'<path class="p" d="M{x-110} 470 L{x+110} 470 L{x+70} 520 L{x-70} 520 Z"/>'
        for yy in (560, 640, 720):
            b += f'<line class="l" style="stroke-width:2;opacity:.45" x1="{x-26}" y1="{yy}" x2="{x+26}" y2="{yy+18}"/><line class="l" style="stroke-width:2;opacity:.45" x1="{x+26}" y1="{yy}" x2="{x-26}" y2="{yy+18}"/>'
    b += '<rect x="80" y="416" width="1440" height="54" class="p" style="fill:url(#steel)"/>'
    b += '<rect x="80" y="392" width="1440" height="26" fill="url(#blk)" stroke="#C6912F" stroke-width="3"/>'
    b += '<line x1="100" y1="405" x2="1500" y2="405" stroke="#E7BA5A" stroke-width="3" stroke-dasharray="40 30" stroke-opacity=".85"/>'
    for x in range(100, 1500, 70):
        b += f'<line class="l" style="stroke-width:2;opacity:.6" x1="{x}" y1="392" x2="{x}" y2="366"/>'
    b += '<line class="l" style="stroke-width:2.4" x1="80" y1="366" x2="1520" y2="366"/>'
    # lattice tower crane
    tx1, tx2 = 1440, 1490
    b += f'<line class="l" x1="{tx1}" y1="790" x2="{tx1}" y2="190"/><line class="l" x1="{tx2}" y1="790" x2="{tx2}" y2="190"/>'
    for y in range(190, 790, 60):
        b += f'<path class="l" style="stroke-width:2;opacity:.6" d="M{tx1} {y} L{tx2} {y+60} M{tx2} {y} L{tx1} {y+60}"/>'
    b += f'<rect x="{tx1-14}" y="160" width="{tx2-tx1+28}" height="36" rx="6" class="p"/>'
    # jib (lattice) + counter-jib + mast + ties
    b += '<path class="l" d="M980 150 L1510 150 M980 190 L1440 190"/>'
    for x in range(980, 1440, 46):
        b += f'<path class="l" style="stroke-width:2;opacity:.6" d="M{x} 190 L{x+23} 150 L{x+46} 190"/>'
    b += '<path class="l" d="M980 150 L980 190 M1510 150 L1510 170"/>'
    b += f'<path class="lt" d="M{(tx1+tx2)//2} 160 L{(tx1+tx2)//2} 70 M{(tx1+tx2)//2} 70 L980 150 M{(tx1+tx2)//2} 70 L1510 150"/>'
    b += '<rect x="1470" y="170" width="40" height="46" rx="6" class="p"/>'
    # trolley + hook load
    b += '<rect x="1090" y="190" width="40" height="22" rx="5" class="p"/><line class="l" style="stroke-width:2.4" x1="1110" y1="212" x2="1110" y2="320"/>'
    b += '<path class="p" d="M1070 320 L1150 320 L1136 356 L1084 356 Z"/>'
    # rebar mesh
    for i in range(7):
        b += f'<line class="l" style="stroke-width:2;opacity:.55" x1="{560+i*24}" y1="640" x2="{560+i*24}" y2="780"/>'
    for i in range(6):
        b += f'<line class="l" style="stroke-width:2;opacity:.55" x1="560" y1="{650+i*24}" x2="704" y2="{650+i*24}"/>'
    return wrap(b, "Elevated expressway under construction with a lattice tower crane", glow=(800, 430, 800, 360))

def og():  # refined version
    b = ""
    b += '<ellipse cx="930" cy="560" rx="250" ry="12" fill="#F6DC8A" fill-opacity=".10"/>'
    b += beaker(890, 560, 230, 310, .7, "oilL", "cB")
    b += bottle(1085, 560, 130, 230, .75, "oilL", "cT")
    b += chain(790, 150, 7, dx=52, dy=26, op=.9, w=2.6)
    b += drop(890, 210, 15)
    b += sparkle(800, 380, 11) + sparkle(1100, 250, 9)
    gx, gy = 120, 170
    b += f'<circle cx="{gx}" cy="{gy}" r="34" fill="#10161E" stroke="{GOLD}" stroke-width="3"/>'
    b += f'<path transform="translate({gx} {gy+4}) scale(11)" fill="none" stroke="{GOLD}" stroke-width=".25" d="M0 -2 C0.3 -1.2 1.2 -0.4 1.2 0.5 A1.2 1.2 0 0 1 -1.2 0.5 C-1.2 -0.4 -0.3 -1.2 0 -2 Z"/>'
    f = 'font-family="Liberation Serif, Times New Roman, DejaVu Serif, serif"'
    b += (f'<text x="178" y="188" {f} font-weight="700" font-size="56" fill="#FFFFFF" letter-spacing="1">ORION '
          f'<tspan fill="{GOLD}">OIL</tspan></text>')
    b += f'<rect x="84" y="260" width="120" height="4" rx="2" fill="{GOLD}"/>'
    b += (f'<text {f} font-weight="700" font-size="46" fill="#F2F4F7">'
          '<tspan x="84" y="336">Engineering the Future</tspan><tspan x="84" y="394">of Sustainable Lubricants</tspan></text>')
    b += f'<text x="84" y="460" {f} font-size="25" fill="#A9B4C2">Premium Base Oils &amp; Industrial Fuels</text>'
    b += f'<text x="84" y="505" {f} font-size="20" fill="#7F8B9A" letter-spacing="1.5">REFINED FROM RECYCLED FEEDSTOCKS</text>'
    b += f'<text x="84" y="536" {f} font-size="20" fill="#7F8B9A" letter-spacing="1.5">PUNE, MAHARASHTRA</text>'
    return wrap(b, "Orion Oil - Engineering the Future of Sustainable Lubricants", glow=(930, 330, 520, 330), w=1200, h=630)

FILES = {
    "products/orion-oil-products-sn150-base-oil.svg": p_sn150,
    "products/orion-oil-products-sn300-base-oil.svg": p_sn300,
    "products/orion-oil-products-industrial-ldo.svg": p_ldo,
    "products/orion-oil-products-asphalt-bitumen.svg": p_bitumen,
    "industries/orion-oil-industry-lubricant-manufacturers.svg": i_lubricant,
    "industries/orion-oil-industry-hydraulic-oil-blenders.svg": i_hydraulic,
    "industries/orion-oil-industry-gear-oil-producers.svg": i_gear,
    "industries/orion-oil-industry-boiler-furnace.svg": i_boiler,
    "industries/orion-oil-industry-road-construction.svg": i_road,
    "industries/orion-oil-industry-waterproofing-coatings.svg": i_waterproof,
    "industries/orion-oil-industry-heavy-engineering.svg": i_forge,
    "industries/orion-oil-industry-infrastructure.svg": i_infra,
    "industries/orion-oil-industry-industrial-manufacturing.svg": i_manufacturing,
    "orion-oil-og-image.svg": og,
}

if __name__ == "__main__":
    for rel, fn in FILES.items():
        path = os.path.join(OUT, rel)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            f.write(fn())
        print("wrote", rel)
