const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const sendBtn = document.getElementById('send-btn');

// Menyimpan riwayat percakapan untuk dikirim ke API backend
let conversationHistory = [];

// HTML untuk animasi "Thinking..."
const thinkingHTML = `
    <div class="flex space-x-1.5 h-6 items-center px-2 opacity-70">
        <div class="w-2 h-2 bg-gray-500 rounded-full typing-dot"></div>
        <div class="w-2 h-2 bg-gray-500 rounded-full typing-dot"></div>
        <div class="w-2 h-2 bg-gray-500 rounded-full typing-dot"></div>
    </div>
`;

/**
 * Fungsi sederhana untuk memformat Markdown ke HTML
 * Menangani: **bold**, * bullet points, dan baris baru
 */
function formatMarkdown(text) {
    let formatted = escapeHTML(text);

    // 1. Ganti **text** menjadi <strong>text</strong>
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // 2. Ganti baris yang dimulai dengan * atau - menjadi list items
    // Kita proses per baris agar lebih akurat
    const lines = formatted.split('\n');
    let inList = false;
    let result = [];

    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
            if (!inList) {
                result.push('<ul>');
                inList = true;
            }
            result.push(`<li>${trimmedLine.substring(2)}</li>`);
        } else {
            if (inList) {
                result.push('</ul>');
                inList = false;
            }
            result.push(line);
        }
    });

    if (inList) result.push('</ul>');

    // 3. Ganti sisa baris baru dengan <br> (kecuali di dalam tag list)
    return result.join('\n').replace(/\n/g, '<br>').replace(/<\/ul><br>/g, '</ul>');
}

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const userMessage = input.value.trim();
    if (!userMessage) return;

    // 1. Tambahkan pesan user ke UI
    appendMessage('user', userMessage);
    
    // 2. Tambahkan pesan user ke riwayat percakapan
    conversationHistory.push({ role: 'user', text: userMessage });
    
    // Kosongkan dan nonaktifkan input sementara
    input.value = '';
    input.disabled = true;
    sendBtn.disabled = true;

    // 3. Tampilkan pesan "Thinking..." dan simpan referensi elemen DOM-nya
    const botMessageElement = appendMessage('bot', thinkingHTML, true);

    try {
        // 4. Kirim request POST ke backend API
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ conversation: conversationHistory }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        // 5. Ganti animasi "Thinking..." dengan balasan AI yang sudah diformat
        if (data && data.result) {
            botMessageElement.innerHTML = formatMarkdown(data.result);
            
            // Tambahkan balasan bot ke riwayat percakapan
            conversationHistory.push({ role: 'model', text: data.result });
        } else {
            throw new Error('Tidak ada hasil yang diterima dari backend.');
        }
        
    } catch (error) {
        console.error('Chat API Error:', error);
        botMessageElement.innerHTML = '<span class="text-red-500 font-medium">Gagal mendapatkan respon dari server.</span>';
        conversationHistory.pop(); 
    } finally {
        input.disabled = false;
        sendBtn.disabled = false;
        input.focus();
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

function appendMessage(sender, content, isHTML = false) {
    const wrapper = document.createElement('div');
    wrapper.className = `flex w-full ${sender === 'user' ? 'justify-end' : 'justify-start'}`;
    
    const msgDiv = document.createElement('div');
    
    if (sender === 'user') {
        msgDiv.className = 'bg-blue-600 text-white px-5 py-3.5 rounded-2xl rounded-tr-sm shadow-md max-w-[85%] sm:max-w-[75%] text-sm sm:text-base leading-relaxed break-words';
    } else {
        msgDiv.className = 'bg-white border border-gray-100 text-gray-800 px-5 py-3.5 rounded-2xl rounded-tl-sm shadow-sm max-w-[85%] sm:max-w-[75%] text-sm sm:text-base leading-relaxed break-words bot-content';
    }

    if (isHTML) {
        msgDiv.innerHTML = content;
    } else {
        msgDiv.textContent = content; 
    }
    
    wrapper.appendChild(msgDiv);
    chatBox.appendChild(wrapper);
    chatBox.scrollTop = chatBox.scrollHeight;
    
    return msgDiv;
}