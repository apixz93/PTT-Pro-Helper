(function () {
    'use strict';

// =================================================================
    // ZON 1: KONFIGURASI & TETAPAN (SETTINGS)
    // =================================================================
    
// --- [CONFIGURATION BARU] ---
    const CLOUD_CONFIG = {
        SHEET_ID: "1QqYwT6dmpjX9cR2yO2xO6Wt1vOdwUliQIGu1ifh3C9k", 
        SHEET_GID: "2135866844",
        // [BARU] Link Update Checker untuk user: apixz93
        UPDATE_JSON_URL: "https://raw.githubusercontent.com/apixz93/PTT-Pro-Helper/main/version.json"
    };

    const DEFAULT_SETTINGS = {
        MENU_TITLE: "PTT Pro Helper v15",
        TAG_NAME: "jrptt mohd hafiz",
        FONT_SIZE: "22px",
        REPLY_MAX_HEIGHT: "100px", 
        // Senarai kata kunci diletakkan penuh di sini
        NO_GO_KEYWORDS: "1v1 lol battle royale game,365scores,8 ball pool,agent hunt hitman shooter,amikin survival anime rpg,apptosd,attack hole black hole games,auto brawl chess,autoresponder,avakin life 3d virtual world,avatar world,board kings board dice games,brainly ai homework helper,brawl stars,brick out shoot the ball,bubble pop origin puzzle game,bubble pop puzzle game legend,calc,call of duty,canary mail ai email app,candy crush soda saga,cashman casino slots games,casino,city takeover,computer science calculations,cooking craze restaurant game,cooking live restaurant game,corruption town,crunchyroll,csr 2 realistic drag racing,darts club pvp multiplayer,dawn of ages medieval games,dc dark legion,dlsite,domino dreams,ds pro recover all deleted,dungeon maker,dungeon squad,duskfall turn based rpg,duskwood detective story,eterspire fantasy mmorg,ex astris,faynet home of fairy teens,fight for america country war,flipaclip create 2d animation,flixoid,flo period pregnancy tracker,foundation galactic frontier,frost flame king of avalon,ghost in the mirror,governor of poker,grammarly writing assistant,grok ai assistant,guns of boom online pvp action,guns of glory,gunship,harry potter hogwarts mystery,higgs games island,hiper calc pro,home ai ai interior design,hunt royale action rpg battle,idle paradise island empire,idle wizard tower defense rpg,injustice,jewels magic mystery match3,jiohotstar,june s journey hidden objects,kitaria fables,lego bluey,lego duplo peppa pig,lollipop sweet heroes match3,lyssa goddess of love,macrorify image auto clicker,magis tv,masha and the bear,mighty party,mist survival,misty continent cursed island,modern strike online free pvp fps,modern warships naval battles,moneycontrol,monster hunter puzzles,monster trainer idle rpg,moonvale detective story,mortal kombat,muse dash,mwt tank battles,notewise note taking pdf,notifysave pro,octopath traveler cotc,paradise city building sim,passion pit tropical island,photovoltaic calculations,picsart ai photo editor video,planner 5d home design decor,plex stream movies tv,poker world offline tx holdem,project entropy,pubg,puzzle game legend,qr barcode scanner gold,rally fury extreme racing,raspcontroller,redecor home design game,roblox,run goddess,shin chan shiro coal town,sifting thyme otome visual no,sky combat war planes online,slot,slotomania slots casino games,slots,spotify music and podcasts,state of survival,stella sora,stormshot isle of adventure,survival of goddess,the elder scrolls castles,the seven deadly sins,tiles survive,time until countdown widget,tokyo dark,topfun domino qiuqiu 99 kiukiu,torrent search revolution,tower of god new world,truecaller get real caller id,ultimate usb all in one tool,unmatched ego soccer action,video compressor pro,virtual succubus,voxbox text to speech toolbox,vsco photo video editor,wallpaper 4k hd wallcraft,warships,wattpad read write stories,welcome to paradise island,westland survival cowboy game,whatsapp,word cookies,world of tanks,world of warships blitz,world war heroes ww2 pvp fps,worldbox sandbox god sim,yuppie psycho,グラクロ,コットン,ステラソラ,ハーレム島へようこそ,バーチャル彼女ar,七つの大罪,光と闇の交戦,归龍潮,星塔旅人,白猫プロジェクト,モバイ,ス텔라,스텔라 소라,일곱 개의 대죄 grand cross,콜 오브 듀티 모바일",
        
        // --- [BARIS BARU DIPERLUKAN] ---
        LAST_SYNC: "Never", 

        // 1st Post Templates
        TPL_TESTING: `<div style="text-align: center;"><b><span style="font-size: {{fSize}};"><span style="color: rgb(255, 0, 255);">Under Testing</span> <span style="color: rgb(255, 166, 77);">By</span> <span style="color: rgb(255, 255, 77);">JrPTT</span><br><span style="color: rgb(0, 255, 255);">Mohd Hafiz</span></span></b></div>`,
        TPL_WORKING: `<div style="text-align: center;"><b><span style="font-size: {{fSize}};"><span style="color: rgb(255, 0, 255);">Tested</span> <span style="color: rgb(255, 166, 77);">By</span> <span style="color: rgb(255, 255, 77);">JrPTT</span><br><span style="color: rgb(0, 255, 255);">Mohd Hafiz</span><br><span style="color: rgb(0, 255, 0);">WORKING</span></span></b></div>`,
        TPL_AWAITING: `<div style="text-align: center;"><b><span style="font-size: {{fSize}};"><span style="color: rgb(77, 166, 255);">Awaiting</span> <span style="color: rgb(255, 255, 77);">Retest</span></span></b></div>`,
        
        // Retest JRPTT Templates
        TPL_R_WORK_JR: `...`,
        TPL_R_NOTWORK_JR: `...`,
        TPL_R_OUTDATED_JR: `...`,

        // Retest PTT Templates
        TPL_R_WORK_PTT: `...`,
        TPL_R_NOTWORK_PTT: `...`,
        TPL_R_OUTDATED_PTT: `...`,

        // Admin "Illegal" Template
        TPL_ILLEGAL: `...`
    };

    // =================================================================
    // ZON 2: FUNGSI TERAS & UTILITI (CORE UTILS)
    // Fungsi asas yang digunakan oleh hampir semua fungsi lain.
    // =================================================================

    /**
     * Membaca tetapan dari LocalStorage.
     * 🔗 DIPANGGIL OLEH: createStickyNote, runScanner, pasteHTML, sendTag
     */
    function loadSetting(key) {
        return localStorage.getItem(key) || DEFAULT_SETTINGS[key];
    }

    /**
     * Menyimpan tetapan ke LocalStorage.
     * 🔗 DIPANGGIL OLEH: createSaveButton, autoSubmitCheckbox
     */
    function saveSetting(key, value) {
        localStorage.setItem(key, value);
    }

    /**
     * Memaparkan notifikasi popup kecil di atas skrin.
     * 🔗 DIPANGGIL OLEH: sendTag, doAction, copyLinkAndTitle
     */
    function showToast(message, isError = false) {
        const toast = document.createElement('div');
        toast.innerText = message;
        Object.assign(toast.style, {
            position: 'fixed',
            top: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '10000',
            background: isError ? '#cc0000' : '#4CAF50',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '6px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            fontSize: '14px',
            transition: 'top 0.4s ease, opacity 0.5s ease',
            opacity: '1'
        });
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.top = '20px'; }, 10);
        setTimeout(() => {
            toast.style.top = '-60px';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }

// =================================================================
    // ZON 3: INTERAKSI RANGKAIAN & EDITOR (NETWORK & DOM)
    // =================================================================
/**
     * [VERSI EXTENSION] Guna 'Fetch' sahaja (Sebab tak guna Tampermonkey)
     */
     
     
     
    function syncNoGoFromSheet(manualTrigger = false) {
        if (manualTrigger) showToast("🔄 Connecting to Sheet...", false);
        
        const csvUrl = `https://docs.google.com/spreadsheets/d/${CLOUD_CONFIG.SHEET_ID}/export?format=csv&gid=${CLOUD_CONFIG.SHEET_GID}`;

        fetch(csvUrl)
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.text();
            })
            .then(text => {
                // --- PROSES DATA ---
                let cleanList = text
                    .split(/\r\n|\n/)
                    .map(line => line.split(',')[0]) 
                    .map(item => item.trim().toLowerCase().replace(/"/g, ''))
                    .filter(item => item.length > 1)
                    .filter(item => !item.includes("no go list"))
                    .filter(item => !item.includes("allowed to post"))
                    .filter(item => !item.includes("genre are restricted"))
                    .filter(item => !item.includes("game/app name"))
                    .filter(item => !item.includes("google play"))
                    .join(",");

                saveSetting('NO_GO_KEYWORDS', cleanList);
                
                const now = new Date();
                const timeStr = `${now.getDate()}/${now.getMonth()+1} ${now.getHours()}:${now.getMinutes()}`;
                saveSetting('LAST_SYNC', timeStr);

                if (manualTrigger) {
                    showToast(`✅ Sync Success! List Updated.`);
                    const btnText = document.getElementById('btnSyncText');
                    if(btnText) btnText.innerText = `(Last: ${timeStr})`;
                    setTimeout(() => location.reload(), 1500); 
                }
            })
            .catch(err => {
                console.error("Sync Error:", err);
                if (manualTrigger) showToast("❌ Sync Failed (Network Error)", true);
            });
    }

    /**
     * Menghantar Tag ke server secara background (AJAX).
     * 🔗 DIPANGGIL OLEH: doAction
     */
    function sendTag(type) {
        if (!type) return; 
        const threadIdMatch = location.pathname.match(/\.([0-9]+)\//);
        if (!threadIdMatch) return showToast('❌ Tag Error: Thread ID not found.', true);
        const threadId = threadIdMatch[1];
        const date = new Date();
        const tagName = loadSetting('TAG_NAME'); 
        const fullTags = `day ${String(date.getDate()).padStart(2, '0')} month ${String(date.getMonth() + 1).padStart(2, '0')} ${type.toLowerCase()}
        , ${tagName}`;
        const formData = new FormData();
        const xfToken = document.querySelector('input[name="_xfToken"]')?.value;
        if (!xfToken) return showToast('❌ Tag Error: _xfToken not found.', true);
        formData.append('_xfToken', xfToken);
        formData.append('tags', fullTags);
        formData.append('_xfInlineEdit', '1');
        formData.append('_xfResponseType', 'json');
        formData.append('_xfWithData', '1');
        formData.append('_xfRequestUri', location.pathname);
        fetch(location.origin + `/threads/${threadId}/tags`, {
            method: 'POST',
            body: formData,
            headers: { 'x-requested-with': 'XMLHttpRequest' },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(json => {
            if (json.status !== 'ok') {
                showToast(`❌ Tag Error`, true); console.error(json);
            }
        })
        .catch(err => {
            showToast('❌ Tag Network Error.', true);
            console.error(err);
        });
    }

    /**
     * Mencari kotak teks editor XenForo.
     * 🔗 DIPANGGIL OLEH: pasteHTML
     */
    function getEditableDiv() {
        return document.querySelector(".fr-element[contenteditable='true']");
    }

    /**
     * Menyalin Link Thread semasa ke Clipboard.
     * 🔗 DIPANGGIL OLEH: doAction, Butang 'Copy Link' di createStickyNote
     */
    function copyLinkAndTitle() {
        try {
            const textArea = document.createElement("textarea");
            textArea.value = window.location.href;
            textArea.style.position = "fixed"; textArea.style.top = "0"; textArea.style.left = "0";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch (err) { 
            console.error('Fallback: Oops, unable to copy', err); 
            return false;
        }
    }

    /**
     * Menampal HTML Template ke dalam kotak editor.
     * 🔗 DIPANGGIL OLEH: doAction
     */
    function pasteHTML(htmlTemplateKey, autoSubmit) {
        let editableDiv = getEditableDiv();
        if (editableDiv) {
            let html = loadSetting(htmlTemplateKey);
            const fontSize = loadSetting('FONT_SIZE');
            html = html.replace(/{{fSize}}/g, fontSize); 
            editableDiv.focus();
            document.execCommand("insertHTML", false, html + "<br>");
            if (autoSubmit) {
                setTimeout(() => document.querySelector("button.button--icon--reply")?.click(), 500);
            }
        } else {
            alert("Editable field not found! Click in the reply box first.");
        }
    }

    /**
     * 🔥 FUNGSI UTAMA (MASTER FUNCTION) 🔥
     * Menggabungkan proses: Tampal HTML -> Hantar Tag -> Salin Link.
     * 🔗 DIPANGGIL OLEH: Butang-butang dalam createStickyNote
     */
    function doAction(templateKey, tag, autoCopyLink, customMessage) {
        const autoSubmit = document.getElementById("autoSubmitToggle")?.checked || false;
        pasteHTML(templateKey, autoSubmit);
        if (tag) {
            sendTag(tag);
        }
        if (autoCopyLink) {
            const copied = copyLinkAndTitle();
            if (copied) {
                let msg = customMessage || (tag ? `Tag sent! Link copied!` : `Link copied!`);
                showToast(msg);
            }
        } else if (tag) {
            showToast(`Tag sent: ${tag}`);
        }
    }
/**
     * [BARU] Menyemak update dari GitHub
     */
    function checkUpdate() {
        const currentVer = "15.0"; // Versi semasa skrip (Samakan dengan manifest)

        fetch(CLOUD_CONFIG.UPDATE_JSON_URL)
            .then(res => {
                if (!res.ok) return null;
                return res.json();
            })
            .then(data => {
                if (data && parseFloat(data.version) > parseFloat(currentVer)) {
                    // Jika ada update, papar butang merah di panel utama
                    const updateBtn = document.createElement("button");
                    updateBtn.innerText = `🚀 NEW UPDATE v${data.version}!`;
                    Object.assign(updateBtn.style, {
                        background: "#ff0000", color: "#fff", width: "100%",
                        border: "none", padding: "10px", fontWeight: "bold",
                        cursor: "pointer", animation: "pulse 2s infinite"
                    });
                    
                    updateBtn.onclick = () => {
                        if (confirm(`Versi baru v${data.version} tersedia!\nBuka link download?`)) {
                            window.open(data.url, "_blank");
                        }
                    };

                    // Selitkan di atas tab container panel utama
                    const sticky = document.getElementById("pmStickyNote");
                    const tabContainer = sticky.querySelector("div[style*='border-bottom']");
                    if (sticky && tabContainer) {
                        sticky.insertBefore(updateBtn, tabContainer);
                    }
                }
            })
            .catch(err => console.log("Update check skipped (Network/Config)."));
    }


    // =================================================================
    // ZON 4: PEMBINA UI TETAPAN (SETTINGS UI BUILDERS)
    // Fungsi bantuan untuk membina input di dalam menu Settings.
    // =================================================================

    function createSettingInput(key, label, container) {
        const settingDiv = document.createElement("div");
        const lbl = document.createElement("label");
        lbl.innerText = label;
        lbl.style.fontSize = "12px";
        lbl.style.color = "#00e5ff";
        
        const input = document.createElement("input");
        input.id = `setting_${key}`;
        input.value = loadSetting(key);
        Object.assign(input.style, {
            width: "95%",
            background: "#0a2c4d",
            color: "white",
            border: "1px solid #00e5ff",
            margin: "5px 0"
        });
        
        settingDiv.appendChild(lbl);
        settingDiv.appendChild(input);
        container.appendChild(settingDiv);
    }

    function createSettingTextarea(key, label, container) {
        const settingDiv = document.createElement("div");
        const lbl = document.createElement("label");
        lbl.innerText = label;
        lbl.style.fontSize = "12px";
        lbl.style.color = "#00e5ff";
        
        const textarea = document.createElement("textarea");
        textarea.id = `setting_${key}`;
        textarea.value = loadSetting(key);
        textarea.rows = 5;
        Object.assign(textarea.style, {
            width: "95%",
            background: "#0a2c4d",
            color: "white",
            border: "1px solid #00e5ff",
            margin: "5px 0"
        });
        
        settingDiv.appendChild(lbl);
        settingDiv.appendChild(textarea);
        container.appendChild(settingDiv);
    }

    function createSaveButton(keysToSave, container, onSaveCallback) {
        const saveButton = document.createElement("button");
        saveButton.innerText = "Save Settings";
        Object.assign(saveButton.style, {
            background: "#4CAF50", color: "white", border: "none", padding: "10px",
            borderRadius: "0px", cursor: "pointer", width: "100%", marginTop: "10px"
        });
        
        saveButton.onclick = () => {
            keysToSave.forEach(key => {
                const input = document.getElementById(`setting_${key}`);
                if (input) {
                    saveSetting(key, input.value);
                }
            });
            if (onSaveCallback) onSaveCallback();
            alert("Settings Saved!");
        };
        container.appendChild(saveButton);
    }

    // =================================================================
    // ZON 5: LOGIK SEMAKAN QC (CHECKLIST LOGIC)
    // Mengawal pengaktifan butang berdasarkan checkbox QC.
    // =================================================================

/**
     * Memeriksa status checkbox secara dinamik.
     * Mengira semua checkbox dalam bekas #qcContent.
     * Jika semua ditanda, butang akan dibuka kunci.
     * 🔗 DIPANGGIL OLEH: createCheckbox, Double Tap
     */
    function updateButtonState() {
        // Cari semua checkbox di dalam menu QC
        const allCheckboxes = document.querySelectorAll("#qcContent input[type='checkbox']");
        
        // Jika tiada checkbox langsung, anggap lulus (fail-safe)
        if (allCheckboxes.length === 0) return;

        // Semak adakah SETIAP checkbox telah ditanda (checked)
        const allChecked = Array.from(allCheckboxes).every(box => box.checked);

        const buttonsToLock = document.querySelectorAll('.lockable-button');
        
        buttonsToLock.forEach(btn => {
            if (allChecked) {
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            } else {
                btn.disabled = true;
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
            }
        });
    }

    /**
     * Membina Checkbox untuk menu QC.
     * 🔗 DIPANGGIL OLEH: createQCMenu
     */
    function createCheckbox(id, text, container) {
        const label = document.createElement("label");
        // Font size 12px seperti permintaan sebelum ini
        label.style.fontSize = "12px"; 
        label.style.cursor = "pointer";
        label.style.display = "block";
        label.style.margin = "8px 0 8px 5px";
        label.style.color = "#fff";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = id;
        checkbox.style.marginRight = "8px";
        checkbox.style.verticalAlign = "middle";
        
        checkbox.onchange = updateButtonState;

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(text));
        container.appendChild(label);
    }


    // =================================================================
    // ZON 6: PEMBINA UI UTAMA (MAIN MENU UI)
    // Membina Menu Melekat (Sticky Note) & Menu QC
    // =================================================================

    /**
     * Membina Panel Utama (Tabs, Butang, Settings).
     * 🔗 MEMANGGIL: doAction, createSettingInput, copyLinkAndTitle
     */
    function createStickyNote() {
        let sticky = document.createElement("div");
        sticky.id = "pmStickyNote"; 
        Object.assign(sticky.style, {
            position: "fixed",
            bottom: "20px",
            right: "20px", 
            background: "rgba(10, 44, 77, 0.9)",
            color: "white",
            padding: "10px",
            borderRadius: "0px",
            border: "1px solid #00e5ff",
            boxShadow: "0px 0px 10px rgba(0,229,255,0.5)",
            zIndex: "9999", 
            fontFamily: "Consolas, 'Menlo', monospace",
            transition: "transform 0.3s ease, opacity 0.3s ease",
            width: "240px" 
        });

        const title = document.createElement("div");
        title.id = "pttHelperTitle"; 
        title.innerHTML = `<b>${loadSetting('MENU_TITLE')}</b>`;
        title.style.color = "#00e5ff";
        title.style.textAlign = "center";
        title.style.marginBottom = "5px";
        sticky.appendChild(title);
        // [BARU] Aktifkan Draggable pada Panel Utama menggunakan Tajuk sebagai pemegang
        makeElementDraggable(sticky, title);
        const toggleButton = document.createElement("div");
        toggleButton.innerText = "▼";
        Object.assign(toggleButton.style, {
            position: "absolute",
            top: "-25px",
            left: "5px",
            background: "#0a2c4d",
            color: "#00e5ff",
            padding: "2px 6px",
            borderRadius: "5px 5px 0 0",
            cursor: "pointer",
            fontSize: "20px",
            title: "Show/hide panel"
        });
        sticky.appendChild(toggleButton);
        let isHidden = localStorage.getItem("pmStickyNote_hidden") === "true"; 
        if (isHidden) {
            sticky.style.transform = "translateY(100%)";
            sticky.style.opacity = "0.5";
            toggleButton.innerText = "▲";
        }
        toggleButton.onclick = () => {
            isHidden = !isHidden;
            sticky.style.transform = isHidden ? "translateY(100%)" : "translateY(0)";
            sticky.style.opacity = isHidden ? "0.5" : "1";
            toggleButton.innerText = isHidden ? "▲" : "▼";
            localStorage.setItem("pmStickyNote_hidden", isHidden);
        };
        const tabContainer = document.createElement("div");
        tabContainer.style.borderBottom = "1px solid #00e5ff";
        tabContainer.style.marginBottom = "5px";
        sticky.appendChild(tabContainer);
        const tabContentContainer = document.createElement("div");
        Object.assign(tabContentContainer.style, {
            maxHeight: "350px", 
            overflowY: "auto",  
            overflowX: "hidden" 
        });
        sticky.appendChild(tabContentContainer);
        const tabs = [];
        const tabContents = [];
        function createTab(name) {
            const tab = document.createElement("button");
            tab.innerText = name;
            Object.assign(tab.style, {
                background: "none",
                border: "none",
                color: "#888",
                padding: "5px 8px",
                cursor: "pointer",
                fontSize: "12px",
                fontFamily: "Consolas, 'Menlo', monospace",
            });
            const content = document.createElement("div");
            content.style.display = "none"; 
            tab.onclick = () => {
                tabs.forEach(t => t.style.color = "#888");
                tabContents.forEach(c => c.style.display = "none");
                tab.style.color = "#00e5ff";
                content.style.display = "block";
            };
            tabs.push(tab);
            tabContents.push(content);
            tabContainer.appendChild(tab);
            tabContentContainer.appendChild(content);
            return content; 
        }

        const tab1stPost = createTab("1st Post");
        const tabRetest = createTab("Retest");
        const tabNoGo = createTab("No-Go");
        const tabUtility = createTab("Utility");
        const tabSettings = createTab("Settings"); 

        const firstPostButtons = [
            { text: "🔄 Testing", color: "orange", action: () => doAction('TPL_TESTING', null, false) },
            { text: "✅ Working", color: "#4CAF50", action: () => doAction('TPL_WORKING', 'Working', true) },
            { text: "⏳ Awaiting", color: "blue", action: () => doAction('TPL_AWAITING', null, true) },
            { text: "🚫 Illegal", color: "#800000", action: () => doAction('TPL_ILLEGAL', 'Outdated', true, "Illegal Mod! Link Copied!") }
        ];
        const retestButtons = [
            { text: "✅ R-Work (Jr)", color: "#4CAF50", action: () => doAction('TPL_R_WORK_JR', 'Working', true) },
            { text: "✅ R-Work (PTT)", color: "#4CAF50", action: () => doAction('TPL_R_WORK_PTT', 'Working', true) },
            { text: "❌ R-Not (Jr)", color: "#f44336", action: () => doAction('TPL_R_NOTWORK_JR', 'Not working', true) },
            { text: "❌ R-Not (PTT)", color: "#f44336", action: () => doAction('TPL_R_NOTWORK_PTT', 'Not working',true) },
            { text: "📅 R-Out (Jr)", color: "#E91E63", action: () => doAction('TPL_R_OUTDATED_JR', 'Outdated', true) },
            { text: "📅 R-Out (PTT)", color: "#E91E63", action: () => doAction('TPL_R_OUTDATED_PTT', 'Outdated', true) }
        ];
        const utilButtons = [
             { text: "📋 Copy Link", color: "gray", action: () => { if(copyLinkAndTitle()) showToast("Link copied!"); } },
             // --- BUTANG BARU UNTUK PHONE ---
             { text: "👁️ QC Menu", color: "#2196F3", action: () => { 
                 const qc = document.getElementById("qcStickyNote");
                 if (qc) {
                     // Check status semasa: Sembunyi atau Nampak?
                     const isHidden = qc.style.display === "none" || qc.style.opacity === "0";
                     
                     if (isHidden) {
                         // PAKSA MUNCUL
                         qc.style.display = "block";
                         qc.style.opacity = "1";
                         qc.style.pointerEvents = "auto";
                         localStorage.setItem("qcStickyNote_hidden", "false");
                         showToast("QC Menu: Shown");
                     } else {
                         // SOROK
                         qc.style.display = "none";
                         localStorage.setItem("qcStickyNote_hidden", "true");
                         showToast("QC Menu: Hidden");
                     }
                 }
             }}
        ];
        const lockableButtonTexts = [
            "✅ Working", 
            "✅ R-Work (Jr)", "✅ R-Work (PTT)", 
            "❌ R-Not (Jr)", "❌ R-Not (PTT)", 
            "📅 R-Out (Jr)", "📅 R-Out (PTT)"
        ];
        const addButtons = (buttonList, container, width) => {
             buttonList.forEach(btn => {
                let button = document.createElement("button");
                button.innerText = btn.text;
                Object.assign(button.style, {
                    margin: "4px",
                    background: btn.color,
                    color: "white",
                    border: "1px solid #555",
                    padding: "7px 4px",
                    borderRadius: "0px",
                    cursor: "pointer",
                    display: "inline-block",
                    width: width, 
                    textAlign: "center",
                    fontSize: "10px",
                    fontFamily: "Consolas, 'Menlo', monospace",
                    fontWeight: "bold"
                });
                
                if (lockableButtonTexts.includes(btn.text)) {
                    button.classList.add('lockable-button');
                }
                
                button.onclick = btn.action;
                container.appendChild(button);
            });
        };

        const firstPostPairs = [
            [firstPostButtons[0], firstPostButtons[1]],
            [firstPostButtons[2], firstPostButtons[3]]
        ];
        firstPostPairs.forEach(pair => {
            const row = document.createElement("div");
            Object.assign(row.style, { display: "flex", justifyContent: "center" });
            addButtons(pair, row, "105px");
            tab1stPost.appendChild(row);
        });
        const retestPairs = [
            [retestButtons[0], retestButtons[1]],
            [retestButtons[2], retestButtons[3]],
            [retestButtons[4], retestButtons[5]]
        ];
        retestPairs.forEach(pair => {
            const row = document.createElement("div");
            Object.assign(row.style, { display: "flex", justifyContent: "center" });
            addButtons(pair, row, "105px");
            tabRetest.appendChild(row);
        });
        
        addButtons(utilButtons, tabUtility, "218px"); 
        createSettingTextarea('NO_GO_KEYWORDS', 'No-Go List (comma-separated)', tabNoGo);
        createSaveButton(['NO_GO_KEYWORDS'], tabNoGo, () => alert("No-Go List Saved!"));
        
        createSettingInput('MENU_TITLE', 'Menu Title', tabSettings); 
        createSettingInput('TAG_NAME', 'Your Tag Name (all lowercase)', tabSettings);
        createSettingInput('FONT_SIZE', 'Font Size (e.g., 22px)', tabSettings);
        createSettingInput('REPLY_MAX_HEIGHT', 'Max Reply Height (e.g., 100px)', tabSettings);
        const tplLabel = document.createElement("div");
        tplLabel.innerText = "Templates ({{fSize}} will be replaced by Font Size)";
        tplLabel.style.fontSize = "10px";
        tplLabel.style.color = "#888";
        tplLabel.style.marginTop = "10px";
        tabSettings.appendChild(tplLabel);
        createSettingTextarea('TPL_TESTING', 'Testing', tabSettings);
        createSettingTextarea('TPL_WORKING', 'Working', tabSettings);
        createSettingTextarea('TPL_AWAITING', 'Awaiting', tabSettings);
        createSettingTextarea('TPL_ILLEGAL', 'Illegal', tabSettings);
        createSettingTextarea('TPL_R_WORK_JR', 'Retest Work (JrPTT)', tabSettings);
        createSettingTextarea('TPL_R_NOTWORK_JR', 'Retest Not Work (JrPTT)', tabSettings);
        createSettingTextarea('TPL_R_OUTDATED_JR', 'Retest Outdated (JrPTT)', tabSettings);
        createSettingTextarea('TPL_R_WORK_PTT', 'Retest Work (PTT)', tabSettings);
        createSettingTextarea('TPL_R_NOTWORK_PTT', 'Retest Not Work (PTT)', tabSettings);
        createSettingTextarea('TPL_R_OUTDATED_PTT', 'Retest Outdated (PTT)', tabSettings);

        // --- [MULA KOD BUTANG SYNC BARU] ---
        const btnSync = document.createElement("button");
        const lastSyncDate = loadSetting('LAST_SYNC') || "Never";
        
        btnSync.innerHTML = `🔄 Force Sync Database <br><span id='btnSyncText' style='font-size:9px'>(Last: ${lastSyncDate})</span>`;
        
        Object.assign(btnSync.style, {
            background: "#2196F3", color: "white", border: "none", padding: "8px",
            width: "100%", marginBottom: "5px", cursor: "pointer"
        });
        
        btnSync.onclick = () => syncNoGoFromSheet(true); // Bila tekan, dia sync manual
        tabSettings.appendChild(btnSync);
        // --- [TAMAT KOD BUTANG SYNC BARU] ---

        // --- 1. BUTANG SAVE (ASAL) ---
        createSaveButton(Object.keys(DEFAULT_SETTINGS), tabSettings, () => {
            document.getElementById("pttHelperTitle").innerHTML = `<b>${loadSetting('MENU_TITLE')}</b>`;
            applyMaxHeight(); 
            showToast("Settings Saved!", false); 
        });

        // --- 2. DATA MANAGEMENT CONTAINER (BARU) ---
        const dataMgrDiv = document.createElement("div");
        dataMgrDiv.style.marginTop = "10px";
        dataMgrDiv.style.borderTop = "1px dashed #00e5ff";
        dataMgrDiv.style.paddingTop = "5px";
        dataMgrDiv.style.display = "flex";
        dataMgrDiv.style.gap = "5px";

        // --- 3. BUTANG EXPORT (BACKUP) ---
        const btnExport = document.createElement("button");
        btnExport.innerText = "📤 Export Config";
        Object.assign(btnExport.style, {
            flex: "1", background: "#2196F3", color: "white", border: "none", 
            padding: "8px", cursor: "pointer", fontSize: "11px"
        });
        btnExport.onclick = () => {
            const config = {};
            Object.keys(DEFAULT_SETTINGS).forEach(key => {
                config[key] = localStorage.getItem(key) || DEFAULT_SETTINGS[key];
            });
            const jsonStr = JSON.stringify(config);
            
            // Cuba copy ke clipboard
            try {
                navigator.clipboard.writeText(jsonStr).then(() => {
                    showToast("Config copied to Clipboard!");
                }).catch(() => {
                    // Fallback kalau clipboard API block
                    prompt("Copy kod ini manually:", jsonStr);
                });
            } catch (e) {
                prompt("Copy kod ini manually:", jsonStr);
            }
        };

        // --- 4. BUTANG IMPORT (RESTORE) ---
        const btnImport = document.createElement("button");
        btnImport.innerText = "📥 Import Config";
        Object.assign(btnImport.style, {
            flex: "1", background: "#FF9800", color: "white", border: "none", 
            padding: "8px", cursor: "pointer", fontSize: "11px"
        });
        btnImport.onclick = () => {
            const inputStr = prompt("Paste Config JSON di sini:");
            if (!inputStr) return;
            try {
                const config = JSON.parse(inputStr);
                let count = 0;
                Object.keys(config).forEach(key => {
                    if (DEFAULT_SETTINGS.hasOwnProperty(key)) {
                        localStorage.setItem(key, config[key]);
                        count++;
                    }
                });
                alert(`Berjaya restore ${count} tetapan! Halaman akan refresh.`);
                location.reload();
            } catch (e) {
                alert("❌ Error: Format JSON tidak sah!");
            }
        };

        dataMgrDiv.appendChild(btnExport);
        dataMgrDiv.appendChild(btnImport);
        tabSettings.appendChild(dataMgrDiv);

// --- 5. AUTO SUBMIT CHECKBOX (Kod Baru Di Sini) ---
        const autoSubmitCheckbox = document.createElement("input");
        autoSubmitCheckbox.type = "checkbox";
        autoSubmitCheckbox.id = "autoSubmitToggle";
        // Baca setting terus dari LocalStorage
        autoSubmitCheckbox.checked = localStorage.getItem("autoSubmit") === "true";
        autoSubmitCheckbox.style.margin = "5px";
        autoSubmitCheckbox.style.verticalAlign = "middle"; 
        
        autoSubmitCheckbox.onchange = () => {
            localStorage.setItem("autoSubmit", autoSubmitCheckbox.checked);
            // Tambahan: Toast supaya nampak status bila tekan
            const status = autoSubmitCheckbox.checked ? "ON" : "OFF";
            showToast(`Auto-Submit: ${status}`);
        };

        const label = document.createElement("label");
        label.style.fontSize = "12px";
        label.style.marginLeft = "5px";
        label.style.cursor = "pointer";
        label.style.marginTop = "8px";
        label.style.display = "block";
        label.title = "Automatically submit after inserting BBCode";
        label.appendChild(autoSubmitCheckbox);
        label.appendChild(document.createTextNode(" Auto submit"));
        label.style.color = "#00e5ff";
        sticky.appendChild(label); 

        document.body.appendChild(sticky);
        tabs[0].click(); 
    }

 /**
     * Membina Menu QC Checklist di sebelah kanan.
     * 🔗 MEMANGGIL: createCheckbox
     */
    function createQCMenu() {
        let qcSticky = document.createElement("div");
        qcSticky.id = "qcStickyNote"; 
        
        Object.assign(qcSticky.style, {
            position: "fixed",
            top: "100px",    
            right: "20px",   
            background: "rgba(10, 44, 77, 0.9)",
            color: "white",
            padding: "10px",
            borderRadius: "0px",
            border: "1px solid #4CAF50", 
            boxShadow: "0px 0px 10px rgba(76,175,80,0.5)",
            zIndex: "9998", 
            fontFamily: "Consolas, 'Menlo', monospace",
            transition: "transform 0.3s ease, opacity 0.3s ease",
            width: "240px" 
        });

        // --- [BARU] Butang Toggle Minimize (▼) ---
        const toggleButton = document.createElement("div");
        toggleButton.innerText = "▼";
        Object.assign(toggleButton.style, {
            position: "absolute",
            top: "-25px",
            left: "0", 
            background: "#4CAF50", // Warna hijau ikut tema QC
            color: "white",
            padding: "2px 8px",
            borderRadius: "5px 5px 0 0",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold"
        });
        qcSticky.appendChild(toggleButton);

        const title = document.createElement("div");
        title.innerHTML = `<b>Mandatory QC Checklist</b>`;
        Object.assign(title.style, {
            color: "#4CAF50",
            textAlign: "center",
            marginBottom: "5px",
            cursor: "pointer", 
            userSelect: "none"
        });
        
        // Double Tap Title -> Select All
        title.ondblclick = () => {
            const boxes = document.querySelectorAll("#qcContent input[type='checkbox']");
            boxes.forEach(box => {
                box.checked = true;
                if (box.onchange) box.onchange(); 
            });
            showToast("✅ QC Checklist Completed!");
        };

        qcSticky.appendChild(title);
        
        const qcContent = document.createElement("div");
        qcContent.id = "qcContent";
        qcSticky.appendChild(qcContent);

        // Logic Minimize/Expand
        let isMinimized = localStorage.getItem("qc_minimized") === "true";
        
        function applyState() {
            if (isMinimized) {
                qcContent.style.display = "none";
                toggleButton.innerText = "▲";
                qcSticky.style.opacity = "0.8"; // Kurangkan opacity bila minimize
            } else {
                qcContent.style.display = "block";
                toggleButton.innerText = "▼";
                qcSticky.style.opacity = "1";
            }
        }

        toggleButton.onclick = () => {
            isMinimized = !isMinimized;
            localStorage.setItem("qc_minimized", isMinimized);
            applyState();
        };

        // Apply state awal (ingat setting user)
        applyState();

        createCheckbox("checklist_playstore", "Play Store Link", qcContent);
        createCheckbox("checklist_description", "Description", qcContent);
        createCheckbox("checklist_download", "Download Link", qcContent);
        createCheckbox("checklist_screenshot", "Screenshot", qcContent);

        document.body.appendChild(qcSticky);
    }
    

// =================================================================
    // ZON 7: FUNGSI SOKONGAN GLOBAL (GLOBAL HELPERS)
    // Fungsi yang berjalan di latar belakang (Scanner & Layout)
    // =================================================================

    function applyMaxHeight() {
        const maxHeight = loadSetting('REPLY_MAX_HEIGHT');
        const elements = document.querySelectorAll("div.fr-element.fr-view.fr-element-scroll-visible");
        elements.forEach(el => {
            el.style.maxHeight = maxHeight;
            el.style.overflow = "auto"; 
        });
    }

    // --- [GANTI KOD INI DI ZON 7 (BAWAH SEKALI)] ---

    function runScanner() {
        // Ambil senarai No-Go
        const noGoKeywords = loadSetting('NO_GO_KEYWORDS').toLowerCase().split(',');
        let foundNoGo = [];
        let firstDetectedID = null; // ID untuk lokasi pertama jumpa

        // Fungsi kecil untuk warnakan teks & letak ID sauh (anchor)
        function highlightText(element, keyword) {
            if (!element) return;
            try {
                const innerHTML = element.innerHTML;
                const regex = new RegExp(`(${keyword})`, "gi");
                
                // Jika jumpa keyword & belum warna kuning
                if (!innerHTML.includes('background:yellow') && element.textContent.toLowerCase().includes(keyword)) {
                    // Cipta ID unik jika belum ada anchor
                    const anchorID = firstDetectedID ? "" : 'id="nogo_target"'; 
                    if (!firstDetectedID) firstDetectedID = "nogo_target";

                    // Replace text dengan Highlight Span + ID
                    element.innerHTML = innerHTML.replace(regex, `<span ${anchorID} style="background:yellow;color:red;font-weight:bold;padding:2px;border:2px solid red;">$1</span>`);
                }
            } catch (e) { console.log("Skip regex error:", keyword); }
        }

        // 1. Scan Tajuk Thread
        const threadTitleEl = document.querySelector('.p-title-value');
        if (threadTitleEl) {
            noGoKeywords.forEach(kw => {
                const cleanKw = kw.trim();
                if (cleanKw.length > 1 && threadTitleEl.textContent.toLowerCase().includes(cleanKw)) {
                    foundNoGo.push(cleanKw);
                    highlightText(threadTitleEl, cleanKw);
                }
            });
        }

        // 2. Scan Post Pertama
        const firstPostEl = document.querySelector('.message-content');
        if (firstPostEl) {
            noGoKeywords.forEach(kw => {
                const cleanKw = kw.trim();
                if (cleanKw.length > 1 && firstPostEl.textContent.toLowerCase().includes(cleanKw)) {
                    foundNoGo.push(cleanKw);
                    highlightText(firstPostEl, cleanKw);
                }
            });
        }

        // 3. Papar Warning Bar (Jika jumpa) - BOLEH TEKAN!
        if (foundNoGo.length > 0) {
            const warningBar = document.createElement('div');
            const uniqueFound = [...new Set(foundNoGo)];
            
            warningBar.innerHTML = `
                <div style="cursor:pointer; display:flex; justify-content:center; align-items:center; gap:10px;">
                    <span style="font-size:20px;">⚠️</span>
                    <div>
                        <b>NO-GO DETECTED!</b> (Click to Find)<br>
                        <span style="font-size:12px;">Keywords: ${uniqueFound.join(', ')}</span>
                    </div>
                </div>`;
            
            Object.assign(warningBar.style, {
                background: "#cc0000", color: "white", textAlign: "center",
                padding: "10px", fontSize: "16px", position: "sticky", top: "0",
                zIndex: "99999", borderBottom: "3px solid yellow", 
                boxShadow: "0 5px 15px rgba(0,0,0,0.5)", cursor: "pointer"
            });

            // [BARU] Fungsi Scroll ke lokasi bila ditekan
            warningBar.onclick = () => {
                const target = document.getElementById("nogo_target");
                if (target) {
                    target.scrollIntoView({behavior: "smooth", block: "center"});
                    // Tambah efek berkelip supaya user nampak
                    target.style.transition = "0.2s";
                    let flash = 0;
                    const interval = setInterval(() => {
                        target.style.opacity = (flash % 2 === 0) ? "0.2" : "1";
                        flash++;
                        if (flash > 5) { clearInterval(interval); target.style.opacity = "1"; }
                    }, 200);
                } else {
                    showToast("Error: Text location hidden/collapsed.");
                }
            };

            document.body.prepend(warningBar);
        }

        // Auto-sync
        syncNoGoFromSheet(false);
    }

/**
     * [BARU] Menjadikan elemen boleh diseret (Draggable)
     * Menyokong Mouse (PC) dan Touch (Mobile/Kiwi)
     */
    function makeElementDraggable(elmnt, handle) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        // Guna handle (tajuk) untuk drag, jika tiada handle, guna seluruh elemen
        const dragger = handle || elmnt;
        dragger.style.cursor = "move";

        dragger.onmousedown = dragMouseDown;
        dragger.ontouchstart = dragMouseDown; // Support Mobile

        function dragMouseDown(e) {
            // Elak conflict dengan text selection
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            // Dapatkan posisi cursor awal (Touch atau Mouse)
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            pos3 = clientX;
            pos4 = clientY;
            
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            
            // Mobile events
            document.ontouchend = closeDragElement;
            document.ontouchmove = elementDrag;
        }

        function elementDrag(e) {
            e.preventDefault();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            // Kira pergerakan kursor
            pos1 = pos3 - clientX;
            pos2 = pos4 - clientY;
            pos3 = clientX;
            pos4 = clientY;

            // Tetapkan posisi baru
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            
            // Reset 'bottom' dan 'right' supaya tidak conflict dengan CSS asal
            elmnt.style.bottom = "auto";
            elmnt.style.right = "auto";
        }

        function closeDragElement() {
            // Berhenti gerak bila lepas mouse/jari
            document.onmouseup = null;
            document.onmousemove = null;
            document.ontouchend = null;
            document.ontouchmove = null;
        }
    }

    // =================================================================
    // ZON 8: EVENT LISTENERS & SENSORS (INPUT & VIEWPORT)
    // Mengawal papan kekunci (PC) dan keyboard maya (Mobile)
    // =================================================================

    // A. Mobile Keyboard Sensor (Visual Viewport API)
    if (window.visualViewport) {
        const handleResize = () => {
            const sticky = document.getElementById("pmStickyNote");
            const qc = document.getElementById("qcStickyNote");
            if (!sticky) return;

            const vH = window.visualViewport.height; 
            const wH = window.innerHeight;           
            
            // Jika viewport < 85%, anggap keyboard sedang NAIK
            const isKeyboardUp = vH < (wH * 0.85);

            if (isKeyboardUp) {
                // Mod Menaip: Naikkan panel, sorok QC
                sticky.style.top = "10px";
                sticky.style.bottom = "auto";
                sticky.style.opacity = "0.9";
                if (qc) qc.style.display = "none";

            } else {
                // Mod Biasa: Turunkan panel, restore QC
                sticky.style.top = "auto";
                sticky.style.bottom = "20px";
                const isStickyHidden = localStorage.getItem("pmStickyNote_hidden") === "true";
                sticky.style.opacity = isStickyHidden ? "0.5" : "1";

                // Restore QC Menu (Hanya jika user tak sorok manual)
                if (qc) {
                    const userPrefersHidden = localStorage.getItem("qcStickyNote_hidden") === "true";
                    if (!userPrefersHidden) {
                        qc.style.display = "block";
                        qc.style.opacity = "1";
                        qc.style.pointerEvents = "auto";
                    }
                }
            }
        };
        window.visualViewport.addEventListener('resize', handleResize);
        window.visualViewport.addEventListener('scroll', handleResize);
    }

    // B. PC/Bluetooth Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        // 1. Alt + S: Toggle Auto-Submit
        if (e.altKey && (e.key === 's' || e.key === 'S')) {
            e.preventDefault();
            const chk = document.getElementById("autoSubmitToggle");
            if (chk) {
                chk.checked = !chk.checked;
                localStorage.setItem("autoSubmit", chk.checked);
                const status = chk.checked ? "ON" : "OFF";
                showToast(`Auto-Submit: ${status}`, !chk.checked);
            }
        }

        // 2. Alt + Q: Toggle QC Panel
        if (e.altKey && (e.key === 'q' || e.key === 'Q')) {
            e.preventDefault();
            const qcPanel = document.getElementById("qcStickyNote");
            if (qcPanel) {
                const isHidden = qcPanel.style.display === "none";
                qcPanel.style.display = isHidden ? "block" : "none";
                localStorage.setItem("qcStickyNote_hidden", !isHidden);
                showToast(`QC Panel: ${isHidden ? "Visible" : "Hidden"}`);
            }
        }

        // 3. Esc: Panic Button (Tutup Semua)
        if (e.key === 'Escape') {
            const sticky = document.getElementById("pmStickyNote");
            if (sticky) {
                sticky.style.transform = "translateY(100%)";
                sticky.style.opacity = "0.5";
                const toggleBtn = sticky.querySelector("div[title='Show/hide panel']");
                if (toggleBtn) toggleBtn.innerText = "▲";
                localStorage.setItem("pmStickyNote_hidden", "true");
            }
            const qcPanel = document.getElementById("qcStickyNote");
            if (qcPanel) {
                qcPanel.style.display = "none";
                localStorage.setItem("qcStickyNote_hidden", "true");
            }
            showToast("All Panels Hidden (Esc)");
        }
    });

    // =================================================================
    // ZON 9: INISIALISASI (START ENGINE)
    // Mula jalankan skrip
    // =================================================================

    createStickyNote(); 
    createQCMenu();     
    
    // Jalankan sekali pada permulaan
    applyMaxHeight();
    runScanner();
    updateButtonState(); 
    
    checkUpdate(); // [BARU] Jalankan semakan update

    // Pantau perubahan DOM (untuk dynamic content loading)
    const observer = new MutationObserver(applyMaxHeight);
    observer.observe(document.body, { childList: true, subtree: true });

})();
