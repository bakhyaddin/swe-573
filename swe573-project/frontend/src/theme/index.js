const primaryColor = '#23408D';
const secondaryColor = '#C8095F';
const borderColor = '#F1F1F3';
const backgroundColor = '#F0F2F5';
const boxShadow = '0px 1px 5px 0px';

const paddingVertical = '12px';
const paddingHorizontal = '24px';

export default {
  // MAIN
  main: {
    colors: {
      primaryColor,
      secondaryColor,
      borderColor,
      backgroundColor,
    },
    boxShadow,
    paddingVertical,
    paddingHorizontal,
  },

  // COMPONENTS
  button: {
    shadow: '0 3px 3px 0 rgba(0, 0, 0, 0.03)',
    borderRadius: '2px',
  },

  header: {
    height: '50px',
  },

  // PAGES
  mainPage: {
    padding: '70px 20px 0px 20px',
  },
};
