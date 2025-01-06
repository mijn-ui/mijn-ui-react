"use client"

import React from "react"

import { Button } from "@mijn-ui/react-button"
import { Checkbox } from "@mijn-ui/react-checkbox"
import { Label } from "@mijn-ui/react-label"
import { RadioGroup, RadioGroupItem } from "@mijn-ui/react-radio-group"
import { buttonStyles, ButtonVariantProps } from "@mijn-ui/react-theme"

import { createVariantObjWithDefaults } from "../utils/variant-objects"

/* -------------------------------------------------------------------------- */

type ButtonOptionsType = {
  unstyled: boolean
  loading: boolean
  disabled: boolean
} & ButtonVariantProps

const KeyFeaturesPlayground = () => {
  const buttonVariantObjects = createVariantObjWithDefaults(
    buttonStyles.variants,
    buttonStyles.defaultVariants,
  )

  const buttonDefaultVariants = buttonStyles.defaultVariants
  const [buttonOptions, setButtonOptions] = React.useState<ButtonOptionsType>({
    ...buttonDefaultVariants,
    unstyled: false,
    loading: false,
    disabled: false,
  })

  const handleChange = (key: string, value: boolean | string) => {
    setButtonOptions((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <figure className="not-prose w-full">
      <div className="rounded-medium border-small flex h-80 w-full flex-col items-center overflow-hidden sm:flex-row">
        <div className="bg-background flex h-full min-h-32 flex-auto items-center justify-center">
          <Button {...buttonOptions}>
            {buttonOptions.size === "icon" ? "M" : "MijnUI"}
          </Button>
        </div>

        <div className="bg-card flex size-full grow flex-col items-center gap-4 p-5 sm:max-w-80 xl:w-1/2 xl:max-w-none xl:flex-initial">
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
            {buttonVariantObjects.map(({ name, options, defaultOption }) => (
              <RadioGroupWithOptions
                key={name}
                defaultValue={defaultOption}
                value={buttonOptions[name] as string}
                onValueChange={(value) => handleChange(name, value)}
                label={name}
                options={options}
              />
            ))}
          </div>
        </div>
      </div>
    </figure>
  )
}

export default KeyFeaturesPlayground

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
    <Label className="text-small" htmlFor={id}>
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
  maxOption = 3,
}: {
  defaultValue: string
  value: string
  onValueChange: (value: string) => void
  label: string
  options: Record<string, string>
  maxOption?: number
}) => (
  <RadioGroup
    className="sm:min-w-24"
    defaultValue={defaultValue}
    value={value}
    onValueChange={onValueChange}
  >
    <p className="text-small">{label}</p>
    {Object.entries(options).map(
      ([variantKey, variantValue], index) =>
        index <= maxOption && (
          <div className="flex items-center space-x-2" key={variantValue}>
            <RadioGroupItem value={variantKey} id={variantValue} />
            <Label htmlFor={variantValue}>{variantKey}</Label>
          </div>
        ),
    )}
  </RadioGroup>
)
