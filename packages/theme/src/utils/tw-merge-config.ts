export const COMMON_UNITS = ["small", "medium", "large"]

export const twMergeConfig = {
  theme: {
    opacity: ["disabled"],
    spacing: ["border"],
    borderWidth: COMMON_UNITS,
    borderRadius: COMMON_UNITS,
  },
  classGroups: {
    shadow: [{ shadow: COMMON_UNITS }],
    "font-size": [{ text: ["tiny", ...COMMON_UNITS] }],
  },
}
