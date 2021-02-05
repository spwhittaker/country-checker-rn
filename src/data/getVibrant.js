const Vibrant = require('node-vibrant');
const countryData = require('../countryData');

Vibrant.from(countryData[countryData[0].alpha3Code.toLowerCase()]).getPalette(
  (err, palette) => {
    if (err) {
      console.error(err);
    }
    console.log(palette);
  },
);

// async () => {
//   try {
//     const palette = await Vibrant.from(currentCountry.flag).getPalette();

//     if (palette) {
//       const paletteColors = {
//         DarkMuted: RGBToHex(palette.DarkMuted._rgb),
//         DarkVibrant: RGBToHex(palette.DarkVibrant._rgb),
//         DarkVibrantContrast: lighten(0.2, RGBToHex(palette.DarkVibrant._rgb)),
//         DarkerMuted: darken(0.1, RGBToHex(palette.DarkMuted._rgb)),
//         DarkestMuted: darken(0.2, RGBToHex(palette.DarkMuted._rgb)),
//         LightMuted: RGBToHex(palette.LightMuted._rgb),
//         LightVibrant: RGBToHex(palette.LightVibrant._rgb),
//         LighterMuted: lighten(0.3, RGBToHex(palette.LightMuted._rgb)),
//         LightestMuted: lighten(0.5, RGBToHex(palette.LightMuted._rgb)),
//         Muted: RGBToHex(palette.Muted._rgb),
//         Vibrant: RGBToHex(palette.Vibrant._rgb),
//       };
//       setAccentColors(paletteColors);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };
