#!/bin/bash
# Run this right before the workshop to make guides publicly accessible

set -e

echo "Making repo public..."
gh repo edit olgasafonova/mcp-workshop --visibility public

echo "Enabling GitHub Pages..."
gh api repos/olgasafonova/mcp-workshop/pages -X POST --input - <<'EOF'
{
  "build_type": "legacy",
  "source": {
    "branch": "main",
    "path": "/"
  }
}
EOF

echo ""
echo "Done! Guide will be live in ~1 minute at:"
echo "https://olgasafonova.github.io/mcp-workshop/guides/quickstart-gleif"
