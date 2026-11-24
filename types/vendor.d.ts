declare module "mini-svg-data-uri" {
  export default function svgToDataUri(svg: string): string;
}

declare module "tailwindcss/lib/util/flattenColorPalette" {
  export default function flattenColorPalette(
    colors: Record<string, unknown>
  ): Record<string, string>;
}
