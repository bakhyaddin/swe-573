const primaryColor = '#23408D';
const primaryColorLight = '#28346E';
const primaryColorDark = '#1D3357';

const softCyan = '#F5F7FD';
const cyan = '#BDCBF0';
const green = '#72E2B2';
const orange = '#FFC06A';
const red = '#F7A09D';
const borderColor = '#F1F1F3';
const backgroundColor = '#F0F2F5';
const boxShadow = `0px 1px 5px 0px ${primaryColorDark}`;

const paddingVertical = '12px';
const paddingHorizontal = '24px';

export default {
  // MAIN
  main: {
    colors: {
      primaryColor,
      primaryColorLight,
      primaryColorDark,
      softCyan,
      cyan,
      green,
      orange,
      red,
      borderColor,
      backgroundColor,
    },
    boxShadow,
    paddingVertical,
    paddingHorizontal,
    sideBarWebTextFontSize: '15px',
    navBarMobileTextFontSize: '10px',
  },

  // COMPONENTS
  button: {
    shadow: '0 3px 3px 0 rgba(0, 0, 0, 0.03)',
    borderRadius: '2px',
  },

  // PAGES
  mainPage: {
    padding: '70px 20px 0px 20px',
  },
  // COMPONENTS
  content: {
    backgroundColor: '#F5F7FD',
  },
  header: {
    height: '7vh',
    backgroundColor: '#f9f9f9',
    borderBottom: '2px solid rgba(0, 0, 0, 0.03)',
    shadow: '0 3px 3px 0 rgba(0, 0, 0, 0.03);',
  },
  footer: {
    height: '200px',
    backgroundColor: '#fff',
  },
  text: {
    boldFontWeight: '600',

    h1FontSize: '28px',
    h1FontSizeMobile: '4.5vw',

    h2FontSize: '24px',
    h2FontSizeMobile: '4vw',

    spanFontSize: '12px',
    spanFontSizeMobile: '3vw',

    pFontSize: '14px',
    pFontSizeMobile: '3vw',
  },
  mobile: {
    navBar: {
      height: '50px',
    },
    bottomNavBar: {
      height: '65px',
      paddingFromBottom: '77px',
    },
  },
};
