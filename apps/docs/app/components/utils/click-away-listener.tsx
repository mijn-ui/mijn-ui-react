/* eslint-disable */
// from https://github.com/ooade/react-click-away-listener/
import * as React from "react"

type FocusEvents = "focusin" | "focusout"
type MouseEvents = "click" | "mousedown" | "mouseup"
type TouchEvents = "touchstart" | "touchend"
type Events = FocusEvent | MouseEvent | TouchEvent

type Props = React.HTMLAttributes<HTMLElement> & {
  onClickAway: (event: Events) => void
  focusEvent?: FocusEvents
  mouseEvent?: MouseEvents
  touchEvent?: TouchEvents
  children: React.ReactElement<any>
}

const eventTypeMapping = {
  click: "onClick",
  focusin: "onFocus",
  focusout: "onFocus",
  mousedown: "onMouseDown",
  mouseup: "onMouseUp",
  touchstart: "onTouchStart",
  touchend: "onTouchEnd",
}

const ClickAwayListener: React.FunctionComponent<Props> = ({
  children,
  onClickAway,
  focusEvent = "focusin",
  mouseEvent = "click",
  touchEvent = "touchend",
}) => {
  const node = React.useRef<HTMLElement | null>(null)
  const bubbledEventTarget = React.useRef<EventTarget | null>(null)
  const mountedRef = React.useRef(false)

  /**
   * Prevents the bubbled event from getting triggered immediately
   * https://github.com/facebook/react/issues/20074
   */
  React.useEffect(() => {
    setTimeout(() => {
      mountedRef.current = true
    }, 0)

    return () => {
      mountedRef.current = false
    }
  }, [])

  const handleBubbledEvents =
    (type: string) =>
    (event: Events): void => {
      bubbledEventTarget.current = event.target

      const handler = children?.props[type]

      if (handler) {
        handler(event)
      }
    }

  const handleChildRef = (childRef: HTMLElement) => {
    node.current = childRef

    const { ref } = children as typeof children & {
      ref: React.RefCallback<HTMLElement> | React.MutableRefObject<HTMLElement>
    }

    if (typeof ref === "function") {
      ref(childRef)
    } else if (ref) {
      ref.current = childRef
    }
  }

  React.useEffect(() => {
    const nodeDocument = node.current?.ownerDocument ?? document

    const handleEvents = (event: Events): void => {
      if (!mountedRef.current) return

      if (
        (node.current && node.current.contains(event.target as Node)) ||
        bubbledEventTarget.current === event.target ||
        !nodeDocument.contains(event.target as Node)
      ) {
        return
      }

      onClickAway(event)
    }

    nodeDocument.addEventListener(mouseEvent, handleEvents)
    nodeDocument.addEventListener(touchEvent, handleEvents)
    nodeDocument.addEventListener(focusEvent, handleEvents)

    return () => {
      nodeDocument.removeEventListener(mouseEvent, handleEvents)
      nodeDocument.removeEventListener(touchEvent, handleEvents)
      nodeDocument.removeEventListener(focusEvent, handleEvents)
    }
  }, [focusEvent, mouseEvent, onClickAway, touchEvent])

  const mappedMouseEvent = eventTypeMapping[mouseEvent]
  const mappedTouchEvent = eventTypeMapping[touchEvent]
  const mappedFocusEvent = eventTypeMapping[focusEvent]

  return React.Children.only(
    React.cloneElement(children as React.ReactElement<any>, {
      ref: handleChildRef,
      [mappedFocusEvent]: handleBubbledEvents(mappedFocusEvent),
      [mappedMouseEvent]: handleBubbledEvents(mappedMouseEvent),
      [mappedTouchEvent]: handleBubbledEvents(mappedTouchEvent),
    }),
  )
}

ClickAwayListener.displayName = "ClickAwayListener"

export default ClickAwayListener
