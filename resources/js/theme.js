const accent = '#ff6a00';
const blackBase = '#050505';
const blackPanel = '#0b0b0b';
const blackElevated = '#111111';
const blackBorder = '#202020';
const textPrimary = 'rgba(255, 255, 255, 0.88)';
const textSecondary = 'rgba(255, 255, 255, 0.64)';

const tokens = {
    colorPrimary: accent,
    colorSuccess: '#22c55e',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    colorInfo: accent,
    colorTextBase: '#f5f5f5',
    colorBgBase: blackBase,
    colorText: textPrimary,
    colorTextSecondary: textSecondary,
    colorTextTertiary: 'rgba(255, 255, 255, 0.4)',
    colorTextQuaternary: 'rgba(255, 255, 255, 0.22)',
    colorTextDisabled: 'rgba(255, 255, 255, 0.22)',
    colorBgContainer: blackPanel,
    colorBgElevated: blackElevated,
    colorBgLayout: blackBase,
    colorBgSpotlight: 'rgba(255, 255, 255, 0.08)',
    colorBgMask: 'rgba(0, 0, 0, 0.72)',
    colorBorder: blackBorder,
    colorBorderSecondary: '#141414',
    colorPrimaryBg: '#1a1108',
    colorPrimaryBgHover: '#261708',
    colorPrimaryBorder: '#6b3200',
    colorPrimaryBorderHover: '#8a4100',
    colorPrimaryHover: '#ff7d26',
    colorPrimaryActive: '#d45500',
    colorPrimaryText: accent,
    colorPrimaryTextHover: '#ff8e40',
    colorPrimaryTextActive: '#d45500',
    borderRadius: 6,
    borderRadiusXS: 3,
    borderRadiusSM: 4,
    borderRadiusLG: 10,
    padding: 16,
    paddingSM: 12,
    paddingLG: 24,
    margin: 16,
    marginSM: 12,
    marginLG: 24,
    boxShadow: '0 14px 40px rgba(0, 0, 0, 0.45)',
    boxShadowSecondary: '0 18px 48px rgba(0, 0, 0, 0.56)',
};

export const theme = {
    token: tokens,
    components: {
        Layout: {
            bodyBg: blackBase,
            siderBg: blackPanel,
            headerBg: blackPanel,
            triggerBg: blackElevated,
            triggerColor: textPrimary,
        },
        Menu: {
            darkItemBg: blackPanel,
            darkSubMenuItemBg: blackPanel,
            darkItemColor: textSecondary,
            darkItemHoverBg: '#141414',
            darkItemHoverColor: textPrimary,
            darkItemSelectedBg: accent,
            darkItemSelectedColor: '#ffffff',
            darkGroupTitleColor: textSecondary,
            darkPopupBg: blackElevated,
        },
        Button: {
            textTextColor: textPrimary,
            textHoverBg: '#141414',
            textHoverColor: '#ffffff',
        },
    },
};

export const themeCssVars = {
    '--app-color-brand': tokens.colorPrimary,
    '--app-color-brand-hover': tokens.colorPrimaryHover,
    '--app-color-brand-active': tokens.colorPrimaryActive,
    '--app-color-brand-bg': tokens.colorPrimaryBg,
    '--app-color-brand-border': tokens.colorPrimaryBorder,
    '--app-color-success': tokens.colorSuccess,
    '--app-color-warning': tokens.colorWarning,
    '--app-color-danger': tokens.colorError,
    '--app-color-info': tokens.colorInfo,
    '--app-color-canvas': tokens.colorBgBase,
    '--app-color-surface': tokens.colorBgContainer,
    '--app-color-elevated': tokens.colorBgElevated,
    '--app-color-border': tokens.colorBorder,
    '--app-color-border-muted': tokens.colorBorderSecondary,
    '--app-color-foreground': tokens.colorText,
    '--app-color-muted': tokens.colorTextSecondary,
    '--app-color-subtle': tokens.colorTextTertiary,
    '--app-color-disabled': tokens.colorTextDisabled,
    '--app-color-mask': tokens.colorBgMask,
    '--app-radius-xs': `${tokens.borderRadiusXS}px`,
    '--app-radius-sm': `${tokens.borderRadiusSM}px`,
    '--app-radius-md': `${tokens.borderRadius}px`,
    '--app-radius-lg': `${tokens.borderRadiusLG}px`,
    '--app-space-sm': `${tokens.paddingSM}px`,
    '--app-space-md': `${tokens.padding}px`,
    '--app-space-lg': `${tokens.paddingLG}px`,
    '--app-shadow-sm': tokens.boxShadow,
    '--app-shadow-lg': tokens.boxShadowSecondary,
};

export const themeCssVariables = `:root {\n${Object.entries(themeCssVars)
    .map(([key, value]) => `    ${key}: ${value};`)
    .join('\n')}\n}`;
