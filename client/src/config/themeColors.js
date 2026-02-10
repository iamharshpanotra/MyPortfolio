// ============================================
// THEME COLORS CONFIGURATION
// ============================================
// Customize your entire website's color scheme from this single file
// All colors use CSS variables for easy theme switching

export const themeColors = {
  // Light Mode Colors
  light: {
    // Primary brand color - main accent color used throughout the site
    primary: '#4a90e2',        // Professional blue - Change this to your preferred color
    primaryDark: '#357ab8',    // Darker shade for hover states
    primaryLight: '#6fa8ec',   // Lighter shade for backgrounds

    // Background colors
    background: '#ffffff',     // Main background
    backgroundAlt: '#f8f9fa',  // Alternative background (sections)
    backgroundCard: '#ffffff', // Card/component backgrounds

    // Text colors
    textPrimary: '#1a1a1a',    // Main text color
    textSecondary: '#666666',  // Secondary text (descriptions, etc.)
    textMuted: '#999999',      // Muted text (labels, hints)

    // Border colors
    border: '#e0e0e0',         // Default borders
    borderLight: '#f0f0f0',    // Light borders

    // Status colors
    success: '#28a745',        // Success messages
    warning: '#ffc107',        // Warning messages
    error: '#dc3545',          // Error messages
    info: '#17a2b8',           // Info messages

    // Special colors
    shadow: 'rgba(0, 0, 0, 0.1)',           // Box shadows
    shadowHover: 'rgba(0, 0, 0, 0.15)',     // Hover shadows
    overlay: 'rgba(0, 0, 0, 0.5)',          // Modal overlays
    codeBackground: '#f5f5f5',              // Code block backgrounds

    // Gradient (for hero section, etc.)
    gradientStart: '#4a90e2',
    gradientEnd: '#357ab8',
  },

  // Dark Mode Colors
  dark: {
    // Primary brand color - same as light mode for consistency
    primary: '#4a90e2',
    primaryDark: '#357ab8',
    primaryLight: '#6fa8ec',

    // Background colors
    background: '#0a0a0a',     // Main background - very dark
    backgroundAlt: '#1a1a1a',  // Alternative background
    backgroundCard: '#1f1f1f', // Card backgrounds

    // Text colors
    textPrimary: '#ffffff',    // Main text
    textSecondary: '#b0b0b0',  // Secondary text
    textMuted: '#808080',      // Muted text

    // Border colors
    border: '#333333',         // Default borders
    borderLight: '#2a2a2a',    // Light borders

    // Status colors (slightly muted for dark mode)
    success: '#2ecc71',
    warning: '#f39c12',
    error: '#e74c3c',
    info: '#3498db',

    // Special colors
    shadow: 'rgba(0, 0, 0, 0.3)',
    shadowHover: 'rgba(0, 0, 0, 0.5)',
    overlay: 'rgba(0, 0, 0, 0.7)',
    codeBackground: '#2a2a2a',

    // Gradient
    gradientStart: '#4a90e2',
    gradientEnd: '#357ab8',
  },
};

// ============================================
// PRESET COLOR SCHEMES
// ============================================
// Uncomment one of these presets to quickly change your theme
// Or create your own custom scheme!

// Cyan/Tech Theme (Default)
export const cyanTheme = {
  primary: '#4a90e2',
  primaryDark: '#357ab8',
  primaryLight: '#6fa8ec',
};

// Purple/Modern Theme
export const purpleTheme = {
  primary: '#9b59b6',
  primaryDark: '#7d3c98',
  primaryLight: '#bb8fce',
};

// Green/Growth Theme
export const greenTheme = {
  primary: '#27ae60',
  primaryDark: '#229954',
  primaryLight: '#52be80',
};

// Orange/Energetic Theme
export const orangeTheme = {
  primary: '#e67e22',
  primaryDark: '#d35400',
  primaryLight: '#f39c12',
};

// Red/Bold Theme
export const redTheme = {
  primary: '#e74c3c',
  primaryDark: '#c0392b',
  primaryLight: '#ec7063',
};

// Teal/Professional Theme
export const tealTheme = {
  primary: '#1abc9c',
  primaryDark: '#16a085',
  primaryLight: '#48c9b0',
};

// Indigo/Corporate Theme
export const indigoTheme = {
  primary: '#3f51b5',
  primaryDark: '#303f9f',
  primaryLight: '#5c6bc0',
};

// ============================================
// HOW TO CHANGE THEME COLORS
// ============================================
// 
// OPTION 1: Quick Theme Change
// -----------
// Simply uncomment one of the preset themes above and apply it:
// 
// import { purpleTheme } from './themeColors';
// themeColors.light.primary = purpleTheme.primary;
// themeColors.light.primaryDark = purpleTheme.primaryDark;
// themeColors.light.primaryLight = purpleTheme.primaryLight;
// themeColors.dark.primary = purpleTheme.primary;
// themeColors.dark.primaryDark = purpleTheme.primaryDark;
// themeColors.dark.primaryLight = purpleTheme.primaryLight;
//
// OPTION 2: Custom Colors
// -----------
// Edit the hex values directly in the light and dark objects above
// 
// OPTION 3: Create Your Own Preset
// -----------
// Add a new theme object following the pattern above, then apply it
//
// ============================================

// Helper function to apply a preset theme
export const applyPresetTheme = (preset) => {
  themeColors.light.primary = preset.primary;
  themeColors.light.primaryDark = preset.primaryDark;
  themeColors.light.primaryLight = preset.primaryLight;
  themeColors.dark.primary = preset.primary;
  themeColors.dark.primaryDark = preset.primaryDark;
  themeColors.dark.primaryLight = preset.primaryLight;
};

// ============================================
// TO USE A PRESET: Uncomment one line below
// ============================================
// applyPresetTheme(purpleTheme);
// applyPresetTheme(greenTheme);
// applyPresetTheme(orangeTheme);
applyPresetTheme(redTheme);
// applyPresetTheme(tealTheme);
// applyPresetTheme(indigoTheme);

export default themeColors;
