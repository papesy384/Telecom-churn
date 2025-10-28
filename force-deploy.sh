#!/bin/bash
# Create a small commit to force GitHub Pages rebuild
echo "<!-- Force rebuild $(date) -->" >> index.html
git add index.html
git commit -m "chore: Force GitHub Pages rebuild"
git push origin main
