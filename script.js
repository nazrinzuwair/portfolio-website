function toggleNav(){document.getElementById('hbg').classList.toggle('open');document.getElementById('mnav').classList.toggle('open')}
function closeNav(){document.getElementById('hbg').classList.remove('open');document.getElementById('mnav').classList.remove('open')}
document.querySelectorAll('.ph-ovr').forEach(o=>{
  const p=o.closest('.pcard');
  if(p){p.addEventListener('mouseenter',()=>o.style.opacity='1');p.addEventListener('mouseleave',()=>o.style.opacity='0')}
});
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',function(e){
    const t=document.querySelector(this.getAttribute('href'));
    if(t){e.preventDefault();closeNav();t.scrollIntoView({behavior:'smooth',block:'start'})}
  })
});
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const s=[...e.target.parentElement.querySelectorAll('.rev')];
      setTimeout(()=>e.target.classList.add('on'),s.indexOf(e.target)*80);
      io.unobserve(e.target);
    }
  })
},{threshold:0.08});
document.querySelectorAll('.rev').forEach(el=>io.observe(el));