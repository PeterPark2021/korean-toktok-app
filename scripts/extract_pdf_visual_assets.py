import pymupdf as fitz
import os
import io
from PIL import Image

BOOKS = {
    '초급a': ('books/korean-toktok-kbs/초급a한권/초급a.pdf', 1, 10),
    '초급b': ('books/korean-toktok-kbs/초급b한권/초급b.pdf', 11, 20),
    '중급a': ('books/korean-toktok-kbs/중급a한권/중급a.pdf', 21, 30),
    '중급b': ('books/korean-toktok-kbs/중급b한권/중급b.pdf', 31, 40),
    '고급a': ('books/korean-toktok-kbs/고급a/고급a.pdf', 41, 45)
}

os.makedirs('public/images/extracted', exist_ok=True)
os.makedirs('public/images/characters', exist_ok=True)
os.makedirs('public/images/situations', exist_ok=True)
os.makedirs('public/images/books', exist_ok=True)

print("Extracting cover and unit illustrations from KBS PDF books...")

for book_code, (pdf_path, start_unit, end_unit) in BOOKS.items():
    if not os.path.exists(pdf_path):
        print(f"Skipping {book_code}, path not found: {pdf_path}")
        continue
    
    doc = fitz.open(pdf_path)
    print(f"\nProcessing {book_code} ({pdf_path}), Pages: {len(doc)}")
    
    # 1. Render Book Cover (Page 0)
    cover_page = doc[0]
    pix = cover_page.get_pixmap(dpi=150)
    cover_img_path = f'public/images/books/{book_code}_cover.webp'
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    img.save(cover_img_path, "WEBP", quality=85)
    print(f"  Saved cover: {cover_img_path}")

    # 2. Extract embedded images with good resolution (> 150x150)
    img_idx = 0
    for page_num in range(min(50, len(doc))):
        page = doc[page_num]
        image_list = page.get_images(full=True)
        for img_info in image_list:
            xref = img_info[0]
            try:
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]
                pil_img = Image.open(io.BytesIO(image_bytes))
                
                # Filter out tiny icons or banners
                if pil_img.width >= 160 and pil_img.height >= 160:
                    out_path = f'public/images/extracted/{book_code}_p{page_num+1}_{img_idx}.webp'
                    pil_img.save(out_path, "WEBP", quality=85)
                    img_idx += 1
            except Exception as e:
                pass

    print(f"  Extracted {img_idx} high-res images from {book_code}")

print("\nAsset extraction complete.")
