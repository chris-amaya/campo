import './handlers/session.handler';
import '../css/dashboard.css';
const dashSection = document.getElementById('dashSection');
const topPanel    = document.getElementById('top-panel');
const leftPanel   = document.getElementById('left-panel');

resizeDashSection();



const userPic = document.getElementById('user-pic');
const firstName = document.getElementById('firstName');
userPic.src = sessionStorage.getItem('pic') || localStorage.getItem('pic');
firstName.href = `/perfil/${sessionStorage.getItem('url') || localStorage.getItem('url')}` 
const dropdown = document.getElementById('dropdownList')

const submenu = document.getElementById('submenu');
submenu.addEventListener('click', (e) => {
    // dropdown.style.display = 'flex';
    dropdown.classList.toggle('active');
    dropdown.style.bottom = `calc(-${dropdown.offsetHeight}px)`
})

window.addEventListener('resize', resizeDashSection);

function resizeDashSection() {
    if(window.innerWidth > 720) {
        dashSection.style = `
            top: ${topPanel.offsetHeight + topPanel.offsetTop + 30}px;
        `;
    } else {
        dashSection.style = `
            top: 35px;
        `;
    }
}

// position: absolute;
    // margin-left: ${leftPanel.offsetWidth + 50}px;
    // width: ${window.innerWidth - leftPanel.offsetWidth - 50}px

// window.addEventListener('resize', (e) => {
//     dashSection.style = `
//         position: absolute;
//         top: ${topPanel.offsetHeight + topPanel.offsetTop + 30}px;
//         margin-left: ${leftPanel.offsetWidth + 50}px;
//         width: calc(100% - ${leftPanel.offsetWidth}px - 50px - 4%);
//         `;
//         // width: ${window.innerWidth - leftPanel.offsetWidth - 50}px;
// })