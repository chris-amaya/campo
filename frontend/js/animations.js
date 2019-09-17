export const animations = {
    bringFromLeft: (object) => {
        object.style = `
            animation-name: bringFromLeft;
            left: 0%;
        `;
        object.classList.add('active');
    },

    bringFromRight: (object) => {
        object.style = `
            animation-name: bringFromRight;
            left: 0%;
        `
        object.classList.add('active');
    },

    hideModalToRight: (object) => {
        object.style = `
            animation-name: hideToRight;
            left: 100%;
        `;
        object.classList.remove('active');
    },

    hideModalToLeft: (object) => {
        object.style = `
            animation-name: hideToLeft;
            left: -100%
        `;
        object.classList.remove('active');
    }


}

// export default animations;
// module.exports = animations;

// export default {
//     animation
// }