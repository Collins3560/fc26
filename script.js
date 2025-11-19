// Download buttons
document.querySelectorAll('.dl-btn').forEach(button => {
    button.addEventListener('click', function() {
        const url = this.getAttribute('data-file');
        const name = this.getAttribute('data-name');
        const original = this.innerHTML;

        document.getElementById('rename-notice').style.display = 'block';

        this.innerHTML = 'Starting download…';
        this.disabled = true;

        setTimeout(() => {
            const a = document.createElement('a');
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            this.innerHTML = original;
            this.disabled = false;
        }, 800);
    });
});

// 3D background tilt
const bg = document.getElementById('bg3d');
document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    bg.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.08)`;
});
document.addEventListener('mouseleave', () => bg.style.transform = 'rotateY(0) rotateX(0) scale(1)');

// Live public feedback
const feedbackList = document.getElementById('feedback-list');
const feedbackBox = document.getElementById('feedback-box');
const thanks = document.getElementById('feedback-thanks');

function loadFeedback() {
    const items = JSON.parse(localStorage.getItem('fc26feedback') || '[]');
    feedbackList.innerHTML = '';
    items.reverse().forEach(item => {
        const div = document.createElement('div');
        div.className = 'feedback-item';
        div.innerHTML = `<strong>Anonymous</strong><br>${item.text.replace(/\n/g, '<br>')}<br><small>${item.date}</small>`;
        feedbackList.appendChild(div);
    });
}

document.getElementById('submit-feedback').addEventListener('click', () => {
    const text = feedbackBox.value.trim();
    if (!text) return;

    const items = JSON.parse(localStorage.getItem('fc26feedback') || '[]');
    items.push({ date: new Date().toLocaleString(), text });
    localStorage.setItem('fc26feedback', JSON.stringify(items));

    feedbackBox.value = '';
    thanks.style.display = 'block';
    setTimeout(() => thanks.style.display = 'none', 3000);
    loadFeedback();
});

loadFeedback();
