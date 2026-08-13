"""Generate the 1024x500 Play Store feature graphic for Pencil Puzzles."""
from PIL import Image, ImageDraw, ImageFont

W, H = 1024, 500

CREAM = (255, 249, 240)
LIGHT_PINK = (253, 230, 255)
PURPLE = (168, 85, 247)
BLUE = (11, 165, 236)
ORANGE = (245, 158, 11)
GREEN = (18, 183, 106)
PINK = (236, 72, 153)
DARK = (30, 27, 75)
GRAY = (107, 114, 128)

img = Image.new("RGB", (W, H), CREAM)
draw = ImageDraw.Draw(img)

for y in range(H):
    for x_band in range(0, W, 4):
        t = (x_band / W + y / H) / 2
        r = int(CREAM[0] * (1 - t) + LIGHT_PINK[0] * t)
        g = int(CREAM[1] * (1 - t) + LIGHT_PINK[1] * t)
        b = int(CREAM[2] * (1 - t) + LIGHT_PINK[2] * t)
        draw.rectangle([x_band, y, x_band + 4, y + 1], fill=(r, g, b))

def faint(color, alpha=0.15):
    return tuple(int(c * alpha + 255 * (1 - alpha)) for c in color)

deco_top = [(60, 60, PURPLE), (110, 60, BLUE), (60, 110, ORANGE), (160, 110, GREEN)]
for x, y, c in deco_top:
    draw.rounded_rectangle([x, y, x + 40, y + 40], radius=6, fill=faint(c))

deco_bot = [(800, 380, GREEN), (850, 380, ORANGE), (900, 380, PURPLE), (900, 430, BLUE)]
for x, y, c in deco_bot:
    draw.rounded_rectangle([x, y, x + 40, y + 40], radius=6, fill=faint(c))

GRID_X, GRID_Y, TILE = 110, 165, 32
GAP = 4
pattern = [
    [PURPLE, None, ORANGE, None, BLUE],
    [None, GREEN, None, PURPLE, None],
    [ORANGE, None, PINK, None, GREEN],
    [None, BLUE, None, ORANGE, None],
    [PURPLE, None, GREEN, None, PINK],
]
for row, line in enumerate(pattern):
    for col, color in enumerate(line):
        x = GRID_X + col * (TILE + GAP)
        y = GRID_Y + row * (TILE + GAP)
        c = color if color else (253, 230, 255)
        draw.rounded_rectangle([x, y, x + TILE, y + TILE], radius=5, fill=c)

def load_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default()

title_font = load_font("/System/Library/Fonts/Helvetica.ttc", 90)
subtitle_font = load_font("/System/Library/Fonts/Helvetica.ttc", 36)

draw.text((360, 180), "Pencil Puzzles", font=title_font, fill=DARK)
draw.text((365, 290), "Solve picture nonograms", font=subtitle_font, fill=GRAY)

img.save("/Users/alexanderdow/Documents/Claude Code/pencil-puzzles/store-listing/feature-graphic-1024x500.png")
print("Saved feature-graphic-1024x500.png")
