const getFromConfig = (name: string, fallback: string) => {
  const cssVar = getComputedStyle(document.documentElement).getPropertyValue(`--${name}`);
  console.log(name, cssVar)
  return cssVar.trim() || fallback;
};

// button
export const primaryBtnBg = getFromConfig('primaryBtnBg', 'rgb(111,111,111)');
export const secondaryBtnBg = getFromConfig('secondaryBtnBg', 'rgb(111,111,111)');

// text color
export const textColor = getFromConfig('textColor', 'rgb(111,111,111)');
export const lightTextColor = getFromConfig('lightTextColor', 'rgb(111,111,111)');
export const darkTextColor = getFromConfig('darkTextColor', 'rgb(111,111,111)');