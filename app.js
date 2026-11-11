
const categories = {
  personal: {hint:"A personal note to someone special.",subject:"A note from the heart",greeting:"প্রিয় মানুষ,",message:"অনেকদিন ধরে কিছু কথা তোমাকে বলতে চাচ্ছিলাম। ব্যস্ততার মাঝে হয়তো সবসময় বলা হয়ে ওঠে না। আশা করি তুমি ভালো আছো। সময় পেলে উত্তর দিও।",closing:"ইতি,"},
  love: {hint:"Say what your heart has been holding.",subject:"তোমার জন্য কিছু কথা",greeting:"প্রিয়তম / প্রিয়তমা,",message:"তোমাকে নিয়ে আমার অনুভূতিগুলো হয়তো শব্দে পুরোপুরি বোঝানো সম্ভব নয়। তবুও বলতে চাই, তুমি আমার প্রতিটি সাধারণ দিনকে অসাধারণ করে তুলো। তোমার হাসি, তোমার কথা—সবকিছুই আমার কাছে অনেক মূল্যবান।",closing:"অনেক ভালোবাসা,"},
  invitation: {hint:"Invite someone to share a special moment.",subject:"You are cordially invited",greeting:"প্রিয় [নাম],",message:"আমাদের বিশেষ আয়োজনে তোমাকে সাদর আমন্ত্রণ জানাচ্ছি। তোমার উপস্থিতি আমাদের আনন্দকে আরও পূর্ণ করবে।\n\nতারিখ: [তারিখ]\nসময়: [সময়]\nস্থান: [ভেন্যু]\n\nসময় করে অবশ্যই এসো।",closing:"সাদর আমন্ত্রণে,"},
  birthday: {hint:"Make their birthday feel extra special.",subject:"শুভ জন্মদিন!",greeting:"প্রিয় [নাম],",message:"শুভ জন্মদিন! তোমার জীবনের প্রতিটি দিন আনন্দ, ভালোবাসা ও সাফল্যে ভরে উঠুক। নতুন বছরটি তোমার জন্য বয়ে আনুক অনেক সুন্দর মুহূর্ত। সবসময় হাসিখুশি থেকো।",closing:"অনেক শুভকামনায়,"},
  thanks: {hint:"Express gratitude with a thoughtful note.",subject:"হৃদয়ের গভীর থেকে ধন্যবাদ",greeting:"প্রিয় [নাম],",message:"তোমার সহযোগিতা, সময় এবং আন্তরিকতার জন্য আমি সত্যিই কৃতজ্ঞ। তোমার এই সুন্দর ব্যবহার আমার কাছে অনেক মূল্যবান। পাশে থাকার জন্য অসংখ্য ধন্যবাদ।",closing:"কৃতজ্ঞতায়,"},
  apology: {hint:"A sincere apology, written with care.",subject:"আমার আন্তরিক দুঃখ প্রকাশ",greeting:"প্রিয় [নাম],",message:"আমার কোনো কথা বা কাজে তুমি কষ্ট পেয়ে থাকলে আমি আন্তরিকভাবে দুঃখিত। তোমাকে কষ্ট দেওয়া আমার উদ্দেশ্য ছিল না। আমি আমার ভুল বুঝতে পেরেছি এবং ভবিষ্যতে আরও সচেতন থাকার চেষ্টা করব। আশা করি আমাকে ক্ষমা করার সুযোগ দেবে।",closing:"ক্ষমাপ্রার্থী,"},
  friendship: {hint:"A little reminder for a wonderful friend.",subject:"বন্ধুত্বের কিছু কথা",greeting:"প্রিয় বন্ধু,",message:"জীবনের অনেক মুহূর্তে তোমার মতো একজন বন্ধু পাশে পাওয়া সত্যিই সৌভাগ্যের। হাসি, গল্প, দুষ্টুমি—সব স্মৃতিই আমার কাছে অমূল্য। দূরত্ব যতই হোক, আমাদের বন্ধুত্ব সবসময় এমনই থাকুক।",closing:"তোর বন্ধু,"},
  custom: {hint:"Start with a blank page and make it yours.",subject:"",greeting:"প্রিয়,",message:"",closing:"ইতি,"}
};

const $ = id => document.getElementById(id);

let selectedCategory = "personal";
let isOpen = false;

// Encode Unicode letter data for sharing
function encodeLetter(data) {
  const bytes = new TextEncoder().encode(JSON.stringify(data));
  let binary = "";
  bytes.forEach(byte => binary += String.fromCharCode(byte));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeLetter(encoded) {
  const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

// Check whether this is a shared-letter page
function showSharedLetter() {
  const hash = window.location.hash;

  if (!hash.startsWith("#letter=")) return false;

  try {
    const data = decodeLetter(hash.substring(8));
    renderSharedLetter(data);
    return true;
  } catch (error) {
    document.body.innerHTML = "<h2 style='text-align:center;margin-top:100px'>Sorry! This letter link is invalid.</h2>";
    return true;
  }
}

// Display only the letter to the recipient
function renderSharedLetter(data) {
  document.title = "A Letter For You ♡";

  document.body.innerHTML = `
    <style>
      *{box-sizing:border-box}
      body{
        margin:0;min-height:100vh;
        background:radial-gradient(circle at top,#59372b,#21130f);
        display:flex;align-items:center;justify-content:center;
        padding:25px;font-family:Georgia,serif;color:#493126;
      }
      .shared-wrap{width:100%;max-width:650px;text-align:center}
      .shared-title{color:#f5dfb9;margin-bottom:35px;font-size:24px}
      .shared-envelope{
        position:relative;width:min(100%,420px);height:290px;
        margin:0 auto;cursor:pointer;perspective:1000px;
      }
      .shared-paper{
        position:absolute;left:8%;width:84%;height:245px;
        bottom:25px;background:#fff8eb;padding:28px 25px;
        text-align:left;overflow:auto;z-index:2;
        transition:transform .9s ease,bottom .9s ease;
        box-shadow:0 4px 18px #0002;
      }
      .shared-paper h2{font-size:23px;margin:12px 0}
      .shared-paper p{white-space:pre-wrap;line-height:1.8;font-size:15px}
      .shared-paper .closing{margin-top:20px}
      .shared-back{
        position:absolute;inset:0;background:#d4b98d;
        clip-path:polygon(0 0,100% 0,100% 100%,0 100%);
        z-index:1;
      }
      .shared-front{
        position:absolute;inset:0;z-index:3;
        background:#c5a477;
        clip-path:polygon(0 0,50% 62%,100% 0,100% 100%,0 100%);
      }
      .shared-flap{
        position:absolute;inset:0;z-index:4;
        background:#e3c99e;
        clip-path:polygon(0 0,100% 0,50% 55%);
        transform-origin:top;transition:transform .7s;
      }
      .shared-envelope.open .shared-flap{
        transform:rotateX(180deg);z-index:0;
      }
      .shared-envelope.open .shared-paper{
        transform:translateY(-180px);bottom:25px;z-index:5;
      }
      .shared-hint{color:#f4d8ad;margin-top:35px;font-size:14px}
      .shared-from{font-weight:bold}
      @media(max-width:480px){
        .shared-envelope{height:260px}
        .shared-paper{height:220px;padding:20px}
        .shared-paper h2{font-size:19px}
      }
    </style>

    <main class="shared-wrap">
      <div class="shared-title">♡ A Special Letter For You ♡</div>

      <div class="shared-envelope" id="sharedEnvelope">
        <div class="shared-back"></div>

        <article class="shared-paper">
          <div style="font-size:13px;color:#ad8b61">WITH WARMTH ♡</div>
          <p>${escapeHTML(data.greeting)}</p>
          <h2>${escapeHTML(data.subject)}</h2>
          <p>${escapeHTML(data.message)}</p>
          <p class="closing">
            ${escapeHTML(data.closing)}<br>
            <span class="shared-from">${escapeHTML(data.from)}</span>
          </p>
        </article>

        <div class="shared-flap"></div>
        <div class="shared-front"></div>
      </div>

      <div class="shared-hint" id="sharedHint">
        Tap the envelope to open your letter ♡
      </div>
    </main>
  `;

  const envelope = document.getElementById("sharedEnvelope");
  const hint = document.getElementById("sharedHint");

  envelope.addEventListener("click", () => {
    envelope.classList.toggle("open");
    hint.textContent = envelope.classList.contains("open")
      ? "A little message, just for you ♡"
      : "Tap the envelope to open your letter ♡";
  });
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#39;"
  })[char]);
}

// Stop editor from loading on recipient view
if (!showSharedLetter()) {

  function getLetterText() {
    const to = $("toName").value.trim() || "প্রিয় মানুষ";
    const from = $("fromName").value.trim() || "আপনার নাম";

    return `${$("greeting").value || "প্রিয়,"}\n\n${$("subject").value ? $("subject").value + "\n\n" : ""}${$("message").value}\n\n${$("closing").value}\n${from}\n\nপ্রাপক: ${to}`;
  }

  function getLetterData() {
    return {
      to: $("toName").value.trim() || "প্রিয় মানুষ",
      from: $("fromName").value.trim() || "আপনার নাম",
      subject: $("subject").value,
      greeting: $("greeting").value,
      message: $("message").value,
      closing: $("closing").value,
      theme: $("theme").value
    };
  }

  function updatePreview() {
    $("previewTo").textContent = $("greeting").value || "প্রিয় মানুষ,";
    $("previewSubject").textContent = $("subject").value || "A note from the heart";
    $("previewMessage").textContent = $("message").value || "আপনার মনের কথাগুলো এখানে দেখা যাবে। বাম পাশের ফর্মে লিখতে শুরু করুন।";
    $("previewClosing").childNodes[0].textContent = ($("closing").value || "ইতি,") + "\n";
    $("previewFrom").textContent = $("fromName").value || "আপনার নাম";
    $("charCount").textContent = $("message").value.length;
  }

  function selectCategory(name) {
    selectedCategory = name;

    document.querySelectorAll(".category-card").forEach(card => {
      card.classList.toggle("active", card.dataset.category === name);
    });

    const data = categories[name];

    $("categoryHint").textContent = data.hint;
    $("subject").value = data.subject;
    $("greeting").value = data.greeting;
    $("message").value = data.message;
    $("closing").value = data.closing;

    closeLetter();
    updatePreview();
  }

  function closeLetter() {
    isOpen = false;
    $("envelope").classList.remove("open");
    $("shareActions").classList.remove("visible");
    $("openLetterBtn").textContent = "Open letter ♡";
  }

  // Add shareable-link button and link display
  const shareLinkButton = document.createElement("button");
  shareLinkButton.id = "shareLinkBtn";
  shareLinkButton.type = "button";
  shareLinkButton.textContent = "Generate Shareable Link ♡";
  shareLinkButton.style.cssText = "width:100%;margin-top:10px;padding:14px;background:#bd914e;color:#21130f;border:0;border-radius:4px;cursor:pointer;font-weight:bold;";

  const linkBox = document.createElement("div");
  linkBox.id = "shareLinkBox";
  linkBox.style.cssText = "display:none;margin-top:10px;";

  const linkInput = document.createElement("input");
  linkInput.id = "shareLinkInput";
  linkInput.readOnly = true;
  linkInput.style.cssText = "width:100%;padding:12px;border:1px solid #bd914e;border-radius:4px;";

  const copyLinkButton = document.createElement("button");
  copyLinkButton.textContent = "Copy Letter Link";
  copyLinkButton.type = "button";
  copyLinkButton.style.cssText = "width:100%;margin-top:8px;padding:12px;background:#246b4d;color:white;border:0;border-radius:4px;cursor:pointer;";

  linkBox.appendChild(linkInput);
  linkBox.appendChild(copyLinkButton);

  $("shareActions").appendChild(shareLinkButton);
  $("shareActions").appendChild(linkBox);

  shareLinkButton.addEventListener("click", () => {
    const data = getLetterData();
    const encoded = encodeLetter(data);
    const shareURL = window.location.origin + window.location.pathname + "#letter=" + encoded;

    linkInput.value = shareURL;
    linkBox.style.display = "block";

    $("status").textContent = "Your personal letter link is ready!";
  });

  copyLinkButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(linkInput.value);
      $("status").textContent = "Letter link copied! Send it to your recipient.";
    } catch {
      linkInput.select();
      $("status").textContent = "Select and copy the link manually.";
    }
  });

  document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => selectCategory(card.dataset.category));
  });

  ["toName","fromName","subject","greeting","message","closing"].forEach(id => {
    $(id).addEventListener("input", updatePreview);
  });

  $("theme").addEventListener("change", e => {
    $("letterPaper").className = "letter-paper theme-" + e.target.value;
  });

  $("previewBtn").addEventListener("click", () => {
    updatePreview();
    $("letterStage").scrollIntoView({behavior:"smooth",block:"center"});
    $("status").textContent = "Your letter is ready. Open the envelope to reveal it.";
  });

  $("openLetterBtn").addEventListener("click", () => {
    if (!isOpen) {
      isOpen = true;
      $("envelope").classList.add("open");
      $("openLetterBtn").textContent = "Letter opened ✓";
      setTimeout(() => $("shareActions").classList.add("visible"), 650);
    } else {
      closeLetter();
    }
  });

  $("resetBtn").addEventListener("click", () => {
    $("toName").value = "";
    $("fromName").value = "";
    linkBox.style.display = "none";
    selectCategory(selectedCategory);
    $("status").textContent = "The letter has been reset.";
  });

  $("copyBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(getLetterText());
      $("status").textContent = "Letter text copied.";
    } catch {
      $("status").textContent = "Copy is unavailable in this browser.";
    }
  });

  $("downloadBtn").addEventListener("click", () => {
    const blob = new Blob([getLetterText()], {type:"text/plain;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "my-chithi.txt";
    a.click();

    URL.revokeObjectURL(url);
    $("status").textContent = "Your letter has been downloaded.";
  });

  $("whatsappBtn").addEventListener("click", () => {
    const url = "https://wa.me/?text=" + encodeURIComponent(getLetterText());
    window.open(url, "_blank", "noopener");
  });

  $("theme").dispatchEvent(new Event("change"));
  selectCategory("personal");
}
