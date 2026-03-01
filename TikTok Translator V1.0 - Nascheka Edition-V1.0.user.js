// ==UserScript==
// @name         TikTok Translator V1.0 - Nascheka Edition
// @namespace    http://tampermonkey.net/
// @version      V1.0
// @description  Optimisation de l'interopérabilité linguistique en temps réel sur l'interface Web de TikTok /// Optimization of real-time linguistic interoperability on TikTok’s web interface.
// @match        https://www.tiktok.com/*
// @author       Michel Laurence (Nascheka)
// @grant        GM_xmlhttpRequest
// @connect      translate.googleapis.com
// ==/UserScript==

(function () {
    'use strict';

    // 1. BASE DE DONNÉES AVEC TITRE "Nascheka" TRADUIT
    const db = {
        fr: { n: "Français", f: "🇫🇷", title: "TikTok Traducteur Nascheka", sub: "VOIX + CHAT", check: "Vérification", final: "Envoi", send: "ENVOYER", ph: "Écris ici...", langs: { fr: "Français", ja: "Japonais", en: "Anglais", es: "Espagnol", de: "Allemand", it: "Italien", pt: "Portugais", ru: "Russe", ko: "Coréen", zh: "Chinois", ar: "Arabe", tr: "Turc", nl: "Néerlandais", vi: "Vietnamien", th: "Thaï", pl: "Polonais" }},
        ja: { n: "日本語", f: "🇯🇵", title: "TikTok 翻訳機 Nascheka", sub: "音声 + チャット", check: "検証", final: "送信内容", send: "送信する", ph: "ここに書く...", langs: { fr: "フランス語", ja: "日本語", en: "英語", es: "スペイン語", de: "ドイツ語", it: "イタリア語", pt: "ポルトガル語", ru: "ロシア語", ko: "韓国語", zh: "中国語", ar: "アラビア語", tr: "トルコ語", nl: "オランダ語", vi: "ベトナム語", th: "タイ語", pl: "ポーランド語" }},
        pl: { n: "Polski", f: "🇵🇱", title: "TikTok Tłumacz Nascheka", sub: "GŁOS + CZAT", check: "Weryfikacja", final: "Wysyłanie", send: "WYŚLIJ", ph: "Napisz tutaj...", langs: { fr: "Francuski", ja: "Japoński", en: "Angielski", es: "Hiszpański", de: "Niemiecki", it: "Włoski", pt: "Portugalski", ru: "Rosyjski", ko: "Koreański", zh: "Chiński", ar: "Arabski", tr: "Turecki", nl: "Holenderski", vi: "Wietnamski", th: "Tajski", pl: "Polski" }},
        en: { n: "English", f: "🇺🇸", title: "TikTok Translator Nascheka", sub: "VOICE + CHAT", check: "Verification", final: "Sending", send: "SEND", ph: "Type here...", langs: { fr: "French", ja: "Japanese", en: "English", es: "Spanish", de: "German", it: "Italian", pt: "Portuguese", ru: "Russian", ko: "Korean", zh: "Chinese", ar: "Arabic", tr: "Turkish", nl: "Dutch", vi: "Vietnamese", th: "Thai", pl: "Polish" }},
        ru: { n: "Русский", f: "🇷🇺", title: "TikTok Переводчик Nascheka", sub: "ГОЛОС + ЧАТ", check: "Проверка", final: "Отправка", send: "ОТПРАВИТЬ", ph: "Пишите здесь...", langs: { fr: "Французский", ja: "Японский", en: "Английский", es: "Испанский", de: "Немецкий", it: "Итальянский", pt: "Португальский", ru: "Русский", ko: "Корейский", zh: "Китайский", ar: "Арабский", tr: "Турецкий", nl: "Голландский", vi: "Вьетнамский", th: "Тайский", pl: "Польский" }},
        es: { n: "Español", f: "🇪🇸", title: "TikTok Traductor Nascheka", sub: "VOZ + CHAT", check: "Verificación", final: "Envío", send: "ENVIAR", ph: "Escribe aquí...", langs: { fr: "Francés", ja: "Japonés", en: "Inglés", es: "Español", de: "Alemán", it: "Italiano", pt: "Portugués", ru: "Ruso", ko: "Coreano", zh: "Chino", ar: "Árabe", tr: "Turco", nl: "Holandés", vi: "Vietnamita", th: "Tailandés", pl: "Polaco" }},
        de: { n: "Deutsch", f: "🇩🇪", title: "TikTok Übersetzer Nascheka", sub: "STIMME + CHAT", check: "Prüfung", final: "Senden", send: "SENDEN", ph: "Hier schreiben...", langs: { fr: "Französisch", ja: "Japanisch", en: "Englisch", es: "Spanisch", de: "Deutsch", it: "Italienisch", pt: "Portugiesisch", ru: "Russisch", ko: "Koreanisch", zh: "Chinesisch", ar: "Arabisch", tr: "Türkisch", nl: "Niederländisch", vi: "Vietnamesisch", th: "Thailändisch", pl: "Polnisch" }},
        it: { n: "Italiano", f: "🇮🇹", title: "TikTok Traduttore Nascheka", sub: "VOCE + CHAT", check: "Verifica", final: "Invio", send: "INVIARE", ph: "Scrivi qui...", langs: { fr: "Francese", ja: "Giapponese", en: "Inglese", es: "Spagnolo", de: "Tedesco", it: "Italiano", pt: "Portoghese", ru: "Russo", ko: "Coreano", zh: "Cinese", ar: "Arabo", tr: "Turco", nl: "Olandese", vi: "Vietnamita", th: "Tailandese", pl: "Polacco" }},
        pt: { n: "Português", f: "🇵🇹", title: "TikTok Tradutor Nascheka", sub: "VOZ + CHAT", check: "Verificação", final: "Envio", send: "ENVIAR", ph: "Escreva aqui...", langs: { fr: "Francês", ja: "Japonês", en: "Inglês", es: "Espanhol", de: "Alemão", it: "Italiano", pt: "Português", ru: "Ruso", ko: "Coreano", zh: "Chinês", ar: "Árabe", tr: "Turco", nl: "Holandês", vi: "Vietnamita", th: "Tailandês", pl: "Polonês" }},
        ko: { n: "한국어", f: "🇰🇷", title: "TikTok 번역기 Nascheka", sub: "음성 + 채팅", check: "확인", final: "전송", send: "보내기", ph: "여기에 쓰기...", langs: { fr: "프랑스어", ja: "일본어", en: "영어", es: "스페인어", de: "독일어", it: "이탈리아어", pt: "포르투갈어", ru: "러시아어", ko: "한국어", zh: "중국어", ar: "아랍어", tr: "터키어", nl: "네덜란드어", vi: "베트남어", th: "태국어", pl: "폴란드어" }},
        zh: { n: "中文", f: "🇨🇳", title: "TikTok 翻译 Nascheka", sub: "语音 + 聊天", check: "验证", final: "发送", send: "发送", ph: "在此输入...", langs: { fr: "法语", ja: "日语", en: "英语", es: "西班牙语", de: "德语", it: "意大利语", pt: "葡萄牙语", ru: "俄语", ko: "韩语", zh: "中文", ar: "阿拉伯语", tr: "土耳其语", nl: "荷兰语", vi: "越南语", th: "泰语", pl: "波兰语" }},
        ar: { n: "العربية", f: "🇸🇦", title: "Nascheka مترجم TikTok", sub: "صوت + دردشة", check: "التحقق", final: "إرسال", send: "إرسال", ph: "اكتب هنا...", langs: { fr: "الفرنسية", ja: "اليابانية", en: "الإنجليزية", es: "الإسبانية", de: "الألمانية", it: "الإيطالية", pt: "البرتغالية", ru: "الروسية", ko: "الكورية", zh: "الصينية", ar: "العربية", tr: "التركية", nl: "الهولندية", vi: "الفيتنامية", th: "التايلاندية", pl: "البولندية" }},
        tr: { n: "Türkçe", f: "🇹🇷", title: "TikTok Tercüman Nascheka", sub: "SES + SOHBET", check: "Doğrulama", final: "Gönderim", send: "GÖNDER", ph: "Buraya yazın...", langs: { fr: "Fransızca", ja: "Japonca", en: "İngilizce", es: "İspanyolca", de: "Almanca", it: "İtalyanca", pt: "Portekizce", ru: "Rusça", ko: "Korece", zh: "Chince", ar: "Arapça", tr: "Türkçe", nl: "Flemenkçe", vi: "Vietnamca", th: "Tayca", pl: "Lehçe" }},
        nl: { n: "Nederlands", f: "🇳🇱", title: "TikTok Vertaler Nascheka", sub: "STEM + CHAT", check: "Controle", final: "Verzenden", send: "VERZENDEN", ph: "Schrijf hier...", langs: { fr: "Frans", ja: "Japans", en: "Engels", es: "Spaans", de: "Duits", it: "Italiaans", pt: "Portugees", ru: "Russisch", ko: "Koreaans", zh: "Chinees", ar: "Arabisch", tr: "Turks", nl: "Nederlands", vi: "Vietnamesisch", th: "Thai", pl: "Pools" }},
        vi: { n: "Tiếng Việt", f: "🇻🇳", title: "TikTok Dịch Nascheka", sub: "GIỌNG NÓI + CHAT", check: "Kiểm tra", final: "Gửi đi", send: "GỬI", ph: "Viết ở đây...", langs: { fr: "Tiếng Pháp", ja: "Tiếng Nhật", en: "Tiếng Anh", es: "Tiếng Tây Ban Nha", de: "Tiếng Đức", it: "Tiếng Ý", pt: "Tiếng Bồ Đào Nha", ru: "Tiếng Nga", ko: "Tiếng Hàn", zh: "Tiếng Trung", ar: "Tiếng Ả Rập", tr: "Tiếng Thổ Nhĩ Kỳ", nl: "Tiếng Hà Lan", vi: "Tiếng Việt", th: "Tiếng Thái", pl: "Tiếng Ba Lan" }},
        th: { n: "ไทย", f: "🇹🇭", title: "TikTok นักแปล Nascheka", sub: "เสียง + แชท", check: "การตรวจสอบ", final: "การส่ง", send: "ส่ง", ph: "พิมพ์ที่นี่...", langs: { fr: "ฝรั่งเศส", ja: "ญี่ปุ่น", en: "อังกฤษ", es: "สเปน", de: "เยอรมัน", it: "อิตาลี", pt: "โปรตุเกส", ru: "รัสเซีย", ko: "เกาหลี", zh: "จีน", ar: "อาหรับ", tr: "ตุรกี", nl: "ดัตช์", vi: "เวียดนาม", th: "ไทย", pl: "โปแลนด์" }}
    };

    let state = { read: "fr", write: "ja", timer: null, drag: { active: false, sx: 0, sy: 0, cx: 50, cy: 150 } };

    // --- CONSTRUCTION UI ---
    const host = document.createElement("div"); document.body.appendChild(host);
    const shadow = host.attachShadow({ mode: "open" });
    const ui = document.createElement("div");
    ui.style.cssText = `position:fixed;top:${state.drag.cy}px;left:${state.drag.cx}px;width:320px;background:#121212;border:2px solid #fe2c55;border-radius:15px;color:white;font-family:sans-serif;box-shadow:0 10px 40px rgba(0,0,0,0.9);z-index:99999;overflow:hidden;`;

    ui.innerHTML = `
        <div id="drag-handle" style="padding:12px;background:#fe2c55;cursor:move;font-weight:bold;display:flex;justify-content:space-between;user-select:none;">
            <span id="txt-title"></span><span id="txt-sub" style="font-size:9px;border:1px solid white;padding:2px 4px;border-radius:4px;"></span>
        </div>
        <div style="padding:15px;">
            <div style="display:flex;gap:8px;margin-bottom:12px;">
                <select id="sel-read" style="flex:1;background:#222;color:white;border:1px solid #333;padding:5px;border-radius:5px;"></select>
                <select id="sel-write" style="flex:1;background:#222;color:white;border:1px solid #333;padding:5px;border-radius:5px;"></select>
            </div>
            <textarea id="input-box" style="width:100%;min-height:60px;background:#1a1a1a;color:white;border:1px solid #333;border-radius:8px;padding:10px;resize:none;box-sizing:border-box;outline:none;"></textarea>
            <div id="lbl-check" style="font-size:10px;color:#aaa;margin-top:8px;"></div>
            <div id="out-mirror" style="font-size:11px;color:#fff;margin-bottom:10px;font-style:italic;min-height:14px;"></div>
            <div id="lbl-final" style="font-size:10px;color:#aaa;"></div>
            <div id="out-final" style="font-size:12px;color:#00f2ea;margin-bottom:10px;font-weight:bold;min-height:14px;"></div>
            <button id="btn-send" style="width:100%;padding:12px;background:#fe2c55;color:white;border:none;border-radius:8px;font-weight:bold;cursor:pointer;"></button>
        </div>`;
    shadow.appendChild(ui);

    function syncUI() {
        const d = db[state.read] || db.fr;
        shadow.getElementById("txt-title").textContent = d.title;
        shadow.getElementById("txt-sub").textContent = d.sub;
        shadow.getElementById("lbl-check").textContent = d.check + " :";
        shadow.getElementById("lbl-final").textContent = d.final + " :";
        shadow.getElementById("btn-send").textContent = d.send;
        shadow.getElementById("input-box").placeholder = d.ph;

        const s1 = shadow.getElementById("sel-read"); s1.innerHTML = "";
        Object.keys(db).forEach(k => {
            let o = document.createElement("option"); o.value = k; o.textContent = db[k].f + " " + db[k].n;
            if (k === state.read) o.selected = true; s1.appendChild(o);
        });

        const s2 = shadow.getElementById("sel-write"); s2.innerHTML = "";
        Object.keys(db).forEach(k => {
            let o = document.createElement("option"); o.value = k; o.textContent = db[k].f + " " + (d.langs[k] || db[k].n);
            if (k === state.write) o.selected = true; s2.appendChild(o);
        });
    }

    async function callApiFull(t, target) {
        return new Promise(res => {
            if (!t || t.trim().length < 1) return res(null);
            GM_xmlhttpRequest({
                method: "GET", url: `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t&q=${encodeURIComponent(t)}`,
                onload: r => { try { const j = JSON.parse(r.responseText); res({ text: j[0][0][0], src: (j[2] || "??").toUpperCase() }); } catch(e) { res(null); }},
                onerror: () => res(null)
            });
        });
    }

    // PROTECTION 'C'
    const inputBox = shadow.getElementById("input-box");
    ["keydown", "keypress", "keyup"].forEach(ev => inputBox.addEventListener(ev, e => e.stopPropagation(), true));

    syncUI();
    shadow.getElementById("sel-read").onchange = (e) => { state.read = e.target.value; syncUI(); };
    shadow.getElementById("sel-write").onchange = (e) => { state.write = e.target.value; };

    inputBox.oninput = function() {
        if (state.timer) clearTimeout(state.timer);
        state.timer = setTimeout(async () => {
            if (!this.value) return;
            const rF = await callApiFull(this.value, state.write);
            if(rF) shadow.getElementById("out-final").textContent = rF.text;
            const rM = await callApiFull(this.value, state.read);
            if(rM) shadow.getElementById("out-mirror").textContent = rM.text;
        }, 1100);
    };

    // DRAG
    const handle = shadow.getElementById("drag-handle");
    handle.onmousedown = (e) => { state.drag.active = true; state.drag.sx = e.clientX - state.drag.cx; state.drag.sy = e.clientY - state.drag.cy; e.preventDefault(); };
    document.addEventListener("mousemove", e => { if (!state.drag.active) return; state.drag.cx = e.clientX - state.drag.sx; state.drag.cy = e.clientY - state.drag.sy; ui.style.left = state.drag.cx + "px"; ui.style.top = state.drag.cy + "px"; });
    document.addEventListener("mouseup", () => { if (state && state.drag) state.drag.active = false; });

    // SCANNER AVEC BADGES [CODE]
    setInterval(async () => {
        const nodes = [...document.querySelectorAll('[data-e2e*="message"], span.background-color-UIImageOverlayBlackA50')];
        for (let n of nodes) {
            let target = n.querySelector('.break-words') || n.querySelector('[data-e2e*="message-text"]') || n;
            if (target && target.getAttribute('data-last-lang') !== state.read) {
                let raw = target.getAttribute('data-orig') || target.innerText;
                if (!target.getAttribute('data-orig')) target.setAttribute('data-orig', raw);
                let res = await callApiFull(raw, state.read);
                if (res) {
                    target.setAttribute('data-last-lang', state.read);
                    const b = `<span style="background:#fe2c55;color:white;padding:1px 4px;border-radius:3px;font-size:9px;margin-right:5px;font-weight:bold;">${res.src}</span>`;
                    if (n.tagName === "SPAN") target.innerHTML = "🎤 " + b + res.text;
                    else target.innerHTML = `<div style="color:#00f2ea;font-size:0.95em;border-left:3px solid #fe2c55;padding-left:8px;">${b}${res.text}</div><div style="opacity:0.3;font-size:0.8em;">${raw}</div>`;
                }
            }
        }
    }, 2500);

    // ENVOI
    shadow.getElementById("btn-send").onclick = () => {
        const t = shadow.getElementById("out-final").textContent;
        const input = document.querySelector('[contenteditable="plaintext-only"]');
        if (!input || !t) return;
        input.focus(); document.execCommand('insertText', false, t);
        input.dispatchEvent(new Event("input", { bubbles: true }));
        setTimeout(() => {
            const b = document.querySelector('svg path[d*="m21.88"]');
            if (b) b.parentElement.parentElement.click();
            shadow.getElementById("input-box").value = "";
            shadow.getElementById("out-final").textContent = ""; shadow.getElementById("out-mirror").textContent = "";
        }, 400);
    };

})();
