import '../css/dashboard.css';

const dashSection = document.getElementById('dashSection');
const topPanel    = document.getElementById('top-panel');
const leftPanel   = document.getElementById('left-panel');


dashSection.style = `
    top: ${topPanel.offsetHeight + topPanel.offsetTop + 30}px;
`;

const userPic = document.getElementById('user-pic');
userPic.src = sessionStorage.getItem('pic') || localStorage.getItem('pic');
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