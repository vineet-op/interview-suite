const config = {
  plugins: ["@tailwindcss/postcss"],
  shimmer: {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' }
  },
};

export default config;
