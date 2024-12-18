const getFromConfig = (name: string) => {
  // Access the CSS variable by name
  const cssVar = getComputedStyle(document.documentElement).getPropertyValue(`--${name}`);
  console.log('primaryBtnBg var', cssVar)
  return cssVar.trim() || null;
};

export const primaryBtnBg = getFromConfig('ring') || 'rgb(66, 133, 244)';

console.log('primaryBtnBg', primaryBtnBg)