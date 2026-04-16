# YouTube Caption Creator

A lightweight web tool that generates high-quality caption images styled like YouTube Shorts text overlays.

It replicates the caption style normally only available when creating Shorts on mobile, but outputs a PNG image that can be directly imported into desktop video editors, removing the need for mobile upload workflows.

Try it here: https://yt-cc.netlify.app/

## Known Issues

- Deleting a line may leave behind extra whitespace due to how contenteditable handles line breaks.
  - Temporary workaround: cut and paste the full text to normalize spacing.

## Developer Notes

- The YouTubeSansBold.otf font was vertically adjusted (+100 units) using FontForge to correct baseline alignment issues.
- Emoji rendering is handled via a prioritized font stack to ensure Apple-style emoji appearance where available.

