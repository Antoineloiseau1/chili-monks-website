import localFont from "next/font/local";

export const avantGarde = localFont({
  src: [
    { path: "../../../public/font/ITCAvantGardeStd-XLt.woff2", weight: "200", style: "normal" },
    { path: "../../../public/font/ITCAvantGardeStd-XLtObl.woff2", weight: "200", style: "italic" },
    { path: "../../../public/font/ITCAvantGardeStd-Bk.woff2", weight: "300", style: "normal" },
    { path: "../../../public/font/ITCAvantGardeStd-BkObl.woff2", weight: "300", style: "italic" },
    { path: "../../../public/font/ITCAvantGardeStd-Md.woff2", weight: "500", style: "normal" },
    { path: "../../../public/font/ITCAvantGardeStd-MdObl.woff2", weight: "500", style: "italic" },
    { path: "../../../public/font/ITCAvantGardeStd-Demi.woff2", weight: "600", style: "normal" },
    { path: "../../../public/font/ITCAvantGardeStd-DemiObl.woff2", weight: "600", style: "italic" },
    { path: "../../../public/font/ITCAvantGardeStd-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../../public/font/ITCAvantGardeStd-BoldObl.woff2", weight: "700", style: "italic" },
  ],
  display: "swap",
  variable: "--font-avant-garde",
});

export const avantGardeCondensed = localFont({
  src: [
    { path: "../../../public/font/ITCAvantGardeStd-XLtCn.woff2", weight: "200", style: "normal" },
    { path: "../../../public/font/ITCAvantGardeStd-XLtCnObl.woff2", weight: "200", style: "italic" },
    { path: "../../../public/font/ITCAvantGardeStd-BkCn.woff2", weight: "300", style: "normal" },
    { path: "../../../public/font/ITCAvantGardeStd-BkCnObl.woff2", weight: "300", style: "italic" },
    { path: "../../../public/font/ITCAvantGardeStd-MdCn.woff2", weight: "500", style: "normal" },
    { path: "../../../public/font/ITCAvantGardeStd-MdCnObl.woff2", weight: "500", style: "italic" },
    { path: "../../../public/font/ITCAvantGardeStd-DemiCn.woff2", weight: "600", style: "normal" },
    { path: "../../../public/font/ITCAvantGardeStd-DemiCnObl.woff2", weight: "600", style: "italic" },
    { path: "../../../public/font/ITCAvantGardeStd-BoldCn.woff2", weight: "700", style: "normal" },
    { path: "../../../public/font/ITCAvantGardeStd-BoldCnObl.woff2", weight: "700", style: "italic" },
  ],
  display: "swap",
  variable: "--font-avant-garde-condensed",
});
