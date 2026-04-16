const emojis = [
"😭","🔥","😱","🙏","💀","😤","🥀","🤯","🫩","🧠","💯",
"😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","🙂",
"🙃","😉","😍","😘","😗","😙","😚","😋","😛","😜","🤪",
"🤨","🧐","🤓","😎","🥳","😡","👍","👎","👏","🙌","❤️",
];

const textBox = document.getElementById('textBox');
const keyboard = document.getElementById('emojiKeyboard');

textBox.addEventListener('input', () => {
    console.log(textBox.getHTML())
});

// Save button logic
document.getElementById("saveBtn").addEventListener("click", async () => {
    const node = document.getElementById("capture");
    try {
        // html-to-image will look for the font-family defined in the CSS
        const blob = await htmlToImage.toBlob(node, {
        backgroundColor: null,
        pixelRatio: 3,
        cacheBust: true,
        });

        if ('showSaveFilePicker' in window) {
        try {
            const handle = await window.showSaveFilePicker({
            suggestedName: 'caption.png',
            types: [{ description: 'PNG Image', accept: {'image/png': ['.png']} }],
            });
            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
            return;
        } catch (err) { if (err.name === 'AbortError') return; }
        }

        const dataUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "caption.png";
        link.href = dataUrl;
        link.click();
        URL.revokeObjectURL(dataUrl);
    } catch (error) {
        console.error("Export failed:", error);
    }
});

// Emoji keyboard logic
emojis.forEach(emoji => {
const btn = document.createElement('button');
btn.className = 'emoji-btn';
btn.textContent = emoji;
btn.onclick = () => {
    textBox.focus();
    document.execCommand('insertText', false, emoji);
};
keyboard.appendChild(btn);
});