// ── NAV ──
function toggleNav(){
  document.getElementById('hbg').classList.toggle('open');
  document.getElementById('mnav').classList.toggle('open');
}
function closeNav(){
  document.getElementById('hbg').classList.remove('open');
  document.getElementById('mnav').classList.remove('open');
}

// ── PORTFOLIO CARD HOVER OVERLAY ──
document.querySelectorAll('.ph-ovr').forEach(o=>{
  const p=o.closest('.pcard');
  if(p){
    p.addEventListener('mouseenter',()=>o.style.opacity='1');
    p.addEventListener('mouseleave',()=>o.style.opacity='0');
  }
});

// ── SMOOTH SCROLL (anchor links) ──
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',function(e){
    const target=document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      closeNav();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

// ── PORTFOLIO FILTER (only runs if filter bar exists) ──
function filterSection(cat,btn){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.port-section').forEach(s=>{
    s.style.display=(cat==='all'||s.dataset.cat===cat)?'':'none';
  });
}

// ── FAQ ACCORDION (only runs if faq items exist) ──
function toggleFaq(el){
  const isOpen=el.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
  if(!isOpen) el.classList.add('open');
}

// ── CONTACT FORM (only runs if form exists on this page) ──
const contactForm=document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit',function(e){
    e.preventDefault();
    const btn=document.getElementById('submitBtn');
    const text=document.getElementById('submitText');
    if(!btn||!text) return;
    btn.disabled=true;
    text.textContent='Sending...';
    fetch(contactForm.action,{
      method:'POST',
      body:new FormData(contactForm),
      headers:{Accept:'application/json'}
    }).then(r=>{
      if(r.ok){
        const formContent=document.getElementById('cf-form-content');
        const success=document.getElementById('cf-success');
        if(formContent) formContent.style.display='none';
        if(success) success.style.display='block';
      } else {
        btn.disabled=false;
        text.textContent='Send Message →';
        alert('Something went wrong. Please email me directly at naz4rinaz@gmail.com');
      }
    }).catch(()=>{
      btn.disabled=false;
      if(text) text.textContent='Send Message →';
    });
  });
}

// ── READING PROGRESS BAR (only runs if element exists) ──
const progressBar=document.getElementById('progressBar');
if(progressBar){
  window.addEventListener('scroll',()=>{
    const doc=document.documentElement;
    const pct=doc.scrollHeight-doc.clientHeight>0
      ?(window.scrollY/(doc.scrollHeight-doc.clientHeight))*100
      :0;
    progressBar.style.width=pct+'%';
  });
}

// ── SCROLL REVEAL ──
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const siblings=[...e.target.parentElement.querySelectorAll('.rev')];
      setTimeout(()=>e.target.classList.add('on'),siblings.indexOf(e.target)*75);
      io.unobserve(e.target);
    }
  });
},{threshold:0.06});
document.querySelectorAll('.rev').forEach(el=>io.observe(el));


// Reading progress bar
window.addEventListener('scroll',()=>{
  const doc = document.documentElement;
  const scrollTop = window.scrollY;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  const pct = scrollHeight > 0 ? (scrollTop/scrollHeight)*100 : 0;
  document.getElementById('progressBar').style.width = pct+'%';
});

// testimonial form 
/* ── stars ── */
var testiStars = 5;
function setTestiStars(n) {
  testiStars = n;
  var labels = ["1 star","2 stars","3 stars","4 stars","5 stars"];
  document.querySelectorAll("#starRow button").forEach(function(b,i){
    b.classList.toggle("lit", i < n);
  });
  document.getElementById("tf_stars").value = n + " star" + (n>1?"s":"");
}
setTestiStars(5);

/* ── modal open/close ── */
function openTestiModal() {
  document.getElementById("testiModalBg").classList.add("open");
  document.body.style.overflow = "hidden";
  document.getElementById("tf_name").focus();
}
function closeTestiModal() {
  document.getElementById("testiModalBg").classList.remove("open");
  document.body.style.overflow = "";
}
function testiOverlayClick(e) {
  if (e.target === document.getElementById("testiModalBg")) closeTestiModal();
}

/* ── submit ── */
function handleTestiSubmit(e) {
  e.preventDefault();
  var name   = document.getElementById("tf_name").value.trim();
  var review = document.getElementById("tf_review").value.trim();
  var err    = document.getElementById("testiErr");

  if (!name || review.length < 20) {
    err.style.display = "block";
    return;
  }
  err.style.display = "none";

  var btn = document.getElementById("testiSubmitBtn");
  btn.disabled = true;
  btn.textContent = "Sending…";

  var form = document.getElementById("testiForm");
  var data = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: data,
    headers: { "Accept": "application/json" }
  })
  .then(function(res) {
    if (res.ok) {
      document.getElementById("testiFormWrap").style.display = "none";
      document.getElementById("testiSuccess").style.display  = "block";
      setTimeout(function(){
        closeTestiModal();
        setTimeout(function(){
          document.getElementById("testiFormWrap").style.display = "";
          document.getElementById("testiSuccess").style.display  = "none";
          form.reset();
          document.getElementById("testiCharCount").textContent = "0 / 500";
          setTestiStars(5);
          btn.disabled = false;
          btn.textContent = "Submit Review →";
        }, 300);
      }, 3000);
    } else {
      btn.disabled = false;
      btn.textContent = "Submit Review →";
      alert("Something went wrong. Please try again.");
    }
  })
  .catch(function(){
    btn.disabled = false;
    btn.textContent = "Submit Review →";
    alert("Network error. Please check your connection and try again.");
  });
}

/* ── hide empty state if cards exist ── */
(function(){
  var grid  = document.getElementById("testiGrid");
  var empty = document.getElementById("testiEmpty");
  var cards = grid.querySelectorAll(".testi-card");
  if (cards.length > 0) empty.style.display = "none";
})();


// Footer
document.getElementById("fyear").textContent=new Date().getFullYear();