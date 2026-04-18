import React from "react";

type TextVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "body" | "sm" | "xs";
type TextColor = "primary" | "secondary" | "disabled" | "inverse";
type TextWeight = "regular" | "medium" | "semibold" | "bold";

interface TextProps {
  variant?: TextVariant;
  color?: TextColor;
  weight?: TextWeight;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<TextVariant, string> = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
  h5: "text-h5",
  h6: "text-h6",
  h7: "text-h7",
  body: "text-body",
  sm: "text-sm",
  xs: "text-xs",
};

const colorStyles: Record<TextColor, string> = {
  primary: "text-grey-900",
  secondary: "text-grey-600",
  disabled: "text-grey-400",
  inverse: "text-white",
};

const weightStyles: Record<TextWeight, string> = {
  regular: "font-regular",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const tagMap: Record<TextVariant, keyof React.JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  h7: "p",
  body: "p",
  sm: "p",
  xs: "p",
};

export default function Text({
  variant = "body",
  color = "primary",
  weight = "regular",
  className = "",
  children,
}: TextProps) {
  const Tag = tagMap[variant];

  return (
    <Tag
      className={[
        variantStyles[variant],
        colorStyles[color],
        weightStyles[weight],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
