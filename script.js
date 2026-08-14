const links=[...document.querySelectorAll('.nav-link[href^="#"]')];
const sections=[...document.querySelectorAll('main section[id]')];

if(sections.length){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      links.forEach(l=>l.classList.remove('active'));
      const link=document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if(link) link.classList.add('active');
    });
  },{rootMargin:'-35% 0px -55% 0px',threshold:0});
  sections.forEach(s=>observer.observe(s));
}

(function(){
  const saved=localStorage.getItem('theme');
  if(saved==='light') document.body.classList.add('light');
  const toggle=document.createElement('button');
  toggle.className='theme-toggle';
  toggle.setAttribute('aria-label','Darstellung wechseln');
  toggle.innerHTML='<span>☾</span>';
  if(document.body.classList.contains('light')){
    toggle.classList.add('light');
    toggle.querySelector('span').textContent='☀';
  }
  document.body.appendChild(toggle);
  toggle.addEventListener('click',()=>{
    document.body.classList.toggle('light');
    const light=document.body.classList.contains('light');
    toggle.classList.toggle('light',light);
    toggle.querySelector('span').textContent=light?'☀':'☾';
    localStorage.setItem('theme',light?'light':'dark');
  });
})();