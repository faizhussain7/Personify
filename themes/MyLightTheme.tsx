import { Platform } from 'react-native';

const WEB_FONT_STACK =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgba(212, 160, 23, 1)',
    background: 'rgba(245, 240, 225, 1)',
    card: 'rgba(26, 60, 52, 1)',
    text: 'rgba(245, 240, 225, 1)',
    border: 'rgba(212, 160, 23, 1)',
    notification: 'rgba(245, 240, 225, 1)',
  },
  fonts: Platform.select({
    web: {
      regular: {
        fontFamily: WEB_FONT_STACK,
        fontWeight: '400' as const,
      },
      medium: {
        fontFamily: WEB_FONT_STACK,
        fontWeight: '500' as const,
      },
      bold: {
        fontFamily: WEB_FONT_STACK,
        fontWeight: '600' as const,
      },
      heavy: {
        fontFamily: WEB_FONT_STACK,
        fontWeight: '700' as const,
      },
    },
    ios: {
      regular: {
        fontFamily: 'System',
        fontWeight: '400' as const,
      },
      medium: {
        fontFamily: 'System',
        fontWeight: '500' as const,
      },
      bold: {
        fontFamily: 'System',
        fontWeight: '600' as const,
      },
      heavy: {
        fontFamily: 'System',
        fontWeight: '700' as const,
      },
    },
    default: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal' as const,
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal' as const,
      },
      bold: {
        fontFamily: 'sans-serif',
        fontWeight: '600' as const,
      },
      heavy: {
        fontFamily: 'sans-serif',
        fontWeight: '700' as const,
      },
    },
  }),
};
