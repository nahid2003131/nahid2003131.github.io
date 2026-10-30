# Nahid Hasan - Research Website (deploy package)

This ZIP contains the deployable GitHub Pages site. Extract the ZIP first; upload its CONTENTS to the publishing root of your GitHub Pages repository. Do not upload the ZIP itself as a website file, and do not nest all site files inside an additional folder.

## File names

- Homepage: index.html
- Research page: research/index.html
- Styles: styles.css
- Scripts: main.js
- Updated CV (canonical): assets/Nahid_Hasan_CV.pdf
- Updated CV (cache-safe links used by both site pages): assets/cv/2026-10-30/Nahid_Hasan_CV.pdf

Both PDFs are IDENTICAL copies of the updated two-page CV. Keep BOTH paths when deploying. The CV links in the homepage and research page intentionally point to the versioned path to avoid older cached copies.

## Deploy using GitHub.com (existing Pages repository)

1. Open your GitHub Pages repository's Code tab.
2. Download and extract this ZIP on your computer.
3. Choose Add file > Upload files and upload all files and folders from INSIDE the extracted folder, keeping their relative paths. If your GitHub browser cannot upload directories reliably, use GitHub Desktop/VS Code or the command-line steps below.
4. Commit directly to the branch GitHub Pages is set to publish, commonly main.
5. Under Settings > Pages, confirm Source = Deploy from a branch, branch = your published branch, folder = /(root). If you previously configured GitHub Actions, keep your working setup rather than switching sources.
6. Wait until the Pages deployment reports success; refresh the live site and open the CV link.

## Deploy using Git in a local clone

Copy the extracted ZIP contents into the root of your local clone (overwrite existing files). Then run:

    git add -A
    git commit -m "Update research website and CV"
    git push

Check your existing site's deployment branch before pushing.

## CV verification

The updated CV has the Research Interests line:
Natural Language Processing (NLP) / Multimodal Learning / Low-Resource & Multilingual NLP

The CAAM-Net entry indicates Manuscript Submitted (2026); it does not claim acceptance or publication.
