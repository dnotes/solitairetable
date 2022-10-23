/// <reference types="@sveltejs/kit" />
declare type DndEvent = import("svelte-dnd-action").DndEvent;
declare namespace svelte.JSX {
    interface HTMLAttributes<T> {
        onconsider?: (event: CustomEvent<DndEvent> & {target: EventTarget & T}) => void;
        onfinalize?: (event: CustomEvent<DndEvent> & {target: EventTarget & T}) => void;
    }
}
export type DropdownDirection='top'|'bottom'|'left'|'right'|'bottom-0 right'|'bottom-0 left'