import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
  useOf,
} from "@storybook/addon-docs/blocks"

const REPO_TREE = "https://github.com/mijn-ui/mijn-ui-react/tree/main/"

/**
 * Where the component lives, and how to install it on its own.
 *
 * Read from the story file's own path (`parameters.fileName`, set by Storybook
 * for every CSF file), so no story has to repeat it and a moved or renamed
 * component cannot point at a stale link.
 */
function SourceLink() {
  const { preparedMeta } = useOf("meta")
  const fileName = preparedMeta.parameters.fileName as string | undefined
  const name = fileName?.match(/components\/([^/]+)\//)?.[1]
  if (!name) return null

  return (
    <p>
      <a
        href={`${REPO_TREE}packages/components/${name}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View source on GitHub
      </a>
      {" · "}
      <code>npm install @mijn-ui/react-{name}</code> (or everything:{" "}
      <code>@mijn-ui/react</code>)
    </p>
  )
}

/** The autodocs page every component gets, plus the source link above. */
export function DocsPage() {
  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      <SourceLink />
      <Primary />
      <Controls />
      <Stories />
    </>
  )
}
