export const animations = {
    bringFromLeft: (modal) => {
        modal.style = `
            animation-name: bringFromRight;
            left: 0%;
        `
        modal.classList.add('active');
    },
    hideModalToRight: (modal) => {
        modal.style = `
            animation-name: hideToRight;
        `;
    }
}

// export default animations;
// module.exports = animations;

// export default {
//     animation
// }