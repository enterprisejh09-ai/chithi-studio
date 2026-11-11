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

function getLetterText() {
  const to = $("toName").value.trim() || "প্রিয় মানুষ";
  const from = $("fromName").value.trim() || "আপনার নাম";
  return `${$("greeting").value || "প্রিয়,"}\n\n${$("subject").value ? $("subject").value + "\n\n" : ""}${$("message").value}\n\n${$("closing").value}\n${from}\n\nপ্রাপক: ${to}`;
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
  document.querySelectorAll(".category-card").forEach(card => card.classList.toggle("active", card.dataset.category === name));
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
document.querySelectorAll(".category-card").forEach(card => card.addEventListener("click", () => selectCategory(card.dataset.category)));
["toName","fromName","subject","greeting","message","closing"].forEach(id => $(id).addEventListener("input", updatePreview));
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
  } else closeLetter();
});
$("resetBtn").addEventListener("click", () => {
  $("toName").value = ""; $("fromName").value = ""; selectCategory(selectedCategory);
  $("status").textContent = "The letter has been reset.";
});
$("copyBtn").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(getLetterText()); $("status").textContent = "Letter text copied."; }
  catch { $("status").textContent = "Copy is unavailable in this browser. You can select the text manually."; }
});
$("downloadBtn").addEventListener("click", () => {
  const blob = new Blob([getLetterText()], {type:"text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob); const a = document.createElement("a");
  a.href = url; a.download = "my-chithi.txt"; a.click(); URL.revokeObjectURL(url);
  $("status").textContent = "Your letter has been downloaded.";
});
$("whatsappBtn").addEventListener("click", () => {
  const url = "https://wa.me/?text=" + encodeURIComponent(getLetterText());
  window.open(url, "_blank", "noopener");
});
$("theme").dispatchEvent(new Event("change"));
selectCategory("personal");