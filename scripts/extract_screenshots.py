"""Task Cards PDF에서 과제 카드별 스크린샷 영역을 잘라 public/images/cards/p{쪽}.webp로 저장한다."""
import sys, pathlib
import pymupdf
from PIL import Image

PDF = sys.argv[1] if len(sys.argv) > 1 else "source/google_certified_educator_level1_basic_tasks.pdf"
OUT = pathlib.Path("public/images/cards")
OUT.mkdir(parents=True, exist_ok=True)
CARD_PAGES = [*range(11, 19), *range(21, 25), *range(29, 41), *range(43, 47), 49, 50,
              *range(53, 56), *range(58, 63), *range(65, 73), *range(75, 81),
              *range(83, 89), *range(92, 97), 99, 100]
ZOOM = 3

def is_red(c):
    return c is not None and c[0] > 0.7 and c[1] < 0.35 and c[2] < 0.35

doc = pymupdf.open(PDF)
for no in CARD_PAGES:
    page = doc[no - 1]
    rects = [pymupdf.Rect(i["bbox"]) for i in page.get_image_info()]
    rects = [r for r in rects if r.y0 > 90 and r.x0 > 200 and r.width * r.height > 3000]
    for d in page.get_drawings():
        r = d["rect"]
        if (is_red(d.get("color")) or is_red(d.get("fill"))) and r.x0 > 200 and r.y0 > 90:
            rects.append(r)
    box = rects[0]
    for r in rects[1:]:
        box |= r
    box = (box + (-6, -6, 6, 6)) & page.rect
    pix = page.get_pixmap(matrix=pymupdf.Matrix(ZOOM, ZOOM), clip=box)
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    img.save(OUT / f"p{no:03d}.webp", "WEBP", quality=82, method=6)
    print(no, img.size)
