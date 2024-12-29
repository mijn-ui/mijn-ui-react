"use client"

import React from "react"
import { Button } from "@mijn-ui/react-button"
import { Checkbox } from "@mijn-ui/react-checkbox"
import { Label } from "@mijn-ui/react-label"
import { RadioGroup, RadioGroupItem } from "@mijn-ui/react-radio-group"
import { ButtonVariantProps } from "@mijn-ui/react-theme"

type ButtonOptionsType = {
  unstyled: boolean
  loading: boolean
  disabled: boolean
} & ButtonVariantProps

const CheckboxWithLabel = ({
  id,
  checked,
  onCheckedChange,
  label,
}: {
  id: string
  checked: boolean
  onCheckedChange: () => void
  label: string
}) => (
  <div className="flex items-center gap-2">
    <Checkbox
      id={id}
      size={"sm"}
      checked={checked}
      onCheckedChange={onCheckedChange}
    />
    <Label className="text-sm" htmlFor={id}>
      {label}
    </Label>
  </div>
)

const RadioGroupWithOptions = ({
  defaultValue,
  value,
  onValueChange,
  label,
  options,
}: {
  defaultValue: string
  value: string
  onValueChange: (value: string) => void
  label: string
  options: { value: string; id: string }[]
}) => (
  <RadioGroup
    className="sm:min-w-24"
    defaultValue={defaultValue}
    value={value}
    onValueChange={onValueChange}
  >
    <p className="text-sm">{label}</p>
    {options.map((option) => (
      <div className="flex items-center space-x-2" key={option.id}>
        <RadioGroupItem value={option.value} id={option.id} />
        <Label htmlFor={option.id}>{option.value}</Label>
      </div>
    ))}
  </RadioGroup>
)

const KeyFeaturesPlayground = () => {
  const [buttonOptions, setButtonOptions] = React.useState<ButtonOptionsType>({
    unstyled: false,
    variant: "filled",
    loading: false,
    disabled: false,
    color: "primary",
    size: "md",
    radius: "md",
  })

  const handleChange = (key: string, value: boolean | string) => {
    setButtonOptions((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <figure className="not-prose w-full">
      <figcaption className="mb-3 text-base">Try it here!</figcaption>

      <div className="flex h-80 w-full flex-col items-center overflow-hidden rounded-md border sm:flex-row">
        <div className="flex h-full min-h-32 flex-auto items-center justify-center bg-main">
          <Button
            unstyled={buttonOptions.unstyled}
            loading={buttonOptions.loading}
            disabled={buttonOptions.disabled}
            color={buttonOptions.color ? buttonOptions.color : undefined}
            variant={buttonOptions.variant}
            radius={buttonOptions.radius}
            size={buttonOptions.size}
          >
            {buttonOptions.size === "icon" ? "M" : "MijnUI"}
          </Button>
        </div>

        <div className="flex size-full grow flex-col items-center gap-4 bg-surface p-5 sm:max-w-80 xl:w-1/2 xl:max-w-none xl:flex-initial">
          <div className="flex items-center gap-5 sm:w-full">
            <CheckboxWithLabel
              id="unstyled"
              checked={buttonOptions.unstyled}
              onCheckedChange={() =>
                handleChange("unstyled", !buttonOptions.unstyled)
              }
              label="Unstyled"
            />

            <CheckboxWithLabel
              id="loading"
              checked={buttonOptions.loading}
              onCheckedChange={() =>
                handleChange("loading", !buttonOptions.loading)
              }
              label="Loading"
            />

            <CheckboxWithLabel
              id="disabled"
              checked={buttonOptions.disabled}
              onCheckedChange={() =>
                handleChange("disabled", !buttonOptions.disabled)
              }
              label="Disabled"
            />
          </div>

          <div className="flex h-full max-h-32 flex-wrap items-start gap-x-6 overflow-y-auto pb-4 sm:max-h-none sm:gap-x-4 sm:overflow-hidden sm:pb-0">
            <RadioGroupWithOptions
              defaultValue="filled"
              value={buttonOptions.variant || "filled"}
              onValueChange={(value) => handleChange("variant", value)}
              label="Variant"
              options={[
                { value: "filled", id: "filled" },
                { value: "outlined", id: "outlined" },
                { value: "text", id: "text" },
              ]}
            />

            <RadioGroupWithOptions
              defaultValue="primary"
              value={buttonOptions.color || "primary"}
              onValueChange={(value) => handleChange("color", value)}
              label="Colors"
              options={[
                { value: "primary", id: "primary" },
                { value: "muted", id: "muted" },
                { value: "accent", id: "accent" },
                { value: "danger", id: "danger" },
              ]}
            />

            <RadioGroupWithOptions
              defaultValue="md"
              value={buttonOptions.radius || "md"}
              onValueChange={(value) => handleChange("radius", value)}
              label="Radius"
              options={[
                { value: "sm", id: "radius-sm" },
                { value: "md", id: "radius-md" },
                { value: "lg", id: "radius-lg" },
                { value: "full", id: "radius-full" },
              ]}
            />

            <RadioGroupWithOptions
              defaultValue="md"
              value={buttonOptions.size || "md"}
              onValueChange={(value) => handleChange("size", value)}
              label="Size"
              options={[
                { value: "sm", id: "size-sm" },
                { value: "md", id: "size-md" },
                { value: "lg", id: "size-lg" },
                { value: "icon", id: "size-icon" },
              ]}
            />
          </div>
        </div>
      </div>
    </figure>
  )
}

export default KeyFeaturesPlayground
