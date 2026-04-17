const emojis = [
"😭","🔥","😱","🙏","💀","😤","🥀","🤯","🫩","🧠","💯",
"😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","🙂",
"🙃","😉","😍","😘","😗","😙","😚","😋","😛","😜","🤪",
"🤨","🧐","🤓","😎","🥳","😡","👍","👎","👏","🙌","❤️",
"🤑",
];

const textBox = document.getElementById('textBox');
const keyboard = document.getElementById('emojiKeyboard');
const textUnderlay = document.getElementById('textUnderlay');

// Initial sync
textUnderlay.innerHTML = textBox.innerHTML.replace(/<br\s*\/?>$/i, "");

// Sync the textbox with the white underlay
textBox.addEventListener('input', () => {
    // remove ONE trailing <br> for the white underlay (so the shape doesn't glitch)
    textUnderlay.innerHTML = textBox.innerHTML.replace(/<br\s*\/?>$/i, "");

    // Log for debugging
    console.log(textBox.getHTML());
    console.log(textUnderlay.getHTML());
});

// Intercept and prevent backspaces if the underlay is already blank
textBox.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && textUnderlay.innerHTML === "") {
        e.preventDefault(); // Stops the backspace from deleting the remaining <br>
    }
});

// Force `paste as plain text`
textBox.addEventListener("paste", (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData("text/plain");
    document.execCommand("insertText", false, text);
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

// Save button logic
document.getElementById("saveBtn").addEventListener("click", async () => {
    const node = document.getElementById("capture");
    try {
        // This dummy call forces the fonts to load into the html-to-image SVG context
        await htmlToImage.toBlob(node, { cacheBust: true });

        // Now run the actual capture
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